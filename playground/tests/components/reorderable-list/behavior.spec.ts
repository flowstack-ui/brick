import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/reorderable-list");
  await expect(page.locator("#scenario-reorderable-list-overview .brick-reorderable-list")).toBeVisible();
});

async function orderedValues(scenario: Locator) {
  return scenario.locator(".brick-reorderable-list__item").evaluateAll((nodes) =>
    nodes.map((node) => node.getAttribute("data-value")),
  );
}

test("direct movement changes stable order once and retains focus", async ({ page }) => {
  const scenario = page.locator("#scenario-reorderable-list-direct");
  const later = scenario.getByRole("button", { name: "Move Connect source later" });
  await later.focus();
  await later.press("Enter");
  expect(await orderedValues(scenario)).toEqual(["configure", "connect", "verify", "launch"]);
  await expect(scenario.getByRole("button", { name: "Move Connect source later" })).toBeFocused();
  await expect(scenario.getByRole("button", { name: "Move Configure deployment earlier" })).toBeDisabled();
  await expect(scenario.getByRole("button", { name: "Move Launch application later" })).toBeDisabled();
});

test("keyboard movement commits and Escape cancels without losing keyed focus", async ({ page }) => {
  const scenario = page.locator("#scenario-reorderable-list-input");
  const handle = scenario.getByRole("button", { name: "Reorder Connect source" });
  await handle.focus();
  await handle.press("Space");
  await handle.press("ArrowDown");
  await handle.press("Space");
  expect(await orderedValues(scenario)).toEqual(["configure", "connect", "verify", "launch"]);
  await expect(scenario.getByRole("button", { name: "Reorder Connect source" })).toBeFocused();
  await scenario.getByRole("button", { name: "Reset order" }).click();
  const resetHandle = scenario.getByRole("button", { name: "Reorder Connect source" });
  await resetHandle.focus();
  await resetHandle.press("Space");
  await resetHandle.press("ArrowDown");
  await resetHandle.press("Escape");
  expect(await orderedValues(scenario)).toEqual(["connect", "configure", "verify", "launch"]);
});

