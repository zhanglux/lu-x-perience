import { useRef } from 'react';
import { RocketIcon } from '@/components/ui/rocket';
import { BrainIcon } from '@/components/ui/brain';
import { SendIcon } from '@/components/ui/send';
import { CoffeeIcon } from '@/components/ui/coffee';
import { TerminalIcon } from '@/components/ui/terminal';

interface TerminalWelcomeProps {
  onRunCommand?: (command: string) => void;
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
  { cmd: 'expertise', label: 'Skills & experience', Icon: BrainIcon as Shortcut['Icon'] },
  { cmd: 'about', label: 'How I work', Icon: TerminalIcon as Shortcut['Icon'] },
  { cmd: 'contact', label: 'Get in touch', Icon: SendIcon as Shortcut['Icon'] },
  { cmd: 'interview', label: 'A design challenge', Icon: CoffeeIcon as Shortcut['Icon'] },
];

/**
 * Pill button that plays its animated icon while hovered/focused. The icon is
 * driven through its imperative handle so pointing anywhere on the button —
 * not just the small glyph — starts the animation.
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
      aria-label={`${label} (runs the ${cmd} command)`}
      className="inline-flex items-center gap-1.5 rounded-xl border border-foreground/15 bg-background px-3 py-1.5 text-sm font-medium text-foreground shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:border-foreground/30 hover:bg-muted hover:shadow-md active:translate-y-0 active:shadow-sm cursor-pointer"
    >
      <Icon ref={iconRef} size={18} className="shrink-0" />
      <span>{cmd}</span>
    </button>
  );
}

/** Optional terminal: the same content as the page above, for people who like to type. */
export function TerminalWelcome({ onRunCommand }: TerminalWelcomeProps) {
  return (
    <section aria-labelledby="terminal-heading" className="px-6 py-10 border-t border-foreground/10">
      <div className="max-w-7xl mx-auto space-y-4">
        <h2 id="terminal-heading" className="text-sm font-medium text-muted-foreground">
          Prefer a terminal?
        </h2>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          This site is also a small command line I built. Pick a command, or type one in the
          prompt at the bottom of the page.
        </p>
        <div className="flex flex-wrap gap-2">
          {SHORTCUTS.map((s) => (
            <ShortcutButton key={s.cmd} {...s} onRun={onRunCommand} />
          ))}
        </div>
      </div>
    </section>
  );
}
