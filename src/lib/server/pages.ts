import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";
import { applyPageCommand } from "@/lib/pages/commands";
import { publicChrome } from "@/lib/pages/chrome";
import { mergePageStore, publicPages } from "@/lib/pages/merge";
import { puckToDocument, type PuckData } from "@/lib/pages/puck-data";
import { serializePublic } from "@/lib/pages/public-serialize";
import { PAGE_KEYS, type PageKey, type PageStore } from "@/lib/pages/types";
import { roleAllows } from "@/lib/pages/roles";
import { authorizeStaff } from "./admin";

function parseJson(value: unknown): unknown {
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

export async function loadPageStore(): Promise<PageStore> {
  const { getSql } = await import("@/lib/db");
  const sql = await getSql();
  const saved = await sql.query<{ value: unknown }>(`select value from site_settings where key = 'page_documents' limit 1`);
  if (saved[0]) return mergePageStore(parseJson(saved[0].value));
  const legacy = await sql.query<{ value: unknown }>(`select value from site_settings where key = 'layout' limit 1`);
  return mergePageStore(parseJson(legacy[0]?.value ?? null));
}

async function writePageStore(store: PageStore) {
  const { getSql } = await import("@/lib/db");
  const sql = await getSql();
  await sql.query(
    `insert into site_settings (key, value, updated_at) values ('page_documents', $1::jsonb, now())
     on conflict (key) do update set value = excluded.value, updated_at = now()`,
    [JSON.stringify(store)],
  );
}

function asDocument(raw: unknown, pageKey: PageKey) {
  if (raw && typeof raw === "object" && "content" in raw && !("blocks" in (raw as object))) {
    return puckToDocument(raw as PuckData, pageKey);
  }
  return raw;
}

export async function executePageCommand(userId: string, action: "write" | "publish" | "restore", pageKey: PageKey, document?: unknown) {
  const staff = await authorizeStaff(userId, action);
  if (!roleAllows(staff.role, action)) throw new Error("沒有權限");
  const store = await loadPageStore();
  const result = applyPageCommand(store, staff.role, {
    action,
    pageKey,
    document: document === undefined ? undefined : asDocument(document, pageKey),
    actor: staff.displayName || "管理者",
    now: new Date().toISOString(),
  });
  if (!result.ok) throw new Error(result.error);
  await writePageStore(result.store);
  return { ok: true as const, store: result.store };
}

export const getPageEditorState = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const staff = await authorizeStaff(context.userId, "preview");
    const store = await loadPageStore();
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const events = await sql.query<{ id: string; title: string }>(
      `select id, title from events where deleted_at is null and is_demo = false order by starts_at desc`,
    );
    const stories = await sql.query<{ id: string; quote: string }>(
      `select id, quote from stories where deleted_at is null and is_demo = false order by sort_order asc`,
    );
    return {
      role: staff.role,
      store,
      picks: { events, stories },
    };
  });

const pageKeySchema = z.enum(PAGE_KEYS);

export const savePageDraft = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ pageKey: pageKeySchema, document: z.unknown() }))
  .handler(async ({ context, data }) => executePageCommand(context.userId, "write", data.pageKey, data.document));

export const publishPage = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ pageKey: pageKeySchema, document: z.unknown().optional() }))
  .handler(async ({ context, data }) => executePageCommand(context.userId, "publish", data.pageKey, data.document));

export const restorePage = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ pageKey: pageKeySchema }))
  .handler(async ({ context, data }) => executePageCommand(context.userId, "restore", data.pageKey));

export async function readPublicSite() {
  try {
    const store = await loadPageStore();
    return serializePublic({
      pages: publicPages(store),
      chrome: publicChrome(store),
    }) as {
      pages: ReturnType<typeof publicPages>;
      chrome: ReturnType<typeof publicChrome>;
    };
  } catch {
    const store = mergePageStore(null);
    return { pages: publicPages(store), chrome: publicChrome(store) };
  }
}
