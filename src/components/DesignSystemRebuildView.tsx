import type { ReactNode } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { siteBasePath as defaultBasePath } from '@/lib/siteBasePath';
import {
  ComponentBench,
  Foundations,
  QuickDemo,
  SectionNav,
  Sheet,
} from './design-system/SpecSheet';
import { backlog, phase1Usage } from './design-system/data';

interface DesignSystemRebuildViewProps {
  siteBasePath?: string;
}

const tags = ['Design systems', 'Design tokens', 'React Aria', 'Accessibility'];

const sections = [
  { id: 'why', label: 'Why rebuild' },
  { id: 'phase-1', label: 'Phase 1' },
  { id: 'gaps', label: 'What it left open' },
  { id: 'phase-2', label: 'Phase 2 tokens' },
  { id: 'components', label: 'Components' },
  { id: 'rules', label: 'Build rules' },
  { id: 'status', label: 'Where it stands' },
];

const phases = [
  {
    phase: 'Phase 1',
    title: 'Our own component library',
    role: 'Main contributor',
    team: 'With one other designer and two engineers',
    work: 'Audit, tokens, component design, the Figma library, and vibe coding a new button style myself, submitted for engineers to review.',
    status: 'All tokens and components shipped to production.',
  },
  {
    phase: 'Phase 2',
    title: 'A new look, and tokens that people and AI agents can both use',
    role: 'Secondary contributor',
    team: 'With a lead designer and a lead engineer',
    work: 'Audit, some of the component design, and defining the token rules.',
    status: '27 components and the token package released as an early (alpha) version: usable, still being tested, and may change.',
  },
];

const facts = [
  { value: '45', label: 'files in the product’s code use the phase 1 button' },
  { value: '27', label: 'components released in phase 2' },
  { value: '27', label: 'components, each with automated tests including an accessibility check' },
  { value: '15', label: 'usage guides' },
];

/** Phase 1 against phase 2, counted in the two code repositories in November 2026. */
const beforeAfter = [
  {
    area: 'Tokens',
    before: '~90',
    after: '0',
    unit: 'colour codes typed in by hand',
    detail: 'Tokens are generated from Figma Variables.',
  },
  {
    area: 'Tests',
    before: '5',
    after: '27',
    unit: 'test files for 27 components',
    detail: 'Each has an automated accessibility check and keyboard tests.',
  },
  {
    area: 'Usage guides',
    before: '0',
    after: '15',
    unit: 'written guides',
    detail: 'When to use, when not to, accessibility, do and don’t.',
  },
  {
    area: 'Live previews',
    before: '3',
    after: '0',
    unit: 'components with no live preview',
    detail: 'Every version of a component now has its own preview page (a “story”) in the docs.',
  },
  {
    area: 'Accessible base',
    before: '20',
    after: '27',
    unit: 'of 27 components built on React Aria',
    detail: 'Engineers cannot use the browser’s bare button or form field instead.',
  },
];

const guardRails = [
  {
    title: 'Figma-driven tokens',
    body: 'Tokens are generated from Figma Variables, so design and code cannot drift apart by hand-editing. Components can only use tokens named by their purpose.',
    fails: 'a component has a colour or size typed in directly',
  },
  {
    title: 'Accessibility by default',
    body: 'Every component is built on React Aria, the accessible toolkit. Each has an automated accessibility check and keyboard tests.',
    fails: 'a component uses the browser’s bare button, text field or dropdown instead',
  },
  {
    title: 'Generated docs',
    body: 'Tables of each component’s options, and of which Figma name matches which code name, are produced automatically. Every component needs a usage guide.',
    fails: 'any part of a component’s documentation is missing',
  },
  {
    title: 'Careful releases',
    body: 'Every version of a component must have its own live preview page (a “story”) in the documentation site. Each release comes with a written record of what changed.',
    fails: 'a version of a component has no preview page',
  },
];

