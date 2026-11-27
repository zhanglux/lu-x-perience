'use client';

// ─────────────────────────────────────────────────────────────────────────────
// THE SEARCH EVOLUTION, as one page to scan.
//
// Written for someone with two minutes: the outcome and my role first, then the
// problem, then five design shifts with one visual each. The full story, with
// its animated demos, stays in the book (see StoryBook).
// ─────────────────────────────────────────────────────────────────────────────

import { useState, type ReactNode } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ChevronsLeftRight, MousePointerClick } from 'lucide-react';
import { Button, ToggleButton, ToggleButtonGroup, type Key } from 'react-aria-components';
import { AskTopicsDemo, RefineDemo, SCALE_ROWS, Shot, USE_CASES } from './demos';
import { HardcoverBook } from './HardcoverBook';
import { SteamMug } from './StoryBook';

const OUTCOMES = [
  { value: '$1.15M', label: 'of GRR influenced in Q3 2026 (beta)' },
  { value: '~35× cheaper', label: 'per 10k articles, from ~$80 to ~$2.30' },
  { value: '5 → 106 clients', label: 'we can confidently scale to, all $100k+ accounts' },
];

/** One half of the hero's before / after pair: a labelled card around a product screenshot. */
function HeroShot({
  label,
  by,
  after,
  children,
}: {
  label: string;
  by: string;
  after?: boolean;
  children: ReactNode;
}) {
  return (
    <figure
      className={`rounded-xl bg-white p-4 sm:p-5 ${
        after ? 'border-2 border-primary-strong' : 'border border-foreground/15'
      }`}
    >
      <figcaption className="mb-3 flex items-baseline justify-between gap-4 text-xs">
        <span
          className={`font-semibold uppercase tracking-[0.14em] ${
            after ? 'text-primary-strong' : 'text-[#6B5D52]'
          }`}
        >
          {label}
        </span>
        <span className="text-[#6B5D52]">{by}</span>
      </figcaption>
      {children}
    </figure>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary-strong">
      {children}
    </p>
  );
}

function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="space-y-2">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="max-w-3xl text-xl font-semibold leading-snug text-foreground sm:text-2xl">
        {title}
      </h2>
    </div>
  );
}

/**
 * Two screenshots in one frame, with a divider to drag: the "before" shows to
 * its left, the "after" to its right. A range input does the work, so it also
 * answers to the arrow keys.
 */
