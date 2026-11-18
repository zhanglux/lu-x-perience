'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { siteBasePath } from '@/lib/siteBasePath';
import { homeProjects, type Project } from './projects';

// Loaded on first hover so the homepage doesn't carry the demo up front.
const SearchDemoPreview = dynamic(() => import('./SearchDemoPreview'), { ssr: false });

/** True on devices that can hover, are wide enough for the demo, and allow motion. */
function useCanPreview() {
  const [can, setCan] = useState(false);
  useEffect(() => {
    const queries = [
      window.matchMedia('(hover: hover) and (min-width: 768px)'),
      window.matchMedia('(prefers-reduced-motion: no-preference)'),
    ];
    const update = () => setCan(queries.every((q) => q.matches));
    update();
    queries.forEach((q) => q.addEventListener('change', update));
    return () => queries.forEach((q) => q.removeEventListener('change', update));
  }, []);
  return can;
}

function WorkCard({ project, featured }: { project: Project; featured?: boolean }) {
  const canPreview = useCanPreview();
  const [active, setActive] = useState(false);
  const showDemo = Boolean(featured) && canPreview && active;

  return (
    <a
      href={`${siteBasePath}${project.path}`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      className={`group flex flex-col overflow-hidden rounded-xl border border-foreground/10 bg-background transition-all duration-150 hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
        featured ? 'md:col-span-3 md:flex-row' : ''
      }`}
    >
      <div
        className={`relative overflow-hidden bg-muted/40 ${
          featured ? 'md:w-3/5 aspect-[16/9]' : 'aspect-[16/10]'
        }`}
      >
        <img
          src={`${siteBasePath}${project.image}`}
          alt={project.imageAlt}
          loading={featured ? 'eager' : 'lazy'}
          className="size-full object-cover object-left-top transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
        />
        {showDemo && <SearchDemoPreview />}
        {featured && canPreview && !active && (
          <span className="absolute bottom-3 right-3 rounded-full bg-foreground/85 px-3 py-1 text-xs font-medium text-background">
            Hover to play the demo
          </span>
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
  const [featured, ...rest] = homeProjects;

  return (
    <section id="work" aria-labelledby="work-heading" className="px-6 pb-16 scroll-mt-6">
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
