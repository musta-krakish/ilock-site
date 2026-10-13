import type { APIRoute } from 'astro';

// @astrojs/sitemap writes /sitemap-index.xml; crawlers and people often try /sitemap.xml
// first. A real 301 (rendered per request) works for sitemap fetchers, unlike a meta refresh.
export const prerender = false;

export const GET: APIRoute = ({ redirect }) => redirect('/sitemap-index.xml', 301);
