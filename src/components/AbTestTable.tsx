import type { AbTest } from './springerNature';

/** Longest time shown on the bars, in seconds. */
const AB_TEST_SCALE = 60;

export function AbTestTable({
  test,
  images,
  siteBasePath,
}: {
  test: AbTest;
  images: Record<string, string>;
  siteBasePath: string;
}) {
  const columns = test.designs.flatMap((design, d) =>
    design.viewports.map((image, v) => ({
      design,
      d,
      viewport: image.label,
      image,
      first: v === 0,
    })),
  );
  const found = columns.map((_, c) =>
    test.questions.reduce(
      (sum, q) => sum + q.rows.filter((row) => row[c] !== null).length,
      0,
    ),
  );
  const attemptsPerColumn = test.questions.reduce((sum, q) => sum + q.rows.length, 0);
  const groupBorder = (first: boolean, d: number) =>
    first && d > 0 ? 'border-l border-border' : '';
  const groupTint = (d: number) => (d > 0 ? 'bg-primary/[0.04]' : '');

  return (
    <figure className="mt-4 space-y-2">
      <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
        <table className="w-full table-fixed border-collapse text-sm tabular-nums">
          <caption className="sr-only">{test.title}</caption>
          <thead>
            <tr>
              {test.designs.map((design, d) => (
                <th
                  key={design.label}
                  scope="colgroup"
                  colSpan={design.viewports.length}
                  className={`px-2 pb-1 pt-3 text-left sm:px-4 ${groupBorder(true, d)} ${groupTint(d)}`}
                >
                  <span className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                        d > 0
                          ? 'bg-primary-strong text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      {design.label}
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      <span className="sr-only">{design.label}: </span>
                      {design.name}
                    </span>
                  </span>
                </th>
              ))}
            </tr>
            <tr>
              {columns.map(({ design, d, viewport, first }) => (
                <th
                  key={`${design.label}-${viewport}`}
                  scope="col"
                  className={`px-2 pb-2 pt-1 text-left text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground sm:px-4 ${groupBorder(first, d)} ${groupTint(d)}`}
                >
                  {viewport}
                </th>
              ))}
            </tr>
            <tr className="border-b border-border">
              {columns.map(({ design, d, viewport, image, first }) => (
                <td
                  key={`${design.label}-${viewport}-image`}
                  className={`px-2 pb-3 sm:px-4 ${groupBorder(first, d)} ${groupTint(d)}`}
                >
                  {images[image.imageName] && (
                    <a
                      href={`${siteBasePath}${images[image.imageName]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-24 cursor-zoom-in items-center-safe overflow-hidden rounded border border-border bg-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:h-36"
                    >
                      <img
                        src={`${siteBasePath}${images[image.imageName]}`}
                        alt={`${image.alt} Opens full size in a new tab.`}
                        loading="lazy"
                        className="block h-auto w-full"
                        draggable={false}
                      />
                    </a>
                  )}
                </td>
              ))}
            </tr>
          </thead>
          {test.questions.map((question) => (
            <tbody key={question.label}>
              <tr>
                <th
                  scope="rowgroup"
                  colSpan={columns.length}
                  className="bg-muted/30 px-2 py-1.5 text-left text-xs font-medium text-foreground sm:px-4"
                >
                  {question.label}
                  <span className="font-normal text-muted-foreground"> · Find the article ({question.condition})</span>
                </th>
              </tr>
              {question.rows.map((row, r) => (
                <tr key={r} className="border-t border-border first:border-t-0">
                  {row.map((seconds, c) => {
                    const { d, first } = columns[c];
                    return (
                      <td
                        key={c}
                        className={`px-2 py-2 align-middle sm:px-4 ${groupBorder(first, d)} ${groupTint(d)}`}
                      >
                        {seconds === null ? (
                          <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary-strong">
                            <span aria-hidden="true">✕</span>
                            <span className="sm:hidden">Failed</span>
                            <span className="hidden sm:inline">Not found</span>
                          </span>
                        ) : (
                          <span className="block">
                            <span className="text-foreground">{seconds}</span>
                            <span className="text-xs text-muted-foreground"> sec</span>
                            <span
                              aria-hidden="true"
                              className="mt-1 block h-1 rounded-full bg-muted"
                            >
                              <span
                                className="block h-1 rounded-full bg-muted-foreground/60"
                                style={{
                                  width: `${Math.max(4, Math.min(100, (seconds / AB_TEST_SCALE) * 100))}%`,
                                }}
                              />
                            </span>
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          ))}
          <tfoot>
            <tr className="border-t-2 border-border">
              {columns.map(({ design, d, viewport, first }, c) => (
                <td
                  key={`${design.label}-${viewport}`}
                  className={`px-2 py-2.5 sm:px-4 ${groupBorder(first, d)} ${groupTint(d)}`}
                >
                  <span className="block text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                    Found
                  </span>
                  <span
                    className={`text-sm font-semibold ${d > 0 ? 'text-primary-strong' : 'text-foreground'}`}
                  >
                    {found[c]}
                  </span>
                  <span className="text-xs text-muted-foreground"> of {attemptsPerColumn}</span>
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
      <figcaption className="text-xs leading-5 text-muted-foreground">
        <span className="font-medium text-foreground">{test.title}.</span> {test.caption}
      </figcaption>
    </figure>
  );
}
