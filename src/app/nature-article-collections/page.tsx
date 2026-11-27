import {
  caseStudyMetadata,
  SpringerNatureCaseStudyPage,
} from '@/components/SpringerNatureCaseStudyPage';

export const metadata = caseStudyMetadata('nature-article-collections');

export default function Page() {
  return <SpringerNatureCaseStudyPage slug="nature-article-collections" />;
}
