import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/avatar");
});

test("Avatar overview exposes canonical defaults only", async ({ page }) => {
  await expect(page.getByTestId("avatar-workbench")).toBeVisible();
  const avatar = page.getByTestId("avatar-overview").locator(".brick-avatar");
  await expect(avatar).toHaveAttribute("data-size", "md");
  await expect(avatar).toHaveAttribute("data-shape", "circle");
  await expect(avatar).not.toHaveAttribute("data-status");
  await expect(avatar.locator("img")).toHaveCount(0);
  await expect(
    avatar.getByRole("img", { name: "Ada Lovelace" }),
  ).toHaveText("AL");
  await expect(avatar).not.toHaveAttribute("role");
  await expect(avatar).not.toHaveAttribute("tabindex");
});

test("five sizes are exact square frames and change no other recipe", async ({
  page,
}) => {
  const roots = page.getByTestId("avatar-sizes").locator(".brick-avatar");
  const evidence = await roots.evaluateAll((elements) =>
    elements.map((element) => {
      const box = element.getBoundingClientRect();
      return {
        height: box.height,
        shape: element.getAttribute("data-shape"),
        status: element.getAttribute("data-status"),
        width: box.width,
      };
    }),
  );
  expect(evidence).toEqual([
    { height: 24, shape: "circle", status: null, width: 24 },
    { height: 32, shape: "circle", status: null, width: 32 },
    { height: 40, shape: "circle", status: null, width: 40 },
    { height: 48, shape: "circle", status: null, width: 48 },
    { height: 64, shape: "circle", status: null, width: 64 },
  ]);
});

test("shape changes only radius", async ({ page }) => {
  const roots = page.getByTestId("avatar-shapes").locator(".brick-avatar");
  await expect(roots).toHaveCount(2);
  const evidence = await roots.evaluateAll((elements) =>
    elements.map((element) => {
      const box = element.getBoundingClientRect();
      return {
        height: box.height,
        radius: getComputedStyle(element).borderRadius,
        size: element.getAttribute("data-size"),
        text: element.textContent,
        width: box.width,
      };
    }),
  );
  expect(evidence[0].height).toBe(evidence[1].height);
  expect(evidence[0].width).toBe(evidence[1].width);
  expect(evidence[0].size).toBe("md");
  expect(evidence[1].size).toBe("md");
  expect(evidence[0].text).toBe("AL");
  expect(evidence[1].text).toBe("AL");
  expect(Number.parseFloat(evidence[0].radius)).toBeGreaterThan(
    Number.parseFloat(evidence[1].radius),
  );
});

test("loaded, broken, and missing sources preserve informative fallback semantics", async ({
  page,
}) => {
  const states = page.getByTestId("avatar-states");
  await expect(
    states.locator("img[data-slot='avatar-image']"),
  ).toHaveAttribute("alt", "Ada Lovelace");

  await states.getByRole("button", { name: "Broken" }).click();
  await expect(
    states.getByRole("img", { name: "Ada Lovelace" }),
  ).toHaveText("AL");
  await expect(states.locator("img")).toHaveCount(0);

  await states.getByRole("button", { name: "Missing" }).click();
  await expect(
    states.getByRole("img", { name: "Ada Lovelace" }),
  ).toHaveText("AL");
  await expect(states.getByText("Current source: missing")).toBeVisible();
});

test("informative, decorative, and owning-control semantics remain distinct", async ({
  page,
}) => {
  const contexts = page.getByTestId("avatar-contexts");
  await expect(
    contexts.getByRole("img", { name: "Grace Hopper" }),
  ).toBeVisible();
  const decorative = contexts
    .getByText("Ada Lovelace")
    .locator("..")
    .locator("[data-slot='avatar-fallback']");
  await expect(decorative).toHaveAttribute("aria-hidden", "true");

  const button = contexts.getByRole("button", {
    name: "Open Katherine Johnson profile",
  });
  await button.focus();
  await expect(button).toBeFocused();
  await expect(button.locator(".brick-avatar")).not.toHaveAttribute("tabindex");
  await button.press("Enter");
  await expect(contexts.getByText("Katherine Johnson profile")).toBeVisible();
});

