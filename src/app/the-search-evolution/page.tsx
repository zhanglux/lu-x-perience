import type { Metadata } from 'next';
import { siteBasePath } from '@/lib/siteBasePath';
import { SearchEvolutionView } from '@/components/SearchEvolutionView';

export const metadata: Metadata = {
  title: 'Redesigning search — Lu Zhang',
  description: 'Case study: how search at Signal AI moved from hand-built Boolean queries to asking a question in plain language.',
};

export default function SearchEvolutionPage() {
  return <SearchEvolutionView siteBasePath={siteBasePath} />;
}
