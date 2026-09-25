import { A as boolean, D as _enum, F as object, P as number, R as string } from "../_libs/@better-auth/core+[...].mjs";
import { r as createServerFn } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-DPJx0K2a.mjs";
import { a as mapFaq, o as mapIg, r as mapEvent, s as mapStory, t as createServerRpc } from "./map-DqA4b5pG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-COWHDEX_.js
var EVENT_SELECT = `
  e.id, e.slug, e.title, e.subtitle, e.cover_image, e.category_id,
  c.name_zh as category_name,
  e.starts_at::text as starts_at, e.ends_at::text as ends_at, e.timezone,
  e.location_name, e.location_detail, e.map_url, e.summary, e.body, e.audience,
  e.registration_mode, e.registration_url, e.registration_note,
  e.capacity, e.registered_count, e.status_override, e.ig_url, e.canva_url,
  e.faq, e.published_at::text as published_at, e.status, e.is_demo, e.featured
`;
var ROLE_RANK = {
	viewer: 1,
	editor: 2,
	admin: 3
};
var ForbiddenError = class extends Error {
	constructor() {
		super("沒有權限");
		this.name = "ForbiddenError";
	}
};
async function requireStaff(userId, min = "viewer") {
	const { getSql } = await import("./db-DKO1Kt3z.mjs").then((n) => n.t).then((n) => n.t);
	const sql = await getSql();
	if (((await sql.query(`select count(*)::int as n from profiles`))[0]?.n ?? 0) === 0) {
		await sql.query(`insert into profiles (user_id, role, display_name) values ($1, 'admin', '第一位管理者')`, [userId]);
		return {
			role: "admin",
			userId
		};
	}
	const rows = await sql.query(`select role, display_name from profiles where user_id = $1`, [userId]);
	if (!rows[0]) {
		await sql.query(`insert into profiles (user_id, role) values ($1, 'viewer')`, [userId]);
		if (min !== "viewer") throw new ForbiddenError();
		return {
			role: "viewer",
			userId
		};
	}
	if (ROLE_RANK[rows[0].role] < ROLE_RANK[min]) throw new ForbiddenError();
	return {
		role: rows[0].role,
		userId,
		displayName: rows[0].display_name
	};
}
var getAdminContext_createServerFn_handler = createServerRpc({
	id: "6785b65249ae7a357fc002a9a5a6c8bfc334c51ca1cafe4a5f51e1449dd1a974",
	name: "getAdminContext",
	filename: "src/lib/server/admin.ts"
}, (opts) => getAdminContext.__executeServer(opts));
var getAdminContext = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getAdminContext_createServerFn_handler, async ({ context }) => {
	return await requireStaff(context.userId, "viewer");
});
var getAdminDashboard_createServerFn_handler = createServerRpc({
	id: "36a0d6f1c97d92068a5f4a7080d0ecfcee4f0333332d0828686298ef670d6062",
	name: "getAdminDashboard",
	filename: "src/lib/server/admin.ts"
}, (opts) => getAdminDashboard.__executeServer(opts));
var getAdminDashboard = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getAdminDashboard_createServerFn_handler, async ({ context }) => {
	await requireStaff(context.userId, "viewer");
	const { getSql } = await import("./db-DKO1Kt3z.mjs").then((n) => n.t).then((n) => n.t);
	const sql = await getSql();
	const mapped = (await sql.query(`select ${EVENT_SELECT}
       from events e
       join event_categories c on c.id = e.category_id
       where e.deleted_at is null
       order by e.starts_at desc`)).map(mapEvent);
	const now = Date.now();
	const live = mapped.filter((e) => e.status === "published" && Date.parse(e.startsAt) <= now && Date.parse(e.endsAt) >= now);
	const upcoming = mapped.filter((e) => e.status === "published" && Date.parse(e.startsAt) > now);
	const needsUpdate = mapped.filter((e) => e.status === "draft" || !e.coverImage && e.status === "published" || e.registrationMode !== "closed" && !e.registrationUrl);
	const ig = await sql.query(`select count(*)::int as n from instagram_posts`);
	return {
		live,
		upcoming: upcoming.slice(0, 6),
		needsUpdate: needsUpdate.slice(0, 8),
		igCount: ig[0]?.n ?? 0,
		totalEvents: mapped.length
	};
});
var listAdminEvents_createServerFn_handler = createServerRpc({
	id: "121106ef3ecd9d3c45811fca916a0fd897df28c8d651c7fc716894bd2749e03f",
	name: "listAdminEvents",
	filename: "src/lib/server/admin.ts"
}, (opts) => listAdminEvents.__executeServer(opts));
var listAdminEvents = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listAdminEvents_createServerFn_handler, async ({ context }) => {
	await requireStaff(context.userId, "viewer");
	const { getSql } = await import("./db-DKO1Kt3z.mjs").then((n) => n.t).then((n) => n.t);
	return (await (await getSql()).query(`select ${EVENT_SELECT}
       from events e
       join event_categories c on c.id = e.category_id
       where e.deleted_at is null
       order by e.starts_at desc`)).map(mapEvent);
});
var getAdminEvent_createServerFn_handler = createServerRpc({
	id: "d919283e97b08ae2904d583331c2be5fd79b8991914da95f90d9ef0f09ef7724",
	name: "getAdminEvent",
	filename: "src/lib/server/admin.ts"
}, (opts) => getAdminEvent.__executeServer(opts));
var getAdminEvent = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator(object({ id: string() })).handler(getAdminEvent_createServerFn_handler, async ({ context, data }) => {
	await requireStaff(context.userId, "viewer");
	const { getSql } = await import("./db-DKO1Kt3z.mjs").then((n) => n.t).then((n) => n.t);
	const rows = await (await getSql()).query(`select ${EVENT_SELECT}
       from events e
       join event_categories c on c.id = e.category_id
       where e.id = $1 and e.deleted_at is null
       limit 1`, [data.id]);
	return rows[0] ? mapEvent(rows[0]) : null;
});
var eventInput = object({
	id: string().optional(),
	slug: string().min(1).max(80),
	title: string().min(1).max(80),
	subtitle: string().max(80).optional().nullable(),
	coverImage: string().max(500).optional().nullable(),
	categoryId: string(),
	startsAt: string(),
	endsAt: string(),
	locationName: string().min(1).max(120),
	locationDetail: string().max(160).optional().nullable(),
	mapUrl: string().max(500).optional().nullable(),
	summary: string().max(280),
	body: string().max(8e3),
	audience: string().max(200).optional().nullable(),
	registrationMode: _enum([
		"google_form",
		"internal",
		"external",
		"instagram_dm",
		"closed"
	]),
	registrationUrl: string().max(500).optional().nullable(),
	registrationNote: string().max(400).optional().nullable(),
	capacity: number().int().positive().optional().nullable(),
	registeredCount: number().int().min(0).optional().nullable(),
	statusOverride: _enum([
		"upcoming",
		"open",
		"filling",
		"full",
		"ended"
	]).optional().nullable(),
	igUrl: string().max(500).optional().nullable(),
	canvaUrl: string().max(500).optional().nullable(),
	status: _enum([
		"draft",
		"published",
		"archived"
	]),
	featured: boolean()
});
var saveEvent_createServerFn_handler = createServerRpc({
	id: "391c211d138e8a2b60933042becd8503127ecaf95627351e6c4b43a52b12903c",
	name: "saveEvent",
	filename: "src/lib/server/admin.ts"
}, (opts) => saveEvent.__executeServer(opts));
var saveEvent = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(eventInput).handler(saveEvent_createServerFn_handler, async ({ context, data }) => {
	await requireStaff(context.userId, "editor");
	const { getSql } = await import("./db-DKO1Kt3z.mjs").then((n) => n.t).then((n) => n.t);
	const sql = await getSql();
	const id = data.id ?? crypto.randomUUID();
	const publishedAt = data.status === "published" ? (/* @__PURE__ */ new Date()).toISOString() : null;
	await sql.query(`insert into events (
         id, slug, title, subtitle, cover_image, category_id,
         starts_at, ends_at, location_name, location_detail, map_url,
         summary, body, audience, registration_mode, registration_url,
         registration_note, capacity, registered_count, status_override,
         ig_url, canva_url, status, featured, published_at, updated_at
       ) values (
         $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25, now()
       )
       on conflict (id) do update set
         slug = excluded.slug,
         title = excluded.title,
         subtitle = excluded.subtitle,
         cover_image = excluded.cover_image,
         category_id = excluded.category_id,
         starts_at = excluded.starts_at,
         ends_at = excluded.ends_at,
         location_name = excluded.location_name,
         location_detail = excluded.location_detail,
         map_url = excluded.map_url,
         summary = excluded.summary,
         body = excluded.body,
         audience = excluded.audience,
         registration_mode = excluded.registration_mode,
         registration_url = excluded.registration_url,
         registration_note = excluded.registration_note,
         capacity = excluded.capacity,
         registered_count = excluded.registered_count,
         status_override = excluded.status_override,
         ig_url = excluded.ig_url,
         canva_url = excluded.canva_url,
         status = excluded.status,
         featured = excluded.featured,
         published_at = coalesce(events.published_at, excluded.published_at),
         updated_at = now()`, [
		id,
		data.slug,
		data.title,
		data.subtitle ?? null,
		data.coverImage ?? null,
		data.categoryId,
		data.startsAt,
		data.endsAt,
		data.locationName,
		data.locationDetail ?? null,
		data.mapUrl ?? null,
		data.summary,
		data.body,
		data.audience ?? null,
		data.registrationMode,
		data.registrationUrl ?? null,
		data.registrationNote ?? null,
		data.capacity ?? null,
		data.registeredCount ?? null,
		data.statusOverride ?? null,
		data.igUrl ?? null,
		data.canvaUrl ?? null,
		data.status,
		data.featured,
		publishedAt
	]);
	return { id };
});
var archiveEvent_createServerFn_handler = createServerRpc({
	id: "ac5c7138f5823a23c2fb76b5648f3e14814eac35a6e6364d885cd914533857b1",
	name: "archiveEvent",
	filename: "src/lib/server/admin.ts"
}, (opts) => archiveEvent.__executeServer(opts));
var archiveEvent = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ id: string() })).handler(archiveEvent_createServerFn_handler, async ({ context, data }) => {
	await requireStaff(context.userId, "editor");
	const { getSql } = await import("./db-DKO1Kt3z.mjs").then((n) => n.t).then((n) => n.t);
	await (await getSql()).query(`update events set deleted_at = now(), status = 'archived', updated_at = now() where id = $1`, [data.id]);
	return { ok: true };
});
var listAdminStories_createServerFn_handler = createServerRpc({
	id: "6252887e20ff0d4ef369a120f2fb925016f51fd1adb9ecfbb9dde6306f9b42fc",
	name: "listAdminStories",
	filename: "src/lib/server/admin.ts"
}, (opts) => listAdminStories.__executeServer(opts));
var listAdminStories = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listAdminStories_createServerFn_handler, async ({ context }) => {
	await requireStaff(context.userId, "viewer");
	const { getSql } = await import("./db-DKO1Kt3z.mjs").then((n) => n.t).then((n) => n.t);
	return (await (await getSql()).query(`select id, slug, quote, body, display_name, role_label, photo_url,
              joined_label, related_event_id, instagram_url, is_demo
       from stories where deleted_at is null order by sort_order asc`)).map(mapStory);
});
var storyInput = object({
	id: string().optional(),
	slug: string().min(1).max(80),
	quote: string().min(1).max(80),
	body: string().min(1).max(4e3),
	displayName: string().min(1).max(40),
	roleLabel: string().max(40).optional().nullable(),
	photoUrl: string().max(500).optional().nullable(),
	joinedLabel: string().max(40).optional().nullable(),
	consent: boolean(),
	status: _enum([
		"draft",
		"published",
		"archived"
	])
});
var saveStory_createServerFn_handler = createServerRpc({
	id: "b6ea1a3b71999c67c13e5c68ccb3a4ac4afea526c54e79d9ef4534bfbb36b89a",
	name: "saveStory",
	filename: "src/lib/server/admin.ts"
}, (opts) => saveStory.__executeServer(opts));
var saveStory = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(storyInput).handler(saveStory_createServerFn_handler, async ({ context, data }) => {
	await requireStaff(context.userId, "editor");
	const { getSql } = await import("./db-DKO1Kt3z.mjs").then((n) => n.t).then((n) => n.t);
	const sql = await getSql();
	const id = data.id ?? crypto.randomUUID();
	await sql.query(`insert into stories (
         id, slug, quote, body, display_name, role_label, photo_url, joined_label,
         consent, status, published_at, updated_at
       ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10, case when $10 = 'published' then now() else null end, now())
       on conflict (id) do update set
         slug = excluded.slug,
         quote = excluded.quote,
         body = excluded.body,
         display_name = excluded.display_name,
         role_label = excluded.role_label,
         photo_url = excluded.photo_url,
         joined_label = excluded.joined_label,
         consent = excluded.consent,
         status = excluded.status,
         updated_at = now()`, [
		id,
		data.slug,
		data.quote,
		data.body,
		data.displayName,
		data.roleLabel ?? null,
		data.photoUrl ?? null,
		data.joinedLabel ?? null,
		data.consent,
		data.status
	]);
	return { id };
});
var listAdminFaq_createServerFn_handler = createServerRpc({
	id: "819783b4af3d5e8c61ab3a991442e1f636746bc05a26d903b1d9988a20a9171e",
	name: "listAdminFaq",
	filename: "src/lib/server/admin.ts"
}, (opts) => listAdminFaq.__executeServer(opts));
var listAdminFaq = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listAdminFaq_createServerFn_handler, async ({ context }) => {
	await requireStaff(context.userId, "viewer");
	const { getSql } = await import("./db-DKO1Kt3z.mjs").then((n) => n.t).then((n) => n.t);
	return (await (await getSql()).query(`select id, question, answer, icon, sort_order from faq order by sort_order asc`)).map(mapFaq);
});
var faqInput = object({
	id: string().optional(),
	question: string().min(1).max(80),
	answer: string().min(1).max(800),
	icon: string().max(40).optional().nullable()
});
var saveFaq_createServerFn_handler = createServerRpc({
	id: "bb67971e3941aaa24c4da3bb0cc646c152ae70200a4e15b75da1b9b95c3ed3db",
	name: "saveFaq",
	filename: "src/lib/server/admin.ts"
}, (opts) => saveFaq.__executeServer(opts));
var saveFaq = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(faqInput).handler(saveFaq_createServerFn_handler, async ({ context, data }) => {
	await requireStaff(context.userId, "editor");
	const { getSql } = await import("./db-DKO1Kt3z.mjs").then((n) => n.t).then((n) => n.t);
	const sql = await getSql();
	const id = data.id ?? crypto.randomUUID();
	await sql.query(`insert into faq (id, question, answer, icon, sort_order, published, updated_at)
       values ($1,$2,$3,$4,(select coalesce(max(sort_order),0)+1 from faq), true, now())
       on conflict (id) do update set
         question = excluded.question,
         answer = excluded.answer,
         icon = excluded.icon,
         updated_at = now()`, [
		id,
		data.question,
		data.answer,
		data.icon ?? null
	]);
	return { id };
});
var listAdminIg_createServerFn_handler = createServerRpc({
	id: "1314e82b48aa8f4e09e94df0656f0f0e66b42044f39a19ba5f6a453f46478432",
	name: "listAdminIg",
	filename: "src/lib/server/admin.ts"
}, (opts) => listAdminIg.__executeServer(opts));
var listAdminIg = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listAdminIg_createServerFn_handler, async ({ context }) => {
	await requireStaff(context.userId, "viewer");
	const { getSql } = await import("./db-DKO1Kt3z.mjs").then((n) => n.t).then((n) => n.t);
	return (await (await getSql()).query(`select id, post_url, thumbnail_url, caption, post_type,
              published_on::text as published_on, featured
       from instagram_posts order by sort_order asc`)).map(mapIg);
});
var igInput = object({
	id: string().optional(),
	postUrl: string().min(1).max(500),
	thumbnailUrl: string().max(500).optional().nullable(),
	caption: string().max(400).optional().nullable(),
	postType: _enum([
		"image",
		"reel",
		"carousel"
	]),
	featured: boolean()
});
var saveIgPost_createServerFn_handler = createServerRpc({
	id: "39b48988ceb1014c361cfd8effa68eee364fd147ec7bbfc0c463ad131fdef3c1",
	name: "saveIgPost",
	filename: "src/lib/server/admin.ts"
}, (opts) => saveIgPost.__executeServer(opts));
var saveIgPost = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(igInput).handler(saveIgPost_createServerFn_handler, async ({ context, data }) => {
	await requireStaff(context.userId, "editor");
	const { getSql } = await import("./db-DKO1Kt3z.mjs").then((n) => n.t).then((n) => n.t);
	const sql = await getSql();
	const id = data.id ?? crypto.randomUUID();
	await sql.query(`insert into instagram_posts (id, post_url, thumbnail_url, caption, post_type, featured, sort_order, updated_at)
       values ($1,$2,$3,$4,$5,$6,(select coalesce(max(sort_order),0)+1 from instagram_posts), now())
       on conflict (id) do update set
         post_url = excluded.post_url,
         thumbnail_url = excluded.thumbnail_url,
         caption = excluded.caption,
         post_type = excluded.post_type,
         featured = excluded.featured,
         updated_at = now()`, [
		id,
		data.postUrl,
		data.thumbnailUrl ?? null,
		data.caption ?? null,
		data.postType,
		data.featured
	]);
	return { id };
});
var saveSettings_createServerFn_handler = createServerRpc({
	id: "c2e088d673ccff2c8e6325f78aa413af66c01db491d13cf76f532e67bb73b352",
	name: "saveSettings",
	filename: "src/lib/server/admin.ts"
}, (opts) => saveSettings.__executeServer(opts));
var saveSettings = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	name: string().min(1).max(40),
	nameEn: string().max(60),
	instagram: string().max(200),
	campus: string().max(80),
	note: string().max(200),
	announcementTitle: string().max(80),
	announcementBody: string().max(240),
	announcementHref: string().max(300),
	announcementVisible: boolean()
})).handler(saveSettings_createServerFn_handler, async ({ context, data }) => {
	await requireStaff(context.userId, "admin");
	const { getSql } = await import("./db-DKO1Kt3z.mjs").then((n) => n.t).then((n) => n.t);
	const sql = await getSql();
	await sql.query(`insert into site_settings (key, value, updated_at) values ('club', $1::jsonb, now())
       on conflict (key) do update set value = excluded.value, updated_at = now()`, [JSON.stringify({
		name: data.name,
		nameEn: data.nameEn,
		instagram: data.instagram,
		campus: data.campus,
		note: data.note
	})]);
	await sql.query(`insert into site_settings (key, value, updated_at) values ('announcement', $1::jsonb, now())
       on conflict (key) do update set value = excluded.value, updated_at = now()`, [JSON.stringify({
		title: data.announcementTitle,
		body: data.announcementBody,
		href: data.announcementHref,
		visible: data.announcementVisible
	})]);
	return { ok: true };
});
var listAdminAssets_createServerFn_handler = createServerRpc({
	id: "bb69e5f935822b1e0ec07f2a8a74095daedd783e3306b8e0c6e12c2d012f65c5",
	name: "listAdminAssets",
	filename: "src/lib/server/admin.ts"
}, (opts) => listAdminAssets.__executeServer(opts));
var listAdminAssets = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listAdminAssets_createServerFn_handler, async ({ context }) => {
	await requireStaff(context.userId, "viewer");
	const { getSql } = await import("./db-DKO1Kt3z.mjs").then((n) => n.t).then((n) => n.t);
	return (await getSql()).query(`select id, title, url, asset_type, canva_url, drive_url, tags from assets order by created_at desc`);
});
var assetInput = object({
	id: string().optional(),
	title: string().max(80).optional().nullable(),
	url: string().min(1).max(500),
	assetType: _enum([
		"image",
		"video",
		"canva",
		"drive",
		"poster",
		"other"
	]),
	canvaUrl: string().max(500).optional().nullable(),
	driveUrl: string().max(500).optional().nullable(),
	tags: string().max(120).optional().nullable()
});
var saveAsset_createServerFn_handler = createServerRpc({
	id: "028fea6d263a55e815387bf4ca9d0748c527e54ba23f58928d5da27828cd3479",
	name: "saveAsset",
	filename: "src/lib/server/admin.ts"
}, (opts) => saveAsset.__executeServer(opts));
var saveAsset = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(assetInput).handler(saveAsset_createServerFn_handler, async ({ context, data }) => {
	await requireStaff(context.userId, "editor");
	const { getSql } = await import("./db-DKO1Kt3z.mjs").then((n) => n.t).then((n) => n.t);
	const sql = await getSql();
	const id = data.id ?? crypto.randomUUID();
	await sql.query(`insert into assets (id, title, url, preview_url, asset_type, canva_url, drive_url, tags, updated_at)
       values ($1,$2,$3,$3,$4,$5,$6,$7, now())
       on conflict (id) do update set
         title = excluded.title,
         url = excluded.url,
         preview_url = excluded.preview_url,
         asset_type = excluded.asset_type,
         canva_url = excluded.canva_url,
         drive_url = excluded.drive_url,
         tags = excluded.tags,
         updated_at = now()`, [
		id,
		data.title ?? null,
		data.url,
		data.assetType,
		data.canvaUrl ?? null,
		data.driveUrl ?? null,
		data.tags ?? null
	]);
	return { id };
});
//#endregion
export { archiveEvent_createServerFn_handler, getAdminContext_createServerFn_handler, getAdminDashboard_createServerFn_handler, getAdminEvent_createServerFn_handler, listAdminAssets_createServerFn_handler, listAdminEvents_createServerFn_handler, listAdminFaq_createServerFn_handler, listAdminIg_createServerFn_handler, listAdminStories_createServerFn_handler, saveAsset_createServerFn_handler, saveEvent_createServerFn_handler, saveFaq_createServerFn_handler, saveIgPost_createServerFn_handler, saveSettings_createServerFn_handler, saveStory_createServerFn_handler };
