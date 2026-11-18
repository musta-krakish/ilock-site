interface Window {
	/** Google Tag Manager queue, created in the layout head. */
	dataLayer?: unknown[];
	/** Meta Pixel, loaded in the layout head (absent when the pixel is off). */
	fbq?: (command: 'track' | 'trackCustom' | 'init', event: string, params?: Record<string, unknown>) => void;
}
