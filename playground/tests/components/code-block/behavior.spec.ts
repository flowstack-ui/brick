import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";

test.beforeEach(async ({ page }) => {
  await page.goto("/code-block?qualification=1");
});

test("docs show actual syntax colors, metadata, correct line geometry and composed controls", async ({ page }) => {
  await page.goto("/code-block");
  const shiki = page.locator("#shiki");
  await expect(shiki.locator(".brick-code-block-token").first()).toBeVisible();
  await expect(shiki.locator('.brick-code-block[data-brick-appearance="light"]')).toHaveCount(1);
  const colors = await shiki.locator(".brick-code-block-token").evaluateAll(nodes => [...new Set(nodes.map(n => getComputedStyle(n).color))]);
  expect(colors.length).toBeGreaterThan(2);
  expect(await shiki.locator(".brick-code-block-token").first().evaluate(n => getComputedStyle(n).fontFamily)).toContain("monospace");
  const lines = page.locator("#line-numbers .brick-code-block-line");
  await expect(lines).toHaveCount(2);
  const heights = await lines.evaluateAll(nodes => nodes.map(n => ({height: n.getBoundingClientRect().height, line: parseFloat(getComputedStyle(n).lineHeight)})));
  for (const row of heights) expect(row.height).toBeLessThanOrEqual(row.line + 1);
  expect(await page.locator('#diff [data-change="added"]').evaluate(n => getComputedStyle(n, "::after").content)).toContain("+");
  // The docs wrap example must actually demonstrate wrapping, not short source.
  const wrapped = page.locator('#word-wrap .brick-code-block-line').first();
  await expect(wrapped).toBeVisible();
  expect(await wrapped.evaluate(n => n.getBoundingClientRect().height / parseFloat(getComputedStyle(n).lineHeight))).toBeGreaterThan(1.5);
  await expect(page.locator("#props-root")).toContainText("CodeBlockMeta");
  await page.locator("#expand").getByRole("button", { name: "Expand code" }).click();
  await expect(page.locator("#expand").getByRole("button", { name: "Collapse code" })).toBeVisible();
  await page.getByRole("combobox", { name: "Code language" }).selectOption("python");
  await expect(page.locator("#language pre")).toHaveText('print("Hello")');
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  const results = await new AxeBuilder({ page }).include("#shiki").analyze();
  expect(results.violations).toEqual([]);
});

test("flush collapse action keeps focus inside the CodeBlock clip", async ({ page }) => {
  const trigger = page.getByRole("button", { name: "Show full source", exact: true });
  await trigger.focus();
  await expect(trigger).toHaveCSS("outline-width", "2px");
  await expect(trigger).toHaveCSS("outline-offset", "-2px");
  const geometry = await trigger.evaluate(node => {
    const action = node.getBoundingClientRect();
    const frame = node.closest(".brick-code-block")!.getBoundingClientRect();
    return { actionLeft: action.left, actionRight: action.right, actionBottom: action.bottom, frameLeft: frame.left, frameRight: frame.right, frameBottom: frame.bottom };
  });
  expect(geometry.actionLeft).toBeGreaterThanOrEqual(geometry.frameLeft);
  expect(geometry.actionRight).toBeLessThanOrEqual(geometry.frameRight + 0.1);
  expect(geometry.actionBottom).toBeLessThanOrEqual(geometry.frameBottom + 0.1);
});

