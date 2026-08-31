import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("only the dedicated defaultOpen specimen starts open below the sticky header", async ({
  page,
}) => {
  await page.goto("/tooltip");
  const visibleTooltips = page.getByRole("tooltip").filter({ visible: true });
  await expect(visibleTooltips).toHaveCount(1);
  await expect(visibleTooltips).toHaveText("Default-open state");
  const [tooltipLayer, headerLayer] = await Promise.all([
    visibleTooltips.evaluate((element) =>
      Number(getComputedStyle(element).zIndex),
    ),
    page
      .locator(".evidence-review-header")
      .evaluate((element) => Number(getComputedStyle(element).zIndex)),
  ]);
  expect(tooltipLayer).toBeLessThan(headerLayer);
});

test("Tooltip opens from focus and closes with Escape without moving focus", async ({
  page,
}) => {
  await page.goto("/tooltip");
  const trigger = page.getByRole("button", { name: "Search workspace" });
  const tooltip = page.getByRole("tooltip", { name: "Search workspace" });
  await trigger.focus();
  await expect(tooltip).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(tooltip).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("Tooltip removes authored motion when reduced motion is requested", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/tooltip");
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
  await page.goto("/tooltip");
  const richTrigger = page.getByRole("button", { name: "Project status" });
  await richTrigger.focus();
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
  await page.goto("/tooltip");
  const trigger = page.getByRole("button", { name: "Search workspace" });
  await trigger.hover();
  const tooltip = page.getByRole("tooltip", { name: "Search workspace" });
  await expect(tooltip).toBeVisible();
  expect(
    await tooltip.evaluate((element) => getComputedStyle(element).transform),
  ).not.toBe("none");
  await tooltip.hover();
  await expect(tooltip).toBeVisible();
  await page.locator("h1").hover();
  await expect(tooltip).toBeHidden();
});

test("Tooltip exposes rounded and pill shapes", async ({ page }) => {
  await page.goto("/tooltip");
  const roundedTrigger = page.getByRole("button", { name: "Rounded tooltip" });
  await roundedTrigger.focus();
  await expect(
    page.getByRole("tooltip", { name: "Rounded tooltip" }),
  ).toHaveAttribute("data-shape", "rounded");
  await page.keyboard.press("Escape");
  const pillTrigger = page.getByRole("button", { name: "Pill tooltip" });
  await pillTrigger.focus();
  await expect(
    page.getByRole("tooltip", { name: "Pill tooltip" }),
  ).toHaveAttribute("data-shape", "pill");
});

test("Tooltip trigger composition exposes its actual host output", async ({
  page,
}) => {
  await page.goto("/tooltip");
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

test("Tooltip arrows overlap the surface border on every side", async ({
  page,
}) => {
  await page.goto("/tooltip");
  for (const name of ["Above", "To the right", "Below", "To the left"]) {
    const trigger = page.getByRole("button", { name });
    await trigger.focus();
    const tooltip = page.getByRole("tooltip", { name });
    const arrow = tooltip.locator("[data-slot='tooltip-arrow']");
    const [surfaceBox, arrowBox, side] = await Promise.all([
      tooltip.boundingBox(),
      arrow.boundingBox(),
      tooltip.getAttribute("data-side"),
    ]);
    expect(surfaceBox).not.toBeNull();
    expect(arrowBox).not.toBeNull();
    if (side === "top")
      expect(arrowBox!.y).toBeLessThan(surfaceBox!.y + surfaceBox!.height);
    if (side === "right")
      expect(arrowBox!.x + arrowBox!.width).toBeGreaterThan(surfaceBox!.x);
    if (side === "bottom")
      expect(arrowBox!.y + arrowBox!.height).toBeGreaterThan(surfaceBox!.y);
    if (side === "left")
      expect(arrowBox!.x).toBeLessThan(surfaceBox!.x + surfaceBox!.width);
    await page.keyboard.press("Escape");
  }
});

test("Tooltip remains contained in narrow RTL layouts", async ({ page }) => {
  await page.setViewportSize({ width: 256, height: 640 });
  await page.goto("/tooltip");
  const rtlTrigger = page.getByRole("button", {
    name: "البحث في المشاريع والملفات",
  });
  await rtlTrigger.focus();
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
