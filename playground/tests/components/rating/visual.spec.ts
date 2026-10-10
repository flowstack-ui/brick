import { expect,expectEvidenceScreenshot,installVisualDefaults,setAppearance,test,useForcedColors } from "../../visual-harness.js";
installVisualDefaults("/rating?qualification=1");
test.beforeEach(async ({ page }) => {
  await expect(page.getByTestId('rating-overview')).toBeVisible();
  await page.addStyleTag({content: '.evidence-app-bar { display: none !important; }'});
  await page.locator("[data-playground-app-bar], .evidence-app-bar, .evidence-review-header").evaluateAll(elements => {
    for (const element of elements) (element as HTMLElement).style.display = "none";
  });
});
test("Rating values, recipes, states, artwork, and theme",async({page})=>{for(const id of ["rating-overview","rating-values","rating-recipes","rating-states","rating-input","rating-artwork"])await expectEvidenceScreenshot(page,page.getByTestId(id),`${id.replace("rating-","")}-light.png`);await setAppearance(page,"dark");await expect(page.getByTestId("rating-appearance")).toHaveScreenshot("appearance-dark.png");await expect(page.getByTestId("rating-customization")).toHaveScreenshot("customization-dark.png")});
test("Rating documentation sizes and custom artwork",async({page})=>{
  await page.goto('/rating?appearance=light');
  await expectEvidenceScreenshot(page,page.locator('#sizes'),'docs-sizes-light.png');
  await expectEvidenceScreenshot(page,page.locator('#artwork'),'docs-artwork-light.png');
  await page.goto('/rating?appearance=dark');
  await expectEvidenceScreenshot(page,page.locator('#colors'),'docs-colors-dark.png');
});
test("Rating mobile and forced colors",async({page})=>{await page.setViewportSize({width:390,height:844});await expect(page.getByTestId("rating-stress")).toHaveScreenshot("stress-mobile.png");await page.setViewportSize({width:1120,height:900});await useForcedColors(page);await expect(page.getByTestId("rating-states")).toHaveScreenshot("states-forced-colors.png")});
