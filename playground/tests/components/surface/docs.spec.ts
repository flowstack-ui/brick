import { expect, test } from "../../evidence-test.js";

test("media uses the edge-to-edge studio asset and elevation specimens keep equal geometry", async ({ page }) => {
  await page.goto('/surface');
  const image = page.locator('#media img');
  await expect(image).toHaveAttribute('src', '/assets/image/studio.webp');
  await expect.poll(() => image.evaluate(el => (el as HTMLImageElement).naturalWidth)).toBe(768);
  const owner = page.locator('#media .brick-surface:has(> .brick-surface__media)');
  const surfaceBox = (await owner.boundingBox())!;
  const imageBox = (await image.boundingBox())!;
  for (const key of ['x', 'y', 'width', 'height'] as const) expect(imageBox[key]).toBeCloseTo(surfaceBox[key], 0);
  for (const elevation of ['low', 'medium', 'high']) {
    const sample = page.locator(`#elevation [data-elevation="${elevation}"]`);
    await expect(sample).toHaveCSS('width', '128px');
    await expect(sample).toHaveCSS('height', '128px');
    await expect(sample).toHaveAttribute('data-level', 'raised');
    await expect(sample).toHaveCSS('z-index', 'auto');
  }
});

test("transparent paint and shared elevations remain independent", async ({ page }) => {
  await page.goto("/surface");
  const clear = page.locator('#levels .brick-surface[data-level="transparent"]');
  await expect(clear).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  await expect(clear).toHaveCSS('border-top-width', '1px');
  const accent = page.locator('#tones .brick-surface[data-level="transparent"]');
  const pair = await accent.evaluate(el => { const c = getComputedStyle(el); return [c.color, c.getPropertyValue('--brick-color-accent-text').trim()]; });
  expect(pair[0]).not.toBe('rgb(255, 255, 255)');
  for (const [level, token] of [['low','sm'],['medium','floating'],['high','modal']]) {
    const el = page.locator(`#elevation .brick-surface[data-elevation="${level}"]`);
    expect(await el.evaluate((el, token) => getComputedStyle(el).getPropertyValue(`--brick-surface-elevation-${token[0]}`).trim() === getComputedStyle(el).getPropertyValue(`--brick-shadow-${token[1]}`).trim(), [level,token])).toBe(true);
  }
  for (const part of ['Root','Media','Scrim','Content']) await expect(page.getByRole('table', { name: `Surface.${part} props`, exact: true })).toBeVisible();
});

test("Scrim respects its own resolved direction", async ({ page }) => {
  await page.goto('/surface');
  const scrim=page.locator('#scrims .brick-surface__scrim[data-direction="inline-start"]');
  await scrim.evaluate(el=>el.setAttribute('dir','rtl'));
  await expect(scrim).toHaveCSS('background-image', /to left/);
  await scrim.evaluate(el=>el.setAttribute('dir','ltr'));
  await expect(scrim).toHaveCSS('background-image', /to right/);
});
