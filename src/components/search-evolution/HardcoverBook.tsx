// ─────────────────────────────────────────────────────────────────────────────
// The search case study as a hardcover book.
//
//   • CoverArt: the front cover design. Everything is sized in em, so the same
//     cover works small (homepage card) and large (the case study's cover).
//   • HardcoverBook: a closed book drawn as a CSS 3D box with a cloth cover,
//     a patterned spine and a block of pages, floating over a soft shadow.
//
// No client-side script: the tilt on hover is plain CSS, driven by a `group`
// class on whatever wraps the book.
// ─────────────────────────────────────────────────────────────────────────────

import type { CSSProperties, ReactNode } from 'react';

export const BOOK_TITLE = 'Redesigning search';
export const BOOK_SUBTITLE = 'From hand-written Boolean queries to plain questions, over five years';

const CLOTH = '#2C2416';
const FOIL = '#F3E9DC';
const ACCENT = '#CC785C';

export const HARDCOVER_CSS = `
  /* Woven cloth: two faint line patterns crossed over the cover colour. */
  .hc-cloth {
    background-color: ${CLOTH};
    background-image:
      repeating-linear-gradient(0deg, rgba(255,255,255,0.035) 0 1px, transparent 1px 3px),
      repeating-linear-gradient(90deg, rgba(0,0,0,0.10) 0 1px, transparent 1px 3px);
  }
  /* Edges of the page block: thin lines running along the pages. */
  .hc-pages-x { background: repeating-linear-gradient(to right, #F1E9DC 0 1px, #DCD0BD 1px 2px); }
  .hc-pages-y { background: repeating-linear-gradient(to bottom, #F1E9DC 0 1px, #DCD0BD 1px 2px); }

  .hc-scene { perspective: 1500px; position: relative; display: flex; align-items: center; justify-content: center; }
  .hc-float { animation: hcFloat 7s ease-in-out infinite; transform-style: preserve-3d; }
  @keyframes hcFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
  .hc-book {
    --w: calc(var(--u) * 19.5);
    --h: calc(var(--u) * 27);
    --d: calc(var(--u) * 4.4);
    --lip: calc(var(--u) * 0.45);
    position: relative; width: var(--w); height: var(--h);
    font-size: calc(var(--u) * 0.92);
    transform-style: preserve-3d;
    transform: rotateX(22deg) rotateY(36deg) rotateZ(-5deg);
    transition: transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1);
  }
  .group:hover .hc-book, .group:focus-visible .hc-book {
    transform: rotateX(10deg) rotateY(16deg) rotateZ(0deg) translateZ(20px);
  }
  .hc-face { position: absolute; }
  .hc-front { inset: 0; transform: translateZ(calc(var(--d) / 2)); border-radius: 2px 4px 4px 2px; overflow: hidden; }
  .hc-back { inset: 0; transform: rotateY(180deg) translateZ(calc(var(--d) / 2)); border-radius: 2px 4px 4px 2px; }
  .hc-spine {
    top: 0; height: 100%; width: var(--d); left: calc(50% - var(--d) / 2);
    transform: rotateY(-90deg) translateZ(calc(var(--w) / 2));
    box-shadow: inset 0 0 0 1px rgba(0,0,0,0.25);
  }
  .hc-fore {
    top: var(--lip); height: calc(100% - var(--lip) * 2);
    width: calc(var(--d) - var(--lip) * 2); left: calc(50% - (var(--d) - var(--lip) * 2) / 2);
    transform: rotateY(90deg) translateZ(calc(var(--w) / 2 - var(--lip)));
  }
  .hc-top, .hc-bottom {
    left: 0; width: calc(100% - var(--lip));
    height: calc(var(--d) - var(--lip) * 2); top: calc(50% - (var(--d) - var(--lip) * 2) / 2);
  }
  .hc-top { transform: rotateX(90deg) translateZ(calc(var(--h) / 2 - var(--lip))); }
  .hc-bottom { transform: rotateX(-90deg) translateZ(calc(var(--h) / 2 - var(--lip))); }
  .hc-shadow {
    position: absolute; left: 50%; bottom: 4%; width: calc(var(--u) * 26); height: calc(var(--u) * 3.4);
    transform: translateX(-38%);
    background: radial-gradient(closest-side, rgba(44, 36, 22, 0.38), transparent);
    filter: blur(6px);
  }
  @media (prefers-reduced-motion: reduce) {
    .hc-float { animation: none; }
    .hc-book { transition: none; }
  }
`;

