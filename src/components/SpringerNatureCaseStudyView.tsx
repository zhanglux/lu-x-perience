import { siteBasePath as defaultBasePath } from '@/lib/siteBasePath';
import { AbTestTable } from './AbTestTable';
import {
  SpringerNatureBreadcrumb,
  SpringerNatureProjectNav,
  SpringerNatureSkill,
} from './SpringerNatureProjectNav';
import type { Angle } from './springerNature';

interface SpringerNatureCaseStudyViewProps {
  angle: Angle;
  siteBasePath?: string;
  /** Images found in public/field-notes, keyed by file name without extension. */
  images?: Record<string, string>;
}

/** One Springer Nature case study on its own page. */
export function SpringerNatureCaseStudyView({
  angle,
  siteBasePath = defaultBasePath,
  images = {},
}: SpringerNatureCaseStudyViewProps) {
  const study = angle.caseStudy;
  const href = `/${study.slug}`;

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <div className="mx-auto max-w-4xl space-y-8 px-4 py-12 sm:px-6">
        <SpringerNatureBreadcrumb siteBasePath={siteBasePath} href={href} title={study.title} />

        <header className="space-y-3">
          <SpringerNatureSkill href={href} />
          <h1 className="text-3xl font-semibold leading-tight">{study.title}</h1>
          <p className="text-base leading-7 text-muted-foreground">{study.summary}</p>
          <p className="text-xs text-muted-foreground">Springer Nature · {study.year}</p>
          <p className="text-sm leading-6 text-foreground">
            <span className="font-medium">My role:</span> {study.role}
          </p>
        </header>

        <article className="space-y-6">
          {study.stats && (
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 py-2 sm:grid-cols-4">
              {study.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse justify-end border-t-2 border-foreground pt-3">
                  <dt className="mt-1 text-xs leading-5 text-muted-foreground">{stat.label}</dt>
                  <dd className="text-2xl font-semibold leading-none text-primary-strong">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          {study.outputs && (
            <div className="py-1">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                {study.outputs.heading}
              </p>
              <ul className="mt-2 grid gap-x-6 gap-y-1 text-sm text-foreground sm:grid-cols-3">
                {study.outputs.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden="true" className="text-primary-strong">
                      —
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <figure className="space-y-2">
            {images[study.imageName] ? (
              <div className="overflow-hidden rounded-lg bg-background p-3 sm:p-4">
                <img
                  src={`${siteBasePath}${images[study.imageName]}`}
                  alt={study.imageAlt}
                  loading="lazy"
                  className="mx-auto block h-auto w-auto max-w-full"
                  draggable={false}
                />
              </div>
            ) : (
              <div
                role="img"
                aria-label={`Image to come: ${study.imageAlt}`}
                className="flex aspect-[16/9] flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-border bg-muted/20 p-4 text-center"
              >
                <p className="text-sm font-medium text-muted-foreground">Image to come</p>
                <p className="text-xs text-muted-foreground">
                  public/field-notes/{study.imageName}.png
                </p>
              </div>
            )}
            <figcaption className="text-xs text-muted-foreground">
              {study.caption}
            </figcaption>
          </figure>

          {study.background && (
            <div>
              <h2 className="text-base font-semibold text-foreground">Background</h2>
              <p className="mt-1 text-sm leading-7 text-muted-foreground">
                {study.background}
              </p>
            </div>
          )}

          {study.phases?.map((phase) => (
            <div key={phase.title} className="rounded-lg bg-muted/30 p-3 sm:p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h2 className="text-base font-semibold text-foreground">{phase.title}</h2>
                {phase.when && (
                  <span className="text-xs text-muted-foreground">{phase.when}</span>
                )}
              </div>
              {phase.role && (
                <p className="mt-1 text-sm leading-6 text-foreground">
                  <span className="font-medium">My role:</span> {phase.role}
                </p>
              )}
              {phase.lead && (
                <p className="mt-3 border-l-2 border-primary-strong pl-3 text-sm leading-6 text-foreground">
                  <span className="font-medium text-primary-strong">{phase.lead.label}:</span>{' '}
                  {phase.lead.text}
                </p>
              )}
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-6 text-muted-foreground">
                {phase.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              {phase.findings && (
                <dl className="mt-4 space-y-2">
                  {phase.findings.map((finding) => (
                    <div
                      key={finding.label}
                      className="grid gap-x-4 gap-y-0.5 text-sm leading-6 sm:grid-cols-[88px_minmax(0,1fr)]"
                    >
                      <dt className="text-xs font-medium uppercase leading-6 tracking-[0.12em] text-primary-strong">
                        {finding.label}
                      </dt>
                      <dd className="text-foreground">{finding.text}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {phase.steps && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-foreground">{phase.steps.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{phase.steps.intro}</p>
                  <ol className="mt-3 grid grid-cols-1 items-start gap-3 sm:grid-cols-3">
                    {phase.steps.items.map((item, i) => (
                      <li
                        key={item.imageName}
                        className="flex flex-row overflow-hidden rounded-lg bg-background sm:flex-col"
                      >
                        {images[item.imageName] && (
                          <div className="w-24 shrink-0 self-start p-2 sm:w-auto">
                            <img
                              src={`${siteBasePath}${images[item.imageName]}`}
                              alt={`Journal homepage, version ${i + 1} of ${phase.steps!.items.length}.`}
                              loading="lazy"
                              className="mx-auto block h-auto w-auto max-w-full"
                              draggable={false}
                            />
                          </div>
                        )}
                        <div className="min-w-0 flex-1 break-words p-3">
                          <p className="text-xs font-medium text-foreground">
                            <span className="text-primary-strong">
                              {String(i + 1).padStart(2, '0')}
                            </span>{' '}
                            {item.label}
                          </p>
                          <p className="mt-1 text-xs leading-5 text-muted-foreground">
                            {item.text}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
              {phase.abTest && (
                <AbTestTable test={phase.abTest} images={images} siteBasePath={siteBasePath} />
              )}
              {phase.figure && images[phase.figure.imageName] && (
                <figure className="mt-4 space-y-2">
                  <a
                    href={`${siteBasePath}${images[phase.figure.imageName]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block cursor-zoom-in overflow-hidden rounded-lg bg-background p-3 transition-opacity sm:p-4 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <img
                      src={`${siteBasePath}${images[phase.figure.imageName]}`}
                      alt={`${phase.figure.alt} Opens full size in a new tab.`}
                      loading="lazy"
                      className="mx-auto block h-auto w-auto max-w-full"
                      draggable={false}
                    />
                  </a>
                  <figcaption className="text-xs leading-5 text-muted-foreground">
                    <span className="font-medium text-foreground">{phase.figure.title}.</span>{' '}
                    {phase.figure.caption} Select the image to view it full size.
                  </figcaption>
                </figure>
              )}
            </div>
          ))}
        </article>

        {angle.also.length > 0 && (
          <section aria-labelledby="related-heading">
            <h2 id="related-heading" className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
              Related work · {angle.label}
            </h2>
            {angle.also.map((piece) => (
              <div key={piece.title} className="border-t border-border py-4 first-of-type:mt-3">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-sm font-medium text-foreground">
                    {piece.title}
                    {piece.year && (
                      <span className="font-normal text-muted-foreground"> · {piece.year}</span>
                    )}
                  </h3>
                  {piece.stat && (
                    <span className="text-xs font-medium text-foreground">{piece.stat}</span>
                  )}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{piece.method}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{piece.line}</p>
              </div>
            ))}
          </section>
        )}

        <SpringerNatureProjectNav siteBasePath={siteBasePath} href={href} />
      </div>
    </div>
  );
}
