import { expectEvidenceScreenshot, installVisualDefaults, setAppearance, test } from "../../visual-harness.js";
installVisualDefaults("/download-trigger");
for(const appearance of ["light","dark"] as const){test("DownloadTrigger "+appearance,async({page})=>{await setAppearance(page,appearance);await expectEvidenceScreenshot(page,page.getByTestId("ready-download"),"download-trigger-"+appearance+".png");});}
