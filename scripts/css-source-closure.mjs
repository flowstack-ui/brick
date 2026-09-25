import { posix } from "node:path";

/** Local stylesheet ownership includes the styles the public entry imports. */
export function cssSourceClosure(cssSources, entry) {
  const visited = new Set();
  function visit(path) {
    if (visited.has(path)) return;
    const source = cssSources.get(path);
    if (source === undefined) throw new Error(`Missing local CSS source: ${path}`);
    visited.add(path);
    const uncommented = source.replace(/\/\*[\s\S]*?\*\//gu, "");
    for (const match of uncommented.matchAll(/@import\s+(?:url\(\s*)?["']([^"']+)["']/gu)) {
      const target = match[1];
      if (!target.startsWith(".")) continue;
      visit(posix.normalize(posix.join(posix.dirname(path), target)));
    }
  }
  visit(entry);
  return visited;
}
