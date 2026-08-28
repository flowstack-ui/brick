import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator } from "@playwright/test";

async function box(locator: Locator) {
  const value = await locator.boundingBox();
  expect(value).not.toBeNull();
  return value!;
}

test.beforeEach(async ({ page }) => {
  await page.goto("/text");
});

test("Text overview preserves the canonical semantic and visual defaults", async ({
  page,
}) => {
  const text = page.getByTestId("text-overview").getByText(
    "Build dependable interfaces.",
  );
  await expect(text).toHaveJSProperty("tagName", "SPAN");
  await expect(text).toHaveClass(/brick-text/);
  await expect(text).toHaveAttribute("data-slot", "text");
  await expect(text).toHaveAttribute("data-variant", "body-md");
  await expect(text).toHaveAttribute("data-tone", "primary");
  await expect(text).not.toHaveAttribute("role");
  await expect(text).toHaveCSS("font-size", "16px");
  await expect(text).toHaveCSS("font-weight", "400");
  await expect(text).toHaveCSS("line-height", "24px");
});

test("Text controlled comparisons change only variant, tone, weight, or alignment", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1120, height: 900 });
  const variantTexts = page
    .getByTestId("text-variants")
    .locator(".brick-text");
  await expect(variantTexts).toHaveCount(12);
  const expectedVariants = [
    "display", "display-sm", "display-md", "display-lg",
    "title-lg", "title-md", "title-sm",
    "body-lg", "body-md", "body-sm", "caption", "eyebrow",
  ];
  const sizes: number[] = [];
  for (let index = 0; index < expectedVariants.length; index += 1) {
    const text = variantTexts.nth(index);
    await expect(text).toHaveAttribute("data-variant", expectedVariants[index]);
    await expect(text).toHaveAttribute("data-tone", "primary");
    await expect(text).toHaveJSProperty("tagName", "SPAN");
    await expect(text).toHaveText("Build dependable interfaces.");
    sizes.push(Number.parseFloat(await text.evaluate((node) => getComputedStyle(node).fontSize)));
  }
  expect(sizes).toEqual([40, 40, 52, 64, 32, 24, 20, 20, 16, 14, 12, 12]);
  await expect(variantTexts.nth(11)).toHaveCSS("font-weight", "600");
  await expect(variantTexts.nth(11)).toHaveCSS("letter-spacing", "0.96px");
  await expect(variantTexts.nth(11)).toHaveCSS("text-transform", "uppercase");

  const responsiveHeading = page.getByTestId("text-responsive-variant");
  await expect(responsiveHeading).toHaveAttribute("data-variant", "display-sm");
  await expect(responsiveHeading).toHaveAttribute("data-variant-md", "display-md");
  await expect(responsiveHeading).toHaveAttribute("data-variant-lg", "display-lg");
  await expect(responsiveHeading).toHaveAttribute("data-align", "center");
  await expect(responsiveHeading).toHaveAttribute("data-align-lg", "start");
  await expect(responsiveHeading).toHaveCSS("font-size", "64px");
  await expect(responsiveHeading).toHaveCSS("text-align", "start");

  const toneTexts = page.getByTestId("text-tones").locator(".brick-text");
  await expect(toneTexts).toHaveCount(9);
  for (const text of await toneTexts.all()) {
    await expect(text).toHaveAttribute("data-variant", "body-md");
    await expect(text).toHaveText("Build dependable interfaces.");
  }
  expect(await toneTexts.nth(1).evaluate((node) => getComputedStyle(node).color))
    .not.toBe(await toneTexts.nth(4).evaluate((node) => getComputedStyle(node).color));

  const weightTexts = page.getByTestId("text-weights").locator(".brick-text");
  const weightValues = [];
  for (const text of await weightTexts.all()) {
    weightValues.push(await text.evaluate((node) => getComputedStyle(node).fontWeight));
  }
  expect(weightValues).toEqual(["400", "400", "500", "600"]);

  const alignmentTexts = page.getByTestId("text-alignments").locator(".brick-text");
  await expect(alignmentTexts.nth(0)).toHaveCSS("text-align", "start");
  await expect(alignmentTexts.nth(1)).toHaveCSS("text-align", "center");
  await expect(alignmentTexts.nth(2)).toHaveCSS("text-align", "end");
  const alignmentBoxes = await Promise.all(
    (await alignmentTexts.all()).map((text) => box(text)),
  );
  const alignmentCellBoxes = await Promise.all(
    (await alignmentTexts.all()).map((text) => box(text.locator("../.."))),
  );
  const alignmentOffsets = alignmentBoxes.map(
    (value, index) => value.y - alignmentCellBoxes[index].y,
  );
  expect(
    Math.max(...alignmentOffsets) - Math.min(...alignmentOffsets),
  ).toBeLessThanOrEqual(1);

  const transformTexts = page.getByTestId("text-transforms").locator(".brick-text");
  const transformValues = ["none", "uppercase", "lowercase", "capitalize"];
  await expect(transformTexts).toHaveCount(transformValues.length);
  for (let index = 0; index < transformValues.length; index += 1) {
    await expect(transformTexts.nth(index)).toHaveAttribute("data-transform", transformValues[index]);
    await expect(transformTexts.nth(index)).toHaveCSS("text-transform", transformValues[index]);
  }
});

