#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import PDFDocument from 'pdfkit';
import sharp from 'sharp';
import YAML from 'yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
const contentDir = path.join(root, 'src/content/locks');
const outFile = path.join(root, 'public/catalog.pdf');
const imageCacheDir = path.join(root, '.astro/pdf-catalog-images');

const brandOrder = ['ilock', 'philips', 'smartlock', 'safes'];
const brandNames = {
	ilock: 'iLock',
	philips: 'Philips',
	smartlock: 'Smartlock',
	safes: 'Philips Safe',
};

const specs = {
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
		face: 'Face ID',
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
};

const formatPrice = (value, to) => {
	const one = (n) => Number(n).toLocaleString('ru-RU');
	return to ? `${one(value)}–${one(to)} ₸` : `${one(value)} ₸`;
};

const parseFrontmatter = (file) => {
	const raw = fs.readFileSync(file, 'utf8');
	const match = raw.match(/^---\n([\s\S]*?)\n---/);
	if (!match) throw new Error(`No frontmatter in ${file}`);
	return YAML.parse(match[1]);
};

const resolveImage = (file, image) => path.resolve(path.dirname(file), image);

const productFiles = fs
	.readdirSync(contentDir)
	.filter((name) => name.endsWith('.md'))
	.map((name) => path.join(contentDir, name));

const products = productFiles
	.map((file) => {
		const data = parseFrontmatter(file);
		return {
			...data,
			slug: path.basename(file, '.md'),
			imagePath: resolveImage(file, data.image),
			description: data.ru?.description ?? '',
			body: data.ru?.body ?? '',
		};
	})
	.sort(
		(a, b) =>
			brandOrder.indexOf(a.brand) - brandOrder.indexOf(b.brand) ||
			(a.order ?? 0) - (b.order ?? 0) ||
			a.title.localeCompare(b.title),
	);

fs.mkdirSync(imageCacheDir, { recursive: true });
await Promise.all(
	products.map(async (product) => {
		const out = path.join(imageCacheDir, `${product.slug}.jpg`);
		await sharp(product.imagePath)
			.resize(900, 900, { fit: 'contain', background: '#D1D1D1' })
			.flatten({ background: '#D1D1D1' })
			.jpeg({ quality: 88, mozjpeg: true })
			.toFile(out);
		product.pdfImagePath = out;
	}),
);

const page = { size: 'A4', layout: 'landscape', margin: 34 };
const doc = new PDFDocument({
	size: page.size,
	layout: page.layout,
	margin: page.margin,
	info: {
		Title: 'iLOCK product catalog',
		Author: 'iLOCK',
		Subject: 'Умные замки и сейфы iLOCK',
	},
});

fs.mkdirSync(path.dirname(outFile), { recursive: true });
doc.pipe(fs.createWriteStream(outFile));

const fontDir = path.join(__dirname, 'fonts');
doc.registerFont('Noto', path.join(fontDir, 'NotoSans-Regular.ttf'));
doc.registerFont('NotoBold', path.join(fontDir, 'NotoSans-Bold.ttf'));

const colors = {
	bg: '#100E0E',
	panel: '#171414',
	line: '#2A2424',
	soft: '#8F8580',
	text: '#FFFFFF',
	muted: '#BEB7B2',
	accent: '#F6B51B',
};

const W = doc.page.width;
const H = doc.page.height;
const M = page.margin;

const text = (value, x, y, options = {}) => {
	const { font = 'Noto', size = 10, color = colors.text, ...rest } = options;
	doc.font(font).fontSize(size).fillColor(color).text(String(value), x, y, rest);
};

const pill = (label, x, y, maxWidth = 128) => {
	const w = Math.min(maxWidth, doc.widthOfString(label) + 18);
	doc.roundedRect(x, y, w, 18, 9).strokeColor(colors.line).lineWidth(0.8).stroke();
	text(label, x + 9, y + 4.3, { size: 7.8, color: colors.muted, width: w - 18, lineBreak: false });
	return w;
};

