const howIWork = [
  {
    title: 'Start with the problem',
    body: 'I want to understand what the user is trying to get done before I draw anything.',
  },
  {
    title: 'Prototype in code',
    body: 'I build ideas in React as well as Figma, so engineers and I are looking at the same thing early.',
  },
  {
    title: 'Systems over screens',
    body: 'I look for the pattern behind a feature: tokens, components and rules a team can reuse.',
  },
  {
    title: 'Detail in service of the user',
    body: 'I care about the small things when they make the product easier to use.',
  },
];

export function AboutView() {
  return (
    <div className="space-y-6">
      <div className="space-y-4 text-sm text-muted-foreground">
        <p>
          I&apos;m Lu, a Senior Product Designer in London. At Signal AI I design AI-powered
          search and the workflows that help organisations understand reputation risk, and I
          work with engineering on the design system.
        </p>
        <p>
          Before that I was a Senior UX Designer at Springer Nature, working on peer review
          and manuscript workflows for academic publishing.
        </p>
      </div>

      <div className="pt-4 border-t border-border space-y-3">
        <div className="text-sm font-semibold text-foreground">How I work:</div>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          {howIWork.map((item) => (
            <div key={item.title} className="space-y-1">
              <div className="flex gap-2 text-foreground">
                <span className="text-primary-strong" aria-hidden="true">
                  ▸
                </span>
                {item.title}
              </div>
              <div className="text-muted-foreground pl-5">{item.body}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-border text-sm text-muted-foreground">
        MSc Multimedia &amp; Virtual Environments, University of Sussex
      </div>
    </div>
  );
}
