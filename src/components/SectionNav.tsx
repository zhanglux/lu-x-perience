'use client';

import { useEffect, useState } from 'react';
import { Link } from 'react-aria-components';

/** Section links that follow the reader: a rail on wide screens, a row of chips on narrow ones. */
export function SectionNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: '-15% 0px -75% 0px' },
    );
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="On this page"
      className="sticky top-0 z-20 -mx-4 border-b border-border bg-background/95 px-4 py-2 backdrop-blur sm:-mx-6 sm:px-6 lg:top-8 lg:mx-0 lg:self-start lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none"
    >
      <p className="mb-3 hidden text-eyebrow font-medium uppercase tracking-eyebrow text-muted-foreground lg:block">
        On this page
      </p>
      <ul className="flex gap-2 overflow-x-auto [scrollbar-width:none] lg:flex-col lg:gap-0 lg:overflow-visible">
        {items.map((item, i) => {
          const current = active === item.id;
          return (
            <li key={item.id} className="shrink-0">
              <Link
                href={`#${item.id}`}
                aria-current={current ? 'true' : undefined}
                className={`block whitespace-nowrap rounded-full lg:whitespace-normal border px-3 py-1.5 text-xs outline-none transition-colors data-focus-visible:ring-2 data-focus-visible:ring-primary-strong lg:rounded-none lg:border-0 lg:border-l-2 lg:py-2 lg:pl-3 lg:pr-0 lg:text-sm ${
                  current
                    ? 'border-primary-strong font-semibold text-primary-strong'
                    : 'border-border text-muted-foreground data-hovered:text-foreground'
                }`}
              >
                <span aria-hidden="true" className="mr-2 hidden text-xs lg:inline">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
