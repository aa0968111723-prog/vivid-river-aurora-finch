import { o as __toESM } from "../_runtime.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as cn, t as Button } from "./button-BYDjDX5S.mjs";
import { c as require_jsx_runtime, l as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { V as notFound, _ as createRootRoute, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, x as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as formatEventRange } from "./format-Cui_ik7J.mjs";
import { F as object, M as literal, P as number, R as string, z as union } from "../_libs/@better-auth/core+[...].mjs";
import { n as auth } from "./server-02G9FJXM.mjs";
import { c as __exportAll, r as createServerFn } from "./ssr.mjs";
import { t as createSsrRpc } from "./createSsrRpc-B2Izd0c7.mjs";
import { a as Heart, c as CalendarDays, i as House, o as Compass, r as Instagram, s as ChevronDown, t as MapPin } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/public-CkQoiC2w.js
var getPublishedEvents = createServerFn({ method: "GET" }).handler(createSsrRpc("b1830ed96b25e4dc1f3500cc5c10f77fdb3440fb841b765da1bc9782acde45ca"));
var getEventBySlug = createServerFn({ method: "GET" }).validator(object({ slug: string() })).handler(createSsrRpc("cfa355b8ce8cd73824103fbc4d4b52bd23b55e748e5a632616c3e2b41620ecbf"));
var getPublishedStories = createServerFn({ method: "GET" }).handler(createSsrRpc("5e63028a202e9ac1751a39a105e5000ba6469874cb6c043b2171d875e64e47f5"));
var getStoryBySlug = createServerFn({ method: "GET" }).validator(object({ slug: string() })).handler(createSsrRpc("8b6fa74621aa39f60b0a3e1941171b2dc592d27b25fcf901b8b63634f3dc7f76"));
createServerFn({ method: "GET" }).handler(createSsrRpc("5742f06ab8d570f46b4a7dcc1c08508ac37b869cd315b909edbae9b445a29310"));
createServerFn({ method: "GET" }).handler(createSsrRpc("c48d57697be0289b4f650635f11852665b7e992ba6d7ecf904b350b911387e64"));
var getSiteMeta = createServerFn({ method: "GET" }).handler(createSsrRpc("52599bd47f880cfad5f961d7d9e3ff8a376ebbe5557314e4e279e6c7c4258ecd"));
var getHomeData = createServerFn({ method: "GET" }).handler(createSsrRpc("8e516e6c233a5b7ed69769059de3433e6aaa7835b16e18357cec1779bd83c31e"));
var getGalleryData = createServerFn({ method: "GET" }).handler(createSsrRpc("76664d24f1e6b3b6de635e04c1fed5593ae3a6ba816770496744a8d555b93b24"));
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
var trackAnalytics = createServerFn({ method: "POST" }).validator(trackSchema).handler(createSsrRpc("958f7d2aedd764c57b38c9237a712eeddab64c49ea53a954fba1ede4a0d240a5"));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/analytics-Cs69Y18q.js
function track(eventName, extra) {
	if (typeof window === "undefined") return;
	const params = new URLSearchParams(window.location.search);
	trackAnalytics({ data: {
		eventName,
		path: extra?.path ?? window.location.pathname,
		referrer: document.referrer || void 0,
		utmSource: params.get("utm_source") ?? void 0,
		utmMedium: params.get("utm_medium") ?? void 0,
		utmCampaign: params.get("utm_campaign") ?? void 0,
		landingPage: window.location.pathname,
		eventId: extra?.eventId
	} });
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/site-Cbv_J6Ha.js
var SITE = {
	name: "淡江大學禪學社",
	shortName: "淡江禪學社",
	nameEn: "TKU Zen Club",
	description: "在很忙的大學生活裡，留一點時間，認識自己。第一次來也沒關係。",
	instagramUrl: "https://www.instagram.com/tku_zc",
	instagramHandle: "@tku_zc",
	instagramDmUrl: "https://ig.me/m/tku_zc",
	campus: "淡江大學（淡水校園）",
	garden: "淡大覺軒花園"
};
var NAV = [
	{
		to: "/",
		label: "首頁",
		match: "exact"
	},
	{
		to: "/events",
		label: "活動",
		match: "prefix"
	},
	{
		to: "/first-time",
		label: "第一次來",
		match: "prefix"
	},
	{
		to: "/about",
		label: "認識我們",
		match: "prefix"
	},
	{
		to: "/join",
		label: "加入我們",
		match: "prefix"
	}
];
var BOTTOM_NAV = [
	{
		to: "/",
		label: "首頁",
		icon: "home",
		match: "exact"
	},
	{
		to: "/events",
		label: "活動",
		icon: "calendar",
		match: "prefix"
	},
	{
		to: "/first-time",
		label: "第一次來",
		icon: "compass",
		match: "prefix"
	},
	{
		to: "/join",
		label: "加入",
		icon: "heart",
		match: "prefix"
	}
];
var CATEGORY_LABELS = {
	tea: "茶會",
	lecture: "期初演講",
	class: "社課",
	zen: "禪修",
	outdoor: "戶外活動",
	gathering: "聚會",
	recruit: "招生",
	other: "其他"
};
var STATUS_LABELS = {
	upcoming: "即將開始",
	open: "報名中",
	filling: "名額將滿",
	full: "已額滿",
	ended: "活動結束"
};
var REGISTRATION_LABELS = {
	google_form: "Google 表單",
	internal: "網站報名",
	external: "外部連結",
	instagram_dm: "IG 私訊",
	closed: "暫不開放"
};
function withUtm(url, opts = {}) {
	try {
		const u = new URL(url, "https://tku-zen.local");
		u.searchParams.set("utm_source", opts.source ?? "website");
		u.searchParams.set("utm_medium", opts.medium ?? "site");
		if (opts.campaign) u.searchParams.set("utm_campaign", opts.campaign);
		if (opts.content) u.searchParams.set("utm_content", opts.content);
		if (url.startsWith("http")) return u.toString();
		return `${u.pathname}${u.search}${u.hash}`;
	} catch {
		return url;
	}
}
var MOODS = [
	{
		id: "tired",
		label: "最近有點累",
		lead: "先來坐一下就好。不用準備什麼。",
		categories: ["tea", "zen"]
	},
	{
		id: "self",
		label: "想認識自己",
		lead: "社課比較像一起找節奏，不是考試。",
		categories: ["class", "zen"]
	},
	{
		id: "friends",
		label: "想交新朋友",
		lead: "茶會跟小聚會最容易認識人。一個人來也很常見。",
		categories: ["tea", "gathering"]
	},
	{
		id: "mind",
		label: "腦袋一直停不下來",
		lead: "很正常。可以先來坐一下，或來茶會晃晃。",
		categories: ["zen", "tea"]
	},
	{
		id: "different",
		label: "想讓大學生活不一樣",
		lead: "從一場戶外走走或社課開始，就夠了。",
		categories: ["class", "outdoor"]
	},
	{
		id: "curious",
		label: "只是好奇禪到底是什麼",
		lead: "沒有入學考。來聽一場演講，或先看看第一次來專區。",
		categories: ["lecture", "class"]
	}
];
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-Gcz9kFnT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FALLBACK_MESSAGE = "出了一點狀況。重新整理看看。";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 bg-canvas px-6 text-center text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/images/turtle.jpg",
				alt: "",
				className: "size-24 rounded-full object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-xl font-semibold",
				children: "這一頁先坐一下"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-mist",
				children: errorMessage(error)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "mt-2 text-sm text-leaf",
				children: "回首頁"
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var LINES = [
	{
		at: 0,
		text: "先坐一下。",
		sub: "往下滑，天會慢慢亮。"
	},
	{
		at: .14,
		text: "嗨，我是龜龜。"
	},
	{
		at: .32,
		text: "我們是淡江大學禪學社。"
	},
	{
		at: .5,
		text: "不是寺廟，也不用先變成什麼樣的人。"
	},
	{
		at: .68,
		text: "在很忙的大學裡，留一點時間認識自己，也認識旁邊的人。"
	},
	{
		at: .84,
		text: "喝茶、社課、坐一下子、去覺軒走走。\n第一次來，也沒關係。"
	}
];
var STORY = LINES.filter((line) => line.at > 0);
function useZenChrome() {
	const onHome = useRouterState({ select: (s) => s.location.pathname }) === "/";
	const [inIntro, setInIntro] = (0, import_react.useState)(onHome);
	(0, import_react.useEffect)(() => {
		if (!onHome) {
			setInIntro(false);
			return;
		}
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setInIntro(false);
			return;
		}
		const update = () => {
			const intro = document.getElementById("zen-intro");
			const next = !!intro && intro.getBoundingClientRect().bottom > 72;
			setInIntro((prev) => prev === next ? prev : next);
		};
		update();
		window.addEventListener("scroll", update, { passive: true });
		window.addEventListener("resize", update);
		return () => {
			window.removeEventListener("scroll", update);
			window.removeEventListener("resize", update);
		};
	}, [onHome]);
	return inIntro;
}
function ZenIntro() {
	const trackRef = (0, import_react.useRef)(null);
	const stageRef = (0, import_react.useRef)(null);
	const lineRef = (0, import_react.useRef)(0);
	const ctaRef = (0, import_react.useRef)(false);
	const [line, setLine] = (0, import_react.useState)(0);
	const [showCta, setShowCta] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const track = trackRef.current;
		const stage = stageRef.current;
		if (!track || !stage) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			stage.style.setProperty("--dawn", "1");
			document.documentElement.style.setProperty("--dawn", "1");
			return;
		}
		let frame = 0;
		const update = () => {
			const total = track.offsetHeight - window.innerHeight;
			const scrolled = Math.min(Math.max(-track.getBoundingClientRect().top, 0), Math.max(total, 0));
			const progress = total > 0 ? scrolled / total : 1;
			stage.style.setProperty("--dawn", progress.toFixed(4));
			document.documentElement.style.setProperty("--dawn", progress.toFixed(4));
			let next = 0;
			for (let i = 0; i < LINES.length; i++) if (progress >= LINES[i].at) next = i;
			if (next !== lineRef.current) {
				lineRef.current = next;
				setLine(next);
			}
			const cta = progress >= .92;
			if (cta !== ctaRef.current) {
				ctaRef.current = cta;
				setShowCta(cta);
			}
		};
		const onScroll = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(update);
		};
		update();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		};
	}, []);
	const skip = () => {
		const track = trackRef.current;
		if (!track) return;
		const top = window.scrollY + track.getBoundingClientRect().bottom - window.innerHeight + 4;
		window.scrollTo({
			top,
			behavior: "smooth"
		});
	};
	const current = LINES[line] ?? LINES[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "zen-intro",
		ref: trackRef,
		className: "zen-track",
		"aria-label": "龜龜開場",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: stageRef,
			className: "zen-stage",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "zen-sky" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "zen-stars" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "zen-moon" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "zen-sun" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "zen-bloom" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "zen-hill zen-hill-back" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "zen-hill" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "zen-meter" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 flex h-full min-h-0 flex-col items-center justify-end px-5 pb-5 md:pb-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: skip,
							className: showCta ? "zen-skip hidden" : "zen-skip",
							children: "跳過介紹"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "zen-figure",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "zen-shadow" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/images/turtle-zen.png",
									alt: "閉著眼睛、盤腿禪定的龜龜",
									className: "zen-still",
									draggable: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/images/turtle-zen-open.png",
									alt: "",
									className: "zen-awake",
									draggable: false
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "zen-card motion-reduce:hidden",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-medium tracking-widest text-leaf uppercase",
									children: "龜龜"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"aria-live": "polite",
									className: "zen-line mt-1 whitespace-pre-line font-display text-2xl font-semibold leading-snug md:text-3xl",
									children: current.text
								}, current.text),
								"sub" in current && current.sub ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-mist",
									children: current.sub
								}) : null,
								showCta ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IntroActions, {}) : null
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "zen-card hidden motion-reduce:block",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-medium tracking-widest text-leaf uppercase",
									children: "龜龜"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 space-y-3 text-left",
									children: STORY.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-lg font-semibold leading-snug",
										children: item.text
									}, item.text))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IntroActions, {})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "zen-chevron",
							"aria-hidden": "true",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-5" })
						})
					]
				})
			]
		})
	});
}
function IntroActions() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 flex flex-wrap justify-center gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/events",
				onClick: () => track("hero_events_cta"),
				children: "看看最近活動"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			variant: "outline",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/first-time",
				onClick: () => track("hero_first_time_cta"),
				children: "第一次來？"
			})
		})]
	});
}
var icons = {
	home: House,
	calendar: CalendarDays,
	compass: Compass,
	heart: Heart
};
function BottomNav() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const inIntro = useZenChrome();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: cn("fixed inset-x-0 bottom-0 z-40 border-t border-line bg-canvas/95 backdrop-blur-md transition-transform duration-300 md:hidden", inIntro && "translate-y-full"),
		style: { paddingBottom: "env(safe-area-inset-bottom)" },
		"aria-label": "底部",
		"aria-hidden": inIntro,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid grid-cols-4",
			children: BOTTOM_NAV.map((item) => {
				const Icon = icons[item.icon];
				const active = item.match === "exact" ? pathname === item.to : pathname === item.to || pathname.startsWith(`${item.to}/`);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: item.to,
					className: cn("flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px] font-medium no-underline", active ? "text-leaf" : "text-mist"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						className: "size-5",
						strokeWidth: active ? 2.2 : 1.8
					}), item.label]
				}) }, item.to);
			})
		})
	});
}
function TurtleMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: cn("text-leaf", className),
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "8",
				cy: "16.5",
				r: "3",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "24",
				cy: "16.5",
				r: "3",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "10",
				cy: "24",
				r: "3",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "22",
				cy: "24",
				r: "3",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "16",
				cy: "18.5",
				rx: "10",
				ry: "7.5",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "16",
				cy: "8.5",
				r: "4.2",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "16",
				cy: "18.5",
				r: "3.2",
				fill: "#F4EFE4"
			})
		]
	});
}
function Logo({ className, compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: cn("flex items-center gap-2.5 text-ink no-underline", className),
		"aria-label": "淡江大學禪學社 首頁",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TurtleMark, { className: "size-8 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "leading-tight",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block font-display text-[15px] font-semibold tracking-tight",
				children: "淡江禪學社"
			}), compact ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block text-[11px] tracking-[0.12em] text-mist uppercase",
				children: "TKU Zen Club"
			})]
		})]
	});
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "border-t border-line bg-paper",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4 md:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-sm text-sm text-mist",
						children: "一群淡江學生，練習把生活放慢一點。不是寺廟，也不是功課。"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: "逛逛"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 space-y-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/events",
							className: "text-mist no-underline hover:text-ink",
							children: "近期活動"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/first-time",
							className: "text-mist no-underline hover:text-ink",
							children: "第一次來"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/join",
							className: "text-mist no-underline hover:text-ink",
							children: "加入我們"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/gallery",
							className: "text-mist no-underline hover:text-ink",
							children: "活動回顧"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: "找到我們"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 space-y-2 text-sm text-mist",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: withUtm(SITE.instagramUrl, {
								medium: "footer",
								campaign: "instagram"
							}),
							className: "no-underline hover:text-ink",
							target: "_blank",
							rel: "noreferrer",
							children: ["Instagram ", SITE.instagramHandle]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: SITE.campus }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							className: "text-mist/80 no-underline hover:text-ink",
							children: "社員後台"
						}) })
					]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mx-auto max-w-6xl px-4 py-4 text-xs text-mist md:px-6",
				children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" ",
					SITE.name,
					" · ",
					SITE.nameEn
				]
			})
		})]
	});
}
function isActive(pathname, to, match) {
	if (match === "exact") return pathname === to;
	return pathname === to || pathname.startsWith(`${to}/`);
}
function SiteHeader() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const inIntro = useZenChrome();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: cn("sticky top-0 z-40 border-b backdrop-blur-md transition-colors duration-300", inIntro ? "zen-header border-transparent bg-transparent" : "border-line/70 bg-canvas/92 backdrop-blur-md"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:h-16 md:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
				compact: true,
				className: inIntro ? "text-raised" : void 0
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "hidden items-center gap-1 md:flex",
				"aria-label": "主要",
				children: [NAV.filter((item) => item.to !== "/").map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: item.to,
					className: cn("rounded-full px-3 py-2 text-sm font-medium no-underline transition-colors", inIntro ? "text-raised/85 hover:text-raised" : "text-mist hover:text-ink", isActive(pathname, item.to, item.match) && (inIntro ? "bg-raised/15 text-raised" : "bg-paper text-ink")),
					children: item.label
				}, item.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: withUtm(SITE.instagramUrl, {
						medium: "header",
						campaign: "instagram"
					}),
					target: "_blank",
					rel: "noreferrer",
					className: cn("ml-1 inline-flex size-10 items-center justify-center rounded-full hover:bg-paper", inIntro ? "text-raised hover:bg-raised/10" : "text-ink"),
					"aria-label": "Instagram @tku_zc",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "size-4" })
				})]
			})]
		})
	});
}
function SiteShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-canvas text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#main",
				className: "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-raised focus:px-4 focus:py-2",
				children: "跳到主要內容"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id: "main",
				className: "pb-24 md:pb-0",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomNav, {})
		]
	});
}
function NotFoundPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-6 py-16 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/images/turtle.jpg",
				alt: "",
				className: "mb-6 size-32 rounded-full object-cover shadow-soft"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold tracking-tight",
				children: "好像走到花園外面了"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-mist",
				children: "這頁不存在。回首頁，或直接去看看最近的活動。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap justify-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: "回首頁"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/events",
						children: "最近活動"
					})
				})]
			})
		]
	});
}
var styles_default = "/assets/styles-B_ER1ZwU.css";
var FONT = "https://fonts.googleapis.com/css2?family=Figtree:wght@500;600;700&family=Noto+Sans+TC:wght@400;500;600;700&display=swap";
var Route$21 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: SITE.name },
			{
				name: "description",
				content: SITE.description
			},
			{
				name: "theme-color",
				content: "#F3EEE4"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "stylesheet",
				href: FONT
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "canonical",
				href: "/"
			}
		]
	}),
	notFoundComponent: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotFoundPage, {}) }),
	component: RootDocument
});
function RootDocument() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const bare = pathname.startsWith("/admin") || pathname.startsWith("/login");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "zh-Hant-TW",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: bare ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
function Skeleton({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("animate-pulse rounded-md bg-line/70", className) });
}
var $$splitComponentImporter$17 = () => import("./routes-D16teGjd.mjs");
var Route$20 = createFileRoute("/")({
	loader: () => getHomeData(),
	pendingComponent: HomeSkeleton,
	component: lazyRouteComponent($$splitComponentImporter$17, "component"),
	head: () => ({ meta: [{ title: `${SITE.name}｜${SITE.nameEn}` }, {
		name: "description",
		content: SITE.description
	}] })
});
function HomeSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-[70vh] w-full rounded-xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-72 rounded-xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-72 rounded-xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-72 rounded-xl" })
			]
		})]
	});
}
var $$splitComponentImporter$16 = () => import("./about-BF5wIPOY.mjs");
var Route$19 = createFileRoute("/about")({
	component: lazyRouteComponent($$splitComponentImporter$16, "component"),
	head: () => ({ meta: [{ title: `認識我們｜${SITE.name}` }, {
		name: "description",
		content: "淡江禪學社是一群很好相處的人。認識自己、慢下來、交朋友。"
	}] })
});
var $$splitComponentImporter$15 = () => import("./admin-BgVEz7ie.mjs");
var Route$18 = createFileRoute("/admin")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var $$splitComponentImporter$14 = () => import("./events-BIkp57ao.mjs");
var Route$17 = createFileRoute("/events")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./first-time-CSzLs9Ld.mjs");
var Route$16 = createFileRoute("/first-time")({
	loader: () => getHomeData(),
	component: lazyRouteComponent($$splitComponentImporter$13, "component"),
	head: () => ({ meta: [{ title: `第一次來｜${SITE.name}` }, {
		name: "description",
		content: "一個人來可以。不會打坐也可以。只來一次也可以。"
	}] })
});
var $$splitComponentImporter$12 = () => import("./gallery-DAEaT9yN.mjs");
var Route$15 = createFileRoute("/gallery")({
	loader: () => getGalleryData(),
	component: lazyRouteComponent($$splitComponentImporter$12, "component"),
	head: () => ({ meta: [{ title: `活動回顧｜${SITE.name}` }, {
		name: "description",
		content: "茶會、花園、社課現場。不是相簿清單，是走過去的感覺。"
	}] })
});
var $$splitComponentImporter$11 = () => import("./join-3X40RWe5.mjs");
var Route$14 = createFileRoute("/join")({
	loader: () => getPublishedEvents(),
	component: lazyRouteComponent($$splitComponentImporter$11, "component"),
	head: () => ({ meta: [{ title: `加入我們｜${SITE.name}` }, {
		name: "description",
		content: "想加入，先來一場就好。也可以先追 IG。"
	}] })
});
var $$splitComponentImporter$10 = () => import("./login-Dgl3ORHD.mjs");
var Route$13 = createFileRoute("/login")({
	component: lazyRouteComponent($$splitComponentImporter$10, "component"),
	head: () => ({ meta: [{ title: `後台登入｜${SITE.name}` }] })
});
var Route$12 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
	const origin = "https://tku-zen.grok.app";
	const [events, stories] = await Promise.all([getPublishedEvents(), getPublishedStories()]);
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[
		"/",
		"/events",
		"/first-time",
		"/about",
		"/stories",
		"/gallery",
		"/join",
		...events.map((e) => `/events/${e.slug}`),
		...stories.map((s) => `/stories/${s.slug}`)
	].map((u) => `  <url><loc>${origin}${u}</loc></url>`).join("\n")}
