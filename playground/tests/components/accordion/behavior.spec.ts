import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/accordion"); });

test("defaults, recipes, and selection models preserve controlled differences", async ({ page }) => {
  const root = page.getByTestId("accordion-overview").locator(".brick-accordion");
  await expect(root).toHaveAttribute("data-variant", "plain");
  await expect(root).toHaveAttribute("data-size", "md");
  await expect(root).toHaveAttribute("data-orientation", "vertical");
  for (const variant of ["plain", "soft", "outline"]) await expect(page.getByTestId("accordion-variants").locator(`.brick-accordion[data-variant='${variant}']`)).toHaveCount(1);
  for (const size of ["sm", "md", "lg"]) await expect(page.getByTestId("accordion-sizes").locator(`.brick-accordion[data-size='${size}']`)).toHaveCount(1);
  await expect(page.getByTestId("accordion-selection").locator(".brick-accordion-content[data-state='open']")).toHaveCount(4);
});

test("specimens stay top-aligned while content opens and composition is not duplicated", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const sizes = page.getByTestId("accordion-sizes").locator(".brick-accordion");
  const initiallyOpen = page.getByTestId("accordion-states").locator(".brick-accordion-content[data-initial-open]").first();
  await expect(initiallyOpen).toHaveCSS("animation-name", "none");
  const sizeOffsets = await sizes.evaluateAll((elements) => elements.map((element) => {
    const cell = element.closest(".forms-cell");
    return element.getBoundingClientRect().top - (cell?.getBoundingClientRect().top ?? 0);
  }));
  expect(Math.max(...sizeOffsets) - Math.min(...sizeOffsets)).toBeLessThan(1);

  const controlled = page.getByTestId("accordion-selection").locator(".forms-cell").filter({ hasText: "controlled" });
  const controlledRoot = controlled.locator(".brick-accordion");
  const topBefore = await controlledRoot.evaluate((element) => element.getBoundingClientRect().top + window.scrollY);
  const transition = await controlledRoot.getByRole("button", { name: "Account settings" }).evaluate(async (trigger) => {
    (trigger as HTMLElement).click();
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    const content = trigger.closest(".brick-accordion-item")?.querySelector<HTMLElement>(".brick-accordion-content");
    return {
      fillMode: content ? getComputedStyle(content).animationFillMode : "",
      measuredHeight: content?.style.getPropertyValue("--content-height") ?? "",
    };
  });
  expect(transition.fillMode).toBe("both");
  expect(transition.measuredHeight).toMatch(/^\d+(?:\.\d+)?px$/);
  await expect(controlledRoot.locator(".brick-accordion-content[data-state='open']")).toHaveCount(1);
  const topAfter = await controlledRoot.evaluate((element) => element.getBoundingClientRect().top + window.scrollY);
  expect(Math.abs(topAfter - topBefore)).toBeLessThan(1);

  await expect(page.getByTestId("accordion-composition").locator(".brick-accordion")).toHaveCount(1);
});

test("activation, locked-open, disabled, mounted, and landmark lifecycle remain correct", async ({ page }) => {
  const root = page.getByTestId("accordion-overview").locator(".brick-accordion");
  const trigger = root.getByRole("button", { name: "Account settings" });
  await trigger.press("Enter");
  const region = root.getByRole("region");
  expect(await trigger.getAttribute("aria-controls")).toBe(await region.getAttribute("id"));
  expect(await region.getAttribute("aria-labelledby")).toBe(await trigger.getAttribute("id"));
  const locked = page.getByTestId("accordion-selection").getByRole("button", { name: "Account settings" }).first();
  await expect(locked).toHaveAttribute("data-locked-open", "");
  await expect(locked).toHaveAttribute("aria-disabled", "true");
  const states = page.getByTestId("accordion-states");
  await expect(states.locator(".brick-accordion-trigger[data-disabled]")).toHaveCount(4);
  await expect(states.locator(".brick-accordion-content[hidden]")).toHaveCount(1);
  await expect(states.locator(".brick-accordion-content").last()).not.toHaveAttribute("role");
});

