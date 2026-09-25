import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '../../evidence-test.js';
test.beforeEach(async ({ page }) => { await page.goto('/z-stack?testMode=1'); });

test('responsive placement and spacing preserve one layer', async ({ page }) => {
  const item = page.locator('#responsive .brick-z-stack-item');
  for (const [width, margin] of [[390,'12px'],[480,'16px'],[768,'20px'],[1024,'24px'],[1280,'32px']] as const) {
    await page.setViewportSize({ width, height: 900 });
    await expect(item).toHaveCount(1);
    await expect(item).toHaveCSS('margin', margin);
    await expect(item).toHaveCSS('align-self', width >= 768 ? 'start' : 'end');
    await expect(item).toHaveCSS('justify-self', width >= 768 ? 'end' : 'start');
  }
});

test('natural sizing, shared hosts and contained actions', async ({ page }) => {
  const natural = page.locator('#natural-sizing .brick-z-stack');
  const geometry = await natural.evaluate(root => ({
    height: root.getBoundingClientRect().height,
    largestChild: Math.max(...Array.from(root.children, child => child.getBoundingClientRect().height)),
  }));
  expect(geometry.height).toBeGreaterThanOrEqual(160);
  expect(geometry.height).toBeCloseTo(geometry.largestChild, 1);
  const host = page.locator('#composition article');
  await expect(host).toHaveClass(/brick-z-stack/);
  await expect(host).toHaveClass(/brick-surface/);
  await expect(host).toHaveClass(/brick-frame/);
  await expect(host.getByRole('button')).toHaveClass(/brick-z-stack-item/);
  const root = page.locator('#layers .brick-z-stack');
  await expect(root).toHaveCSS('isolation', 'isolate');
  const first = root.getByRole('button', { name: 'First action' });
  const second = root.getByRole('button', { name: 'Second action' });
  await first.click();
  await first.focus();
  await page.keyboard.press('Tab');
  await expect(second).toBeFocused();
  await second.click();
  await expect(second).toHaveCSS('z-index', '2');
  expect(await second.evaluate(el => parseFloat(getComputedStyle(el).minBlockSize))).toBeGreaterThan(0);
});

test('named props parts and narrow RTL docs stay accessible', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const toc = page.getByRole('navigation', { name: 'On this page' });
  await toc.getByRole('link', { name: 'Item', exact: true }).click();
  await expect(page).toHaveURL(/#props-item/);
  await expect(page.locator('#props-root').getByRole('table', { name: 'ZStack.Root props' })).toBeVisible();
  await expect(page.locator('#props-item').getByRole('table', { name: 'ZStack.Item props' })).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/z-stack?testMode=1&exampleDirection=rtl&appearance=dark');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  expect((await new AxeBuilder({page}).analyze()).violations).toEqual([]);
});
