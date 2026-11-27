import type { Metadata } from 'next';
import { siteBasePath } from '@/lib/siteBasePath';
import { findFieldNotesImages } from '@/lib/fieldNotesImages';
import { SpringerNatureCaseStudyView } from './SpringerNatureCaseStudyView';
import { findCaseStudy } from './springerNature';

function angleFor(slug: string) {
  const angle = findCaseStudy(slug);
  if (!angle) throw new Error(`No Springer Nature case study with slug "${slug}"`);
  return angle;
}

/** Page metadata for a Springer Nature case study route. Server only. */
export function caseStudyMetadata(slug: string): Metadata {
  const study = angleFor(slug).caseStudy;
  return { title: `${study.title} — Lu Zhang`, description: study.summary };
}

/** The whole page for a Springer Nature case study route. Server only. */
export function SpringerNatureCaseStudyPage({ slug }: { slug: string }) {
  return (
    <SpringerNatureCaseStudyView
      angle={angleFor(slug)}
      siteBasePath={siteBasePath}
      images={findFieldNotesImages()}
    />
  );
}
