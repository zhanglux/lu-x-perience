import type { ReactNode } from 'react';
import { siteBasePath as defaultBasePath } from '@/lib/siteBasePath';
import { JourneyMapChart } from './JourneyMapChart';
import { SupportTicketsChart } from './SupportTicketsChart';
import {
  SpringerNatureBreadcrumb,
  SpringerNatureProjectNav,
  SpringerNatureSkill,
} from './SpringerNatureProjectNav';
import { Link } from './aria';

const pageHref = '/manuscript-tracking-author-view';

interface ManuscriptTrackingAuthorViewProps {
  siteBasePath?: string;
  /** Path to the first release walkthrough video, relative to the site base path, when it exists. */
  releaseVideo?: string;
}

const tags = ['User research', 'Concept validation', 'Experience mapping', 'Impact measurement'];

const stats = [
  { value: '4,000+', label: 'submissions a month, and no status tracker' },
  { value: '10 + 4', label: 'authors and editorial staff interviewed' },
  { value: '14 June 2020', label: 'first release' },
];

/** Author feedback on the new submission system, grouped by theme. */
const feedbackThemes = [
  { label: 'Tracking: need to be able to see the status of my paper', share: 48.1 },
  { label: 'Overall process: revision submission unclear', share: 8.5 },
  { label: 'New system: unclear how to navigate', share: 6.6 },
  { label: 'New system is better', share: 6.6 },
  { label: 'Files: want to see compiled files online, or a PDF review at the end', share: 4.7 },
  { label: 'New system: unclear if I can save', share: 4.7 },
  { label: 'Everything else, including unclear instructions and slow help', share: 20.8 },
];

const careerStages = [
  { label: 'Early career (PhD)', count: 3 },
  { label: 'Early to mid career (postdoc)', count: 3 },
  { label: 'Senior (professor, senior researcher)', count: 4 },
];

const regions = [
  ['USA', 3],
  ['UK', 2],
  ['Germany', 1],
  ['China', 1],
  ['Poland', 1],
  ['Brazil', 1],
  ['Spain', 1],
] as const;

const learnings = [
  { topic: 'Motivation and context', quote: 'I am under pressure!' },
  { topic: 'Behaviour and pain points', quote: 'Communication breaks down. I feel anxious!' },
  { topic: 'Expectation', quote: 'Tell me what happened, when, for how long, and what’s next.' },
];

const takeaways = [
  'Give authors the context of why.',
  'Put the latest update first.',
  'Tell authors what they need to do and the expected timeframe.',
  'Link straight to the right app so authors can complete the task.',
];

/** How internal events became statuses an author can read. The first rows of the mapping. */
const statusMapping = [
  {
    stage: 'Submission',
    author: 'Partial submission',
    internal: 'Partial submission',
    event: 'partial-submission-created',
  },
  {
    stage: 'Submission',
    author: 'Quality check in progress',
    internal: 'Combines three stages: submission received, awaiting quality check, initial QC',
    event: 'submission-received, submission-received-email-sent',
    note: 'No event for initial QC, unless we count the first user assigned to the paper',
  },
  {
    stage: 'Initial quality check',
    author: 'Amendment required; an email has been sent with more details',
    internal: 'Out for amendment',
    event: 'submission-task-change-created',
  },
  {
    stage: 'Initial quality check',
    author: 'Amendment received',
    internal: 'Amendment received',
    event: 'submission-change-received',
  },
  {
    stage: 'Initial quality check',
    author: 'Submission was withdrawn or rejected',
    internal: 'Desk reject, or any reject by in-house editorial',
    event: '',
  },
];

const statusVocabulary = [
  { stage: 'Submission', statuses: ['Partial submission', 'Quality check'] },
  {
    stage: 'Initial quality check',
    statuses: ['Amendment required', 'Amendment received', 'Paper was withdrawn or rejected', 'Quality check passed'],
  },
  {
    stage: 'Peer review',
    statuses: [
      'Editor invited',
      'Editor appointed',
      '1 reviewer invited',
      '1 reviewer accepted',
      'Reports received, ready for editor’s decision',
      'Accepted / rejected / requires revision',
    ],
  },
  {
    stage: 'Revisions',
    statuses: [
      'Revision quality check',
      'Amendment required',
      'Amendment received',
      'Editor evaluates revision',
      'Accepted / rejected / requires revision',
    ],
  },
  {
    stage: 'Publication',
    statuses: ['Awaiting payment', 'Payment received', 'Awaiting licence', 'Licence received', 'Paper sent to production'],
  },
];

