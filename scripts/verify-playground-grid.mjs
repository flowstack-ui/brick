import fs from "node:fs";
import path from "node:path";
import postcss from "postcss";

const componentRoot = path.resolve("playground/src/components");
const failures = [];

const gridOwnedClass = (className) =>
  className === "forms-grid" ||
  className === "forms-scoped-grid" ||
  className === "playground-output-stack" ||
  className === "stack-grid" ||
  className === "stack-scoped-grid" ||
  className === "text-grid" ||
  className === "text-scoped-grid" ||
  className.endsWith("-specimen-grid") ||
  className.endsWith("-appearance-grid") ||
  className.endsWith("-scoped-grid") ||
  className.endsWith("-scoped-appearance-grid");

for (const relative of fs
  .readdirSync(componentRoot, { recursive: true })
  .filter((file) => file.endsWith("Page.tsx"))) {
  const file = path.join(componentRoot, relative);
  const source = fs.readFileSync(file, "utf8");

  for (const match of source.matchAll(
    /<(div|main|section|article)\b[^>]*className="([^"]+)"/g,
  )) {
    const classes = match[2].split(/\s+/);
    if (classes.some(gridOwnedClass)) {
      failures.push(
        `${relative}: ${match[1]} still owns reusable Grid layout (${match[2]})`,
      );
    }
  }
}

const cssRoots = [
  ...fs
    .readdirSync(componentRoot, { recursive: true })
    .filter((file) => file.endsWith(".css"))
    .map((file) => path.join(componentRoot, file)),
  path.resolve("playground/src/shared/forms-evidence.playground.css"),
  path.resolve("playground/src/shared/rendered-output.playground.css"),
];

for (const file of cssRoots) {
  const root = postcss.parse(fs.readFileSync(file, "utf8"));
  root.walkRules((rule) => {
    const owned = (rule.selectors ?? []).some((selector) => {
      const className = selector.trim().match(/^\.([\w-]+)$/)?.[1];
      return className ? gridOwnedClass(className) : false;
    });
    if (!owned) return;
    rule.walkDecls("display", (declaration) => {
      if (declaration.value === "grid") {
        failures.push(
          `${path.relative(process.cwd(), file)}: ${rule.selector} still declares display:grid`,
        );
      }
    });
  });
}

if (failures.length > 0) {
  console.error("Playground Grid ownership verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  "Verified reusable playground matrices and comparison regions use Brick Grid.",
);