test("icon-only copy uses the same source and reports real write outcomes", async ({ page }) => {
  const sample = page.getByTestId("code-block-icon-copy");
  await expect(sample.locator('[data-slot="code-block-header"]')).toHaveCount(0);
  const button = sample.getByRole("button", { name: "Copy code" });
  const heightBefore = (await sample.boundingBox())!.height;
  await expect(button).toHaveClass(/brick-icon-button/);
  await expect(sample.getByRole("button")).toHaveCount(1);
  await page.evaluate(() => {
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: {
      writeText: async (value: string) => { document.documentElement.dataset.copiedSource = value; },
    } });
  });
  await button.focus();
  await page.keyboard.press("Enter");
  await expect(sample.getByText("Code copied.", { exact: true })).toBeAttached();
  const announcement = sample.locator('[data-slot="visually-hidden"]');
  await expect(announcement).toHaveAttribute("role", "status");
  await expect(announcement).toHaveCSS("position", "absolute");
  await expect(announcement).toHaveCSS("clip-path", "inset(50%)");
  expect((await sample.boundingBox())!.height).toBe(heightBefore);
  await expect(button.locator("svg.lucide-check")).toBeVisible();
  await expect(button).toBeFocused();
  expect(await page.locator("html").getAttribute("data-copied-source")).toBe(await sample.locator("pre code").textContent());
  await expect(button.locator("svg")).toHaveCount(1);
  await page.evaluate(() => {
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: {
      writeText: async () => { throw new Error("Permission denied"); },
    } });
  });
  await button.click();
  await expect(sample.getByText("Could not copy. Select the code and copy it manually.")).toBeVisible();
  await expect(sample.getByText("Code copied.", { exact: true })).toHaveCount(0);
  await expect(button.locator("svg")).toHaveCount(1);
});

test("Code Block renders canonical and optional anatomy", async ({ page }) => {
  const overview = page.getByTestId("code-block-overview");
  await expect(overview.locator("[data-slot='code-block']")).toHaveAttribute(
    "data-variant",
    "subtle",
  );
  await expect(overview.locator("pre > code")).toContainText("SaveAction");
  await expect(overview.locator("[data-slot='code-block-header']")).toHaveCount(
    0,
  );
  const anatomy = page.getByTestId("code-block-anatomy");
  for (const part of [
    "header",
    "title",
    "language",
    "actions",
    "content",
    "copy-trigger",
    "copy-status",
  ]) {
    await expect(
      anatomy.locator(`[data-slot='code-block-${part}']`),
    ).toHaveCount(1);
  }
});

test("Code Block content and copy stay truthful", async ({ page }) => {
  await expect(
    page
      .getByTestId("code-block-content")
      .getByText('<Button aria-label="Save" />'),
  ).toBeVisible();
  const copy = page.getByTestId("code-block-copy");
  await copy.getByRole("button", { name: "Copy command" }).click();
  await expect(copy.getByText("Copied command")).toBeVisible();
  await copy.getByRole("button", { name: "Error" }).click();
  await copy.getByRole("button", { name: "Copy command" }).click();
  await expect(copy.getByText("Copy failed")).toBeVisible();
  await expect(copy.getByText("Copied command")).toHaveCount(0);
});

test("Code Block line metadata and adapter output stay explicit", async ({
  page,
}) => {
  const lines = page
    .getByTestId("code-block-lines")
    .locator("[data-slot='code-block-line']");
  await expect(lines).toHaveCount(5);
  await expect(lines.nth(0)).toHaveAttribute("data-line-number", "1");
  await expect(lines.nth(0)).toHaveAttribute("data-highlighted", "");
  await expect(lines.nth(1)).toHaveAttribute("data-change", "removed");
  await expect(lines.nth(2)).toHaveAttribute("data-focused", "");
  await expect(lines.nth(3)).toHaveAttribute("data-change", "added");
  const starts = await lines.locator('[data-slot="code-block-line-content"]').evaluateAll(nodes => nodes.map(n => n.getBoundingClientRect().left));
  expect(Math.max(...starts) - Math.min(...starts)).toBeLessThan(1);
});

