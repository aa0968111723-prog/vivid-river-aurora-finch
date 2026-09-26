import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { publicCatalog } from "@/lib/pages/catalog";
import { catalogMedia, type MediaSource } from "@/lib/real-media";
import type { Announcement, SiteClubSettings } from "@/lib/types";
import {
  mapAsset,
  mapEvent,
  mapEventAsset,
  mapFaq,
  mapIg,
  mapStory,
  type EventRow,
} from "./map";

const EVENT_SELECT = `
  e.id, e.slug, e.title, e.subtitle, e.cover_image, e.category_id,
  c.name_zh as category_name,
  e.starts_at::text as starts_at, e.ends_at::text as ends_at, e.timezone,
  e.location_name, e.location_detail, e.map_url, e.summary, e.body, e.audience,
  e.registration_mode, e.registration_url, e.registration_note,
  e.capacity, e.registered_count, e.status_override, e.ig_url, e.canva_url,
  e.faq, e.published_at::text as published_at, e.status, e.is_demo, e.featured
`;

export const getPublishedEvents = createServerFn({ method: "GET" }).handler(
  async () => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const rows = await sql.query<EventRow>(
      `select ${EVENT_SELECT}
       from events e
       join event_categories c on c.id = e.category_id
       where e.status = 'published' and e.deleted_at is null and e.is_demo = false
       order by e.starts_at asc`,
    );
    return rows.map((row) => ({ ...mapEvent(row), canvaUrl: null }));
  },
);

export const getEventBySlug = createServerFn({ method: "GET" })
  .validator(z.object({ slug: z.string() }))
  .handler(async ({ data }) => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const rows = await sql.query<EventRow>(
      `select ${EVENT_SELECT}
       from events e
       join event_categories c on c.id = e.category_id
       where e.slug = $1 and e.status = 'published' and e.deleted_at is null and e.is_demo = false
       limit 1`,
      [data.slug],
    );
    const event = rows[0] ? { ...mapEvent(rows[0]), canvaUrl: null } : null;
    if (!event) return null;
    const assets = await sql.query<{
      id: string;
      event_id: string;
      kind: string;
      url: string;
      preview_url: string | null;
      caption: string | null;
      sort_order: number;
    }>(
      `select id, event_id, kind, url, preview_url, caption, sort_order
       from event_assets where event_id = $1 order by sort_order asc`,
      [event.id],
    );
    const related = await sql.query<EventRow>(
      `select ${EVENT_SELECT}
       from events e
       join event_categories c on c.id = e.category_id
       where e.status = 'published' and e.deleted_at is null and e.is_demo = false
         and e.id <> $1
         and (e.category_id = $2 or e.starts_at > now())
       order by e.starts_at asc
       limit 3`,
      [event.id, event.categoryId],
    );
    return {
      event,
      assets: assets.map(mapEventAsset),
      related: related.map((row) => ({ ...mapEvent(row), canvaUrl: null })),
    };
  });

export const getPublishedStories = createServerFn({ method: "GET" }).handler(
  async () => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const rows = await sql.query<{
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
    }>(
      `select id, slug, quote, body, display_name, role_label, photo_url,
              joined_label, related_event_id, instagram_url, is_demo
       from stories
       where status = 'published' and deleted_at is null and consent = true and is_demo = false
       order by sort_order asc`,
    );
    return rows.map(mapStory);
  },
);

export const getStoryBySlug = createServerFn({ method: "GET" })
  .validator(z.object({ slug: z.string() }))
  .handler(async ({ data }) => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const rows = await sql.query<{
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
    }>(
      `select id, slug, quote, body, display_name, role_label, photo_url,
              joined_label, related_event_id, instagram_url, is_demo
       from stories
       where slug = $1 and status = 'published' and deleted_at is null and consent = true and is_demo = false
       limit 1`,
      [data.slug],
    );
    return rows[0] ? mapStory(rows[0]) : null;
  });

export const getPublishedFaq = createServerFn({ method: "GET" }).handler(
  async () => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const rows = await sql.query<{
      id: string;
      question: string;
      answer: string;
      icon: string | null;
      sort_order: number;
    }>(
      `select id, question, answer, icon, sort_order
       from faq where published = true order by sort_order asc`,
    );
    return rows.map(mapFaq);
  },
);

export const getFeaturedInstagram = createServerFn({ method: "GET" }).handler(
  async () => {
    try {
      const { getSql } = await import("@/lib/db");
      const sql = await getSql();
      const rows = await sql.query<{
        id: string;
        post_url: string;
        thumbnail_url: string | null;
        caption: string | null;
        post_type: string;
        published_on: string | null;
        featured: boolean;
      }>(
        `select id, post_url, thumbnail_url, caption, post_type,
                published_on::text as published_on, featured
         from instagram_posts
         where featured = true
           and post_url like 'https://www.instagram.com/p/%'
         order by sort_order asc
         limit 8`,
      );
      return { ok: true as const, posts: rows.map(mapIg) };
    } catch {
      return { ok: false as const, posts: [] };
    }
  },
);

export const getPublicLayout = createServerFn({ method: "GET" }).handler(async () => {
  const { readPublicSite } = await import("./pages");
  const site = await readPublicSite();
  return site.chrome;
});

export const getPublishedPage = createServerFn({ method: "GET" })
  .validator(z.object({ pageKey: z.enum(["home", "events", "eventDetail", "firstTime", "about", "stories", "gallery", "join", "header", "footer"]) }))
  .handler(async ({ data }) => {
    const { readPublicSite } = await import("./pages");
    const site = await readPublicSite();
    return { page: site.pages[data.pageKey], chrome: site.chrome };
  });

