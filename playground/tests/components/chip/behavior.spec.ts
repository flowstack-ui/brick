import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/chip");
  await expect(page.locator("[data-component-page='chip']")).toBeVisible();
});

test("Chip exposes passive Root and independently named RemoveTrigger", async ({ page }) => {
  const root = page.locator("#scenario-chip-overview .brick-chip");
  await expect(root).toHaveAttribute("data-variant", "soft");
  await expect(root).toHaveAttribute("data-tone", "neutral");
  await expect(root).toHaveAttribute("data-size", "md");
  await expect(root).toHaveAttribute("data-shape", "pill");
  await expect(root).not.toHaveAttribute("role");
  await expect(root).not.toHaveAttribute("tabindex");
  await expect(root.getByRole("button", { name: "Remove Riley Chen" })).toBeVisible();
});

test("Chip removal stays application-owned and disabled removal is unavailable", async ({ page }) => {
  const scenario = page.locator("#scenario-chip-removal");
  await scenario.getByRole("button", { name: "Remove Research" }).click();
  await expect(scenario.getByText("Research", { exact: true })).toHaveCount(0);
  await expect(scenario.getByText("2 disciplines assigned.")).toBeVisible();
  await expect(scenario.getByRole("button", { name: "Remove Required reviewer" })).toBeDisabled();
});

test("Chip target geometry, containment, RTL, and axe pass", async ({ page }) => {
  const overviewRemove = page.locator("#scenario-chip-overview").getByRole("button", { name: "Remove Riley Chen" });
  await overviewRemove.focus();
  await expect(overviewRemove).toBeFocused();
  const target = await overviewRemove.boundingBox();
  expect(target).not.toBeNull();
  expect(target!.width).toBeGreaterThanOrEqual(24);
  expect(target!.height).toBeGreaterThanOrEqual(24);

  const constrainedChip = page.locator("#scenario-chip-containment .chip-constrained .brick-chip").first();
  expect(await constrainedChip.evaluate(node => node.scrollWidth <= node.clientWidth)).toBe(true);

  const rtlChip = page.locator("#scenario-chip-boundary [dir='rtl'] .brick-chip");
  const [labelBox, removeBox] = await Promise.all([
    rtlChip.locator(".brick-chip__label").boundingBox(),
    rtlChip.getByRole("button").boundingBox(),
  ]);
  expect(labelBox).not.toBeNull();
  expect(removeBox).not.toBeNull();
  expect(removeBox!.x).toBeLessThan(labelBox!.x);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
