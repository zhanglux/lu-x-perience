'use client';

// ─────────────────────────────────────────────────────────────────────────────
// StoryBook: shows a list of spreads as an open book.
//
//   • Wide screens: two facing pages. Every sheet of the book stays mounted;
//     turning a page only rotates its sheet, so nothing is created, loaded or
//     decoded mid-turn (which is what made Safari flash).
//   • Narrow or short screens, or when the reader asks: every page stacked in
//     one scrolling column, so nothing is hidden behind a page turn.
//   • Arrow keys, the side arrows, the chapter markers and swipes all turn pages.
//   • With reduced motion the pages swap without the flip.
// ─────────────────────────────────────────────────────────────────────────────

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { siteBasePath } from '@/lib/siteBasePath';
import { HARDCOVER_CSS, SpineText } from './HardcoverBook';

/** True for the pages the reader is looking at. Lets a page start its animation on arrival. */
const PageActiveContext = createContext(true);
export const usePageActive = () => useContext(PageActiveContext);

export interface Spread {
  id: string;
  /** Index into `chapters`, used to highlight the marker under the book. */
  chapter: number;
  /** Left page. Leave out for the cover, which sits alone on the right. */
  left?: ReactNode;
  right: ReactNode;
  /** What to show instead of `right` when the book is one scrolling page. */
  flat?: ReactNode;
}

export interface ChapterMarker {
  label: string;
  title: string;
  /** Index of the spread the chapter starts on. */
  spread: number;
}

const TURN_MS = 750;
/** When several sheets turn at once (a jump), each starts this much after the last. */
const STAGGER_MS = 70;
/** Gap between stacked sheets, so browsers that sort 3D layers by depth agree on the order. */
const SHEET_GAP = 1;
/** Simple (Safari) turn: the old page folds away, then the new one folds out. */
const FOLD_HALF_MS = 300;
/** A beat before the fold starts, so the page underneath is painted first. */
const FOLD_LEAD_MS = 50;
// The book is laid out at one fixed size and scaled down to fit the window, so
// every page breaks the same way on every screen.
const BOOK_W = 1180;
const BOOK_H = 740;
/** Space the breadcrumb, side arrows and chapter markers need around the book. */
const CHROME_W = 160;
const CHROME_H = 228;
/** Below this scale the text is too small to read: show one scrolling page. */
const MIN_SCALE = 0.8;
// Space kept around the book on small windows: page margins only (width), and
// the breadcrumbs plus a little air (height).
const TIGHT_CHROME_W = 48;
const TIGHT_CHROME_H = 110;
/** Thickness of the closed hardcover, in px at full size. */
const COVER_DEPTH = 64;

