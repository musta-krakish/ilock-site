import { CRM_URL, TOKEN } from 'astro:env/server';

/**
 * Site leads go to «Неразобранное» of the «Первичная Замки» pipeline, the same place
 * the old amoCRM form used: a manager accepts or declines each one, so spam never
 * turns into deals, and amoCRM checks for duplicate contacts on acceptance.
 */
const PIPELINE_ID = 11221550;
const CITY_FIELD_ID = 276901;
const UTM_FIELDS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;

export type Utm = Partial<Record<(typeof UTM_FIELDS)[number], string>>;

export interface Lead {
	name: string;
	/** Normalised, e.g. `+77001234567`. */
	phone: string;
	/** amoCRM enum id of the «Город» field; omitted for "another city". */
	cityId?: number;
	page: string;
	utm: Utm;
	ip?: string;
	referer?: string;
}

export const isAmoConfigured = () => Boolean(TOKEN && CRM_URL);

export async function createUnsortedLead(lead: Lead) {
	if (!TOKEN || !CRM_URL) throw new Error('amoCRM is not configured: set TOKEN and CRM_URL');

	const now = Math.floor(Date.now() / 1000);
	const leadFields = [
		...(lead.cityId ? [{ field_id: CITY_FIELD_ID, values: [{ enum_id: lead.cityId }] }] : []),
		...UTM_FIELDS.filter((key) => lead.utm[key]).map((key) => ({
			field_code: key.toUpperCase(),
			values: [{ value: lead.utm[key] }],
		})),
	];

	const body = [
		{
			source_name: 'Сайт ilock.kz',
			source_uid: crypto.randomUUID(),
			pipeline_id: PIPELINE_ID,
			created_at: now,
			_embedded: {
				leads: [
					{
						name: 'Заявка с сайта',
						...(leadFields.length ? { custom_fields_values: leadFields } : {}),
					},
				],
				contacts: [
					{
						name: lead.name,
						custom_fields_values: [
							{ field_code: 'PHONE', values: [{ value: lead.phone, enum_code: 'MOB' }] },
						],
					},
				],
			},
			metadata: {
				form_id: 'ilock-site-lead',
				form_name: 'Заявка с сайта',
				form_page: lead.page,
				form_sent_at: now,
				...(lead.ip ? { ip: lead.ip } : {}),
				...(lead.referer ? { referer: lead.referer } : {}),
			},
		},
	];

	const response = await fetch(`${CRM_URL.replace(/\/$/, '')}/api/v4/leads/unsorted/forms`, {
		method: 'POST',
		headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
		signal: AbortSignal.timeout(10_000),
	});
	if (!response.ok) {
		throw new Error(`amoCRM responded ${response.status}: ${(await response.text()).slice(0, 500)}`);
	}
}
