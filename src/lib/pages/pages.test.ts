import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { applyPageCommand } from "./commands.ts";
import { publicCatalog, type PublicLists } from "./catalog.ts";
import { chromeBlocks } from "./chrome.ts";
import { DEFAULT_HOME_SECTION_ORDER, defaultDocument, defaultPageStore } from "./defaults.ts";
import { mergePageStore, publishedDocument } from "./merge.ts";
import { serializePublic } from "./public-serialize.ts";
import { anchorMode } from "./links.ts";
import { resolvePage } from "./resolve.ts";
import { catalogMedia, photoWallMedia, REAL_PHOTOS, REAL_POSTERS } from "../real-media.ts";
import { PAGE_KEYS } from "./types.ts";
import { findMarkup } from "./sanitize.ts";
import { roleAllows } from "./roles.ts";

function lists(partial: Partial<PublicLists> = {}) {
  return publicCatalog({
    events: partial.events ?? [],
    stories: partial.stories ?? [],
    faq: partial.faq ?? [],
    instagram: partial.instagram ?? [],
    photos: partial.photos ?? REAL_PHOTOS,
    posters: partial.posters ?? REAL_POSTERS,
  });
}

function routeFiles(dir: string): string[] {
  const found: string[] = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      if (name === "admin") continue;
      found.push(...routeFiles(path));
    } else if (name.endsWith(".tsx")) found.push(path);
  }
  return found;
}

