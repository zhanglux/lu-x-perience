const stack = [
  {
    title: 'Design',
    items: ['Figma', 'Claude Design'],
  },
  {
    title: 'Build',
    items: ['Cursor', 'Claude Code', 'GitHub', 'React Aria', 'SKILL.md'],
  },
  {
    title: 'Principles',
    items: ['Laws of UX', 'Design Systems', 'Accessibility', 'Brand Systems'],
  },
];

const competencies = [
  {
    title: 'Design Engineering',
    items: [
      'Build components with React Aria as well as drawing them',
      'Turn Figma libraries into working React prototypes',
      'Share one vocabulary with engineers to cut handoff',
      'Use AI coding tools to get to a testable build sooner',
    ],
  },
  {
    title: 'Design Systems',
    items: [
      'Scalable components, tokens and patterns',
      'Consistent experiences across products',
      'Brand translated into reusable UI',
    ],
  },
  {
    title: 'AI-native Workflow',
    items: [
      'Prompt → Code → Prototype → Iterate',
      'UX copy, interactions, motion and graphics',
      'AI drafts, I decide what ships',
    ],
  },
  {
    title: 'Product Craft',
    items: [
      'Intuitive flows',
      'Thoughtful motion',
      'Accessible interfaces by default',
    ],
  },
];

export function ExpertiseView() {
  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground">
        <span className="text-primary-strong">$</span> cat core_competencies.txt
      </div>

      <div className="space-y-6">
        {competencies.map((group) => (
          <div key={group.title} className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-primary-strong">▸</span>
              <span className="text-foreground font-semibold">{group.title}</span>
            </div>
            <div className="pl-6 text-sm text-muted-foreground space-y-1">
              {group.items.map((item, i) => (
                <div key={item}>
                  <span className="text-primary/60">
                    {i === group.items.length - 1 ? '└─' : '├─'}
                  </span>{' '}
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-border space-y-6">
        <div className="text-sm text-muted-foreground">
          <span className="text-primary-strong">$</span> stack
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stack.map((group) => (
            <div key={group.title} className="space-y-2">
              <div className="text-foreground font-semibold">{group.title}</div>
              <div className="text-sm text-muted-foreground space-y-1">
                {group.items.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="text-primary-strong">▸</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
