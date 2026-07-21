import type { Metadata } from 'next';
import { siteBasePath } from '@/lib/siteBasePath';
import { SearchEvolutionView } from '@/components/SearchEvolutionView';

export const metadata: Metadata = {
  title: 'The Search Evolution — Lu Zhang',
  description: 'Case study: from keyword chaos to intent-driven clarity.',
};

export default function SearchEvolutionPage() {
  return <SearchEvolutionView siteBasePath={siteBasePath} />;
}
