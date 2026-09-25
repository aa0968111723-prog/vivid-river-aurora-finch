import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";
import type { StaffRole } from "@/lib/types";
import { mapEvent, mapFaq, mapIg, mapStory, type EventRow } from "./map";

const EVENT_SELECT = `
  e.id, e.slug, e.title, e.subtitle, e.cover_image, e.category_id,
  c.name_zh as category_name,
  e.starts_at::text as starts_at, e.ends_at::text as ends_at, e.timezone,
  e.location_name, e.location_detail, e.map_url, e.summary, e.body, e.audience,
  e.registration_mode, e.registration_url, e.registration_note,
  e.capacity, e.registered_count, e.status_override, e.ig_url, e.canva_url,
  e.faq, e.published_at::text as published_at, e.status, e.is_demo, e.featured
`;

const ROLE_RANK: Record<StaffRole, number> = {
  viewer: 1,
  editor: 2,
  admin: 3,
};

class ForbiddenError extends Error {
  constructor() {
    super("沒有權限");
    this.name = "ForbiddenError";
  }
}

async function requireStaff(userId: string, min: StaffRole = "viewer") {
  const { getSql } = await import("@/lib/db");
  const sql = await getSql();
  const countRows = await sql.query<{ n: number }>(
    `select count(*)::int as n from profiles`,
  );
  if ((countRows[0]?.n ?? 0) === 0) {
    await sql.query(
      `insert into profiles (user_id, role, display_name) values ($1, 'admin', '第一位管理者')`,
      [userId],
    );
    return { role: "admin" as StaffRole, userId };
  }
  const rows = await sql.query<{ role: StaffRole; display_name: string | null }>(
    `select role, display_name from profiles where user_id = $1`,
    [userId],
  );
  if (!rows[0]) {
    await sql.query(
      `insert into profiles (user_id, role) values ($1, 'viewer')`,
      [userId],
    );
    if (min !== "viewer") throw new ForbiddenError();
    return { role: "viewer" as StaffRole, userId };
  }
  if (ROLE_RANK[rows[0].role] < ROLE_RANK[min]) throw new ForbiddenError();
  return { role: rows[0].role, userId, displayName: rows[0].display_name };
}

export const getAdminContext = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const staff = await requireStaff(context.userId, "viewer");
    return staff;
  });

export const getAdminDashboard = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireStaff(context.userId, "viewer");
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const events = await sql.query<EventRow>(
      `select ${EVENT_SELECT}
       from events e
       join event_categories c on c.id = e.category_id
       where e.deleted_at is null
       order by e.starts_at desc`,
    );
    const mapped = events.map(mapEvent);
    const now = Date.now();
    const live = mapped.filter(
      (e) =>
        e.status === "published" &&
        Date.parse(e.startsAt) <= now &&
        Date.parse(e.endsAt) >= now,
    );
    const upcoming = mapped.filter(
      (e) => e.status === "published" && Date.parse(e.startsAt) > now,
    );
    const needsUpdate = mapped.filter(
      (e) =>
        e.status === "draft" ||
        (!e.coverImage && e.status === "published") ||
        (e.registrationMode !== "closed" && !e.registrationUrl),
    );
    const ig = await sql.query<{ n: number }>(
      `select count(*)::int as n from instagram_posts`,
    );
    return {
      live,
      upcoming: upcoming.slice(0, 6),
      needsUpdate: needsUpdate.slice(0, 8),
      igCount: ig[0]?.n ?? 0,
      totalEvents: mapped.length,
    };
  });

export const listAdminEvents = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireStaff(context.userId, "viewer");
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const rows = await sql.query<EventRow>(
      `select ${EVENT_SELECT}
       from events e
       join event_categories c on c.id = e.category_id
       where e.deleted_at is null
       order by e.starts_at desc`,
    );
    return rows.map(mapEvent);
  });

export const getAdminEvent = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator(z.object({ id: z.string() }))
  .handler(async ({ context, data }) => {
    await requireStaff(context.userId, "viewer");
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const rows = await sql.query<EventRow>(
      `select ${EVENT_SELECT}
       from events e
       join event_categories c on c.id = e.category_id
       where e.id = $1 and e.deleted_at is null
       limit 1`,
      [data.id],
    );
    return rows[0] ? mapEvent(rows[0]) : null;
  });

const eventInput = z.object({
  id: z.string().optional(),
  slug: z.string().min(1).max(80),
  title: z.string().min(1).max(80),
  subtitle: z.string().max(80).optional().nullable(),
  coverImage: z.string().max(500).optional().nullable(),
  categoryId: z.string(),
  startsAt: z.string(),
  endsAt: z.string(),
  locationName: z.string().min(1).max(120),
  locationDetail: z.string().max(160).optional().nullable(),
  mapUrl: z.string().max(500).optional().nullable(),
  summary: z.string().max(280),
  body: z.string().max(8000),
  audience: z.string().max(200).optional().nullable(),
  registrationMode: z.enum([
    "google_form",
    "internal",
    "external",
    "instagram_dm",
    "closed",
  ]),
  registrationUrl: z.string().max(500).optional().nullable(),
  registrationNote: z.string().max(400).optional().nullable(),
  capacity: z.number().int().positive().optional().nullable(),
  registeredCount: z.number().int().min(0).optional().nullable(),
  statusOverride: z
    .enum(["upcoming", "open", "filling", "full", "ended"])
    .optional()
    .nullable(),
  igUrl: z.string().max(500).optional().nullable(),
  canvaUrl: z.string().max(500).optional().nullable(),
  status: z.enum(["draft", "published", "archived"]),
  featured: z.boolean(),
});