function BeforeAfter({
  before,
  after,
  caption,
}: {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  caption: ReactNode;
}) {
  const [pos, setPos] = useState(50);
  const tag =
    'pointer-events-none absolute top-3 rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] transition-opacity';
  return (
    <figure>
      <div className="relative aspect-[3/2] select-none overflow-hidden rounded-lg border border-foreground/10 bg-white">
        <img
          src={after.src}
          alt={after.alt}
          className="absolute inset-0 size-full object-contain p-3"
          draggable={false}
        />
        <div
          className="absolute inset-0 bg-[#22242E]"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <img
            src={before.src}
            alt={before.alt}
            className="absolute inset-0 size-full object-contain"
            draggable={false}
          />
        </div>
        <span
          className={`${tag} left-3 bg-white text-[#22242E]`}
          style={{ opacity: pos > 14 ? 1 : 0 }}
          aria-hidden="true"
        >
          Before
        </span>
        <span
          className={`${tag} right-3 bg-[#22242E] text-white`}
          style={{ opacity: pos < 86 ? 1 : 0 }}
          aria-hidden="true"
        >
          After
        </span>
        {/* The divider and its handle. */}
        <div
          className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-primary-strong"
          style={{ left: `${pos}%` }}
          aria-hidden="true"
        >
          <span className="absolute left-1/2 top-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-primary-strong text-white shadow-md">
            <ChevronsLeftRight className="size-4" strokeWidth={2.25} />
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Reveal before or after. Left shows more of the after screenshot, right more of the before."
          className="peer absolute inset-0 size-full cursor-ew-resize opacity-0"
        />
        <span className="pointer-events-none absolute inset-0 rounded-lg ring-2 ring-inset ring-primary-strong opacity-0 peer-focus-visible:opacity-100" />
      </div>
      <figcaption className="mt-2 text-[12px] leading-5 text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}

type Step = {
  src: string;
  alt: string;
  hint: string;
  /** The part of the screenshot that leads to the other step, in % of the image. */
  hotspot: { label: string; left: number; top: number; width: number; height: number };
};

/** Two screenshots of one flow. Clicking the marked part of each shows the other. */
function TwoStepShot({ steps, caption }: { steps: [Step, Step]; caption: ReactNode }) {
  const [at, setAt] = useState<0 | 1>(0);
  const step = steps[at];
  const h = step.hotspot;
  return (
    <figure>
      <p className="mb-3 flex items-center gap-2 text-xs text-muted-foreground" aria-live="polite">
        <MousePointerClick className="size-3.5 shrink-0 text-primary-strong" aria-hidden="true" />
        {step.hint}
      </p>
      <div className="relative overflow-hidden rounded-lg border border-foreground/10 bg-white">
        <img key={step.src} src={step.src} alt={step.alt} className="block w-full" draggable={false} />
        <Button
          onPress={() => setAt(at === 0 ? 1 : 0)}
          aria-label={h.label}
          className="absolute cursor-pointer rounded-lg outline-2 outline-offset-[-2px] outline-primary-strong/60 outline-dashed transition-colors data-hovered:bg-primary/15 data-hovered:outline-solid data-focus-visible:bg-primary/15 data-focus-visible:outline-solid"
          style={{
            left: `${h.left}%`,
            top: `${h.top}%`,
            width: `${h.width}%`,
            height: `${h.height}%`,
          }}
        />
      </div>
      <figcaption className="mt-2 text-[12px] leading-5 text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}

/**
 * Two screenshots as a pile of two cards: the "after" lies partly over the
 * "before". Clicking either card swaps which one is on top.
 */
function StackedShots({
  before,
  after,
  caption,
}: {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  caption: ReactNode;
}) {
  const [front, setFront] = useState<'before' | 'after'>('after');
  const card = (which: 'before' | 'after', shot: { src: string; alt: string }, place: string) => {
    const onTop = front === which;
    return (
      <ToggleButton
        isSelected={onTop}
        onChange={() => setFront(onTop ? (which === 'before' ? 'after' : 'before') : which)}
        aria-label={`${which === 'before' ? 'Before' : 'After'} screenshot, ${
          onTop ? 'on top' : 'underneath: bring to the top'
        }`}
        className={`group absolute cursor-pointer rounded-xl transition-[transform,filter,opacity] duration-300 ease-out data-focus-visible:outline-2 data-focus-visible:outline-solid data-focus-visible:outline-offset-2 data-focus-visible:outline-primary-strong motion-reduce:transition-none ${place} ${
          onTop
            ? 'z-[2] drop-shadow-[0_10px_18px_rgba(44,36,22,0.22)]'
            : 'z-[1] scale-[0.97] opacity-80 saturate-[0.7] data-hovered:opacity-100 data-hovered:saturate-100'
        }`}
      >
        <img src={shot.src} alt={shot.alt} className="block w-full" draggable={false} />
        <span
          className={`pointer-events-none absolute left-5 top-0 rounded-full px-2.5 py-1 shadow-sm text-[11px] font-medium uppercase tracking-[0.12em] ${
            which === 'before' ? 'bg-white text-[#22242E]' : 'bg-[#22242E] text-white'
          }`}
          aria-hidden="true"
        >
          {which === 'before' ? 'Before' : 'After'}
        </span>
      </ToggleButton>
    );
  };
  return (
    <figure>
      <div className="relative aspect-[10/7]">
        {card('before', before, 'left-0 top-0 w-[80%] origin-top-left')}
        {card('after', after, 'bottom-0 right-0 w-[72%] origin-bottom-right')}
      </div>
      <figcaption className="mt-2 flex items-start gap-1.5 text-[12px] leading-5 text-muted-foreground">
        <MousePointerClick className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}

/**
 * One visual slot with two views: the product screenshot (shown first) and a
 * recreation the reader can try.
 */
function ShotOrDemo({ shot, demo }: { shot: ReactNode; demo: ReactNode }) {
  const [view, setView] = useState<'shot' | 'demo'>('shot');
  const option = (value: 'shot' | 'demo', label: string) => (
    <ToggleButton
      id={value}
      className={`cursor-pointer rounded-full px-3 py-1 text-xs transition-colors ${
        view === value
          ? 'bg-foreground text-background'
          : 'text-muted-foreground data-hovered:text-foreground'
      }`}
    >
      {label}
    </ToggleButton>
  );
  return (
    <div>
      {/* A single-choice group: one view is always selected. The quick scan has
          no arrow-key paging, so the group's arrow-key focus handling is safe here. */}
      <ToggleButtonGroup
        aria-label="Choose what to show"
        selectionMode="single"
        disallowEmptySelection
        selectedKeys={[view]}
        onSelectionChange={(keys: Set<Key>) => {
          const [next] = keys;
          if (next === 'shot' || next === 'demo') setView(next);
        }}
        className="mb-3 flex w-fit items-center gap-0.5 rounded-full border border-foreground/15 p-0.5"
      >
        {option('shot', 'Screenshot')}
        {option('demo', 'Try it')}
      </ToggleButtonGroup>
      {view === 'shot' ? shot : demo}
    </div>
  );
}

/** One design shift: a short text column beside one large visual. */
function ShiftRow({
  n,
  when,
  from,
  to,
  problem,
  design,
  children,
}: {
  n: string;
  when: string;
  from: string;
  to: string;
  problem: string;
  design: string;
  children: ReactNode;
}) {
  return (
    <article className="grid gap-6 border-t border-foreground/10 pt-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-10">
      <div>
        <p className="flex items-baseline gap-3 text-xs text-muted-foreground">
          <span className="text-2xl font-semibold tabular-nums text-primary-strong">{n}</span>
          <span className="uppercase tracking-[0.14em]">{when}</span>
        </p>
        <h3 className="mt-3 text-lg font-semibold leading-snug text-foreground sm:text-xl">
          <span className="text-muted-foreground">From {from}</span>{' '}
          <span className="text-primary-strong" aria-hidden="true">
            →
          </span>
          <span className="sr-only"> to </span> {to}
        </h3>
        <dl className="mt-4 space-y-3 text-sm leading-6">
          <div>
            <dt className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              Problem
            </dt>
            <dd className="mt-0.5 text-foreground/90">{problem}</dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              What I designed
            </dt>
            <dd className="mt-0.5 text-foreground/90">{design}</dd>
          </div>
        </dl>
      </div>
      <div className="min-w-0">{children}</div>
    </article>
  );
}

export function ScanPage({
  basePath,
  bookLink,
  viewToggle,
}: {
  basePath: string;
  /** The Book / One page switch, shown top right. */
  viewToggle: ReactNode;
  /**
   * The way into the book: a link, or a button that switches the view in place.
   * The className styles hover with `data-hovered:`, so render a React Aria
   * Button or Link.
   */
  bookLink: (children: ReactNode, className: string) => ReactNode;
}) {
  const img = (name: string) => `${basePath}/search-2.0/${name}`;

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-3.5 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <nav
          aria-label="Breadcrumb"
          className="flex min-h-[30px] flex-wrap items-center gap-2 text-sm text-muted-foreground"
        >
          <a href={`${basePath}/`} className="transition-colors hover:text-primary-strong">
            Portfolio
          </a>
          <span aria-hidden="true">/</span>
          <span className="text-primary-strong" aria-current="page">
            Redesigning search
          </span>
        </nav>
        {viewToggle}
      </div>

      {/* ── Hero: the outcome, my role and the before / after, in one view ──── */}
      <header className="mt-10 grid items-start gap-x-12 gap-y-10 lg:mt-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <div>
          <p className="text-sm font-medium text-primary-strong">
            Signal AI · Search redesign · 2021–2026
          </p>
          <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
            Customers used to need us to set up their search. Now they ask a question.
          </h1>
          <p className="mt-6 text-base leading-7 text-foreground/80">
            As sole product designer for five years, I took search from keywords soup our teams
            cooked by hand to AI tags customers define in plain language.
          </p>
          <p className="mt-6 text-sm leading-6 text-muted-foreground">
            Sole product designer · 1 PM, 3–4 engineers · Discovery through delivery
          </p>
        </div>

        <div>
          <HeroShot label="Before" by="Written by our services team">
            <img
              src={img('structure-before.webp')}
              alt="The old search builder: a dark wall of about forty keyword, source and list chips, such as Business Wire, PR Newswire, Benzinga and Zacks, with no grouping or labels."
              className="block w-full rounded-lg bg-[#22242E]"
              draggable={false}
            />
          </HeroShot>
          <p className="flex items-center gap-2.5 px-5 py-4 text-sm font-medium text-primary-strong">
            <ArrowDown className="size-4 shrink-0" strokeWidth={2.25} aria-hidden="true" />
            Redesigned around the question the customer is asking
          </p>
          <HeroShot after label="After" by="Set up by the customer">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={img('ai-tag-questions.png')}
                alt="Setting up an AI tag called AI in the Workforce. The customer writes the key message in a sentence, then answers three questions about borderline articles with Tag or Don’t tag, and generates the rule."
                className="block max-h-[250px] w-full object-cover object-top"
                draggable={false}
              />
              <span
                className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent"
                aria-hidden="true"
              />
            </div>
          </HeroShot>
        </div>
      </header>

      <dl className="mt-10 grid gap-x-10 gap-y-6 border-t border-foreground/15 pt-8 sm:grid-cols-3">
        {OUTCOMES.map((o) => (
          <div key={o.label} className="flex flex-col-reverse justify-end">
            <dt className="mt-1.5 text-sm leading-6 text-foreground/80">{o.label}</dt>
            <dd className="text-3xl font-bold leading-tight tracking-tight text-primary-strong lg:text-4xl">
              {o.value}
            </dd>
          </div>
        ))}
      </dl>

      {/* ── The problem ────────────────────────────────────────────────────── */}
      <section aria-labelledby="problem-h" className="mt-20 space-y-6">
        <div className="space-y-2">
          <Eyebrow>The problem</Eyebrow>
          <h2
            id="problem-h"
            className="max-w-3xl text-xl font-semibold leading-snug text-foreground sm:text-2xl"
          >
            Search wasn’t built for users to own. We were asking them to become search architects.
          </h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-10">
          <div className="space-y-5">
            <div className="rounded-xl border border-border bg-white/60 p-5">
              <p className="text-4xl font-semibold leading-none tracking-tight text-primary-strong sm:text-5xl">
                7,560
              </p>
              <p className="mt-3 text-sm leading-6 text-foreground">
                hours Support &amp; CS spent logged into customer accounts in 12 months, much of it
                building searches.
              </p>
            </div>
            <ul className="space-y-3 text-sm leading-6 text-foreground/90">
              {[
                [
                  'Hundreds of keywords per search',
                  'Users typed every variation of a term so that no mention was missed.',
                ],
                [
                  'AI entities went unused',
                  'They were hard to discover and hard to trust, so users fell back on keywords.',
                ],
                [
                  'Layers of linked searches',
                  'One business question became several searches only their author understood.',
                ],
              ].map(([lead, rest]) => (
                <li key={lead} className="flex gap-3">
                  <span
                    className="mt-[9px] size-1.5 shrink-0 rounded-full bg-primary-strong"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-foreground">{lead}.</strong> {rest}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <Shot
            dark
            src={img('data-blizzard.webp')}
            alt="A dense network graph titled The Data Blizzard: clusters of red dots around the edge, labelled millions of keywords, joined by a tangle of cyan lines, labelled interconnected searches."
            caption={
              <>
                Every search in Signal. <span className="text-[#C2362F]">Red dots</span>: keywords.{' '}
                <span className="text-[#0E7C86]">Cyan lines</span>: searches that depend on other
                searches.
              </>
            }
          />
        </div>
      </section>

      {/* ── Five design shifts ─────────────────────────────────────────────── */}
      <section aria-labelledby="shifts-h" className="mt-20">
        <div className="mb-8 space-y-2">
          <Eyebrow>What I did</Eyebrow>
          <h2
            id="shifts-h"
            className="max-w-3xl text-xl font-semibold leading-snug text-foreground sm:text-2xl"
          >
            Five design shifts, each removing one thing users had to know.
          </h2>
        </div>
        <div className="space-y-10">
          <ShiftRow
            n="01"
            when="Year 2"
            from="recall"
            to="recognition"
            problem="Hundreds of trained entities and topics existed, but users could only find them by their exact name."
            design="Ask in your own words, such as “more topics similar to Environment”, and Signal suggests the trained topics to add in one click."
          >
            <ShotOrDemo
              shot={
                <Shot
                  src={img('similar-topics.png')}
                  alt="A saved search with three companies and the topic Environment. In a side panel the user asks for more topics similar to Environment, and the product suggests Climate Action, Renewable Energy and Sustainable Living, with Yes and No buttons to add them."
                  caption="Product screenshot. Asking for topics similar to “Environment” brings back three trained topics to add."
                />
              }
              demo={<AskTopicsDemo />}
            />
          </ShiftRow>

          <ShiftRow
            n="02"
            when="Year 3"
            from="query syntax"
            to="visual structure"
            problem="A complex query was a wall of text. You could build it, but a teammate couldn’t read it back."
            design="The single query string became labelled rows: companies, topics and exclusions."
          >
            <BeforeAfter
              before={{
                src: img('structure-before.webp'),
                alt: 'Before: the old search builder, a dark wall of about forty keyword, source and list chips with no grouping or labels.',
              }}
              after={{
                src: img('structure-after.png'),
                alt: 'After: the same kind of search as labelled rows. Organisations, Topics, Reading Lists and Keywords each have their own colour-coded row, with a highlighted Exclude section below holding its own keywords and organisations.',
              }}
              caption="Product screenshots. Drag the divider: one unlabelled wall of terms, then the same kind of search as labelled rows."
            />
          </ShiftRow>

          <ShiftRow
            n="03"
            when="Year 4"
            from="system categories"
            to="user-defined groups"
            problem="Users could only group entities of the same type, so one question still needed several linked searches."
            design="Groups that mix companies, products and sources, each with its own AND, OR and NOT."
          >
            <StackedShots
              before={{
                src: img('grouping-before.png'),
                alt: 'Before: three saved searches in the old dark builder, joined by red arrows. Each search pulls in other saved searches, such as Mars Food UK, which is itself built from separate Dolmio, Ben’s Original and Mars Food searches.',
              }}
              after={{
                src: img('grouping-after.png'),
                alt: 'After: one search in the new builder. A first group holds Mars, Inc., Mars Wrigley, Skittle and Mars (chocolate bar); a second group holds the sources Global Tier 1 and Premier Social. Each group has its own AND or OR switch, and a separate group lists the terms to exclude.',
              }}
              caption="Product screenshots. Click either one to bring it to the top: several linked searches, then one search with its own groups."
            />
          </ShiftRow>

          <ShiftRow
            n="04"
            when="Search 2.0"
            from="constructing queries"
            to="expressing intent"
            problem="People don’t come to Signal to build searches. They come with questions about their business."
            design="Two steps: define a content universe, then describe what you’re looking for. An AI tag classifies every article."
          >
            <TwoStepShot
              steps={[
                {
                  src: img('key-message-step1.png'),
                  alt: 'Key message analysis, step 1, filled in: the analysis is named Q3 product launch and is about Signal AI, with optional source filters and exclusions. A note says 7 days of coverage will be processed and new coverage keeps flowing in. Step 2, Key messages, is collapsed below.',
                  hint: 'Step 1 of 2: define the content. Click “Key messages” to go on.',
                  hotspot: { label: 'Open step 2: Key messages', left: 1.9, top: 85.4, width: 96, height: 11.4 },
                },
                {
                  src: img('key-message-step2.png'),
                  alt: 'Key message analysis, step 2: step 1 is collapsed to “Q3 product launch, Signal AI across all sources”. Below it, a key message is named and written word for word, with a Preview button.',
                  hint: 'Step 2 of 2: describe what you’re looking for. Click “Q3 product launch” to go back.',
                  hotspot: { label: 'Back to step 1: Q3 product launch', left: 1.5, top: 11.2, width: 97, height: 15 },
                },
              ]}
              caption="Product screenshots. Setting up an AI tag: first the content it applies to, then the key message in plain language."
            />
          </ShiftRow>

          <ShiftRow
            n="05"
            when="Latest"
            from="hoping the AI understands"
            to="validating that it does"
            problem="Users couldn’t tell whether the AI had understood a definition before applying it to thousands of articles."
            design="Inside setup, users mark real borderline articles as tag or don’t tag. Their answers refine the definition."
          >
            <ShotOrDemo
              shot={
                <Shot
                  src={img('refine-definition.png')}
                  alt="Key message analysis, step 2. On the left, under the key message “AI in the Workforce”, a panel asks three questions about borderline articles, each with Tag and Don’t tag buttons. On the right, a test panel lists sampled articles that would be tagged, 25 of 348, each with a Don’t tag button."
                  caption="Product screenshot. Questions about borderline articles on the left; a test on sampled articles on the right, before the tag is applied."
                />
              }
              demo={<RefineDemo />}
            />
          </ShiftRow>
        </div>
      </section>

      {/* ── Results ────────────────────────────────────────────────────────── */}
      <section aria-labelledby="results-h" className="mt-20 space-y-6">
        <div className="space-y-2">
          <Eyebrow>Results</Eyebrow>
          <h2
            id="results-h"
            className="max-w-3xl text-xl font-semibold leading-snug text-foreground sm:text-2xl"
          >
            Advanced Searches is live in Beta, and cheap enough to offer every $100k+ client.
          </h2>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-white/60">
          <p className="border-b border-foreground/10 px-5 py-3 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            End of Q2 compared with now
          </p>
          <dl>
            {SCALE_ROWS.map((row) => (
              <div
                key={row.what}
                className="grid items-baseline gap-x-6 gap-y-1 border-t border-foreground/10 px-5 py-4 first:border-t-0 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1.6fr)_auto]"
              >
                <dt className="text-sm leading-6 text-muted-foreground">{row.what}</dt>
                <dd className="flex flex-wrap items-baseline gap-x-2.5 text-sm">
                  <span className="text-muted-foreground">
                    <span className="sr-only">End of Q2: </span>
                    {row.before}
                  </span>
                  <span className="text-primary-strong" aria-hidden="true">
                    →
                  </span>
                  <span className="text-base font-semibold text-foreground">
                    <span className="sr-only">Now: </span>
                    {row.now}
                  </span>
                </dd>
                <dd className="w-fit rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-primary-strong">
                  {row.change}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {USE_CASES.map((c) => (
            <section key={c.title} className="rounded-xl border border-border bg-white/60 p-5">
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                Client use case
              </p>
              <h3 className="mt-1.5 text-base font-semibold leading-snug text-foreground">
                {c.title}
              </h3>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">{c.stake}</p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {(
                  [
                    ['Before', c.before, false],
                    ['Now', c.now, true],
                  ] as const
                ).map(([label, items, now]) => (
                  <div key={label} className={now ? 'border-l-2 border-primary-strong pl-3' : ''}>
                    <p
                      className={`text-[11px] uppercase tracking-[0.12em] ${
                        now ? 'font-medium text-primary-strong' : 'text-muted-foreground'
                      }`}
                    >
                      {label}
                    </p>
                    <ul className="mt-1.5 space-y-2">
                      {items.map(([lead, rest]) => (
                        <li key={lead} className="text-xs leading-[1.6] text-foreground/90">
                          <strong className="block font-semibold text-foreground">{lead}</strong>
                          {rest}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      {/* ── The way into the book ──────────────────────────────────────────── */}
      <section
        aria-labelledby="book-invite"
        className="group/invite mt-20 grid items-center gap-x-10 gap-y-6 overflow-hidden rounded-2xl border border-foreground/10 bg-gradient-to-b from-secondary to-[#F1D9C8] px-6 py-8 sm:grid-cols-[auto_minmax(0,1fr)] sm:px-10"
      >
        <div className="mx-auto h-52 w-44 transition-transform duration-500 ease-out group-hover/invite:-translate-y-1.5 group-hover/invite:rotate-[-2deg] motion-reduce:transition-none sm:mx-0">
          <HardcoverBook className="size-full [--u:5.5px]" />
        </div>
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-primary-strong">
            Got time for a coffee?
          </p>
          <h2 id="book-invite" className="mt-2 text-xl font-semibold leading-snug text-foreground">
            Want the reasoning behind each step?
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-foreground/80">
            The full story is told as a short book, with demos you can try.
          </p>
          {bookLink(
            <>
              <SteamMug steaming className="size-[18px]" />
              Read it as a book
              <ArrowRight
                className="size-4 transition-transform group-data-hovered/cta:translate-x-1 motion-reduce:transition-none"
                strokeWidth={2.25}
                aria-hidden="true"
              />
            </>,
            'group/cta mt-5 inline-flex cursor-pointer items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-shadow data-hovered:shadow-lg',
          )}
        </div>
      </section>

      {/* ── The way out ────────────────────────────────────────────────────── */}
      <footer className="mt-10 border-t border-foreground/10 pt-6">
        <a
          href={`${basePath}/`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline decoration-primary decoration-2 underline-offset-4 transition-colors hover:decoration-foreground"
        >
          <ArrowLeft className="size-4" strokeWidth={2.25} aria-hidden="true" /> Back to portfolio
        </a>
      </footer>
    </div>
  );
}
