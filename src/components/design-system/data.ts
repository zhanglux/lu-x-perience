/**
 * Values copied from the phase 2 Figma library (Color Primitives, Brand & Semantic Colors,
 * Spacing and Token Naming guide) and from repo counts taken in November 2026.
 * Nothing here is estimated: if a value is not in those sources it is not listed.
 */

export const stops = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

export const ramps: { family: string; character: string; values: string[] }[] = [
  {
    family: 'slate',
    character: 'Cool blue-tinted neutrals',
    values: ['#F7F9FF', '#E6ECFF', '#BCCBF5', '#97A9DE', '#7D91CD', '#6C7FB8', '#5F70A3', '#4A5985', '#344063', '#202945'],
  },
  {
    family: 'smoke',
    character: 'Neutral grey ramp',
    values: ['#F7F8FA', '#E9EAF2', '#D5D8E5', '#BEC2D4', '#9A9EB5', '#80859E', '#676C87', '#50556D', '#383C51', '#252836'],
  },
  {
    family: 'ube',
    character: 'Violet-indigo brand',
    values: ['#F9F7FF', '#E5E0FF', '#BDAFFF', '#9782FF', '#7B61FF', '#6446FF', '#4F34D9', '#3B25A8', '#211073', '#100838'],
  },
  {
    family: 'orchid',
    character: 'Magenta-purple accent',
    values: ['#FEF5FF', '#FDDEFF', '#F4ADF7', '#E181E5', '#CC5CD1', '#AF46B4', '#913096', '#6E1173', '#550B59', '#310733'],
  },
  {
    family: 'chili',
    character: 'Red',
    values: ['#FFF5F5', '#FFD6D6', '#FFB3B3', '#FF8A8F', '#FF585D', '#E53E3E', '#C53030', '#9B2C2C', '#742A2A', '#2E090A'],
  },
  {
    family: 'tangerine',
    character: 'Warm orange',
    values: ['#FFF5F0', '#FFDDC9', '#FFBA91', '#FF965A', '#E87B3C', '#CC6E37', '#B05F30', '#874924', '#5C2F15', '#331B0E'],
  },
  {
    family: 'honey',
    character: 'Golden yellow',
    values: ['#FFF9ED', '#FFE9BF', '#FFDA94', '#FFC864', '#EFAF38', '#D49622', '#B8821D', '#805A13', '#523808', '#33260E'],
  },
  {
    family: 'seafoam',
    character: 'Teal and mint',
    values: ['#E8F9F5', '#C6F0E7', '#A4E7D4', '#93DFC9', '#82DCBE', '#68C4A3', '#4FA182', '#3A7F62', '#2A5D47', '#1F432F'],
  },
];

export function primitiveValue(alias: string): string {
  if (alias === 'white/50') return '#FFFFFF';
  if (alias === 'white/100') return '#FDFCFA';
  const [family, stop] = alias.split('/');
  const ramp = ramps.find((r) => r.family === family);
  const index = stops.indexOf(Number(stop) as (typeof stops)[number]);
  return ramp && index >= 0 ? ramp.values[index] : '';
}

export interface SemanticToken {
  name: string;
  /** Primitive it aliases, as family/stop. */
  alias: string;
  use: string;
}

const sentiments: Record<string, [string, string, string, string]> = {
  // background, background-strong, border, text
  accent: ['orchid/100', 'orchid/600', 'orchid/600', 'orchid/800'],
  brand: ['ube/100', 'ube/900', 'ube/600', 'ube/800'],
  caution: ['tangerine/100', 'tangerine/400', 'tangerine/600', 'tangerine/800'],
  error: ['chili/100', 'chili/600', 'chili/600', 'chili/800'],
  neutral: ['slate/100', 'slate/400', 'slate/600', 'slate/800'],
  success: ['seafoam/100', 'seafoam/700', 'seafoam/600', 'seafoam/800'],
  warning: ['honey/100', 'honey/500', 'honey/600', 'honey/800'],
};

export const badgeSentiments = Object.keys(sentiments);

const badgeTokens: SemanticToken[] = Object.entries(sentiments).flatMap(([s, [bg, strong, border, text]]) => [
  { name: `badge/${s}/background`, alias: bg, use: `Badge (subtle) fill, ${s}` },
  { name: `badge/${s}/background-strong`, alias: strong, use: `Badge (strong) fill, ${s}` },
  { name: `badge/${s}/border`, alias: border, use: `Badge (subtle) outline, ${s}` },
  { name: `badge/${s}/text`, alias: text, use: `Badge (subtle) label and icon, ${s}` },
]);

const pickerRamps: Record<string, [string, string, string, string]> = {
  // background, background-hover, icon, text
  negative: ['chili/100', 'chili/200', 'chili/800', 'chili/800'],
  neutral: ['smoke/100', 'smoke/200', 'smoke/900', 'smoke/800'],
  positive: ['seafoam/100', 'seafoam/200', 'seafoam/800', 'seafoam/800'],
};

