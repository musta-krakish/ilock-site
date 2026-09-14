import type { Lang } from '../i18n';

export const privacyPageCopy: Record<Lang, { eyebrow: string; title: string; description: string }> = {
	ru: {
		eyebrow: 'Правовая информация',
		title: 'Политика конфиденциальности и обработки персональных данных',
		description: 'Политика конфиденциальности и обработки персональных данных iLOCK.',
	},
	kk: {
		eyebrow: 'Құқықтық ақпарат',
		title: 'Құпиялылық және дербес деректерді өңдеу саясаты',
		description: 'iLOCK құпиялылық және дербес деректерді өңдеу саясаты.',
	},
	en: {
		eyebrow: 'Legal information',
		title: 'Privacy and personal data processing policy',
		description: 'iLOCK privacy and personal data processing policy.',
	},
};
