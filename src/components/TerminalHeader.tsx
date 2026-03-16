'use client';

export function TerminalHeader() {
  const currentDate = new Date().toDateString();
  const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false });

  return (
    <div className="px-6 py-4 border-b border-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-sm text-muted-foreground mb-2" suppressHydrationWarning>
          Last login: {currentDate} {currentTime} on ttys000
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">portfolio@ux-designer ~ %</span>
          <span className="text-primary">lu</span>
        </div>
      </div>
    </div>
  );
}
