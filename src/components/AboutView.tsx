export function AboutView() {
  return (
    <div className="space-y-6">
      <div className="space-y-4 text-sm">
        <div className="text-muted-foreground">
          Hi there! I&apos;m a UX Designer and Design Engineer who believes the best
          digital experiences live at the intersection of thoughtful design and elegant
          code.
        </div>

        <div className="text-muted-foreground">
          My approach to design engineering is rooted in what I call &quot;vibe coding&quot; —
          building interfaces that don&apos;t just work, but feel right. Every interaction,
          every transition, every micro-moment is crafted with intention.
        </div>
      </div>

      <div className="pt-4 border-t border-border space-y-3">
        <div className="text-sm font-semibold text-foreground">Philosophy:</div>
        <div className="space-y-2 text-sm text-muted-foreground pl-4">
          <div className="flex gap-3">
            <span className="text-primary">→</span>
            <span>Design systems are living, breathing ecosystems</span>
          </div>
          <div className="flex gap-3">
            <span className="text-primary">→</span>
            <span>Code should be as beautiful as the interfaces it creates</span>
          </div>
          <div className="flex gap-3">
            <span className="text-primary">→</span>
            <span>Performance and aesthetics are not mutually exclusive</span>
          </div>
          <div className="flex gap-3">
            <span className="text-primary">→</span>
            <span>The best design is invisible until it&apos;s needed</span>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-border space-y-3">
        <div className="text-sm font-semibold text-foreground">
          What I&apos;m passionate about:
        </div>
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <div className="space-y-1">
            <div className="text-primary">▸ Design Systems</div>
            <div className="text-xs text-muted-foreground pl-4">
              Building scalable, maintainable component libraries
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-primary">▸ Motion Design</div>
            <div className="text-xs text-muted-foreground pl-4">
              Creating meaningful animations that enhance UX
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-primary">▸ Creative Coding</div>
            <div className="text-xs text-muted-foreground pl-4">
              Exploring generative art and WebGL experiments
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-primary">▸ Developer Experience</div>
            <div className="text-xs text-muted-foreground pl-4">
              Making tools that developers actually enjoy using
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 text-xs text-muted-foreground">
        Currently exploring: AI-assisted design workflows, real-time collaboration tools
      </div>
    </div>
  );
}
