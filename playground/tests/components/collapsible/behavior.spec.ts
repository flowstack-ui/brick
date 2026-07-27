import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/collapsible"); });

test("defaults and recipe comparisons preserve controlled differences", async ({ page }) => {
  const root = page.getByTestId("collapsible-overview").locator(".brick-collapsible");
  const trigger = root.getByRole("button", { name: "Notification details" });
  await expect(root).toHaveAttribute("data-variant", "plain");
  await expect(root).toHaveAttribute("data-size", "md");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  for (const variant of ["plain", "soft", "outline"]) await expect(page.getByTestId("collapsible-variants").locator(`.brick-collapsible[data-variant='${variant}']`)).toHaveCount(1);
  for (const size of ["sm", "md", "lg"]) await expect(page.getByTestId("collapsible-sizes").locator(`.brick-collapsible[data-size='${size}']`)).toHaveCount(1);
});

test("activation, relationships, disabled, and mounted lifecycle remain correct", async ({ page }) => {
  const root = page.getByTestId("collapsible-overview").locator(".brick-collapsible");
  const trigger = root.getByRole("button", { name: "Notification details" });
  await trigger.press("Enter");
  const region = root.getByRole("region");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  expect(await trigger.getAttribute("aria-controls")).toBe(await region.getAttribute("id"));
  expect(await region.getAttribute("aria-labelledby")).toBe(await trigger.getAttribute("id"));
  await trigger.press("Space");
  await expect(root.getByRole("region")).toHaveCount(0);
  const disabled = page.getByTestId("collapsible-states").getByRole("button", { name: "Notification details" }).nth(2);
  await expect(disabled).toBeDisabled();
  const mounted = page.getByTestId("collapsible-states").locator(".brick-collapsible-content").last();
  await expect(mounted).toHaveAttribute("hidden");
});

test("orientation, live content, narrow reflow, RTL, and accessibility are stable", async ({ page }) => {
  const orientation = page.getByTestId("collapsible-orientation");
  await expect(orientation.locator(".brick-collapsible[data-orientation='horizontal']")).toHaveCount(1);
  const horizontal = orientation.locator(".brick-collapsible[data-orientation='horizontal']");
  expect(await horizontal.evaluate((element) => Number.parseFloat(getComputedStyle(element.querySelector(".brick-collapsible-content")!).getPropertyValue("--content-width")))).toBeGreaterThan(0);
  const motion = page.getByTestId("collapsible-stress").locator(".forms-evidence-group").first();
  const region = motion.getByRole("region");
  const before = await region.evaluate((element) => Number.parseFloat(getComputedStyle(element).getPropertyValue("--content-height")));
  await motion.getByRole("button", { name: "Add extra content" }).click();
  await expect.poll(() => region.evaluate((element) => Number.parseFloat(getComputedStyle(element).getPropertyValue("--content-height")))).toBeGreaterThan(before);
  await page.setViewportSize({ width: 390, height: 844 });
  expect((await page.getByTestId("collapsible-stress").boundingBox())!.width).toBeLessThanOrEqual(390);
  const rtl = page.getByTestId("collapsible-stress").locator("[dir='rtl'] .brick-collapsible-trigger");
  await expect(rtl).toHaveAttribute("aria-expanded", "true");
  expect((await new AxeBuilder({ page }).include('[data-testid="collapsible-stress"]').analyze()).violations).toEqual([]);
});
