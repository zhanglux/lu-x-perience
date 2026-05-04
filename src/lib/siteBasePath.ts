/**
 * URL prefix for GitHub project pages (username.github.io/repo-name).
 * Keep in sync with `basePath` in next.config.ts (both use this module).
 *
 * Development always uses "" so `next dev` assets stay at /_next/* at localhost:3000/.
 * NEXT_PUBLIC_BASE_PATH only applies to production builds (and preview of `out/`).
 *
 * For a custom domain at the site root, set in `.env.production`:
 *   NEXT_PUBLIC_BASE_PATH=
 */
export function resolveSiteBasePath(): string {
  if (process.env.NODE_ENV !== 'production') {
    return '';
  }
  const explicit = process.env.NEXT_PUBLIC_BASE_PATH;
  if (explicit !== undefined) {
    return explicit;
  }
  return '/lu-x-perience';
}

export const siteBasePath = resolveSiteBasePath();
