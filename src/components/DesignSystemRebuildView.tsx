import { Fragment, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight, Bird, Egg, ExternalLink, Feather, Origami, Sunrise } from 'lucide-react';
import { siteBasePath as defaultBasePath } from '@/lib/siteBasePath';
import {
  Feathers,
  Plumage,
  QuickDemo,
  SectionNav,
  ComponentBench,
  Sheet,
} from './design-system/SpecSheet';
import { PlumageIcon, TwigIcon } from './design-system/AviaryIcons';
import { backlog, phase1Usage } from './design-system/data';
import { Link } from './aria';

interface DesignSystemRebuildViewProps {
  siteBasePath?: string;
}

const tags = ['Design systems', 'Design tokens', 'React Aria', 'Accessibility'];

const sections = [
  { id: 'before-dawn', label: 'Before dawn · Phase 1' },
  { id: 'feathers', label: 'Feathers · Raw tokens' },
  { id: 'plumage', label: 'Plumage · Token rules' },
  { id: 'twigs', label: 'Twigs · Components' },
  { id: 'flight', label: 'Flight · Build rules' },
  { id: 'fledglings', label: 'Fledglings · What’s next' },
];

/** The three layers of the system, in the order each leans on the one before. */
const layers = [
  {
    id: 'feathers',
    icon: <Feather size={20} aria-hidden="true" />,
    name: 'Feathers',
    plain: 'primitive tokens',
    detail: 'Raw values: one specific purple, one spacing step.',
  },
  {
    id: 'plumage',
    icon: <PlumageIcon size={20} />,
    name: 'Plumage',
    plain: 'semantic tokens',
    detail: 'A feather with a job, such as “primary button background”.',
  },
  {
    id: 'twigs',
    icon: <TwigIcon size={20} />,
    name: 'Twigs',
    plain: 'components',
    detail: 'Buttons, badges and inputs. They use plumage and nothing else.',
  },
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
    phase: 'Phase 2, Arla',
    title: 'A new look, and tokens that people and AI agents can both use',
    role: 'Secondary contributor',
    team: 'With a lead designer and a lead engineer',
    work: 'Audit, defining the token rules, and updating components such as Card, Menu and Tags and patterns such as the side navigation.',
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
  icon,
  name,
  plain,
  lead,
  myPart,
  children,
}: {
  id: string;
  index: string;
  icon: ReactNode;
  /** The aviary name, as the design system's own docs use it. */
  name: string;
  /** What that name means in plain terms. */
  plain: string;
  lead: string;
  myPart?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-16 space-y-5 lg:scroll-mt-8">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            /* off-system: the Arla brand gradient, shown as Arla’s own mark. */
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-card bg-[linear-gradient(135deg,#C53030,#913096_50%,#4F34D9)] text-white"
          >
            {icon}
          </span>
          <h2 id={`${id}-h`} className="text-sm font-medium uppercase tracking-eyebrow text-primary-strong">
            <span aria-hidden="true">{index} · </span>
            {name}
            <span className="font-normal normal-case tracking-normal text-muted-foreground"> · {plain}</span>
          </h2>
        </div>
        <p className="text-xl font-semibold leading-snug text-foreground sm:text-2xl">{lead}</p>
        {myPart ? (
          <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm leading-6">
            <span className="rounded-full bg-foreground px-2.5 py-0.5 text-xs font-medium text-background">My part</span>
            <span>{myPart}</span>
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function Prose({ children }: { children: ReactNode }) {
  return <p className="text-base leading-7 text-foreground">{children}</p>;
}

function SubHead({ children }: { children: ReactNode }) {
  return <h3 className="pt-4 text-base font-semibold text-foreground">{children}</h3>;
}

function WideShot({ src, alt, label }: { src: string; alt: string; label: string }) {
  return (
    <div
      /* off-system: Arla’s focus colour, inside the Arla specimens. */
      className="overflow-x-auto rounded-control focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#211073]"
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
          <span className="block h-3 rounded-chip" style={{ background: 'var(--ds-surface-sunken)' }} aria-hidden="true">
            <span className="block h-3 rounded-chip" style={{ width: `${(u.files / max) * 100}%`, background: colour }} />
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
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@400;500;600&display=swap"
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

          {/* off-system: Arla brand. Dawn: the colours of the Arla cover, darkened so white text passes contrast. */}
          <header className="relative overflow-hidden rounded-panel bg-[linear-gradient(110deg,#C53030,#913096_48%,#4F34D9)] px-6 py-8 text-white sm:px-10 sm:py-12">
            <Bird
              aria-hidden="true"
              strokeWidth={1.25}
              className="pointer-events-none absolute -bottom-6 -right-4 h-44 w-44 text-white/20 sm:h-64 sm:w-64"
            />
            <div className="relative space-y-5">
              <p className="flex items-center gap-2 text-sm font-medium">
                <Sunrise size={18} aria-hidden="true" className="shrink-0" />
                Arla, Signal AI&apos;s design system
              </p>
              <h1 className="max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">
                Replacing Material UI with our own design system
              </h1>
              <p className="max-w-2xl text-base leading-7 text-white">
                Arla means &ldquo;early morning&rdquo;, after the first birdsong at dawn. The system names
                its parts after birds, so this page does too, with the plain name beside each one.
              </p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/60 px-2.5 py-1 text-xs text-white">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </header>

          <p className="text-base leading-7 text-foreground">
            Signal AI rebranded and the product&apos;s borrowed UI kit could not follow. I was the main
            contributor to the library that replaced it. I am now a secondary contributor to its
            successor, Arla, which refreshes the look to match the latest marketing website and
            redefines the tokens so that AI agents can use them as well as people.
          </p>

          {/* Summary: everything a quick reader needs. */}
          <div className="grid gap-4 lg:grid-cols-2">
            {phases.map((p) => (
              <div key={p.phase} className="rounded-card border border-border bg-white/60 p-5">
                <p className="text-eyebrow font-medium uppercase tracking-eyebrow text-primary-strong">
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
              <div key={f.label} className="flex flex-col-reverse justify-end rounded-card border border-border bg-white/60 p-4">
                <dt className="mt-1 text-xs leading-5 text-muted-foreground">{f.label}</dt>
                <dd className="text-3xl font-semibold text-foreground">{f.value}</dd>
              </div>
            ))}
          </dl>

          <Sheet label="Built from the system" meta="Try it">
            <QuickDemo moreHref="#twigs" />
          </Sheet>

          {/* The one diagram: how the parts of Arla lean on each other. */}
          <div className="rounded-card border border-border bg-white/60 p-5">
            <p className="text-eyebrow font-medium uppercase tracking-eyebrow text-primary-strong">
              How Arla is built
            </p>
            <p className="mt-2 text-base font-semibold">Each part leans on the one before it.</p>
            <ol className="mt-4 grid gap-3 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] md:items-stretch">
              {layers.map((layer, i) => (
                <Fragment key={layer.id}>
                  {i > 0 ? (
                    <li aria-hidden="true" className="flex items-center justify-center text-muted-foreground">
                      <ArrowRight size={18} className="rotate-90 md:rotate-0" />
                    </li>
                  ) : null}
                  <li>
                    <Link
                      href={`#${layer.id}`}
                      className="flex h-full items-start gap-3 rounded-control border border-border bg-background p-4 transition-colors data-hovered:border-primary-strong outline-none data-focus-visible:ring-2 data-focus-visible:ring-primary-strong"
                    >
                      <span className="mt-0.5 shrink-0 text-primary-strong">{layer.icon}</span>
                      <span>
                        <span className="block text-sm font-semibold">
                          {layer.name}
                          <span className="font-normal text-muted-foreground"> · {layer.plain}</span>
                        </span>
                        <span className="mt-1 block text-xs leading-5 text-muted-foreground">{layer.detail}</span>
                      </span>
                    </Link>
                  </li>
                </Fragment>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-12 lg:grid lg:grid-cols-[176px_minmax(0,1fr)] lg:gap-10">
          <SectionNav items={sections} />

          <div className="mt-10 space-y-16 lg:mt-0">
            <Section
              id="before-dawn"
              index="01"
              icon={<Sunrise size={20} />}
              name="Before dawn"
              plain="Phase 1, before Arla"
              lead="The brand changed, and Material UI could not follow it. So we built our own library."
              myPart="Main contributor on a team of four: audit, tokens, component design, the Figma library, and a vibe-coded button style."
            >
              <Prose>
                Material UI made sense at the start: a complete set of components and patterns teams
                already understood. After the rebrand, every custom override meant fighting its
                styling. We chose React Aria, an open-source toolkit from Adobe, for behaviour: it
                handles how components work for keyboard, touch and screen-reader users, and leaves
                the look to us. Colour, spacing and typography were built from the brand guidelines,
                and icons came from Lucide.
              </Prose>
              <figure className="overflow-hidden rounded-control border border-border bg-muted/20">
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

              <SubHead>What I built, and where it went</SubHead>
              <Prose>
                I audited what the product used, defined the tokens, designed the components, built
                the Figma library, and vibe coded a new button style myself, submitted for engineers
                to review. Every token and component shipped to production.
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
                <figure className="overflow-hidden rounded-control border border-border bg-muted/20">
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
                    The number of code files in the product that use each component, November 2026.
                    The eleven highest of the 19 components counted. It counts files, not how often a
                    component appears on screen.
                  </p>
                </Sheet>
              </div>
              <Prose>
                What it changed: engineers across several teams, including teams without front-end
                specialists, can pick the correct component in code with the design file as their
                reference.
              </Prose>

              <SubHead>What phase 1 left open</SubHead>
              <Prose>
                Phase 1 shipped, but design and code could still drift apart. Colours lived in a file
                someone edited by hand, and guidance lived in people&apos;s heads. Arla is built to
                close those gaps. Each card shows phase 1, then Arla, counted in the two code
                repositories in November 2026.
              </Prose>
              <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
                {beforeAfter.map((row) => (
                  <li key={row.area} className="rounded-card border border-border bg-white/60 p-4">
                    <p className="text-eyebrow font-medium uppercase tracking-eyebrow text-primary-strong">{row.area}</p>
                    <p className="mt-3 flex items-center gap-2 text-2xl font-semibold">
                      <span className="text-muted-foreground">
                        <span className="sr-only">Phase 1: </span>
                        {row.before}
                      </span>
                      <ArrowRight size={18} aria-hidden="true" className="shrink-0 text-muted-foreground" />
                      <span>
                        <span className="sr-only">Arla: </span>
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
              id="feathers"
              index="02"
              icon={<Feather size={20} />}
              name="Feathers"
              plain="Primitive tokens"
              lead="The raw values: eight colour ramps and fourteen spacing steps. Never used on their own."
            >
              <Prose>
                Arla brings the product closer to the latest marketing website. Its tokens come in
                layers. Feathers are raw values, such as one specific purple. Plumage is a named
                purpose that points to a feather, such as &ldquo;primary button background&rdquo;.
                Twigs, the components, use plumage and nothing else. Pick a feather below to follow
                it up through the layers. The values are the real ones.
              </Prose>
              <Sheet label="Arla · Feathers" meta="From the Figma variables">
                <Feathers />
              </Sheet>
            </Section>

            <Section
              id="plumage"
              index="03"
              icon={<PlumageIcon size={20} />}
              name="Plumage"
              plain="Semantic tokens"
              lead="Feathers with a job. Each token is named for what it does, so AI agents can use it as well as people."
              myPart="Defining the token rules, as a secondary contributor with a lead designer and a lead engineer."
            >
              <Prose>
                Each token is named by its role, limited to the one use it is meant for (a text colour
                can only go on text), and carries a one-line description. The generated docs list
                every token&apos;s name in code beside its Figma name, its value and that description,
                so an agent writing code has the same information a designer would use to choose it.
              </Prose>
              <Sheet label="Arla · Plumage" meta="Token rules">
                <Plumage />
              </Sheet>
            </Section>

            <Section
              id="twigs"
              index="04"
              icon={<TwigIcon size={20} />}
              name="Twigs"
              plain="Components"
              lead="Live components, starting with two I worked on. Hover, press and tab through them."
              myPart="Updating components such as Card, Menu and Tags, and patterns such as the side navigation."
            >
              <Sheet label="Arla · Twigs" meta="Rebuilt from Figma values">
                <ComponentBench />
              </Sheet>
            </Section>

            <Section
              id="flight"
              index="05"
              icon={<Origami size={20} />}
              name="Flight"
              plain="Code and releases"
              lead="Automated checks (the build) run before any change is accepted, so no reviewer has to remember the rules."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                {guardRails.map((rule) => (
                  <div key={rule.title} className="flex flex-col rounded-card border border-border bg-white/60 p-5">
                    <h3 className="text-base font-semibold">{rule.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-6 text-foreground">{rule.body}</p>
                    <p className="mt-4 border-t border-border pt-3 text-xs leading-5 text-foreground">
                      <span className="font-semibold text-primary-strong">Build fails if </span>
                      {rule.fails}.
                    </p>
                  </div>
                ))}
              </div>
            </Section>

            <Section
              id="fledglings"
              index="06"
              icon={<Egg size={20} />}
              name="Fledglings"
              plain="What is still to come"
              lead="Arla is an early (alpha) release. Sixteen phase 1 components are still to rebuild, ranked by use."
            >
              <div className="grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-start">
                <Prose>
                  Arla does not yet replace phase 1. The missing components are mostly pop-ups such
                  as dialogs and tooltips, status messages such as toasts and spinners, and tables.
                  To decide what to build next, they are ranked by how many code files in the product
                  use each one. The chart shows the top eight.
                </Prose>
                <Sheet label="Arla · Backlog" meta="Code files that use each missing component">
                  <Bars rows={backlog} colour="var(--ds-color-product-orchid-500)" />
                </Sheet>
              </div>
            </Section>

            <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
              <Link
                href={homeHref}
                className="inline-flex items-center gap-2 rounded-control border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors data-hovered:border-primary data-hovered:text-primary-strong outline-none data-focus-visible:ring-2 data-focus-visible:ring-primary-strong data-focus-visible:ring-offset-2 data-focus-visible:ring-offset-background"
              >
                <ArrowLeft size={16} aria-hidden="true" />
                Back to portfolio
              </Link>
              <Link
                href="https://gif-brush-79102480.figma.site"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary-strong data-hovered:underline outline-none data-focus-visible:ring-2 data-focus-visible:ring-primary-strong data-focus-visible:ring-offset-2 data-focus-visible:ring-offset-background"
              >
                View the phase 1 prototype
                <ExternalLink size={16} aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </Link>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}
