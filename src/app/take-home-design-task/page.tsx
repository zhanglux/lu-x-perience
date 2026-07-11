import type { Metadata } from 'next';
import { siteBasePath } from '@/lib/siteBasePath';
import { TakeHomeDesignTaskView } from '@/components/TakeHomeDesignTaskView';

export const metadata: Metadata = {
  title: 'Take-home design task — Lu Zhang',
  description: 'Take-home design task interview briefing and artifact',
};

export default function TakeHomeDesignTaskPage() {
  return <TakeHomeDesignTaskView siteBasePath={siteBasePath} />;
}
