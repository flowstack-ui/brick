import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";

test("Group docs demonstrate responsive attachment, skip, stacking and wrapping", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/group");
  await expect(page.locator("[data-example-preview]")).toHaveCount(10);
  const group = page.locator("#vertical [data-example-canvas] .brick-group");
  await expect(group).toHaveCSS("flex-direction", "row");
  const first = group.getByRole("button").first();
  await expect(first).toHaveCSS("border-top-right-radius", "0px");
  const skip = page.locator("#skip [data-example-canvas] .brick-group");
  await expect(skip.locator(":scope > [data-group-item]")).toHaveCount(2);
  await expect(skip.locator(":scope > [data-group-skip]")).toHaveCount(1);
  const stacked = page.locator("#stacking [data-example-canvas] .brick-group").first();
  const focused = stacked.getByRole("button").last();
  await focused.focus();
  expect(await focused.evaluate(el => Number(getComputedStyle(el).zIndex))).toBeGreaterThan(await stacked.getByRole("button").first().evaluate(el => Number(getComputedStyle(el).zIndex)));
  await page.setViewportSize({ width: 375, height: 800 });
  await expect(group).toHaveCSS("flex-direction", "column");
  await expect(first).toHaveCSS("border-bottom-left-radius", "0px");
  const widths = await group.getByRole("button").evaluateAll(items => items.map(el => el.getBoundingClientRect().width));
  expect(Math.max(...widths) - Math.min(...widths)).toBeLessThan(1);
  const mixed = page.locator("#mixed [data-example-canvas] .brick-group");
  const action = mixed.getByRole("button", { name: "Create" });
  const heights = await mixed.locator(":scope > *").evaluateAll(items => items.map(el => el.getBoundingClientRect().height));
  expect(Math.max(...heights) - Math.min(...heights)).toBeLessThan(1);
  await expect(action).toHaveCSS("flex-shrink", "0");
  const wrap = page.locator("#wrap [data-example-canvas] .brick-group");
  await expect(wrap).toHaveCSS("flex-wrap", "wrap");
  const overflowing = await page.locator("[data-example-canvas]").evaluateAll(elements => elements.filter(el => el.scrollWidth > el.clientWidth + 1).map(el => ({ section: el.closest("section[id]")?.id, width: el.clientWidth, scroll: el.scrollWidth })));
  expect(overflowing).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
});

test("Group docs preserve accessibility and exact source", async ({ page }) => {
  await page.goto("/group");
  await page.locator("#skip").getByRole("tab", { name: "Code", exact: true }).click();
  await expect(page.locator("#skip")).toContainText("skip=");
  expect((await new AxeBuilder({ page }).include('[data-component-page="group"]').analyze()).violations).toEqual([]);
});
