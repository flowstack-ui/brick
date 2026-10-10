import { readFile } from "node:fs/promises";
import { createElement as h } from "react";
import { renderToString } from "react-dom/server";
import { Section } from "../../../dist/section.js";
import { Surface } from "../../../dist/surface.js";
import { Container } from "../../../dist/container.js";
import { Sidebar } from "../../../dist/sidebar.js";
import { IconButton } from "../../../dist/icon-button.js";
import { expect, test } from "../evidence-test.js";

test("Sidebar trigger composition preserves IconButton paint and size in either CSS order", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const icon = () => h('svg', { viewBox: '0 0 24 24', 'aria-hidden': true }, h('path', { d: 'M4 4h16v16H4z' }));
  // Sidebar starts expanded. Compare the same public action state: expanded
  // actions deliberately retain hover paint even on coarse-pointer devices.
  const button = (id: string) => h(IconButton, { id, size: '2xs', variant: 'solid', tone: 'accent', 'aria-label': id, 'aria-expanded': true, children: icon() });
  const markup = renderToString(h('div', null,
    h(Sidebar.Root, null, h(Sidebar.Trigger, { id: 'composed', asChild: true, children: button('composed') })), button('standalone')));
  const read = (name: string) => readFile(new URL(`../../../dist/styles/${name}.css`, import.meta.url), 'utf8');
  const core = await read('core');
  const sidebar = await read('sidebar');
  const action = await read('icon-button');
  for (const css of [core + sidebar + action, core + action + sidebar]) {
    await page.setContent(`<meta name="viewport" content="width=device-width, initial-scale=1"><style>${css}</style>${markup}`);
    for (const id of ['composed', 'standalone']) {
      await expect(page.getByRole('button', { name: id })).toHaveAttribute('aria-expanded', 'true');
      await expect(page.getByRole('button', { name: id })).toHaveCSS('width', '24px');
      await expect(page.getByRole('button', { name: id })).toHaveCSS('height', '24px');
    }
    const paints = [];
    const diagnostics = [];
    for (const id of ['composed', 'standalone']) {
      await page.getByRole('button', { name: id }).hover();
      await page.getByRole('button', { name: id }).evaluate(async el => {
        // Reduced motion shortens transitions; it does not finish them synchronously.
        getComputedStyle(el).backgroundColor;
        await Promise.all(el.getAnimations().map(animation => animation.finished));
      });
      paints.push(await page.getByRole('button', { name: id }).evaluate(el => {
        const c = getComputedStyle(el);
        return [c.backgroundColor, c.color, c.borderRadius, c.padding];
      }));
      diagnostics.push(await page.getByRole('button', { name: id }).evaluate(el => {
        const c = getComputedStyle(el);
        return {
          html: el.outerHTML,
          fineHover: matchMedia('(hover: hover) and (pointer: fine)').matches,
          hover: el.matches(':hover'), active: el.matches(':active'),
          background: c.backgroundColor,
          base: c.getPropertyValue('--brick-button-background'),
          hovered: c.getPropertyValue('--brick-button-background-hover'),
          pressed: c.getPropertyValue('--brick-button-background-pressed'),
          buttons: [...document.querySelectorAll('button')].map(button => ({
            id: button.id, hover: button.matches(':hover'), active: button.matches(':active'),
            background: getComputedStyle(button).backgroundColor,
          })),
        };
      }));
    }
    await testInfo.attach('sidebar-paint-comparison', { body: JSON.stringify(diagnostics, null, 2), contentType: 'application/json' });
    expect(paints[0]).toEqual(paints[1]);
  }
});

test("layout ownership survives aggregate and both modular stylesheet orders", async ({ page }) => {
  await page.setViewportSize({ width: 1100, height: 900 });
  const markup = renderToString(h(Surface, { asChild: true, level: "subtle", inset: "lg", children:
    h(Section, { id: "region", spacing: { xl: "xl" }, "aria-label": "Workspace" },
      h(Container, null,
        h(Sidebar.Root, { bordered: false },
          h(Sidebar.Panel, null, "Navigation"),
          h(Sidebar.Main, null,
            h('div', { "data-brick-appearance": "dark" },
              h(Surface, { id: "nested", level: "raised" }, "Records")))))) }));
  const read = (path: string) => readFile(new URL(`../../../dist/${path}`, import.meta.url), "utf8");
  const core = await read("styles/core.css");
  const section = await read("styles/section.css");
  const surface = await read("styles/surface.css");
  const remaining = await read("styles/container.css") + await read("styles/sidebar.css");
  const deliveries = [await read("styles.css"), core + section + surface + remaining, core + surface + section + remaining];
  const results = [];
  for (const css of deliveries) {
    await page.setContent(`<meta name="viewport" content="width=device-width, initial-scale=1"><style>${css}</style>${markup}`);
    await expect(page.locator('#region.brick-section.brick-surface')).toHaveCount(1);
    await expect(page.locator('#region')).toHaveCSS('padding-block-start', '66px');
    await expect(page.locator('.brick-sidebar__panel')).toHaveCSS('border-right-width', '0px');
    results.push(await page.locator('#region').evaluate(el => {
      const s = getComputedStyle(el);
      const nested = getComputedStyle(el.querySelector('#nested')!);
      return [s.paddingTop, s.paddingBottom, s.backgroundColor, nested.backgroundColor];
    }));
    await page.locator('#region').evaluate(el => el.style.setProperty('--brick-section-space-md', '2rem'));
    await expect(page.locator('#region')).toHaveCSS('padding-block-start', '32px');
  }
  expect(results[1]).toEqual(results[0]);
  expect(results[2]).toEqual(results[0]);
  expect(results[0][2]).not.toEqual(results[0][3]);
});
