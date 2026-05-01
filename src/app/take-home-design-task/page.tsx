import type { Metadata } from 'next';
import { siteBasePath } from '@/lib/siteBasePath';

export const metadata: Metadata = {
  title: 'Take-home design task — Lu Zhang',
  description: 'Take-home design task interview briefing and artifact',
};

export default function TakeHomeDesignTaskPage() {
  const homeHref = `${siteBasePath}/`;

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
        <div>
          <a
            href={homeHref}
            className="text-sm text-primary hover:underline underline-offset-4"
          >
            ← Back to portfolio
          </a>
        </div>

        <header className="space-y-2 border-b border-border pb-6">
          <p className="text-primary text-sm">Take-home design task · Interview</p>
          <h1 className="text-2xl font-semibold">Take-home design task</h1>
          <p className="text-sm text-muted-foreground">
            Artifact for interviews: framing, priorities, flows, and what I would validate next.
          </p>
        </header>

        <section className="space-y-3 text-sm text-muted-foreground">
          <h2 className="text-foreground font-medium text-base">Brief</h2>
          <p>
            Candidates receive a bounded scenario (problem statement, personas or constraints,
            timeline, deliverables). The goal is to show problem framing, iterative thinking, and clear
            communication—not pixel polish alone.
          </p>
        </section>

        <section className="space-y-3 text-sm text-muted-foreground">
          <h2 className="text-foreground font-medium text-base">What I ship</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Problem recap and assumptions (explicit)</li>
            <li>User / business goals with trade-offs</li>
            <li>Flows or IA, annotated key states</li>
            <li>What I would validate next</li>
          </ul>
        </section>

        <section className="space-y-3 text-sm text-muted-foreground">
          <h2 className="text-foreground font-medium text-base">Timeline</h2>
          <p>Typical artifact window aligns with hiring team guidance (often a few focused days).</p>
        </section>
      </div>
    </div>
  );
}
