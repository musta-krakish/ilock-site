interface Window {
	/** Meta Pixel, loaded in the layout head (absent when the pixel is off). */
	fbq?: (command: 'track' | 'trackCustom' | 'init', event: string, params?: Record<string, unknown>) => void;
}
