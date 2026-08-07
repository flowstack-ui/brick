import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator } from "@playwright/test";

test("Drawer Footer maps logical action distribution to flex alignment", async ({ page }) => {
  await page.goto("/drawer");
  await page.getByRole("button", { name: "Filter projects" }).click();
  const footer = page.getByTestId("drawer-overview-content").locator("[data-slot='drawer-footer']");
  await expect(footer).toHaveAttribute("data-justify", "end");
  for (const [justify, expected] of [["start", "flex-start"], ["center", "center"], ["between", "space-between"]] as const) {
    await footer.evaluate((element, value) => element.setAttribute("data-justify", value), justify);
    await expect.poll(() => footer.evaluate((element) => getComputedStyle(element).justifyContent)).toBe(expected);
  }
});

async function expectDrawerDefaults(
  drawer: Locator,
  slot = "drawer-content",
) {
  await expect(drawer).toHaveAttribute("data-placement", "end");
  await expect(drawer).toHaveAttribute("data-size", "md");
  await expect(drawer).toHaveAttribute("role", "dialog");
  await expect(drawer).toHaveAttribute("aria-modal", "true");
  await expect(drawer).toHaveAttribute("data-slot", slot);
}

async function expectDrawerSettled(drawer: Locator) {
  await expect(drawer).toHaveAttribute("data-state", "open");
  await expect
    .poll(async () =>
      drawer.evaluate((element) => getComputedStyle(element).transform),
    )
    .toBe("matrix(1, 0, 0, 1, 0, 0)");
}

test("Drawer exposes its default anatomy, composed filters, and focus lifecycle", async ({
  page,
}) => {
  await page.goto("/drawer");
  const trigger = page.getByRole("button", { name: "Filter projects" });
  await trigger.click();
  const drawer = page.getByTestId("drawer-overview-content");
  await expectDrawerDefaults(drawer);
  await expect(drawer).toHaveAccessibleName("Filter projects");
  await expect(drawer).toHaveAccessibleDescription(
    "Narrow the visible project list without leaving this page.",
  );
  await expect(drawer.locator("[data-slot='drawer-header']")).toHaveCount(1);
  await expect(drawer.locator("[data-slot='drawer-body']")).toHaveCount(1);
  await expect(drawer.locator("[data-slot='drawer-footer']")).toHaveCount(1);
  await expect(page.locator(".brick-drawer-overlay")).toBeVisible();
  await expect(
    drawer.getByRole("group", { name: "Project status" }),
  ).toBeVisible();
  await expect(
    drawer.getByRole("checkbox", { name: "Active projects" }),
  ).toHaveAttribute("data-state", "checked");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await drawer.getByRole("button", { name: "Cancel" }).click();
  await expect(drawer).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("Drawer placements change only the attached edge", async ({ page }) => {
  await page.setViewportSize({ width: 1000, height: 800 });
  await page.goto("/drawer");

  for (const placement of ["start", "end", "top", "bottom"] as const) {
    await page
      .getByRole("button", { name: `Open ${placement} drawer` })
      .click();
    const drawer = page.getByTestId(`drawer-placement-${placement}`);
    await expect(drawer).toHaveAttribute("data-placement", placement);
    await expect(drawer).toHaveAttribute("data-size", "md");
    await expect(drawer).toHaveAccessibleName("Filter projects");
    await expectDrawerSettled(drawer);
    const box = await drawer.boundingBox();
    expect(box).not.toBeNull();
    if (placement === "start") expect(box!.x).toBeCloseTo(0, 0);
    if (placement === "end")
      expect(box!.x + box!.width).toBeCloseTo(1000, 0);
    if (placement === "top") expect(box!.y).toBeCloseTo(0, 0);
    if (placement === "bottom")
      expect(box!.y + box!.height).toBeCloseTo(800, 0);
    await drawer.getByRole("button", { name: "Cancel" }).click();
  }
});

test("Drawer sizes remain ordered and only full occupies a mobile viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 640 });
  await page.goto("/drawer");
  const widths: number[] = [];

  for (const size of ["sm", "md", "lg", "xl", "full"] as const) {
    await page.getByRole("button", { name: `Open ${size} drawer` }).click();
    const drawer = page.getByTestId(`drawer-size-${size}`);
    await expect(drawer).toHaveAttribute("data-placement", "end");
    await expect(drawer).toHaveAttribute("data-size", size);
    await expectDrawerSettled(drawer);
    const box = await drawer.boundingBox();
    expect(box).not.toBeNull();
    widths.push(box!.width);
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(390.5);
    await drawer.getByRole("button", { name: "Cancel" }).click();
  }

  expect(widths[0]).toBeLessThan(widths[1]);
  expect(widths[1]).toBeLessThan(widths[2]);
  expect(widths[2]).toBeLessThan(widths[3]);
  expect(widths[3]).toBeLessThan(widths[4]);
  expect(widths[4]).toBeCloseTo(390, 0);
});

test("top Drawer grows with content until its size cap, then Body scrolls", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 640 });
  await page.goto("/drawer");
  await page.getByRole("button", { name: "Open top drawer" }).click();

  const drawer = page.getByTestId("drawer-placement-top");
  const body = drawer.locator("[data-slot='drawer-body']");
  await expectDrawerSettled(drawer);

  const naturalBox = await drawer.boundingBox();
  expect(naturalBox).not.toBeNull();
  expect(naturalBox!.height).toBeLessThan(384);

  await body.evaluate((element) => {
    for (let index = 0; index < 30; index += 1) {
      const paragraph = document.createElement("p");
      paragraph.textContent = `Additional navigation destination ${index + 1}`;
      element.append(paragraph);
    }
  });

  await expect.poll(async () => (await drawer.boundingBox())?.height).toBeCloseTo(384, 0);
  expect(
    await body.evaluate((element) => element.scrollHeight > element.clientHeight),
  ).toBe(true);
});

