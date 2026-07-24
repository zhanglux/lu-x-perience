'use client';

import { useEffect, useState } from 'react';
import { X, BookOpen } from 'lucide-react';
import { siteBasePath as defaultBasePath } from '@/lib/siteBasePath';

interface SearchEvolutionViewProps {
  siteBasePath?: string;
}

type StoryBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'image'; src: string; alt: string };

interface Milestone {
  year: string;
  title: string;
  body: string;
  image: string;
  story: StoryBlock[];
}

export function SearchEvolutionView({
  siteBasePath = defaultBasePath,
}: SearchEvolutionViewProps) {
  const homeHref = `${siteBasePath}/`;
  const projectHref = `${siteBasePath}/the-search-evolution`;

  const tags = ['UX Design', 'Product Design', 'AI/LLM'];

  const milestones: Milestone[] = [
    {
      year: 'Year 1',
      title: 'The Data Blizzard',
      body: 'Too much flexibility created chaos',
      image: `${siteBasePath}/search-2.0/year1.png`,
      story: [
        { type: 'heading', text: 'Problem' },
        {
          type: 'paragraph',
          text: 'Our customers loved the flexibility of Search. They built millions of keywords, chained together into highly complex queries.',
        },
        { type: 'paragraph', text: 'The result was chaos.' },
        {
          type: 'paragraph',
          text: 'The workspace became an enormous web of keywords, entities and relationships. As searches grew, so did the cost of maintaining them. Customers experienced slow searches, failed dashboard refreshes and increasingly fragile workspaces.',
        },
        { type: 'paragraph', text: 'The platform was powerful—but impossible to scale.' },
        { type: 'heading', text: 'UX lesson' },
        {
          type: 'paragraph',
          text: 'More flexibility doesn’t always create a better experience.',
        },
      ],
    },
    {
      year: 'Year 2',
      title: 'From Searching to Discovering',
      body: 'Users couldn’t discover entities',
      image: `${siteBasePath}/search-2.0/year2.png`,
      story: [
        { type: 'paragraph', text: 'Customers didn’t actually want more keywords.' },
        {
          type: 'paragraph',
          text: 'By 2024 we had already trained hundreds of high-quality AI entities and topics, but hardly anyone used them. The problem wasn’t the data—it was discoverability. Unless users already knew the exact entity name, they fell back to long keyword lists.',
        },
        {
          type: 'paragraph',
          text: 'During Innovation Week, two engineers and I explored a different interaction.',
        },
        {
          type: 'paragraph',
          text: 'Instead of forcing users to remember the right entity, the interface suggests relevant concepts as they type. A simple word like “environment” surfaces entities such as Climate Change, Sustainability and Conservation.',
        },
        {
          type: 'paragraph',
          text: 'We shifted the experience from recall to recognition, making precise searches dramatically easier to build.',
        },
      ],
    },
    {
      year: 'Year 3',
      title: 'From One Giant Query to Structured Thinking',
      body: 'Queries were impossible to understand',
      image: `${siteBasePath}/search-2.0/year3.png`,
      story: [
        {
          type: 'paragraph',
          text: 'Entity-powered searches were more accurate, but they were still difficult to manage.',
        },
        {
          type: 'paragraph',
          text: 'Everything lived inside one large query. Editing a single condition meant navigating a dense wall of logic. Customers struggled to understand their own searches, while our support team spent hours untangling configurations.',
        },
        { type: 'paragraph', text: 'We redesigned the experience around structure.' },
        {
          type: 'paragraph',
          text: 'Instead of one overwhelming query, searches became organised into predictable groups such as Organisations, Topics and Keywords.',
        },
        {
          type: 'paragraph',
          text: 'Breaking one complex problem into smaller, understandable pieces reduced cognitive load, simplified editing and significantly reduced configuration errors.',
        },
      ],
    },
    {
      year: 'Year 4',
      title: 'Giving Users Control of Logic',
      body: 'Structure was too rigid',
      image: `${siteBasePath}/search-2.0/year4.png`,
      story: [
        {
          type: 'paragraph',
          text: 'Clear structure solved complexity, but introduced a new limitation.',
        },
        {
          type: 'paragraph',
          text: 'Users could organise information, but they couldn’t express sophisticated logic. Complex monitoring required creating multiple searches and stitching them together manually, making maintenance slow and error-prone.',
        },
        { type: 'paragraph', text: 'We removed those constraints.' },
        {
          type: 'paragraph',
          text: 'Users could now freely combine organisations, topics and keywords within nested logical groups, expressing exactly the question they wanted to ask in a single search.',
        },
        {
          type: 'image',
          src: `${siteBasePath}/search-2.0/v2-search.png`,
          alt: 'Search 2.0 interface showing flexible nested logic groups.',
        },
        { type: 'paragraph', text: 'One search replaced many.' },
        {
          type: 'paragraph',
          text: 'The experience became simpler to build, easier to maintain and significantly more powerful.',
        },
      ],
    },
    {
      year: 'Year 5',
      title: 'From Building Searches to Asking Questions',
      body: 'Building searches isn’t the real job',
      image: `${siteBasePath}/search-2.0/year5.png`,
      story: [
        {
          type: 'paragraph',
          text: 'After years of improving search building, we realised something fundamental.',
        },
        { type: 'paragraph', text: 'Customers never wanted to build searches.' },
        { type: 'paragraph', text: 'They wanted answers.' },
        {
          type: 'paragraph',
          text: 'So we redesigned the experience around intent instead of query syntax.',
        },
        {
          type: 'paragraph',
          text: 'Rather than constructing Boolean logic, users simply describe what they’re looking for:',
        },
        {
          type: 'quote',
          text: 'Find articles discussing Google’s latest semantic search advancements, compare them with competitors, but exclude stock performance news.',
        },
        {
          type: 'paragraph',
          text: 'Behind the scenes, AI understands the meaning of the request, classifies relevant content and returns precisely matched results.',
        },
        {
          type: 'paragraph',
          text: 'The customer no longer thinks about keywords, entities or Boolean operators.',
        },
        { type: 'paragraph', text: 'They simply ask a question.' },
        {
          type: 'paragraph',
          text: 'This is the evolution of search—from constructing queries to communicating intent.',
        },
      ],
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const active = openIndex === null ? null : milestones[openIndex];

  // Close on Escape and lock background scroll while the overlay is open.
  useEffect(() => {
    if (active === null) {
      return;
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenIndex(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [active]);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <div className="mx-auto max-w-4xl space-y-8 px-6 py-12">
        <nav className="text-sm text-muted-foreground flex items-center gap-2 flex-wrap">
          <a href={homeHref} className="hover:text-primary transition-colors">
            Portfolio
          </a>
          <span>/</span>
          <a href={projectHref} className="text-primary">
            The Search Evolution
          </a>
        </nav>

        <header className="space-y-4 border-b border-border pb-6">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-muted/40 px-2.5 py-1 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl font-semibold leading-tight">The Search Evolution</h1>
          <p className="text-base leading-7 text-muted-foreground">
            From keyword chaos to intent-driven clarity — a five-year story of how search grew up,
            one year at a time.
          </p>

          <figure className="overflow-hidden rounded-lg border border-border bg-muted/20">
            <img
              src={`${siteBasePath}/search-2.0/search-evolution.png`}
              alt="The Search Evolution — an overview of five years of search moving from keyword chaos to intent-driven clarity."
              className="w-full"
              draggable={false}
            />
          </figure>
        </header>

        <ol className="relative space-y-12 border-l border-border pl-8">
          {milestones.map((milestone, index) => (
            <li key={milestone.year} className="relative">
              <span
                className="absolute -left-[38px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-primary bg-background"
                aria-hidden="true"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              </span>

              <p className="text-xs font-medium uppercase tracking-[0.12em] text-primary">
                {milestone.year}
              </p>
              <h2 className="mt-1 text-xl font-semibold leading-tight text-foreground">
                {milestone.title}
              </h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{milestone.body}</p>

              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                className="mt-3 inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                Read the story
              </button>

              <figure className="mt-4 overflow-hidden rounded-lg border border-border bg-muted/20">
                <img
                  src={milestone.image}
                  alt={`${milestone.year}: ${milestone.title}`}
                  className="w-full"
                  draggable={false}
                />
              </figure>
            </li>
          ))}
        </ol>

        <section className="pt-2 border-t border-border">
          <a
            href={homeHref}
            className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            ← Back to portfolio
          </a>
        </section>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="story-title"
        >
          <div
            className="absolute inset-0 bg-background/80"
            onClick={() => setOpenIndex(null)}
            aria-hidden="true"
          />

          <div className="relative z-10 flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-border bg-background shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-border p-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-primary">
                  {active.year}
                </p>
                <h2
                  id="story-title"
                  className="mt-1 text-xl font-semibold leading-tight text-foreground"
                >
                  {active.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpenIndex(null)}
                aria-label="Close story"
                className="shrink-0 rounded-md border border-border p-2 text-muted-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-3 overflow-y-auto p-6">
              {active.story.map((block, i) => {
                if (block.type === 'heading') {
                  return (
                    <p
                      key={i}
                      className="pt-2 text-xs font-medium uppercase tracking-[0.12em] text-primary"
                    >
                      {block.text}
                    </p>
                  );
                }
                if (block.type === 'quote') {
                  return (
                    <blockquote
                      key={i}
                      className="border-l-2 border-primary/60 pl-4 text-sm italic leading-7 text-foreground"
                    >
                      {block.text}
                    </blockquote>
                  );
                }
                if (block.type === 'image') {
                  return (
                    <figure
                      key={i}
                      className="overflow-hidden rounded-lg border border-border bg-muted/20"
                    >
                      <img
                        src={block.src}
                        alt={block.alt}
                        className="w-full"
                        draggable={false}
                      />
                    </figure>
                  );
                }
                return (
                  <p key={i} className="text-sm leading-7 text-foreground">
                    {block.text}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
