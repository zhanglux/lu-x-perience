import fs from 'node:fs';
import path from 'node:path';

/**
 * Images present in public/field-notes at build time, keyed by name without
 * extension, with the path relative to the site base path as the value.
 * Server only: reads the file system.
 */
export function findFieldNotesImages(): Record<string, string> {
  const dir = path.join(process.cwd(), 'public', 'field-notes');
  if (!fs.existsSync(dir)) return {};
  const images: Record<string, string> = {};
  for (const file of fs.readdirSync(dir)) {
    const match = /^(.+)\.(png|webp|jpe?g)$/i.exec(file);
    if (match) images[match[1]] = `/field-notes/${file}`;
  }
  return images;
}
