import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("Popover opens intentionally with generated name and description, then restores focus", async ({ page }) => {
  await page.goto("/popover");
  const trigger = page.getByRole("button", { name: "Project settings" });
  await trigger.focus();
  await page.keyboard.press("Enter");
  const popover = page.getByRole("dialog", { name: "Project settings" });
  await expect(popover).toBeVisible();
  await expect(popover).toHaveAttribute("aria-describedby", /.+/);
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  expect(
    await popover.locator("[data-slot='popover-viewport']").evaluate(
      (element) => getComputedStyle(element).boxShadow,
    ),
  ).not.toBe("none");
  const arrow = popover.locator("[data-slot='popover-arrow']");
  await expect(arrow).toBeVisible();
  const arrowBox = await arrow.boundingBox();
  expect(arrowBox).not.toBeNull();
  expect(arrowBox!.width).toBeGreaterThan(0);
  expect(arrowBox!.height).toBeGreaterThan(0);
  await expect(popover.getByRole("button", { name: "Reset" })).toHaveAttribute("data-variant", "outline");
  await page.keyboard.press("Escape");
  await expect(popover).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("Popover exposes three bounded sizes, shared Arrow, and disabled state", async ({ page }) => {
  await page.goto("/popover");
  for (const size of ["sm", "md", "lg"] as const) {
    await page.getByRole("button", { name: `Open ${size} settings` }).click();
    const popover = page.locator(`[data-slot='popover'][data-size='${size}']`);
    await expect(popover).toBeVisible();
    await expect(popover.locator("[data-slot='popover-arrow']")).toBeVisible();
    await popover.getByRole("button", { name: "Done" }).click();
  }
  await expect(page.getByRole("button", { name: "Unavailable settings" })).toBeDisabled();

  await page.getByRole("button", { name: "Inspect anatomy" }).click();
  const anatomy = page.getByRole("dialog", { name: "Custom workspace panel" });
  await expect(anatomy).toHaveAccessibleDescription(
    "Explicit native ARIA supports native semantic text inside the visual Header.",
  );
  await anatomy.getByRole("button", { name: "Close anatomy" }).click();
});

test("Popover respects explicit dismissal policy and nested top-layer order", async ({ page }) => {
  await page.goto("/popover");
  await page.getByRole("button", { name: "Explicit close only" }).click();
  const explicit = page.getByRole("dialog", { name: "Explicit close settings" });
  await page.keyboard.press("Escape");
  await expect(explicit).toBeVisible();
  await explicit.getByRole("button", { name: "Close explicitly" }).click();

  await page.getByRole("button", { name: "Open parent panel" }).click();
  const parent = page.getByRole("dialog", { name: "Parent panel" });
  await parent.getByRole("button", { name: "Open nested panel" }).click();
  const nested = page.getByRole("dialog", { name: "Nested panel" });
  await expect(nested).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(nested).toBeHidden();
  await expect(parent).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(parent).toBeHidden();
});

test("Popover modal mode traps focus and closes through its visible action", async ({ page }) => {
  await page.goto("/popover");
  const trigger = page.getByRole("button", { name: "Open modal settings" });
  await trigger.click();
  const popover = page.getByRole("dialog", { name: "Open modal settings" });
  await expect(popover).toHaveAttribute("aria-modal", "true");
  for (let index = 0; index < 6; index += 1) {
    await page.keyboard.press("Tab");
    expect(await popover.evaluate((element) => element.contains(document.activeElement))).toBe(true);
  }
  await popover.getByRole("button", { name: "Done" }).click();
  await expect(trigger).toBeFocused();
});

test("Popover remains contained at 256 px, supports RTL, and passes focused axe", async ({ page }) => {
  await page.setViewportSize({ width: 256, height: 640 });
  await page.goto("/popover");
  await page.getByRole("button", { name: "فتح إعدادات المشروع" }).click();
  const popover = page.getByRole("dialog", { name: "إعدادات المشروع" });
  await expect(popover).toBeVisible();
  await expect(popover).toHaveAttribute("dir", "rtl");
  await expect.poll(() => popover.evaluate((element) => getComputedStyle(element).direction)).toBe("rtl");
  const box = await popover.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(256);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  await expect.poll(() => popover.evaluate((element) => getComputedStyle(element).opacity)).toBe("1");
  expect((await new AxeBuilder({ page }).disableRules(["region"]).analyze()).violations).toEqual([]);
});

test("Popover stays open during outside touch scrolling and closes on an outside touch tap", async ({ page }) => {
  await page.goto("/popover");
  await page.getByRole("button", { name: "Project settings" }).click();
  const popover = page.getByRole("dialog", { name: "Project settings" });
  await expect(popover).toBeVisible();

  await page.dispatchEvent("body", "pointerdown", {
    pointerType: "touch",
    pointerId: 7,
    clientX: 10,
    clientY: 10,
  });
  await page.dispatchEvent("body", "pointermove", {
    pointerType: "touch",
    pointerId: 7,
    clientX: 10,
    clientY: 40,
  });
  await page.evaluate(() => window.dispatchEvent(new Event("scroll")));
  await page.dispatchEvent("body", "pointerup", {
    pointerType: "touch",
    pointerId: 7,
    clientX: 10,
    clientY: 40,
  });
  await expect(popover).toBeVisible();

  await page.dispatchEvent("body", "pointerdown", {
    pointerType: "touch",
    pointerId: 8,
    clientX: 10,
    clientY: 10,
  });
  await page.dispatchEvent("body", "pointerup", {
    pointerType: "touch",
    pointerId: 8,
    clientX: 11,
    clientY: 11,
  });
  await expect(popover).toBeHidden();
});

test("Popover stacks long Footer actions inside an extreme narrow viewport", async ({ page }) => {
  await page.setViewportSize({ width: 150, height: 200 });
  await page.goto("/popover");
  await page.getByRole("button", { name: "Open long settings" }).click();

  const popover = page.getByRole("dialog", {
    name: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-without-a-natural-break",
  });
  const actions = [
    popover.getByRole("button", { name: "Reset all settings" }),
    popover.getByRole("button", { name: "Save workspace settings" }),
  ];
  const viewport = popover.locator("[data-slot='popover-viewport']");
  await expect(popover.locator("[data-slot='popover-arrow']")).toBeVisible();
  expect(await viewport.evaluate((element) => element.scrollHeight > element.clientHeight)).toBe(true);

  for (const action of actions) {
    await action.evaluate((element) => element.scrollIntoView({ block: "nearest" }));
    const [actionBox, popoverBox] = await Promise.all([action.boundingBox(), viewport.boundingBox()]);
    expect(actionBox).not.toBeNull();
    expect(popoverBox).not.toBeNull();
    expect(actionBox!.x).toBeGreaterThanOrEqual(popoverBox!.x);
    expect(actionBox!.x + actionBox!.width).toBeLessThanOrEqual(popoverBox!.x + popoverBox!.width);
    expect(actionBox!.y).toBeGreaterThanOrEqual(popoverBox!.y);
    expect(actionBox!.y + actionBox!.height).toBeLessThanOrEqual(popoverBox!.y + popoverBox!.height);
  }

});
