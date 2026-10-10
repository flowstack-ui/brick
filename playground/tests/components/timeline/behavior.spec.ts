import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";

test.beforeEach(async ({ page }) => {
  await page.goto("/timeline?qualification=1");
});
test("Timeline marker sizes, final lines and tone overrides", async ({
  page,
}) => {
  const sizes = await page
    .locator("#scenario-timeline-sizes .brick-timeline")
    .evaluateAll((roots) =>
      roots.map((root) => {
        const marker = root
          .querySelector(".brick-timeline-indicator")!
          .getBoundingClientRect();
        return [marker.width, marker.height];
      }),
    );
  expect(sizes).toEqual([
    [16, 16],
    [20, 20],
    [24, 24],
    [32, 32],
  ]);
  const lines = page.locator(
    "#scenario-timeline-last .brick-timeline-separator",
  );
  expect(
    await lines.evaluateAll((nodes) =>
      nodes.map((node) => getComputedStyle(node).visibility),
    ),
  ).toEqual(["hidden", "visible"]);
  const tones = await page
    .locator(
      "#scenario-timeline-recipes .brick-timeline[data-variant='solid'] .brick-timeline-indicator",
    )
    .evaluateAll((nodes) =>
      nodes.map((node) => getComputedStyle(node).backgroundColor),
    );
  expect(new Set(tones).size).toBe(6);
});
test("Timeline connectors stretch with content and share a logical axis", async ({
  page,
}) => {
  const geometry = await page
    .locator("#scenario-timeline-basic .brick-timeline-item")
    .evaluateAll((items) =>
      items.map((item) => {
        const marker = item
          .querySelector(".brick-timeline-indicator")!
          .getBoundingClientRect();
        const line = item
          .querySelector(".brick-timeline-separator")!
          .getBoundingClientRect();
        return {
          marker: {
            x: marker.x,
            y: marker.y,
            width: marker.width,
            bottom: marker.bottom,
          },
          line: {
            x: line.x,
            width: line.width,
            y: line.y,
            bottom: line.bottom,
          },
        };
      }),
    );
  for (let i = 0; i < geometry.length - 1; i++) {
    const { marker, line } = geometry[i];
    expect(
      Math.abs(marker.x + marker.width / 2 - line.x - line.width / 2),
    ).toBeLessThan(1);
    expect(line.y - marker.bottom).toBeCloseTo(4, 0);
    expect(geometry[i + 1].marker.y - line.bottom).toBeCloseTo(4, 0);
  }
  const axes = await page
    .locator("#scenario-timeline-alternating .brick-timeline")
    .evaluateAll((roots) =>
      roots.map((root) =>
        Array.from(
          root.querySelectorAll(".brick-timeline-indicator"),
          (node) => node.getBoundingClientRect().x,
        ),
      ),
    );
  for (const axis of axes) expect(new Set(axis).size).toBe(1);
});
test("Timeline narrow RTL, nested roots and forced colors remain readable", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 900 });
  for (const content of await page.locator(".brick-timeline").all())
    expect(
      await content.evaluate(
        (node) => node.scrollWidth <= node.clientWidth + 1,
      ),
    ).toBe(true);
  const nested = page
    .locator(
      "#scenario-timeline-surfaces .brick-timeline .brick-timeline .brick-timeline-indicator",
    )
    .first();
  expect((await nested.boundingBox())!.width).toBe(16);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.emulateMedia({ forcedColors: "active" });
  expect(
    await page
      .locator("#scenario-timeline-basic .brick-timeline-separator")
      .first()
      .evaluate((node) => getComputedStyle(node).borderInlineStartColor),
  ).not.toBe("rgba(0, 0, 0, 0)");
});

