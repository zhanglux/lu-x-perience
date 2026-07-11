export function ContactView() {
  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground">
        Available channels for communication
      </div>

      <div className="space-y-4">
        {/* Email */}
        <div className="flex items-start gap-4">
          <span className="text-primary w-24">email:</span>
          <div className="flex-1 space-y-1">
            <a
              href="mailto:luhzhang@gmail.com"
              className="text-foreground hover:text-primary transition-colors"
            >
              luhzhang@gmail.com
            </a>
            <div className="text-xs text-muted-foreground">
              Response time: ~24 hours
            </div>
          </div>
        </div>

        {/* GitHub */}
        <div className="flex items-start gap-4">
          <span className="text-primary w-24">github:</span>
          <div className="flex-1 space-y-1">
            <a
              href="https://github.com/zhanglux"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors"
            >
              @zhanglux
            </a>
            <div className="text-xs text-muted-foreground">
              Open source work and experiments
            </div>
          </div>
        </div>

        {/* LinkedIn */}
        <div className="flex items-start gap-4">
          <span className="text-primary w-24">linkedin:</span>
          <div className="flex-1 space-y-1">
            <a
              href="https://www.linkedin.com/in/zhanglux"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors"
            >
              www.linkedin.com/in/zhanglux
            </a>
            <div className="text-xs text-muted-foreground">
              Professional network
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-border">
        <div className="text-sm space-y-2">
          <div className="text-muted-foreground">Availability:</div>
          <div className="flex items-center gap-2">
            <span className="text-primary">●</span>
            <span className="text-foreground">Open to new opportunities</span>
          </div>
        </div>
      </div>
    </div>
  );
}
