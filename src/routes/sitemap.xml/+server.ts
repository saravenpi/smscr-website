import { siteUrl } from '$lib/data';

// Generated at build time (was a hand-maintained static file with a stale
// <lastmod>). Prerendered to a real /sitemap.xml file by adapter-static.
export const prerender = true;

// A sitemap is a file, not a page: it must live at exactly /sitemap.xml, so opt
// out of the site-wide `trailingSlash: 'always'` (which would give /sitemap.xml/).
export const trailingSlash = 'never';

type Entry = { path: string; changefreq: string; priority: string };

// Static route list — mirror any new prerendered page here.
const pages: Entry[] = [
	{ path: '/', changefreq: 'monthly', priority: '1.0' },
	{ path: '/dates/', changefreq: 'weekly', priority: '0.8' }
];

export function GET() {
	// Inlined identically at build (see vite.config.ts) — the deploy date.
	const lastmod = __BUILD_DATE__;

	const urls = pages
		.map(
			(p) => `	<url>
		<loc>${siteUrl}${p.path}</loc>
		<lastmod>${lastmod}</lastmod>
		<changefreq>${p.changefreq}</changefreq>
		<priority>${p.priority}</priority>
	</url>`
		)
		.join('\n');

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

	return new Response(body, {
		headers: { 'Content-Type': 'application/xml' }
	});
}
