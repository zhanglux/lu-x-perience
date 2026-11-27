import {
  caseStudyMetadata,
  SpringerNatureCaseStudyPage,
} from '@/components/SpringerNatureCaseStudyPage';

export const metadata = caseStudyMetadata('springer-journal-redesign');

export default function Page() {
  return <SpringerNatureCaseStudyPage slug="springer-journal-redesign" />;
}
