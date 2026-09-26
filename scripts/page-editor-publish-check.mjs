import { chromium } from "playwright";

const base = process.env.PAGE_CHECK_URL || "http://127.0.0.1:8080";
const marker = "瀏覽器草稿標題";

const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on("dialog", (dialog) => dialog.accept());
const notes = [];
const note = (message) => {
  notes.push(message);
  console.log(message);
};

try {
  await page.goto(base + "/admin/layout", { waitUntil: "networkidle", timeout: 45000 });
  const frame = page.frameLocator("iframe").first();
  const hero = frame.locator("[data-section='大幅 Hero']");
  await hero.waitFor({ timeout: 20000 });
  const preview = page.frames().find((item) => item !== page.mainFrame());
  const orderOf = () => preview.locator("[data-section]").evaluateAll((nodes) => nodes.map((node) => node.getAttribute("data-section")));
  const before = await orderOf();
  note(`before=${before.join(" > ")}`);
  const handles = preview.locator("[data-puck-dnd]");
  await handles.nth(1).scrollIntoViewIfNeeded();
  await handles.nth(0).scrollIntoViewIfNeeded();
  const from = await handles.nth(1).boundingBox();
  const to = await handles.nth(0).boundingBox();
  if (!from || !to) throw new Error("drag handles have no box");
  await page.mouse.move(from.x + 24, from.y + 12);
  await page.mouse.down();
  await page.mouse.move(to.x + 24, Math.max(8, to.y + 6), { steps: 30 });
  await page.mouse.up();
  await page.waitForTimeout(700);
  const after = await orderOf();
  note(`after=${after.join(" > ")}`);
  if (before.join("|") === after.join("|")) throw new Error("drag did not change draft order");

  await hero.click({ force: true });
  const titles = page.locator("#home-hero_text_title");
  await titles.first().waitFor({ state: "attached", timeout: 8000 });
  const count = await titles.count();
  for (let index = 0; index < count; index += 1) {
    await titles.nth(index).fill(marker, { force: true });
  }
  await page.getByRole("button", { name: "儲存草稿" }).click();
  await page.getByText("草稿已儲存").waitFor({ timeout: 15000 });
  const draftPage = await browser.newPage();
  await draftPage.goto(base + "/", { waitUntil: "networkidle" });
  const draftBody = await draftPage.locator("body").innerText();
  note(`public-has-draft=${draftBody.includes(marker)}`);
  if (draftBody.includes(marker)) throw new Error("draft leaked to the public homepage");
  await draftPage.close();

  await page.getByRole("button", { name: "發布" }).click();
  await page.getByText("已發布").waitFor({ timeout: 15000 });
  const live = await browser.newPage();
  await live.goto(base + "/", { waitUntil: "networkidle" });
  const liveBody = await live.locator("body").innerText();
  note(`public-has-published=${liveBody.includes(marker)}`);
  if (!liveBody.includes(marker)) throw new Error("publish did not reach the public homepage");
  await live.reload({ waitUntil: "networkidle" });
  const reloaded = await live.locator("body").innerText();
  if (!reloaded.includes(marker)) throw new Error("published title disappeared after reload");
  await live.close();

  await page.getByRole("button", { name: "還原預設" }).click();
  await page.getByText("已還原").waitFor({ timeout: 15000 });
  const restored = await browser.newPage();
  await restored.goto(base + "/", { waitUntil: "networkidle" });
  const restoredBody = await restored.locator("body").innerText();
  note(`restored-cleared=${!restoredBody.includes(marker)} cta=${restoredBody.includes("看看最近活動")}`);
  if (restoredBody.includes(marker)) throw new Error("restore left the published test title");
  if (!restoredBody.includes("看看最近活動")) throw new Error("restore dropped the default CTA");
  await restored.close();
  note("PUBLISH_PASS");
} catch (error) {
  note(`PUBLISH_FAIL ${error?.message || error}`);
  process.exitCode = 1;
} finally {
  console.log(notes.join("\n"));
  await browser.close();
}
