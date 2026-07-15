export const site = {
	phones: [
		{ label: '+7 777 300 05 58', tel: '+77773000558' },
		{ label: '+7 705 833 83 33', tel: '+77058338333' },
	],
	email: 'ilock.kz@gmail.com',
	address: 'г. Астана, ул. Куйши Дина, 23/1',
	whatsapp: '77773000558',
	instagram: 'ilock.kz',
	instagramUrl: 'https://instagram.com/ilock.kz',
	hours: { weekdays: '10:00–19:00', weekend: '12:00–16:00' },
	stats: { years: 6, branches: 4, warranty: 2, choiceYear: 2022 },
} as const;

export function whatsappLink(message: string) {
	return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

/**
 * Formats a KZT price, e.g. 180000 -> "180 000 ₸".
 * ru-RU groups digits with U+202F (narrow no-break space), so a price never wraps mid-number.
 */
export function formatPrice(value: number, to?: number) {
	const one = (n: number) => n.toLocaleString('ru-RU');
	return to ? `${one(value)}–${one(to)} ₸` : `${one(value)} ₸`;
}