test("Code Block bounded content stays reachable and disclosure expands", async ({
  page,
}) => {
  const bounded = page.getByRole("region", { name: "Bounded scroll source" });
  const preview = page.getByRole("region", {
    name: "Expandable source preview",
  });
  const trigger = page.locator('[data-slot="code-block-collapse-trigger"]');
  expect(await bounded.evaluate((node) => node.scrollHeight)).toBeGreaterThan(
    await bounded.evaluate((node) => node.clientHeight),
  );
  const visibleLines = await bounded.evaluate((node) => {
    node.style.setProperty("--brick-code-block-line-height", "2");
    const viewport = getComputedStyle(node);
    const pre = getComputedStyle(node.querySelector("pre")!);
    const contentHeight =
      node.clientHeight -
      Number.parseFloat(viewport.paddingBlockStart);
    return contentHeight / Number.parseFloat(pre.lineHeight);
  });
  expect(visibleLines).toBeGreaterThanOrEqual(4.95);
  expect(visibleLines).toBeLessThanOrEqual(5.05);
  expect(await preview.evaluate((node) => node.scrollHeight)).toBeGreaterThan(
    await preview.evaluate((node) => node.clientHeight),
  );
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(trigger).toHaveAccessibleName("Show full source");
  const lineVisibility = await preview.evaluate((node) => {
    const text = node.querySelector("code")!.firstChild!;
    const source = text.textContent ?? "";
    const rangeFor = (line: number) => {
      const needle = `line ${line}`;
      const start = source.indexOf(needle);
      const range = document.createRange();
      range.setStart(text, start);
      range.setEnd(text, start + needle.length);
      return range.getBoundingClientRect();
    };
    const viewport = node.getBoundingClientRect();
    const fifth = rangeFor(5);
    const sixth = rangeFor(6);
    return {
      fifthBottom: fifth.bottom,
      sixthTop: sixth.top,
      viewportBottom: viewport.bottom,
    };
  });
  expect(lineVisibility.fifthBottom).toBeLessThanOrEqual(
    lineVisibility.viewportBottom,
  );
  expect(lineVisibility.sixthTop).toBeGreaterThanOrEqual(
    lineVisibility.viewportBottom - 1,
  );
  const collapse = trigger.locator(
    "xpath=ancestor::*[@data-slot='code-block-collapse']",
  );
  const closedHeight = (await collapse.boundingBox())!.height;
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(trigger).toHaveAccessibleName("Hide full source");
  const openingHeights = await collapse.evaluate(async (element) => {
    const heights: number[] = [];
    for (let index = 0; index < 16; index += 1) {
      await new Promise(requestAnimationFrame);
      heights.push(element.getBoundingClientRect().height);
    }
    return heights;
  });
  expect(Math.min(...openingHeights)).toBeGreaterThanOrEqual(closedHeight - 1);
  expect(openingHeights[openingHeights.length - 1]).toBeGreaterThan(
    closedHeight,
  );
  const controlledId = await trigger.getAttribute("aria-controls");
  await expect(page.locator(`#${controlledId}`)).toHaveAttribute(
    "data-slot",
    "code-block-collapse-content",
  );
  await expect(preview).toBeHidden();
  await expect(
    page.getByRole("region", { name: "Expandable full source" }),
  ).toBeVisible();
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(trigger).toHaveAccessibleName("Show full source");
  await expect(preview).toBeVisible();
  await expect(
    page.getByRole("region", { name: "Expandable full source" }),
  ).toHaveCount(0);
});

test("Code Block overflow, stress, and accessibility remain contained", async ({
  page,
}) => {
  const scroll = page.getByRole("region", {
    name: "Scrollable endpoint source",
  });
  await expect(scroll).toHaveAttribute("tabindex", "0");
  expect(await scroll.evaluate((node) => node.scrollWidth)).toBeGreaterThan(
    await scroll.evaluate((node) => node.clientWidth),
  );
  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    await page.locator("html").evaluate((node) => node.scrollWidth),
  ).toBeLessThanOrEqual(390);
  const shortCode = page
    .getByRole("region", { name: "Overview Button source" })
    .locator("pre");
  const longCode = page
    .getByRole("region", { name: "Long source" })
    .locator("pre");
  await expect(shortCode).toHaveCSS("font-size", "14px");
  await expect(longCode).toHaveCSS("font-size", "14px");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
