import { SITE } from "../site.ts";
import { DEFAULT_LAYOUT } from "../site-layout.ts";
import type { BlockNode, BlockProps, BlockType, ButtonItem, PageDocument, PageKey, PageStore, TextItem } from "./types.ts";
import { PAGE_KEYS } from "./types.ts";

export const DEFAULT_HOME_SECTION_ORDER = [
  "龜龜開場",
  "大幅 Hero",
  "首頁公告",
  "最近活動",
  "心情選擇器",
  "第一次來流程",
  "社團平常做什麼",
  "真實照片牆",
  "Instagram 精選",
  "社員故事",
  "FAQ",
  "加入行動區",
] as const;

const LINES = DEFAULT_LAYOUT.intro.lines.map((line) => ({ text: line.text, sub: line.sub }));

const ACTIVITIES: TextItem[] = [
  { title: "每週社課", body: "學期間常在週三晚上。約 19:00–21:30，18:50 報到。地點會變，以當週 IG 為準。" },
  { title: "茶會", body: "期初常有茶會，也會有像浮游禪光這樣的體驗。這一學期的日期還沒排上網站。" },
  { title: "演講", body: "大型演講曾在工學大樓 E310。已結束的場次回顧在活動頁，不開放報名。" },
  { title: "期末社大", body: "學期結束前後會辦。今年日期還沒公告，以 IG 為準。" },
  { title: "寒假禪訓營", body: "寒假的密集練習。時程還沒公告，先不要當成已開放報名。" },
  { title: "暑期挑戰營", body: "暑假的營隊。看到 IG 再決定，現在沒有報名連結。" },
  { title: "戶外小聚會", body: "有時在覺軒花園走走。沒有固定表，看到 IG 再決定要不要來。" },
];

export function chromeDefaults(): BlockProps {
  return {
    sectionName: "",
    title: "",
    subtitle: "",
    body: "",
    backgroundColor: "",
    backgroundImage: "",
    backgroundMask: 0.35,
    textColor: "",
    align: "start",
    paddingY: "md",
    maxWidth: "default",
    columns: 1,
    imageRatio: "16/9",
    imageCrop: "cover",
    imageSrc: "",
    imageAlt: "",
    buttons: [],
    showDesktop: true,
    showTablet: true,
    showMobile: true,
    animate: false,
    anchor: "",
    source: "none",
    ids: [],
    hidden: false,
    showFilters: false,
    introMode: "on",
    showTurtle: true,
    lines: LINES.map((line) => ({ ...line })),
    dwellMs: [2200, 1800, 1800, 2000, 2000, 2400],
    advance: "click",
    position: "center",
    size: "md",
    backdropOpacity: 0.28,
    particleStrength: 0.35,
    ambientAudio: false,
    firstVisitOnly: true,
    disable3dOnMobile: false,
    showReplayInHeader: true,
    columnCount: 2,
    items: [],
  };
}

function block(id: string, type: BlockType, props: Partial<BlockProps>, slots?: BlockNode[][]): BlockNode {
  return {
    id,
    type,
    props: { ...chromeDefaults(), ...props, buttons: props.buttons ?? [], items: props.items ?? [], lines: props.lines ?? chromeDefaults().lines, dwellMs: props.dwellMs ?? chromeDefaults().dwellMs, ids: props.ids ?? [] },
    slots,
  };
}

function buttons(items: Array<[string, string, ButtonItem["style"]?]>): ButtonItem[] {
  return items.map(([label, href, style]) => ({
    label,
    href,
    style: style ?? "primary",
    target: href.startsWith("http") ? "blank" : "self",
  }));
}

export function defaultDocument(page: PageKey): PageDocument {
  return { version: 1, blocks: blocksFor(page) };
}

