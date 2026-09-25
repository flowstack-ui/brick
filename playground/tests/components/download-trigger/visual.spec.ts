import { expectEvidenceScreenshot, installVisualDefaults, setAppearance, test } from "../../visual-harness.js";
installVisualDefaults("/download-trigger?qualification=1");
for(const appearance of ["light","dark"] as const){test("DownloadTrigger "+appearance,async({page})=>{await setAppearance(page,appearance);await expectEvidenceScreenshot(page,page.getByTestId("ready-download"),"download-trigger-"+appearance+".png");});}
test("download action compositions and loading",async({page})=>{
 await page.goto('/download-trigger?appearance=light&testMode=1');
 await expectEvidenceScreenshot(page,page.locator('#icons [data-example-canvas]'),'download-icons-light.png');
 await expectEvidenceScreenshot(page,page.locator('#groups [data-example-canvas]'),'download-group-light.png');
 await page.clock.install({time:new Date('2026-09-15T12:00:00Z')});
 await page.clock.pauseAt(new Date('2026-09-15T12:00:01Z'));
 await page.locator('#loading').getByRole('button',{name:'Prepare export',exact:true}).click();
 await expectEvidenceScreenshot(page,page.locator('#loading [data-example-canvas]'),'download-loading-light.png');
});
