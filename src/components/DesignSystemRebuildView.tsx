import { Atom, Palette, Shapes, Accessibility, Plug, TrendingDown } from 'lucide-react';
import { siteBasePath as defaultBasePath } from '@/lib/siteBasePath';

interface DesignSystemRebuildViewProps {
  siteBasePath?: string;
}

export function DesignSystemRebuildView({
  siteBasePath = defaultBasePath,
}: DesignSystemRebuildViewProps) {
  const homeHref = `${siteBasePath}/`;
  const projectHref = `${siteBasePath}/design-system-rebuild`;

  const tags = ['Design systems', 'Accessibility', 'Frontend engineering', 'Rebrand'];

  const stack = [
    { label: 'Previous library', value: 'Material UI' },
    { label: 'New foundation', value: 'React Aria' },
    { label: 'Icon set', value: 'Lucide' },
  ];

  const decisions = [
    {
      icon: Atom,
      title: 'React Aria as the behaviour layer',
      points: [
        {
          lead: 'Style-free by design',
          rest: 'no visual opinions, full freedom to express the Signal brand',
        },
        {
          lead: 'Accessibility built in',
          rest: 'ARIA semantics and assistive technology support out of the box',
        },
        {
          lead: 'Quality interactions across all devices',
          rest: 'mouse, touch, keyboard, and screen reader handled',
        },
      ],
    },
    {
      icon: Palette,
      title: 'A handcrafted token system',
      body: 'We built the colour collection, spacing scale, and typography from scratch — directly from the brand guidelines. Nothing borrowed, nothing to fight against.',
    },
    {
      icon: Shapes,
      title: 'Lucide for icons',
      points: [
        {
          lead: 'No resource to build our own',
          rest: 'as a small team, we needed a solid foundation, not a blank canvas',
        },
        {
          lead: 'Open-source and well-maintained',
          rest: "community-backed, so we're not the ones keeping the lights on",
        },
        {
          lead: 'Lightweight and scalable',
          rest: 'extend only what we need, when we need it',
        },
      ],
    },
  ];

  const outcomes = [
    {
      icon: Accessibility,
      title: 'Accessibility first',
      body: 'WCAG-compliant from day one — not retrofitted.',
    },
    {
      icon: Plug,
      title: 'Flexible integration',
      body: 'Works with any styling approach — no lock-in.',
    },
    {
      icon: TrendingDown,
      title: 'Lower maintenance cost',
      body: 'Fewer overrides, cleaner codebase, faster updates.',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <div className="mx-auto max-w-4xl space-y-8 px-6 py-12">
        <nav className="text-sm text-muted-foreground flex items-center gap-2 flex-wrap">
          <a href={homeHref} className="hover:text-primary transition-colors">
            Portfolio
          </a>
          <span>/</span>
          <a href={projectHref} className="text-primary">
            Design system rebuild
          </a>
        </nav>

      <header className="space-y-4 border-b border-border pb-6">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-muted/40 px-2.5 py-1 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-3xl font-semibold leading-tight">
          Building a component library from the ground up — after outgrowing someone else&apos;s
        </h1>
        <p className="text-base leading-7 text-muted-foreground">
          What happens when your brand evolves faster than your design system? Here&apos;s how we
          replaced a borrowed foundation with something that was finally ours.
        </p>

        <figure className="overflow-hidden rounded-lg border border-border bg-muted/20">
          <img
            src={`${siteBasePath}/design-system/visual-language.png`}
            alt="A new visual language: brand messaging, UI/Core and UI/Supporting colour palettes, a spacing scale, and an icon set. Indicative direction only."
            className="w-full"
            draggable={false}
          />
        </figure>
      </header>

      <blockquote className="border-l-2 border-primary/60 pl-5">
        <p className="text-base italic leading-7 text-muted-foreground">
          When a product is growing fast, using a well-known UI kit feels like the right call — it&apos;s
          familiar, pre-built, and ships quickly. But when your brand changes, that shortcut can
          become a liability.
        </p>
      </blockquote>

      <section className="grid gap-3 sm:grid-cols-3">
        {stack.map((item) => (
          <div key={item.label} className="rounded-lg border border-border bg-muted/30 p-4">
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className="mt-1 text-sm font-medium text-foreground">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="rounded-xl border border-border bg-card/40 p-6">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-primary">01 · The problem</p>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          Material UI made sense at the start. It offered a complete set of components, consistent
          interaction patterns, and a visual language that teams already understood. For a product
          still finding its footing, it removed a lot of guesswork.
        </p>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          Then the company rebranded. New colours, new typography, a distinct tone. The product had
          an identity — and Material UI&apos;s opinionated styling was now working against it. Every
          custom override felt like fighting the system rather than building on it. The design
          system had become a constraint, not a tool.
        </p>
      </section>

      <section className="rounded-xl border border-border bg-card/40 p-6">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-primary">
          02 · What we decided
        </p>
        <div className="mt-4 space-y-4">
          {decisions.map((decision) => {
            const Icon = decision.icon;
            return (
              <div
                key={decision.title}
                className="flex gap-3 rounded-lg border border-border bg-muted/30 p-4"
              >
                <Icon
                  className="mt-0.5 h-[18px] w-[18px] shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-sm font-medium text-foreground">{decision.title}</h3>
                  {decision.body ? (
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{decision.body}</p>
                  ) : (
                    <ul className="mt-2 list-disc space-y-1.5 pl-4">
                      {decision.points?.map((point) => (
                        <li key={point.lead} className="text-sm leading-6 text-muted-foreground">
                          <span className="font-medium text-foreground">{point.lead}</span> —{' '}
                          {point.rest}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card/40 p-6">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-primary">
          03 · Why this decision is worth documenting
        </p>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          Not every team needs to rebuild their component library. But many hit a point where the
          system they inherited — or chose early — starts to slow them down more than it helps.
        </p>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          The shift we made wasn&apos;t just a technical one. It was about agreeing, across design and
          engineering, that the system should serve the product&apos;s identity rather than the other
          way around. Choosing behaviour-only primitives in React Aria meant we could separate the
          how it works from the how it looks — giving both disciplines room to move without constant
          negotiation.
        </p>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          The specific tools — React Aria, Lucide, a handcrafted token set — aren&apos;t the point. The
          principle is: when a brand matures, the design system needs to be something you can fully
          own. Not patch.
        </p>
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        {outcomes.map((outcome) => {
          const Icon = outcome.icon;
          return (
            <div key={outcome.title} className="rounded-lg border border-border bg-muted/30 p-4">
              <Icon className="mb-2 h-5 w-5 text-muted-foreground" aria-hidden="true" />
              <h3 className="text-sm font-medium text-foreground">{outcome.title}</h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{outcome.body}</p>
            </div>
          );
        })}
      </section>

      <section className="space-y-3">
        <figure className="overflow-hidden rounded-lg border border-border bg-muted/20">
          <img
            src={`${siteBasePath}/design-system/new-look.png`}
            alt="The new look: components rebuilt on React Aria with the handcrafted token system and Lucide icons."
            className="w-full"
            draggable={false}
          />
        </figure>
        <a
          href="https://www.figma.com/make/FhB0FdU5kC0JYZEg1DBSB5/Implement-Page-Design?t=E442HA87h92akKUW-1"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          View live prototype ↗
        </a>
      </section>

      <section className="pt-2 border-t border-border">
        <a
          href={homeHref}
          className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          ← Back to portfolio
        </a>
      </section>
      </div>
    </div>
  );
}
