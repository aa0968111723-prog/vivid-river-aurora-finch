import { F as object, R as string } from "../_libs/@better-auth/core+[...].mjs";
import { r as createServerFn } from "./ssr.mjs";
import { a as mapFaq, i as mapEventAsset, n as mapAsset, o as mapIg, r as mapEvent, s as mapStory, t as createServerRpc } from "./map-DqA4b5pG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/public-j-a7WG-R.js
var EVENT_SELECT = `
  e.id, e.slug, e.title, e.subtitle, e.cover_image, e.category_id,
  c.name_zh as category_name,
  e.starts_at::text as starts_at, e.ends_at::text as ends_at, e.timezone,
  e.location_name, e.location_detail, e.map_url, e.summary, e.body, e.audience,
  e.registration_mode, e.registration_url, e.registration_note,
  e.capacity, e.registered_count, e.status_override, e.ig_url, e.canva_url,
  e.faq, e.published_at::text as published_at, e.status, e.is_demo, e.featured
`;
var getPublishedEvents_createServerFn_handler = createServerRpc({
	id: "b1830ed96b25e4dc1f3500cc5c10f77fdb3440fb841b765da1bc9782acde45ca",
	name: "getPublishedEvents",
	filename: "src/lib/server/public.ts"
}, (opts) => getPublishedEvents.__executeServer(opts));
var getPublishedEvents = createServerFn({ method: "GET" }).handler(getPublishedEvents_createServerFn_handler, async () => {
	const { getSql } = await import("./db-DKO1Kt3z.mjs").then((n) => n.t).then((n) => n.t);
	return (await (await getSql()).query(`select ${EVENT_SELECT}
       from events e
       join event_categories c on c.id = e.category_id
       where e.status = 'published' and e.deleted_at is null
       order by e.starts_at asc`)).map(mapEvent);
});
var getEventBySlug_createServerFn_handler = createServerRpc({
	id: "cfa355b8ce8cd73824103fbc4d4b52bd23b55e748e5a632616c3e2b41620ecbf",
	name: "getEventBySlug",
	filename: "src/lib/server/public.ts"
}, (opts) => getEventBySlug.__executeServer(opts));
var getEventBySlug = createServerFn({ method: "GET" }).validator(object({ slug: string() })).handler(getEventBySlug_createServerFn_handler, async ({ data }) => {
	const { getSql } = await import("./db-DKO1Kt3z.mjs").then((n) => n.t).then((n) => n.t);
	const sql = await getSql();
	const rows = await sql.query(`select ${EVENT_SELECT}
       from events e
       join event_categories c on c.id = e.category_id
       where e.slug = $1 and e.status = 'published' and e.deleted_at is null
       limit 1`, [data.slug]);
	const event = rows[0] ? mapEvent(rows[0]) : null;
	if (!event) return null;
	const assets = await sql.query(`select id, event_id, kind, url, preview_url, caption, sort_order
       from event_assets where event_id = $1 order by sort_order asc`, [event.id]);
	const related = await sql.query(`select ${EVENT_SELECT}
       from events e
       join event_categories c on c.id = e.category_id
       where e.status = 'published' and e.deleted_at is null
         and e.id <> $1
         and (e.category_id = $2 or e.starts_at > now())
       order by e.starts_at asc
       limit 3`, [event.id, event.categoryId]);
	return {
		event,
		assets: assets.map(mapEventAsset),
		related: related.map(mapEvent)
	};
});
var getPublishedStories_createServerFn_handler = createServerRpc({
	id: "5e63028a202e9ac1751a39a105e5000ba6469874cb6c043b2171d875e64e47f5",
	name: "getPublishedStories",
	filename: "src/lib/server/public.ts"
}, (opts) => getPublishedStories.__executeServer(opts));
var getPublishedStories = createServerFn({ method: "GET" }).handler(getPublishedStories_createServerFn_handler, async () => {
	const { getSql } = await import("./db-DKO1Kt3z.mjs").then((n) => n.t).then((n) => n.t);
	return (await (await getSql()).query(`select id, slug, quote, body, display_name, role_label, photo_url,
              joined_label, related_event_id, instagram_url, is_demo
       from stories
       where status = 'published' and deleted_at is null and consent = true
       order by sort_order asc`)).map(mapStory);
});
var getStoryBySlug_createServerFn_handler = createServerRpc({
	id: "8b6fa74621aa39f60b0a3e1941171b2dc592d27b25fcf901b8b63634f3dc7f76",
	name: "getStoryBySlug",
	filename: "src/lib/server/public.ts"
}, (opts) => getStoryBySlug.__executeServer(opts));
var getStoryBySlug = createServerFn({ method: "GET" }).validator(object({ slug: string() })).handler(getStoryBySlug_createServerFn_handler, async ({ data }) => {
	const { getSql } = await import("./db-DKO1Kt3z.mjs").then((n) => n.t).then((n) => n.t);
	const rows = await (await getSql()).query(`select id, slug, quote, body, display_name, role_label, photo_url,
              joined_label, related_event_id, instagram_url, is_demo
       from stories
       where slug = $1 and status = 'published' and deleted_at is null and consent = true
       limit 1`, [data.slug]);
	return rows[0] ? mapStory(rows[0]) : null;
});
var getPublishedFaq_createServerFn_handler = createServerRpc({
	id: "5742f06ab8d570f46b4a7dcc1c08508ac37b869cd315b909edbae9b445a29310",
	name: "getPublishedFaq",
	filename: "src/lib/server/public.ts"
}, (opts) => getPublishedFaq.__executeServer(opts));
var getPublishedFaq = createServerFn({ method: "GET" }).handler(getPublishedFaq_createServerFn_handler, async () => {
	const { getSql } = await import("./db-DKO1Kt3z.mjs").then((n) => n.t).then((n) => n.t);
	return (await (await getSql()).query(`select id, question, answer, icon, sort_order
       from faq where published = true order by sort_order asc`)).map(mapFaq);
});
var getFeaturedInstagram_createServerFn_handler = createServerRpc({
	id: "c48d57697be0289b4f650635f11852665b7e992ba6d7ecf904b350b911387e64",
	name: "getFeaturedInstagram",
	filename: "src/lib/server/public.ts"
}, (opts) => getFeaturedInstagram.__executeServer(opts));
var getFeaturedInstagram = createServerFn({ method: "GET" }).handler(getFeaturedInstagram_createServerFn_handler, async () => {
	try {
		const { getSql } = await import("./db-DKO1Kt3z.mjs").then((n) => n.t).then((n) => n.t);
		return {
			ok: true,
			posts: (await (await getSql()).query(`select id, post_url, thumbnail_url, caption, post_type,
                published_on::text as published_on, featured
         from instagram_posts
         where featured = true
         order by sort_order asc
         limit 8`)).map(mapIg)
		};
	} catch {
		return {
			ok: false,
			posts: []
		};
	}
});
var getSiteMeta_createServerFn_handler = createServerRpc({
	id: "52599bd47f880cfad5f961d7d9e3ff8a376ebbe5557314e4e279e6c7c4258ecd",
	name: "getSiteMeta",
	filename: "src/lib/server/public.ts"
}, (opts) => getSiteMeta.__executeServer(opts));
var getSiteMeta = createServerFn({ method: "GET" }).handler(getSiteMeta_createServerFn_handler, async () => {
	const { getSql } = await import("./db-DKO1Kt3z.mjs").then((n) => n.t).then((n) => n.t);
	const rows = await (await getSql()).query(`select key, value from site_settings where key in ('club', 'announcement')`);
	const bag = Object.fromEntries(rows.map((r) => [r.key, r.value]));
	const clubRaw = bag.club ?? {};
	const annRaw = bag.announcement ?? {};
	return {
		club: {
			name: clubRaw.name ?? "淡江大學禪學社",
			nameEn: clubRaw.nameEn ?? "TKU Zen Club",
			instagram: clubRaw.instagram ?? "https://www.instagram.com/tku_zc",
			campus: clubRaw.campus ?? "淡江大學（淡水校園）",
			note: clubRaw.note ?? ""
		},
		announcement: {
			title: annRaw.title ?? "",
			body: annRaw.body ?? "",
			href: annRaw.href ?? "",
			visible: Boolean(annRaw.visible)
		}
	};
});
var getHomeData_createServerFn_handler = createServerRpc({
	id: "8e516e6c233a5b7ed69769059de3433e6aaa7835b16e18357cec1779bd83c31e",
	name: "getHomeData",
	filename: "src/lib/server/public.ts"
}, (opts) => getHomeData.__executeServer(opts));
var getHomeData = createServerFn({ method: "GET" }).handler(getHomeData_createServerFn_handler, async () => {
	const [events, stories, faq, ig, meta] = await Promise.all([
		getPublishedEvents(),
		getPublishedStories(),
		getPublishedFaq(),
		getFeaturedInstagram(),
		getSiteMeta()
	]);
	const now = Date.now();
	return {
		events,
		upcoming: events.filter((e) => Date.parse(e.endsAt) >= now).slice(0, 6),
		past: events.filter((e) => Date.parse(e.endsAt) < now).slice(-6).reverse(),
		stories,
		faq,
		ig,
		meta
	};
});
var getGalleryData_createServerFn_handler = createServerRpc({
	id: "76664d24f1e6b3b6de635e04c1fed5593ae3a6ba816770496744a8d555b93b24",
	name: "getGalleryData",
	filename: "src/lib/server/public.ts"
}, (opts) => getGalleryData.__executeServer(opts));
var getGalleryData = createServerFn({ method: "GET" }).handler(getGalleryData_createServerFn_handler, async () => {
	const { getSql } = await import("./db-DKO1Kt3z.mjs").then((n) => n.t).then((n) => n.t);
	const sql = await getSql();
	const assets = await sql.query(`select id, title, url, preview_url, asset_type, canva_url, drive_url, event_id, tags
       from assets order by created_at desc`);
	const eventAssets = await sql.query(`select a.id, a.event_id, a.kind, a.url, a.preview_url, a.caption, a.sort_order,
              e.title as event_title, e.slug as event_slug
       from event_assets a
       join events e on e.id = a.event_id
       where e.status = 'published' and e.deleted_at is null
       order by e.starts_at desc, a.sort_order asc`);
	const events = await getPublishedEvents();
	return {
		assets: assets.map(mapAsset),
		eventAssets,
		pastEvents: events.filter((e) => e.computedStatus === "ended")
	};
});
var trackSchema = object({
	eventName: string().max(80),
	path: string().max(300).optional(),
	referrer: string().max(500).optional(),
	utmSource: string().max(80).optional(),
	utmMedium: string().max(80).optional(),
	utmCampaign: string().max(80).optional(),
	landingPage: string().max(300).optional(),
	eventId: string().max(80).optional()
});
var trackAnalytics_createServerFn_handler = createServerRpc({
	id: "958f7d2aedd764c57b38c9237a712eeddab64c49ea53a954fba1ede4a0d240a5",
	name: "trackAnalytics",
	filename: "src/lib/server/public.ts"
}, (opts) => trackAnalytics.__executeServer(opts));
var trackAnalytics = createServerFn({ method: "POST" }).validator(trackSchema).handler(trackAnalytics_createServerFn_handler, async ({ data }) => {
	try {
		const { getSql } = await import("./db-DKO1Kt3z.mjs").then((n) => n.t).then((n) => n.t);
		await (await getSql()).query(`insert into analytics_events
         (id, event_name, path, referrer, utm_source, utm_medium, utm_campaign, landing_page, event_id)
         values ($1,$2,$3,$4,$5,$6,$7,$8,$9)`, [
			crypto.randomUUID(),
			data.eventName,
			data.path ?? null,
			data.referrer ?? null,
			data.utmSource ?? null,
			data.utmMedium ?? null,
			data.utmCampaign ?? null,
			data.landingPage ?? null,
			data.eventId ?? null
		]);
	} catch {}
	return { ok: true };
});
//#endregion
export { getEventBySlug_createServerFn_handler, getFeaturedInstagram_createServerFn_handler, getGalleryData_createServerFn_handler, getHomeData_createServerFn_handler, getPublishedEvents_createServerFn_handler, getPublishedFaq_createServerFn_handler, getPublishedStories_createServerFn_handler, getSiteMeta_createServerFn_handler, getStoryBySlug_createServerFn_handler, trackAnalytics_createServerFn_handler };
