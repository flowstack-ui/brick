import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const cases = {
  "reorderable-mobile-webkit": ["mobile-webkit", "reorderable-list", "mouse drag commits on a valid item and abandons invalid space"],
  "marquee-pause-webkit": ["webkit", "marquee", "public pause freezes every track without changing separation"],
  "marquee-contrast-webkit": ["webkit", "marquee", "Marquee accessibility and forced-colors preserve readable originals"],
  "marquee-contrast-mobile-webkit": ["mobile-webkit", "marquee", "Marquee accessibility and forced-colors preserve readable originals"],
  "popover-mobile-webkit": ["mobile-webkit", "popover", "Popover stacks long Footer actions inside an extreme narrow viewport"],
  "radio-group-firefox": ["firefox", "radio-group", "Hook Form connects errors, pointer correction and submit", "documentation.spec.ts"],
};
const [id, mode] = process.argv.slice(2);
if (!cases[id] || (mode && mode !== "--plan")) throw new Error("Select one known release-blocker case, optionally --plan");
const [project, owner, title, file = "behavior.spec.ts"] = cases[id];
const directory = resolve("test-results/release-blockers", id);
mkdirSync(directory, { recursive: true });
const args = ["playwright", "test", `playground/tests/components/${owner}/${file}`, "--project", project,
  "--grep", `${title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "--workers=1", "--retries=0", "--forbid-only",
  "--trace=on", "--timeout=30000", "--global-timeout=180000"];
const env = { ...process.env, CI: "true", FLOWSTACK_DIAGNOSTIC_CAPTURE: "1", FLOWSTACK_TEST_ARTIFACT_DIR: directory };
const inventory = spawnSync("npx", [...args, "--list", "--reporter=json"], { encoding: "utf8", env, timeout: 60000 });
writeFileSync(resolve(directory, "inventory.json"), JSON.stringify({ args, status: inventory.status, stdout: inventory.stdout, stderr: inventory.stderr, error: inventory.error?.message }, null, 2));
if (inventory.status !== 0) throw new Error("Diagnostic discovery failed; inspect inventory.json");
const discovered = JSON.parse(inventory.stdout);
const count = (suites) => suites.reduce((sum, suite) => sum + (suite.specs ?? []).reduce((n, spec) => n + spec.tests.length, 0) + count(suite.suites ?? []), 0);
if (discovered.errors?.length || count(discovered.suites) !== 1) throw new Error("Diagnostic must discover exactly one test without errors");
if (mode === "--plan") { console.log(JSON.stringify({ id, args, plannedTests: 1 })); process.exit(0); }
const archive = resolve(directory, "archive/flowstack-ui-brick-0.3.0.tgz");
const digest = createHash("sha256").update(readFileSync(archive)).digest("hex");
const identity = JSON.parse(readFileSync(resolve(directory, "archive/identity.json"), "utf8"));
const checkoutCommit = spawnSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).stdout.trim();
if (digest !== identity.archiveSha256 || checkoutCommit !== identity.sourceCommit) throw new Error("Diagnostic archive identity does not match this candidate build");
const summary = { id, project, plannedTests: 1, archiveSha256: digest, sourceRun: identity.sourceRun,
  sourceCommit: identity.sourceCommit, checkoutCommit,
  args, retries: 0, startedAt: new Date().toISOString() };
writeFileSync(resolve(directory, "summary.json"), JSON.stringify(summary, null, 2));
const result = spawnSync("npx", args, { env, stdio: "inherit", timeout: 210000 });
let report;
try { report = JSON.parse(readFileSync(resolve(directory, "report.json"), "utf8")); } catch {}
const stats = report?.stats;
const complete = stats && stats.expected + stats.unexpected + stats.skipped + stats.flaky === 1;
const passed = result.status === 0 && complete && stats.expected === 1 && stats.unexpected === 0 && stats.flaky === 0 && stats.skipped === 0;
writeFileSync(resolve(directory, "summary.json"), JSON.stringify({ ...summary, completedAt: new Date().toISOString(), exitCode: result.status, signal: result.signal, error: result.error?.message, stats, complete: Boolean(complete), status: passed ? "passed" : "failed" }, null, 2));
process.exit(passed ? 0 : 1);