test("Timeline inherits public overrides and keeps private nested size defaults isolated", async ({
  page,
}) => {
  const root = page.locator("#scenario-timeline-basic .brick-timeline");
  const metrics = await root.evaluate((node) => {
    const parent = node.parentElement!;
    const previous = parent.getAttribute("style");
    parent.style.setProperty("--brick-timeline-marker-size", "40px");
    parent.style.setProperty("--brick-timeline-gap", "32px");
    parent.style.setProperty("--brick-timeline-fill", "rgb(12, 34, 56)");
    const marker = node.querySelector(".brick-timeline-indicator")!;
    const content = node.querySelector(".brick-timeline-content")!;
    const result = {
      width: marker.getBoundingClientRect().width,
      fill: getComputedStyle(marker).backgroundColor,
      gap: getComputedStyle(node.querySelector(".brick-timeline-item")!)
        .columnGap,
      innerGap: getComputedStyle(content).gap,
    };
    if (previous === null) parent.removeAttribute("style");
    else parent.setAttribute("style", previous);
    return result;
  });
  expect(metrics).toEqual({
    width: 40,
    fill: "rgb(12, 34, 56)",
    gap: "32px",
    innerGap: "8px",
  });
  expect(
    await page
      .locator("#scenario-timeline-sizes .brick-timeline-indicator")
      .evaluateAll((nodes) =>
        nodes
          .filter((_, i) => i % 3 === 0)
          .map((node) => getComputedStyle(node).fontSize),
      ),
  ).toEqual(["10px", "12px", "12px", "14px"]);
});

test("Timeline documentation exposes all parts and source-paired focused examples", async ({
  page,
}) => {
  await page.goto("/timeline");
  for (const title of [
    "Content before",
    "Alternating",
    "Composition",
    "Shared defaults",
    "PropsProvider",
  ])
    await expect(
      page.getByRole("heading", { name: title, exact: true }),
    ).toBeVisible();
  for (const part of [
    "root",
    "item",
    "connector",
    "indicator",
    "separator",
    "content",
    "title",
    "description",
    "provider",
  ]) {
    await expect(page.locator(`#props-${part} table`)).toBeAttached();
  }
  await expect(page.locator("#scenario-timeline-appearance")).toHaveCount(0);
  await expect(
    page.locator("#dates").getByRole("tab", { name: "Code", exact: true }),
  ).toBeAttached();
});

test("Timeline responsive recipes and compact date columns preserve geometry in RTL and narrow viewports", async ({
  page,
}) => {
  await page.goto("/timeline");
  for (const width of [390, 1000]) {
    await page.setViewportSize({ width, height: 900 });
    const marker = page
      .locator("#responsive .brick-timeline-indicator")
      .first();
    expect((await marker.boundingBox())!.width).toBe(width < 768 ? 16 : 32);
    for (const direction of ["ltr", "rtl"]) {
      const compact = page.locator("#dates .brick-timeline");
      await compact.evaluate(
        (node, dir) => node.setAttribute("dir", dir),
        direction,
      );
      const geometry = await compact.evaluate((node) => {
        const items = Array.from(node.querySelectorAll(".brick-timeline-item"));
        return {
          overflow: node.scrollWidth > node.clientWidth + 1,
          columns: items.map((item) => {
            const before = item
              .querySelector('[data-side="before"]')!
              .getBoundingClientRect();
            const marker = item
              .querySelector(".brick-timeline-indicator")!
              .getBoundingClientRect();
            const after = item
              .querySelector('[data-side="after"]')!
              .getBoundingClientRect();
            return { before: before.width, after: after.width, axis: marker.x };
          }),
        };
      });
      expect(geometry.overflow).toBe(false);
      expect(new Set(geometry.columns.map((column) => column.axis)).size).toBe(
        1,
      );
      for (const column of geometry.columns)
        expect(column.before).toBeLessThan(column.after);
    }
  }
  expect(
    await page
      .locator("#responsive .brick-timeline")
      .evaluate((node) => node.getAnimations({ subtree: true }).length),
  ).toBe(0);
});
