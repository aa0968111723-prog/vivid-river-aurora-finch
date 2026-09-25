import { a as Trigger2, c as require_jsx_runtime, i as Root2, n as Header, r as Item, t as Content2 } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { s as ChevronDown } from "../_libs/lucide-react.mjs";
import { x as track } from "./router-Gcz9kFnT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/faq-list-BAqwcEDo.js
var import_jsx_runtime = require_jsx_runtime();
function FaqList({ items }) {
	if (!items.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-mist",
		children: "常見問題整理中。"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2, {
		type: "single",
		collapsible: true,
		className: "divide-y divide-line rounded-xl border border-line bg-raised",
		children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Item, {
			value: item.id,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger2, {
				className: "flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[15px] font-medium hover:bg-paper",
				onClick: () => track("faq_open", { eventId: item.id }),
				children: [item.question, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 shrink-0 text-mist transition-transform duration-200 ease-[var(--ease-out)] [[data-state=open]_&]:rotate-180" })]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
				className: "overflow-hidden data-[state=closed]:animate-out data-[state=open]:animate-in",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-5 pb-5 text-sm leading-relaxed text-mist",
					children: item.answer
				})
			})]
		}, item.id))
	});
}
//#endregion
export { FaqList as t };
