import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import { siteBasePath } from '@/lib/siteBasePath';
import { FieldNotesSpringerNatureView } from '@/components/FieldNotesSpringerNatureView';

export const metadata: Metadata = {
  title: 'UX work at Springer Nature — Lu Zhang',
  description:
    'Research, strategy and team practice from three years at Springer Nature, organised by the UX skill each piece proves.',
};

/** Images present in public/field-notes at build time, keyed by name without extension. */
function findImages(): Record<string, string> {
  const dir = path.join(process.cwd(), 'public', 'field-notes');
  if (!fs.existsSync(dir)) return {};
  const images: Record<string, string> = {};
  for (const file of fs.readdirSync(dir)) {
    const match = /^(.+)\.(png|webp|jpe?g)$/i.exec(file);
    if (match) images[match[1]] = `/field-notes/${file}`;
  }
  return images;
}

export default function FieldNotesSpringerNaturePage() {
  return <FieldNotesSpringerNatureView siteBasePath={siteBasePath} images={findImages()} />;
}
