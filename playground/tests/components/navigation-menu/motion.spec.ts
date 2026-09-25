import { expect, test } from "../../evidence-test.js";

test("shared panels overlap during exchange and settle inside the viewport border", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/navigation-menu");
  const root = page.locator('[data-component-page="navigation-menu"] nav').first();
  await root.getByRole("button", { name: "Learn", exact: true }).click();
  const viewport = root.locator('.brick-navigation-menu__viewport');
  await expect(viewport).toBeVisible();
  await expect(viewport).toHaveAttribute("data-anchor", "navigation");
  // Wait for the first panel's animation, not an arbitrary screenshot timeout.
  await viewport.evaluate(async node => {
    await Promise.all(node.getAnimations({ subtree: true }).map(animation => animation.finished.catch(() => {})));
  });
  const frames = await root.evaluate(async node => {
    const viewport = node.querySelector<HTMLElement>('.brick-navigation-menu__viewport')!;
    const buttons = node.querySelectorAll<HTMLButtonElement>('.brick-navigation-menu__trigger');
    const before = viewport.getBoundingClientRect();
    buttons[1].click();
    const samples = [];
    for (let index = 0; index < 24; index++) {
      await new Promise(requestAnimationFrame);
      const rect = viewport.getBoundingClientRect();
      samples.push({ x: rect.x, width: rect.width,
        panels: Array.from(viewport.querySelectorAll<HTMLElement>('.brick-navigation-menu__content:not([hidden])')).map(panel => ({
          motion: panel.dataset.motion, position: getComputedStyle(panel).position,
          inert: panel.hasAttribute('inert'),
        })),
      });
    }
    return { before: { x: before.x, width: before.width }, samples };
  });
  expect(frames.samples.some(frame => frame.panels.some(panel => panel.motion === "to-start" && panel.inert))).toBe(true);
  expect(frames.samples.every(frame => frame.panels.every(panel => panel.position === "absolute"))).toBe(true);
  const last = frames.samples[frames.samples.length - 1]!;
  expect(frames.samples.some(frame => frame.width < frames.before.width - 1 && frame.width > last.width + 1)).toBe(true);
  // Root anchoring must remain centered throughout interpolation, not jump to
  // the new left edge while the old width is still painted.
  const center = frames.before.x + frames.before.width / 2;
  expect(frames.samples.every(frame => Math.abs(frame.x + frame.width / 2 - center) < 1), JSON.stringify(frames)).toBe(true);
  await expect.poll(() => viewport.evaluate(node => {
    const panel = node.querySelector<HTMLElement>('[data-state="open"]')!;
    const outer = node.getBoundingClientRect();
    const inner = panel.getBoundingClientRect();
    return inner.right <= outer.right + 0.5 && inner.bottom <= outer.bottom + 0.5;
  })).toBe(true);
});

for (const dir of ["ltr", "rtl"] as const) {
  test(`shared navigation ${dir} handles reversal, closing and reduced motion`, async ({ page }) => {
    await page.goto(`/navigation-menu?exampleDirection=${dir}`);
    const root = page.locator('[data-component-page="navigation-menu"] nav').first();
    await root.evaluate((node, direction) => node.setAttribute("dir", direction), dir);
    const learn = root.getByRole("button", { name: "Learn", exact: true });
    await learn.click();
    const viewport = root.locator('.brick-navigation-menu__viewport');
    await expect(viewport).toBeVisible();
    await root.evaluate(async node => {
      const controls = node.querySelectorAll<HTMLButtonElement>('.brick-navigation-menu__trigger');
      controls[1].click();
      await new Promise(requestAnimationFrame);
      controls[0].click();
    });
    await expect(learn).toHaveAttribute("aria-expanded", "true");
    await expect.poll(() => root.locator('.brick-navigation-menu__content:not([hidden])').count()).toBe(1);
    await expect(root.getByRole("link", { name: /Getting started/ })).toBeVisible();
    await learn.press("Escape");
    await expect(viewport).toBeHidden();
    await expect(learn).toBeFocused();
    await page.emulateMedia({ reducedMotion: "reduce" });
    await learn.click();
    await expect(viewport).toBeVisible();
    await expect(viewport).toHaveCSS("animation-name", "none");
    await expect(root.locator('.brick-navigation-menu__content[data-state="open"]')).toHaveCSS("animation-name", "none");
  });
}