/** Five rows of search terms, fewer each time: the story of the book in one mark. */
function QueryMotif() {
  const rows = [9, 6, 4, 2, 1];
  return (
    <div className="flex flex-col gap-[0.42em]" aria-hidden="true">
      {rows.map((count, r) => (
        <div key={count} className="flex gap-[0.3em]">
          {Array.from({ length: count }, (_, i) => (
            <span
              key={i}
              className="h-[0.42em] rounded-full"
              style={{
                // Uneven widths so the early rows read as a jumble of keywords.
                width: `${count === 1 ? 5.2 : 1 + ((i * 7 + r * 3) % 4) * 0.45}em`,
                background: count === 1 ? FOIL : ACCENT,
                opacity: count === 1 ? 1 : 0.55 + r * 0.1,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/** The front cover. `heading` renders the title as the page's h1. */
export function CoverArt({
  heading,
  action,
  className = '',
  style,
}: {
  heading?: boolean;
  action?: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const Title = heading ? 'h1' : 'p';
  return (
    <div
      className={`hc-cloth relative flex h-full flex-col justify-between p-[2.3em] pl-[3em] ${className}`}
      style={{ color: FOIL, ...style }}
    >
      {/* The hinge: the groove a hardcover has beside its spine. */}
      <span
        className="pointer-events-none absolute inset-y-0 left-0 w-[1.5em]"
        style={{
          background:
            'linear-gradient(to right, rgba(0,0,0,0.28), rgba(0,0,0,0) 45%, rgba(0,0,0,0.3) 78%, rgba(255,255,255,0.06) 86%, rgba(0,0,0,0))',
        }}
        aria-hidden="true"
      />
      <p /* off-system: cover type is sized in em so it scales with the book */ className="text-[0.62em] uppercase tracking-[0.2em] opacity-70">
        Signal AI · 2021 – present
      </p>
      <div>
        <QueryMotif />
        <Title /* off-system: cover type is sized in em */ className="mt-[0.9em] text-[2.55em] font-semibold leading-[1.08] tracking-tight">
          Redesigning
          <br />
          search
        </Title>
        <p /* off-system: cover type is sized in em */ className="mt-[0.9em] max-w-[19em] text-[0.9em] leading-snug opacity-80">
          {BOOK_SUBTITLE}
        </p>
      </div>
      <div className="flex items-end justify-between gap-[1em]">
        <p /* off-system: cover type is sized in em */ className="text-[0.8em] leading-snug opacity-80">Lu Zhang</p>
        {action}
      </div>
    </div>
  );
}

// The spine pattern, drawn in a 44 × 270 box (the spine's proportions).
// Rows of keyword pills thin out on the way down, from a jumble of terms to a
// single plain question, the same story the cover's motif tells.
const SPINE_ROWS = [3, 3, 2, 3, 3, 2, 3, 2, 2, 3, 2, 2, 1, 2, 2, 1, 2, 1, 1, 1];
const SPINE_ROW_TOP = 62;
const SPINE_ROW_STEP = 7.6;

/** One row of pills, centred on the spine, with uneven widths. */
function spinePills(count: number, row: number) {
  const gap = 2.2;
  const widths = Array.from({ length: count }, (_, i) =>
    count === 1 ? 12 + ((row * 5) % 3) * 4 : 5.5 + ((i * 7 + row * 3) % 4) * 1.5,
  );
  const total = widths.reduce((sum, w) => sum + w, 0) + gap * (count - 1);
  let x = (44 - total) / 2;
  return widths.map((width) => {
    const pill = { x, width };
    x += width + gap;
    return pill;
  });
}

/**
 * The spine: a magnifying glass, a column of search terms that narrows to one
 * question, and the spark of an answer. Pure decoration, no lettering.
 */
export function SpineArt() {
  const lastRow = SPINE_ROWS.length - 1;
  return (
    <svg
      viewBox="0 0 44 270"
      preserveAspectRatio="xMidYMid meet"
      className="block h-full w-full"
      fill="none"
      aria-hidden="true"
    >
      {/* Foil bands, as on a bound book. */}
      {[14, 17.5, 252.5, 256].map((y) => (
        <rect key={y} x="5" y={y} width="34" height="1" fill={FOIL} opacity="0.55" />
      ))}

      {/* Magnifying glass. */}
      <circle cx="20.5" cy="36" r="7" stroke={FOIL} strokeWidth="2" />
      <path d="M25.8 41.3 L31.5 47" stroke={FOIL} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M17 33.6 A4.2 4.2 0 0 1 21 31.8" stroke={ACCENT} strokeWidth="1.4" strokeLinecap="round" />

      {/* Keywords narrowing into one question. */}
      {SPINE_ROWS.map((count, row) =>
        spinePills(count, row).map((pill, i) => (
          <rect
            key={`${row}-${i}`}
            x={pill.x}
            y={SPINE_ROW_TOP + row * SPINE_ROW_STEP}
            width={pill.width}
            height="3.2"
            rx="1.6"
            fill={row === lastRow ? FOIL : ACCENT}
            opacity={row === lastRow ? 1 : 0.5 + (row / lastRow) * 0.45}
          />
        )),
      )}

      {/* The answer: a four-point spark with two small ones beside it. */}
      <path
        d="M22 220 C23 227 25 229 32 230 C25 231 23 233 22 240 C21 233 19 231 12 230 C19 229 21 227 22 220 Z"
        fill={FOIL}
      />
      <path d="M32.5 218 C32.9 220.4 33.6 221.1 36 221.5 C33.6 221.9 32.9 222.6 32.5 225 C32.1 222.6 31.4 221.9 29 221.5 C31.4 221.1 32.1 220.4 32.5 218 Z" fill={ACCENT} />
      <path d="M11.5 237 C11.8 238.7 12.3 239.2 14 239.5 C12.3 239.8 11.8 240.3 11.5 242 C11.2 240.3 10.7 239.8 9 239.5 C10.7 239.2 11.2 238.7 11.5 237 Z" fill={ACCENT} />
    </svg>
  );
}

/**
 * A closed hardcover, floating. `unit` sets its size: the book is 19.5 units
 * wide, 27 tall and 4.4 thick. It is decorative, so pair it with real text.
 */
export function HardcoverBook({ unit, className = '' }: { unit?: number; className?: string }) {
  return (
    <div
      className={`hc-scene ${className}`}
      // Without `unit`, set the size from the outside with a `[--u:…]` class.
      style={unit ? ({ '--u': `${unit}px` } as CSSProperties) : undefined}
      aria-hidden="true"
    >
      <span className="hc-shadow" />
      <div className="hc-float">
        <div className="hc-book">
          <div className="hc-face hc-back hc-cloth" />
          <div className="hc-face hc-top hc-pages-y" />
          <div className="hc-face hc-bottom hc-pages-y" />
          <div className="hc-face hc-fore hc-pages-x" />
          <div className="hc-face hc-spine hc-cloth">
            <SpineArt />
          </div>
          <div className="hc-face hc-front">
            <CoverArt />
          </div>
        </div>
      </div>
    </div>
  );
}
