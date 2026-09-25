import { expect, test } from "../../evidence-test.js";

test("AppBar responsive layout and spacing resolve at breakpoints", async ({ page }) => {
  await page.goto("/app-bar");
  const row = page.locator('#density .brick-app-bar-toolbar').last();
  await page.setViewportSize({ width: 600, height: 900 });
  await expect(row).toHaveCSS("display", "grid");
  await expect(row).toHaveCSS("min-height", "64px");
  await expect(row).toHaveCSS("column-gap", "8px");
  await page.setViewportSize({ width: 800, height: 900 });
  await expect(row).toHaveCSS("display", "flex");
  await expect(row).toHaveCSS("min-height", "48px");
  await expect(row).toHaveCSS("padding-inline-start", "0px");
  await expect(row).toHaveCSS("column-gap", "16px");
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(row).not.toHaveCSS("padding-inline-start", "0px");
});

test("AppBar narrow navigation avoids overlap and opens its drawer", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/app-bar");
  const root = page.locator('#responsive .brick-app-bar');
  const start = await root.locator('.brick-app-bar-start').boundingBox();
  const end = await root.locator('.brick-app-bar-end').boundingBox();
  expect(start!.x + start!.width).toBeLessThanOrEqual(end!.x);
  await root.getByRole('button', { name: 'Menu', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'Workspace navigation' })).toBeVisible();
  await page.getByRole('button', { name: 'Close navigation' }).click();
  await expect(root.getByRole('button', { name: 'Menu', exact: true })).toBeFocused();
});

test("AppBar elevation, contextual actions and fixed dismissal work", async ({ page }) => {
  await page.goto("/app-bar");
  const shadows = await page.locator('#effects .brick-app-bar[data-elevation]').evaluateAll(
    elements => elements.slice(0, 4).map(element => getComputedStyle(element).boxShadow));
  expect(shadows[0]).toBe('none');
  expect(new Set(shadows).size).toBe(4);
  const colored = page.locator('#actions .brick-app-bar');
  const settings = colored.getByRole('button', { name: 'Settings' });
  expect(await settings.evaluate(e => getComputedStyle(e).color)).toBe(await colored.evaluate(e => getComputedStyle(e).color));
  await settings.click();
  await expect(page.getByRole('dialog', { name: 'Workspace settings' })).toBeVisible();
  await page.getByRole('button', { name: 'Done', exact: true }).click();
  const trigger = page.getByRole('button', { name: 'Show fixed bar' });
  await trigger.click();
  await expect(page.locator('#fixed .brick-app-bar')).toHaveCSS('top', '16px');
  await page.getByRole('button', { name: 'Close fixed bar' }).click();
  await expect(trigger).toBeFocused();
});
