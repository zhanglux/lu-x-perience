import {
  caseStudyMetadata,
  SpringerNatureCaseStudyPage,
} from '@/components/SpringerNatureCaseStudyPage';

export const metadata = caseStudyMetadata('journal-onboarding');

export default function Page() {
  return <SpringerNatureCaseStudyPage slug="journal-onboarding" />;
}
