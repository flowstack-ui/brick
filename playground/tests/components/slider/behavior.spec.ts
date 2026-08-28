import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
test.beforeEach(async({page})=>{await page.goto("/slider")});
test("defaults, recipes, ranges, Field states, and form output are complete",async({page})=>{const thumb=page.getByTestId("slider-overview").getByRole("slider",{name:"Volume"});await expect(thumb).toHaveAttribute("aria-valuenow","40");await expect(thumb.locator(".brick-slider__value-label")).toHaveCount(0);for(const size of ["sm","md","lg"])expect(await page.getByTestId("slider-recipes").locator(`.brick-slider[data-size='${size}']`).count()).toBeGreaterThan(0);await expect(page.getByTestId("slider-values").getByRole("slider")).toHaveCount(3);await expect(page.getByTestId("slider-states").locator(".brick-slider[data-invalid]")).toHaveCount(1)});
test("keyboard, RTL, effective range bounds, and reset behavior work",async({page})=>{const slider=page.getByTestId("slider-overview").getByRole("slider");await slider.focus();await slider.press("ArrowRight");await expect(slider).toHaveAttribute("aria-valuenow","41");const range=page.getByTestId("slider-values").getByRole("slider",{name:"Price range 1"});await expect(range).toHaveAttribute("aria-valuemax","75");const rtl=page.getByTestId("slider-stress").getByRole("slider",{name:"نطاق السعر 1"});await rtl.focus();await rtl.press("ArrowLeft");await expect(rtl).toHaveAttribute("aria-valuenow","21")});
test("track clicks and thumb drags commit without reverting in every geometry",async({page})=>{
  const overview=page.getByTestId("slider-overview");
  const horizontal=overview.getByRole("slider",{name:"Volume"});
  const horizontalTrack=overview.locator(".brick-slider__track");
  const horizontalBox=await horizontalTrack.boundingBox();
  await page.mouse.click(horizontalBox!.x+horizontalBox!.width*0.8,horizontalBox!.y+horizontalBox!.height/2);
  await expect(horizontal).toHaveAttribute("aria-valuenow","80");
  await page.waitForTimeout(100);
  await expect(horizontal).toHaveAttribute("aria-valuenow","80");
  const horizontalThumbBox=await horizontal.boundingBox();
  await page.mouse.move(horizontalThumbBox!.x+horizontalThumbBox!.width/2,horizontalThumbBox!.y+horizontalThumbBox!.height/2);
  await page.mouse.down();
  await page.mouse.move(horizontalBox!.x+horizontalBox!.width*0.25,horizontalBox!.y+horizontalBox!.height/2,{steps:5});
  await page.mouse.up();
  await expect(horizontal).toHaveAttribute("aria-valuenow","25");

  const direction=page.getByTestId("slider-direction");
  const vertical=direction.getByRole("slider",{name:"Volume"}).last();
  const verticalTrack=direction.locator(".brick-slider[data-orientation='vertical'] .brick-slider__track");
  await verticalTrack.evaluate(element=>element.scrollIntoView({block:"center"}));
  const verticalBox=await verticalTrack.boundingBox();
  await verticalTrack.click({position:{x:verticalBox!.width/2,y:verticalBox!.height*0.2}});
  await expect.poll(async()=>Number(await vertical.getAttribute("aria-valuenow"))).toBeGreaterThanOrEqual(79);
  expect(Number(await vertical.getAttribute("aria-valuenow"))).toBeLessThanOrEqual(81);
  const verticalDragBox=await verticalTrack.boundingBox();
  const verticalThumbBox=await vertical.boundingBox();
  await page.mouse.move(verticalThumbBox!.x+verticalThumbBox!.width/2,verticalThumbBox!.y+verticalThumbBox!.height/2);
  await page.mouse.down();
  await page.mouse.move(verticalDragBox!.x+verticalDragBox!.width/2,verticalDragBox!.y+verticalDragBox!.height*0.7,{steps:5});
  await page.mouse.up();
  await expect.poll(async()=>Number(await vertical.getAttribute("aria-valuenow"))).toBeGreaterThanOrEqual(29);
  expect(Number(await vertical.getAttribute("aria-valuenow"))).toBeLessThanOrEqual(31);

  const rtlRoot=page.getByTestId("slider-stress").locator(".brick-slider[dir='rtl']");
  const rtlTrack=rtlRoot.locator(".brick-slider__track");
  const rtlThumb=rtlRoot.getByRole("slider").last();
  await rtlTrack.evaluate(element=>element.scrollIntoView({block:"center"}));
  const rtlBox=await rtlTrack.boundingBox();
  await page.mouse.click(rtlBox!.x+rtlBox!.width*0.1,rtlBox!.y+rtlBox!.height/2);
  await expect(rtlThumb).toHaveAttribute("aria-valuenow","90");
  expect((await rtlRoot.locator(".brick-slider__range").boundingBox())!.width).toBeGreaterThan(0);
});
test("losing pointer capture finalizes the dragged value instead of restoring its start",async({page})=>{
  const overview=page.getByTestId("slider-overview");
  const thumb=overview.getByRole("slider",{name:"Volume"});
  const track=overview.locator(".brick-slider__track");
  const trackBox=await track.boundingBox();
  const thumbBox=await thumb.boundingBox();
  await page.mouse.move(thumbBox!.x+thumbBox!.width/2,thumbBox!.y+thumbBox!.height/2);
  await page.mouse.down();
  await page.mouse.move(trackBox!.x+trackBox!.width*0.7,trackBox!.y+trackBox!.height/2,{steps:5});
  await expect(thumb).toHaveAttribute("aria-valuenow","70");
  await thumb.dispatchEvent("lostpointercapture",{pointerId:1,pointerType:"mouse",isPrimary:true});
  await page.mouse.up();
  await expect(thumb).toHaveAttribute("aria-valuenow","70");
  await page.waitForTimeout(100);
  await expect(thumb).toHaveAttribute("aria-valuenow","70");
});
test("native touch taps remain committed",async({page},testInfo)=>{
  test.skip(!testInfo.project.name.startsWith("mobile-"),"requires a touch-enabled project");
  const overview=page.getByTestId("slider-overview");
  const thumb=overview.getByRole("slider",{name:"Volume"});
  const track=overview.locator(".brick-slider__track");
  const box=await track.boundingBox();
  for(const percent of [0.2,0.8,0.35,0.65]){
    await page.touchscreen.tap(box!.x+box!.width*percent,box!.y+box!.height/2);
    await expect(thumb).toHaveAttribute("aria-valuenow",String(Math.round(percent*100)));
    await page.waitForTimeout(100);
    await expect(thumb).toHaveAttribute("aria-valuenow",String(Math.round(percent*100)));
  }
});
test("native horizontal touch drags remain committed",async({page},testInfo)=>{
  test.skip(testInfo.project.name!=="mobile-chromium","requires Chromium touch input");
  const overview=page.getByTestId("slider-overview");
  const thumb=overview.getByRole("slider",{name:"Volume"});
  const track=overview.locator(".brick-slider__track");
  const box=await track.boundingBox();
  const startX=box!.x+box!.width*0.4;
  const endX=box!.x+box!.width*0.7;
  const y=box!.y+box!.height/2;
  const session=await page.context().newCDPSession(page);
  await session.send("Input.dispatchTouchEvent",{type:"touchStart",touchPoints:[{x:startX,y,id:1,radiusX:4,radiusY:4,force:1}]});
  for(let index=1;index<=6;index++){
    const x=startX+(endX-startX)*(index/6);
    await session.send("Input.dispatchTouchEvent",{type:"touchMove",touchPoints:[{x,y,id:1,radiusX:4,radiusY:4,force:1}]});
  }
  await session.send("Input.dispatchTouchEvent",{type:"touchEnd",touchPoints:[]});
  await expect(thumb).toHaveAttribute("aria-valuenow","70");
  await page.waitForTimeout(150);
  await expect(thumb).toHaveAttribute("aria-valuenow","70");
});
test("markers stay contained and their track positions remain selectable",async({page})=>{
  const root=page.getByTestId("slider-content").locator(".brick-slider").first();
  await root.evaluate(element=>element.scrollIntoView({block:"center"}));
  const rootBox=await root.boundingBox();
  const markers=root.locator(".brick-slider__marker");
  await expect(markers).toHaveCount(5);
  for(const marker of await markers.all()){
    const markerBox=await marker.boundingBox();
    expect(markerBox!.x).toBeGreaterThanOrEqual(rootBox!.x-1);
    expect(markerBox!.x+markerBox!.width).toBeLessThanOrEqual(rootBox!.x+rootBox!.width+1);
  }
  const track=root.locator(".brick-slider__track");
  const trackBox=await track.boundingBox();
  const [startBox,endBox]=await Promise.all([
    markers.first().boundingBox(),
    markers.last().boundingBox(),
  ]);
  expect(startBox!.width).toBeGreaterThan(0);
  expect(endBox!.width).toBeGreaterThan(0);
  expect(startBox!.x+startBox!.width/2).toBeGreaterThan(trackBox!.x);
  expect(endBox!.x+endBox!.width/2).toBeLessThan(trackBox!.x+trackBox!.width);
  await expect(markers.first()).toHaveAttribute("data-selected", "");
  await expect(markers.last()).not.toHaveAttribute("data-selected");
  const [selectedPaint,unselectedPaint]=await Promise.all([
    markers.first().evaluate(element=>getComputedStyle(element,"::before").backgroundColor),
    markers.last().evaluate(element=>getComputedStyle(element,"::before").backgroundColor),
  ]);
  expect(selectedPaint).not.toBe(unselectedPaint);
  const trackCenter=trackBox!.y+trackBox!.height/2;
  for(const marker of await markers.all()){
    const dotCenter=await marker.evaluate(element=>{
      const markerBox=element.getBoundingClientRect();
      const dot=getComputedStyle(element,"::before");
      return markerBox.y + Number.parseFloat(dot.top);
    });
    expect(dotCenter).toBeCloseTo(trackCenter,0);
  }
  await page.mouse.click(trackBox!.x+trackBox!.width*0.75,trackBox!.y+trackBox!.height/2);
  await expect(root.getByRole("slider")).toHaveAttribute("aria-valuenow","4");
});
test("endpoint thumb targets remain inside the Slider boundary",async({page})=>{
  const rangeRoot=page.getByTestId("slider-values").locator(".brick-slider").last();
  const thumbs=rangeRoot.getByRole("slider");
  await thumbs.first().focus();
  await thumbs.first().press("Home");
  await thumbs.last().focus();
  await thumbs.last().press("End");

  const rootBox=await rangeRoot.boundingBox();
  const startBox=await thumbs.first().boundingBox();
  const endBox=await thumbs.last().boundingBox();
  expect(rootBox).not.toBeNull();
  expect(startBox).not.toBeNull();
  expect(endBox).not.toBeNull();
  expect(startBox!.x).toBeGreaterThanOrEqual(rootBox!.x-1);
  expect(endBox!.x+endBox!.width).toBeLessThanOrEqual(rootBox!.x+rootBox!.width+1);
});
test("mobile containment, target size, and accessibility remain correct",async({page})=>{await page.setViewportSize({width:390,height:844});expect((await page.getByTestId("slider-stress").boundingBox())!.width).toBeLessThanOrEqual(390);const box=await page.getByTestId("slider-overview").getByRole("slider").boundingBox();expect(box!.height).toBeGreaterThanOrEqual(44);expect((await new AxeBuilder({page}).analyze()).violations).toEqual([])});
