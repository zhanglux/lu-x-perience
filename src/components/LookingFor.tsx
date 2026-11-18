import { AtSignIcon } from '@/components/ui/at-sign';
import { LinkedinIcon } from '@/components/ui/linkedin';
import { IconLink, type AnimatedIcon } from './IconLink';

const criteria = [
  'A business obsessed with solving genuine customer problems.',
  'A mission-led organisation with strong ethics.',
  'A culture that values curiosity, ownership and bold ideas.',
];

/**
 * The page's closing section: what kind of team I want to join, and how to
 * reach me. It is the last thing a visitor reads, so it ends on an action.
 */
export function LookingFor() {
  return (
    <section
      aria-labelledby="looking-for-heading"
      className="border-y border-foreground/10 bg-secondary/50 px-6 py-16 md:py-24"
    >
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[2fr_3fr] md:gap-16">
        <div className="space-y-5">
          <p className="text-sm font-medium text-muted-foreground">What I&apos;m looking for</p>
          <h2
            id="looking-for-heading"
            className="text-2xl font-semibold leading-tight tracking-tight md:text-4xl"
          >
            The kind of company I want to help build.
          </h2>
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
            Open to new opportunities in London
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <IconLink
              href="mailto:luhzhang@gmail.com"
              label="Email me"
              Icon={AtSignIcon as AnimatedIcon}
              variant="primary"
            />
            <IconLink
              href="https://www.linkedin.com/in/zhanglux"
              label="LinkedIn"
              Icon={LinkedinIcon as AnimatedIcon}
              external
            />
          </div>
        </div>

        <ol className="border-b border-foreground/15">
          {criteria.map((item, i) => (
            <li
              key={item}
              className="flex gap-5 border-t border-foreground/15 py-6 md:gap-8 md:py-7"
            >
              <span className="pt-1 text-sm tabular-nums text-muted-foreground" aria-hidden="true">
                0{i + 1}
              </span>
              <span className="text-lg leading-snug text-foreground md:text-xl">{item}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
