import { computeEventStatus } from "@/lib/format";
import type {
  AssetRecord,
  EventAsset,
  EventRecord,
  EventStatus,
  FaqItem,
  FaqRecord,
  InstagramPost,
  RegistrationMode,
  StoryRecord,
} from "@/lib/types";

export type EventRow = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  cover_image: string | null;
  category_id: string;
  category_name?: string | null;
  starts_at: string;
  ends_at: string;
  timezone: string;
  location_name: string;
  location_detail: string | null;
  map_url: string | null;
  summary: string;
  body: string;
  audience: string | null;
  registration_mode: string;
  registration_url: string | null;
  registration_note: string | null;
  capacity: number | null;
  registered_count: number | null;
  status_override: string | null;
  ig_url: string | null;
  canva_url: string | null;
  faq: unknown;
  published_at: string | null;
  status: string;
  is_demo: boolean;
  featured: boolean;
};

function asIso(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "string") return value;
  return String(value ?? "");
}

function asIsoOrNull(value: unknown): string | null {
  if (value == null) return null;
  const s = asIso(value);
  return s || null;
}

function parseFaq(raw: unknown): FaqItem[] {
  if (!raw) return [];
  if (typeof raw === "string") {
    try {
      return parseFaq(JSON.parse(raw));
    } catch {
      return [];
    }
  }
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const rec = item as Record<string, unknown>;
      const q = typeof rec.q === "string" ? rec.q : "";
      const a = typeof rec.a === "string" ? rec.a : "";
      if (!q || !a) return null;
      return { q, a };
    })
    .filter((x): x is FaqItem => Boolean(x));
}

export function mapEvent(row: EventRow): EventRecord {
  const registrationMode = row.registration_mode as RegistrationMode;
  const statusOverride = (row.status_override as EventStatus | null) ?? null;
  const startsAt = asIso(row.starts_at);
  const endsAt = asIso(row.ends_at);
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle,
    coverImage: row.cover_image,
    categoryId: row.category_id as EventRecord["categoryId"],
    categoryName: row.category_name ?? row.category_id,
    startsAt,
    endsAt,
    timezone: row.timezone,
    locationName: row.location_name,
    locationDetail: row.location_detail,
    mapUrl: row.map_url,
    summary: row.summary,
    body: row.body,
    audience: row.audience,
    registrationMode,
    registrationUrl: row.registration_url,
    registrationNote: row.registration_note,
    capacity: row.capacity,
    registeredCount: row.registered_count,
    statusOverride,
    computedStatus: computeEventStatus({
      startsAt,
      endsAt,
      capacity: row.capacity,
      registeredCount: row.registered_count,
      statusOverride,
      registrationMode,
    }),
    igUrl: row.ig_url,
    canvaUrl: row.canva_url,
    faq: parseFaq(row.faq),
    publishedAt: asIsoOrNull(row.published_at),
    status: row.status as EventRecord["status"],
    isDemo: Boolean(row.is_demo),
    featured: Boolean(row.featured),
  };
}

export function mapStory(row: {
  id: string;
  slug: string;
  quote: string;
  body: string;
  display_name: string;
  role_label: string | null;
  photo_url: string | null;
  joined_label: string | null;
  related_event_id: string | null;
  instagram_url: string | null;
  is_demo: boolean;
}): StoryRecord {
  return {
    id: row.id,
    slug: row.slug,
    quote: row.quote,
    body: row.body,
    displayName: row.display_name,
    roleLabel: row.role_label,
    photoUrl: row.photo_url && !row.photo_url.includes("/images/story-") ? row.photo_url : null,
    joinedLabel: row.joined_label,
    relatedEventId: row.related_event_id,
    instagramUrl: row.instagram_url,
    isDemo: Boolean(row.is_demo),
  };
}

export function mapFaq(row: {
  id: string;
  question: string;
  answer: string;
  icon: string | null;
  sort_order: number;
}): FaqRecord {
  return {
    id: row.id,
    question: row.question,
    answer: row.answer,
    icon: row.icon,
    sortOrder: row.sort_order,
  };
}

function clubImageUrl(url: string | null): string | null {
  if (!url) return null;
  if (
    url.startsWith("/images/ig/") ||
    url.startsWith("/images/posters/") ||
    url.startsWith("/images/photos/")
  ) {
    return url;
  }
  if (url.startsWith("/images/")) return null;
  return url;
}

export function mapIg(row: {
  id: string;
  post_url: string;
  thumbnail_url: string | null;
  caption: string | null;
  post_type: string;
  published_on: string | null;
  featured: boolean;
}): InstagramPost {
  return {
    id: row.id,
    postUrl: row.post_url,
    thumbnailUrl: clubImageUrl(row.thumbnail_url),
    caption: row.caption,
    postType: row.post_type,
    publishedOn: asIsoOrNull(row.published_on),
    featured: Boolean(row.featured),
  };
}

export function mapAsset(row: {
  id: string;
  title: string | null;
  url: string;
  preview_url: string | null;
  asset_type: string;
  canva_url: string | null;
  drive_url: string | null;
  event_id: string | null;
  tags: string | null;
}): AssetRecord {
  return {
    id: row.id,
    title: row.title,
    url: row.url,
    previewUrl: row.preview_url,
    assetType: row.asset_type,
    canvaUrl: row.canva_url,
    driveUrl: row.drive_url,
    eventId: row.event_id,
    tags: row.tags,
  };
}

export function mapEventAsset(row: {
  id: string;
  event_id: string;
  kind: string;
  url: string;
  preview_url: string | null;
  caption: string | null;
  sort_order: number;
}): EventAsset {
  return {
    id: row.id,
    eventId: row.event_id,
    kind: row.kind,
    url: row.url,
    previewUrl: row.preview_url,
    caption: row.caption,
    sortOrder: row.sort_order,
  };
}
