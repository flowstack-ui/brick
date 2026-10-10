import { test, expect } from "@playwright/test";

test("new documentation visual specimens", async ({ page, browserName }, testInfo) => {
  test.skip(browserName !== "chromium", "Visual inspection is captured in Chromium.");
  await page.setViewportSize({width:1440,height:1000});
  for (const appearance of ["light","dark"]) {
    await page.goto(`/button?appearance=${appearance}`);
    for (const id of ["variants","spinnerplacement","customspinner","groups","attached"]) {
      const canvas=page.locator(`#${id} [data-example-canvas]`);
      await canvas.scrollIntoViewIfNeeded();
      await canvas.screenshot({path:testInfo.outputPath(`${id}-${appearance}.png`),animations:"disabled"});
    }
  }
});

for (const appearance of ["light", "dark"]) {
  test(`new recipes and loading remain contained in ${appearance} RTL`, async ({page}) => {
    await page.goto(`/button?appearance=${appearance}&exampleDirection=rtl`);
    await page.setViewportSize({width:390,height:844});
    for (const id of ["variants","spinnerplacement","customspinner","attached"]) {
      const canvas=page.locator(`#${id} [data-example-canvas]`);
      await canvas.scrollIntoViewIfNeeded();
      expect(await canvas.evaluate(e=>e.scrollWidth-e.clientWidth)).toBeLessThanOrEqual(1);
    }
    const end=page.locator("#spinnerplacement .brick-button").last();
    await expect(end).toHaveAttribute("aria-busy","true");
    const visible=await end.locator(".brick-button__spinner").boundingBox();
    expect(visible?.width).toBeGreaterThan(0);
  });
}

test("documentation recipes preserve geometry and distinguish borders", async ({page}) => {
  await page.goto("/button");
  const scope = page.locator("#variants");
  const subtle = scope.getByRole("button",{name:"subtle",exact:true});
  const soft = scope.getByRole("button",{name:"soft",exact:true});
  const surface = scope.getByRole("button",{name:"surface",exact:true});
  await expect(subtle).toBeVisible();
  expect(await subtle.evaluate(e=>getComputedStyle(e).borderTopColor)).toBe("rgba(0, 0, 0, 0)");
  expect(await soft.evaluate(e=>getComputedStyle(e).borderTopColor)).not.toBe("rgba(0, 0, 0, 0)");
  expect(await surface.evaluate(e=>getComputedStyle(e).boxShadow)).toContain("inset");
  const plain = scope.getByRole("button",{name:"plain",exact:true});
  await plain.hover();
  expect(await plain.evaluate(e=>getComputedStyle(e).backgroundColor)).toBe("rgba(0, 0, 0, 0)");
});

test("custom loading overlays are centered and use one indicator", async ({page}) => {
  await page.goto("/button");
  const button = page.locator(".brick-button[data-custom-loading]").filter({has:page.locator(".brick-button__loading-overlay")}).first();
  await button.scrollIntoViewIfNeeded();
  const center = await button.evaluate(e=>{
    const b=e.getBoundingClientRect(), s=e.querySelector(".brick-button__spinner")!.getBoundingClientRect();
    return {x:Math.abs(b.x+b.width/2-s.x-s.width/2),y:Math.abs(b.y+b.height/2-s.y-s.height/2),pseudo:getComputedStyle(e,"::after").content};
  });
  expect(center.x).toBeLessThan(1);
  expect(center.y).toBeLessThan(1);
  expect(center.pseudo).toBe("none");
});

test("group defaults reach icon buttons and split menu remains operable", async ({page}) => {
  await page.goto("/button");
  const add=page.getByRole("button",{name:"Add",exact:true});
  await expect(add).toHaveAttribute("data-size","sm");
  await expect(add).toHaveAttribute("data-variant","outline");
  await page.getByRole("button",{name:"More save options"}).click();
  await expect(page.getByRole("menuitem",{name:"Save as draft"})).toBeVisible();
  await page.keyboard.press("Escape");
});

test("props have visible part headings and TOC entries", async ({page})=>{
  await page.goto("/button");
  await expect(page.locator("#props-button-heading")).toHaveText("Button");
  await expect(page.locator("#props-button-group-heading")).toHaveText("ButtonGroup");
});
