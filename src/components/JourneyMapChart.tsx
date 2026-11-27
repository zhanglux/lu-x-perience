'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { Frown, Meh, Smile, type LucideIcon } from 'lucide-react';

type Level = 0 | 1 | 2;
type Mode = 'compare' | 'before' | 'after';

interface Side {
  level: Level;
  notes: string[];
  channels: string[];
}

interface Stage {
  short: string;
  need: string;
  before: Side;
  after: Side;
}

const levels: { label: string; icon: LucideIcon; top: number }[] = [
  { label: 'Frustrated', icon: Frown, top: 82 },
  { label: 'Neutral', icon: Meh, top: 50 },
  { label: 'Satisfied', icon: Smile, top: 18 },
];

/** From the author experience maps made before the project and after the first release (June 2020). */
const stages: Stage[] = [
  {
    short: 'Get notified',
    need: 'Get notified',
    before: {
      level: 0,
      notes: [
        'Only the corresponding author got updates, so news was slow to reach co-authors.',
        'Too few email notifications, which raised anxiety.',
        'Authors used several email addresses and forgot which one to log in with.',
        'Some emails ended up in spam folders.',
      ],
      channels: ['Email notifications', 'Bookmarked links', 'Journal website or user account'],
    },
    after: {
      level: 1,
      notes: [
        '10 of 10 authors said the page after the success link was what they expected.',
        'One asked to skip the success page and go straight to tracking.',
        '8 of 10 wanted to find tracking information in their account.',
      ],
      channels: ['Email notifications', 'Bookmarked links', 'Journal website or user account'],
    },
  },
  {
    short: 'What happened',
    need: 'Tell me what happened and when',
    before: {
      level: 1,
      notes: [
        'Backend codes and internal editorial jargon meant nothing to authors, so they contacted the journal to find out.',
      ],
      channels: ['Email notifications', 'Customer or journal support'],
    },
    after: {
      level: 2,
      notes: [
        '“I like the language you use. It is very clear and doesn’t use editorial jargon.”',
        '10 of 10 authors spotted the current status straight away.',
      ],
      channels: ['Email notifications', 'Submission tracker'],
    },
  },
  {
    short: 'How long to wait',
    need: 'Tell me how long to wait',
    before: {
      level: 0,
      notes: [
        'No indication of how long each stage should take, so no clear point to follow up.',
        'Authors got lost in “under review”: “Peer review is a black box.”',
      ],
      channels: ['Customer or journal support'],
    },
    after: {
      level: 1,
      notes: [
        '10 of 10 authors were happy to see expected timelines for some stages.',
        'Still missing: explaining why a paper is overdue. That wasn’t in the first release.',
      ],
      channels: ['Submission tracker'],
    },
  },
  {
    short: 'What to do next',
    need: 'Tell me what I need to do next',
    before: {
      level: 0,
      notes: [
        'It wasn’t clear what the author had to do next.',
        'Instructions were buried in long emails and got missed, causing needless delays.',
      ],
      channels: ['Email notifications', 'Customer or journal support'],
    },
    after: {
      level: 2,
      notes: [
        '“This is so much in front of what I normally receive.”',
        'Authors asked to be told what’s needed from them next.',
      ],
      channels: ['Email notifications', 'Submission tracker'],
    },
  },
  {
    short: 'Who to contact',
    need: 'Tell me who to contact',
    before: {
      level: 1,
      notes: [
        'The contact person wasn’t clear in the first place.',
        'Replies often took too long, leading to frustration and delays.',
      ],
      channels: ['Journal website', 'Customer or journal support'],
    },
    after: {
      level: 1,
      notes: [
        '10 of 10 authors liked having “Contact us about this manuscript” at the top of the page.',
        'But they weren’t confident they’d get a quick answer, and some were unsure how Contact us differed from Help and support.',
      ],
      channels: ['Journal website', 'Submission tracker'],
    },
  },
];

const xFor = (i: number) => ((i + 0.5) / stages.length) * 100;

