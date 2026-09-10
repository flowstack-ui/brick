import { expectEvidenceScreenshot, installVisualDefaults, setAppearance, test } from "../../visual-harness.js";
installVisualDefaults("/close-button");
for(const appearance of ["light","dark"] as const){test("CloseButton "+appearance,async({page})=>{await setAppearance(page,appearance);await expectEvidenceScreenshot(page,page.getByTestId("close-sizes"),"close-button-"+appearance+".png");});}
