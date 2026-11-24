# Field Notes: Springer Nature Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a skill-organised collection page of Lu's Springer Nature work (2018–2021) to the portfolio and put it on the homepage.

**Architecture:** One presentational view component holding a typed data array of four skill angles, each with a lead piece and "also seen in" rows; one route file; three registry edits. No new dependencies, no client state.

**Tech Stack:** Next.js 15 static export, React 19, Tailwind 4, lucide-react.

**Spec:** `specs/2026-11-23-field-notes-springer-nature-design.md`

## Global Constraints

- No colleague names, no internal Hive or Miro URLs, no screenshots showing them.
- No outcome claim the spec's facts don't support. Article page piece keeps "reading impact was not measured".
- Each piece states what Lu did; avoid a bare "we".
- British spelling; match the voice of `ManuscriptTrackingAuthorView.tsx`.
- Images are png or webp only, in `public/field-notes/`.
- No new dependencies. Reuse existing class vocabulary (`max-w-4xl`, eyebrow labels, bordered cards, stat tiles, figure + figcaption).
- There is no test suite. Checks are `npm run lint`, `npm run build`, and the browser preview.
- Do not commit until Lu asks. "Commit" steps below mean: stage nothing, report the task done.
- `npm run build` rewrites `docs/`. Run it only in Task 4.

## Review Focus

1. A lead piece with no approved image: section renders without a figure and without an empty box.
2. Phone width (375px): anchor nav wraps, stat chips wrap, no horizontal scroll.
3. Anchor links under the GitHub Pages base path: each jumps to its section and does not reload the page.
4. Homepage after the card swap: still four cards, grid unbroken, Manuscript Tracking still reachable from Field Notes and from the terminal `projects` list (which now says five).
5. Copy leak: no `@springer`, `hive.`, `miro.com` or colleague name anywhere in the new files.

---

### Task 1: Images (needs Lu)

**Files:**
- Create: `public/field-notes/*.png|webp`

**Interfaces:**
- Produces: up to five files with these exact names; any that Lu does not approve is simply absent:
  `journal-redesign.png`, `collection-grid-vs-list.png`, `editorial-archetype.png`, `sketching-session.png`, `card.png` (homepage card, required).

- [ ] **Step 1:** Fetch the candidates from the Drive folder "Portfolio" into the scratchpad: `user journey and research output.png`, `Editorial setup archetype 2021.pdf`, `CA Poster - Peer reviewer experience - 7 Dec 2020.pdf`, `Case study - sketching session.pdf`, and the embedded images in "Lu's case study 2021" (homepage iterations, grid vs list before/after).
- [ ] **Step 2:** Show each candidate to Lu and record approve / reject / crop. Flag any that show names or internal tools.
- [ ] **Step 3:** Export approved ones to `public/field-notes/` under the names above, max 1600px wide.
- [ ] **Step 4:** Verify: `ls public/field-notes` lists `card.png` at minimum. If Lu approves none, stop and ask; the homepage swap in Task 3 cannot ship.

### Task 2: View and route

**Files:**
- Create: `src/components/FieldNotesSpringerNatureView.tsx`
- Create: `src/app/field-notes-springer-nature/page.tsx`

**Interfaces:**
- Consumes: image filenames from Task 1.
- Produces: `export function FieldNotesSpringerNatureView({ siteBasePath }: { siteBasePath?: string })`.

- [ ] **Step 1:** In the view file define:

```ts
interface Piece { title: string; year: string; method: string; line: string; stat?: string; href?: string }
interface LeadPiece { title: string; year: string; role: string; body: string[]; stats: string[]; image?: string; imageAlt?: string; caption?: string }
interface Angle { id: 'research-methods' | 'evidence-based-design' | 'strategy' | 'collaboration'; label: string; claim: string; lead: LeadPiece; also: Piece[] }
```

- [ ] **Step 2:** Fill `const angles: Angle[]` with the four angles, claims, lead pieces, roles, numbers and "also" rows exactly as listed under "The four angles and their pieces" in the spec. Lead `body` is about 150 words in two paragraphs; shorten if the spec's facts run out. The Manuscript Tracking row under evidence-based design sets `href` to `/manuscript-tracking-author-view`.
- [ ] **Step 3:** Render, top to bottom: breadcrumb; header (tags `User research`, `UX strategy`, `Team collaboration`; h1 "Field Notes: Springer Nature"; one-line intro; "Springer Nature · 2018 – 2021"); three stat tiles (`659 survey responses`, `41 benchmark participants`, `16-person A/B usability test`); anchor nav (four `<a href="#id">`, `flex flex-wrap gap-2`); one `<section id={angle.id}>` per angle with eyebrow `01 · Research methods`, claim, lead card (figure only when `image` is set), and "Also seen in" rows; a link card to Manuscript Tracking; "← Back to portfolio". Copy the shell and classes from `ManuscriptTrackingAuthorView.tsx`.
- [ ] **Step 4:** Create the route file as a copy of `src/app/manuscript-tracking-author-view/page.tsx` with title "Field Notes: Springer Nature — Lu Zhang" and description "Research, strategy and team practice from three years at Springer Nature, organised by the UX skill each piece proves."
- [ ] **Step 5:** Run `npm run lint`. Expected: no errors.
- [ ] **Step 6:** Start the dev server via the preview tool, open `/field-notes-springer-nature`. Expected: four sections; each anchor link scrolls to its section; temporarily blank one `image` and confirm no empty figure box (Review Focus 1, 3).
- [ ] **Step 7:** Resize to 375px. Expected: no horizontal scroll, nav and chips wrap (Review Focus 2).
- [ ] **Step 8:** Run `grep -rniE "hive\.|miro\.com|@springer" src/components/FieldNotesSpringerNatureView.tsx`. Expected: no output (Review Focus 5).

### Task 3: Registry and homepage

**Files:**
- Modify: `src/components/childPages.ts`
- Modify: `src/components/projects.ts`

**Interfaces:**
- Consumes: route `/field-notes-springer-nature`, `public/field-notes/card.png`.

- [ ] **Step 1:** Add `'field-notes-springer-nature'` to the `ChildPageKey` union.
- [ ] **Step 2:** Append to `projects`: id `005`, name `Field Notes: Springer Nature`, description "Three years of research, strategy and team practice across Springer and Nature journals, sorted by the skill each piece proves.", company `Springer Nature`, tags `['User Research', 'UX Strategy', 'Team Collaboration']`, status `Shipped`, year `2018 – 2021`, path and childKey as above, image `/field-notes/card.png`, with alt text describing the approved image.
- [ ] **Step 3:** Change `homeProjects` to `[projects[0], projects[1], takeHomeProject, fieldNotes]` where `fieldNotes` is looked up by `childKey`, not by index.
- [ ] **Step 4:** Run `npm run lint`. Expected: no errors.
- [ ] **Step 5:** In the preview, open `/`. Expected: four cards, the fourth is Field Notes and links to the page; run `projects` in the terminal and see five, including Manuscript Tracking (Review Focus 4).

### Task 4: Build check

- [ ] **Step 1:** Run `npm run build`. Expected: "Build complete!" and `docs/field-notes-springer-nature/index.html` exists.
- [ ] **Step 2:** Take desktop and 375px screenshots of the page and the homepage for Lu.
- [ ] **Step 3:** Report to Lu; commit only if asked.
