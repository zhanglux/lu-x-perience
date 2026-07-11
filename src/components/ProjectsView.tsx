import { siteBasePath } from '@/lib/siteBasePath';
import { childLinkAnchorId, setReturnAnchor } from '@/lib/terminalHistory';
import type { ChildPageKey } from './childPages';

interface ProjectsViewProps {
  /** Id of the terminal output this view is rendered in — used to build a stable
   *  return anchor so the homepage scrolls back to the clicked link. */
  outputId?: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  status: string;
  year: string;
  link?: string;
  /** Set for internal case studies that navigate to their own page (same tab). */
  childKey?: ChildPageKey;
}

export function ProjectsView({ outputId }: ProjectsViewProps = {}) {
  const projects: Project[] = [
    {
      id: '001',
      name: 'search-builder-ai-filters',
      description:
        'Advanced search interface with AI-powered filter suggestions and intuitive query building.',
      tech: ['UX Design', 'Product Design', 'AI/ML'],
      status: 'Shipped',
      year: '2024',
      link: 'https://engineering.signal-ai.com/design-prototypes/save-search/search-builder-v3',
    },
    {
      id: '002',
      name: 'design-system-rebuild',
      description:
        "Building a component library from the ground up — after outgrowing someone else's",
      tech: ['Design Systems', 'Component Library', 'Design Tokens'],
      status: 'In progress',
      year: '2026',
      link: `${siteBasePath}/design-system-rebuild`,
      childKey: 'design-system-rebuild',
    },
    {
      id: '003',
      name: 'signal-ai-innovation-week',
      description:
        'Our annual company-wide event where anyone can pitch an idea, form a team, and use cutting-edge technology to solve real business problems—all while having fun building together.',
      tech: ['Serious Innovation', 'Seriously Fun'],
      status: 'Shipped',
      year: '2024–2025',
      link: `${siteBasePath}/signal-ai-innovation-week`,
      childKey: 'signal-ai-innovation-week',
    },
    {
      id: '004',
      name: 'manuscript-tracking-author-view',
      description:
        'Redesigned the manuscript tracking experience to bring transparency to peer review for a platform handling 4,000+ submissions every month.',
      tech: ['Experience Mapping', 'Impact Measurement', 'Team Collaboration'],
      status: 'Shipped',
      year: '2020',
      link: `${siteBasePath}/manuscript-tracking-author-view`,
      childKey: 'manuscript-tracking-author-view',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-sm">
        <span className="text-muted-foreground">Found {projects.length} projects</span>
      </div>

      <div className="space-y-6">
        {projects.map((project) => (
          <div key={project.id} className="space-y-2">
            <div className="flex items-start gap-4">
              <span className="text-primary font-bold shrink-0">[{project.id}]</span>
              <div className="flex-1 space-y-2 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  {project.childKey && project.link ? (
                    <a
                      href={project.link}
                      id={outputId ? childLinkAnchorId(outputId, project.childKey) : undefined}
                      onClick={() => {
                        if (outputId) {
                          setReturnAnchor(childLinkAnchorId(outputId, project.childKey!));
                        }
                      }}
                      className="text-foreground font-semibold hover:text-primary transition-colors"
                    >
                      {project.name}
                    </a>
                  ) : project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground font-semibold hover:text-primary transition-colors"
                    >
                      {project.name}
                    </a>
                  ) : (
                    <span className="text-foreground font-semibold">{project.name}</span>
                  )}
                  <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs border border-primary/30">
                    {project.status}
                  </span>
                  <span className="text-muted-foreground text-sm">{project.year}</span>
                </div>
                <div className="text-sm text-muted-foreground">{project.description}</div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground">Tech:</span>
                  <span className="text-foreground">{project.tech.join(' · ')}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 text-sm text-muted-foreground">
        Click project names to view case studies
      </div>
    </div>
  );
}
