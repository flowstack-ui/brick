import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const cases = {
  "mac-editable-route": ["webkit","../integration","catalog route editable renders without uncaught errors","catalog-routes.spec.ts"],
  "mac-collapsible-initial": ["webkit","collapsible","initial partial preview settles without resize errors across responsive widths","parity.spec.ts"],
  "mac-collapsible-route": ["webkit","../integration","catalog route collapsible renders without uncaught errors","catalog-routes.spec.ts"],
  "mac-nav-list-initial": ["webkit","nav-list","retained sections hide after closing and allow unclipped settled focus"],
  "mac-z-stack-focus": ["webkit","z-stack","composition, focus order, reflow, and accessibility remain authored"],
  "mac-z-stack-docs": ["webkit","z-stack","natural sizing, shared hosts and contained actions","docs.spec.ts"],
  "mac-pagination-focus": ["webkit","pagination","Pagination localizes labels and keeps direct controls in Tab order"],
  "mac-password-forced-focus": ["webkit","password-toggle-field","forced colors preserve the field boundary and reveal-action focus"],
  "mac-password-focus": ["webkit","password-toggle-field","Input and reveal action own independent focus paint"],
  "mac-grid-focus": ["webkit","grid","RTL, focus order, reflow, and accessibility remain source ordered"],
  "mac-toast-focus": ["webkit","toast","supports F8, action/close focus, Escape dismissal, and focus restoration"],
  "mac-checkbox-focus": ["webkit","checkbox-card","native label and keyboard activate one checkbox"],
  "mac-table-paint": ["webkit","table","fractional sticky viewport edge contains no body ink","sticky-paint.spec.ts"],
  "mac-button-focus": ["webkit","button","Button inside focus survives clipping and every action fill","behavior.spec.ts"],
  "mac-icon-button-focus": ["webkit","icon-button","IconButton inside focus survives clipping and every action fill","behavior.spec.ts"],
  "mac-stack-focus": ["webkit","stack","reverse axes map edge spacing logically and leave DOM and keyboard order intact","engine.spec.ts"],
  "mac-reset-focus": ["webkit","../integration","token-free reset retains a visible native focus fallback","reset-focus.spec.ts"],
  "mac-navigation": ["webkit","navigation-menu","defaults, links, disclosure, sizes, orientation, state, and composition work","behavior.spec.ts"],
  "mac-nav-list-route": ["webkit","../integration","catalog route nav-list renders without uncaught errors","catalog-routes.spec.ts"],
  "mac-segment-containment": ["webkit","../integration","segment-group keeps labeled specimens separated and contained","review-standards.spec.ts"],
  "center-docs-mobile-webkit": ["mobile-webkit", "center", "docs examples preserve geometry, semantics, and real source", "docs.spec.ts"],
  "typography-titles-webkit": ["webkit","../integration","surface and compact titles expose the approved normalized tracking","typography-recipes.spec.ts"],
  "typography-webkit": ["webkit","../integration","labels, validation, controls, and field values resolve through shared recipes","typography-recipes.spec.ts"],
  "sidebar-paint-mobile-webkit": ["mobile-webkit","../integration","Sidebar trigger composition preserves IconButton paint and size in either CSS order","layout-ownership.spec.ts"],
  "button-mobile-webkit": ["mobile-webkit","../integration","Button remains operable in touch device profiles","mobile.spec.ts"],
  "card-mobile-webkit": ["mobile-webkit","../integration","Card remains contained and its child actions stay operable on touch devices","mobile.spec.ts"],
  "reorderable-mobile-webkit": ["mobile-webkit", "reorderable-list", "mouse drag commits on a valid item and abandons invalid space"],
  "marquee-pause-webkit": ["webkit", "marquee", "public pause freezes every track without changing separation"],
  "marquee-contrast-webkit": ["webkit", "marquee", "Marquee accessibility and forced-colors preserve readable originals"],
  "marquee-contrast-mobile-webkit": ["mobile-webkit", "marquee", "Marquee accessibility and forced-colors preserve readable originals"],
  "popover-mobile-webkit": ["mobile-webkit", "popover", "Popover stacks long Footer actions inside an extreme narrow viewport"],
  "popover-chromium": ["chromium", "popover", "Popover stacks long Footer actions inside an extreme narrow viewport"],
  "mobile-button": ["mobile-chromium", "../integration", "Button remains operable in touch device profiles", "mobile.spec.ts"],
  "mobile-card": ["mobile-chromium", "../integration", "Card remains contained and its child actions stay operable on touch devices", "mobile.spec.ts"],
  "sidebar-paint-mobile": ["mobile-chromium", "../integration", "Sidebar trigger composition preserves IconButton paint and size in either CSS order", "layout-ownership.spec.ts"],
  "dropdown-choice-firefox": ["firefox", "dropdown-menu", "choice rows clear pointer highlight but retain their selection", "parity.spec.ts"],
  "typography-mobile-webkit": ["mobile-webkit", "../integration", "labels, validation, controls, and field values resolve through shared recipes", "typography-recipes.spec.ts"],
  "marquee-pause-firefox": ["firefox", "marquee", "public pause freezes every track without changing separation"],
  "reorder-grid-mobile-chromium": ["mobile-chromium", "reorderable-list", "grid pointer preview keeps size and siblings arrive at their measured destinations", "docs.spec.ts"],
  "reorder-grid-mobile-webkit": ["mobile-webkit", "reorderable-list", "grid pointer preview keeps size and siblings arrive at their measured destinations", "docs.spec.ts"],
  "reorder-cursor-mobile-webkit": ["mobile-webkit", "reorderable-list", "pointer drag cursor stays grabbing across the document (no preview)"],
  "textarea-resize-webkit": ["webkit", "textarea", "native wrapper corner resizing grows the editor and preserves the footer"],
  "textarea-corners-webkit": ["webkit", "textarea", "corner handles grow and shrink compact, large, underline and RTL fields"],
  "radio-group-firefox": ["firefox", "radio-group", "Hook Form connects errors, pointer correction and submit", "documentation.spec.ts"],
};
cases["mac-segment-ready"] = ["webkit", "segment-group", "initial RTL indicator remains contained through measured handoff", "parity.spec.ts"];
const [id, mode] = process.argv.slice(2);
if (!cases[id] || (mode && mode !== "--plan")) throw new Error("Select one known release-blocker case, optionally --plan");
const [project, owner, title, file = "behavior.spec.ts"] = cases[id];
const directory = resolve("test-results/release-blockers", id);
mkdirSync(directory, { recursive: true });
const args = ["playwright", "test", resolve("playground/tests/components", owner, file), "--project", project,
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
