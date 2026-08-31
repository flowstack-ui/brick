import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/code-block");
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
      Number.parseFloat(viewport.paddingBlockStart) -
      Number.parseFloat(viewport.paddingBlockEnd);
    return contentHeight / Number.parseFloat(pre.lineHeight);
  });
  expect(visibleLines).toBeGreaterThanOrEqual(4.4);
  expect(visibleLines).toBeLessThanOrEqual(5);
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
    lineVisibility.viewportBottom - 0.5,
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
  await expect(shortCode).toHaveCSS("font-size", "16px");
  await expect(longCode).toHaveCSS("font-size", "16px");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
