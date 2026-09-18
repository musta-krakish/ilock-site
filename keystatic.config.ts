import { collection, config, fields, singleton, type FormFieldInputProps } from '@keystatic/core';
import { createElement } from 'react';

const repository = 'musta-krakish/ilock-site';

const options = {
	brand: [
		{ label: 'iLOCK', value: 'ilock' },
		{ label: 'Philips', value: 'philips' },
		{ label: 'EZVIZ', value: 'ezviz' },
		{ label: 'SmartLock', value: 'smartlock' },
		{ label: 'Сейфы Philips', value: 'safes' },
		{ label: 'Tiger', value: 'tiger' },
	],
	kind: [
		{ label: 'Умный замок', value: 'lock' },
		{ label: 'Сейф', value: 'safe' },
		{ label: 'Прочее / аксессуар', value: 'accessory' },
	],
	material: [
		{ label: 'Алюминиевый сплав', value: 'aluminum' },
		{ label: 'Алюминиевый сплав + стекло', value: 'aluminum-glass' },
		{ label: 'Цинковый сплав', value: 'zinc' },
		{ label: 'Цинковый сплав + стекло', value: 'zinc-glass' },
		{ label: 'Нержавеющая сталь', value: 'steel' },
		{ label: 'Низкоуглеродистый сплав', value: 'low-carbon-steel' },
	],
	access: [
		{ label: 'Отпечаток пальца', value: 'fingerprint' },
		{ label: 'Пин-код', value: 'pin' },
		{ label: 'Распознавание лица', value: 'face' },
		{ label: 'Вены ладони', value: 'palm' },
		{ label: 'Карта-брелок', value: 'card' },
		{ label: 'Механический ключ', value: 'key' },
		{ label: 'Приложение', value: 'app' },
		{ label: 'Мастер-карта', value: 'master-card' },
		{ label: 'Распознавание вен на руке', value: 'vein' },
	],
	feature: [
		{ label: 'Wi-Fi', value: 'wifi' },
		{ label: 'Bluetooth', value: 'bluetooth' },
		{ label: 'Дверной звонок', value: 'doorbell' },
		{ label: 'Видеоглазок', value: 'video-peephole' },
		{ label: 'Двусторонняя аудиосвязь', value: 'two-way-audio' },
		{ label: 'Двусторонняя камера', value: 'dual-camera' },
		{ label: 'Трёхсторонняя камера', value: 'triple-camera' },
		{ label: 'Изменение голоса', value: 'voice-change' },
		{ label: 'Озвучка RU/KZ', value: 'voice-ru-kk' },
		{ label: 'Мониторинг в реальном времени', value: 'realtime' },
		{ label: 'PIR-датчик', value: 'pir' },
		{ label: 'Датчик движения', value: 'motion' },
		{ label: 'Датчик закрытия двери', value: 'door-sensor' },
		{ label: 'Ночной часовой', value: 'night-watch' },
		{ label: 'Полностью автоматический', value: 'auto' },
		{ label: 'Полуавтоматический', value: 'semi-auto' },
		{ label: 'Автоблокировка', value: 'auto-lock' },
		{ label: 'Режим толкни/потяни', value: 'push-pull' },
		{ label: 'Перезаряжаемый аккумулятор', value: 'rechargeable' },
		{ label: 'Беспроводная зарядка', value: 'wireless-charge' },
		{ label: 'Аварийная зарядка', value: 'emergency-charge' },
		{ label: 'Низкий заряд', value: 'low-battery' },
		{ label: 'Сигнализация о вскрытии', value: 'tamper-alarm' },
		{ label: 'Двойная проверка', value: 'double-check' },
		{ label: 'Двойная проверка (сейф)', value: 'dual-check' },
		{ label: 'Цилиндр C-класса', value: 'c-cylinder' },
		{ label: 'Отключение звука', value: 'mute' },
		{ label: 'Защита от взлома', value: 'anti-pry' },
		{ label: 'Защита IP67', value: 'ip67' },
		{ label: 'Влагостойкость', value: 'waterproof' },
		{ label: 'Для узкопрофильных дверей', value: 'slim-door' },
		{ label: 'Для стеклянных дверей', value: 'glass-door' },
		{ label: 'Общее ПО для замков', value: 'software' },
		{ label: 'Программатор в комплекте', value: 'programmer' },
		{ label: 'Цельный корпус', value: 'solid-body' },
		{ label: 'Аварийный сигнал', value: 'alarm' },
		{ label: 'Отдельные секции хранения', value: 'storage-sections' },
		{ label: 'Скрытый отсек', value: 'hidden-compartment' },
		{ label: 'Крепление к стене', value: 'wall-mount' },
		{ label: 'Zigbee 3.0', value: 'zigbee' },
		{ label: 'Аварийное питание MicroUSB', value: 'micro-usb' },
		{ label: 'Блокировка двойным поднятием ручки', value: 'double-handle-lock' },
		{ label: 'Звуковое сопровождение событий', value: 'sound-prompts' },
	],
	power: [
		{ label: '4 батарейки AA', value: 'aa4' },
		{ label: 'Литиевый аккумулятор 4200 мАч', value: 'li-4200' },
		{ label: 'Литий-полимерный аккумулятор 5000 мАч', value: 'li-5000' },
		{ label: 'Литий-ионный аккумулятор', value: 'li-ion' },
		{ label: 'Литиевый аккумулятор', value: 'li' },
	],
	interface: [
		{ label: 'Русский', value: 'ru' },
		{ label: 'Казахский', value: 'kk' },
		{ label: 'Английский', value: 'en' },
		{ label: 'Китайский', value: 'zh' },
	],
	color: [
		{ label: 'Чёрный', value: 'black' },
		{ label: 'Чёрный матовый', value: 'matte-black' },
		{ label: 'Угольно-чёрный', value: 'charcoal' },
		{ label: 'Чёрный обсидиан', value: 'obsidian' },
		{ label: 'Золотой', value: 'gold' },
		{ label: 'Серебристый', value: 'silver' },
		{ label: 'Медный', value: 'copper' },
		{ label: 'Медно-бронзовый', value: 'bronze' },
		{ label: 'Титаново-серый', value: 'titanium' },
		{ label: 'Кофейный', value: 'coffee' },
		{ label: 'Серый', value: 'gray' },
		{ label: 'Белый', value: 'white' },
	],
} as const;

