// @ts-check
import { defineConfig } from 'astro/config';
import markdoc from '@astrojs/markdoc';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import keystatic from '@keystatic/astro';

// https://astro.build/config
export default defineConfig({
	// Used for canonical URLs, hreflang, sitemap and JSON-LD.
	// CHANGE THIS if the site ships on a different domain.
	site: 'https://ilock-site.vercel.app',
	// Public pages remain static; Vercel serves Keystatic's dynamic admin and OAuth routes.
	adapter: vercel(),
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
		plugins: [tailwindcss()],
	},
});
