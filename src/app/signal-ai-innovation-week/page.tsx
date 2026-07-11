import type { Metadata } from 'next';
import { siteBasePath } from '@/lib/siteBasePath';
import { SignalAiInnovationWeekView } from '@/components/SignalAiInnovationWeekView';

export const metadata: Metadata = {
  title: 'Signal AI Innovation Week — Lu Zhang',
  description:
    'Our annual company-wide event where anyone can pitch an idea, form a team, and use cutting-edge technology to solve real business problems—all while having fun building together.',
};

export default function SignalAiInnovationWeekPage() {
  return <SignalAiInnovationWeekView siteBasePath={siteBasePath} />;
}
