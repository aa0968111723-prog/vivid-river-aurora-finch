import { t as computeEventStatus } from "./format-Cui_ik7J.mjs";
import { i as TSS_SERVER_FUNCTION } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/map-DqA4b5pG.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function asIso(value) {
	if (value instanceof Date) return value.toISOString();
	if (typeof value === "string") return value;
	return String(value ?? "");
}
function asIsoOrNull(value) {
	if (value == null) return null;
	return asIso(value) || null;
}
function parseFaq(raw) {
	if (!raw) return [];
	if (typeof raw === "string") try {
		return parseFaq(JSON.parse(raw));
	} catch {
		return [];
	}
	if (!Array.isArray(raw)) return [];
	return raw.map((item) => {
		if (!item || typeof item !== "object") return null;
		const rec = item;
		const q = typeof rec.q === "string" ? rec.q : "";
		const a = typeof rec.a === "string" ? rec.a : "";
		if (!q || !a) return null;
		return {
			q,
			a
		};
	}).filter((x) => Boolean(x));
}
function mapEvent(row) {
	const registrationMode = row.registration_mode;
	const statusOverride = row.status_override ?? null;
	const startsAt = asIso(row.starts_at);
	const endsAt = asIso(row.ends_at);
	return {
		id: row.id,
		slug: row.slug,
		title: row.title,
		subtitle: row.subtitle,
		coverImage: row.cover_image,
		categoryId: row.category_id,
		categoryName: row.category_name ?? row.category_id,
		startsAt,
		endsAt,
		timezone: row.timezone,
		locationName: row.location_name,
		locationDetail: row.location_detail,
		mapUrl: row.map_url,
		summary: row.summary,
		body: row.body,
		audience: row.audience,
		registrationMode,
		registrationUrl: row.registration_url,
		registrationNote: row.registration_note,
		capacity: row.capacity,
		registeredCount: row.registered_count,
		statusOverride,
		computedStatus: computeEventStatus({
			startsAt,
			endsAt,
			capacity: row.capacity,
			registeredCount: row.registered_count,
			statusOverride,
			registrationMode
		}),
		igUrl: row.ig_url,
		canvaUrl: row.canva_url,
		faq: parseFaq(row.faq),
		publishedAt: asIsoOrNull(row.published_at),
		status: row.status,
		isDemo: Boolean(row.is_demo),
		featured: Boolean(row.featured)
	};
}
function mapStory(row) {
	return {
		id: row.id,
		slug: row.slug,
		quote: row.quote,
		body: row.body,
		displayName: row.display_name,
		roleLabel: row.role_label,
		photoUrl: row.photo_url,
		joinedLabel: row.joined_label,
		relatedEventId: row.related_event_id,
		instagramUrl: row.instagram_url,
		isDemo: Boolean(row.is_demo)
	};
}
function mapFaq(row) {
	return {
		id: row.id,
		question: row.question,
		answer: row.answer,
		icon: row.icon,
		sortOrder: row.sort_order
	};
}
function mapIg(row) {
	return {
		id: row.id,
		postUrl: row.post_url,
		thumbnailUrl: row.thumbnail_url,
		caption: row.caption,
		postType: row.post_type,
		publishedOn: asIsoOrNull(row.published_on),
		featured: Boolean(row.featured)
	};
}
function mapAsset(row) {
	return {
		id: row.id,
		title: row.title,
		url: row.url,
		previewUrl: row.preview_url,
		assetType: row.asset_type,
		canvaUrl: row.canva_url,
		driveUrl: row.drive_url,
		eventId: row.event_id,
		tags: row.tags
	};
}
function mapEventAsset(row) {
	return {
		id: row.id,
		eventId: row.event_id,
		kind: row.kind,
		url: row.url,
		previewUrl: row.preview_url,
		caption: row.caption,
		sortOrder: row.sort_order
	};
}
//#endregion
export { mapFaq as a, mapEventAsset as i, mapAsset as n, mapIg as o, mapEvent as r, mapStory as s, createServerRpc as t };
