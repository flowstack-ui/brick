import { expect, test } from '../../evidence-test.js';

test('responsive edge spacing works without playground overrides', async ({ page }) => {
  await page.goto('/z-stack?qualification=1');
  await page.evaluate(() => {
    const root = document.createElement('div');
    root.className = 'brick-z-stack';
    root.id = 'z-spacing-probe';
    const item = document.createElement('div');
    item.className = 'brick-z-stack-item';
    item.textContent = 'Spacing probe';
    for (const [key, value] of [['', '4px'], ['-sm', '8px'], ['-md', '12px'], ['-lg', '16px'], ['-xl', '20px']]) {
      item.setAttribute(`data-edge-spacing${key}`, value);
      item.style.setProperty(`--brick-z-stack-item-edge-spacing${key}-input`, value);
    }
    root.append(item);
    document.body.append(root);
  });
  const item = page.locator('#z-spacing-probe > *');
  for (const [width, margin] of [[390,'4px'], [480,'8px'], [768,'12px'], [1024,'16px'], [1280,'20px']] as const) {
    await page.setViewportSize({ width, height: 900 });
    await expect(item).toHaveCSS('margin', margin);
  }
});

test('direct controls keep their component minimum size', async ({ page }) => {
  await page.goto('/z-stack?qualification=1');
  const result = await page.getByRole('button', { name: 'Composed action' }).evaluate(button => {
    const clone = button.cloneNode(true) as HTMLElement;
    clone.classList.remove('brick-z-stack-item');
    const container = document.createElement('div');
    container.append(clone);
    document.body.append(container);
    const before = getComputedStyle(clone).minBlockSize;
    container.classList.add('brick-z-stack');
    const after = getComputedStyle(clone).minBlockSize;
    container.remove();
    return { before, after };
  });
  expect(result.after).toBe(result.before);
});

test('nested Items isolate sparse inputs and preserve unauthored margins', async ({ page }) => {
  await page.goto('/z-stack?qualification=1');
  await page.evaluate(() => {
    const parent = document.createElement('div');
    parent.className = 'brick-z-stack-item';
    parent.style.setProperty('--brick-z-stack-item-edge-spacing-md-input', '60px');
    const child = document.createElement('div');
    child.id = 'z-nested-probe';
    child.className = 'brick-z-stack-item';
    child.setAttribute('data-edge-spacing-lg', '12px');
    child.style.setProperty('--brick-z-stack-item-edge-spacing-lg-input', '12px');
    parent.append(child);
    document.body.append(parent);
  });
  await page.setViewportSize({width:800,height:900});
  await expect(page.locator('#z-nested-probe')).toHaveCSS('margin', '0px');
  await page.setViewportSize({width:1100,height:900});
  await expect(page.locator('#z-nested-probe')).toHaveCSS('margin', '12px');
  await page.setViewportSize({width:1400,height:900});
  await expect(page.locator('#z-nested-probe')).toHaveCSS('margin', '12px');
});
