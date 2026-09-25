import { expect, test } from "../../evidence-test.js";

test.beforeEach(async ({ page }) => {
  await page.goto("/reorderable-list?appearance=light&testMode=1");
});

test("docs expose paired examples and named part tables", async ({ page }) => {
  for (const id of ["grid", "mixed", "direct", "responsive", "horizontal", "states", "preview", "scroll", "recovery", "props-root", "props-preview"]) {
    await expect(page.locator(`#${id}`)).toBeVisible();
  }
  await expect(page.locator('[data-slot="reorderable-list"]').first()).toBeVisible();
});

test("horizontal RTL keyboard movement follows logical order", async ({ page }) => {
  await page.goto('/reorderable-list?exampleDirection=rtl&testMode=1');
  const root = page.locator('#horizontal ol');
  const handle = root.getByRole('button', { name: 'Reorder Research', exact: true });
  await handle.focus();
  await handle.press('Space');
  await handle.press('ArrowLeft');
  await handle.press('Space');
  await expect(root.locator('li').nth(1)).toHaveAttribute('data-value', 'Research');
  await expect(handle).toBeFocused();
});

test("independent row controls keep state without starting a drag", async ({ page }) => {
  const section = page.locator('#rich-content');
  const checkbox = section.getByRole('checkbox', { name: 'Complete Research' });
  await checkbox.click();
  await expect(checkbox).toBeChecked();
  await expect(page.locator('[data-slot="reorderable-list-preview"]')).toHaveCount(0);
  await section.getByRole('button', { name: 'Move Research later', exact: true }).click();
  await expect(section.locator('li').nth(1)).toHaveAttribute('data-value', 'Research');
  await expect(checkbox).toBeChecked();
});

test("pointer preview follows the pointer, displaces siblings and commits once", async ({ page }) => {
  const root = page.locator('ol[data-slot="reorderable-list"]').first();
  await root.scrollIntoViewIfNeeded();
  const handle = root.getByRole("button", { name: "Reorder Research", exact: true });
  const row = root.locator('li[data-value="Research"]');
  const second = root.locator('li[data-value="Design"]');
  const a = await handle.boundingBox();
  const b = await second.boundingBox();
  await page.mouse.move(a!.x + a!.width / 2, a!.y + a!.height / 2);
  await page.mouse.down();
  await page.mouse.move(b!.x + 50, b!.y + b!.height * .85, { steps: 8 });
  const preview = page.locator('[data-slot="reorderable-list-preview"]');
  await expect(preview).toBeVisible();
  await expect(preview).toHaveAttribute("aria-hidden", "true");
  await expect(preview).toHaveAttribute("inert", "");
  await expect(preview.locator('.brick-reorderable-list__handle svg circle')).toHaveCount(6);
  await expect(preview.locator('.brick-reorderable-list__content')).toHaveText('Research');
  await expect(preview.locator('button, [tabindex]')).toHaveCount(0);
  await expect(row).toHaveAttribute("data-previewing", "");
  await expect(row).toHaveCSS("opacity", "0");
  await expect.poll(() => second.evaluate(node => parseFloat(getComputedStyle(node).translate.split(" ")[1]))).toBeLessThan(-20);
  await expect(root.locator("li")).toHaveCount(3);
  await page.screenshot({ path: "test-results/reorder-preview-light.png" });
  await page.mouse.up();
  await expect(preview).toHaveCount(0);
  await expect.poll(() => root.locator("li").evaluateAll(nodes => nodes.map(n => n.getAttribute("data-value")))).toEqual(["Design", "Research", "Build"]);
  await expect.poll(() => second.evaluate(node => getComputedStyle(node).translate.split(" ").every(part => parseFloat(part) === 0))).toBe(true);
});

test("Escape cancels the preview and responsive recipes scale controls", async ({ page }) => {
  const root = page.locator('#responsive ol');
  await page.setViewportSize({ width: 700, height: 900 });
  const handle = root.locator('button').first();
  const coarse = await page.evaluate(() => matchMedia("(pointer: coarse)").matches);
  await expect(handle).toHaveCSS("height", coarse ? "44px" : "32px");
  await page.setViewportSize({ width: 1200, height: 900 });
  await expect(handle).toHaveCSS("height", "48px");
  await root.scrollIntoViewIfNeeded();
  const box = await handle.boundingBox();
  await page.mouse.move(box!.x + 20, box!.y + 20);
  await page.mouse.down();
  await page.mouse.move(box!.x + 60, box!.y + 40);
  await expect(page.locator('[data-slot="reorderable-list-preview"]')).toBeVisible();
  await page.keyboard.press("Escape");
  await page.mouse.up();
  await expect(page.locator('[data-slot="reorderable-list-preview"]')).toHaveCount(0);
  await expect(root.locator("li").first()).toHaveAttribute("data-value", "Research");
});

test("edge auto-scroll advances the nested viewport without a drop", async ({ page }) => {
  const section = page.locator('#scroll');
  const viewport = section.locator('[data-slot="scroll-area-viewport"]');
  await viewport.scrollIntoViewIfNeeded();
  const handle = section.getByRole("button", { name: "Reorder Research", exact: true });
  const a = await handle.boundingBox();
  const bounds = await viewport.boundingBox();
  await page.mouse.move(a!.x + 15, a!.y + 15);
  await page.mouse.down();
  await page.mouse.move(a!.x + 15, bounds!.y + bounds!.height - 8, { steps: 8 });
  await expect.poll(() => viewport.evaluate(node => node.scrollTop)).toBeGreaterThan(30);
  await page.keyboard.press("Escape");
  await page.mouse.up();
  await expect(section.locator('li').first()).toHaveAttribute("data-value", "Research");
  await viewport.evaluate(node => { node.scrollTop = 0; });
  const reset = await handle.boundingBox();
  const clip = await viewport.boundingBox();
  await page.mouse.move(reset!.x + 15, reset!.y + 15);
  await page.mouse.down();
  await page.mouse.move(reset!.x + 15, clip!.y + clip!.height + 20, { steps: 8 });
  await page.mouse.up();
  await expect(section.locator('li').first()).toHaveAttribute("data-value", "Research");
});

