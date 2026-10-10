import { expect, test } from "../../evidence-test.js";

test("Card horizontal media fills its column and semantic actions retain their tones", async ({
  page,
}) => {
  await page.goto("/card");
  await page.setViewportSize({ width: 1280, height: 900 });
  const image = page.locator("#media img");
  await expect(image).toBeVisible();
  await expect
    .poll(() => image.evaluate((n) => (n as HTMLImageElement).naturalWidth))
    .toBeGreaterThan(0);
  const imageBox = await image.boundingBox();
  const cardBox = await page.locator("#media .brick-card").boundingBox();
  expect(imageBox).not.toBeNull();
  expect(cardBox).not.toBeNull();
  expect(
    Math.abs(imageBox!.y + imageBox!.height - cardBox!.y - cardBox!.height),
  ).toBeLessThanOrEqual(2);
  await expect(
    page.locator("#media").getByRole("button", { name: "Explore" }),
  ).toHaveAttribute("data-tone", "contrast");
  await expect(page.locator("#media").getByRole("button", { name: "Explore" })).toHaveCSS("background-color", await page.locator("#media .brick-card").evaluate(n => getComputedStyle(n).color));
  await expect(
    page.locator("#avatar").getByRole("button", { name: "Decline" }),
  ).toHaveAttribute("data-tone", "danger");
  await expect(
    page.locator("#avatar").getByRole("button", { name: "Approve" }),
  ).toHaveAttribute("data-tone", "info");
});

test("Card form, size progression and natural equal-height footers", async ({
  page,
}) => {
  await page.goto("/card");
  await expect(
    page.getByRole("form", { name: "Create a project" }),
  ).toHaveClass(/brick-card/);
  await expect(page.getByLabel("Project name", { exact: true })).toBeVisible();
  const cards = page.locator("#sizes .brick-card");
  expect(
    await cards.evaluateAll((nodes) =>
      nodes.map((n) =>
        parseFloat(
          getComputedStyle(n.querySelector(".brick-card-header")!)
            .paddingInlineStart,
        ),
      ),
    ),
  ).toEqual([16, 24, 28]);
  expect(
    await cards.evaluateAll((nodes) =>
      nodes.map((n) =>
        parseFloat(
          getComputedStyle(n.querySelector(".brick-card-title")!).fontSize,
        ),
      ),
    ),
  ).toEqual([16, 18, 20]);
  const footers = page.locator("#equal-height .brick-card-footer");
  const a = await footers.nth(0).boundingBox(),
    b = await footers.nth(1).boundingBox();
  if (a && b && Math.abs(a.x - b.x) > 5)
    expect(Math.abs(a.y - b.y)).toBeLessThan(1);
});

test("Card border overrides and sparse responsive resets", async ({ page }) => {
  await page.goto("/card");
  for (const n of await page.locator("#borders .brick-card").all()) {
    await expect(n).toHaveCSS("border-top-width", "1px");
    expect(
      await n.evaluate((n) => getComputedStyle(n).borderTopColor),
    ).not.toBe("rgba(0, 0, 0, 0)");
  }
  const card = page.locator("#responsive .brick-card");
  for (const [width, inset, shadow, gap, justify] of [
    [390, 24, false, 6, "normal"],
    [600, 16, false, 6, "normal"],
    [800, 28, true, 12, "flex-end"],
    [1100, 24, false, 12, "flex-end"],
    [1400, 24, false, 12, "flex-end"],
    [390, 24, false, 6, "normal"],
  ] as const) {
    await page.setViewportSize({ width, height: 900 });
    await expect(card.locator(".brick-card-content")).toHaveCSS(
      "padding-top",
      inset + "px",
    );
    expect(
      await card.evaluate((n) => getComputedStyle(n).boxShadow !== "none"),
    ).toBe(shadow);
    await expect(card).toHaveCSS("border-top-width", "1px");
    expect(
      await card.evaluate((n) => getComputedStyle(n).borderTopColor),
    ).not.toBe("rgba(0, 0, 0, 0)");
    await expect(card.locator(".brick-card-header")).toHaveCSS(
      "gap",
      gap + "px",
    );
    await expect(card.locator(".brick-card-footer")).toHaveCSS(
      "justify-content",
      justify,
    );
  }
});

test("Card part projection and local recipe preserve foreground and structure", async ({
  page,
}) => {
  await page.goto("/card");
  await expect(page.locator("#parts h2.brick-card-title")).toBeVisible();
  await expect(page.locator("#parts section.brick-card-content")).toHaveCount(
    1,
  );
  await expect(page.locator("#parts .brick-card-content")).toHaveCSS(
    "gap",
    "12px",
  );
  const card = page.locator("#customization .brick-card");
  const color = await card.evaluate((n) => getComputedStyle(n).color);
  await expect(card.locator(".brick-card-title")).toHaveCSS("color", color);
  await expect(card.locator(".brick-card-content")).toHaveCSS("color", color);
  await expect(card.locator(".brick-card-title")).toHaveCSS(
    "font-weight",
    "700",
  );
  await card.evaluate((n) => {
    n.setAttribute("data-selected", "");
    (n as HTMLElement).style.setProperty(
      "--brick-card-selected-foreground",
      "rgb(100, 0, 100)",
    );
  });
  await expect(card.locator(".brick-card-title")).toHaveCSS(
    "color",
    "rgb(100, 0, 100)",
  );
});
