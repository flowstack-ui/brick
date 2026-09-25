import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";

test.beforeEach(async ({ page }) => {
  await page.goto("/chip?qualification=1");
  await expect(page.locator("[data-component-page='chip']")).toBeVisible();
});

test("Chip compact slots and actions retain geometry and independent activation", async ({ page }) => {
  const targets = page.locator("#scenario-chip-compact .brick-chip__remove-trigger");
  for (const target of await targets.all()) {
    const box = await target.boundingBox();
    expect(box!.width).toBeGreaterThanOrEqual(24);
    expect(box!.height).toBeGreaterThanOrEqual(24);
  }
  const sizes = await page.locator("#scenario-chip-compact [data-evidence='compact-passive']").evaluateAll(nodes =>
    nodes.map(node => node.getBoundingClientRect().height));
  expect(sizes).toEqual([18, 20, 24, 32]);
  for (const node of await page.locator("#scenario-chip-slots .brick-avatar, #scenario-chip-slots .brick-icon").all()) {
    const box = await node.boundingBox();
    expect(Math.abs(box!.width - box!.height)).toBeLessThan(0.1);
  }
  const avatarSizes = await page.locator("#scenario-chip-slots .brick-avatar").evaluateAll(nodes => nodes.map(node => node.getBoundingClientRect().width));
  const iconSizes = await page.locator("#scenario-chip-slots .brick-icon").evaluateAll(nodes => nodes.map(node => node.getBoundingClientRect().width));
  expect(avatarSizes).toEqual([12, 14, 18, 24]);
  const fallbackSizes=await page.locator("#scenario-chip-slots .brick-avatar__fallback").evaluateAll(nodes=>nodes.map(n=>parseFloat(getComputedStyle(n).fontSize)));
  for(let i=0;i<fallbackSizes.length;i++) expect(fallbackSizes[i]).toBeCloseTo(avatarSizes[i]*.4,1);
  expect(iconSizes).toEqual([12, 14, 16, 18]);
  await expect(page.locator("#scenario-chip-slots .brick-icon svg")).toHaveCount(4);
  const action = page.locator("#scenario-chip-actions");
  await action.getByRole("button", { name: "View Riley" }).click();
  await expect(action.getByRole("status")).toHaveText("Profile opened 1 times.");
  await expect(action.getByRole("button", { name: "Remove Riley assignment" })).toBeVisible();
  await action.getByRole("button", { name: "Remove Riley assignment" }).click();
  await expect(action.getByRole("status")).toHaveText("Assignment removed.");
});

test("Chip palettes and compact content remain contained on narrow RTL surfaces", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.locator("[data-component-page='chip']").evaluate(node => node.setAttribute("dir", "rtl"));
  for (const selector of ["#scenario-chip-compact", "#scenario-chip-slots", "#scenario-chip-actions"]) {
    const chips = page.locator(selector + " .brick-chip");
    for (const chip of await chips.all()) {
      expect(await chip.evaluate(node => node.scrollWidth <= node.clientWidth + 1)).toBe(true);
    }
  }
  const solid = page.locator("#scenario-chip-recipes .brick-chip[data-tone='accent'][data-variant='solid']");
  const paint = await solid.evaluate(node => {
    const style = getComputedStyle(node);
    return { background: style.backgroundColor, foreground: style.color };
  });
  expect(paint.background).not.toBe(paint.foreground);
  expect(paint.background).not.toBe("rgba(0, 0, 0, 0)");
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
  await expect(scenario.getByRole("button", { name: "Restore disciplines" })).toBeFocused();
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
