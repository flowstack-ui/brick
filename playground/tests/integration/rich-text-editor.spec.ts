import { expect, test } from "@playwright/test";

test("compiled editor route keeps private source out and preserves edits during theme changes", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(
    "/rich-text-editor?appearance=light&exampleDirection=ltr&theme=brick&font=inter&testMode=1",
  );
  await expect(
    page.getByRole("heading", { name: "Rich Text Editor", exact: true }),
  ).toBeVisible();
  const preview = page.frameLocator('iframe[title="Basic editor"]');
  const editor = preview.getByRole("textbox");
  await editor.fill("Preserve this draft");
  await page.evaluate(() => {
    const url = new URL(location.href);
    url.searchParams.set("appearance", "dark");
    url.searchParams.set("exampleDirection", "rtl");
    history.replaceState(null, "", url);
    dispatchEvent(new PopStateEvent("popstate"));
  });
  await expect(preview.locator("html")).toHaveAttribute(
    "data-brick-appearance",
    "dark",
  );
  await expect(preview.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(editor).toHaveText("Preserve this draft");
  await expect(
    page.getByRole("heading", { name: "Getting Started", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Executable source and Code previews", { exact: false }),
  ).toBeVisible();
  await expect(page.getByRole("tab", { name: "Code", exact: true })).toHaveCount(0);
  const iframe = page.locator('iframe[title="Basic editor"]');
  const height = await iframe.evaluate(
    (element) => element.getBoundingClientRect().height,
  );
  expect(height).toBeLessThan(450);
  const controls = preview.getByRole("group", {
    name: "Text formatting",
    exact: true,
  });
  const sizes = await controls
    .locator("button")
    .evaluateAll((buttons) =>
      buttons.map((button) => button.getBoundingClientRect().height),
    );
  expect(sizes.length).toBeGreaterThan(0);
  expect(sizes.every((size) => Math.abs(size - 24) < 1)).toBe(true);
  expect(errors).toEqual([]);
  await page.screenshot({ path: testInfo.outputPath("rich-text-editor.png") });
});

test("compiled editor overlays remain contained and usable at desktop and mobile widths", async ({
  page,
}) => {
  await page.goto("/rich-text-editor?appearance=dark&font=inter");
  const preview = page.frameLocator('iframe[title="Formatting editor"]');
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    // WebKit correctly defers an offscreen lazy iframe: reveal its host before
    // waiting for controls inside the embedded document.
    await page.locator('iframe[title="Formatting editor"]').scrollIntoViewIfNeeded();
    await preview
      .getByRole("combobox", { name: "Font family", exact: true })
      .click();
    await expect(
      preview.getByRole("option", { name: "Monospace", exact: true }),
    ).toBeVisible();
    await preview
      .getByRole("option", { name: "Monospace", exact: true })
      .click();
    await preview
      .getByRole("button", { name: "Text color", exact: true })
      .click();
    const palette = preview.getByRole("dialog", {
      name: "Text color",
      exact: true,
    });
    await expect(palette).toBeVisible();
    await expect(
      preview.getByRole("button", { name: "Purple", exact: true }),
    ).toHaveAttribute("aria-pressed", "false");
    const paletteBounds = await palette.evaluate((element) => {
      const box = element.getBoundingClientRect();
      const view = element.ownerDocument.defaultView!;
      return {
        left: box.left,
        right: box.right,
        top: box.top,
        bottom: box.bottom,
        width: box.width,
        viewportWidth: view.innerWidth,
        viewportHeight: view.innerHeight,
      };
    });
    expect(paletteBounds.width).toBeLessThan(220);
    expect(paletteBounds.left).toBeGreaterThanOrEqual(0);
    expect(paletteBounds.right).toBeLessThanOrEqual(
      paletteBounds.viewportWidth,
    );
    expect(paletteBounds.top).toBeGreaterThanOrEqual(0);
    expect(paletteBounds.bottom).toBeLessThanOrEqual(
      paletteBounds.viewportHeight,
    );
    await preview
      .getByRole("button", { name: "Reset text color", exact: true })
      .click();
    await preview
      .getByRole("button", { name: "Edit link", exact: true })
      .click();
    const apply = preview.getByRole("button", {
      name: "Apply link",
      exact: true,
    });
    await expect(apply).toBeVisible();
    const hit = await apply.evaluate((element) => {
      const box = element.getBoundingClientRect();
      const target = element.ownerDocument.elementFromPoint(
        box.x + box.width / 2,
        box.y + box.height / 2,
      );
      return element === target || element.contains(target);
    });
    expect(hit).toBe(true);
    await preview.getByRole("button", { name: "Cancel", exact: true }).click();
  }
});
