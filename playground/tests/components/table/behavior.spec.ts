import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/table"); await expect(page.locator("#scenario-table-overview .brick-table")).toBeVisible(); });

test("Table defaults and native anatomy are deterministic", async ({ page }) => {
  const root = page.locator("#scenario-table-overview .brick-table");
  await expect(root).toHaveAttribute("data-variant", "line");
  await expect(root).toHaveAttribute("data-size", "md");
  await expect(root).toHaveAttribute("data-density", "comfortable");
  await expect(root.locator("caption")).toHaveText("Release verification");
  await expect(root.locator("thead th")).toHaveCount(4);
  await expect(root.locator("tbody tr")).toHaveCount(3);
  await expect(root.locator("tbody th").first()).toHaveAttribute("scope", "row");
  expect(await root.locator("tfoot tr").first().locator("th, td").evaluateAll((cells) => cells.reduce((total, cell) => total + (cell as HTMLTableCellElement).colSpan, 0))).toBe(4);
});

test("Table recipes, numeric alignment, and sorting remain independent", async ({ page }) => {
  const outlines = page.locator("#scenario-table-variants .brick-table");
  await expect(outlines.nth(1)).not.toHaveCSS("border-top-width", "0px");
  await expect(outlines.nth(1)).toHaveCSS("overflow", "visible");
  await expect(outlines.nth(1).locator("caption")).toBeVisible();
  await expect(outlines.nth(1).locator("thead th").first()).not.toHaveCSS("border-top-left-radius", "0px");
  await expect(outlines.nth(1).locator("thead th").last()).not.toHaveCSS("border-top-right-radius", "0px");
  const bodyOnlyOutline = page.locator("#scenario-table-alignment .brick-table[data-variant='outline']").first();
  await expect(bodyOnlyOutline.locator("tbody td").first()).not.toHaveCSS("border-top-left-radius", "0px");
  await expect(bodyOnlyOutline.locator("tbody td").last()).not.toHaveCSS("border-top-right-radius", "0px");
  await expect(bodyOnlyOutline.locator("tbody tr").last().locator("td").first()).not.toHaveCSS("border-bottom-left-radius", "0px");
  await expect(bodyOnlyOutline.locator("tbody tr").last().locator("td").last()).not.toHaveCSS("border-bottom-right-radius", "0px");
  await expect(outlines.nth(2)).toHaveAttribute("data-striped", "");
  const sizes = await page.locator("#scenario-table-sizing .table-grid").first().locator(".brick-table").evaluateAll((nodes) => nodes.map((node) => getComputedStyle(node).fontSize));
  expect(new Set(sizes).size).toBe(3);
  const numeric = page.locator("#scenario-table-alignment [data-numeric]");
  await expect(numeric).toHaveCSS("text-align", "end");
  const button = page.locator("#scenario-table-sorting button");
  const head = page.locator("#scenario-table-sorting [aria-sort]");
  await expect(head).toHaveAttribute("aria-sort", "ascending");
  await button.press("Enter");
  await expect(head).toHaveAttribute("aria-sort", "descending");
  await expect(button).toBeFocused();
  const headerText = page.locator("#scenario-table-sorting thead th").first();
  await expect(button).toHaveCSS("font-size", await headerText.evaluate((node) => getComputedStyle(node).fontSize));
  const buttonBox = await button.boundingBox();
  const indicatorBox = await button.locator(".brick-table__sort-indicator").boundingBox();
  expect(Math.abs(indicatorBox!.y + indicatorBox!.height / 2 - (buttonBox!.y + buttonBox!.height / 2))).toBeLessThanOrEqual(1);
  await expect(button).toHaveCSS("column-gap", "12px");
  await expect(page.locator("#scenario-table-alignment .table-cell")).toHaveCount(4);
  await expect(page.locator("#scenario-table-alignment .brick-table[data-variant='outline']")).toHaveCount(4);
});

test("Table sticky and explicit overflow geometry stay contained", async ({ page }) => {
  const sticky = page.locator("#scenario-table-sticky .table-sticky");
  const head = sticky.locator("thead th").first();
  const containerBox = await sticky.boundingBox();
  expect(await sticky.evaluate((node) => node.scrollHeight > node.clientHeight)).toBe(true);
  await sticky.evaluate((node) => { node.scrollTop = 100; });
  const after = await head.boundingBox();
  expect(Math.abs(after!.y - containerBox!.y)).toBeLessThan(2);
  await page.setViewportSize({ width: 390, height: 844 });
  const container = page.locator("#scenario-table-stress .brick-table-container").first();
  expect(await container.evaluate((node) => node.scrollWidth > node.clientWidth)).toBe(true);
  const overflowBox = await container.boundingBox();
  expect(overflowBox!.x).toBeGreaterThanOrEqual(0);
  expect(overflowBox!.x + overflowBox!.width).toBeLessThanOrEqual(390);
  await expect(page.locator("#scenario-table-sticky .table-cell")).toHaveCount(3);
  await expect(page.locator("#scenario-table-appearance [data-brick-appearance='light'] .brick-table .brick-badge")).toHaveCount(3);
  await expect(page.locator("#scenario-table-appearance [data-brick-appearance='dark'] .brick-table .brick-badge")).toHaveCount(3);
  const lightLabel = await page.locator("#scenario-table-appearance [data-brick-appearance='light'] > .brick-badge").boundingBox();
  const lightCaption = await page.locator("#scenario-table-appearance [data-brick-appearance='light'] caption").boundingBox();
  expect(lightCaption!.y - (lightLabel!.y + lightLabel!.height)).toBeGreaterThanOrEqual(8);
  const customFooterCells = page.locator("#scenario-table-appearance .table-customization tfoot tr").locator("th, td");
  await expect(customFooterCells.first()).not.toHaveCSS("border-bottom-left-radius", "0px");
  await expect(customFooterCells.last()).not.toHaveCSS("border-bottom-right-radius", "0px");
});

test("Table has no composite behavior and passes accessibility checks", async ({ page }) => {
  await expect(page.locator(".brick-table[role=grid]")).toHaveCount(0);
  await expect(page.locator(".brick-table[tabindex]")).toHaveCount(0);
  await expect(page.locator("#scenario-table-stress button")).toHaveCount(3);
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
