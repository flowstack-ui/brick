import { expect, installVisualDefaults, test } from "../../visual-harness.js";
installVisualDefaults("/toolbar");
test("Toolbar overview and recipes",async({page})=>{await page.setViewportSize({width:1120,height:1000});await expect(page.locator("#scenario-toolbar-overview")).toHaveScreenshot("overview-light.png");await expect(page.locator("#scenario-toolbar-variants")).toHaveScreenshot("variants-light.png");});
