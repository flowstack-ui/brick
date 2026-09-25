import { expect, test } from '../../evidence-test.js';
for(const appearance of ['light','dark'] as const){
 test(`Image documentation ${appearance}`,async({page})=>{
  await page.goto('/image?testMode=1');
  await page.evaluate(value=>document.documentElement.dataset.brickAppearance=value,appearance);
  await page.locator('[data-component-page="image"] img').first().waitFor();
  await page.evaluate(async()=>{await document.fonts.ready;for(const img of document.images)img.loading='eager';});
  await expect(page.locator('#responsive-sources .brick-image')).toHaveAttribute('data-state','loaded');
  await expect(page.locator('[data-component-page="image"]')).toHaveScreenshot(`image-docs-${appearance}.png`);
 });
}
test('Image documentation narrow crops',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/image');
 await page.evaluate(()=>{for(const img of document.images)img.loading='eager';});
 await page.addStyleTag({content:".evidence-app-bar { visibility: hidden !important; }"});
 for(const id of ['circular','position','picture']){
  await expect(page.locator(`#${id} .brick-image`)).toHaveAttribute('data-state','loaded');
  await expect(page.locator(`#${id}`)).toHaveScreenshot(`image-${id}-narrow.png`);
 }
});
