import { siteBasePath } from '@/lib/siteBasePath';
import { childLinkAnchorId, setReturnAnchor } from '@/lib/terminalHistory';
import { projects } from './projects';

interface ProjectsViewProps {
  /** Id of the terminal output this view is rendered in — used to build a stable
   *  return anchor so the homepage scrolls back to the clicked link. */
  outputId?: string;
}

export function ProjectsView({ outputId }: ProjectsViewProps = {}) {
  return (
    <div className="space-y-6">
      <div className="text-sm">
        <span className="text-muted-foreground">Found {projects.length} projects</span>
      </div>

      <div className="space-y-6">
        {projects.map((project) => (
          <div key={project.id} className="flex items-start gap-4">
            <span className="text-primary-strong font-bold shrink-0">[{project.id}]</span>
            <div className="flex-1 space-y-2 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <a
                  href={`${siteBasePath}${project.path}`}
                  id={outputId ? childLinkAnchorId(outputId, project.childKey) : undefined}
                  onClick={() => {
                    if (outputId) {
                      setReturnAnchor(childLinkAnchorId(outputId, project.childKey));
                    }
                  }}
                  className="text-foreground font-semibold hover:text-primary-strong transition-colors"
                >
                  {project.name}
                </a>
                <span className="px-2 py-0.5 rounded bg-primary/10 text-foreground text-xs border border-primary/30">
                  {project.status}
                </span>
                <span className="text-muted-foreground text-sm">
                  {project.company} · {project.year}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">{project.description}</div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-muted-foreground">Focus:</span>
                <span className="text-foreground">{project.tags.join(' · ')}</span>
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
