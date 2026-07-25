'use client';

// ─────────────────────────────────────────────────────────────────────────────
// THE SEARCH EVOLUTION — "Living Search Bar" scrollytelling
//
// What this demonstrates:
//   • A sticky search UI that morphs through 5 states as you scroll
//   • Narrative steps drive the state via IntersectionObserver
//   • A year dial for wayfinding + skimming
//   • Typed Boolean hero, finale recap
//   • prefers-reduced-motion respected throughout
//
// Typography and colours follow the site theme (JetBrains Mono via body,
// bg-background / text-foreground / border-border tokens). The accent is
// Signal AI's brand colour Neptune; errors use Signal red.
// ─────────────────────────────────────────────────────────────────────────────

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { siteBasePath as defaultBasePath } from '@/lib/siteBasePath';

interface SearchEvolutionViewProps {
  siteBasePath?: string;
}

// Signal AI brand colours
const ACCENT = '#6446FF'; // Neptune
const ERROR = '#FF585D'; // Signal red

const BOOLEAN_STRING = `("Acme Corp" OR "Acme" OR "ACME Inc") AND (reputation OR "brand risk" OR crisis OR scandal) NOT (job* OR hiring OR careers OR intern)`;

// The 2025 question, split into segments so the recognised entity and topic
// can be highlighted (Coral #FFA0A0) as they are typed.
const QUESTION_SEGMENTS: { text: string; hl?: boolean }[] = [
  { text: 'How is ' },
  { text: 'Acme Corp', hl: true },
  { text: "'s reputation trending in the context of " },
  { text: 'business expansion', hl: true },
  { text: '?' },
];
const QUESTION_2025 = QUESTION_SEGMENTS.map((s) => s.text).join('');
const HIGHLIGHT = '#FFA0A0'; // Coral

interface YearEntry {
  year: string;
  eyebrow: string;
  title: string;
  tension: string;
  body: string[];
  metric: string;
  results: string;
  images: { src: string; alt: string }[];
}

function buildYears(basePath: string): YearEntry[] {
  return [
    {
      year: '2021',
      eyebrow: 'Year 1',
      title: 'The Data Blizzard',
      tension: 'Too much flexibility created chaos.',
      body: [
        'Search accepted anything, so users had to bring everything. Power users wrote 200-character Boolean strings by hand; everyone else copied one from a colleague and hoped. Every query was a bespoke, fragile artifact.',
        'The tell was in the support queue: the most common ticket wasn’t a bug — it was “can someone check my search?”',
      ],
      metric: 'Time to build a working search: ~45 min',
      results: '48,207 results — mostly noise',
      images: [
        {
          src: `${basePath}/search-2.0/year1.png`,
          alt: 'Year 1: The Data Blizzard — an enormous web of hand-built keywords and Boolean queries.',
        },
      ],
    },
    {
      year: '2022',
      eyebrow: 'Year 2',
      title: 'From Searching to Discovering',
      tension: 'Users couldn’t discover entities.',
      body: [
        'We had hundreds of high-quality trained entities and topics — but users could only reach them if they already knew the exact name. Unless you remembered “Climate Change” was in the catalogue, you fell back to hand-built keyword lists.',
        'So we let users speak their own vocabulary. Type a word like “environment” and the system understands its meaning and syntax, then suggests the trained entities and topics behind it — Climate Change, Eco Energy, Sustainability. No exact name required.',
        'The UX shift: a difficult memory task became an intuitive selection. Recall turned into recognition, complexity dropped, and the barrier to entry fell with it.',
        'Try it: the suggestions in the panel are live — click one to add it to the search.',
      ],
      metric: 'Time to build a working search: ~20 min',
      results: '9,842 results — one concept, not fifty keywords',
      images: [
        {
          src: `${basePath}/search-2.0/year2.png`,
          alt: 'Year 2: From Searching to Discovering — entities suggested as you type, shifting recall to recognition.',
        },
      ],
    },
    {
      year: '2023',
      eyebrow: 'Year 3',
      title: 'From One Giant Query to Structured Thinking',
      tension: 'Queries were impossible to understand.',
      body: [
        'Even good queries were write-only: nobody could read one back and say what it did. We decomposed the single string into labelled rows — company, topic, exclusions — so a search became a document a teammate could audit.',
        'This is the quiet, unglamorous move the whole evolution pivots on: once a query had visible structure, everything after it became possible.',
      ],
      metric: 'Time to build a working search: ~8 min',
      results: '2,318 results — and you can see why',
      images: [
        {
          src: `${basePath}/search-2.0/year3.png`,
          alt: 'Year 3: From One Giant Query to Structured Thinking — searches organised into labelled groups.',
        },
      ],
    },
    {
      year: '2024',
      eyebrow: 'Year 4',
      title: 'Giving Users Control of Logic',
      tension: 'Structure was too rigid.',
      body: [
        'Structure solved readability but flattened intent — real questions have shape. “Reputation OR crisis, but only alongside Acme” isn’t a list, it’s logic. So we let users group rows and flip the operators themselves.',
        'Try it: the AND / OR toggle in the panel is live. That single affordance replaced our densest documentation page.',
      ],
      metric: 'Time to build a working search: ~3 min',
      results: '1,904 results — tuned by you',
      images: [
        {
          src: `${basePath}/search-2.0/year4.png`,
          alt: 'Year 4: Giving Users Control of Logic — nested logical groups users can rearrange themselves.',
        },
        {
          src: `${basePath}/search-2.0/v2-search.png`,
          alt: 'Search 2.0 interface showing flexible nested logic groups.',
        },
      ],
    },
    {
      year: '2025',
      eyebrow: 'Year 5',
      title: 'From Building Searches to Asking Questions',
      tension: 'Building searches isn’t the real job.',
      body: [
        'Five years of structure taught the system enough to build the query itself. Users type the question they actually have; the entities, topics and logic assemble behind the glass — inspectable, editable, but no longer the job.',
        'The interface finally matches the mental model users had on day one. It just took the product five years to earn it.',
      ],
      metric: 'Time to build a working search: ~30 sec',
      results: '1 clear answer',
      images: [
        {
          src: `${basePath}/search-2.0/year5.png`,
          alt: 'Year 5: From Building Searches to Asking Questions — intent-driven search assembling the query itself.',
        },
      ],
    },
  ];
}

