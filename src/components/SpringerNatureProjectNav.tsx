import { homeSectionPath, projectLinks } from './springerNature';
import { Link } from './aria';

const buttonClass =
  'inline-flex items-center rounded-control border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors data-hovered:border-primary data-hovered:text-primary-strong outline-none data-focus-visible:ring-2 data-focus-visible:ring-ring data-focus-visible:ring-offset-2 data-focus-visible:ring-offset-background';

/** Breadcrumb from the portfolio to the current project page. */
export function SpringerNatureBreadcrumb({
  siteBasePath,
  href,
  title,
}: {
  siteBasePath: string;
  href: string;
  title: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground flex items-center gap-2 flex-wrap">
      <Link href={`${siteBasePath}/`} className="data-hovered:text-primary-strong transition-colors">
        Portfolio
      </Link>
      <span aria-hidden="true">/</span>
      <Link href={`${siteBasePath}${href}`} aria-current="page" className="text-primary-strong">
        {title}
      </Link>
    </nav>
  );
}

/** The skill a project proves, shown above its title. */
export function SpringerNatureSkill({ href }: { href: string }) {
  const link = projectLinks.find((p) => p.href === href);
  if (!link) return null;
  return (
    <p className="text-sm leading-6 text-foreground">
      <span className="text-eyebrow font-medium uppercase tracking-eyebrow text-primary-strong">
        {link.angle.label}
      </span>
      <span className="text-muted-foreground"> · {link.angle.claim}</span>
    </p>
  );
}

/** Previous and next Springer Nature project, and a way back home, at the foot of a project page. */
export function SpringerNatureProjectNav({
  siteBasePath,
  href,
}: {
  siteBasePath: string;
  href: string;
}) {
  const index = projectLinks.findIndex((p) => p.href === href);
  const previous = index > 0 ? projectLinks[index - 1] : undefined;
  const next = index >= 0 && index < projectLinks.length - 1 ? projectLinks[index + 1] : undefined;

  return (
    <nav aria-label="Springer Nature projects" className="space-y-6 border-t border-border pt-6">
      {(previous || next) && (
        <div className="grid gap-3 sm:grid-cols-2">
          {previous ? (
            <Link
              href={`${siteBasePath}${previous.href}`}
              className="group rounded-control border border-border p-4 transition-colors data-hovered:border-primary"
            >
              <span className="block text-xs text-muted-foreground">← Previous Springer Nature project</span>
              <span className="mt-1 block text-sm font-medium text-foreground group-data-hovered:text-primary-strong">
                {previous.title}
              </span>
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}
          {next && (
            <Link
              href={`${siteBasePath}${next.href}`}
              className="group rounded-control border border-border p-4 text-right transition-colors data-hovered:border-primary"
            >
              <span className="block text-xs text-muted-foreground">Next Springer Nature project →</span>
              <span className="mt-1 block text-sm font-medium text-foreground group-data-hovered:text-primary-strong">
                {next.title}
              </span>
            </Link>
          )}
        </div>
      )}
      <Link href={`${siteBasePath}${homeSectionPath}`} className={buttonClass}>
        ← Back to portfolio
      </Link>
    </nav>
  );
}
