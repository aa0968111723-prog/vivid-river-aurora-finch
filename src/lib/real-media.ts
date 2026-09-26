export type ClubMedia = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  kind: "photo" | "poster";
};

export type MediaSource = {
  id?: string;
  src?: string | null;
  url?: string | null;
  previewUrl?: string | null;
  preview_url?: string | null;
  alt?: string | null;
  caption?: string | null;
  title?: string | null;
  kind?: string | null;
  assetType?: string | null;
  asset_type?: string | null;
};

/** Club-owned photos from their Drive. No names, phones, or member sheets. */
export const REAL_PHOTOS: ClubMedia[] = [
  {
    id: "photo-final-gathering",
    src: "/images/photos/final-gathering.jpg",
    alt: "期末社大，社員在教室合照",
    caption: "期末社大合照",
    kind: "photo",
  },
  {
    id: "photo-floating-flowers",
    src: "/images/photos/floating-flowers.jpg",
    alt: "浮花禪光體驗，社員在教室合照",
    caption: "浮花禪光體驗合照",
    kind: "photo",
  },
  {
    id: "photo-lecture-numbers",
    src: "/images/photos/lecture-numbers.jpg",
    alt: "期初演講現場，講者站在投影幕前",
    caption: "期初演講現場",
    kind: "photo",
  },
];

/** Posters already published on the club Instagram. Retrospective, not open signup. */
export const REAL_POSTERS: ClubMedia[] = [
  {
    id: "poster-opening-tea",
    src: "/images/posters/opening-tea.jpg",
    alt: "期初茶會文宣：浮花禪光",
    caption: "期初茶會文宣｜浮花禪光",
    kind: "poster",
  },
  {
    id: "poster-opening-talk",
    src: "/images/posters/opening-talk.jpg",
    alt: "期初演講文宣：與自己有約",
    caption: "期初演講文宣｜與自己有約",
    kind: "poster",
  },
  {
    id: "poster-class-1",
    src: "/images/posters/class-1.jpg",
    alt: "社課一文宣：靜定的力量",
    caption: "社課一文宣｜靜定的力量",
    kind: "poster",
  },
  {
    id: "poster-class-2",
    src: "/images/posters/class-2.jpg",
    alt: "社課二文宣：禪定重啟大腦潛能",
    caption: "社課二文宣｜禪定重啟大腦潛能",
    kind: "poster",
  },
  {
    id: "poster-class-3",
    src: "/images/posters/class-3.jpg",
    alt: "社課三文宣：生命的真相",
    caption: "社課三文宣｜生命的真相",
    kind: "poster",
  },
  {
    id: "poster-class-4",
    src: "/images/posters/class-4.jpg",
    alt: "社課四文宣：期中考大補帖",
    caption: "社課四文宣｜期中考大補帖",
    kind: "poster",
  },
  {
    id: "poster-class-5",
    src: "/images/posters/class-5.jpg",
    alt: "社課五文宣：天下第一禪",
    caption: "社課五文宣｜天下第一禪",
    kind: "poster",
  },
];

function mediaKind(row: MediaSource, fallback: ClubMedia["kind"]): ClubMedia["kind"] {
  const kind = row.kind || row.assetType || row.asset_type || "";
  if (kind === "poster") return "poster";
  if (kind === "photo") return "photo";
  return fallback;
}

/** One catalog record. Asset rows often have `url` and no `src`. */
export function mediaRecord(row: MediaSource, fallback: ClubMedia["kind"] = "photo"): ClubMedia | null {
  const src = row.src || row.url || row.previewUrl || row.preview_url || "";
  if (!src) return null;
  const kind = mediaKind(row, fallback);
  return {
    id: row.id || src,
    src,
    alt: row.alt || row.title || row.caption || "",
    caption: row.caption || row.title || "",
    kind,
  };
}

/** Shipped photos and posters, plus published assets, each with a stable id. */
export function catalogMedia(extra: MediaSource[] = []): { photos: ClubMedia[]; posters: ClubMedia[] } {
  const photos = new Map(REAL_PHOTOS.map((item) => [item.id, item]));
  const posters = new Map(REAL_POSTERS.map((item) => [item.id, item]));
  for (const row of extra) {
    const media = mediaRecord(row);
    if (!media) continue;
    const bucket = media.kind === "poster" ? posters : photos;
    if (!bucket.has(media.id)) bucket.set(media.id, media);
  }
  return { photos: [...photos.values()], posters: [...posters.values()] };
}

/** Photo wall shows chosen photos. It does not append every poster. */
export function photoWallMedia(items: ClubMedia[], source: string): { photos: ClubMedia[]; posters: ClubMedia[] } {
  const photos = items.filter((item) => item.kind !== "poster");
  const posters = items.filter((item) => item.kind === "poster");
  if (source === "manual") return { photos, posters };
  return { photos: photos.length ? photos : REAL_PHOTOS, posters: [] };
}