test("Drawer renders only authored anatomy and every supported Title level", async ({
  page,
}) => {
  await page.goto("/drawer");

  await page.getByRole("button", { name: "Open minimum drawer" }).click();
  const minimum = page.getByTestId("drawer-anatomy-minimum");
  await expectDrawerDefaults(minimum);
  await expect(minimum).toHaveAccessibleName("Minimum named Drawer");
  await expect(minimum.locator("[data-slot='drawer-header']")).toHaveCount(0);
  await expect(minimum.locator("[data-slot='drawer-body']")).toHaveCount(0);
  await expect(minimum.locator("[data-slot='drawer-footer']")).toHaveCount(0);
  await minimum
    .getByRole("button", { name: "Close minimum Drawer" })
    .click();

  await page.getByRole("button", { name: "Open descriptive drawer" }).click();
  const body = page.getByTestId("drawer-anatomy-body");
  await expectDrawerDefaults(body);
  await expect(body.locator("[data-slot='drawer-header']")).toHaveCount(1);
  await expect(body.locator("[data-slot='drawer-body']")).toHaveCount(1);
  await expect(body.locator("[data-slot='drawer-footer']")).toHaveCount(0);
  await body
    .getByRole("button", { name: "Close descriptive Drawer" })
    .click();

  await page.getByRole("button", { name: "Inspect drawer anatomy" }).click();
  const complete = page.getByTestId("drawer-anatomy-complete");
  await expectDrawerDefaults(complete);
  await expect(complete.locator("[data-slot='drawer-header']")).toHaveCount(1);
  await expect(complete.locator("[data-slot='drawer-body']")).toHaveCount(1);
  await expect(complete.locator("[data-slot='drawer-footer']")).toHaveCount(1);
  await complete.getByRole("button", { name: "Cancel" }).click();

  for (const level of [1, 2, 3, 4, 5, 6] as const) {
    await page.getByRole("button", { name: `Open h${level} Drawer` }).click();
    const drawer = page.getByTestId(`drawer-title-h${level}`);
    await expectDrawerDefaults(drawer);
    await expect(
      drawer.getByRole("heading", { level, name: "Filter projects" }),
    ).toHaveJSProperty("tagName", `H${level}`);
    await drawer.getByRole("button", { name: "Close" }).click();
  }
});

