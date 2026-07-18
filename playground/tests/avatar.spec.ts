import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/avatar");
});

test("Avatar workbench exposes direct defaults and deterministic loaded image", async ({ page }) => {
  await expect(page.getByTestId("avatar-workbench")).toBeVisible();
  const overview = page.getByTestId("avatar-overview");
  const avatar = overview.locator(".brick-avatar");
  await expect(avatar).toHaveAttribute("data-size", "xl");
  await expect(avatar).toHaveAttribute("data-shape", "circle");
  await expect(avatar).toHaveAttribute("data-status", "online");
  await expect(avatar.locator("img[data-slot='avatar-image']")).toHaveAttribute("alt", "");
  await expect(overview.getByText("Ada Lovelace")).toBeVisible();
  await expect(overview.getByText(/Online/)).toBeVisible();
});

test("five sizes are exact square frames and both shapes remain distinct", async ({ page }) => {
  const sizes = await page.getByTestId("avatar-sizes").locator(".brick-avatar").evaluateAll((elements) =>
    elements.map((element) => {
      const box = element.getBoundingClientRect();
      return { height: box.height, width: box.width };
    }),
  );
  expect(sizes).toEqual([
    { height: 24, width: 24 },
    { height: 32, width: 32 },
    { height: 40, width: 40 },
    { height: 48, width: 48 },
    { height: 64, width: 64 },
  ]);

  const shapeRoots = page.getByTestId("avatar-shapes").locator(".brick-avatar");
  const circleRadius = await shapeRoots.nth(0).evaluate((element) => getComputedStyle(element).borderRadius);
  const roundedRadius = await shapeRoots.nth(2).evaluate((element) => getComputedStyle(element).borderRadius);
  expect(circleRadius).not.toBe(roundedRadius);
  expect(Number.parseFloat(circleRadius)).toBeGreaterThan(Number.parseFloat(roundedRadius));
});

test("all statuses add shape-following rings without changing layout", async ({ page }) => {
  const region = page.getByTestId("avatar-statuses");
  const roots = region.locator(".brick-avatar[data-status]");
  await expect(roots).toHaveCount(8);

  for (const status of ["online", "away", "busy", "offline"]) {
    await expect(region.locator(`.brick-avatar[data-status='${status}']`)).toHaveCount(2);
  }

  const evidence = await roots.evaluateAll((elements) =>
    elements.map((element) => {
      const style = getComputedStyle(element);
      const box = element.getBoundingClientRect();
      return {
        boxShadow: style.boxShadow,
        height: box.height,
        radius: style.borderRadius,
        shape: element.getAttribute("data-shape"),
        width: box.width,
      };
    }),
  );
  for (const item of evidence) {
    expect(item.boxShadow).not.toBe("none");
    expect(item.height).toBe(48);
    expect(item.width).toBe(48);
    if (item.shape === "circle") expect(Number.parseFloat(item.radius)).toBeGreaterThan(20);
    else expect(Number.parseFloat(item.radius)).toBeLessThan(20);
  }

  const noStatus = region.locator(".brick-avatar:not([data-status])");
  await expect(noStatus).toHaveCount(1);
  const noStatusShadow = await noStatus.evaluate((element) => getComputedStyle(element).boxShadow);
  expect(noStatusShadow).not.toBe(evidence[0].boxShadow);
});

test("loaded, broken, and missing sources preserve informative fallback semantics", async ({ page }) => {
  const states = page.getByTestId("avatar-states");
  await expect(states.locator("img[data-slot='avatar-image']")).toHaveAttribute("alt", "Ada Lovelace");

  await states.getByRole("button", { name: "broken" }).click();
  await expect(states.getByRole("img", { name: "Ada Lovelace" })).toHaveText("AL");
  await expect(states.locator("img")).toHaveCount(0);

  await states.getByRole("button", { name: "missing" }).click();
  await expect(states.getByRole("img", { name: "Ada Lovelace" })).toHaveText("AL");
  await expect(states.getByText("Current source: missing")).toBeVisible();
});

test("informative and decorative contexts remain distinct and Avatar stays passive", async ({ page }) => {
  const contexts = page.getByTestId("avatar-contexts");
  await expect(contexts.getByRole("img", { name: "Grace Hopper" })).toBeVisible();
  const decorative = contexts.getByText("Ada Lovelace").locator("..").locator("[data-slot='avatar-fallback']");
  await expect(decorative).toHaveAttribute("aria-hidden", "true");
  await expect(decorative.locator("..")).not.toHaveAttribute("tabindex");

  const button = contexts.getByRole("button", { name: "Open Katherine Johnson profile" });
  await button.focus();
  await expect(button).toBeFocused();
  await expect(button.locator(".brick-avatar")).not.toHaveAttribute("tabindex");
});

test("NotificationBadge wraps Avatar and native image without obscuring status geometry", async ({ page }) => {
  const region = page.getByTestId("avatar-notifications");
  const avatar = region.locator(".brick-avatar[data-status='online']");
  const avatarWrapper = avatar.locator("..");
  await expect(avatarWrapper).toHaveClass(/brick-notification-badge/);
  await expect(avatarWrapper.locator("[data-variant='count']")).toHaveText("3");

  const nativeImage = region.getByRole("img", { name: "Flowstack workspace" });
  await expect(nativeImage.locator("..")).toHaveClass(/brick-notification-badge/);
  await expect(nativeImage.locator("..").locator("[data-variant='dot']")).toBeVisible();

  const [avatarBox, indicatorBox] = await Promise.all([
    avatar.boundingBox(),
    avatarWrapper.locator("[data-variant='count']").boundingBox(),
  ]);
  expect(indicatorBox!.x).toBeGreaterThan(avatarBox!.x + avatarBox!.width / 2);
});

test("Avatar remains contained at constrained width and in RTL", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  const stress = page.getByTestId("avatar-stress");
  await expect(stress).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  for (const avatar of await stress.locator(".brick-avatar").all()) {
    const box = await avatar.boundingBox();
    expect(box!.width).toBe(64);
    expect(box!.height).toBe(64);
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(320.5);
  }
});

test("Avatar canonical route has no automated accessibility violations", async ({ page }) => {
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test("Avatar frame and status geometry survive forced colors", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "Forced-colors emulation is a Chromium release check.");
  await page.emulateMedia({ forcedColors: "active" });
  await page.reload();
  const statusAvatar = page.getByTestId("avatar-statuses").locator(".brick-avatar[data-status='online']").first();
  const computed = await statusAvatar.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      borderWidth: Number.parseFloat(style.borderTopWidth),
      outlineWidth: Number.parseFloat(style.outlineWidth),
    };
  });
  expect(computed.borderWidth).toBeGreaterThanOrEqual(1);
  expect(computed.outlineWidth).toBeGreaterThanOrEqual(2);
  await expect(page.getByTestId("avatar-statuses").getByText("Online").first()).toBeVisible();
});
