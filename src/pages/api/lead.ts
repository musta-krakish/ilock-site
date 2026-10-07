import type { APIRoute } from 'astro';
import { createUnsortedLead, isAmoConfigured, type Utm } from '../../lib/amocrm';
import { leadCities, otherCity } from '../../lib/lead-cities';

export const prerender = false;

const json = (status: number, body: Record<string, unknown>) =>
	new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

// A light per-IP limit; amoCRM's «Неразобранное» is the real spam filter.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const recent = new Map<string, number[]>();

function isRateLimited(ip: string) {
	const now = Date.now();
	const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
	hits.push(now);
	recent.set(ip, hits);
	if (recent.size > 5000) recent.clear();
	return hits.length > MAX_PER_WINDOW;
}

/** Kazakhstan numbers (the form masks +7): 8XXXXXXXXXX and XXXXXXXXXX become +7XXXXXXXXXX. */
function normalisePhone(raw: string) {
	let digits = raw.replace(/\D/g, '');
	if (digits.length === 11 && digits.startsWith('8')) digits = `7${digits.slice(1)}`;
	if (digits.length === 10) digits = `7${digits}`;
	return /^7\d{10}$/.test(digits) ? `+${digits}` : null;
}

const text = (value: unknown, max: number) => (typeof value === 'string' ? value.trim().slice(0, max) : '');

export const POST: APIRoute = async ({ request, clientAddress }) => {
	let data: Record<string, unknown>;
	try {
		data = await request.json();
	} catch {
		return json(400, { error: 'invalid' });
	}

	// Honeypot: the field is hidden from people, bots fill it in. Pretend success.
	if (text(data.website, 200)) return json(200, { ok: true });

	const name = text(data.name, 80);
	const phone = normalisePhone(text(data.phone, 40));
	const city = text(data.city, 20);
	const cityId = leadCities.find((c) => String(c.id) === city)?.id;
	if (!name || !phone || (!cityId && city !== otherCity)) return json(400, { error: 'invalid' });

	const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || clientAddress;
	if (ip && isRateLimited(ip)) return json(429, { error: 'rate_limited' });

	if (!isAmoConfigured()) {
		console.error('[lead] amoCRM is not configured: set TOKEN and CRM_URL');
		return json(503, { error: 'unavailable' });
	}

	const rawUtm = data.utm && typeof data.utm === 'object' ? (data.utm as Record<string, unknown>) : {};
	const utm: Utm = {};
	for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const) {
		const value = text(rawUtm[key], 200);
		if (value) utm[key] = value;
	}

	try {
		await createUnsortedLead({
			name,
			phone,
			cityId,
			page: text(data.page, 500) || request.headers.get('referer') || '',
			utm,
			ip,
			referer: text(data.referrer, 500) || undefined,
		});
		return json(200, { ok: true });
	} catch (error) {
		console.error('[lead] failed to send to amoCRM', error);
		return json(502, { error: 'crm' });
	}
};
