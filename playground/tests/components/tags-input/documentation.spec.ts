import { test, expect } from "../../evidence-test.js";
test("Tags Input documentation has focused examples, paired code and part navigation", async ({ page }) => {
  await page.goto("/tags-input");
  for (const id of ["sizes", "variants", "controlled", "store", "maximum", "editable", "validate", "states", "field", "form", "paste", "sanitize", "blur", "delimiter", "colors", "combobox", "hook-form", "responsive", "disabled-items", "composition", "dialog"]) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
  for (const name of ["Root", "RootProvider", "Context", "Label", "Control", "Input", "Item", "Items", "ItemContext", "ItemPreview", "ItemText", "ItemInput", "ItemDeleteTrigger", "ClearTrigger", "HiddenInput"]) {
    await expect(page.getByRole("heading", { name, exact: true })).toHaveCount(1);
    await expect(page.getByRole("table", { name: `TagsInput.${name} props`, exact: true })).toHaveCount(1);
  }
  await expect(page.locator('[id^="scenario-tags-input-"]')).toHaveCount(0);
  const sizes = page.locator("#sizes");
  await sizes.getByRole("tab", { name: "Code", exact: true }).click();
  await expect(sizes).toContainText("TagsInputSizes");
});
test("Tags Input docs preserve native and hook-form integration", async ({ page }) => {
  await page.goto("/tags-input");
  const form = page.locator("#form");
  await form.getByRole("textbox").fill("Testing");
  await form.getByRole("textbox").press("Enter");
  await form.getByRole("button", { name: "Save topics" }).click();
  await expect(form).toContainText('["React","TypeScript","Testing"]');
  const hook = page.locator("#hook-form");
  await hook.getByRole("button", { name: "Save topics" }).click();
  await expect(hook.getByRole("textbox")).toBeFocused();
  await expect(hook).toContainText("Add a topic.");
  await hook.getByRole("textbox").fill("Design");
  await hook.getByRole("textbox").press("Enter");
  await hook.getByRole("button", { name: "Save topics" }).click();
  await expect(hook).toContainText("Topics saved.");
});
