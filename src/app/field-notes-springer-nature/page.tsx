import type { Metadata } from 'next';
import { siteBasePath } from '@/lib/siteBasePath';
import { homeSectionPath } from '@/components/springerNature';

export const metadata: Metadata = {
  title: 'UX work at Springer Nature — Lu Zhang',
  robots: { index: false },
};

/**
 * This page used to gather the Springer Nature work. Each project now has its own
 * page, listed on the homepage, so old links are sent to that group.
 */
export default function FieldNotesSpringerNatureRedirect() {
  const target = `${siteBasePath}${homeSectionPath}`;
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <main className="mx-auto max-w-xl px-6 py-24 text-sm text-muted-foreground">
        <p>
          The Springer Nature projects now each have their own page.{' '}
          <a href={target} className="text-foreground underline decoration-primary decoration-2 underline-offset-4">
            See them on the homepage →
          </a>
        </p>
      </main>
    </>
  );
}
