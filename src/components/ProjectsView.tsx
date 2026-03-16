export function ProjectsView() {
  const projects = [
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
      name: 'risk-heat-map',
      description: 'Interactive visualization tool for risk assessment and data analysis.',
      tech: ['Data Visualization', 'Dashboard Design'],
      status: 'Shipped',
      year: '2024',
      link: 'https://engineering.signal-ai.com/design-prototypes/risk-heat-map',
    },
    {
      id: '003',
      name: 'risk-matrix',
      description:
        'Comprehensive risk management interface with matrix-based analysis.',
      tech: ['Enterprise UX', 'Data Design'],
      status: 'Shipped',
      year: '2024',
      link: 'https://engineering.signal-ai.com/design-prototypes/risk-matrix',
    },
    {
      id: '004',
      name: 'reputation-risk-report',
      description:
        'Detailed reporting interface for reputation risk insights and analytics.',
      tech: ['Reporting', 'Information Architecture'],
      status: 'Shipped',
      year: '2024',
      link: 'https://engineering.signal-ai.com/design-prototypes/rep-risk-report',
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
                  {project.link ? (
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
