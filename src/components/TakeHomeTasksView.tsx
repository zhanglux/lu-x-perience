import { siteBasePath } from '@/lib/siteBasePath';
import { childLinkAnchorId, setReturnAnchor } from '@/lib/terminalHistory';
import type { ChildPageKey } from './childPages';

interface TakeHomeTasksViewProps {
  /** Id of the terminal output this view is rendered in — used to build a stable
   *  return anchor so the homepage scrolls back to the clicked link. */
  outputId?: string;
}

export function TakeHomeTasksView({ outputId }: TakeHomeTasksViewProps = {}) {
  const tasks = [
    {
      id: '001',
      name: 'Orbital Copilot',
      href: '/take-home-design-task',
      childKey: 'take-home-design-task' as ChildPageKey,
      description:
        'Interview artifact: briefing, constraints, and how I approach a bounded design exercise end to end.',
      tech: ['Product Design', 'Systems Thinking', 'Vibe coding'],
      status: 'Take-home design task',
      year: '2026',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-sm">
        <span className="text-muted-foreground">
          Found {tasks.length} interview design task{tasks.length === 1 ? '' : 's'}
        </span>
      </div>

      <div className="space-y-6">
        {tasks.map((task) => (
          <div key={task.id} className="space-y-2">
            <div className="flex items-start gap-4">
              <span className="text-primary font-bold shrink-0">[{task.id}]</span>
              <div className="flex-1 space-y-2 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <a
                    href={`${siteBasePath}${task.href}`}
                    id={outputId ? childLinkAnchorId(outputId, task.childKey) : undefined}
                    onClick={() => {
                      if (outputId) {
                        setReturnAnchor(childLinkAnchorId(outputId, task.childKey));
                      }
                    }}
                    className="text-foreground font-semibold hover:text-primary transition-colors"
                  >
                    {task.name}
                  </a>
                  <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs border border-primary/30">
                    {task.status}
                  </span>
                  <span className="text-muted-foreground text-sm">{task.year}</span>
                </div>
                <div className="text-sm text-muted-foreground">{task.description}</div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground">Tech:</span>
                  <span className="text-foreground">{task.tech.join(' · ')}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 text-sm text-muted-foreground">
        Click task names to open the interview design task page
      </div>
    </div>
  );
}