export const getSiteMeta = createServerFn({ method: "GET" }).handler(async () => {
  const { getSql } = await import("@/lib/db");
  const sql = await getSql();
  const rows = await sql.query<{ key: string; value: unknown }>(
    `select key, value from site_settings where key in ('club', 'announcement')`,
  );
  const bag = Object.fromEntries(rows.map((r) => [r.key, r.value]));
  const clubRaw = (bag.club ?? {}) as Partial<SiteClubSettings>;
  const annRaw = (bag.announcement ?? {}) as Partial<Announcement>;
  const club: SiteClubSettings = {
    name: clubRaw.name ?? "淡江大學禪學社",
    nameEn: clubRaw.nameEn ?? "TKU Zen Club",
    instagram: clubRaw.instagram ?? "https://www.instagram.com/tku_zc",
    campus: clubRaw.campus ?? "淡江大學（淡水校園）",
    note: clubRaw.note ?? "",
  };
  const announcement: Announcement = {
    title: annRaw.title ?? "",
    body: annRaw.body ?? "",
    href: annRaw.href ?? "",
    visible: Boolean(annRaw.visible),
  };
  return { club, announcement };
});

export const getHomeData = createServerFn({ method: "GET" }).handler(async () => {
  const [events, stories, faq, ig, meta, site] = await Promise.all([
    getPublishedEvents(),
    getPublishedStories(),
    getPublishedFaq(),
    getFeaturedInstagram(),
    getSiteMeta(),
    import("./pages").then((mod) => mod.readPublicSite()),
  ]);
  const now = Date.now();
  const upcoming = events.filter((e) => Date.parse(e.endsAt) >= now).slice(0, 6);
  const past = events.filter((e) => Date.parse(e.endsAt) < now).slice(-6).reverse();
  return { events, upcoming, past, stories, faq, ig, meta, page: site.pages.home, chrome: site.chrome };
});

export const getGalleryData = createServerFn({ method: "GET" }).handler(
  async () => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const assets = await sql.query<{
      id: string;
      title: string | null;
      url: string;
      preview_url: string | null;
      asset_type: string;
      canva_url: string | null;
      drive_url: string | null;
      event_id: string | null;
      tags: string | null;
    }>(
      `select id, title, url, preview_url, asset_type, null::text as canva_url, null::text as drive_url, event_id, tags
       from assets where published_at is not null order by created_at desc`,
    );
    const eventAssets = await sql.query<{
      id: string;
      event_id: string;
      kind: string;
      url: string;
      preview_url: string | null;
      caption: string | null;
      sort_order: number;
      event_title: string;
      event_slug: string;
    }>(
      `select a.id, a.event_id, a.kind, a.url, a.preview_url, a.caption, a.sort_order,
              e.title as event_title, e.slug as event_slug
       from event_assets a
       join events e on e.id = a.event_id
       where e.status = 'published' and e.deleted_at is null and e.is_demo = false
       order by e.starts_at desc, a.sort_order asc`,
    );
    const events = await getPublishedEvents();
    return {
      assets: assets.map(mapAsset),
      eventAssets,
      pastEvents: events.filter((e) => e.computedStatus === "ended"),
    };
  },
);

export const getMediaCatalog = createServerFn({ method: "GET" }).handler(async () => {
  const { getSql } = await import("@/lib/db");
  const sql = await getSql();
  const assets = await sql.query<{
    id: string;
    title: string | null;
    url: string;
    preview_url: string | null;
    asset_type: string;
  }>(
    `select id, title, url, preview_url, asset_type
     from assets where published_at is not null order by created_at desc`,
  );
  const rows: MediaSource[] = assets.map((row) => ({
    id: row.id,
    url: row.url,
    previewUrl: row.preview_url,
    title: row.title,
    assetType: row.asset_type,
  }));
  return catalogMedia(rows);
});

export const loadPublicCatalog = createServerFn({ method: "GET" }).handler(async () => {
  const [events, stories, faq, ig, media] = await Promise.all([
    getPublishedEvents(),
    getPublishedStories(),
    getPublishedFaq(),
    getFeaturedInstagram(),
    getMediaCatalog(),
  ]);
  return publicCatalog({
    events,
    stories,
    faq,
    instagram: ig.posts,
    photos: media.photos,
    posters: media.posters,
  });
});

const trackSchema = z.object({
  eventName: z.string().max(80),
  path: z.string().max(300).optional(),
  referrer: z.string().max(500).optional(),
  utmSource: z.string().max(80).optional(),
  utmMedium: z.string().max(80).optional(),
  utmCampaign: z.string().max(80).optional(),
  landingPage: z.string().max(300).optional(),
  eventId: z.string().max(80).optional(),
});

export const trackAnalytics = createServerFn({ method: "POST" })
  .validator(trackSchema)
  .handler(async ({ data }) => {
    try {
      const { getSql } = await import("@/lib/db");
      const sql = await getSql();
      await sql.query(
        `insert into analytics_events
         (id, event_name, path, referrer, utm_source, utm_medium, utm_campaign, landing_page, event_id)
         values ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        [
          crypto.randomUUID(),
          data.eventName,
          data.path ?? null,
          data.referrer ?? null,
          data.utmSource ?? null,
          data.utmMedium ?? null,
          data.utmCampaign ?? null,
          data.landingPage ?? null,
          data.eventId ?? null,
        ],
      );
    } catch {
      // analytics must never break the page
    }
    return { ok: true };
  });
