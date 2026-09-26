import { readdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join } from "node:path";

const scripts = readdirSync("scripts")
  .filter((name) => name.endsWith(".test.mjs"))
  .sort()
  .map((name) => join("scripts", name));

const sources = [
  "src/lib/app-data/app-data.test.ts",
  "src/lib/app-data/readiness-schedule.test.ts",
  "src/lib/auth/gate-identity.test.ts",
  "src/lib/auth/sign-in-gate.test.ts",
  "src/lib/pages/pages.test.ts",
  "src/lib/turtle/state-machine.test.ts",
];

if (scripts.length === 0) {
  console.error("no scripts/**/*.test.mjs files found");
  process.exit(1);
}

function run(args) {
  const result = spawnSync(process.execPath, args, { stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

run(["--test", ...scripts]);
run(["--experimental-strip-types", "--test", ...sources]);
