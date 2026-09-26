import type { ReactNode } from "react";
import type { Config, Data } from "@puckeditor/core";
import { BlockView, type RenderCatalog } from "@/components/blocks/block-view";
import type { ContentCatalog } from "@/lib/pages/resolve";
import { publicCatalog } from "@/lib/pages/catalog";
import { defaultPropsFor } from "@/lib/pages/defaults";
import { puckToDocument, type PuckData } from "@/lib/pages/puck-data";
import { resolvePage } from "@/lib/pages/resolve";
import { BLOCK_LABELS, BLOCK_TYPES, type BlockType } from "@/lib/pages/types";

const choice = (label: string, options: string[]) => ({
  type: "select" as const,
  label,
  options: options.map((value) => ({ label: value, value })),
});

const yesNo = (label: string) => ({
  type: "radio" as const,
  label,
  options: [
    { label: "是", value: true },
    { label: "否", value: false },
  ],
});

const chromeFields = {
  sectionName: { type: "text" as const, label: "區塊名稱" },
  title: { type: "text" as const, label: "標題", contentEditable: true },
  subtitle: { type: "text" as const, label: "副標題", contentEditable: true },
  body: { type: "textarea" as const, label: "內文", contentEditable: true },
  backgroundColor: { type: "text" as const, label: "背景顏色" },
  backgroundImage: { type: "text" as const, label: "背景圖片" },
  backgroundMask: { type: "number" as const, label: "背景遮罩", min: 0, max: 0.85, step: 0.05 },
  textColor: { type: "text" as const, label: "文字顏色" },
  align: choice("對齊", ["start", "center", "end"]),
  paddingY: choice("上下留白", ["none", "sm", "md", "lg"]),
  maxWidth: choice("內容寬度", ["narrow", "default", "wide"]),
  columns: { type: "number" as const, label: "欄數", min: 1, max: 3, step: 1 },
  imageRatio: choice("圖片比例", ["auto", "square", "4/3", "16/9", "3/4"]),
  imageCrop: choice("裁切", ["cover", "contain"]),
  imageSrc: { type: "text" as const, label: "圖片" },
  imageAlt: { type: "text" as const, label: "圖片替代文字" },
  buttons: {
    type: "array" as const,
    label: "按鈕",
    max: 8,
    arrayFields: {
      label: { type: "text" as const, label: "文字" },
      href: { type: "text" as const, label: "連結" },
      style: choice("樣式", ["primary", "outline", "coral", "ghost"]),
      target: choice("開啟", ["self", "blank"]),
    },
    getItemSummary: (item: { label?: string }) => item.label || "按鈕",
  },
  showDesktop: yesNo("桌面顯示"),
  showTablet: yesNo("平板顯示"),
  showMobile: yesNo("手機顯示"),
  animate: yesNo("進場動畫"),
  anchor: { type: "text" as const, label: "錨點" },
  source: choice("資料來源", ["none", "upcoming", "ended", "all", "featured", "featuredIg", "manual", "stories", "faq", "photos", "posters", "currentEvent", "related"]),
  manualIds: {
    type: "array" as const,
    label: "手動選取 id",
    arrayFields: { id: { type: "text" as const, label: "id" } },
    getItemSummary: (item: { id?: string }) => item.id || "id",
  },
  hidden: yesNo("隱藏"),
  showFilters: yesNo("顯示篩選"),
  items: {
    type: "array" as const,
    label: "卡片",
    arrayFields: {
      title: { type: "text" as const, label: "標題" },
      body: { type: "textarea" as const, label: "內文" },
    },
    getItemSummary: (item: { title?: string }) => item.title || "卡片",
  },
};