// ── Shared chip — identical styling across every year = perceived continuity ──
function Chip({ label, kind, ghost }: { label: string; kind?: string; ghost?: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm whitespace-nowrap text-foreground transition-all duration-500"
      style={{
        borderColor: ghost ? 'var(--border)' : ACCENT,
        background: ghost ? 'transparent' : `${ACCENT}14`,
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: ACCENT }}
        aria-hidden="true"
      />
      {label}
      {kind && <span className="text-xs opacity-50 font-normal">&middot; {kind}</span>}
    </span>
  );
}

function Operator({
  children,
  onClick,
  interactive,
}: {
  children: ReactNode;
  onClick?: () => void;
  interactive?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={!interactive}
      className={`rounded px-2 py-0.5 text-xs font-semibold tracking-wider transition-colors ${
        interactive
          ? 'cursor-pointer hover:opacity-80 focus-visible:outline focus-visible:outline-2'
          : 'cursor-default'
      }`}
      style={{ background: `${ACCENT}1A`, color: ACCENT, outlineColor: ACCENT }}
      aria-label={interactive ? `Toggle logic operator, currently ${children}` : undefined}
    >
      {children}
    </button>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 py-1.5">
      <span className="w-16 shrink-0 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  );
}

// ── Confetti burst — Signal AI palette, fired when the 2025 answer appears ────
const CONFETTI_COLORS = [
  '#6446FF', // Neptune
  '#AF46B4', // Digital
  '#FF585D', // Signal red
  '#FF965A', // Orange
  '#FFC864', // Sunshine
  '#82DCBE', // Seafoam
  '#FFA0A0', // Coral
];

function ConfettiBurst() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 64 }, (_, i) => ({
        left: Math.random() * 100,
        top: Math.random() * 45,
        dx: (Math.random() - 0.5) * 220,
        dy: -(30 + Math.random() * 160),
        rot: (Math.random() - 0.5) * 900,
        delay: Math.random() * 0.6,
        size: 5 + Math.random() * 6,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        round: Math.random() > 0.5,
      })),
    []
  );
  return (
    <div className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
      {pieces.map((p, i) => (
        <span
          key={i}
          className="confetti-piece"
          style={
            {
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.round ? p.size : p.size * 0.6,
              background: p.color,
              borderRadius: p.round ? 9999 : 2,
              animationDelay: `${p.delay}s`,
              '--dx': `${p.dx}px`,
              '--dy': `${p.dy}px`,
              '--rot': `${p.rot}deg`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

// ── The five panel states ─────────────────────────────────────────────────────
const YEAR2_SUGGESTIONS = ['Climate Change', 'Eco Energy', 'Sustainability', 'Conservation'];

function PanelState({
  yearIndex,
  reduced,
  basePath,
}: {
  yearIndex: number;
  reduced: boolean;
  basePath: string;
}) {
  const [op, setOp] = useState<'OR' | 'AND'>('OR');
  const [picked, setPicked] = useState<string[]>([]);

  // Year 5: auto-type the question when the 2025 step scrolls into view,
  // then reveal the product screenshot as the "answer".
  const [askTyped, setAskTyped] = useState('');
  const [shotLoaded, setShotLoaded] = useState(false);
  const askDone = askTyped.length >= QUESTION_2025.length;
  useEffect(() => {
    if (yearIndex !== 4) return;
    if (reduced) {
      setAskTyped(QUESTION_2025);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 2;
      setAskTyped(QUESTION_2025.slice(0, i));
      if (i >= QUESTION_2025.length) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, [yearIndex, reduced]);

  if (yearIndex === 0) {
    return (
      <div className="text-xs leading-relaxed break-words text-muted-foreground">
        <span style={{ background: `${ACCENT}22`, borderRadius: 3, padding: '1px 2px' }}>
          (&quot;Acme Corp&quot; OR &quot;Acme&quot; OR &quot;ACME Inc&quot; OR &quot;Acme
          Corporation&quot; OR &quot;Acme Holdings&quot; OR &quot;Acme Group&quot; OR acme*)
        </span>{' '}
        AND (reputation OR &quot;brand risk&quot; OR crisis OR scandal OR backlash OR boycott OR
        &quot;PR disaster&quot; OR lawsuit* OR fine* OR recall* OR investigat*) AND (CEO OR
        &quot;chief executive&quot; OR executive* OR board OR leadership OR spokesperson) NOT
        (job* OR hiring OR careers OR intern* OR vacanc* OR recruit* OR &quot;now hiring&quot;)
        NOT (&quot;Acme Bakery&quot; OR &quot;Acme Plumbing&quot; OR &quot;Acme Bricks&quot; OR
        cartoon OR coyote) AND (announce* OR report* OR alleg* OR confirm* OR den* OR statement
        OR disclos*) OR (&quot;Acme Corp&quot; NEAR/5 (merger OR acquisition OR expansion OR
        restructur*)) NOT (sport* OR entertainment OR celebrit
        <span
          className="animate-pulse font-bold"
          style={{ color: ERROR }}
          title="Unbalanced parenthesis"
        >
          &#9612;
        </span>
      </div>
    );
  }

  if (yearIndex === 1) {
    const toggle = (s: string) =>
      setPicked((prev) => (prev.includes(s) ? prev.filter((p) => p !== s) : [...prev, s]));
    return (
      <div>
        {/* User types their own vocabulary… */}
        <div
          className="flex flex-wrap items-center gap-2 rounded-lg border px-3 py-2 text-sm text-foreground"
          style={{ borderColor: `${ACCENT}55` }}
        >
          {picked.map((s) => (
            <Chip key={s} label={s} kind="Topic" />
          ))}
          <span className="text-muted-foreground">
            environment
            {!reduced && (
              <span className="animate-pulse ml-0.5" style={{ color: ACCENT }}>
                |
              </span>
            )}
          </span>
        </div>

        {/* …and the system understands the meaning and suggests trained entities & topics */}
        <p className="mt-3 mb-1.5 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          suggested for &ldquo;environment&rdquo; &mdash; click to add
        </p>
        <div className="flex flex-wrap gap-2">
          {YEAR2_SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => toggle(s)}
              className="cursor-pointer transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 rounded-full"
              style={{ outlineColor: ACCENT }}
              aria-pressed={picked.includes(s)}
              aria-label={`${picked.includes(s) ? 'Remove' : 'Add'} ${s}`}
            >
              <Chip label={picked.includes(s) ? `${s} ✓` : `+ ${s}`} kind="Topic" ghost={!picked.includes(s)} />
            </button>
          ))}
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground">
          recall &rarr; recognition: no exact entity name needed
        </p>
      </div>
    );
  }

  if (yearIndex === 2) {
    return (
      <div>
        <Row label="Company">
          <Chip label="Acme Corp" kind="Company" />
        </Row>
        <Row label="Topic">
          <Chip label="Reputation risk" kind="Topic" />
        </Row>
        <Row label="Exclude">
          <Chip label="Recruitment noise" kind="Filter" ghost />
        </Row>
      </div>
    );
  }

  if (yearIndex === 3) {
    return (
      <div>
        <div
          className="rounded-lg border border-dashed p-3 mb-2"
          style={{ borderColor: `${ACCENT}66` }}
        >
          <div className="flex flex-wrap items-center gap-2">
            <Chip label="Reputation risk" kind="Topic" />
            <Operator interactive onClick={() => setOp(op === 'OR' ? 'AND' : 'OR')}>
              {op}
            </Operator>
            <Chip label="Crisis coverage" kind="Topic" />
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">group A &mdash; click the operator</p>
        </div>
        <div className="flex items-center gap-2">
          <Operator>AND</Operator>
          <Chip label="Acme Corp" kind="Company" />
          <Operator>NOT</Operator>
          <Chip label="Recruitment noise" kind="Filter" ghost />
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {shotLoaded && !reduced && <ConfettiBurst />}
      <div
        className="rounded-xl border px-4 py-3 text-sm text-foreground min-h-[46px]"
        style={{ borderColor: `${ACCENT}55` }}
        aria-label="The 2025 question, typed out"
      >
        {(() => {
          // Walk the segments and render only what has been "typed" so far,
          // marking the entity/topic segments as they appear.
          let remaining = askTyped.length;
          return QUESTION_SEGMENTS.map((seg, i) => {
            if (remaining <= 0) return null;
            const text = seg.text.slice(0, Math.min(seg.text.length, remaining));
            remaining -= seg.text.length;
            if (!seg.hl) return <span key={i}>{text}</span>;
            return (
              <mark
                key={i}
                style={{
                  background: HIGHLIGHT,
                  color: '#2F2F2F',
                  borderRadius: 3,
                  padding: '0 2px',
                }}
              >
                {text}
              </mark>
            );
          });
        })()}
        {!reduced && !askDone && (
          <span className="animate-pulse ml-0.5" style={{ color: ACCENT }}>
            |
          </span>
        )}
      </div>
      {askDone && (
        <figure
          className={`mt-3 overflow-hidden rounded-lg border ${reduced ? '' : 'panel-enter'}`}
          style={{ borderColor: `${ACCENT}33` }}
        >
          <img
            src={`${basePath}/search-2.0/AI-tag.png`}
            alt="The AI-built search — the assembled query, inspectable and editable behind the glass."
            className="w-full max-h-[38vh] object-contain"
            draggable={false}
            onLoad={() => setShotLoaded(true)}
          />
        </figure>
      )}
    </div>
  );
}

// ── Sticky panel chrome ───────────────────────────────────────────────────────
function SearchPanel({
  years,
  yearIndex,
  reduced,
  basePath,
}: {
  years: YearEntry[];
  yearIndex: number;
  reduced: boolean;
  basePath: string;
}) {
  const y = years[yearIndex];
  return (
    <div
      className="rounded-lg border bg-background shadow-sm overflow-hidden"
      style={{ borderColor: `${ACCENT}44` }}
      aria-live="polite"
      aria-label={`Search interface as it looked in ${y.year}`}
    >
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b"
        style={{ borderColor: `${ACCENT}22`, background: `${ACCENT}0A` }}
      >
        <span
          className="text-xs font-medium tracking-[0.12em] uppercase"
          style={{ color: ACCENT }}
        >
          Search &middot; {y.year}
        </span>
        <span className="flex gap-1.5" aria-hidden="true">
          {years.map((_, i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 rounded-full transition-all duration-500"
              style={{ background: i <= yearIndex ? ACCENT : 'var(--muted)' }}
            />
          ))}
        </span>
      </div>

      <div className="p-4 min-h-[168px]">
        {/* key change re-mounts content → CSS enter animation */}
        <div key={yearIndex} className={reduced ? '' : 'panel-enter'}>
          <PanelState yearIndex={yearIndex} reduced={reduced} basePath={basePath} />
        </div>
      </div>

      <div
        className="flex items-center justify-between px-4 py-2 border-t text-xs text-muted-foreground"
        style={{ borderColor: `${ACCENT}22` }}
      >
        <span>{y.results}</span>
        <span style={{ color: ACCENT }}>
          {y.metric.replace('Time to build a working search: ', '')}
        </span>
      </div>
    </div>
  );
}

// ── Year dial ─────────────────────────────────────────────────────────────────
function YearDial({
  years,
  yearIndex,
  onJump,
}: {
  years: YearEntry[];
  yearIndex: number;
  onJump: (i: number) => void;
}) {
  return (
    <nav
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 rounded-full border border-border bg-background/85 px-2 py-1.5 shadow-sm backdrop-blur"
      aria-label="Jump to a year"
    >
      {years.map((y, i) => (
        <button
          key={y.year}
          onClick={() => onJump(i)}
          className="rounded-full px-2.5 py-1 text-xs transition-all duration-300 focus-visible:outline focus-visible:outline-2"
          style={{
            background: i === yearIndex ? ACCENT : 'transparent',
            color: i === yearIndex ? '#FDFCFA' : 'var(--muted-foreground)',
            outlineColor: ACCENT,
          }}
          aria-current={i === yearIndex ? 'step' : undefined}
          title={y.tension}
        >
          {y.year}
        </button>
      ))}
    </nav>
  );
}

// ── Typed hero ────────────────────────────────────────────────────────────────
function Hero({ reduced }: { reduced: boolean }) {
  const [typed, setTyped] = useState(reduced ? BOOLEAN_STRING : '');
  useEffect(() => {
    if (reduced) {
      setTyped(BOOLEAN_STRING);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 3;
      setTyped(BOOLEAN_STRING.slice(0, i));
      if (i >= BOOLEAN_STRING.length) clearInterval(id);
    }, 24);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <header className="mx-auto max-w-3xl px-6 pt-20 pb-24 text-center">
      <p
        className="text-xs font-medium uppercase tracking-[0.12em] mb-6"
        style={{ color: ACCENT }}
      >
        Case study &middot; Signal AI &middot; 2021 &ndash; 2025
      </p>
      <h1 className="text-3xl font-semibold leading-tight mb-10 text-foreground">
        The Search Evolution
      </h1>
      <div
        className="rounded-lg border border-border bg-background p-4 text-left text-xs leading-relaxed break-words min-h-[92px] text-muted-foreground"
        aria-label="A 2021 Boolean search query, typed out"
      >
        {typed}
        {!reduced && typed.length < BOOLEAN_STRING.length && (
          <span className="animate-pulse">&#9612;</span>
        )}
      </div>
      <p className="mt-6 text-base leading-7 text-muted-foreground">
        In 2021, this is what asking a simple question looked like.
      </p>
      <p
        className="mt-10 text-sm animate-bounce text-muted-foreground"
        aria-hidden="true"
      >
        &darr; scroll to watch it grow up
      </p>
    </header>
  );
}

// ── Finale recap ──────────────────────────────────────────────────────────────
function Finale({ years, basePath }: { years: YearEntry[]; basePath: string }) {
  const links = [
    'How we untangled the Boolean chaos',
    'Making entities discoverable',
    'Giving queries visible structure',
    'Handing logic back to users',
    'Teaching search to hear the question',
  ];
  return (
    <footer className="mx-auto max-w-3xl px-6 py-24">
      <div className="flex items-end justify-between gap-2 mb-10" aria-hidden="true">
        {years.map((y, i) => (
          <div key={y.year} className="flex-1 text-center">
            <div
              className="mx-auto rounded-md border transition-all"
              style={{
                borderColor: `${ACCENT}66`,
                background: `${ACCENT}0F`,
                height: 56 - i * 8,
              }}
            />
            <p className="mt-2 text-[11px]" style={{ color: ACCENT }}>
              {y.year}
            </p>
          </div>
        ))}
      </div>
      <h2 className="text-xl font-semibold leading-tight mb-4 text-foreground">
        Five years, one query, less and less interface.
      </h2>
      <p className="text-sm leading-7 mb-10 text-muted-foreground">
        This wasn&apos;t a redesign &mdash; it was a sequence of earned simplifications. Each year
        removed work the previous year made removable. Read any chapter in depth:
      </p>
      <ul className="space-y-3">
        {links.map((l, i) => (
          <li key={l}>
            <a
              href="#"
              className="group inline-flex items-baseline gap-2 text-sm transition-colors"
              style={{ color: ACCENT }}
            >
              <span className="text-xs opacity-60">{years[i].year}</span>
              <span className="underline decoration-dotted underline-offset-4 group-hover:decoration-solid">
                {l} &rarr;
              </span>
            </a>
          </li>
        ))}
      </ul>

      <figure className="mt-14 overflow-hidden rounded-lg border border-border bg-background">
        <img
          src={`${basePath}/search-2.0/search-evolution.png`}
          alt="The Search Evolution — an overview of five years of search moving from keyword chaos to intent-driven clarity."
          className="w-full"
          draggable={false}
        />
      </figure>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export function SearchEvolutionView({
  siteBasePath = defaultBasePath,
}: SearchEvolutionViewProps) {
  const years = buildYears(siteBasePath);
  const homeHref = `${siteBasePath}/`;
  const projectHref = `${siteBasePath}/the-search-evolution`;
  const [yearIndex, setYearIndex] = useState(0);
  const [reduced, setReduced] = useState(false);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const fn = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const i = Number((entry.target as HTMLElement).dataset.index);
            setYearIndex(i);
          }
        });
      },
      // fires when a step's midsection crosses the vertical center of the viewport
      { rootMargin: '-45% 0px -45% 0px' }
    );
    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const jump = useCallback(
    (i: number) =>
      stepRefs.current[i]?.scrollIntoView({
        behavior: reduced ? 'auto' : 'smooth',
        block: 'center',
      }),
    [reduced]
  );

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <style>{`
        .panel-enter { animation: panelIn 0.55s cubic-bezier(0.22, 1, 0.36, 1); }
        @keyframes panelIn {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .confetti-piece {
          position: absolute;
          opacity: 0;
          animation: confettiFly 2.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        @keyframes confettiFly {
          0% { opacity: 1; transform: translate(0, 0) rotate(0deg); }
          100% { opacity: 0; transform: translate(var(--dx), var(--dy)) rotate(var(--rot)); }
        }
        @media (prefers-reduced-motion: reduce) {
          .panel-enter, .animate-bounce, .animate-pulse, .confetti-piece { animation: none !important; }
        }
      `}</style>

      <nav className="mx-auto max-w-6xl px-6 pt-12 text-sm text-muted-foreground flex items-center gap-2 flex-wrap">
        <a href={homeHref} className="hover:text-primary transition-colors">
          Portfolio
        </a>
        <span>/</span>
        <a href={projectHref} className="text-primary">
          The Search Evolution
        </a>
      </nav>

      <Hero reduced={reduced} />

      {/* Scrolly section: narrative left, sticky panel right; stacks on mobile */}
      <main className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col md:flex-row md:gap-12">
          {/* Sticky panel — first in DOM on mobile so it pins on top */}
          <aside className="md:order-2 md:w-[46%]">
            <div className="sticky top-4 md:top-[22vh] z-30 py-2 bg-background/95">
              <SearchPanel
                years={years}
                yearIndex={yearIndex}
                reduced={reduced}
                basePath={siteBasePath}
              />
            </div>
          </aside>

          <div className="md:order-1 md:w-[54%]">
            {years.map((y, i) => (
              <section
                key={y.year}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                data-index={i}
                className="min-h-[92vh] flex flex-col justify-center py-16"
                aria-labelledby={`year-${y.year}`}
              >
                <p
                  className="text-xs font-medium uppercase tracking-[0.12em] mb-4"
                  style={{ color: ACCENT }}
                >
                  {y.eyebrow} &middot; {y.year}
                </p>
                <p
                  className="text-2xl md:text-3xl leading-tight font-semibold mb-6"
                  style={{ color: ACCENT }}
                >
                  {y.tension}
                </p>
                <h2 id={`year-${y.year}`} className="text-xl font-semibold leading-tight mb-4 text-foreground">
                  {y.title}
                </h2>
                {y.body.map((p, j) => (
                  <p key={j} className="text-sm leading-7 mb-4 max-w-prose text-muted-foreground">
                    {p}
                  </p>
                ))}
                <p className="mt-2 text-sm" style={{ color: ACCENT }}>
                  {y.metric}
                </p>

                {/* Per-year infographics */}
                {y.images.map((img) => (
                  <figure
                    key={img.src}
                    className="mt-6 overflow-hidden rounded-lg border border-border bg-background shadow-sm"
                  >
                    <img src={img.src} alt={img.alt} className="w-full" draggable={false} />
                  </figure>
                ))}
              </section>
            ))}
          </div>
        </div>
      </main>

      <Finale years={years} basePath={siteBasePath} />

      <section className="mx-auto max-w-6xl px-6 pb-24 border-t border-border pt-8">
        <a
          href={homeHref}
          className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          ← Back to portfolio
        </a>
      </section>

      <YearDial years={years} yearIndex={yearIndex} onJump={jump} />
    </div>
  );
}
