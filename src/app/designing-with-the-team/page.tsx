import {
  caseStudyMetadata,
  SpringerNatureCaseStudyPage,
} from '@/components/SpringerNatureCaseStudyPage';

export const metadata = caseStudyMetadata('designing-with-the-team');

export default function Page() {
  return <SpringerNatureCaseStudyPage slug="designing-with-the-team" />;
}
