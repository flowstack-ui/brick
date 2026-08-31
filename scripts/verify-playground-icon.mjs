import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [shell, app, audit] = await Promise.all([
  readFile("playground/src/shell/PlaygroundShell.tsx", "utf8"),
  readFile("apps/consumer/src/App.tsx", "utf8"),
  readFile("playground/docs/icon-adoption-audit.md", "utf8"),
]);
assert.match(shell, /<Icon size="xs">\s*<MenuIcon \/>\s*<\/Icon>/);
assert.match(shell, /<Icon size="xs">\s*<CloseIcon \/>\s*<\/Icon>/);
assert.match(app, /@flowstack-ui\/brick\/icon/);
assert.match(app, /<Icon size="xs">\s*<ArrowIcon \/>\s*<\/Icon>/);
assert.match(audit, /component-owned anatomy/);
console.log("Verified scoped Icon adoption and retained ownership.");
