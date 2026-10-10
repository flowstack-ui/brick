import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";
import { docsExample, docsParent } from "./docs-locators.js";

test.beforeEach(async ({ page }) => {
  await page.goto("/bleed?qualification=1");
});

test("Bleed crosses the selected logical edges without leaking props", async ({ page }) => {
  const inline = page.getByTestId("bleed-inline");
  const block = page.getByTestId("bleed-block");
  await expect(inline).toHaveCSS("margin-left", "-32px");
  await expect(inline).toHaveCSS("margin-right", "-32px");
  await expect(block).toHaveCSS("margin-bottom", "-32px");
  await expect(inline).not.toHaveAttribute("inline");
  await expect(block).not.toHaveAttribute("blockEnd");
});

test("responsive spacing and asChild preserve the authored host", async ({ page }) => {
  const responsive = page.getByTestId("bleed-responsive");
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(responsive).toHaveCSS("margin-left", "-8px");
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(responsive).toHaveCSS("margin-left", "-24px");
  await expect(responsive).toHaveCSS("margin-top", "-32px");
  await expect(page.getByTestId("bleed-composed")).toHaveJSProperty("tagName", "FIGURE");
});

test("Bleed remains contained and accessible at narrow widths", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test("docs examples reach the intended parent edges across sizes and RTL", async ({ page }) => {
  await page.goto("/bleed");
  const surfaces = page.locator("[data-example-canvas] .brick-surface");
  expect(await surfaces.count()).toBeGreaterThan(0);
  for (const surface of await surfaces.all()) {
    await expect(surface).toHaveCSS("border-radius", "0px");
  }
  for (const width of [320, 768, 1280, 1600]) {
    await page.setViewportSize({ width, height: 900 });
    for (const dir of ["ltr", "rtl"]) {
      await page.locator('[data-component-page="bleed"]').evaluate((el, dir) => el.setAttribute("dir", dir), dir);
      for (const kind of ["basic", "fluid", "vertical", "inlineStart", "inlineEnd", "blockStart", "blockEnd"]) {
        const parent = docsParent(page, kind);
        await parent.evaluate((el, dir) => el.setAttribute("dir", dir), dir);
        const media = parent.locator(".brick-bleed").first();
        const p = (await parent.boundingBox())!;
        const m = (await media.boundingBox())!;
        const border = await parent.evaluate(el => parseFloat(getComputedStyle(el).borderLeftWidth));
        if (kind === "basic" || kind === "fluid" || kind === (dir === "ltr" ? "inlineStart" : "inlineEnd")) expect(m.x).toBeCloseTo(p.x + border, 0);
        if (kind === "basic" || kind === "fluid" || kind === (dir === "ltr" ? "inlineEnd" : "inlineStart")) expect(m.x + m.width).toBeCloseTo(p.x + p.width - border, 0);
        if (kind === "vertical" || kind === "blockStart") expect(m.y).toBeCloseTo(p.y + border, 0);
        if (kind === "vertical" || kind === "blockEnd") expect(m.y + m.height).toBeCloseTo(p.y + p.height - border, 0);
      }
      await expect(docsExample(page, "Edge override").locator(".brick-bleed")).toHaveCSS("margin-inline-end", "0px");
      await expect(docsExample(page, "Edge override").locator(".brick-bleed")).toHaveCSS("margin-inline-start", "-32px");
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    }
  }
  await expect(docsExample(page, "Composition").locator(".brick-bleed")).toHaveClass(/brick-surface/);
});

test("docs use shared code, props, and table of contents", async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 1000 });
  await page.goto("/bleed");
  await expect(page.getByRole("navigation", { name: "Bleed scenarios" })).toHaveCount(0);
  const props = page.getByRole("table", { name: "Bleed props", exact: true });
  await expect(props.getByRole("rowheader")).toHaveText(["inline", "block", "inlineStart", "inlineEnd", "blockStart", "blockEnd", "as", "asChild"]);
  const tabs = page.getByRole("tablist", { name: "Bleed view", exact: true });
  await tabs.getByRole("tab", { name: "Code", exact: true }).click();
  await expect(page.getByRole("tabpanel").filter({ hasText: "export function BleedBasic" })).toBeVisible();
  await tabs.getByRole("tab", { name: "Preview", exact: true }).click();
  await page.getByRole("navigation", { name: "On this page" }).getByRole("link", { name: "Props", exact: true }).click();
  await expect(page).toHaveURL(/#props$/);
  const results = await new AxeBuilder({ page }).include('[data-component-page="bleed"]').analyze();
  expect(results.violations).toEqual([]);
});