export const BOOK_CSS = `${HARDCOVER_CSS}
  /* Paper: a plain uncoated sheet. The tooth is a small tiled image of grain
     shadows (public/search-2.0/paper-tooth.webp) laid over the paper colour. It
     is an image, not a live SVG filter, so a turning page never re-renders it. */
  .book-paper {
    /* Small grey and terracotta text is a step darker on paper, to keep AA contrast. */
    --muted-foreground: #5E5147;
    --primary-strong: #8C4429;
    background-color: #FCFAF4;
    background-image: url("${siteBasePath}/search-2.0/paper-tooth.webp");
    background-size: 300px 300px;
  }
  /* Soft, even light with no highlight: a slow falloff across the sheet and a
     deeper shadow where it curves into the gutter. */
  .paper-l::after, .paper-r::after {
    content: ''; position: absolute; inset: 0; pointer-events: none; z-index: 3;
  }
  .paper-l::after {
    background: linear-gradient(to right,
      rgba(44, 40, 36, 0.05) 0%, rgba(44, 40, 36, 0) 22%,
      rgba(44, 40, 36, 0.02) 70%, rgba(44, 40, 36, 0.09) 90%, rgba(44, 40, 36, 0.30) 100%);
  }
  .paper-r::after {
    background: linear-gradient(to left,
      rgba(44, 40, 36, 0.05) 0%, rgba(44, 40, 36, 0) 22%,
      rgba(44, 40, 36, 0.02) 70%, rgba(44, 40, 36, 0.09) 90%, rgba(44, 40, 36, 0.30) 100%);
  }
  /* Open book: the cover boards show past the pages, and the pages underneath
     show as a stack along the outer and bottom edges. */
  .book-board {
    position: absolute; inset: -13px -16px -15px; border-radius: 8px;
    box-shadow: 0 2px 4px rgba(44, 36, 22, 0.2), 0 34px 60px -24px rgba(44, 36, 22, 0.55);
    opacity: 1; transition: opacity 0.3s ease ${TURN_MS - 300}ms; pointer-events: none;
  }
  .book[data-closed='true'] .book-board { opacity: 0; transition: opacity 0.15s ease; }
  .book-stack { position: absolute; pointer-events: none; opacity: 1; transition: opacity 0.3s ease ${TURN_MS - 300}ms; }
  .book[data-closed='true'] .book-stack { opacity: 0; transition: opacity 0.15s ease; }
  .book-stack-l, .book-stack-r {
    top: 3px; bottom: -5px; width: 8px;
    background: repeating-linear-gradient(to right, #EFE7D8 0 1px, #CFC3AE 1px 2px);
  }
  .book-stack-l { left: -8px; border-radius: 3px 0 0 3px; }
  .book-stack-r { right: -8px; border-radius: 0 3px 3px 0; }
  .book-stack-b {
    left: -6px; right: -6px; bottom: -6px; height: 6px; border-radius: 0 0 3px 3px;
    background: repeating-linear-gradient(to bottom, #EFE7D8 0 1px, #CFC3AE 1px 2px);
  }
  .book-stage { perspective: 2600px; }
  /* The pages turn when clicked, so they show a hand; controls show a pointing hand. */
  .book { cursor: grab; }
  .book figure { cursor: default; }
  .book :is(button, a):not(.cursor-zoom-in) { cursor: pointer; }
  .book input { cursor: text; }
  .book {
    position: relative;
    flex: none;
    width: ${BOOK_W}px;
    height: ${BOOK_H}px;
    transform: translateX(var(--book-shift, 0)) scale(calc(var(--book-scale, 1) * var(--book-zoom, 1)))
      rotateX(var(--book-rx, 0deg)) rotateY(var(--book-ry, 0deg));
    transition: transform ${TURN_MS}ms cubic-bezier(0.3, 0.1, 0.2, 1);
    transform-style: preserve-3d;
  }
  /* Closed: the cover sits centred and the book is tilted to show its spine. */
  .book[data-closed='true'] {
    --book-shift: calc(-25% * var(--book-scale, 1));
    --book-rx: 15deg;
    --book-zoom: 0.86;
    --book-ry: 30deg;
  }
  /* The parts of a closed hardcover that sit behind the cover. */
  .book-hc { position: absolute; opacity: 0; transition: opacity 0.2s ease; pointer-events: none; }
  .book[data-closed='true'] .book-hc { opacity: 1; transition: opacity 0.3s ease ${TURN_MS - 250}ms; }
  .book-hc-spine {
    top: 0; bottom: 0; left: calc(50% - ${COVER_DEPTH}px); width: ${COVER_DEPTH}px;
    transform-origin: right center; transform: rotateY(-90deg);
    font-size: 17px; box-shadow: inset 0 0 0 1px rgba(0,0,0,0.25);
  }
  .book-hc-top {
    left: 50%; width: calc(50% - 7px); top: ${-(COVER_DEPTH - 12)}px; height: ${COVER_DEPTH - 12}px;
    transform-origin: bottom center; transform: translateZ(-6px) rotateX(90deg);
  }
  .book-hc-bottom {
    left: 50%; width: calc(50% - 7px); top: 100%; height: ${COVER_DEPTH - 12}px;
    transform-origin: top center; transform: translateZ(-6px) rotateX(-90deg);
  }
  .book-hc-back {
    top: 0; bottom: 0; left: 50%; width: 50%; border-radius: 2px 10px 10px 2px;
    transform: translateZ(${-COVER_DEPTH}px);
    box-shadow: 0 30px 50px -20px rgba(44, 36, 22, 0.45);
  }
  /* A sheet: one leaf of the book, hinged on the spine. Its front is a
     right-hand page and its back is the left-hand page of the next spread. */
  .book-sheet {
    position: absolute; inset: 0;
    transform-origin: left center; transform-style: preserve-3d;
    transform: rotateY(0deg);
    transition: transform ${TURN_MS}ms cubic-bezier(0.45, 0, 0.55, 1) var(--delay, 0ms);
  }
  .book-sheet[data-turned='true'] { transform: rotateY(-180deg); }
  /* Where the sheet sits in its pile. Safari orders 3D layers by real depth, so
     this must never slide: a sheet that sank gradually would dip under the page
     below it and let that page show through. Instead it keeps its place on top
     of the pile it is leaving, and steps to the top of the other pile at the
     half-way point, when it is edge-on and the step cannot be seen. */
  /* A turned sheet's wrapper still sits over the right-hand page (only its child
     rotates), so the wrappers must let clicks through to the page underneath. */
  .book-sheet-z, .book-sheet { pointer-events: none; }
  .book-face { pointer-events: auto; }
  .book-sheet-z {
    position: absolute; top: 0; bottom: 0; left: 50%; width: 50%;
    transform-style: preserve-3d;
    transform: translateZ(var(--z-right));
    transition: transform 0s linear calc(var(--delay, 0ms) + ${TURN_MS / 2}ms);
  }
  .book-sheet-z[data-turned='true'] { transform: translateZ(var(--z-left)); }
  .book-face {
    position: absolute; inset: 0; overflow: hidden;
    backface-visibility: hidden; -webkit-backface-visibility: hidden;
    box-shadow: 0 1px 2px rgba(44, 36, 22, 0.10);
    /* Which face shows is switched outright at the half-way point, when the
       sheet is edge-on, rather than left to backface-visibility alone: Safari
       lets images ignore that and show through mirrored. */
    transition: visibility 0s linear calc(var(--delay, 0ms) + ${TURN_MS / 2}ms);
  }
  .book-face-front { border-radius: 0 3px 3px 0; visibility: visible; }
  .book-face-back { transform: rotateY(180deg); border-radius: 3px 0 0 3px; visibility: hidden; }
  .book-sheet[data-turned='true'] .book-face-front { visibility: hidden; }
  .book-sheet[data-turned='true'] .book-face-back { visibility: visible; }
  .book-page-inner { position: absolute; inset: 0; z-index: 1; overflow: hidden; padding: 36px 46px 48px; }
  .book-page-cover { position: absolute; inset: 0; z-index: 1; }
  /* Simple version (Safari): the two pages of the current spread, flat, on a
     plain background. No stacked sheets, no 3D turn, no paper grain. */
  [data-simple='true'] .book-paper, .book-paper[data-simple='true'] { background-image: none; }
  .book-flat-page { position: absolute; top: 0; bottom: 0; width: 50%; overflow: hidden; box-shadow: 0 1px 2px rgba(44, 36, 22, 0.10); }
  .book-flat-left { left: 0; border-radius: 3px 0 0 3px; }
  .book-flat-right { left: 50%; border-radius: 0 3px 3px 0; }
  /* The fold: a page turn drawn with flat 2D scaling only, hinged on the spine.
     The outgoing page narrows to nothing, then the incoming page widens out on
     the other side. No 3D, so Safari has no depth order to get wrong. */
  .book-fold-out { animation: bookFoldOut ${FOLD_HALF_MS}ms cubic-bezier(0.5, 0, 0.9, 0.6) ${FOLD_LEAD_MS}ms both; }
  .book-fold-in { animation: bookFoldIn ${FOLD_HALF_MS}ms cubic-bezier(0.1, 0.4, 0.5, 1) ${FOLD_LEAD_MS + FOLD_HALF_MS}ms both; }
  .book-flat-left.book-fold-out, .book-flat-left.book-fold-in { transform-origin: right center; }
  .book-flat-right.book-fold-out, .book-flat-right.book-fold-in { transform-origin: left center; }
  @keyframes bookFoldOut { from { transform: scaleX(1); } to { transform: scaleX(0); } }
  @keyframes bookFoldIn { from { transform: scaleX(0); } to { transform: scaleX(1); } }
  /* The folding page darkens as it turns away from the light. */
  .book-fold-shade { position: absolute; inset: 0; z-index: 4; pointer-events: none; background: #2C2416; opacity: 0; }
  .book-fold-out .book-fold-shade { animation: bookShadeIn ${FOLD_HALF_MS}ms ease-in ${FOLD_LEAD_MS}ms both; }
  .book-fold-in .book-fold-shade { animation: bookShadeOut ${FOLD_HALF_MS}ms ease-out ${FOLD_LEAD_MS + FOLD_HALF_MS}ms both; }
  @keyframes bookShadeIn { from { opacity: 0; } to { opacity: 0.32; } }
  @keyframes bookShadeOut { from { opacity: 0.32; } to { opacity: 0; } }
  .book-fade { animation: bookFade 0.5s ease both; }
  @keyframes bookFade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
  /* Chapter 5's arrival: keyword pills gather into one line, then the heading
     rises. It waits for the page turn to land. 2D transforms and opacity only. */
  .arrive[data-play='true'] .arrive-pill {
    animation: arrivePill 0.75s cubic-bezier(0.6, 0, 0.3, 1) both;
    animation-delay: calc(900ms + var(--i) * 45ms);
  }
  .arrive-pill { opacity: 0; }
  @keyframes arrivePill {
    0% { opacity: 0.75; transform: none; }
    70% { opacity: 0.75; }
    100% { opacity: 0; transform: translateX(var(--to)) scaleX(0.4); }
  }
  .arrive-line { transform-origin: left center; }
  .arrive[data-play='true'] .arrive-line { animation: arriveLine 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) 1650ms both; }
  @keyframes arriveLine { from { transform: scaleX(0); } to { transform: none; } }
  .arrive[data-play='true'] .arrive-rise { animation: arriveRise 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) 1900ms both; }
  @keyframes arriveRise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
  @media (prefers-reduced-motion: reduce) {
    .book, .book-sheet, .book-sheet-z, .book-face, .book-fade, .arrive-pill, .arrive-line, .arrive-rise, .book-fold-out, .book-fold-in, .book-fold-shade { animation: none !important; transition: none !important; }
  }
`;

