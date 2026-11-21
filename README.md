# Lu Zhang: portfolio

Source for my portfolio site: <https://zhanglux.github.io/lu-x-perience/>

I'm a Senior Product Designer in London. The site holds my case studies and is also a place where I build in code: the homepage motion, the interactive search panel in The Search Evolution, and a small terminal for getting around.

## Stack

- Next.js 15 (App Router, static export) and React 19
- TypeScript
- Tailwind CSS 4
- Motion for animation, Lucide for icons

## Where things are

| Path | What it holds |
| --- | --- |
| `src/app/` | Routes: the homepage and one folder per case study |
| `src/components/` | Page views, homepage sections and the terminal views |
| `src/components/projects.ts` | Project names, summaries and card images, used by the homepage and the terminal |
| `src/components/ui/` | Animated icons |
| `public/` | Images |
| `docs/` | The built site that GitHub Pages serves |

## Run it locally

Needs Node.js 22 or later.

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

## Build and deploy

GitHub Pages serves the `docs/` folder on `main`.

```bash
npm run build
```

This builds the static export and replaces `docs/` with it. Commit the result and push to `main` to publish.

The site is served from `/lu-x-perience`. To build for a different path, set `NEXT_PUBLIC_BASE_PATH` (see `src/lib/siteBasePath.ts`).
