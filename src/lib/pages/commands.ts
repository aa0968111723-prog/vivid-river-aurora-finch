import { defaultDocument } from "./defaults.ts";
import { mergePageDocument, mergePageStore } from "./merge.ts";
import { roleAllows, type PageAction } from "./roles.ts";
import { findMarkup } from "./sanitize.ts";
import { PAGE_KEYS, type PageKey, type PageStore } from "./types.ts";

export type PageCommand = {
  action: "write" | "publish" | "restore";
  pageKey: PageKey;
  document?: unknown;
  actor: string;
  now: string;
};

export type CommandResult = { ok: true; store: PageStore } | { ok: false; error: string };

function clone(store: PageStore): PageStore {
  return structuredClone(store);
}

export function applyPageCommand(store: PageStore, role: string, command: PageCommand): CommandResult {
  const action: PageAction = command.action === "write" ? "write" : command.action;
  if (!roleAllows(role, action)) return { ok: false, error: "沒有權限" };
  if (!PAGE_KEYS.includes(command.pageKey)) return { ok: false, error: "沒有這個頁面" };
  const next = clone(store);
  const record = next.pages[command.pageKey];
  const actor = command.actor.slice(0, 80) || "管理者";
  if (command.action === "restore") {
    const document = defaultDocument(command.pageKey);
    record.draft = document;
    record.published = structuredClone(document);
    record.draftUpdatedAt = command.now;
    record.draftUpdatedBy = actor;
    record.publishedAt = command.now;
    record.publishedBy = actor;
    return { ok: true, store: next };
  }
  if (command.action === "write") {
    if (findMarkup(command.document)) return { ok: false, error: "頁面資料含有不允許的內容" };
    record.draft = mergePageDocument(command.document, command.pageKey);
    record.draftUpdatedAt = command.now;
    record.draftUpdatedBy = actor;
    return { ok: true, store: next };
  }
  const source = command.document === undefined ? record.draft : command.document;
  if (findMarkup(source)) return { ok: false, error: "頁面資料含有不允許的內容" };
  const document = mergePageDocument(source, command.pageKey);
  record.draft = document;
  record.published = structuredClone(document);
  record.draftUpdatedAt = command.now;
  record.draftUpdatedBy = actor;
  record.publishedAt = command.now;
  record.publishedBy = actor;
  return { ok: true, store: next };
}

export function storeFromUnknown(raw: unknown): PageStore {
  return mergePageStore(raw);
}
