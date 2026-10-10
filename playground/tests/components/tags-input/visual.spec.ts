import { test } from "../../evidence-test.js";
import { expectEvidenceScreenshot } from "../../visual-harness.js";
test("TagsInput all scenario visual evidence", async ({ page }, testInfo) => {
  test.skip(
    testInfo.project.name !== "chromium",
    "Visual baselines use Chromium",
  );
  await page.goto("/tags-input?qualification=1");
  for (const id of [
    "basic",
    "controlled",
    "editing",
    "paste",
    "validation",
    "limits",
    "states",
    "tones",
    "forms",
    "suggestions",
    "recipes",
    "translations",
  ])
    await expectEvidenceScreenshot(
      page,
      page.locator("#scenario-tags-input-" + id),
      "tags-input-" + id + ".png",
      { maxDiffPixelRatio: 0 },
    );
  const editable = page.locator(".brick-tags-input").filter({ has: page.locator("label", { hasText: /^Editable topics$/ }) });
  await editable.getByText("React", { exact: true }).dblclick();
  await expectEvidenceScreenshot(page, editable, "tags-input-editing-active.png", { maxDiffPixelRatio: 0 });
  await editable.getByRole("textbox", { name: "Edit React" }).press("Escape");
  await page.getByRole("button", { name: "Open skills dialog" }).click();
  await page.getByRole("dialog").getByRole("combobox").fill("Re");
  await page.getByRole("option", { name: "React", exact: true }).waitFor({ state: "visible" });
  await expectEvidenceScreenshot(page, page.locator(".brick-combobox-content"), "tags-input-popup.png", { maxDiffPixelRatio: 0 });
  await expectEvidenceScreenshot(page, page.getByRole("dialog"), "tags-input-dialog.png", { maxDiffPixelRatio: 0 });
});
