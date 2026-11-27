'use client';

import { useState } from 'react';

/** Weekly support tickets from authors, read from the labelled chart in the original case study deck. */
const counts = [
  7, 86, 63, 68, 54, 55, 63, 60, 61, 79, 62, 91, 65, 99, 135, 80, 92, 146, 136, 144, 218, 184,
  200, 212, 219, 209, 159, 192, 246, 283, 267, 291, 326, 282, 375, 320, 319, 311, 293, 72,
];

const firstWeek = Date.UTC(2019, 8, 8); // Sunday 8 September 2019
const weekMs = 7 * 24 * 60 * 60 * 1000;

const weeks = counts.map((count, i) => {
  const date = new Date(firstWeek + i * weekMs);
  return {
    count,
    date,
    label: date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }),
  };
});

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const max = 400;
const ticks = [0, 100, 200, 300, 400];
const peak = counts.indexOf(Math.max(...counts));

export function SupportTicketsChart() {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <figure className="space-y-2">
      <div className="rounded-lg border border-border bg-surface p-4 sm:p-6">
        <p className="text-sm font-medium text-foreground">Support tickets from authors, per week</p>
        <p className="mt-1 text-xs text-muted-foreground">September 2019 to June 2020</p>

        <div className="relative mt-8 ml-8 h-48" aria-hidden="true" onMouseLeave={() => setHover(null)}>
          {ticks.map((t) => (
            <div
              key={t}
              className="absolute inset-x-0 border-t border-border"
              style={{ bottom: `${(t / max) * 100}%` }}
            >
              <span className="absolute -left-8 w-6 -translate-y-1/2 text-right text-[10px] tabular-nums text-muted-foreground">
                {t}
              </span>
            </div>
          ))}

          <div className="absolute inset-0 flex items-end gap-[2px]">
            {weeks.map((w, i) => (
              <div
                key={w.label}
                className="relative flex h-full flex-1 items-end"
                onMouseEnter={() => setHover(i)}
              >
                <div
                  className={`w-full rounded-t-[3px] transition-colors ${
                    hover === i || (hover === null && i === peak) ? 'bg-primary-strong' : 'bg-primary/60'
                  }`}
                  style={{ height: `${(w.count / max) * 100}%` }}
                />
                {i === peak && hover === null && (
                  <span
                    className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap pb-1 text-[11px] font-medium text-foreground"
                    style={{ bottom: `${(w.count / max) * 100}%` }}
                  >
                    {w.count}
                  </span>
                )}
              </div>
            ))}
          </div>

          {hover !== null && (
            <div
              className="pointer-events-none absolute z-10 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-background px-2.5 py-1.5 shadow-sm"
              style={{
                left: `${((hover + 0.5) / weeks.length) * 100}%`,
                bottom: `calc(${(weeks[hover].count / max) * 100}% + 8px)`,
              }}
            >
              <p className="text-sm font-semibold tabular-nums text-foreground">{weeks[hover].count} tickets</p>
              <p className="text-[11px] text-muted-foreground">Week of {weeks[hover].label}</p>
            </div>
          )}
        </div>

        <div className="relative ml-8 mt-2 h-4" aria-hidden="true">
          {weeks.map((w, i) =>
            i === 0 || w.date.getUTCMonth() !== weeks[i - 1].date.getUTCMonth() ? (
              <span
                key={w.label}
                className="absolute text-[10px] text-muted-foreground"
                style={{ left: `${(i / weeks.length) * 100}%` }}
              >
                {months[w.date.getUTCMonth()]}
              </span>
            ) : null,
          )}
        </div>

        <table className="sr-only">
          <caption>Support tickets from authors, per week</caption>
          <thead>
            <tr>
              <th scope="col">Week of</th>
              <th scope="col">Tickets</th>
            </tr>
          </thead>
          <tbody>
            {weeks.map((w) => (
              <tr key={w.label}>
                <td>{w.label}</td>
                <td>{w.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="text-xs leading-5 text-muted-foreground">
        Weekly tickets climbed from around 60 in autumn 2019 to a peak of 375 in the week of 3 May
        2020. Hover or tap a bar for the week.
      </figcaption>
    </figure>
  );
}