function blocksFor(page: PageKey): BlockNode[] {
  const layout = DEFAULT_LAYOUT;
  if (page === "home") {
    return [
      block("home-turtle", "turtle", {
        sectionName: "龜龜開場",
        title: "龜龜",
        paddingY: "none",
        introMode: "on",
        showTurtle: true,
        lines: LINES.map((line) => ({ ...line })),
        advance: "click",
        firstVisitOnly: true,
        showReplayInHeader: true,
        particleStrength: 0.35,
        ambientAudio: false,
      }),
      block("home-hero", "hero", {
        sectionName: "大幅 Hero",
        title: layout.hero.title,
        subtitle: layout.hero.subtitle,
        imageSrc: layout.hero.image,
        imageAlt: "",
        paddingY: "none",
        buttons: buttons([
          [layout.hero.ctaPrimary, layout.hero.ctaPrimaryHref, "primary"],
          [layout.hero.ctaSecondary, layout.hero.ctaSecondaryHref, "outline"],
        ]),
      }),
      block("home-announcement", "announcement", {
        sectionName: "首頁公告",
        title: "這一學期的場次還沒排上網站",
        subtitle: "看到 IG 再決定要不要來。",
        paddingY: "none",
        source: "none",
      }),
      block("home-events", "eventList", {
        sectionName: "最近活動",
        title: "想參加，選一場就好",
        subtitle: "最近有什麼活動？",
        source: "upcoming",
        paddingY: "none",
      }),
      block("home-mood", "mood", {
        sectionName: "心情選擇器",
        title: "最近的你，是哪一種狀態？",
        subtitle: "第一次認識禪學社",
        source: "all",
        paddingY: "none",
      }),
      block("home-first", "firstTimeFlow", {
        sectionName: "第一次來流程",
        title: layout.pages.firstTime.title,
        subtitle: "第一次來",
        body: layout.pages.firstTime.lead,
        items: layout.pages.firstTime.cards.map((card) => ({ ...card })),
        buttons: buttons([
          ["看看最近活動", "/events", "primary"],
          ["我想要加入", "/join", "outline"],
        ]),
      }),
      block("home-what", "heading", {
        sectionName: "社團平常做什麼",
        title: "不是課堂，比較像生活",
        subtitle: "我們平常都在做什麼？",
        body: "這些是社團平常會做的類型，不是本週課表。",
        items: ACTIVITIES.map((item) => ({ ...item })),
        columns: 2,
        backgroundColor: "#faf6ee",
      }),
      block("home-photos", "photoWall", {
        sectionName: "真實照片牆",
        title: "社團自己的照片",
        subtitle: "現場與文宣",
        body: "現場照來自社團雲端。文宣是 IG 上公開過的圖。不是生成圖，也不是這一週的課表。",
        source: "photos",
        imageRatio: "4/3",
      }),
      block("home-ig", "instagram", {
        sectionName: "Instagram 精選",
        title: "@tku_zc",
        subtitle: "Instagram",
        body: "點進貼文看完整圖。這裡的縮圖是 IG 給的預覽，有時會裁到字。",
        source: "featuredIg",
      }),
      block("home-stories", "stories", {
        sectionName: "社員故事",
        title: "社員怎麼開始的",
        subtitle: "社員故事",
        source: "stories",
        paddingY: "none",
      }),
      block("home-faq", "faq", {
        sectionName: "FAQ",
        title: "你可能想先問的",
        subtitle: "第一次來",
        source: "faq",
        paddingY: "none",
      }),
      block("home-join", "joinCta", {
        sectionName: "加入行動區",
        title: "想加入，先來一場就好",
        subtitle: "追 IG，或私訊「想參加」。",
        paddingY: "none",
        buttons: buttons([
          ["私訊「想參加」", "https://ig.me/m/tku_zc", "coral"],
          ["加入方式", "/join", "outline"],
        ]),
      }),
    ];
  }
  if (page === "events") {
    return [
      block("events-head", "heading", {
        sectionName: "活動列表標題",
        title: "最近想去哪一場？",
        subtitle: "活動",
        body: "一個人來可以。時間與教室以當週 IG 為準。可以放上網站的場次，都已結束、不開放報名。",
        paddingY: "lg",
      }),
      block("events-list", "eventList", {
        sectionName: "活動列表",
        title: "場次",
        source: "all",
        showFilters: true,
        paddingY: "none",
      }),
      block("events-timeline", "eventTimeline", {
        sectionName: "已結束時間軸",
        title: "已經結束的回顧",
        subtitle: "不開放報名",
        source: "ended",
      }),
    ];
  }
  if (page === "eventDetail") {
    return [
      block("detail-image", "image", {
        sectionName: "活動封面",
        source: "currentEvent",
        imageRatio: "16/9",
        imageCrop: "contain",
        paddingY: "none",
      }),
      block("detail-copy", "heading", {
        sectionName: "活動內文",
        subtitle: "活動",
        source: "currentEvent",
        paddingY: "md",
      }),
      block("detail-register", "buttons", {
        sectionName: "報名",
        source: "currentEvent",
        buttons: buttons([["看其他活動", "/events", "outline"]]),
      }),
      block("detail-faq", "faq", {
        sectionName: "活動問答",
        title: "這一場可能想問的",
        source: "currentEvent",
      }),
      block("detail-related", "eventList", {
        sectionName: "其他場次",
        title: "其他場次",
        source: "related",
        paddingY: "md",
      }),
    ];
  }
  if (page === "firstTime") {
    return [
      block("first-hero", "hero", {
        sectionName: "第一次來主視覺",
        subtitle: "第一次來",
        title: layout.pages.firstTime.title,
        body: layout.pages.firstTime.lead,
        imageSrc: "/images/garden-path.jpg",
        paddingY: "none",
        buttons: buttons([
          ["看看最近活動", "/events", "primary"],
          ["我想要加入", "/join", "outline"],
        ]),
      }),
      block("first-flow", "firstTimeFlow", {
        sectionName: "第一次參加流程",
        title: "先來坐坐看",
        body: layout.pages.firstTime.lead,
        items: layout.pages.firstTime.cards.map((card) => ({ ...card })),
        columns: 2,
      }),
      block("first-mood", "mood", {
        sectionName: "心情選擇器",
        title: "最近的你，是哪一種狀態？",
        subtitle: "第一次認識禪學社",
        source: "all",
        paddingY: "none",
      }),
      block("first-faq", "faq", {
        sectionName: "FAQ",
        title: "你可能還想問",
        source: "faq",
      }),
    ];
  }
  if (page === "about") {
    return [
      block("about-hero", "hero", {
        sectionName: "認識我們主視覺",
        subtitle: "認識我們",
        title: layout.pages.about.title,
        imageSrc: "/images/tricolor-light.jpg",
        paddingY: "none",
      }),
      block("about-columns", "columns", { sectionName: "認識我們雙欄", title: "", paddingY: "md", columnCount: 2 }, [
        [
          block("about-p1", "heading", {
            sectionName: "社團是什麼",
            title: "在淡水校園",
            body: layout.pages.about.p1,
            paddingY: "none",
          }),
        ],
        [
          block("about-p2", "heading", {
            sectionName: "不是讀經班",
            title: "時間與地點",
            body: layout.pages.about.p2,
            paddingY: "none",
          }),
        ],
      ]),
      block("about-p3", "heading", {
        sectionName: "怎麼開始",
        title: "一個人來也可以",
        body: `${layout.pages.about.p3}\n\n${layout.pages.about.official}`,
      }),
      block("about-turtle", "image", {
        sectionName: "龜龜",
        imageSrc: "/images/turtle.jpg",
        imageAlt: "龜龜，禪學社的帶路角色",
        imageRatio: "auto",
        align: "center",
      }),
      block("about-actions", "buttons", {
        sectionName: "認識我們按鈕",
        align: "center",
        buttons: buttons([
          ["看看活動", "/events", "primary"],
          ["加入我們", "/join", "outline"],
        ]),
      }),
    ];
  }
  if (page === "stories") {
    return [
      block("stories-head", "heading", {
        sectionName: "社員故事標題",
        subtitle: "社員故事",
        title: "社員故事",
        body: "真實社員故事籌備中。有本人同意、願意具名之後才會出現在這裡。",
      }),
      block("stories-list", "stories", {
        sectionName: "社員故事",
        title: "社員怎麼開始的",
        source: "stories",
      }),
    ];
  }
  if (page === "gallery") {
    return [
      block("gallery-head", "heading", {
        sectionName: "活動回顧標題",
        subtitle: "活動回顧",
        title: "活動回顧",
        body: "下面是社團自己的照片，和已經公開的文宣。不是生成圖，也不是這一週的課表。",
      }),
      block("gallery-photos", "photoWall", {
        sectionName: "真實照片牆",
        title: "現場",
        source: "photos",
        imageRatio: "4/3",
      }),
      block("gallery-posters", "posterWall", {
        sectionName: "海報牆",
        title: "文宣",
        body: "114 學年已公開的海報。日期寫在圖上，都已經結束。",
        source: "posters",
        imageRatio: "3/4",
      }),
      block("gallery-ended", "eventTimeline", {
        sectionName: "已結束活動",
        title: "這三場已經結束",
        source: "ended",
      }),
    ];
  }
  if (page === "join") {
    return [
      block("join-hero", "hero", {
        sectionName: "加入主視覺",
        title: layout.pages.join.title,
        subtitle: layout.pages.join.lead,
        imageSrc: "/images/photos/final-gathering.jpg",
        align: "center",
        paddingY: "none",
      }),
      block("join-steps", "firstTimeFlow", {
        sectionName: "加入流程",
        title: "先來一場就好",
        items: layout.pages.join.steps.map((step) => ({ ...step })),
        columns: 3,
      }),
      block("join-actions", "joinCta", {
        sectionName: "加入行動區",
        title: layout.pages.join.title,
        subtitle: layout.pages.join.lead,
        buttons: buttons([
          ["追 @tku_zc", "https://www.instagram.com/tku_zc", "coral"],
          ["私訊「想參加」", "https://ig.me/m/tku_zc", "primary"],
        ]),
      }),
      block("join-events", "eventList", {
        sectionName: "最近可以先去的",
        title: "最近可以先去的",
        source: "upcoming",
      }),
    ];
  }
  if (page === "header") {
    return [
      block("header-nav", "buttons", {
        sectionName: "頁首導覽",
        paddingY: "none",
        buttons: buttons([
          ["活動", "/events", "ghost"],
          ["第一次來", "/first-time", "ghost"],
          ["認識我們", "/about", "ghost"],
          ["加入我們", "/join", "ghost"],
          ["Instagram", SITE.instagramUrl, "ghost"],
        ]),
      }),
    ];
  }
  return [
    block("footer-note", "contact", {
      sectionName: "頁尾說明",
      title: "淡江大學禪學社",
      subtitle: SITE.campus,
      body: layout.pages.footer.note,
      paddingY: "none",
    }),
    block("footer-links", "buttons", {
      sectionName: "頁尾連結",
      paddingY: "none",
      buttons: buttons([
        ["近期活動", "/events", "ghost"],
        ["第一次來", "/first-time", "ghost"],
        ["加入我們", "/join", "ghost"],
        ["認識我們", "/about", "ghost"],
        ["Instagram @tku_zc", SITE.instagramUrl, "ghost"],
        ["Facebook", SITE.facebookUrl, "ghost"],
        ["社員後台", "/login", "ghost"],
      ]),
    }),
  ];
}

export function defaultPageStore(): PageStore {
  const pages = {} as PageStore["pages"];
  for (const key of PAGE_KEYS) {
    const published = defaultDocument(key);
    pages[key] = {
      draft: structuredClone(published),
      published,
      draftUpdatedAt: null,
      draftUpdatedBy: null,
      publishedAt: null,
      publishedBy: null,
    };
  }
  return { version: 1, pages };
}

export function defaultPropsFor(type: BlockType): BlockProps {
  const sample = defaultDocument("home").blocks.find((item) => item.type === type);
  if (sample) return structuredClone(sample.props);
  return chromeDefaults();
}
