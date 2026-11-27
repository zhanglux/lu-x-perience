// Fails when a page outside the showcase list styles itself with something that is
// not a design token: a Tailwind palette colour, a hard-coded colour, an arbitrary
// font size or letter-spacing, or one of Tailwind's own radius, shadow or font names.
// Runs before every build. To use a one-off value on purpose (another brand's colours
// in a case study, say), put an `off-system:` comment on that line or the line above,
// saying why.

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, relative } from 'node:path';

const root = fileURLToPath(new URL('..', import.meta.url));

// Pages that deliberately show another product's look. They may use src/app/showcase.css.
const SHOWCASE = [
  'src/app/take-home-design-task/prototype/', // the take-home's product prototype
  'src/components/design-system/', // the Arla design system's own specimens
  'src/components/search-evolution/ScanPage.tsx', // recreated Signal AI screens
  'src/components/search-evolution/demos.tsx', // recreated Signal AI screens
];

const PALETTE = 'slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose';
const RULES = [
  [new RegExp(`^-?(?:bg|text|border(?:-[trblxyse])?|ring(?:-offset)?|from|via|to|fill|stroke|outline|decoration|divide|placeholder|caret|accent|shadow|inset-shadow)-(?:${PALETTE})-\\d+(?:/.*)?$`), 'Tailwind palette colour: use a colour token'],
  [/\[[^\]]*(?:#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(|oklch\()/, 'hard-coded colour: use a colour token'],
  [/^text-\[\d[^\]]*\]$/, 'arbitrary font size: use a type token (text-2xs … text-5xl, text-book-*)'],
  [/^tracking-\[/, 'arbitrary letter-spacing: use tracking-tight / normal / wide / eyebrow / caps'],
  [/^tracking-(?:tighter|wider|widest)$/, 'Tailwind letter-spacing: use a tracking token'],
  [/^rounded(?:-[trblse]{1,2})?-(?:xs|sm|md|lg|xl|2xl|3xl|4xl)$/, 'Tailwind radius: use rounded-chip / control / card / panel / full'],
  [/^rounded(?:-[trblse]{1,2})?-\[/, 'arbitrary radius: use a radius token'],
  [/^shadow-(?:2xs|xs|sm|md|lg|xl|2xl|inner)$/, 'Tailwind shadow: use shadow-card-hover or shadow-panel'],
  [/^font-(?:sans|serif|\[.*)$/, 'font family: everything is set in the mono token'],
];
const BARE = new Map([
  ['rounded', 'bare rounded: use rounded-chip / control / card / panel'],
  ['shadow', 'bare shadow: use shadow-card-hover or shadow-panel'],
]);

/** The utility after its variants (`sm:data-hovered:bg-x` → `bg-x`), ignoring colons inside brackets. */
function base(token) {
  let depth = 0;
  let cut = 0;
  for (let i = 0; i < token.length; i += 1) {
    const c = token[i];
    if (c === '[' || c === '(') depth += 1;
    else if (c === ']' || c === ')') depth -= 1;
    else if (c === ':' && depth === 0) cut = i + 1;
  }
  return token.slice(cut).replace(/^!/, '').replace(/!$/, '');
}

function stripComments(src) {
  // Keep line numbers: blank out comments character by character.
  return src
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '))
    .replace(/(^|[^:'"`])\/\/[^\n]*/g, (m, p) => p + ' '.repeat(m.length - p.length));
}

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, files);
    else if (/\.(tsx|ts|jsx|js)$/.test(name)) files.push(p);
  }
  return files;
}

const problems = [];
for (const file of walk(join(root, 'src'))) {
  const rel = relative(root, file).split('\\').join('/');
  if (SHOWCASE.some((s) => rel.startsWith(s))) continue;
  const raw = readFileSync(file, 'utf8');
  const rawLines = raw.split('\n');
  const code = stripComments(raw);
  const strings = /(['"`])((?:\\.|(?!\1)[^\\])*)\1/g;
  for (const m of code.matchAll(strings)) {
    const text = m[2];
    const line = code.slice(0, m.index).split('\n').length;
    const allowed = (n) => /off-system:/.test(rawLines[n - 1] ?? '') || /off-system:/.test(rawLines[n - 2] ?? '');
    const tokens = text.split(/\s+/).filter(Boolean);
    const classy = tokens.filter((t) => t.includes('-')).length >= 2;
    for (const [offset, tok] of tokens.entries()) {
      const b = base(tok);
      const hit = RULES.find(([re]) => re.test(b)) ?? (classy && BARE.has(b) ? [null, BARE.get(b)] : null);
      if (!hit) continue;
      // Find the token's own line inside a multi-line string.
      const before = text.slice(0, text.indexOf(tok, offset === 0 ? 0 : text.indexOf(tokens[offset - 1]) ));
      const at = line + (before.match(/\n/g)?.length ?? 0);
      if (!allowed(at)) problems.push(`${rel}:${at}  ${tok}  — ${hit[1]}`);
    }
  }
}

if (problems.length) {
  console.error(`Off-token styles (${problems.length}). Use design tokens, or mark a deliberate exception with an "off-system:" comment:\n`);
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}
console.log('check-tokens: every page outside the showcase list uses design tokens only.');
