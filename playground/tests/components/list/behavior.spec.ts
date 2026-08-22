import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/list");
  await expect(page.locator("#scenario-list-overview .brick-list")).toBeVisible();
});

test("List defaults and native semantic output are deterministic", async ({ page }) => {
  const root = page.locator("#scenario-list-overview .brick-list");
  await expect(root).toHaveAttribute("data-variant", "plain");
  await expect(root).toHaveAttribute("data-size", "md");
  await expect(root).toHaveAttribute("data-density", "comfortable");
  await expect(root).toHaveAttribute("data-marker", "auto");
  await expect(root).toHaveCSS("list-style-type", "disc");
  await expect(root.locator("li")).toHaveCount(3);
  await expect(page.locator("#scenario-list-semantics ol").first()).toHaveCSS("list-style-type", "decimal");
});

test("List variants, sizes, densities, markers, and nesting remain independent", async ({ page }) => {
  const variants = page.locator("#scenario-list-variants .brick-list");
  await expect(variants.nth(0)).toHaveCSS("border-top-width", "0px");
  await expect(variants.nth(2)).not.toHaveCSS("border-top-width", "0px");
  const borderedItem = variants.nth(2).locator(".brick-list__item").first();
  const borderedRow = borderedItem.locator(".brick-list__row");
  await expect(borderedRow).toHaveCSS("display", "inline");
  const [borderedItemBox, borderedRowBox] = await Promise.all([borderedItem.boundingBox(), borderedRow.boundingBox()]);
  expect(borderedRowBox!.y - borderedItemBox!.y).toBeLessThan(24);
  const sizeValues = await page.locator("#scenario-list-sizing .list-grid--three .brick-list__row").evaluateAll((nodes) => nodes.map((node) => getComputedStyle(node).fontSize));
  expect(new Set(sizeValues).size).toBe(3);
  const densityHeights = await page.locator("#scenario-list-sizing .list-grid--two .brick-list__item").evaluateAll((nodes) => nodes.slice(0, 4).map((node) => node.getBoundingClientRect().height));
  expect(densityHeights[0]).toBeLessThan(densityHeights[3]);
  const markerValues = await page.locator("#scenario-list-markers .list-grid--markers .brick-list").evaluateAll((nodes) => nodes.map((node) => getComputedStyle(node).listStyleType));
  expect(markerValues).toEqual(["disc", "disc", "circle", "square", "decimal", "lower-alpha", "upper-alpha", "lower-roman", "upper-roman", "none"]);
  const nested = page.locator("#scenario-list-markers .brick-list .brick-list");
  expect(await nested.evaluate((node) => parseFloat(getComputedStyle(node).paddingInlineStart))).toBeGreaterThan(0);
});

test("Structured anatomy aligns columns, wraps content, and mirrors logical placement", async ({ page }) => {
  const first = page.locator("#scenario-list-anatomy .brick-list__item").first();
  const leading = first.locator(".brick-list__leading");
  const content = first.locator(".brick-list__content");
  const trailing = first.locator(".brick-list__trailing");
  const [leadingBox, contentBox, trailingBox] = await Promise.all([leading.boundingBox(), content.boundingBox(), trailing.boundingBox()]);
  expect(leadingBox!.x).toBeLessThan(contentBox!.x);
  expect(contentBox!.x).toBeLessThan(trailingBox!.x);
  const rtl = page.locator("#scenario-list-stress [dir=rtl] .brick-list__item").first();
  const [rtlLeading, rtlContent, rtlTrailing] = await Promise.all([
    rtl.locator(".brick-list__leading").boundingBox(),
    rtl.locator(".brick-list__content").boundingBox(),
    rtl.locator(".brick-list__trailing").boundingBox(),
  ]);
  expect(rtlLeading!.x).toBeGreaterThan(rtlContent!.x);
  expect(rtlContent!.x).toBeGreaterThan(rtlTrailing!.x);
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.locator("html").evaluate((node) => node.scrollWidth)).toBeLessThanOrEqual(390);
});

test("List native attributes, marker-free semantics, composition, and accessibility remain intact", async ({ page }) => {
  const ordered = page.locator("#scenario-list-output ol").first();
  await expect(ordered).toHaveAttribute("start", "4");
  await expect(ordered).toHaveAttribute("reversed", "");
  await expect(ordered.locator("li").nth(1)).toHaveAttribute("value", "2");
  await expect(page.locator("#scenario-list-output [data-disabled]")).toHaveAttribute("aria-disabled", "true");
  await expect(page.locator("#scenario-list-stress [data-marker=none]").first()).toHaveAttribute("role", "list");
  const outputs = page.locator("#scenario-list-output [data-rendered-output]");
  await expect(outputs.nth(0)).toContainText("reversed");
  await expect(outputs.nth(1)).toContainText("<ol");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