const improvements = [
  { title: 'A coherent journey', body: 'Let authors reach tracking information from their account.' },
  { title: 'An overview that eases anxiety', body: 'A progress updates view.' },
  { title: 'A more transparent process', body: 'If there’s a delay, say why.' },
  { title: 'A clear contact', body: 'Show authors who to contact from the start.' },
];

function Section({
  number,
  eyebrow,
  title,
  children,
}: {
  number: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-5 border-t border-border pt-10">
      <div className="space-y-2">
        <p className="text-eyebrow font-medium uppercase tracking-eyebrow text-primary-strong">
          {number} · {eyebrow}
        </p>
        <h2 className="text-2xl font-semibold leading-tight text-foreground">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Body({ children }: { children: ReactNode }) {
  return <p className="text-base leading-7 text-foreground">{children}</p>;
}

function Shot({
  src,
  alt,
  caption,
  className = '',
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={`space-y-2 ${className}`}>
      <div className="overflow-hidden rounded-control border border-border bg-surface">
        <img src={src} alt={alt} className="w-full" loading="lazy" draggable={false} />
      </div>
      {caption && <figcaption className="text-xs leading-5 text-muted-foreground">{caption}</figcaption>}
    </figure>
  );
}

export function ManuscriptTrackingAuthorView({
  siteBasePath = defaultBasePath,
  releaseVideo,
}: ManuscriptTrackingAuthorViewProps) {
  const img = (name: string) => `${siteBasePath}/ms-tracking/${name}`;

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <div className="mx-auto max-w-4xl space-y-10 px-6 py-12">
        <SpringerNatureBreadcrumb
          siteBasePath={siteBasePath}
          href={pageHref}
          title="Manuscript tracking for authors"
        />

        <header className="space-y-5">
          <SpringerNatureSkill href={pageHref} />
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
          <h1 className="text-3xl font-semibold leading-tight">Designing the author manuscript tracker</h1>
          <p className="text-base leading-7 text-foreground">
            Authors submitting to the new peer review system had no way to see where their manuscript
            was. We researched what they needed to know, designed a tracker in plain language, and
            measured what changed.
          </p>
          <p className="text-sm text-muted-foreground">Springer Nature · May – June 2020</p>

          <figure className="overflow-hidden rounded-control border border-border bg-muted/20">
            <img
              src={img('submissions-manager.webp')}
              alt="The Submissions Manager author dashboard: manuscripts in progress with their current status and next action, a mobile view of the same list, and close-ups of the status tabs and requests for amendments, payment details and licence."
              className="w-full"
              draggable={false}
            />
          </figure>

          <div className="grid gap-3 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-control border border-border bg-muted/30 p-4">
                <p className="text-xl font-semibold text-foreground">{s.value}</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </header>

        <Section number="01" eyebrow="Background" title="4,000 submissions a month, and no status tracker">
          <Body>
            By mid-2020 the new peer review system was receiving more than 4,000 submissions a month.
            But once authors submitted, there was nothing to tell them what happened next.
          </Body>
        </Section>

        <Section number="02" eyebrow="The problem" title="Frustrated authors, overwhelmed customer support">
          <Body>
            Authors were left completely in the dark, and the customer service team was handling a
            high volume of calls about it.
          </Body>

          <div className="grid gap-4 md:grid-cols-[1.2fr_1fr]">
            <div className="space-y-4 rounded-control border border-border bg-surface p-4 sm:p-6">
              <p className="text-sm font-medium text-foreground">Author feedback, grouped by theme</p>
              <ul className="space-y-3">
                {feedbackThemes.map((t, i) => (
                  <li key={t.label} className="space-y-1">
                    <div className="flex items-baseline justify-between gap-3 text-xs">
                      <span className={i === 0 ? 'font-medium text-foreground' : 'text-muted-foreground'}>
                        {t.label}
                      </span>
                      <span className="shrink-0 tabular-nums font-medium text-foreground">{t.share}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted/50">
                      <div
                        className={`h-2 rounded-full ${i === 0 ? 'bg-primary-strong' : 'bg-muted-foreground/40'}`}
                        style={{ width: `${t.share}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <blockquote className="rounded-control border border-primary/30 bg-primary/5 p-5">
                <p className="text-lg leading-7 text-foreground">
                  &ldquo;No updates of peer review process and no access to submission profile.&rdquo;
                </p>
                <footer className="mt-2 text-xs text-muted-foreground">Author feedback</footer>
              </blockquote>
              <blockquote className="rounded-control border border-border bg-muted/30 p-5">
                <p className="text-sm leading-6 text-foreground">
                  An author asked on Twitter how to get status updates on a paper submitted in
                  December. Several status enquiries had gone unanswered, and the new system
                  &ldquo;does not offer the ability to track status.&rdquo;
                </p>
                <footer className="mt-2 text-xs text-muted-foreground">#AcademicTwitter, March 2020</footer>
              </blockquote>
            </div>
          </div>

          <SupportTicketsChart />
        </Section>

        <Section number="03" eyebrow="Our hypothesis" title="Tracking would meet a basic expectation">
          <div className="rounded-control border border-border bg-surface p-6">
            <p className="text-lg leading-8 text-foreground">
              We felt confident that by helping authors{' '}
              <strong className="font-semibold text-primary-strong">track the status</strong> of
              their submission, we would{' '}
              <strong className="font-semibold text-primary-strong">
                meet authors’ basic expectations
              </strong>
              , <strong className="font-semibold text-primary-strong">increase their satisfaction</strong>{' '}
              and <strong className="font-semibold text-primary-strong">reduce the business cost</strong>.
            </p>
          </div>
          <Body>But we didn’t know exactly what authors needed or expected:</Body>
          <ul className="grid gap-3 sm:grid-cols-3">
            {[
              'Which authors need updates on their submissions?',
              'Why, and when?',
              'At what level of detail?',
            ].map((q) => (
              <li key={q} className="rounded-control border border-dashed border-border p-4 text-sm text-foreground">
                {q}
              </li>
            ))}
          </ul>
        </Section>

        <Section number="04" eyebrow="Design process" title="Brainstorming solutions as a team">
          <Body>
            We started with a team sketching session. Everyone sketched how a status tracker might
            work, and we marked the ideas worth taking forward.
          </Body>
          <div className="grid items-start gap-4 sm:grid-cols-[1.6fr_1fr]">
            <Shot
              src={img('sketch-board.webp')}
              alt="A shared board of sketches from the team session, with promising ideas outlined in orange: status summaries, a progress timeline, and a 'what to do next' prompt with an upload button."
              caption="The team’s sketches, with the ideas we took forward outlined."
            />
            <Shot
              src={img('sketch-detail.webp')}
              alt="A hand-drawn sketch of 'Your submission': each manuscript shows its current status, such as 'request revision' with a due date or 'reviewer reports received, ready for editor’s decision' marked overdue, with buttons to view history, submit a revision or get support."
              caption="One sketch: current status, due dates and the next action for each manuscript."
            />
          </div>
        </Section>

        <Section number="05" eyebrow="Design process" title="Prototype test and concept validation">
          <Body>
            We turned the sketches into a prototype to test the concept with authors: a list of
            submissions with their current status, and a detail view with the full history.
          </Body>
          <div className="grid items-start gap-4 sm:grid-cols-[1.35fr_1fr]">
            <Shot
              src={img('prototype-list.webp')}
              alt="Prototype of 'Your submissions' in the Springer Nature Editorial System, listing two manuscripts with their current status and a progress ring."
              caption="Submissions list with current status."
            />
            <Shot
              src={img('prototype-detail.webp')}
              alt="Prototype of a single manuscript’s tracking page, with a five-step progress bar and a dated history of peer review events."
              caption="One manuscript: progress steps and a dated history."
            />
          </div>
        </Section>

        <Section number="06" eyebrow="Understand our users" title="One-to-one interviews and concept validation">
          <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
            <div className="space-y-4 rounded-control border border-border bg-surface p-5">
              <p className="flex items-baseline gap-2">
                <span className="text-4xl font-semibold text-foreground">10</span>
                <span className="text-sm text-muted-foreground">authors</span>
              </p>
              <div className="flex h-3 gap-[2px] overflow-hidden rounded-full" aria-hidden="true">
                {careerStages.map((c, i) => (
                  <div
                    key={c.label}
                    className={['bg-primary/40', 'bg-primary/70', 'bg-primary-strong'][i]}
                    style={{ width: `${c.count * 10}%` }}
                  />
                ))}
              </div>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {careerStages.map((c, i) => (
                  <li key={c.label} className="flex items-center gap-2">
                    <span
                      className={`h-2.5 w-2.5 rounded-chip ${['bg-primary/40', 'bg-primary/70', 'bg-primary-strong'][i]}`}
                      aria-hidden="true"
                    />
                    <span className="tabular-nums font-medium text-foreground">{c.count}</span> {c.label}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4 rounded-control border border-border bg-surface p-5">
              <p className="text-sm font-medium text-foreground">From seven countries</p>
              <ul className="flex flex-wrap gap-2">
                {regions.map(([country, n]) => (
                  <li key={country} className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">
                    {country} <span className="tabular-nums font-medium text-foreground">{n}</span>
                  </li>
                ))}
              </ul>
              <p className="border-t border-border pt-4 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">+ 4 journal editorial staff</span>, based in
                London
              </p>
            </div>
          </div>
        </Section>

        <Section number="07" eyebrow="What we learnt" title="Under pressure, and in the dark">
          <div className="grid gap-3 md:grid-cols-3">
            {learnings.map((l) => (
              <div key={l.topic} className="rounded-control border border-border bg-muted/30 p-5">
                <p className="text-eyebrow font-medium uppercase tracking-eyebrow text-muted-foreground">{l.topic}</p>
                <p className="mt-3 text-lg leading-7 text-foreground">&ldquo;{l.quote}&rdquo;</p>
              </div>
            ))}
          </div>
          <Body>
            We mapped authors’ current experience against five things they need from the process.
            Three of the five left them frustrated.
          </Body>
          <JourneyMapChart
            id="journey-map"
            initialMode="before"
            caption="Author experience before the project: satisfaction and pain points at each stage. Switch to After or Compare to see the map we redrew after the first release."
          />
        </Section>

        <Section number="08" eyebrow="Key takeaways" title="What the tracker had to do">
          <ol className="grid gap-3 sm:grid-cols-2">
            {takeaways.map((t, i) => (
              <li key={t} className="flex gap-4 rounded-control border border-border bg-surface p-5">
                <span className="text-2xl font-semibold tabular-nums text-primary-strong">{i + 1}</span>
                <span className="text-sm leading-6 text-foreground">{t}</span>
              </li>
            ))}
          </ol>
        </Section>

        <Section number="09" eyebrow="Design process" title="Design iteration">
          <Body>
            We iterated on the Submissions Manager across desktop, tablet and mobile: tabs for
            manuscripts in progress, published and rejected; the latest update first; and each
            pending task with its due date and a button to complete it.
          </Body>
          <div className="grid items-start gap-4 sm:grid-cols-[2fr_1.3fr_0.75fr]">
            <Shot
              src={img('iteration-desktop.webp')}
              alt="Desktop Submissions Manager with tabs for manuscripts in progress, published papers and rejected manuscripts. Each manuscript lists pending requests, such as an amendment or payment information, with due dates and action buttons."
              caption="Desktop"
            />
            <Shot
              src={img('iteration-tablet.webp')}
              alt="Tablet layout of 'Track your submissions', showing each manuscript’s current status, such as 'Paper sent to production'."
              caption="Tablet"
            />
            <Shot
              src={img('iteration-mobile.webp')}
              alt="Mobile layout of 'Track your submissions', with each manuscript’s latest status, such as '1 reviewer appointed', and when it changed."
              caption="Mobile"
            />
          </div>
        </Section>

        <Section number="10" eyebrow="Plain language" title="Use language authors will understand">
          <Body>
            The system tracked manuscripts with internal labels and events that meant nothing to
            authors. We mapped each event to a status written for authors, then user tested every
            status term.
          </Body>

          <div className="overflow-x-auto rounded-control border border-border bg-surface">
            <table className="w-full min-w-[640px] text-left text-sm">
              <caption className="px-5 pt-5 text-left text-sm font-medium text-foreground">
                From system events to author status
              </caption>
              <thead>
                <tr className="border-b border-border text-xs text-muted-foreground">
                  <th scope="col" className="px-5 py-3 font-medium">Stage</th>
                  <th scope="col" className="px-5 py-3 font-medium">Status shown to the author</th>
                  <th scope="col" className="px-5 py-3 font-medium">Internal meaning</th>
                  <th scope="col" className="px-5 py-3 font-medium">System event</th>
                </tr>
              </thead>
              <tbody>
                {statusMapping.map((row) => (
                  <tr key={row.author} className="border-b border-border align-top last:border-0">
                    <td className="px-5 py-3 text-xs text-muted-foreground">{row.stage}</td>
                    <td className="px-5 py-3 font-medium text-foreground">{row.author}</td>
                    <td className="px-5 py-3 text-muted-foreground">{row.internal}</td>
                    <td className="px-5 py-3">
                      {row.event ? (
                        <code className="break-words font-mono text-xs text-muted-foreground">{row.event}</code>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                      {row.note && <p className="mt-1.5 text-xs text-primary-strong">{row.note}</p>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-foreground">Every status an author can see, by stage</p>
            <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {statusVocabulary.map((s, i) => (
                <li key={s.stage} className="rounded-control border border-border bg-surface p-4">
                  <p className="text-xs text-muted-foreground">Stage {i + 1}</p>
                  <p className="mt-0.5 text-sm font-medium text-foreground">{s.stage}</p>
                  <ul className="mt-3 space-y-1.5 border-t border-border pt-3">
                    {s.statuses.map((st) => (
                      <li key={st} className="text-xs leading-5 text-muted-foreground">
                        {st}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
            <p className="text-xs leading-5 text-muted-foreground">
              Reviewer counts go up as more people accept. Every term was user tested with authors.
            </p>
          </div>
        </Section>

        <Section number="11" eyebrow="First release" title="Live on 14 June 2020">
          {releaseVideo ? (
            <>
              <Body>
                The first release went live on 14 June 2020. In this walkthrough, an author submits a
                manuscript, follows the link from the confirmation page and finds each submission’s
                current status in plain language.
              </Body>
              <figure className="space-y-2">
                <video
                  src={`${siteBasePath}${releaseVideo}`}
                  poster={img('first-release-poster.webp')}
                  controls
                  playsInline
                  preload="none"
                  className="aspect-video w-full rounded-control border border-border bg-surface"
                />
                <figcaption className="text-xs text-muted-foreground">
                  The submission tracking system at first release (5 min 46 s).
                </figcaption>
              </figure>
            </>
          ) : (
            <Body>
              The first release of the submission tracker went live on 14 June 2020, showing authors
              each manuscript’s current status in plain language.
            </Body>
          )}
        </Section>

        <Section number="12" eyebrow="The outcomes" title="Less frustration, far fewer tickets">
          <Body>
            Authors were less frustrated by a lack of tracking information, and support tickets went
            down dramatically.
          </Body>
          <div className="grid items-start gap-4 md:grid-cols-2">
            <Shot
              src={img('survey.webp')}
              alt="Survey results for 'How was your submission experience?' from June to December 2020, with 585 answers, shown as monthly stacked bars from 1 (very poor) to 5 (very good)."
              caption="Authors rated their submission experience when using the tracking service: 585 answers from June to December 2020."
            />
            <Shot
              src={img('tickets-rollout.webp')}
              alt="Line chart of author tracking tickets during the roll-out, 8 to 26 June: about 220 in the week of 7 June, rising to about 320 in the week of 14 June, then falling to about 70 in the week of 21 June."
              caption="Tracking tickets before and after the first release on 14 June 2020. They fell sharply the week after launch."
            />
          </div>
          <Body>
            We also mapped the author experience again after the first release. Four of the five
            stages moved up, and none moved down.{' '}
            <Link href="#journey-map-compare" className="text-primary-strong underline-offset-4 data-hovered:underline">
              Compare before and after in the journey map
            </Link>
            .
          </Body>
        </Section>

        <Section number="13" eyebrow="Continued improvements" title="What we’d improve next">
          <Body>There were still plenty of areas to improve.</Body>
          <ul className="grid gap-3 sm:grid-cols-2">
            {improvements.map((item) => (
              <li key={item.title} className="rounded-control border border-border bg-muted/30 p-5">
                <p className="text-sm font-medium text-foreground">{item.title}</p>
                <p className="mt-1 text-sm leading-6 text-foreground">{item.body}</p>
              </li>
            ))}
          </ul>
        </Section>

        <section className="rounded-card border border-primary/30 bg-primary/5 p-6">
          <p className="text-eyebrow font-medium uppercase tracking-eyebrow text-primary-strong">Highlights</p>
          <ul className="mt-4 space-y-3 text-base leading-7 text-foreground">
            <li>Team collaboration through the whole process.</li>
            <li>Early, in-depth user research gave us a strong foundation for the design.</li>
          </ul>
        </section>

        <SpringerNatureProjectNav siteBasePath={siteBasePath} href={pageHref} />
      </div>
    </div>
  );
}
