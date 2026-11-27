'use client';

import { Link } from 'react-aria-components';
import { siteBasePath } from '@/lib/siteBasePath';
import { homeProjects, type Project } from './projects';
import { HARDCOVER_CSS, HardcoverBook } from './search-evolution/HardcoverBook';

function WorkCard({ project, featured }: { project: Project; featured?: boolean }) {
  // The search case study is told as a book, so its card shows the book itself.
  const asBook = project.childKey === 'the-search-evolution';
  return (
    <Link
      href={`${siteBasePath}${project.path}`}
      className={`group flex flex-col overflow-hidden rounded-card border border-line-subtle bg-background outline-none transition-all duration-150 data-hovered:-translate-y-0.5 data-hovered:border-line-hover data-hovered:shadow-card-hover data-focus-visible:outline-2 data-focus-visible:outline-solid data-focus-visible:outline-offset-2 data-focus-visible:outline-primary ${
        featured ? 'md:col-span-3 md:flex-row' : ''
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
            className="size-full bg-gradient-to-b from-secondary to-tint"
          >
            <HardcoverBook className="size-full [--u:5.6px] sm:[--u:9px] md:[--u:8px] lg:[--u:11px]" />
          </div>
        ) : (
          <img
            src={`${siteBasePath}${project.image}`}
            alt={project.imageAlt}
            loading={featured ? 'eager' : 'lazy'}
            className="size-full object-cover object-left-top transition-transform duration-500 ease-out motion-safe:group-data-hovered:scale-[1.03]"
          />
        )}
      </div>

      <div className={`flex flex-1 flex-col gap-3 p-5 ${featured ? 'md:justify-center md:p-8' : ''}`}>
        <p className="font-mono text-xs text-muted-foreground">
          {project.company} · {project.year}
        </p>
        <h3
          className={`font-semibold leading-snug text-foreground ${
            featured ? 'text-xl md:text-2xl' : 'text-base'
          }`}
        >
          {project.name}
        </h3>
        <p className="text-sm leading-6 text-foreground">{project.description}</p>
        <p className="font-mono text-xs text-muted-foreground">{project.tags.join(' · ')}</p>
        <span className="mt-auto pt-2 text-sm font-medium text-foreground underline decoration-primary decoration-2 underline-offset-4 group-data-hovered:decoration-foreground">
          Read case study →
        </span>
      </div>
    </Link>
  );
}

export function WorkGrid() {
  const [featured, ...rest] = homeProjects;

  return (
    <section id="work" aria-labelledby="work-heading" className="px-6 pb-16 scroll-mt-6">
      {/* Outside the card link: a link's text includes any <style> inside it, and
          browsers show that text when the link is dragged. */}
      <style>{HARDCOVER_CSS}</style>
      <div className="max-w-7xl mx-auto">
        <h2 id="work-heading" className="mb-6 text-sm font-medium text-muted-foreground">
          Selected work
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <WorkCard project={featured} featured />
          {rest.map((project) => (
            <WorkCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
