import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";

test("Status docs, responsive geometry, projection and narrow RTL content", async ({
  page,
}) => {
  await page.goto("/status");
  for (const id of ["props-root", "props-indicator", "props-label"]) {
    await expect(page.locator("#" + id).getByRole("table")).toBeVisible();
  }
  await expect(
    page.locator("#composition strong.brick-status__label"),
  ).toBeVisible();
  const statuses = page.locator("#sizes .brick-status");
  for (let i = 0; i < 9; i++) {
    const s = statuses.nth(i);
    const geom = await s.evaluate((n) => ({
      font: parseFloat(getComputedStyle(n).fontSize),
      dot: n.querySelector(".brick-status__indicator")!.getBoundingClientRect()
        .width,
      gap: getComputedStyle(n).gap,
    }));
    expect(geom.font).toBe([12, 14, 16][Math.floor(i / 3)]);
    expect(Math.abs(geom.dot - geom.font * 0.64)).toBeLessThan(0.05);
    expect(geom.gap).toBe("8px");
  }
  for (const [width, font] of [
    [390, 14],
    [600, 12],
    [800, 16],
    [1100, 14],
    [1400, 14],
    [390, 14],
  ]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(page.locator("#responsive .brick-status")).toHaveCSS(
      "font-size",
      font + "px",
    );
  }
  const region = page.locator("#composition");
  const root = region.locator(".brick-status").last();
  await root.evaluate((n) => n.setAttribute("dir", "rtl"));
  const dot = root.locator(".brick-status__indicator"),
    label = root.locator(".brick-status__label");
  await label.evaluate(
    (n) =>
      (n.textContent =
        "AReallyLongUnbrokenLocalizedStatusThatMustNotOverflowTheNarrowContainer"),
  );
  const a = await root.boundingBox(),
    b = await label.boundingBox(),
    d = await dot.boundingBox();
  expect(b!.x).toBeGreaterThanOrEqual(a!.x - 1);
  expect(b!.x + b!.width).toBeLessThanOrEqual(a!.x + a!.width + 1);
  expect(d!.x).toBeGreaterThan(b!.x);
  expect(Math.abs(d!.y + d!.height / 2 - (b!.y + b!.height / 2))).toBeLessThan(
    1,
  );
  await root.evaluate((n) => ((n as HTMLElement).style.fontSize = "32px"));
  expect((await dot.boundingBox())!.width).toBeCloseTo(20.48, 1);
  await expect(page.locator("#decorative .brick-status")).toHaveAttribute(
    "aria-hidden",
    "true",
  );
  const live = page.locator("#live").getByRole("status");
  await expect(live).toHaveText("Unsaved changes");
  await page.locator("#live").getByRole("button", { name: "Toggle saved state" }).click();
  await expect(live).toHaveText("Saved");
  const result = await new AxeBuilder({ page }).analyze();
  expect(result.violations).toEqual([]);
});

test.beforeEach(async ({ page }) => {
  await page.goto("/status?qualification=1");
});

test("keeps passive state text and decorative indicator semantics", async ({
  page,
}) => {
  const status = page.getByTestId("status-overview");
  await expect(status).toContainText("Available");
  await expect(status).not.toHaveAttribute("role");
  await expect(status).not.toHaveAttribute("aria-live");
  await expect(
    status.locator("[data-slot='status-indicator']"),
  ).toHaveAttribute("aria-hidden", "true");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
