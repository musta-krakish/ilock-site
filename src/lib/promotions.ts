import type { Lang } from '../i18n';

type PromotionCandidate = { kind?: string; giftInstallation?: boolean };

/** Set per product in Keystatic («Установка в подарок»). */
export function hasGiftInstallation(lock: PromotionCandidate) {
	// Installation applies to locks and safes, never to accessories.
	return lock.kind !== 'accessory' && Boolean(lock.giftInstallation);
}

export const promotionCopy: Record<
	Lang,
	{ giftInstallation: string; eyebrow: string; title: string; accent: string; text: string }
> = {
	ru: {
		giftInstallation: 'Установка в подарок',
		eyebrow: 'Акция',
		title: 'Все',
		accent: 'включено',
		text: 'Выберите умный замок по акции — профессиональная установка в подарок.',
	},
	kk: {
		giftInstallation: 'Орнату сыйлыққа',
		eyebrow: 'Акция',
		title: 'Бәрі',
		accent: 'қамтылған',
		text: 'Акциядағы ақылды құлыпты таңдаңыз — кәсіби орнату сыйлыққа.',
	},
	en: {
		giftInstallation: 'Installation included',
		eyebrow: 'Offer',
		title: 'All',
		accent: 'inclusive',
		text: 'Choose a smart lock on offer and get professional installation included.',
	},
};
