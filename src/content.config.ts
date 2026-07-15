import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Specs are stored as language-neutral keys (e.g. `aluminum`, `fingerprint`, `wifi`)
 * and rendered through the dictionaries in `src/i18n.ts`. Only prose — the short
 * description and the body copy — is written per language.
 */
const brand = z.enum(['ilock', 'philips', 'smartlock']);

const material = z.enum([
	'aluminum',
	'aluminum-glass',
	'zinc',
	'zinc-glass',
	'steel',
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
	'realtime',
	'pir',
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
]);

const prose = z.object({
	description: z.string(),
	body: z.string(),
	seoTitle: z.string(),
	seoDescription: z.string(),
});

const locks = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/locks' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			brand,
			/** Sold as an iLock-badged product even though the spec sheet lists another vendor. */
			kazakhBrand: z.boolean().default(false),
			comingSoon: z.boolean().default(false),
			/** Price in KZT. `priceTo` marks a range (the cabinet lock is sold 15–25k). */
			price: z.number(),
			priceTo: z.number().optional(),
			image: image(),
			/** Ordering within a brand group; lower is shown first. */
			order: z.number(),
			featured: z.boolean().default(false),
			material,
			access: z.array(access).nonempty(),
			/** Enrolment limits, e.g. `{ fingerprint: 100, pin: 20 }`. */
			limits: z.record(z.string(), z.number()).default({}),
			features: z.array(feature).default([]),
			temp: z.object({ min: z.number(), max: z.number() }),
			power,
			/** Months of use between charges/battery swaps, e.g. "4-6" or "10". */
			battery: z.string(),
			app: z.string().optional(),
			warranty: z.number(),
			interface: z.array(z.enum(['ru', 'kk', 'en', 'zh'])).nonempty(),
			colors: z.array(color).nonempty(),
			ru: prose,
			kk: prose,
			en: prose,
		}),
});

export const collections = { locks };