test("Text semantic hosts retain identical visual recipes and actual output", async ({
  page,
}) => {
  const semantic = page.getByTestId("text-semantics");
  const hosts = semantic.locator(".text-grid .brick-text");
  await expect(hosts).toHaveCount(4);
  for (let index = 0; index < 4; index += 1) {
    await expect(hosts.nth(index)).toHaveJSProperty(
      "tagName",
      ["SPAN", "P", "DIV", "H2"][index],
    );
    await expect(hosts.nth(index)).toHaveAttribute("data-variant", "body-md");
    await expect(hosts.nth(index)).toHaveCSS("font-size", "16px");
  }

  const outputEvidence = semantic.locator(".playground-output-evidence");
  const heading = outputEvidence.locator("h2");
  await expect(heading).toHaveText("Account settings");
  await expect(heading).toHaveAttribute("data-variant", "body-md");
  const output = outputEvidence.locator("[data-rendered-output]");
  await expect(output).toContainText("<h2");
  await expect(output).toContainText('data-variant="body-md"');
  await expect(output).toContainText('id="text-output-heading"');

  const named = page.getByTestId("text-named");
  await expect(named.getByRole("heading", { level: 3, name: "Project settings" }))
    .toHaveAttribute("data-variant", "title-lg");
  await expect(named.getByText("Manage the defaults shared by this workspace."))
    .toHaveJSProperty("tagName", "P");
  await expect(named.getByText("Updated today")).toHaveAttribute("data-variant", "caption");
  await expect(named.getByText("Workspace", { exact: true })).toHaveAttribute("data-variant", "eyebrow");
});

test("Text wrapping and overflow remain bounded and deliberate", async ({
  page,
}) => {
  const evidence = page.getByTestId("text-overflow");
  await expect(evidence.locator("[data-wrap='nowrap']")).toHaveCSS("text-wrap", "nowrap");
  await expect(evidence.locator("[data-wrap='balance']")).toHaveCSS("text-wrap", "balance");
  const supportsPretty = await page.evaluate(() => CSS.supports("text-wrap", "pretty"));
  await expect(evidence.locator("[data-wrap='pretty']")).toHaveCSS(
    "text-wrap",
    supportsPretty ? "pretty" : "wrap",
  );

  const renderedLines = (locator: Locator) => locator.evaluate((element) => {
    const text = element.firstChild;
    if (!text) return [];
    const range = document.createRange();
    const lines: Array<{ text: string; y: number }> = [];
    for (let index = 0; index < (text.textContent?.length ?? 0); index += 1) {
      range.setStart(text, index);
      range.setEnd(text, index + 1);
      const y = Math.round(range.getBoundingClientRect().y);
      let line = lines.find((entry) => entry.y === y);
      if (!line) {
        line = { text: "", y };
        lines.push(line);
      }
      line.text += text.textContent?.[index] ?? "";
    }
    return lines.map((line) => line.text.trim());
  });

  const wrappingExamples = [
    page.getByTestId("text-wrap-wrap"),
    evidence.locator("[data-wrap='balance']"),
    evidence.locator("[data-wrap='pretty']"),
  ];
  const wrappingLines = await Promise.all(wrappingExamples.map(renderedLines));
  const normalizedText = (lines: string[]) => lines.join(" ").replace(/\s+/g, " ").trim();
  for (const lines of wrappingLines) {
    expect(lines.length).toBeGreaterThan(1);
    expect(lines.every(Boolean)).toBe(true);
  }
  expect(new Set(wrappingLines.map(normalizedText)).size).toBe(1);

  const natural = evidence.locator(".text-grid--three .brick-text").nth(0);
  const truncate = evidence.locator("[data-truncate]");
  const clamp = evidence.locator("[data-line-clamp='3']");
  await expect(truncate).toHaveCSS("text-overflow", "ellipsis");
  await expect(truncate).toHaveCSS("white-space", "nowrap");
  await expect(clamp).toHaveCSS("overflow", "hidden");
  expect((await box(truncate)).height).toBeLessThan((await box(natural)).height);
  expect((await box(clamp)).height).toBeLessThanOrEqual(
    Number.parseFloat(await clamp.evaluate((node) => getComputedStyle(node).lineHeight)) * 3 + 1,
  );
  const containedTexts = [
    evidence.locator("[data-wrap='balance']"),
    evidence.locator("[data-wrap='pretty']"),
    natural,
    truncate,
    clamp,
  ];
  for (const text of containedTexts) {
    const textBox = await box(text);
    const parentBox = await box(text.locator(".."));
    expect(textBox.x + textBox.width).toBeLessThanOrEqual(parentBox.x + parentBox.width + 1);
  }
});