test("Drawer preserves default and disabled dismissal policies", async ({
  page,
}) => {
  await page.goto("/drawer");
  const trigger = page.getByRole("button", { name: "Open event drawer" });
  await trigger.click();
  let drawer = page.getByRole("dialog", { name: "Dismissal evidence" });
  await expect(page.locator("html")).toHaveCSS("overflow", "hidden");
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  await page.keyboard.press("Escape");
  await expect(drawer).toBeHidden();
  await expect(page.getByText("Closed: escapeKeyDown")).toBeVisible();
  await expect(trigger).toBeFocused();

  await trigger.click();
  drawer = page.getByRole("dialog", { name: "Dismissal evidence" });
  await page
    .locator(".brick-drawer-overlay")
    .filter({ visible: true })
    .click({ position: { x: 4, y: 4 } });
  await expect(drawer).toBeHidden();
  await expect(page.getByText("Closed: backdropClick")).toBeVisible();

  const disabled = page.getByRole("button", { name: "Unavailable drawer" });
  await expect(disabled).toBeDisabled();
  await expect(disabled).toHaveAttribute("tabindex", "-1");
  await disabled.click({ force: true });
  await expect(page.getByRole("dialog")).toHaveCount(0);

  const persistentTrigger = page.getByRole("button", {
    name: "Open dismissal-disabled drawer",
  });
  await persistentTrigger.click();
  const persistent = page.getByRole("dialog", {
    name: "Explicit close required",
  });
  await page.keyboard.press("Escape");
  await expect(persistent).toBeVisible();
  await page
    .locator(".brick-drawer-overlay")
    .filter({ visible: true })
    .click({ position: { x: 4, y: 4 } });
  await expect(persistent).toBeVisible();
  await persistent
    .getByRole("button", { name: "Close persistent drawer" })
    .click();
  await expect(persistentTrigger).toBeFocused();
});

test("Drawer preserves nested layers and a registered portalled Branch", async ({
  page,
}) => {
  await page.goto("/drawer");
  const parentTrigger = page.getByRole("button", {
    name: "Open parent drawer",
  });
  await parentTrigger.click();
  const drawer = page.getByRole("dialog", { name: "Parent filters" });
  const nestedTrigger = drawer.getByRole("button", {
    name: "Open nested dialog from drawer",
  });
  await nestedTrigger.click();
  const dialog = page.getByRole("dialog", { name: "Save filter preset?" });
  await dialog
    .getByRole("button", { name: "Done with nested dialog" })
    .click();
  await expect(drawer).toBeVisible();
  await expect(nestedTrigger).toBeFocused();
  await drawer.getByRole("button", { name: "Close parent drawer" }).click();
  await expect(parentTrigger).toBeFocused();

  await page.getByRole("button", { name: "Open branch drawer" }).click();
  const branchDrawer = page.getByRole("dialog", {
    name: "Branch composition",
  });
  await branchDrawer
    .getByRole("button", { name: "Open portalled surface" })
    .click();
  const branch = page.getByRole("complementary", {
    name: "Owned branch surface",
  });
  await expect(branch).toHaveAttribute("data-slot", "drawer-branch");
  await expect(branch).toHaveClass(/brick-drawer-branch/);
  await branch
    .getByRole("button", { name: "Close branch surface" })
    .focus();
  await expect(
    branch.getByRole("button", { name: "Close branch surface" }),
  ).toBeFocused();
  await branch.getByRole("button", { name: "Close branch surface" }).click();
  await expect(branch).toHaveCount(0);
  await branchDrawer
    .getByRole("button", { name: "Close branch drawer" })
    .click();
  await expect(page.locator("#root")).not.toHaveAttribute("inert", "");
});

