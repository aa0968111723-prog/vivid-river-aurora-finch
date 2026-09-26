import type { BlockNode, BlockProps, PageDocument, SourceKind } from "./types.ts";

export type CatalogRecord = {
  id?: string;
  title?: string;
  summary?: string;
  body?: string;
  slug?: string;
  computedStatus?: string;
  endsAt?: string;
  featured?: boolean;
  question?: string;
  answer?: string;
  quote?: string;
  postUrl?: string;
  src?: string;
  alt?: string | null;
  caption?: string | null;
  url?: string | null;
  kind?: string | null;
  faq?: { q?: string; a?: string; question?: string; answer?: string }[];
};

export type ContentCatalog = {
  events: CatalogRecord[];
  stories: CatalogRecord[];
  faq: CatalogRecord[];
  instagram: CatalogRecord[];
  photos: CatalogRecord[];
  posters: CatalogRecord[];
  currentEvent?: CatalogRecord | null;
  related?: CatalogRecord[];
  announcement?: { title: string; body: string; href: string; visible: boolean };
};

export type ResolvedBlock = {
  id: string;
  type: BlockNode["type"];
  props: BlockProps;
  items: CatalogRecord[];
  slots: ResolvedBlock[][];
};

function ended(event: CatalogRecord, now: number): boolean {
  if (event.computedStatus) return event.computedStatus === "ended";
  if (event.endsAt) {
    const time = Date.parse(event.endsAt);
    return Number.isFinite(time) && time < now;
  }
  return false;
}

function byIds(records: CatalogRecord[], ids: string[]): CatalogRecord[] {
  const map = new Map(records.flatMap((record) => (record.id ? [[record.id, record] as const] : [])));
  return ids.flatMap((id) => {
    const found = map.get(id);
    return found ? [found] : [];
  });
}

function pickEvents(source: SourceKind, ids: string[], catalog: ContentCatalog, now: number): CatalogRecord[] {
  const events = catalog.events;
  if (source === "manual") return byIds(events, ids);
  if (source === "ended") return events.filter((event) => ended(event, now));
  if (source === "upcoming") return events.filter((event) => !ended(event, now));
  if (source === "featured") return events.filter((event) => event.featured);
  if (source === "currentEvent") return catalog.currentEvent ? [catalog.currentEvent] : [];
  if (source === "related") return catalog.related ?? [];
  if (source === "all") return events;
  return [];
}

function mediaList(records: CatalogRecord[], source: SourceKind, ids: string[]): CatalogRecord[] {
  if (source === "manual") return byIds(records, ids);
  return records;
}

function itemsFor(block: BlockNode, catalog: ContentCatalog, now: number): CatalogRecord[] {
  const { source, ids } = block.props;
  if (block.type === "eventList" || block.type === "featuredEvents" || block.type === "eventTimeline" || block.type === "mood") {
    return pickEvents(source, ids, catalog, now);
  }
  if (block.type === "stories") {
    const stories = catalog.stories;
    if (source === "manual") return byIds(stories, ids);
    return stories;
  }
  if (block.type === "faq") {
    if (source === "currentEvent") {
      const faq = catalog.currentEvent?.faq;
      return Array.isArray(faq) ? (faq as CatalogRecord[]) : [];
    }
    const faqs = catalog.faq;
    if (source === "manual") return byIds(faqs, ids);
    return faqs;
  }
  if (block.type === "instagram") {
    const posts = catalog.instagram;
    if (source === "manual") return byIds(posts, ids);
    if (source === "featuredIg") return posts.filter((post) => post.featured !== false);
    return posts;
  }
  if (block.type === "photoWall") {
    if (source === "manual") return byIds([...catalog.photos, ...catalog.posters], ids);
    return catalog.photos;
  }
  if (block.type === "posterWall") return mediaList(catalog.posters, source, ids);
  if (block.type === "heading" || block.type === "image" || block.type === "buttons") {
    if (source === "currentEvent" && catalog.currentEvent) return [catalog.currentEvent];
  }
  return [];
}

function resolveBlock(block: BlockNode, catalog: ContentCatalog, now: number, includeHidden: boolean): ResolvedBlock | null {
  if (block.props.hidden && !includeHidden) return null;
  return {
    id: block.id,
    type: block.type,
    props: block.props,
    items: itemsFor(block, catalog, now),
    slots: (block.slots ?? []).map((column) =>
      column
        .map((child) => resolveBlock(child, catalog, now, includeHidden))
        .filter((child): child is ResolvedBlock => Boolean(child)),
    ),
  };
}

export function resolvePage(
  document: PageDocument,
  catalog: ContentCatalog,
  now = Date.now(),
  options: { includeHidden?: boolean } = {},
): ResolvedBlock[] {
  return document.blocks
    .map((block) => resolveBlock(block, catalog, now, options.includeHidden === true))
    .filter((block): block is ResolvedBlock => Boolean(block));
}
