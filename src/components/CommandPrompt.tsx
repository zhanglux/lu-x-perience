'use client';

import { useState, useEffect, useRef } from 'react';
import { RocketIcon } from '@/components/ui/rocket';
import { BrainIcon } from '@/components/ui/brain';
import { SendIcon } from '@/components/ui/send';
import { CoffeeIcon } from '@/components/ui/coffee';
import { TerminalIcon } from '@/components/ui/terminal';

interface CommandPromptProps {
  onCommand?: (command: string) => void;
  /** Called by the command chips; the page answers by setting `autoCommand`. */
  onRunCommand?: (command: string) => void;
  /**
   * When set, the command is "typed" into the input character-by-character and
   * then auto-run. The `key` lets the same command be triggered repeatedly.
   */
  autoCommand?: { cmd: string; key: number } | null;
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
 * Command chip that plays its animated icon while hovered/focused. The icon is
 * driven through its imperative handle so pointing anywhere on the chip — not
 * just the small glyph — starts the animation.
 */
function ShortcutChip({
  cmd,
  label,
  Icon,
  onRun,
}: Shortcut & { onRun?: (cmd: string) => void }) {
  const iconRef = useRef<AnimatedIconHandle>(null);

  return (
    <button
      type="button"
      // Keep focus in the input on press, so the shortcut row doesn't collapse mid-tap.
      onMouseDown={(event) => event.preventDefault()}
      onClick={() => onRun?.(cmd)}
      onMouseEnter={() => iconRef.current?.startAnimation()}
      onMouseLeave={() => iconRef.current?.stopAnimation()}
      onFocus={() => iconRef.current?.startAnimation()}
      onBlur={() => iconRef.current?.stopAnimation()}
      aria-label={`${label} (runs the ${cmd} command)`}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground focus-visible:bg-muted focus-visible:text-foreground focus-visible:outline-none cursor-pointer"
    >
      <Icon ref={iconRef} size={14} className="shrink-0" />
      <span>{cmd}</span>
    </button>
  );
}

/**
 * The terminal, as a floating box at the bottom centre of the page: a rounded
 * input with command shortcuts listed underneath. Output appears in the page.
 */
export function CommandPrompt({ onCommand, onRunCommand, autoCommand }: CommandPromptProps) {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-type a command triggered from a chip, then run it.
  useEffect(() => {
    if (!autoCommand) {
      return;
    }
    const { cmd } = autoCommand;
    setIsTyping(true);
    setInput('');
    inputRef.current?.focus();

    let i = 0;
    const typer = setInterval(() => {
      i += 1;
      setInput(cmd.slice(0, i));
      if (i >= cmd.length) {
        clearInterval(typer);
        // Small pause so the fully-typed command is visible before it runs.
        setTimeout(() => {
          onCommand?.(cmd);
          setInput('');
          setIsTyping(false);
        }, 350);
      }
    }, 70);

    return () => clearInterval(typer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoCommand?.key]);

  // Ctrl/Cmd + K focuses the prompt from anywhere on the page.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isTyping) {
      return;
    }
    if (input.trim()) {
      onCommand?.(input);
      setInput('');
    }
  };

  return (
    <section
      aria-label="Terminal"
      className="pointer-events-none fixed inset-x-0 bottom-4 z-20 px-4"
    >
      <form
        onSubmit={handleSubmit}
        onClick={(event) => {
          // Clicking the box anywhere but a shortcut puts the cursor in the input.
          if (!(event.target as HTMLElement).closest('button')) {
            inputRef.current?.focus();
          }
        }}
        className="group pointer-events-auto mx-auto w-full max-w-xl cursor-text rounded-2xl border border-foreground/15 bg-background shadow-lg transition-shadow focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30"
      >
        <div className="flex items-center gap-3 px-4 py-3">
          <span className="text-primary" aria-hidden="true">
            ❯
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            readOnly={isTyping}
            aria-label="Type a command"
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent text-sm caret-primary outline-none placeholder:text-muted-foreground"
            placeholder="Prefer a terminal? Type a command…"
          />
          <kbd className="hidden shrink-0 rounded-md border border-foreground/15 px-1.5 py-0.5 text-[11px] text-muted-foreground sm:inline">
            ⌘K
          </kbd>
        </div>

        {/* Shortcuts: always shown on desktop; on phones they open when the box is in use. */}
        <div className="hidden items-center gap-1 overflow-x-auto border-t border-foreground/10 px-2 py-1.5 [scrollbar-width:none] group-focus-within:flex sm:flex [&::-webkit-scrollbar]:hidden">
          {SHORTCUTS.map((s) => (
            <ShortcutChip key={s.cmd} {...s} onRun={onRunCommand} />
          ))}
        </div>
      </form>
    </section>
  );
}
