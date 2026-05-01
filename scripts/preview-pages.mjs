import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const outDir = join(process.cwd(), 'out');
const previewRoot = join(process.cwd(), '.preview-pages');

if (!existsSync(outDir)) {
  console.error('Missing out/ — run npm run build first.');
  process.exit(1);
}

const explicit = process.env.NEXT_PUBLIC_BASE_PATH;
const segment =
  explicit !== undefined
    ? explicit.replace(/^\/+|\/+$/g, '')
    : 'lu-x-perience';

if (existsSync(previewRoot)) {
  rmSync(previewRoot, { recursive: true });
}

if (!segment) {
  cpSync(outDir, previewRoot, { recursive: true });
  console.log('Preview: site at origin root → http://localhost:3000/');
} else {
  const target = join(previewRoot, segment);
  mkdirSync(target, { recursive: true });
  cpSync(outDir, target, { recursive: true });
  console.log(
    `Preview: like GitHub project pages → http://localhost:3000/${segment}/`,
  );
}
