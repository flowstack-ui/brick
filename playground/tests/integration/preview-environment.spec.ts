import { expect, test } from "@playwright/test";

test("component routes retain inline examples and app-bar-only settings", async ({ page }) => {
  await page.route(/https:\/\/(www.youtube.com|www.google.com)\//, route => route.fulfill({ contentType: "text/html", body: "<!doctype html><title>Embed fixture</title>" }));
  for (const route of ["aspect-ratio", "button", "visually-hidden"]) {
    await page.goto(`/${route}?testMode=1&isolated=1`);
    await expect(page.locator("[data-scenario]").first()).toBeVisible();
    await expect(page.locator('iframe[src*="preview.html"]')).toHaveCount(0);
    if (route === "aspect-ratio") {
      await expect(page.locator('iframe[title="Big Buck Bunny — Blender animated short"]')).toHaveCount(1);
      await expect(page.locator('iframe[title="Map of Lagos, Nigeria"]')).toHaveCount(1);
    }
    await expect(page.locator("[data-preview-example], .preview-viewport-scroll")).toHaveCount(0);
    await expect(page.getByRole("button", { name: "View page source", exact: true })).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Reset example", exact: true })).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Preview settings", exact: true })).toHaveCount(1);
  }
});

test("app-bar preferences work without changing example presentation", async ({ page }) => {
  await page.goto("/button?testMode=1");
  await page.getByRole("button", { name: "Preview settings", exact: true }).click();
  await page.getByLabel("Appearance", { exact: true }).selectOption("dark");
  await page.getByLabel("Example direction", { exact: true }).selectOption("rtl");
  await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
  await expect(page.locator("[data-playground-examples]")).toHaveAttribute("dir", "rtl");
  await page.getByLabel("Font", { exact: true }).selectOption("inter");
  await page.getByLabel("Radius", { exact: true }).selectOption("square");
  await expect(page.locator("html")).toHaveAttribute("data-preview-font", "inter");
  await page.getByLabel("Theme", { exact: true }).selectOption("qualification");
  await expect(page.getByLabel("Radius", { exact: true })).toBeDisabled();
  await expect(page.locator("html")).toHaveAttribute("data-flowstack-theme", "qualification");
  await page.getByLabel("Theme", { exact: true }).selectOption("brick");
  await expect(page.locator("html")).toHaveAttribute("data-preview-radius", "square");
  await page.keyboard.press("Escape");
  await expect(page.locator('iframe[src*="preview.html"]')).toHaveCount(0);
  await page.reload();
  await expect(page.locator("[data-playground-examples]")).toHaveAttribute("dir", "rtl");
});

test("settings retain padded anatomy, scrolling and focus return on a short screen", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 500 });
  await page.goto("/aspect-ratio?testMode=1");
  const trigger = page.getByRole("button", { name: "Preview settings", exact: true });
  await trigger.click();
  const popover = page.locator('[data-slot="popover"]');
  await expect(popover).toBeVisible();
  const inset = await popover.evaluate(root => {
    const title = root.querySelector('[data-slot="popover-title"]')!.getBoundingClientRect();
    const box = root.getBoundingClientRect();
    return { left: title.left - box.left, top: title.top - box.top };
  });
  expect(inset.left).toBeGreaterThanOrEqual(12);
  expect(inset.top).toBeGreaterThanOrEqual(12);
  const reset = popover.getByRole("button", { name: "Reset preferences", exact: true });
  await reset.scrollIntoViewIfNeeded();
  await expect(reset).toBeInViewport();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});

test("denied storage does not prevent inline rendering", async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(window, "localStorage", { get() { throw new DOMException("Denied", "SecurityError"); } }));
  await page.goto("/aspect-ratio?appearance=light");
  await expect(page.locator("[data-scenario]").first()).toBeVisible();
  await expect(page.locator('iframe[src*="preview.html"]')).toHaveCount(0);
});
