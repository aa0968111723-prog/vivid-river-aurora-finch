import { t as Button } from "./button-BYDjDX5S.mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as GROK_PROVIDERS } from "./server-02G9FJXM.mjs";
import { m as Logo } from "./router-Gcz9kFnT.mjs";
import { r as signIn } from "./client-CVqXY6bk.mjs";
import { n as useCurrentUserState } from "./use-current-user-ClOiUQ-z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-Dgl3ORHD.js
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center bg-canvas text-mist",
		children: "載入中"
	});
	if (user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/admin" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-dvh place-items-center bg-canvas px-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm rounded-xl border border-line bg-raised p-8 shadow-soft",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-6 font-display text-2xl font-semibold",
					children: "社員後台"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-mist",
					children: "給負責更新活動的人。訪客不用登入。"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 space-y-2",
					children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: p.idp === "google" ? "default" : "outline",
						className: "w-full",
						onClick: () => signIn(p.providerId, { callbackURL: "/admin" }),
						children: [
							"使用 ",
							p.label,
							" 登入"
						]
					}, p.providerId))
				})
			]
		})
	});
}
//#endregion
export { Login as component };
