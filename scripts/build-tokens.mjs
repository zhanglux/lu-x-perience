// Generates src/app/tokens.css from design-tokens/tokens.json, the single source of
// the site's design tokens (the Lu-x-perience design system is published from the
// same file). Run with `npm run tokens`; `dev` and `build` run it first.
//
// The output switches off Tailwind's own colour, font, type, radius, shadow and
// letter-spacing scales, so the only values those utilities accept are the tokens.
// Pages that deliberately show another product's look get theirs back from
// src/app/showcase.css, and scripts/check-tokens.mjs keeps them to those pages.

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const tokens = JSON.parse(readFileSync(`${root}design-tokens/tokens.json`, 'utf8'));

const px = (v) => (typeof v === 'number' ? `${v}px` : v);
const strip = (name, prefix) => (name.startsWith(prefix) ? name.slice(prefix.length) : name);

const themes = tokens.color.themes.map((t) => t.id);
const [first, ...rest] = themes;
const colorValue = (tok, theme) =>
  typeof tok.value === 'string' ? (theme === first ? tok.value : undefined) : tok.value[theme];

const out = [];
out.push('/* GENERATED from design-tokens/tokens.json by scripts/build-tokens.mjs. Do not edit by hand. */', '');

// Colour values per theme, as plain CSS variables (the light theme is the default).
out.push(':root {');
for (const tok of tokens.color.tokens) out.push(`  --${tok.name}: ${colorValue(tok, first)};`);
for (const tok of tokens.spacing?.tokens ?? []) out.push(`  --${tok.name}: ${px(tok.value)};`);
out.push('}', '');
for (const theme of rest) {
  out.push(`.${theme} {`);
  for (const tok of tokens.color.tokens) {
    const v = colorValue(tok, theme);
    if (v !== undefined && v !== colorValue(tok, first)) out.push(`  --${tok.name}: ${v};`);
  }
  out.push('}', '');
}

// Tailwind's theme: reset the default scales, then declare only the tokens.
out.push('@theme static {');
for (const ns of ['color', 'font', 'text', 'radius', 'shadow', 'tracking']) out.push(`  --${ns}-*: initial;`);
out.push('');
for (const [key, stack] of Object.entries(tokens.type.families)) out.push(`  --font-${key}: ${stack};`);
const defaultFamily = tokens.type.groups[0]?.family ?? Object.keys(tokens.type.families)[0];
out.push(`  --default-font-family: ${tokens.type.families[defaultFamily]};`, '');

for (const group of tokens.type.groups) {
  out.push(`  /* Type: ${group.name} */`);
  for (const s of group.styles) {
    out.push(`  --text-${s.name}: ${px(s.fontSize)};`);
    if (s.lineHeight !== undefined) out.push(`  --text-${s.name}--line-height: ${typeof s.lineHeight === 'number' ? s.lineHeight : s.lineHeight};`);
    if (s.letterSpacing !== undefined) out.push(`  --text-${s.name}--letter-spacing: ${s.letterSpacing};`);
    if (s.fontWeight !== undefined) out.push(`  --text-${s.name}--font-weight: ${s.fontWeight};`);
  }
  out.push('');
}

for (const tok of tokens.radius?.tokens ?? []) out.push(`  --radius-${strip(tok.name, 'radius-')}: ${px(tok.value)};`);
out.push('');
for (const tok of tokens.shadow?.tokens ?? []) {
  const v = typeof tok.value === 'string' ? tok.value : tok.value[first];
  out.push(`  --shadow-${strip(tok.name, 'shadow-')}: ${v};`);
}
out.push('');
for (const tok of tokens.tracking?.tokens ?? []) out.push(`  --tracking-${strip(tok.name, 'tracking-')}: ${tok.value};`);
out.push('');
const base = tokens.spacing?.tokens?.[0];
if (base) out.push(`  /* Spacing utilities (p-4, gap-6) are multiples of ${base.name}. */`, `  --spacing: ${px(base.value)};`);
out.push('}', '');

// Colour utilities (bg-primary, border-line-subtle) read the per-theme variables.
out.push('@theme inline {');
for (const tok of tokens.color.tokens) out.push(`  --color-${tok.name}: var(--${tok.name});`);
out.push('}', '');

writeFileSync(`${root}src/app/tokens.css`, out.join('\n'));
console.log(`tokens.css: ${tokens.color.tokens.length} colours, ${tokens.type.groups.reduce((n, g) => n + g.styles.length, 0)} type styles`);
