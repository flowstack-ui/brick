import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/visually-hidden"); });

test("hidden content names controls without a visual footprint", async ({ page }) => {
  const action = page.getByTestId("visually-hidden-action").first();
  await expect(action).toHaveAccessibleName("Search projects");
  const hidden = action.locator(".brick-visually-hidden");
  await expect(hidden).toHaveAttribute("data-slot", "visually-hidden");
  expect(await hidden.evaluate((node) => ({ width: node.getBoundingClientRect().width, height: node.getBoundingClientRect().height, position: getComputedStyle(node).position }))).toEqual({ width: 1, height: 1, position: "absolute" });
  await expect(page.getByRole("button", { name: "Delete project permanently" })).toBeVisible();
});

test("default output, composition, native props, and ref remain observable", async ({ page }) => {
  const output = page.locator("#scenario-visually-hidden-output .brick-visually-hidden");
  await expect(output).toHaveCSS("clip-path", "inset(50%)");
  await expect(page.locator('[data-adapter="render"]')).toHaveCount(1);
  await expect(page.locator('[data-adapter="as-child"]')).toHaveCount(2);
  const native = page.locator('[data-purpose="context"]');
  await expect(native).toHaveAttribute("data-slot", "private-context");
  await expect(native).toHaveClass(/consumer-hidden/);
  await page.getByRole("button", { name: "Inspect ref host" }).click();
  await expect(page.getByTestId("visually-hidden-ref-result")).toHaveText("Ref host: SPAN");
});

test("RTL, narrow layout, and accessibility remain correct", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.locator("html").evaluate((node) => node.scrollWidth)).toBeLessThanOrEqual(390);
  await expect(page.getByRole("button", { name: "البحث في المشاريع المشتركة" })).toBeVisible();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test("scenario rhythm and stress cards keep labels separate from content", async ({ page }) => {
  const scenarios = await page.locator(".visually-hidden-page > .scenario").evaluateAll((nodes) => nodes.slice(0, 3).map((node) => {
    const box = node.getBoundingClientRect();
    return { bottom: box.bottom, top: box.top };
  }));
  expect(scenarios[1]!.top - scenarios[0]!.bottom).toBeGreaterThanOrEqual(32);
  expect(scenarios[2]!.top - scenarios[1]!.bottom).toBeGreaterThanOrEqual(32);

  const grid = page.getByTestId("visually-hidden-stress-grid");
  expect(parseFloat(await grid.evaluate((node) => getComputedStyle(node).gap))).toBeGreaterThanOrEqual(16);
  const panels = grid.locator(".visually-hidden-stress-panel");
  await expect(panels).toHaveCount(2);
  for (const panel of await panels.all()) {
    const layout = await panel.evaluate((node) => {
      const label = node.querySelector<HTMLElement>(".playground-specimen-label")!.getBoundingClientRect();
      const content = node.children[1]!.getBoundingClientRect();
      return {
        display: getComputedStyle(node).display,
        gap: parseFloat(getComputedStyle(node).gap),
        separated: content.top > label.bottom,
      };
    });
    expect(layout.display).toBe("grid");
    expect(layout.gap).toBeGreaterThanOrEqual(16);
    expect(layout.separated).toBe(true);
  }
});
