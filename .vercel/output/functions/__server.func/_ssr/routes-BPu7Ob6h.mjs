import { n as Button } from "./createSsrRpc-B2Izd0c7.mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as SITE, f as Route$21, g as ZenIntro, o as EventCard, x as withUtm } from "./router-B2Rg5uI9.mjs";
import { t as FaqList } from "./faq-list-C7V4nXek.mjs";
import { t as MoodPicker } from "./mood-BzimiKwx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BPu7Ob6h.js
var import_jsx_runtime = require_jsx_runtime();
var BRAND_PHOTOS = [{
	src: "/images/tricolor-light.jpg",
	alt: "三色光"
}, {
	src: "/images/hero-garden.jpg",
	alt: "覺軒花園"
}];
function InLink({ href, className, children }) {
	if (href.startsWith("https://")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href,
		className,
		target: "_blank",
		rel: "noreferrer",
		children
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: href,
		className,
		children
	});
}
function HomeLead({ hero }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative isolate overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: hero.image,
				alt: "",
				className: "absolute inset-0 size-full object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-ink/35 to-canvas" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto max-w-3xl px-5 py-20 md:py-28",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-4xl font-semibold tracking-tight text-raised",
						children: hero.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-lg text-raised/90",
						children: hero.subtitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InLink, {
								href: hero.ctaPrimaryHref,
								children: hero.ctaPrimary
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							className: "bg-raised/90",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InLink, {
								href: hero.ctaSecondaryHref,
								children: hero.ctaSecondary
							})
						})]
					})
				]
			})
		]
	});
}
function AnnouncementBar({ block, announcement }) {
	if (!block.visible) return null;
	const fromSettings = announcement.visible && announcement.title.trim().length > 0;
	const text = fromSettings ? announcement.title : block.title;
	if (!text) return null;
	const href = fromSettings ? announcement.href : "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bg-leaf text-leaf-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mx-auto max-w-6xl px-5 py-2.5 text-sm md:px-6",
			children: [href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href,
				className: "underline-offset-2 hover:underline",
				children: text
			}) : text, !fromSettings && block.subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-2 opacity-80",
				children: block.subtitle
			}) : null]
		})
	});
}
function UpcomingStrip({ events, title, subtitle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-20",
		children: [
			subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium tracking-wide text-leaf",
				children: subtitle
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl",
				children: title
			}),
			events.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: events.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventCard, { event }, event.id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-6 rounded-xl border border-line bg-paper p-6 text-mist",
				children: [
					"最近的場次還在排，先追",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: SITE.instagramUrl,
						className: "text-leaf underline-offset-2 hover:underline",
						target: "_blank",
						rel: "noreferrer",
						children: ["IG ", SITE.instagramHandle]
					}),
					"。"
				]
			})
		]
	});
}
var ACTIVITIES = [
	{
		title: "每週社課",
		body: "學期間常在週三晚上。約 19:00–21:30，18:50 報到。地點會變，以當週 IG 為準。"
	},
	{
		title: "茶會",
		body: "期初常有茶會，也會有像浮游禪光這樣的體驗。這一學期的日期還沒排上網站。"
	},
	{
		title: "演講",
		body: "大型演講曾在工學大樓 E310。已結束的場次回顧在活動頁，不開放報名。"
	},
	{
		title: "戶外小聚會",
		body: "有時在覺軒花園走走。沒有固定表，看到 IG 再決定要不要來。"
	}
];
function WhatWeDo({ title, subtitle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-paper py-16 md:py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5 md:px-6",
			children: [
				subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium tracking-wide text-leaf",
					children: subtitle
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 max-w-xl font-display text-3xl font-semibold tracking-tight md:text-4xl",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-xl text-mist",
					children: "這些是社團平常會做的類型，不是本週課表。"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-4 sm:grid-cols-2",
					children: ACTIVITIES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-line bg-raised p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-xl font-semibold",
							children: item.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-mist",
							children: item.body
						})]
					}, item.title))
				})
			]
		})
	});
}
function PhotoRibbon({ title, subtitle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-6xl px-5 py-16 md:px-6",
		children: [
			subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium tracking-wide text-leaf",
				children: subtitle
			}) : null,
			title ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 font-display text-3xl font-semibold tracking-tight",
				children: title
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid grid-cols-2 gap-3",
				children: BRAND_PHOTOS.map((image) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
					className: "overflow-hidden rounded-xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: image.src,
						alt: image.alt,
						className: "aspect-[4/3] w-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
						className: "mt-2 text-xs text-mist",
						children: image.alt
					})]
				}, image.src))
			})
		]
	});
}
function InstagramStrip({ posts, ok, title, subtitle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-6xl px-5 py-16 md:px-6",
		children: [
			subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium tracking-wide text-leaf",
				children: subtitle
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 font-display text-3xl font-semibold tracking-tight",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: withUtm(SITE.instagramUrl, {
						medium: "home",
						campaign: "instagram"
					}),
					className: "no-underline",
					target: "_blank",
					rel: "noreferrer",
					children: title || SITE.instagramHandle
				})
			}),
			ok && posts.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid grid-cols-2 gap-3 md:grid-cols-4",
				children: posts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: post.postUrl,
					target: "_blank",
					rel: "noreferrer",
					className: "overflow-hidden rounded-xl border border-line bg-paper no-underline",
					children: [post.thumbnailUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: post.thumbnailUrl,
						alt: "",
						className: "aspect-square w-full object-cover"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid aspect-square place-items-center text-sm text-mist",
						children: "貼文"
					}), post.caption ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "line-clamp-2 p-3 text-sm text-ink",
						children: post.caption
					}) : null]
				}, post.id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-mist",
				children: "最近的貼文正在路上。"
			})
		]
	});
}
function StoriesStrip({ stories, title, subtitle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-paper py-16 md:py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5 md:px-6",
			children: [
				subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium tracking-wide text-leaf",
					children: subtitle
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-3xl font-semibold tracking-tight",
					children: title
				}),
				stories.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-4 md:grid-cols-3",
					children: stories.map((story) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/stories/$slug",
						params: { slug: story.slug },
						className: "rounded-xl border border-line bg-raised p-5 no-underline",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-xl font-semibold leading-snug",
							children: [
								"「",
								story.quote,
								"」"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-mist",
							children: story.displayName
						})]
					}, story.id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-mist",
					children: "真實社員故事籌備中。"
				})
			]
		})
	});
}
function FaqTeaser({ items, title, subtitle }) {
	if (!items.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-3xl px-5 py-16 md:px-6 md:py-20",
		children: [
			subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium tracking-wide text-leaf",
				children: subtitle
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 font-display text-3xl font-semibold tracking-tight",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaqList, { items })
			})
		]
	});
}
function JoinBand({ title, subtitle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mx-auto max-w-6xl px-5 py-16 md:px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl bg-night px-6 py-12 text-center text-raised md:px-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl font-semibold tracking-tight",
					children: title
				}),
				subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-3 max-w-lg text-raised/80",
					children: subtitle
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-wrap justify-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "coral",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: withUtm(SITE.instagramDmUrl, {
								medium: "home",
								campaign: "dm"
							}),
							target: "_blank",
							rel: "noreferrer",
							children: "私訊「想參加」"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						className: "bg-transparent text-raised",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/join",
							children: "加入方式"
						})
					})]
				})
			]
		})
	});
}
function Home() {
	const data = Route$21.useLoaderData();
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: SITE.name,
		alternateName: SITE.nameEn,
		description: SITE.description,
		sameAs: [SITE.instagramUrl, SITE.facebookUrl]
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
			type: "application/ld+json",
			dangerouslySetInnerHTML: { __html: JSON.stringify(jsonLd) }
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZenIntro, { intro: data.layout.intro }),
		data.layout.blocks.map((block) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeBlockView, {
			block,
			data
		}, block.id))
	] });
}
function HomeBlockView({ block, data }) {
	if (!block.visible) return null;
	switch (block.id) {
		case "hero": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeLead, { hero: data.layout.hero });
		case "announcement": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnnouncementBar, {
			block,
			announcement: data.meta.announcement
		});
		case "upcoming": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UpcomingStrip, {
			events: data.upcoming,
			title: block.title,
			subtitle: block.subtitle
		});
		case "mood": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoodPicker, {
			events: data.events,
			title: block.title,
			subtitle: block.subtitle
		});
		case "what": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatWeDo, {
			title: block.title,
			subtitle: block.subtitle
		});
		case "photos": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoRibbon, {
			title: block.title,
			subtitle: block.subtitle
		});
		case "ig": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstagramStrip, {
			posts: data.ig.posts,
			ok: data.ig.ok,
			title: block.title,
			subtitle: block.subtitle
		});
		case "stories": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoriesStrip, {
			stories: data.stories,
			title: block.title,
			subtitle: block.subtitle
		});
		case "faq": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaqTeaser, {
			items: data.faq,
			title: block.title,
			subtitle: block.subtitle
		});
		case "join": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JoinBand, {
			title: block.title,
			subtitle: block.subtitle
		});
		default: return null;
	}
}
//#endregion
export { Home as component };
