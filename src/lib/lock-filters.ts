import type { LocalizedLock } from '../i18n';
import type { Dictionaries } from './dictionaries';

type FilterSource = Pick<LocalizedLock, 'kind' | 'colors' | 'access' | 'features'>;

/**
 * Maps a lock's language-neutral spec keys onto the filter values used by the catalog panel.
 * Shared by `LockCard` (which stamps them on the card) and `Catalog` (which counts them),
 * so a card can never disagree with the number shown next to a checkbox.
 */
export function lockFilterValues(lock: FilterSource, dict: Pick<Dictionaries, 'colorGroup'>): string[] {
	if (lock.kind !== 'lock') return [];

	const values = new Set<string>();
	const hasFeature = (...features: string[]) =>
		features.some((feature) => lock.features.includes(feature as never));

	// Each colour's filter group is set in its Keystatic dictionary entry.
	for (const color of lock.colors) {
		const group = dict.colorGroup(color);
		if (group !== 'none') values.add(`color-${group}`);
	}

	if (lock.access.includes('face')) values.add('access-face');
	if (lock.access.includes('palm') || lock.access.includes('vein')) values.add('access-palm');

	if (lock.features.includes('wifi')) values.add('connection-wifi');
	if (lock.features.includes('bluetooth')) values.add('connection-bluetooth');

	if (hasFeature('push-pull', 'auto', 'auto-lock') || lock.access.includes('face') || lock.access.includes('palm')) {
		values.add('handle-modern');
	} else {
		values.add('handle-classic');
	}

	if (hasFeature('auto', 'auto-lock')) {
		values.add('mechanism-auto');
	} else if (lock.features.includes('semi-auto')) {
		values.add('mechanism-semi');
	} else {
		values.add('mechanism-ordinary');
	}

	return Array.from(values);
}
