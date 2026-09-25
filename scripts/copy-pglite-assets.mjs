import { copyFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = join(root, "node_modules/@electric-sql/pglite/dist");
const destDir = join(root, ".vercel/output/functions/__server.func/_libs");
const files = ["pglite.data", "pglite.wasm", "initdb.wasm"];

if (!existsSync(destDir)) process.exit(0);
mkdirSync(destDir, { recursive: true });
for (const file of files) {
  const from = join(srcDir, file);
  if (!existsSync(from)) continue;
  copyFileSync(from, join(destDir, file));
}
