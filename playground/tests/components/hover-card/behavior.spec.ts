import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("HoverCard appearance and customization previews start closed", async ({ page }) => {
  await page.goto("/hover-card");
  await expect(page.locator("[data-slot='hover-card']")).toHaveCount(0);

  await page.getByRole("link", { name: "light profile" }).focus();
  await expect(
    page.locator("[data-slot='hover-card']").filter({ hasText: "Ada Lovelace" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");

  await page.getByRole("link", { name: "Custom profile" }).focus();
  await expect(page.locator("[data-slot='custom-hover-card']")).toBeVisible();
});

test("HoverCard opens from keyboard focus, closes with Escape, and keeps link focus", async ({ page }) => {
  await page.goto("/hover-card");
  const trigger = page.getByRole("link", { name: "Ada Lovelace" });
  await trigger.focus();
  const content = page.getByTestId("hover-card-content-ada-lovelace");
  await expect(content).toBeVisible();
  const [containerBackground, contentBackground] = await Promise.all([
    page
      .getByTestId("hover-card-overview")
      .evaluate((element) => getComputedStyle(element).backgroundColor),
    content.evaluate((element) => getComputedStyle(element).backgroundColor),
  ]);
  expect(containerBackground).not.toBe(contentBackground);
  await expect(content).not.toHaveAttribute("role");
  await expect(trigger).not.toHaveAttribute("aria-expanded");
  await expect(trigger).not.toHaveAttribute("aria-haspopup");
  await page.keyboard.press("Escape");
  await expect(content).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("HoverCard remains open across the pointer bridge and contains no interactive descendants", async ({ page, isMobile }) => {
  test.skip(isMobile, "Pointer-bridge behavior requires a hover-capable project");
  await page.goto("/hover-card");
  const trigger = page.getByRole("link", { name: "Grace Hopper" });
  await trigger.evaluate((element) => element.scrollIntoView({ block: "center" }));
  await trigger.hover();
  const content = page.locator("[data-slot='hover-card']").filter({ hasText: "compiler pioneer" });
  await expect(content).toBeVisible();
  await content.hover();
  await page.waitForTimeout(150);
  await expect(content).toBeVisible();
  await expect(content.locator("a,button,input,select,textarea,[tabindex]" )).toHaveCount(0);
});

test("HoverCard does not open from touch and preserves native link navigation", async ({ page }) => {
  await page.addInitScript(() => {
    const nativeMatchMedia = window.matchMedia.bind(window);
    window.matchMedia = (query) => query === "(any-hover: hover)"
      ? {
          matches: false,
          media: query,
          onchange: null,
          addEventListener() {},
          removeEventListener() {},
          addListener() {},
          removeListener() {},
          dispatchEvent: () => true,
        }
      : nativeMatchMedia(query);
  });
  await page.goto("/hover-card");
  const trigger = page.getByRole("link", { name: "Ada Lovelace" });
  await trigger.dispatchEvent("pointerdown", { pointerType: "touch" });
  await trigger.dispatchEvent("pointerover", { pointerType: "touch" });
  await trigger.dispatchEvent("pointerup", { pointerType: "touch" });
  await page.waitForTimeout(30);
  await trigger.dispatchEvent("mouseenter");
  await trigger.dispatchEvent("focus");
  await page.waitForTimeout(50);
  await expect(page.getByTestId("hover-card-content-ada-lovelace")).toHaveCount(0);
  await trigger.click();
  await expect(page).toHaveURL(/\/hover-card\/destination\?resource=ada-lovelace$/);
  await expect(page.getByTestId("hover-card-destination")).toBeVisible();
});

test("HoverCard exposes the three bounded sizes, optional shared Arrow, and disabled state", async ({ page, isMobile }) => {
  await page.goto("/hover-card");
  for (const size of ["sm", "md", "lg"] as const) {
    await page.getByRole("link", { name: `${size} preview` }).focus();
    const content = page.getByTestId(`hover-card-content-${size}-preview`);
    await expect(content).toBeVisible();
    const arrow = content.locator("[data-slot='hover-card-arrow']");
    await expect(arrow).toBeVisible();
    if (!isMobile) {
      await expect(content).toHaveAttribute("data-side", /^(top|right|bottom|left)$/);
      const arrowPaint = await arrow.evaluate((element) => {
        const style = getComputedStyle(element);
        return { filter: style.filter, translate: style.translate };
      });
      expect(arrowPaint.translate).not.toBe("none");
      expect(arrowPaint.translate).not.toBe("0px");
      expect(arrowPaint.filter).toContain("drop-shadow");
    }
    await page.keyboard.press("Escape");
  }

  await page.getByRole("link", { name: "Left, no arrow" }).focus();
  const noArrow = page.getByTestId("hover-card-content-left-no-arrow");
  await expect(noArrow).toBeVisible();
  await expect(noArrow.locator("[data-slot='hover-card-arrow']")).toHaveCount(0);
  await page.keyboard.press("Escape");

  await page.getByRole("link", { name: "Disabled preview" }).focus();
  await expect(page.locator("[data-slot='hover-card']").filter({ hasText: "must not open" })).toHaveCount(0);
});

test("HoverCard keeps its genuine link contract and passes the focused accessibility audit", async ({ page }) => {
  await page.goto("/hover-card");
  const link = page.getByRole("link", { name: "Compiler project notes" });
  await expect(link).toHaveAttribute("href", "/hover-card/destination?resource=compiler-project-notes");
  const output = page
    .getByTestId("hover-card-composition")
    .locator("[data-rendered-output]");
  await expect(output).toHaveCount(2);
  await expect(output.last()).toContainText(
    'href="/hover-card/destination?resource=render-resource"',
  );
  await link.focus();
  await expect(page.locator("[data-slot='hover-card']").filter({ hasText: "12 minute read" })).toBeVisible();
  // Portalled preview content is intentionally generic and outside landmarks.
  expect((await new AxeBuilder({ page }).disableRules(["region"]).analyze()).violations).toEqual([]);
});

test("HoverCard remains contained at 256 px and supports RTL logical layout", async ({ page }) => {
  await page.setViewportSize({ width: 256, height: 640 });
  await page.goto("/hover-card");
  await page.getByRole("link", { name: "ملف آدا لوفلايس" }).focus();
  const content = page.locator("[data-slot='hover-card']").filter({ hasText: "عالمة رياضيات" });
  await expect(content).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  const box = await content.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(256);
});

test("HoverCard can fall back to a perpendicular axis when neither horizontal side fits", async ({ page }) => {
  await page.setViewportSize({ width: 256, height: 640 });
  await page.goto("/hover-card");
  const trigger = page.getByRole("link", { name: "Right" });
  await trigger.evaluate((element) => {
    element.style.position = "fixed";
    element.style.insetInlineStart = "50%";
    element.style.top = "20rem";
  });
  await trigger.focus();
  const content = page.getByTestId("hover-card-content-right");
  await expect(content).toBeVisible();
  await expect(content).toHaveAttribute("data-side", /^(top|bottom)$/);
});

test("HoverCard preserves the requested side when another alignment fits", async ({ page }) => {
  await page.setViewportSize({ width: 1000, height: 720 });
  await page.goto("/hover-card");
  const trigger = page.getByRole("link", { name: "Top", exact: true });
  await trigger.evaluate((element) => {
    element.style.position = "fixed";
    element.style.insetInlineStart = "0.5rem";
    element.style.top = "20rem";
  });
  await trigger.focus();
  const content = page.getByTestId("hover-card-content-top");
  await expect(content).toBeVisible();
  await expect(content).toHaveAttribute("data-side", "top");
  const box = await content.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(1000);
});
