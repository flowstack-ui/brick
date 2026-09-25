import { expect, test } from "../../evidence-test.js";

test("HoverCard docs preserve reference order, code pairs and named props", async ({
  page,
}) => {
  await page.goto("/hover-card");
  for (const id of [
    "controlled",
    "multiple",
    "delays",
    "placement",
    "disabled",
    "dialog",
    "sizes",
    "insets",
    "radius",
    "store",
    "retained",
    "positioning",
    "dismissal",
  ]) {
    const section = page.locator(`section#${id}`);
    await expect(
      section.getByRole("tab", { name: "Preview", exact: true }),
    ).toHaveCount(1);
    await section.getByRole("tab", { name: "Code", exact: true }).click();
    await expect(section.locator("pre")).toContainText("@flowstack-ui/brick");
  }
  for (const part of [
    "root",
    "trigger",
    "content",
    "portal",
    "arrow",
    "rootprovider",
    "context",
  ]) {
    await expect(page.locator(`#props-${part}`).getByRole("table")).toHaveCount(
      1,
    );
  }
  await expect(page.locator("iframe")).toHaveCount(0);
});

test("one host switches subjects and keeps native link semantics", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "Hover requires a mouse-capable device");
  await page.goto("/hover-card");
  const section = page.locator("#multiple");
  await section.getByRole("link", { name: "Ada Lovelace" }).hover();
  const panel = page.locator(".brick-hover-card:visible");
  await expect(panel).toContainText("Ada Lovelace");
  const id = await panel.getAttribute("id");
  await section.getByRole("link", { name: "Grace Hopper" }).hover();
  await expect(panel).toContainText("Grace Hopper");
  await expect(panel).toHaveAttribute("id", id!);
  await expect(panel.locator("a,button,input,[tabindex='0']")).toHaveCount(0);
  await expect(
    section.getByRole("link", { name: "Grace Hopper" }),
  ).not.toHaveAttribute("aria-expanded");
  await page.keyboard.press("Escape");
  await expect(panel).toHaveCount(0);
});

for (const appearance of ["light", "dark"]) {
  test(`insets, secondary typography and arrow attachment — ${appearance}`, async ({
    page,
  }) => {
    await page.goto(`/hover-card?appearance=${appearance}`);
    for (const [inset, padding] of [
      ["xs", 12],
      ["sm", 16],
      ["md", 20],
      ["lg", 24],
    ] as const) {
      const trigger = page
        .locator("#insets")
        .getByRole("link", { name: inset, exact: true });
      await trigger.focus();
      const panel = page.locator(".brick-hover-card:visible");
      await expect(panel).toBeVisible();
      const metrics = await panel.evaluate((node) => {
        const viewport = node.querySelector(".brick-hover-card__viewport")!;
        const title = node.querySelector("[data-slot='text']")!;
        const paragraph = node.querySelector("p")!;
        return {
          padding: parseFloat(getComputedStyle(viewport).paddingTop),
          font: parseFloat(getComputedStyle(node).fontSize),
          secondary: getComputedStyle(paragraph).color,
          primary: getComputedStyle(title).color,
        };
      });
      expect(metrics.padding).toBe(padding);
      expect(metrics.font).toBe(14);
      expect(metrics.secondary).not.toBe(metrics.primary);
      await page.keyboard.press("Escape");
      await expect(panel).toHaveCount(0);
    }
    for (const side of ["top", "right", "bottom", "left"]) {
      await page
        .locator("#placement")
        .getByRole("link", { name: side, exact: true })
        .focus();
      const panel = page.locator(".brick-hover-card:visible");
      await expect(panel).toBeVisible();
      const metrics = await panel.evaluate((node) => {
        const rect = node.getBoundingClientRect(),
          arrow = node.querySelector("svg")!.getBoundingClientRect();
        const side = node.getAttribute("data-side");
        return Math.abs(
          side === "bottom"
            ? arrow.bottom - rect.top
            : side === "top"
              ? arrow.top - rect.bottom
              : side === "left"
                ? arrow.left - rect.right
                : arrow.right - rect.left,
        );
      });
      expect(metrics).toBeLessThanOrEqual(2);
      await page.keyboard.press("Escape");
    }
  });
}

