import assert from "node:assert/strict";
import { createServer } from "vite";
import { after, before, describe, it } from "node:test";

describe("page command server gate", () => {
  let executePageCommand;
  let getSql;
  let vite;

  before(async () => {
    vite = await createServer({
      server: { middlewareMode: true },
      appType: "custom",
      logLevel: "error",
    });
    const pages = await vite.ssrLoadModule("/src/lib/server/pages.ts");
    const db = await vite.ssrLoadModule("/src/lib/db.ts");
    executePageCommand = pages.executePageCommand;
    getSql = db.getSql;
  });

  after(async () => {
    await vite?.close();
  });

  async function setRole(userId, role, name) {
    const sql = await getSql();
    await sql.query(
      `insert into profiles (user_id, role, display_name) values ($1, $2, $3)
       on conflict (user_id) do update set role = excluded.role, display_name = excluded.display_name`,
      [userId, role, name],
    );
  }

  it("rejects viewer writes and editor publish or restore on the server", async () => {
    await setRole("role-viewer", "viewer", "檢視者");
    await setRole("role-editor", "editor", "編輯");
    const home = { version: 1, blocks: [] };
    await assert.rejects(() => executePageCommand("role-viewer", "write", "home", home), /沒有權限/);
    await assert.rejects(() => executePageCommand("role-viewer", "publish", "home", home), /沒有權限/);
    await assert.rejects(() => executePageCommand("role-viewer", "restore", "home"), /沒有權限/);
    await assert.rejects(() => executePageCommand("role-editor", "publish", "home", home), /沒有權限/);
    await assert.rejects(() => executePageCommand("role-editor", "restore", "home"), /沒有權限/);
    const written = await executePageCommand("role-editor", "write", "join", home);
    assert.equal(written.ok, true);
    assert.equal(written.store.pages.join.draftUpdatedBy, "編輯");
    assert.notEqual(JSON.stringify(written.store.pages.join.published), JSON.stringify(written.store.pages.join.draft));
  });
});
