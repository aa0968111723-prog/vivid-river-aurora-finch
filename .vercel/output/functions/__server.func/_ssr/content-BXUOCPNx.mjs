import { o as __toESM } from "../_runtime.mjs";
import { t as Button } from "./button-BYDjDX5S.mjs";
import { c as require_jsx_runtime, l as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { c as listAdminIg, f as saveFaq, h as saveStory, l as listAdminStories, p as saveIgPost, s as listAdminFaq } from "./admin-DlAoa8X-.mjs";
import { n as Label, r as Textarea, t as Input } from "./input-nc7q72uQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/content-BXUOCPNx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminContent() {
	const [stories, setStories] = (0, import_react.useState)([]);
	const [faq, setFaq] = (0, import_react.useState)([]);
	const [ig, setIg] = (0, import_react.useState)([]);
	const refresh = () => {
		listAdminStories().then(setStories);
		listAdminFaq().then(setFaq);
		listAdminIg().then(setIg);
	};
	(0, import_react.useEffect)(() => {
		refresh();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold",
				children: "內容"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-medium",
						children: "社員故事"
					}),
					stories.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-mist",
						children: [
							s.displayName,
							" · ",
							s.quote
						]
					}, s.id)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoryForm, { onSaved: refresh })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-medium",
						children: "FAQ"
					}),
					faq.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-mist",
						children: f.question
					}, f.id)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaqForm, { onSaved: refresh })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-medium",
						children: "IG 精選（手動貼入，非即時 API）"
					}),
					ig.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-sm text-mist",
						children: p.caption || p.postUrl
					}, p.id)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IgForm, { onSaved: refresh })
				]
			})
		]
	});
}
function StoryForm({ onSaved }) {
	const [quote, setQuote] = (0, import_react.useState)("");
	const [body, setBody] = (0, import_react.useState)("");
	const [displayName, setDisplayName] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "space-y-3 rounded-xl border border-line bg-raised p-4",
		onSubmit: async (e) => {
			e.preventDefault();
			await saveStory({ data: {
				slug: `story-${Date.now().toString(36)}`,
				quote,
				body,
				displayName,
				consent: true,
				status: "published"
			} });
			setQuote("");
			setBody("");
			setDisplayName("");
			onSaved();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium",
				children: "新增故事"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				placeholder: "一句話",
				value: quote,
				onChange: (e) => setQuote(e.target.value),
				required: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				placeholder: "怎麼稱呼",
				value: displayName,
				onChange: (e) => setDisplayName(e.target.value),
				required: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				placeholder: "完整故事（需本人同意再公開）",
				value: body,
				onChange: (e) => setBody(e.target.value),
				required: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				size: "sm",
				children: "新增"
			})
		]
	});
}
function FaqForm({ onSaved }) {
	const [question, setQuestion] = (0, import_react.useState)("");
	const [answer, setAnswer] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "space-y-3 rounded-xl border border-line bg-raised p-4",
		onSubmit: async (e) => {
			e.preventDefault();
			await saveFaq({ data: {
				question,
				answer
			} });
			setQuestion("");
			setAnswer("");
			onSaved();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium",
				children: "新增 FAQ"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				placeholder: "問題",
				value: question,
				onChange: (e) => setQuestion(e.target.value),
				required: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				placeholder: "回答",
				value: answer,
				onChange: (e) => setAnswer(e.target.value),
				required: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				size: "sm",
				children: "新增"
			})
		]
	});
}
function IgForm({ onSaved }) {
	const [postUrl, setPostUrl] = (0, import_react.useState)("");
	const [thumbnailUrl, setThumbnailUrl] = (0, import_react.useState)("");
	const [caption, setCaption] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "space-y-3 rounded-xl border border-line bg-raised p-4",
		onSubmit: async (e) => {
			e.preventDefault();
			await saveIgPost({ data: {
				postUrl,
				thumbnailUrl: thumbnailUrl || null,
				caption: caption || null,
				postType: "image",
				featured: true
			} });
			setPostUrl("");
			setThumbnailUrl("");
			setCaption("");
			onSaved();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium",
				children: "新增 IG 精選"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "貼文網址" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: postUrl,
				onChange: (e) => setPostUrl(e.target.value),
				required: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				placeholder: "縮圖網址",
				value: thumbnailUrl,
				onChange: (e) => setThumbnailUrl(e.target.value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				placeholder: "說明",
				value: caption,
				onChange: (e) => setCaption(e.target.value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				size: "sm",
				children: "新增"
			})
		]
	});
}
//#endregion
export { AdminContent as component };