const drawHeader = (title, pageNo) => {
	doc.rect(0, 0, W, H).fill(colors.bg);
	text('iLOCK', M, 22, { font: 'NotoBold', size: 15, color: colors.accent });
	text(title, M + 70, 25, { size: 8.8, color: colors.soft });
	text(String(pageNo), W - M - 28, 25, { size: 8.8, color: colors.soft, align: 'right', width: 28 });
	doc.moveTo(M, 48).lineTo(W - M, 48).strokeColor(colors.line).lineWidth(0.8).stroke();
};

const drawLightHeader = (title, pageNo) => {
	doc.rect(0, 0, W, H).fill('#FFFFFF');
	text('iLOCK', M, 22, { font: 'NotoBold', size: 15, color: colors.accent });
	text(title, M + 70, 25, { size: 8.8, color: '#7C7470' });
	text(String(pageNo), W - M - 28, 25, { size: 8.8, color: '#7C7470', align: 'right', width: 28 });
	doc.moveTo(M, 48).lineTo(W - M, 48).strokeColor('#E4DFDC').lineWidth(0.8).stroke();
};

const drawCover = () => {
	doc.rect(0, 0, W, H).fill(colors.bg);
	doc.rect(0, 0, W, H).fillOpacity(0.09).fill(colors.accent).fillOpacity(1);
	text('iLOCK', M, 56, { font: 'NotoBold', size: 26, color: colors.accent });
	text('Product Catalog', M, 120, { font: 'NotoBold', size: 58, color: colors.text });
	text('Умные замки и сейфы Philips Smart Safe в Казахстане', M, 198, {
		size: 19,
		color: colors.muted,
		width: 500,
		lineGap: 5,
	});
	text('Рассрочка Kaspi · Гарантия до 24 месяцев · Доставка по Казахстану', M, 292, {
		size: 12,
		color: colors.accent,
		width: 520,
	});
	const hero = products.find((p) => p.slug === 'v81') ?? products[0];
	if (hero?.pdfImagePath && fs.existsSync(hero.pdfImagePath)) {
		doc.image(hero.pdfImagePath, W - 300, 86, { fit: [220, 330], align: 'center', valign: 'center' });
	}
	text(`Обновлено при сборке: ${new Date().toLocaleDateString('ru-RU')}`, M, H - 74, {
		size: 9,
		color: colors.soft,
	});
	text('ilock.kz · +7 777 300 05 58 · +7 705 833 83 33', M, H - 52, {
		font: 'NotoBold',
		size: 11,
		color: colors.text,
	});
};

const grouped = () =>
	brandOrder
		.map((brand) => ({ brand, items: products.filter((p) => p.brand === brand) }))
		.filter((group) => group.items.length > 0);

const drawContents = () => {
	doc.addPage();
	drawHeader('Содержание', 2);
	text('Каталог', M, 72, { font: 'NotoBold', size: 28 });
	let y = 130;
	grouped().forEach((group) => {
		const prices = group.items.map((item) => item.price);
		const min = Math.min(...prices);
		const max = Math.max(...prices);
		doc.roundedRect(M, y, W - M * 2, 72, 12).fill(colors.panel).strokeColor(colors.line).lineWidth(0.8).stroke();
		text(brandNames[group.brand], M + 22, y + 17, { font: 'NotoBold', size: 17, color: colors.accent });
		text(`${group.items.length} моделей`, M + 22, y + 43, { size: 10, color: colors.muted });
		text(formatPrice(min, min === max ? undefined : max), W - M - 250, y + 26, {
			font: 'NotoBold',
			size: 17,
			color: colors.text,
			width: 228,
			align: 'right',
		});
		y += 90;
	});
};

