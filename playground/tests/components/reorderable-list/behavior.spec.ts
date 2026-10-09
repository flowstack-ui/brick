import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator } from "../../evidence-test.js";

test.beforeEach(async ({ page }) => {
  await page.goto("/reorderable-list?qualification=1");
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
  const readPointerGeometry = () => scenario.evaluate((element) => {
    const handle = element.querySelector<HTMLElement>(".brick-reorderable-list__handle")!;
    const target = element.querySelector<HTMLElement>('li[data-value="verify"]')!;
    const handleBox = handle.getBoundingClientRect();
    const targetBox = target.getBoundingClientRect();
    const handlePoint = {
      x: handleBox.x + handleBox.width / 2,
      y: handleBox.y + handleBox.height / 2,
    };
    const targetPoint = {
      x: targetBox.x + targetBox.width / 2,
      y: targetBox.y + targetBox.height * 0.8,
    };
    return {
      handleBox: { x: handleBox.x, y: handleBox.y, width: handleBox.width, height: handleBox.height },
      targetBox: { x: targetBox.x, y: targetBox.y, width: targetBox.width, height: targetBox.height },
      handlePoint,
      targetPoint,
      viewport: { width: innerWidth, height: innerHeight },
      scrollY,
      handleVisible: handleBox.top >= 0 && handleBox.bottom <= innerHeight,
      targetVisible: targetBox.top >= 0 && targetBox.bottom <= innerHeight,
      handleHit: document.elementFromPoint(handlePoint.x, handlePoint.y)?.closest("button") === handle,
      targetHit: target.contains(document.elementFromPoint(targetPoint.x, targetPoint.y)),
    };
  });
  await expect.poll(readPointerGeometry).toMatchObject({
    handleVisible: true,
    targetVisible: true,
    handleHit: true,
    targetHit: true,
  });
  const geometry = await readPointerGeometry();
  await page.mouse.move(geometry.handlePoint.x, geometry.handlePoint.y);
  await expect.poll(async () => (await readPointerGeometry()).handleHit).toBe(true);
  await page.mouse.down();
  await page.mouse.move(geometry.targetPoint.x, geometry.targetPoint.y, { steps: 8 });
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
  expect(Math.min(...targetSizes)).toBeGreaterThanOrEqual(32);
  expect(Math.max(...targetSizes)).toBeGreaterThanOrEqual(48);

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

for (const example of ["grid", "mixed"]) {
  test(`${example} projects two-dimensional destinations without hover persistence`, async ({ page }) => {
    await page.goto("/reorderable-list");
    const root = page.locator(`#${example} .brick-reorderable-list`);
    await root.scrollIntoViewIfNeeded();
    const handle = root.getByRole("button", { name: "Reorder Blue", exact: true });
    await handle.focus();
    await handle.press("Space");
    await handle.press("End");
    const projected = await root.locator(':scope > li').evaluateAll(nodes => nodes.map(node => {
      const el = node as HTMLElement;
      return { value: el.dataset.value, x: el.offsetLeft + parseFloat(el.style.getPropertyValue('--atom-reorder-x')), y: el.offsetTop + parseFloat(el.style.getPropertyValue('--atom-reorder-y')) };
    }));
    expect(projected[0]?.value).toBe('Blue');
    await handle.press("Enter");
    const committed = await root.locator(':scope > li').evaluateAll(nodes => nodes.map(node => ({ value: (node as HTMLElement).dataset.value, x: (node as HTMLElement).offsetLeft, y: (node as HTMLElement).offsetTop })));
    expect(committed[committed.length - 1]?.value).toBe('Blue');
    for (const entry of projected.filter(entry => entry.value !== 'Blue')) expect(committed.find(actual => actual.value === entry.value)).toEqual(entry);
    await expect(handle).toBeFocused();
  });
}

for (const withPreview of [false, true]) {
  test(`pointer drag cursor stays grabbing across the document (${withPreview ? "preview" : "no preview"})`, async ({ page }) => {
    if (withPreview) await page.goto('/reorderable-list?testMode=1');
    const root = withPreview ? page.locator('ol[data-slot="reorderable-list"]').first() : page.locator('#scenario-reorderable-list-overview ol');
    await root.scrollIntoViewIfNeeded();
    const handle = root.locator('.brick-reorderable-list__handle').first();
    const source = root.locator('li').first();
    const target = root.locator('li').nth(1);
    await page.evaluate(() => {
      const probe = document.createElement('button');
      probe.id = 'cursor-probe';
      probe.textContent = 'Cursor probe';
      Object.assign(probe.style, { position: 'fixed', right: '8px', bottom: '8px', cursor: 'pointer', zIndex: '99999' });
      document.body.append(probe);
    });
    const probe = page.locator('#cursor-probe');
    await expect(probe).toHaveCSS('cursor', 'pointer');
    await handle.focus();
    await handle.press('Space');
    await expect(source).toHaveAttribute('data-drag-input', 'keyboard');
    await expect(probe).toHaveCSS('cursor', 'pointer');
    await handle.press('Escape');

    for (const ending of ['drop', 'escape', 'blur', 'capture-loss']) {
      await handle.scrollIntoViewIfNeeded();
      await handle.hover();
      const h = (await handle.boundingBox())!;
      await page.mouse.move(h.x + h.width / 2, h.y + h.height / 2);
      await expect(handle).toHaveCSS('cursor', 'grab');
      await page.mouse.down();
      await page.mouse.move(h.x + h.width / 2 + 12, h.y + h.height / 2);
      await expect(source).toHaveAttribute('data-drag-input', 'pointer');
      await expect(page.locator('[data-slot="reorderable-list-preview"]')).toHaveCount(withPreview ? 1 : 0);
      for (const element of [root, root.locator('.brick-reorderable-list__content').first(), root.locator('.brick-reorderable-list__move').first(), probe]) {
        const box = (await element.boundingBox())!;
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await expect(element).toHaveCSS('cursor', 'grabbing');
      }
      await expect(page.locator('html')).toHaveCSS('cursor', 'grabbing');
      expect(await probe.evaluate(el => (el as HTMLElement).style.cursor)).toBe('pointer');
      if (ending === 'drop') {
        const box = (await target.boundingBox())!;
        await page.mouse.move(box.x + box.width / 2, box.y + box.height * .85);
        await page.mouse.up();
      } else {
        if (ending === 'escape') await page.keyboard.press('Escape');
        if (ending === 'blur') await page.evaluate(() => window.dispatchEvent(new Event('blur')));
        if (ending === 'capture-loss') await handle.dispatchEvent('lostpointercapture', { pointerId: 1 });
        await page.mouse.up();
      }
      await expect(page.locator('.brick-reorderable-list__item[data-drag-input]')).toHaveCount(0);
      await expect(probe).toHaveCSS('cursor', 'pointer');
    }
  });
}
