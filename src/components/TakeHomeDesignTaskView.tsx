import { siteBasePath as defaultBasePath } from '@/lib/siteBasePath';
import { KeyScreensCarousel } from '@/app/take-home-design-task/KeyScreensCarousel';

interface TakeHomeDesignTaskViewProps {
  siteBasePath?: string;
}

export function TakeHomeDesignTaskView({
  siteBasePath = defaultBasePath,
}: TakeHomeDesignTaskViewProps) {
  const homeHref = `${siteBasePath}/`;
  const takeHomeHref = `${siteBasePath}/take-home-design-task`;
  const prototypeHref = `${siteBasePath}/take-home-design-task/prototype`;

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <div className="mx-auto max-w-4xl space-y-8 px-6 py-12">
        <nav className="text-sm text-muted-foreground flex items-center gap-2 flex-wrap">
          <a href={homeHref} className="hover:text-primary transition-colors">
            Portfolio
          </a>
          <span>/</span>
          <a href={takeHomeHref} className="text-primary">
            Take-home design task
          </a>
        </nav>

      <header className="space-y-3 border-b border-border pb-6">
        <p className="text-primary text-sm tracking-wide uppercase">
          Design Task · Orbital Copilot · 2026
        </p>
        <h1 className="text-3xl font-semibold leading-tight">
          Copilot as Conductor, Not Soloist
        </h1>
        <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-3">
          <p>
            Role <span className="text-foreground">Product Designer</span>
          </p>
          <p>
            Format <span className="text-foreground">Take-home</span>
          </p>
          <p>
            Focus <span className="text-foreground">Interaction Design</span>
          </p>
        </div>
      </header>

      <section className="rounded-xl border border-border bg-card/40 p-6">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-primary">01 · Brief</p>
        <h2 className="mt-3 text-xl font-semibold text-foreground">What we&apos;re designing</h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          Orbital Copilot is an AI-first assistant for property due diligence, built primarily for
          real estate lawyers. The task is to design an interface covering the full journey: from
          homepage to Copilot execution, whether that is answering legal questions, generating a
          report from a predefined blueprint, or resuming an existing transaction workspace.
        </p>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          The interface should feel domain-specific and document-grounded, combining conversational
          patterns with structured workflows that reflect how due diligence actually works, not a
          generic chat wrapper.
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span className="rounded-md border border-border bg-muted/40 px-2.5 py-1">
            Homepage → Copilot execution
          </span>
          <span className="rounded-md border border-border bg-muted/40 px-2.5 py-1">
            New conversation
          </span>
          <span className="rounded-md border border-border bg-muted/40 px-2.5 py-1">
            Report blueprint
          </span>
          <span className="rounded-md border border-border bg-muted/40 px-2.5 py-1">
            Resume conversation
          </span>
          <span className="rounded-md border border-border bg-muted/40 px-2.5 py-1">
            High-fidelity mockup
          </span>
          <span className="rounded-md border border-border bg-muted/40 px-2.5 py-1">
            A few hours weekend project
          </span>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-xl border border-border bg-card/40 p-6">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-primary">02 · Problem</p>
          <h2 className="mt-3 text-xl font-semibold text-foreground">The real job to be done</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Due diligence means finding legal landmines buried in messy documents under extreme
            time pressure. Lawyers hold context across title registers, leases, surveys, planning
            data, and a long closing checklist at once.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            The work is both operational (process volume, track gaps, generate output) and
            judgement-heavy (is this easement truly a risk).{' '}
            <span className="text-foreground font-medium">The best product reduces friction on
            both by putting the right information in front of the lawyer at the right moment.</span>
          </p>
        </article>

        <article className="rounded-xl border border-border bg-card/40 p-6">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-primary">
            02b · Where time goes
          </p>
          <h2 className="mt-3 text-xl font-semibold text-foreground">The four real pain points</h2>
          <div className="mt-3 space-y-2">
            <div className="rounded-lg border border-border bg-muted/30 p-2.5">
              <h3 className="text-sm font-medium text-foreground">Lease abstraction</h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Non-standard amendments still require careful manual reading at scale.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-muted/30 p-2.5">
              <h3 className="text-sm font-medium text-foreground">Title and survey</h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Small wording differences can create major legal exposure.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-muted/30 p-2.5">
              <h3 className="text-sm font-medium text-foreground">Closing checklist</h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Teams track 100+ deliverables with high signature mismatch risk.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-muted/30 p-2.5">
              <h3 className="text-sm font-medium text-foreground">Cross-document consistency</h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Lease, estoppel, and title details can conflict across documents.
              </p>
            </div>
          </div>
        </article>
      </section>

      <section className="rounded-xl border border-border bg-card/40 p-6">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-primary">
          03 · Design principle
        </p>
        <h2 className="mt-3 text-xl font-semibold text-foreground">Fit the workflow. Don&apos;t fight it.</h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          Lawyers think in transaction stages: documents, issues, negotiations, and closing. The
          process can often be messy. A product that maps to this model gets adopted; one that asks
          for a new mental model is ignored, however strong the AI is underneath.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <h3 className="text-sm font-medium text-foreground">Structure first</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Conversations map to transactions. Projects are the core unit of work.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <h3 className="text-sm font-medium text-foreground">Context persists</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Documents, reports, and issues stay grouped so users do not chase context across tabs.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <h3 className="text-sm font-medium text-foreground">Actions, not prompts</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Surface the next useful move; avoid forcing users to start from blank input.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card/40 p-6">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-primary">
          04 · Design decision
        </p>
        <h2 className="mt-3 text-xl font-semibold text-foreground">
          Deal-native, not chat-first
        </h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          Copilot should not be a chat widget bolted onto existing tools. It should orchestrate
          document extraction, map view, issue flagging, and report generation at the right step in
          the workflow.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <h3 className="text-sm font-medium text-foreground">Standalone feature pitfalls</h3>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
              <li>Users must remember to invoke &quot;Ask Copilot&quot; manually.</li>
              <li>Chat becomes detached from transaction and document context.</li>
              <li>Intelligence is interaction-gated instead of workflow-driven.</li>
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <h3 className="text-sm font-medium text-foreground">Conductor model outcomes</h3>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
              <li>Proactive suggestions per workflow stage.</li>
              <li>Cross-tool orchestration in one thread.</li>
              <li>Awareness of uploaded vs missing documents.</li>
              <li>Lower cognitive load during high-pressure work.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-xl border border-border bg-card/40 p-6">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-primary">
            05 · Trade-offs
          </p>
          <h2 className="mt-3 text-xl font-semibold text-foreground">What is consciously left open</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <h3 className="text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground">
                Shown in mockup
              </h3>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
                <li>High-level user journey</li>
                <li>Key interaction touchpoints</li>
                <li>Copilot thought process UI</li>
                <li>Detected workflow checklist</li>
                <li>Context-driven tool orchestration</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground">
                Assumed / deferred
              </h3>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
                <li>Checklist update logic after artifact generation</li>
                <li>Permissions and sharing model</li>
                <li>Report editing and export workflows</li>
                <li>Document processing edge cases and fallbacks</li>
              </ul>
            </div>
          </div>
        </article>

        <article className="rounded-xl border border-border bg-card/40 p-6">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-primary">
            06 · Alternative explored
          </p>
          <h2 className="mt-3 text-xl font-semibold text-foreground">The lawyer on-site (mobile)</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Lawyers are often on-site, in meetings, or in transit. A mobile thread focuses on
            voice-to-query, document-lite risk views, and action cards to flag, approve, or
            escalate quickly.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Mobile is less about generation and more about monitoring and fast judgement.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
            <span className="rounded-md border border-border bg-muted/40 px-2.5 py-1">Voice input</span>
            <span className="rounded-md border border-border bg-muted/40 px-2.5 py-1">Issue digest</span>
            <span className="rounded-md border border-border bg-muted/40 px-2.5 py-1">Tap-to-flag</span>
            <span className="rounded-md border border-border bg-muted/40 px-2.5 py-1">Push alerts</span>
          </div>
        </article>
      </section>

      <section className="rounded-xl border border-border bg-card/40 p-6">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-primary">
          07 · Key screens
        </p>
        <h2 className="mt-3 text-xl font-semibold text-foreground">What the prototype covers</h2>
        <KeyScreensCarousel siteBasePath={siteBasePath} />
      </section>

      <section className="rounded-xl border border-border bg-card/40 p-6 text-sm text-muted-foreground">
        Orbital Witness · Copilot Interface · Design Challenge 2026
      </section>

      <section className="pt-2 border-t border-border">
        <a
          href={prototypeHref}
          className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Demo prototype →
        </a>
      </section>
      </div>
    </div>
  );
}