function Section({
  id,
  index,
  title,
  lead,
  children,
}: {
  id: string;
  index: string;
  title: string;
  lead: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-16 space-y-5 lg:scroll-mt-8">
      <div className="space-y-2">
        <h2 id={`${id}-h`} className="text-sm font-medium uppercase tracking-[0.12em] text-primary-strong">
          <span aria-hidden="true">{index} · </span>
          {title}
        </h2>
        <p className="text-xl font-semibold leading-snug text-foreground sm:text-2xl">{lead}</p>
      </div>
      {children}
    </section>
  );
}

function Prose({ children }: { children: ReactNode }) {
  return <p className="text-sm leading-7 text-muted-foreground">{children}</p>;
}

function WideShot({ src, alt, label }: { src: string; alt: string; label: string }) {
  return (
    <div
      className="overflow-x-auto rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#211073]"
      tabIndex={0}
      role="group"
      aria-label={`${label}. Scrolls sideways.`}
    >
      <img src={src} alt={alt} className="block w-full min-w-[1400px]" draggable={false} />
    </div>
  );
}

function Bars({ rows, colour }: { rows: { component: string; files: number }[]; colour: string }) {
  const max = Math.max(...rows.map((r) => r.files));
  return (
    <ul className="space-y-2">
      {rows.map((u) => (
        <li
          key={u.component}
          className="grid grid-cols-[124px_minmax(0,1fr)_28px] items-center gap-3 sm:grid-cols-[150px_minmax(0,1fr)_28px]"
        >
          <span className="ds-code">{u.component}</span>
          <span className="block h-3 rounded-sm" style={{ background: 'var(--ds-surface-sunken)' }} aria-hidden="true">
            <span className="block h-3 rounded-sm" style={{ width: `${(u.files / max) * 100}%`, background: colour }} />
          </span>
          <span className="ds-code text-right">{u.files}</span>
        </li>
      ))}
    </ul>
  );
}

