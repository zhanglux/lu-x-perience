'use client';

// Illustrations for The Search Evolution. The interactive ones are simplified
// recreations of the product behaviour, built for this page and labelled as
// such; the screenshots are the real product.

import { Fragment, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { usePageActive } from './StoryBook';

// Signal AI brand colours, used inside the product recreations only.
const ACCENT = '#6446FF'; // Neptune
const CORAL = '#FFA0A0';

// ── Shared pieces ────────────────────────────────────────────────────────────

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const fn = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);
  return reduced;
}

/** Card that frames an interactive recreation. */
export function DemoFrame({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <figure className="overflow-hidden rounded-lg border bg-white" style={{ borderColor: `${ACCENT}40` }}>
      <div
        className="flex items-center justify-between gap-3 border-b px-4 py-2.5 text-xs"
        style={{ borderColor: `${ACCENT}22`, background: `${ACCENT}0A` }}
      >
        <span className="font-medium uppercase tracking-[0.12em]" style={{ color: ACCENT }}>
          {title}
        </span>
        {hint && <span className="text-muted-foreground">{hint}</span>}
      </div>
      <div className="p-4">{children}</div>
      <figcaption className="border-t border-foreground/10 px-4 py-2 text-[11px] text-muted-foreground">
        Simplified recreation with example data
      </figcaption>
    </figure>
  );
}

function Chip({
  label,
  kind,
  ghost,
  exclude,
  onRemove,
}: {
  label: string;
  kind?: string;
  ghost?: boolean;
  /** An exclusion: the site's terracotta, with a minus sign in front. */
  exclude?: boolean;
  onRemove?: () => void;
}) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs text-foreground"
      style={{
        borderColor: exclude ? 'var(--primary)' : ghost ? 'rgba(44,36,22,0.2)' : ACCENT,
        background: exclude ? 'color-mix(in srgb, var(--primary) 16%, transparent)' : ghost ? 'transparent' : `${ACCENT}12`,
      }}
    >
      {exclude && (
        <>
          <span className="font-bold leading-none text-primary-strong" aria-hidden="true">
            −
          </span>
          <span className="sr-only">Exclude: </span>
        </>
      )}
      {label}
      {kind && <span className="text-[11px] text-muted-foreground">· {kind}</span>}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${label}`}
          className="-mr-1 ml-0.5 text-muted-foreground hover:text-foreground"
        >
          ×
        </button>
      )}
    </span>
  );
}

function OperatorToggle({
  value,
  onChange,
  label,
}: {
  value: 'AND' | 'OR';
  onChange?: (v: 'AND' | 'OR') => void;
  label: string;
}) {
  if (!onChange) {
    return (
      <span
        className="rounded px-2 py-0.5 text-[11px] font-semibold tracking-wider"
        style={{ background: `${ACCENT}1A`, color: ACCENT }}
      >
        {value}
      </span>
    );
  }
  return (
    <button
      type="button"
      onClick={() => onChange(value === 'AND' ? 'OR' : 'AND')}
      aria-label={`${label}: ${value}. Click to switch.`}
      className="cursor-pointer rounded px-2 py-1 text-[11px] font-semibold tracking-wider underline decoration-dotted underline-offset-2 transition-opacity hover:opacity-75 focus-visible:outline focus-visible:outline-2"
      style={{ background: `${ACCENT}1A`, color: ACCENT, outlineColor: ACCENT }}
    >
      {value}
    </button>
  );
}

/** A real product screenshot that opens larger when clicked. */
export function Shot({
  src,
  alt,
  caption,
  dark,
  crop,
}: {
  src: string;
  alt: string;
  caption: ReactNode;
  dark?: boolean;
  /** Show only the top of a tall screenshot on the page; the enlarged view is whole. */
  crop?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  // Closing hands focus back to the thumbnail that opened the image.
  const close = () => {
    setOpen(false);
    trigger.current?.focus();
  };
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <figure>
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Enlarge image: ${alt}`}
        className={`block w-full cursor-zoom-in overflow-hidden rounded-lg border border-foreground/10 transition-shadow hover:shadow-md ${
          dark ? 'bg-[#1b1b1b]' : 'bg-white'
        }`}
      >
        <img
          src={src}
          alt={alt}
          className={`w-full ${crop ? 'max-h-[176px] object-cover object-top' : ''}`}
          // Decode before painting, so a page never shows an empty frame mid-turn.
          decoding="sync"
          draggable={false}
        />
      </button>
      <figcaption className="mt-2 text-[12px] leading-5 text-muted-foreground">{caption}</figcaption>
      {open &&
        // In a portal: the pages are 3D-transformed, which would otherwise trap a
        // fixed overlay inside the page instead of covering the window.
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            onClick={(e) => {
              // React events bubble through portals; keep this from turning the page.
              e.stopPropagation();
              close();
            }}
            className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-[#2C2416]/85 p-4 sm:p-10"
          >
            <img src={src} alt={alt} className="max-h-full max-w-full rounded-lg shadow-2xl" />
            <button
              type="button"
              autoFocus
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              className="absolute right-5 top-5 cursor-pointer rounded-full bg-background px-3 py-1.5 text-xs text-foreground"
            >
              Close
            </button>
          </div>,
          document.body,
        )}
    </figure>
  );
}

