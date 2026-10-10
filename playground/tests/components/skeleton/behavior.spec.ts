import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";
test.beforeEach(async ({ page }) => { await page.goto("/skeleton?qualification=1"); });
test("defaults, variants, animations, dimensions, and lines are complete", async ({ page }) => {
  const root = page.getByTestId("skeleton-overview").locator(".brick-skeleton");
  await expect(root).toHaveAttribute("data-variant", "text"); await expect(root).toHaveAttribute("data-animation", "pulse"); await expect(root).toHaveAttribute("aria-hidden", "true");
  for (const variant of ["text", "circular", "rectangular", "rounded"]) await expect(page.getByTestId("skeleton-variants").locator(`.brick-skeleton[data-variant='${variant}']`)).toHaveCount(1);
  for (const animation of ["pulse", "wave", "none"]) await expect(page.getByTestId("skeleton-animation").locator(`.brick-skeleton[data-animation='${animation}']`)).toHaveCount(1);
  await expect(page.getByTestId("skeleton-lines").locator(".brick-skeleton[data-lines='5'] .brick-skeleton-line")).toHaveCount(5);
});
test("wrapped content preserves one root and becomes interactive only when loaded", async ({ page }) => {
  const area = page.getByTestId("skeleton-loading"); const toggle = area.getByRole("button", { name: "Show content" });
  const wrapper = area.locator(".brick-skeleton[data-has-children]").nth(1);
  await expect(wrapper).toHaveClass(/brick-surface/); await toggle.click();
  await expect(area.getByText("Project ready")).toBeVisible(); await expect(wrapper).toHaveClass(/brick-surface/); await expect(wrapper).not.toHaveAttribute("aria-hidden");
});
test("region ownership, narrow geometry, and accessibility remain correct", async ({ page }) => {
  const region = page.getByRole("region", { name: "Loading profile" }); await expect(region).toHaveAttribute("aria-busy", "true");
  await page.setViewportSize({ width: 390, height: 844 }); expect((await page.getByTestId("skeleton-stress").boundingBox())!.width).toBeLessThanOrEqual(390);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
test("contextual paint remains visible on a dark overlay surface", async ({ page }) => {
  const skeleton = page.getByTestId("skeleton-appearance").locator('[data-brick-appearance="dark"] .brick-skeleton-line').first();
  const colors = await skeleton.evaluate((element) => {
    const parent = element.parentElement!;
    parent.style.background = "var(--brick-color-surface-overlay)";
    return {
      skeleton: getComputedStyle(element).backgroundColor,
      surface: getComputedStyle(parent).backgroundColor,
    };
  });
  expect(colors.skeleton).not.toBe(colors.surface);
  expect(colors.skeleton).not.toBe("rgba(0, 0, 0, 0)");
});

test("loading lines have one pulse layer and loaded lines have no paint", async ({ page }) => {
  const lines = page.getByTestId("skeleton-lines").locator(".brick-skeleton[data-lines='3']");
  await expect(lines).toHaveAttribute("inert", "");
  expect(await lines.evaluate((root) => ({ root: getComputedStyle(root).animationName, line: getComputedStyle(root.firstElementChild!).animationName }))).toEqual({ root: "brick-skeleton-pulse", line: "none" });
  const opacity = await lines.evaluate((root) => {
    for (const animation of root.getAnimations()) { animation.pause(); animation.currentTime = 600; }
    return Number(getComputedStyle(root).opacity) * Number(getComputedStyle(root.firstElementChild!).opacity);
  });
  expect(opacity).toBeCloseTo(0.5, 1);
  // Isolate the paint contract without depending on a demo state control.
  await lines.evaluate((root) => { root.removeAttribute("data-loading"); root.removeAttribute("data-skeleton-loading"); });
  expect(await lines.locator(".brick-skeleton-line").first().evaluate((line) => getComputedStyle(line).backgroundColor)).toBe("rgba(0, 0, 0, 0)");
});

test("loading content is inert and keeps dimensions when revealed", async ({ page }) => {
  const area = page.getByTestId("skeleton-loading");
  const blocked = area.locator(".brick-skeleton").first();
  await blocked.evaluate((button: HTMLElement) => button.focus());
  await expect(blocked).not.toBeFocused();
  const host = area.locator(".brick-skeleton").nth(1);
  const before = await host.boundingBox();
  await area.getByRole("button", {name:"Show content"}).click();
  const after = await host.boundingBox();
  expect(after?.width).toBeCloseTo(before!.width, 1);
  expect(after?.height).toBeCloseTo(before!.height, 1);
  await expect(host).not.toHaveAttribute("inert");
});

test("docs show focused examples and responsive host composition", async ({ page }) => {
  await page.goto("/skeleton");
  for (const id of ["usage", "feed", "text", "children", "animation", "loading", "colors", "shapes", "responsive", "props"]) await expect(page.locator(`#${id}`)).toBeVisible();
  const host = page.locator("#responsive .brick-skeleton");
  const loadingControl = page.locator("#children .brick-skeleton").first();
  await expect(loadingControl).toHaveAttribute("data-skeleton-loading", "");
  await expect(loadingControl).not.toHaveAttribute("data-loading");
  const loadedControl = page.locator("#children .brick-skeleton").nth(1);
  expect((await loadingControl.boundingBox())!.height).toBeCloseTo((await loadedControl.boundingBox())!.height, 1);
  expect((await loadingControl.boundingBox())!.width).toBeCloseTo((await loadedControl.boundingBox())!.width, 1);
  await loadingControl.evaluate((control: HTMLElement) => control.focus());
  await expect(loadingControl).not.toBeFocused();
  await page.setViewportSize({width:390,height:844});
  expect((await host.boundingBox())!.height).toBe(100);
  await page.setViewportSize({width:1280,height:900});
  expect((await host.boundingBox())!.height).toBe(200);
  await page.emulateMedia({reducedMotion:"reduce"});
  expect(await page.locator("#animation .brick-skeleton").first().evaluate((root) => getComputedStyle(root).animationName)).toBe("none");
});
