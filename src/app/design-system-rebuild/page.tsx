import type { Metadata } from 'next';
import { siteBasePath } from '@/lib/siteBasePath';
import { DesignSystemRebuildView } from '@/components/DesignSystemRebuildView';

export const metadata: Metadata = {
  title: 'Design system rebuild — Lu Zhang',
  description:
    'Case study: replacing Material UI at Signal AI with a component library on React Aria, then a token system generated from Figma Variables. Shown as a live spec sheet.',
};

export default function DesignSystemRebuildPage() {
  return <DesignSystemRebuildView siteBasePath={siteBasePath} />;
}
