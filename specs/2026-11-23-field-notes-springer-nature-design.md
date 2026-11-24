# Field Notes: Springer Nature — page design

Date: 2026-11-23. Status: draft for Lu's approval. Nothing is built yet.

## Intent

Add one project page to the portfolio that gathers Lu's Springer Nature work (2018–2021) and shows it to design managers as proof of UX skill, organised by skill and not by project.

**Why:** the existing Signal AI pages show product design, AI, design systems and coded prototypes. None shows research depth. The Springer Nature material is almost all research, strategy and collaboration, and most pieces pair a method with a number. This page fills that gap.

**Reader:** a design manager skimming for two to three minutes. They should leave with four claims about Lu, each backed by one concrete piece.

## Goals

- Four skill angles, each with a one-sentence claim and one lead piece that proves it.
- Every piece carries its method, Lu's role, the year, and a number where the sources give one.
- Readable in a skim: claims and numbers are visible without reading body text.
- Looks and behaves like the other case-study pages on the site.

## Non-goals

- Not a full case study for each piece. Lead pieces get about 150 words; the rest get one line.
- No rewrite of the existing Manuscript Tracking page. It stays as the deep dive and is linked.
- No filtering, tagging UI or interactivity beyond anchor links.

## Anti-goals

- No colleague names in the copy, and no internal Hive or Miro URLs. (2026-11-24: Lu chose to keep colleagues' first names visible in the sketching session image.)
- No outcome claims the sources don't support. Where a piece had no measured outcome, say so or leave the number out. The article page piece keeps its honest note that reading impact was not measured.
- No "we" that hides Lu's role. Each piece states what Lu did.

## Approaches considered

- **A. Each piece once, under its strongest angle.** Simple, but pieces that prove two skills lose half their story.
- **B. Skill filter over tagged cards.** Accurate, but makes the manager do the work and has no narrative.
- **C. One lead piece per angle, plus "also seen in" pointers.** Chosen by Lu. Four claims, four proofs, and overlap between angles reads as a strength.

## Page structure (decided with Lu)

Name: **Field Notes: Springer Nature**. Route: `/field-notes-springer-nature` (my call).

```
Portfolio / Field Notes: Springer Nature
[tags]  H1  one-line intro  (2018 – 2021 · Springer Nature)
[stat row: 3–4 headline numbers]
[anchor nav: Research methods · Evidence-based design · Strategy · Collaboration]

01 · Research methods
   Claim sentence
   LEAD piece: title · year · role line · ~150 words · figure · 2–3 number chips
   Also seen in: 2–3 rows (piece · method · one line · number)

02 · Evidence-based design      (same shape)
03 · Strategy and systems thinking
04 · Team collaboration

Deep dive: link card to Manuscript Tracking: Author View
← Back to portfolio
```

### The four angles and their pieces

Lu approved the four angles and the sorting. The choice of lead piece in each is my call.

**01 Research methods** — "Picks the method that fits the question."
- Lead: **Springer journal redesign** (2019). Lu ran the research (Mar–Apr 2019), then co-designed homepage, IA and submission features with two designers (Apr–Jul 2019). Numbers: 659 survey responses, 116 editor survey responses, 8 editor and 6 author interviews, 80,000 customer service queries reviewed; six homepage iterations; usability test with 8 participants across 5 countries.
- Also: Experience benchmarking (28 tasks, 41 participants, task success, time on task, SEQ, SUS) · Footer IA (2 internal open card sorts, 15 end-user hybrid sorts; categories moved from job role to user task) · Nature article page survey (500+ responses).

**02 Evidence-based design** — "Hypothesis, test, measure."
- Lead: **Nature article collection, grid vs list** (Dec 2018). Lu led data analysis with a data analyst, built a dashboard, ran exploratory research, then co-designed with a brand designer. Finding: mostly mobile traffic, little browsing, first article takes most clicks. Hypothesis: a list scans faster than a 3x3 grid. Test: 16 participants, old vs new on wide and narrow viewports, using a coded prototype with live content. Result: list faster on all viewports.
- Also: Nature article page experiment (SEO improved, downloads unharmed, reading impact not measured) · Benchmarking informing the product roadmap · Manuscript tracking (support tickets down after 14 June 2020 release; links to its page).

**03 Strategy and systems thinking** — "Designs for the whole service, not one screen."
- Lead: **Editorial setup archetype / Content Acquisition UX strategy** (Mar 2021). Lu led research into the editorial setup process, mapped the end-to-end flow with pain points and knowledge gaps, wrote the archetype sheet and vision, and used them to define UX progress metrics. Core idea: design for activities, not job titles, so the system scales across journals.
- Also: Peer reviewer experience poster and service blueprint (Dec 2020, co-drafted) · Journal onboarding end to end (2021; 10 internal staff interviewed; outcome, hypothesis and success metric defined with the team; work was still in progress).

**04 Team collaboration** — "Makes the team part of the design work."
- Lead: **Remote sketching sessions** (2020). Lu joined a new team as the blocker on in-flight tickets, and introduced team sketching sessions. Four lessons: remote is no barrier; frame problems and scenarios, not tasks; invite neighbouring teams; shared ownership without design by committee (dot voting fed the roadmap).
- Also: Getting a team user-centric (2019; six problems, anonymous feedback form, a recurring UX retro) · "Reading Science" research comic book.

## Site integration

- Build as `src/components/FieldNotesSpringerNatureView.tsx` plus `src/app/field-notes-springer-nature/page.tsx`. Wiring is three steps: add the key to the `ChildPageKey` union in `childPages.ts`, add an entry to `projects` in `projects.ts`, add the route. Child pages open by full navigation; there is no inline view to support.
- Registry entry (my calls): id `005`, appended after Manuscript Tracking so existing ids don't change; it therefore also appears in the terminal project list. Company "Springer Nature", year "2018 – 2021", status "Shipped", tags `User Research`, `UX Strategy`, `Team Collaboration`. Description: "Three years of research, strategy and team practice across Springer and Nature journals, sorted by the skill each piece proves."
- `homeProjects` is positional today (`projects[3]`). Change it to reference the Field Notes entry explicitly.
- Anchor nav (my call): a plain row of four in-page links under the header that wraps on narrow screens. No sticky behaviour, no scroll tracking. No other page has one, so this is new.
- Visual style: reuse the existing page vocabulary (max-w-4xl column, numbered eyebrow labels, bordered cards, stat tiles, figures with captions). No new dependencies.
- Piece content lives in one typed data array in the view file, as the Innovation Week page does.
- **Homepage (my call, please check):** Field Notes takes the Springer Nature card slot on the homepage in place of Manuscript Tracking. Manuscript Tracking stays a live page, stays in the terminal project list, and is linked from Field Notes.
- Images go in `public/field-notes/`.

## Constraints

- Static export to GitHub Pages; `npm run build` deletes and regenerates `docs/`, which is why this spec lives in `specs/`.
- Copy follows the site's existing voice; British spelling.
- Works at phone width.
- Checks available: `npm run lint` and `npm run build`. There is no test suite.

## Sources

All facts come from Lu's Drive folder "Portfolio", which is not in the repo: Google Docs "Lu's case study 2021" and "Lu's portfolio 2021"; Slides "Case study - design process" (source of the 14 June 2020 release date); PDFs "Case study - sketching session", "Case study - engage team to become more user centric", "Editorial setup archetype 2021", "CA Poster - Peer reviewer experience - 7 Dec 2020". Copy is written in a session with Drive access; if a lead piece runs short of facts, shorten it instead of padding.

## Open dependency: images

The source docs' images did not come through as text, so none has been reviewed. Needed: one figure per lead piece (four), plus a card image for the homepage. Candidates in the Drive folder: `user journey and research output.png`, `Editorial setup archetype 2021.pdf`, `CA Poster - Peer reviewer experience - 7 Dec 2020.pdf`, `Case study - sketching session.pdf`, `Springer journal development.mov`, and the before/after images inside the two Google Docs. Lu confirms which are safe to publish. The site only uses png/webp images, so PDF pages and video frames must be exported as images first. The homepage card cannot ship without an image (`Project.image` is required). Fallback if a lead has no approved image: that lead ships without a figure.

## Left to the builder

- Final copy for each piece, drawn only from the facts above and the source docs.
- Headline stat row selection, icon choices, exact spacing, anchor nav behaviour on mobile.
- Alt text and captions.
