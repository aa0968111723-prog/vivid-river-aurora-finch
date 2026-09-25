import { o as __toESM } from "../_runtime.mjs";
import { t as Button } from "./button-BYDjDX5S.mjs";
import { c as require_jsx_runtime, l as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as formatRemaining, r as formatEventRange } from "./format-Cui_ik7J.mjs";
import { c as CalendarDays, n as Link2, r as Instagram, t as MapPin } from "../_libs/lucide-react.mjs";
import { a as Route$4, b as withUtm, g as CATEGORY_LABELS, o as EventCard, s as EventStatusBadge, x as track, y as SITE } from "./router-Gcz9kFnT.mjs";
import { t as FaqList } from "./faq-list-BAqwcEDo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/events._slug-BNJ_VEOA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RegisterCta({ event }) {
	const remaining = formatRemaining(event.capacity, event.registeredCount);
	const ended = event.computedStatus === "ended" || event.computedStatus === "full";
	const closed = event.registrationMode === "closed";
	if (ended) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-line bg-paper p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-medium",
				children: "這一場已經結束或額滿了"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-mist",
				children: "可以看看別場，或去 IG 看下一波。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-4",
				variant: "outline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/events",
					children: "其他活動"
				})
			})
		]
	});
	if (closed) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-line bg-paper p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-medium",
			children: "不需報名"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-mist",
			children: event.registrationNote ?? "到現場就好。"
		})]
	});
	const href = event.registrationMode === "instagram_dm" ? withUtm(event.registrationUrl || SITE.instagramDmUrl, {
		medium: "event",
		campaign: event.slug
	}) : event.registrationUrl ? withUtm(event.registrationUrl, {
		medium: "event",
		campaign: event.slug
	}) : withUtm(SITE.instagramUrl, {
		medium: "event",
		campaign: event.slug
	});
	const label = event.registrationMode === "instagram_dm" ? "IG 私訊我要參加" : "我要參加";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-line bg-raised p-5 shadow-lift",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xl font-semibold tracking-tight",
				children: "想去的話"
			}),
			remaining != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-mist",
				children: [
					"還有大約 ",
					remaining,
					" 個位子（社員回報，非即時）"
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-mist",
				children: "報名狀態由社團更新，不會假裝即時人數。"
			}),
			event.registrationNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-mist",
				children: event.registrationNote
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-4 w-full",
				size: "lg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href,
					target: "_blank",
					rel: "noreferrer",
					onClick: () => track("event_register_cta", { eventId: event.id }),
					children: [event.registrationMode === "instagram_dm" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "size-4" }) : null, label]
				})
			})
		]
	});
}
function ShareBar({ title, path }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const url = typeof window === "undefined" ? path : `${window.location.origin}${path}`;
	const line = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`;
	async function copy() {
		try {
			await navigator.clipboard.writeText(url);
			setCopied(true);
			track("share_copy");
			setTimeout(() => setCopied(false), 1800);
		} catch {
			setCopied(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "outline",
				size: "sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: line,
					target: "_blank",
					rel: "noreferrer",
					onClick: () => track("share_line"),
					children: "分享到 LINE"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: "outline",
				size: "sm",
				onClick: copy,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { className: "size-4" }), copied ? "已複製連結" : "複製連結"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "w-full text-xs text-mist",
				children: [
					"IG 沒有直接分享活動頁。可以複製連結，貼到限時動態或私訊。想貼 ",
					title,
					" 的時候，預覽會帶社團主視覺。"
				]
			})
		]
	});
}
function EventDetail() {
	const { event, assets, related } = Route$4.useLoaderData();
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Event",
		name: event.title,
		description: event.summary,
		startDate: event.startsAt,
		endDate: event.endsAt,
		eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
		eventStatus: event.computedStatus === "ended" ? "https://schema.org/EventScheduled" : "https://schema.org/EventScheduled",
		location: {
			"@type": "Place",
			name: event.locationName,
			address: event.locationDetail ?? SITE.campus
		},
		organizer: {
			"@type": "Organization",
			name: SITE.name
		},
		image: event.coverImage ? [event.coverImage] : void 0
	};
	const photos = assets.filter((a) => a.kind === "photo" || a.kind === "poster");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
			type: "application/ld+json",
			dangerouslySetInnerHTML: { __html: JSON.stringify(jsonLd) }
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative min-h-[46vh] overflow-hidden md:min-h-[56vh]",
			children: [event.coverImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: event.coverImage,
				alt: "",
				className: "absolute inset-0 size-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-paper" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-canvas via-canvas/20 to-ink/25" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-8 px-5 pb-16 md:grid-cols-[1.2fr_0.8fr] md:px-6 md:-mt-24",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative rounded-xl border border-line bg-raised p-5 shadow-soft md:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventStatusBadge, { status: event.computedStatus }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-leaf",
							children: CATEGORY_LABELS[event.categoryId] ?? event.categoryName
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl",
						children: event.title
					}),
					event.subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-mist",
						children: event.subtitle
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-5 space-y-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "mt-0.5 size-4 text-leaf" }), formatEventRange(event.startsAt, event.endsAt)]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mt-0.5 size-4 text-leaf" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								event.locationName,
								event.locationDetail ? ` · ${event.locationDetail}` : "",
								event.mapUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [" ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: event.mapUrl,
									className: "text-leaf underline-offset-2 hover:underline",
									target: "_blank",
									rel: "noreferrer",
									children: "地圖"
								})] }) : null
							] })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-lg leading-relaxed",
						children: event.summary
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 space-y-4 whitespace-pre-line text-[15px] leading-relaxed text-ink/90",
						children: event.body
					}),
					event.audience ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 rounded-lg bg-paper p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: "適合誰"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-mist",
							children: event.audience
						})]
					}) : null,
					event.faq.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-3 font-display text-xl font-semibold",
							children: "這一場常見問題"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaqList, { items: event.faq.map((f, i) => ({
							id: `${event.id}-faq-${i}`,
							question: f.q,
							answer: f.a,
							icon: null,
							sortOrder: i
						})) })]
					}) : null,
					photos.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid grid-cols-2 gap-3",
						children: photos.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: p.url,
							alt: p.caption ?? "",
							className: "rounded-lg object-cover"
						}, p.id))
					}) : null,
					event.igUrl || event.canvaUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap gap-3",
						children: [event.igUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							size: "sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: event.igUrl,
								target: "_blank",
								rel: "noreferrer",
								children: "IG 活動貼文"
							})
						}) : null, event.canvaUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							size: "sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: event.canvaUrl,
								target: "_blank",
								rel: "noreferrer",
								children: "活動文宣"
							})
						}) : null]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareBar, {
							title: event.title,
							path: `/events/${event.slug}`
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "space-y-4 md:sticky md:top-24 md:self-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegisterCta, { event }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/first-time",
					className: "block rounded-xl border border-line bg-paper p-5 no-underline",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-ink",
						children: "第一次來？"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-mist",
						children: "一個人來可以。不會打坐也可以。"
					})]
				})]
			})]
		}),
		related.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-5 pb-16 md:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl font-semibold tracking-tight",
				children: "下一場可以去"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: related.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventCard, { event: item }, item.id))
			})]
		}) : null
	] });
}
//#endregion
export { EventDetail as component };
