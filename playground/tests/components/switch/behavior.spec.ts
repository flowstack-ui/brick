import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/switch");
});

test("defaults, states, and sizes preserve the closed visual contract", async ({
  page,
}) => {
  const overview = page.getByTestId("switch-overview").getByRole("switch");
  await expect(overview).toHaveAttribute("data-size", "md");
  await expect(overview).toHaveAttribute("aria-checked", "false");
  await overview.click();
  await expect(overview).toHaveAttribute("aria-checked", "true");
  const widths: number[] = [];
  const heights: number[] = [];
  for (const size of ["xs", "sm", "md", "lg"]) {
    const root = page
      .getByTestId("switch-sizes")
      .locator(".forms-cell")
      .filter({ hasText: size })
      .getByRole("switch");
    await expect(root).toHaveAttribute("data-size", size);
    const geometry = await root.evaluate((node) => {
      const style = getComputedStyle(node, "::before");
      return {
        height: Number.parseFloat(style.height),
        width: Number.parseFloat(style.width),
      };
    });
    widths.push(geometry.width);
    heights.push(geometry.height);
    expect((await root.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  }
  expect(widths).toEqual([24, 32, 40, 48]);
  expect(heights).toEqual([12, 16, 20, 24]);
  const variants = page.getByTestId("switch-variants");
  const solid = variants.locator('[data-variant="solid"]');
  const raised = variants.locator('[data-variant="raised"]');
  expect(
    await solid.evaluate(
      (node) => getComputedStyle(node, "::before").borderWidth,
    ),
  ).toBe("0px");
  expect(
    await raised.evaluate((node) =>
      Number.parseFloat(getComputedStyle(node, "::before").height),
    ),
  ).toBe(10);
  expect(
    await raised
      .locator(".brick-switch-thumb")
      .evaluate((node) => Number.parseFloat(getComputedStyle(node).height)),
  ).toBe(20);
});

test("unchecked interaction paint progresses through adaptive neutral roles", async ({
  page,
}) => {
  const root = page.getByTestId("switch-overview").getByRole("switch");
  const paint = () => root.evaluate((node) => {
    const probe = document.createElement("span");
    const styles = getComputedStyle(node);
    probe.style.background = styles.getPropertyValue("--brick-switch-track-background");
    document.body.append(probe);
    const rest = getComputedStyle(probe).backgroundColor;
    probe.style.background = styles.getPropertyValue("--brick-switch-hover-background");
    const hover = getComputedStyle(probe).backgroundColor;
    probe.remove();
    return {
      rest,
      hover,
      rendered: getComputedStyle(node, "::before").backgroundColor,
    };
  });

  const resting = await paint();
  expect(resting.rendered).toBe(resting.rest);
  expect(resting.hover).not.toBe(resting.rest);
  await root.hover();
  await expect.poll(async () => (await paint()).rendered).toBe(resting.hover);
});

test("keyboard, controlled, read-only, and disabled behavior remain Atom-owned", async ({
  page,
}) => {
  const controlled = page
    .getByTestId("switch-ownership")
    .locator(".forms-cell")
    .nth(1)
    .getByRole("switch");
  await controlled.focus();
  await page.keyboard.press("Space");
  await expect(controlled).toHaveAttribute("aria-checked", "false");
  await page.keyboard.press("Enter");
  await expect(controlled).toHaveAttribute("aria-checked", "true");
  const readOnly = page
    .getByTestId("switch-ownership")
    .locator(".forms-cell")
    .nth(2)
    .getByRole("switch");
  await readOnly.click();
  await expect(readOnly).toHaveAttribute("aria-checked", "true");
  await expect(readOnly).toBeEnabled();
  const disabled = page
    .getByTestId("switch-availability")
    .getByRole("switch")
    .first();
  await expect(disabled).toBeDisabled();
});

test("required form validation, submission, reset, and external ownership work", async ({
  page,
}) => {
  const form = page.getByRole("form", { name: "Report settings" });
  await form.getByRole("button", { name: "Save settings" }).click();
  await expect(
    form.getByRole("switch", { name: "Weekly reports" }),
  ).toBeFocused();
  await form.getByRole("switch", { name: "Weekly reports" }).click();
  await form.getByRole("button", { name: "Save settings" }).click();
  await expect(form.getByRole("status")).toHaveText("Submitted: enabled");
  await form.getByRole("button", { name: "Reset" }).click();
  await expect(
    form.getByRole("switch", { name: "Weekly reports" }),
  ).toHaveAttribute("aria-checked", "false");
  expect(
    await form.evaluate((node) =>
      new FormData(node as HTMLFormElement).get("external-reports"),
    ),
  ).toBe("enabled");
});

test("composition, customization, mobile containment, and RTL travel are correct", async ({
  page,
}) => {
  await expect(page.locator('[data-adapter="render-root"]')).toHaveAttribute(
    "role",
    "switch",
  );
  await expect(page.locator('[data-adapter="render-thumb"]')).toHaveAttribute(
    "aria-hidden",
    "true",
  );
  await expect(page.locator('[data-adapter="composed-root"]')).toHaveAttribute(
    "role",
    "switch",
  );
  const custom = page.getByRole("switch", { name: "Customized reports" });
  expect(
    await custom.evaluate((node) =>
      Number.parseFloat(getComputedStyle(node, "::before").width),
    ),
  ).toBeCloseTo(52, 0);
  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    (await page.getByTestId("switch-stress").boundingBox())!.width,
  ).toBeLessThanOrEqual(390);
  const rtl = page.getByRole("switch", { name: "تلقي التقارير الأسبوعية" });
  const transform = await rtl
    .locator(".brick-switch-thumb")
    .evaluate((node) => getComputedStyle(node).transform);
  expect(transform).toContain("-");
});

test("Switch page has no automatically detectable accessibility violations", async ({
  page,
}) => {
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
