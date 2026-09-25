import { o as __toESM } from "../_runtime.mjs";
import { n as Button } from "./createSsrRpc-B2Izd0c7.mjs";
import { c as require_jsx_runtime, l as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as listAdminAssets, u as saveAsset } from "./admin-BGq07OsZ.mjs";
import { t as Input } from "./input-nc7q72uQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/assets-ChLmB0q4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var driveAdapter = {
	name: "manual",
	ready: false
};
var canvaAdapter = {
	name: "url-only",
	ready: true
};
function AdminAssets() {
	const [rows, setRows] = (0, import_react.useState)([]);
	const [title, setTitle] = (0, import_react.useState)("");
	const [url, setUrl] = (0, import_react.useState)("");
	const [canvaUrl, setCanvaUrl] = (0, import_react.useState)("");
	const [driveUrl, setDriveUrl] = (0, import_react.useState)("");
	const refresh = () => void listAdminAssets().then(setRows);
	(0, import_react.useEffect)(() => {
		refresh();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold",
				children: "圖片與素材"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-mist",
				children: [
					"Canva：",
					canvaAdapter.ready ? "可用網址掛上" : "尚未連接",
					"。Google Drive：",
					driveAdapter.ready ? "已授權" : "尚未授權，先貼公開連結。",
					"不要把 OAuth Secret 放到瀏覽器。"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "grid gap-3 rounded-xl border border-line bg-raised p-4 md:grid-cols-2",
				onSubmit: async (e) => {
					e.preventDefault();
					await saveAsset({ data: {
						title: title || null,
						url,
						assetType: canvaUrl ? "canva" : driveUrl ? "drive" : "image",
						canvaUrl: canvaUrl || null,
						driveUrl: driveUrl || null
					} });
					setTitle("");
					setUrl("");
					setCanvaUrl("");
					setDriveUrl("");
					refresh();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "名稱",
						value: title,
						onChange: (e) => setTitle(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "圖片網址",
						value: url,
						onChange: (e) => setUrl(e.target.value),
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Canva 連結（選填）",
						value: canvaUrl,
						onChange: (e) => setCanvaUrl(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Drive 連結（選填）",
						value: driveUrl,
						onChange: (e) => setDriveUrl(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "md:col-span-2",
						children: "新增素材"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-4 sm:grid-cols-2 md:grid-cols-3",
				children: rows.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "overflow-hidden rounded-xl border border-line bg-raised",
					children: [a.url.match(/\.(jpg|jpeg|png|webp|gif)(\?|$)/i) || a.url.startsWith("/images/") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: a.url,
						alt: "",
						className: "aspect-[4/3] w-full object-cover"
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: a.title || a.asset_type
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-xs text-mist",
							children: a.url
						})]
					})]
				}, a.id))
			})
		]
	});
}
//#endregion
export { AdminAssets as component };
