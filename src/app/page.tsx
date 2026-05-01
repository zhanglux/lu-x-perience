'use client';

import { useState, useEffect } from 'react';
import { TerminalHeader } from '@/components/TerminalHeader';
import { TerminalWelcome } from '@/components/TerminalWelcome';
import { CommandPrompt } from '@/components/CommandPrompt';
import { CommandOutput } from '@/components/CommandOutput';
import { ProjectsView } from '@/components/ProjectsView';
import { ExpertiseView } from '@/components/ExpertiseView';
import { ContactView } from '@/components/ContactView';
import { HelpView } from '@/components/HelpView';
import { AboutView } from '@/components/AboutView';
import { TakeHomeTasksView } from '@/components/TakeHomeTasksView';

interface OutputItem {
  id: string;
  command: string;
  component: React.ReactNode;
}

export default function Portfolio() {
  const [outputs, setOutputs] = useState<OutputItem[]>([]);

  const handleCommand = (command: unknown) => {
    if (typeof command !== 'string') {
      return;
    }
    const cmd = command.trim().toLowerCase();
    let component: React.ReactNode = null;

    switch (cmd) {
      case 'help':
      case '?':
        component = <HelpView />;
        break;
      case 'projects':
        component = <ProjectsView />;
        break;
      case 'interview':
        component = <TakeHomeTasksView />;
        break;
      case 'expertise':
      case 'skills':
        component = <ExpertiseView />;
        break;
      case 'contact':
        component = <ContactView />;
        break;
      case 'about':
      case 'bio':
        component = <AboutView />;
        break;
      case 'clear':
      case 'cls':
        setOutputs([]);
        return;
      default:
        component = (
          <div className="text-sm space-y-2">
            <div className="text-muted-foreground">
              Command not found: <span className="text-foreground">{command}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Type <span className="text-foreground">help</span> to see available commands
            </div>
          </div>
        );
    }

    const newOutput: OutputItem = {
      id: Date.now().toString(),
      command,
      component,
    };

    setOutputs((prev) => [...prev, newOutput]);
  };

  const handleCloseOutput = (id: string) => {
    setOutputs((prev) => prev.filter((output) => output.id !== id));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        setOutputs([]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TerminalHeader />
      <TerminalWelcome />

      <div className="flex-1">
        {outputs.map((output) => (
          <CommandOutput
            key={output.id}
            command={output.command}
            onClose={() => handleCloseOutput(output.id)}
          >
            {output.component}
          </CommandOutput>
        ))}
      </div>

      <div className="sticky bottom-0 bg-background">
        <CommandPrompt onCommand={handleCommand} />
      </div>
    </div>
  );
}
