import { verifyFormSurfaceRecipes } from "../../form-surface-recipes.js";
import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator } from "../../evidence-test.js";

async function box(locator: Locator) {
  const value = await locator.boundingBox();
  expect(value).not.toBeNull();
  return value!;
}

test.beforeEach(async ({ page }) => {
  await page.goto("/textarea?testMode=1&qualification=1");
});

test("surface recipes preserve transparent outline and filled surface", async ({ page }) => {
  await verifyFormSurfaceRecipes(page, "textarea", ".brick-textarea", "");
});

test("Textarea overview preserves canonical defaults and Field labeling", async ({ page }) => {
  const evidence = page.getByTestId("textarea-overview");
  const control = evidence.getByRole("textbox", { name: "Project summary" });
  const root = control.locator("..");
  await expect(root).toHaveClass(/brick-textarea/);
  await expect(root).toHaveAttribute("data-variant", "outline");
  await expect(root).toHaveAttribute("data-size", "lg");
  await expect(root).toHaveAttribute("data-shape", "rounded");
  await expect(root).toHaveAttribute("data-resize", "vertical");
  await expect(root).toHaveAttribute("data-full-width", "");
  await expect(control).toHaveAttribute("rows", "3");
  await evidence.getByText("Project summary", { exact: true }).click();
  await expect(control).toBeFocused();
  await control.fill("First line\nSecond line");
  await expect(control).toHaveValue("First line\nSecond line");
});

test("Textarea comparisons isolate variant, size, and shape", async ({ page }) => {
  const variantControls = page.getByTestId("textarea-variants").getByRole("textbox", { name: "Project summary" });
  const variants = ["outline", "surface", "soft", "subtle", "ghost", "plain", "underline"];
  await expect(variantControls).toHaveCount(variants.length);
  for (let index = 0; index < variants.length; index += 1) {
    const root = variantControls.nth(index).locator("..");
    await expect(variantControls.nth(index)).toHaveValue("Describe the workspace goals and expected result.");
    await expect(root).toHaveAttribute("data-variant", variants[index]);
    await expect(root).toHaveAttribute("data-size", "lg");
  }
  await expect(variantControls.nth(0).locator("..")).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(variantControls.nth(6).locator("..")).not.toHaveAttribute("data-shape");

  const sizeControls = page.getByTestId("textarea-sizes").getByRole("textbox", { name: "Project summary" });
  const heights: number[] = [];
  const sizeNames = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"];
  for (let index = 0; index < sizeNames.length; index += 1) {
    const root = sizeControls.nth(index).locator("..");
    await expect(root).toHaveAttribute("data-size", sizeNames[index]);
    await expect(root).toHaveAttribute("data-variant", "outline");
    heights.push((await box(root)).height);
  }
  expect(heights[0]).toBeLessThan(heights[heights.length - 1]!);

  const shapeControls = page.getByTestId("textarea-shapes").getByRole("textbox", { name: "Project summary" });
  await expect(shapeControls).toHaveCount(2);
  await expect(shapeControls.nth(0).locator("..")).toHaveCSS("border-radius", "0px");
  expect(Number.parseFloat(await shapeControls.nth(1).locator("..").evaluate((element) => getComputedStyle(element).borderRadius))).toBeGreaterThan(0);
});

