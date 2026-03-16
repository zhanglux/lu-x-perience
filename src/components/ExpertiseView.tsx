export function ExpertiseView() {
  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground">
        Core competencies and technical skills
      </div>

      <div className="space-y-6">
        {/* Design Engineering */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-primary">▸</span>
            <span className="text-foreground font-semibold">Design Engineering</span>
          </div>
          <div className="pl-6 text-sm text-muted-foreground space-y-1">
            <div>├─ Component-driven development</div>
            <div>├─ Design system architecture</div>
            <div>├─ Pixel-perfect implementation</div>
            <div>└─ Performance optimization</div>
          </div>
        </div>

        {/* Vibe Coding */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-primary">▸</span>
            <span className="text-foreground font-semibold">Vibe Coding</span>
          </div>
          <div className="pl-6 text-sm text-muted-foreground space-y-1">
            <div>├─ Intuitive interface flows</div>
            <div>├─ Natural micro-interactions</div>
            <div>├─ Thoughtful animation timing</div>
            <div>└─ Emotional design patterns</div>
          </div>
        </div>

        {/* Technical Stack */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-primary">▸</span>
            <span className="text-foreground font-semibold">Technical Stack</span>
          </div>
          <div className="pl-6 text-sm space-y-2">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {[
                'React',
                'TypeScript',
                'Tailwind CSS',
                'Motion/Framer',
                'Figma',
                'WebGL',
                'Canvas API',
                'Three.js',
                'D3.js',
              ].map((skill) => (
                <div key={skill} className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  <span className="text-muted-foreground">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Process */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-primary">▸</span>
            <span className="text-foreground font-semibold">Process</span>
          </div>
          <div className="pl-6 text-sm text-muted-foreground space-y-1">
            <div>1. Research & Discovery</div>
            <div>2. Rapid Prototyping</div>
            <div>3. Design System Creation</div>
            <div>4. Implementation & Testing</div>
            <div>5. Iteration & Refinement</div>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-border text-sm">
        <div className="text-muted-foreground mb-2">Years of experience:</div>
        <div className="flex gap-8">
          <div>
            <span className="text-primary">▪</span> UX Design:{' '}
            <span className="text-foreground">6+ years</span>
          </div>
          <div>
            <span className="text-primary">▪</span> Frontend Dev:{' '}
            <span className="text-foreground">5+ years</span>
          </div>
        </div>
      </div>
    </div>
  );
}
