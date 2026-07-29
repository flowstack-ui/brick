import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => page.goto("/file-upload"));

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
  await expect(page.getByTestId("file-upload-variants").locator(".brick-file-upload")).toHaveCount(2);
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
