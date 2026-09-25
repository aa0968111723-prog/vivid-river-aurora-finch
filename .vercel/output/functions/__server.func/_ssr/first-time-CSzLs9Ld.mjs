import { t as Button } from "./button-BYDjDX5S.mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as Route$16 } from "./router-Gcz9kFnT.mjs";
import { t as FaqList } from "./faq-list-BAqwcEDo.mjs";
import { t as MoodPicker } from "./mood-wOnbeQJZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/first-time-CSzLs9Ld.js
var import_jsx_runtime = require_jsx_runtime();
var CARDS = [
	{
		title: "一個人來可以嗎？",
		body: "可以，而且很常見。"
	},
	{
		title: "一定要會打坐嗎？",
		body: "不用。不會才是正常的。"
	},
	{
		title: "需要宗教信仰嗎？",
		body: "不需要。這是大學社團。"
	},
	{
		title: "可以只來一次嗎？",
		body: "可以。先來坐坐看。"
	}
];
function FirstTime() {
	const data = Route$16.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative isolate overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/garden-path.jpg",
					alt: "",
					className: "absolute inset-0 size-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-ink/40 to-canvas" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto max-w-3xl px-5 py-24 md:py-32",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium tracking-wide text-raised/90",
							children: "第一次來"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 font-display text-4xl font-semibold tracking-tight text-raised md:text-5xl",
							children: "不用懂禪，也不用會打坐"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-lg text-raised/90",
							children: "先來坐坐看。一個人來完全 OK。活動不會很嚴肅，也沒有人會點名。"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/events",
									children: "看看最近活動"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								variant: "outline",
								className: "bg-raised/90",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/join",
									children: "想加入的話"
								})
							})]
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto grid max-w-6xl gap-4 px-5 py-12 sm:grid-cols-2 md:px-6",
			children: CARDS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-line bg-raised p-6 shadow-lift",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold",
					children: c.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-mist",
					children: c.body
				})]
			}, c.title))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoodPicker, { events: data.events }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-3xl px-5 py-16 md:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl font-semibold tracking-tight",
				children: "你可能還想問"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaqList, { items: data.faq })
			})]
		})
	] });
}
//#endregion
export { FirstTime as component };
