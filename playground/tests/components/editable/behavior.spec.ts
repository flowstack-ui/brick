import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";
test.beforeEach(async ({ page }) => {
  page.on("pageerror", (error) => {
    throw error;
  });
  await page.goto("/editable");
  await expect(page.locator('[data-component-page="editable"]')).toBeVisible();
});
test("Editable commits once, restores empty drafts and respects activation", async ({
  page,
}) => {
  const basic = page.locator("#scenario-editable-basic");
  await basic.locator(".brick-editable-preview").focus();
  await basic.getByRole("textbox").fill("Renamed document");
  await basic.getByRole("textbox").press("Enter");
  await expect(basic.getByRole("status")).toHaveText(
    "Committed: Renamed document",
  );
  await expect(basic.getByRole("textbox")).toHaveCount(0);
  const empty = page
    .locator(".brick-editable")
    .filter({ has: page.locator("label", { hasText: /^Empty title$/ }) });
  await empty.locator(".brick-editable-preview").click();
  await empty.getByRole("textbox").fill("Temporary");
  await empty.getByRole("textbox").press("Escape");
  await expect(empty.locator(".brick-editable-preview")).toHaveText("Untitled");
  const double = page
    .locator(".brick-editable")
    .filter({
      has: page.locator("label", { hasText: /^dblclick activation$/ }),
    });
  await double.locator(".brick-editable-preview").click();
  await expect(double.getByRole("textbox")).toHaveCount(0);
  await double.locator(".brick-editable-preview").dblclick();
  await expect(double.getByRole("textbox")).toBeFocused();
});
test("Editable form reset, rejection and multiline editing", async ({
  page,
}) => {
  const form = page.locator("#editable-form");
  await form.locator(".brick-editable-preview").click();
  await form.getByRole("textbox").fill("Changed title");
  await form.getByRole("button", { name: "Save", exact: true }).click();
  await form.getByRole("button", { name: "Submit form" }).click();
  await expect(form.getByRole("status")).toHaveText("Submitted: Changed title");
  await form.getByRole("button", { name: "Reset form" }).click();
  await expect(form.locator(".brick-editable-preview")).toHaveText(
    "Original title",
  );
  const rejected = page.locator("#scenario-editable-rejection");
  await rejected.locator(".brick-editable-preview").click();
  await rejected.getByRole("textbox").fill("ab");
  await rejected.getByRole("textbox").press("Enter");
  await expect(rejected.getByRole("textbox")).toBeVisible();
  await expect(rejected.getByRole("status")).toContainText("four characters");
  const multi = page.getByRole("textbox", {
    name: "Growing description",
    exact: true,
  });
  await page
    .getByText("A short project description.", { exact: false })
    .first()
    .click();
  await multi.fill("First");
  await multi.press("End");
  await multi.press("Enter");
  await multi.pressSequentially("Second");
  await expect(multi).toHaveValue("First\nSecond");
  await multi.press("Control+Enter");
  await expect(multi).toHaveCount(0);
});
test("Editable preview and input geometry match at each size", async ({
  page,
}) => {
  const growing = page
    .locator(".brick-editable")
    .filter({ has: page.locator("label", { hasText: /^Growing title$/ }) });
  const area = growing.locator(".brick-editable-area");
  const initialWidth = (await area.boundingBox())!.width;
  await growing.locator(".brick-editable-preview").click();
  await growing
    .getByRole("textbox")
    .fill("A substantially longer auto-sized document title");
  expect((await area.boundingBox())!.width).toBeGreaterThan(initialWidth);
  await growing.getByRole("textbox").press("Escape");
  for (const size of ["sm", "md", "lg"]) {
    const root = page.getByTestId(`light-${size}`),
      preview = root.locator(".brick-editable-preview");
    await preview.scrollIntoViewIfNeeded();
    const before = await preview.evaluate((node) => ({
      height: node.getBoundingClientRect().height,
      y:
        node.getBoundingClientRect().y -
        node.parentElement!.getBoundingClientRect().y,
    }));
    await preview.click();
    const after = await root
      .getByRole("textbox")
      .evaluate((node) => ({
        height: node.getBoundingClientRect().height,
        y:
          node.getBoundingClientRect().y -
          node.parentElement!.getBoundingClientRect().y,
      }));
    expect(Math.abs(before!.height - after!.height), size).toBeLessThanOrEqual(
      1,
    );
    expect(Math.abs(before!.y - after!.y), size).toBeLessThanOrEqual(1);
    await root.getByRole("textbox").press("Escape");
  }
  await page.setViewportSize({ width: 390, height: 900 });
  for (const root of await page.locator(".brick-editable").all()) {
    expect(
      await root.evaluate((node) => node.scrollWidth <= node.clientWidth + 1),
    ).toBe(true);
  }
});
test("Editable nested Escape, focus and accessible states", async ({
  page,
}) => {
  // End the intentionally initially-open example before opening another focus scope.
  await page.getByRole("button", { name: "Open rename dialog" }).click();
  const dialog = page.getByRole("dialog");
  // Dialog initial focus lands on the preview, whose default activation is focus.
  await expect(dialog.getByRole("textbox")).toBeVisible();
  await dialog.getByRole("textbox").fill("Dialog draft");
  await dialog.getByRole("textbox").press("Escape");
  await expect(dialog).toBeVisible();
  await expect(dialog.locator(".brick-editable-preview")).toHaveText(
    "Project notes",
  );
  await page.getByRole("button", { name: "Close rename dialog" }).click();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.emulateMedia({ forcedColors: "active" });
  const preview = page.locator(
    "#scenario-editable-basic .brick-editable-preview",
  );
  await preview.focus();
  expect(
    await page
      .locator("#scenario-editable-basic input")
      .evaluate((node) => getComputedStyle(node).outlineStyle),
  ).toBe("solid");
});
