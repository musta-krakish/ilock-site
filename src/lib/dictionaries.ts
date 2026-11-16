import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n';

/**
 * Brands, materials, features, power, interface languages, colours, catalogue tags and
 * catalogue settings are edited in Keystatic. Locks store their keys; this module turns a
 * key into the label for a language. An unknown key falls back to the key itself, so a
 * typo shows up on the page instead of breaking the build.
 */

type Dict = 'materials' | 'features' | 'power' | 'interfaces' | 'colors';
type PlainDict = Exclude<Dict, 'colors'>;

export type BrandEntry = CollectionEntry<'brands'>['data'] & { id: string };
export type CatalogTagEntry = CollectionEntry<'catalogTags'>['data'] & { id: string };
export type Budget = CollectionEntry<'catalogSettings'>['data']['budgets'][number];

const byOrder = <T extends { order: number; name: string }>(a: T, b: T) =>
	a.order - b.order || a.name.localeCompare(b.name);

async function load() {
	const entries = async <C extends PlainDict>(name: C) =>
		new Map((await getCollection(name)).map((entry) => [entry.id, entry.data]));

	const [materials, features, power, interfaces] = await Promise.all([
		entries('materials'),
		entries('features'),
		entries('power'),
		entries('interfaces'),
	]);
	const colors = new Map((await getCollection('colors')).map((entry) => [entry.id, entry.data]));
	const brands = (await getCollection('brands')).map((b) => ({ ...b.data, id: b.id })).sort(byOrder);
	const tags = (await getCollection('catalogTags')).map((t) => ({ ...t.data, id: t.id })).sort(byOrder);
	const settings = (await getCollection('catalogSettings'))[0]?.data;
	const lists = { materials, features, power, interfaces, colors };

	return {
		brands: brands as BrandEntry[],
		brandOrder: brands.map((b) => b.id),
		brand: (id: string) => brands.find((b) => b.id === id),
		brandName: (id: string) => brands.find((b) => b.id === id)?.name ?? id,
		/** Label of `key` in dictionary `dict` for `lang`; Russian is the entry's name. */
		label: (dict: Dict, key: string, lang: Lang) => {
			const entry = lists[dict].get(key);
			if (!entry) return key;
			return (lang === 'ru' ? entry.name : entry[lang]) || entry.name;
		},
		colorSwatch: (key: string) => colors.get(key)?.swatch ?? '#888888',
		colorGroup: (key: string) => colors.get(key)?.filterGroup ?? 'none',
		tags: tags as CatalogTagEntry[],
		budgets: (settings?.budgets ?? []) as Budget[],
	};
}

export type Dictionaries = Awaited<ReturnType<typeof load>>;

let cached: Promise<Dictionaries> | undefined;

/** Loaded once per build (or per server process) and shared by every component. */
export function getDictionaries() {
	// In dev, Keystatic edits must show up without restarting the server.
	if (import.meta.env.DEV) return load();
	cached ??= load();
	return cached;
}
