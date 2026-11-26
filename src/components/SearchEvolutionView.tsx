'use client';

// ─────────────────────────────────────────────────────────────────────────────
// THE SEARCH EVOLUTION, told as a storybook.
//
// Each chapter is one or two spreads: the story on the left page, an
// illustration on the right. The illustrations are either real product
// screenshots or small interactive recreations (see search-evolution/demos).
// The book itself (page turning, one-page mode) lives in StoryBook.
// ─────────────────────────────────────────────────────────────────────────────

import { useCallback, type ReactNode } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { siteBasePath as defaultBasePath } from '@/lib/siteBasePath';
import {
  BOOK_CSS,
  StoryBook,
  type ChapterMarker,
  type Spread,
} from './search-evolution/StoryBook';
import {
  AiTagDemo,
  BeforeAndNow,
  BusinessImpact,
  ChapterArrival,
  LogicDemo,
  QuestionDemo,
  RefineDemo,
  RoleAndCost,
  Shot,
  StructureDemo,
  SuggestDemo,
} from './search-evolution/demos';
import {
  BOOK_SUBTITLE,
  BOOK_TITLE,
  CoverArt,
  HardcoverBook,
} from './search-evolution/HardcoverBook';
import { ScanPage } from './search-evolution/ScanPage';

interface SearchEvolutionViewProps {
  siteBasePath?: string;
}

// ── Page furniture ───────────────────────────────────────────────────────────

function ChapterHead({ n, title, meta }: { n: string; title: string; meta?: string }) {
  return (
    <header className="mb-4">
      <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-primary-strong">{n}</p>
      <h2 className="mt-2 text-[24px] font-semibold leading-[1.2] tracking-tight text-foreground">
        {title}
      </h2>
      {meta && <p className="mt-3 text-xs text-muted-foreground">{meta}</p>}
    </header>
  );
}

function P({ children, gap }: { children: ReactNode; gap?: boolean }) {
  return (
    <p
      className={`mb-3 text-[16px] leading-[1.8] text-foreground/90 ${
        gap ? 'mt-5' : ''
      }`}
    >
      {children}
    </p>
  );
}

/** A line the story leans on, set larger. */
function Pull({ children }: { children: ReactNode }) {
  return (
    <p className="my-4 border-l-2 border-primary-strong pl-4 text-[18px] font-medium leading-[1.6] text-foreground">
      {children}
    </p>
  );
}

// A bridge is the question that carries the story from one chapter into the
// next. It opens the page above the new chapter's heading, separated by a rule,
// and is set larger than body text but smaller than a chapter title.
function BridgeLead({ children, after }: { children: ReactNode; after?: boolean }) {
  return (
    <p className={`text-[18px] leading-[1.7] text-foreground ${after ? 'mt-5' : ''}`}>
      {children}
    </p>
  );
}

function BridgeQuestion({ children }: { children: ReactNode }) {
  return (
    <p className="mt-5 border-l-2 border-primary-strong pl-4 text-[20px] font-medium leading-[1.4] text-foreground">
      {children}
    </p>
  );
}

function Label({ children }: { children: ReactNode }) {
  return (
    <p className="mb-2 mt-5 text-[13px] font-medium uppercase tracking-[0.16em] text-muted-foreground first:mt-0">
      {children}
    </p>
  );
}

/**
 * Opens the "design shift" part of a chapter. Same label style as the UX shift
 * box it leads up to, but with a rule instead of a filled panel.
 */
function DesignShiftLabel() {
  return (
    <p className="mb-2.5 mt-5 flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.16em] text-primary-strong first:mt-0">
      The design shift
      <span className="h-px flex-1 bg-primary-strong/30" aria-hidden="true" />
    </p>
  );
}

function Shift({ from, to }: { from: string; to: string }) {
  return (
    <div className="mt-5 rounded-lg bg-secondary px-4 py-3.5">
      <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-primary-strong">
        The UX shift
      </p>
      <p className="mt-1 text-[18px] font-medium leading-snug text-foreground">
        From {from} <span aria-hidden="true">→</span>
        <span className="sr-only"> to </span> {to}.
      </p>
    </div>
  );
}

