export function ContactView() {
  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground">
        How to reach me
      </div>

      <div className="space-y-4">
        {/* Email */}
        <div className="flex items-start gap-4">
          <span className="text-primary-strong w-20 shrink-0">email:</span>
          <div className="flex-1 min-w-0 space-y-1">
            <a
              href="mailto:luhzhang@gmail.com"
              className="break-all text-foreground hover:text-primary-strong transition-colors"
            >
              luhzhang@gmail.com
            </a>
          </div>
        </div>

        {/* GitHub */}
        <div className="flex items-start gap-4">
          <span className="text-primary-strong w-20 shrink-0">github:</span>
          <div className="flex-1 min-w-0 space-y-1">
            <a
              href="https://github.com/zhanglux"
              target="_blank"
              rel="noopener noreferrer"
              className="break-all text-foreground hover:text-primary-strong transition-colors"
            >
              @zhanglux
            </a>
            <div className="text-xs text-muted-foreground">
              Source code for this site
            </div>
          </div>
        </div>

        {/* LinkedIn */}
        <div className="flex items-start gap-4">
          <span className="text-primary-strong w-20 shrink-0">linkedin:</span>
          <div className="flex-1 min-w-0 space-y-1">
            <a
              href="https://www.linkedin.com/in/zhanglux"
              target="_blank"
              rel="noopener noreferrer"
              className="break-all text-foreground hover:text-primary-strong transition-colors"
            >
              www.linkedin.com/in/zhanglux
            </a>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-border">
        <div className="text-sm space-y-2">
          <div className="text-muted-foreground">Availability:</div>
          <div className="flex items-center gap-2">
            <span className="text-primary-strong">●</span>
            <span className="text-foreground">Open to new opportunities in London</span>
          </div>
        </div>
      </div>
    </div>
  );
}