const turtleFields = {
  introMode: choice("開場", ["on", "skip", "off"]),
  showTurtle: yesNo("顯示龜龜"),
  lines: {
    type: "array" as const,
    label: "六句對話",
    max: 6,
    arrayFields: {
      text: { type: "text" as const, label: "句子", contentEditable: true },
      sub: { type: "text" as const, label: "補充" },
    },
    getItemSummary: (item: { text?: string }, index?: number) => item.text || `第 ${(index ?? 0) + 1} 句`,
  },
  dwell: {
    type: "array" as const,
    label: "每句停留毫秒",
    max: 6,
    arrayFields: { ms: { type: "number" as const, label: "毫秒", min: 400, max: 8000 } },
    getItemSummary: (item: { ms?: number }) => `${item.ms ?? 0} ms`,
  },
  advance: choice("播放", ["click", "auto"]),
  position: choice("出現位置", ["left", "center", "right", "bottom"]),
  size: choice("大小", ["sm", "md", "lg"]),
  backdropOpacity: { type: "number" as const, label: "背景透明度", min: 0, max: 0.8, step: 0.05 },
  particleStrength: { type: "number" as const, label: "粒子強度", min: 0, max: 1, step: 0.05 },
  ambientAudio: yesNo("環境音"),
  firstVisitOnly: yesNo("只在第一次造訪播放"),
  disable3dOnMobile: yesNo("手機停用完整 3D"),
  showReplayInHeader: yesNo("頁首再次看看龜龜"),
};

function defaultsFor(type: BlockType) {
  const props = defaultPropsFor(type);
  return { ...props, dwell: props.dwellMs.map((ms) => ({ ms })), manualIds: props.ids.map((id) => ({ id })) };
}

function Preview(type: BlockType, props: Record<string, unknown> & { id?: string; puck?: { metadata?: { catalog?: ContentCatalog }; isEditing?: boolean } }) {
  const data: PuckData = { root: { props: {} }, content: [{ type, props: { ...props, id: props.id ?? type } }] };
  const document = puckToDocument(data, "home");
  const incoming = props.puck?.metadata?.catalog;
  if (!incoming) return <div />;
  const catalog = publicCatalog(incoming, {
    currentEvent: incoming.currentEvent,
    related: incoming.related,
    announcement: incoming.announcement,
  });
  const [block] = resolvePage(document, catalog, Date.now(), { includeHidden: true });
  if (!block) return <div />;
  return <BlockView block={block} catalog={catalog as RenderCatalog} editing={Boolean(props.puck?.isEditing)} />;
}

const slot = (label: string) => ({ type: "slot" as const, label });

function leaf(type: BlockType, extra: Record<string, unknown> = {}) {
  return {
    label: BLOCK_LABELS[type],
    fields: { ...chromeFields, ...extra },
    defaultProps: defaultsFor(type),
    render: (props: Record<string, unknown>) => Preview(type, props),
  };
}

export const zenEditorConfig = {
  categories: {
    visual: { title: "視覺", components: ["hero", "heading", "image", "imageText", "buttons", "announcement"] },
    content: { title: "內容", components: ["eventList", "featuredEvents", "eventTimeline", "firstTimeFlow", "mood", "stories", "faq", "instagram", "photoWall", "posterWall", "joinCta", "contact"] },
    layout: { title: "版面", components: ["divider", "spacer", "columns"] },
    turtle: { title: "龜龜", components: ["turtle"] },
  },
  components: Object.fromEntries(
    BLOCK_TYPES.map((type) => {
      if (type === "columns") {
        return [
          type,
          {
            label: BLOCK_LABELS.columns,
            fields: { ...chromeFields, columnCount: choice("欄數", ["2", "3"]), col1: slot("第一欄"), col2: slot("第二欄"), col3: slot("第三欄") },
            defaultProps: { ...defaultsFor("columns"), columnCount: "2" },
            render: (props: { columnCount?: string | number; col1: (args?: { minEmptyHeight?: number }) => ReactNode; col2: (args?: { minEmptyHeight?: number }) => ReactNode; col3: (args?: { minEmptyHeight?: number }) => ReactNode }) => {
              const count = String(props.columnCount) === "3" ? 3 : 2;
              const Col1 = props.col1;
              const Col2 = props.col2;
              const Col3 = props.col3;
              return (
                <div className={count === 3 ? "grid gap-3 md:grid-cols-3" : "grid gap-3 md:grid-cols-2"}>
                  <div className="min-h-16 rounded-xl border border-dashed border-line p-2"><Col1 minEmptyHeight={64} /></div>
                  <div className="min-h-16 rounded-xl border border-dashed border-line p-2"><Col2 minEmptyHeight={64} /></div>
                  {count === 3 ? <div className="min-h-16 rounded-xl border border-dashed border-line p-2"><Col3 minEmptyHeight={64} /></div> : null}
                </div>
              );
            },
          },
        ];
      }
      if (type === "turtle") return [type, leaf(type, turtleFields)];
      return [type, leaf(type)];
    }),
  ),
} as unknown as Config;

export type ZenData = Data;
