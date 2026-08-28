import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
test.beforeEach(async ({ page }) => { await page.goto("/skeleton"); });
test("defaults, variants, animations, dimensions, and lines are complete", async ({ page }) => {
  const root = page.getByTestId("skeleton-overview").locator(".brick-skeleton");
  await expect(root).toHaveAttribute("data-variant", "text"); await expect(root).toHaveAttribute("data-animation", "pulse"); await expect(root).toHaveAttribute("aria-hidden", "true");
  for (const variant of ["text", "circular", "rectangular", "rounded"]) await expect(page.getByTestId("skeleton-variants").locator(`.brick-skeleton[data-variant='${variant}']`)).toHaveCount(1);
  for (const animation of ["pulse", "wave", "none"]) await expect(page.getByTestId("skeleton-animation").locator(`.brick-skeleton[data-animation='${animation}']`)).toHaveCount(1);
  await expect(page.getByTestId("skeleton-lines").locator(".brick-skeleton[data-lines='5'] .brick-skeleton-line")).toHaveCount(5);
});
test("wrapped content preserves one root and becomes interactive only when loaded", async ({ page }) => {
  const area = page.getByTestId("skeleton-loading"); const toggle = area.getByRole("button", { name: "Show content" });
  const wrapper = area.locator(".brick-skeleton[data-has-children]").nth(1);
  await expect(wrapper).toHaveAttribute("data-slot", "skeleton"); await toggle.click();
  await expect(area.getByText("Project ready")).toBeVisible(); await expect(wrapper).toHaveAttribute("data-slot", "skeleton"); await expect(wrapper).not.toHaveAttribute("aria-hidden");
});
test("region ownership, narrow geometry, and accessibility remain correct", async ({ page }) => {
  const region = page.getByRole("region", { name: "Loading profile" }); await expect(region).toHaveAttribute("aria-busy", "true");
  await page.setViewportSize({ width: 390, height: 844 }); expect((await page.getByTestId("skeleton-stress").boundingBox())!.width).toBeLessThanOrEqual(390);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
test("contextual paint remains visible on a dark overlay surface", async ({ page }) => {
  const skeleton = page.getByTestId("skeleton-appearance").locator('[data-brick-appearance="dark"] .brick-skeleton-line').first();
  const colors = await skeleton.evaluate((element) => {
    const parent = element.parentElement!;
    parent.style.background = "var(--brick-color-surface-overlay)";
    return {
      skeleton: getComputedStyle(element).backgroundColor,
      surface: getComputedStyle(parent).backgroundColor,
    };
  });
  expect(colors.skeleton).not.toBe(colors.surface);
  expect(colors.skeleton).not.toBe("rgba(0, 0, 0, 0)");
});
