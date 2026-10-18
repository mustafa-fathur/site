/**
 * Site-wide settings. This file is imported by `astro.config.mjs` as well as by
 * pages, so it must stay free of `astro:*` imports and `import.meta.env`.
 */

/**
 * Production origin of this site, without a trailing slash, e.g. "https://example.com".
 * Enables the canonical link and the absolute URLs Open Graph requires. While
 * empty, those tags are left out rather than pointing at the wrong host.
 * TODO: set before deploying.
 */
export const SITE_URL: string = "";

/**
 * Origin of the blog, without a trailing slash. Posts link to
 * `${BLOG_URL}/posts/${slug}/`.
 * TODO: replace the local dev address with the deployed blog URL.
 */
export const BLOG_URL: string = "http://localhost:4322";