// ── Chapter 1: the team and the cost ─────────────────────────────────────────

export function RoleAndCost() {
  const team = [
    { who: 'Me', what: 'Solo product designer', me: true },
    { who: '1', what: 'Product Manager' },
    { who: '3–4', what: 'Engineers' },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-8">
      <div>
        <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          The Signal Web App team
        </p>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {team.map((t) => (
            <div
              key={t.what}
              className={`rounded-lg border p-4 ${
                t.me ? 'border-primary-strong bg-primary/10' : 'border-foreground/10'
              }`}
            >
              <p className="text-2xl font-semibold leading-none text-foreground">{t.who}</p>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">{t.what}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-lg border border-foreground/10 p-6">
        <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          The business impact was significant
        </p>
        <p className="mt-3 text-5xl font-semibold leading-none tracking-tight text-primary-strong">
          7,560
        </p>
        <p className="mt-3 text-sm leading-6 text-foreground">
          hours Support &amp; CS team spent impersonating customers in the previous 12 months
        </p>
        <p className="mt-2 text-xs leading-[1.7] text-muted-foreground">
          Logging into customer accounts to help them carry out tasks, with much of that time spent
          building searches.
        </p>
        <p className="mt-3 border-t border-foreground/10 pt-3 text-[13.5px] leading-[1.8] text-foreground/90">
          It was clear that search wasn’t just a usability problem. It was creating operational
          costs and preventing customers from becoming self-sufficient.
        </p>
      </div>
    </div>
  );
}

// ── Business impact ──────────────────────────────────────────────────────────

const SCALE_ROWS = [
  {
    what: 'Clients we could confidently scale to',
    before: '5 customers',
    now: 'All $100k+ clients (106)',
    change: '~21x more',
  },
  { what: 'Cost per 10k articles', before: '~$80', now: '~$2.30', change: '~35x cheaper' },
  {
    what: 'Cost of servicing an example measurement use case',
    before: '~$36k a year',
    now: '~$1k a year',
    change: '~35x cheaper',
  },
];

export function BusinessImpact() {
  return (
    <div className="flex h-full flex-col justify-center gap-5">
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-primary-strong">
          Business impact
        </p>
        <h2 className="mt-2 text-[23px] font-semibold leading-[1.2] tracking-tight text-foreground">
          Advanced Searches is live in Beta
        </h2>
      </div>
      <div className="rounded-lg border border-foreground/10 p-5">
        <p className="text-5xl font-semibold leading-none tracking-tight text-primary-strong">
          $1.15M
        </p>
        <p className="mt-3 text-sm leading-6 text-foreground">of GRR influenced in Q3</p>
        <p className="mt-1 text-xs leading-[1.7] text-muted-foreground">
          And we now have the ability to scale to all $100k+ clients.
        </p>
      </div>
      <div className="rounded-lg border border-foreground/10 px-5 py-4">
        <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          End of Q2 compared with now
        </p>
        <dl className="mt-1">
          {SCALE_ROWS.map((row) => (
            <div
              key={row.what}
              className="border-t border-foreground/10 py-3 first:border-t-0 last:pb-0"
            >
              <dt className="text-xs leading-5 text-muted-foreground">{row.what}</dt>
              <dd className="mt-1 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                <span className="text-[13px] text-muted-foreground">
                  <span className="sr-only">End of Q2: </span>
                  {row.before}
                </span>
                <span className="text-primary-strong" aria-hidden="true">
                  →
                </span>
                <span className="text-[15px] font-semibold text-foreground">
                  <span className="sr-only">Now: </span>
                  {row.now}
                </span>
                <span className="ml-auto rounded-full bg-primary/15 px-2.5 py-0.5 text-[11px] font-medium text-primary-strong">
                  {row.change}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

const USE_CASES = [
  {
    title: 'Clearing adverts out of a client’s coverage',
    stake: '30,000 articles in 30 days, where 2 in 5 were adverts.',
    before: [
      ['Manual tagging', 'Too much data, too slow, too costly, never “real time”.'],
      ['Keyword search', 'Adverts change too fast for any Boolean to keep up.'],
    ],
    now: [
      ['One prompt', 'Flags every advert across the client’s coverage.'],
      ['Quick, clean export', 'Adverts can be filtered out straight from the CSV export.'],
    ],
  },
  {
    title: 'Tracking the narratives a client reports to its CEO',
    stake: '6 key narratives, reported to the CEO.',
    before: [
      ['Analyst tracking', 'Too costly, and too slow for near real-time reporting.'],
      ['Keyword matching', 'Too precise to catch the nuance of a message.'],
    ],
    now: [
      ['Six AI tags', 'One per narrative, refined in a few quick iterations.'],
      ['Near real time', 'Narrative pull-through tracked on repeat.'],
    ],
  },
];

/** Two client use cases, anonymised: how the job was done before, and now. */
export function BeforeAndNow() {
  return (
    <div className="flex h-full flex-col justify-center gap-4">
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-primary-strong">
        Before and now · two client use cases
      </p>
      {USE_CASES.map((c) => (
        <section key={c.title} className="rounded-lg border border-foreground/10 p-4">
          <h3 className="text-[15px] font-semibold leading-snug text-foreground">{c.title}</h3>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">{c.stake}</p>
          <div className="mt-3 grid grid-cols-2 gap-4">
            {(
              [
                ['Before', c.before, false],
                ['Now, with Advanced Searches', c.now, true],
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
  );
}

// ── Chapter 2: recall → recognition ──────────────────────────────────────────

const VOCABULARY: Record<string, string[]> = {
  environment: ['Climate Change', 'Eco Energy', 'Sustainability'],
};

export function SuggestDemo() {
  const [text, setText] = useState('environment');
  const [picked, setPicked] = useState<string[]>([]);
  const word = text.trim().toLowerCase();
  const suggestions = (VOCABULARY[word] ?? []).filter((s) => !picked.includes(s));

  return (
    <DemoFrame title="Search" hint="Click a suggestion">
      <div
        className="flex flex-wrap items-center gap-2 rounded-lg border px-3 py-2"
        style={{ borderColor: `${ACCENT}55` }}
      >
        {picked.map((s) => (
          <Chip
            key={s}
            label={s}
            kind="Topic"
            onRemove={() => setPicked((p) => p.filter((x) => x !== s))}
          />
        ))}
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="Type a word in your own vocabulary"
          className="min-w-24 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          placeholder="Type a word…"
        />
      </div>

      <div className="mt-3 min-h-[104px]">
        {suggestions.length > 0 ? (
          <>
            <p className="mb-2 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              Trained topics related to “{word}”
            </p>
            <ul className="space-y-1.5">
              {suggestions.map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    onClick={() => setPicked((p) => [...p, s])}
                    className="flex w-full items-center justify-between rounded-md border border-foreground/10 px-3 py-2 text-left text-sm text-foreground transition-colors hover:border-[#6446FF] hover:bg-[#6446FF0D]"
                  >
                    <span>{s}</span>
                    <span className="text-xs" style={{ color: ACCENT }}>
                      + Add
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : picked.length > 0 && VOCABULARY[word] ? (
          <p className="text-sm leading-6 text-muted-foreground">
            All three added, and you never had to know what they were called.
          </p>
        ) : (
          <p className="text-sm leading-6 text-muted-foreground">
            This recreation only knows one word. Type{' '}
            <button
              type="button"
              onClick={() => setText('environment')}
              className="underline decoration-dotted underline-offset-2"
              style={{ color: ACCENT }}
            >
              environment
            </button>{' '}
            to see the suggestions.
          </p>
        )}
      </div>
    </DemoFrame>
  );
}

// ── Chapter 3: query string → labelled rows ──────────────────────────────────

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-3 border-t border-foreground/10 py-2.5 first:border-t-0">
      <span className="w-24 shrink-0 pt-1 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  );
}

// The terms in the search-builder screenshot on the Chapter 1 spread, as one string.
const QUERY_TERMS = [
  '"Earnings Call (Headline)"',
  '"Completes Overnight Offering (Headline)"',
  '"Earnings Call Transcript (Headline)"',
  '"Business Wire"',
  '"Business wire"',
  'https://www.businesswire.com/',
  'PRNewswire',
  '"PR Newswire"',
  '"PR Newswire (UK Disclosure)"',
  '"The Fly"',
  '"compiled by The Fly"',
  '"Zacks Consensus Estimate"',
  '"Zacks Equity Research"',
  '"Zacks Bull and Bear of the Day"',
  'Benzinga',
  'benzinga',
  'Benzinga.com',
  'Bizinga',
  'Bizinga.com',
  'InvestingPro',
  'Investing.com',
  'TipRanks',
  'Tipranks',
  'TipRanks.com',
  '"Insider Monkey"',
  '"GLOBE NEWSWIRE"',
  '"Globe Newswire"',
  '"Newswires to Exclude"',
  '"Stock tickers"',
];

export function StructureDemo() {
  const [view, setView] = useState<'string' | 'rows'>('string');
  return (
    <DemoFrame title="One search, two views" hint="Switch the view">
      <div
        className="mb-4 inline-flex rounded-full border p-0.5 text-xs"
        style={{ borderColor: `${ACCENT}40` }}
        role="group"
        aria-label="How the search is shown"
      >
        {(
          [
            ['string', 'Query string'],
            ['rows', 'Labelled rows'],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setView(key)}
            aria-pressed={view === key}
            className="rounded-full px-3 py-1 transition-colors"
            style={
              view === key ? { background: ACCENT, color: '#fff' } : { color: 'var(--foreground)' }
            }
          >
            {label}
          </button>
        ))}
      </div>

      <div className="min-h-[200px]">
        {view === 'string' ? (
          <p key="s" className="book-fade break-words text-[11px] leading-5 text-muted-foreground">
            {QUERY_TERMS.map((t, i) => (
              <span key={t}>
                {i > 0 && <span className="text-foreground/70"> OR </span>}
                {t}
              </span>
            ))}
          </p>
        ) : (
          <div key="r" className="book-fade">
            <Row label="Headlines">
              <Chip label="Earnings Call" kind="Headline" />
              <Chip label="Completes Overnight Offering" kind="Headline" />
            </Row>
            <Row label="Sources">
              <Chip label="Business Wire" />
              <Chip label="PR Newswire" />
              <Chip label="Globe Newswire" />
              <Chip label="Benzinga" />
              <Chip label="TipRanks" />
              <Chip label="The Fly" />
              <Chip label="Zacks" />
            </Row>
            <Row label="Source list">
              <Chip label="Newswires to Exclude" exclude />
              <Chip label="Stock tickers" exclude />
            </Row>
          </div>
        )}
      </div>
      <p className="mt-2 text-xs leading-5 text-muted-foreground">
        {view === 'string'
          ? 'Could you read this back and say what it does?'
          : 'The same terms, grouped. Each row says what it contributes.'}
      </p>
    </DemoFrame>
  );
}

// ── Chapter 4: user-defined logic ────────────────────────────────────────────

export function LogicDemo() {
  const [inner, setInner] = useState<'AND' | 'OR'>('OR');
  const [between, setBetween] = useState<'AND' | 'OR'>('AND');
  const group = [
    { label: 'Mars Food', kind: 'Organisation' },
    { label: 'M&M’s Chocolate', kind: 'Product' },
    { label: 'Skittles', kind: 'Product' },
    { label: 'Galaxy', kind: 'Product' },
  ];

  return (
    <DemoFrame title="Flexible groups" hint="Click an operator">
      <div className="rounded-lg border border-dashed p-3" style={{ borderColor: `${ACCENT}66` }}>
        <p className="mb-2 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          Group 1 · mixed types
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {group.map((g, i) => (
            <Fragment key={g.label}>
              {i > 0 && (
                <OperatorToggle value={inner} onChange={setInner} label="Operator inside group 1" />
              )}
              <Chip label={g.label} kind={g.kind} />
            </Fragment>
          ))}
        </div>
      </div>
      <div className="flex justify-center py-1">
        <OperatorToggle value={between} onChange={setBetween} label="Operator between the groups" />
      </div>
      <div className="rounded-lg border border-dashed p-3" style={{ borderColor: `${ACCENT}66` }}>
        <p className="mb-2 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">Group 2</p>
        <div className="flex flex-wrap items-center gap-2">
          <Chip label="Mars Inc." kind="Organisation" />
          <OperatorToggle value="AND" label="Operator" />
          <Chip label="UK media list" kind="Source" />
        </div>
      </div>
      <p
        className="mt-2.5 rounded-md bg-[#6446FF0D] px-3 py-2 text-sm leading-6 text-foreground"
        aria-live="polite"
      >
        <span className="text-xs text-muted-foreground">Reads as: </span>
        coverage mentioning {inner === 'OR' ? 'any' : 'all'} of Mars Food, M&amp;M’s Chocolate,
        Skittles {inner === 'OR' ? 'or' : 'and'} Galaxy,{' '}
        {between === 'AND' ? 'within' : 'or any coverage of'} Mars Inc. in the UK media list.
      </p>
    </DemoFrame>
  );
}

// ── Chapter 5: the arrival ───────────────────────────────────────────────────

// Widths of the keyword pills, in px. Uneven, so they read as a jumble of terms.
const KEYWORD_PILLS = [34, 58, 22, 46, 30, 64, 26, 40, 52, 20, 36];

/**
 * Marks the turn of the story. A row of keyword pills (the cover's motif)
 * gathers into a single line, then whatever is inside rises into place.
 * Plays once each time the page comes on show; with reduced motion, or
 * before it plays, everything simply sits in its final state.
 */
export function ChapterArrival({ children }: { children: ReactNode }) {
  const active = usePageActive();
  let offset = 0;
  return (
    <div className="arrive mt-8" data-play={active}>
      <div className="relative h-[6px]" aria-hidden="true">
        {KEYWORD_PILLS.map((w, i) => {
          const left = offset;
          offset += w + 8;
          return (
            <span
              key={i}
              className="arrive-pill absolute top-0 h-full rounded-full bg-primary"
              style={
                {
                  left,
                  width: w,
                  '--to': `${-left}px`,
                  '--i': KEYWORD_PILLS.length - 1 - i,
                } as CSSProperties
              }
            />
          );
        })}
        <span className="arrive-line absolute left-0 top-0 h-full w-[168px] rounded-full bg-primary" />
      </div>
      <div className="arrive-rise pt-7">{children}</div>
    </div>
  );
}

// ── Chapter 5: the question people actually have ─────────────────────────────

const QUESTION = 'How is our AI deployment workflow message landing in UK top-tier media?';

export function QuestionDemo() {
  const reduced = useReducedMotion();
  // Every page stays mounted, so wait until this one is on show before typing.
  const active = usePageActive();
  const [typed, setTyped] = useState('');
  // The old query is crossed out first; only then is the question typed.
  const [struck, setStruck] = useState(false);
  useEffect(() => {
    if (!active) {
      setTyped('');
      setStruck(false);
      return;
    }
    if (reduced) {
      setStruck(true);
      setTyped(QUESTION);
      return;
    }
    let id: ReturnType<typeof setInterval> | undefined;
    const strike = setTimeout(() => setStruck(true), 1300);
    const start = setTimeout(() => {
      let i = 0;
      id = setInterval(() => {
        i += 1;
        setTyped(QUESTION.slice(0, i));
        if (i >= QUESTION.length) clearInterval(id);
      }, 38);
    }, 2300);
    return () => {
      clearTimeout(strike);
      clearTimeout(start);
      if (id) clearInterval(id);
    };
  }, [reduced, active]);

  return (
    <div className="flex h-full flex-col justify-center gap-6">
      <div>
        <p className="mb-2 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          What the product asked for
        </p>
        <p
          className={`break-words rounded-lg border border-foreground/10 p-4 text-xs leading-6 line-through transition-[color,text-decoration-color,opacity] duration-700 ${
            struck
              ? 'text-muted-foreground decoration-foreground/30'
              : 'text-foreground decoration-transparent'
          }`}
        >
          (&quot;AI deployment&quot; OR &quot;AI workflow*&quot; OR &quot;deploy* AI&quot; OR
          &quot;AI rollout&quot;) AND (&quot;Acme Corp&quot; OR Acme) AND (UK Tier 1 OR &quot;UK
          nationals&quot;) NOT (job* OR hiring OR careers)
        </p>
      </div>
      <div>
        <p className="mb-2 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          What people came to ask
        </p>
        <p
          className="min-h-[132px] text-[21px] font-medium leading-[1.4] text-foreground"
          aria-label={QUESTION}
        >
          “{typed}
          {typed.length < QUESTION.length ? (
            <span className="animate-pulse" style={{ color: ACCENT }}>
              |
            </span>
          ) : (
            '”'
          )}
        </p>
      </div>
    </div>
  );
}

// ── Chapter 5: content universe + AI tag ─────────────────────────────────────

const ARTICLES = [
  { title: 'Acme rolls out AI agents across its claims workflow', source: 'The Sunday Times', match: true },
  { title: 'Acme reports record first-quarter revenue', source: 'Financial Times', match: false },
  { title: 'How Acme moved AI from pilot to production in six months', source: 'The Guardian', match: true },
];

export function AiTagDemo() {
  const [tagged, setTagged] = useState(false);
  return (
    <DemoFrame title="Advanced search" hint={tagged ? undefined : 'Create the tag'}>
      <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
        1 · Define your content universe
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        <Chip label="Acme Corp" kind="Entity" />
        <Chip label="UK top-tier media" kind="Reading list" />
      </div>

      <p className="mt-4 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
        2 · Describe what you’re looking for
      </p>
      <div className="mt-2 rounded-lg border px-3 py-2.5" style={{ borderColor: `${ACCENT}55` }}>
        <p className="text-sm leading-6 text-foreground">
          Coverage of how we deploy AI in our workflows.
        </p>
        <div className="mt-2 flex items-center justify-between gap-2">
          <span
            className="rounded border px-2 py-0.5 text-xs"
            style={{ borderColor: '#E0457B', color: '#B02A5B' }}
          >
            AI deployment workflow
          </span>
          <button
            type="button"
            onClick={() => setTagged((t) => !t)}
            className="rounded-md px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
            style={{ background: ACCENT }}
          >
            {tagged ? 'Start again' : 'Create AI tag'}
          </button>
        </div>
      </div>

      <ul className="mt-3 divide-y divide-foreground/10 border-t border-foreground/10">
        {ARTICLES.map((a, i) => (
          <li key={a.title} className="flex items-start justify-between gap-3 py-2">
            <div className="min-w-0">
              <p className="text-[13px] leading-5 text-foreground">{a.title}</p>
              <p className="text-[11px] text-muted-foreground">{a.source}</p>
            </div>
            {tagged && a.match && (
              <span
                className="book-fade shrink-0 rounded border px-1.5 py-0.5 text-[11px]"
                style={{
                  borderColor: '#E0457B',
                  color: '#B02A5B',
                  animationDelay: `${i * 160}ms`,
                }}
              >
                AI tag
              </span>
            )}
          </li>
        ))}
      </ul>
      <p className="mt-1 min-h-5 text-xs leading-5 text-muted-foreground" aria-live="polite">
        {tagged ? 'Tagged 2 of 3. New coverage is tagged as it arrives.' : ''}
      </p>
    </DemoFrame>
  );
}

// ── Chapter 6: definition refinement ─────────────────────────────────────────

const BORDERLINE = [
  {
    title: 'Acme’s annual report mentions AI investment in a single line',
    yes: 'Include brief mentions in financial reporting.',
    no: 'Leave out passing mentions with no detail on the workflow.',
  },
  {
    title: 'Opinion: what Acme’s AI rollout means for its call-centre staff',
    yes: 'Include opinion pieces about the rollout.',
    no: 'Leave out opinion pieces; keep news reporting only.',
  },
  {
    title: 'A competitor copies Acme’s approach to AI deployment',
    yes: 'Include coverage where we are the comparison point.',
    no: 'Leave out articles that are mainly about another company.',
  },
];

export function RefineDemo() {
  const [answers, setAnswers] = useState<boolean[]>([]);
  const step = answers.length;
  const done = step >= BORDERLINE.length;
  const current = BORDERLINE[step];

  return (
    <DemoFrame title="Refine your definition" hint={done ? undefined : `Article ${step + 1} of 3`}>
      <div className="rounded-lg border border-foreground/10 bg-[#FAF8F5] px-3 py-2.5">
        <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">Definition</p>
        <p className="mt-1 text-sm leading-6 text-foreground">
          Coverage of how we deploy AI in our workflows.
          {answers.map((a, i) => (
            <mark
              key={i}
              className="book-fade ml-1 rounded px-1"
              style={{ background: `${CORAL}66`, color: 'inherit' }}
            >
              {a ? BORDERLINE[i].yes : BORDERLINE[i].no}
            </mark>
          ))}
        </p>
      </div>

      <div className="mt-3 min-h-[150px]">
        {!done ? (
          <div key={step} className="book-fade rounded-lg border p-3" style={{ borderColor: `${ACCENT}55` }}>
            <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              Borderline article
            </p>
            <p className="mt-1 text-sm leading-6 text-foreground">{current.title}</p>
            <p className="mt-3 text-xs text-muted-foreground">Should this get the tag?</p>
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={() => setAnswers((a) => [...a, true])}
                className="flex-1 rounded-md px-3 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90"
                style={{ background: ACCENT }}
              >
                Yes, tag it
              </button>
              <button
                type="button"
                onClick={() => setAnswers((a) => [...a, false])}
                className="flex-1 rounded-md border px-3 py-2 text-xs font-medium transition-colors hover:bg-[#6446FF0D]"
                style={{ borderColor: ACCENT, color: ACCENT }}
              >
                No, leave it out
              </button>
            </div>
          </div>
        ) : (
          <div className="book-fade rounded-lg border border-foreground/10 p-3">
            <p className="text-sm leading-6 text-foreground">
              Three decisions, and the definition now says what you meant. You never rewrote the
              prompt.
            </p>
            <button
              type="button"
              onClick={() => setAnswers([])}
              className="mt-3 text-xs underline decoration-dotted underline-offset-2"
              style={{ color: ACCENT }}
            >
              Try different answers
            </button>
          </div>
        )}
      </div>
    </DemoFrame>
  );
}