test("Textarea manual and automatic sizing contracts remain distinct", async ({ page }) => {
  const resize = page.getByTestId("textarea-resize");
  const manual = resize.locator(".brick-textarea:not([data-autoresize])");
  await expect(manual).toHaveCount(4);
  for (let index = 0; index < 4; index += 1) {
    await expect(manual.nth(index)).toHaveCSS("resize", ["none", "vertical", "horizontal", "both"][index]);
    await expect(manual.nth(index).locator("textarea")).toHaveCSS("resize", "none");
  }

  const vertical = manual.nth(1);
  const beforeDrag = await box(vertical);
  // This assertion isolates layout response; the separate corner-drag test
  // verifies the browser's actual resize interaction without style mutation.
  await vertical.evaluate((element) => {
    element.style.height = `${element.getBoundingClientRect().height + 70}px`;
  });
  const afterDrag = await box(vertical);
  expect(afterDrag.height).toBeGreaterThan(beforeDrag.height + 40);
  const verticalControl = await box(vertical.locator("textarea"));
  expect(verticalControl.y + verticalControl.height).toBeLessThanOrEqual(afterDrag.y + afterDrag.height);
  const verticalCount = await box(vertical.locator("[data-slot='textarea-count']"));
  expect(verticalCount.y + verticalCount.height).toBeLessThanOrEqual(afterDrag.y + afterDrag.height);

  const auto = resize.locator("textarea[data-autoresize]");
  const before = await box(auto);
  await auto.fill("One\nTwo\nThree\nFour\nFive\nSix\nSeven");
  const after = await box(auto);
  expect(after.height).toBeGreaterThan(before.height);
  expect(after.height).toBeLessThanOrEqual(144);
  await expect(auto.locator("..")).toHaveAttribute("data-resize", "none");
  await expect(auto).toHaveCSS("overflow-y", "auto");
  await auto.fill("One");
  const shrunk = await box(auto);
  expect(shrunk.height).toBeLessThan(after.height);
  expect(shrunk.height).toBeGreaterThanOrEqual(80);
});

test("native wrapper corner resizing grows the editor and preserves the footer", async ({ page, isMobile }) => {
  test.skip(isMobile, "Mobile browser profiles do not expose a desktop native resize handle.");
  const roots = page.getByTestId("textarea-resize").locator(".brick-textarea:not([data-autoresize])");
  for (const index of [1, 2, 3]) {
    const root = roots.nth(index);
    await root.scrollIntoViewIfNeeded();
    const before = await box(root);
    const editorBefore = await box(root.locator("textarea"));
    const countBefore = index === 2 ? null : await box(root.locator(".brick-textarea-count"));
    await page.mouse.move(before.x + before.width - 3, before.y + before.height - 3);
    await page.mouse.down();
    await page.mouse.move(before.x + before.width - 43, before.y + before.height + 77, { steps: 12 });
    await page.mouse.up();
    const after = await box(root);
    const editorAfter = await box(root.locator("textarea"));
    const countAfter = index === 2 ? null : await box(root.locator(".brick-textarea-count"));
    if (index !== 2) {
      expect(after.height).toBeGreaterThan(before.height + 40);
      expect(editorAfter.height).toBeGreaterThan(editorBefore.height + 40);
    } else expect(Math.abs(after.height - before.height)).toBeLessThan(2);
    if (index !== 1) expect(after.width).toBeLessThan(before.width - 20);
    else expect(Math.abs(after.width - before.width)).toBeLessThan(2);
    if (countAfter && countBefore) {
      expect(Math.abs(countAfter.height - countBefore.height)).toBeLessThan(2);
      expect(editorAfter.y + editorAfter.height).toBeLessThanOrEqual(countAfter.y);
      expect(countAfter.y + countAfter.height).toBeLessThan(after.y + after.height);
    }
    expect(await root.evaluate(e => e.scrollHeight <= e.clientHeight + 1)).toBe(true);
  }
});

test("corner handles grow and shrink compact, large, underline and RTL fields", async ({ page, isMobile }) => {
  test.skip(isMobile, "Mobile profiles do not expose a desktop native resize handle.");
  const sizes = page.getByTestId("textarea-sizes").locator(".brick-textarea");
  const roots = [sizes.first(), sizes.last(), page.locator("#textarea-variant-underline-control").locator(".."), page.getByRole("textbox", { name: "ملاحظات المشروع" }).locator("..")];
  for (const root of roots) {
    await root.scrollIntoViewIfNeeded();
    const rtl = await root.evaluate(e => getComputedStyle(e).direction === "rtl");
    const before = await box(root);
    for (const delta of [70, -35]) {
      const current = await box(root);
      const x = rtl ? current.x + 3 : current.x + current.width - 3;
      await page.mouse.move(x, current.y + current.height - 3);
      await page.mouse.down();
      await page.mouse.move(x, current.y + current.height - 3 + delta, { steps: 10 });
      await page.mouse.up();
      const changed = await box(root);
      expect(Math.abs(changed.height - current.height - delta)).toBeLessThan(4);
      const editor = await box(root.locator("textarea"));
      expect(editor.y + editor.height).toBeLessThanOrEqual(changed.y + changed.height);
      expect(await root.evaluate(e => e.scrollHeight <= e.clientHeight + 1)).toBe(true);
    }
    expect((await box(root)).height).toBeGreaterThan(before.height + 25);
  }
});

