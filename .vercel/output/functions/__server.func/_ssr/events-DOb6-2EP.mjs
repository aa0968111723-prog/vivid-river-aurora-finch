import { o as __toESM } from "../_runtime.mjs";
import { t as Button } from "./button-BYDjDX5S.mjs";
import { c as require_jsx_runtime, l as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as formatEventDate } from "./format-Cui_ik7J.mjs";
import { g as CATEGORY_LABELS, s as EventStatusBadge } from "./router-Gcz9kFnT.mjs";
import { o as listAdminEvents, t as archiveEvent } from "./admin-DlAoa8X-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/events-DOb6-2EP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminEvents() {
	const [events, setEvents] = (0, import_react.useState)(null);
	const refresh = () => void listAdminEvents().then(setEvents);
	(0, import_react.useEffect)(() => {
		refresh();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-2xl font-semibold",
			children: "活動"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/admin/event/$id",
				params: { id: "new" },
				children: "新增活動"
			})
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-6 overflow-x-auto rounded-xl border border-line bg-raised",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-[640px] text-left text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
				className: "border-b border-line text-mist",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-3 font-medium",
						children: "名稱"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-3 font-medium",
						children: "日期"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-3 font-medium",
						children: "分類"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-3 font-medium",
						children: "狀態"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3 font-medium" })
				] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: (events ?? []).map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-b border-line/70",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						className: "px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: e.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-mist",
							children: e.status
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-4 py-3",
						children: formatEventDate(e.startsAt)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-4 py-3",
						children: CATEGORY_LABELS[e.categoryId]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-4 py-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventStatusBadge, { status: e.computedStatus })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						className: "px-4 py-3 text-right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admin/event/$id",
							params: { id: e.id },
							className: "mr-3 text-leaf",
							children: "編輯"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-danger",
							onClick: async () => {
								if (!confirm("確定封存這場活動？")) return;
								await archiveEvent({ data: { id: e.id } });
								refresh();
							},
							children: "封存"
						})]
					})
				]
			}, e.id)) })]
		}), events && events.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "p-6 text-sm text-mist",
			children: "還沒有活動。先新增一場。"
		}) : null]
	})] });
}
//#endregion
export { AdminEvents as component };
