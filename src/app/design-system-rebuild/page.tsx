import type { Metadata } from 'next';
import { siteBasePath } from '@/lib/siteBasePath';
import { DesignSystemRebuildView } from '@/components/DesignSystemRebuildView';

export const metadata: Metadata = {
  title: 'Design system rebuild — Lu Zhang',
  description:
    'Case study: migrating from Material UI to React Aria — building a component library from the ground up after outgrowing someone else\'s.',
};

export default function DesignSystemRebuildPage() {
  return <DesignSystemRebuildView siteBasePath={siteBasePath} />;
}