const requiredText = (label: string, description?: string) =>
	fields.text({ label, description, validation: { isRequired: true } });

type PromotionLockOption = {
	slug: string;
	title: string;
	brand: string;
	price: number;
	imageUrl?: string;
};

// Browser-safe product cards used by the Keystatic editor. Update this short
// catalogue only when a new lock is added; it deliberately excludes safes and
// accessories because this block is for promotional locks on the home page.
const promotionLockOptions: PromotionLockOption[] = [
	{ slug: 'ezviz-l2s', title: 'L2S', brand: 'EZVIZ', price: 75000, imageUrl: 'https://raw.githubusercontent.com/musta-krakish/ilock-site/master/src/assets/images/locks/ezviz-l2s/image.png' },
	{ slug: 'g18', title: 'G18', brand: 'iLOCK', price: 85000, imageUrl: 'https://raw.githubusercontent.com/musta-krakish/ilock-site/master/src/assets/images/locks/g18/image.png' },
	{ slug: 'il-8', title: 'iL-8', brand: 'iLOCK', price: 180000, imageUrl: 'https://raw.githubusercontent.com/musta-krakish/ilock-site/master/src/assets/images/locks/il-8/image.png' },
	{ slug: 's90', title: 'S90', brand: 'iLOCK', price: 220000, imageUrl: 'https://raw.githubusercontent.com/musta-krakish/ilock-site/master/src/assets/images/locks/s90/image.png' },
	{ slug: 'v81', title: 'v81', brand: 'iLOCK', price: 200000, imageUrl: 'https://raw.githubusercontent.com/musta-krakish/ilock-site/master/src/assets/images/locks/v81/image.png' },
	{ slug: '303-vp', title: '303-VP', brand: 'Philips', price: 248000, imageUrl: 'https://raw.githubusercontent.com/musta-krakish/ilock-site/master/src/assets/images/locks/303-vp/image.png' },
	{ slug: '702-fvp', title: '702 FVP', brand: 'Philips', price: 350000, imageUrl: 'https://raw.githubusercontent.com/musta-krakish/ilock-site/master/src/assets/images/locks/702-fvp/image.png' },
	{ slug: '709-fvp', title: '709 FVP', brand: 'Philips', price: 452000, imageUrl: 'https://raw.githubusercontent.com/musta-krakish/ilock-site/master/src/assets/images/locks/709-fvp/image.png' },
	{ slug: '902-mvp', title: '902 MVP', brand: 'Philips', price: 582000, imageUrl: 'https://raw.githubusercontent.com/musta-krakish/ilock-site/master/src/assets/images/locks/902-mvp/image.png' },
	{ slug: 'alpha', title: 'Alpha', brand: 'Philips', price: 240000, imageUrl: 'https://raw.githubusercontent.com/musta-krakish/ilock-site/master/src/assets/images/locks/alpha/image.png' },
	{ slug: 'alpha-vp', title: 'Alpha VP', brand: 'Philips', price: 348000, imageUrl: 'https://raw.githubusercontent.com/musta-krakish/ilock-site/master/src/assets/images/locks/alpha-vp/image.png' },
	{ slug: 'ddl-603e', title: 'DDL 603E', brand: 'Philips', price: 142000, imageUrl: 'https://raw.githubusercontent.com/musta-krakish/ilock-site/master/src/assets/images/locks/ddl-603e/image.png' },
	{ slug: 'ddl-608', title: 'DDL 608', brand: 'Philips', price: 128000, imageUrl: 'https://raw.githubusercontent.com/musta-krakish/ilock-site/master/src/assets/images/locks/ddl-608/image.png' },
	{ slug: 'ddl-610', title: 'DDL 610', brand: 'Philips', price: 159000, imageUrl: 'https://raw.githubusercontent.com/musta-krakish/ilock-site/master/src/assets/images/locks/ddl-610/image.png' },
	{ slug: 'ddl-7300', title: 'DDL 7300', brand: 'Philips', price: 221000, imageUrl: 'https://raw.githubusercontent.com/musta-krakish/ilock-site/master/src/assets/images/locks/ddl-7300/image.png' },
	{ slug: '101p', title: '101P', brand: 'SmartLock', price: 17000, imageUrl: 'https://raw.githubusercontent.com/musta-krakish/ilock-site/master/src/assets/images/locks/101p/image.png' },
	{ slug: '101t', title: '101T', brand: 'SmartLock', price: 28800, imageUrl: 'https://raw.githubusercontent.com/musta-krakish/ilock-site/master/src/assets/images/locks/101t/image.png' },
	{ slug: 'hotel', title: 'Гостиничный замок', brand: 'SmartLock', price: 50000, imageUrl: 'https://raw.githubusercontent.com/musta-krakish/ilock-site/master/src/assets/images/locks/hotel/image.png' },
	{ slug: 'cabinet', title: 'Электронный замок для шкафа', brand: 'SmartLock', price: 15000, imageUrl: 'https://raw.githubusercontent.com/musta-krakish/ilock-site/master/src/assets/images/locks/cabinet/image.png' },
	{ slug: 'd501', title: 'D501', brand: 'SmartLock', price: 30000, imageUrl: 'https://raw.githubusercontent.com/musta-krakish/ilock-site/master/src/assets/images/locks/d501/image.png' },
	{ slug: 'g10s', title: 'G10S', brand: 'SmartLock', price: 60000, imageUrl: 'https://raw.githubusercontent.com/musta-krakish/ilock-site/master/src/assets/images/locks/g10s/image.png' },
	{ slug: 'q28s', title: 'Q28S', brand: 'SmartLock', price: 120000, imageUrl: 'https://raw.githubusercontent.com/musta-krakish/ilock-site/master/src/assets/images/locks/q28s/image.png' },
	{ slug: 's31b', title: 'S31B', brand: 'SmartLock', price: 90000, imageUrl: 'https://raw.githubusercontent.com/musta-krakish/ilock-site/master/src/assets/images/locks/s31b/image.png' },
	{ slug: 's604l', title: 'S604L', brand: 'SmartLock', price: 50000, imageUrl: 'https://raw.githubusercontent.com/musta-krakish/ilock-site/master/src/assets/images/locks/s604l/image.png' },
	{ slug: 's819', title: 'S819', brand: 'SmartLock', price: 70000, imageUrl: 'https://raw.githubusercontent.com/musta-krakish/ilock-site/master/src/assets/images/locks/s819/image.png' },
	{ slug: 's819-2max', title: 'S819-2Max', brand: 'SmartLock', price: 90000, imageUrl: 'https://raw.githubusercontent.com/musta-krakish/ilock-site/master/src/assets/images/locks/s819-2max/image.png' },
	{ slug: 's940-max', title: 'S940 Max', brand: 'SmartLock', price: 130000, imageUrl: 'https://raw.githubusercontent.com/musta-krakish/ilock-site/master/src/assets/images/locks/s940-max/image.png' },
	{ slug: 's959-max', title: 'S959 Max', brand: 'SmartLock', price: 125000, imageUrl: 'https://raw.githubusercontent.com/musta-krakish/ilock-site/master/src/assets/images/locks/s959-max/image.png' },
	{ slug: 'v6j', title: 'V6J', brand: 'SmartLock', price: 150000, imageUrl: 'https://raw.githubusercontent.com/musta-krakish/ilock-site/master/src/assets/images/locks/v6j/image.png' },
];

