import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/checkbox");
});

test("Checkbox pointer and keyboard activation expose checked and mixed state", async ({ page }) => {
  const ready = page.getByRole("checkbox", { name: "Ready to publish" });
  const controlled = page.getByRole("checkbox", { name: "Controlled tri-state" });
  await expect(ready).toHaveAttribute("aria-checked", "true");
  await ready.click();
  await expect(ready).toHaveAttribute("aria-checked", "false");
  await controlled.focus();
  await expect(controlled).toHaveAttribute("aria-checked", "mixed");
  await page.keyboard.press("Space");
  await expect(controlled).toHaveAttribute("aria-checked", "true");
  await page.keyboard.press("Enter");
  await expect(controlled).toHaveAttribute("aria-checked", "false");
});

test("CheckboxGroup Parent moves through none, some, and all without losing outside behavior", async ({ page }) => {
  const stage = page.getByTestId("checkbox-overview");
  const parent = stage.getByRole("checkbox", { name: "All release channels" });
  const email = stage.getByRole("checkbox", { name: "Email" });
  const sms = stage.getByRole("checkbox", { name: "SMS" });
  const push = stage.getByRole("checkbox", { name: "Push notifications" });
  await expect(parent).toHaveAttribute("aria-checked", "mixed");
  await parent.click();
  for (const item of [email, sms, push]) await expect(item).toHaveAttribute("aria-checked", "true");
  await expect(parent).toHaveAttribute("aria-checked", "true");
  await sms.click();
  await expect(parent).toHaveAttribute("aria-checked", "mixed");
  await parent.click();
  for (const item of [email, sms, push]) await expect(item).toHaveAttribute("aria-checked", "true");
});

test("structured item name and description relationships are complete before interaction", async ({ page }) => {
  const item = page.getByRole("checkbox", { name: "Email" }).first();
  const labelId = await item.getAttribute("aria-labelledby");
  const descriptionId = await item.getAttribute("aria-describedby");
  expect(labelId).toBeTruthy();
  expect(descriptionId).toBeTruthy();
  await expect(page.locator(`#${labelId}`)).toHaveText("Email");
  await expect(page.locator(`#${descriptionId}`)).toContainText("Delivery and account notices");
});

test("native FormData, required validity, external ownership, and reset work", async ({ page }) => {
  const form = page.getByRole("form", { name: "Publishing preferences" });
  const acknowledgement = form.getByRole("checkbox", { name: "Release acknowledgement" });
  const email = form.getByRole("checkbox", { name: "Email report" });
  const external = page.getByRole("checkbox", { name: "Externally owned preference" });
  await acknowledgement.click();
  await email.click();
  await external.click();
  await form.getByRole("button", { name: "Save preferences" }).click();
  await expect(page.getByText(/Submitted: accepted; email/)).toBeVisible();
  await form.getByRole("button", { name: "Reset" }).click();
  for (const checkbox of [acknowledgement, email, external]) {
    await expect(checkbox).toHaveAttribute("aria-checked", "false");
  }
});

test("disabled and read-only choices block activation while retaining state", async ({ page }) => {
  const disabled = page.getByRole("checkbox", { name: "Disabled", exact: true });
  const readOnly = page.getByRole("checkbox", { name: "Read only" });
  await expect(disabled).toBeDisabled();
  await disabled.click({ force: true });
  await expect(disabled).toHaveAttribute("aria-checked", "false");
  await readOnly.click();
  await expect(readOnly).toHaveAttribute("aria-checked", "true");
});

test("composition retains one control and public Brick anatomy", async ({ page }) => {
  const composed = page.getByRole("checkbox", { name: "Composed adapter" });
  await expect(composed).toHaveAttribute("data-adapter", "composed-checkbox");
  await expect(composed.locator(".brick-checkbox-control")).toHaveCount(1);
  const item = page.getByRole("checkbox", { name: "Composed item" });
  await expect(item).toHaveAttribute("data-adapter", "composed-item");
  await expect(item.locator(".brick-checkbox-control")).toHaveCount(1);
  await expect(item).toHaveAttribute("aria-describedby", /.+/);
});

test("family remains contained at 256 px, honors RTL, and passes axe", async ({ page }) => {
  await page.setViewportSize({ width: 256, height: 720 });
  const stress = page.getByTestId("checkbox-stress");
  await expect(stress.locator('[dir="rtl"]')).toHaveAttribute("dir", "rtl");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  for (const frame of await stress.locator(".phone-frame").all()) {
    const frameBox = await frame.boundingBox();
    for (const control of await frame.locator(".brick-checkbox-group, .brick-checkbox-group-item, .brick-checkbox-group-parent").all()) {
      const box = await control.boundingBox();
      expect(box!.x).toBeGreaterThanOrEqual(frameBox!.x - 0.5);
      expect(box!.x + box!.width).toBeLessThanOrEqual(frameBox!.x + frameBox!.width + 0.5);
    }
  }
  const result = await new AxeBuilder({ page }).disableRules(["region"]).analyze();
  expect(result.violations).toEqual([]);
});
