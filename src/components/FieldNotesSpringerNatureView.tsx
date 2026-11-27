import { siteBasePath as defaultBasePath } from '@/lib/siteBasePath';
import { SectionNav } from './SectionNav';
import { Link } from './aria';

interface FieldNotesSpringerNatureViewProps {
  siteBasePath?: string;
  /**
   * Images found in public/field-notes, keyed by file name without extension,
   * with the path relative to the site base path as the value. A lead piece
   * whose image is missing shows a placeholder.
   */
  images?: Record<string, string>;
}

interface Piece {
  title: string;
  year?: string;
  method: string;
  line: string;
  stat?: string;
  /** Path relative to the site base path, for pieces with their own page. */
  href?: string;
}

interface LeadPiece {
  title: string;
  year: string;
  role: string;
  body: string[];
  /** Optional structured version of the story, shown in place of plain paragraphs. */
  background?: string;
  phases?: {
    title: string;
    when?: string;
    role?: string;
    /** A labelled statement shown before the bullets, such as the hypothesis. */
    lead?: { label: string; text: string };
    points: string[];
    /** Labelled findings or results, shown after the bullets. */
    findings?: { label: string; text: string }[];
    /** An image for this phase; imageName is a file in public/field-notes, without extension. */
    figure?: { imageName: string; alt: string; title: string; caption: string };
    /** A results table for a timed A/B test, shown in place of a figure. */
    abTest?: AbTest;
    /** A numbered sequence of releases; imageName is a file in public/field-notes, without extension. */
    steps?: { title: string; intro: string; items: { imageName: string; label: string; text: string }[] };
  }[];
  /** Headline numbers: a figure and what it counts. */
  stats?: { value: string; label: string }[];
  /** For pieces without numbers: what came out of the work. */
  outputs?: { heading: string; items: string[] };
  /** File name in public/field-notes, without extension. */
  imageName: string;
  imageAlt: string;
  caption: string;
}

/** One attempt: seconds taken to find the article, or null if the participant gave up. */
type Attempt = number | null;

interface AbTest {
  title: string;
  caption: string;
  /** Column groups, each with its viewports; imageName is a file in public/field-notes, without extension. */
  designs: {
    label: string;
    name: string;
    viewports: { label: string; imageName: string; alt: string }[];
  }[];
  /** One block per question; each row holds one attempt per viewport column, left to right. */
  /** condition says where the target article sat on the page, such as above the fold. */
  questions: { label: string; condition: string; rows: Attempt[][] }[];
}

interface Angle {
  id: 'research-methods' | 'evidence-based-design' | 'strategy' | 'collaboration';
  label: string;
  claim: string;
  lead: LeadPiece;
  also: Piece[];
}