test("Textarea value, Count, and availability state remain Atom-owned", async ({ page }) => {
  const states = page.getByTestId("textarea-states");
  const controls = states.getByRole("textbox", { name: "Project summary" });
  await expect(controls).toHaveCount(6);
  await controls.nth(1).fill("Updated project summary");
  await expect(states.getByText("Value: Updated project summary")).toBeVisible();
  await expect(controls.nth(1).locator("..").locator("[data-slot='textarea-count']")).toHaveText("23/160");
  await expect(controls.nth(2)).toBeDisabled();
  await expect(controls.nth(2).locator("..")).toHaveCSS("resize", "none");
  await expect(controls.nth(3)).toHaveAttribute("readonly");
  await expect(controls.nth(3).locator("..")).toHaveCSS("resize", "vertical");
  await expect(controls.nth(4)).toHaveAttribute("required");
  await expect(controls.nth(4)).toHaveAttribute("aria-required", "true");
  await expect(controls.nth(5)).toHaveAttribute("aria-invalid", "true");
  await expect(controls.nth(5)).toHaveAttribute("aria-describedby", "textarea-invalid-error");
  await expect(controls.nth(5).locator("..")).toHaveCSS("background-color", await controls.nth(4).locator("..").evaluate((element) => getComputedStyle(element).backgroundColor));
});

test("Textarea composes with inline validation, reset, external ownership, and rendered output", async ({ page }) => {
  const form = page.getByRole("form", { name: "Textarea project form" });
  const summary = form.getByRole("textbox", { name: "Project summary" });
  await form.getByRole("button", { name: "Save summary" }).click();
  await expect(summary).toBeFocused();
  await expect(summary).toHaveAttribute("data-invalid", "");
  await expect(form.getByText("Enter a project summary.")).toBeVisible();
  await summary.fill("A useful project summary");
  await form.getByRole("button", { name: "Save summary" }).click();
  await expect(form.locator("output")).toHaveText("Submitted: A useful project summary");
  await form.getByRole("button", { name: "Reset" }).click();
  await expect(summary).toHaveValue("");
  await expect(form.locator("output")).toHaveText("Form reset");

  expect(await page.locator("#textarea-form-example").evaluate((element) => new FormData(element as HTMLFormElement).get("externalNotes"))).toBe("External project notes");
  const outputControl = page.getByRole("textbox", { name: "Account notes" });
  await expect(outputControl).toHaveAttribute("id", "textarea-output-control");
  await expect(outputControl).toHaveAttribute("aria-describedby", "textarea-output-description textarea-output-error");
  const output = page.getByTestId("textarea-form").locator("[data-rendered-output]");
  await expect(output).toContainText('data-slot="textarea"');
  await expect(output).toContainText('data-slot="textarea-control"');
  await expect(output).toContainText('data-slot="textarea-count"');
});

