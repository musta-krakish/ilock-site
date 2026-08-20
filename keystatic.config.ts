import { collection, config, fields, type FormFieldInputProps } from '@keystatic/core';
import { createElement } from 'react';

const repository = 'musta-krakish/ilock-site';

const options = {
	brand: [
		{ label: 'iLOCK', value: 'ilock' },
		{ label: 'Philips', value: 'philips' },
		{ label: 'Smartlock', value: 'smartlock' },
		{ label: 'Сейфы Philips', value: 'safes' },
		{ label: 'Tiger', value: 'tiger' },
	],
	kind: [
		{ label: 'Умный замок', value: 'lock' },
		{ label: 'Сейф', value: 'safe' },
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

export default config({
	storage: { kind: 'github', repo: repository },
	locale: 'ru-RU',
	ui: {
		brand: { name: 'iLOCK · управление сайтом' },
		navigation: {
			Каталог: ['locks'],
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
});
