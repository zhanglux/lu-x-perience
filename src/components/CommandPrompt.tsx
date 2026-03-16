'use client';

import { useState, useEffect } from 'react';

interface CommandPromptProps {
  onCommand?: (command: string) => void;
}

export function CommandPrompt({ onCommand }: CommandPromptProps) {
  const [input, setInput] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none"
            placeholder="Type a command... (try: help, projects, expertise, contact)"
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
