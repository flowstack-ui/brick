import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";
import type { Locator } from "@playwright/test";

async function focusTrigger(trigger: Locator) {
  await trigger.evaluate(async element => {
    element.scrollIntoView({ block: "center", behavior: "instant" });
    await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
    (element as HTMLElement).focus({ preventScroll: true });
  });
}

test("only the dedicated defaultOpen specimen starts open", async ({
  page,
}) => {
  await page.goto("/tooltip?qualification=1");
  const visibleTooltips = page.getByRole("tooltip").filter({ visible: true });
  await expect(visibleTooltips).toHaveCount(1);
  await expect(visibleTooltips).toHaveText("Default-open state");
  await expect(visibleTooltips).toHaveAttribute("data-positioned", "");
});

test("Tooltip opens from focus and closes with Escape without moving focus", async ({
  page,
}) => {
  await page.goto("/tooltip?qualification=1");
  const trigger = page.getByRole("button", { name: "Search workspace" });
  const tooltip = page.getByRole("tooltip", { name: "Search workspace" });
  await focusTrigger(trigger);
  await expect(tooltip).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(tooltip).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("Tooltip removes authored motion when reduced motion is requested", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/tooltip?qualification=1");
  await page.getByRole("button", { name: "Search workspace" }).focus();
  const durations = await page
    .getByRole("tooltip", { name: "Search workspace" })
    .evaluate((element) => getComputedStyle(element).transitionDuration);
  expect(
    durations.split(",").every((value) => Number.parseFloat(value) <= 0.001),
  ).toBe(true);
});

test("Tooltip exposes plain and rich recipes with shared arrows", async ({
  page,
}) => {
  await page.goto("/tooltip?qualification=1");
  const richTrigger = page.getByRole("button", { name: "Project status" });
  await focusTrigger(richTrigger);
  const rich = page.getByRole("tooltip", { name: "Ready for review" });
  await expect(rich).toHaveAttribute("data-variant", "rich");
  await expect(rich.locator("[data-slot='tooltip-title']")).toHaveText(
    "Ready for review",
  );
  await expect(rich.locator("[data-slot='tooltip-description']")).toBeVisible();
  await expect(rich.locator("[data-slot='tooltip-arrow']")).toBeVisible();
  await expect(
    rich.locator("a,button,input,select,textarea,[tabindex]"),
  ).toHaveCount(0);
  // Portalled tooltip content is intentionally outside the page landmarks.
  expect(
    (await new AxeBuilder({ page }).disableRules(["region"]).analyze())
      .violations,
  ).toEqual([]);
});

test("Plain Tooltip preserves positioning and remains open across its hover bridge", async ({
  page,
}) => {
  await page.goto("/tooltip?qualification=1");
  const trigger = page.getByRole("button", { name: "Search workspace" });
  // Leave room for the bottom tooltip. Scrolling to reveal the tooltip itself
  // correctly exercises closeOnScroll, not hover transfer.
  await trigger.evaluate(element => element.scrollIntoView({ block: "center" }));
  await trigger.hover();
  const tooltip = page.getByRole("tooltip", { name: "Search workspace" });
  await expect(tooltip).toBeVisible();
  expect(await tooltip.evaluate(element => Number.isFinite(parseFloat(getComputedStyle(element).left)))).toBe(true);
  await expect(tooltip).toHaveCSS("scale", "1");
  const bounds = await tooltip.boundingBox();
  await page.mouse.move(bounds!.x + bounds!.width / 2, bounds!.y + bounds!.height / 2);
  await expect(tooltip).toBeVisible();
  await page.locator("h1").hover();
  await expect(tooltip).toBeHidden();
});

test("Tooltip exposes rounded and pill shapes", async ({ page }) => {
  await page.goto("/tooltip?qualification=1");
  const roundedTrigger = page.getByRole("button", { name: "Rounded tooltip" });
  await focusTrigger(roundedTrigger);
  await expect(
    page.getByRole("tooltip", { name: "Rounded tooltip" }),
  ).toHaveAttribute("data-shape", "rounded");
  await page.keyboard.press("Escape");
  const pillTrigger = page.getByRole("button", { name: "Pill tooltip" });
  await focusTrigger(pillTrigger);
  await expect(
    page.getByRole("tooltip", { name: "Pill tooltip" }),
  ).toHaveAttribute("data-shape", "pill");
});

test("Tooltip trigger composition exposes its actual host output", async ({
  page,
}) => {
  await page.goto("/tooltip?qualification=1");
  const composition = page.getByTestId("tooltip-composition");
  await expect(composition.locator("[data-rendered-output]")).toHaveCount(3);
  await expect(composition.getByTestId("tooltip-as-child")).toHaveJSProperty(
    "tagName",
    "BUTTON",
  );
  await expect(composition.getByTestId("tooltip-render")).toHaveJSProperty(
    "tagName",
    "BUTTON",
  );
  await expect(composition.getByTestId("tooltip-native")).toHaveJSProperty(
    "tagName",
    "SPAN",
  );
});

test("Tooltip arrows attach seamlessly to the borderless surface on every side", async ({
  page,
}) => {
  await page.goto("/tooltip?qualification=1");
  for (const name of ["Above", "To the right", "Below", "To the left"]) {
    const trigger = page.getByRole("button", { name });
    await focusTrigger(trigger);
    const tooltip = page.getByRole("tooltip", { name });
    await expect(tooltip).toHaveCSS("opacity", "1");
    const arrow = tooltip.locator("[data-slot='tooltip-arrow']");
    const [surfaceBox, arrowBox, side] = await Promise.all([
      tooltip.boundingBox(),
      arrow.boundingBox(),
      tooltip.getAttribute("data-side"),
    ]);
    expect(surfaceBox).not.toBeNull();
    expect(arrowBox).not.toBeNull();
    const distance = side === "top" ? arrowBox!.y - surfaceBox!.y - surfaceBox!.height
      : side === "bottom" ? arrowBox!.y + arrowBox!.height - surfaceBox!.y
      : side === "left" ? arrowBox!.x - surfaceBox!.x - surfaceBox!.width
      : arrowBox!.x + arrowBox!.width - surfaceBox!.x;
    expect(Math.abs(distance)).toBeLessThan(1);
    await expect(arrow.locator(".brick-floating-arrow__edge").first()).toHaveCSS("stroke-width", "0px");
    await page.keyboard.press("Escape");
  }
});

test("Tooltip remains contained in narrow RTL layouts", async ({ page }) => {
  await page.setViewportSize({ width: 256, height: 640 });
  await page.goto("/tooltip?qualification=1");
  const rtlTrigger = page.getByRole("button", {
    name: "البحث في المشاريع والملفات",
  });
  await focusTrigger(rtlTrigger);
  const tooltip = page.getByRole("tooltip", {
    name: "البحث في المشاريع والملفات",
  });
  await expect(tooltip).toBeVisible();
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth <=
        document.documentElement.clientWidth,
    ),
  ).toBe(true);
  const box = await tooltip.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(256);
});
