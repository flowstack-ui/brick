import { expectEvidenceScreenshot, installVisualDefaults, test } from "../../visual-harness.js";
installVisualDefaults("/float");
test("Float docs geometry and composition", async ({page})=>{
 await expectEvidenceScreenshot(page,page.locator("#placement [data-example-canvas]"),"placements-light.png");
 await expectEvidenceScreenshot(page,page.locator("#avatar [data-example-canvas]"),"avatar-light.png");
 await page.evaluate(()=>document.documentElement.dataset.brickAppearance="dark");
 await expectEvidenceScreenshot(page,page.locator("#composition [data-example-canvas]"),"composition-dark.png");
});
