'use client';

import { useRef } from 'react';
import { RocketIcon } from '@/components/ui/rocket';
import { BrainIcon } from '@/components/ui/brain';
import { SendIcon } from '@/components/ui/send';
import { CoffeeIcon } from '@/components/ui/coffee';
import { TerminalIcon } from '@/components/ui/terminal';

interface CommandPromptProps {
  /** Runs a command; its output appears in the page. */
  onCommand?: (command: string) => void;
}

type AnimatedIconHandle = {
  startAnimation: () => void;
  stopAnimation: () => void;
};

interface Shortcut {
  cmd: string;
  label: string;
  Icon: React.ForwardRefExoticComponent<
    { size?: number; className?: string } & React.RefAttributes<AnimatedIconHandle>
  >;
}

const SHORTCUTS: Shortcut[] = [
  { cmd: 'projects', label: 'List my work', Icon: RocketIcon as Shortcut['Icon'] },
  { cmd: 'expertise', label: 'Skills and experience', Icon: BrainIcon as Shortcut['Icon'] },
  { cmd: 'about', label: 'How I work', Icon: TerminalIcon as Shortcut['Icon'] },
  { cmd: 'contact', label: 'Get in touch', Icon: SendIcon as Shortcut['Icon'] },
  { cmd: 'interview', label: 'A design challenge', Icon: CoffeeIcon as Shortcut['Icon'] },
];

/**
 * Command button that plays its animated icon while hovered/focused. The icon
 * is driven through its imperative handle so pointing anywhere on the button —
 * not just the small glyph — starts the animation. Styled to match the
 * outlined `IconLink` buttons used across the site.
 */
function ShortcutButton({
  cmd,
  label,
  Icon,
  onRun,
}: Shortcut & { onRun?: (cmd: string) => void }) {
  const iconRef = useRef<AnimatedIconHandle>(null);

  return (
    <button
      type="button"
      onClick={() => onRun?.(cmd)}
      onMouseEnter={() => iconRef.current?.startAnimation()}
      onMouseLeave={() => iconRef.current?.stopAnimation()}
      onFocus={() => iconRef.current?.startAnimation()}
      onBlur={() => iconRef.current?.stopAnimation()}
      aria-label={label}
      title={label}
      className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-lg border border-foreground/20 bg-background px-2.5 py-1.5 text-xs font-medium sm:px-3 sm:py-2 sm:text-sm text-foreground transition-colors duration-150 hover:border-primary hover:bg-primary hover:text-[#1A1410] active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <Icon ref={iconRef} size={16} className="shrink-0" />
      <span className="capitalize">{cmd}</span>
    </button>
  );
}

/**
 * A floating bar at the bottom centre of the page holding the five command
 * buttons. Pressing one runs its command; output appears in the page.
 */
export function CommandPrompt({ onCommand }: CommandPromptProps) {
  return (
    <nav
      aria-label="Sections"
      className="pointer-events-none fixed inset-x-0 bottom-4 z-20 px-4"
    >
      <div className="pointer-events-auto mx-auto flex w-fit max-w-full flex-wrap items-center justify-center gap-1.5 rounded-2xl sm:gap-2 bg-primary/20 p-2 backdrop-blur-md">
        {SHORTCUTS.map((s) => (
          <ShortcutButton key={s.cmd} {...s} onRun={onCommand} />
        ))}
      </div>
    </nav>
  );
}