function Bullets({ items }: { items: { lead: string; rest: string }[] }) {
  return (
    <ul className="mb-3 space-y-2">
      {items.map((item) => (
        <li
          key={item.lead}
          className="flex gap-3 text-[16px] leading-[1.8] text-foreground/90"
        >
          <span
            className="mt-[9px] size-1.5 shrink-0 rounded-full bg-primary-strong"
            aria-hidden="true"
          />
          <span>
            <strong className="font-semibold text-foreground">{item.lead}:</strong> {item.rest}
          </span>
        </li>
      ))}
    </ul>
  );
}

// ── The book's contents ──────────────────────────────────────────────────────

const CHAPTERS: ChapterMarker[] = [
  { label: 'Intro', title: 'How search changed over five years', spread: 1 },
  {
    label: '1 · Keywords',
    title: 'Where we started: search only experts could use',
    spread: 2,
  },
  { label: '2 · Recognition', title: 'Suggesting terms so users don’t have to remember them', spread: 5 },
  { label: '3 · Structure', title: 'Breaking one giant query into smaller parts', spread: 6 },
  { label: '4 · Grouping', title: 'Letting users group terms their own way', spread: 7 },
  {
    label: '5 · Questions',
    title: 'Asking a question instead of building a search',
    spread: 9,
  },
  { label: '6 · Confidence', title: 'Helping users trust the AI’s results', spread: 11 },
  { label: 'Impact', title: 'Business impact, and what’s next', spread: 12 },
];