test("Drawer preserves scoped portals and exact customization hooks", async ({
  page,
}) => {
  await page.goto("/drawer");
  const scopes = page.getByTestId("drawer-appearance");

  await scopes
    .getByRole("button", { name: "Light scoped Drawer" })
    .click();
  const light = scopes.getByRole("dialog", { name: "Light scoped Drawer" });
  await expectDrawerDefaults(light);
  const lightBackground = await light.evaluate(
    (element) => getComputedStyle(element).backgroundColor,
  );
  await light.getByRole("button", { name: "Close" }).click();

  await scopes
    .getByRole("button", { name: "Dark scoped Drawer" })
    .click();
  const dark = scopes.getByRole("dialog", { name: "Dark scoped Drawer" });
  expect(
    await dark.evaluate((element) => getComputedStyle(element).backgroundColor),
  ).not.toBe(lightBackground);
  await dark.getByRole("button", { name: "Close" }).click();

  await page
    .getByRole("button", { name: "Open token customization" })
    .click();
  const token = page.getByTestId("drawer-token-customization");
  await expectDrawerDefaults(token);
  await expect(token).toHaveCSS("--brick-drawer-radius", "0.25rem");
  await expect(token).toHaveCSS("--brick-drawer-space", "2rem");
  await expect(token).toHaveCSS(
    "--brick-drawer-shadow",
    "0 1.5rem 4rem rgb(53 46 91 / 35%)",
  );
  await token.getByRole("button", { name: "Close" }).click();

  await page.getByRole("button", { name: "Open consumer hooks" }).click();
  const hook = page.locator(
    '.brick-drawer-content[data-slot="custom-drawer"]',
  );
  await expectDrawerDefaults(hook, "custom-drawer");
  await expect(hook).toHaveClass(/dashed-drawer/);
  await expect(hook).toHaveCSS("border-style", "dashed");
  await expect(hook).toHaveCSS("border-width", "2px");
  await expect(
    hook.locator('[data-slot="custom-drawer-header"]'),
  ).toHaveCount(1);
});

test("Drawer keeps long Body content and RTL start placement within the viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 640 });
  await page.goto("/drawer");

  await page.getByRole("button", { name: "Open long drawer" }).click();
  const longDrawer = page.getByTestId("drawer-long-content-surface");
  await expectDrawerDefaults(longDrawer);
  await expectDrawerSettled(longDrawer);
  const body = longDrawer.locator("[data-slot='drawer-body']");
  const footer = longDrawer.locator("[data-slot='drawer-footer']");
  expect(
    await body.evaluate(
      (element) => element.scrollHeight > element.clientHeight,
    ),
  ).toBe(true);
  await expect(footer).toBeVisible();
  await longDrawer.getByRole("button", { name: "Cancel" }).click();

  await page
    .getByRole("button", { name: "فتح مرشحات مساحة العمل المفصلة" })
    .click();
  const rtl = page.getByTestId("drawer-rtl-content");
  await expect(rtl).toHaveAttribute("data-placement", "start");
  await expect(rtl).toHaveAttribute("data-size", "md");
  await expect(rtl).toHaveAttribute("dir", "rtl");
  await expectDrawerSettled(rtl);
  await expect(rtl.locator("[data-slot='drawer-title']")).toHaveCSS(
    "direction",
    "rtl",
  );
  expect(
    await rtl
      .locator("[data-slot='drawer-body']")
      .evaluate((element) => element.scrollHeight > element.clientHeight),
  ).toBe(true);
  const box = await rtl.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.x + box!.width).toBeCloseTo(390, 0);
});

test("Drawer remains reachable at extreme height and preserves preference boundaries", async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 390, height: 160 });
  await page.goto("/drawer");
  await page.getByRole("button", { name: "Open long drawer" }).focus();
  await page.keyboard.press("Enter");
  let drawer = page.getByTestId("drawer-long-content-surface");
  await expectDrawerSettled(drawer);
  expect(
    await drawer.evaluate(
      (element) => element.scrollHeight > element.clientHeight,
    ),
  ).toBe(true);
  await drawer.evaluate((element) =>
    element.scrollTo({ top: element.scrollHeight }),
  );
  await expect(
    drawer.getByRole("button", { name: "Apply changes" }),
  ).toBeVisible();
  await drawer.getByRole("button", { name: "Apply changes" }).click();

  test.skip(
    testInfo.project.name !== "chromium",
    "Forced colors is a Chromium release check.",
  );
  await page.setViewportSize({ width: 1000, height: 800 });
  await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  await page.getByRole("button", { name: "Filter projects" }).click();
  drawer = page.getByTestId("drawer-overview-content");
  await expect(drawer).toHaveCSS("transition-duration", "0.001s");
  await expect(drawer).toHaveCSS("box-shadow", "none");
  expect(
    await drawer.evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).borderWidth),
    ),
  ).toBeGreaterThanOrEqual(1);
});