function PageNumber({ n, side }: { n: number; side: 'left' | 'right' }) {
  return (
    <span
      className={`absolute bottom-4 z-[2] text-[11px] tabular-nums text-muted-foreground ${
        side === 'left' ? 'left-12' : 'right-12'
      }`}
      aria-hidden="true"
    >
      {n}
    </span>
  );
}

export function StoryBook({
  build,
  chapters,
  title,
}: {
  /** Builds the spreads. `go` lets a page (cover, contents) jump to a spread. */
  build: (go: (spread: number) => void) => Spread[];
  chapters: ChapterMarker[];
  title: string;
}) {
  // The pages are built once; `goRef` always points at the current navigation.
  const goRef = useRef<(spread: number) => void>(() => {});
  const spreads = useMemo(() => build((i) => goRef.current(i)), [build]);
  // `index` is the spread on show, which is also how many sheets have been turned.
  const [index, setIndex] = useState(0);
  // The turn in progress: which spread it left and which it is heading to.
  const [turn, setTurn] = useState<{ from: number; to: number } | null>(null);
  // `fits`: the screen is big enough for facing pages. `asOnePage`: reader's choice.
  const [fits, setFits] = useState(false);
  const [scale, setScale] = useState(1);
  const [tightW, setTightW] = useState(false);
  const [asOnePage, setAsOnePage] = useState(false);
  const [reduced, setReduced] = useState(false);
  // Safari draws the 3D page turn wrongly (pages show through each other), so it
  // gets a simple version: flat pages that swap, on a plain background.
  const [simple, setSimple] = useState(false);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      // Roomy layout first: arrows beside the book, chapter pills on screen below it.
      const roomyW = (window.innerWidth - CHROME_W) / BOOK_W;
      const roomyH = (window.innerHeight - CHROME_H) / BOOK_H;
      // On smaller windows, keep the book at its smallest readable size and give
      // up the furniture instead: the arrows move under the book, and the pills
      // may sit below the fold.
      const byW =
        roomyW >= MIN_SCALE
          ? roomyW
          : Math.min(MIN_SCALE, (window.innerWidth - TIGHT_CHROME_W) / BOOK_W);
      const byH =
        roomyH >= MIN_SCALE
          ? roomyH
          : Math.min(MIN_SCALE, (window.innerHeight - TIGHT_CHROME_H) / BOOK_H);
      const s = Math.min(1, byW, byH);
      setTightW(roomyW < MIN_SCALE);
      setScale(s);
      setFits(s >= MIN_SCALE);
      setReduced(motion.matches);
      // `?book=simple` forces the simple version in any browser, for checking it.
      setSimple(
        /^((?!chrome|chromium|android|crios|fxios|edg).)*safari/i.test(navigator.userAgent) ||
          new URLSearchParams(window.location.search).get('book') === 'simple',
      );
    };
    sync();
    window.addEventListener('resize', sync);
    motion.addEventListener('change', sync);
    return () => {
      window.removeEventListener('resize', sync);
      motion.removeEventListener('change', sync);
    };
  }, []);

  const bookMode = fits && !asOnePage;

  const go = useCallback(
    (to: number) => {
      if (turn || to === index || to < 0 || to >= spreads.length) return;
      setIndex(to);
      if (!reduced) setTurn({ from: index, to });
    },
    [turn, index, spreads.length, reduced],
  );

  goRef.current = (to: number) => {
    if (bookMode) {
      go(to);
      return;
    }
    document.getElementById(`spread-${spreads[to]?.id}`)?.scrollIntoView({
      behavior: reduced ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  // Navigation is held until every sheet in the turn has landed.
  useEffect(() => {
    if (!turn) return;
    const sheets = Math.abs(turn.to - turn.from);
    const ms = simple ? FOLD_LEAD_MS + FOLD_HALF_MS * 2 : TURN_MS + (sheets - 1) * STAGGER_MS;
    const id = setTimeout(() => setTurn(null), ms);
    return () => clearTimeout(id);
  }, [turn, simple]);

  useEffect(() => {
    if (!bookMode) return;
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')) return;
      // An enlarged image is open over the book: leave the pages alone.
      if (document.querySelector('[role="dialog"]')) return;
      if (e.key === 'ArrowRight') go(index + 1);
      if (e.key === 'ArrowLeft') go(index - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [bookMode, go, index]);

  // ── One scrolling page ──────────────────────────────────────────────────────
  if (!bookMode) {
    return (
      <div className="mx-auto max-w-5xl px-4 pb-16 sm:px-6" data-simple={simple}>
        {fits && (
          <div className="mb-6 flex justify-end">
            <button
              type="button"
              onClick={() => setAsOnePage(false)}
              className="cursor-pointer rounded-full border border-foreground/15 px-3 py-1.5 text-xs text-foreground transition-colors hover:border-foreground/40"
            >
              Read as a book
            </button>
          </div>
        )}
        <div className="space-y-6">
          {spreads.map((s) => (
            <section
              key={s.id}
              id={`spread-${s.id}`}
              className={`grid gap-4 ${s.left ? 'md:grid-cols-2' : ''}`}
            >
              {s.left && (
                <div className="book-paper rounded-xl border border-foreground/10 p-6 sm:p-9">
                  {s.left}
                </div>
              )}
              <div
                className={`rounded-xl border border-foreground/10 ${
                  s.left ? 'book-paper p-6 sm:p-9' : 'overflow-hidden'
                }`}
              >
                {s.flat ?? s.right}
              </div>
            </section>
          ))}
        </div>
      </div>
    );
  }

  // ── The book ────────────────────────────────────────────────────────────────
  const count = spreads.length;
  const closed = index === 0;
  const activeChapter = spreads[index].chapter;
  // Simple version: the pages on screen. Normally the two of the current spread.
  // During a turn the spread being left is kept too: one of its pages folds away
  // over the new page beneath it, then the new facing page folds out over the
  // other old page. Keys are stable, so the new pages are never recreated.
  type FlatPage = {
    key: string;
    side: 'left' | 'right';
    content: ReactNode;
    paper: boolean;
    number: number;
    z: number;
    motion?: 'out' | 'in';
    old?: boolean;
  };
  const flatPages: FlatPage[] = [];
  if (simple) {
    const forward = turn ? turn.to > turn.from : true;
    const add = (at: number, side: 'left' | 'right', rest: Partial<FlatPage>) => {
      const sp = spreads[at];
      const content = side === 'left' ? sp.left : sp.right;
      if (!content) return;
      flatPages.push({
        key: `${side}-${sp.id}`,
        side,
        content,
        paper: !!sp.left,
        number: at * 2 + (side === 'left' ? 0 : 1),
        z: 1,
        ...rest,
      });
    };
    // The page that folds out is the one on the side the turn moves towards.
    const inSide = forward ? 'left' : 'right';
    const outSide = forward ? 'right' : 'left';
    add(index, outSide, { z: 1 });
    add(index, inSide, turn ? { z: 3, motion: 'in' } : { z: 1 });
    if (turn) {
      add(turn.from, outSide, { z: 2, motion: 'out', old: true });
      add(turn.from, inSide, { z: 2, old: true });
    }
  }

  /** Delay before sheet `i` starts moving: in a jump, the sheets leave one after another. */
  const delayFor = (i: number) => {
    if (!turn) return 0;
    const lo = Math.min(turn.from, turn.to);
    const hi = Math.max(turn.from, turn.to);
    if (i < lo || i >= hi) return 0;
    return (turn.to > turn.from ? i - lo : hi - 1 - i) * STAGGER_MS;
  };

  const arrow = (dir: -1 | 1) => (
    <button
      type="button"
      onClick={() => go(index + dir)}
      disabled={(dir < 0 ? index === 0 : index === count - 1) || !!turn}
      aria-label={dir < 0 ? 'Previous page' : 'Next page'}
      className={`flex shrink-0 cursor-pointer items-center justify-center rounded-full border border-foreground/15 text-primary-strong transition-colors hover:border-foreground/40 disabled:cursor-default disabled:opacity-25 ${
        tightW ? 'size-9' : 'size-11'
      }`}
    >
      {dir < 0 ? (
        <ArrowLeft
          className={tightW ? 'size-4' : 'size-[18px]'}
          strokeWidth={2.25}
          aria-hidden="true"
        />
      ) : (
        <ArrowRight
          className={tightW ? 'size-4' : 'size-[18px]'}
          strokeWidth={2.25}
          aria-hidden="true"
        />
      )}
    </button>
  );

  return (
    <div className="pb-4">
      <div
        className="book-stage flex items-center justify-center gap-4 px-4"
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (dx < -50) go(index + 1);
          if (dx > 50) go(index - 1);
        }}
      >
        {!tightW && arrow(-1)}

        <div
          className="book"
          data-closed={closed}
          data-simple={simple}
          style={
            {
              '--book-scale': scale,
              // Scaling keeps the layout box at full size; pull the margins in to match.
              margin: `${((scale - 1) * BOOK_H) / 2}px ${((scale - 1) * BOOK_W) / 2}px`,
            } as CSSProperties
          }
          // Clicking the paper turns the page: right page forward, left page back.
          onClick={(e) => {
            const target = e.target as HTMLElement;
            if (!e.currentTarget.contains(target)) return;
            if (target.closest('button, a, input, figure')) return;
            if (window.getSelection()?.toString()) return;
            const box = e.currentTarget.getBoundingClientRect();
            go(e.clientX > box.left + box.width / 2 ? index + 1 : index - 1);
          }}
          role="group"
          aria-roledescription="book"
          aria-label={title}
        >
          <div className="book-board hc-cloth" aria-hidden="true" />
          <div className="book-stack book-stack-l" aria-hidden="true" />
          <div className="book-stack book-stack-r" aria-hidden="true" />
          <div className="book-stack book-stack-b" aria-hidden="true" />
          <div className="book-hc book-hc-back hc-cloth" aria-hidden="true" />
          <div className="book-hc book-hc-top hc-pages-y" aria-hidden="true" />
          <div className="book-hc book-hc-bottom hc-pages-y" aria-hidden="true" />
          <div className="book-hc book-hc-spine hc-cloth" aria-hidden="true">
            <SpineText />
          </div>
          {simple ? (
            <>
              {flatPages.map((page) => (
                <div
                  key={page.key}
                  className={`book-flat-page book-flat-${page.side} ${
                    page.paper ? `book-paper paper-${page.side === 'left' ? 'l' : 'r'}` : ''
                  } ${page.motion ? `book-fold-${page.motion}` : ''}`}
                  style={{ zIndex: page.z }}
                  inert={page.old}
                  aria-hidden={page.old || undefined}
                >
                  <div className={page.paper ? 'book-page-inner' : 'book-page-cover'}>
                    {page.content}
                  </div>
                  {page.paper && <PageNumber n={page.number} side={page.side} />}
                  {page.motion && <span className="book-fold-shade" aria-hidden="true" />}
                </div>
              ))}
            </>
          ) : (
            spreads.map((spread, i) => {
              const turned = i < index;
              const next = spreads[i + 1];
              const moving =
                turn !== null &&
                i >= Math.min(turn.from, turn.to) &&
                i < Math.max(turn.from, turn.to);
              const frontActive = index === i;
              const backActive = index === i + 1;
              return (
                <div
                  key={spread.id}
                  className="book-sheet-z"
                  data-turned={turned}
                  style={
                    {
                      // Right-hand pile: earlier sheets on top. Left-hand pile: later ones on top.
                      '--z-right': `${(count - i) * SHEET_GAP}px`,
                      '--z-left': `${(i + 1) * SHEET_GAP}px`,
                      '--delay': `${delayFor(i)}ms`,
                      zIndex: moving ? count + 1 : turned ? i + 1 : count - i,
                    } as CSSProperties
                  }
                >
                  <div className="book-sheet" data-turned={turned}>
                    <div
                      className={`book-face book-face-front ${spread.left ? 'book-paper paper-r' : ''}`}
                      inert={!frontActive}
                    >
                      <PageActiveContext.Provider value={frontActive}>
                        <div className={spread.left ? 'book-page-inner' : 'book-page-cover'}>
                          {spread.right}
                        </div>
                      </PageActiveContext.Provider>
                      {spread.left && <PageNumber n={i * 2 + 1} side="right" />}
                    </div>
                    {next && (
                      <div
                        className="book-face book-face-back book-paper paper-l"
                        inert={!backActive}
                      >
                        <PageActiveContext.Provider value={backActive}>
                          <div className="book-page-inner">{next.left}</div>
                        </PageActiveContext.Provider>
                        <PageNumber n={(i + 1) * 2} side="left" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {!tightW && arrow(1)}
      </div>

      <p className="sr-only" aria-live="polite">
        {`${chapters[activeChapter]?.title ?? title}, spread ${index + 1} of ${count}`}
      </p>

      {/* Chapter markers */}
      <div className="mx-auto mt-10 flex max-w-5xl flex-wrap items-center justify-center gap-x-1 gap-y-2 px-6">
        {tightW && <span className="mr-2">{arrow(-1)}</span>}
        {chapters.map((c, i) => {
          const active = i === activeChapter;
          return (
            <button
              key={c.label}
              type="button"
              onClick={() => go(c.spread)}
              title={c.title}
              aria-current={active ? 'step' : undefined}
              aria-label={`${c.label}: ${c.title}`}
              className={`cursor-pointer rounded-full px-3 py-1.5 text-xs transition-colors ${
                active
                  ? 'bg-foreground text-background'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {c.label}
            </button>
          );
        })}
        <span className="mx-2 h-4 w-px bg-foreground/15" aria-hidden="true" />
        <button
          type="button"
          onClick={() => setAsOnePage(true)}
          className="cursor-pointer rounded-full border border-foreground/15 px-3 py-1.5 text-xs text-foreground transition-colors hover:border-foreground/40"
        >
          Read as one page
        </button>
        {tightW && <span className="ml-2">{arrow(1)}</span>}
      </div>
      <p className="mt-2 text-center text-[11px] text-muted-foreground">
        Turn pages with the arrows, your ← → keys, or by clicking a page
      </p>
    </div>
  );
}
