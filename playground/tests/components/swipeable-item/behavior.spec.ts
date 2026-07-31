import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/swipeable-item");
  await expect(page.getByTestId("swipeable-overview-item")).toBeVisible();
});

test("defaults, three-part anatomy, labels, and vertical-pan policy are deterministic", async ({ page }) => {
  const root = page.getByTestId("swipeable-overview-item");
  const content = root.locator(".brick-swipeable-item__content");
  await expect(root).toHaveAttribute("data-state", "closed");
  await expect(root).toHaveAttribute("data-variant", "outline");
  await expect(root).toHaveAttribute("data-slot", "swipeable-item");
  await expect(content).toHaveAttribute("data-slot", "swipeable-item-content");
  await expect(content).toHaveCSS("touch-action", "pan-y");
  await expect(root.locator('[aria-label="Archive actions"]')).toHaveAttribute("data-side", "start");
  await expect(root.locator('[aria-label="Delete actions"]')).toHaveAttribute("data-side", "end");
});

test("pointer and keyboard reveal settle, close, and preserve nested controls", async ({ page }) => {
  const root = page.getByTestId("swipeable-overview-item");
  const content = root.locator(".brick-swipeable-item__content");
  const box = await content.boundingBox();
  if (!box) throw new Error("Swipeable Item Content has no geometry");
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width / 2 - 120, box.y + box.height / 2, { steps: 8 });
  await page.mouse.up();
  await expect(root).toHaveAttribute("data-side", "end");
  await root.getByRole("button", { name: "Delete" }).click();
  await expect(root).toHaveAttribute("data-state", "closed");

  await content.focus();
  await content.press("ArrowRight");
  await expect(root).toHaveAttribute("data-side", "start");
  await content.press("Escape");
  await root.getByRole("button", { name: "More actions" }).click();
  await page.getByRole("menuitem", { name: "Archive" }).press("ArrowLeft");
  await expect(root).toHaveAttribute("data-state", "closed");
  await page.keyboard.press("Escape");
});

test("visible alternatives, state recipes, control, customization, and RTL remain stable", async ({ page }) => {
  const overview = page.getByTestId("swipeable-overview");
  await overview.getByRole("button", { name: "More actions" }).click();
  await page.getByRole("menuitem", { name: "Archive" }).click();
  await expect(overview.getByText("Archived from menu")).toBeVisible();
  await expect(page.getByRole("menu", { name: "Message actions" })).toBeHidden();

  const states = page.locator("#scenario-swipeable-item-states .brick-swipeable-item");
  await expect(states.nth(0)).toHaveAttribute("data-disabled", "");
  await expect(states.nth(1)).toHaveAttribute("data-readonly", "");
  const controlled = page.locator("#scenario-swipeable-item-controlled");
  await controlled.getByRole("button", { name: "Open end" }).click();
  await expect(controlled.locator(".brick-swipeable-item")).toHaveAttribute("data-side", "end");
  await controlled.getByRole("button", { name: "Close" }).click();
  await expect(controlled.locator(".brick-swipeable-item")).toHaveAttribute("data-state", "closed");

  const customized = page.locator("#scenario-swipeable-item-customized .brick-swipeable-item");
  expect(await customized.evaluate(node => getComputedStyle(node).getPropertyValue("--brick-swipeable-item-radius").trim())).toBe("1.25rem");
  const customizedBadge = page.locator("#scenario-swipeable-item-customized .brick-badge");
  expect((await customizedBadge.boundingBox())!.width).toBeLessThan(120);
  const rtl = page.locator("#scenario-swipeable-item-stress [dir=rtl] .brick-swipeable-item");
  await expect(rtl).toHaveAttribute("dir", "rtl");
  await rtl.locator(".brick-swipeable-item__content").focus();
  await rtl.locator(".brick-swipeable-item__content").press("Escape");
  await rtl.locator(".brick-swipeable-item__content").press("ArrowRight");
  await expect(rtl).toHaveAttribute("data-side", "end");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test("narrow content remains contained", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const phone = page.locator(".swipeable-phone");
  expect(await phone.evaluate(node => node.scrollWidth <= node.clientWidth)).toBe(true);
});