const promotionLockPicker = () => {
	const knownSlugs = new Set(promotionLockOptions.map((lock) => lock.slug));
	const parse = (value: unknown): string[] => {
		if (value === undefined) return [];
		if (!Array.isArray(value) || !value.every((item) => typeof item === 'string' && knownSlugs.has(item))) {
			throw new Error('Выберите модели из каталога.');
		}
		return value;
	};

	return {
		kind: 'form' as const,
		label: 'Замки в блоке',
		Input({ value, onChange }: FormFieldInputProps<string[]>) {
			const selected = new Set(value);
			return createElement('div', { style: { display: 'grid', gap: '0.875rem' } }, [
				createElement(
					'p',
					{ key: 'hint', style: { color: 'var(--color-neutral-emphasis, #a3a3a3)', fontSize: '0.875rem', lineHeight: 1.45, margin: 0 } },
					'Нажмите на карточки нужных моделей. Выбранные будут показаны на главной в этом же порядке.',
				),
				createElement(
					'div',
					{ key: 'selected', style: { color: 'var(--color-neutral-emphasis, #a3a3a3)', fontSize: '0.8125rem' } },
					`Выбрано: ${value.length}`,
				),
				createElement(
					'div',
					{
						key: 'options',
						style: {
							display: 'grid',
							gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))',
							gap: '0.75rem',
						},
					},
					promotionLockOptions.map((lock) => {
						const isSelected = selected.has(lock.slug);
						return createElement(
							'button',
							{
								key: lock.slug,
								type: 'button',
								'aria-pressed': isSelected,
								onClick: () => onChange(isSelected ? value.filter((slug) => slug !== lock.slug) : [...value, lock.slug]),
								style: {
									background: isSelected ? 'rgba(229, 174, 29, 0.13)' : 'var(--color-canvas, #1c1c1c)',
									border: `1px solid ${isSelected ? '#e5ae1d' : 'rgba(127, 127, 127, 0.35)'}`,
									borderRadius: '12px',
									color: 'inherit',
									cursor: 'pointer',
									overflow: 'hidden',
									padding: 0,
									textAlign: 'left',
								},
							},
							[
								lock.imageUrl
									? createElement('img', {
										key: 'image', src: lock.imageUrl, alt: '', loading: 'lazy',
										style: { background: '#f5f5f5', display: 'block', height: '110px', objectFit: 'contain', width: '100%' },
									})
									: createElement('div', { key: 'image', style: { alignItems: 'center', background: '#f5f5f5', color: '#777', display: 'flex', height: '110px', justifyContent: 'center' } }, 'Нет фото'),
								createElement('div', { key: 'copy', style: { display: 'grid', gap: '0.3rem', padding: '0.7rem' } }, [
									createElement('span', { key: 'brand', style: { color: '#b9890f', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' } }, lock.brand),
									createElement('span', { key: 'title', style: { fontSize: '0.9375rem', fontWeight: 700, lineHeight: 1.2 } }, lock.title),
									createElement('span', { key: 'price', style: { color: 'var(--color-neutral-emphasis, #a3a3a3)', fontSize: '0.75rem' } }, `${lock.price.toLocaleString('ru-RU')} ₸`),
									createElement('span', { key: 'status', style: { color: isSelected ? '#b9890f' : 'var(--color-neutral-emphasis, #a3a3a3)', fontSize: '0.75rem', fontWeight: 600 } }, isSelected ? '✓ В блоке' : 'Добавить'),
								]),
							],
						);
					}),
				),
			]);
		},
		defaultValue(): string[] {
			return [];
		},
		parse,
		serialize(value: string[]) {
			return { value };
		},
		validate(value: string[]) {
			return value;
		},
		reader: { parse },
	};
};

type CompactOption = { readonly label: string; readonly value: string };

type CompactMultiselectOptions = {
	description?: string;
	columns?: number;
	collapsed?: boolean;
};

const compactMultiselect = (
	label: string,
	options: readonly CompactOption[],
	{ description, columns = 3, collapsed = false }: CompactMultiselectOptions = {},
) => {
	const knownValues = new Set(options.map((option) => option.value));
	const parse = (value: unknown): string[] => {
		if (value === undefined) return [];
		if (!Array.isArray(value) || !value.every((item) => typeof item === 'string' && knownValues.has(item))) {
			throw new Error(`Некорректное значение поля «${label}».`);
		}
		return value;
	};

	return {
		kind: 'form' as const,
		label,
		Input({ value, onChange }: FormFieldInputProps<string[]>) {
			const selected = new Set(value);
			return createElement(
				'details',
				{
					open: !collapsed,
					style: {
						border: '1px solid rgba(127, 127, 127, 0.35)',
						borderRadius: '10px',
						padding: '0.75rem 0.875rem',
					},
				},
				[
					createElement(
						'summary',
						{
							key: 'summary',
							style: {
								cursor: 'pointer',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								gap: '1rem',
								fontWeight: 600,
							},
						},
						[
							createElement('span', { key: 'label' }, label),
							createElement(
								'span',
								{ key: 'count', style: { color: 'var(--color-neutral-emphasis, #a3a3a3)', fontSize: '0.8125rem', fontWeight: 400 } },
								`${value.length} выбрано`,
							),
						],
					),
					description && createElement('p', { key: 'description', style: { margin: '0.75rem 0 0', color: 'var(--color-neutral-emphasis, #a3a3a3)', fontSize: '0.8125rem' } }, description),
					createElement(
						'div',
						{
							key: 'options',
							style: {
								display: 'grid',
								gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
								gap: '0.625rem 1rem',
								marginTop: '0.875rem',
							},
						},
						options.map((option) =>
							createElement(
								'label',
								{ key: option.value, style: { alignItems: 'flex-start', cursor: 'pointer', display: 'flex', gap: '0.5rem', lineHeight: 1.3 } },
								[
									createElement('input', {
										key: 'input',
										type: 'checkbox',
										checked: selected.has(option.value),
										onChange: (event: Event) => {
											const checked = (event.currentTarget as HTMLInputElement).checked;
											onChange(checked ? [...value, option.value] : value.filter((item) => item !== option.value));
										},
									}),
									createElement('span', { key: 'text' }, option.label),
								],
							),
						),
					),
				],
			);
		},
		defaultValue(): string[] {
			return [];
		},
		parse,
		serialize(value: string[]) {
			return { value };
		},
		validate(value: string[]) {
			return value;
		},
		reader: { parse },
	};
};

const translatedCopy = (label: string) =>
	fields.object(
		{
			description: fields.text({
				label: 'Короткое описание',
				multiline: true,
				validation: { isRequired: true },
			}),
			seoTitle: requiredText('SEO title'),
			seoDescription: fields.text({
				label: 'SEO description',
				multiline: true,
				validation: { isRequired: true },
			}),
			body: fields.text({
				label: 'Полное описание',
				multiline: true,
				validation: { isRequired: true },
			}),
		},
		{
			label,
			description: 'Заполните карточку так, как она будет показана на сайте.',
			layout: [12, 6, 6, 12],
		},
	);

const usageLimit = (label: string) =>
	fields.integer({ label, validation: { min: 0 } });

const lockSchema = {
	title: fields.slug({
		name: { label: 'Название модели', validation: { isRequired: true } },
		slug: { label: 'URL / имя файла' },
	}),
	brand: fields.select({ label: 'Бренд', options: options.brand, defaultValue: 'ilock' }),
	kind: fields.select({ label: 'Тип товара', options: options.kind, defaultValue: 'lock' }),
	kazakhBrand: fields.checkbox({ label: 'Казахстанский бренд', defaultValue: false }),
	comingSoon: fields.checkbox({ label: 'Скоро в продаже', defaultValue: false }),
	price: fields.integer({ label: 'Цена от, ₸', validation: { isRequired: true, min: 0 } }),
	priceTo: fields.number({ label: 'Цена до, ₸', description: 'Оставьте пустым для одной цены.' }),
	oldPrice: fields.number({ label: 'Старая цена, ₸', description: 'Будет зачёркнута на карточке во время акции.' }),
	image: fields.image({
		label: 'Фото товара',
		description: 'PNG, JPG или WebP. После загрузки сразу появится миниатюра; файл сохранится в папке этой модели.',
		directory: 'src/assets/images/locks',
		publicPath: '../../assets/images/locks',
		validation: { isRequired: true },
	}),
	order: fields.integer({
		label: 'Порядок в каталоге',
		validation: { isRequired: true, min: 0 },
	}),
	featured: fields.checkbox({ label: 'Показывать как популярный', defaultValue: false }),
	material: fields.select({ label: 'Материал', options: options.material, defaultValue: 'aluminum' }),
	access: compactMultiselect('Способы открытия', options.access, {
		description: 'Выберите доступные способы разблокировки.',
	}),
	limits: fields.object(
		{
			fingerprint: usageLimit('Отпечатки пальцев'),
			pin: usageLimit('Пин-коды'),
			face: usageLimit('Лица'),
			palm: usageLimit('Ладони'),
			card: usageLimit('Карты'),
			key: usageLimit('Ключи'),
			app: usageLimit('Пользователи приложения'),
			'master-card': usageLimit('Мастер-карты'),
			vein: usageLimit('Шаблоны вен'),
		},
		{
			label: 'Лимиты пользователей',
			description: 'Оставьте поле пустым, если лимит для способа доступа не указан.',
			layout: [4, 4, 4, 4, 4, 4, 4, 4, 4],
		},
	),
	features: compactMultiselect('Функции', options.feature, {
		description: 'Список можно раскрыть при необходимости.',
		collapsed: true,
	}),
	temp: fields.object(
		{
			min: fields.integer({ label: 'Минимум, °C', validation: { isRequired: true } }),
			max: fields.integer({ label: 'Максимум, °C', validation: { isRequired: true } }),
		},
		{ label: 'Рабочая температура', layout: [6, 6] },
	),
	power: fields.select({ label: 'Питание', options: options.power, defaultValue: 'aa4' }),
	battery: requiredText('Срок работы, месяцев', 'Например: 4-6 или 10.'),
	app: fields.text({ label: 'Приложение' }),
	compatibility: fields.object(
		{
			ru: fields.text({ label: 'По-русски' }),
			kk: fields.text({ label: 'Қазақша' }),
			en: fields.text({ label: 'In English' }),
		},
		{ label: 'Совместимость', description: 'Необязательное поле для аксессуаров.', layout: [4, 4, 4] },
	),
	included: fields.object(
		{
			ru: fields.text({ label: 'По-русски' }),
			kk: fields.text({ label: 'Қазақша' }),
			en: fields.text({ label: 'In English' }),
		},
		{ label: 'Комплектация', description: 'Необязательное поле для аксессуаров.', layout: [4, 4, 4] },
	),
	warranty: fields.integer({ label: 'Гарантия, лет', validation: { isRequired: true, min: 0 } }),
	origin: fields.object(
		{
			ru: fields.text({ label: 'По-русски' }),
			kk: fields.text({ label: 'Қазақша' }),
			en: fields.text({ label: 'In English' }),
		},
		{ label: 'Страна происхождения', description: 'Необязательное поле.', layout: [4, 4, 4] },
	),
	interface: compactMultiselect('Языки интерфейса', options.interface, { columns: 2, collapsed: true }),
	colors: compactMultiselect('Цвета', options.color, { columns: 2, collapsed: true }),
	variants: fields.array(
		fields.object(
			{
				name: requiredText('Название варианта'),
				price: fields.integer({ label: 'Цена, ₸', validation: { isRequired: true, min: 0 } }),
				height: fields.number({ label: 'Высота, см' }),
				width: fields.number({ label: 'Ширина, см' }),
				depth: fields.number({ label: 'Глубина, см' }),
				weight: fields.number({ label: 'Вес, кг' }),
			},
			{ layout: [12, 6, 3, 3, 3, 3] },
		),
		{
			label: 'Варианты модели',
			itemLabel: (props) => props.fields.name.value || 'Новый вариант',
		},
	),
	ru: translatedCopy('Русский'),
	kk: translatedCopy('Қазақша'),
	en: translatedCopy('English'),
};

const createFaqCollection = (
	lang: 'ru' | 'kk' | 'en',
	label: string,
	langLabel: string,
) =>
	collection({
		label,
		path: `src/content/faq/${lang}/*`,
		slugField: 'question',
		entryLayout: 'content',
		format: { contentField: 'content' },
		previewUrl: `/preview/faq?branch={branch}&lang=${lang}&slug={slug}`,
		columns: ['order', 'lang'],
		schema: {
			lang: fields.select({
				label: 'Язык',
				options: [{ label: langLabel, value: lang }],
				defaultValue: lang,
			}),
			order: fields.integer({
				label: 'Порядок на странице',
				defaultValue: 1,
				validation: { isRequired: true, min: 0 },
			}),
			question: fields.slug({
				name: { label: 'Вопрос', validation: { isRequired: true } },
				slug: { label: 'Имя файла' },
			}),
			content: fields.markdoc({ label: 'Ответ', extension: 'md' }),
		},
	});

const translatedTextFields = (label: string) =>
	fields.object(
		{
			ru: requiredText('По-русски'),
			kk: requiredText('Қазақша'),
			en: requiredText('In English'),
		},
		{ label, layout: [4, 4, 4] },
	);

export default config({
	storage: { kind: 'github', repo: repository },
	locale: 'ru-RU',
	ui: {
		brand: { name: 'iLOCK · управление сайтом' },
		navigation: {
			Главная: ['homePromotions'],
			Каталог: ['locks'],
			Партнёры: ['partners'],
			FAQ: ['faqRu', 'faqKk', 'faqEn'],
		},
	},
	collections: {
		locks: collection({
			label: 'Замки и сейфы',
			path: 'src/content/locks/*',
			slugField: 'title',
			columns: ['image', 'brand', 'kind', 'price', 'comingSoon'],
			previewUrl: '/preview/product?branch={branch}&slug={slug}',
			schema: lockSchema,
		}),
		faqRu: createFaqCollection('ru', 'FAQ — русский', 'Русский'),
		faqKk: createFaqCollection('kk', 'FAQ — қазақша', 'Қазақша'),
		faqEn: createFaqCollection('en', 'FAQ — English', 'English'),
	},
	singletons: {
		homePromotions: singleton({
			label: 'Главная — акционные замки',
			path: 'src/content/home/promotions',
			format: 'yaml',
			schema: {
				promotionLayout: fields.select({
					label: 'Вид блока',
					options: [
						{ label: 'Сетка — 3 карточки в ряд', value: 'grid' },
						{ label: 'Слайдер — горизонтальная прокрутка', value: 'slider' },
					],
					defaultValue: 'grid',
				}),
				promotionLocks: promotionLockPicker(),
			},
		}),
		partners: singleton({
			label: 'Партнёры и документы',
			path: 'src/content/partners/page',
			format: 'yaml',
			schema: {
				certificates: fields.array(
					fields.object(
						{
							image: fields.image({
								label: 'Изображение документа',
								description: 'PNG, JPG или WebP. Можно заменить текущий сертификат или письмо.',
								directory: 'src/assets/images/company',
								publicPath: '../../assets/images/company',
								validation: { isRequired: true },
							}),
							title: translatedTextFields('Название документа'),
						},
						{ layout: [12, 12] },
					),
					{ label: 'Сертификаты и благодарности', itemLabel: (props) => props.fields.title.fields.ru.value || 'Новый документ' },
				),
				projects: fields.array(
					fields.object(
						{
							name: requiredText('Название объекта'),
							city: translatedTextFields('Город'),
							image: fields.image({
								label: 'Фото здания',
								description: 'PNG, JPG или WebP. Для одинаковых карточек лучше использовать горизонтальное фото.',
								directory: 'public/projects/residential',
								publicPath: '/projects/residential',
								validation: { isRequired: true },
							}),
						},
						{ layout: [6, 6, 12] },
					),
					{ label: 'Объекты в портфолио', itemLabel: (props) => props.fields.name.value || 'Новый объект' },
				),
			},
		}),
	},
});
