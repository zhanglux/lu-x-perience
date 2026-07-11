'use client';

import { useState, useEffect, useRef } from 'react';

interface CommandPromptProps {
  onCommand?: (command: string) => void;
  /**
   * When set, the command is "typed" into the input character-by-character and
   * then auto-run. The `key` lets the same command be triggered repeatedly.
   */
  autoCommand?: { cmd: string; key: number } | null;
}

export function CommandPrompt({ onCommand, autoCommand }: CommandPromptProps) {
  const [input, setInput] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Auto-type a command triggered from a shortcut button, then run it.
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
    <div className="px-6 py-4 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <span className="text-primary">❯</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            readOnly={isTyping}
            className="flex-1 bg-transparent outline-none"
            placeholder="Type a command... (try: help, projects, interview, expertise, contact)"
            autoFocus
          />
          <span
            className={`inline-block w-2 h-5 bg-foreground transition-opacity ${
              showCursor ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </form>

        <div className="mt-2 text-xs text-muted-foreground">? for shortcuts</div>
      </div>
    </div>
  );
}
