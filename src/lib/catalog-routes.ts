import { getCollection, type CollectionEntry } from 'astro:content';
import { getDictionaries } from './dictionaries';

export type CatalogRoute =
	| { slug: string; lock: CollectionEntry<'locks'>; brand?: undefined }
	| { slug: string; brand: string; lock?: undefined };

/**
 * `/catalog/<slug>/` serves both product pages and brand pages. A brand gets a page once it
 * has at least one product, so a brand added in Keystatic never produces an empty page.
 */
export async function catalogRoutes(): Promise<CatalogRoute[]> {
	const locks = await getCollection('locks');
	const dict = await getDictionaries();
	const brands = dict.brands.map((b) => b.id).filter((id) => locks.some((lock) => lock.data.brand === id));

	const clash = brands.find((id) => locks.some((lock) => lock.id === id));
	if (clash) throw new Error(`Brand "${clash}" and a product share the URL /catalog/${clash}/; rename one of them.`);

	return [...locks.map((lock) => ({ slug: lock.id, lock })), ...brands.map((brand) => ({ slug: brand, brand }))];
}
