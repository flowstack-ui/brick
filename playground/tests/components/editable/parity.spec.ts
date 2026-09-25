import { expect, test } from "../../evidence-test.js";

test.beforeEach(async ({ page }) => { await page.goto("/editable"); });

test("shared typography survives editing and responsive changes", async ({ page }) => {
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const id of ["typography", "inherited", "sizes"]) {
      const roots = page.locator(`#${id} .brick-editable`);
      for (const root of await roots.all()) {
        const preview = root.locator(".brick-editable-preview");
        const before = await preview.evaluate(node => { const s = getComputedStyle(node); return [s.fontSize, s.fontWeight, s.lineHeight, s.letterSpacing, s.color, s.textAlign]; });
        const beforeBox = (await preview.boundingBox())!;
        await preview.click();
        const after = await root.getByRole("textbox").evaluate(node => { const s = getComputedStyle(node); return [s.fontSize, s.fontWeight, s.lineHeight, s.letterSpacing, s.color, s.textAlign]; });
        expect(after.filter((_, i) => i !== 2)).toEqual(before.filter((_, i) => i !== 2));
        // Native single-line editors clamp used line-height to the font's normal
        // metrics (Mozilla 1860167). Verify the bounded physical effect as well.
        expect(Math.abs(parseFloat(after[2]) - parseFloat(before[2]))).toBeLessThanOrEqual(2);
        const afterBox = (await root.getByRole("textbox").boundingBox())!;
        expect(Math.abs(afterBox.height - beforeBox.height)).toBeLessThanOrEqual(2);
        await root.getByRole("textbox").press("Escape");
      }
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  }
});

test("composed controls retain square geometry and toggle visibility", async ({ page }) => {
  const section = page.locator("#controls");
  const edit = section.getByRole("button", { name: "Edit title", exact: true });
  const box = (await edit.boundingBox())!;
  expect(box.width).toBeCloseTo(box.height, 1);
  await edit.click();
  await expect(edit).toBeHidden();
  const save = section.getByRole("button", { name: "Save title", exact: true });
  await expect(save).toBeVisible();
  await section.getByRole("textbox").fill("Changed");
  await save.click();
  await expect(save).toBeHidden();
  await expect(edit).toBeFocused();
});

test("custom preview follows value and no-highlight retains focus", async ({ page }) => {
  const custom = page.locator("#composition");
  await custom.getByRole("button", { name: "Live custom preview" }).click();
  await custom.getByRole("textbox").fill("Updated preview");
  await custom.getByRole("textbox").press("Enter");
  await expect(custom.getByRole("button", { name: "Updated preview" })).toBeVisible();
  const preview = page.locator('#highlight .brick-editable-preview[data-highlight="none"]');
  await preview.hover();
  await expect(preview).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await preview.focus();
  await expect(page.locator("#highlight").getByRole("textbox", { name: "No hover background" })).toHaveCSS("outline-style", "solid");
  await expect(page.locator("#props-root")).toBeVisible();
});
