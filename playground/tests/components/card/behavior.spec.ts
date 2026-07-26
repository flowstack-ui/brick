import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator } from "@playwright/test";

async function expectCardDefaults(card: Locator) {
  await expect(card).toHaveAttribute("data-variant", "outline");
  await expect(card).toHaveAttribute("data-size", "md");
  await expect(card).not.toHaveAttribute("role");
  await expect(card).not.toHaveAttribute("tabindex");
}

test("Card exposes its default static anatomy and explicit child actions", async ({
  page,
}) => {
  await page.goto("/card");
  const card = page.getByTestId("card-overview").locator(".brick-card");
  await expectCardDefaults(card);
  await expect(card).toHaveJSProperty("tagName", "DIV");
  await expect(card).toHaveAttribute("data-slot", "card");
  await expect(card.locator("[data-slot='card-header']")).toHaveCount(1);
  await expect(card.locator("[data-slot='card-title']")).toHaveJSProperty(
    "tagName",
    "H3",
  );
  await expect(card.locator("[data-slot='card-title']")).toHaveText(
    "Quarterly report",
  );
  await expect(card.locator("[data-slot='card-description']")).toHaveCount(1);
  await expect(card.locator("[data-slot='card-action']")).toHaveCount(1);
  await expect(card.locator("[data-slot='card-content']")).toHaveCount(1);
  await expect(card.locator("[data-slot='card-footer']")).toHaveCount(1);
  expect(await card.evaluate((element) => element.matches(":focus"))).toBe(
    false,
  );

  const more = card.getByRole("button", { name: "More report options" });
  await more.focus();
  await expect(more).toBeFocused();
  await expect(more).toHaveCSS("outline-style", "solid");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test("Card variants change only surface prominence", async ({ page }) => {
  await page.goto("/card");
  const variants = page.getByTestId("card-variants");
  await expect(variants.locator(".brick-card")).toHaveCount(3);

  for (const variant of ["outline", "elevated", "subtle"] as const) {
    const card = variants.locator(
      `.brick-card[data-variant="${variant}"]`,
    );
    await expect(card).toHaveCount(1);
    await expect(card).toHaveAttribute("data-size", "md");
    await expect(card.getByText("Project summary", { exact: true })).toBeVisible();
    await expect(
      card.getByText(
        "The same subject and anatomy make the selected Card recipe easier to compare.",
        { exact: true },
      ),
    ).toBeVisible();
  }

  const outline = variants.locator(
    '.brick-card[data-variant="outline"]',
  );
  const elevated = variants.locator(
    '.brick-card[data-variant="elevated"]',
  );
  const subtle = variants.locator('.brick-card[data-variant="subtle"]');
  await expect(outline).toHaveCSS("box-shadow", "none");
  expect(
    await elevated.evaluate((element) => getComputedStyle(element).boxShadow),
  ).not.toBe("none");
  await expect(subtle).toHaveCSS("box-shadow", "none");
  expect(
    await outline.evaluate(
      (element) => getComputedStyle(element).backgroundColor,
    ),
  ).not.toBe(
    await subtle.evaluate(
      (element) => getComputedStyle(element).backgroundColor,
    ),
  );
});

test("Card sizes change only coordinated spacing and title scale", async ({
  page,
}) => {
  await page.goto("/card");
  const sizes = page.getByTestId("card-sizes");
  await expect(sizes.locator(".brick-card")).toHaveCount(3);
  const measurements: Array<{ space: number; title: number }> = [];

  for (const size of ["sm", "md", "lg"] as const) {
    const card = sizes.locator(`.brick-card[data-size="${size}"]`);
    await expect(card).toHaveCount(1);
    await expect(card).toHaveAttribute("data-variant", "outline");
    await expect(card.getByText("Project summary", { exact: true })).toBeVisible();
    measurements.push(
      await card.evaluate((element) => {
        const rootStyle = getComputedStyle(element);
        const title = element.querySelector(".brick-card-title")!;
        return {
          space: Number.parseFloat(
            rootStyle.getPropertyValue("--brick-card-space"),
          ),
          title: Number.parseFloat(getComputedStyle(title).fontSize),
        };
      }),
    );
  }

  expect(measurements[0].space).toBeLessThan(measurements[1].space);
  expect(measurements[1].space).toBeLessThan(measurements[2].space);
  expect(measurements[0].title).toBeLessThan(measurements[1].title);
  expect(measurements[1].title).toBeLessThan(measurements[2].title);
});

test("Card renders only the anatomy authored by the consumer", async ({
  page,
}) => {
  await page.goto("/card");
  const anatomy = [
    {
      absent: ["card-header", "card-footer"],
      present: ["card-content"],
      testId: "card-anatomy-content",
    },
    {
      absent: ["card-content", "card-footer"],
      present: ["card-header", "card-title", "card-description"],
      testId: "card-anatomy-header",
    },
    {
      absent: ["card-header", "card-content"],
      present: ["card-footer"],
      testId: "card-anatomy-footer",
    },
    {
      absent: ["card-content", "card-footer"],
      present: ["card-header", "card-title", "card-description", "card-action"],
      testId: "card-anatomy-action",
    },
  ];

  for (const specimen of anatomy) {
    const card = page.getByTestId(specimen.testId);
    await expectCardDefaults(card);
    for (const slot of specimen.present) {
      await expect(card.locator(`[data-slot="${slot}"]`)).toHaveCount(1);
    }
    for (const slot of specimen.absent) {
      await expect(card.locator(`[data-slot="${slot}"]`)).toHaveCount(0);
    }
  }
});

test("Card exposes every restricted Root and Title element", async ({ page }) => {
  await page.goto("/card");

  for (const element of ["div", "article", "section", "li"] as const) {
    const card = page.getByTestId(`card-root-${element}`);
    await expect(card).toHaveJSProperty("tagName", element.toUpperCase());
    await expectCardDefaults(card);
  }

  for (const element of ["h1", "h2", "h3", "h4", "h5", "h6"] as const) {
    const title = page.getByTestId(`card-title-${element}`);
    await expect(title).toHaveJSProperty("tagName", element.toUpperCase());
    await expect(title).toHaveText("Project summary");
    await expect(title.locator("..").locator("..")).toHaveAttribute(
      "data-variant",
      "outline",
    );
    await expect(title.locator("..").locator("..")).toHaveAttribute(
      "data-size",
      "md",
    );
  }
});

test("Card composes Brick Image, explicit controls, and an application link", async ({
  page,
}) => {
  await page.goto("/card");
  const imageCard = page.getByTestId("card-composition-image");
  const controlsCard = page.getByTestId("card-composition-controls");
  await expectCardDefaults(imageCard);
  await expectCardDefaults(controlsCard);
  const image = imageCard.getByRole("img", {
    name: "Three colorful Brick blocks",
  });
  await expect(image).toHaveAttribute(
    "src",
    "/assets/icon-button/brick-image.png",
  );
  const imageRoot = image.locator("xpath=..");
  await expect(imageRoot).toHaveClass(/brick-image/);
  await expect(imageRoot).toHaveAttribute("data-fit", "contain");
  await expect(imageRoot).toHaveAttribute("data-frame", "subtle");
  await expect(imageRoot).toHaveAttribute("data-ratio", "");

  const options = controlsCard.getByRole("button", {
    name: "Workspace options",
  });
  const open = controlsCard.getByRole("button", { name: "Open workspace" });
  await expect(options).toBeVisible();
  await expect(open).toBeVisible();
  await expect(controlsCard).not.toHaveAttribute("tabindex");

  const link = page.getByRole("link", { name: "Single-action preview" });
  await expect(link).toHaveAttribute(
    "aria-labelledby",
    "card-single-action-title",
  );
  await expectCardDefaults(link.locator(".brick-card"));
  await link.focus();
  await expect(link).toBeFocused();
  await expect(link).toHaveCSS("outline-style", "solid");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#card-single-action$/);
});

test("Card supports scoped appearance and exact customization hooks", async ({
  page,
}) => {
  await page.goto("/card");
  const scopes = page.getByTestId("card-appearance");
  const light = scopes.locator(
    '[data-brick-appearance="light"] .brick-card',
  );
  const dark = scopes.locator(
    '[data-brick-appearance="dark"] .brick-card',
  );
  await expectCardDefaults(light);
  await expectCardDefaults(dark);
  expect(
    await light.evaluate((element) => getComputedStyle(element).backgroundColor),
  ).not.toBe(
    await dark.evaluate((element) => getComputedStyle(element).backgroundColor),
  );

  const token = page.getByTestId("card-token-customization");
  await expect(token).toHaveAttribute("data-variant", "elevated");
  await expect(token).toHaveAttribute("data-size", "md");
  await expect(token).toHaveCSS("--brick-card-radius", "0.25rem");
  await expect(token).toHaveCSS("--brick-card-space", "2rem");
  await expect(token).toHaveCSS(
    "--brick-card-shadow",
    "0 1rem 3rem rgb(53 46 91 / 25%)",
  );
  await expect(token).toHaveCSS("border-radius", "4px");

  const hook = page.locator('.brick-card[data-slot="custom-card"]');
  await expect(hook).toHaveClass(/dashed-card/);
  await expect(hook).toHaveCSS("border-style", "dashed");
  await expect(hook).toHaveCSS("border-width", "2px");
  await expect(hook.locator('[data-slot="custom-card-header"]')).toHaveCount(1);

  const tokenCode = page
    .getByRole("heading", { name: "Component CSS properties" })
    .locator("..")
    .locator("code");
  await expect(tokenCode).toContainText("--brick-card-radius");
  await expect(tokenCode).toContainText("--brick-card-shadow");
  await expect(tokenCode).toContainText("--brick-card-space");
});

test("Card remains contained and logical in constrained and RTL content", async ({
  page,
}) => {
  await page.setViewportSize({ width: 256, height: 900 });
  await page.goto("/card");
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth <=
        document.documentElement.clientWidth,
    ),
  ).toBe(true);

  const constrained = page.getByTestId("card-stress-constrained");
  const rtl = page.getByTestId("card-stress-rtl");
  await expectCardDefaults(constrained);
  await expectCardDefaults(rtl);

  for (const card of [constrained, rtl]) {
    const cardBox = await card.boundingBox();
    const frameBox = await card.locator("..").boundingBox();
    expect(cardBox).not.toBeNull();
    expect(frameBox).not.toBeNull();
    expect(cardBox!.x).toBeGreaterThanOrEqual(frameBox!.x);
    expect(cardBox!.x + cardBox!.width).toBeLessThanOrEqual(
      frameBox!.x + frameBox!.width,
    );
  }

  const rtlTitle = rtl.locator("[data-slot='card-title']");
  const rtlAction = rtl.locator("[data-slot='card-action']");
  const [titleBox, actionBox] = await Promise.all([
    rtlTitle.boundingBox(),
    rtlAction.boundingBox(),
  ]);
  expect(titleBox).not.toBeNull();
  expect(actionBox).not.toBeNull();
  expect(actionBox!.x).toBeLessThan(titleBox!.x);
  await expect(rtl).toHaveCSS("direction", "rtl");
});

test("Card preserves visible boundaries without adding motion", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "chromium",
    "Forced colors is a Chromium release check.",
  );
  await page.goto("/card");
  const elevated = page
    .getByTestId("card-variants")
    .locator('.brick-card[data-variant="elevated"]');
  await expect(elevated).toHaveCSS("transition-property", "all");
  await expect(elevated).toHaveCSS("transition-duration", "0s");
  await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  for (const variant of ["outline", "elevated", "subtle"] as const) {
    const card = page
      .getByTestId("card-variants")
      .locator(`.brick-card[data-variant="${variant}"]`);
    expect(
      await card.evaluate((element) =>
        Number.parseFloat(getComputedStyle(element).borderWidth),
      ),
    ).toBeGreaterThanOrEqual(1);
    await expect(card).toHaveCSS("box-shadow", "none");
  }
});
