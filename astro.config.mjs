// @ts-check
import { defineConfig } from 'astro/config';
import markdoc from '@astrojs/markdoc';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';
import keystatic from '@keystatic/astro';

const keystaticInlinePreview = {
	name: 'keystatic-inline-preview',
	enforce: /** @type {'pre'} */ ('pre'),
	transform(/** @type {string} */ code, /** @type {string} */ id) {
		if (id.includes('@keystatic/astro/internal/keystatic-page.js')) {
			return {
				code: `import '/src/scripts/keystatic-inline-preview.ts';\n${code}`,
				map: null,
			};
		}
	},
};

// https://astro.build/config
export default defineConfig({
	// Used for canonical URLs, hreflang, sitemap and JSON-LD.
	// Set `SITE_URL` on the production host to the public HTTPS URL.
	site: process.env.SITE_URL ?? 'https://ilock-site.vercel.app',
	// Public pages use `getStaticPaths()` and are generated during the build.
	// Keystatic and preview routes opt into on-demand rendering individually.
	output: 'static',
	adapter: node({ mode: 'standalone' }),
	integrations: [
		react(),
		markdoc(),
		keystatic(),
		sitemap({
			// Russian is served from the root, so /ru/* is a duplicate of /* and must stay out.
			filter: (page) => !/^https?:\/\/[^/]+\/ru(\/|$)/.test(page),
			i18n: {
				defaultLocale: 'ru',
				locales: { ru: 'ru-KZ', kk: 'kk-KZ', en: 'en' },
			},
		}),
	],
	vite: {
		// Keystatic's client UI imports ReactDOM dynamically. Pre-bundling this
		// CommonJS entry preserves createRoot for the Astro React client renderer.
		optimizeDeps: {
			include: ['react-dom/client'],
		},
		plugins: [keystaticInlinePreview, tailwindcss()],
	},
});
