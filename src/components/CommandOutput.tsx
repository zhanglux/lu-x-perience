import { X } from 'lucide-react';

interface CommandOutputProps {
  command: string;
  children: React.ReactNode;
  onClose?: () => void;
}

export function CommandOutput({ command, children, onClose }: CommandOutputProps) {
  return (
    <div className="px-6 py-4 border-t border-border bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-primary">❯</span>
            <span className="text-foreground">{command}</span>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
        <div className="pl-4 border-l-2 border-primary/30">{children}</div>
      </div>
    </div>
  );
}
