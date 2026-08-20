import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Specs are stored as language-neutral keys (e.g. `aluminum`, `fingerprint`, `wifi`)
 * and rendered through the dictionaries in `src/i18n.ts`. Only prose — the short
 * description and the body copy — is written per language.
 */
const brand = z.enum(['ilock', 'philips', 'smartlock', 'safes', 'tiger']);

const kind = z.enum(['lock', 'safe']);

const material = z.enum([
	'aluminum',
	'aluminum-glass',
	'zinc',
	'zinc-glass',
	'steel',
	'low-carbon-steel',
]);

const access = z.enum([
	'fingerprint',
	'pin',
	'face',
	'palm',
	'card',
	'key',
	'app',
	'master-card',
	'vein',
]);

const feature = z.enum([
	'wifi',
	'bluetooth',
	'doorbell',
	'video-peephole',
	'two-way-audio',
	'dual-camera',
	'triple-camera',
	'voice-change',
	'voice-ru-kk',
	'realtime',
	'pir',
	'motion',
	'door-sensor',
	'night-watch',
	'auto',
	'semi-auto',
	'auto-lock',
	'push-pull',
	'rechargeable',
	'wireless-charge',
	'emergency-charge',
	'low-battery',
	'tamper-alarm',
	'double-check',
	'c-cylinder',
	'mute',
	'anti-pry',
	'ip67',
	'waterproof',
	'slim-door',
	'glass-door',
	'software',
	'programmer',
	'solid-body',
	'alarm',
	'storage-sections',
	'hidden-compartment',
	'dual-check',
	'wall-mount',
]);

const power = z.enum(['aa4', 'li-4200', 'li-5000', 'li-ion', 'li']);

const color = z.enum([
	'black',
	'matte-black',
	'charcoal',
	'obsidian',
	'gold',
	'silver',
	'copper',
	'bronze',
	'titanium',
	'coffee',
	'gray',
	'white',
]);

const prose = z.object({
	description: z.string(),
	body: z.string(),
	seoTitle: z.string(),
	seoDescription: z.string(),
});

const locks = defineCollection({
	// Keystatic writes structured product records as YAML. FAQ entries remain
	// Markdown because their answers are rendered as page content.
	loader: glob({ pattern: '**/*.yaml', base: './src/content/locks' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			brand,
			kind: kind.default('lock'),
			/** Sold as an iLock-badged product even though the spec sheet lists another vendor. */
			kazakhBrand: z.boolean().default(false),
			comingSoon: z.boolean().default(false),
			/** Price in KZT. `priceTo` marks a range (the cabinet lock is sold 15–25k). */
			price: z.number(),
			priceTo: z.number().nullable().optional(),
			image: image(),
			/** Ordering within a brand group; lower is shown first. */
			order: z.number(),
			featured: z.boolean().default(false),
			material,
			access: z.array(access),
			/** Enrolment limits, e.g. `{ fingerprint: 100, pin: 20 }`. */
			limits: z.record(z.string(), z.number()).default({}),
			features: z.array(feature).default([]),
			temp: z.object({ min: z.number(), max: z.number() }),
			power,
			/** Months of use between charges/battery swaps, e.g. "4-6" or "10". */
			battery: z.string(),
			app: z.string().nullable().optional(),
			warranty: z.number(),
			origin: z.object({ ru: z.string(), kk: z.string(), en: z.string() }).nullable().optional(),
			interface: z.array(z.enum(['ru', 'kk', 'en', 'zh'])),
			colors: z.array(color),
			variants: z
				.array(
					z.object({
						name: z.string(),
						price: z.number(),
						height: z.number().nullable().optional(),
						width: z.number().nullable().optional(),
						depth: z.number().nullable().optional(),
						weight: z.number().nullable().optional(),
					}),
				)
				.default([]),
			ru: prose,
			kk: prose,
			en: prose,
		}),
});

const faq = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/faq' }),
	schema: z.object({
		lang: z.enum(['ru', 'kk', 'en']),
		order: z.number(),
		question: z.string(),
	}),
});

export const collections = { locks, faq };
