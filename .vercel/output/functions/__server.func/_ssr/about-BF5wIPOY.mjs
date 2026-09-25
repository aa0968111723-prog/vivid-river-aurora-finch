import { t as Button } from "./button-BYDjDX5S.mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-BF5wIPOY.js
var import_jsx_runtime = require_jsx_runtime();
function About() {
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
						children: "一群很好相處的人"
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-3xl space-y-6 px-5 py-12 text-[17px] leading-relaxed md:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "淡江大學禪學社在淡水校園。我們不是寺廟，也不會要你先成為什麼樣的人。" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "比較常做的事：喝茶、聽一場演講、週三晚上社課、偶爾在覺軒花園走走、有時候一起坐一下子。" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "如果你正在找一個可以慢下來、認識自己、也認識朋友的地方，先來一場就好。" })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto grid max-w-6xl gap-4 px-5 pb-16 sm:grid-cols-3 md:px-6",
			children: [
				{
					t: "認識自己",
					d: "不是自我改善課。就是把注意力拉回來一下。"
				},
				{
					t: "陪伴",
					d: "大學很趕。這裡可以不用趕。"
				},
				{
					t: "連結",
					d: "茶會上認識的人，常常比自我介紹記得更久。"
				}
			].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-paper p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold",
					children: x.t
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-mist",
					children: x.d
				})]
			}, x.t))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-5 pb-16 md:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/images/turtle.jpg",
						alt: "龜龜，禪學社的帶路角色",
						className: "mx-auto max-w-xs"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-center text-sm text-mist",
					children: "龜龜會在網站裡帶路。牠也不趕。"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex justify-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/stories",
							children: "社員故事"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/join",
							children: "加入我們"
						})
					})]
				})
			]
		})
	] });
}
//#endregion
export { About as component };
