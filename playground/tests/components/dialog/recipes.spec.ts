import { expect, test } from "../../evidence-test.js";

test("Dialog docs exposes recipe sections and named multipart props", async ({ page }) => {
  await page.goto("/dialog");
  for (const id of ["sizes", "cover", "full", "responsive", "placement", "retained", "inside", "outside", "motion", "props-positioner", "props-content"]) {
    await expect(page.locator(`#${id}`)).toBeAttached();
  }
  await expect(page.getByRole("table", { name: "Dialog Positioner props", exact: true })).toBeVisible();
});

test("Dialog retained counter survives close and reopen", async ({ page }) => {
  await page.goto("/dialog");
  await page.getByRole("button", { name: "Open retained", exact: true }).click();
  await page.getByRole("button", { name: "Count: 0", exact: true }).click();
  await page.getByRole("button", { name: "Cancel", exact: true }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.getByRole("button", { name: "Open retained", exact: true }).click();
  await expect(page.getByRole("button", { name: "Count: 1", exact: true })).toBeVisible();
});

test("Dialog sizes share insets and expose the intended desktop widths", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/dialog");
  for (const [size, width] of [["xs", 384], ["sm", 448], ["md", 512], ["lg", 672], ["xl", 896]] as const) {
    await page.locator("#sizes").getByRole("button", { name: size, exact: true }).click();
    const panel = page.getByRole("dialog");
    await expect.poll(async () => Math.round((await panel.boundingBox())!.width)).toBe(width);
    await expect(panel.locator('[data-slot="dialog-body"]')).toHaveCSS("padding-left", "24px");
    await expect(panel).toHaveCSS("font-size", "14px");
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
  }
});

test("Dialog positioner dismisses only its direct target and nested top layer", async ({ page }) => {
  await page.goto("/dialog");
  await page.getByRole("button", { name: "Open parent", exact: true }).click();
  await page.getByRole("button", { name: "Open child", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "Child dialog", exact: true })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Child dialog", exact: true })).toHaveCount(0);
  const parent = page.getByRole("dialog", { name: "Dialog title", exact: true });
  await parent.getByRole("heading").click();
  await expect(parent).toBeVisible();
  await page.locator('[data-slot="dialog-positioner"][data-state="open"]').click({ position: { x: 5, y: 5 } });
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Open parent", exact: true })).toBeFocused();
});

test("Dialog responsive full geometry resets at every breakpoint", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 700 });
  await page.goto("/dialog");
  await page.getByRole("button", { name: "Open responsive", exact: true }).click();
  const panel = page.getByRole("dialog");
  await expect.poll(async () => Math.round((await panel.boundingBox())!.width)).toBe(390);
  for (const [width, expected] of [[1000, 672], [640, 640], [1300, 672], [390, 390]]) {
    await page.setViewportSize({ width, height: 700 });
    await expect.poll(async () => Math.round((await panel.boundingBox())!.width)).toBe(expected);
  }
});

test("Dialog narrow short viewport can reach the complete final action", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 240 });
  await page.goto("/dialog");
  await page.getByRole("button", { name: "Open dialog", exact: true }).click();
  await expect(page.getByRole("dialog")).toHaveAttribute("data-state", "open");
  await page.getByRole("dialog").evaluate(async el => { await Promise.all(el.getAnimations().map(animation => animation.finished)); });
  const save = page.getByRole("button", { name: "Save changes", exact: true });
  await save.scrollIntoViewIfNeeded();
  const box = await save.boundingBox();
  expect(box!.y).toBeGreaterThanOrEqual(0);
  expect(box!.y + box!.height).toBeLessThanOrEqual(240);
  await expect(save).toBeVisible();
  await page.getByRole("button", { name: "Cancel", exact: true }).click();
  await expect(page.getByRole("button", { name: "Open dialog", exact: true })).toBeFocused();
});

test("Dialog inside and outside scrolling keep final actions reachable", async ({ page }) => {
  await page.setViewportSize({ width: 900, height: 640 });
  await page.goto("/dialog");
  for (const mode of ["inside", "outside"]) {
    await page.getByRole("button", { name: `Open ${mode} scroll`, exact: true }).click();
    const panel = page.getByRole("dialog");
    const body = panel.locator('[data-slot="dialog-body"]');
    if (mode === "inside") expect(await body.evaluate(el => el.scrollHeight > el.clientHeight)).toBe(true);
    const cancel = panel.getByRole("button", { name: "Cancel", exact: true });
    await cancel.scrollIntoViewIfNeeded();
    const box = await cancel.boundingBox();
    expect(box!.y + box!.height).toBeLessThanOrEqual(640);
    await cancel.click();
    await expect(page.getByRole("dialog")).toHaveCount(0);
  }
});
