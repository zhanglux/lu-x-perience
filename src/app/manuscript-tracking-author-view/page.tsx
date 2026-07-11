import type { Metadata } from 'next';
import { siteBasePath } from '@/lib/siteBasePath';
import { ManuscriptTrackingAuthorView } from '@/components/ManuscriptTrackingAuthorView';

export const metadata: Metadata = {
  title: 'Manuscript tracking — author view — Lu Zhang',
  description:
    'Case study: redesigning the manuscript tracking experience to bring transparency to peer review for a platform handling 4,000+ submissions every month.',
};

export default function ManuscriptTrackingAuthorViewPage() {
  return <ManuscriptTrackingAuthorView siteBasePath={siteBasePath} />;
}
