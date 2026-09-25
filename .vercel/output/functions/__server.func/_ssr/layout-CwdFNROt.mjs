import { o as __toESM } from "../_runtime.mjs";
import { n as Button } from "./createSsrRpc-B2Izd0c7.mjs";
import { c as require_jsx_runtime, l as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as HOME_BLOCK_IDS, t as DEFAULT_LAYOUT } from "./format-Bo5ti5XY.mjs";
import { C as getPublicLayout } from "./router-B2Rg5uI9.mjs";
import { m as saveLayout, n as getAdminContext } from "./admin-BGq07OsZ.mjs";
import { n as Label, r as Textarea, t as Input } from "./input-nc7q72uQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/layout-CwdFNROt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var BLOCK_LABEL = {
	hero: "Hero／開場後主視覺",
	announcement: "公告列",
	upcoming: "即將舉行",
	mood: "心情／第一次來引導",
	what: "我們在做什麼",
	photos: "照片帶",
	ig: "IG 精選",
	stories: "社員故事",
	faq: "FAQ",
	join: "加入我們"
};
function LayoutAdmin() {
	const [layout, setLayout] = (0, import_react.useState)(DEFAULT_LAYOUT);
	const [role, setRole] = (0, import_react.useState)("viewer");
	const [msg, setMsg] = (0, import_react.useState)("");
	const [ready, setReady] = (0, import_react.useState)(false);
	const locked = role === "viewer";
	(0, import_react.useEffect)(() => {
		Promise.all([getPublicLayout(), getAdminContext()]).then(([next, staff]) => {
			setLayout(next);
			setRole(staff.role);
		}).finally(() => setReady(true));
	}, []);
	const move = (index, dir) => {
		setLayout((prev) => {
			const blocks = [...prev.blocks];
			const next = index + dir;
			if (next < 0 || next >= blocks.length) return prev;
			const copy = blocks[index];
			blocks[index] = blocks[next];
			blocks[next] = copy;
			return {
				...prev,
				blocks
			};
		});
	};
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-mist",
		children: "讀取排版…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "mx-auto max-w-3xl space-y-10",
		onSubmit: async (event) => {
			event.preventDefault();
			if (locked) return;
			setMsg("");
			try {
				await saveLayout({ data: layout });
				setMsg("已儲存。前台會立刻用這份排版。");
			} catch {
				setMsg("沒有存成。請確認你是 editor 或 admin，而且欄位沒有超長。");
			}
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-semibold",
					children: "排版"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-mist",
					children: "改完會立刻出現在公開網站。這裡不能改顏色、間距或字型。沒有內容的區塊會自己收起來，不會補假資料。"
				}),
				locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-coral",
					children: "你是 viewer，只能看，不能存。"
				}) : null
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				disabled: locked,
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
						className: "font-medium",
						children: "龜龜開場"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "開場" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "h-11 w-full rounded-md border border-line bg-raised px-3 text-sm",
							value: layout.intro.mode,
							onChange: (e) => setLayout((prev) => ({
								...prev,
								intro: {
									...prev.intro,
									mode: e.target.value
								}
							})),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "on",
									children: "預設開啟（看過或跳過的人，下次不再擋）"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "skip",
									children: "預設跳過"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "off",
									children: "完全關閉"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex min-h-11 items-center gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: layout.intro.showTurtle,
							onChange: (e) => setLayout((prev) => ({
								...prev,
								intro: {
									...prev.intro,
									showTurtle: e.target.checked
								}
							}))
						}), "顯示龜龜"]
					}),
					layout.intro.lines.map((line, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: [
								"第 ",
								index + 1,
								" 句"
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: line.text,
								maxLength: 80,
								onChange: (e) => setLayout((prev) => {
									const lines = prev.intro.lines.map((row, i) => i === index ? {
										...row,
										text: e.target.value
									} : row);
									return {
										...prev,
										intro: {
											...prev.intro,
											lines
										}
									};
								})
							})]
						}), index === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "第一句副標" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: line.sub,
								maxLength: 80,
								onChange: (e) => setLayout((prev) => {
									const lines = prev.intro.lines.map((row, i) => i === index ? {
										...row,
										sub: e.target.value
									} : row);
									return {
										...prev,
										intro: {
											...prev.intro,
											lines
										}
									};
								})
							})]
						}) : null]
					}, index))
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				disabled: locked,
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
						className: "font-medium",
						children: "首頁區塊順序"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-mist",
						children: "公告的文字在「設定」頁。這裡只決定要不要出現、順序，以及各區標題。"
					}),
					layout.blocks.map((block, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-line bg-raised p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: BLOCK_LABEL[block.id]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										size: "sm",
										variant: "outline",
										onClick: () => move(index, -1),
										disabled: index === 0,
										children: "上移"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										size: "sm",
										variant: "outline",
										onClick: () => move(index, 1),
										disabled: index === layout.blocks.length - 1,
										children: "下移"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "mt-3 flex min-h-11 items-center gap-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: block.visible,
									onChange: (e) => setLayout((prev) => ({
										...prev,
										blocks: prev.blocks.map((row, i) => i === index ? {
											...row,
											visible: e.target.checked
										} : row)
									}))
								}), "顯示"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 grid gap-2 md:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "標題" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: block.title,
										maxLength: 80,
										onChange: (e) => setLayout((prev) => ({
											...prev,
											blocks: prev.blocks.map((row, i) => i === index ? {
												...row,
												title: e.target.value
											} : row)
										}))
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "副標" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: block.subtitle,
										maxLength: 120,
										onChange: (e) => setLayout((prev) => ({
											...prev,
											blocks: prev.blocks.map((row, i) => i === index ? {
												...row,
												subtitle: e.target.value
											} : row)
										}))
									})]
								})]
							})
						]
					}, block.id))
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				disabled: locked,
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
						className: "font-medium",
						children: "Hero（開場後主視覺，預設先藏起來）"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "主標" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: layout.hero.title,
							maxLength: 80,
							onChange: (e) => setLayout((prev) => ({
								...prev,
								hero: {
									...prev.hero,
									title: e.target.value
								}
							}))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "副標" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: layout.hero.subtitle,
							maxLength: 120,
							onChange: (e) => setLayout((prev) => ({
								...prev,
								hero: {
									...prev.hero,
									subtitle: e.target.value
								}
							}))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2 md:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "主按鈕文字" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: layout.hero.ctaPrimary,
									maxLength: 24,
									onChange: (e) => setLayout((prev) => ({
										...prev,
										hero: {
											...prev.hero,
											ctaPrimary: e.target.value
										}
									}))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "主按鈕連結" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: layout.hero.ctaPrimaryHref,
									maxLength: 200,
									onChange: (e) => setLayout((prev) => ({
										...prev,
										hero: {
											...prev.hero,
											ctaPrimaryHref: e.target.value
										}
									}))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "次按鈕文字" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: layout.hero.ctaSecondary,
									maxLength: 24,
									onChange: (e) => setLayout((prev) => ({
										...prev,
										hero: {
											...prev.hero,
											ctaSecondary: e.target.value
										}
									}))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "次按鈕連結" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: layout.hero.ctaSecondaryHref,
									maxLength: 200,
									onChange: (e) => setLayout((prev) => ({
										...prev,
										hero: {
											...prev.hero,
											ctaSecondaryHref: e.target.value
										}
									}))
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "背景圖（站內路徑或 https）" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: layout.hero.image,
							maxLength: 200,
							onChange: (e) => setLayout((prev) => ({
								...prev,
								hero: {
									...prev.hero,
									image: e.target.value
								}
							}))
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				disabled: locked,
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
						className: "font-medium",
						children: "認識我們"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "標題",
						value: layout.pages.about.title,
						max: 40,
						onChange: (title) => setLayout((p) => ({
							...p,
							pages: {
								...p.pages,
								about: {
									...p.pages.about,
									title
								}
							}
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						label: "第一段",
						value: layout.pages.about.p1,
						max: 400,
						onChange: (p1) => setLayout((p) => ({
							...p,
							pages: {
								...p.pages,
								about: {
									...p.pages.about,
									p1
								}
							}
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						label: "第二段",
						value: layout.pages.about.p2,
						max: 400,
						onChange: (p2) => setLayout((p) => ({
							...p,
							pages: {
								...p.pages,
								about: {
									...p.pages.about,
									p2
								}
							}
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						label: "第三段",
						value: layout.pages.about.p3,
						max: 400,
						onChange: (p3) => setLayout((p) => ({
							...p,
							pages: {
								...p.pages,
								about: {
									...p.pages.about,
									p3
								}
							}
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						label: "正式全名那一行",
						value: layout.pages.about.official,
						max: 240,
						onChange: (official) => setLayout((p) => ({
							...p,
							pages: {
								...p.pages,
								about: {
									...p.pages.about,
									official
								}
							}
						}))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				disabled: locked,
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
						className: "font-medium",
						children: "第一次來"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "標題",
						value: layout.pages.firstTime.title,
						max: 40,
						onChange: (title) => setLayout((p) => ({
							...p,
							pages: {
								...p.pages,
								firstTime: {
									...p.pages.firstTime,
									title
								}
							}
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						label: "導言",
						value: layout.pages.firstTime.lead,
						max: 200,
						onChange: (lead) => setLayout((p) => ({
							...p,
							pages: {
								...p.pages,
								firstTime: {
									...p.pages.firstTime,
									lead
								}
							}
						}))
					}),
					layout.pages.firstTime.cards.map((card, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: `卡片 ${index + 1} 標題`,
							value: card.title,
							max: 40,
							onChange: (title) => setLayout((p) => ({
								...p,
								pages: {
									...p.pages,
									firstTime: {
										...p.pages.firstTime,
										cards: p.pages.firstTime.cards.map((row, i) => i === index ? {
											...row,
											title
										} : row)
									}
								}
							}))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "內文",
							value: card.body,
							max: 120,
							onChange: (body) => setLayout((p) => ({
								...p,
								pages: {
									...p.pages,
									firstTime: {
										...p.pages.firstTime,
										cards: p.pages.firstTime.cards.map((row, i) => i === index ? {
											...row,
											body
										} : row)
									}
								}
							}))
						})]
					}, index))
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				disabled: locked,
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
						className: "font-medium",
						children: "加入我們"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "標題",
						value: layout.pages.join.title,
						max: 40,
						onChange: (title) => setLayout((p) => ({
							...p,
							pages: {
								...p.pages,
								join: {
									...p.pages.join,
									title
								}
							}
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						label: "導言",
						value: layout.pages.join.lead,
						max: 200,
						onChange: (lead) => setLayout((p) => ({
							...p,
							pages: {
								...p.pages,
								join: {
									...p.pages.join,
									lead
								}
							}
						}))
					}),
					layout.pages.join.steps.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: `步驟 ${index + 1}`,
							value: step.title,
							max: 40,
							onChange: (title) => setLayout((p) => ({
								...p,
								pages: {
									...p.pages,
									join: {
										...p.pages.join,
										steps: p.pages.join.steps.map((row, i) => i === index ? {
											...row,
											title
										} : row)
									}
								}
							}))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "說明",
							value: step.body,
							max: 160,
							onChange: (body) => setLayout((p) => ({
								...p,
								pages: {
									...p.pages,
									join: {
										...p.pages.join,
										steps: p.pages.join.steps.map((row, i) => i === index ? {
											...row,
											body
										} : row)
									}
								}
							}))
						})]
					}, index))
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				disabled: locked,
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
					className: "font-medium",
					children: "Footer"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
					label: "聯絡說明",
					value: layout.pages.footer.note,
					max: 300,
					onChange: (note) => setLayout((p) => ({
						...p,
						pages: {
							...p.pages,
							footer: { note }
						}
					}))
				})]
			}),
			msg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-leaf",
				children: msg
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				disabled: locked,
				children: "儲存排版"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-mist",
				children: ["區塊代號：", HOME_BLOCK_IDS.join("、")]
			})
		]
	});
}
function Field({ label, value, max, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			value,
			maxLength: max,
			onChange: (e) => onChange(e.target.value)
		})]
	});
}
function Area({ label, value, max, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
			value,
			maxLength: max,
			onChange: (e) => onChange(e.target.value)
		})]
	});
}
//#endregion
export { LayoutAdmin as component };