const angles: Angle[] = [
  {
    id: 'research-methods',
    label: 'Research methods',
    claim: 'I choose the research method that fits the question.',
    lead: {
      title: 'Springer journal redesign',
      year: '2019',
      role: 'Led the research, then worked with two other designers on the homepage redesign.',
      body: [],
      background:
        'The business needed to redesign and re-engineer a new platform to host thousands of reputable scientific journals. But the development team had no clear picture of the user problems or of the current user experience. So there was no clear UX outcome to focus on, and no way to measure our success.',
      phases: [
        {
          title: 'Research phase: understand our customers',
          when: 'Mar – Apr 2019',
          role: 'I was in charge of the research.',
          points: [
            'Worked with stakeholders and the development team to agree the problem statements, hypotheses and research questions.',
            'Partnered with the UX research lead and research ops to plan the research: methods, recruitment, scheduling and incentives.',
            'Ran the research in person and remotely, with the team and stakeholders observing the sessions.',
            'Mapped the current user experience, pain points and opportunities, and shared them back with the team and stakeholders.',
          ],
          figure: {
            imageName: 'submission-journey-map',
            alt: 'A journey map of how an author decides where to submit a paper, laid out along a timeline with researcher goals above, editor goals below, and colour-coded notes for pain points and opportunities.',
            title: 'How authors decide where to submit, from start to finish',
            caption:
              'The author’s end-to-end submission flow across several platforms. Using the research insights, I defined the user goals and mapped the current experience: the journey, the pain points and the opportunities.',
          },
        },
        {
          title: 'Delivery phase: deliver the outcome step by step',
          when: 'Apr – Jul 2019',
          role: 'I worked with two other designers on the homepage redesign, the IA and features to attract submissions.',
          points: [
            'Pulled out the journey related to our current delivery, and added the research and analysis results to show what we were tracking to measure success.',
            'Identified the main user goals and journeys from the research, and worked with the PO and delivery team to prioritise the roadmap around them.',
            'Worked with brand design to iterate on the design, rolling out a modern, accessible journal homepage step by step.',
          ],
          steps: {
            title: 'How the homepage evolved',
            intro: 'Six versions, each released before the next was designed.',
            items: [
              {
                imageName: 'homepage-step-1',
                label: 'Content first',
                text: 'First goal: get the content in from the database.',
              },
              {
                imageName: 'homepage-step-2',
                label: 'Research applied',
                text: 'Applied what we learned from research to the layout. Began prioritising and grouping information.',
              },
              {
                imageName: 'homepage-step-3',
                label: 'New visual style',
                text: 'Revamped the design style and applied the new design.',
              },
              {
                imageName: 'homepage-step-4',
                label: 'Beta with feedback',
                text: 'Refined the design again. Added a feedback collector for the beta launch.',
              },
              {
                imageName: 'homepage-step-5',
                label: 'Clearer sections',
                text: 'Refined again: used the space better, grouped information and made sections clearer from each other.',
              },
              {
                imageName: 'homepage-step-6',
                label: 'Current version',
                text: 'The result of many rounds of iteration. We kept pushing work live.',
              },
            ],
          },
        },
      ],
      stats: [
        { value: '80,000', label: 'support queries reviewed' },
        { value: '775', label: 'survey responses: 659 researchers, 116 editors' },
        { value: '14', label: 'in-depth interviews with editors and authors' },
        { value: '8', label: 'usability test participants in 5 countries' },
      ],
      imageName: 'journal-redesign',
      imageAlt: 'The redesigned Springer journal homepage, showing the journal Rare Metals on a laptop, a phone and a tablet.',
      caption: 'The redesigned journal homepage on laptop, phone and tablet.',
    },
    also: [
      {
        title: 'Nature journals experience benchmarking',
        method: 'Benchmark study: task success, time on task, SEQ, SUS',
        line: 'I designed the tasks on finding journal information and ran the moderated sessions. Core reading worked well; the journal experience did not. Worst, some people didn’t realise they had failed a task.',
        stat: '28 tasks · 41 participants',
      },
      {
        title: 'Nature Research footer IA',
        method: 'Card sorting, open and hybrid',
        line: 'Two open rounds with internal stakeholders on physical cards, then hybrid sorts with end users online. Categories moved from job role (author, reviewer, librarian) to user task (discover content, publish with us).',
        stat: '15 end-user sorts',
      },
      {
        title: 'Nature article page',
        method: 'On-page survey',
        line: 'A survey asked researchers how they judge whether an article is relevant, and doubled as recruitment for follow-up interviews.',
        stat: '500+ responses',
      },
    ],
  },
  {
    id: 'evidence-based-design',
    label: 'Evidence-based design',
    claim: 'I start from a hypothesis, test it, and measure what changed.',
    lead: {
      title: 'Nature article collections: grid vs list',
      year: '2018',
      role: 'Led the data analysis and research, then co-designed the new page with a brand designer.',
      body: [],
      background:
        'Article collections are editorially curated packages of articles from across Nature Research, usually on trending topics in science, plus commercial collaborations such as Nature Outlooks. They give a snapshot of the latest research on a topic, and introduce readers to the breadth of content across Nature Research and its journals. On wide screens, the collection page used a 3×3 grid: a common Nature Research pattern made for very visual content and relaxed browsing.',
      phases: [
        {
          title: 'Research phase: is the grid the right pattern?',
          when: 'Dec 2018',
          role: 'I led the data analysis with a data analyst, built a dashboard in Google Data Studio and ran exploratory research.',
          points: [
            'Analysed the usage data and built a dashboard to track it.',
            'Ran a survey on the collection site to get reader feedback.',
            'Talked to editors about how they create and promote a collection.',
          ],
          findings: [
            {
              label: 'Data',
              text: 'Most traffic came from mobile, people spent very little time browsing, and the first article got the most clicks.',
            },
            {
              label: 'Readers',
              text: 'Images rarely represented the content well. The article title was what they used to decide what to read.',
            },
            {
              label: 'Problem',
              text: 'The 3×3 grid had no visual hierarchy and no order to scan in, adding cognitive load as readers decided what to read first. It was likely slowing them down.',
            },
          ],
        },
        {
          title: 'Design phase: from grid to list',
          when: 'Dec 2018',
          role: 'I worked with a brand designer on the collection homepage redesign across devices.',
          lead: {
            label: 'Hypothesis',
            text: 'Turning the grid into a list would greatly improve scannability.',
          },
          points: [
            'Placed the headlines, the primary information, in the middle of the screen, with secondary details to the left and right.',
            'This creates rows and columns like a table, so readers can focus on one thing at a time and ignore the rest.',
            'The eye can jump from headline to headline, or from date to date to find the most recent article.',
          ],
          figure: {
            imageName: 'grid-to-list',
            alt: 'Two before-and-after pairs. Top: a wireframe of a 3×3 grid of eleven numbered cards becomes a list with one hero item and numbered rows. Bottom: the real collection page as a grid of image-led cards becomes a list with date on the left, headline and summary in the middle, and a small image on the right.',
            title: 'From grid to list',
            caption:
              'Top: the structure, from a 3×3 grid to a hero followed by a list. Bottom: the same collection page before and after, with headlines in the middle and images moved to the side.',
          },
        },
        {
          title: 'Usability test: grid vs list',
          points: [
            'Asked 16 participants to find a particular article on a collection page, and timed how long it took.',
            'Compared the old grid (A) with the new list (B), on wide and narrow screens.',
            'Our developers built the list as an HTML prototype with live content, so people could scroll, click and explore our real site as they naturally would.',
          ],
          findings: [
            {
              label: 'Result',
              text: 'The list was significantly faster to scan than the grid, on every viewport.',
            },
          ],
          abTest: {
            title: 'Time to find the article, old grid (A) vs new list (B)',
            caption:
              'Each cell is one attempt by a different participant. Across both questions, 9 of 16 attempts failed on the old grid and 1 of 16 on the new list.',
            designs: [
              {
                label: 'A',
                name: 'Old grid',
                viewports: [
                  {
                    label: 'Desktop',
                    imageName: 'ab-test-a-desktop',
                    alt: 'Old grid on desktop: three image-led cards per row.',
                  },
                  {
                    label: 'Mobile',
                    imageName: 'ab-test-a-mobile',
                    alt: 'Old grid on mobile: one large image per article, so few headlines fit on screen.',
                  },
                ],
              },
              {
                label: 'B',
                name: 'New list',
                viewports: [
                  {
                    label: 'Desktop',
                    imageName: 'ab-test-b-desktop',
                    alt: 'New list on desktop: date on the left, headline and summary in the middle, small image on the right.',
                  },
                  {
                    label: 'Mobile',
                    imageName: 'ab-test-b-mobile',
                    alt: 'New list on mobile: headlines stacked with a small image beside each.',
                  },
                ],
              },
            ],
            questions: [
              {
                label: 'Question 1',
                condition: 'article located above the fold',
                rows: [
                  [14, null, null, 33],
                  [14, 54, 8, 28],
                  [9, null, 9, 39],
                  [null, 40, 39, 27],
                ],
              },
              {
                label: 'Question 2',
                condition: 'article located below the fold',
                rows: [
                  [null, 43, 19, 14],
                  [null, null, 16, 9],
                  [40, null, 7, 1],
                  [null, null, 7, 7],
                ],
              },
            ],
          },
        },
      ],
      stats: [
        { value: '16', label: 'participants timed finding an article' },
        { value: '2', label: 'layouts compared, on wide and narrow screens' },
        { value: 'All', label: 'viewports faster with the list' },
      ],
      imageName: 'collection-grid-vs-list',
      imageAlt: 'The redesigned Nature Outlook collection page on lymphoma, shown as a list of articles on two phones, a laptop and a tablet.',
      caption: 'The redesigned collection page: articles as a scannable list, on phone, laptop and tablet.',
    },
    also: [
      {
        title: 'Nature article page experiment',
        method: 'Survey, interviews, live experiment',
        line: 'Clearer citation details and main action, condensed publication dates, metrics and subject areas moved down. SEO improved and downloads held. We had no good metric for the reading experience, so that impact was not measured.',
      },
      {
        title: 'Benchmarking as roadmap evidence',
        method: 'Objective and perceived success, compared',
        line: 'The benchmark gave the product roadmap evidence for where to focus: the journal experience, not the reading experience.',
      },
      {
        title: 'Manuscript tracking for authors',
        year: '2020',
        method: 'Hypothesis, concept tests, before-and-after measures',
        line: 'A status tracker for authors in peer review. Support tickets fell after the first release in June 2020.',
        stat: '10 author interviews',
        href: '/manuscript-tracking-author-view',
      },
    ],
  },
  {
    id: 'strategy',
    label: 'Strategy and systems thinking',
    claim: 'I look at the whole service before I design a screen.',
    lead: {
      title: 'End-to-end journal onboarding',
      year: '2021',
      role: 'Researched the onboarding process from start to finish, then led the team in deciding what to solve first and how to measure it.',
      body: [],
      background:
        'In 2021 the business had a clear goal: get more journals onto the new peer review platform. As a delivery team, we wanted to understand how to help internal onboarding operators do their job efficiently, and give external editors an enjoyable onboarding experience. Our first deliverable was a journal onboarding admin tool, giving operators full control over journal setup.',
      phases: [
        {
          title: 'Research phase: understand the current process and challenges',
          points: [
            'Talked to 10 internal staff across different stages of the process, to understand how they work today and what challenges they face.',
            'Collected data from several sources, including Google Analytics, Google BigQuery, customer support enquiries and earlier usability test findings, to understand the problem from the external editor’s side.',
            'Brought stakeholders, the PM and the agile team into the research activities.',
            'Analysed the user needs and problems, then mapped the end-to-end onboarding experience with future improvements, research gaps and suggested opportunities.',
          ],
          figure: {
            imageName: 'journal-onboarding-journey',
            alt: 'A large board titled End to end editor onboarding journey on StoA, with journey stages across the top, screens and flows for each stage, and research notes along the bottom.',
            title: 'The end-to-end editor onboarding journey',
            caption:
              'Mapped from the research, with future improvements, research gaps and suggested opportunities.',
          },
        },
        {
          title: 'Design phase: what to solve first for the most value',
          role: 'I turned the research into a shared starting point for the team.',
          points: [
            'Shared the research findings back with the team, with clear user goals and needs.',
            'Highlighted the biggest pain points and user tasks to guide the team brainstorm.',
            'Ran a team sketching session built around real user scenarios.',
          ],
        },
        {
          title: 'Measuring success: are we doing the right thing?',
          points: [
            'Defined the UX outcome, our hypothesis and the success metric together with the team.',
            'Prioritised the work and set stages of progress, each with a measurable metric.',
            'Agreed how to test the hypothesis and collect the data for each metric.',
          ],
          findings: [
            {
              label: 'Next step',
              text: 'Helping journal operators confidently choose the right pattern to launch a new journal, and configure its settings correctly. The work was still in progress in 2021.',
            },
          ],
        },
      ],
      outputs: {
        heading: 'What came out of it',
        items: [
          'End-to-end onboarding journey map',
          'UX outcome, hypothesis and success metric',
          'Prioritised stages with measurable metrics',
        ],
      },
      imageName: 'journal-onboarding-map',
      imageAlt: 'The journal onboarding admin tool: user goal, needs, tasks, flows and business goal on the left, and wireframes for logging in, choosing a journal pattern, entering journal IDs, completing onboarding and configuring journal settings.',
      caption:
        'The journal onboarding admin tool: user goals, tasks and business goals alongside the wireframe flow, from choosing a journal pattern to configuring the journal’s settings.',
    },
    also: [
      {
        title: 'Editorial setup archetype',
        year: '2021',
        method: 'Research, end-to-end mapping, archetypes',
        line: 'Led research into how new journals are set up on the peer review system. Mapped the flow end to end with pain points and knowledge gaps, wrote the archetype sheet and vision, and used them to define UX progress metrics. Archetypes let one design serve every journal, because they describe activities rather than job titles.',
      },
      {
        title: 'Peer reviewer experience vision',
        year: '2020',
        method: 'Service blueprint, experience poster',
        line: 'Co-drafted with the domain UX strategist and subject experts: a reviewer’s ideal journey, with each step tied to its user value and its business value.',
      },
    ],
  },
  {
    id: 'collaboration',
    label: 'Team collaboration',
    claim: 'I make the team part of the design work.',
    lead: {
      title: 'Remote sketching sessions',
      year: '2020',
      role: 'Introduced team sketching sessions on a newly formed delivery team, run remotely.',
      body: [],
      background:
        'When I joined a newly formed team in early 2020, I wasn’t happy coming up with design decisions at the last minute. The team wasn’t happy either: they had no context for why a solution was designed the way it was, or what it was for. So we decided to make a change.',
      phases: [
        {
          title: 'Where we started: firefighting',
          when: 'Early 2020',
          points: [
            'Tickets were already in development, and developers were waiting for designs they couldn’t move forward without. I was the blocker.',
            'The team focused on a single ticket at a time, without a view of the broader problem we were trying to solve.',
            'Design solved fragments of the user problem instead of the end-to-end experience.',
            'Design happened in a silo, not as a team.',
          ],
        },
        {
          title: 'What we wanted to achieve',
          points: [
            'Bring people together, generate ideas and set the tone for further collaboration.',
            'Have focused, productive conversations early, to reduce confusion later on.',
            'Create a shared sense of investment and ownership, with the team solving the user problems together.',
          ],
          findings: [
            {
              label: 'Approach',
              text: 'Try team sketching sessions, run remotely, as everything was in 2020.',
            },
          ],
        },
        {
          title: 'How the sessions ran',
          points: [
            'One hour, sketching two key tasks based on requirements collected from end users.',
            'Everyone on the team was invited, and free to sketch with an online tool or pen and paper.',
            'Sketching was time-boxed to 10–15 minutes, then everyone presented their ideas for 2–3 minutes each.',
            'No idea was a bad idea: we deferred judgement and discussed what we found interesting or inspiring.',
          ],
          findings: [
            {
              label: 'Outcome',
              text: 'The session generated lots of ideas that fed the consolidated design proposal, and we ran two more iterations based on it.',
            },
          ],
        },
        {
          title: 'What we learnt',
          points: [
            'Working from home doesn’t stop team collaboration, as long as the online tools are right.',
            'Focus on the problem, not the solution: later sessions started from the problems, user needs and real scenarios, not single tasks.',
            'Make the collaboration even wider: we invited neighbouring teams working on the same author journey, so users get one joined-up experience.',
            'Create a shared sense of investment without making things overly democratic: dot voting helped prioritise, while design and product still made the call.',
          ],
        },
      ],
      imageName: 'sketching-session',
      imageAlt: 'A shared online board from a remote sketching session. Two author scenarios about tracking a manuscript sit at the top, with each team member’s sketches and sticky notes below.',
      caption: 'A remote sketching session: two real author scenarios at the top, and every team member’s ideas below.',
    },
    also: [
      {
        title: 'Getting a team user-centric',
        year: '2019',
        method: 'Anonymous feedback form, UX retro',
        line: 'With two fellow designers, worked through six problems, from low engagement in research sessions to no shared view of the user journey. What changed: a regular UX retro, a “why” sentence in every user story, and research shared in small doses.',
        stat: '6 problems tackled',
      },
      {
        title: '“Reading Science” research comic',
        method: 'Illustrated research stories',
        line: 'A few of us gathered scattered research on how researchers read into a comic-style booklet, so the whole company could see the reasons behind the analytics.',
      },
    ],
  },
];

