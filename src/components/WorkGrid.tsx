import { siteBasePath } from '@/lib/siteBasePath';
import { homeGroups, type Project } from './projects';
import { HARDCOVER_CSS, HardcoverBook } from './search-evolution/HardcoverBook';

/** Column spans on the six-column grid, so rows of two or three cards fill the width. */
function spansFor(count: number): string[] {
  const wide = count % 3 === 2 ? 2 : count % 3 === 1 && count > 1 ? 4 : 0;
  return Array.from({ length: count }, (_, i) =>
    count === 1 ? 'md:col-span-6' : i < wide ? 'md:col-span-3' : 'md:col-span-2',
  );
}

function WorkCard({
  project,
  featured,
  span = '',
}: {
  project: Project;
  featured?: boolean;
  span?: string;
}) {
  // The search case study is told as a book, so its card shows the book itself.
  const asBook = project.childKey === 'the-search-evolution';
  return (
    <a
      href={`${siteBasePath}${project.path}`}
      className={`group flex flex-col overflow-hidden rounded-xl border border-foreground/10 bg-background transition-all duration-150 hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
        featured ? 'md:col-span-6 md:flex-row' : span
      }`}
    >
      <div
        className={`overflow-hidden bg-muted/40 ${
          featured ? 'md:w-1/2 aspect-[13/9]' : 'aspect-[16/10]'
        }`}
      >
        {asBook ? (
          <div
            role="img"
            aria-label="A hardcover book titled Redesigning search, by Lu Zhang."
            className="size-full bg-gradient-to-b from-secondary to-[#F1D9C8]"
          >
            <HardcoverBook className="size-full [--u:5.6px] sm:[--u:9px] md:[--u:8px] lg:[--u:11px]" />
          </div>
        ) : (
          <img
            src={`${siteBasePath}${project.image}`}
            alt={project.imageAlt}
            loading={featured ? 'eager' : 'lazy'}
            className="size-full object-cover object-left-top transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
          />
        )}
      </div>

      <div className={`flex flex-1 flex-col gap-3 p-5 ${featured ? 'md:justify-center md:p-8' : ''}`}>
        <p className="text-xs text-muted-foreground">
          {project.company} · {project.year}
        </p>
        <h3
          className={`font-semibold leading-snug text-foreground ${
            featured ? 'text-xl md:text-2xl' : 'text-base'
          }`}
        >
          {project.name}
        </h3>
        <p className="text-sm leading-6 text-muted-foreground">{project.description}</p>
        <p className="text-xs text-muted-foreground">{project.tags.join(' · ')}</p>
        <span className="mt-auto pt-2 text-sm font-medium text-foreground underline decoration-primary decoration-2 underline-offset-4 group-hover:decoration-foreground">
          Read case study →
        </span>
      </div>
    </a>
  );
}

export function WorkGrid() {
  return (
    <section id="work" aria-label="Selected work" className="px-6 pb-16 scroll-mt-6">
      {/* Outside the card link: a link's text includes any <style> inside it, and
          browsers show that text when the link is dragged. */}
      <style>{HARDCOVER_CSS}</style>
      <div className="max-w-7xl mx-auto space-y-14">
        {homeGroups.map((group, g) => {
          const [first, ...rest] = group.projects;
          const featured = g === 0 ? first : undefined;
          const cards = featured ? rest : group.projects;
          const spans = spansFor(cards.length);
          return (
            <section
              key={group.id}
              id={group.id}
              aria-labelledby={`${group.id}-heading`}
              className="scroll-mt-6"
            >
              <div className="mb-6">
                <h2 id={`${group.id}-heading`} className="text-sm font-medium text-muted-foreground">
                  {group.heading}
                </h2>
                {group.intro && <p className="mt-1 text-sm text-muted-foreground">{group.intro}</p>}
              </div>
              <div className="grid gap-6 md:grid-cols-6">
                {featured && <WorkCard project={featured} featured />}
                {cards.map((project, i) => (
                  <WorkCard key={project.id} project={project} span={spans[i]} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}
