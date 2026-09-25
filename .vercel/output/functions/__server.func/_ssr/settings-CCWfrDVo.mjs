import { o as __toESM } from "../_runtime.mjs";
import { t as Button } from "./button-BYDjDX5S.mjs";
import { c as require_jsx_runtime, l as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { S as getSiteMeta } from "./router-Gcz9kFnT.mjs";
import { m as saveSettings } from "./admin-DlAoa8X-.mjs";
import { n as Label, r as Textarea, t as Input } from "./input-nc7q72uQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-CCWfrDVo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminSettings() {
	const [name, setName] = (0, import_react.useState)("淡江大學禪學社");
	const [nameEn, setNameEn] = (0, import_react.useState)("TKU Zen Club");
	const [instagram, setInstagram] = (0, import_react.useState)("https://www.instagram.com/tku_zc");
	const [campus, setCampus] = (0, import_react.useState)("淡江大學（淡水校園）");
	const [note, setNote] = (0, import_react.useState)("");
	const [announcementTitle, setAnnouncementTitle] = (0, import_react.useState)("");
	const [announcementBody, setAnnouncementBody] = (0, import_react.useState)("");
	const [announcementHref, setAnnouncementHref] = (0, import_react.useState)("");
	const [announcementVisible, setAnnouncementVisible] = (0, import_react.useState)(false);
	const [msg, setMsg] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		getSiteMeta().then((m) => {
			setName(m.club.name);
			setNameEn(m.club.nameEn);
			setInstagram(m.club.instagram);
			setCampus(m.club.campus);
			setNote(m.club.note);
			setAnnouncementTitle(m.announcement.title);
			setAnnouncementBody(m.announcement.body);
			setAnnouncementHref(m.announcement.href);
			setAnnouncementVisible(m.announcement.visible);
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "mx-auto max-w-xl space-y-4",
		onSubmit: async (e) => {
			e.preventDefault();
			await saveSettings({ data: {
				name,
				nameEn,
				instagram,
				campus,
				note,
				announcementTitle,
				announcementBody,
				announcementHref,
				announcementVisible
			} });
			setMsg("已儲存");
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold",
				children: "社團設定"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "名稱" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: name,
					onChange: (e) => setName(e.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "英文" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: nameEn,
					onChange: (e) => setNameEn(e.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Instagram" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: instagram,
					onChange: (e) => setInstagram(e.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "校園" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: campus,
					onChange: (e) => setCampus(e.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "聯絡說明" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: note,
					onChange: (e) => setNote(e.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "pt-4 font-medium",
				children: "首頁公告"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "標題" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: announcementTitle,
					onChange: (e) => setAnnouncementTitle(e.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "內容" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: announcementBody,
					onChange: (e) => setAnnouncementBody(e.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "連結" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: announcementHref,
					onChange: (e) => setAnnouncementHref(e.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-center gap-2 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: announcementVisible,
					onChange: (e) => setAnnouncementVisible(e.target.checked)
				}), "顯示公告"]
			}),
			msg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-leaf",
				children: msg
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				children: "儲存設定"
			})
		]
	});
}
//#endregion
export { AdminSettings as component };
