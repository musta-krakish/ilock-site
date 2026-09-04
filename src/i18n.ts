import type { CollectionEntry } from 'astro:content';

export const languages = {
	ru: 'RU',
	kk: 'KZ',
	en: 'EN',
} as const;

export type Lang = keyof typeof languages;

/**
 * hreflang values for `<link rel="alternate">`. Region-qualified for the two languages the
 * store actually sells in, so the pages target Kazakhstan rather than every ru/kk speaker.
 * Must stay in sync with the `i18n.locales` map in `astro.config.mjs`, which the sitemap uses.
 */
export const hreflangCodes: Record<Lang, string> = {
	ru: 'ru-KZ',
	kk: 'kk-KZ',
	en: 'en',
};

export const defaultLang: Lang = 'ru';
export const langList = Object.keys(languages) as Lang[];

/** Brand groups in the order required by the brief: iLock first, then Philips, then the rest. */
export const brandOrder = ['ilock', 'philips', 'smartlock', 'safes', 'tiger'] as const;
export type Brand = (typeof brandOrder)[number];

export const brandNames: Record<Brand, string> = {
	ilock: 'iLock',
	philips: 'Philips',
	smartlock: 'Smartlock',
	safes: 'Philips Safe',
	tiger: 'Tiger',
};

export const ui = {
	ru: {
		nav: { catalog: 'Каталог', about: 'О компании', contact: 'Контакты', faq: 'Частые вопросы', installDelivery: 'Установка и доставка', order: 'Оставить заявку' },
		hero: {
			eyebrow: 'Официальный представитель Philips в Казахстане',
			title: 'Умные замки iLock',
			tagline: 'для вашего дома',
			text: 'Распознавание лица и отпечатка пальца, надёжная защита от взлома и автономная работа без электросети. Установим на любую дверь — доставка и установка до дома.',
			catalog: 'Смотреть каталог',
			contact: 'Оставить заявку',
			choice: 'Выбор страны',
			years: 'лет на рынке',
			branches: 'филиала по Казахстану',
			warranty: 'года гарантии',
		},
		about: {
			eyebrow: 'Почему iLOCK',
			title: 'Почему нас',
			titleAccent: 'выбирают',
			items: [
				{ t: 'Рассрочка и Kaspi Red', d: 'Оформите заказ удобным для вас способом — без переплат.' },
				{ t: 'Официальные представители Philips', d: 'Гарантия производителя на все замки.' },
				{ t: 'Гарантия до 24 месяцев', d: 'На всю линейку iLock и Philips — два года.' },
				{ t: 'Работаем по всему Казахстану', d: '2 филиала и доставка в любой город.' },
				{ t: 'Вся продукция сертифицирована', d: 'Официальные документы на каждый замок.' },
			],
		},
		app: {
			eyebrow: 'Управление со смартфона',
			title: 'Ваш дом —',
			titleAccent: 'в кармане',
			text: 'Замки управляются через приложение Tuya Smart, а часть моделей — через фирменные приложения производителя. Открывайте дверь, создавайте коды доступа, добавляйте отпечатки и получайте уведомление о каждом входе — прямо со смартфона.',
			note: 'Нужное приложение подберём и настроим бесплатно при установке.',
			appsLabel: 'Работает с приложениями',
			apps: ['Tuya Smart', 'Smart Life', 'фирменные приложения'],
			door: 'Входная дверь',
			status: 'Заперто',
			unlock: 'Открыть',
			battery: 'Заряд 86%',
			logLabel: 'Последние события',
			log: [
				{ who: 'Отпечаток пальца', time: '08:42' },
				{ who: 'PIN-код', time: 'Вчера, 21:15' },
			],
			codesTitle: 'Коды доступа',
			addCode: 'Новый код',
			codes: [
				{ name: 'Семья', sub: 'Постоянный доступ' },
				{ name: 'Гости', sub: 'Пн–Пт · 09:00–18:00' },
				{ name: 'Уборка', sub: 'Одноразовый код' },
			],
			alertsTitle: 'Уведомления',
			alerts: [
				{ who: 'Дверь открыта', via: 'Отпечаток пальца', time: '08:42' },
				{ who: 'Новый код добавлен', via: 'Гости', time: '07:15' },
				{ who: 'Попытка входа', via: 'Неверный PIN', time: 'Вчера' },
			],
		},
		faq: {
			eyebrow: 'FAQ',
			title: 'Частые',
			titleAccent: 'вопросы',
			pageTitle: 'Частые вопросы',
			pageDescription: 'Ответы на частые вопросы об умных замках iLOCK: установка, совместимость с дверью, батарея, Wi-Fi, безопасность, доступ и гарантия.',
		},
		installDelivery: {
			eyebrow: 'Сервис',
			title: 'Установка и',
			titleAccent: 'доставка',
			pageTitle: 'Установка и доставка',
			pageDescription: 'Профессиональная установка электронных замков iLOCK: монтаж, настройка функций, проверка работы и обучение использованию.',
			sections: [
				{
					title: 'Установка',
					text: 'Мы не просто доставляем электронный замок — мы обеспечиваем его профессиональную установку. После покупки к вам выезжает наш специалист, который:',
					items: [
						'Аккуратно установит электронный замок на дверь',
						'Настроит все необходимые функции',
						'Проверит корректность работы замка',
						'Подробно объяснит, как пользоваться замком и всеми доступными способами открытия',
					],
				},
				{
					title: 'Доставка',
					text: 'Доставляем замки и сейфы по Казахстану. В Астане и Алматы можно обратиться в филиал, а по другим городам подскажем удобный способ получения.',
					items: ['Филиалы в Астане и Алматы', 'Доставка по Казахстану', 'Консультация перед отправкой'],
				},
			],
		},
		catalog: {
			eyebrow: 'Каталог',
			title: 'Умные замки',
			titleAccent: 'в наличии',
			text: 'Цены указаны с учётом доставки по Астане. Рассрочка от Kaspi доступна на любую модель.',
			all: 'Все',
			categories: 'Категории товаров',
			smartLocks: 'Умные замки',
			safes: 'Сейфы',
			accessories: 'Прочее',
			accessory: 'Аксессуар',
			from: 'от',
			featured: 'Хит продаж',
			soon: 'Скоро в продаже',
			kazakhBrand: 'Бренд',
			details: 'Подробнее',
			empty: 'В этой категории пока нет моделей.',
		},
		catalogFilters: {
			title: 'Фильтры',
			reset: 'Сбросить',
			search: 'Поиск по названию',
			searchPlaceholder: 'Поиск по модели или бренду',
			groups: [
				{
					title: 'Цвет',
					options: [
						{ value: 'color-gray', label: 'Серый' },
						{ value: 'color-black', label: 'Чёрный' },
						{ value: 'color-bronze', label: 'Бронза' },
						{ value: 'color-gold', label: 'Золотой' },
					],
				},
				{
					title: 'Способ открытия',
					options: [
						{ value: 'access-face', label: 'Face ID' },
						{ value: 'access-palm', label: 'Распознавание вен ладони' },
					],
				},
				{
					title: 'Подключение и управление',
					options: [
						{ value: 'connection-wifi', label: 'Wi-Fi' },
						{ value: 'connection-bluetooth', label: 'Bluetooth' },
					],
				},
				{
					title: 'Тип ручки',
					options: [
						{ value: 'handle-classic', label: 'Классическая ручка' },
						{ value: 'handle-modern', label: 'Современная ручка' },
					],
				},
				{
					title: 'Механизм',
					options: [
						{ value: 'mechanism-auto', label: 'Автоматический' },
						{ value: 'mechanism-semi', label: 'Полуавтоматический' },
						{ value: 'mechanism-ordinary', label: 'Обычный' },
					],
				},
			],
		},
		lead: {
			eyebrow: 'Заявка',
			title: 'Оставьте заявку',
			text: 'Перезвоним, ответим на вопросы и подберём замок под вашу дверь.',
			name: 'Имя',
			namePh: 'Как к вам обращаться',
			phone: 'Телефон',
			model: 'Интересует модель',
			modelAny: 'Ещё не выбрал — нужна консультация',
			comment: 'Комментарий',
			commentPh: 'Тип двери, город, удобное время звонка',
			submit: 'Отправить в WhatsApp',
			note: 'Нажимая кнопку, вы соглашаетесь на обработку персональных данных. Форма откроет WhatsApp с готовым сообщением.',
			errName: 'Укажите имя',
			errPhone: 'Укажите телефон — минимум 10 цифр',
			msgIntro: 'Здравствуйте! Заявка с сайта iLOCK.',
			msgName: 'Имя',
			msgPhone: 'Телефон',
			msgModel: 'Модель',
			msgComment: 'Комментарий',
		},
		contact: {
			eyebrow: 'Контакты',
			title: 'Свяжитесь с нами',
			phone: 'Телефон',
			email: 'Почта',
			address: 'Адрес',
			branches: 'Филиалы',
			floor: 'Этаж',
			hours: 'График работы',
			weekdays: 'Пн–Пт',
				weekend: 'Сб–Вс',
				whatsapp: 'Написать в WhatsApp',
				instagram: 'Мы в Instagram',
				youtube: 'Наш YouTube',
				whatsappHello: 'Здравствуйте! Пишу с сайта iLOCK — хочу проконсультироваться по умным замкам.',
			},
		product: {
			back: 'Назад в каталог',
			specs: 'Технические характеристики',
			access: 'Способы разблокировки',
			features: 'Особенности замка',
			safeFeatures: 'Особенности сейфа',
			accessoryFeatures: 'Особенности товара',
			about: 'О модели',
			order: 'Заказать',
			ask: 'Спросить в WhatsApp',
			others: 'Другие модели',
			related: 'Похожие модели',
			askMsg: (t: string) => `Здравствуйте! Интересует замок ${t} с сайта iLOCK.`,
			orderMsg: (t: string, kind = 'lock') =>
				`Здравствуйте! Хочу заказать ${kind === 'safe' ? 'сейф' : kind === 'accessory' ? 'данный аксессуар' : 'данный замок'} ${t}.`,
			kaspiWord: 'Рассрочка',
			kaspiTerm: (m: string) => `${m} × 12 мес`,
			variants: 'Варианты',
			variantModel: 'Модель',
			variantPrice: 'Цена',
			variantDimensions: 'Размеры',
			variantWeight: 'Вес',
			rows: {
				material: 'Корпус',
				access: 'Методы доступа',
				temp: 'Температурный режим',
				power: 'Питание',
				battery: 'Работа без подзарядки',
				app: 'Приложение',
				compatibility: 'Совместимость',
				included: 'Комплектация',
				brand: 'Бренд / Гарантия',
				origin: 'Страна',
				iface: 'Язык интерфейса',
				colors: 'Цвет корпуса',
			},
			years: (n: number) => `${n} ${n === 1 ? 'год' : 'года'}`,
			months: (v: string) => `до ${v} месяцев`,
			upTo: 'до',
			pcs: 'шт',
			// The model number alone ("DDL 7300") is not a phrase anyone searches for, so the
			// H1 and the image alt carry the category and the brand around it.
			h1: (brand: string, title: string, kind = 'lock') =>
				kind === 'safe' ? `Сейф ${brand} ${title}` : kind === 'accessory' ? `Аксессуар ${brand} ${title}` : `Умный замок ${brand} ${title}`,
			imgAlt: (brand: string, title: string, kind = 'lock') =>
				kind === 'safe' ? `Сейф ${brand} ${title}` : kind === 'accessory' ? `Аксессуар ${brand} ${title}` : `Умный замок ${brand} ${title}`,
			// Appended to the per-model description until the snippet limit is reached.
			metaParts: (price: string, warranty: string) => [
				price,
				`гарантия ${warranty}`,
				'рассрочка Kaspi',
				'доставка по Казахстану',
			],
		},
		footer: {
			rights: 'Все права защищены',
			made: 'Официальный представитель Philips в Казахстане',
			brands: 'Бренды',
			catalogPdf: 'PDF-каталог',
		},
		featured: {
			eyebrow: 'Витрина',
			title: 'Популярные',
			titleAccent: 'модели',
			text: 'Установим без повреждения ваших дверей. Доставка по всему Казахстану. Рассрочка через Kaspi.',
			all: (n: number) => `Смотреть весь каталог — ${n} моделей`,
		},
		catalogPage: {
			h1: 'Каталог умных замков и сейфов',
			lead: 'Установим без повреждения ваших дверей. Доставка по всему Казахстану. Рассрочка через Kaspi.',
			seoTitle: 'Каталог умных замков и сейфов — купить в Казахстане | iLOCK',
			seoDescription:
				'Каталог умных замков и сейфов в Казахстане: iLock, Philips, Smartlock и Philips Safe. Face ID, отпечаток пальца, Wi-Fi, биометрические сейфы. Гарантия до 2 лет, рассрочка Kaspi.',
		},
		brandPage: {
			eyebrow: 'Каталог',
			models: (n: number) => `${n} ${n % 10 === 1 && n % 100 !== 11 ? 'модель' : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 'модели' : 'моделей'}`,
			priceRange: 'Цены',
			allBrands: 'Все товары',
			ilock: {
				h1: 'Умные замки iLock',
					lead: 'Бренд iLock — собственная линейка замков с распознаванием лица и вен ладони, видеоглазком и полностью автоматическим механизмом. Гарантия 2 года, обслуживание бесплатное.',
				seoTitle: 'Умные замки iLock — купить в Казахстане | iLOCK',
				seoDescription:
						'Умные замки бренда iLock: iL-8 и S90 с Face ID, распознаванием вен ладони, видеоглазком и Wi-Fi. Гарантия 2 года, рассрочка от Kaspi, доставка по Казахстану.',
			},
			philips: {
				h1: 'Умные замки Philips',
				lead: 'Мы — официальный представитель Philips Smart Lock в Казахстане: прямые поставки, оригинальная гарантия производителя 2 года и бесплатное обслуживание. От базового DDL 608 до флагмана 902 MVP с тремя камерами.',
				seoTitle: 'Умные замки Philips — официальный представитель в Казахстане | iLOCK',
				seoDescription:
					'Умные замки Philips в Казахстане от официального представителя: DDL 603E, DDL 610, DDL 7300, Alpha, 702 FVP, 709 FVP, 902 MVP. Оригинальная гарантия 2 года, рассрочка от Kaspi.',
			},
			smartlock: {
				h1: 'Умные замки Smartlock',
				lead: 'Доступная линейка Smartlock: врезные замки, замки для стеклянных и узкопрофильных дверей, гостиничные карточные замки, замки для шкафчиков и навесные замки с отпечатком пальца.',
				seoTitle: 'Умные замки Smartlock — купить в Казахстане | iLOCK',
				seoDescription:
					'Замки Smartlock в Казахстане: от 15 000 ₸. Биометрия, пин-код и карта, модели для стеклянных и узкопрофильных дверей, гостиниц, шкафчиков и навесные замки.',
			},
			safes: {
				h1: 'Сейфы Philips',
				lead: 'Линейка Philips Smart Safe: компактные мебельные сейфы, офисные модели и премиальные Valis с биометрией, пин-кодом, аварийным сигналом и гарантией 2 года.',
				seoTitle: 'Сейфы Philips — купить в Казахстане | iLOCK',
				seoDescription:
					'Сейфы Philips Smart Safe в Казахстане: SBX102, SBX202, SBX601, SBX602, SBX701, SBX702 и SBX703 Valis. Биометрия, пин-код, гарантия 2 года, рассрочка Kaspi.',
			},
			tiger: {
				h1: 'Сейфы Tiger',
				lead: 'Оружейные сейфы Tiger для хранения с обязательным креплением к стене, электронным доступом и прочным стальным корпусом.',
				seoTitle: 'Оружейные сейфы Tiger — купить в Казахстане | iLOCK',
				seoDescription:
					'Оружейный сейф Tiger AK1 132W в Казахстане: 132×54×39 см, обязательное крепление к стене, цена 420 000 ₸.',
			},
		},
		homeTitle: 'iLOCK — умные замки Philips и iLock в Казахстане',
		homeDescription:
			'Официальный представитель Philips Smart Lock в Казахстане. Умные замки iLock и Philips с Face ID, отпечатком и Wi-Fi. Гарантия до 2 лет, рассрочка от Kaspi, 2 филиала.',
		specs: {
			material: {
				aluminum: 'Алюминиевый сплав',
				'aluminum-glass': 'Алюминиевый сплав + закалённое стекло',
				zinc: 'Цинковый сплав',
				'zinc-glass': 'Цинковый сплав + закалённое стекло',
				steel: 'Нержавеющая сталь',
				'low-carbon-steel': 'Низкоуглеродистый сплав',
			},
			access: {
				fingerprint: 'Отпечаток пальца',
				pin: 'Пин-код',
				face: 'Распознавание лица',
				palm: 'Вены ладони',
				card: 'Карта-брелок',
				key: 'Механический ключ',
				app: 'Приложение',
				'master-card': 'Мастер-карта',
				vein: 'Распознавание вен на руке',
			},
			feature: {
				wifi: 'Wi-Fi подключение',
				bluetooth: 'Bluetooth подключение',
				doorbell: 'Дверной звонок',
				'video-peephole': 'Видеоглазок',
				'two-way-audio': 'Двусторонняя аудиосвязь',
				'dual-camera': 'Двусторонняя камера',
				'triple-camera': 'Трёхсторонняя камера',
				'voice-change': 'Изменение голоса по видеосвязи',
				'voice-ru-kk': 'Озвучка на русском и казахском',
				realtime: 'Мониторинг в реальном времени',
				pir: 'PIR-датчик приближения',
				motion: 'Датчик движения',
				'door-sensor': 'Датчик закрытия двери',
				'night-watch': 'Ночной часовой',
				auto: 'Полностью автоматический',
				'semi-auto': 'Полуавтоматический',
				'auto-lock': 'Автоматическая блокировка',
				'push-pull': 'Режим толкни/потяни',
				rechargeable: 'Перезаряжаемый аккумулятор',
				'wireless-charge': 'Беспроводная подзарядка',
				'emergency-charge': 'Аварийная зарядка',
				'low-battery': 'Уведомление о низком заряде',
				'tamper-alarm': 'Сигнализация о вскрытии',
				'double-check': 'Режим двойной проверки',
				'c-cylinder': 'Цилиндр С-класса',
				mute: 'Отключение звука',
				'anti-pry': 'Защита от взлома и демонтажа',
				ip67: 'Защита от пыли и воды IP67',
				waterproof: 'Влагостойкость',
				'slim-door': 'Для узкопрофильных дверей',
				'glass-door': 'Для стеклянных дверей',
				software: 'Общая программа для замков',
				programmer: 'Программатор в комплекте',
				'solid-body': 'Цельный корпус',
				alarm: 'Аварийный сигнал',
				'storage-sections': 'Отдельные секции для хранения',
				'hidden-compartment': 'Скрытый отсек',
				'dual-check': 'Режим двойной проверки',
				'wall-mount': 'Обязательное крепление к стене',
			},
			power: {
				aa4: 'Батарейки AA (х4)',
				'li-4200': 'Литиевый аккумулятор 4200 мАч',
				'li-5000': 'Литий-полимерный аккумулятор 5000 мАч',
				'li-ion': 'Литий-ионный аккумулятор',
				li: 'Литиевый аккумулятор',
			},
			color: {
				black: 'чёрный',
				'matte-black': 'чёрный матовый',
				charcoal: 'угольно-чёрный',
				obsidian: 'чёрный обсидиан',
				gold: 'золотой',
				silver: 'серебристый',
				copper: 'медный',
				bronze: 'медно-бронзовый',
				titanium: 'титаново-серый',
				coffee: 'кофейный',
				gray: 'серый',
				white: 'белый',
			},
			iface: { ru: 'русский', kk: 'казахский', en: 'английский', zh: 'китайский' },
		},
	},

	kk: {
		nav: { catalog: 'Каталог', about: 'Компания туралы', contact: 'Байланыс', faq: 'Жиі сұрақтар', installDelivery: 'Орнату және жеткізу', order: 'Өтінім қалдыру' },
		hero: {
			eyebrow: 'Қазақстандағы Philips ресми өкілі',
			title: 'iLock ақылды құлыптары',
			tagline: 'сіздің үйіңізге',
			text: 'Бет пен саусақ ізін тану, бұзудан сенімді қорғаныс және электр желісінсіз автономды жұмыс. Кез келген есікке орнатамыз — үйге дейін жеткізу және орнату.',
			catalog: 'Каталогты қарау',
			contact: 'Өтінім қалдыру',
			choice: 'Ел таңдауы',
			years: 'жыл нарықта',
			branches: 'филиал Қазақстанда',
			warranty: 'жыл кепілдік',
		},
		about: {
			eyebrow: 'Неге iLOCK',
			title: 'Бізді неге',
			titleAccent: 'таңдайды',
			items: [
				{ t: 'Бөліп төлеу және Kaspi Red', d: 'Тапсырысты өзіңізге ыңғайлы тәсілмен рәсімдеңіз — артық төлемсіз.' },
				{ t: 'Philips ресми өкілі', d: 'Барлық құлыптарға өндіруші кепілдігі.' },
				{ t: '24 айға дейін кепілдік', d: 'Барлық iLock және Philips желісіне — екі жыл.' },
				{ t: 'Қазақстан бойынша жұмыс', d: '2 филиал және кез келген қалаға жеткізу.' },
				{ t: 'Барлық өнім сертификатталған', d: 'Әр құлыпқа ресми құжаттар.' },
			],
		},
		app: {
			eyebrow: 'Смартфоннан басқару',
			title: 'Үйіңіз —',
			titleAccent: 'қалтаңызда',
			text: 'Құлыптар Tuya Smart қосымшасы арқылы, кейбір модельдер өндірушінің фирмалық қосымшалары арқылы басқарылады. Есікті ашыңыз, кіру кодтарын жасаңыз, саусақ іздерін қосыңыз және әр кіру туралы хабарлама алыңыз — смартфоннан.',
			note: 'Қажет қосымшаны орнату кезінде тегін таңдап, баптап береміз.',
			appsLabel: 'Қосымшалармен жұмыс істейді',
			apps: ['Tuya Smart', 'Smart Life', 'фирмалық қосымшалар'],
			door: 'Кіреберіс есік',
			status: 'Жабық',
			unlock: 'Ашу',
			battery: 'Заряд 86%',
			logLabel: 'Соңғы оқиғалар',
			log: [
				{ who: 'Саусақ ізі', time: '08:42' },
				{ who: 'PIN-код', time: 'Кеше, 21:15' },
			],
			codesTitle: 'Кіру кодтары',
			addCode: 'Жаңа код',
			codes: [
				{ name: 'Отбасы', sub: 'Тұрақты рұқсат' },
				{ name: 'Қонақтар', sub: 'Дс–Жм · 09:00–18:00' },
				{ name: 'Тазалық', sub: 'Бір реттік код' },
			],
			alertsTitle: 'Хабарламалар',
			alerts: [
				{ who: 'Есік ашылды', via: 'Саусақ ізі', time: '08:42' },
				{ who: 'Жаңа код қосылды', via: 'Қонақтар', time: '07:15' },
				{ who: 'Кіру әрекеті', via: 'Қате PIN', time: 'Кеше' },
			],
		},
		faq: {
			eyebrow: 'FAQ',
			title: 'Жиі қойылатын',
			titleAccent: 'сұрақтар',
			pageTitle: 'Жиі қойылатын сұрақтар',
			pageDescription: 'iLOCK ақылды құлыптары туралы жиі қойылатын сұрақтарға жауаптар: орнату, есікпен үйлесімділік, батарея, Wi-Fi, қауіпсіздік, рұқсат және кепілдік.',
		},
		installDelivery: {
			eyebrow: 'Сервис',
			title: 'Орнату және',
			titleAccent: 'жеткізу',
			pageTitle: 'Орнату және жеткізу',
			pageDescription: 'iLOCK электронды құлыптарын кәсіби орнату: монтаж, функцияларды баптау, жұмысты тексеру және қолдануды түсіндіру.',
			sections: [
				{
					title: 'Орнату',
					text: 'Біз электронды құлыпты жай ғана жеткізбейміз — оның кәсіби орнатылуын қамтамасыз етеміз. Сатып алғаннан кейін сізге біздің маман барады, ол:',
					items: [
						'Электронды құлыпты есікке ұқыпты орнатады',
						'Барлық қажетті функцияларды баптайды',
						'Құлыптың дұрыс жұмыс істейтінін тексереді',
						'Құлыпты және барлық қолжетімді ашу тәсілдерін қалай қолдану керегін толық түсіндіреді',
					],
				},
				{
					title: 'Жеткізу',
					text: 'Құлыптар мен сейфтерді Қазақстан бойынша жеткіземіз. Астана мен Алматыда филиалға келуге болады, басқа қалаларға ыңғайлы алу тәсілін ұсынамыз.',
					items: ['Астана және Алматы филиалдары', 'Қазақстан бойынша жеткізу', 'Жіберер алдында кеңес беру'],
				},
			],
		},
		catalog: {
			eyebrow: 'Каталог',
			title: 'Ақылды құлыптар',
			titleAccent: 'қоймада бар',
			text: 'Бағалар Астана бойынша жеткізуді есепке алады. Kaspi бөліп төлеу кез келген модельге қолжетімді.',
			all: 'Барлығы',
			categories: 'Тауар санаттары',
			smartLocks: 'Ақылды құлыптар',
			safes: 'Сейфтер',
			accessories: 'Басқа',
			accessory: 'Аксессуар',
			from: 'бастап',
			featured: 'Хит',
			soon: 'Жақында сатылымда',
			kazakhBrand: 'Бренд',
			details: 'Толығырақ',
			empty: 'Бұл санатта әзірге модель жоқ.',
		},
		catalogFilters: {
			title: 'Сүзгілер',
			reset: 'Тазарту',
			search: 'Атауы бойынша іздеу',
			searchPlaceholder: 'Модель немесе бренд бойынша іздеу',
			groups: [
				{
					title: 'Түс',
					options: [
						{ value: 'color-gray', label: 'Сұр' },
						{ value: 'color-black', label: 'Қара' },
						{ value: 'color-bronze', label: 'Қола' },
						{ value: 'color-gold', label: 'Алтын' },
					],
				},
				{
					title: 'Ашу тәсілі',
					options: [
						{ value: 'access-face', label: 'Face ID' },
						{ value: 'access-palm', label: 'Алақан тамырын тану' },
					],
				},
				{
					title: 'Қосылу және басқару',
					options: [
						{ value: 'connection-wifi', label: 'Wi-Fi' },
						{ value: 'connection-bluetooth', label: 'Bluetooth' },
					],
				},
				{
					title: 'Тұтқа түрі',
					options: [
						{ value: 'handle-classic', label: 'Классикалық тұтқа' },
						{ value: 'handle-modern', label: 'Заманауи тұтқа' },
					],
				},
				{
					title: 'Механизм',
					options: [
						{ value: 'mechanism-auto', label: 'Автоматты' },
						{ value: 'mechanism-semi', label: 'Жартылай автоматты' },
						{ value: 'mechanism-ordinary', label: 'Кәдімгі' },
					],
				},
			],
		},
		lead: {
			eyebrow: 'Өтінім',
			title: 'Өтінім қалдырыңыз',
			text: 'Қайта қоңырау шаламыз, сұрақтарға жауап беріп, есігіңізге құлып таңдаймыз.',
			name: 'Аты',
			namePh: 'Сізге қалай жүгінейік',
			phone: 'Телефон',
			model: 'Қызықтыратын модель',
			modelAny: 'Әлі таңдаған жоқпын — кеңес керек',
			comment: 'Пікір',
			commentPh: 'Есік түрі, қала, қоңырау шалуға ыңғайлы уақыт',
			submit: 'WhatsApp-қа жіберу',
			note: 'Түймені басу арқылы дербес деректерді өңдеуге келісім бересіз. Форма дайын хабарламамен WhatsApp ашады.',
			errName: 'Атыңызды көрсетіңіз',
			errPhone: 'Телефонды көрсетіңіз — кемінде 10 сан',
			msgIntro: 'Сәлеметсіз бе! iLOCK сайтынан өтінім.',
			msgName: 'Аты',
			msgPhone: 'Телефон',
			msgModel: 'Модель',
			msgComment: 'Пікір',
		},
		contact: {
			eyebrow: 'Байланыс',
			title: 'Бізбен байланысыңыз',
			phone: 'Телефон',
			email: 'Пошта',
			address: 'Мекенжай',
			branches: 'Филиалдар',
			floor: 'Қабат',
			hours: 'Жұмыс кестесі',
			weekdays: 'Дс–Жм',
				weekend: 'Сб–Жс',
				whatsapp: 'WhatsApp-қа жазу',
				instagram: 'Instagram-да біз',
				youtube: 'Біздің YouTube',
				whatsappHello: 'Сәлеметсіз бе! iLOCK сайтынан жазып отырмын — ақылды құлыптар бойынша кеңес алғым келеді.',
			},
		product: {
			back: 'Каталогқа оралу',
			specs: 'Техникалық сипаттамалар',
			access: 'Ашу тәсілдері',
			features: 'Құлып ерекшеліктері',
			safeFeatures: 'Сейф ерекшеліктері',
			accessoryFeatures: 'Тауардың ерекшеліктері',
			about: 'Модель туралы',
			order: 'Тапсырыс беру',
			ask: 'WhatsApp-та сұрау',
			others: 'Басқа модельдер',
			related: 'Ұқсас модельдер',
			askMsg: (t: string) => `Сәлеметсіз бе! iLOCK сайтындағы ${t} құлыбы қызықтырады.`,
			orderMsg: (t: string, kind = 'lock') =>
				`Сәлеметсіз бе! Осы ${t} ${kind === 'safe' ? 'сейфіне' : kind === 'accessory' ? 'аксессуарына' : 'құлпына'} тапсырыс бергім келеді.`,
			kaspiWord: 'Бөліп төлеу',
			kaspiTerm: (m: string) => `${m} × 12 ай`,
			variants: 'Нұсқалар',
			variantModel: 'Модель',
			variantPrice: 'Баға',
			variantDimensions: 'Өлшемдері',
			variantWeight: 'Салмағы',
			rows: {
				material: 'Корпус',
				access: 'Қол жеткізу әдістері',
				temp: 'Температуралық режим',
				power: 'Қуат көзі',
				battery: 'Зарядсыз жұмыс',
				app: 'Қосымша',
				compatibility: 'Үйлесімділік',
				included: 'Жинақтама',
				brand: 'Бренд / Кепілдік',
				origin: 'Елі',
				iface: 'Интерфейс тілі',
				colors: 'Корпус түсі',
			},
			years: (n: number) => `${n} жыл`,
			months: (v: string) => `${v} айға дейін`,
			upTo: 'дейін',
			pcs: 'дана',
			h1: (brand: string, title: string, kind = 'lock') =>
				kind === 'safe' ? `${brand} ${title} сейфі` : kind === 'accessory' ? `${brand} ${title} аксессуары` : `${brand} ${title} ақылды құлпы`,
			imgAlt: (brand: string, title: string, kind = 'lock') =>
				kind === 'safe' ? `${brand} ${title} сейфі` : kind === 'accessory' ? `${brand} ${title} аксессуары` : `${brand} ${title} ақылды құлпы`,
			metaParts: (price: string, warranty: string) => [
				price,
				`кепілдік ${warranty}`,
				'Kaspi бөліп төлеу',
				'Қазақстан бойынша жеткізу',
			],
		},
		footer: {
			rights: 'Барлық құқықтар қорғалған',
			made: 'Қазақстандағы Philips ресми өкілі',
			brands: 'Брендтер',
			catalogPdf: 'PDF-каталог',
		},
		featured: {
			eyebrow: 'Витрина',
			title: 'Танымал',
			titleAccent: 'модельдер',
			text: 'Есігіңізді зақымдамай орнатамыз. Қазақстан бойынша жеткізу. Kaspi арқылы бөліп төлеу.',
			all: (n: number) => `Толық каталогты қарау — ${n} модель`,
		},
		catalogPage: {
			h1: 'Ақылды құлыптар мен сейфтер каталогы',
			lead: 'Есігіңізді зақымдамай орнатамыз. Қазақстан бойынша жеткізу. Kaspi арқылы бөліп төлеу.',
			seoTitle: 'Ақылды құлыптар мен сейфтер каталогы — Қазақстанда сатып алу | iLOCK',
			seoDescription:
				'Қазақстандағы ақылды құлыптар мен сейфтер каталогы: iLock, Philips, Smartlock және Philips Safe. Face ID, саусақ ізі, Wi-Fi, биометриялық сейфтер. 2 жылға дейін кепілдік, Kaspi бөліп төлеу.',
		},
		brandPage: {
			eyebrow: 'Каталог',
			models: (n: number) => `${n} модель`,
			priceRange: 'Бағалар',
			allBrands: 'Барлық тауарлар',
			ilock: {
				h1: 'iLock ақылды құлыптары',
					lead: 'iLock бренді: бет пен алақан тамырын тану, бейнекөзше және толық автоматты механизм. Кепілдік 2 жыл, қызмет көрсету тегін.',
				seoTitle: 'iLock ақылды құлыптары — Қазақстанда сатып алу | iLOCK',
				seoDescription:
						'iLock брендінің ақылды құлыптары: Face ID, алақан тамырын тану, бейнекөзше және Wi-Fi бар iL-8 және S90. Кепілдік 2 жыл, Kaspi бөліп төлеу.',
			},
			philips: {
				h1: 'Philips ақылды құлыптары',
				lead: 'Біз — Қазақстандағы Philips Smart Lock ресми өкілі: тікелей жеткізу, өндірушінің 2 жылдық түпнұсқа кепілдігі және тегін қызмет көрсету. Базалық DDL 608-ден үш камералы 902 MVP флагманына дейін.',
				seoTitle: 'Philips ақылды құлыптары — Қазақстандағы ресми өкіл | iLOCK',
				seoDescription:
					'Қазақстанда ресми өкілден Philips ақылды құлыптары: DDL 603E, DDL 610, DDL 7300, Alpha, 702 FVP, 709 FVP, 902 MVP. Түпнұсқа 2 жылдық кепілдік, Kaspi бөліп төлеу.',
			},
			smartlock: {
				h1: 'Smartlock ақылды құлыптары',
				lead: 'Қолжетімді Smartlock желісі: кіріктірме құлыптар, шыны және тар профильді есіктерге арналған құлыптар, қонақүй карта-құлыптары, шкаф құлыптары және саусақ ізі бар аспалы құлыптар.',
				seoTitle: 'Smartlock ақылды құлыптары — Қазақстанда сатып алу | iLOCK',
				seoDescription:
					'Қазақстанда Smartlock құлыптары: 15 000 ₸ бастап. Биометрия, пин-код және карта, шыны және тар профильді есіктерге, қонақүйлерге, шкафтарға және аспалы құлыптар.',
			},
			safes: {
				h1: 'Philips сейфтері',
				lead: 'Philips Smart Safe желісі: ықшам жиһаз сейфтері, кеңсе модельдері және биометриясы, пин-коды, авариялық сигналы және 2 жыл кепілдігі бар премиум Valis сериясы.',
				seoTitle: 'Philips сейфтері — Қазақстанда сатып алу | iLOCK',
				seoDescription:
					'Қазақстандағы Philips Smart Safe сейфтері: SBX102, SBX202, SBX601, SBX602, SBX701, SBX702 және SBX703 Valis. Биометрия, пин-код, 2 жыл кепілдік, Kaspi бөліп төлеу.',
			},
			tiger: {
				h1: 'Tiger сейфтері',
				lead: 'Tiger қару-жарақ сейфтері қабырғаға міндетті бекітумен, электрондық қолжетімділікпен және берік болат корпуспен жасалған.',
				seoTitle: 'Tiger қару-жарақ сейфтері — Қазақстанда сатып алу | iLOCK',
				seoDescription:
					'Tiger AK1 132W қару-жарақ сейфі Қазақстанда: 132×54×39 см, қабырғаға міндетті бекіту, бағасы 420 000 ₸.',
			},
		},
		homeTitle: 'iLOCK — Қазақстандағы Philips және iLock ақылды құлыптары',
		homeDescription:
			'Қазақстандағы Philips Smart Lock ресми өкілі. Face ID, саусақ ізі және Wi-Fi бар iLock және Philips ақылды құлыптары. 2 жылға дейін кепілдік, Kaspi бөліп төлеу, 2 филиал.',
		specs: {
			material: {
				aluminum: 'Алюминий қорытпасы',
				'aluminum-glass': 'Алюминий қорытпасы + шыңдалған шыны',
				zinc: 'Мырыш қорытпасы',
				'zinc-glass': 'Мырыш қорытпасы + шыңдалған шыны',
				steel: 'Тот баспайтын болат',
				'low-carbon-steel': 'Төмен көміртекті қорытпа',
			},
			access: {
				fingerprint: 'Саусақ ізі',
				pin: 'Пин-код',
				face: 'Бет тану',
				palm: 'Алақан тамыры',
				card: 'Карта-брелок',
				key: 'Механикалық кілт',
				app: 'Қосымша',
				'master-card': 'Мастер-карта',
				vein: 'Қол тамырын тану',
			},
			feature: {
				wifi: 'Wi-Fi қосылымы',
				bluetooth: 'Bluetooth қосылымы',
				doorbell: 'Есік қоңырауы',
				'video-peephole': 'Бейнекөзше',
				'two-way-audio': 'Екіжақты аудиобайланыс',
				'dual-camera': 'Екіжақты камера',
				'triple-camera': 'Үшжақты камера',
				'voice-change': 'Бейнебайланыста дауысты өзгерту',
				'voice-ru-kk': 'Орыс және қазақ тіліндегі дыбыстау',
				realtime: 'Нақты уақыттағы мониторинг',
				pir: 'PIR жақындау датчигі',
				motion: 'Қозғалыс датчигі',
				'door-sensor': 'Есіктің жабылу датчигі',
				'night-watch': 'Түнгі қарауыл',
				auto: 'Толық автоматты',
				'semi-auto': 'Жартылай автоматты',
				'auto-lock': 'Автоматты бұғаттау',
				'push-pull': 'Итер/тарт режимі',
				rechargeable: 'Қайта зарядталатын аккумулятор',
				'wireless-charge': 'Сымсыз қуаттандыру',
				'emergency-charge': 'Авариялық зарядтау',
				'low-battery': 'Заряд төмендегені туралы хабарлама',
				'tamper-alarm': 'Бұзу дабылы',
				'double-check': 'Қос тексеру режимі',
				'c-cylinder': 'С-класты цилиндр',
				mute: 'Дыбысты өшіру',
				'anti-pry': 'Бұзу мен бөлшектеуден қорғау',
				ip67: 'IP67 шаң мен судан қорғау',
				waterproof: 'Ылғалға төзімділік',
				'slim-door': 'Тар профильді есіктерге',
				'glass-door': 'Шыны есіктерге',
				software: 'Құлыптарға ортақ бағдарлама',
				programmer: 'Жинақта бағдарламалағыш',
				'solid-body': 'Тұтас корпус',
				alarm: 'Авариялық сигнал',
				'storage-sections': 'Бөлек сақтау секциялары',
				'hidden-compartment': 'Жасырын бөлім',
				'dual-check': 'Қос тексеру режимі',
				'wall-mount': 'Қабырғаға міндетті бекіту',
			},
			power: {
				aa4: 'AA батареялары (х4)',
				'li-4200': 'Литий аккумуляторы 4200 мАсағ',
				'li-5000': 'Литий-полимер аккумуляторы 5000 мАсағ',
				'li-ion': 'Литий-ион аккумуляторы',
				li: 'Литий аккумуляторы',
			},
			color: {
				black: 'қара',
				'matte-black': 'қара мат',
				charcoal: 'көмір-қара',
				obsidian: 'қара обсидиан',
				gold: 'алтын',
				silver: 'күміс',
				copper: 'мыс',
				bronze: 'мыс-қола',
				titanium: 'титан-сұр',
				coffee: 'кофе',
				gray: 'сұр',
				white: 'ақ',
			},
			iface: { ru: 'орысша', kk: 'қазақша', en: 'ағылшынша', zh: 'қытайша' },
		},
	},

	en: {
		nav: { catalog: 'Catalog', about: 'About', contact: 'Contact', faq: 'FAQ', installDelivery: 'Installation and delivery', order: 'Request a call' },
		hero: {
			eyebrow: 'Official Philips representative in Kazakhstan',
			title: 'iLock smart locks',
			tagline: 'for your home',
			text: 'Face and fingerprint recognition, solid break-in protection and battery power independent of the mains. We fit any door — delivered and installed at your home.',
			catalog: 'View catalog',
			contact: 'Request a call',
			choice: "Country's Choice",
			years: 'years on the market',
			branches: 'branches across Kazakhstan',
			warranty: 'years of warranty',
		},
		about: {
			eyebrow: 'Why iLOCK',
			title: 'Why customers',
			titleAccent: 'choose us',
			items: [
				{ t: 'Instalments and Kaspi Red', d: 'Place your order in the way that suits you — with no markup.' },
				{ t: 'Official Philips representative', d: 'Manufacturer warranty on every lock.' },
				{ t: 'Warranty up to 24 months', d: 'Two years across the whole iLock and Philips range.' },
				{ t: 'We cover all of Kazakhstan', d: '2 branches and delivery to any city.' },
				{ t: 'Every product is certified', d: 'Official documentation with each lock.' },
			],
		},
		app: {
			eyebrow: 'Control from your phone',
			title: 'Your home —',
			titleAccent: 'in your pocket',
			text: 'The locks are managed through the Tuya Smart app, and some models through the manufacturer’s own apps. Open the door, create access codes, add fingerprints and get a notification on every entry — right from your phone.',
			note: 'We’ll pick and set up the right app for free during installation.',
			appsLabel: 'Works with apps',
			apps: ['Tuya Smart', 'Smart Life', 'branded apps'],
			door: 'Front door',
			status: 'Locked',
			unlock: 'Unlock',
			battery: 'Battery 86%',
			logLabel: 'Recent activity',
			log: [
				{ who: 'Fingerprint', time: '08:42' },
				{ who: 'PIN code', time: 'Yesterday, 21:15' },
			],
			codesTitle: 'Access codes',
			addCode: 'New code',
			codes: [
				{ name: 'Family', sub: 'Permanent access' },
				{ name: 'Guests', sub: 'Mon–Fri · 09:00–18:00' },
				{ name: 'Cleaning', sub: 'One-time code' },
			],
			alertsTitle: 'Notifications',
			alerts: [
				{ who: 'Door opened', via: 'Fingerprint', time: '08:42' },
				{ who: 'New code added', via: 'Guests', time: '07:15' },
				{ who: 'Entry attempt', via: 'Wrong PIN', time: 'Yesterday' },
			],
		},
		faq: {
			eyebrow: 'FAQ',
			title: 'Frequently asked',
			titleAccent: 'questions',
			pageTitle: 'Frequently asked questions',
			pageDescription: 'Answers to common questions about iLOCK smart locks: installation, door compatibility, battery, Wi-Fi, security, access and warranty.',
		},
		installDelivery: {
			eyebrow: 'Service',
			title: 'Installation and',
			titleAccent: 'delivery',
			pageTitle: 'Installation and delivery',
			pageDescription: 'Professional installation of iLOCK electronic locks: fitting, function setup, work check and usage guidance.',
			sections: [
				{
					title: 'Installation',
					text: 'We do not just deliver an electronic lock — we provide professional installation. After purchase, our specialist comes to you and:',
					items: [
						'Carefully installs the electronic lock on the door',
						'Sets up all the necessary functions',
						'Checks that the lock works correctly',
						'Explains in detail how to use the lock and every available opening method',
					],
				},
				{
					title: 'Delivery',
					text: 'We deliver locks and safes across Kazakhstan. In Astana and Almaty you can visit a branch, and for other cities we help choose a convenient delivery option.',
					items: ['Branches in Astana and Almaty', 'Delivery across Kazakhstan', 'Consultation before dispatch'],
				},
			],
		},
		catalog: {
			eyebrow: 'Catalog',
			title: 'Smart locks',
			titleAccent: 'in stock',
			text: 'Prices include delivery within Astana. Kaspi instalments are available on every model.',
			all: 'All',
			categories: 'Product categories',
			smartLocks: 'Smart locks',
			safes: 'Safes',
			accessories: 'Other',
			accessory: 'Accessory',
			from: 'from',
			featured: 'Best seller',
			soon: 'Coming soon',
			kazakhBrand: 'Brand',
			details: 'Details',
			empty: 'No models in this category yet.',
		},
		catalogFilters: {
			title: 'Filters',
			reset: 'Reset',
			search: 'Search by name',
			searchPlaceholder: 'Search by model or brand',
			groups: [
				{
					title: 'Colour',
					options: [
						{ value: 'color-gray', label: 'Grey' },
						{ value: 'color-black', label: 'Black' },
						{ value: 'color-bronze', label: 'Bronze' },
						{ value: 'color-gold', label: 'Gold' },
					],
				},
				{
					title: 'Opening method',
					options: [
						{ value: 'access-face', label: 'Face ID' },
						{ value: 'access-palm', label: 'Palm-vein recognition' },
					],
				},
				{
					title: 'Connection and control',
					options: [
						{ value: 'connection-wifi', label: 'Wi-Fi' },
						{ value: 'connection-bluetooth', label: 'Bluetooth' },
					],
				},
				{
					title: 'Handle type',
					options: [
						{ value: 'handle-classic', label: 'Classic handle' },
						{ value: 'handle-modern', label: 'Modern handle' },
					],
				},
				{
					title: 'Mechanism',
					options: [
						{ value: 'mechanism-auto', label: 'Automatic' },
						{ value: 'mechanism-semi', label: 'Semi-automatic' },
						{ value: 'mechanism-ordinary', label: 'Standard' },
					],
				},
			],
		},
		lead: {
			eyebrow: 'Request',
			title: 'Leave a request',
			text: 'We will call back, answer your questions and pick a lock for your door.',
			name: 'Name',
			namePh: 'What should we call you',
			phone: 'Phone',
			model: 'Model of interest',
			modelAny: "Haven't chosen — I need advice",
			comment: 'Comment',
			commentPh: 'Door type, city, a good time to call',
			submit: 'Send via WhatsApp',
			note: 'By pressing the button you agree to the processing of personal data. The form opens WhatsApp with a prepared message.',
			errName: 'Please enter your name',
			errPhone: 'Please enter a phone number — at least 10 digits',
			msgIntro: 'Hello! A request from the iLOCK website.',
			msgName: 'Name',
			msgPhone: 'Phone',
			msgModel: 'Model',
			msgComment: 'Comment',
		},
		contact: {
			eyebrow: 'Contact',
			title: 'Contact us',
			phone: 'Phone',
			email: 'Email',
			address: 'Address',
			branches: 'Branches',
			floor: 'Floor',
			hours: 'Opening hours',
			weekdays: 'Mon–Fri',
				weekend: 'Sat–Sun',
				whatsapp: 'Message on WhatsApp',
				instagram: 'Follow on Instagram',
				youtube: 'Our YouTube',
				whatsappHello: 'Hello! Writing from the iLOCK website — I would like advice on smart locks.',
			},
		product: {
			back: 'Back to catalog',
			specs: 'Technical specifications',
			access: 'Unlocking methods',
			features: 'Lock features',
			safeFeatures: 'Safe features',
			accessoryFeatures: 'Product features',
			about: 'About the model',
			order: 'Order',
			ask: 'Ask on WhatsApp',
			others: 'Other models',
			related: 'Similar models',
			askMsg: (t: string) => `Hello! I'm interested in the ${t} lock from the iLOCK website.`,
			orderMsg: (t: string, kind = 'lock') =>
				`Hello! I'd like to order the ${t} ${kind === 'safe' ? 'safe' : kind === 'accessory' ? 'accessory' : 'lock'}.`,
			kaspiWord: 'Instalment',
			kaspiTerm: (m: string) => `${m} × 12 mo`,
			variants: 'Variants',
			variantModel: 'Model',
			variantPrice: 'Price',
			variantDimensions: 'Dimensions',
			variantWeight: 'Weight',
			rows: {
				material: 'Body',
				access: 'Access methods',
				temp: 'Temperature range',
				power: 'Power',
				battery: 'Runtime per charge',
				app: 'App',
				compatibility: 'Compatibility',
				included: 'In the box',
				brand: 'Brand / Warranty',
				origin: 'Country',
				iface: 'Interface language',
				colors: 'Body colour',
			},
			years: (n: number) => `${n} ${n === 1 ? 'year' : 'years'}`,
			months: (v: string) => `up to ${v} months`,
			upTo: 'up to',
			pcs: 'pcs',
			h1: (brand: string, title: string, kind = 'lock') =>
				kind === 'safe' ? `${brand} ${title} safe` : kind === 'accessory' ? `${brand} ${title} accessory` : `${brand} ${title} smart lock`,
			imgAlt: (brand: string, title: string, kind = 'lock') =>
				kind === 'safe' ? `${brand} ${title} safe` : kind === 'accessory' ? `${brand} ${title} accessory` : `${brand} ${title} smart lock`,
			metaParts: (price: string, warranty: string) => [
				price,
				`${warranty} warranty`,
				'Kaspi instalments',
				'delivery across Kazakhstan',
			],
		},
		footer: {
			rights: 'All rights reserved',
			made: 'Official Philips representative in Kazakhstan',
			brands: 'Brands',
			catalogPdf: 'PDF catalog',
		},
		featured: {
			eyebrow: 'Showcase',
			title: 'Popular',
			titleAccent: 'models',
			text: 'Installed without damaging your door. Delivery across Kazakhstan. Kaspi instalments.',
			all: (n: number) => `See the full catalog — ${n} models`,
		},
		catalogPage: {
			h1: 'Smart locks and safes catalog',
			lead: 'Installed without damaging your door. Delivery across Kazakhstan. Kaspi instalments.',
			seoTitle: 'Smart locks and safes catalog — buy in Kazakhstan | iLOCK',
			seoDescription:
				'Smart locks and safes in Kazakhstan: iLock, Philips, Smartlock and Philips Safe. Face ID, fingerprint, Wi-Fi and biometric safes. Up to 2 years warranty, Kaspi instalments.',
		},
		brandPage: {
			eyebrow: 'Catalog',
			models: (n: number) => `${n} ${n === 1 ? 'model' : 'models'}`,
			priceRange: 'Prices',
			allBrands: 'All products',
			ilock: {
				h1: 'iLock smart locks',
					lead: 'iLock is our own brand — locks with face and palm-vein recognition, a video peephole and a fully automatic mechanism. Two-year warranty and free servicing.',
				seoTitle: 'iLock smart locks — buy in Kazakhstan | iLOCK',
				seoDescription:
					'Smart locks from the iLock brand: iL-8 and S90 with Face ID, palm-vein recognition, a video peephole and Wi-Fi. Two-year warranty, Kaspi instalments, delivery across Kazakhstan.',
			},
			philips: {
				h1: 'Philips smart locks',
				lead: 'We are the official Philips Smart Lock representative in Kazakhstan: direct supply, the original two-year manufacturer warranty and free servicing. From the entry-level DDL 608 to the three-camera 902 MVP flagship.',
				seoTitle: 'Philips smart locks — official representative in Kazakhstan | iLOCK',
				seoDescription:
					'Philips smart locks in Kazakhstan from the official representative: DDL 603E, DDL 610, DDL 7300, Alpha, 702 FVP, 709 FVP, 902 MVP. Original two-year warranty, Kaspi instalments.',
			},
			smartlock: {
				h1: 'Smartlock smart locks',
				lead: 'The affordable Smartlock range: mortise locks, locks for glass and narrow-profile doors, hotel card locks, locker locks and fingerprint padlocks.',
				seoTitle: 'Smartlock smart locks — buy in Kazakhstan | iLOCK',
				seoDescription:
					'Smartlock locks in Kazakhstan from 15,000 ₸. Biometrics, PIN and card entry, models for glass and narrow-profile doors, hotels, lockers, plus padlocks.',
			},
			safes: {
				h1: 'Philips safes',
				lead: 'The Philips Smart Safe range: compact drawer safes, office models and premium Valis safes with biometrics, PIN entry, emergency alarm and a two-year warranty.',
				seoTitle: 'Philips safes — buy in Kazakhstan | iLOCK',
				seoDescription:
					'Philips Smart Safe in Kazakhstan: SBX102, SBX202, SBX601, SBX602, SBX701, SBX702 and SBX703 Valis. Biometrics, PIN entry, 2-year warranty, Kaspi instalments.',
			},
			tiger: {
				h1: 'Tiger safes',
				lead: 'Tiger gun safes for firearm storage with mandatory wall mounting, electronic access and a sturdy steel body.',
				seoTitle: 'Tiger gun safes — buy in Kazakhstan | iLOCK',
				seoDescription:
					'Tiger AK1 132W gun safe in Kazakhstan: 132×54×39 cm, mandatory wall mounting, price 420,000 ₸.',
			},
		},
		homeTitle: 'iLOCK — Philips and iLock smart locks in Kazakhstan',
		homeDescription:
			'Official Philips Smart Lock representative in Kazakhstan. iLock and Philips smart locks with Face ID, fingerprint and Wi-Fi. Up to 2 years warranty, Kaspi instalments, 2 branches.',
		specs: {
			material: {
				aluminum: 'Aluminium alloy',
				'aluminum-glass': 'Aluminium alloy + tempered glass',
				zinc: 'Zinc alloy',
				'zinc-glass': 'Zinc alloy + tempered glass',
				steel: 'Stainless steel',
				'low-carbon-steel': 'Low-carbon alloy',
			},
			access: {
				fingerprint: 'Fingerprint',
				pin: 'PIN code',
				face: 'Face recognition',
				palm: 'Palm vein',
				card: 'Key card',
				key: 'Mechanical key',
				app: 'Mobile app',
				'master-card': 'Master card',
				vein: 'Hand-vein recognition',
			},
			feature: {
				wifi: 'Wi-Fi connection',
				bluetooth: 'Bluetooth connection',
				doorbell: 'Doorbell',
				'video-peephole': 'Video peephole',
				'two-way-audio': 'Two-way audio',
				'dual-camera': 'Dual camera',
				'triple-camera': 'Triple camera',
				'voice-change': 'Voice changer on video calls',
				'voice-ru-kk': 'Russian and Kazakh voice prompts',
				realtime: 'Real-time monitoring',
				pir: 'PIR proximity sensor',
				motion: 'Motion sensor',
				'door-sensor': 'Door closing sensor',
				'night-watch': 'Night watch mode',
				auto: 'Fully automatic',
				'semi-auto': 'Semi-automatic',
				'auto-lock': 'Automatic locking',
				'push-pull': 'Push/pull action',
				rechargeable: 'Rechargeable battery',
				'wireless-charge': 'Wireless charging',
				'emergency-charge': 'Emergency charging',
				'low-battery': 'Low battery alert',
				'tamper-alarm': 'Tamper alarm',
				'double-check': 'Dual verification mode',
				'c-cylinder': 'C-class cylinder',
				mute: 'Mute mode',
				'anti-pry': 'Anti-pry and anti-removal',
				ip67: 'IP67 dust and water protection',
				waterproof: 'Moisture resistant',
				'slim-door': 'For narrow-profile doors',
				'glass-door': 'For glass doors',
				software: 'Shared lock software',
				programmer: 'Programmer included',
				'solid-body': 'Solid body',
				alarm: 'Emergency alarm',
				'storage-sections': 'Separate storage sections',
				'hidden-compartment': 'Hidden compartment',
				'dual-check': 'Dual verification mode',
				'wall-mount': 'Mandatory wall mounting',
			},
			power: {
				aa4: 'AA batteries (x4)',
				'li-4200': 'Lithium battery 4200 mAh',
				'li-5000': 'Li-polymer battery 5000 mAh',
				'li-ion': 'Li-ion battery',
				li: 'Lithium battery',
			},
			color: {
				black: 'black',
				'matte-black': 'matte black',
				charcoal: 'charcoal black',
				obsidian: 'obsidian black',
				gold: 'gold',
				silver: 'silver',
				copper: 'copper',
				bronze: 'copper bronze',
				titanium: 'titanium grey',
				coffee: 'coffee',
				gray: 'grey',
				white: 'white',
			},
			iface: { ru: 'Russian', kk: 'Kazakh', en: 'English', zh: 'Chinese' },
		},
	},
} as const;

