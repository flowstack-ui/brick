import { expect, test } from "../../evidence-test.js";
import AxeBuilder from "@axe-core/playwright";
test("empty state recipes keep transparent roots and square indicators", async ({ page }) => {
  await page.goto("/empty-state?qualification=1");
  const roots = page.locator('[data-scenario="empty-state.sizes"] .brick-empty-state');
  expect(await roots.evaluateAll(elements => elements.map(el => getComputedStyle(el).paddingInlineStart))).toEqual(["16px", "32px", "48px"]);
  expect(await roots.evaluateAll(elements => elements.map(el => getComputedStyle(el).paddingBlockStart))).toEqual(["24px", "48px", "64px"]);
  expect(await roots.locator('.brick-empty-state-content').evaluateAll(elements => elements.map(el => getComputedStyle(el).gap))).toEqual(["16px", "24px", "32px"]);
  const lineHeights = await roots.locator('.brick-empty-state-title').evaluateAll(elements => elements.map(el => parseFloat(getComputedStyle(el).lineHeight)));
  lineHeights.forEach((height, index) => expect(height).toBeCloseTo([24, 28, 30][index], 2));
  expect(await roots.locator('.brick-empty-state-title').evaluateAll(elements => elements.map(el => getComputedStyle(el).fontSize))).toEqual(["16px", "18px", "20px"]);
  const indicators = roots.locator('.brick-empty-state-indicator');
  for (let i = 0; i < 3; i++) {
    const box = await indicators.nth(i).boundingBox();
    expect(box!.width).toBe([24, 36, 60][i]); expect(box!.height).toBe(box!.width);
  }
  await expect(roots.first()).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
test("empty state application actions and result messages stay outside the recipe", async ({ page }) => {
  await page.goto("/empty-state?qualification=1");
  await page.getByRole("button", { name: "Create project", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Project created" })).toBeVisible();
  await page.getByRole("button", { name: "Clear search", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("Showing all projects.");
  await expect(page.getByRole("textbox", { name: "Find projects" })).toHaveValue("");
  await expect(page.locator('td[colspan="2"] .brick-empty-state')).toHaveCount(1);
});
test("empty state reflows at narrow width with RTL and system colors", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/empty-state?qualification=1");
  await page.locator("html").evaluate(el => el.setAttribute("dir", "rtl"));
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  const indicator = page.locator('[data-scenario="empty-state.narrow"] .brick-empty-state-indicator');
  const box = await indicator.boundingBox(); expect(box!.width).toBe(box!.height);
  await page.emulateMedia({ forcedColors: "active" });
  await expect(page.locator('.brick-empty-state-title').first()).toHaveCSS("color", "rgb(0, 0, 0)");
});
test("documentation pairs examples and named part props without legacy scenario chrome", async ({ page }) => {
  await page.goto("/empty-state");
  await expect(page.locator('[data-scenario]')).toHaveCount(0);
  await expect(page.locator('#with-list .brick-list')).toHaveCSS("text-align", "start");
  // Some engines resolve a native list item's inherited logical alignment to left.
  await expect(page.locator('#with-list .brick-list li').first()).toHaveCSS("text-align", /^(start|left)$/);
  for (const id of ["sizes", "with-action", "with-list", "responsive", "illustration", "composition"]) {
    const section = page.locator(`#${id}`);
    await expect(section).toBeVisible();
    await section.getByRole("tab", { name: "Code", exact: true }).click();
    await expect(section.getByRole("tabpanel")).toContainText("@flowstack-ui/brick");
    await section.getByRole("tab", { name: "Preview", exact: true }).click();
  }
  for (const part of ["Root", "Content", "Indicator", "Title", "Description"]) {
    await expect(page.locator(`#props-${part.toLowerCase()}`).getByRole("heading", { name: part, exact: true })).toBeVisible();
    await expect(page.getByRole("table", { name: `EmptyState.${part} props`, exact: true })).toBeVisible();
  }
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
test("responsive density and alignment reset across breakpoints and preserve RTL", async ({ page }) => {
  await page.goto("/empty-state");
  const root = page.locator('#responsive .brick-empty-state');
  for (const [width, padding, align] of [[390, 24, "center"], [800, 48, "start"], [1100, 64, "start"], [1400, 48, "center"], [800, 48, "start"], [390, 24, "center"]] as const) {
    await page.setViewportSize({ width, height: 900 });
    await expect(root).toHaveCSS("padding-block-start", `${padding}px`);
    await expect(root).toHaveCSS("text-align", align);
    await expect(root.locator('.brick-empty-state-content')).toHaveCSS("align-items", align === "start" ? "flex-start" : "center");
  }
  await page.setViewportSize({ width: 800, height: 900 });
  await root.evaluate(el => el.setAttribute("dir", "rtl"));
  const content = await root.locator('.brick-empty-state-content').boundingBox();
  const indicator = await root.locator('.brick-empty-state-indicator').boundingBox();
  expect(indicator!.x + indicator!.width).toBeCloseTo(content!.x + content!.width, 1);
});
