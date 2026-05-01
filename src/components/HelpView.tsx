export function HelpView() {
  const commands = [
    { cmd: 'help', desc: 'Show available commands' },
    { cmd: 'projects', desc: 'List all projects and case studies' },
    { cmd: 'interview', desc: 'Interview design task' },
    { cmd: 'expertise', desc: 'Show skills and technical competencies' },
    { cmd: 'contact', desc: 'Display contact information' },
    { cmd: 'about', desc: 'Learn more about me and my approach' },
    { cmd: 'clear', desc: 'Clear the terminal output' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground">Available commands:</div>

      <div className="space-y-2">
        {commands.map((item) => (
          <div key={item.cmd} className="flex gap-6 text-sm">
            <span className="text-primary font-semibold w-32">{item.cmd}</span>
            <span className="text-muted-foreground">{item.desc}</span>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-border text-sm space-y-2">
        <div className="text-muted-foreground">Keyboard shortcuts:</div>
        <div className="space-y-1 text-xs">
          <div className="flex gap-6">
            <span className="text-primary w-32">Ctrl/Cmd + K</span>
            <span className="text-muted-foreground">Focus command input</span>
          </div>
          <div className="flex gap-6">
            <span className="text-primary w-32">Ctrl/Cmd + L</span>
            <span className="text-muted-foreground">Clear terminal</span>
          </div>
        </div>
      </div>

      <div className="pt-4 text-xs text-muted-foreground">
        Tip: Type any command name to execute it
      </div>
    </div>
  );
}