export function getLangFromUrl(url: URL): Lang {
	const [, maybeLang] = url.pathname.split('/');
	return langList.includes(maybeLang as Lang) ? (maybeLang as Lang) : defaultLang;
}

/**
 * The default language is served from the root without a prefix, so `/catalog/il-8/` — not
 * `/ru/catalog/il-8/` — is the URL we link to and the one search engines should index.
 */
export function getLocalePath(lang: Lang, path = '/') {
	const cleanPath = path.startsWith('/') ? path : `/${path}`;
	if (lang === defaultLang) return cleanPath;
	return `/${lang}${cleanPath === '/' ? '/' : cleanPath}`;
}

export function stripLocale(path: string) {
	return path.replace(/^\/(ru|kk|en)(?=\/|$)/, '') || '/';
}

export function getTranslatedPath(lang: Lang, currentPath: string) {
	return getLocalePath(lang, stripLocale(currentPath));
}

/**
 * `/ru/x` and `/x` render identical pages, so the prefixed variant must point at the root one —
 * otherwise the two compete as duplicate content.
 */
export function canonicalPath(path: string) {
	return path.startsWith(`/${defaultLang}/`) || path === `/${defaultLang}`
		? stripLocale(path)
		: path;
}

type LockEntry = CollectionEntry<'locks'>;
type LockData = LockEntry['data'];

