/**
 * Content for the Springer Nature case study pages, grouped by the skill each proves.
 * Image names are files in public/field-notes, without extension.
 */

export interface Piece {
  title: string;
  year?: string;
  method: string;
  line: string;
  stat?: string;
}

export interface CaseStudy {
  /** The page path is /<slug>, relative to the site base path. */
  slug: string;
  /** One or two sentences, shown under the page title and in page metadata. */
  summary: string;
  title: string;
  year: string;
  role: string;
  /** The context, shown before the phases. */
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
export type Attempt = number | null;

export interface AbTest {
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

export interface Angle {
  id: 'research-methods' | 'evidence-based-design' | 'strategy' | 'collaboration';
  label: string;
  claim: string;
  caseStudy: CaseStudy;
  /** Shorter pieces of work, shown as related work on the case study page. */
  also: Piece[];
}

export const angles: Angle[] = [
  {
    id: 'research-methods',
    label: 'Research methods',
    claim: 'I choose the research method that fits the question.',
    caseStudy: {
      slug: 'springer-journal-redesign',
      title: 'Springer journal redesign',
      summary:
        'Research to find the real user problems behind a new platform for thousands of journals, then a journal homepage redesigned and released step by step.',
      year: '2019',
      role: 'Led the research, then worked with two other designers on the homepage redesign.',
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
    caseStudy: {
      slug: 'nature-article-collections',
      title: 'Nature article collections: grid vs list',
      summary:
        'Usage data suggested the collection page grid was slowing readers down. A timed test of the old grid against a new list showed by how much.',
      year: '2018',
      role: 'Led the data analysis and research, then co-designed the new page with a brand designer.',
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
    ],
  },
  {
    id: 'strategy',
    label: 'Strategy and systems thinking',
    claim: 'I look at the whole service before I design a screen.',
    caseStudy: {
      slug: 'journal-onboarding',
      title: 'End-to-end journal onboarding',
      summary:
        'Mapped how journals get onto the new peer review platform, then helped the team decide what to solve first and how to measure it.',
      year: '2021',
      role: 'Researched the onboarding process from start to finish, then led the team in deciding what to solve first and how to measure it.',
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
    caseStudy: {
      slug: 'designing-with-the-team',
      title: 'Designing with the team',
      summary:
        'Getting delivery teams to share the design work: habits that kept users in view, remote sketching sessions, and design sessions that reached across teams.',
      year: '2019 – 2021',
      role: 'Worked with two fellow designers on team habits in 2019, then introduced and ran team sketching sessions on a newly formed delivery team from 2020.',
      background:
        'Design works best when the whole team understands the user problem, not just the designer. On the teams I worked with, that didn’t happen by default: design often arrived late, in a silo, with no context for why a solution looked the way it did. Over three years I tried several ways to bring developers, product and stakeholders into the design work, each building on the last.',
      phases: [
        {
          title: 'Part 1: Getting a team user-centric',
          when: '2019',
          role: 'With two fellow designers.',
          points: [
            'Asked the team for honest views through an anonymous feedback form.',
            'Worked through six problems it raised, from low engagement in research sessions to no shared view of the user journey.',
          ],
          findings: [
            {
              label: 'Result',
              text: 'A regular UX retro, a “why” sentence in every user story, and research shared in small doses.',
            },
          ],
        },
        {
          title: 'Part 2: Remote sketching sessions',
          when: '2020',
          role: 'Introduced team sketching sessions on a newly formed delivery team, run remotely, as everything was in 2020.',
          lead: {
            label: 'Where we started',
            text: 'Tickets were already in development and developers were waiting for designs they couldn’t move forward without. I was the blocker. The team worked one ticket at a time, and design solved fragments of the user problem instead of the end-to-end experience.',
          },
          points: [
            'The aim: bring people together early, have focused conversations before confusion set in, and give the team a shared sense of ownership of the user problems.',
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
          title: 'Part 3: Widening the circle',
          when: '2020 – 2021',
          points: [
            'Later sessions started from the problems, user needs and real scenarios, not single tasks.',
            'We invited neighbouring teams working on the same author journey, so users get one joined-up experience.',
            'On journal onboarding in 2021, I shared the research back with the team, then ran a sketching session built around real user scenarios to decide what to solve first.',
          ],
        },
        {
          title: 'What I learnt',
          points: [
            'Working from home doesn’t stop team collaboration, as long as the online tools are right.',
            'Start from the problem, not the solution.',
            'Create a shared sense of investment without making things overly democratic: dot voting helped prioritise, while design and product still made the call.',
          ],
        },
      ],
      outputs: {
        heading: 'What came out of it',
        items: [
          'A regular UX retro and a “why” in every user story',
          'Team sketching sessions, run remotely',
          'Design sessions shared with neighbouring teams',
        ],
      },
      imageName: 'sketching-session',
      imageAlt: 'A shared online board from a remote sketching session. Two author scenarios about tracking a manuscript sit at the top, with each team member’s sketches and sticky notes below.',
      caption: 'A remote sketching session: two real author scenarios at the top, and every team member’s ideas below.',
    },
    also: [
      {
        title: '“Reading Science” research comic',
        method: 'Illustrated research stories',
        line: 'A few of us gathered scattered research on how researchers read into a comic-style booklet, so the whole company could see the reasons behind the analytics.',
      },
    ],
  },
];

export interface ProjectLink {
  href: string;
  title: string;
  angle: Angle;
}

const caseStudyLink = (id: Angle['id']): ProjectLink => {
  const angle = angles.find((a) => a.id === id)!;
  return { href: `/${angle.caseStudy.slug}`, title: angle.caseStudy.title, angle };
};

/**
 * Every Springer Nature project page, in homepage order, for previous and next links.
 * Manuscript tracking has its own page and view, so it is listed by hand.
 */
export const projectLinks: ProjectLink[] = [
  caseStudyLink('evidence-based-design'),
  {
    href: '/manuscript-tracking-author-view',
    title: 'Manuscript tracking for authors',
    angle: angles.find((a) => a.id === 'evidence-based-design')!,
  },
  caseStudyLink('research-methods'),
  caseStudyLink('strategy'),
  caseStudyLink('collaboration'),
];

/** Where project pages send readers back to: the Springer Nature group on the homepage. */
export const homeSectionPath = '/#springer-nature';

export function findCaseStudy(slug: string): Angle | undefined {
  return angles.find((angle) => angle.caseStudy.slug === slug);
}
