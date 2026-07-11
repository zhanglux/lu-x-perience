import {
  Search,
  Route,
  LineChart,
  FlaskConical,
  Users,
  Ticket,
  TrendingDown,
  Smile,
} from 'lucide-react';
import { siteBasePath as defaultBasePath } from '@/lib/siteBasePath';

interface ManuscriptTrackingAuthorViewProps {
  siteBasePath?: string;
}

export function ManuscriptTrackingAuthorView({
  siteBasePath = defaultBasePath,
}: ManuscriptTrackingAuthorViewProps) {
  const homeHref = `${siteBasePath}/`;
  const projectHref = `${siteBasePath}/manuscript-tracking-author-view`;

  const tags = ['User research', 'Experience mapping', 'Data analysis', 'Peer review'];

  const stats = [
    { label: 'Author interviews', value: '10 across career stages & regions' },
    { label: 'First release', value: 'Mid-2020' },
    { label: 'Measured outcome', value: 'Fewer tickets, higher satisfaction' },
  ];

  const skills = [
    {
      icon: Search,
      title: 'User research & discovery',
      body: 'Ran early, in-depth 1-to-1 interviews and concept-validation sessions with 10 authors from a range of career stages and global regions, alongside editorial staff — then synthesised it into a clear picture of motivations, behaviours, and expectations.',
    },
    {
      icon: Route,
      title: 'Experience mapping',
      body: 'Charted authors’ satisfaction and pain points across each stage of the submission journey, mapping the experience both before the project began and again after the first release to see what actually moved.',
    },
    {
      icon: LineChart,
      title: 'Data analysis & impact measurement',
      body: 'Framed the problem with quantitative data — support-ticket volumes and categorised feedback — then measured success post-launch through the drop in tickets and satisfaction-survey results.',
    },
    {
      icon: FlaskConical,
      title: 'Hypothesis & iterative strategy',
      body: 'Defined a working hypothesis at the start, then used post-release feedback to pinpoint where to keep improving: a more coherent journey and clearer contact points for authors.',
    },
    {
      icon: Users,
      title: 'Team collaboration',
      body: 'Leaned on team brainstorming and close collaboration across design, editorial, and support through the whole process — a core strength that shaped every decision.',
    },
  ];

  const outcomes = [
    {
      icon: TrendingDown,
      title: 'Fewer support tickets',
      body: 'A dramatic drop in status-related inquiries after launch.',
    },
    {
      icon: Smile,
      title: 'Higher author satisfaction',
      body: 'A measurable rise in satisfaction-survey results.',
    },
    {
      icon: Ticket,
      title: 'Less anxiety, more clarity',
      body: 'Authors could self-serve status in plain language.',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <div className="mx-auto max-w-4xl space-y-8 px-6 py-12">
        <nav className="text-sm text-muted-foreground flex items-center gap-2 flex-wrap">
          <a href={homeHref} className="hover:text-primary transition-colors">
            Portfolio
          </a>
          <span>/</span>
          <a href={projectHref} className="text-primary">
            Manuscript tracking — author view
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
          <h1 className="text-3xl font-semibold leading-tight">
            Designing the author manuscript tracker
          </h1>
          <p className="text-base leading-7 text-muted-foreground">
            Bringing transparency to peer review — so academic authors always know where their
            manuscript stands, without having to ask.
          </p>

          <figure className="overflow-hidden rounded-lg border border-border bg-muted/20">
            <img
              src={`${siteBasePath}/ms-tracking/MS-tracking.png`}
              alt="The author manuscript tracker: a dashboard showing submission status in clear, non-technical language across each stage of peer review."
              className="w-full"
              draggable={false}
            />
          </figure>
        </header>

        <blockquote className="border-l-2 border-primary/60 pl-5">
          <p className="text-base italic leading-7 text-muted-foreground">
            When authors can&apos;t see where their manuscript is in peer review, silence reads as bad
            news. That uncertainty turned into anxiety — and a steady stream of support tickets.
          </p>
        </blockquote>

        <section className="grid gap-3 sm:grid-cols-3">
          {stats.map((item) => (
            <div key={item.label} className="rounded-lg border border-border bg-muted/30 p-4">
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="mt-1 text-sm font-medium text-foreground">{item.value}</p>
            </div>
          ))}
        </section>

        <section className="rounded-xl border border-border bg-card/40 p-6">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-primary">
            01 · The problem
          </p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Peer review is slow by nature, but the process was also opaque. Once authors submitted,
            they had little visibility into what happened next — and no reliable way to tell whether
            their manuscript was progressing or stalled.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            That absence of status updates created real anxiety, and it showed up in the numbers: a
            high volume of &ldquo;where is my paper?&rdquo; inquiries landing on customer-support
            teams. We started there — analysing ticket volumes and categorised feedback to define
            the problem in the authors&apos; own terms.
          </p>
        </section>

        <section className="rounded-xl border border-border bg-card/40 p-6">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-primary">
            02 · What we did
          </p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            We set a working hypothesis early — that giving authors clear, self-serve visibility
            would reduce both anxiety and support load — and designed to test it. In-depth
            interviews and concept-validation sessions with authors and editorial staff grounded the
            work, and experience journey mapping made the pain points impossible to ignore.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Through iterative sketching and team brainstorming, we shaped a dashboard built around
            one principle: plain, non-technical language at every stage. Authors shouldn&apos;t need
            to decode editorial jargon to understand where they stand.
          </p>
        </section>

        <section className="rounded-xl border border-border bg-card/40 p-6">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-primary">
            03 · Skills showcased
          </p>
          <div className="mt-4 space-y-4">
            {skills.map((skill) => {
              const Icon = skill.icon;
              return (
                <div
                  key={skill.title}
                  className="flex gap-3 rounded-lg border border-border bg-muted/30 p-4"
                >
                  <Icon
                    className="mt-0.5 h-[18px] w-[18px] shrink-0 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-sm font-medium text-foreground">{skill.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{skill.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <figure className="space-y-2">
          <div className="overflow-hidden rounded-lg border border-border bg-muted/20 p-4">
            <img
              src={`${siteBasePath}/ms-tracking/experience-map.png`}
              alt="Experience journey map charting authors’ satisfaction and pain points across each stage of the submission process, compared before the project and after the first release."
              className="w-full"
              draggable={false}
            />
          </div>
          <figcaption className="text-xs text-muted-foreground">
            Experience journey map — authors’ satisfaction and pain points across the submission
            process, before the project and after the first release.
          </figcaption>
        </figure>

        <section className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-primary">
            The impact
          </p>
          <div className="grid gap-3 md:grid-cols-3">
            {outcomes.map((outcome) => {
              const Icon = outcome.icon;
              return (
                <div
                  key={outcome.title}
                  className="rounded-lg border border-border bg-muted/30 p-4"
                >
                  <Icon className="mb-2 h-5 w-5 text-muted-foreground" aria-hidden="true" />
                  <h3 className="text-sm font-medium text-foreground">{outcome.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{outcome.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card/40 p-6">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-primary">
            What we&apos;d refine next
          </p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            The tracker met authors&apos; basic expectations, but the release also surfaced the next
            layer of opportunity. Re-mapping the journey afterwards pointed to two clear areas:
            smoothing the submission journey into something more coherent end to end, and
            communicating editorial delays more openly — with clear contact points when authors need
            a human.
          </p>
        </section>

        <section className="rounded-xl border border-primary/30 bg-primary/5 p-6">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-primary">Takeaway</p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Early user validation and collaborative design aren&apos;t nice-to-haves — they&apos;re
            what made this work. Talking to authors before building, and iterating together across
            design, editorial, and support, is what turned a source of anxiety into a system people
            actually trust.
          </p>
        </section>

        <section className="pt-2 border-t border-border">
          <a
            href={homeHref}
            className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            ← Back to portfolio
          </a>
        </section>
      </div>
    </div>
  );
}