export const pickerSentiments = ['positive', 'neutral', 'negative'];

const pickerTokens: SemanticToken[] = Object.entries(pickerRamps).flatMap(([s, [bg, hover, icon, text]]) => [
  { name: `picker/${s}/background`, alias: bg, use: `Sentiment picker fill, ${s}` },
  { name: `picker/${s}/background-hover`, alias: hover, use: `Sentiment picker fill on hover and focus, ${s}` },
  { name: `picker/${s}/icon`, alias: icon, use: `Sentiment picker caret and icon, ${s}` },
  { name: `picker/${s}/text`, alias: text, use: `Sentiment picker label, ${s}` },
]);

export const semanticTokens: SemanticToken[] = [
  { name: 'text-color/primary', alias: 'smoke/900', use: 'Primary text for headings and body copy' },
  { name: 'text-color/secondary', alias: 'smoke/600', use: 'Secondary text for supporting and helper copy' },
  { name: 'text-color/muted', alias: 'smoke/400', use: 'Muted text for low-emphasis metadata and captions' },
  { name: 'text-color/error', alias: 'chili/600', use: 'Error and validation message text' },
  { name: 'text-color/inverse', alias: 'white/50', use: 'Text on dark or brand surfaces' },
  { name: 'surface/default', alias: 'white/50', use: 'Default surface for pages, panels and containers' },
  { name: 'surface/raised', alias: 'white/50', use: 'Raised surface for dialogs, popovers and menus' },
  { name: 'surface/subtle', alias: 'smoke/50', use: 'Low-emphasis background for grouped content' },
  { name: 'surface/sunken', alias: 'smoke/100', use: 'Recessed surface for wells and inset content' },
  { name: 'surface/disabled', alias: 'smoke/100', use: 'Background for disabled containers' },
  { name: 'surface/skeleton', alias: 'smoke/100', use: 'Skeleton loading placeholder fill' },
  { name: 'surface/selected', alias: 'ube/50', use: 'Background for a selected container or row' },
  { name: 'surface/brand', alias: 'ube/500', use: 'Strong brand surface, paired with inverse text' },
  { name: 'surface/inverse', alias: 'smoke/900', use: 'Dark surface, paired with inverse text' },
  { name: 'surface/tooltip-dark', alias: 'smoke/900', use: 'Dark tooltip background' },
  { name: 'icon/default', alias: 'smoke/900', use: 'Default icon colour' },
  { name: 'icon/secondary', alias: 'smoke/600', use: 'Secondary icon colour for supporting icons' },
  { name: 'icon/muted', alias: 'smoke/400', use: 'Muted icon colour for disabled and placeholder icons' },
  { name: 'icon/brand', alias: 'ube/500', use: 'Brand-coloured icon for active-state icons' },
  { name: 'icon/error', alias: 'chili/600', use: 'Icon colour for errors and destructive actions' },
  { name: 'border/divider', alias: 'smoke/100', use: 'Divider line between content sections' },
  { name: 'status/error-background', alias: 'chili/50', use: 'Error background for messages, banners and toasts' },
  { name: 'status/error-icon', alias: 'chili/500', use: 'Error status icon colour' },
  { name: 'status/info-background', alias: 'slate/50', use: 'Info background for messages, banners and toasts' },
  { name: 'status/info-icon', alias: 'ube/500', use: 'Info status icon colour' },
  { name: 'status/success-background', alias: 'seafoam/50', use: 'Success background for messages, banners and toasts' },
  { name: 'status/success-icon', alias: 'seafoam/600', use: 'Success status icon colour' },
  { name: 'status/warning-background', alias: 'honey/50', use: 'Warning background for messages, banners and toasts' },
  { name: 'status/warning-icon', alias: 'honey/400', use: 'Warning status icon colour' },
  ...badgeTokens,
  { name: 'tag/border-default', alias: 'slate/400', use: 'Tag outline, default and functional states' },
  { name: 'tag/border-focus', alias: 'slate/900', use: 'Tag outline, focused state' },
  { name: 'tag/negative-background', alias: 'chili/100', use: 'Read-only tag fill, negative' },
  { name: 'tag/negative-text', alias: 'chili/900', use: 'Read-only tag label, negative' },
  { name: 'tag/positive-background', alias: 'seafoam/100', use: 'Read-only tag fill, positive' },
  { name: 'tag/positive-text', alias: 'seafoam/900', use: 'Read-only tag label, positive' },
  { name: 'card/background-info', alias: 'slate/100', use: 'Info card fill' },
  { name: 'card/background-pressed', alias: 'slate/50', use: 'Card background, pressed state' },
  { name: 'card/border-focus', alias: 'ube/800', use: 'Card border, focus state' },
  { name: 'card/border-pressed', alias: 'slate/400', use: 'Card border, pressed state' },
  { name: 'card/media-background', alias: 'orchid/500', use: 'Placeholder fill for card media before an image loads' },
  { name: 'avatar/background-initials', alias: 'orchid/50', use: 'Avatar background behind initials' },
  { name: 'avatar/background-neutral', alias: 'smoke/300', use: 'Avatar neutral fill' },
  { name: 'avatar/background-online', alias: 'ube/500', use: 'Avatar fill, online variant' },
  { name: 'avatar/background-overflow', alias: 'orchid/100', use: 'Avatar "+N" overflow fill' },
  { name: 'avatar/background-placeholder', alias: 'honey/300', use: 'Avatar fill when there is no image or initials' },
  { name: 'avatar/border-initials', alias: 'orchid/700', use: 'Avatar border, initials variant' },
  { name: 'avatar/border-online', alias: 'ube/800', use: 'Avatar outline, online variant' },
  { name: 'avatar/text-initials', alias: 'orchid/700', use: 'Avatar initials text colour' },
  { name: 'picker/border-focus', alias: 'smoke/800', use: 'Sentiment picker focus outline' },
  ...pickerTokens,
];