const drawCatalogPages = () => {
	let pageNo = 3;
	const perPage = 6;
	const gap = 14;
	const cardW = (W - M * 2 - gap * 2) / 3;
	const cardH = 216;
	const imageSize = 90;
	for (let i = 0; i < products.length; i += perPage) {
		doc.addPage();
		drawLightHeader('Каталог товаров', pageNo++);
		products.slice(i, i + perPage).forEach((product, index) => {
			const col = index % 3;
			const row = Math.floor(index / 3);
			const x = M + col * (cardW + gap);
			const y = 72 + row * (cardH + 18);
			const imageX = x + 14;
			const imageY = y + 52;
			const textX = x + 116;

			doc.roundedRect(x, y, cardW, cardH, 8).fill('#F8F6F4').strokeColor('#E4DFDC').lineWidth(0.8).stroke();
			doc.roundedRect(imageX, imageY, imageSize, imageSize, 7).fill('#E1DEDB');
			if (product.pdfImagePath && fs.existsSync(product.pdfImagePath)) {
				doc.image(product.pdfImagePath, imageX + 4, imageY + 4, {
					fit: [imageSize - 8, imageSize - 8],
					align: 'center',
					valign: 'center',
				});
			}

			text(brandNames[product.brand], x + 14, y + 14, { font: 'NotoBold', size: 8, color: colors.accent, width: cardW - 28 });
			text(product.title, x + 14, y + 28, { font: 'NotoBold', size: 15, color: '#171414', width: cardW - 28, height: 19 });
			text(product.description, textX, y + 54, {
				size: 7.7,
				color: '#4F4743',
				width: cardW - 130,
				height: 45,
				lineGap: 1,
			});
			text(
				(product.access ?? [])
					.map((key) => specs.access[key] ?? key)
					.slice(0, 3)
					.join(' · '),
				textX,
				y + 107,
				{ size: 7.1, color: '#7C7470', width: cardW - 130, height: 36, lineGap: 1 },
			);
			text(formatPrice(product.price, product.priceTo), x + 14, y + cardH - 38, {
				font: 'NotoBold',
				size: 14,
				color: '#171414',
				width: cardW - 28,
			});
		});
	}
	return pageNo;
};

const drawSafeVariantPages = (startPageNo) => {
	let pageNo = startPageNo;
	const safes = products.filter((p) => p.kind === 'safe' && p.variants?.length);
	if (safes.length === 0) return pageNo;
	doc.addPage();
	drawHeader('Варианты сейфов', pageNo++);
	text('Размеры и цены Philips Smart Safe', M, 74, { font: 'NotoBold', size: 24 });
	let y = 118;
	safes.forEach((safe) => {
		if (y > H - 120) {
			doc.addPage();
			drawHeader('Варианты сейфов', pageNo++);
			y = 74;
		}
		if (safe.pdfImagePath && fs.existsSync(safe.pdfImagePath)) {
			doc.roundedRect(M, y, 58, 58, 7).fill(colors.panel).strokeColor(colors.line).lineWidth(0.8).stroke();
			doc.image(safe.pdfImagePath, M + 4, y + 4, { fit: [50, 50], align: 'center', valign: 'center' });
		}
		text(safe.title, M + 72, y + 1, { font: 'NotoBold', size: 13.5, color: colors.accent });
		text(formatPrice(safe.price, safe.priceTo), W - M - 180, y, {
			font: 'NotoBold',
			size: 12,
			color: colors.text,
			width: 180,
			align: 'right',
		});
		y += 24;
		const cols = [M + 72, M + 164, M + 292, M + 444, M + 558];
		['Модель', 'Цена', 'Размеры, см', 'Вес', 'Доступ'].forEach((head, i) =>
			text(head, cols[i], y, { font: 'NotoBold', size: 8.3, color: colors.soft }),
		);
		y += 15;
		safe.variants.forEach((v) => {
			const dims = v.height && v.width && v.depth ? `${v.height} × ${v.width} × ${v.depth}` : '—';
			const access = (safe.access ?? []).map((key) => specs.access[key] ?? key).join(' / ');
			text(v.name, cols[0], y, { size: 8.5, color: colors.text });
			text(formatPrice(v.price), cols[1], y, { size: 8.5, color: colors.text });
			text(dims, cols[2], y, { size: 8.5, color: colors.muted });
			text(v.weight ? `${v.weight} кг` : '—', cols[3], y, { size: 8.5, color: colors.muted });
			text(access, cols[4], y, { size: 8.5, color: colors.muted, width: 260 });
			y += 16;
		});
		y += 18;
	});
	return pageNo;
};

drawCover();
drawContents();
const nextPage = drawCatalogPages();
drawSafeVariantPages(nextPage);
doc.end();

console.log(`Generated ${path.relative(root, outFile)} (${products.length} products)`);
