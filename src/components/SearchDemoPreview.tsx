'use client';

import { useEffect, useMemo, useState } from 'react';
import { siteBasePath } from '@/lib/siteBasePath';
import { SearchPanel, buildYears } from './SearchEvolutionView';

/** How long each year stays on screen. The homepage only needs to give the gist. */
const DWELL_MS = 1300;
/** The last year holds a little longer so the answer registers before the loop restarts. */
const LAST_DWELL_MS = 2000;

const ACCENT = '#6446FF';

/**
 * A hands-off loop of the Search Evolution demo: the same panel as the case
 * study, stepping through 2021 → 2025. Each year slides in from the right and
 * pushes the previous one out to the left, with a timeline keeping score.
 * Purely a preview, so it is inert.
 */
export default function SearchDemoPreview() {
  const years = useMemo(() => buildYears(siteBasePath), []);
  const [step, setStep] = useState({ current: 0, previous: -1 });

  useEffect(() => {
    const isLast = step.current === years.length - 1;
    const timer = setTimeout(
      () =>
        setStep(({ current }) => ({
          current: (current + 1) % years.length,
          previous: current,
        })),
      isLast ? LAST_DWELL_MS : DWELL_MS,
    );
    return () => clearTimeout(timer);
  }, [step, years.length]);

  return (
    <div
      aria-hidden="true"
      inert
      className="demo-preview-enter absolute inset-0 overflow-hidden bg-background/85 backdrop-blur-sm"
    >
      <style>{`
        .demo-preview-enter { animation: demoPreviewIn 0.25s ease-out; }
        @keyframes demoPreviewIn { from { opacity: 0; } to { opacity: 1; } }
        .demo-push-in { animation: demoPushIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .demo-push-out { animation: demoPushOut 0.45s cubic-bezier(0.22, 1, 0.36, 1) both; }
        @keyframes demoPushIn {
          from { opacity: 0; transform: translateX(70%); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes demoPushOut {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(-70%); }
        }
      `}</style>

      {/* Both panels share one grid cell so the incoming one can push the old one out. */}
      <div className="mx-auto grid w-full max-w-md px-6 pt-6 text-left">
        {step.previous >= 0 && (
          <div key={`out-${step.previous}`} className="demo-push-out col-start-1 row-start-1">
            {/* `reduced` skips the typing and confetti: every year shows its end state at once. */}
            <SearchPanel years={years} yearIndex={step.previous} reduced basePath={siteBasePath} />
          </div>
        )}
        <div
          key={`in-${step.current}`}
          className={`col-start-1 row-start-1 ${step.previous >= 0 ? 'demo-push-in' : ''}`}
        >
          <SearchPanel years={years} yearIndex={step.current} reduced basePath={siteBasePath} />
        </div>
      </div>

      {/* Timeline */}
      <ol className="absolute inset-x-0 bottom-3 mx-auto flex w-fit items-center gap-1 rounded-full border border-foreground/10 bg-background/95 px-2 py-1 text-xs shadow-sm">
        {years.map((y, i) => (
          <li
            key={y.year}
            className="rounded-full px-2.5 py-0.5 transition-colors duration-300"
            style={
              i === step.current
                ? { background: ACCENT, color: '#fff' }
                : { color: i < step.current ? ACCENT : 'var(--muted-foreground)' }
            }
          >
            {y.year}
          </li>
        ))}
      </ol>
    </div>
  );
}
