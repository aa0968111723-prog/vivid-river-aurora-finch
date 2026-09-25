export const SITE = {
  name: "淡江大學禪學社",
  shortName: "淡江禪學社",
  nameEn: "TKU Zen Club",
  description:
    "在很忙的大學生活裡，留一點時間，認識自己。第一次來也沒關係。",
  instagramUrl: "https://www.instagram.com/tku_zc",
  instagramHandle: "@tku_zc",
  instagramDmUrl: "https://ig.me/m/tku_zc",
  facebookUrl: "https://www.facebook.com/tkuLeaderZen/",
  campus: "淡江大學（淡水校園）",
  garden: "淡大覺軒花園",
} as const;

export const NAV = [
  { to: "/", label: "首頁", match: "exact" as const },
  { to: "/events", label: "活動", match: "prefix" as const },
  { to: "/first-time", label: "第一次來", match: "prefix" as const },
  { to: "/about", label: "認識我們", match: "prefix" as const },
  { to: "/join", label: "加入我們", match: "prefix" as const },
] as const;

export const BOTTOM_NAV = [
  { to: "/", label: "首頁", icon: "home" as const, match: "exact" as const },
  { to: "/events", label: "活動", icon: "calendar" as const, match: "prefix" as const },
  { to: "/first-time", label: "第一次來", icon: "compass" as const, match: "prefix" as const },
  { to: "/join", label: "加入", icon: "heart" as const, match: "prefix" as const },
] as const;

export const CATEGORY_LABELS: Record<string, string> = {
  tea: "茶會",
  lecture: "期初演講",
  class: "社課",
  zen: "禪修",
  outdoor: "戶外活動",
  gathering: "聚會",
  recruit: "招生",
  other: "其他",
};

export const STATUS_LABELS: Record<string, string> = {
  upcoming: "即將開始",
  open: "報名中",
  filling: "名額將滿",
  full: "已額滿",
  ended: "活動結束",
};

export const REGISTRATION_LABELS: Record<string, string> = {
  google_form: "Google 表單",
  internal: "網站報名",
  external: "外部連結",
  instagram_dm: "IG 私訊",
  closed: "暫不開放",
};

export function withUtm(
  url: string,
  opts: {
    source?: string;
    medium?: string;
    campaign?: string;
    content?: string;
  } = {},
) {
  try {
    const u = new URL(url, "https://tku-zen.local");
    u.searchParams.set("utm_source", opts.source ?? "website");
    u.searchParams.set("utm_medium", opts.medium ?? "site");
    if (opts.campaign) u.searchParams.set("utm_campaign", opts.campaign);
    if (opts.content) u.searchParams.set("utm_content", opts.content);
    if (url.startsWith("http")) return u.toString();
    return `${u.pathname}${u.search}${u.hash}`;
  } catch {
    return url;
  }
}

export const MOODS = [
  {
    id: "tired",
    label: "最近有點累",
    lead: "先來坐一下就好。不用準備什麼。",
    categories: ["tea", "zen"],
  },
  {
    id: "self",
    label: "想認識自己",
    lead: "社課比較像一起找節奏，不是考試。",
    categories: ["class", "zen"],
  },
  {
    id: "friends",
    label: "想交新朋友",
    lead: "茶會跟小聚會最容易認識人。一個人來也很常見。",
    categories: ["tea", "gathering"],
  },
  {
    id: "mind",
    label: "腦袋一直停不下來",
    lead: "很正常。可以先來坐一下，或來茶會晃晃。",
    categories: ["zen", "tea"],
  },
  {
    id: "different",
    label: "想讓大學生活不一樣",
    lead: "從一場戶外走走或社課開始，就夠了。",
    categories: ["class", "outdoor"],
  },
  {
    id: "curious",
    label: "只是好奇禪到底是什麼",
    lead: "沒有入學考。來聽一場演講，或先看看第一次來專區。",
    categories: ["lecture", "class"],
  },
] as const;
