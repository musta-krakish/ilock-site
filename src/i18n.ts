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
export const brandOrder = ['ilock', 'philips', 'smartlock'] as const;
export type Brand = (typeof brandOrder)[number];

export const brandNames: Record<Brand, string> = {
	ilock: 'iLock',
	philips: 'Philips',
	smartlock: 'Smartlock',
};

export const ui = {
	ru: {
		nav: { catalog: 'Каталог', about: 'О компании', contact: 'Контакты', order: 'Оставить заявку' },
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
				{ t: 'Рассрочка и кредит от Kaspi', d: 'Оформим рассрочку прямо при заказе — без переплаты.' },
				{ t: 'Официальные представители Philips', d: 'Прямые поставки и оригинальная гарантия производителя.' },
				{ t: 'Гарантия до 24 месяцев', d: 'На всю линейку iLock и Philips — два года.' },
				{ t: 'Бесплатное обслуживание', d: 'На весь срок гарантии — приедем и настроим.' },
				{ t: 'Работаем по всему Казахстану', d: '4 филиала и доставка в любой город.' },
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
		catalog: {
			eyebrow: 'Каталог',
			title: 'Умные замки',
			titleAccent: 'в наличии',
			text: 'Цены указаны с учётом доставки по Астане. Рассрочка от Kaspi доступна на любую модель.',
			all: 'Все',
			from: 'от',
			featured: 'Хит продаж',
			soon: 'Скоро в продаже',
			kazakhBrand: 'Казахстанский бренд',
			details: 'Подробнее',
			empty: 'В этой категории пока нет моделей.',
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
			hours: 'График работы',
			weekdays: 'Пн–Пт',
			weekend: 'Сб–Вс',
			whatsapp: 'Написать в WhatsApp',
			instagram: 'Мы в Instagram',
			whatsappHello: 'Здравствуйте! Пишу с сайта iLOCK — хочу проконсультироваться по умным замкам.',
		},
		product: {
			back: 'Назад в каталог',
			specs: 'Технические характеристики',
			access: 'Способы разблокировки',
			features: 'Особенности замка',
			about: 'О модели',
			order: 'Заказать',
			ask: 'Спросить в WhatsApp',
			others: 'Другие модели',
			related: 'Похожие модели',
			askMsg: (t: string) => `Здравствуйте! Интересует замок ${t} с сайта iLOCK.`,
			orderMsg: (t: string) => `Здравствуйте! Хочу заказать данный замок ${t}.`,
			kaspiWord: 'Рассрочка',
			kaspiTerm: (m: string) => `${m} × 12 мес`,
			rows: {
				material: 'Корпус',
				access: 'Методы доступа',
				temp: 'Температурный режим',
				power: 'Питание',
				battery: 'Работа без подзарядки',
				app: 'Приложение',
				brand: 'Бренд / Гарантия',
				iface: 'Язык интерфейса',
				colors: 'Цвет корпуса',
			},
			years: (n: number) => `${n} ${n === 1 ? 'год' : 'года'}`,
			months: (v: string) => `до ${v} месяцев`,
			upTo: 'до',
			pcs: 'шт',
			// The model number alone ("DDL 7300") is not a phrase anyone searches for, so the
			// H1 and the image alt carry the category and the brand around it.
			h1: (brand: string, title: string) => `Умный замок ${brand} ${title}`,
			imgAlt: (brand: string, title: string) => `Умный замок ${brand} ${title}`,
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
		},
		featured: {
			eyebrow: 'Витрина',
			title: 'Популярные',
			titleAccent: 'модели',
			text: 'Установим без повреждения ваших дверей. Доставка по всему Казахстану. Рассрочка через Kaspi.',
			all: (n: number) => `Смотреть весь каталог — ${n} моделей`,
		},
		catalogPage: {
			h1: 'Каталог умных замков',
			lead: 'Установим без повреждения ваших дверей. Доставка по всему Казахстану. Рассрочка через Kaspi.',
			seoTitle: 'Каталог умных замков — купить в Казахстане | iLOCK',
			seoDescription:
				'Каталог умных замков в Казахстане: iLock, Philips и Smartlock — 27 моделей от 15 000 ₸. Face ID, отпечаток пальца, Wi-Fi. Гарантия до 2 лет, рассрочка от Kaspi, доставка по всему Казахстану.',
		},
		brandPage: {
			eyebrow: 'Каталог',
			models: (n: number) => `${n} ${n % 10 === 1 && n % 100 !== 11 ? 'модель' : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 'модели' : 'моделей'}`,
			priceRange: 'Цены',
			allBrands: 'Все замки',
			ilock: {
				h1: 'Умные замки iLock',
				lead: 'Казахстанский бренд iLock — собственная линейка замков с распознаванием лица и вен ладони, видеоглазком и полностью автоматическим механизмом. Гарантия 2 года, обслуживание бесплатное.',
				seoTitle: 'Умные замки iLock — купить в Казахстане | iLOCK',
				seoDescription:
					'Умные замки казахстанского бренда iLock: iL-8 и S90 с Face ID, распознаванием вен ладони, видеоглазком и Wi-Fi. Гарантия 2 года, рассрочка от Kaspi, доставка по Казахстану.',
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
		},
		homeTitle: 'iLOCK — умные замки Philips и iLock в Казахстане',
		homeDescription:
			'Официальный представитель Philips Smart Lock в Казахстане. Умные замки iLock и Philips с Face ID, отпечатком и Wi-Fi. Гарантия до 2 лет, рассрочка от Kaspi, 4 филиала.',
		specs: {
			material: {
				aluminum: 'Алюминиевый сплав',
				'aluminum-glass': 'Алюминиевый сплав + закалённое стекло',
				zinc: 'Цинковый сплав',
				'zinc-glass': 'Цинковый сплав + закалённое стекло',
				steel: 'Нержавеющая сталь',
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
				realtime: 'Мониторинг в реальном времени',
				pir: 'PIR-датчик приближения',
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
			},
			iface: { ru: 'русский', kk: 'казахский', en: 'английский', zh: 'китайский' },
		},
	},

	kk: {
		nav: { catalog: 'Каталог', about: 'Компания туралы', contact: 'Байланыс', order: 'Өтінім қалдыру' },
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
				{ t: 'Kaspi бөліп төлеу және несие', d: 'Тапсырыс кезінде бөліп төлеуді рәсімдейміз — артық төлемсіз.' },
				{ t: 'Philips ресми өкілі', d: 'Тікелей жеткізу және өндірушінің түпнұсқа кепілдігі.' },
				{ t: '24 айға дейін кепілдік', d: 'Барлық iLock және Philips желісіне — екі жыл.' },
				{ t: 'Тегін қызмет көрсету', d: 'Кепілдік мерзімі бойы — келіп, баптап береміз.' },
				{ t: 'Қазақстан бойынша жұмыс', d: '4 филиал және кез келген қалаға жеткізу.' },
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
		catalog: {
			eyebrow: 'Каталог',
			title: 'Ақылды құлыптар',
			titleAccent: 'қоймада бар',
			text: 'Бағалар Астана бойынша жеткізуді есепке алады. Kaspi бөліп төлеу кез келген модельге қолжетімді.',
			all: 'Барлығы',
			from: 'бастап',
			featured: 'Хит',
			soon: 'Жақында сатылымда',
			kazakhBrand: 'Қазақстандық бренд',
			details: 'Толығырақ',
			empty: 'Бұл санатта әзірге модель жоқ.',
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
			hours: 'Жұмыс кестесі',
			weekdays: 'Дс–Жм',
			weekend: 'Сб–Жс',
			whatsapp: 'WhatsApp-қа жазу',
			instagram: 'Instagram-да біз',
			whatsappHello: 'Сәлеметсіз бе! iLOCK сайтынан жазып отырмын — ақылды құлыптар бойынша кеңес алғым келеді.',
		},
		product: {
			back: 'Каталогқа оралу',
			specs: 'Техникалық сипаттамалар',
			access: 'Ашу тәсілдері',
			features: 'Құлып ерекшеліктері',
			about: 'Модель туралы',
			order: 'Тапсырыс беру',
			ask: 'WhatsApp-та сұрау',
			others: 'Басқа модельдер',
			related: 'Ұқсас модельдер',
			askMsg: (t: string) => `Сәлеметсіз бе! iLOCK сайтындағы ${t} құлыбы қызықтырады.`,
			orderMsg: (t: string) => `Сәлеметсіз бе! Осы ${t} құлыбына тапсырыс бергім келеді.`,
			kaspiWord: 'Бөліп төлеу',
			kaspiTerm: (m: string) => `${m} × 12 ай`,
			rows: {
				material: 'Корпус',
				access: 'Қол жеткізу әдістері',
				temp: 'Температуралық режим',
				power: 'Қуат көзі',
				battery: 'Зарядсыз жұмыс',
				app: 'Қосымша',
				brand: 'Бренд / Кепілдік',
				iface: 'Интерфейс тілі',
				colors: 'Корпус түсі',
			},
			years: (n: number) => `${n} жыл`,
			months: (v: string) => `${v} айға дейін`,
			upTo: 'дейін',
			pcs: 'дана',
			h1: (brand: string, title: string) => `${brand} ${title} ақылды құлпы`,
			imgAlt: (brand: string, title: string) => `${brand} ${title} ақылды құлпы`,
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
		},
		featured: {
			eyebrow: 'Витрина',
			title: 'Танымал',
			titleAccent: 'модельдер',
			text: 'Есігіңізді зақымдамай орнатамыз. Қазақстан бойынша жеткізу. Kaspi арқылы бөліп төлеу.',
			all: (n: number) => `Толық каталогты қарау — ${n} модель`,
		},
		catalogPage: {
			h1: 'Ақылды құлыптар каталогы',
			lead: 'Есігіңізді зақымдамай орнатамыз. Қазақстан бойынша жеткізу. Kaspi арқылы бөліп төлеу.',
			seoTitle: 'Ақылды құлыптар каталогы — Қазақстанда сатып алу | iLOCK',
			seoDescription:
				'Қазақстандағы ақылды құлыптар каталогы: iLock, Philips және Smartlock — 15 000 ₸ бастап 27 модель. Face ID, саусақ ізі, Wi-Fi. 2 жылға дейін кепілдік, Kaspi бөліп төлеу.',
		},
		brandPage: {
			eyebrow: 'Каталог',
			models: (n: number) => `${n} модель`,
			priceRange: 'Бағалар',
			allBrands: 'Барлық құлыптар',
			ilock: {
				h1: 'iLock ақылды құлыптары',
				lead: 'iLock — қазақстандық бренд: бет пен алақан тамырын тану, бейнекөзше және толық автоматты механизм. Кепілдік 2 жыл, қызмет көрсету тегін.',
				seoTitle: 'iLock ақылды құлыптары — Қазақстанда сатып алу | iLOCK',
				seoDescription:
					'Қазақстандық iLock брендінің ақылды құлыптары: Face ID, алақан тамырын тану, бейнекөзше және Wi-Fi бар iL-8 және S90. Кепілдік 2 жыл, Kaspi бөліп төлеу.',
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
		},
		homeTitle: 'iLOCK — Қазақстандағы Philips және iLock ақылды құлыптары',
		homeDescription:
			'Қазақстандағы Philips Smart Lock ресми өкілі. Face ID, саусақ ізі және Wi-Fi бар iLock және Philips ақылды құлыптары. 2 жылға дейін кепілдік, Kaspi бөліп төлеу, 4 филиал.',
		specs: {
			material: {
				aluminum: 'Алюминий қорытпасы',
				'aluminum-glass': 'Алюминий қорытпасы + шыңдалған шыны',
				zinc: 'Мырыш қорытпасы',
				'zinc-glass': 'Мырыш қорытпасы + шыңдалған шыны',
				steel: 'Тот баспайтын болат',
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
				realtime: 'Нақты уақыттағы мониторинг',
				pir: 'PIR жақындау датчигі',
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
			},
			iface: { ru: 'орысша', kk: 'қазақша', en: 'ағылшынша', zh: 'қытайша' },
		},
	},

	en: {
		nav: { catalog: 'Catalog', about: 'About', contact: 'Contact', order: 'Request a call' },
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
				{ t: 'Kaspi instalments and credit', d: 'We arrange instalments as you order — with no markup.' },
				{ t: 'Official Philips representative', d: 'Direct supply and the original manufacturer warranty.' },
				{ t: 'Warranty up to 24 months', d: 'Two years across the whole iLock and Philips range.' },
				{ t: 'Free servicing', d: 'For the full warranty period — we come out and set it up.' },
				{ t: 'We cover all of Kazakhstan', d: '4 branches and delivery to any city.' },
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
		catalog: {
			eyebrow: 'Catalog',
			title: 'Smart locks',
			titleAccent: 'in stock',
			text: 'Prices include delivery within Astana. Kaspi instalments are available on every model.',
			all: 'All',
			from: 'from',
			featured: 'Best seller',
			soon: 'Coming soon',
			kazakhBrand: 'Kazakhstani brand',
			details: 'Details',
			empty: 'No models in this category yet.',
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
			hours: 'Opening hours',
			weekdays: 'Mon–Fri',
			weekend: 'Sat–Sun',
			whatsapp: 'Message on WhatsApp',
			instagram: 'Follow on Instagram',
			whatsappHello: 'Hello! Writing from the iLOCK website — I would like advice on smart locks.',
		},
		product: {
			back: 'Back to catalog',
			specs: 'Technical specifications',
			access: 'Unlocking methods',
			features: 'Lock features',
			about: 'About the model',
			order: 'Order',
			ask: 'Ask on WhatsApp',
			others: 'Other models',
			related: 'Similar models',
			askMsg: (t: string) => `Hello! I'm interested in the ${t} lock from the iLOCK website.`,
			orderMsg: (t: string) => `Hello! I'd like to order the ${t} lock.`,
			kaspiWord: 'Instalment',
			kaspiTerm: (m: string) => `${m} × 12 mo`,
			rows: {
				material: 'Body',
				access: 'Access methods',
				temp: 'Temperature range',
				power: 'Power',
				battery: 'Runtime per charge',
				app: 'App',
				brand: 'Brand / Warranty',
				iface: 'Interface language',
				colors: 'Body colour',
			},
			years: (n: number) => `${n} ${n === 1 ? 'year' : 'years'}`,
			months: (v: string) => `up to ${v} months`,
			upTo: 'up to',
			pcs: 'pcs',
			h1: (brand: string, title: string) => `${brand} ${title} smart lock`,
			imgAlt: (brand: string, title: string) => `${brand} ${title} smart lock`,
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
		},
		featured: {
			eyebrow: 'Showcase',
			title: 'Popular',
			titleAccent: 'models',
			text: 'Installed without damaging your door. Delivery across Kazakhstan. Kaspi instalments.',
			all: (n: number) => `See the full catalog — ${n} models`,
		},
		catalogPage: {
			h1: 'Smart lock catalog',
			lead: 'Installed without damaging your door. Delivery across Kazakhstan. Kaspi instalments.',
			seoTitle: 'Smart lock catalog — buy in Kazakhstan | iLOCK',
			seoDescription:
				'Smart lock catalog in Kazakhstan: iLock, Philips and Smartlock — 27 models from 15,000 ₸. Face ID, fingerprint, Wi-Fi. Up to 2 years warranty, Kaspi instalments, delivery nationwide.',
		},
		brandPage: {
			eyebrow: 'Catalog',
			models: (n: number) => `${n} ${n === 1 ? 'model' : 'models'}`,
			priceRange: 'Prices',
			allBrands: 'All locks',
			ilock: {
				h1: 'iLock smart locks',
				lead: 'iLock is our own Kazakhstani brand — locks with face and palm-vein recognition, a video peephole and a fully automatic mechanism. Two-year warranty and free servicing.',
				seoTitle: 'iLock smart locks — buy in Kazakhstan | iLOCK',
				seoDescription:
					'Smart locks from the Kazakhstani iLock brand: iL-8 and S90 with Face ID, palm-vein recognition, a video peephole and Wi-Fi. Two-year warranty, Kaspi instalments, delivery across Kazakhstan.',
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
		},
		homeTitle: 'iLOCK — Philips and iLock smart locks in Kazakhstan',
		homeDescription:
			'Official Philips Smart Lock representative in Kazakhstan. iLock and Philips smart locks with Face ID, fingerprint and Wi-Fi. Up to 2 years warranty, Kaspi instalments, 4 branches.',
		specs: {
			material: {
				aluminum: 'Aluminium alloy',
				'aluminum-glass': 'Aluminium alloy + tempered glass',
				zinc: 'Zinc alloy',
				'zinc-glass': 'Zinc alloy + tempered glass',
				steel: 'Stainless steel',
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
				realtime: 'Real-time monitoring',
				pir: 'PIR proximity sensor',
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
export function sortLocks<T extends { brand: Brand; order: number }>(locks: T[]) {
	return [...locks].sort(
		(a, b) => brandOrder.indexOf(a.brand) - brandOrder.indexOf(b.brand) || a.order - b.order,
	);
}
