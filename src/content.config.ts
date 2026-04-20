import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const locks = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/locks' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			model: z.string(),
			brand: z.string(),
			material: z.string(),
			description: z.string(),
			price: z.string(),
			image: image(),
			seoTitle: z.string(),
			seoDescription: z.string(),
			order: z.number(),
			features: z.array(z.string()),
			translations: z.object({
				kk: z.object({
					title: z.string(),
					material: z.string(),
					description: z.string(),
					price: z.string(),
					seoTitle: z.string(),
					seoDescription: z.string(),
					features: z.array(z.string()),
					body: z.string(),
				}),
				en: z.object({
					title: z.string(),
					material: z.string(),
					description: z.string(),
					price: z.string(),
					seoTitle: z.string(),
					seoDescription: z.string(),
					features: z.array(z.string()),
					body: z.string(),
				}),
			}),
		}),
});

export const collections = { locks };
