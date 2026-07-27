import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
test.beforeEach(async ({ page }) => { await page.goto("/tabs"); });

test("defaults expose complete relationships and automatic keyboard activation", async ({ page }) => {
  const root = page.getByTestId("tabs-overview").locator(".brick-tabs");
  await expect(root).toHaveAttribute("data-size", "md");
  await expect(root).toHaveAttribute("data-variant", "line");
  const tabs = root.getByRole("tab");
  await expect(tabs).toHaveCount(3);
  await tabs.first().focus();
  await tabs.first().press("ArrowRight");
  await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
  await expect(root.getByRole("tabpanel")).toHaveText("Activity panel content.");
});

test("variants, sizes, vertical navigation, fitted width, and disabled state are complete", async ({ page }) => {
  for (const variant of ["line", "solid", "soft", "enclosed"]) await expect(page.getByTestId("tabs-variants").locator(`.brick-tabs[data-variant='${variant}']`)).toHaveCount(1);
  const heights: number[] = [];
  for (const size of ["sm", "md", "lg"]) heights.push((await page.getByTestId("tabs-sizes").locator(`.brick-tabs[data-size='${size}'] .brick-tabs-trigger`).first().boundingBox())!.height);
  expect(heights[0]).toBeLessThan(heights[1]); expect(heights[1]).toBeLessThan(heights[2]);
  const vertical = page.getByRole("tablist", { name: "Vertical sections" });
  const first = vertical.getByRole("tab").first(); await first.focus(); await first.press("ArrowDown"); await expect(vertical.getByRole("tab").nth(1)).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tab", { name: "Locked" })).toBeDisabled();
});

test("manual activation, composition, overflow, and RTL work", async ({ page }) => {
  const manual = page.getByRole("tablist", { name: "Manual sections" });
  const one = manual.getByRole("tab", { name: "One" }); await one.focus(); await one.press("ArrowRight");
  await expect(manual.getByRole("tab", { name: "One" })).toHaveAttribute("aria-selected", "true");
  await manual.getByRole("tab", { name: "Two" }).press("Enter"); await expect(manual.getByRole("tab", { name: "Two" })).toHaveAttribute("aria-selected", "true");
  await expect(page.locator("[data-adapter='tabs-trigger']")).toHaveAttribute("role", "tab");
  await page.setViewportSize({ width: 390, height: 844 });
  const constrained = page.getByRole("tablist", { name: "Constrained sections" });
  expect(await constrained.evaluate((node) => node.scrollWidth > node.clientWidth)).toBe(true);
  const rtl = page.getByRole("tablist", { name: "أقسام الحساب" });
  const rtlFirst = rtl.getByRole("tab").first();
  await rtlFirst.focus();
  await rtlFirst.press("ArrowLeft");
  const rtlActive = rtl.getByRole("tab").nth(1);
  await expect(rtlActive).toHaveAttribute("aria-selected", "true");
  await expect.poll(async () => {
    const activeBox = await rtlActive.boundingBox();
    const indicatorBox = await rtl.locator(".brick-tabs-indicator").boundingBox();
    return {
      x: Math.round(indicatorBox!.x - activeBox!.x),
      width: Math.round(indicatorBox!.width - activeBox!.width),
    };
  }).toEqual({ x: 0, width: 0 });
});

test("Tabs page has no automatically detectable accessibility violations", async ({ page }) => { expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]); });
