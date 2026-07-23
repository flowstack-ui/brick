import { access } from "node:fs/promises";
import { componentIds, componentTestPaths } from "./component-test-manifest.mjs";

const missing = [];

for (const componentId of componentIds) {
  for (const [layer, path] of Object.entries(componentTestPaths(componentId))) {
    try {
      await access(path);
    } catch {
      missing.push(`${componentId}: missing ${layer} owner at ${path}`);
    }
  }
}

if (missing.length > 0) {
  console.error("Component test ownership is incomplete:\n");
  console.error(missing.map((item) => `- ${item}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Verified unit, type, and browser owners for ${componentIds.length} components.`);
}
