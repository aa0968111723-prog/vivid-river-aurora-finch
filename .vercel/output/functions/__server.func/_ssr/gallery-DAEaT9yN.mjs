import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as formatEventDate } from "./format-Cui_ik7J.mjs";
import { l as Route$15 } from "./router-Gcz9kFnT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gallery-DAEaT9yN.js
var import_jsx_runtime = require_jsx_runtime();
function GalleryPage() {
	const { eventAssets, pastEvents } = Route$15.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-5 py-12 md:px-6 md:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium tracking-wide text-leaf",
				children: "活動回顧"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl font-semibold tracking-tight",
				children: "那幾天的光"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-xl text-mist",
				children: "照片來自社團活動。想參加下一場，從活動頁開始。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 columns-2 gap-3 md:columns-3",
				children: eventAssets.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/events/$slug",
					params: { slug: a.event_slug },
					className: "mb-3 block break-inside-avoid overflow-hidden rounded-lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: a.url,
						alt: a.caption ?? a.event_title,
						className: "w-full object-cover",
						loading: "lazy"
					})
				}, a.id))
			}),
			pastEvents.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-semibold",
					children: "依活動"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-3",
					children: pastEvents.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/events/$slug",
						params: { slug: e.slug },
						className: "text-ink no-underline hover:text-leaf",
						children: [e.title, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-2 text-sm text-mist",
							children: formatEventDate(e.startsAt)
						})]
					}) }, e.id))
				})]
			}) : null
		]
	});
}
//#endregion
export { GalleryPage as component };
