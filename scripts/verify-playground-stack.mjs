import fs from "node:fs";
import path from "node:path";
import postcss from "postcss";

const componentRoot = path.resolve("playground/src/components");
const failures = [];

const stackOwnedClass = (className) =>
  className.endsWith("-page") ||
  className.endsWith("-evidence-stack") ||
  className.endsWith("-evidence-group") ||
  className.endsWith("-evidence-group__heading") ||
  className === "forms-evidence-stack" ||
  className === "forms-actions" ||
  className.endsWith("-long-copy") ||
  className === "hover-card-profile" ||
  className === "tooltip-state-example" ||
  className === "toggle-group-readout";

for (const relative of fs
  .readdirSync(componentRoot, { recursive: true })
  .filter((file) => file.endsWith("Page.tsx"))) {
  const file = path.join(componentRoot, relative);
  const source = fs.readFileSync(file, "utf8");

  for (const match of source.matchAll(
    /<(div|main|section)\b[^>]*className="([^"]+)"/g,
  )) {
    const classes = match[2].split(/\s+/);
    if (classes.some(stackOwnedClass)) {
      failures.push(
        `${relative}: ${match[1]} still owns Stack-class layout (${match[2]})`,
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
];

for (const file of cssRoots) {
  const root = postcss.parse(fs.readFileSync(file, "utf8"));
  root.walkRules((rule) => {
    const selectors = rule.selectors ?? [];
    if (
      !selectors.some((selector) => {
        const classMatch = selector.trim().match(/^\.([\w-]+)$/);
        return classMatch && stackOwnedClass(classMatch[1]);
      })
    ) {
      return;
    }

    rule.walkDecls("display", (declaration) => {
      if (declaration.value === "grid" || declaration.value === "flex") {
        failures.push(
          `${path.relative(process.cwd(), file)}: ${rule.selector} still declares display:${declaration.value}`,
        );
      }
    });
  });
}

if (failures.length > 0) {
  console.error("Playground Stack ownership verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  "Verified playground page, evidence, action, and long-copy flows use Stack components.",
);
