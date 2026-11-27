'use client';

import { siteBasePath } from '@/lib/siteBasePath';
import { childLinkAnchorId, setReturnAnchor } from '@/lib/terminalHistory';
import { projects } from './projects';
import { Link } from 'react-aria-components';

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
                <span id={outputId ? childLinkAnchorId(outputId, project.childKey) : undefined}>
                  <Link
                    href={`${siteBasePath}${project.path}`}
                    onPress={() => {
                      if (outputId) {
                        setReturnAnchor(childLinkAnchorId(outputId, project.childKey));
                      }
                    }}
                    className="text-foreground font-semibold outline-none transition-colors data-hovered:text-primary-strong data-focus-visible:outline-2 data-focus-visible:outline-solid data-focus-visible:outline-offset-2 data-focus-visible:outline-primary"
                  >
                    {project.name}
                  </Link>
                </span>
                <span className="px-2 py-0.5 rounded-chip bg-primary/10 text-foreground text-xs border border-primary/30">
                  {project.status}
                </span>
                <span className="text-muted-foreground text-sm">
                  {project.company} · {project.year}
                </span>
              </div>
              <div className="text-sm text-foreground">{project.description}</div>
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
