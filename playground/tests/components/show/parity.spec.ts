import { expect, test } from "../../evidence-test.js";
test("conditional Show toggles, falls back and exposes mode documentation", async ({ page }) => {
  await page.goto("/show");
  await expect(page.getByText("Hello from Show", { exact: true })).toHaveCount(0);
  await page.getByRole("button", { name: "Toggle content", exact: true }).click();
  await expect(page.getByText("Hello from Show", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Toggle content", exact: true }).click();
  await expect(page.getByText("Hello from Show", { exact: true })).toHaveCount(0);
  const fallback = page.locator("#fallback");
  await expect(fallback.getByText("Keep clicking…", { exact: true })).toBeVisible();
  for (let i=0;i<3;i++) await fallback.getByRole("button", { name: /^Count:/ }).click();
  await expect(fallback.getByText("Ready!", { exact: true })).toBeVisible();
  await expect(page.locator("#props-conditional")).toBeVisible();
  await expect(page.locator("#props-responsive")).toBeVisible();
});
test("projected Show preserves flex display across the breakpoint", async ({ page }) => {
  await page.goto("/show");
  const host = page.locator("#projection [data-show-from]");
  await page.setViewportSize({ width: 900, height: 800 });
  await expect(host).toHaveCSS("display", "flex");
  await page.setViewportSize({ width: 767, height: 800 });
  await expect(host).toHaveCSS("display", "none");
  await expect(host).toBeAttached();
  await page.setViewportSize({ width: 768, height: 800 });
  await expect(host).toHaveCSS("display", "flex");
});
