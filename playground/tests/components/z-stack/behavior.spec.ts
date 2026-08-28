import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/z-stack"); });

test("ZStack overlaps children in source order with logical placement", async ({ page }) => {
  const overview = page.getByTestId("z-stack-overview");
  await expect(overview).toHaveCSS("display", "grid");
  await expect(overview.locator(":scope > *")).toHaveCount(2);
  for (const child of await overview.locator(":scope > *").all()) {
    await expect(child).toHaveCSS("grid-area", "1 / 1");
    await expect(child).toHaveCSS("z-index", "0");
  }
  await expect(overview).toHaveCSS("isolation", "isolate");
  const topLayer = await overview.evaluate((root) => {
    const overlay = root.children[1] as HTMLElement;
    const box = overlay.getBoundingClientRect();
    const element = document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2);
    return element?.closest('[data-slot="z-stack-item"]') === overlay;
  });
  expect(topLayer).toBe(true);
  const placement = page.getByTestId("z-stack-placement");
  await expect(placement.getByText("Top start").locator("xpath=parent::*")).toHaveCSS("align-self", "start");
  await expect(placement.getByText("Center").locator("xpath=parent::*")).toHaveCSS("justify-self", "center");
  await expect(placement.getByText("Bottom end").locator("xpath=parent::*")).toHaveCSS("align-self", "end");
});

test("composition, focus order, reflow, and accessibility remain authored", async ({ page }) => {
  const composedRoot = page.getByTestId("z-stack-composition");
  const composedAction = composedRoot.getByRole("button", { name: "Composed action" });
  await expect(composedRoot).toHaveCSS("isolation", "auto");
  await expect(composedAction).toHaveClass(/brick-z-stack-item/);
  await expect(composedAction).toHaveCSS("z-index", "2");
  await expect(composedAction).toHaveCSS("margin", "12px");
  const actions = page.getByTestId("z-stack-stress").getByRole("button");
  await actions.first().focus();
  await page.keyboard.press("Tab");
  await expect(actions.nth(1)).toBeFocused();
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test("responsive placement moves the same layer without changing depth order", async ({ page }) => {
  const root = page.getByTestId("z-stack-stress");
  const children = root.locator(":scope > *");
  await expect(children).toHaveCount(2);

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(children.nth(1)).toHaveCSS("align-self", "end");
  await expect(children.nth(1)).toHaveCSS("justify-self", "start");

  await page.setViewportSize({ width: 900, height: 900 });
  await expect(children.nth(1)).toHaveCSS("align-self", "center");
  await expect(children.nth(1)).toHaveCSS("justify-self", "center");
  await expect(children).toHaveCount(2);
});