test("reduced motion and dark preview keep readable state", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/reorderable-list?appearance=dark&testMode=1");
  const root = page.locator('ol[data-slot="reorderable-list"]').first();
  await root.scrollIntoViewIfNeeded();
  await expect(root.locator('li').first()).toHaveCSS("transition-duration", "0s");
  const a = await root.locator('button').first().boundingBox();
  await page.mouse.move(a!.x + 15, a!.y + 15);
  await page.mouse.down();
  await page.mouse.move(a!.x + 80, a!.y + 50);
  await expect(page.locator('[data-slot="reorderable-list-preview"]')).toBeVisible();
  await page.screenshot({ path: "test-results/reorder-preview-dark.png" });
  await page.keyboard.press("Escape");
  await page.mouse.up();
});

test("dialog preview escapes body clipping and closes with the owner", async ({ page }) => {
  await page.getByRole("button", { name: "Arrange milestones" }).click();
  const dialog = page.getByRole("dialog");
  const handle = dialog.getByRole("button", { name: "Reorder Research", exact: true });
  const box = await handle.boundingBox();
  await page.mouse.move(box!.x + 15, box!.y + 15);
  await page.mouse.down();
  await page.mouse.move(box!.x + 80, box!.y + 80, { steps: 8 });
  const preview = page.locator('[data-slot="reorderable-list-preview"]');
  await expect(preview).toBeVisible();
  expect(await preview.evaluate(node => node.closest('[data-slot="dialog-body"]'))).toBeNull();
  expect(await preview.evaluate(node => node.parentElement?.getAttribute("data-slot"))).toBe("dialog-positioner");
  await page.keyboard.press("Escape");
  await page.mouse.up();
  await expect(preview).toHaveCount(0);
  await expect(dialog).toBeVisible();
});

test("emulated touch hold lifts and pointercancel abandons movement", async ({ page }) => {
  const root = page.locator('ol[data-slot="reorderable-list"]').first();
  await root.scrollIntoViewIfNeeded();
  const handle = root.getByRole('button', { name: 'Reorder Research', exact: true });
  const box = await handle.boundingBox();
  const pointer = { pointerId: 7, pointerType: 'touch', clientX: box!.x + 15, clientY: box!.y + 15, button: 0, buttons: 1, bubbles: true };
  // Synthetic events have no browser-owned pointer ID. Real capture is covered
  // by the mouse tests; this case isolates the touch hold/cancellation policy.
  await handle.evaluate(node => { node.setPointerCapture = () => {}; node.hasPointerCapture = () => false; });
  await handle.dispatchEvent('pointerdown', pointer);
  await expect(page.locator('[data-slot="reorderable-list-preview"]')).toBeVisible();
  await handle.dispatchEvent('pointercancel', pointer);
  await expect(page.locator('[data-slot="reorderable-list-preview"]')).toHaveCount(0);
  await expect(root.locator('li').first()).toHaveAttribute('data-value', 'Research');
});

test("grid pointer preview keeps size and siblings arrive at their measured destinations", async ({ page }) => {
  const root = page.locator('#grid ol');
  await root.scrollIntoViewIfNeeded();
  const handle = root.getByRole('button', { name: 'Reorder Blue', exact: true });
  const source = root.locator('li[data-value="Blue"]');
  const target = root.locator('li[data-value="Light blue"]');
  const h = (await handle.boundingBox())!;
  const s = (await source.boundingBox())!;
  const t = (await target.boundingBox())!;
  await page.mouse.move(h.x + h.width / 2, h.y + h.height / 2);
  await page.mouse.down();
  await page.mouse.move(t.x + t.width * 0.8, t.y + t.height / 2, { steps: 1 });
  const preview = page.locator('[data-slot="reorderable-list-preview"]');
  await expect(preview).toBeVisible();
  const p = (await preview.boundingBox())!;
  expect(Math.abs(p.width - s.width)).toBeLessThan(1);
  expect(Math.abs(p.height - s.height)).toBeLessThan(1);
  const grip = (await preview.locator('.brick-reorderable-list__handle').boundingBox())!;
  expect(Math.abs((grip.x - p.x) - (h.x - s.x))).toBeLessThan(1);
  expect(Math.abs((grip.y - p.y) - (h.y - s.y))).toBeLessThan(1);
  const projected = await root.locator(':scope > li').evaluateAll(nodes => nodes.map(node => {
    const el = node as HTMLElement;
    return { value: el.dataset.value, x: el.offsetLeft + parseFloat(el.style.getPropertyValue('--atom-reorder-x')), y: el.offsetTop + parseFloat(el.style.getPropertyValue('--atom-reorder-y')) };
  }));
  await page.mouse.up();
  await expect(root.locator('li').last()).toHaveAttribute('data-value', 'Blue');
  for (const entry of projected.filter(entry => entry.value !== 'Blue')) {
    const item = root.locator(`li[data-value="${entry.value}"]`);
    await expect.poll(() => item.evaluate(el => ({x: (el as HTMLElement).offsetLeft, y: (el as HTMLElement).offsetTop}))).toEqual({ x: entry.x, y: entry.y });
    await expect.poll(() => item.evaluate(el => getComputedStyle(el).translate.split(' ').every(value => parseFloat(value) === 0))).toBe(true);
  }
  await expect(preview).toHaveCount(0);
});
