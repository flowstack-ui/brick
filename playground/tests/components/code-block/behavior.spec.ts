import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/code-block"); });

test("Code Block renders canonical and optional anatomy", async ({ page }) => {
  const overview = page.getByTestId("code-block-overview");
  await expect(overview.locator("[data-slot='code-block']")).toHaveAttribute("data-variant", "subtle");
  await expect(overview.locator("pre > code")).toContainText("SaveAction");
  await expect(overview.locator("[data-slot='code-block-header']")).toHaveCount(0);
  const anatomy = page.getByTestId("code-block-anatomy");
  for (const part of ["header", "title", "language", "actions", "content", "copy-trigger", "copy-status"]) {
    await expect(anatomy.locator(`[data-slot='code-block-${part}']`)).toHaveCount(1);
  }
});

test("Code Block content and copy stay truthful", async ({ page }) => {
  await expect(page.getByTestId("code-block-content").getByText('<Button aria-label="Save" />')).toBeVisible();
  const copy = page.getByTestId("code-block-copy");
  await copy.getByRole("button", { name: "Copy command" }).click();
  await expect(copy.getByText("Copied command")).toBeVisible();
  await copy.getByRole("button", { name: "Error" }).click();
  await copy.getByRole("button", { name: "Copy command" }).click();
  await expect(copy.getByText("Copy failed")).toBeVisible();
  await expect(copy.getByText("Copied command")).toHaveCount(0);
});

test("Code Block overflow, stress, and accessibility remain contained", async ({ page }) => {
  const scroll = page.getByRole("region", { name: "Scrollable endpoint source" });
  await expect(scroll).toHaveAttribute("tabindex", "0");
  expect(await scroll.evaluate((node) => node.scrollWidth)).toBeGreaterThan(await scroll.evaluate((node) => node.clientWidth));
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.locator("html").evaluate((node) => node.scrollWidth)).toBeLessThanOrEqual(390);
  const shortCode = page.getByRole("region", { name: "Overview Button source" }).locator("pre");
  const longCode = page.getByRole("region", { name: "Long source" }).locator("pre");
  await expect(shortCode).toHaveCSS("font-size", "16px");
  await expect(longCode).toHaveCSS("font-size", "16px");
  for (const code of [shortCode, longCode]) {
    await expect(code).toHaveCSS("-webkit-text-size-adjust", "100%");
  }
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