</urlset>`;
	return new Response(xml, { headers: { "content-type": "application/xml; charset=utf-8" } });
} } } });
var $$splitComponentImporter$9 = () => import("./stories-C-sXcP7G.mjs");
var Route$11 = createFileRoute("/stories")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./admin-B5zzAfOT.mjs");
var Route$10 = createFileRoute("/admin/")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./assets-BH_n6QKc.mjs");
var Route$9 = createFileRoute("/admin/assets")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./content-BXUOCPNx.mjs");
var Route$8 = createFileRoute("/admin/content")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./events-DOb6-2EP.mjs");
var Route$7 = createFileRoute("/admin/events")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./settings-CCWfrDVo.mjs");
var Route$6 = createFileRoute("/admin/settings")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium", {
	variants: { tone: {
		open: "bg-chip-open text-leaf",
		filling: "bg-chip-fill text-ink",
		upcoming: "bg-paper text-mist border border-line",
		full: "bg-chip-end text-mist",
		ended: "bg-chip-end text-mist",
		leaf: "bg-leaf/10 text-leaf",
		coral: "bg-coral/10 text-coral",
		sky: "bg-sky/10 text-sky"
	} },
	defaultVariants: { tone: "upcoming" }
});
function Badge({ className, tone, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ tone }), className),
		...props
	});
}
var toneMap = {
	open: "open",
	filling: "filling",
	upcoming: "upcoming",
	full: "full",
	ended: "ended"
};
function EventCard({ event, featured = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/events/$slug",
		params: { slug: event.slug },
		className: cn("group flex flex-col overflow-hidden rounded-xl bg-raised shadow-lift border border-line/80 no-underline text-ink", featured ? "min-w-[280px]" : ""),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-[4/3] overflow-hidden bg-paper",
			children: [event.coverImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: event.coverImage,
				alt: "",
				className: "size-full object-cover transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-[1.03]",
				loading: "lazy"
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute left-3 top-3 flex gap-1.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: toneMap[event.computedStatus],
					children: STATUS_LABELS[event.computedStatus]
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col gap-2 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-wide text-leaf",
					children: CATEGORY_LABELS[event.categoryId] ?? event.categoryName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-lg font-semibold leading-snug tracking-tight",
					children: event.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-mist",
					children: formatEventRange(event.startsAt, event.endsAt)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-1.5 text-sm text-mist",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
						className: "size-3.5 shrink-0",
						"aria-hidden": true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: event.locationName
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-auto pt-1 text-sm leading-relaxed text-ink/80 line-clamp-2",
					children: event.summary
				})
			]
		})]
	});
}
function EventStatusBadge({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		tone: toneMap[status],
		children: STATUS_LABELS[status]
	});
}
var Route$5 = createFileRoute("/events/")({
	loader: () => getPublishedEvents(),
	pendingComponent: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl space-y-4 px-5 py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-10 w-48" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-72" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-72" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-72" })
			]
		})]
	}),
	component: EventsPage,
	head: () => ({ meta: [{ title: `活動｜${SITE.name}` }, {
		name: "description",
		content: "茶會、社課、禪修體驗、期初演講。第一次來也沒關係。"
	}] })
});
var CATS = [
	"all",
	"tea",
	"lecture",
	"class",
	"zen",
	"outdoor",
	"gathering"
];
var STATUSES = [
	"all",
	"open",
	"filling",
	"upcoming",
	"ended"
];
function EventsPage() {
	const events = Route$5.useLoaderData();
	const [cat, setCat] = (0, import_react.useState)("all");
	const [status, setStatus] = (0, import_react.useState)("all");
	const filtered = (0, import_react.useMemo)(() => {
		return events.filter((e) => {
			if (cat !== "all" && e.categoryId !== cat) return false;
			if (status !== "all" && e.computedStatus !== status) return false;
			return true;
		});
	}, [
		events,
		cat,
		status
	]);
	const upcoming = filtered.filter((e) => e.computedStatus !== "ended");
	const past = filtered.filter((e) => e.computedStatus === "ended");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-5 py-10 md:px-6 md:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium tracking-wide text-leaf",
				children: "活動"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl font-semibold tracking-tight",
				children: "最近想去哪一場？"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-xl text-mist",
				children: "一個人來完全 OK。選一場、到現場就好。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 flex gap-2 overflow-x-auto pb-1 hide-scrollbar",
				children: CATS.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					active: cat === id,
					onClick: () => setCat(id),
					children: id === "all" ? "全部" : CATEGORY_LABELS[id]
				}, id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex gap-2 overflow-x-auto pb-1 hide-scrollbar",
				children: STATUSES.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					active: status === id,
					onClick: () => setStatus(id),
					children: id === "all" ? "所有狀態" : STATUS_LABELS[id]
				}, id))
			}),
			upcoming.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: upcoming.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventCard, { event }, event.id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 rounded-xl border border-line bg-paper p-6 text-mist",
				children: "這個篩選目前沒有場次。換一個分類，或去 IG 看最新的。"
			}),
			status === "all" && past.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-semibold tracking-tight",
					children: "已經辦過的"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: past.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventCard, { event }, event.id))
				})]
			}) : null
		]
	});
}
function Chip({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("min-h-10 shrink-0 rounded-full border px-4 text-sm", active ? "border-leaf bg-leaf text-leaf-fg" : "border-line bg-raised text-ink"),
		children
	});
}
var $$splitComponentImporter$3 = () => import("./events._slug-BNJ_VEOA.mjs");
var $$splitNotFoundComponentImporter$1 = () => import("./events._slug-DKcSUsPf.mjs");
var Route$4 = createFileRoute("/events/$slug")({
	loader: async ({ params }) => {
		const data = await getEventBySlug({ data: { slug: params.slug } });
		if (!data) throw notFound();
		return data;
	},
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$1, "notFoundComponent"),
	component: lazyRouteComponent($$splitComponentImporter$3, "component"),
	head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.event.title ?? "活動"}｜${SITE.name}` }, {
		name: "description",
		content: loaderData?.event.summary ?? SITE.description
	}] })
});
var $$splitComponentImporter$2 = () => import("./stories.index-bKjytSd3.mjs");
var Route$3 = createFileRoute("/stories/")({
	loader: () => getPublishedStories(),
	component: lazyRouteComponent($$splitComponentImporter$2, "component"),
	head: () => ({ meta: [{ title: `社員故事｜${SITE.name}` }, {
		name: "description",
		content: "我原本只是陪朋友來。第一次參加是茶會。"
	}] })
});
var $$splitComponentImporter$1 = () => import("./stories._slug-DD-u_VAL.mjs");
var $$splitNotFoundComponentImporter = () => import("./stories._slug-6xjgLLUF.mjs");
var Route$2 = createFileRoute("/stories/$slug")({
	loader: async ({ params }) => {
		const story = await getStoryBySlug({ data: { slug: params.slug } });
		if (!story) throw notFound();
		return story;
	},
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.quote ?? "社員故事"}｜${SITE.name}` }, {
		name: "description",
		content: loaderData?.quote ?? ""
	}] })
});
var $$splitComponentImporter = () => import("./event._id-BvEzbRIj.mjs");
var Route$1 = createFileRoute("/admin/event/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var Route = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.handler(request),
	POST: ({ request }) => auth.handler(request)
} } });
var IndexRoute = Route$20.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$21
});
var AboutRoute = Route$19.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$21
});
var AdminRoute = Route$18.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$21
});
var EventsRoute = Route$17.update({
	id: "/events",
	path: "/events",
	getParentRoute: () => Route$21
});
var FirstTimeRoute = Route$16.update({
	id: "/first-time",
	path: "/first-time",
	getParentRoute: () => Route$21
});
var GalleryRoute = Route$15.update({
	id: "/gallery",
	path: "/gallery",
	getParentRoute: () => Route$21
});
var JoinRoute = Route$14.update({
	id: "/join",
	path: "/join",
	getParentRoute: () => Route$21
});
var LoginRoute = Route$13.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$21
});
var SitemapDotxmlRoute = Route$12.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$21
});
var StoriesRoute = Route$11.update({
	id: "/stories",
	path: "/stories",
	getParentRoute: () => Route$21
});
var AdminIndexRoute = Route$10.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRoute
});
var AdminAssetsRoute = Route$9.update({
	id: "/assets",
	path: "/assets",
	getParentRoute: () => AdminRoute
});
var AdminContentRoute = Route$8.update({
	id: "/content",
	path: "/content",
	getParentRoute: () => AdminRoute
});
var AdminEventsRoute = Route$7.update({
	id: "/events",
	path: "/events",
	getParentRoute: () => AdminRoute
});
var AdminSettingsRoute = Route$6.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AdminRoute
});
var EventsIndexRoute = Route$5.update({
	id: "/",
	path: "/",
	getParentRoute: () => EventsRoute
});
var EventsSlugRoute = Route$4.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => EventsRoute
});
var StoriesIndexRoute = Route$3.update({
	id: "/",
	path: "/",
	getParentRoute: () => StoriesRoute
});
var StoriesSlugRoute = Route$2.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => StoriesRoute
});
var AdminEventIdRoute = Route$1.update({
	id: "/event/$id",
	path: "/event/$id",
	getParentRoute: () => AdminRoute
});
var ApiAuthSplatRoute = Route.update({
	id: "/api/auth/$",
	path: "/api/auth/$",
	getParentRoute: () => Route$21
});
var AdminRouteChildren = {
	AdminAssetsRoute,
	AdminContentRoute,
	AdminEventsRoute,
	AdminSettingsRoute,
	AdminIndexRoute,
	AdminEventIdRoute
};
var AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
var EventsRouteChildren = {
	EventsSlugRoute,
	EventsIndexRoute
};
var EventsRouteWithChildren = EventsRoute._addFileChildren(EventsRouteChildren);
var StoriesRouteChildren = {
	StoriesSlugRoute,
	StoriesIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	AdminRoute: AdminRouteWithChildren,
	EventsRoute: EventsRouteWithChildren,
	FirstTimeRoute,
	GalleryRoute,
	JoinRoute,
	LoginRoute,
	SitemapDotxmlRoute,
	StoriesRoute: StoriesRoute._addFileChildren(StoriesRouteChildren),
	ApiAuthSplatRoute
};
var routeTree = Route$21._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		defaultPreload: "intent",
		scrollRestoration: true
	});
}
//#endregion
export { getSiteMeta as S, MOODS as _, Route$4 as a, withUtm as b, Route$14 as c, Route$20 as d, Skeleton as f, CATEGORY_LABELS as g, ZenIntro as h, Route$3 as i, Route$15 as l, Logo as m, Route$1 as n, EventCard as o, NotFoundPage as p, Route$2 as r, EventStatusBadge as s, router_exports as t, Route$16 as u, REGISTRATION_LABELS as v, track as x, SITE as y };
