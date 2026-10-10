import { verifyFormSurfaceRecipes } from "../../form-surface-recipes.js";
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";
test.beforeEach(async ({ page }) => {
  page.on("pageerror", (error) => {
    throw error;
  });
  await page.goto("/tags-input?qualification=1");
  await expect(
    page.locator('[data-component-page="tags-input"]'),
  ).toBeVisible();
});

test("surface recipes preserve transparent outline and filled surface", async ({ page }) => {
  await verifyFormSurfaceRecipes(page, "tags-input", ".brick-tags-input", ".brick-tags-input-control");
});
test("TagsInput creation, keyboard removal, editing and controller transactions", async ({
  page,
}) => {
  const input = page.getByRole("textbox", { name: "Topics", exact: true });
  await input.fill("Testing");
  await input.press("Enter");
  const basic = page.locator("#scenario-tags-input-basic");
  await expect(basic.getByText("Testing", { exact: true })).toBeVisible();
  await input.press("Backspace");
  await input.press("Backspace");
  await expect(basic.getByText("Testing", { exact: true })).toHaveCount(0);
  await page.getByRole("button", { name: "Add two values" }).click();
  const provider = page
    .locator(".brick-tags-input")
    .filter({ has: page.locator("label", { hasText: "Provider topics" }) });
  await expect(provider.locator(".brick-tags-input-item")).toHaveCount(3);
  const editing = page
    .locator(".brick-tags-input")
    .filter({ has: page.locator("label", { hasText: /^Editable topics$/ }) });
  await editing.getByText("React", { exact: true }).dblclick();
  await editing.getByRole("textbox", { name: "Edit React" }).fill("Changed");
  await editing.getByRole("textbox", { name: "Edit React" }).press("Escape");
  await expect(editing.getByText("React", { exact: true })).toBeVisible();
  await editing.getByText("React", { exact: true }).dblclick();
  await editing.getByRole("textbox", { name: "Edit React" }).fill("Changed");
  await editing.getByRole("textbox", { name: "Edit React" }).press("Enter");
  await expect(editing.getByText("Changed", { exact: true })).toBeVisible();
});
test("TagsInput atomic paste, normalization, disabled items and composition", async ({
  page,
}) => {
  const paste = page.getByRole("textbox", { name: "Two values maximum" });
  await paste.evaluate((node) => {
    // Firefox restricts synthetic DataTransfer reads outside trusted clipboard events.
    // Supply the same handler payload explicitly; physical clipboard is a manual gate.
    const event = new Event("paste", { bubbles: true, cancelable: true });
    Object.defineProperty(event, "clipboardData", { value: { getData: () => "Two,Three" } });
    node.dispatchEvent(event);
  });
  await expect(paste).toHaveValue("Two,Three");
  const root = paste.locator("..");
  await expect(root.locator(".brick-tags-input-item")).toHaveCount(1);
  const validation = page.getByRole("textbox", { name: "Lowercase topics" });
  await validation.fill(" REACT ");
  await validation.press("Enter");
  await expect(validation).toHaveValue(" REACT ");
  await expect(
    page
      .locator("#scenario-tags-input-validation")
      .getByText("duplicate", { exact: true }),
  ).toBeVisible();
  const locked = page
    .locator(".brick-tags-input")
    .filter({ has: page.locator("label", { hasText: "Partially locked" }) });
  await locked.getByRole("button", { name: "Clear tags" }).click();
  await expect(locked.getByText("Locked", { exact: true })).toBeVisible();
  await expect(locked.getByText("Removable", { exact: true })).toHaveCount(0);
  const ime = page.getByRole("textbox", { name: "Japanese composition" });
  await ime.fill("日本語");
  await ime.dispatchEvent("keydown", {
    key: "Enter",
    code: "Enter",
    isComposing: true,
    keyCode: 229,
  });
  await expect(ime).toHaveValue("日本語");
  await ime.press("Enter");
  await expect(ime).toHaveValue("");
});
test("TagsInput JSON forms, required validity and external reset", async ({
  page,
}) => {
  const form = page.locator("#tags-example-form"),
    input = form.getByRole("textbox");
  await input.fill("Added");
  await input.press("Enter");
  await form.getByRole("button", { name: "Submit topics" }).click();
  await expect(form.getByRole("status").last()).toHaveText(
    '["Original","Added"]',
  );
  await form.getByRole("button", { name: "Reset topics" }).click();
  await expect(input).toHaveValue("Draft");
  await form.getByRole("button", { name: "Remove Original" }).click();
  await form.getByRole("button", { name: "Submit topics" }).click();
  await expect(input).toBeFocused();
  await expect(input).toHaveAttribute("aria-invalid", "true");
  const external = page.getByRole("textbox", { name: "External form topics" });
  await external.fill("Next");
  await external.press("Enter");
  await page.getByRole("button", { name: "Reset external topics" }).click();
  await expect(
    external.locator("..").locator(".brick-tags-input-item"),
  ).toHaveCount(1);
  const blur = page.getByRole("textbox", { name: "Add on blur" });
  await blur.fill("Blur value");
  await page.getByRole("textbox", { name: "Clear on blur" }).click();
  await expect(
    blur.locator("..").getByText("Blur value", { exact: true }),
  ).toBeVisible();
});
test("TagsInput shared suggestions and nested Escape preserve dialog", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Open skills dialog" }).click();
  const dialog = page.getByRole("dialog"),
    input = dialog.getByRole("combobox");
  await expect(input).toHaveAttribute("aria-required", "true");
  await input.fill("Rea");
  const suggestion = page.getByRole("option", { name: "React", exact: true });
  await expect(suggestion).toBeVisible();
  await expect.poll(() => suggestion.evaluate(node => {
    const rect = node.getBoundingClientRect();
    const hit = node.ownerDocument.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
    return node.contains(hit);
  })).toBe(true);
  await input.press("ArrowDown");
  await input.press("Enter");
  await expect(dialog.locator(".brick-tags-input-item-text")).toHaveText(
    "React",
  );
  await expect(input).toHaveValue("");
  await input.fill("Design");
  await input.press("ArrowDown");
  await input.press("Enter");
  await expect(dialog.locator(".brick-tags-input-item")).toHaveCount(2);
  await input.press("Backspace");
  await input.press("Enter");
  await expect(
    dialog.getByRole("textbox", { name: "Edit Design" }),
  ).toBeFocused();
  await dialog.getByRole("textbox", { name: "Edit Design" }).press("Escape");
  await expect(dialog).toBeVisible();
  await expect(input).toBeFocused();
});
test("TagsInput coordinated geometry and targets", async ({
  page,
}) => {
  for (const size of ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"]) {
    const pair = page.getByTestId("light-" + size);
    const tags = await pair.locator(".brick-tags-input-control").boundingBox();
    const input = await pair.locator(".brick-input").boundingBox();
    expect(Math.abs(tags!.height - input!.height)).toBeLessThanOrEqual(1);
    const remove = await pair.locator(".brick-tags-input-delete").boundingBox();
    expect(remove!.width).toBeGreaterThanOrEqual(24);
    expect(remove!.height).toBeGreaterThanOrEqual(24);
    const button = pair.locator(".brick-tags-input-delete");
    await button.scrollIntoViewIfNeeded();
    expect(await button.evaluate(node => {
      const box = node.getBoundingClientRect();
      return [0.5, box.height - 0.5].every(y => node.contains(document.elementFromPoint(box.x + box.width / 2, box.y + y)));
    })).toBe(true);
  }
});
test("TagsInput underline, responsive recovery, readonly and tone precedence", async ({ page }) => {
  const input = page.getByRole("textbox", { name: "underline variant", exact: true });
  const plane = input.locator("..");
  await input.hover();
  await expect(plane).toHaveCSS("border-top-width", "0px");
  await expect(plane).toHaveCSS("border-left-width", "0px");
  await expect(plane).toHaveCSS("padding-left", "0px");
  await input.focus();
  await expect(plane).toHaveCSS("outline-style", "none");
  const shadow = await plane.evaluate(node => getComputedStyle(node).boxShadow);
  expect(shadow).toMatch(/0px 2px 0px 0px/);
  const readonly = page.getByRole("textbox", { name: "Readonly topics" });
  await expect(readonly).not.toHaveAttribute("placeholder");
  await readonly.focus();
  await expect(readonly).toBeFocused();
  await expect(readonly.locator("..").getByRole("button")).toHaveCount(0);
  const accent = page.getByRole("textbox", { name: "Soft accent topics" }).locator("..").locator(".brick-tags-input-item-preview").first();
  const contrast = page.getByRole("textbox", { name: "Soft contrast topics" }).locator("..").locator(".brick-tags-input-item-preview").first();
  expect(await accent.evaluate(node => getComputedStyle(node).backgroundColor)).not.toBe(await contrast.evaluate(node => getComputedStyle(node).backgroundColor));
  const responsive = page.getByRole("textbox", { name: "Responsive topics" }).locator("..");
  await page.setViewportSize({ width: 600, height: 800 });
  await expect(responsive).toHaveCSS("border-top-width", "0px");
  await page.setViewportSize({ width: 1280, height: 800 });
  await expect(responsive).toHaveCSS("border-top-width", "1px");
  await expect(responsive).not.toHaveCSS("padding-left", "0px");
});
test("TagsInput reflow, accessibility and forced colors", async ({ page }) => {
  const violations = (
    await new AxeBuilder({ page })
      .include('[data-component-page="tags-input"]')
      .analyze()
  ).violations;
  expect(violations).toEqual([]);
  await page.setViewportSize({ width: 360, height: 780 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  const input = page.getByRole("textbox", { name: "Topics", exact: true });
  await input.focus();
  expect(
    await input.locator("..").evaluate((n) => getComputedStyle(n).outlineStyle),
  ).toBe("solid");
});
test("TagsInput invalid focus keeps error paint and long values keep removal reachable", async ({ page }) => {
  const invalid = page.getByRole('textbox', {name:'Overflow exposed'});
  const control=invalid.locator('..');
  const color=await control.evaluate(n=>getComputedStyle(n).borderBottomColor);
  await invalid.focus();
  await expect(control).toHaveCSS('border-bottom-color',color);
  expect(await control.evaluate(n=>getComputedStyle(n).boxShadow)).toContain(color);
  await page.setViewportSize({width:360,height:780});
  const input=page.getByRole('textbox',{name:'Topics',exact:true});
  const long='An exceptionally long topic '.repeat(12).trim();
  await input.fill(long); await input.press('Enter');
  const remove=input.locator('..').getByRole('button',{name:'Remove '+long,exact:true});
  await expect(remove).toBeVisible();
  await remove.click();
  await expect(remove).toHaveCount(0);
  await expect(input).toBeFocused();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
