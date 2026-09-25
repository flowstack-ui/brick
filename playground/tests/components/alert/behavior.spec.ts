import { expect, test } from "../../evidence-test.js";
import AxeBuilder from "@axe-core/playwright";
test("alert recipes preserve border geometry and explicit semantics", async ({ page }) => {
  await page.goto("/alert?qualification=1");
  expect(await page.locator('[data-scenario^="alert."]').evaluateAll(elements => elements.map(el => el.getAttribute("data-scenario")))).toEqual(
    ["basic", "description", "statuses", "variants", "sizes", "tone", "inline", "close", "loading", "custom", "no-icon", "actions", "rich", "semantics", "narrow", "appearance"].map(id => `alert.${id}`),
  );
  const roots = page.locator('[data-scenario="alert.variants"] .brick-alert');
  const heights = await roots.evaluateAll(elements => elements.map(el => el.getBoundingClientRect().height));
  expect(new Set(heights).size).toBe(1);
  const sizes = page.locator('[data-scenario="alert.sizes"] .brick-alert');
  expect(await sizes.evaluateAll(elements => elements.map(el => getComputedStyle(el).fontSize))).toEqual(["12px", "14px", "16px"]);
  const lines = await sizes.evaluateAll(elements => elements.map(el => parseFloat(getComputedStyle(el).lineHeight)));
  lines.forEach((line, index) => expect(line).toBeCloseTo([16, 20, 24][index], 1));
  expect(await sizes.evaluateAll(elements => elements.map(el => getComputedStyle(el).borderTopWidth))).toEqual(["0px", "0px", "0px"]);
  await expect(page.locator('[data-scenario="alert.basic"] .brick-alert')).not.toHaveAttribute("role");
  await expect(page.locator('[data-scenario="alert.loading"] .brick-spinner')).toHaveAttribute("aria-hidden", "true");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
test("alert documentation pairs all examples and five part tables", async ({ page }) => {
  await page.goto("/alert");
  await expect(page.locator('[data-scenario]')).toHaveCount(0);
  for (const id of ["description", "statuses", "variants", "with-close-button", "with-spinner", "custom-icon", "tone", "customization", "sizes", "inline", "responsive", "radius"]) {
    const section = page.locator(`#${id}`);
    await section.getByRole("tab", { name: "Code", exact: true }).click();
    await expect(section.getByRole("tabpanel")).toContainText("@flowstack-ui/brick");
    await section.getByRole("tab", { name: "Preview", exact: true }).click();
  }
  for (const part of ["Root", "Content", "Indicator", "Title", "Description"]) {
    await expect(page.locator(`#props-${part.toLowerCase()}`).getByRole("heading", { name: part, exact: true })).toBeVisible();
    await expect(page.getByRole("table", { name: `Alert.${part} props`, exact: true })).toBeVisible();
  }
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
test("alert inherited artwork and logical accent geometry are consistent", async ({ page }) => {
  await page.goto("/alert");
  for (const [section, child] of [["with-spinner", ".brick-spinner"], ["custom-icon", ".brick-icon"]]) {
    const indicator = page.locator(`#${section} .brick-alert-indicator`);
    const box = await indicator.boundingBox();
    // Spinner rotates a square border box; its transformed bounding rectangle
    // grows during rotation even though the circular paint stays contained.
    const artwork = await indicator.locator(child).evaluate(el => ({ width: (el as HTMLElement).offsetWidth, height: (el as HTMLElement).offsetHeight }));
    expect(box!.width).toBe(20);
    expect(artwork!.width).toBeCloseTo(box!.width, 1);
    expect(artwork!.height).toBeCloseTo(box!.height, 1);
  }
  const accent = page.locator('#customization .brick-alert');
  const before = await accent.boundingBox();
  await accent.evaluate(el => el.setAttribute("dir", "rtl"));
  await expect(accent).toHaveCSS("background-position-x", "100%");
  expect((await accent.boundingBox())!.height).toBe(before!.height);
  await expect(page.locator('#inline .brick-alert-content')).toHaveCSS("align-items", "center");
  await expect(page.locator('#inline .brick-alert-content')).toHaveCSS("column-gap", "4px");
});
test("alert responsive recipes reset in both directions and radius is optional", async ({ page }) => {
  await page.goto("/alert");
  const root = page.locator('#responsive .brick-alert');
  for (const width of [390, 800, 1400, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(root).toHaveCSS("font-size", width < 768 ? "12px" : "16px");
    await expect(root.locator('.brick-alert-content')).toHaveCSS("flex-direction", width < 768 ? "column" : "row");
    await expect(root).toHaveCSS("align-items", width < 768 ? "flex-start" : "center");
    if (width >= 768) await expect(root).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await expect(page.locator('#radius .brick-alert').first()).toHaveCSS("border-top-left-radius", "0px");
});
test("alert composed dismissal restores focus and status remains application owned", async ({ page }) => {
  await page.goto("/alert?qualification=1");
  await page.getByRole("button", { name: "Dismiss notice", exact: true }).click();
  await expect(page.getByRole("button", { name: "Restore notice" })).toBeFocused();
  await expect(page.locator('[data-scenario="alert.close"] .brick-alert')).toHaveCount(0);
  await page.getByRole("button", { name: "Restore notice" }).click();
  await expect(page.locator('[data-scenario="alert.close"] .brick-alert')).toHaveCount(1);
  await page.getByRole("button", { name: "Complete export" }).click();
  await expect(page.getByRole("status")).toContainText("Your export is ready.");
});
test("alert keeps indicators square in narrow RTL and system colors", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/alert?qualification=1");
  const indicator = page.locator('[data-scenario="alert.narrow"] .brick-alert-indicator');
  const box = await indicator.boundingBox();
  expect(box!.width).toBe(box!.height);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.emulateMedia({ forcedColors: "active" });
  await expect(page.locator('.brick-alert').first()).toHaveCSS("border-top-style", "solid");
});
