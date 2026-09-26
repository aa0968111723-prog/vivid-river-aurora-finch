export const PAGE_KEYS = [
  "home",
  "events",
  "eventDetail",
  "firstTime",
  "about",
  "stories",
  "gallery",
  "join",
  "header",
  "footer",
] as const;

export type PageKey = (typeof PAGE_KEYS)[number];

export const BLOCK_TYPES = [
  "hero",
  "heading",
  "image",
  "imageText",
  "buttons",
  "announcement",
  "eventList",
  "featuredEvents",
  "eventTimeline",
  "firstTimeFlow",
  "mood",
  "stories",
  "faq",
  "instagram",
  "photoWall",
  "posterWall",
  "joinCta",
  "contact",
  "divider",
  "spacer",
  "columns",
  "turtle",
] as const;

export type BlockType = (typeof BLOCK_TYPES)[number];

export const SOURCE_KINDS = [
  "none",
  "upcoming",
  "ended",
  "all",
  "featured",
  "featuredIg",
  "manual",
  "stories",
  "faq",
  "photos",
  "posters",
  "currentEvent",
  "related",
] as const;

export type SourceKind = (typeof SOURCE_KINDS)[number];

export type ButtonStyle = "primary" | "outline" | "coral" | "ghost";
export type ButtonTarget = "self" | "blank";

export type ButtonItem = {
  label: string;
  href: string;
  style: ButtonStyle;
  target: ButtonTarget;
};

export type TextItem = { title: string; body: string };
export type IntroLine = { text: string; sub: string };

export type BlockProps = {
  sectionName: string;
  title: string;
  subtitle: string;
  body: string;
  backgroundColor: string;
  backgroundImage: string;
  backgroundMask: number;
  textColor: string;
  align: "start" | "center" | "end";
  paddingY: "none" | "sm" | "md" | "lg";
  maxWidth: "narrow" | "default" | "wide";
  columns: 1 | 2 | 3;
  imageRatio: "auto" | "square" | "4/3" | "16/9" | "3/4";
  imageCrop: "cover" | "contain";
  imageSrc: string;
  imageAlt: string;
  buttons: ButtonItem[];
  showDesktop: boolean;
  showTablet: boolean;
  showMobile: boolean;
  animate: boolean;
  anchor: string;
  source: SourceKind;
  ids: string[];
  hidden: boolean;
  showFilters: boolean;
  introMode: "on" | "skip" | "off";
  showTurtle: boolean;
  lines: IntroLine[];
  dwellMs: number[];
  advance: "auto" | "click";
  position: "left" | "center" | "right" | "bottom";
  size: "sm" | "md" | "lg";
  backdropOpacity: number;
  particleStrength: number;
  ambientAudio: boolean;
  firstVisitOnly: boolean;
  disable3dOnMobile: boolean;
  showReplayInHeader: boolean;
  columnCount: 2 | 3;
  items: TextItem[];
};

export type BlockNode = {
  id: string;
  type: BlockType;
  props: BlockProps;
  slots?: BlockNode[][];
};

export type PageDocument = {
  version: 1;
  blocks: BlockNode[];
};

export type PageRecord = {
  draft: PageDocument;
  published: PageDocument;
  draftUpdatedAt: string | null;
  draftUpdatedBy: string | null;
  publishedAt: string | null;
  publishedBy: string | null;
};

export type PageStore = {
  version: 1;
  pages: Record<PageKey, PageRecord>;
};

export const PAGE_LABELS: Record<PageKey, string> = {
  home: "首頁",
  events: "活動列表",
  eventDetail: "活動詳情頁共用版型",
  firstTime: "第一次來",
  about: "認識我們",
  stories: "社員故事",
  gallery: "活動回顧",
  join: "加入我們",
  header: "頁首",
  footer: "頁尾",
};

export const BLOCK_LABELS: Record<BlockType, string> = {
  hero: "Hero 主視覺",
  heading: "標題與內文",
  image: "圖片",
  imageText: "圖片加文字",
  buttons: "按鈕群組",
  announcement: "公告",
  eventList: "活動列表",
  featuredEvents: "精選活動",
  eventTimeline: "活動時間軸",
  firstTimeFlow: "第一次參加流程",
  mood: "心情選擇器",
  stories: "社員故事",
  faq: "FAQ",
  instagram: "Instagram 貼文",
  photoWall: "照片牆",
  posterWall: "海報牆",
  joinCta: "加入行動區",
  contact: "聯絡資訊",
  divider: "分隔線",
  spacer: "留白",
  columns: "自訂雙欄或三欄容器",
  turtle: "龜龜互動區塊",
};