export const saveEvent = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(eventInput)
  .handler(async ({ context, data }) => {
    await requireStaff(context.userId, "editor");
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const id = data.id ?? crypto.randomUUID();
    const publishedAt = data.status === "published" ? new Date().toISOString() : null;
    await sql.query(
      `insert into events (
         id, slug, title, subtitle, cover_image, category_id,
         starts_at, ends_at, location_name, location_detail, map_url,
         summary, body, audience, registration_mode, registration_url,
         registration_note, capacity, registered_count, status_override,
         ig_url, canva_url, status, featured, published_at, updated_at
       ) values (
         $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25, now()
       )
       on conflict (id) do update set
         slug = excluded.slug,
         title = excluded.title,
         subtitle = excluded.subtitle,
         cover_image = excluded.cover_image,
         category_id = excluded.category_id,
         starts_at = excluded.starts_at,
         ends_at = excluded.ends_at,
         location_name = excluded.location_name,
         location_detail = excluded.location_detail,
         map_url = excluded.map_url,
         summary = excluded.summary,
         body = excluded.body,
         audience = excluded.audience,
         registration_mode = excluded.registration_mode,
         registration_url = excluded.registration_url,
         registration_note = excluded.registration_note,
         capacity = excluded.capacity,
         registered_count = excluded.registered_count,
         status_override = excluded.status_override,
         ig_url = excluded.ig_url,
         canva_url = excluded.canva_url,
         status = excluded.status,
         featured = excluded.featured,
         published_at = coalesce(events.published_at, excluded.published_at),
         updated_at = now()`,
      [
        id,
        data.slug,
        data.title,
        data.subtitle ?? null,
        data.coverImage ?? null,
        data.categoryId,
        data.startsAt,
        data.endsAt,
        data.locationName,
        data.locationDetail ?? null,
        data.mapUrl ?? null,
        data.summary,
        data.body,
        data.audience ?? null,
        data.registrationMode,
        data.registrationUrl ?? null,
        data.registrationNote ?? null,
        data.capacity ?? null,
        data.registeredCount ?? null,
        data.statusOverride ?? null,
        data.igUrl ?? null,
        data.canvaUrl ?? null,
        data.status,
        data.featured,
        publishedAt,
      ],
    );
    return { id };
  });

export const archiveEvent = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ id: z.string() }))
  .handler(async ({ context, data }) => {
    await requireStaff(context.userId, "editor");
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    await sql.query(
      `update events set deleted_at = now(), status = 'archived', updated_at = now() where id = $1`,
      [data.id],
    );
    return { ok: true };
  });

export const listAdminStories = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireStaff(context.userId, "viewer");
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
       from stories where deleted_at is null order by sort_order asc`,
    );
    return rows.map(mapStory);
  });

const storyInput = z.object({
  id: z.string().optional(),
  slug: z.string().min(1).max(80),
  quote: z.string().min(1).max(80),
  body: z.string().min(1).max(4000),
  displayName: z.string().min(1).max(40),
  roleLabel: z.string().max(40).optional().nullable(),
  photoUrl: z.string().max(500).optional().nullable(),
  joinedLabel: z.string().max(40).optional().nullable(),
  consent: z.boolean(),
  status: z.enum(["draft", "published", "archived"]),
});

export const saveStory = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(storyInput)
  .handler(async ({ context, data }) => {
    await requireStaff(context.userId, "editor");
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const id = data.id ?? crypto.randomUUID();
    await sql.query(
      `insert into stories (
         id, slug, quote, body, display_name, role_label, photo_url, joined_label,
         consent, status, published_at, updated_at
       ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10, case when $10 = 'published' then now() else null end, now())
       on conflict (id) do update set
         slug = excluded.slug,
         quote = excluded.quote,
         body = excluded.body,
         display_name = excluded.display_name,
         role_label = excluded.role_label,
         photo_url = excluded.photo_url,
         joined_label = excluded.joined_label,
         consent = excluded.consent,
         status = excluded.status,
         updated_at = now()`,
      [
        id,
        data.slug,
        data.quote,
        data.body,
        data.displayName,
        data.roleLabel ?? null,
        data.photoUrl ?? null,
        data.joinedLabel ?? null,
        data.consent,
        data.status,
      ],
    );
    return { id };
  });

export const listAdminFaq = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireStaff(context.userId, "viewer");
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const rows = await sql.query<{
      id: string;
      question: string;
      answer: string;
      icon: string | null;
      sort_order: number;
    }>(`select id, question, answer, icon, sort_order from faq order by sort_order asc`);
    return rows.map(mapFaq);
  });

const faqInput = z.object({
  id: z.string().optional(),
  question: z.string().min(1).max(80),
  answer: z.string().min(1).max(800),
  icon: z.string().max(40).optional().nullable(),
});

export const saveFaq = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(faqInput)
  .handler(async ({ context, data }) => {
    await requireStaff(context.userId, "editor");
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const id = data.id ?? crypto.randomUUID();
    await sql.query(
      `insert into faq (id, question, answer, icon, sort_order, published, updated_at)
       values ($1,$2,$3,$4,(select coalesce(max(sort_order),0)+1 from faq), true, now())
       on conflict (id) do update set
         question = excluded.question,
         answer = excluded.answer,
         icon = excluded.icon,
         updated_at = now()`,
      [id, data.question, data.answer, data.icon ?? null],
    );
    return { id };
  });

export const listAdminIg = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireStaff(context.userId, "viewer");
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
       from instagram_posts order by sort_order asc`,
    );
    return rows.map(mapIg);
  });

