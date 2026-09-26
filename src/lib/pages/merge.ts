import { HOME_BLOCK_IDS, type HomeBlockId, type SiteLayout } from "../site-layout.ts";
import { chromeDefaults, defaultDocument, defaultPageStore, defaultPropsFor } from "./defaults.ts";
import { clipText, safeAnchor, safeColor, safeUrl } from "./sanitize.ts";
import {
  BLOCK_TYPES,
  PAGE_KEYS,
  SOURCE_KINDS,
  type BlockNode,
  type BlockProps,
  type BlockType,
  type ButtonItem,
  type PageDocument,
  type PageKey,
  type PageRecord,
  type PageStore,
  type SourceKind,
  type TextItem,
} from "./types.ts";

const LEGACY_TO_TYPE: Record<HomeBlockId, BlockType> = {
  hero: "hero",
  announcement: "announcement",
  upcoming: "eventList",
  mood: "mood",
  what: "heading",
  photos: "photoWall",
  ig: "instagram",
  stories: "stories",
  faq: "faq",
  join: "joinCta",
};

const LEGACY_SOURCE: Partial<Record<HomeBlockId, SourceKind>> = {
  upcoming: "upcoming",
  mood: "all",
  photos: "photos",
  ig: "featuredIg",
  stories: "stories",
  faq: "faq",
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function asEnum<T extends string>(value: unknown, allowed: readonly T[], fallback: T): T {
  return typeof value === "string" && (allowed as readonly string[]).includes(value) ? (value as T) : fallback;
}

function asBool(value: unknown, fallback: boolean): boolean {
  if (typeof value === "boolean") return value;
  if (value === "true") return true;
  if (value === "false") return false;
  return fallback;
}

function asNumber(value: unknown, fallback: number, min: number, max: number): number {
  const number = typeof value === "number" ? value : typeof value === "string" ? Number(value) : Number.NaN;
  if (!Number.isFinite(number)) return fallback;
  return Math.min(max, Math.max(min, number));
}

function asButtons(value: unknown, fallback: ButtonItem[]): ButtonItem[] {
  if (!Array.isArray(value)) return fallback.map((item) => ({ ...item }));
  const buttons: ButtonItem[] = [];
  for (const row of value.slice(0, 8)) {
    if (!isRecord(row)) continue;
    const label = clipText(row.label, 40, "");
    const href = safeUrl(row.href);
    if (!label || !href) continue;
    buttons.push({
      label,
      href,
      style: asEnum(row.style, ["primary", "outline", "coral", "ghost"] as const, "primary"),
      target: row.target === "blank" ? "blank" : "self",
    });
  }
  return buttons;
}

function asItems(value: unknown, fallback: TextItem[]): TextItem[] {
  if (!Array.isArray(value)) return fallback.map((item) => ({ ...item }));
  return value.slice(0, 24).flatMap((row) => {
    if (!isRecord(row)) return [];
    return [{ title: clipText(row.title, 80, ""), body: clipText(row.body, 500, "") }];
  });
}

function asLines(value: unknown, fallback: BlockProps["lines"]): BlockProps["lines"] {
  const rows = Array.isArray(value) ? value : [];
  return fallback.map((line, index) => {
    const row = rows[index];
    if (!isRecord(row)) return { ...line };
    return {
      text: clipText(row.text, 80, line.text),
      sub: typeof row.sub === "string" ? clipText(row.sub, 80, "") : line.sub,
    };
  });
}

function asIds(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  const ids: string[] = [];
  for (const row of value.slice(0, 40)) {
    const raw = typeof row === "string" ? row : isRecord(row) ? row.id : "";
    if (typeof raw !== "string") continue;
    const id = raw.trim().slice(0, 80);
    if (id && !ids.includes(id) && !/[<>]/.test(id)) ids.push(id);
  }
  return ids;
}

function asDwell(value: unknown, fallback: number[]): number[] {
  const rows = Array.isArray(value) ? value : [];
  return fallback.map((item, index) => {
    const row = rows[index];
    const raw = typeof row === "number" ? row : isRecord(row) ? row.ms : row;
    return asNumber(raw, item, 400, 8000);
  });
}

export function mergeProps(fallback: BlockProps, raw: unknown): BlockProps {
  const src = isRecord(raw) ? raw : {};
  return {
    sectionName: clipText(src.sectionName, 40, fallback.sectionName),
    title: typeof src.title === "string" ? clipText(src.title, 120, "") : fallback.title,
    subtitle: typeof src.subtitle === "string" ? clipText(src.subtitle, 160, "") : fallback.subtitle,
    body: typeof src.body === "string" ? clipText(src.body, 2000, "") : fallback.body,
    backgroundColor: src.backgroundColor === undefined ? fallback.backgroundColor : safeColor(src.backgroundColor),
    backgroundImage: src.backgroundImage === undefined ? fallback.backgroundImage : safeUrl(src.backgroundImage),
    backgroundMask: asNumber(src.backgroundMask, fallback.backgroundMask, 0, 0.85),
    textColor: src.textColor === undefined ? fallback.textColor : safeColor(src.textColor),
    align: asEnum(src.align, ["start", "center", "end"] as const, fallback.align),
    paddingY: asEnum(src.paddingY, ["none", "sm", "md", "lg"] as const, fallback.paddingY),
    maxWidth: asEnum(src.maxWidth, ["narrow", "default", "wide"] as const, fallback.maxWidth),
    columns: asNumber(src.columns, fallback.columns, 1, 3) as 1 | 2 | 3,
    imageRatio: asEnum(src.imageRatio, ["auto", "square", "4/3", "16/9", "3/4"] as const, fallback.imageRatio),
    imageCrop: src.imageCrop === "contain" ? "contain" : src.imageCrop === "cover" ? "cover" : fallback.imageCrop,
    imageSrc: src.imageSrc === undefined ? fallback.imageSrc : safeUrl(src.imageSrc),
    imageAlt: typeof src.imageAlt === "string" ? clipText(src.imageAlt, 120, "") : fallback.imageAlt,
    buttons: asButtons(src.buttons, fallback.buttons),
    showDesktop: asBool(src.showDesktop, fallback.showDesktop),
    showTablet: asBool(src.showTablet, fallback.showTablet),
    showMobile: asBool(src.showMobile, fallback.showMobile),
    animate: asBool(src.animate, fallback.animate),
    anchor: src.anchor === undefined ? fallback.anchor : safeAnchor(src.anchor),
    source: asEnum(src.source, SOURCE_KINDS, fallback.source),
    ids: src.ids === undefined ? [...fallback.ids] : asIds(src.ids),
    hidden: asBool(src.hidden, fallback.hidden),
    showFilters: asBool(src.showFilters, fallback.showFilters),
    introMode: asEnum(src.introMode, ["on", "skip", "off"] as const, fallback.introMode),
    showTurtle: asBool(src.showTurtle, fallback.showTurtle),
    lines: asLines(src.lines, fallback.lines),
    dwellMs: asDwell(src.dwellMs ?? src.dwell, fallback.dwellMs),
    advance: src.advance === "auto" ? "auto" : src.advance === "click" ? "click" : fallback.advance,
    position: asEnum(src.position, ["left", "center", "right", "bottom"] as const, fallback.position),
    size: asEnum(src.size, ["sm", "md", "lg"] as const, fallback.size),
    backdropOpacity: asNumber(src.backdropOpacity, fallback.backdropOpacity, 0, 0.8),
    particleStrength: asNumber(src.particleStrength, fallback.particleStrength, 0, 1),
    ambientAudio: asBool(src.ambientAudio, fallback.ambientAudio),
    firstVisitOnly: asBool(src.firstVisitOnly, fallback.firstVisitOnly),
    disable3dOnMobile: asBool(src.disable3dOnMobile, fallback.disable3dOnMobile),
    showReplayInHeader: asBool(src.showReplayInHeader, fallback.showReplayInHeader),
    columnCount: asNumber(src.columnCount, fallback.columnCount, 2, 3) === 3 ? 3 : 2,
    items: asItems(src.items, fallback.items),
  };
}

function mergeBlock(raw: unknown, index: number, depth: number): BlockNode | null {
  if (!isRecord(raw) || depth > 3) return null;
  const type = asEnum(raw.type, BLOCK_TYPES, "heading");
  if (!BLOCK_TYPES.includes(type) || (raw.type && !BLOCK_TYPES.includes(raw.type as BlockType))) return null;
  const id = typeof raw.id === "string" && /^[A-Za-z0-9_-]{1,80}$/.test(raw.id) ? raw.id : `block-${index + 1}`;
  const props = mergeProps(defaultPropsFor(type), raw.props);
  if (typeof (raw.props as { sectionName?: unknown } | undefined)?.sectionName === "string") {
    props.sectionName = clipText((raw.props as { sectionName: string }).sectionName, 40, props.sectionName);
  }
  let slots: BlockNode[][] | undefined;
  if (type === "columns" && Array.isArray(raw.slots)) {
    slots = raw.slots.slice(0, 3).map((column, columnIndex) => {
      if (!Array.isArray(column)) return [];
      return column
        .slice(0, 20)
        .map((child, childIndex) => mergeBlock(child, columnIndex * 20 + childIndex, depth + 1))
        .filter((child): child is BlockNode => Boolean(child));
    });
    while (slots.length < props.columnCount) slots.push([]);
  }
  return { id, type, props, slots };
}

export function mergePageDocument(raw: unknown, page: PageKey): PageDocument {
  if (!isRecord(raw) || !Array.isArray(raw.blocks)) return defaultDocument(page);
  const blocks = raw.blocks
    .slice(0, 80)
    .map((block, index) => mergeBlock(block, index, 0))
    .filter((block): block is BlockNode => Boolean(block));
  return { version: 1, blocks };
}

function isPageStore(raw: unknown): raw is { version: 1; pages: Record<string, unknown> } {
  return isRecord(raw) && raw.version === 1 && isRecord(raw.pages) && isRecord(raw.pages.home);
}

function isLegacyLayout(raw: unknown): raw is Partial<SiteLayout> {
  if (!isRecord(raw) || !Array.isArray(raw.blocks)) return false;
  return raw.blocks.some((block) => isRecord(block) && typeof block.id === "string" && HOME_BLOCK_IDS.includes(block.id as HomeBlockId));
}

function legacyBlock(row: { id: HomeBlockId; visible?: boolean; title?: string; subtitle?: string }, hero: SiteLayout["hero"], intro: SiteLayout["intro"]): BlockNode {
  const type = LEGACY_TO_TYPE[row.id];
  const fallback = defaultPropsFor(type);
  const title = typeof row.title === "string" ? row.title : row.id === "hero" ? hero.title : fallback.title;
  const subtitle = typeof row.subtitle === "string" ? row.subtitle : row.id === "hero" ? hero.subtitle : fallback.subtitle;
  return {
    id: `legacy-${row.id}`,
    type,
    props: mergeProps(fallback, {
      title,
      subtitle,
      hidden: row.visible === false,
      source: LEGACY_SOURCE[row.id] ?? fallback.source,
      imageSrc: row.id === "hero" ? hero.image : fallback.imageSrc,
      buttons:
        row.id === "hero"
          ? [
              { label: hero.ctaPrimary, href: hero.ctaPrimaryHref, style: "primary", target: "self" },
              { label: hero.ctaSecondary, href: hero.ctaSecondaryHref, style: "outline", target: "self" },
            ]
          : fallback.buttons,
      introMode: intro.mode,
      showTurtle: intro.showTurtle,
      lines: intro.lines,
    }),
  };
}

function legacyStore(raw: Partial<SiteLayout>): PageStore {
  const base = defaultPageStore();
  const hero = { ...base.pages.home.published.blocks.find((block) => block.type === "hero")!.props, ...raw.hero };
  const intro = {
    mode: raw.intro?.mode === "skip" || raw.intro?.mode === "off" ? raw.intro.mode : "on",
    showTurtle: raw.intro?.showTurtle !== false,
    lines: chromeDefaults().lines.map((line, index) => ({
      text: raw.intro?.lines?.[index]?.text || line.text,
      sub: raw.intro?.lines?.[index]?.sub ?? line.sub,
    })),
  };
  const saved = Array.isArray(raw.blocks) ? raw.blocks : [];
  const used = new Set<HomeBlockId>();
  const blocks: BlockNode[] = [
    legacyBlock({ id: "hero", visible: true, title: "龜龜開場" }, hero as SiteLayout["hero"], intro as SiteLayout["intro"]),
  ];
  blocks[0] = {
    ...blocks[0],
    id: "legacy-turtle",
    type: "turtle",
    props: mergeProps(defaultPropsFor("turtle"), {
      sectionName: "龜龜開場",
      introMode: intro.mode,
      showTurtle: intro.showTurtle,
      lines: intro.lines,
    }),
  };
  for (const row of saved) {
    if (!row || !HOME_BLOCK_IDS.includes(row.id) || used.has(row.id)) continue;
    used.add(row.id);
    if (row.id === "hero") {
      blocks.push(
        legacyBlock(
          { id: "hero", visible: row.visible, title: hero.title as string, subtitle: hero.subtitle as string },
          hero as SiteLayout["hero"],
          intro as SiteLayout["intro"],
        ),
      );
      blocks[blocks.length - 1].props.sectionName = "大幅 Hero";
      continue;
    }
    const next = legacyBlock(row, hero as SiteLayout["hero"], intro as SiteLayout["intro"]);
    blocks.push(next);
  }
  const home: PageDocument = { version: 1, blocks };
  const about = raw.pages?.about;
  const first = raw.pages?.firstTime;
  const join = raw.pages?.join;
  const footerNote = raw.pages?.footer?.note;
  const aboutDoc = defaultDocument("about");
  const firstDoc = defaultDocument("firstTime");
  const joinDoc = defaultDocument("join");
  const footerDoc = defaultDocument("footer");
  if (about?.title) {
    const heroBlock = aboutDoc.blocks.find((block) => block.type === "hero");
    if (heroBlock) heroBlock.props.title = clipText(about.title, 80, heroBlock.props.title);
  }
  const aboutCopy = aboutDoc.blocks.find((block) => block.id === "about-p3");
  if (aboutCopy && about) {
    aboutCopy.props.body = [about.p3, about.official].filter(Boolean).join("\n\n");
  }
  const firstFlow = firstDoc.blocks.find((block) => block.type === "firstTimeFlow");
  if (firstFlow && first?.cards) {
    firstFlow.props.items = first.cards.map((card) => ({
      title: clipText(card.title, 40, ""),
      body: clipText(card.body, 160, ""),
    }));
  }
  const joinFlow = joinDoc.blocks.find((block) => block.type === "firstTimeFlow");
  if (joinFlow && join?.steps) {
    joinFlow.props.items = join.steps.map((step) => ({
      title: clipText(step.title, 40, ""),
      body: clipText(step.body, 200, ""),
    }));
  }
  const contact = footerDoc.blocks.find((block) => block.type === "contact");
  if (contact && footerNote) contact.props.body = clipText(footerNote, 400, contact.props.body);
  const stamp = (document: PageDocument): PageRecord => ({
    draft: structuredClone(document),
    published: document,
    draftUpdatedAt: null,
    draftUpdatedBy: null,
    publishedAt: null,
    publishedBy: null,
  });
  return {
    version: 1,
    pages: {
      ...base.pages,
      home: stamp(mergePageDocument(home, "home")),
      about: stamp(aboutDoc),
      firstTime: stamp(firstDoc),
      join: stamp(joinDoc),
      footer: stamp(footerDoc),
    },
  };
}

function mergeRecord(raw: unknown, key: PageKey, fallback: PageRecord): PageRecord {
  if (!isRecord(raw)) return fallback;
  const draft = mergePageDocument(raw.draft, key);
  const published = mergePageDocument(raw.published ?? raw.draft, key);
  return {
    draft,
    published,
    draftUpdatedAt: typeof raw.draftUpdatedAt === "string" ? raw.draftUpdatedAt : null,
    draftUpdatedBy: typeof raw.draftUpdatedBy === "string" ? clipText(raw.draftUpdatedBy, 80, "") || null : null,
    publishedAt: typeof raw.publishedAt === "string" ? raw.publishedAt : null,
    publishedBy: typeof raw.publishedBy === "string" ? clipText(raw.publishedBy, 80, "") || null : null,
  };
}

export function mergePageStore(raw: unknown): PageStore {
  if (raw == null) return defaultPageStore();
  if (typeof raw === "string") {
    try {
      return mergePageStore(JSON.parse(raw));
    } catch {
      return defaultPageStore();
    }
  }
  if (isLegacyLayout(raw)) return legacyStore(raw);
  if (!isPageStore(raw)) return defaultPageStore();
  const base = defaultPageStore();
  const pages = { ...base.pages };
  for (const key of PAGE_KEYS) {
    pages[key] = mergeRecord((raw.pages as Record<string, unknown>)[key], key, base.pages[key]);
  }
  return { version: 1, pages };
}

export function publishedDocument(store: PageStore, page: PageKey): PageDocument {
  return store.pages[page].published;
}

export function publicPages(store: PageStore): Record<PageKey, PageDocument> {
  const pages = {} as Record<PageKey, PageDocument>;
  for (const key of PAGE_KEYS) pages[key] = store.pages[key].published;
  return pages;
}
