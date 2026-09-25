import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";

test.beforeEach(async ({ page }) => { await page.goto("/stat?qualification=1"); });
test("Stat remains readable in forced-colors", async ({ page }) => {
  await page.emulateMedia({ forcedColors: "active" });
  await expect(page.locator("#scenario-stat-basic .brick-stat-label")).toBeVisible();
  const paint = await page.locator("#scenario-stat-basic .brick-stat-label").evaluate(node => getComputedStyle(node).color);
  expect(paint).not.toBe("rgba(0, 0, 0, 0)");
});
test("Stat docs pair all capabilities with visible part headings", async ({ page }) => {
  await page.goto("/stat");
  for (const id of ["formatting", "indicator", "infotip", "units", "progress", "icon", "trend", "sizes", "responsive", "group", "meaning", "artwork", "locale", "unavailable", "composition"]) {
    const section = page.locator("#" + id);
    await expect(section).toBeVisible();
    await expect(section.getByRole("tab", { name: "Code", exact: true })).toBeVisible();
  }
  for (const part of ["root", "group", "label", "value-text", "value-unit", "help-text", "up-indicator", "down-indicator"]) {
    await expect(page.locator("#props-" + part).getByRole("heading")).toBeVisible();
    await expect(page.locator("#props-" + part).getByRole("table")).toHaveCount(1);
  }
  await expect(page.locator("[id^='scenario-stat-']")).toHaveCount(0);
});
test("Stat responsive sizes preserve sparse defaults and root overrides", async ({ page }) => {
  await page.goto("/stat");
  const values = page.locator("#responsive .brick-stat-value-text");
  for (const [width, expected] of [[390, ["20px", "24px"]], [800, ["30px", "24px"]], [1100, ["30px", "20px"]]] as const) {
    await page.setViewportSize({ width, height: 900 });
    expect(await values.evaluateAll(nodes => nodes.map(node => getComputedStyle(node).fontSize))).toEqual(expected);
  }
});
test("Stat progress, numeral policy and outlined artwork remain correct", async ({ page }) => {
  await page.goto("/stat");
  const progress = page.locator("#progress .brick-progress__track");
  expect((await progress.boundingBox())!.width).toBeGreaterThan(160);
  expect(await page.locator("#artwork .brick-stat-indicator svg").evaluate(node => getComputedStyle(node).fill)).toBe("none");
  expect(await page.locator("#artwork .brick-stat-value-text").evaluate(node => getComputedStyle(node).fontVariantNumeric)).toBe("proportional-nums");
  const indicator = page.locator("#indicator .brick-stat-indicator");
  expect(await indicator.evaluate(node => getComputedStyle(node).marginInlineEnd)).toBe("4px");
  expect(await page.locator("#indicator .brick-stat-help-text").evaluate(node => getComputedStyle(node).display)).toBe("block");
});
test("Stat information tip opens by click and retains accessible description", async ({ page }) => {
  await page.goto("/stat");
  await page.getByRole("button", { name: "About unique visitors" }).click();
  await expect(page.getByText("People who visited at least once in the last 30 days.")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "About unique visitors" })).toBeFocused();
});
test("Stat docs stay contained in RTL and narrow layouts", async ({ page }) => {
  await page.goto("/stat?exampleDirection=rtl&appearance=dark");
  await page.setViewportSize({width:390,height:900});
  for (const root of await page.locator(".brick-stat").all()) {
    expect(await root.evaluate(node => node.scrollWidth <= node.clientWidth + 1)).toBe(true);
  }
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
test("Stat sizes, native grammar and group overrides remain coherent", async ({ page }) => {
  const values = page.locator("#scenario-stat-sizes .brick-stat-value-text");
  expect(await values.evaluateAll(nodes => nodes.map(node => getComputedStyle(node).fontSize))).toEqual(["20px", "24px", "30px"]);
  expect(await page.locator("#scenario-stat-group .brick-stat-value-text").evaluateAll(nodes => nodes.map(node => getComputedStyle(node).fontSize))).toEqual(["30px", "20px", "30px"]);
  const root = page.locator("#scenario-stat-basic dl");
  expect(await root.evaluate(node => Array.from(node.children, child => child.tagName))).toEqual(["DT", "DD", "DD"]);
  expect(await root.evaluate(node => getComputedStyle(node).backgroundColor)).toBe("rgba(0, 0, 0, 0)");
  await expect(root.locator("[aria-live]")).toHaveCount(0);
});
test("Stat formatting, narrow containment and baseline alignment", async ({ page }) => {
  const unit = page.locator("#scenario-stat-units .brick-stat-value-unit");
  const value = page.locator("#scenario-stat-units [data-slot='format-number']");
  const [u, v] = await Promise.all([unit.boundingBox(), value.boundingBox()]);
  expect(await unit.evaluate(node => getComputedStyle(node).fontSize)).toBe("12px");
  expect(u!.y).toBeGreaterThan(v!.y);
  expect(u!.y + u!.height).toBeLessThanOrEqual(v!.y + v!.height + 2);
  await page.setViewportSize({ width: 390, height: 900 });
  for (const root of await page.locator(".brick-stat").all()) {
    expect(await root.evaluate(node => node.scrollWidth <= node.clientWidth + 1)).toBe(true);
  }
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
