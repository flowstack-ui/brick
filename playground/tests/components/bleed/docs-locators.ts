import type { Page } from "@playwright/test";

/** Test structure stays outside the copyable example source. */
export function docsExample(page: Page, label: string) {
  return page
    .locator("[data-example-preview]")
    .filter({
      has: page.getByRole("tablist", { name: `${label} view`, exact: true }),
    })
    .locator("[data-example-canvas]");
}

export function docsParent(page: Page, kind: string) {
  const directions = ["inlineStart", "inlineEnd", "blockStart", "blockEnd"];
  if (directions.includes(kind)) {
    return docsExample(page, "Specific direction")
      .locator(":scope > .brick-stack > .brick-surface")
      .nth(directions.indexOf(kind));
  }
  const labels: Record<string, string> = {
    basic: "Bleed",
    fluid: "Responsive",
    vertical: "Vertical",
  };
  return docsExample(page, labels[kind]).locator(":scope > .brick-surface");
}
