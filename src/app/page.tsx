'use client';

import { useState, useEffect, useRef } from 'react';
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
import { loadOutputs, saveOutputs, takeReturnAnchor } from '@/lib/terminalHistory';

interface OutputItem {
  id: string;
  command: string;
  component: React.ReactNode;
}

/**
 * Re-derives the view for a command. Used both when a command is typed and when
 * rehydrating persisted history after returning from a child page. `outputId` is
 * threaded into views that contain child-page links so they can build a stable
 * return anchor.
 */
function renderCommandView(command: string, outputId: string): React.ReactNode {
  switch (command.trim().toLowerCase()) {
    case 'help':
    case '?':
      return <HelpView />;
    case 'projects':
      return <ProjectsView outputId={outputId} />;
    case 'interview':
      return <TakeHomeTasksView outputId={outputId} />;
    case 'expertise':
    case 'skills':
      return <ExpertiseView />;
    case 'contact':
      return <ContactView />;
    case 'about':
    case 'bio':
      return <AboutView />;
    default:
      return (
        <div className="text-sm space-y-2">
          <div className="text-muted-foreground">
            Command not found: <span className="text-foreground">{command}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Type <span className="text-foreground">help</span> to see available commands
          </div>
        </div>
      );
  }
}

export default function Portfolio() {
  const [outputs, setOutputs] = useState<OutputItem[]>([]);
  const [autoCommand, setAutoCommand] = useState<{ cmd: string; key: number } | null>(null);
  const [pendingScrollOutputId, setPendingScrollOutputId] = useState<string | null>(null);
  const [pendingAnchorId, setPendingAnchorId] = useState<string | null>(null);
  const autoCommandKey = useRef(0);
  const outputRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const outputIdCounter = useRef(0);
  const skipInitialSave = useRef(true);

  const nextOutputId = () => {
    outputIdCounter.current += 1;
    return `${Date.now()}-${outputIdCounter.current}`;
  };

  const handleCloseOutput = (id: string) => {
    setOutputs((prev) => prev.filter((output) => output.id !== id));
  };

  // Triggered by the cute shortcut buttons: types the command into the prompt
  // and auto-runs it. The incrementing key allows re-triggering the same command.
  const handleRunCommand = (cmd: string) => {
    autoCommandKey.current += 1;
    setAutoCommand({ cmd, key: autoCommandKey.current });
  };

  const handleCommand = (command: unknown) => {
    if (typeof command !== 'string') {
      return;
    }
    const cmd = command.trim().toLowerCase();

    if (cmd === 'clear' || cmd === 'cls') {
      setOutputs([]);
      return;
    }

    const id = nextOutputId();
    const newOutput: OutputItem = {
      id,
      command,
      component: renderCommandView(command, id),
    };

    setPendingScrollOutputId(id);
    setOutputs((prev) => [...prev, newOutput]);
  };

  // Restore the terminal history (and return anchor) when the page mounts —
  // this is what makes returning from a child page keep the chat history.
  useEffect(() => {
    const stored = loadOutputs();
    if (stored.length > 0) {
      setOutputs(
        stored.map(({ id, command }) => ({
          id,
          command,
          component: renderCommandView(command, id),
        })),
      );
    }
    const anchor = takeReturnAnchor();
    if (anchor) {
      setPendingAnchorId(anchor);
    }
  }, []);

  // Persist history on every change so it survives navigation to a child page.
  useEffect(() => {
    if (skipInitialSave.current) {
      skipInitialSave.current = false;
      return;
    }
    saveOutputs(outputs.map(({ id, command }) => ({ id, command })));
  }, [outputs]);

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

  useEffect(() => {
    if (!pendingScrollOutputId) {
      return;
    }

    const targetOutput = outputRefs.current[pendingScrollOutputId];
    if (targetOutput) {
      // Instant (not smooth) scroll: a smooth animation keeps the content moving,
      // so a click on a freshly-rendered link lands its mousedown/mouseup on
      // different elements and the first click gets eaten. Instant avoids that.
      targetOutput.scrollIntoView({ behavior: 'auto', block: 'start' });
      setPendingScrollOutputId(null);
    }
  }, [outputs, pendingScrollOutputId]);

  // After returning from a child page, scroll back to the link that opened it.
  useEffect(() => {
    if (!pendingAnchorId) {
      return;
    }
    const target = document.getElementById(pendingAnchorId);
    if (target) {
      target.scrollIntoView({ behavior: 'auto', block: 'center' });
      setPendingAnchorId(null);
    }
  }, [outputs, pendingAnchorId]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TerminalHeader />
      <TerminalWelcome onRunCommand={handleRunCommand} />

      <div className="flex-1">
        {outputs.map((output) => (
          <div
            key={output.id}
            ref={(el) => {
              outputRefs.current[output.id] = el;
            }}
          >
            <CommandOutput command={output.command} onClose={() => handleCloseOutput(output.id)}>
              {output.component}
            </CommandOutput>
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 bg-background">
        <CommandPrompt onCommand={handleCommand} autoCommand={autoCommand} />
      </div>
    </div>
  );
}