test("Textarea documentation examples exercise native and React Hook Form paths", async ({ page }) => {
  await page.goto("/textarea?testMode=1");
  await expect(page.locator('a[href="#textarea.overview"]')).toHaveCount(0);
  await expect(page.locator('a[href="#props-root"]')).not.toHaveCount(0);
  await expect(page.locator('a[href="#props-count"]')).not.toHaveCount(0);

  const sectionIds = ["variants", "sizes", "messages", "error-text", "field", "hook-form", "resize", "auto-resize", "ref", "radius", "states", "controlled", "count", "responsive", "native-form"];
  const positions: number[] = [];
  for (const id of sectionIds) {
    const section = page.locator(`#${id}`);
    await expect(section.getByRole("tab", { name: "Preview", exact: true })).toHaveCount(1);
    await expect(section.getByRole("tab", { name: "Code", exact: true })).toHaveCount(1);
    positions.push(await section.evaluate(element => element.getBoundingClientRect().top));
  }
  expect(positions).toEqual([...positions].sort((a, b) => a - b));
  await expect(page.locator("#error-text").getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  await expect(page.locator("#field").getByRole("textbox")).toHaveAttribute("required", "");
  await page.locator("#ref").getByRole("button", { name: "Focus textarea" }).click();
  await expect(page.locator("#ref").getByRole("textbox")).toBeFocused();
  const radius = page.locator("#radius .brick-textarea");
  await expect(radius.first()).toHaveCSS("border-radius", "0px");
  expect(await radius.last().evaluate(element => parseFloat(getComputedStyle(element).borderRadius))).toBeGreaterThan(0);
  await expect(page.locator("#props-root")).toContainText("onValueChange");
  await expect(page.locator("#props-root")).toContainText("shape");
  for (const id of ["ref", "radius"]) {
    const section = page.locator(`#${id}`);
    await section.getByRole("tab", { name: "Code", exact: true }).click();
    await expect(section).toContainText(id === "ref" ? "ref.current?.focus()" : 'radius="none"');
    await section.getByRole("tab", { name: "Preview", exact: true }).click();
  }

  const nativeForm = page.locator("#native-form");
  const nativeControl = nativeForm.getByRole("textbox", { name: "Notes" });
  await nativeControl.fill("Saved through native FormData");
  await nativeForm.getByRole("button", { name: "Save" }).click();
  await expect(nativeForm.getByText("Saved: Saved through native FormData")).toBeVisible();
  await nativeForm.getByRole("button", { name: "Reset" }).click();
  await expect(nativeControl).toHaveValue("Initial notes");

  const hookForm = page.locator("#hook-form");
  const hookControl = hookForm.getByRole("textbox", { name: "Project summary" });
  await hookForm.getByRole("button", { name: "Save" }).click();
  await expect(hookForm.getByText("Enter a project summary.")).toBeVisible();
  await hookControl.fill("Too short");
  await hookForm.getByRole("button", { name: "Save" }).click();
  await expect(hookForm.getByText("Use at least twenty characters.")).toBeVisible();
  await hookControl.fill("A complete Hook Form project summary");
  await hookForm.getByRole("button", { name: "Save" }).click();
  await expect(hookForm.getByRole("button", { name: "Saved" })).toBeVisible();
  await hookForm.getByRole("button", { name: "Reset" }).click();
  await expect(hookControl).toHaveValue("");
});

test("Textarea appearance, customization, RTL, mobile containment, and axe remain stable", async ({ page }) => {
  const appearances = page.getByTestId("textarea-appearance").getByRole("textbox", { name: "Project summary" });
  await expect(appearances).toHaveCount(2);
  for (const control of await appearances.all()) {
    await expect(control.locator("..")).toHaveAttribute("data-variant", "outline");
    await expect(control.locator("..")).toHaveAttribute("data-size", "lg");
  }
  const custom = page.locator("[data-slot='custom-textarea']");
  await expect(custom).toHaveCSS("border-radius", "12px");
  await expect(custom).toHaveCSS("border-color", "rgb(24, 121, 78)");
  await expect(custom.locator("textarea")).toHaveCSS("letter-spacing", "0.72px");

  const rtl = page.getByRole("textbox", { name: "ملاحظات المشروع" });
  await expect(rtl).toHaveCSS("direction", "rtl");
  const count = rtl.locator("..").locator("[data-slot='textarea-count']");
  const rootBox = await box(rtl.locator(".."));
  const countBox = await box(count);
  expect(countBox.x).toBeLessThan(rootBox.x + rootBox.width / 2);

  await page.setViewportSize({ width: 390, height: 844 });
  const stress = page.getByTestId("textarea-stress");
  const responsive = page.getByRole("textbox", { name: "Responsive notes" }).locator("..");
  await expect(responsive).toHaveAttribute("data-variant", "underline");
  await expect(responsive).toHaveAttribute("data-variant-md", "outline");
  await expect(responsive).toHaveCSS("border-left-width", "0px");
  expect((await box(stress)).width).toBeLessThanOrEqual(390);
  await expect(stress.locator("textarea").first()).toBeVisible();
  await page.setViewportSize({ width: 900, height: 844 });
  await expect(responsive).toHaveCSS("border-left-width", "1px");
  const accessibilityScanResults = await new AxeBuilder({ page }).include("[data-testid='textarea-workbench']").analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
});
