import { o as __toESM } from "../_runtime.mjs";
import { t as Button } from "./button-BYDjDX5S.mjs";
import { c as require_jsx_runtime, l as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { b as useNavigate, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as CATEGORY_LABELS, n as Route$1, v as REGISTRATION_LABELS } from "./router-Gcz9kFnT.mjs";
import { d as saveEvent, i as getAdminEvent } from "./admin-DlAoa8X-.mjs";
import { n as Label, r as Textarea, t as Input } from "./input-nc7q72uQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/event._id-BvEzbRIj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var empty = {
	slug: "",
	title: "",
	subtitle: "",
	coverImage: "",
	categoryId: "tea",
	startsAt: "",
	endsAt: "",
	locationName: "",
	locationDetail: "",
	mapUrl: "",
	summary: "",
	body: "",
	audience: "",
	registrationMode: "google_form",
	registrationUrl: "",
	registrationNote: "",
	capacity: "",
	registeredCount: "",
	statusOverride: "",
	igUrl: "",
	canvaUrl: "",
	status: "draft",
	featured: false
};
function toLocalInput(iso) {
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return "";
	const pad = (n) => String(n).padStart(2, "0");
	return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
function fromEvent(e) {
	return {
		slug: e.slug,
		title: e.title,
		subtitle: e.subtitle ?? "",
		coverImage: e.coverImage ?? "",
		categoryId: e.categoryId,
		startsAt: toLocalInput(e.startsAt),
		endsAt: toLocalInput(e.endsAt),
		locationName: e.locationName,
		locationDetail: e.locationDetail ?? "",
		mapUrl: e.mapUrl ?? "",
		summary: e.summary,
		body: e.body,
		audience: e.audience ?? "",
		registrationMode: e.registrationMode,
		registrationUrl: e.registrationUrl ?? "",
		registrationNote: e.registrationNote ?? "",
		capacity: e.capacity == null ? "" : String(e.capacity),
		registeredCount: e.registeredCount == null ? "" : String(e.registeredCount),
		statusOverride: e.statusOverride ?? "",
		igUrl: e.igUrl ?? "",
		canvaUrl: e.canvaUrl ?? "",
		status: e.status,
		featured: e.featured
	};
}
function EventEditor() {
	const { id } = Route$1.useParams();
	const isNew = id === "new";
	const navigate = useNavigate();
	const [form, setForm] = (0, import_react.useState)(empty);
	const [msg, setMsg] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (isNew) return;
		getAdminEvent({ data: { id } }).then((e) => {
			if (e) setForm(fromEvent(e));
		});
	}, [id, isNew]);
	function set(key, value) {
		setForm((f) => ({
			...f,
			[key]: value
		}));
	}
	async function onSubmit(e) {
		e.preventDefault();
		setBusy(true);
		setMsg("");
		try {
			const slug = form.slug.trim() || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `event-${Date.now().toString(36)}`;
			const saved = await saveEvent({ data: {
				id: isNew ? void 0 : id,
				slug,
				title: form.title,
				subtitle: form.subtitle || null,
				coverImage: form.coverImage || null,
				categoryId: form.categoryId,
				startsAt: new Date(form.startsAt).toISOString(),
				endsAt: new Date(form.endsAt).toISOString(),
				locationName: form.locationName,
				locationDetail: form.locationDetail || null,
				mapUrl: form.mapUrl || null,
				summary: form.summary,
				body: form.body,
				audience: form.audience || null,
				registrationMode: form.registrationMode,
				registrationUrl: form.registrationUrl || null,
				registrationNote: form.registrationNote || null,
				capacity: form.capacity ? Number(form.capacity) : null,
				registeredCount: form.registeredCount ? Number(form.registeredCount) : null,
				statusOverride: form.statusOverride || null,
				igUrl: form.igUrl || null,
				canvaUrl: form.canvaUrl || null,
				status: form.status,
				featured: form.featured
			} });
			setMsg("已儲存");
			if (isNew) navigate({
				to: "/admin/event/$id",
				params: { id: saved.id }
			});
		} catch (err) {
			setMsg(err instanceof Error ? err.message : "儲存失敗");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: "mx-auto max-w-3xl space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-semibold",
					children: isNew ? "新增活動" : "編輯活動"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/admin/events",
					className: "text-sm text-mist",
					children: "回到列表"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "活動名稱",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: form.title,
					onChange: (e) => set("title", e.target.value),
					required: true
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "網址代稱 slug",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: form.slug,
						onChange: (e) => set("slug", e.target.value),
						placeholder: "fuyou-chan-guang"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "副標",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: form.subtitle,
						onChange: (e) => set("subtitle", e.target.value)
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "分類",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: "h-11 w-full rounded-md border border-line bg-raised px-3 text-sm",
						value: form.categoryId,
						onChange: (e) => set("categoryId", e.target.value),
						children: Object.entries(CATEGORY_LABELS).map(([id, name]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: id,
							children: name
						}, id))
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "封面圖片網址",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: form.coverImage,
						onChange: (e) => set("coverImage", e.target.value)
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "開始",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "datetime-local",
						value: form.startsAt,
						onChange: (e) => set("startsAt", e.target.value),
						required: true
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "結束",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "datetime-local",
						value: form.endsAt,
						onChange: (e) => set("endsAt", e.target.value),
						required: true
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "地點",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: form.locationName,
						onChange: (e) => set("locationName", e.target.value),
						required: true
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "教室 / 補充",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: form.locationDetail,
						onChange: (e) => set("locationDetail", e.target.value)
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "地圖連結",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: form.mapUrl,
					onChange: (e) => set("mapUrl", e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "一句話介紹",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: form.summary,
					onChange: (e) => set("summary", e.target.value),
					required: true
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "活動介紹",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: form.body,
					onChange: (e) => set("body", e.target.value),
					required: true
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "適合誰",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: form.audience,
					onChange: (e) => set("audience", e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "報名方式",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: "h-11 w-full rounded-md border border-line bg-raised px-3 text-sm",
						value: form.registrationMode,
						onChange: (e) => set("registrationMode", e.target.value),
						children: Object.entries(REGISTRATION_LABELS).map(([id, name]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: id,
							children: name
						}, id))
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "報名網址",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: form.registrationUrl,
						onChange: (e) => set("registrationUrl", e.target.value)
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "報名備註",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: form.registrationNote,
					onChange: (e) => set("registrationNote", e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "名額（可空）",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.capacity,
							onChange: (e) => set("capacity", e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "已報名（手填，勿假裝即時）",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.registeredCount,
							onChange: (e) => set("registeredCount", e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "狀態覆寫",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "h-11 w-full rounded-md border border-line bg-raised px-3 text-sm",
							value: form.statusOverride,
							onChange: (e) => set("statusOverride", e.target.value),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "自動"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "upcoming",
									children: "即將開始"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "open",
									children: "報名中"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "filling",
									children: "名額將滿"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "full",
									children: "已額滿"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "ended",
									children: "活動結束"
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "IG 貼文",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: form.igUrl,
						onChange: (e) => set("igUrl", e.target.value)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Canva 文宣",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: form.canvaUrl,
						onChange: (e) => set("canvaUrl", e.target.value)
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "發布狀態",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "h-11 w-full rounded-md border border-line bg-raised px-3 text-sm",
						value: form.status,
						onChange: (e) => set("status", e.target.value),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "draft",
								children: "草稿"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "published",
								children: "已發布"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "archived",
								children: "封存"
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center gap-2 pt-7 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: form.featured,
						onChange: (e) => set("featured", e.target.checked)
					}), "首頁精選"]
				})]
			}),
			msg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-leaf",
				children: msg
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				disabled: busy,
				children: busy ? "儲存中…" : "儲存"
			})
		]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), children]
	});
}
//#endregion
export { EventEditor as component };
