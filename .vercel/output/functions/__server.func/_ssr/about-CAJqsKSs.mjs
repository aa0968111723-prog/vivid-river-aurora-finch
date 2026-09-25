import { n as Button } from "./createSsrRpc-B2Izd0c7.mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Route$20 } from "./router-B2Rg5uI9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-CAJqsKSs.js
var import_jsx_runtime = require_jsx_runtime();
function About() {
	const { pages } = Route$20.useLoaderData();
	const about = pages.about;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative isolate overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/tricolor-light.jpg",
					alt: "",
					className: "absolute inset-0 size-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-ink/30 to-canvas" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto max-w-3xl px-5 py-24",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium tracking-wide text-raised/90",
						children: "認識我們"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-display text-4xl font-semibold tracking-tight text-raised",
						children: about.title
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-3xl space-y-6 px-5 py-12 text-[17px] leading-relaxed md:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: about.p1 }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: about.p2 }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: about.p3 }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-mist",
					children: about.official
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-5 pb-16 md:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/images/turtle.jpg",
				alt: "龜龜，禪學社的帶路角色",
				className: "mx-auto max-w-xs"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex justify-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/events",
						children: "看看活動"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/join",
						children: "加入我們"
					})
				})]
			})]
		})
	] });
}
//#endregion
export { About as component };