export function token(name: string): string {
  const found = semanticTokens.find((t) => t.name === name);
  return found ? primitiveValue(found.alias) : '';
}

export const cssVar = (name: string) => `var(--ds-${name.replace(/\//g, '-')})`;

export const spacing = [0, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80];

export const namingGrammar = [
  { segment: 'Group', rule: 'The area or component the role belongs to.', example: 'badge/' },
  { segment: 'Variant', rule: 'Optional. Sentiment or component variant, named by role.', example: 'error/' },
  { segment: 'Property', rule: 'What the token styles: background, border, text, icon or stroke.', example: 'background' },
  { segment: 'State or emphasis', rule: 'A hyphenated suffix: default, hover, pressed, focus, disabled, strong.', example: '-strong' },
];

export const createOrReuse = [
  {
    question: 'A semantic token already resolves to this value in this role?',
    answer: 'Reuse it.',
    why: 'Same role and same value means no new token.',
  },
  {
    question: 'Same value, different role?',
    answer: 'Create a new role token.',
    why: 'Roles that match today can diverge later, as surface/default and surface/raised may.',
  },
  {
    question: 'Used by one component only?',
    answer: 'Create it in that component group, such as tag/border-focus.',
    why: 'Keeps roles specific and easy to retire.',
  },
  {
    question: 'Used by two or more components?',
    answer: 'Create it in a shared group, such as status/warning-border.',
    why: 'Avoids duplicate tokens for one meaning.',
  },
  {
    question: 'Only a primitive fits?',
    answer: 'Add the semantic role first, then bind to it.',
    why: 'Components never bind to primitives.',
  },
];

/** Files in the product front end that import each phase 1 component (count taken November 2026). */
export const phase1Usage = [
  { component: 'Icon', files: 56 },
  { component: 'Button', files: 45 },
  { component: 'Tooltip', files: 43 },
  { component: 'Toast', files: 28 },
  { component: 'Badge', files: 26 },
  { component: 'Input', files: 22 },
  { component: 'Spinner', files: 19 },
  { component: 'DropdownMenu', files: 17 },
  { component: 'ConfirmationDialog', files: 13 },
  { component: 'Popover', files: 10 },
  { component: 'Select', files: 8 },
];

export const comparison = [
  {
    area: 'Tokens',
    phase1: 'One hand-written theme file with about 90 hard-coded hex colours.',
    phase2: 'Generated from Figma Variables. The build fails on a hard-coded colour or px value in a component.',
  },
  {
    area: 'Tests',
    phase1: '5 test files across 27 components.',
    phase2: '27 test files, one per component, each with an automated axe accessibility test and keyboard tests.',
  },
  {
    area: 'Usage guidance',
    phase1: 'None written down.',
    phase2: '15 usage guides: when to use, when not to use, content, accessibility, do and don’t.',
  },
  {
    area: 'Stories',
    phase1: '3 of 27 components had no story.',
    phase2: 'Every variant value has its own story, and the build checks it.',
  },
  {
    area: 'Accessibility base',
    phase1: '20 of 27 components built on React Aria Components.',
    phase2: 'Every component. Raw button, input and select elements are not allowed.',
  },
];

/** Phase 1 components not yet rebuilt in phase 2, ranked by files that import them (legacy imports included). */
export const backlog = [
  { component: 'Spinner', files: 91 },
  { component: 'Tooltip', files: 43 },
  { component: 'Toast', files: 28 },
  { component: 'Dialog', files: 27 },
  { component: 'Badge', files: 26 },
  { component: 'Table', files: 25 },
  { component: 'ConfirmationDialog', files: 23 },
  { component: 'DropdownMenu', files: 20 },
];