test("vertical and direction-aware horizontal keyboard navigation are stable", async ({ page }) => {
  const orientation = page.getByTestId("accordion-orientation");
  const vertical = orientation.locator(".brick-accordion[data-orientation='vertical']").getByRole("button");
  await vertical.first().focus();
  await vertical.first().press("ArrowDown");
  await expect(vertical.nth(1)).toBeFocused();
  const horizontal = orientation.locator(".brick-accordion[data-orientation='horizontal']").getByRole("button");
  const horizontalRoot = orientation.locator(".brick-accordion[data-orientation='horizontal']");
  const horizontalContent = horizontalRoot.locator(".brick-accordion-content[data-state='open']");
  await expect(horizontal.first()).toHaveCSS("writing-mode", "vertical-rl");
  await expect(horizontalContent).toHaveCSS("writing-mode", "horizontal-tb");
  const ltrTriggerBox = (await horizontal.first().boundingBox())!;
  const ltrContentBox = (await horizontalContent.boundingBox())!;
  expect(ltrContentBox.x).toBeGreaterThanOrEqual(ltrTriggerBox.x + ltrTriggerBox.width - 1);
  await horizontal.first().focus();
  await horizontal.first().press("ArrowRight");
  await expect(horizontal.nth(1)).toBeFocused();
  await horizontal.nth(1).click();
  const openedInner = horizontalRoot.locator(".brick-accordion-content[data-state='open'] .brick-accordion-content-inner");
  await expect.poll(() => openedInner.evaluate((element) => element.getBoundingClientRect().width)).toBeGreaterThan(100);
  await expect(openedInner).toHaveCSS("writing-mode", "horizontal-tb");
  const rtl = page.getByTestId("accordion-stress").locator("[dir='rtl'] .brick-accordion").getByRole("button");
  const rtlRoot = page.getByTestId("accordion-stress").locator("[dir='rtl'] .brick-accordion");
  const rtlTriggerBox = (await rtl.first().boundingBox())!;
  const rtlContentBox = (await rtlRoot.locator(".brick-accordion-content[data-state='open']").boundingBox())!;
  expect(rtlContentBox.x + rtlContentBox.width).toBeLessThanOrEqual(rtlTriggerBox.x + 1);
  await rtl.first().focus();
  await rtl.first().press("ArrowLeft");
  await expect(rtl.nth(1)).toBeFocused();
});

test("default indicator direction and focus geometry remain complete", async ({ page }) => {
  const verticalRoot = page.getByTestId("accordion-overview").locator(".brick-accordion");
  const verticalTrigger = verticalRoot.getByRole("button", { name: "Account settings" });
  const indicator = verticalTrigger.locator(".brick-accordion-indicator");

  await expect(indicator).toHaveCSS("transform", "matrix(1, 0, 0, 1, 0, 0)");
  await verticalTrigger.focus();
  await expect(verticalTrigger).toBeFocused();
  await expect(verticalRoot).toHaveCSS("overflow", "visible");
  await expect(verticalTrigger).toHaveCSS("outline-style", "solid");
  await verticalTrigger.click();
  await expect(indicator).toHaveCSS("transform", "matrix(-1, 0, 0, -1, 0, 0)");

  const horizontalRoot = page.getByTestId("accordion-orientation").locator(".brick-accordion[data-orientation='horizontal']");
  const horizontalTrigger = horizontalRoot.getByRole("button").first();
  await horizontalTrigger.focus();
  expect(await horizontalTrigger.evaluate((element) => Number.parseFloat(getComputedStyle(element).outlineOffset))).toBeLessThan(0);
});

test("responsive overflow and accessibility remain contained", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const phone = page.locator(".accordion-phone");
  expect(await phone.evaluate((element) => element.scrollWidth >= element.clientWidth)).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  expect((await new AxeBuilder({ page }).include('[data-testid="accordion-workbench"]').disableRules(["landmark-unique"]).analyze()).violations).toEqual([]);
});
