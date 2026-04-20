export const languages = {
	ru: 'RU',
	kk: 'KZ',
	en: 'EN',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'ru';
export const langList = Object.keys(languages) as Lang[];

export const ui = {
	ru: {
		navCatalog: 'Каталог',
		navContact: 'Контакты',
		heroEyebrow: 'Безопасность Премиум Класса',
		heroTitleFirst: 'Безопасность',
		heroTitleAccent: 'Дороже',
		heroTitleLast: 'Золота',
		heroText:
			'Откройте для себя нашу коллекцию премиальных умных замков, сочетающих передовые технологии с вневременной элегантностью. Где безопасность встречается с изысканностью.',
		heroCatalog: 'Посмотреть каталог',
		heroContact: 'Связаться',
		catalogEyebrow: 'Наша Коллекция',
		catalogTitleFirst: 'Самые',
		catalogTitleAccent: 'Популярные',
		catalogTitleLast: 'экземпляры',
		backToCatalog: 'Назад в каталог',
		material: 'Материал',
		price: 'Стоимость',
		features: 'Особенности',
		otherModels: 'Другие модели',
		aboutModel: 'О модели',
		homeTitle: 'iLOCK - премиальные умные замки',
		homeDescription:
			'Каталог премиальных умных замков iLOCK с биометрией, видеосвязью и удаленным контролем доступа.',
	},
	kk: {
		navCatalog: 'Каталог',
		navContact: 'Байланыс',
		heroEyebrow: 'Премиум Класс Қауіпсіздігі',
		heroTitleFirst: 'Қауіпсіздік',
		heroTitleAccent: 'Алтыннан',
		heroTitleLast: 'Қымбат',
		heroText:
			'Заманауи технология мен уақыттан тыс талғамды біріктіретін премиум ақылды құлыптар топтамасын таңдаңыз. Қауіпсіздік пен әсемдік бір жерде тоғысады.',
		heroCatalog: 'Каталогты қарау',
		heroContact: 'Байланысу',
		catalogEyebrow: 'Біздің Топтама',
		catalogTitleFirst: 'Ең',
		catalogTitleAccent: 'Танымал',
		catalogTitleLast: 'үлгілер',
		backToCatalog: 'Каталогқа оралу',
		material: 'Материал',
		price: 'Бағасы',
		features: 'Ерекшеліктері',
		otherModels: 'Басқа модельдер',
		aboutModel: 'Модель туралы',
		homeTitle: 'iLOCK - премиум ақылды құлыптар',
		homeDescription:
			'iLOCK премиум ақылды құлыптар каталогы: биометрия, бейнебайланыс және қашықтан қол жеткізуді басқару.',
	},
	en: {
		navCatalog: 'Catalog',
		navContact: 'Contact',
		heroEyebrow: 'Premium Class Security',
		heroTitleFirst: 'Security',
		heroTitleAccent: 'Worth More',
		heroTitleLast: 'Than Gold',
		heroText:
			'Discover our collection of premium smart locks, pairing advanced technology with timeless elegance. Where security meets refinement.',
		heroCatalog: 'View catalog',
		heroContact: 'Contact us',
		catalogEyebrow: 'Our Collection',
		catalogTitleFirst: 'Most',
		catalogTitleAccent: 'Popular',
		catalogTitleLast: 'models',
		backToCatalog: 'Back to catalog',
		material: 'Material',
		price: 'Price',
		features: 'Features',
		otherModels: 'Other models',
		aboutModel: 'About the model',
		homeTitle: 'iLOCK - premium smart locks',
		homeDescription:
			'Catalog of premium iLOCK smart locks with biometrics, video calling, and remote access control.',
	},
} as const;

export function getLangFromUrl(url: URL): Lang {
	const [, maybeLang] = url.pathname.split('/');
	return langList.includes(maybeLang as Lang) ? (maybeLang as Lang) : defaultLang;
}

export function getLocalePath(lang: Lang, path = '/') {
	const cleanPath = path.startsWith('/') ? path : `/${path}`;
	return `/${lang}${cleanPath === '/' ? '/' : cleanPath}`;
}

export function getTranslatedPath(lang: Lang, currentPath: string) {
	const pathWithoutLocale = currentPath.replace(/^\/(ru|kk|en)(?=\/|$)/, '') || '/';
	return getLocalePath(lang, pathWithoutLocale);
}

export function localizeLock(lock: any, lang: Lang) {
	const translated = lang === defaultLang ? {} : lock.data.translations?.[lang] ?? {};

	return {
		...lock.data,
		...translated,
		id: lock.id,
		image: lock.data.image,
		model: lock.data.model,
		brand: lock.data.brand,
		order: lock.data.order,
	};
}
