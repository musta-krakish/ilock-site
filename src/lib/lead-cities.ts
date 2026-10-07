/**
 * Cities offered in the lead form. `id` is the enum id of the «Город» lead field
 * in amoCRM (field 276901), so a chosen city lands in the deal as a proper value.
 * Astana and Almaty (our branches) go first; the rest follow alphabetically.
 */
export const leadCities = [
	{ id: 149735, ru: 'Астана', kk: 'Астана', en: 'Astana' },
	{ id: 149737, ru: 'Алматы', kk: 'Алматы', en: 'Almaty' },
	{ id: 11384615, ru: 'Алатау', kk: 'Алатау', en: 'Alatau' },
	{ id: 159931, ru: 'Актобе', kk: 'Ақтөбе', en: 'Aktobe' },
	{ id: 11386861, ru: 'Актау', kk: 'Ақтау', en: 'Aktau' },
	{ id: 11386857, ru: 'Атырау', kk: 'Атырау', en: 'Atyrau' },
	{ id: 11386871, ru: 'Жезказган', kk: 'Жезқазған', en: 'Zhezkazgan' },
	{ id: 11384617, ru: 'Караганда', kk: 'Қарағанды', en: 'Karaganda' },
	{ id: 11385629, ru: 'Кокшетау', kk: 'Көкшетау', en: 'Kokshetau' },
	{ id: 11386859, ru: 'Костанай', kk: 'Қостанай', en: 'Kostanay' },
	{ id: 11386863, ru: 'Кызылорда', kk: 'Қызылорда', en: 'Kyzylorda' },
	{ id: 11385631, ru: 'Павлодар', kk: 'Павлодар', en: 'Pavlodar' },
	{ id: 11386865, ru: 'Петропавловск', kk: 'Петропавл', en: 'Petropavlovsk' },
	{ id: 11386855, ru: 'Семей', kk: 'Семей', en: 'Semey' },
	{ id: 11386867, ru: 'Талдыкорган', kk: 'Талдықорған', en: 'Taldykorgan' },
	{ id: 11386529, ru: 'Тараз', kk: 'Тараз', en: 'Taraz' },
	{ id: 11386869, ru: 'Туркестан', kk: 'Түркістан', en: 'Turkistan' },
	{ id: 11386521, ru: 'Уральск', kk: 'Орал', en: 'Uralsk' },
	{ id: 11386853, ru: 'Усть-Каменогорск', kk: 'Өскемен', en: 'Ust-Kamenogorsk' },
	{ id: 11384619, ru: 'Шымкент', kk: 'Шымкент', en: 'Shymkent' },
	{ id: 11386873, ru: 'Экибастуз', kk: 'Екібастұз', en: 'Ekibastuz' },
] as const;

/** Form value for "another city": the deal is created without the «Город» field. */
export const otherCity = 'other';
