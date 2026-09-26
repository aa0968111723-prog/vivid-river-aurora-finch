import { mkdirSync, writeFileSync } from "node:fs";
import { chromium } from "playwright";

const base = process.env.PAGE_CHECK_URL || "http://127.0.0.1:8080";
const outDir = process.env.PAGE_CHECK_OUT || "screenshots/page-editor-browser";
mkdirSync(outDir, { recursive: true });

const log = [];
function note(message) {
  log.push(message);
  console.log(message);
}

const DEFAULT_ORDER = [
  "龜龜開場",
  "大幅 Hero",
  "首頁公告",
  "最近活動",
  "心情選擇器",
  "第一次來流程",
  "社團平常做什麼",
  "真實照片牆",
  "Instagram 精選",
  "社員故事",
  "FAQ",
  "加入行動區",
];

async function overflow(page) {
  return page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2);
}

async function readPublicOrder(context) {
  const page = await context.newPage({ viewport: { width: 1280, height: 800 } });
  try {
    await page.goto(base + "/", { waitUntil: "networkidle", timeout: 45000 });
    await page.reload({ waitUntil: "networkidle", timeout: 45000 });
    return await page.locator("[data-section]").evaluateAll((nodes) => nodes.map((node) => node.getAttribute("data-section")));
  } finally {
    await page.close();
  }
}

async function assertRoleGate() {
  const { createServer } = await import("vite");
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "error",
  });
  try {
    const pages = await vite.ssrLoadModule("/src/lib/server/pages.ts");
    const db = await vite.ssrLoadModule("/src/lib/db.ts");
    const sql = await db.getSql();
    await sql.query(
      `insert into profiles (user_id, role, display_name) values ($1, $2, $3)
       on conflict (user_id) do update set role = excluded.role, display_name = excluded.display_name`,
      ["role-viewer", "viewer", "檢視者"],
    );
    await sql.query(
      `insert into profiles (user_id, role, display_name) values ($1, $2, $3)
       on conflict (user_id) do update set role = excluded.role, display_name = excluded.display_name`,
      ["role-editor", "editor", "編輯"],
    );
    const home = { version: 1, blocks: [] };
    for (const [label, run] of [
      ["viewer-write", () => pages.executePageCommand("role-viewer", "write", "home", home)],
      ["editor-publish", () => pages.executePageCommand("role-editor", "publish", "home", home)],
    ]) {
      try {
        await run();
        throw new Error(`${label} was allowed`);
      } catch (error) {
        if (!String(error?.message || error).includes("沒有權限")) throw error;
        note(`${label} rejected`);
      }
    }
    const written = await pages.executePageCommand("role-editor", "write", "join", home);
    if (!written?.ok) throw new Error("editor write did not succeed");
    if (JSON.stringify(written.store.pages.join.published) === JSON.stringify(written.store.pages.join.draft)) {
      throw new Error("editor write changed the published page");
    }
    note("editor-write kept published separate");
  } finally {
    await vite.close();
  }
}

async function checkHome(page, label) {
  await page.goto(base + "/", { waitUntil: "networkidle", timeout: 45000 });
  const text = await page.locator("body").innerText();
  const hero = text.includes("看看最近活動");
  const title = text.includes("留一點時間");
  const mode = await page.locator("#zen-intro").getAttribute("data-turtle-mode").catch(() => null);
  const wide = await overflow(page);
  note(`${label} hero=${hero} title=${title} turtle=${mode} overflow=${wide}`);
  if (!hero || !title) throw new Error(`${label} missing hero content`);
  if (wide) throw new Error(`${label} horizontal overflow`);
  if (text.includes("只有草稿") || text.includes("secret draft")) throw new Error(`${label} leaked a draft`);
  return { hero, title, mode, wide };
}

