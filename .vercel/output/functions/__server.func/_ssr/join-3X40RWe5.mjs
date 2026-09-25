import { t as Button } from "./button-BYDjDX5S.mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as Instagram } from "../_libs/lucide-react.mjs";
import { b as withUtm, c as Route$14, o as EventCard, x as track, y as SITE } from "./router-Gcz9kFnT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/join-3X40RWe5.js
var import_jsx_runtime = require_jsx_runtime();
function JoinPage() {
	const events = Route$14.useLoaderData().filter((e) => e.computedStatus !== "ended").slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative isolate overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/campus-dusk.jpg",
					alt: "",
					className: "absolute inset-0 size-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-ink/45" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto max-w-3xl px-5 py-24 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl font-semibold tracking-tight text-raised",
						children: "想加入，先來一場就好"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-raised/90",
						children: "不用先填一堆表。選一場活動，或直接去 IG 跟我們說你好。"
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto grid max-w-6xl gap-4 px-5 py-12 md:grid-cols-3 md:px-6",
			children: [
				{
					n: "1",
					t: "來看一場",
					d: "茶會最輕。演講也歡迎旁聽。"
				},
				{
					n: "2",
					t: "追 IG",
					d: "時間、地點、臨時取消，都會貼。"
				},
				{
					n: "3",
					t: "想加入再講",
					d: "招生期會開表單。現在也可以私訊。"
				}
			].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-line bg-raised p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-leaf",
						children: s.n
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-xl font-semibold",
						children: s.t
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-mist",
						children: s.d
					})
				]
			}, s.n))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-6xl px-5 pb-8 md:px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap justify-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "lg",
					variant: "coral",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: withUtm(SITE.instagramUrl, {
							medium: "join",
							campaign: "instagram"
						}),
						target: "_blank",
						rel: "noreferrer",
						onClick: () => track("join_ig_cta"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "size-4" }),
							"追 ",
							SITE.instagramHandle
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: withUtm(SITE.instagramDmUrl, {
							medium: "join",
							campaign: "dm"
						}),
						target: "_blank",
						rel: "noreferrer",
						onClick: () => track("join_dm_cta"),
						children: "IG 私訊我們"
					})
				})]
			})
		}),
		events.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-5 py-12 md:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-semibold",
					children: "最近可以先去的"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid gap-4 md:grid-cols-3",
					children: events.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventCard, { event: e }, e.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "ghost",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/events",
							children: "看全部活動"
						})
					})
				})
			]
		}) : null
	] });
}
//#endregion
export { JoinPage as component };
