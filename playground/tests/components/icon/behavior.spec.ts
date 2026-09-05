import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/icon");
});

test("Icon defaults and explicit accessibility modes are deterministic", async ({
  page,
}) => {
  const decorative = page.getByTestId("icon-decorative");
  await expect(decorative).toHaveAttribute("aria-hidden", "true");
  await expect(decorative).toHaveAttribute("data-size", "md");
  await expect(decorative).toHaveAttribute("data-tone", "inherit");
  await expect(decorative).toHaveAttribute("data-emphasis", "text");
  const informative = page.getByRole("img", { name: "Search" }).first();
  await expect(informative).toHaveAttribute("aria-label", "Search");
  await expect(
    page.getByRole("img", { name: "System warning" }),
  ).toHaveAttribute("aria-labelledby", "icon-warning-label");
});

test("Icon sizes, tones, SVG sources, composition, and direction are observable", async ({
  page,
}) => {
  const sizes = page.locator("#scenario-icon-sizes .brick-icon");
  await expect(sizes).toHaveCount(8);
  expect(
    await sizes.evaluateAll((nodes) =>
      nodes.map((node) => getComputedStyle(node).width),
    ),
  ).toEqual(["16px", "12px", "16px", "20px", "24px", "28px", "32px", "40px"]);
  const tones = page.locator("#scenario-icon-tones .brick-icon");
  await expect(tones).toHaveCount(10);
  const accentText = page.locator(
    "#scenario-icon-tones .brick-icon[data-tone='accent'][data-emphasis='text']",
  );
  const accentSolid = page.locator(
    "#scenario-icon-tones .brick-icon[data-tone='accent'][data-emphasis='solid']",
  );
  await expect(accentText).toHaveCount(1);
  await expect(accentSolid).toHaveCount(1);
  const accentPaints = await page
    .locator("#scenario-icon-tones")
    .evaluate((scenario) => {
      const probe = document.createElement("span");
      scenario.append(probe);
      probe.style.color = "var(--brick-color-accent-text)";
      const expectedText = getComputedStyle(probe).color;
      probe.style.color = "var(--brick-color-accent-solid)";
      const expectedSolid = getComputedStyle(probe).color;
      probe.remove();
      return { expectedSolid, expectedText };
    });
  await expect(accentText).toHaveCSS("color", accentPaints.expectedText);
  await expect(accentSolid).toHaveCSS("color", accentPaints.expectedSolid);
  expect(accentPaints.expectedSolid).not.toBe(accentPaints.expectedText);
  await expect(
    page.getByTestId("icon-inline-source").locator("path"),
  ).toHaveCount(2);
  await expect(
    page.getByTestId("icon-inline-source").locator("path").nth(1),
  ).toHaveAttribute("d", "m14 7 5 5-5 5");
  const composedSource = page.locator("svg.brick-icon[data-source=composed]");
  await expect(composedSource).toHaveCount(1);
  await expect(composedSource).toHaveCSS("width", "24px");
  await expect(composedSource).toHaveCSS("height", "24px");
  const renderedComposition = page.getByTestId("icon-rendered-composed");
  await expect(renderedComposition).toHaveCSS("width", "24px");
  await expect(renderedComposition).toHaveCSS("height", "24px");
  await expect(renderedComposition.locator("circle")).toHaveAttribute(
    "fill",
    "none",
  );
  await expect(renderedComposition.locator("circle")).toHaveAttribute(
    "stroke",
    "currentColor",
  );
  await expect(renderedComposition.locator("path")).toHaveAttribute(
    "stroke",
    "currentColor",
  );
  await expect(
    page.locator(
      "#scenario-icon-composition .playground-output-evidence__preview .playground-specimen-label",
      {
        hasText: "SVG asChild",
      },
    ),
  ).toBeVisible();
  const rtlDirectional = page.locator(
    "#scenario-icon-direction [dir=rtl] [data-directional]",
  );
  await expect(rtlDirectional).toHaveCSS(
    "transform",
    "matrix(-1, 0, 0, 1, 0, 0)",
  );
  await expect(
    page.locator(
      "#scenario-icon-direction [dir=rtl] .brick-icon:not([data-directional])",
    ),
  ).toHaveCSS("transform", "matrix(1, 0, 0, 1, 0, 0)");
});

test("Icon remains contained and the route has no serious accessibility violations", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    await page.locator("html").evaluate((node) => node.scrollWidth),
  ).toBeLessThanOrEqual(390);
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
