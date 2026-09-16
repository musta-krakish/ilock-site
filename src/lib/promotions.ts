import type { Lang } from '../i18n';

type PromotionCandidate = { brand: string; slug: string };

/** iLOCK's own models plus the two models included in the current campaign. */
export function hasGiftInstallation(lock: PromotionCandidate) {
	return lock.brand === 'ilock' || lock.slug === 'ezviz-l2s' || lock.slug === 's940-max';
}

export const promotionCopy: Record<
	Lang,
	{ giftInstallation: string; eyebrow: string; title: string; accent: string; text: string }
> = {
	ru: {
		giftInstallation: 'Установка в подарок',
		eyebrow: 'Акция',
		title: 'Акционные',
		accent: 'замки',
		text: 'Выберите умный замок по акции — профессиональная установка в подарок.',
	},
	kk: {
		giftInstallation: 'Орнату сыйлыққа',
		eyebrow: 'Акция',
		title: 'Акциядағы',
		accent: 'құлыптар',
		text: 'Акциядағы ақылды құлыпты таңдаңыз — кәсіби орнату сыйлыққа.',
	},
	en: {
		giftInstallation: 'Installation included',
		eyebrow: 'Offer',
		title: 'Special offer',
		accent: 'locks',
		text: 'Choose a smart lock on offer and get professional installation included.',
	},
};