describe("page documents", () => {
  it("merges an old layout onto new fields and keeps the title", () => {
    const merged = mergePageStore({
      version: 1,
      pages: {
        home: {
          published: {
            version: 1,
            blocks: [{ id: "keep", type: "hero", props: { title: "舊標題" } }],
          },
          draft: {
            version: 1,
            blocks: [{ id: "keep", type: "hero", props: { title: "舊標題" } }],
          },
        },
      },
    });
    const hero = merged.pages.home.published.blocks[0];
    assert.equal(hero.props.title, "舊標題");
    assert.equal(hero.props.showMobile, true);
    assert.equal(typeof hero.props.backgroundMask, "number");
    assert.equal(hero.props.paddingY === "none" || hero.props.paddingY === "md" || hero.props.paddingY === "lg", true);
    assert.ok(hero.props.dwellMs.length === 6);
  });

  it("resolves event references after the catalog changes without editing the document", () => {
    const document = {
      version: 1 as const,
      blocks: [
        {
          id: "list",
          type: "eventList" as const,
          props: {
            ...mergePageStore(null).pages.home.published.blocks[0].props,
            source: "manual" as const,
            ids: ["e1"],
            title: "最近活動",
          },
        },
      ],
    };
    const before = JSON.stringify(document);
    const first = resolvePage(document, lists({ events: [{ id: "e1", title: "舊的活動", body: "舊內文" }] }));
    const second = resolvePage(document, lists({ events: [{ id: "e1", title: "新的活動標題", body: "新的內文" }] }));
    assert.equal(JSON.stringify(document), before);
    assert.equal(first[0].items[0].title, "舊的活動");
    assert.equal(second[0].items[0].title, "新的活動標題");
    assert.equal(JSON.stringify(document).includes("新的活動標題"), false);
    assert.equal(document.blocks[0].props.source, "manual");
    assert.deepEqual(document.blocks[0].props.ids, ["e1"]);
  });

  it("drops drafts, drive admin urls, and canva edit urls from the public serializer", () => {
    const raw = {
      draft: { title: "secret draft" },
      published: { title: "live", note: "https://drive.google.com/drive/folders/abc" },
      canvaUrl: "https://www.canva.com/design/DAF/edit",
      driveUrl: "https://drive.google.com/file/d/abc/view",
      assets: [
        { id: "ok", url: "/images/photos/final-gathering.jpg", published: true },
        { id: "no", url: "/secret.jpg", published: false },
      ],
    };
    const out = serializePublic(raw) as {
      draft?: unknown;
      canvaUrl?: unknown;
      driveUrl?: unknown;
      published: { title: string; note: string };
      assets: { id: string }[];
    };
    assert.equal("draft" in out, false);
    assert.equal("canvaUrl" in out, false);
    assert.equal("driveUrl" in out, false);
    assert.equal(out.published.title, "live");
    assert.equal(out.published.note, "");
    assert.deepEqual(out.assets.map((asset) => asset.id), ["ok"]);
    assert.equal(JSON.stringify(out).includes("canva.com"), false);
    assert.equal(JSON.stringify(out).includes("drive.google.com"), false);
    assert.equal(JSON.stringify(out).includes("secret draft"), false);
  });

  it("rejects script, iframe, and event-handler markup", () => {
    assert.equal(findMarkup({ title: "好" }), null);
    assert.equal(findMarkup({ title: "<script>alert(1)</script>" }), "script");
    assert.equal(findMarkup({ body: '<iframe src="https://evil.test"></iframe>' }), "iframe");
    assert.equal(findMarkup({ title: '<img src=x onerror=alert(1)>' }), "handler");
    const store = defaultPageStore();
    const denied = applyPageCommand(store, "admin", {
      action: "write",
      pageKey: "home",
      actor: "管理者",
      now: "2026-09-26T00:00:00.000Z",
      document: { version: 1, blocks: [{ id: "x", type: "heading", props: { title: "<script>bad</script>" } }] },
    });
    assert.equal(denied.ok, false);
  });

  it("enforces viewer, editor, and admin page actions", () => {
    assert.equal(roleAllows("viewer", "write"), false);
    assert.equal(roleAllows("viewer", "publish"), false);
    assert.equal(roleAllows("viewer", "preview"), true);
    assert.equal(roleAllows("editor", "write"), true);
    assert.equal(roleAllows("editor", "publish"), false);
    assert.equal(roleAllows("editor", "restore"), false);
    assert.equal(roleAllows("admin", "publish"), true);
    assert.equal(roleAllows("admin", "restore"), true);
    assert.equal(roleAllows("admin", "settings"), true);

    const store = defaultPageStore();
    const original = JSON.stringify(store.pages.home.published);
    const viewer = applyPageCommand(store, "viewer", {
      action: "write",
      pageKey: "home",
      actor: "viewer",
      now: "2026-09-26T00:00:00.000Z",
      document: store.pages.home.draft,
    });
    assert.equal(viewer.ok, false);
    const editorPublish = applyPageCommand(store, "editor", {
      action: "publish",
      pageKey: "home",
      actor: "editor",
      now: "2026-09-26T00:00:00.000Z",
    });
    assert.equal(editorPublish.ok, false);
    const editorRestore = applyPageCommand(store, "editor", {
      action: "restore",
      pageKey: "home",
      actor: "editor",
      now: "2026-09-26T00:00:00.000Z",
    });
    assert.equal(editorRestore.ok, false);
    const draft = structuredClone(store.pages.home.draft);
    draft.blocks[1].props.title = "草稿標題";
    const editorWrite = applyPageCommand(store, "editor", {
      action: "write",
      pageKey: "home",
      actor: "編輯",
      now: "2026-09-26T01:00:00.000Z",
      document: draft,
    });
    assert.equal(editorWrite.ok, true);
    if (editorWrite.ok) {
      assert.equal(editorWrite.store.pages.home.draft.blocks[1].props.title, "草稿標題");
      assert.equal(JSON.stringify(editorWrite.store.pages.home.published), original);
      assert.equal(editorWrite.store.pages.home.draftUpdatedBy, "編輯");
    }
    const admin = applyPageCommand(store, "admin", {
      action: "publish",
      pageKey: "home",
      actor: "管理員",
      now: "2026-09-26T02:00:00.000Z",
      document: draft,
    });
    assert.equal(admin.ok, true);
    if (admin.ok) {
      assert.equal(admin.store.pages.home.published.blocks[1].props.title, "草稿標題");
      assert.equal(admin.store.pages.home.publishedBy, "管理員");
      assert.equal(admin.store.pages.home.publishedAt, "2026-09-26T02:00:00.000Z");
    }
    const restored = applyPageCommand(admin.ok ? admin.store : store, "admin", {
      action: "restore",
      pageKey: "home",
      actor: "管理員",
      now: "2026-09-26T03:00:00.000Z",
    });
    assert.equal(restored.ok, true);
    if (restored.ok) {
      assert.deepEqual(
        restored.store.pages.home.published.blocks.map((block) => block.props.sectionName),
        [...DEFAULT_HOME_SECTION_ORDER],
      );
      assert.equal(restored.store.pages.home.publishedBy, "管理員");
    }
  });

  it("ships the default homepage order and hero call to action without a 3D module", () => {
    const store = defaultPageStore();
    const home = publishedDocument(store, "home");
    assert.deepEqual(
      home.blocks.map((block) => block.props.sectionName),
      [...DEFAULT_HOME_SECTION_ORDER],
    );
    const resolved = resolvePage(
      home,
      lists({
        events: [{ id: "march", title: "教授沒教的大腦休息法", computedStatus: "ended" }],
        instagram: [{ id: "ig", title: "IG", featured: true, postUrl: "https://www.instagram.com/p/DVGrfkAk02g/" }],
      }),
    );
    assert.deepEqual(
      resolved.map((block) => block.props.sectionName),
      [...DEFAULT_HOME_SECTION_ORDER],
    );
    const hero = resolved.find((block) => block.type === "hero");
    assert.equal(hero?.props.buttons[0]?.label, "看看最近活動");
    const draftOnly = structuredClone(store);
    draftOnly.pages.home.draft.blocks.push({
      id: "draft-only",
      type: "heading",
      props: { ...home.blocks[0].props, sectionName: "只有草稿", title: "不該公開" },
    });
    const published = publishedDocument(draftOnly, "home");
    assert.equal(
      published.blocks.some((block) => block.props.sectionName === "只有草稿"),
      false,
    );
    const publicResolved = resolvePage(published, lists());
    assert.equal(
      publicResolved.some((block) => block.props.sectionName === "只有草稿"),
      false,
    );
  });

  it("does not let a public route zero a content list", () => {
    const root = join(dirname(fileURLToPath(import.meta.url)), "../../routes");
    const pattern = /(events|stories|faq|instagram|photos|posters):\s*\[\s*\]/;
    const files = routeFiles(root);
    assert.ok(files.some((file) => file.endsWith("stories.index.tsx")));
    for (const file of files) {
      assert.doesNotMatch(readFileSync(file, "utf8"), pattern, file);
    }
  });

  it("keeps a designed document for every editable page", () => {
    for (const key of PAGE_KEYS) {
      assert.ok(defaultDocument(key).blocks.length > 0, key);
    }
  });

  it("orders a manual photo wall by the shipped photo ids", () => {
    const home = defaultDocument("home");
    const wall = home.blocks.find((block) => block.type === "photoWall");
    assert.ok(wall);
    const catalog = catalogMedia([{ id: "as_hero", url: "/images/hero-garden.jpg", title: "主視覺", assetType: "photo" }]);
    assert.ok(catalog.photos.some((item) => item.id === REAL_PHOTOS[0].id && item.src === REAL_PHOTOS[0].src));
    assert.equal(catalog.photos.find((item) => item.id === "as_hero")?.src, "/images/hero-garden.jpg");
    wall.props.source = "manual";
    wall.props.ids = [REAL_PHOTOS[1].id, "as_hero"];
    const resolved = resolvePage(home, lists({ photos: catalog.photos, posters: catalog.posters }));
    const photos = resolved.find((block) => block.type === "photoWall");
    assert.deepEqual(
      photos?.items.map((item) => item.id),
      [REAL_PHOTOS[1].id, "as_hero"],
    );
    assert.equal(photos?.items[0]?.src, REAL_PHOTOS[1].src);
    const shown = photoWallMedia(
      (photos?.items ?? []).flatMap((item) =>
        item.id && item.src ? [{ id: item.id, src: item.src, alt: "", caption: "", kind: "photo" as const }] : [],
      ),
      "manual",
    );
    assert.deepEqual(shown.photos.map((item) => item.id), [REAL_PHOTOS[1].id, "as_hero"]);
    assert.deepEqual(shown.posters, []);
    const gallery = defaultDocument("gallery");
    const posters = gallery.blocks.find((block) => block.type === "posterWall");
    assert.ok(posters);
    posters.props.source = "manual";
    posters.props.ids = [REAL_POSTERS[2].id, REAL_POSTERS[0].id];
    const posterPage = resolvePage(gallery, lists({ posters: REAL_POSTERS }));
    assert.deepEqual(
      posterPage.find((block) => block.type === "posterWall")?.items.map((item) => item.src),
      [REAL_POSTERS[2].src, REAL_POSTERS[0].src],
    );
    assert.equal(anchorMode("https://ig.me/m/tku_zc", "self"), "same");
    assert.equal(anchorMode("https://ig.me/m/tku_zc", "blank"), "blank");
    assert.equal(anchorMode("/join", "self"), "route");
  });

  it("drops hidden chrome blocks and keeps the published order", () => {
    const footer = defaultDocument("footer");
    const reversed = {
      ...footer,
      blocks: [...footer.blocks].reverse().map((block, index) =>
        index === 0 ? { ...block, props: { ...block.props, hidden: true } } : block,
      ),
    };
    assert.deepEqual(
      chromeBlocks(reversed).map((block) => block.props.sectionName),
      ["頁尾說明"],
    );
    const join = resolvePage(defaultDocument("home"), lists()).find((block) => block.type === "joinCta");
    assert.equal(join?.props.buttons[0]?.label, "私訊「想參加」");
    assert.equal(join?.props.buttons[0]?.href, "https://ig.me/m/tku_zc");
    assert.equal(join?.props.buttons[1]?.label, "加入方式");
    assert.equal(join?.props.buttons[1]?.href, "/join");
    const about = defaultDocument("about");
    const removed = { ...about, blocks: about.blocks.slice(1) };
    const draft = applyPageCommand(defaultPageStore(), "editor", {
      action: "write",
      pageKey: "about",
      document: removed,
      actor: "編輯",
      now: "2026-09-26T04:00:00.000Z",
    });
    assert.equal(draft.ok, true);
    if (draft.ok) {
      assert.equal(draft.store.pages.about.draft.blocks.length, about.blocks.length - 1);
      assert.equal(draft.store.pages.about.published.blocks.length, about.blocks.length);
    }
  });
});