test("all statuses and both ring geometries preserve frame size", async ({
  page,
}) => {
  const region = page.getByTestId("avatar-statuses");
  for (const status of ["online", "away", "busy", "offline"]) {
    await expect(region.locator(`[data-status="${status}"]`)).toHaveCount(
      status === "online" ? 3 : 1,
    );
  }
  const roots = region.locator(".brick-avatar[data-status]");
  const evidence = await roots.evaluateAll((elements) =>
    elements.map((element) => {
      const box = element.getBoundingClientRect();
      const root = getComputedStyle(element);
      const ring = getComputedStyle(element, "::after");
      return {
        height: box.height,
        pointerEvents: ring.pointerEvents,
        radius: root.borderRadius,
        ringRadius: ring.borderRadius,
        ringWidth: Number.parseFloat(ring.borderTopWidth),
        width: box.width,
      };
    }),
  );
  for (const item of evidence) {
    expect(item.height).toBe(40);
    expect(item.width).toBe(40);
    expect(item.pointerEvents).toBe("none");
    expect(item.ringRadius).toBe(item.radius);
    expect(item.ringWidth).toBe(2);
  }
});

test("NotificationBadge composition preserves separate indicator and status geometry", async ({
  page,
}) => {
  const region = page.getByTestId("avatar-notifications");
  const statusAvatar = region.locator(".brick-avatar[data-status='online']");
  await expect(statusAvatar).toHaveCount(1);
  const wrapper = statusAvatar.locator("..");
  await expect(wrapper).toHaveClass(/brick-notification-badge/);
  await expect(wrapper.locator("[data-variant='count']")).toHaveText("3");
  await expect(region.locator("[data-variant='dot']")).toHaveCount(1);
});

test("appearance and customization hooks remain local and exact", async ({
  page,
}) => {
  await expect(
    page.getByTestId("avatar-appearance").locator(".brick-avatar"),
  ).toHaveCount(2);
  const custom = page.locator("[data-slot='workspace-avatar']");
  await expect(custom).toHaveClass(/custom-avatar/);
  await expect(custom).toHaveAttribute("data-shape", "rounded");
  await expect(custom).toHaveAttribute("data-status", "online");
  const evidence = await custom.evaluate((element) => ({
    radius: getComputedStyle(element).borderRadius,
    ringWidth: getComputedStyle(element, "::after").borderTopWidth,
  }));
  expect(evidence.radius).toBe("4px");
  expect(Number.parseFloat(evidence.ringWidth)).toBeGreaterThanOrEqual(3);
});

test("Avatar remains contained at constrained width and in RTL", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 720 });
  const stress = page.getByTestId("avatar-stress");
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth <=
        document.documentElement.clientWidth,
    ),
  ).toBe(true);
  for (const avatar of await stress.locator(".brick-avatar").all()) {
    const box = await avatar.boundingBox();
    expect(box!.width).toBe(40);
    expect(box!.height).toBe(40);
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(320.5);
  }
  await expect(stress.locator("[dir='rtl']")).toContainText("نور");
});

test("Avatar reference route has no automated accessibility violations", async ({
  page,
}) => {
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test("Avatar frame and status geometry survive forced colors", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "chromium",
    "Forced-colors emulation is a Chromium release check.",
  );
  await page.emulateMedia({ forcedColors: "active" });
  await page.reload();
  const avatar = page
    .getByTestId("avatar-statuses")
    .locator(".brick-avatar[data-status='online']")
    .first();
  const computed = await avatar.evaluate((element) => ({
    borderWidth: Number.parseFloat(getComputedStyle(element).borderTopWidth),
    ringWidth: Number.parseFloat(
      getComputedStyle(element, "::after").borderTopWidth,
    ),
  }));
  expect(computed.borderWidth).toBeGreaterThanOrEqual(1);
  expect(computed.ringWidth).toBeGreaterThanOrEqual(2);
  await expect(page.getByText("Online", { exact: true })).toBeVisible();
});
