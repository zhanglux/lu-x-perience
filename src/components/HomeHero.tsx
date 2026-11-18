'use client';

import { useState } from 'react';
import { siteBasePath } from '@/lib/siteBasePath';
import { ArrowDownIcon } from '@/components/ui/arrow-down';
import { AtSignIcon } from '@/components/ui/at-sign';
import { GithubIcon } from '@/components/ui/github';
import { LinkedinIcon } from '@/components/ui/linkedin';
import { HeroTiles } from './HeroTiles';
import { IconLink, type AnimatedIcon } from './IconLink';
import { TilePortrait } from './TilePortrait';

const links: { label: string; href: string; Icon: AnimatedIcon; external?: boolean }[] = [
  { label: 'Email', href: 'mailto:luhzhang@gmail.com', Icon: AtSignIcon as AnimatedIcon },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/zhanglux',
    Icon: LinkedinIcon as AnimatedIcon,
    external: true,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/zhanglux',
    Icon: GithubIcon as AnimatedIcon,
    external: true,
  },
];

export function HomeHero() {
  // The portrait assembles first, then hands off to a wave across the hero.
  const [portraitDone, setPortraitDone] = useState(false);

  return (
    <header className="relative px-6 pt-12 pb-10 md:pt-20 md:pb-14">
      <HeroTiles play={portraitDone} />
      <div className="relative max-w-7xl mx-auto flex flex-col-reverse gap-8 md:flex-row md:items-start md:justify-between">
        <div data-hero-text className="max-w-3xl space-y-5">
          <p className="text-sm text-muted-foreground">London, UK</p>
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight tracking-tight">
            Lu Zhang
          </h1>
          <p className="text-xl md:text-2xl leading-snug text-foreground">
            Senior Product Designer who ships code.
          </p>
          <p className="text-base leading-7 text-muted-foreground">
            I design AI-powered search and intelligence products at Signal AI, and prototype
            them in React so design and engineering work from the same thing. Previously
            Senior UX Designer at Springer Nature.
          </p>
          <nav aria-label="Contact" className="flex flex-wrap items-center gap-3 pt-2 text-sm">
            <IconLink
              href="#work"
              label="See my work"
              Icon={ArrowDownIcon as AnimatedIcon}
              variant="primary"
              iconAfter
            />
            {links.map((link) => (
              <IconLink key={link.label} {...link} />
            ))}
          </nav>
        </div>

        <TilePortrait
          src={`${siteBasePath}/portrait.png`}
          alt="Portrait of Lu Zhang"
          className="size-28 md:size-44"
          onAssembled={() => setPortraitDone(true)}
        />
      </div>
    </header>
  );
}
