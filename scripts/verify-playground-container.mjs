import fs from "node:fs";
import path from "node:path";
import postcss from "postcss";

const shellSource = fs.readFileSync(
  path.resolve("playground/src/shell/PlaygroundShell.tsx"),
  "utf8",
);
const shellCss = fs.readFileSync(
  path.resolve("playground/src/styles/shell.css"),
  "utf8",
);
const failures = [];

for (const required of [
  'className="evidence-main-column"',
  'measure="max"',
  'gutter="lg"',
  'className="evidence-page-header"',
  'className="scenario-nav"',
  'data-playground-content=""',
  'className="evidence-footer"',
]) {
  if (!shellSource.includes(required)) {
    failures.push(`PlaygroundShell is missing ${required}`);
  }
}

const root = postcss.parse(shellCss);
const migrated = new Set([
  ".evidence-main-column",
  ".evidence-page-header",
  ".scenario-nav",
  ".evidence-footer",
]);
root.walkRules((rule) => {
  if (!(rule.selectors ?? []).some((selector) => migrated.has(selector.trim()))) {
    return;
  }
  rule.walkDecls((declaration) => {
    if (["inline-size", "max-inline-size", "margin-inline", "padding-inline"]
      .includes(declaration.prop)) {
      failures.push(
        `${rule.selector} still owns ${declaration.prop}: ${declaration.value}`,
      );
    }
  });
});

if (/data-playground-content\][^{]*\{[^}]*(?:max-inline-size|margin-inline)/s
  .test(shellCss)) {
  failures.push("route content still owns raw width/centering CSS");
}

if (failures.length > 0) {
  console.error("Playground Container ownership verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  "Verified shared playground page boundaries use Brick Container.",
);