test("Text native attributes, ref, appearance, customization, RTL, and reflow remain correct", async ({
  page,
}) => {
  const native = page.getByTestId("text-native").locator("#text-native-copy");
  await expect(native).toHaveJSProperty("tagName", "P");
  await expect(native).toHaveAttribute("aria-describedby", "text-native-description");
  await expect(native).toHaveAttribute("data-evidence", "native");
  await expect(native).toHaveAttribute("lang", "ar");
  await expect(native).toHaveAttribute("dir", "rtl");
  await expect(native.locator("strong")).toHaveText("واجهة");
  await page.getByRole("button", { name: "Inspect ref" }).click();
  await expect(page.getByText("Ref host: P")).toBeVisible();

  const appearanceTexts = page.getByTestId("text-appearance").locator(".brick-text");
  await expect(appearanceTexts).toHaveCount(2);
  for (const text of await appearanceTexts.all()) {
    await expect(text).toHaveAttribute("data-variant", "body-md");
    await expect(text).toHaveAttribute("data-tone", "primary");
  }
  const custom = page.getByText("Customized project summary", { exact: true });
  await expect(custom).toHaveCSS("font-size", "22px");
  await expect(custom).toHaveCSS("font-weight", "600");
  await expect(custom).toHaveCSS("color", "rgb(24, 121, 78)");

  const rtlStart = page.getByText("ملخص المشروع");
  const rtlEnd = page.getByText("واجهة موثوقة تحافظ على وضوح المحتوى في المساحات الضيقة.");
  await expect(rtlStart).toHaveCSS("direction", "rtl");
  await expect(rtlStart).toHaveCSS("text-align", "start");
  await expect(rtlEnd).toHaveCSS("text-align", "end");

  await page.setViewportSize({ width: 390, height: 844 });
  await expect.poll(() => page.locator("html").evaluate((element) => element.scrollWidth))
    .toBeLessThanOrEqual(390);
  const variantGrid = page.getByTestId("text-variants");
  const variantCell = variantGrid.locator(".text-cell").first();
  const variantText = variantCell.locator(".brick-text");
  await variantText.evaluate((element) => {
    element.style.setProperty("--brick-text-font-size", "5rem");
  });
  const [gridWidths, cellBox, textBox] = await Promise.all([
    variantGrid.evaluate((element) => ({
      clientWidth: element.clientWidth,
      scrollWidth: element.scrollWidth,
    })),
    box(variantCell),
    box(variantText),
  ]);
  expect(gridWidths.scrollWidth).toBeLessThanOrEqual(gridWidths.clientWidth);
  expect(textBox.x).toBeGreaterThanOrEqual(cellBox.x);
  expect(textBox.x + textBox.width).toBeLessThanOrEqual(cellBox.x + cellBox.width + 1);
  await page.addStyleTag({
    content: ".brick-text{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}",
  });
  const stress = page.getByTestId("text-stress");
  expect((await box(stress)).width).toBeLessThanOrEqual(390);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