function buildSpreads(basePath: string, go: (spread: number) => void): Spread[] {
  const img = (name: string) => `${basePath}/search-2.0/${name}`;

  return [
    // ── Cover ────────────────────────────────────────────────────────────────
    {
      id: 'cover',
      chapter: 0,
      right: (
        <CoverArt
          heading
          className="text-[18px]"
          action={
            <button
              type="button"
              onClick={() => go(1)}
              className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-background px-4 py-2 text-sm font-medium text-foreground transition-transform hover:translate-x-0.5"
            >
              Start reading <ArrowRight className="size-4" strokeWidth={2.25} aria-hidden="true" />
            </button>
          }
        />
      ),
      // One-page mode: the closed book beside its title.
      flat: (
        <div className="grid items-center gap-2 bg-gradient-to-b from-secondary to-[#F1D9C8] px-6 py-8 sm:grid-cols-2 sm:px-10">
          <HardcoverBook className="h-[250px] [--u:7px] sm:h-[340px] sm:[--u:9.5px]" />
          <div>
            <p className="text-[13px] uppercase tracking-[0.18em] text-muted-foreground">
              Case study · Signal AI · 2021 – present
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-4xl">
              {BOOK_TITLE}
            </h1>
            <p className="mt-3 text-base leading-snug text-foreground/80">{BOOK_SUBTITLE}</p>
            <p className="mt-4 text-xs text-muted-foreground">Lu Zhang · Product designer</p>
            <button
              type="button"
              onClick={() => go(1)}
              className="mt-5 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background"
            >
              Start reading <ArrowDown className="size-4" strokeWidth={2.25} aria-hidden="true" />
            </button>
          </div>
        </div>
      ),
    },

    // ── Introduction ─────────────────────────────────────────────────────────
    {
      id: 'intro',
      chapter: 0,
      left: (
        <>
          <ChapterHead n="Introduction" title="How search changed over five years" />
          <P>
            Search has always been at the heart of Signal. But for a long time, getting meaningful
            results meant understanding how to work around the system.
          </P>
          <P>
            Users had to know which keywords to use, remember the names of AI entities, construct
            complicated Boolean queries and sometimes build multiple nested searches just to answer
            one business question.
          </P>
          <P>
            Meanwhile, the internal team was spending significant time doing that work for
            customers.
          </P>
          <P>
            Over several years, I helped evolve this experience — moving from a rigid, technically
            demanding search system towards an intelligent, flexible and increasingly human way of
            working with information.
          </P>
          <Pull>This is the story of that evolution.</Pull>
        </>
      ),
      right: (
        <>
          <Label>Contents</Label>
          <ol className="mt-3">
            {CHAPTERS.slice(1).map((c, i) => (
              <li key={c.label} className="border-t border-foreground/10 last:border-b">
                <button
                  type="button"
                  onClick={() => go(c.spread)}
                  className="group flex w-full items-baseline gap-4 py-3.5 text-left"
                >
                  <span className="text-xs tabular-nums text-primary-strong">0{i + 1}</span>
                  <span className="flex-1 text-[16px] leading-snug text-foreground group-hover:underline">
                    {c.title}
                  </span>
                  <ArrowRight
                    className="size-[18px] shrink-0 self-center text-primary-strong transition-transform group-hover:translate-x-1"
                    strokeWidth={2.25}
                    aria-hidden="true"
                  />
                </button>
              </li>
            ))}
          </ol>
        </>
      ),
    },

    // ── Chapter 1 ────────────────────────────────────────────────────────────
    {
      id: 'ch1-team',
      chapter: 1,
      left: (
        <>
          <ChapterHead
            n="Chapter 1"
            title="Where we started: search only experts could use"
            meta="Year 1–3 · Signal Web App"
          />
          <P>
            I joined the Signal Web App team as its solo product designer, working closely with one
            Product Manager and a small engineering team of three to four engineers.
          </P>
          <P>
            My role covered the full product design lifecycle: working with the PM on discovery,
            gathering user feedback, exploring opportunities, brainstorming solutions, testing ideas
            and partnering closely with engineers to bring them into the product.
          </P>
          <P>Our first big challenge was fundamental:</P>
          <Pull>Users couldn’t easily manage their own searches.</Pull>
          <P>
            The system was rigid, complicated and often required the internal team to step in and do
            the work for customers.
          </P>
        </>
      ),
      right: <RoleAndCost />,
    },
    {
      id: 'ch1-keywords',
      chapter: 1,
      left: (
        <>
          <Label>Problem 01</Label>
          <h3 className="mb-3 text-[18px] font-semibold leading-snug text-foreground">
            Why were users still relying on hundreds of keywords?
          </h3>
          <P>
            Signal had invested in AI-trained entities and topics from day one. In theory, users
            could use these intelligent building blocks instead of manually writing long Boolean
            queries. But in reality, keywords remained their first choice. Why?
          </P>
          <Bullets
            items={[
              {
                lead: 'Hard to discover',
                rest: 'Users couldn’t easily find the relevant trained entities and topics in the existing interface.',
              },
              {
                lead: 'Hard to trust',
                rest: 'AI entities didn’t always match the precise meaning or definition users had in mind.',
              },
            ]}
          />
          <P>So users fell back on what they understood: keywords.</P>
        </>
      ),
      right: (
        <div className="flex h-full flex-col justify-center gap-6">
          <Shot
            dark
            src={img('keywords-soup.png')}
            alt="The old search bar holding one statistic typed out as many separate keywords: 83 percent, eighty-three percent, 83%, and so on."
            caption="Product screenshot. A user typing out every variation of one term, so that no mention is missed."
          />
          <Shot
            dark
            src={img('search-builder-v1.png')}
            alt="The old search builder filled with dozens of hand-entered keywords and sources."
            caption="Product screenshot. A single search built from dozens of hand-entered keywords and sources."
          />
        </div>
      ),
    },
    {
      id: 'ch1-figure',
      chapter: 1,
      left: (
        <>
          <P>
            The graph illustrates the scale of this behaviour. The red dots represent millions of
            keywords used across Signal searches.
          </P>
          <P>This created two problems.</P>
          <P>
            First, users were afraid of missing relevant coverage. They tried to anticipate every
            possible way something could be mentioned, resulting in enormous keyword lists that were
            difficult to maintain and expensive to run.
          </P>
          <P>
            Second, more complex business questions often became layers of interconnected searches.
            The cyan lines in Figure 1 show the relationships between searches.
          </P>
          <P>
            One person might understand the logic behind these interconnected searches, but that
            logic was rarely obvious to anyone else.
          </P>
          <Pull>
            We weren’t just asking users to search. We were asking them to become search
            architects.
          </Pull>
        </>
      ),
      right: (
        <div className="flex h-full flex-col justify-center">
          <Shot
            dark
            src={img('figure-1-keyword-graph.webp')}
            alt="A dense network graph: clusters of red dots around the edge joined by a tangle of cyan lines."
            caption={
              <>
                <strong className="font-medium text-foreground">Figure 1.</strong>{' '}
                <span className="text-[#C2362F]">Red dots</span>: keywords used across Signal
                searches. <span className="text-[#0E7C86]">Cyan lines</span>: the relationships
                between searches.
              </>
            }
          />
        </div>
      ),
    },

    // ── Chapter 2 ────────────────────────────────────────────────────────────
    {
      id: 'ch2',
      chapter: 2,
      left: (
        <>
          <ChapterHead
            n="Chapter 2"
            title="Suggesting terms so users don’t have to remember them"
            meta="Year 2 · Making AI entities discoverable"
          />
          <P>
            We already had hundreds of high-quality, trained entities and topics. The problem was
            that users could only find them if they knew exactly what to look for.
          </P>
          <P>
            Unless you remembered that “Climate Change” existed in the catalogue, you’d probably go
            back to building your own keyword list.
          </P>
          <P>
            The opportunity was to bridge the gap between the language users naturally use and the
            intelligence already available in Signal.
          </P>
          <DesignShiftLabel />
          <P>
            Instead of asking users to remember exact entity names, we let them search using their
            own vocabulary.
          </P>
          <P>
            Type something familiar, like “environment”, and the system understands its meaning and
            syntax, suggesting relevant trained entities and topics such as Climate Change, Eco
            Energy and Sustainability. No exact name required.
          </P>
        </>
      ),
      right: (
        <>
          <SuggestDemo />
          <Shift from="recall" to="recognition" />
          <P gap>
            A difficult memory task became an intuitive selection experience. Users could discover
            existing intelligence through language they already understood.
          </P>
          <P>
            It was a relatively small interaction change, but an important step towards making AI
            capabilities accessible to more people.
          </P>
        </>
      ),
    },

    // ── Chapter 3 ────────────────────────────────────────────────────────────
    {
      id: 'ch3',
      chapter: 3,
      left: (
        <>
          <ChapterHead
            n="Chapter 3"
            title="Breaking one giant query into smaller parts"
            meta="Year 3 · Making complex searches understandable"
          />
          <P>Discoverability was one problem. Understandability was another.</P>
          <P>
            Even when users had replaced hundreds of keywords with AI entities and topics, their
            searches were still difficult to interpret.
          </P>
          <P>
            A complex query was essentially a wall of text. You could build it, but could you read
            it back and confidently explain what it was doing? Could a teammate understand it?
          </P>
          <P>We needed to change how users saw the logic behind a search.</P>
          <DesignShiftLabel />
          <P>
            We decomposed the single, intimidating query string into clearly labelled rows, grouping
            criteria such as companies, topics and exclusions.
          </P>
          <P>
            Instead of scanning a wall of terms, users could see the individual components and
            understand how they contributed to the overall search.
          </P>
          <P>
            A search became something closer to a document: structured, readable and easier for a
            teammate to audit.
          </P>
        </>
      ),
      right: (
        <>
          <StructureDemo />
          <Shift from="query syntax" to="visual structure" />
          <P gap>
            This was perhaps the quietest but most important step in the evolution. Once the
            underlying logic became visible, we created the foundation for users to understand,
            manage and eventually take greater control of their searches.
          </P>
        </>
      ),
    },

    // ── Chapter 4 ────────────────────────────────────────────────────────────
    {
      id: 'ch4-problem',
      chapter: 4,
      left: (
        <>
          <BridgeLead>
            But a new question emerged. We had reduced the number of keywords. We had made searches
            easier to read.
          </BridgeLead>
          <BridgeQuestion>
            So why were users still building multiple interconnected searches?
          </BridgeQuestion>
          <BridgeLead after>
            Because making the structure visible didn’t necessarily make it flexible enough.
          </BridgeLead>
          <div className="mt-8 border-t border-foreground/15 pt-8">
            <ChapterHead
              n="Chapter 4"
              title="Letting users group terms their own way"
              meta="Year 4 · Letting users define what belongs together"
            />
          </div>
          <P>
            Our structured search experience made searches easier to understand, but the system
            still imposed an important limitation: users could only group entities of the same type
            together.
          </P>
          <P>In reality, business questions don’t always follow those predefined categories.</P>
        </>
      ),
      right: (
        <div className="flex h-full flex-col justify-center">
          <P>Consider a user who wants to track Mars Inc. and its products across UK media:</P>
          <p className="mb-5 mt-1 text-[18px] font-medium leading-[1.6] text-foreground">
            (Mars Food <span className="text-primary-strong">OR</span> M&amp;M’s Chocolate{' '}
            <span className="text-primary-strong">OR</span> Skittles{' '}
            <span className="text-primary-strong">OR</span> Galaxy){' '}
            <span className="text-primary-strong">AND</span> Mars Inc.{' '}
            <span className="text-primary-strong">AND</span> UK media list
          </p>
          <P>
            From a business perspective, these brands and products belong together. The user wants
            to capture coverage mentioning any of them, within the context of Mars Inc. and UK
            media.
          </P>
          <P>
            But our system treated organisations, products and other entity types as separate
            categories. Users couldn’t bring them together into one group and define their own OR
            logic across them.
          </P>
          <Pull>
            The system understood entity types. Users understood business relationships. Those two
            ways of thinking didn’t always align.
          </Pull>
        </div>
      ),
    },
    {
      id: 'ch4-shift',
      chapter: 4,
      left: (
        <>
          <DesignShiftLabel />
          <P>
            We introduced flexible grouping, allowing users to combine different types of entities,
            topics and sources within the same group, then choose how they relate using AND, OR and
            NOT operators.
          </P>
          <P>
            Users could finally organise search criteria around the meaning of their business
            question, rather than the categories imposed by the system.
          </P>
          <Shift from="system-defined categories" to="user-defined groupings" />
          <div className="mt-5">
            <Shot
              crop
              src={img('Categorized-Clarity.png')}
              alt="The new search builder: two groups of entities and sources, each with its own AND or OR switch, and a separate exclusion group."
              caption="Product screenshot. Groups mix companies, products and sources, each with its own AND / OR switch."
            />
          </div>
        </>
      ),
      right: (
        <>
          <LogicDemo />
          <P gap>
            Search became more flexible, allowing users to express the relationships they actually
            cared about without splitting their logic across multiple searches.
          </P>
        </>
      ),
    },

    // ── Chapter 5 ────────────────────────────────────────────────────────────
    {
      id: 'ch5-question',
      chapter: 5,
      left: (
        <>
          <BridgeLead>
            But there was still a fundamental assumption underneath everything we’d built: that
            users came to Signal wanting to build searches.
          </BridgeLead>
          <BridgeQuestion>What if that assumption was wrong?</BridgeQuestion>
          <ChapterArrival>
            <ChapterHead
              n="Chapter 5"
              title="Asking a question instead of building a search"
              meta="The next paradigm · Search 2.0 and AI-powered tagging"
            />
          </ChapterArrival>
          <P>People don’t come to Signal because they want to build searches.</P>
          <P>They come with questions about their business.</P>
          <P>
            That’s the job they want to get done. They don’t necessarily care how many entities,
            keywords, operators or search groups it takes to get there.
          </P>
          <P>
            This called for more than another improvement to the search interface. It called for a
            completely different UX paradigm.
          </P>
        </>
      ),
      right: <QuestionDemo />,
    },
    {
      id: 'ch5-shift',
      chapter: 5,
      left: (
        <>
          <DesignShiftLabel />
          <P>
            Instead of asking users to construct increasingly sophisticated search queries, we
            separated the experience into two simple concepts:
          </P>
          <P>
            <strong className="font-semibold text-foreground">
              1. Define your content universe.
            </strong>{' '}
            Users establish the pool of information they want to work with, using broad criteria
            such as entities, reading lists and sources.
          </P>
          <P>
            <strong className="font-semibold text-foreground">
              2. Describe what they’re looking for.
            </strong>{' '}
            Users express their business question in natural language, creating an AI tag that
            classifies relevant articles across that content universe.
          </P>
          <P>
            The AI agent handles the complexity of interpreting the definition and tagging the
            articles — with the process continuing as new coverage arrives.
          </P>
          <P>
            The interface no longer asks users to understand the machinery behind search. It gives
            them a simple way to tell the system what matters to them.
          </P>
          <Shift from="constructing queries" to="expressing intent" />
        </>
      ),
      right: (
        <>
          <AiTagDemo />
          <P gap>
            This is a fundamental change in the relationship between users and the product. We’re
            moving away from making users do the work of translating business questions into
            technical search logic, towards a system that can understand and act on their intent.
          </P>
        </>
      ),
    },

    // ── Chapter 6 ────────────────────────────────────────────────────────────
    {
      id: 'ch6',
      chapter: 6,
      left: (
        <>
          <ChapterHead
            n="Chapter 6"
            title="Helping users trust the AI’s results"
            meta="The latest addition · Definition refinement"
          />
          <P>A new paradigm also introduces a new challenge: confidence.</P>
          <P>
            Writing an AI tag in natural language sounds simple, but how can users know whether the
            system has understood what they mean?
          </P>
          <P>
            Sending a definition into the system and hoping it works isn’t a particularly reassuring
            experience — especially when users are about to apply it across large volumes of
            content. We wanted to remove that uncertainty before users committed to using their
            tags.
          </P>
          <DesignShiftLabel />
          <P>We introduced a definition refinement experience directly into the workflow.</P>
          <P>
            Rather than making users leave the setup process, consult external guidance or figure
            out how to improve their prompts themselves, we bring the assistance to where they need
            it.
          </P>
        </>
      ),
      right: (
        <>
          <RefineDemo />
          <P gap>
            Users review real borderline articles and simply indicate whether each one should or
            shouldn’t receive the tag. The system uses these decisions to help refine the
            definition.
          </P>
        </>
      ),
    },
    {
      id: 'ending',
      chapter: 7,
      left: (
        <>
          <P>This makes the experience:</P>
          <Bullets
            items={[
              { lead: 'Less friction', rest: 'Refinement happens within the existing workflow.' },
              {
                lead: 'More intuitive',
                rest: 'Users can make decisions based on real articles rather than trying to write the perfect prompt.',
              },
              {
                lead: 'More confidence-inspiring',
                rest: 'Users can validate and improve their definition before applying it at scale.',
              },
            ]}
          />
          <P>
            The goal is simple: help users get to a working AI tag they trust, without having to
            worry about the cost of getting it wrong across a large volume of data.
          </P>
          <Shift from="hoping the AI understands" to="confidently validating its understanding" />
          <div className="mt-5">
            <Shot
              crop
              src={img('ai-tags-in-search.png')}
              alt="An advanced search called Acme Corp Tier 1. Articles carry AI tags such as Cost of living, a panel on the right lists AI tags to filter by, and a pop-up shows which tags an article matched."
              caption="Product screenshot. AI tags in an advanced search: applied to incoming coverage and used as filters."
            />
          </div>
        </>
      ),
      right: <BusinessImpact />,
    },

    // ── Impact, and what's next ──────────────────────────────────────────────
    {
      id: 'next',
      chapter: 7,
      left: <BeforeAndNow />,
      right: (
        <div className="flex h-full flex-col justify-center">
          <ChapterHead n="What’s next?" title="Search still has further to go." />
          <P>
            What started as an effort to help customers manage their own searches has grown into
            something much bigger: rethinking how people interact with information and how much of
            the complexity technology should take away.
          </P>
          <ul className="my-3 border-y border-foreground/10">
            {[
              ['keywords', 'intelligence'],
              ['rigid structures', 'flexible logic'],
              ['query building', 'expressing intent'],
            ].map(([from, to]) => (
              <li
                key={from}
                className="flex items-baseline gap-3 border-t border-foreground/10 py-2.5 text-[16px] first:border-t-0"
              >
                <span className="flex-1 text-muted-foreground">{from}</span>
                <span className="text-primary-strong" aria-hidden="true">
                  →
                </span>
                <span className="sr-only">to</span>
                <span className="flex-1 text-foreground">{to}</span>
              </li>
            ))}
          </ul>
          <P>The next chapter is still being written.</P>
          <P>
            The direction remains the same: less effort spent telling the system how to work, and
            more time spent understanding what matters.
          </P>
          <a
            href={`${basePath}/`}
            className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-foreground/20 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-foreground/50"
          >
            <ArrowLeft className="size-4" strokeWidth={2.25} aria-hidden="true" /> Back to portfolio
          </a>
        </div>
      ),
    },
  ];
}

// ── Page ─────────────────────────────────────────────────────────────────────

export function SearchEvolutionView({
  siteBasePath = defaultBasePath,
}: SearchEvolutionViewProps) {
  const build = useCallback(
    (go: (spread: number) => void) => buildSpreads(siteBasePath, go),
    [siteBasePath]
  );

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <style>{BOOK_CSS}</style>

      <main>
        <StoryBook
          build={build}
          chapters={CHAPTERS}
          title="Redesigning search"
          scan={(openBook, viewToggle) => (
            <ScanPage
              basePath={siteBasePath}
              viewToggle={viewToggle}
              bookLink={(children, className) => (
                <button type="button" onClick={openBook} className={className}>
                  {children}
                </button>
              )}
            />
          )}
          breadcrumb={
            <>
              <a href={`${siteBasePath}/`} className="transition-colors hover:text-primary-strong">
                Portfolio
              </a>
              <span aria-hidden="true">/</span>
              <span className="text-primary-strong" aria-current="page">
                Redesigning search
              </span>
            </>
          }
        />
      </main>
    </div>
  );
}
