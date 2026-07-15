// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	// Used for canonical URLs, hreflang, sitemap and JSON-LD.
	// CHANGE THIS if the site ships on a different domain.
	site: 'https://ilock.kz',
	integrations: [
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
		plugins: [tailwindcss()],
	},
});
