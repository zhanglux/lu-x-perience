import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import { siteBasePath } from '@/lib/siteBasePath';
import { ManuscriptTrackingAuthorView } from '@/components/ManuscriptTrackingAuthorView';

export const metadata: Metadata = {
  title: 'Manuscript tracking for authors — Lu Zhang',
  description:
    'Case study: redesigning the manuscript tracking experience to bring transparency to peer review for a platform handling 4,000+ submissions every month.',
};

const releaseVideo = '/ms-tracking/first-release.mp4';

export default function ManuscriptTrackingAuthorViewPage() {
  const hasVideo = fs.existsSync(path.join(process.cwd(), 'public', releaseVideo));
  return (
    <ManuscriptTrackingAuthorView
      siteBasePath={siteBasePath}
      releaseVideo={hasVideo ? releaseVideo : undefined}
    />
  );
}
