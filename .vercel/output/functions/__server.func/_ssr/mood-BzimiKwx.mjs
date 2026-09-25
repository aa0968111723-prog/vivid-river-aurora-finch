import { o as __toESM } from "../_runtime.mjs";
import { n as Button, r as cn } from "./createSsrRpc-B2Izd0c7.mjs";
import { c as require_jsx_runtime, l as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as track, b as SITE, o as EventCard, v as MOODS } from "./router-B2Rg5uI9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mood-BzimiKwx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MoodPicker({ events, title = "最近的你，是哪一種狀態？", subtitle = "第一次認識禪學社" }) {
	const [mood, setMood] = (0, import_react.useState)(null);
	const selected = MOODS.find((m) => m.id === mood);
	const recs = (0, import_react.useMemo)(() => {
		if (!selected) return [];
		const now = Date.now();
		return events.filter((e) => selected.categories.includes(e.categoryId) && Date.parse(e.endsAt) >= now && e.computedStatus !== "ended").slice(0, 3);
	}, [events, selected]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-paper py-16 md:py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5 md:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium tracking-wide text-leaf",
					children: subtitle
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 max-w-lg font-display text-3xl font-semibold tracking-tight md:text-4xl",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-lg text-mist",
					children: "不是測驗，也不是診斷。選一個最接近的，我們帶你去看看適合的活動。"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 flex flex-wrap gap-2",
					children: MOODS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setMood(item.id);
							track("mood_select", { eventId: item.id });
						},
						className: cn("min-h-11 rounded-full border px-4 text-sm transition-colors", mood === item.id ? "border-leaf bg-leaf text-leaf-fg" : "border-line bg-raised text-ink hover:bg-canvas"),
						children: item.label
					}, item.id))
				}),
				selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-ink",
						children: selected.lead
					}), recs.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
						children: recs.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventCard, { event }, event.id))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 rounded-xl border border-line bg-raised p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-mist",
							children: [
								"最近的場次還在排，先追",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: SITE.instagramUrl,
									className: "text-leaf",
									target: "_blank",
									rel: "noreferrer",
									children: ["IG ", SITE.instagramHandle]
								}),
								"。"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							className: "mt-4",
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/first-time",
								children: "第一次來專區"
							})
						})]
					})]
				}) : null
			]
		})
	});
}
//#endregion
export { MoodPicker as t };
