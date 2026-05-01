/**
 * URL prefix for GitHub project pages (username.github.io/repo-name).
 * Keep in sync with `basePath` in next.config.ts (both use this module).
 *
 * For a custom domain served at the site root, set in `.env.production`:
 *   NEXT_PUBLIC_BASE_PATH=
 */
export function resolveSiteBasePath(): string {
  const explicit = process.env.NEXT_PUBLIC_BASE_PATH;
  if (explicit !== undefined) {
    return explicit;
  }
  if (process.env.NODE_ENV !== 'production') {
    return '';
  }
  return '/lu-x-perience';
}

export const siteBasePath = resolveSiteBasePath();
