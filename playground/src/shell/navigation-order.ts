import type { PlaygroundEntry } from "../app/component-registry.js";

/** Shared sidebar and adjacent-page order; never mutate registry data. */
export function orderNavigation(entries: readonly PlaygroundEntry[]) {
  return [...entries].sort((a, b) =>
    a.category.localeCompare(b.category) || a.title.localeCompare(b.title));
}
