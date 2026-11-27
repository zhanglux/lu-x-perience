# Design tokens

`tokens.json` is the single source of the site's look: colours (light and dark), type, letter-spacing, radius, shadow and spacing. The Lu-x-perience design system artifact publishes the same file.

- `npm run tokens` writes `src/app/tokens.css` from it. That file switches off Tailwind's own colour, font, type, radius, shadow and letter-spacing scales and declares only these tokens, so `bg-primary`, `text-sm`, `rounded-card`, `shadow-card-hover` and `tracking-eyebrow` exist and `text-slate-500`, `rounded-xl` and `shadow-lg` don't. `dev` and `build` run it first. Never edit `tokens.css` by hand.
- `npm run check:tokens` fails if a page uses anything else: a Tailwind palette colour, a hex value, an arbitrary font size, radius or letter-spacing. `build` runs it first.
- Pages that show another product's look (the take-home prototype, the Arla specimens, the recreated Signal AI screens) are listed in `scripts/check-tokens.mjs` and get the Tailwind defaults they use from `src/app/showcase.css`.
- A deliberate one-off elsewhere (another brand's colours in a case study) takes an `off-system:` comment on that line or the line above, saying why.

To change a token: edit `tokens.json`, run `npm run tokens`, and publish the same file to the design system artifact so the two stay identical.
