import { siteBasePath as defaultBasePath } from '@/lib/siteBasePath';

interface SignalAiInnovationWeekViewProps {
  siteBasePath?: string;
}

export function SignalAiInnovationWeekView({
  siteBasePath = defaultBasePath,
}: SignalAiInnovationWeekViewProps) {
  const homeHref = `${siteBasePath}/`;
  const projectHref = `${siteBasePath}/signal-ai-innovation-week`;

  const subProjects: {
    name: string;
    summary: string;
    tags?: string[];
    href?: string;
    linkLabel?: string;
    image?: string;
    posterImages?: string[];
    videoHref?: string;
    videoEmbedSrc?: string;
    feedbackImage?: string;
  }[] = [
    {
      name: 'Saved Search Wizard',
      tags: ['New user onboarding', 'Topic discovery', 'Chat interface'],
      summary:
        'A chat interface that helps users explore Signal AI’s trained Entities and Topics and build searches through conversation. It tackles onboarding and discovery: new users often don’t know what Signal has already trained — searching for “Layoffs” when the matching topic is “Redundancies” — so the wizard surfaces the right terms as you describe what you’re after.',
      image: `${siteBasePath}/innovation-week/saved-search-wizard.png`,
      videoHref: 'https://www.loom.com/share/8a139d7f27bb4691a5c625d717a0338d',
      videoEmbedSrc: 'https://www.loom.com/embed/8a139d7f27bb4691a5c625d717a0338d',
      feedbackImage: `${siteBasePath}/innovation-week/feedback.png`,
    },
    {
      name: 'Team Sherpa',
      summary:
        'A tool that builds bespoke demo and trial Workspaces in seconds from a Slack voice note. Instead of spending hours manually assembling searches and dashboards, customer-facing colleagues send a few key details by voice and Sherpa generates a personalised Workspace — freeing them up to focus on customer relationships rather than setup.',
      posterImages: [
        `${siteBasePath}/innovation-week/sherpa.png`,
        `${siteBasePath}/innovation-week/Slack.png`,
      ],
      href: 'https://youtu.be/Xf9P3BBjfNU',
      linkLabel: 'View promo video',
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
            Signal AI Innovation Week
          </a>
        </nav>

        <header className="space-y-4 border-b border-border pb-6">
          <h1 className="text-3xl font-semibold leading-tight">Signal AI Innovation Week</h1>
          <p className="text-base leading-7 text-muted-foreground">
            Our annual company-wide event where anyone can pitch an idea, form a team, and use
            cutting-edge technology to solve real business problems—all while having fun building
            together.
          </p>
        </header>

        <section className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-primary">
            Projects
          </p>
          <div className="space-y-4">
            {subProjects.map((project, index) => (
              <div
                key={project.name}
                className="rounded-xl border border-border bg-card/40 p-6 space-y-3"
              >
                <h2 className="flex items-baseline gap-3 text-lg font-semibold text-foreground">
                  <span className="text-primary">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {project.name}
                </h2>
                {project.tags && (
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-muted/40 px-2.5 py-1 text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-sm leading-7 text-muted-foreground">{project.summary}</p>
                {project.videoEmbedSrc ? (
                  <div className="relative h-0 overflow-hidden rounded-lg border border-border bg-muted/20 pb-[64.63195691202873%]">
                    <iframe
                      src={project.videoEmbedSrc}
                      title={`${project.name} walkthrough`}
                      frameBorder="0"
                      allowFullScreen
                      className="absolute left-0 top-0 h-full w-full"
                    />
                  </div>
                ) : project.image ? (
                  <a
                    href={project.videoHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block overflow-hidden rounded-lg border border-border bg-muted/20 transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <img
                      src={project.image}
                      alt={`${project.name} — click to watch the walkthrough`}
                      className="w-full"
                      draggable={false}
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 flex items-center justify-center"
                    >
                      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm ring-1 ring-white/40 transition-transform duration-200 group-hover:scale-110">
                        <svg
                          viewBox="0 0 24 24"
                          className="ml-1 h-7 w-7 fill-current"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </span>
                  </a>
                ) : null}
                {project.feedbackImage ? (
                  <div className="space-y-2 pt-1">
                    <h3 className="text-xs font-medium uppercase tracking-[0.12em] text-primary">
                      Feedback
                    </h3>
                    <figure className="overflow-hidden rounded-lg border border-border bg-muted/20">
                      <img
                        src={project.feedbackImage}
                        alt={`${project.name} — feedback`}
                        className="w-full"
                        draggable={false}
                      />
                    </figure>
                  </div>
                ) : null}
                {project.posterImages && (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {project.posterImages.map((src) => (
                      <figure
                        key={src}
                        className={`overflow-hidden rounded-lg border border-border ${
                          src.includes('Slack.png') ? 'bg-white' : 'bg-muted/20'
                        }`}
                      >
                        <img
                          src={src}
                          alt={project.name}
                          className="w-full"
                          draggable={false}
                        />
                      </figure>
                    ))}
                  </div>
                )}
                {!project.image && project.href && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {project.linkLabel ?? 'View deck'} ↗
                  </a>
                )}
              </div>
            ))}
          </div>
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
