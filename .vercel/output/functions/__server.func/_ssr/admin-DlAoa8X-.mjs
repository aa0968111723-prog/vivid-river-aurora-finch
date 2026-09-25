import { A as boolean, D as _enum, F as object, P as number, R as string } from "../_libs/@better-auth/core+[...].mjs";
import { r as createServerFn } from "./ssr.mjs";
import { t as createSsrRpc } from "./createSsrRpc-B2Izd0c7.mjs";
import { t as authMiddleware } from "./middleware-DPJx0K2a.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DlAoa8X-.js
var getAdminContext = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("6785b65249ae7a357fc002a9a5a6c8bfc334c51ca1cafe4a5f51e1449dd1a974"));
var getAdminDashboard = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("36a0d6f1c97d92068a5f4a7080d0ecfcee4f0333332d0828686298ef670d6062"));
var listAdminEvents = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("121106ef3ecd9d3c45811fca916a0fd897df28c8d651c7fc716894bd2749e03f"));
var getAdminEvent = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator(object({ id: string() })).handler(createSsrRpc("d919283e97b08ae2904d583331c2be5fd79b8991914da95f90d9ef0f09ef7724"));
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
var saveEvent = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(eventInput).handler(createSsrRpc("391c211d138e8a2b60933042becd8503127ecaf95627351e6c4b43a52b12903c"));
var archiveEvent = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ id: string() })).handler(createSsrRpc("ac5c7138f5823a23c2fb76b5648f3e14814eac35a6e6364d885cd914533857b1"));
var listAdminStories = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("6252887e20ff0d4ef369a120f2fb925016f51fd1adb9ecfbb9dde6306f9b42fc"));
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
var saveStory = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(storyInput).handler(createSsrRpc("b6ea1a3b71999c67c13e5c68ccb3a4ac4afea526c54e79d9ef4534bfbb36b89a"));
var listAdminFaq = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("819783b4af3d5e8c61ab3a991442e1f636746bc05a26d903b1d9988a20a9171e"));
var faqInput = object({
	id: string().optional(),
	question: string().min(1).max(80),
	answer: string().min(1).max(800),
	icon: string().max(40).optional().nullable()
});
var saveFaq = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(faqInput).handler(createSsrRpc("bb67971e3941aaa24c4da3bb0cc646c152ae70200a4e15b75da1b9b95c3ed3db"));
var listAdminIg = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("1314e82b48aa8f4e09e94df0656f0f0e66b42044f39a19ba5f6a453f46478432"));
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
var saveIgPost = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(igInput).handler(createSsrRpc("39b48988ceb1014c361cfd8effa68eee364fd147ec7bbfc0c463ad131fdef3c1"));
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
})).handler(createSsrRpc("c2e088d673ccff2c8e6325f78aa413af66c01db491d13cf76f532e67bb73b352"));
var listAdminAssets = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("bb69e5f935822b1e0ec07f2a8a74095daedd783e3306b8e0c6e12c2d012f65c5"));
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
var saveAsset = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(assetInput).handler(createSsrRpc("028fea6d263a55e815387bf4ca9d0748c527e54ba23f58928d5da27828cd3479"));
//#endregion
export { listAdminAssets as a, listAdminIg as c, saveEvent as d, saveFaq as f, saveStory as h, getAdminEvent as i, listAdminStories as l, saveSettings as m, getAdminContext as n, listAdminEvents as o, saveIgPost as p, getAdminDashboard as r, listAdminFaq as s, archiveEvent as t, saveAsset as u };