const igInput = z.object({
  id: z.string().optional(),
  postUrl: z.string().min(1).max(500),
  thumbnailUrl: z.string().max(500).optional().nullable(),
  caption: z.string().max(400).optional().nullable(),
  postType: z.enum(["image", "reel", "carousel"]),
  featured: z.boolean(),
});

export const saveIgPost = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(igInput)
  .handler(async ({ context, data }) => {
    await requireStaff(context.userId, "editor");
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const id = data.id ?? crypto.randomUUID();
    await sql.query(
      `insert into instagram_posts (id, post_url, thumbnail_url, caption, post_type, featured, sort_order, updated_at)
       values ($1,$2,$3,$4,$5,$6,(select coalesce(max(sort_order),0)+1 from instagram_posts), now())
       on conflict (id) do update set
         post_url = excluded.post_url,
         thumbnail_url = excluded.thumbnail_url,
         caption = excluded.caption,
         post_type = excluded.post_type,
         featured = excluded.featured,
         updated_at = now()`,
      [
        id,
        data.postUrl,
        data.thumbnailUrl ?? null,
        data.caption ?? null,
        data.postType,
        data.featured,
      ],
    );
    return { id };
  });

export const saveSettings = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      name: z.string().min(1).max(40),
      nameEn: z.string().max(60),
      instagram: z.string().max(200),
      campus: z.string().max(80),
      note: z.string().max(200),
      announcementTitle: z.string().max(80),
      announcementBody: z.string().max(240),
      announcementHref: z.string().max(300),
      announcementVisible: z.boolean(),
    }),
  )
  .handler(async ({ context, data }) => {
    await requireStaff(context.userId, "admin");
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    await sql.query(
      `insert into site_settings (key, value, updated_at) values ('club', $1::jsonb, now())
       on conflict (key) do update set value = excluded.value, updated_at = now()`,
      [
        JSON.stringify({
          name: data.name,
          nameEn: data.nameEn,
          instagram: data.instagram,
          campus: data.campus,
          note: data.note,
        }),
      ],
    );
    await sql.query(
      `insert into site_settings (key, value, updated_at) values ('announcement', $1::jsonb, now())
       on conflict (key) do update set value = excluded.value, updated_at = now()`,
      [
        JSON.stringify({
          title: data.announcementTitle,
          body: data.announcementBody,
          href: data.announcementHref,
          visible: data.announcementVisible,
        }),
      ],
    );
    return { ok: true };
  });

export const listAdminAssets = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireStaff(context.userId, "viewer");
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    return sql.query<{
      id: string;
      title: string | null;
      url: string;
      asset_type: string;
      canva_url: string | null;
      drive_url: string | null;
      tags: string | null;
    }>(
      `select id, title, url, asset_type, canva_url, drive_url, tags from assets order by created_at desc`,
    );
  });

const assetInput = z.object({
  id: z.string().optional(),
  title: z.string().max(80).optional().nullable(),
  url: z.string().min(1).max(500),
  assetType: z.enum(["image", "video", "canva", "drive", "poster", "other"]),
  canvaUrl: z.string().max(500).optional().nullable(),
  driveUrl: z.string().max(500).optional().nullable(),
  tags: z.string().max(120).optional().nullable(),
});

export const saveAsset = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(assetInput)
  .handler(async ({ context, data }) => {
    await requireStaff(context.userId, "editor");
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const id = data.id ?? crypto.randomUUID();
    await sql.query(
      `insert into assets (id, title, url, preview_url, asset_type, canva_url, drive_url, tags, updated_at)
       values ($1,$2,$3,$3,$4,$5,$6,$7, now())
       on conflict (id) do update set
         title = excluded.title,
         url = excluded.url,
         preview_url = excluded.preview_url,
         asset_type = excluded.asset_type,
         canva_url = excluded.canva_url,
         drive_url = excluded.drive_url,
         tags = excluded.tags,
         updated_at = now()`,
      [
        id,
        data.title ?? null,
        data.url,
        data.assetType,
        data.canvaUrl ?? null,
        data.driveUrl ?? null,
        data.tags ?? null,
      ],
    );
    return { id };
  });
