import { access, readFile } from "node:fs/promises";
import { componentIds, componentTestPaths } from "./component-test-manifest.mjs";

const missing = [];

for (const componentId of componentIds) {
  const paths = componentTestPaths(componentId);

  for (const [layer, path] of Object.entries(paths)) {
    try {
      await access(path);
    } catch {
      missing.push(`${componentId}: missing ${layer} owner at ${path}`);
    }
  }

  try {
    const manual = await readFile(paths.manual, "utf8");
    const requiredManualContent = [
      "| Browser and version |",
      "| Operating system |",
      "| Viewport and zoom |",
      "| Assistive technology |",
      `| Playground route | \`/${componentId}\` |`,
      "Scenario order:",
      "Use `pass`, `fail`, `blocked`, or `not applicable`",
      "## Completion",
      "Overall result:",
      "Follow-up issues:",
      "Workbook updated:",
    ];

    for (const required of requiredManualContent) {
      if (!manual.includes(required)) {
        missing.push(
          `${componentId}: manual owner is missing required content ${JSON.stringify(required)}`,
        );
      }
    }

    if (/^Result:\s+(?:pass|fail|blocked|not applicable)\s*$/im.test(manual)) {
      missing.push(`${componentId}: manual owner contains a pre-filled result`);
    }
  } catch {
    // The missing-file error above already identifies this owner.
  }
}

if (missing.length > 0) {
  console.error("Component test ownership is incomplete:\n");
  console.error(missing.map((item) => `- ${item}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `Verified guide, changelog, unit, type, browser, visual, and manual owners for ${componentIds.length} components.`,
  );
}