/** A lock with the `lang` prose merged in, so components read `.description` directly. */
export type LocalizedLock = Omit<LockData, 'ru' | 'kk' | 'en'> &
	LockData['ru'] & { id: string; slug: string };

/** Merges a lock entry with the prose for `lang`, keeping the structured spec fields. */
export function localizeLock(lock: LockEntry, lang: Lang): LocalizedLock {
	const { ru, kk, en, ...specs } = lock.data;
	const prose = { ru, kk, en }[lang] ?? ru;
	return { ...specs, ...prose, id: lock.id, slug: lock.id };
}

/**
 * Pads a short description with selling points until the snippet limit is reached.
 * Per-model copy runs 50–120 characters while Google shows ~160, so the leftover room
 * would otherwise be wasted. Parts are added whole — a clause is never cut mid-word.
 */
export function buildMetaDescription(base: string, parts: string[], limit = 158) {
	return parts.reduce((out, part) => {
		const next = `${out} · ${part}`;
		return next.length > limit ? out : next;
	}, base);
}

/** Sorts by brand priority (iLock, Philips, then the rest), then by the per-brand order. */
export function sortLocks<T extends { brand: Brand; order: number; kind?: string }>(locks: T[]) {
	return [...locks].sort(
		(a, b) =>
			(a.kind === 'accessory' && b.kind === 'accessory'
				? 0
				: brandOrder.indexOf(a.brand) - brandOrder.indexOf(b.brand)) || a.order - b.order,
	);
}
