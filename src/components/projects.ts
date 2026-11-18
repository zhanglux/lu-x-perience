import type { ChildPageKey } from './childPages';

export interface Project {
  id: string;
  name: string;
  /** One-line summary shown on the homepage card and in the terminal list. */
  description: string;
  company: string;
  tags: string[];
  status: string;
  year: string;
  /** Path relative to the site base path. */
  path: string;
  childKey: ChildPageKey;
  /** Card image, relative to the site base path. */
  image: string;
  imageAlt: string;
}

/** Single source of truth for the case studies, in display order. */
export const projects: Project[] = [
  {
    id: '001',
    name: 'The Search Evolution',
    description:
      'Five years taking search from hand-written Boolean strings to asking a plain question.',
    company: 'Signal AI',
    tags: ['Product Design', 'AI/LLM', 'Interactive prototype'],
    status: 'In progress',
    year: '2021 – 2026',
    path: '/the-search-evolution',
    childKey: 'the-search-evolution',
    image: '/search-2.0/search-before-after.webp',
    imageAlt:
      'Before and after: the old dark Boolean search screen behind the new key message analysis flow.',
  },
  {
    id: '002',
    name: 'Design System Rebuild',
    description:
      'Replacing Material UI with a token system and component library built on React Aria after a rebrand.',
    company: 'Signal AI',
    tags: ['Design Systems', 'React Aria', 'Design Tokens'],
    status: 'In progress',
    year: '2025 – 2026',
    path: '/design-system-rebuild',
    childKey: 'design-system-rebuild',
    image: '/design-system/visual-language.png',
    imageAlt: 'Colour palettes, spacing scale and icon set from the new visual language.',
  },
  {
    id: '003',
    name: 'Innovation Week Prototypes',
    description:
      'Two AI tools from company hack weeks: a chat-based search builder, and demo workspaces generated from a Slack voice note.',
    company: 'Signal AI',
    tags: ['AI prototyping', 'Chat interface', 'Onboarding'],
    status: 'Shipped',
    year: '2024 – 2025',
    path: '/signal-ai-innovation-week',
    childKey: 'signal-ai-innovation-week',
    image: '/innovation-week/saved-search-wizard.png',
    imageAlt: 'Saved Search Wizard building a structured search from a chat prompt.',
  },
  {
    id: '004',
    name: 'Manuscript Tracking: Author View',
    description:
      'Making peer review status visible to authors on a platform handling 4,000+ submissions a month.',
    company: 'Springer Nature',
    tags: ['User Research', 'Experience Mapping', 'Impact Measurement'],
    status: 'Shipped',
    year: '2020',
    path: '/manuscript-tracking-author-view',
    childKey: 'manuscript-tracking-author-view',
    image: '/ms-tracking/MS-tracking.png',
    imageAlt: 'Author submissions dashboard on desktop, tablet and mobile.',
  },
];

/** The interview take-home, highlighted on the homepage (the terminal lists it under `interview`). */
export const takeHomeProject: Project = {
  id: 'T01',
  name: 'Orbital Copilot',
  description:
    'An AI copilot for property due diligence that works through documents, issues and reports alongside real estate lawyers. Concept and coded prototype.',
  company: 'Take-home design task',
  tags: ['Product Design', 'Systems Thinking', 'Coded prototype'],
  status: 'Take-home design task',
  year: '2026',
  path: '/take-home-design-task',
  childKey: 'take-home-design-task',
  image: '/key-screens/screen2.png',
  imageAlt:
    'Transaction workspace with a knowledge base of documents, a Copilot chat suggesting a due diligence blueprint, and a toolbox of actions.',
};

/** Homepage cards, in display order: the first is the large featured card. */
export const homeProjects: Project[] = [
  projects[0],
  projects[1],
  takeHomeProject,
  projects[3],
];
