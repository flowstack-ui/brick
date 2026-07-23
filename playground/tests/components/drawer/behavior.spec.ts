import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator } from "@playwright/test";

async function expectDrawerSettled(drawer: Locator) {
  await expect(drawer).toHaveAttribute("data-state", "open");
  await expect.poll(async () => drawer.evaluate((element) => getComputedStyle(element).transform)).toBe(
    "matrix(1, 0, 0, 1, 0, 0)",
  );
}

test("Drawer opens with the adopted anatomy and restores focus", async ({ page }) => {
  await page.goto("/drawer");
  const trigger = page.getByRole("button", { name: "Filter projects" });
  await trigger.click();
  const drawer = page.getByRole("dialog", { name: "Filter projects" });
  await expect(drawer).toBeVisible();
  await expect(drawer).toHaveAttribute("aria-modal", "true");
  await expect(drawer).toHaveAttribute("data-placement", "end");
  await expect(drawer).toHaveAttribute("data-size", "md");
  await expect(drawer.locator("[data-slot='drawer-header']")).toBeVisible();
  await expect(drawer.locator("[data-slot='drawer-body']")).toBeVisible();
  await expect(drawer.locator("[data-slot='drawer-footer']")).toBeVisible();
  await expect(page.locator(".brick-drawer-overlay").filter({ visible: true })).toBeVisible();

  await page.getByRole("button", { name: "Cancel" }).click();
  await expect(drawer).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("Drawer traps focus, closes on Escape, and restores scrolling", async ({ page }) => {
  await page.goto("/drawer");
  const trigger = page.getByRole("button", { name: "Open event drawer" });
  await trigger.click();
  const drawer = page.getByRole("dialog", { name: "Dismissal evidence" });
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  await page.keyboard.press("Tab");
  expect(await drawer.evaluate((element) => element.contains(document.activeElement))).toBe(true);
  await page.keyboard.press("Escape");
  await expect(drawer).toBeHidden();
  await expect(trigger).toBeFocused();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  await expect(page.getByText("Closed: escapeKeyDown")).toBeVisible();
});

test("Drawer Overlay dismisses and reports the Atom close reason", async ({ page }) => {
  await page.goto("/drawer");
  const trigger = page.getByRole("button", { name: "Open event drawer" });
  await trigger.click();
  await page.locator(".brick-drawer-overlay").filter({ visible: true }).click({ position: { x: 4, y: 4 } });
  await expect(page.getByRole("dialog", { name: "Dismissal evidence" })).toBeHidden();
  await expect(page.getByText("Closed: backdropClick")).toBeVisible();
  await expect(trigger).toBeFocused();
});

test("disabled dismissal keeps Drawer active until explicit close", async ({ page }) => {
  await page.goto("/drawer");
  const trigger = page.getByRole("button", { name: "Open dismissal-disabled drawer" });
  await trigger.click();
  const drawer = page.getByRole("dialog", { name: "Explicit close required" });
  await page.keyboard.press("Escape");
  await expect(drawer).toBeVisible();
  await page.locator(".brick-drawer-overlay").filter({ visible: true }).click({ position: { x: 4, y: 4 } });
  await expect(drawer).toBeVisible();
  await page.getByRole("button", { name: "Close persistent drawer" }).click();
  await expect(drawer).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("disabled Drawer trigger cannot open through pointer or keyboard", async ({ page }) => {
  await page.goto("/drawer");
  const trigger = page.getByRole("button", { name: "Unavailable drawer" });
  await expect(trigger).toBeDisabled();
  await expect(trigger).toHaveAttribute("data-disabled", "");
  await expect(trigger).toHaveAttribute("tabindex", "-1");
  await trigger.click({ force: true });
  await page.keyboard.press("Enter");
  await page.keyboard.press("Space");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("nested Dialog cleanup restores Drawer and then the application", async ({ page }) => {
  await page.goto("/drawer");
  const parentTrigger = page.getByRole("button", { name: "Open parent drawer" });
  await parentTrigger.click();
  const drawer = page.getByRole("dialog", { name: "Parent filters" });
  const nestedTrigger = page.getByRole("button", { name: "Open nested dialog from drawer" });
  await nestedTrigger.click();
  const dialog = page.getByRole("dialog", { name: "Save filter preset?" });
  await page.getByRole("button", { name: "Done with nested dialog" }).click();
  await expect(dialog).toBeHidden();
  await expect(drawer).toBeVisible();
  await expect(nestedTrigger).toBeFocused();
  await page.getByRole("button", { name: "Close parent drawer" }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.locator("#root")).not.toHaveAttribute("inert", "");
  await expect(parentTrigger).toBeFocused();
  await parentTrigger.click();
  await expect(page.getByRole("dialog", { name: "Parent filters" })).toBeVisible();
});

test("portalled Branch stays interactive without dismissing Drawer", async ({ page }) => {
  await page.goto("/drawer");
  await page.getByRole("button", { name: "Open branch drawer" }).click();
  const drawer = page.getByRole("dialog", { name: "Branch composition" });
  const branch = page.getByRole("complementary", { name: "Owned branch surface" });
  await expect(branch).toBeVisible();
  await expect(branch).toHaveAttribute("data-slot", "drawer-branch");
  await page.getByRole("button", { name: "Branch action" }).click();
  await expect(drawer).toBeVisible();
  await page.getByRole("button", { name: "Close branch drawer" }).click();
  await expect(drawer).toBeHidden();
});

test("mobile side sizes remain ordered and only full occupies the viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 640 });
  await page.goto("/drawer");
  const widths: number[] = [];

  for (const size of ["sm", "md", "lg", "full"] as const) {
    await page.getByRole("button", { name: `Open ${size} drawer` }).click();
    const drawer = page.getByRole("dialog", { name: `Open ${size} drawer` });
    await expectDrawerSettled(drawer);
    const box = await drawer.boundingBox();
    widths.push(box!.width);
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(390.5);
    await page.getByRole("button", { name: "Cancel" }).click();
  }

  expect(widths[0]).toBeLessThan(widths[1]);
  expect(widths[1]).toBeLessThan(widths[2]);
  expect(widths[2]).toBeLessThan(widths[3]);
  expect(widths[3]).toBeCloseTo(390, 0);
});

test("RTL start placement resolves to the physical right and long Body remains reachable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 640 });
  await page.goto("/drawer");
  await page.getByRole("button", { name: "فتح مرشحات مساحة العمل المفصلة" }).click();
  const drawer = page.getByRole("dialog", { name: "فتح مرشحات مساحة العمل المفصلة" });
  const body = drawer.locator("[data-slot='drawer-body']");
  const footer = drawer.locator("[data-slot='drawer-footer']");
  await expectDrawerSettled(drawer);
  await expect(drawer).toHaveAttribute("dir", "rtl");
  await expect(drawer.locator("[data-slot='drawer-title']")).toHaveCSS("direction", "rtl");
  expect(await body.evaluate((element) => element.scrollHeight > element.clientHeight)).toBe(true);
  await expect(footer).toBeVisible();
  const box = await drawer.boundingBox();
  expect(box!.x + box!.width).toBeCloseTo(390, 0);
});

test("RTL start placement enters and exits through the physical right edge", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 640 });
  await page.goto("/drawer");
  const trigger = page.getByRole("button", { name: "فتح مرشحات مساحة العمل المفصلة" });
  await trigger.click();
  const drawer = page.getByRole("dialog", { name: "فتح مرشحات مساحة العمل المفصلة" });
  const openingBox = await drawer.boundingBox();
  expect(openingBox!.x).toBeGreaterThanOrEqual(0);
  await expectDrawerSettled(drawer);
  await page.getByRole("button", { name: "Cancel" }).click();
  await expect(drawer).toBeHidden();
});

test("extreme-height reflow keeps the complete Drawer reachable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 160 });
  await page.goto("/drawer");
  await page.getByRole("button", { name: "فتح مرشحات مساحة العمل المفصلة" }).click();
  const drawer = page.getByRole("dialog", { name: "فتح مرشحات مساحة العمل المفصلة" });
  await expectDrawerSettled(drawer);
  expect(await drawer.evaluate((element) => element.scrollHeight > element.clientHeight)).toBe(true);
  await drawer.evaluate((element) => element.scrollTo({ top: element.scrollHeight }));
  await expect(drawer.getByRole("button", { name: "Apply changes" })).toBeVisible();
});

test("top and bottom placements remain viewport-bound", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 640 });
  await page.goto("/drawer");

  for (const placement of ["top", "bottom"] as const) {
    await page.getByRole("button", { name: `Open ${placement} drawer` }).click();
    const drawer = page.getByRole("dialog", { name: `Open ${placement} drawer` });
    await expectDrawerSettled(drawer);
    const box = await drawer.boundingBox();
    expect(box!.x).toBeCloseTo(0, 0);
    expect(box!.width).toBeCloseTo(390, 0);
    expect(box!.y).toBeGreaterThanOrEqual(0);
    expect(box!.y + box!.height).toBeLessThanOrEqual(640.5);
    await page.getByRole("button", { name: "Cancel" }).click();
  }
});

test("Drawer canonical open state has no automated accessibility violations", async ({ page }) => {
  await page.goto("/drawer");
  await page.getByRole("button", { name: "Filter projects" }).click();
  const drawer = page.getByRole("dialog", { name: "Filter projects" });
  await expect(drawer).toBeVisible();
  await expect(drawer).toHaveCSS("opacity", "1");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
