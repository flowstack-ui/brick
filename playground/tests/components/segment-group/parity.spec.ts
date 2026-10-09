import { expect, test } from "../../evidence-test.js";

test.beforeEach(async ({ page }) => {
  await page.goto("/segment-group");
});

test("initial RTL indicator remains contained through measured handoff", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/segment-group?qualification=1");
  const group = page.getByRole("radiogroup", { name: "عرض المشروع", exact: true });
  await expect(group).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
  await expect(group.locator(".brick-segment-group__indicator")).toBeVisible();
  await aligned(group);
  await group.getByRole("radio", { name: "Grid", exact: true }).click();
  await aligned(group);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
});

test("indicator uses its iframe owner window", async ({ page }) => {
  test.setTimeout(60_000);
  await page.evaluate(() => {
    const frame = document.createElement("iframe");
    frame.title = "SegmentGroup owner-window qualification";
    frame.src = "/segment-group";
    frame.width = "900";
    frame.height = "700";
    document.body.prepend(frame);
  });
  const group = page.frameLocator('iframe[title="SegmentGroup owner-window qualification"]').getByRole("radiogroup", {name: "Project view", exact: true});
  await group.getByRole("radio", {name: "Grid", exact:true}).click();
  await aligned(group);
  await group.getByRole("radio", {name: "Grid", exact:true}).press("ArrowRight");
  await expect(group.getByRole("radio", {name: "Board", exact:true})).toBeChecked();
  await aligned(group);
});
async function aligned(group: any) {
  await expect
    .poll(async () => {
      const item = await group
        .locator('[role="radio"][aria-checked="true"]')
        .boundingBox();
      const indicator = await group
        .locator(".brick-segment-group__indicator")
        .boundingBox();
      if (!item || !indicator) return 100;
      return Math.max(
        ...["x", "y", "width", "height"].map((k) =>
          Math.abs(item[k] - indicator[k]),
        ),
      );
    })
    .toBeLessThan(1.5);
}
test("tone selects paint without tinting track or changing geometry", async ({
  page,
}) => {
  const groups = page.getByRole("radiogroup", {
    name: "Toned view",
    exact: true,
  });
  const measurements = await groups.evaluateAll((es) =>
    es.map((e) => {
      const indicator = e.querySelector(".brick-segment-group__indicator")!;
      const selected = e.querySelector('[aria-checked="true"]')!;
      return {
        track: getComputedStyle(e).backgroundColor,
        height: e.getBoundingClientRect().height,
        fill: getComputedStyle(indicator).backgroundColor,
        text: getComputedStyle(selected).color,
      };
    }),
  );
  expect(new Set(measurements.map((x) => x.track)).size).toBe(1);
  expect(new Set(measurements.map((x) => x.height)).size).toBe(1);
  expect(new Set(measurements.map((x) => x.fill)).size).toBe(3);
  for (let i = 0; i < 3; i++) await aligned(groups.nth(i));
});
test("named form keeps dividers and submits, validates and resets", async ({
  page,
}) => {
  const group = page.getByRole("radiogroup", {
    name: "Form view",
    exact: true,
  });
  const radios = group.getByRole("radio");
  await expect
    .poll(() =>
      radios.evaluateAll((es) =>
        es.slice(1).map((e) => getComputedStyle(e, "::before").content),
      ),
    )
    .toEqual(['""', '""']);
  await group.getByRole("radio", { name: "Grid", exact: true }).click();
  await aligned(group);
  await expect
    .poll(() =>
      radios.evaluateAll((es) =>
        es.slice(1).map((e) => getComputedStyle(e, "::before").opacity),
      ),
    )
    .toEqual(["0", "0"]);
  await page.getByRole("button", { name: "Submit", exact: true }).click();
  await expect(page.locator("form").filter({has:group}).getByRole("status")).toHaveText("Grid");
  await expect(group.locator('input[name="view"]')).toHaveCount(3);
  await page.getByRole("button", { name: "Reset", exact: true }).click();
  await expect(group.locator('[aria-checked="true"]')).toHaveCount(0);
  await expect(
    group.locator(".brick-segment-group__indicator"),
  ).not.toHaveAttribute("data-ready");
});
test("geometry survives slot override, sibling resize, scale and removal", async ({
  page,
}) => {
  const group = page.getByRole("radiogroup", {
    name: "Project view",
    exact: true,
  });
  await group.getByRole("radio", { name: "Grid", exact: true }).click();
  await group.evaluate((e) => {
    e.setAttribute("data-slot", "custom-root");
    (e as HTMLElement).style.transform = "scale(.8)";
    const first = e.querySelector('[role="radio"]') as HTMLElement;
    first.style.paddingInline = "32px";
  });
  await aligned(group);
  await group.locator('[aria-checked="true"]').evaluate((e) => e.remove());
  await expect(
    group.locator(".brick-segment-group__indicator"),
  ).not.toHaveAttribute("data-ready");
});
test("readOnly focus does not move selection and shortcut disabled item is skipped", async ({
  page,
}) => {
  const group = page.getByRole("radiogroup", {
    name: "Read-only view",
    exact: true,
  });
  await group
    .getByRole("radio", { name: "List", exact: true })
    .press("ArrowRight");
  await expect(
    group.getByRole("radio", { name: "Grid", exact: true }),
  ).toBeFocused();
  await expect(
    group.getByRole("radio", { name: "List", exact: true }),
  ).toBeChecked();
  await aligned(group);
  const partial = page.getByRole("radiogroup", {
    name: "Partly available view",
    exact: true,
  });
  await partial
    .getByRole("radio", { name: "List", exact: true })
    .press("ArrowRight");
  await expect(
    partial.getByRole("radio", { name: "Board", exact: true }),
  ).toBeChecked();
});
test("SSR fallback is available with no ready indicator and scoped override remains local", async ({
  page,
}) => {
  const group = page.getByRole("radiogroup", {
    name: "Custom indicator",
    exact: true,
  });
  await expect(group.locator(".brick-segment-group__indicator")).toHaveCSS(
    "box-shadow",
    "none",
  );
  await group
    .locator(".brick-segment-group__indicator")
    .evaluate((e) => e.remove());
  const selected = group.locator('[aria-checked="true"]');
  expect(
    await selected.evaluate((e) => getComputedStyle(e).backgroundColor),
  ).not.toBe("rgba(0, 0, 0, 0)");
  await expect(
    page
      .getByRole("radiogroup", { name: "Project view", exact: true })
      .locator(".brick-segment-group__indicator"),
  ).not.toHaveCSS("box-shadow", "none");
});
