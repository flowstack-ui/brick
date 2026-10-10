import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";

test.beforeEach(async ({ page }) => page.goto("/file-upload?qualification=1"));

test("file-text row preserves Clear width at desktop and narrow widths", async ({ page }) => {
  await page.goto("/file-upload");
  const area = page.locator("#file-text");
  const clear = area.getByRole("button", { name: "Clear files" });
  for (const width of [1280, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await clear.scrollIntoViewIfNeeded();
    const metrics = await clear.evaluate(button => {
      const range = document.createRange(); range.selectNodeContents(button);
      return { textHeight: range.getBoundingClientRect().height, lineHeight: parseFloat(getComputedStyle(button).lineHeight) };
    });
    expect(metrics.textHeight).toBeLessThanOrEqual(metrics.lineHeight + 1);
    const root = area.locator('.brick-file-upload');
    expect(await root.evaluate(el => el.scrollWidth <= el.clientWidth + 1)).toBe(true);
  }
  await area.locator('input[type="file"]').setInputFiles({name: "a-very-long-selected-attachment-name-for-containment.txt", mimeType: "text/plain", buffer: Buffer.from("text")});
  expect(await area.locator('.brick-file-upload').evaluate(el => el.scrollWidth <= el.clientWidth + 1)).toBe(true);
  await clear.click();
  await expect(area.getByText("Choose a file…", { exact: true })).toBeVisible();
});

test("non-clickable dropzone paint retains drag feedback", async ({ page, isMobile }) => {
  test.skip(isMobile, "Pointer hover recipe is qualified on desktop profiles");
  await page.goto("/file-upload");
  const zone = page.locator('#dropzone .brick-file-upload__dropzone');
  // Unit regression checks the disableClick-to-marker binding and picker behavior.
  // This isolates the CSS marker without changing the documented example's API.
  await zone.evaluate(el => el.setAttribute('data-click-disabled', ''));
  await zone.hover();
  await expect(zone).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  await zone.evaluate(el => {
    const transfer = new DataTransfer(); transfer.items.add(new File(['text'], 'note.txt', { type: 'text/plain' }));
    el.dispatchEvent(new DragEvent('dragover', { bubbles: true, cancelable: true, dataTransfer: transfer }));
  });
  await expect(zone).toHaveAttribute('data-accepted', '');
  await expect(zone).not.toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
});

test("documentation exposes focused features and shared button composition", async ({ page }) => {
  await page.goto("/file-upload");
  await expect(page.getByRole("heading", { name: "Usage", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "RootProvider and Context", exact: true })).toHaveCount(1);
  const actions = page.locator("#actions");
  await expect(actions.getByRole("button", { name: "subtle", exact: true })).toHaveAttribute("data-variant", "subtle");
  const icon = actions.getByRole("button", { name: "Upload attachment" });
  await expect(icon).toHaveClass(/brick-icon-button/);
  await expect(page.locator("button button")).toHaveCount(0);
  await expect(page.locator(".brick-file-upload__trigger")).toHaveCount(0);
  await icon.focus();
  const chooser = page.waitForEvent("filechooser");
  await icon.press("Enter");
  await (await chooser).setFiles({ name: "notes.txt", mimeType: "text/plain", buffer: Buffer.from("notes") });
  await expect(actions.getByText("notes.txt", { exact: true })).toBeVisible();
});

test("docs capacity, ready-made rows and clear are functional", async ({ page }) => {
  await page.goto("/file-upload");
  const area = page.locator("#capacity");
  await area.locator('input[type="file"]').setInputFiles([1, 2, 3].map(n => ({ name: `${n}.txt`, mimeType: "text/plain", buffer: Buffer.from("text") })));
  await expect(area.getByText("0 remaining", { exact: true })).toBeVisible();
  await expect(area.getByRole("button", { name: "Add attachments" })).toBeDisabled();
  await area.getByRole("button", { name: "Remove 2.txt" }).click();
  await expect(area.getByText("1 remaining", { exact: true })).toBeVisible();
  await area.getByRole("button", { name: "Clear files" }).click();
  await expect(area.getByRole("listitem")).toHaveCount(0);
});

test("docs transforms files and preserves native directory/capture attributes", async ({ page }) => {
  await page.goto("/file-upload");
  await expect(page.locator('#directory input[type="file"]')).toHaveAttribute("webkitdirectory", "");
  await expect(page.locator('#capture input[type="file"]')).toHaveAttribute("capture", "environment");
  const area = page.locator("#transform");
  await area.locator('input[type="file"]').setInputFiles({ name: "text.txt", mimeType: "text/plain", buffer: Buffer.from("a\r\nb") });
  await expect(area.getByText("text.txt", { exact: true })).toBeVisible();
  await expect(area.locator('[data-slot="file-upload-item-size"]')).toHaveText("3 B");
  expect(await area.locator('input[type="file"]').evaluate(async input => (input as HTMLInputElement).files?.[0]?.text())).toBe("a\nb");
});

test("File Upload exposes complete anatomy, defaults, and Field relationships", async ({ page }) => {
  const area = page.getByTestId("file-upload-overview");
  const root = area.locator(".brick-file-upload");
  await expect(root).toHaveAttribute("data-size", "md");
  await expect(root).toHaveAttribute("data-shape", "rounded");
  await expect(root).toHaveAttribute("data-variant", "outline");
  await expect(root).toHaveAttribute("data-full-width", "");
  await expect(area.getByRole("button", { name: "Attachments Choose files" })).toBeVisible();
  await expect(root.locator('[data-slot="file-upload-hidden-input"]')).toHaveAttribute("name", "attachments");
  await expect(root.locator('[data-slot="file-upload-item"]')).toHaveCount(1);
  await expect(root.locator('[data-slot="file-upload-item-name"]')).toContainText("conference-receipt.pdf");
});

test("surface recipes preserve transparent outline and filled surface", async ({ page }) => {
  const outline = page.locator('.brick-file-upload[data-variant="outline"] .brick-file-upload__dropzone').first();
  const surface = page.locator('.brick-file-upload[data-variant="surface"] .brick-file-upload__dropzone').first();
  await expect(outline).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(surface).not.toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
});

test("picker selection, rejection, removal, and form reset remain native", async ({ page }) => {
  const acceptance = page.getByTestId("file-upload-acceptance");
  const input = acceptance.locator('input[type="file"]');
  await input.setInputFiles({ name: "notes.txt", mimeType: "text/plain", buffer: Buffer.from("notes") });
  await expect(acceptance.getByRole("status")).toContainText("notes.txt");
  await expect(acceptance.locator(".brick-file-upload")).toHaveAttribute("data-rejected", "");
  await expect(acceptance.locator(".brick-file-upload")).not.toHaveAttribute("data-invalid");
  await input.setInputFiles({ name: "photo.png", mimeType: "image/png", buffer: Buffer.from("photo") });
  await expect(acceptance.getByText("photo.png")).toBeVisible();
  await acceptance.getByRole("button", { name: "Remove photo.png" }).click();
  await expect(acceptance.getByText("photo.png")).toHaveCount(0);

  const form = page.getByRole("form", { name: "Attachment form" });
  await form.getByRole("button", { name: "Save attachments" }).click();
  await expect(form.locator(".brick-field")).toHaveAttribute("data-invalid", "");
  await expect(form.getByText("Add at least one document.")).toBeVisible();
  await expect(form.getByRole("button", { name: "Documents Choose files" })).toBeFocused();
  await form.getByRole("button", { name: "Reset" }).click();
  await expect(form.locator(".brick-field")).not.toHaveAttribute("data-invalid");
  await expect(form.getByText("Add at least one document.")).toBeHidden();
  await expect(form.locator("output")).toContainText("Form reset");
});

test("file drag acceptance and rejection are visible before drop", async ({ page }) => {
  const zone = page.getByTestId("file-upload-acceptance").locator(".brick-file-upload__dropzone");
  await zone.evaluate((element) => {
    const transfer = new DataTransfer();
    transfer.items.add(new File(["image"], "image.png", { type: "image/png" }));
    element.dispatchEvent(new DragEvent("dragover", { bubbles: true, cancelable: true, dataTransfer: transfer }));
  });
  await expect(zone).toHaveAttribute("data-drag", "accept");
  await expect(zone).toHaveAttribute("data-accepted", "");
  await zone.evaluate((element) => {
    const transfer = new DataTransfer();
    transfer.items.add(new File(["text"], "notes.txt", { type: "text/plain" }));
    element.dispatchEvent(new DragEvent("dragover", { bubbles: true, cancelable: true, dataTransfer: transfer }));
  });
  await expect(zone).toHaveAttribute("data-drag", "reject");
  await expect(zone).toHaveAttribute("data-rejected", "");
});

test("recipes, narrow layout, RTL action placement, and accessibility remain correct", async ({ page }) => {
  await expect(page.getByTestId("file-upload-variants").locator(".brick-file-upload")).toHaveCount(3);
  await expect(page.getByTestId("file-upload-recipes").locator(".brick-file-upload")).toHaveCount(5);
  await page.setViewportSize({ width: 390, height: 844 });
  const stress = page.getByTestId("file-upload-stress");
  expect((await stress.boundingBox())!.width).toBeLessThanOrEqual(390);
  const rtlItem = stress.locator('[dir="rtl"] .brick-file-upload__item');
  const itemBox = await rtlItem.boundingBox();
  const deleteBox = await rtlItem.getByRole("button").boundingBox();
  expect(itemBox && deleteBox).toBeTruthy();
  expect(deleteBox!.x).toBeLessThan(itemBox!.x + itemBox!.width / 2);
  expect(deleteBox!.width).toBeGreaterThanOrEqual(44);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
