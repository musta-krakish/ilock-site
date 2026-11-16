import type { Lang, LocalizedLock } from '../i18n';
import type { Dictionaries } from './dictionaries';

type Text = Record<Lang, string>;

export interface CatalogTag {
	id: string;
	label: Text;
	/** Popup behind an «i» button: bullet points and a closing line, per language. */
	info?: Record<Lang, { items: string[]; footer: string }>;
}

export interface CatalogTagGroup {
	id: string;
	/** `any`: a lock needs one of the selected tags (budget ranges); `all`: every selected tag (features). */
	match: 'any' | 'all';
	label: Text;
	tags: CatalogTag[];
}

const MANUAL = 'tag-';

/**
 * Quick-pick tags above the catalogue grid (smart locks only). Budgets come from the
 * Keystatic catalogue settings and hand-assigned tags (e.g. «Под ключ») from the tags
 * dictionary; the rest follow from each lock's specs.
 */
export function catalogTagGroups(dict: Pick<Dictionaries, 'budgets' | 'tags'>): CatalogTagGroup[] {
	const manual = (group: 'function' | 'construction' | 'offer'): CatalogTag[] =>
		dict.tags
			.filter((tag) => tag.group === group)
			.map((tag) => ({
				id: MANUAL + tag.id,
				label: { ru: tag.name, kk: tag.kk || tag.name, en: tag.en || tag.name },
				info: tag.info?.ru?.items
					? (Object.fromEntries(
							(['ru', 'kk', 'en'] as const).map((lang) => {
								const info = tag.info?.[lang]?.items ? tag.info[lang]! : tag.info!.ru!;
								const items = (info.items ?? '').split('\n').map((line: string) => line.trim()).filter(Boolean);
								return [lang, { items, footer: info.footer ?? '' }];
							}),
						) as CatalogTag['info'])
					: undefined,
			}));

	return [
		{
			id: 'budget',
			match: 'any',
			label: { ru: 'Бюджет', kk: 'Бюджет', en: 'Budget' },
			tags: dict.budgets.map((budget, i) => ({
				id: `budget-${i}`,
				label: { ru: budget.ru, kk: budget.kk, en: budget.en },
			})),
		},
		{
			id: 'construction',
			match: 'any',
			label: { ru: 'Конструкция', kk: 'Құрылымы', en: 'Design' },
			tags: [
				{ id: 'construction-lever', label: { ru: 'С ручкой', kk: 'Тұтқасы бар', en: 'With handle' } },
				{ id: 'construction-none', label: { ru: 'Без ручки', kk: 'Тұтқасыз', en: 'Without handle' } },
				...manual('construction'),
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
				...manual('function'),
			],
		},
		{
			id: 'offer',
			match: 'all',
			label: { ru: 'Выгода', kk: 'Пайда', en: 'Offer' },
			tags: [
				...manual('offer'),
				{ id: 'offer-free-install', label: { ru: 'Бесплатная установка', kk: 'Тегін орнату', en: 'Free installation' } },
			],
		},
	];
}

export const catalogTagCopy: Record<Lang, { title: string; reset: string; info: string; close: string }> = {
	ru: { title: 'Быстрый подбор', reset: 'Сбросить теги', info: 'Подробнее', close: 'Закрыть' },
	kk: { title: 'Жылдам таңдау', reset: 'Тегтерді тазарту', info: 'Толығырақ', close: 'Жабу' },
	en: { title: 'Quick pick', reset: 'Reset tags', info: 'Details', close: 'Close' },
};

type TagSource = Pick<
	LocalizedLock,
	'kind' | 'price' | 'construction' | 'access' | 'features' | 'giftInstallation' | 'tags'
>;

/** The tag ids a lock satisfies; stamped on its catalogue card. */
export function lockTagValues(lock: TagSource, dict: Pick<Dictionaries, 'budgets'>): string[] {
	if (lock.kind !== 'lock') return [];

	const has = (list: readonly string[], ...keys: string[]) => keys.some((key) => list.includes(key));
	const values: string[] = [];

	// Budget ranges may overlap («до 100 000» and «до 150 000»): a lock gets every one it fits.
	dict.budgets.forEach((budget, i) => {
		if ((budget.min == null || lock.price >= budget.min) && (budget.max == null || lock.price <= budget.max)) {
			values.push(`budget-${i}`);
		}
	});

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
	values.push(...lock.tags.map((tag) => MANUAL + tag));

	return values;
}
