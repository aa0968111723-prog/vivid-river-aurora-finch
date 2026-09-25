import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Route$3 } from "./router-B2Rg5uI9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stories.index-BduDOFXe.js
var import_jsx_runtime = require_jsx_runtime();
function StoriesPage() {
	const stories = Route$3.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-5 py-12 md:px-6 md:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium tracking-wide text-leaf",
				children: "社員故事"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl font-semibold tracking-tight",
				children: "社員故事"
			}),
			stories.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-mist",
				children: "真實社員故事籌備中。"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-6 md:grid-cols-3",
				children: stories.map((story) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/stories/$slug",
					params: { slug: story.slug },
					className: "overflow-hidden rounded-xl border border-line bg-raised no-underline shadow-lift",
					children: [story.photoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: story.photoUrl,
						alt: "",
						className: "aspect-[4/3] w-full object-cover"
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-xl font-semibold leading-snug",
							children: [
								"「",
								story.quote,
								"」"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-sm text-mist",
							children: [story.displayName, story.joinedLabel ? ` · ${story.joinedLabel}` : ""]
						})]
					})]
				}, story.id))
			})
		]
	});
}
//#endregion
export { StoriesPage as component };
