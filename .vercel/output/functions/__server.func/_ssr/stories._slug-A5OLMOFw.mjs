import { n as Button } from "./createSsrRpc-B2Izd0c7.mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as Route$2 } from "./router-B2Rg5uI9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stories._slug-A5OLMOFw.js
var import_jsx_runtime = require_jsx_runtime();
function StoryPage() {
	const story = Route$2.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-3xl px-5 py-12 md:px-6 md:py-16",
		children: [
			story.photoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: story.photoUrl,
				alt: "",
				className: "mb-8 aspect-[4/3] w-full rounded-xl object-cover"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-mist",
				children: [
					story.displayName,
					story.roleLabel ? ` · ${story.roleLabel}` : "",
					story.joinedLabel ? ` · ${story.joinedLabel}` : ""
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl",
				children: [
					"「",
					story.quote,
					"」"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 whitespace-pre-line text-[17px] leading-relaxed",
				children: story.body
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 flex gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/events",
						children: "去看活動"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/stories",
						children: "其他故事"
					})
				})]
			})
		]
	});
}
//#endregion
export { StoryPage as component };
