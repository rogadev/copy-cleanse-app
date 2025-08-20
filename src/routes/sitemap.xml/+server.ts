import type { RequestHandler } from '@sveltejs/kit';

// Your site's base URL - update this to match your domain
const SITE_URL = 'https://clean.roga.dev';

// Define your static routes here
const staticRoutes = [
	{
		url: '', // Root page
		changeFreq: 'monthly',
		priority: '1.0',
		lastMod: new Date().toISOString()
	}
	// Add more routes here as your site grows, e.g.:
	// { url: '/about', changeFreq: 'yearly', priority: '0.8', lastMod: new Date().toISOString() },
];

export const GET: RequestHandler = async () => {
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes
	.map(
		(route) => `	<url>
		<loc>${SITE_URL}${route.url}</loc>
		<lastmod>${route.lastMod}</lastmod>
		<changefreq>${route.changeFreq}</changefreq>
		<priority>${route.priority}</priority>
	</url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600' // Cache for 1 hour
		}
	});
};
