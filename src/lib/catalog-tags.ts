import type { Lang, LocalizedLock } from '../i18n';

type Text = Record<Lang, string>;

export interface CatalogTagGroup {
	id: string;
	/** `any`: a lock needs one of the selected tags (budget ranges); `all`: every selected tag (features). */
	match: 'any' | 'all';
	label: Text;
	tags: { id: string; label: Text }[];
}

/** Quick-pick tags above the catalogue grid (smart locks only). */
export const catalogTagGroups: CatalogTagGroup[] = [
	{
		id: 'budget',
		match: 'any',
		label: { ru: 'Бюджет', kk: 'Бюджет', en: 'Budget' },
		tags: [
			{ id: 'budget-low', label: { ru: 'До 100 000 ₸', kk: '100 000 ₸ дейін', en: 'Up to 100,000 ₸' } },
			{ id: 'budget-mid', label: { ru: 'От 100 000 до 180 000 ₸', kk: '100 000 – 180 000 ₸', en: '100,000–180,000 ₸' } },
			{ id: 'budget-high', label: { ru: 'От 180 000 ₸', kk: '180 000 ₸-ден бастап', en: 'From 180,000 ₸' } },
		],
	},
	{
		id: 'construction',
		match: 'any',
		label: { ru: 'Конструкция', kk: 'Құрылымы', en: 'Design' },
		tags: [
			{ id: 'construction-lever', label: { ru: 'С ручкой', kk: 'Тұтқасы бар', en: 'With handle' } },
			{ id: 'construction-none', label: { ru: 'Без ручки', kk: 'Тұтқасыз', en: 'Without handle' } },
		],
	},
	{
		id: 'function',
		match: 'all',
		label: { ru: 'Функции', kk: 'Функциялар', en: 'Features' },
		tags: [
			{ id: 'function-face', label: { ru: 'Face ID', kk: 'Face ID', en: 'Face ID' } },
			{ id: 'function-fingerprint', label: { ru: 'Отпечаток пальца', kk: 'Саусақ ізі', en: 'Fingerprint' } },
			{ id: 'function-palm', label: { ru: 'Вены ладони', kk: 'Алақан тамыры', en: 'Palm vein' } },
			{ id: 'function-pin', label: { ru: 'PIN-код', kk: 'PIN-код', en: 'PIN code' } },
			{ id: 'function-card', label: { ru: 'Карта / брелок', kk: 'Карта / брелок', en: 'Card / key fob' } },
			{ id: 'function-app', label: { ru: 'Управление через приложение', kk: 'Қосымша арқылы басқару', en: 'App control' } },
			{ id: 'function-wifi', label: { ru: 'Wi-Fi', kk: 'Wi-Fi', en: 'Wi-Fi' } },
			{ id: 'function-camera', label: { ru: 'Видеоглазок / камера', kk: 'Бейнекөз / камера', en: 'Video peephole / camera' } },
			{ id: 'function-motion', label: { ru: 'Датчик движения', kk: 'Қозғалыс датчигі', en: 'Motion sensor' } },
		],
	},
	{
		id: 'offer',
		match: 'all',
		label: { ru: 'Выгода', kk: 'Пайда', en: 'Offer' },
		tags: [{ id: 'offer-free-install', label: { ru: 'Бесплатная установка', kk: 'Тегін орнату', en: 'Free installation' } }],
	},
];

export const catalogTagCopy: Record<Lang, { title: string; reset: string }> = {
	ru: { title: 'Быстрый подбор', reset: 'Сбросить теги' },
	kk: { title: 'Жылдам таңдау', reset: 'Тегтерді тазарту' },
	en: { title: 'Quick pick', reset: 'Reset tags' },
};

type TagSource = Pick<
	LocalizedLock,
	'kind' | 'price' | 'construction' | 'access' | 'features' | 'giftInstallation'
>;

/** The tag ids a lock satisfies; stamped on its catalogue card. */
export function lockTagValues(lock: TagSource): string[] {
	if (lock.kind !== 'lock') return [];

	const has = (list: readonly string[], ...keys: string[]) => keys.some((key) => list.includes(key));
	const values: string[] = [];

	values.push(lock.price < 100_000 ? 'budget-low' : lock.price < 180_000 ? 'budget-mid' : 'budget-high');

	if (lock.construction === 'lever') values.push('construction-lever');
	if (lock.construction === 'none') values.push('construction-none');

	if (has(lock.access, 'face')) values.push('function-face');
	if (has(lock.access, 'fingerprint')) values.push('function-fingerprint');
	if (has(lock.access, 'palm', 'vein')) values.push('function-palm');
	if (has(lock.access, 'pin')) values.push('function-pin');
	if (has(lock.access, 'card', 'master-card')) values.push('function-card');
	if (has(lock.access, 'app')) values.push('function-app');
	if (has(lock.features, 'wifi')) values.push('function-wifi');
	if (has(lock.features, 'video-peephole', 'dual-camera', 'triple-camera')) values.push('function-camera');
	if (has(lock.features, 'pir', 'motion')) values.push('function-motion');

	if (lock.giftInstallation) values.push('offer-free-install');

	return values;
}