test("mouse drag commits on a valid item and abandons invalid space", async ({ page }) => {
  const scenario = page.locator("#scenario-reorderable-list-overview");
  const handle = scenario.getByRole("button", { name: "Reorder Connect source" });
  const target = scenario.locator('li[data-value="verify"]');
  const viewport = page.viewportSize();
  expect(viewport).not.toBeNull();
  const [initialHandleBox, initialTargetBox, topInset] = await Promise.all([
    handle.boundingBox(),
    target.boundingBox(),
    page.locator(".evidence-review-header").evaluate((element) => {
      const position = getComputedStyle(element).position;
      if (position !== "sticky" && position !== "fixed") return 0;
      const bounds = element.getBoundingClientRect();
      return Math.max(0, bounds.y + bounds.height);
    }),
  ]);
  expect(initialHandleBox).not.toBeNull();
  expect(initialTargetBox).not.toBeNull();
  const dragRegionHeight = initialTargetBox!.y + initialTargetBox!.height - initialHandleBox!.y;
  const availableHeight = viewport!.height - topInset;
  expect(dragRegionHeight).toBeLessThan(availableHeight);
  const desiredHandleY = topInset + (availableHeight - dragRegionHeight) / 2;
  await page.evaluate((scrollDelta) => {
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollBy(0, scrollDelta);
  }, initialHandleBox!.y - desiredHandleY);
  await page.evaluate(() => new Promise<void>((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
  ));
  const [handleBox, targetBox] = await Promise.all([handle.boundingBox(), target.boundingBox()]);
  expect(handleBox!.y).toBeGreaterThanOrEqual(0);
  expect(handleBox!.y + handleBox!.height).toBeLessThanOrEqual(viewport!.height);
  expect(targetBox!.y).toBeGreaterThanOrEqual(0);
  expect(targetBox!.y + targetBox!.height).toBeLessThanOrEqual(viewport!.height);
  expect(await handle.evaluate((element) => {
    const bounds = element.getBoundingClientRect();
    return document.elementFromPoint(
      bounds.x + bounds.width / 2,
      bounds.y + bounds.height / 2,
    )?.closest("button") === element;
  })).toBe(true);
  expect(await target.evaluate((element) => {
    const bounds = element.getBoundingClientRect();
    return element.contains(document.elementFromPoint(
      bounds.x + bounds.width / 2,
      bounds.y + bounds.height * 0.8,
    ));
  })).toBe(true);
  await page.mouse.move(handleBox!.x + handleBox!.width / 2, handleBox!.y + handleBox!.height / 2);
  await page.mouse.down();
  await page.mouse.move(targetBox!.x + targetBox!.width / 2, targetBox!.y + targetBox!.height * 0.8, { steps: 8 });
  const indicator = target.locator('[data-slot="reorderable-list-drop-indicator"]');
  await expect(indicator).toHaveAttribute("data-state", "active");
  await expect(indicator).toHaveAttribute("data-position", "after");
  await page.mouse.up();
  expect(await orderedValues(scenario)).toEqual(["configure", "verify", "connect", "launch"]);

  await scenario.getByRole("button", { name: "Reset order" }).click();
  const nextHandleBox = await scenario.getByRole("button", { name: "Reorder Connect source" }).boundingBox();
  await page.mouse.move(nextHandleBox!.x + nextHandleBox!.width / 2, nextHandleBox!.y + nextHandleBox!.height / 2);
  await page.mouse.down();
  await page.mouse.move(2, 2, { steps: 8 });
  await page.mouse.up();
  expect(await orderedValues(scenario)).toEqual(["connect", "configure", "verify", "launch"]);
});

test("recipes, targets, focus rings, states, and narrow geometry remain complete", async ({ page }) => {
  const recipeRoots = page.locator("#scenario-reorderable-list-recipes .brick-reorderable-list");
  await expect(recipeRoots.nth(0)).toHaveAttribute("data-variant", "outline");
  await expect(recipeRoots.nth(1)).toHaveAttribute("data-variant", "soft");
  const targetSizes = await page.locator("#scenario-reorderable-list-recipes .brick-reorderable-list__handle").evaluateAll((nodes) => nodes.map((node) => node.getBoundingClientRect().height));
  expect(Math.min(...targetSizes)).toBeGreaterThanOrEqual(44);

  const focusControl = page.locator("#scenario-reorderable-list-overview").getByRole("button", { name: "Reorder Connect source" });
  await focusControl.focus();
  const controlBox = await focusControl.boundingBox();
  const itemBox = await focusControl.locator("xpath=ancestor::li").boundingBox();
  expect(controlBox!.x).toBeGreaterThan(itemBox!.x);
  expect(controlBox!.y).toBeGreaterThan(itemBox!.y);

  const states = page.locator("#scenario-reorderable-list-states .brick-reorderable-list");
  await expect(states.nth(0)).toHaveAttribute("data-disabled", "");
  await expect(states.nth(1)).toHaveAttribute("data-readonly", "");
  await expect(states.nth(0).getByRole("button").first()).toBeDisabled();
  await expect(states.nth(1).getByRole("button").first()).toBeDisabled();

  await page.setViewportSize({ width: 320, height: 800 });
  expect(await page.locator("html").evaluate((node) => node.scrollWidth)).toBeLessThanOrEqual(320);
  const narrowItem = page.locator(".reorderable-list-narrow .brick-reorderable-list__item").first();
  const [narrowContentBox, narrowActionsBox] = await Promise.all([
    narrowItem.locator(".brick-reorderable-list__content").boundingBox(),
    narrowItem.locator(".brick-reorderable-list__actions").boundingBox(),
  ]);
  expect(narrowContentBox!.width).toBeGreaterThanOrEqual(120);
  expect(narrowActionsBox!.y).toBeGreaterThanOrEqual(narrowContentBox!.y + narrowContentBox!.height);
});

test("horizontal and RTL compositions preserve logical containment", async ({ page }) => {
  await page.setViewportSize({ width: 1120, height: 900 });
  const scenario = page.locator("#scenario-reorderable-list-direction");
  const horizontal = scenario.locator('[data-orientation="horizontal"]');
  await expect(horizontal).toHaveCSS("overflow-x", "auto");
  expect(await horizontal.evaluate((node) => node.scrollWidth)).toBeGreaterThanOrEqual(await horizontal.evaluate((node) => node.clientWidth));
  const rtl = scenario.locator('[dir="rtl"] .brick-reorderable-list__item').first();
  const [handleBox, contentBox, actionsBox] = await Promise.all([
    rtl.locator(".brick-reorderable-list__handle").boundingBox(),
    rtl.locator(".brick-reorderable-list__content").boundingBox(),
    rtl.locator(".brick-reorderable-list__actions").boundingBox(),
  ]);
  expect(handleBox!.x).toBeGreaterThan(contentBox!.x);
  expect(contentBox!.x).toBeGreaterThan(actionsBox!.x);
});

test("Reorderable List has no automated accessibility violations", async ({ page }) => {
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
