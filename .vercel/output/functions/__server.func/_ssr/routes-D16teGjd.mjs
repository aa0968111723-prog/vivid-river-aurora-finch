import { t as Button } from "./button-BYDjDX5S.mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as Instagram } from "../_libs/lucide-react.mjs";
import { b as withUtm, d as Route$20, h as ZenIntro, o as EventCard, x as track, y as SITE } from "./router-Gcz9kFnT.mjs";
import { t as FaqList } from "./faq-list-BAqwcEDo.mjs";
import { t as MoodPicker } from "./mood-wOnbeQJZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D16teGjd.js
var import_jsx_runtime = require_jsx_runtime();
function UpcomingStrip({ events }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "py-16 md:py-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-6xl px-5 md:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium tracking-wide text-leaf",
						children: "最近有什麼活動？"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-3xl font-semibold tracking-tight",
						children: "想參加，選一場就好"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "ghost",
						className: "hidden md:inline-flex",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/events",
							children: "看全部"
						})
					})]
				})
			}),
			events.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 flex gap-4 overflow-x-auto px-5 pb-2 hide-scrollbar md:mx-auto md:max-w-6xl md:grid md:grid-cols-3 md:overflow-visible md:px-6",
				children: events.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-[78vw] max-w-sm shrink-0 md:w-auto md:max-w-none",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventCard, {
						event,
						featured: true
					})
				}, event.id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-8 max-w-6xl px-5 text-mist md:px-6",
				children: "最近還沒有新場次。可以先追 IG，或來看第一次來專區。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 px-5 md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					className: "w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/events",
						children: "看全部活動"
					})
				})
			})
		]
	});
}
var WHAT = [
	{
		title: "茶會",
		text: "花園、杯子、隨便聊。最容易踏進來的一種。",
		image: "/images/tea-gathering.jpg",
		to: "/events"
	},
	{
		title: "社課",
		text: "週三晚上。有人帶，不用每次都來。",
		image: "/images/club-class.jpg",
		to: "/events"
	},
	{
		title: "禪修體驗",
		text: "先來坐坐看。坐不住也沒關係。",
		image: "/images/sit-quiet.jpg",
		to: "/first-time"
	},
	{
		title: "戶外走走",
		text: "覺軒花園、校園、淡水的風。",
		image: "/images/garden-path.jpg",
		to: "/gallery"
	},
	{
		title: "期初演講",
		text: "給第一次來的人聽的。帶耳朵就好。",
		image: "/images/lecture-hall.jpg",
		to: "/events"
	},
	{
		title: "小聚會",
		text: "一群很好相處的人。沒有點名。",
		image: "/images/grass-circle.jpg",
		to: "/join"
	}
];
function WhatWeDo() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-16 md:py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5 md:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium tracking-wide text-leaf",
					children: "我們平常都在做什麼？"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-3xl font-semibold tracking-tight",
					children: "不是課堂，比較像生活"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: WHAT.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: cnBento(i),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: item.image,
								alt: "",
								className: "absolute inset-0 size-full object-cover"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-transparent" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative mt-auto p-5 text-raised",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-xl font-semibold",
									children: item.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-raised/85",
									children: item.text
								})]
							})
						]
					}, item.title))
				})
			]
		})
	});
}
function cnBento(i) {
	return `relative flex min-h-56 overflow-hidden rounded-xl no-underline ${i === 0 || i === 3 ? "sm:min-h-80" : ""}`;
}
function InstagramStrip({ posts, ok }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-paper py-16 md:py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5 md:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium tracking-wide text-coral",
					children: "Instagram"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-3xl font-semibold tracking-tight",
					children: SITE.instagramHandle
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "coral",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: withUtm(SITE.instagramUrl, {
							medium: "home",
							campaign: "instagram"
						}),
						target: "_blank",
						rel: "noreferrer",
						onClick: () => track("ig_profile_cta"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "size-4" }), "去 IG 看看"]
					})
				})]
			}), posts.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid grid-cols-2 gap-3 md:grid-cols-3",
				children: posts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: withUtm(post.postUrl, {
						medium: "home",
						campaign: "instagram_grid"
					}),
					target: "_blank",
					rel: "noreferrer",
					className: "group relative aspect-square overflow-hidden rounded-lg bg-canvas",
					onClick: () => track("ig_post_click"),
					children: post.thumbnailUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: post.thumbnailUrl,
						alt: "",
						className: "size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]",
						loading: "lazy"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-full place-items-center text-sm text-mist",
						children: "貼文"
					})
				}, post.id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 rounded-xl border border-line bg-raised p-8 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-ink",
					children: "最近的 IG 貼文正在路上"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-mist",
					children: ok ? "還沒有精選貼文。" : "暫時連不到精選，直接去 Instagram 看最新的就好。"
				})]
			})]
		})
	});
}
function StoriesStrip({ stories }) {
	if (!stories.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-16 md:py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5 md:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium tracking-wide text-leaf",
					children: "社員故事"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-3xl font-semibold tracking-tight",
					children: "大家一開始也只是路過"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 flex gap-4 overflow-x-auto pb-2 hide-scrollbar md:grid md:grid-cols-3 md:overflow-visible",
					children: stories.map((story) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/stories/$slug",
						params: { slug: story.slug },
						className: "w-[78vw] max-w-sm shrink-0 overflow-hidden rounded-xl border border-line bg-raised no-underline shadow-lift md:w-auto md:max-w-none",
						children: [story.photoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: story.photoUrl,
							alt: "",
							className: "aspect-[4/3] w-full object-cover"
						}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-display text-xl font-semibold leading-snug tracking-tight text-ink",
								children: [
									"「",
									story.quote,
									"」"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-sm text-mist",
								children: [story.displayName, story.roleLabel ? ` · ${story.roleLabel}` : ""]
							})]
						})]
					}, story.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "ghost",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/stories",
							children: "看更多故事"
						})
					})
				})
			]
		})
	});
}
function FaqTeaser({ items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-paper py-16 md:py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[0.9fr_1.1fr] md:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium tracking-wide text-leaf",
					children: "第一次來"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-3xl font-semibold tracking-tight",
					children: "你可能想先問的"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-mist",
					children: "一個人來可以。不會打坐也可以。只來一次也可以。"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "mt-6",
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/first-time",
						children: "第一次來專區"
					})
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaqList, { items: items.slice(0, 6) })]
		})
	});
}
function JoinBand() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative isolate overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/images/campus-dusk.jpg",
				alt: "",
				className: "absolute inset-0 size-full object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-ink/45" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto max-w-3xl px-5 py-20 text-center md:py-28",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl font-semibold tracking-tight text-raised md:text-4xl",
						children: "想加入，先來一場就好"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-raised/90",
						children: "不用先當社員。選一場活動、追 IG，或直接私訊我們。"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap justify-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/join",
								onClick: () => track("join_band_cta"),
								children: "加入我們"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							variant: "outline",
							className: "border-raised/40 bg-raised/90",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: withUtm(SITE.instagramUrl, {
									medium: "home",
									campaign: "join"
								}),
								target: "_blank",
								rel: "noreferrer",
								children: "追 Instagram"
							})
						})]
					})
				]
			})
		]
	});
}
function PhotoRibbon({ images }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-3 overflow-x-auto px-5 pb-2 hide-scrollbar md:grid md:grid-cols-4 md:px-6 md:overflow-visible mx-auto max-w-6xl",
			children: images.map((img) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: img.src,
				alt: img.alt,
				className: "h-48 w-[70vw] shrink-0 rounded-lg object-cover md:h-56 md:w-full",
				loading: "lazy"
			}, img.src))
		})
	});
}
function Home() {
	const data = Route$20.useLoaderData();
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: SITE.name,
		alternateName: SITE.nameEn,
		description: SITE.description,
		sameAs: [SITE.instagramUrl]
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
			type: "application/ld+json",
			dangerouslySetInnerHTML: { __html: JSON.stringify(jsonLd) }
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZenIntro, {}),
		data.meta.announcement.visible && data.meta.announcement.title ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bg-leaf text-leaf-fg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto max-w-6xl px-5 py-2.5 text-sm md:px-6",
				children: data.meta.announcement.href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: data.meta.announcement.href,
					className: "underline-offset-2 hover:underline",
					children: data.meta.announcement.title
				}) : data.meta.announcement.title
			})
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UpcomingStrip, { events: data.upcoming }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoodPicker, { events: data.events }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatWeDo, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoRibbon, { images: [
			{
				src: "/images/tea-gathering.jpg",
				alt: "茶會"
			},
			{
				src: "/images/garden-path.jpg",
				alt: "覺軒花園"
			},
			{
				src: "/images/tricolor-light.jpg",
				alt: "三色光"
			},
			{
				src: "/images/grass-circle.jpg",
				alt: "小聚會"
			}
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstagramStrip, {
			posts: data.ig.posts,
			ok: data.ig.ok
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoriesStrip, { stories: data.stories }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaqTeaser, { items: data.faq }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JoinBand, {})
	] });
}
//#endregion
export { Home as component };
