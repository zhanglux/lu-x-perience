'use client';

import { useState } from 'react';

interface Screen {
  src: string;
  title: string;
  description: string;
}

export function KeyScreensCarousel({ siteBasePath }: { siteBasePath: string }) {
  const screens: Screen[] = [
    {
      src: `${siteBasePath}/key-screens/screen1.png`,
      title: 'Projects homepage',
      description:
        'Deal cards with stage badges, last-activity timestamps, and sort controls. Entry point into any active transaction.',
    },
    {
      src: `${siteBasePath}/key-screens/screen2.png`,
      title: 'Transaction workspace',
      description:
        'Three-column layout: Knowledge base with 428 documents, a persistent transaction thread, and a collapsible Toolbox and Artifacts panel.',
    },
    {
      src: `${siteBasePath}/key-screens/screen3.png`,
      title: 'Integrated tool calling',
      description:
        'Document selection → Compare tool invocation → AI thinking trace → split-diff artifact output, all within one thread.',
    },
  ];

  const [index, setIndex] = useState(0);
  const prev = () => setIndex((i) => (i - 1 + screens.length) % screens.length);
  const next = () => setIndex((i) => (i + 1) % screens.length);

  const current = screens[index];

  return (
    <div className="mt-4 select-none">
      {/* Image frame */}
      <div className="relative overflow-hidden rounded-lg border border-border bg-muted/20">
        <img
          key={current.src}
          src={current.src}
          alt={current.title}
          className="w-full object-cover object-top"
          style={{ aspectRatio: '1366 / 860' }}
          draggable={false}
        />

        {/* Prev / Next buttons */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous screen"
          className="absolute left-3 top-1/2 -translate-y-1/2 flex size-8 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next screen"
          className="absolute right-3 top-1/2 -translate-y-1/2 flex size-8 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
        >
          ›
        </button>

        {/* Counter badge */}
        <span className="absolute bottom-3 right-3 rounded-md border border-white/15 bg-black/60 px-2 py-0.5 text-xs text-white/70 backdrop-blur-sm">
          {index + 1} / {screens.length}
        </span>
      </div>

      {/* Caption */}
      <div className="mt-4 flex flex-col gap-1">
        <h3 className="text-sm font-medium text-foreground">{current.title}</h3>
        <p className="text-sm leading-6 text-muted-foreground">{current.description}</p>
      </div>

      {/* Dot indicators */}
      <div className="mt-3 flex items-center gap-2">
        {screens.map((s, i) => (
          <button
            key={s.title}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to ${s.title}`}
            className={`h-1.5 rounded-full transition-all ${
              i === index
                ? 'w-6 bg-primary'
                : 'w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
