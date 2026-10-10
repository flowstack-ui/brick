import { expect, test } from "../../evidence-test.js";

test.beforeEach(async ({ page }) => { await page.goto('/frame?testMode=1'); });

test("docs keep composed controls intact before and after sparse activation", async ({ page }) => {
  for (const width of [390, 479, 480, 767, 768, 1023, 1024, 1279, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    const normal = page.getByRole('button', { name: 'Normal control', exact: true });
    const composed = page.getByRole('button', { name: 'Composed control', exact: true });
    const measure = (element: Element) => {
      const s = getComputedStyle(element);
      return { height: s.height, minHeight: s.minHeight, padding: s.padding };
    };
    expect(await composed.evaluate(measure)).toEqual(await normal.evaluate(measure));
    await expect(composed).toHaveCSS('max-width', width >= 1024 ? '320px' : await normal.evaluate(el => getComputedStyle(el).maxWidth));
  }
});

test("responsive constraints and a real bounded scroll owner work", async ({ page }) => {
  const frame = page.locator('#responsive .brick-frame');
  for (const [width, maximum] of [[390, '100%'], [800, '384px'], [1280, '512px']] as const) {
    await page.setViewportSize({ width, height: 900 });
    await expect(frame).toHaveCSS('max-width', maximum);
  }
  const scroll = page.locator('#bounded-scrolling .brick-scroll-area-viewport');
  await expect(scroll).toHaveCSS('height', '192px');
  expect(await scroll.evaluate(el => el.scrollHeight > el.clientHeight)).toBe(true);
  await scroll.evaluate(el => { el.scrollTop = 100; });
  expect(await scroll.evaluate(el => el.scrollTop)).toBeGreaterThan(0);
  await expect(page.getByRole('heading', { name: 'Props', exact: true })).toBeVisible();
  await expect(page.getByRole('table', { name: 'Frame props' })).toBeVisible();
  await page.locator('#composition').getByRole('tab', { name: 'Code', exact: true }).click();
  await expect(page.locator('#composition')).toContainText('maxInlineSize');
});