const tags = ['User research', 'UX strategy', 'Team collaboration'];

/** Longest time shown on the bars, in seconds. */
const AB_TEST_SCALE = 60;

function AbTestTable({
  test,
  images,
  siteBasePath,
}: {
  test: AbTest;
  images: Record<string, string>;
  siteBasePath: string;
}) {
  const columns = test.designs.flatMap((design, d) =>
    design.viewports.map((image, v) => ({
      design,
      d,
      viewport: image.label,
      image,
      first: v === 0,
    })),
  );
  const found = columns.map((_, c) =>
    test.questions.reduce(
      (sum, q) => sum + q.rows.filter((row) => row[c] !== null).length,
      0,
    ),
  );
  const attemptsPerColumn = test.questions.reduce((sum, q) => sum + q.rows.length, 0);
  const groupBorder = (first: boolean, d: number) =>
    first && d > 0 ? 'border-l border-border' : '';
  const groupTint = (d: number) => (d > 0 ? 'bg-primary/[0.04]' : '');

  return (
    <figure className="mt-4 space-y-2">
      <div className="overflow-hidden rounded-control border border-border bg-surface shadow-panel">
        <table className="w-full table-fixed border-collapse text-sm tabular-nums">
          <caption className="sr-only">{test.title}</caption>
          <thead>
            <tr>
              {test.designs.map((design, d) => (
                <th
                  key={design.label}
                  scope="colgroup"
                  colSpan={design.viewports.length}
                  className={`px-2 pb-1 pt-3 text-left sm:px-4 ${groupBorder(true, d)} ${groupTint(d)}`}
                >
                  <span className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                        d > 0
                          ? 'bg-primary-strong text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      {design.label}
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      <span className="sr-only">{design.label}: </span>
                      {design.name}
                    </span>
                  </span>
                </th>
              ))}
            </tr>
            <tr>
              {columns.map(({ design, d, viewport, first }) => (
                <th
                  key={`${design.label}-${viewport}`}
                  scope="col"
                  className={`px-2 pb-2 pt-1 text-left text-2xs font-medium uppercase tracking-eyebrow text-muted-foreground sm:px-4 ${groupBorder(first, d)} ${groupTint(d)}`}
                >
                  {viewport}
                </th>
              ))}
            </tr>
            <tr className="border-b border-border">
              {columns.map(({ design, d, viewport, image, first }) => (
                <td
                  key={`${design.label}-${viewport}-image`}
                  className={`px-2 pb-3 sm:px-4 ${groupBorder(first, d)} ${groupTint(d)}`}
                >
                  {images[image.imageName] && (
                    <Link
                      href={`${siteBasePath}${images[image.imageName]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-24 cursor-zoom-in items-center-safe overflow-hidden rounded-chip border border-border bg-white transition-opacity data-hovered:opacity-90 outline-none data-focus-visible:ring-2 data-focus-visible:ring-ring sm:h-36"
                    >
                      <img
                        src={`${siteBasePath}${images[image.imageName]}`}
                        alt={`${image.alt} Opens full size in a new tab.`}
                        loading="lazy"
                        className="block h-auto w-full"
                        draggable={false}
                      />
                    </Link>
                  )}
                </td>
              ))}
            </tr>
          </thead>
          {test.questions.map((question) => (
            <tbody key={question.label}>
              <tr>
                <th
                  scope="rowgroup"
                  colSpan={columns.length}
                  className="bg-muted/30 px-2 py-1.5 text-left text-xs font-medium text-foreground sm:px-4"
                >
                  {question.label}
                  <span className="font-normal text-muted-foreground"> · Find the article ({question.condition})</span>
                </th>
              </tr>
              {question.rows.map((row, r) => (
                <tr key={r} className="border-t border-border first:border-t-0">
                  {row.map((seconds, c) => {
                    const { d, first } = columns[c];
                    return (
                      <td
                        key={c}
                        className={`px-2 py-2 align-middle sm:px-4 ${groupBorder(first, d)} ${groupTint(d)}`}
                      >
                        {seconds === null ? (
                          <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary-strong">
                            <span aria-hidden="true">✕</span>
                            <span className="sm:hidden">Failed</span>
                            <span className="hidden sm:inline">Not found</span>
                          </span>
                        ) : (
                          <span className="block">
                            <span className="text-foreground">{seconds}</span>
                            <span className="text-xs text-muted-foreground"> sec</span>
                            <span
                              aria-hidden="true"
                              className="mt-1 block h-1 rounded-full bg-muted"
                            >
                              <span
                                className="block h-1 rounded-full bg-muted-foreground/60"
                                style={{
                                  width: `${Math.max(4, Math.min(100, (seconds / AB_TEST_SCALE) * 100))}%`,
                                }}
                              />
                            </span>
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          ))}
          <tfoot>
            <tr className="border-t-2 border-border">
              {columns.map(({ design, d, viewport, first }, c) => (
                <td
                  key={`${design.label}-${viewport}`}
                  className={`px-2 py-2.5 sm:px-4 ${groupBorder(first, d)} ${groupTint(d)}`}
                >
                  <span className="block text-2xs font-medium uppercase tracking-eyebrow text-muted-foreground">
                    Found
                  </span>
                  <span
                    className={`text-sm font-semibold ${d > 0 ? 'text-primary-strong' : 'text-foreground'}`}
                  >
                    {found[c]}
                  </span>
                  <span className="text-xs text-muted-foreground"> of {attemptsPerColumn}</span>
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
      <figcaption className="text-xs leading-5 text-muted-foreground">
        <span className="font-medium text-foreground">{test.title}.</span> {test.caption}
      </figcaption>
    </figure>
  );
}

const headlineStats = [
  { label: 'Largest survey', value: '659 responses' },
  { label: 'Benchmark study', value: '41 participants, 28 tasks' },
  { label: 'Layout comparison test', value: '16 participants' },
];

export function FieldNotesSpringerNatureView({
  siteBasePath = defaultBasePath,
  images = {},
}: FieldNotesSpringerNatureViewProps) {
  const homeHref = `${siteBasePath}/`;
  const projectHref = `${siteBasePath}/field-notes-springer-nature`;

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-12 sm:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground flex items-center gap-2 flex-wrap">
          <a href={homeHref} className="hover:text-primary-strong transition-colors">
            Portfolio
          </a>
          <span>/</span>
          <a href={projectHref} className="text-primary-strong">
            UX work at Springer Nature
          </a>
        </nav>

        <header className="space-y-4">
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
          <h1 className="text-3xl font-semibold leading-tight">UX work at Springer Nature</h1>
          <p className="text-base leading-7 text-foreground">
            Three years of research, strategy and team practice across Springer and Nature
            journals, organised by the skill each piece proves.
          </p>
          <p className="text-xs text-muted-foreground">Springer Nature · 2018 – 2021</p>
        </header>

        <section className="grid gap-3 sm:grid-cols-3">
          {headlineStats.map((item) => (
            <div key={item.label} className="rounded-control bg-muted/30 p-4">
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="mt-1 text-sm font-medium text-foreground">{item.value}</p>
            </div>
          ))}
        </section>

        <div className="lg:grid lg:grid-cols-[208px_minmax(0,1fr)] lg:gap-10">
          <SectionNav items={angles.map((angle) => ({ id: angle.id, label: angle.label }))} />

          <div className="mt-10 space-y-16 lg:mt-0">

        {angles.map((angle, index) => (
          <section
            key={angle.id}
            id={angle.id}
            aria-labelledby={`${angle.id}-heading`}
            className="scroll-mt-16 space-y-5 lg:scroll-mt-8"
          >
            <div>
              <p className="text-eyebrow font-medium uppercase tracking-eyebrow text-primary-strong">
                {String(index + 1).padStart(2, '0')} · {angle.label}
              </p>
              <h2 id={`${angle.id}-heading`} className="mt-2 text-xl font-semibold leading-snug">
                {angle.claim}
              </h2>
            </div>

            <article className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground">Lead piece · {angle.lead.year}</p>
                <h3 className="mt-1 text-base font-semibold text-foreground">{angle.lead.title}</h3>
                <p className="mt-1 text-sm leading-6 text-foreground">
                  <span className="font-medium">My role:</span> {angle.lead.role}
                </p>
              </div>

              {angle.lead.stats && (
                <dl className="grid grid-cols-2 gap-x-6 gap-y-4 py-2 sm:grid-cols-4">
                  {angle.lead.stats.map((stat) => (
                    <div key={stat.label} className="flex flex-col-reverse justify-end border-t-2 border-foreground pt-3">
                      <dt className="mt-1 text-xs leading-5 text-muted-foreground">{stat.label}</dt>
                      <dd className="text-2xl font-semibold leading-none text-primary-strong">
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              {angle.lead.outputs && (
                <div className="py-1">
                  <p className="text-eyebrow font-medium uppercase tracking-eyebrow text-muted-foreground">
                    {angle.lead.outputs.heading}
                  </p>
                  <ul className="mt-2 grid gap-x-6 gap-y-1 text-sm text-foreground sm:grid-cols-3">
                    {angle.lead.outputs.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span aria-hidden="true" className="text-primary-strong">
                          —
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <figure className="space-y-2">
                {images[angle.lead.imageName] ? (
                  <div className="overflow-hidden rounded-control bg-background p-3 sm:p-4">
                    <img
                      src={`${siteBasePath}${images[angle.lead.imageName]}`}
                      alt={angle.lead.imageAlt}
                      loading="lazy"
                      className="mx-auto block h-auto w-auto max-w-full"
                      draggable={false}
                    />
                  </div>
                ) : (
                  <div
                    role="img"
                    aria-label={`Image to come: ${angle.lead.imageAlt}`}
                    className="flex aspect-[16/9] flex-col items-center justify-center gap-1 rounded-control border border-dashed border-border bg-muted/20 p-4 text-center"
                  >
                    <p className="text-sm font-medium text-muted-foreground">Image to come</p>
                    <p className="text-xs text-muted-foreground">
                      public/field-notes/{angle.lead.imageName}.png
                    </p>
                  </div>
                )}
                <figcaption className="text-xs text-muted-foreground">
                  {angle.lead.caption}
                </figcaption>
              </figure>

              {angle.lead.background && (
                <div>
                  <h4 className="text-sm font-medium text-foreground">Background</h4>
                  <p className="mt-1 text-base leading-7 text-foreground">
                    {angle.lead.background}
                  </p>
                </div>
              )}

              {angle.lead.phases?.map((phase) => (
                <div key={phase.title} className="rounded-control bg-muted/30 p-3 sm:p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h4 className="text-sm font-medium text-foreground">{phase.title}</h4>
                    {phase.when && (
                      <span className="text-xs text-muted-foreground">{phase.when}</span>
                    )}
                  </div>
                  {phase.role && (
                    <p className="mt-1 text-sm leading-6 text-foreground">
                      <span className="font-medium">My role:</span> {phase.role}
                    </p>
                  )}
                  {phase.lead && (
                    <p className="mt-3 border-l-2 border-primary-strong pl-3 text-sm leading-6 text-foreground">
                      <span className="font-medium text-primary-strong">{phase.lead.label}:</span>{' '}
                      {phase.lead.text}
                    </p>
                  )}
                  <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-6 text-foreground">
                    {phase.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  {phase.findings && (
                    <dl className="mt-4 space-y-2">
                      {phase.findings.map((finding) => (
                        <div
                          key={finding.label}
                          className="grid gap-x-4 gap-y-0.5 text-sm leading-6 sm:grid-cols-[88px_minmax(0,1fr)]"
                        >
                          <dt className="text-eyebrow font-medium uppercase leading-6 tracking-eyebrow text-primary-strong">
                            {finding.label}
                          </dt>
                          <dd className="text-foreground">{finding.text}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  {phase.steps && (
                    <div className="mt-4">
                      <h5 className="text-sm font-medium text-foreground">{phase.steps.title}</h5>
                      <p className="mt-1 text-xs text-muted-foreground">{phase.steps.intro}</p>
                      <ol className="mt-3 grid grid-cols-1 items-start gap-3 sm:grid-cols-3">
                        {phase.steps.items.map((item, i) => (
                          <li
                            key={item.imageName}
                            className="flex flex-row overflow-hidden rounded-control bg-background sm:flex-col"
                          >
                            {images[item.imageName] && (
                              <div className="w-24 shrink-0 self-start p-2 sm:w-auto">
                                <img
                                  src={`${siteBasePath}${images[item.imageName]}`}
                                  alt={`Journal homepage, version ${i + 1} of ${phase.steps!.items.length}.`}
                                  loading="lazy"
                                  className="mx-auto block h-auto w-auto max-w-full"
                                  draggable={false}
                                />
                              </div>
                            )}
                            <div className="min-w-0 flex-1 break-words p-3">
                              <p className="text-xs font-medium text-foreground">
                                <span className="text-primary-strong">
                                  {String(i + 1).padStart(2, '0')}
                                </span>{' '}
                                {item.label}
                              </p>
                              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                {item.text}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                  {phase.abTest && (
                    <AbTestTable test={phase.abTest} images={images} siteBasePath={siteBasePath} />
                  )}
                  {phase.figure && images[phase.figure.imageName] && (
                    <figure className="mt-4 space-y-2">
                      <Link
                        href={`${siteBasePath}${images[phase.figure.imageName]}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block cursor-zoom-in overflow-hidden rounded-control bg-background p-3 transition-opacity sm:p-4 data-hovered:opacity-90 outline-none data-focus-visible:ring-2 data-focus-visible:ring-ring data-focus-visible:ring-offset-2 data-focus-visible:ring-offset-background"
                      >
                        <img
                          src={`${siteBasePath}${images[phase.figure.imageName]}`}
                          alt={`${phase.figure.alt} Opens full size in a new tab.`}
                          loading="lazy"
                          className="mx-auto block h-auto w-auto max-w-full"
                          draggable={false}
                        />
                      </Link>
                      <figcaption className="text-xs leading-5 text-muted-foreground">
                        <span className="font-medium text-foreground">{phase.figure.title}.</span>{' '}
                        {phase.figure.caption} Select the image to view it full size.
                      </figcaption>
                    </figure>
                  )}
                </div>
              ))}

              {angle.lead.body.map((paragraph, i) => (
                <p key={i} className="text-base leading-7 text-foreground">
                  {paragraph}
                </p>
              ))}
            </article>

            <div>
              <p className="text-eyebrow font-medium uppercase tracking-eyebrow text-muted-foreground">Also seen in</p>
              {angle.also.map((piece) => (
                <div key={piece.title} className="border-t border-border py-4 first:mt-3">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-sm font-medium text-foreground">
                      {piece.href ? (
                        <a
                          href={`${siteBasePath}${piece.href}`}
                          className="underline decoration-primary decoration-2 underline-offset-4 hover:decoration-foreground"
                        >
                          {piece.title} →
                        </a>
                      ) : (
                        piece.title
                      )}
                      {piece.year && (
                        <span className="font-normal text-muted-foreground"> · {piece.year}</span>
                      )}
                    </h3>
                    {piece.stat && (
                      <span className="text-xs font-medium text-foreground">{piece.stat}</span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{piece.method}</p>
                  <p className="mt-2 text-sm leading-6 text-foreground">{piece.line}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
          </div>
        </div>

        <section className="rounded-card bg-primary/5 p-6">
          <p className="text-eyebrow font-medium uppercase tracking-eyebrow text-primary-strong">
            Deep dive
          </p>
          <p className="mt-3 text-base leading-7 text-foreground">
            One Springer Nature project has its own full case study: making peer review status
            visible to authors on a platform handling 4,000+ submissions a month.
          </p>
          <a
            href={`${siteBasePath}/manuscript-tracking-author-view`}
            className="mt-3 inline-block text-sm font-medium text-foreground underline decoration-primary decoration-2 underline-offset-4 hover:decoration-foreground"
          >
            Read the manuscript tracking case study →
          </a>
        </section>

        <section className="pt-2 border-t border-border">
          <Link
            href={homeHref}
            className="inline-flex items-center rounded-control border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors data-hovered:border-primary data-hovered:text-primary-strong outline-none data-focus-visible:ring-2 data-focus-visible:ring-ring data-focus-visible:ring-offset-2 data-focus-visible:ring-offset-background"
          >
            ← Back to portfolio
          </Link>
        </section>
      </div>
    </div>
  );
}
