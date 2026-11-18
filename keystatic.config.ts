import { collection, config, fields, singleton, type FormFieldInputProps } from '@keystatic/core';
import { createElement } from 'react';

const repository = 'musta-krakish/ilock-site';

const options = {
	kind: [
		{ label: 'Умный замок', value: 'lock' },
		{ label: 'Сейф', value: 'safe' },
		{ label: 'Прочее / аксессуар', value: 'accessory' },
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

const reviewFields = () =>
	fields.object(
		{
			name: requiredText('Имя'),
			city: fields.text({ label: 'Город' }),
			rating: fields.select({
				label: 'Оценка',
				options: [
					{ label: '★★★★★ 5', value: '5' },
					{ label: '★★★★ 4', value: '4' },
					{ label: '★★★ 3', value: '3' },
					{ label: '★★ 2', value: '2' },
					{ label: '★ 1', value: '1' },
				],
				defaultValue: '5',
			}),
			date: fields.date({ label: 'Дата', defaultValue: { kind: 'today' } }),
			text: fields.text({ label: 'Текст отзыва', multiline: true, validation: { isRequired: true } }),
		},
		{ layout: [6, 6, 6, 6, 12] },
	);

const reviewItemLabel = (props: { fields: { name: { value: string }; rating: { value: string } } }) =>
	`${props.fields.name.value || 'Новый отзыв'} — ${'★'.repeat(Number(props.fields.rating.value) || 0)}`;

const headingLanguage = (lang: string) =>
	fields.object(
		{
			eyebrow: fields.text({ label: 'Надпись над заголовком' }),
			title: fields.text({ label: 'Заголовок' }),
			accent: fields.text({ label: 'Золотая часть заголовка', description: 'Идёт сразу после заголовка, выделена золотым.' }),
			text: fields.text({ label: 'Описание', multiline: true }),
		},
		{ label: lang, layout: [4, 4, 4, 12] },
	);

/** Section heading per language; an empty field keeps the site's built-in text. */
const sectionHeadingFields = (label: string) =>
	fields.object(
		{ ru: headingLanguage('По-русски'), kk: headingLanguage('Қазақша'), en: headingLanguage('In English') },
		{ label, description: 'Пустое поле — останется текст по умолчанию.' },
	);

const lockSchema = {
	title: fields.slug({
		name: { label: 'Название модели', validation: { isRequired: true } },
		slug: { label: 'URL / имя файла' },
	}),
	brand: fields.relationship({
		label: 'Бренд',
		description: 'Новый бренд добавляется в «Справочники → Бренды».',
		collection: 'brands',
		validation: { isRequired: true },
	}),
	kind: fields.select({ label: 'Тип товара', options: options.kind, defaultValue: 'lock' }),
	kazakhBrand: fields.checkbox({ label: 'Казахстанский бренд', defaultValue: false }),
	comingSoon: fields.checkbox({ label: 'Скоро в продаже', defaultValue: false }),
	price: fields.integer({ label: 'Цена от, ₸', validation: { isRequired: true, min: 0 } }),
	priceTo: fields.integer({
		label: 'Цена до, ₸',
		description: 'Только для диапазона цен (больше «Цены от»). Оставьте пустым для одной цены.',
		validation: { min: 0 },
	}),
	oldPrice: fields.integer({
		label: 'Старая цена, ₸',
		description: 'Будет зачёркнута на карточке во время акции. Должна быть больше «Цены от».',
		validation: { min: 0 },
	}),
	installment: fields.object(
		{
			monthly: fields.integer({
				label: 'Платёж Kaspi в месяц, ₸',
				description: 'Оставьте пустым — посчитается автоматически: цена ÷ срок.',
				validation: { min: 0 },
			}),
			months: fields.integer({ label: 'Срок Kaspi, мес', defaultValue: 12, validation: { min: 1 } }),
			kaspi: fields.checkbox({ label: 'Показывать рассрочку Kaspi', defaultValue: true }),
			longTerm: fields.checkbox({ label: 'Показывать «Рассрочка до 24 месяцев»', defaultValue: true }),
		},
		{
			label: 'Рассрочка',
			description: 'Платёж в месяц относится к основной цене. Для цветов с другой ценой он считается автоматически.',
			layout: [6, 6, 6, 6],
		},
	),
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
	giftInstallation: fields.checkbox({
		label: 'Установка в подарок',
		description: 'Показывает плашку «Установка в подарок» на карточке и странице товара. Для аксессуаров не отображается.',
		defaultValue: false,
	}),
	construction: fields.select({
		label: 'Конструкция',
		description: 'Для тегов каталога «С ручкой» / «Без ручки».',
		options: [
			{ label: 'Не указано', value: 'unknown' },
			{ label: 'С ручкой', value: 'lever' },
			{ label: 'Без ручки', value: 'none' },
		],
		defaultValue: 'unknown',
	}),
	material: fields.relationship({ label: 'Материал', collection: 'materials', validation: { isRequired: true } }),
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
	features: fields.multiRelationship({ label: 'Функции', collection: 'features' }),
	temp: fields.object(
		{
			min: fields.integer({ label: 'Минимум, °C', validation: { isRequired: true } }),
			max: fields.integer({ label: 'Максимум, °C', validation: { isRequired: true } }),
		},
		{ label: 'Рабочая температура', layout: [6, 6] },
	),
	power: fields.relationship({
		label: 'Питание',
		description: 'Новый вариант добавляется в «Справочники → Питание».',
		collection: 'power',
		validation: { isRequired: true },
	}),
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
	interface: fields.multiRelationship({ label: 'Языки интерфейса', collection: 'interfaces' }),
	colors: fields.multiRelationship({ label: 'Цвета', collection: 'colors' }),
	tags: fields.multiRelationship({
		label: 'Теги каталога',
		description: 'Ручные теги для быстрого подбора, например «Под ключ». Список — в «Справочники → Теги каталога».',
		collection: 'catalogTags',
	}),
	colorPrices: fields.array(
		fields.object(
			{
				color: fields.relationship({ label: 'Цвет', collection: 'colors', validation: { isRequired: true } }),
				price: fields.integer({ label: 'Цена в этом цвете, ₸', validation: { isRequired: true, min: 0 } }),
				image: fields.image({
					label: 'Фото в этом цвете',
					description: 'Необязательно. Если пусто — показывается основное фото.',
					directory: 'src/assets/images/locks',
					publicPath: '../../assets/images/locks',
				}),
			},
			{ layout: [6, 6, 12] },
		),
		{
			label: 'Цены по цветам',
			description:
				'Для цветов, которые стоят иначе, чем «Цена от». Цвет также должен быть отмечен в поле «Цвета». На странице товара появится выбор цвета.',
			itemLabel: (props) => {
				const color = props.fields.color.value ?? 'Цвет';
				return `${color} — ${(props.fields.price.value ?? 0).toLocaleString('ru-RU')} ₸`;
			},
		},
	),
	videos: fields.array(fields.url({ label: 'Ссылка на YouTube' }), {
		label: 'Видео с YouTube',
		description: 'Ссылки вида youtube.com/shorts/…, youtube.com/watch?v=… или youtu.be/…. Видео появятся на странице товара.',
		itemLabel: (props) => props.value || 'Новое видео',
	}),
	reviews: fields.array(reviewFields(), {
		label: 'Отзывы',
		description: 'Отзывы покупателей об этой модели. Показываются на странице товара как есть, на всех языках.',
		itemLabel: reviewItemLabel,
	}),
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


/**
 * Dictionaries: lists a lock picks from (brands, power, colours…). Adding an entry here makes
 * it available in the lock form; the file name is the key stored in the lock.
 */
const dictionaryFields = {
	name: fields.slug({
		name: { label: 'Название (по-русски)', validation: { isRequired: true } },
		slug: { label: 'Код', description: 'Латиницей, без пробелов. После сохранения не меняйте — по нему товары ссылаются на запись.' },
	}),
	kk: fields.text({ label: 'Қазақша', description: 'Пусто — будет показано русское название.' }),
	en: fields.text({ label: 'English', description: 'Пусто — будет показано русское название.' }),
	order: fields.integer({ label: 'Порядок', description: 'Меньше — выше в списках.', defaultValue: 100 }),
};

const dictionaryCollection = (label: string, dir: string, extra: Record<string, any> = {}) =>
	collection({
		label,
		path: `src/content/dictionaries/${dir}/*`,
		slugField: 'name',
		columns: ['order'],
		schema: { ...dictionaryFields, ...extra },
	});

const brandCopy = (label: string) =>
	fields.object(
		{
			h1: requiredText('Заголовок страницы бренда'),
			lead: fields.text({ label: 'Описание под заголовком', multiline: true, validation: { isRequired: true } }),
			seoTitle: requiredText('SEO title'),
			seoDescription: fields.text({ label: 'SEO description', multiline: true, validation: { isRequired: true } }),
		},
		{ label },
	);

const tagInfoFields = (label: string) =>
	fields.object(
		{
			items: fields.text({ label: 'Пункты списка', description: 'Каждый пункт с новой строки.', multiline: true }),
			footer: fields.text({ label: 'Итоговая строка внизу окна' }),
		},
		{ label },
	);

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
			Главная: ['homePromotions', 'homeReviews'],
			Каталог: ['locks', 'catalogSettings'],
			Справочники: ['brands', 'power', 'colors', 'materials', 'features', 'interfaces', 'catalogTags'],
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
		brands: collection({
			label: 'Бренды',
			path: 'src/content/dictionaries/brands/*',
			slugField: 'name',
			columns: ['order'],
			schema: {
				name: fields.slug({
					name: { label: 'Название бренда', validation: { isRequired: true } },
					slug: { label: 'Код и адрес страницы', description: 'Латиницей: страница будет /catalog/<код>/. После сохранения не меняйте.' },
				}),
				order: fields.integer({ label: 'Порядок', description: 'Меньше — выше в каталоге и меню.', defaultValue: 100 }),
				ru: brandCopy('Страница бренда — русский'),
				kk: brandCopy('Страница бренда — қазақша'),
				en: brandCopy('Страница бренда — English'),
			},
		}),
		power: dictionaryCollection('Питание', 'power'),
		colors: dictionaryCollection('Цвета', 'colors', {
			swatch: fields.text({
				label: 'Цвет кружка',
				description: 'CSS-цвет для кнопки выбора цвета, например #111111 или linear-gradient(135deg, #f3d27a, #b8862b).',
				defaultValue: '#888888',
			}),
			filterGroup: fields.select({
				label: 'Группа в фильтре каталога',
				options: [
					{ label: 'Серый', value: 'gray' },
					{ label: 'Чёрный', value: 'black' },
					{ label: 'Бронза', value: 'bronze' },
					{ label: 'Золотой', value: 'gold' },
					{ label: 'Не показывать в фильтре', value: 'none' },
				],
				defaultValue: 'none',
			}),
		}),
		materials: dictionaryCollection('Материалы', 'materials'),
		features: dictionaryCollection('Функции', 'features'),
		interfaces: dictionaryCollection('Языки интерфейса', 'interfaces'),
		catalogTags: dictionaryCollection('Теги каталога', 'tags', {
			group: fields.select({
				label: 'Группа тегов',
				options: [
					{ label: 'Выгода', value: 'offer' },
					{ label: 'Функции', value: 'function' },
					{ label: 'Конструкция', value: 'construction' },
				],
				defaultValue: 'offer',
			}),
			info: fields.object(
				{
					ru: tagInfoFields('Русский'),
					kk: tagInfoFields('Қазақша'),
					en: tagInfoFields('English'),
				},
				{
					label: 'Окно «i» с описанием',
					description: 'Необязательно. Если заполнены пункты на русском, рядом с тегом появится кнопка «i». Пустые kk/en — покажется русский текст.',
				},
			),
		}),
		faqRu: createFaqCollection('ru', 'FAQ — русский', 'Русский'),
		faqKk: createFaqCollection('kk', 'FAQ — қазақша', 'Қазақша'),
		faqEn: createFaqCollection('en', 'FAQ — English', 'English'),
	},
	singletons: {
		catalogSettings: singleton({
			label: 'Каталог — бюджеты в быстром подборе',
			path: 'src/content/settings/catalog',
			format: 'yaml',
			schema: {
				budgets: fields.array(
					fields.object(
						{
							ru: requiredText('Название (по-русски)'),
							kk: requiredText('Қазақша'),
							en: requiredText('English'),
							min: fields.integer({ label: 'Цена от, ₸', description: 'Пусто — без нижней границы.' }),
							max: fields.integer({ label: 'Цена до, ₸', description: 'Пусто — без верхней границы. Границы включительно.' }),
						},
						{ layout: [4, 4, 4, 6, 6] },
					),
					{
						label: 'Теги бюджета',
						description: 'Диапазоны могут пересекаться: замок попадает во все, куда подходит его цена.',
						itemLabel: (props) => props.fields.ru.value || 'Новый диапазон',
					},
				),
			},
		}),
		homePromotions: singleton({
			label: 'Главная — акционные замки',
			path: 'src/content/home/promotions',
			format: 'yaml',
			schema: {
				heading: sectionHeadingFields('Заголовок и описание блока'),
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
		homeReviews: singleton({
			label: 'Главная — отзывы клиентов',
			path: 'src/content/home/reviews',
			format: 'yaml',
			schema: {
				heading: sectionHeadingFields('Заголовок и описание блока'),
				reviews: fields.array(reviewFields(), {
					label: 'Отзывы',
					description: 'Общие отзывы о магазине и установке. Блок появляется на главной, когда есть хотя бы один отзыв.',
					itemLabel: reviewItemLabel,
				}),
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