export function DesignSystemRebuildView({
  siteBasePath = defaultBasePath,
}: DesignSystemRebuildViewProps) {
  const homeHref = `${siteBasePath}/`;
  const projectHref = `${siteBasePath}/design-system-rebuild`;
  const img = (name: string) => `${siteBasePath}/design-system/${name}`;

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;600&display=swap"
        precedence="default"
      />
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="space-y-8">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <a href={homeHref} className="transition-colors hover:text-primary-strong">
              Portfolio
            </a>
            <span aria-hidden="true">/</span>
            <a href={projectHref} aria-current="page" className="text-primary-strong">
              Design system rebuild
            </a>
          </nav>

          <header className="space-y-5">
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
            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
              Replacing Material UI with our own design system
            </h1>
            <p className="text-base leading-7 text-muted-foreground">
              Signal AI rebranded and the product&apos;s borrowed UI kit could not follow. I was the
              main contributor to the library that replaced it. I am now a secondary contributor to
              its successor, which refreshes the look to match the latest marketing website and
              redefines the tokens so that AI agents can use them as well as people.
            </p>
          </header>

          {/* Summary: everything a quick reader needs. */}
          <div className="grid gap-4 lg:grid-cols-2">
            {phases.map((p) => (
              <div key={p.phase} className="rounded-xl border border-border bg-white/60 p-5">
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-primary-strong">
                  {p.phase} · {p.title}
                </p>
                <p className="mt-2 text-xl font-semibold">{p.role}</p>
                <p className="text-sm text-muted-foreground">{p.team}</p>
                <dl className="mt-4 space-y-2 border-t border-border pt-4 text-sm leading-6">
                  <div className="grid grid-cols-[72px_minmax(0,1fr)] gap-3">
                    <dt className="text-muted-foreground">My work</dt>
                    <dd>{p.work}</dd>
                  </div>
                  <div className="grid grid-cols-[72px_minmax(0,1fr)] gap-3">
                    <dt className="text-muted-foreground">Status</dt>
                    <dd>{p.status}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
          <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label} className="flex flex-col-reverse justify-end rounded-xl border border-border bg-white/60 p-4">
                <dt className="mt-1 text-xs leading-5 text-muted-foreground">{f.label}</dt>
                <dd className="text-3xl font-semibold text-foreground">{f.value}</dd>
              </div>
            ))}
          </dl>

          <Sheet label="Built from the system" meta="Try it">
            <QuickDemo moreHref="#components" />
          </Sheet>
        </div>

        <div className="mt-12 lg:grid lg:grid-cols-[176px_minmax(0,1fr)] lg:gap-10">
          <SectionNav items={sections} />

          <div className="mt-10 space-y-16 lg:mt-0">
            <Section id="why" index="01" title="Why rebuild" lead="The brand changed, and Material UI could not follow it.">
              <Prose>
                Material UI made sense at the start: a complete set of components and patterns teams
                already understood. After the rebrand, every custom override meant fighting its
                styling. We chose React Aria, an open-source toolkit from Adobe, for behaviour: it handles how components work for keyboard, touch and screen-reader users, and leaves the look to us. Colour, spacing and
                typography were built from the brand guidelines, and icons came from Lucide.
              </Prose>
              <figure className="overflow-hidden rounded-lg border border-border bg-muted/20">
                <img
                  src={img('visual-language.png')}
                  alt="The new visual language: brand messaging, UI/Core and UI/Supporting colour palettes, a spacing scale and a set of Lucide icons."
                  className="block w-full"
                  draggable={false}
                />
                <figcaption className="px-4 py-3 text-xs leading-5 text-muted-foreground">
                  The direction set at the rebrand: palettes, spacing scale and Lucide icons.
                </figcaption>
              </figure>
            </Section>

            <Section
              id="phase-1"
              index="02"
              title="Phase 1: our own component library"
              lead="Main contributor on a team of four. Every token and component shipped to production."
            >
              <Prose>
                I audited what the product used, defined the tokens, designed the components, built
                the Figma library, and vibe coded a new button style myself, submitted for engineers to review.
              </Prose>
              <Sheet label="Phase 1 · Figma library" meta="Buttons">
                <h3 className="ds-h3">Button: every type and state on one sheet</h3>
                <p className="ds-caption mb-4 mt-1">
                  Default, hover, active, focus, disabled, loading and press.
                </p>
                <WideShot
                  src={img('phase1-buttons.webp')}
                  label="Phase 1 button component sheet"
                  alt="Figma component sheet of phase 1 buttons: Default, Secondary, Primary, Danger Default, Danger Primary and Danger Subtle types, each drawn in default, hover, active, focus, disabled, loading and press states, in Normal and Small sizes."
                />
              </Sheet>
              <div className="grid gap-5 lg:grid-cols-2 lg:items-start">
                <figure className="overflow-hidden rounded-lg border border-border bg-muted/20">
                  <img
                    src={img('new-look.png')}
                    alt="Two product screens rebuilt with the new components: a saved search with an article list, and an article view with summary, filters and labels."
                    className="block w-full"
                    draggable={false}
                  />
                  <figcaption className="px-4 py-3 text-xs leading-5 text-muted-foreground">
                    The components on product screens. Indicative direction, subject to further
                    development.
                  </figcaption>
                </figure>
                <Sheet label="Phase 1 · Adoption" meta="Code files that use each component">
                  <Bars rows={phase1Usage} colour="var(--ds-color-product-ube-500)" />
                  <p className="ds-caption mt-4">
                    The number of code files in the product that use each component, November 2026. The eleven highest of the 19 components counted. It counts files, not how often a component appears on screen.
                  </p>
                </Sheet>
              </div>
              <Prose>
                What it changed: engineers across several teams, including teams without front-end
                specialists, can pick the correct component in code with the design file as their
                reference.
              </Prose>
            </Section>

            <Section
              id="gaps"
              index="03"
              title="What phase 1 left open"
              lead="Phase 1 shipped, but design and code could still drift apart."
            >
              <Prose>
                Colours lived in a file someone edited by hand, and guidance lived in people&apos;s
                heads. Phase 2 is built to close those gaps. Each card shows phase 1, then phase 2,
                counted in the two code repositories in November 2026.
              </Prose>
              <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
                {beforeAfter.map((row) => (
                  <li key={row.area} className="rounded-xl border border-border bg-white/60 p-4">
                    <p className="text-xs font-medium uppercase tracking-[0.12em] text-primary-strong">{row.area}</p>
                    <p className="mt-3 flex items-center gap-2 text-2xl font-semibold">
                      <span className="text-muted-foreground">
                        <span className="sr-only">Phase 1: </span>
                        {row.before}
                      </span>
                      <ArrowRight size={18} aria-hidden="true" className="shrink-0 text-muted-foreground" />
                      <span>
                        <span className="sr-only">Phase 2: </span>
                        {row.after}
                      </span>
                    </p>
                    <p className="mt-1 text-xs leading-5 text-foreground">{row.unit}</p>
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">{row.detail}</p>
                  </li>
                ))}
              </ul>
            </Section>

            <Section
              id="phase-2"
              index="04"
              title="Phase 2: the token system"
              lead="A refreshed look, and tokens that AI agents can use as well as people."
            >
              <Prose>
                I am a secondary contributor, working with a lead designer and a lead engineer, on
                the audit, some of the components and the token rules. Phase 2 brings the product
                closer to the latest marketing website. Each token is named by its role, limited to the one use it is meant for (a text colour can only go on text), and carries a one-line description. The generated docs list every token’s name in code beside its Figma name, its value and that description, so an
                agent writing code has the same information a designer would use to choose it.
              </Prose>
              <Prose>
                Three layers. Primitives are raw values, such as one specific purple. Semantic roles are named purposes that point to a raw value, such as “primary button background”. Components use the named purposes and nothing else. The values below are the real ones.
              </Prose>
              <Sheet label="Phase 2 · Foundations" meta="From the Figma variables">
                <Foundations />
              </Sheet>
            </Section>

            <Section
              id="components"
              index="05"
              title="Components, built from the tokens"
              lead="Hover, press and tab through them: these are live, not screenshots."
            >
              <Sheet label="Components · Live specimens" meta="Rebuilt from Figma values">
                <ComponentBench />
              </Sheet>
              <Sheet label="Phase 2 · Figma library" meta="Button/Text">
                <h3 className="ds-h3">Button/Text: 108 of the 278 authored button variants</h3>
                <p className="ds-caption mb-4 mt-1">
                  Six types, six states and three sizes. Icon, dropdown and complex buttons and the
                  button group have their own sets.
                </p>
                <WideShot
                  src={img('phase2-buttons.png')}
                  label="Phase 2 button component set"
                  alt="Figma component set of phase 2 text buttons: primary, secondary, tertiary, accent, destructive and destructive-subtle types in medium, small and large sizes, each in default, hover, active, focused, disabled and loading states."
                />
              </Sheet>
            </Section>

            <Section
              id="rules"
              index="06"
              title="Rules the build enforces"
              lead="Automated checks (the build) run before any change is accepted, so no reviewer has to remember the rules."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                {guardRails.map((rule) => (
                  <div key={rule.title} className="flex flex-col rounded-xl border border-border bg-white/60 p-5">
                    <h3 className="text-base font-semibold">{rule.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{rule.body}</p>
                    <p className="mt-4 border-t border-border pt-3 text-xs leading-5 text-foreground">
                      <span className="font-semibold text-primary-strong">Build fails if </span>
                      {rule.fails}.
                    </p>
                  </div>
                ))}
              </div>
            </Section>

            <Section
              id="status"
              index="07"
              title="Where it stands"
              lead="Phase 2 is an early (alpha) release. Sixteen phase 1 components are still to rebuild, ranked by use."
            >
              <div className="grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-start">
                <Prose>
                  Phase 2 does not yet replace phase 1. The missing components are mostly pop-ups such as dialogs and tooltips, status messages such as toasts and spinners, and tables. To decide what to build next, they are ranked by how many code files in the product use each one. The chart shows the top eight.
                </Prose>
                <Sheet label="Phase 2 · Backlog" meta="Code files that use each missing component">
                  <Bars rows={backlog} colour="var(--ds-color-product-orchid-500)" />
                </Sheet>
              </div>
            </Section>

            <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
              <a
                href={homeHref}
                className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-strong focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <ArrowLeft size={16} aria-hidden="true" />
                Back to portfolio
              </a>
              <a
                href="https://gif-brush-79102480.figma.site"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary-strong hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-strong focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                View the phase 1 prototype
                <ExternalLink size={16} aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}
