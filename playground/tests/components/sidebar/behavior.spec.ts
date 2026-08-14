import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
test.beforeEach(async ({ page }) => { await page.goto("/sidebar"); });

test("defaults and closed recipes own coordinated geometry", async ({ page }) => {
  const root = page.getByTestId("sidebar-overview").locator(".brick-sidebar");
  await expect(root).toHaveAttribute("data-state", "expanded");
  await expect(root).toHaveAttribute("data-variant", "docked");
  await expect(root).toHaveAttribute("data-size", "md");
  await expect(root).toHaveAttribute("data-position", "static");
  await expect(root).toHaveAttribute("data-surface", "base");
  const panel = root.locator(".brick-sidebar__panel");
  const main = root.locator(".brick-sidebar__main");
  const panelBox = await panel.boundingBox(); const mainBox = await main.boundingBox();
  expect(panelBox!.x + panelBox!.width).toBeLessThanOrEqual(mainBox!.x + 1);
});

test("panel surface selection remains independent from docked or floating geometry", async ({ page }) => {
  const scenario = page.locator('[data-scenario="sidebar.appearance"]');
  const transparent = scenario.locator('.brick-sidebar[data-surface="transparent"]');
  await expect(transparent).toHaveAttribute("data-variant", "docked");
  await expect(transparent.locator(".brick-sidebar__panel")).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
});

test("controlled Trigger changes state and offcanvas output remains inert", async ({ page }) => {
  const scenario = page.locator('[data-scenario="sidebar.behavior"]');
  const trigger = scenario.getByRole("button", { name: "Toggle controlled sidebar" });
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(scenario.getByText("Controlled state:")).toContainText("rail");
  const output = scenario.locator(".playground-output-evidence");
  await expect(output.locator(".brick-sidebar__panel")).toHaveAttribute("inert", "");
  await expect(output.locator("[data-rendered-output]")).toContainText("aria-hidden");
});

test("right side, sticky containment, composition, mobile reflow, and accessibility pass", async ({ page }) => {
  const right = page.locator('[data-scenario="sidebar.placement"] .brick-sidebar[data-side="right"]');
  const panelBox = await right.locator(".brick-sidebar__panel").boundingBox();
  const mainBox = await right.locator(".brick-sidebar__main").boundingBox();
  expect(panelBox!.x).toBeGreaterThanOrEqual(mainBox!.x + mainBox!.width - 1);
  await expect(page.locator('[data-scenario="sidebar.regions"] [data-rendered-output]')).not.toHaveText("");
  await page.setViewportSize({ width: 390, height: 844 });
  const stress = page.locator('[data-scenario="sidebar.stress"]'); const box = await stress.boundingBox();
  expect(box!.x + box!.width).toBeLessThanOrEqual(390);
  const results = await new AxeBuilder({ page }).include('[data-testid="sidebar-overview"]').analyze();
  expect(results.violations).toEqual([]);
});

test("desktop playground shell consumes Sidebar while mobile policy remains Drawer", async ({ page }) => {
  if ((page.viewportSize()?.width ?? 0) < 1280) {
    await page.getByRole("button", { name: "Open component navigation" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
  } else {
    const shell = page.locator("[data-playground-shell] > .brick-sidebar");
    await expect(shell).toHaveClass(/evidence-layout/);
    await expect(shell.locator(":scope > .brick-sidebar__panel")).toContainText("Sidebar");
  }
});
