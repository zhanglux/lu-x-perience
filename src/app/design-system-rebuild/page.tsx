import type { Metadata } from 'next';
import { siteBasePath } from '@/lib/siteBasePath';
import { DesignSystemRebuildView } from '@/components/DesignSystemRebuildView';

export const metadata: Metadata = {
  title: 'Design system rebuild — Lu Zhang',
  description:
    'Case study: replacing Material UI at Signal AI with our own component library, then Arla, a design system whose tokens are generated from Figma Variables. Told as a field guide built from the system itself.',
};

export default function DesignSystemRebuildPage() {
  return <DesignSystemRebuildView siteBasePath={siteBasePath} />;
}