const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
try {
  const desktop = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await checkHome(desktop, "desktop");
  await desktop.screenshot({ path: `${outDir}/home-desktop.png`, fullPage: false });
  await desktop.close();

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const mobileResult = await checkHome(mobile, "mobile-390");
  const cta = mobile.locator("text=看看最近活動").first();
  const visible = await cta.isVisible();
  note(`mobile cta visible=${visible}`);
  if (!visible) throw new Error("mobile CTA not visible");
  const beforeLine = await mobile.locator("#zen-intro p").first().innerText();
  await mobile.getByRole("button", { name: "下一句" }).click();
  await mobile.waitForFunction(
    (previous) => {
      const node = document.querySelector("#zen-intro p");
      return Boolean(node && node.textContent && node.textContent.trim() !== previous);
    },
    beforeLine,
    { timeout: 3000 },
  );
  const afterLine = await mobile.locator("#zen-intro p").first().innerText();
  note(`turtle-line before=${beforeLine} after=${afterLine}`);
  if (beforeLine === afterLine) throw new Error("turtle next-line control did not advance");
  await mobile.getByRole("button", { name: "和龜龜打個招呼" }).click();
  await mobile.waitForFunction(
    () => document.querySelector("#zen-intro")?.getAttribute("data-turtle-phase") === "wake",
    null,
    { timeout: 3000 },
  );
  const phase = await mobile.locator("#zen-intro").getAttribute("data-turtle-phase");
  note(`turtle-interact phase=${phase}`);
  await mobile.screenshot({ path: `${outDir}/home-390.png`, fullPage: false });
  await mobile.close();

  const reduced = await browser.newPage({
    viewport: { width: 1280, height: 800 },
    reducedMotion: "reduce",
  });
  await reduced.goto(base + "/", { waitUntil: "networkidle", timeout: 45000 });
  await reduced.waitForTimeout(600);
  const reducedMode = await reduced.locator("#zen-intro").getAttribute("data-turtle-mode");
  const reducedText = await reduced.locator("body").innerText();
  const canvasCount = await reduced.locator("canvas").count();
  note(`reduced turtle=${reducedMode} hero=${reducedText.includes("看看最近活動")} canvas=${canvasCount}`);
  if (canvasCount !== 0) throw new Error("reduced motion still mounted a canvas");
  if (reducedMode !== "static") throw new Error(`reduced motion was ${reducedMode}`);
  if (!reducedText.includes("看看最近活動")) throw new Error("reduced motion hid the hero");
  await reduced.screenshot({ path: `${outDir}/home-reduced.png` });
  await reduced.close();

  const noGl = await chromium.launch({ headless: true, args: ["--no-sandbox", "--disable-webgl", "--disable-webgl2"] });
  const glPage = await noGl.newPage({ viewport: { width: 1280, height: 800 } });
  await glPage.goto(base + "/", { waitUntil: "networkidle", timeout: 45000 });
  await glPage.waitForTimeout(600);
  const glMode = await glPage.locator("#zen-intro").getAttribute("data-turtle-mode");
  const glText = await glPage.locator("body").innerText();
  note(`webgl-off turtle=${glMode} hero=${glText.includes("看看最近活動")}`);
  if (glMode !== "static") throw new Error(`webgl off was ${glMode}`);
  await glPage.screenshot({ path: `${outDir}/home-webgl-off.png` });
  await glPage.close();
  await noGl.close();

  const admin = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  admin.on("dialog", (dialog) => dialog.accept());
  admin.on("pageerror", (error) => note(`admin-pageerror=${error.message}`));
  await admin.goto(base + "/admin/layout", { waitUntil: "domcontentloaded", timeout: 45000 });
  await admin.getByRole("button", { name: "儲存草稿" }).waitFor({ timeout: 30000 });
  const adminText = await admin.locator("body").innerText();
  note(`admin snippet=${adminText.slice(0, 240).replaceAll("\n", " | ")}`);
  const hasEditor = adminText.includes("儲存草稿") && adminText.includes("頁面");
  if (!hasEditor) throw new Error("editor did not render");
  await admin.screenshot({ path: `${outDir}/editor.png` });

  const baseline = await readPublicOrder(browser);
  note(`public-before=${baseline.join(" > ")}`);
  if (baseline.join("|") !== DEFAULT_ORDER.join("|")) throw new Error(`public homepage is not the default order: ${baseline.join(" > ")}`);

  const preview = admin.frames().find((item) => item !== admin.mainFrame());
  if (!preview) throw new Error("editor preview frame missing");
  await preview.locator("[data-section]").first().waitFor({ timeout: 20000 });
  const orderOf = () => preview.locator("[data-section]").evaluateAll((nodes) => nodes.map((node) => node.getAttribute("data-section")));
  const before = await orderOf();
  note(`draft-before=${before.join(" > ")}`);
  const handles = preview.locator("[data-puck-dnd]");
  await handles.nth(1).scrollIntoViewIfNeeded();
  await handles.nth(0).scrollIntoViewIfNeeded();
  const from = await handles.nth(1).boundingBox();
  const to = await handles.nth(0).boundingBox();
  if (!from || !to) throw new Error("drag handles have no box");
  await admin.mouse.move(from.x + 24, from.y + 12);
  await admin.mouse.down();
  await admin.mouse.move(to.x + 24, Math.max(8, to.y + 6), { steps: 30 });
  await admin.mouse.up();
  await admin.waitForTimeout(700);
  const after = await orderOf();
  note(`draft-after=${after.join(" > ")}`);
  if (before.join("|") === after.join("|")) throw new Error("drag did not change draft order");

  await admin.getByRole("button", { name: "儲存草稿" }).click();
  await admin.getByText("草稿已儲存").waitFor({ timeout: 15000 });
  const afterDraft = await readPublicOrder(browser);
  note(`public-after-draft=${afterDraft.join(" > ")}`);
  if (afterDraft.join("|") !== baseline.join("|")) throw new Error("draft save changed the public homepage");

  await admin.getByRole("button", { name: "發布" }).click();
  await admin.getByText("已發布").waitFor({ timeout: 15000 });
  const published = await readPublicOrder(browser);
  note(`public-after-publish=${published.join(" > ")}`);
  if (published.join("|") !== after.join("|")) throw new Error("publish reload did not keep the new order");
  if (published.join("|") === baseline.join("|")) throw new Error("publish left the default order in place");

  await admin.getByRole("button", { name: "還原預設" }).click();
  await admin.getByText("已還原").waitFor({ timeout: 15000 });
  const restored = await readPublicOrder(browser);
  note(`public-after-restore=${restored.join(" > ")}`);
  if (restored.join("|") !== DEFAULT_ORDER.join("|")) throw new Error("restore did not return the default order");

  const phone = admin.getByRole("button", { name: /手機/ });
  if (await phone.count()) {
    await phone.first().click();
    await admin.waitForTimeout(400);
    await admin.screenshot({ path: `${outDir}/editor-390-preview.png` });
    note("clicked phone viewport");
  }
  await admin.close();
  await assertRoleGate();
  note(`mobileResult=${JSON.stringify(mobileResult)}`);
  note("PASS");
} catch (error) {
  note(`FAIL ${error?.stack || error}`);
  process.exitCode = 1;
} finally {
  writeFileSync(`${outDir}/console.txt`, log.join("\n"), "utf8");
  await browser.close();
}
