import { expect, test } from "../../evidence-test.js";

test("both dialogs share geometry and presentation across appearances and sizes", async ({ page }) => {
  test.setTimeout(120000);
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const appearance of ["light", "dark"]) {
    for (const size of ["xs", "sm", "md", "lg", "xl", "cover", "full"]) {
      const readings = [];
      for (const owner of ["dialog", "alert-dialog"]) {
        await page.goto(`/${owner}?appearance=${appearance}`);
        if (owner === "dialog" && (size === "cover" || size === "full")) {
          await page.locator(`#${size}`).getByRole("button", { name: /^Open / }).click();
        } else await page.locator("#sizes").getByRole("button", { name: size, exact: true }).click();
        const panel = page.getByRole(owner === "dialog" ? "dialog" : "alertdialog");
        await expect(panel).toHaveCSS("opacity", "1");
        readings.push(await panel.evaluate(element => {
          const css = getComputedStyle(element);
          const props = ["backgroundColor", "boxShadow", "borderRadius", "borderWidth", "fontSize", "lineHeight"] as const;
          const parts = ["header", "title", "footer"];
          return { width: Math.round(element.getBoundingClientRect().width),
            paint: props.map(prop => css[prop]),
            // A Dialog corner close deliberately reserves extra right padding.
            regions: parts.map(part => { const style = getComputedStyle(element.querySelector(`.brick-dialog-${part}`)!); return [style.paddingTop, style.paddingBottom, style.paddingLeft, style.gap, style.fontSize, style.lineHeight]; }) };
        }));
        await page.keyboard.press("Escape");
      }
      expect(readings[1]).toEqual(readings[0]);
    }
  }
});

test("AlertDialog Positioner retains safe focus and blocks outside dismissal", async ({ page }) => {
  await page.goto("/alert-dialog");
  await page.getByRole("button", { name: "Open decision", exact: true }).click();
  const panel = page.getByRole("alertdialog");
  await expect(panel.getByRole("button", { name: "Keep project" })).toBeFocused();
  await page.locator(".brick-alert-dialog-positioner").filter({ visible: true }).click({ position: { x: 2, y: 2 } });
  await expect(panel).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(panel).toHaveCount(0);
});

test("AlertDialog responsive full mode resets and retained content stays hidden", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 700 });
  await page.goto("/alert-dialog");
  await page.getByRole("button", { name: "Responsive decision" }).click();
  const panel = page.getByRole("alertdialog");
  await expect.poll(async () => Math.round((await panel.boundingBox())!.width)).toBe(390);
  await page.setViewportSize({ width: 1200, height: 900 });
  await expect.poll(async () => Math.round((await panel.boundingBox())!.width)).toBe(672);
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Retained decision" }).click();
  await page.getByRole("button", { name: "Reviewed 0" }).click();
  await page.getByRole("button", { name: "Keep project" }).click();
  await expect(page.locator('.brick-alert-dialog-content[hidden]')).toHaveCSS("display", "none");
  await page.getByRole("button", { name: "Retained decision" }).click();
  await expect(page.getByRole("button", { name: "Reviewed 1" })).toBeVisible();
});

test("AlertDialog docs has named props and source examples", async ({ page }) => {
  await page.goto("/alert-dialog");
  for (const id of ["sizes", "responsive", "placement", "scrolling", "motion", "retained", "radius", "controlled", "nested", "props-root", "props-positioner", "props-content", "props-cancel", "props-action"]) {
    await expect(page.locator(`#${id}`)).toBeAttached();
  }
  await expect(page.getByRole("table", { name: "AlertDialog.Positioner props", exact: true })).toBeAttached();
});

for (const kind of ["AlertDialog", "Dialog"] as const) {
  test(`${kind} buttons remain above the backdrop with ActionBar mounted`, async ({ page }, testInfo) => {
    await page.goto("/alert-dialog?qualification=1");
    await page.getByRole("button", { name: `Open ${kind} action bar`, exact: true }).click();
    const bar = page.locator('[data-slot="action-bar-content"]');
    const close = bar.getByRole("button", { name: `Close ${kind} editing actions`, exact: true });
    const panel = page.getByRole(kind === "AlertDialog" ? "alertdialog" : "dialog", { name: `Discard ${kind} changes?`, exact: true });
    const slot = kind === "AlertDialog" ? "alert-dialog" : "dialog";
    for (const action of ["Keep editing", "Discard changes"]) {
      await close.click();
      await expect(panel).toBeVisible();
      await expect(bar).toBeAttached();
      const overlay = page.locator(`[data-slot="${slot}-overlay"]`);
      const positioner = page.locator(`[data-slot="${slot}-positioner"]`);
      const layer = await overlay.evaluate(el => getComputedStyle(el).getPropertyValue("--atom-overlay-layer").trim());
      expect(Number(layer)).toBeGreaterThan(0);
      await expect(positioner).toHaveCSS("--atom-overlay-layer", layer);
      const overlayZ = await overlay.evaluate(el => Number(getComputedStyle(el).zIndex));
      await expect.poll(() => positioner.evaluate(el => Number(getComputedStyle(el).zIndex))).toBe(overlayZ + 1);
      const button = panel.getByRole("button", { name: action, exact: true });
      await expect.poll(() => button.evaluate(el => {
        const rect = el.getBoundingClientRect();
        return el.contains(document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2));
      })).toBe(true);
      if (action === "Keep editing") {
        await page.screenshot({ path: testInfo.outputPath("action-bar-confirmation.png") });
      }
      await button.click();
      await expect(panel).toHaveCount(0);
      if (action === "Keep editing") {
        await expect(bar).toBeVisible();
        await expect(close).toBeFocused();
      }
    }
    await expect(bar).toHaveCount(0);
  });
}