const series = {
  before: {
    label: 'Before',
    long: 'Before the project',
    line: 'var(--muted-foreground)',
    dash: '6 5',
  },
  after: {
    label: 'After',
    long: 'After the first release',
    line: 'var(--primary)',
    dash: undefined,
  },
} as const;

function points(key: 'before' | 'after') {
  return stages.map((s, i) => `${xFor(i)},${levels[s[key].level].top}`).join(' ');
}

function Marker({
  kind,
  level,
  index,
  nudge,
  active,
}: {
  kind: 'before' | 'after';
  level: Level;
  index: number;
  nudge: number;
  active: boolean;
}) {
  const Icon = levels[level].icon;
  const style =
    kind === 'after'
      ? 'border-primary bg-primary text-primary-foreground'
      : 'border-muted-foreground bg-surface text-muted-foreground';
  return (
    <span
      aria-hidden="true"
      className={`absolute flex h-7 w-7 items-center justify-center rounded-full border-2 ring-2 ring-surface transition-transform duration-200 ${style} ${
        active ? 'scale-110' : ''
      }`}
      style={{
        left: `calc(${xFor(index)}% + ${nudge}px)`,
        top: `${levels[level].top}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Icon className="h-4 w-4" strokeWidth={2.25} />
    </span>
  );
}

function SidePanel({ kind, side }: { kind: 'before' | 'after'; side: Side }) {
  const s = series[kind];
  const Icon = levels[side.level].icon;
  return (
    <div className="space-y-3">
      <p className="flex items-center gap-2 text-xs font-medium text-foreground">
        <svg width="18" height="4" aria-hidden="true">
          <line x1="0" y1="2" x2="18" y2="2" stroke={s.line} strokeWidth="2" strokeDasharray={s.dash} />
        </svg>
        {s.long}
        <span className="inline-flex items-center gap-1 text-muted-foreground">
          · <Icon className="h-3.5 w-3.5" aria-hidden="true" /> {levels[side.level].label}
        </span>
      </p>
      <ul className="list-disc space-y-1.5 pl-4 text-sm leading-6 text-muted-foreground marker:text-border">
        {side.notes.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
      <p className="text-xs leading-5 text-muted-foreground">
        <span className="font-medium text-foreground">Channels:</span> {side.channels.join(', ')}
      </p>
    </div>
  );
}

/** Before and after author experience map for the manuscript tracker. */
export function JourneyMapChart({
  id,
  initialMode = 'compare',
  caption,
}: {
  id?: string;
  initialMode?: Mode;
  caption?: ReactNode;
}) {
  const [mode, setMode] = useState<Mode>(initialMode);

  // A link to #<id>-compare scrolls here and switches to the comparison.
  useEffect(() => {
    if (!id) return;
    const onHash = () => {
      if (window.location.hash !== `#${id}-compare`) return;
      setMode('compare');
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    onHash();
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [id]);
  const [active, setActive] = useState(2);

  const showBefore = mode !== 'after';
  const showAfter = mode !== 'before';
  const stage = stages[active];

  return (
    <figure id={id} className="scroll-mt-8 space-y-2">
      <div className="space-y-5 rounded-lg border border-border bg-surface p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-medium text-foreground">Author satisfaction at each stage</p>
          <div
            role="radiogroup"
            aria-label="Show"
            className="inline-flex rounded-md border border-border bg-background p-0.5 text-xs"
          >
            {(['before', 'after', 'compare'] as const).map((m) => (
              <button
                key={m}
                type="button"
                role="radio"
                aria-checked={mode === m}
                onClick={() => setMode(m)}
                className={`rounded px-3 py-1.5 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  mode === m
                    ? 'bg-foreground text-background'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {m === 'compare' ? 'Compare' : series[m].label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground" aria-hidden="true">
          {(['before', 'after'] as const).map((k) => (
            <span
              key={k}
              className={`flex items-center gap-2 transition-opacity ${
                (k === 'before' ? showBefore : showAfter) ? '' : 'opacity-40'
              }`}
            >
              <svg width="22" height="4">
                <line
                  x1="0"
                  y1="2"
                  x2="22"
                  y2="2"
                  stroke={series[k].line}
                  strokeWidth="2"
                  strokeDasharray={series[k].dash}
                />
              </svg>
              {series[k].long}
            </span>
          ))}
        </div>

        {/* Plot, with level labels in a left gutter on wider screens */}
        <div className="relative h-52 sm:ml-20 sm:h-56" aria-hidden="true">
          {levels.map((l) => (
            <div key={l.label} className="absolute inset-x-0" style={{ top: `${l.top}%` }}>
              <div className="border-t border-dashed border-border" />
              <span className="absolute -left-20 hidden w-[4.5rem] -translate-y-1/2 text-[11px] text-muted-foreground sm:block">
                {l.label}
              </span>
            </div>
          ))}

          {/* Highlighted column */}
          <div
            className="absolute inset-y-0 rounded-md bg-primary/5 transition-all duration-200"
            style={{ left: `${(active / stages.length) * 100}%`, width: `${100 / stages.length}%` }}
          />

          <svg
            className="absolute inset-0 h-full w-full overflow-visible"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {(['before', 'after'] as const).map((k) => (
              <polyline
                key={k}
                points={points(k)}
                fill="none"
                stroke={series[k].line}
                strokeWidth="2"
                strokeDasharray={series[k].dash}
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                className="transition-opacity duration-300"
                style={{ opacity: (k === 'before' ? showBefore : showAfter) ? 1 : 0 }}
              />
            ))}
          </svg>

          {stages.map((s, i) => {
            const same = s.before.level === s.after.level && showBefore && showAfter;
            return (
              <div key={s.short}>
                {showBefore && (
                  <Marker kind="before" level={s.before.level} index={i} nudge={same ? -9 : 0} active={i === active} />
                )}
                {showAfter && (
                  <Marker kind="after" level={s.after.level} index={i} nudge={same ? 9 : 0} active={i === active} />
                )}
              </div>
            );
          })}
        </div>

        {/* Stage selector: hover, focus or tap to read the notes */}
        <div className="grid grid-cols-5 gap-1 sm:ml-20" role="tablist" aria-label="Journey stage">
          {stages.map((s, i) => (
            <button
              key={s.short}
              type="button"
              role="tab"
              id={`journey-tab-${i}`}
              aria-selected={i === active}
              aria-controls="journey-panel"
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className={`rounded-md border px-1 py-2 text-center text-[11px] leading-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-xs ${
                i === active
                  ? 'border-primary text-primary-strong'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {s.short}
            </button>
          ))}
        </div>

        <div
          id="journey-panel"
          role="tabpanel"
          aria-labelledby={`journey-tab-${active}`}
          aria-live="polite"
          className="space-y-4 border-t border-border pt-4"
        >
          <p className="text-sm font-medium text-foreground">“{stage.need}”</p>
          <div className={`grid gap-6 ${showBefore && showAfter ? 'md:grid-cols-2' : ''}`}>
            {showBefore && <SidePanel kind="before" side={stage.before} />}
            {showAfter && <SidePanel kind="after" side={stage.after} />}
          </div>
        </div>

        <table className="sr-only">
          <caption>Author satisfaction at each stage, before the project and after the first release</caption>
          <thead>
            <tr>
              <th scope="col">Stage</th>
              <th scope="col">Before</th>
              <th scope="col">After</th>
            </tr>
          </thead>
          <tbody>
            {stages.map((s) => (
              <tr key={s.short}>
                <th scope="row">{s.need}</th>
                <td>{levels[s.before.level].label}</td>
                <td>{levels[s.after.level].label}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="text-xs leading-5 text-muted-foreground">
        {caption ??
          'Experience journey map: authors’ satisfaction and pain points across the submission process, before the project and after the first release in June 2020. Four of the five stages moved up; none moved down.'}
      </figcaption>
    </figure>
  );
}
