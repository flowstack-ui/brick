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
      const ring = getComputedStyle(element, "::after");
      const box = element.getBoundingClientRect();
      return {
        ringBorderWidth: Number.parseFloat(ring.borderTopWidth),
        ringPointerEvents: ring.pointerEvents,
        ringRadius: ring.borderRadius,
        height: box.height,
        radius: style.borderRadius,
        shape: element.getAttribute("data-shape"),
        width: box.width,
      };
    }),
  );
  for (const item of evidence) {
    expect(item.ringBorderWidth).toBe(2);
    expect(item.ringPointerEvents).toBe("none");
    expect(item.ringRadius).toBe(item.radius);
    expect(item.height).toBe(48);
    expect(item.width).toBe(48);
    if (item.shape === "circle") expect(Number.parseFloat(item.radius)).toBeGreaterThan(20);
    else expect(Number.parseFloat(item.radius)).toBeLessThan(20);
  }

  const noStatus = region.locator(".brick-avatar:not([data-status])");
  await expect(noStatus).toHaveCount(1);
  const noStatusRing = await noStatus.evaluate((element) => getComputedStyle(element, "::after").content);
  expect(noStatusRing).toBe("none");

  const sizeComparisons = await page.evaluate(() => {
    const host = document.createElement("div");
    host.style.display = "flex";
    document.body.append(host);
    const result = ["xs", "sm", "md", "lg", "xl"].map((size) => {
      const plain = document.createElement("span");
      plain.className = "brick-avatar";
      plain.dataset.size = size;
      const status = plain.cloneNode() as HTMLSpanElement;
      status.dataset.status = "online";
      host.append(plain, status);
      const plainBox = plain.getBoundingClientRect();
      const statusBox = status.getBoundingClientRect();
      return {
        plain: [plainBox.width, plainBox.height],
        status: [statusBox.width, statusBox.height],
      };
    });
    host.remove();
    return result;
  });
  for (const comparison of sizeComparisons) expect(comparison.status).toEqual(comparison.plain);
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
  await button.press("Enter");
  await expect(contexts.getByText("Last activation: Katherine Johnson profile")).toBeVisible();
  const spacing = await button.evaluate((element) => {
    const avatar = element.querySelector(".brick-avatar")!.getBoundingClientRect();
    const content = element.querySelector(".brick-button__content")!.getBoundingClientRect();
    return content.left - avatar.right;
  });
  expect(spacing).toBeGreaterThanOrEqual(8);
});

test("custom hooks remain local without competing with the inset status ring", async ({ page }) => {
  const custom = page.locator(".avatar-customized");
  const evidence = await custom.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      borderStyle: style.borderTopStyle,
      radius: style.borderRadius,
      ringWidth: getComputedStyle(element, "::after").borderTopWidth,
    };
  });
  expect(evidence.borderStyle).toBe("none");
  expect(evidence.radius).toBe("4px");
  expect(Number.parseFloat(evidence.ringWidth)).toBeGreaterThanOrEqual(3);
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

  await page.setViewportSize({ width: 256, height: 720 });
  const nativeBox = await nativeImage.boundingBox();
  expect(nativeBox?.width).toBe(48);
  expect(nativeBox?.height).toBe(48);
  const rows = await region.locator(":scope > div").evaluateAll((elements) =>
    elements.map((element) => {
      const box = element.getBoundingClientRect();
      return { bottom: box.bottom, left: box.left, right: box.right, top: box.top };
    }),
  );
  expect(rows[0].bottom).toBeLessThanOrEqual(rows[1].top);
  for (const row of rows) {
    expect(row.left).toBeGreaterThanOrEqual(0);
    expect(row.right).toBeLessThanOrEqual(256.5);
  }
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
    const ring = getComputedStyle(element, "::after");
    return {
      borderWidth: Number.parseFloat(style.borderTopWidth),
      ringWidth: Number.parseFloat(ring.borderTopWidth),
    };
  });
  expect(computed.borderWidth).toBeGreaterThanOrEqual(1);
  expect(computed.ringWidth).toBeGreaterThanOrEqual(2);
  await expect(page.getByTestId("avatar-statuses").getByText("Online").first()).toBeVisible();
});