test("nested Dialog preview is visible and Escape closes the inner layer first", async ({
  page,
}) => {
  await page.goto("/hover-card");
  await page
    .locator("#dialog")
    .getByRole("button", { name: "Open dialog" })
    .focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog");
  await dialog.getByRole("link", { name: "Ada's profile" }).focus();
  const panel = page.locator(".brick-hover-card").filter({ hasText: "A supplementary preview inside the dialog." });
  await expect(panel).toBeVisible();
  await expect(panel).toHaveCSS("position", "fixed");
  await expect(panel).not.toHaveAttribute("inert");
  // Visibility alone does not detect clipping by a transformed scroll host.
  await expect.poll(() => panel.evaluate((node) => {
    const r = node.getBoundingClientRect();
    // Probe edge midpoints, not intentionally transparent rounded corners.
    return [[r.left + r.width / 2, r.top + 4], [r.right - 4, r.top + r.height / 2],
      [r.left + 4, r.top + r.height / 2], [r.left + r.width / 2, r.bottom - 4]]
      .every(([x, y]) => node.contains(document.elementFromPoint(x, y)));
  })).toBe(true);
  await page.keyboard.press("Escape");
  await expect(panel).toBeHidden();
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("controlled preview anchors to its label rather than a stretched row", async ({ page }) => {
  await page.goto("/hover-card");
  const trigger = page.locator("#controlled").getByRole("link", { name: "Controlled preview" });
  await trigger.focus();
  const panel = page.locator(".brick-hover-card:visible");
  await expect(panel).toBeVisible();
  const widths = await trigger.evaluate(node => {
    const range = document.createRange();
    range.selectNodeContents(node);
    return { label: range.getBoundingClientRect().width, trigger: node.getBoundingClientRect().width };
  });
  expect(Math.abs(widths.label - widths.trigger)).toBeLessThan(2);
  await expect.poll(async () => {
    const a = await trigger.boundingBox(), b = await panel.boundingBox();
    // On narrow screens Atom shifts the centered panel inside its 8px gutter.
    const viewport = await page.evaluate(() => document.documentElement.clientWidth);
    const idealLeft = a!.x + a!.width / 2 - b!.width / 2;
    const expectedLeft = Math.max(8, Math.min(idealLeft, viewport - 8 - b!.width));
    return Math.abs(expectedLeft - b!.x);
  }).toBeLessThan(2);
});

test("retained host, controller and matching width", async ({ page }) => {
  await page.goto("/hover-card");
  await page
    .locator("#retained")
    .getByRole("link", { name: "Retained preview" })
    .focus();
  const panel = page.locator(".brick-hover-card:visible");
  await expect(panel).toBeVisible();
  const id = await panel.getAttribute("id");
  await page.keyboard.press("Escape");
  await expect(page.locator(`[id='${id}']`)).toBeHidden();
  await expect(page.locator(`[id='${id}']`)).toHaveCount(1);
  await page
    .locator("#store")
    .getByRole("button", { name: "Toggle preview" })
    .click();
  await expect(page.locator(".brick-hover-card:visible")).toContainText(
    "controller",
  );
  await page.keyboard.press("Escape");
  const trigger = page
    .locator("#positioning")
    .getByRole("link", { name: "A preview matching its trigger width" });
  await page.keyboard.press("Tab");
  await trigger.focus();
  const matchingPanel = page
    .locator(".brick-hover-card")
    .filter({ hasText: "This preview follows the trigger's width." });
  await expect(matchingPanel).toBeVisible();
  await expect
    .poll(async () => {
      const triggerBox = await trigger.boundingBox(),
        panelBox = await matchingPanel.boundingBox();
      return Math.abs(triggerBox!.width - panelBox!.width);
    })
    .toBeLessThan(2);
});
