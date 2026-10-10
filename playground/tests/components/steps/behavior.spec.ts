import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";
test("Steps typography follows semantic recipes at every size", async ({ page }) => {
  await page.goto("/steps?qualification=1");
  const roots = page.getByTestId("steps-recipes").locator(".brick-steps");
  for (const root of await roots.all()) {
    const metrics = await root.evaluate(node => {
      const cs = getComputedStyle(node);
      const role = ["xs", "sm"].includes(node.getAttribute("data-size")!) ? "caption" : node.getAttribute("data-size") === "lg" ? "body-md" : "body-sm";
      const probe = document.createElement("span");
      for (const field of ["font-family", "font-size", "font-weight", "line-height", "letter-spacing"]) {
        probe.style.setProperty(field, `var(--brick-typography-${role}-${field})`);
      }
      node.append(probe);
      const expected = getComputedStyle(probe);
      const fields = ["font-family", "font-size", "font-weight", "line-height", "letter-spacing"];
      const result = fields.map(field => [cs.getPropertyValue(field), expected.getPropertyValue(field)]);
      probe.remove();
      return result;
    });
    for (const [actual, expected] of metrics) expect(actual).toBe(expected);
  }
});
test("Steps retains values, completes, and resets", async ({ page }) => {
  await page.goto("/steps?qualification=1");
  const root = page.getByTestId("steps-workflow");
  await root.getByRole("textbox").fill("Sam");
  await root.getByRole("button", { name: "Continue" }).click();
  await expect(root.getByRole("group", { name: "Details", exact: true })).toBeVisible();
  await root.getByRole("button", { name: "Back", exact: true }).click();
  await expect(root.getByRole("textbox")).toHaveValue("Sam");
  for (let i = 0; i < 3; i++) await root.getByRole("button", { name: "Continue" }).click();
  await expect(root.getByRole("group", { name: "Setup complete" })).toBeVisible();
  await expect(root.getByRole("button", { name: "Continue" })).toBeDisabled();
  await root.getByRole("button", { name: "Reset" }).click();
  await expect(root.getByRole("textbox")).toHaveValue("Sam");
  await expect(root.getByRole("button", { name: "Continue" })).toBeEnabled();
  // Audit the restored state after its disabled-to-enabled color transition.
  await root.evaluate(async node => {
    await Promise.all(node.getAnimations({ subtree: true }).map(animation => animation.finished.catch(() => {})));
  });
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
test("markers remain square, terminal connectors hidden, validation honored", async ({ page }) => {
  await page.goto("/steps?qualification=1");
  const recipes = page.getByTestId("steps-recipes");
  const sizes = await recipes.locator(".brick-steps-indicator").evaluateAll(nodes => nodes.map(node => { const box = node.getBoundingClientRect(); return [box.width, box.height]; }));
  for (const [width, height] of sizes) expect(width).toBe(height);
  expect([...new Set(sizes.map(([width]) => width))]).toEqual([24, 32, 40, 44]);
  await expect(page.getByTestId("steps-vertical").locator(".brick-steps-item").last().locator(".brick-steps-separator")).toBeHidden();
  const connector = await page.getByTestId("steps-vertical").locator(".brick-steps-separator").first().boundingBox();
  expect(connector?.height).toBeGreaterThan(0);
  const paint = await page.getByTestId("steps-vertical").locator(".brick-steps-separator").first().evaluate(node => getComputedStyle(node).backgroundColor);
  expect(paint).not.toBe("rgba(0, 0, 0, 0)");
  const guard = page.getByTestId("steps-validation");
  await guard.getByRole("button", { name: "Next stage" }).click();
  await expect(guard.getByRole("status")).toHaveText("Complete the current stage first.");
  await guard.getByRole("button", { name: "Allow progress" }).click();
  await guard.getByRole("button", { name: "Next stage" }).click();
  await expect(guard.getByRole("status")).toHaveText("Stage 2");
});
test("vertical content retains its value and disabled steps cannot navigate", async ({ page }) => {
  await page.goto("/steps?qualification=1");
  const root = page.getByTestId("steps-vertical-content");
  const input = root.getByRole("textbox", { name: "Vertical account name" });
  await input.fill("Northstar");
  await root.getByRole("button", { name: "Next section" }).click();
  await expect(root.getByText("Details are mounted only while this step is active.")).toBeVisible();
  await root.getByRole("button", { name: "Previous section" }).click();
  await expect(input).toHaveValue("Northstar");
  await expect(root.getByText("Details are mounted only while this step is active.")).toHaveCount(0);
  for (const trigger of await page.locator('.brick-steps[data-disabled] .brick-steps-trigger').all()) await expect(trigger).toBeDisabled();
  await expect(root).toHaveCSS("flex-direction", "row");
});

test("documentation optional navigation and controller work independently", async ({ page }) => {
  await page.goto("/steps");
  const optional = page.locator("#optional");
  const root = optional.locator(".brick-steps");
  await root.getByRole("button", { name: "Next", exact: true }).click();
  await expect(root.locator('[aria-current="step"]')).toContainText("Review");
  await root.getByRole("button", { name: "Details (optional)" }).click();
  await expect(root.locator('[aria-current="step"]')).toContainText("Details");
  const controller = page.locator("#controller").locator(".brick-steps");
  await controller.getByRole("button", { name: "Next", exact: true }).click();
  await expect(controller).toContainText("33% complete");
  await controller.getByRole("button", { name: "Reset" }).click();
  await expect(controller).toContainText("0% complete");
});

test("responsive recipes reset size and subtle borders at larger breakpoints", async ({ page }) => {
  await page.goto("/steps");
  const root = page.locator("#responsive").locator(".brick-steps");
  await page.setViewportSize({ width: 600, height: 900 });
  const marker = root.locator(".brick-steps-indicator[data-current]");
  await expect(marker).toHaveCSS("width", "24px");
  await expect(marker).toHaveCSS("border-top-color", "rgba(0, 0, 0, 0)");
  await page.setViewportSize({ width: 1200, height: 900 });
  await expect(marker).toHaveCSS("width", "40px");
  await expect(marker).not.toHaveCSS("border-top-color", "rgba(0, 0, 0, 0)");
});
