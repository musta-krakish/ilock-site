export interface YouTubeVideo {
	id: string;
	/** Shorts are 9:16; everything else is 16:9. */
	vertical: boolean;
}

const HOSTS = new Set(['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be', 'www.youtube-nocookie.com']);
const ID = /^[A-Za-z0-9_-]{11}$/;

/**
 * Understands the links editors paste: youtube.com/shorts/ID, /watch?v=ID, /embed/ID,
 * /live/ID and youtu.be/ID. Returns null for anything else.
 */
export function parseYouTubeUrl(url: string): YouTubeVideo | null {
	let parsed: URL;
	try {
		parsed = new URL(url.trim());
	} catch {
		return null;
	}
	if (!HOSTS.has(parsed.hostname)) return null;

	const [first = '', second = ''] = parsed.pathname.split('/').filter(Boolean);
	const id =
		parsed.hostname === 'youtu.be'
			? first
			: first === 'watch'
				? (parsed.searchParams.get('v') ?? '')
				: ['shorts', 'embed', 'live'].includes(first)
					? second
					: '';
	return ID.test(id) ? { id, vertical: first === 'shorts' } : null;
}
