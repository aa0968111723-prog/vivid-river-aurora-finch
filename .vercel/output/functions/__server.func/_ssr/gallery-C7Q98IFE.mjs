import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as formatEventDate } from "./format-Bo5ti5XY.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as Route$16 } from "./router-B2Rg5uI9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gallery-C7Q98IFE.js
var import_jsx_runtime = require_jsx_runtime();
function GalleryPage() {
	const { eventAssets, pastEvents } = Route$16.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-5 py-12 md:px-6 md:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium tracking-wide text-leaf",
				children: "活動回顧"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl font-semibold tracking-tight",
				children: "活動回顧"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-xl text-mist",
				children: eventAssets.length ? "下面是已核對過的活動。照片不會用生成圖充數。" : "真實活動照片還在整理。可以先看已經結束的場次，或追 IG。"
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
