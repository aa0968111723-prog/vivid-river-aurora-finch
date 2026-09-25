import { n as Button } from "./createSsrRpc-B2Izd0c7.mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as Instagram } from "../_libs/lucide-react.mjs";
import { S as track, b as SITE, c as Route$15, o as EventCard, x as withUtm } from "./router-B2Rg5uI9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/join-CIkLgsEk.js
var import_jsx_runtime = require_jsx_runtime();
function JoinPage() {
	const { events, layout } = Route$15.useLoaderData();
	const page = layout.pages.join;
	const upcoming = events.filter((e) => e.computedStatus !== "ended").slice(0, 3);
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
						children: page.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-raised/90",
						children: page.lead
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto grid max-w-6xl gap-4 px-5 py-12 md:grid-cols-3 md:px-6",
			children: page.steps.map((s, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-line bg-raised p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-leaf",
						children: index + 1
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-xl font-semibold",
						children: s.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-mist",
						children: s.body
					})
				]
			}, s.title))
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
						children: "私訊「想參加」"
					})
				})]
			})
		}),
		upcoming.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-5 py-12 md:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-semibold",
					children: "最近可以先去的"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid gap-4 md:grid-cols-3",
					children: upcoming.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventCard, { event: e }, e.id))
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
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mx-auto max-w-6xl px-5 pb-16 text-center text-sm text-mist md:px-6",
			children: [
				"最近的場次還在排，先追 IG ",
				SITE.instagramHandle,
				"。"
			]
		})
	] });
}
//#endregion
export { JoinPage as component };
