'use client';

import { useState } from 'react';
import { Button } from 'react-aria-components';

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
      <div className="relative overflow-hidden rounded-control border border-border bg-muted/20">
        <img
          key={current.src}
          src={current.src}
          alt={current.title}
          className="w-full object-cover object-top"
          style={{ aspectRatio: '1366 / 860' }}
          draggable={false}
        />

        {/* Prev / Next buttons */}
        <Button
          onPress={prev}
          aria-label="Previous screen"
          className="absolute left-3 top-1/2 -translate-y-1/2 flex size-8 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-sm outline-none transition-colors data-hovered:bg-black/70 data-focus-visible:outline-2 data-focus-visible:outline-solid data-focus-visible:outline-offset-2 data-focus-visible:outline-primary"
        >
          <span aria-hidden="true">‹</span>
        </Button>
        <Button
          onPress={next}
          aria-label="Next screen"
          className="absolute right-3 top-1/2 -translate-y-1/2 flex size-8 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-sm outline-none transition-colors data-hovered:bg-black/70 data-focus-visible:outline-2 data-focus-visible:outline-solid data-focus-visible:outline-offset-2 data-focus-visible:outline-primary"
        >
          <span aria-hidden="true">›</span>
        </Button>

        {/* Counter badge */}
        <span className="absolute bottom-3 right-3 rounded-control border border-white/15 bg-black/60 px-2 py-0.5 text-xs text-white/70 backdrop-blur-sm">
          {index + 1} / {screens.length}
        </span>
      </div>

      {/* Caption */}
      <div className="mt-4 flex flex-col gap-1">
        <h3 className="text-sm font-medium text-foreground">{current.title}</h3>
        <p className="text-sm leading-6 text-foreground">{current.description}</p>
      </div>

      {/* Dot indicators */}
      <div className="mt-3 flex items-center gap-2">
        {screens.map((s, i) => (
          <Button
            key={s.title}
            onPress={() => setIndex(i)}
            aria-label={`Go to ${s.title}`}
            aria-current={i === index ? 'true' : undefined}
            className={`h-1.5 rounded-full outline-none transition-all data-focus-visible:outline-2 data-focus-visible:outline-solid data-focus-visible:outline-offset-2 data-focus-visible:outline-primary ${
              i === index
                ? 'w-6 bg-primary'
                : 'w-1.5 bg-muted-foreground/30 data-hovered:bg-muted-foreground/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
