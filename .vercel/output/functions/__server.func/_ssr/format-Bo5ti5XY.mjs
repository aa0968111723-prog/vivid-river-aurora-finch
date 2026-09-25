//#region node_modules/.nitro/vite/services/ssr/assets/format-Bo5ti5XY.js
var HOME_BLOCK_IDS = [
	"hero",
	"announcement",
	"upcoming",
	"mood",
	"what",
	"photos",
	"ig",
	"stories",
	"faq",
	"join"
];
var BLOCK_COPY = {
	hero: {
		visible: false,
		title: "在很忙的大學生活裡，留一點時間，認識自己。",
		subtitle: "第一次來也沒關係。"
	},
	announcement: {
		visible: true,
		title: "",
		subtitle: ""
	},
	upcoming: {
		visible: true,
		title: "想參加，選一場就好",
		subtitle: "最近有什麼活動？"
	},
	mood: {
		visible: true,
		title: "最近的你，是哪一種狀態？",
		subtitle: "第一次認識禪學社"
	},
	what: {
		visible: true,
		title: "不是課堂，比較像生活",
		subtitle: "我們平常都在做什麼？"
	},
	photos: {
		visible: true,
		title: "",
		subtitle: ""
	},
	ig: {
		visible: true,
		title: "@tku_zc",
		subtitle: "Instagram"
	},
	stories: {
		visible: true,
		title: "社員怎麼開始的",
		subtitle: "社員故事"
	},
	faq: {
		visible: true,
		title: "你可能想先問的",
		subtitle: "第一次來"
	},
	join: {
		visible: true,
		title: "想加入，先來一場就好",
		subtitle: "追 IG，或私訊「想參加」。"
	}
};
var DEFAULT_LAYOUT = {
	intro: {
		mode: "on",
		showTurtle: true,
		lines: [
			{
				text: "先坐一下。",
				sub: "往下滑，或點一下，天會慢慢亮。"
			},
			{
				text: "嗨，我是龜龜。",
				sub: ""
			},
			{
				text: "我們是淡江大學禪學社。",
				sub: ""
			},
			{
				text: "不是寺廟，也不用先變成什麼樣的人。",
				sub: ""
			},
			{
				text: "在很忙的大學裡，留一點時間認識自己。",
				sub: ""
			},
			{
				text: "喝茶、社課、坐一下子。\n第一次來，也沒關係。",
				sub: ""
			}
		]
	},
	hero: {
		title: "在很忙的大學生活裡，留一點時間，認識自己。",
		subtitle: "第一次來也沒關係。",
		ctaPrimary: "看看最近活動",
		ctaPrimaryHref: "/events",
		ctaSecondary: "第一次來？",
		ctaSecondaryHref: "/first-time",
		image: "/images/hero-garden.jpg"
	},
	blocks: HOME_BLOCK_IDS.map((id) => ({
		id,
		...BLOCK_COPY[id]
	})),
	pages: {
		about: {
			title: "一群很好相處的人",
			p1: "淡江大學禪學社在淡水校園。我們用禪定把心安下來，也練習成為更好相處、更穩的人。",
			p2: "不是寺廟，也不是讀經班。學期間常有週三晚上社課，大約 19:00–21:30，18:50 報到。教室常在宮燈 H116、H117，大型演講曾在工學大樓 E310。地點會變，以當週 IG 為準。",
			p3: "第一次來、一個人來、只來一次都可以。想參加，先追 IG @tku_zc，或私訊「想參加」。",
			official: "正式名稱是淡江大學領袖禪學社（Leadership Training Club，社團編號 1051）。創社於民國 78 年（1989）。指導單位：學生事務處課外活動輔導組。社辦：體育館 SG109。"
		},
		firstTime: {
			title: "不用懂禪，也不用會打坐",
			lead: "先來坐坐看。一個人來、只來一次，都可以。",
			cards: [
				{
					title: "一個人來可以嗎？",
					body: "可以。"
				},
				{
					title: "一定要會打坐嗎？",
					body: "不用。"
				},
				{
					title: "需要特定宗教信仰嗎？",
					body: "不需要，這是大學社團。"
				},
				{
					title: "可以只來一次嗎？",
					body: "可以。"
				}
			]
		},
		join: {
			title: "想加入，先來一場就好",
			lead: "現在先追 IG @tku_zc，或私訊「想參加」。",
			steps: [
				{
					title: "來看一場",
					body: "活動時間看本站，或看當週 IG。地點會變。"
				},
				{
					title: "跟我們說",
					body: "私訊 @tku_zc，留「想參加」。"
				},
				{
					title: "想入社再談",
					body: "入社要申請通過並繳社費。校方認證活動次數是 3。"
				}
			]
		},
		footer: { note: "淡江大學領袖禪學社（Leadership Training Club，社團編號 1051）。創社於民國 78 年（1989）。指導單位：學生事務處課外活動輔導組。社辦：體育館 SG109。" }
	}
};
function text(value, fallback, max = 500) {
	if (typeof value !== "string") return fallback;
	const trimmed = value.trim();
	if (!trimmed) return fallback;
	return trimmed.slice(0, max);
}
function href(value, fallback) {
	if (typeof value !== "string") return fallback;
	const trimmed = value.trim();
	if (trimmed.startsWith("/") || trimmed.startsWith("https://")) return trimmed.slice(0, 200);
	return fallback;
}
function mergeLayout(raw) {
	const base = DEFAULT_LAYOUT;
	const src = raw && typeof raw === "object" ? raw : {};
	const introRaw = src.intro ?? {
		mode: "on",
		showTurtle: true,
		lines: []
	};
	const mode = introRaw.mode === "skip" || introRaw.mode === "off" ? introRaw.mode : "on";
	const lines = base.intro.lines.map((fallback, i) => {
		const row = introRaw.lines?.[i];
		return {
			text: text(row?.text, fallback.text, 80),
			sub: typeof row?.sub === "string" ? row.sub.trim().slice(0, 80) : fallback.sub
		};
	});
	const savedBlocks = Array.isArray(src.blocks) ? src.blocks : [];
	const used = /* @__PURE__ */ new Set();
	const blocks = [];
	for (const row of savedBlocks) {
		if (!row || !HOME_BLOCK_IDS.includes(row.id) || used.has(row.id)) continue;
		used.add(row.id);
		const fallback = BLOCK_COPY[row.id];
		blocks.push({
			id: row.id,
			visible: row.visible !== false,
			title: typeof row.title === "string" ? row.title.trim().slice(0, 80) : fallback.title,
			subtitle: typeof row.subtitle === "string" ? row.subtitle.trim().slice(0, 120) : fallback.subtitle
		});
	}
	for (const id of HOME_BLOCK_IDS) if (!used.has(id)) blocks.push({
		id,
		...BLOCK_COPY[id]
	});
	const hero = src.hero ?? base.hero;
	const about = src.pages?.about;
	const first = src.pages?.firstTime;
	const join = src.pages?.join;
	const cards = base.pages.firstTime.cards.map((fallback, i) => ({
		title: text(first?.cards?.[i]?.title, fallback.title, 40),
		body: text(first?.cards?.[i]?.body, fallback.body, 120)
	}));
	const steps = base.pages.join.steps.map((fallback, i) => ({
		title: text(join?.steps?.[i]?.title, fallback.title, 40),
		body: text(join?.steps?.[i]?.body, fallback.body, 160)
	}));
	return {
		intro: {
			mode,
			showTurtle: introRaw.showTurtle !== false,
			lines
		},
		hero: {
			title: text(hero.title, base.hero.title, 80),
			subtitle: text(hero.subtitle, base.hero.subtitle, 120),
			ctaPrimary: text(hero.ctaPrimary, base.hero.ctaPrimary, 24),
			ctaPrimaryHref: href(hero.ctaPrimaryHref, base.hero.ctaPrimaryHref),
			ctaSecondary: text(hero.ctaSecondary, base.hero.ctaSecondary, 24),
			ctaSecondaryHref: href(hero.ctaSecondaryHref, base.hero.ctaSecondaryHref),
			image: href(hero.image, base.hero.image)
		},
		blocks,
		pages: {
			about: {
				title: text(about?.title, base.pages.about.title, 40),
				p1: text(about?.p1, base.pages.about.p1, 400),
				p2: text(about?.p2, base.pages.about.p2, 400),
				p3: text(about?.p3, base.pages.about.p3, 400),
				official: text(about?.official, base.pages.about.official, 240)
			},
			firstTime: {
				title: text(first?.title, base.pages.firstTime.title, 40),
				lead: text(first?.lead, base.pages.firstTime.lead, 200),
				cards
			},
			join: {
				title: text(join?.title, base.pages.join.title, 40),
				lead: text(join?.lead, base.pages.join.lead, 200),
				steps
			},
			footer: { note: text(src.pages?.footer?.note, base.pages.footer.note, 300) }
		}
	};
}
var TAIPEI = "Asia/Taipei";
function computeEventStatus(input) {
	if (input.statusOverride) return input.statusOverride;
	const now = Date.now();
	const ends = Date.parse(input.endsAt);
	const starts = Date.parse(input.startsAt);
	if (Number.isFinite(ends) && now > ends) return "ended";
	if (input.capacity != null && input.registeredCount != null) {
		if (input.registeredCount >= input.capacity) return "full";
		if (input.capacity - input.registeredCount <= 3) return "filling";
	}
	if (input.registrationMode !== "closed" && (!Number.isFinite(starts) || now < starts)) return "open";
	return "upcoming";
}
function taipeiParts(iso) {
	const date = new Date(iso);
	const fmt = new Intl.DateTimeFormat("zh-TW", {
		timeZone: TAIPEI,
		year: "numeric",
		month: "numeric",
		day: "numeric",
		weekday: "short",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false
	});
	const bag = {};
	for (const p of fmt.formatToParts(date)) if (p.type !== "literal") bag[p.type] = p.value;
	return bag;
}
function formatEventDate(iso) {
	const p = taipeiParts(iso);
	const weekday = (p.weekday ?? "").replace("週", "");
	return `${p.month}/${p.day}（${weekday}）`;
}
function formatEventTime(iso) {
	const p = taipeiParts(iso);
	return `${p.hour}:${p.minute}`;
}
function formatEventRange(startsAt, endsAt) {
	const start = formatEventTime(startsAt);
	const end = formatEventTime(endsAt);
	if (start === "00:00" && (end === "23:59" || end === "00:00")) return formatEventDate(startsAt);
	return `${formatEventDate(startsAt)} ${start}–${end}`;
}
function formatRemaining(capacity, registered) {
	if (capacity == null || registered == null) return null;
	return Math.max(0, capacity - registered);
}
//#endregion
export { formatEventRange as a, formatEventDate as i, HOME_BLOCK_IDS as n, formatRemaining as o, computeEventStatus as r, mergeLayout as s, DEFAULT_LAYOUT as t };
