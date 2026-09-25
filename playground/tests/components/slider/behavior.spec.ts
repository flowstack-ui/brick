import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";
test.beforeEach(async ({ page }) => {
  await page.goto("/slider");
});
test("native cross-axis scrolling starting on the rail remains available", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-chromium", "requires Chromium native touch input");
  await page.goto("/slider?testMode=0");
  const control = page.locator("#label-value .brick-slider__control");
  await control.scrollIntoViewIfNeeded();
  const box = await control.boundingBox();
  const before = await page.evaluate(()=>window.scrollY);
  const session = await page.context().newCDPSession(page);
  const start = {x:box!.x+box!.width*.15, y:box!.y+box!.height/2, id:9};
  await session.send("Input.dispatchTouchEvent", {type:"touchStart",touchPoints:[start]});
  for(let n=1;n<=8;n++) await session.send("Input.dispatchTouchEvent", {type:"touchMove",touchPoints:[{...start,y:start.y-n*12}]});
  await session.send("Input.dispatchTouchEvent", {type:"touchEnd",touchPoints:[]});
  await expect.poll(()=>page.evaluate(()=>window.scrollY)).toBeGreaterThan(before+20);
  await session.detach();
});

test("soft tone paint and responsive thumb measurement remain independent", async ({ page }) => {
  await page.goto("/slider?testMode=0");
  const root = page.locator("#responsive .brick-slider").first();
  await page.setViewportSize({width:1000,height:850});
  const thumb = root.getByRole("slider");
  await thumb.focus(); await thumb.press("End");
  for(const width of [1000,390,1000]) {
    await page.setViewportSize({width,height:850});
    await expect.poll(()=>root.evaluate(r=>{
      const t=r.querySelector(".brick-slider__thumb")!.getBoundingClientRect();
      const c=r.querySelector(".brick-slider__control")!.getBoundingClientRect();
      return Math.abs(c.right-t.right);
    })).toBeLessThan(1);
  }
  const paints = await root.evaluate(r=>{
    const prior=r.getAttribute("data-tone")!;
    const result=["accent","neutral","contrast"].map(tone=>{
      r.setAttribute("data-tone",tone);
      return getComputedStyle(r.querySelector(".brick-slider__thumb")!,"::before").backgroundColor;
    });
    r.setAttribute("data-tone",prior);return result;
  });
  expect(new Set(paints).size).toBe(3);
});
test("visible endpoints fill the rail without sacrificing expanded pointer targets", async ({
  page,
}) => {
  const root = page.getByTestId("slider-overview").locator(".brick-slider");
  const thumb = root.getByRole("slider");
  await thumb.focus();
  await thumb.press("End");
  const geometry = await root.evaluate((r) => {
    const track = r
      .querySelector(".brick-slider__track")!
      .getBoundingClientRect();
    const range = r
      .querySelector(".brick-slider__range")!
      .getBoundingClientRect();
    const thumb = r
      .querySelector(".brick-slider__thumb")!
      .getBoundingClientRect();
    return {
      start: range.left - track.left,
      end: track.right - range.right,
      thumbEnd: track.right - thumb.right,
    };
  });
  expect(Math.abs(geometry.start)).toBeLessThan(1);
  expect(Math.abs(geometry.end)).toBeLessThan(1);
  expect(Math.abs(geometry.thumbEnd)).toBeLessThan(1);
  await thumb.press("Home");
  const [rail, start] = await Promise.all([
    root.locator(".brick-slider__track").boundingBox(),
    thumb.boundingBox(),
  ]);
  expect(Math.abs(start!.x - rail!.x)).toBeLessThan(1);
});

test("secondary clicks do not edit; primary track activation focuses for keyboard continuation", async ({
  page,
}) => {
  const root = page.getByTestId("slider-overview");
  const thumb = root.getByRole("slider");
  const rail = await root.locator(".brick-slider__track").boundingBox();
  await expect(thumb).toHaveAttribute("aria-valuenow", "40");
  await page.mouse.click(
    rail!.x + rail!.width * 0.2,
    rail!.y + rail!.height / 2,
  );
  await expect(thumb).toBeFocused();
  const before = Number(await thumb.getAttribute("aria-valuenow"));
  await page.keyboard.press("ArrowRight");
  await expect(thumb).toHaveAttribute("aria-valuenow", String(before + 1));
  // A native WebKit context menu suspends later page input, including Escape.
  // Check secondary activation last so it cannot mask primary focus behavior.
  await page.mouse.click(
    rail!.x + rail!.width * 0.8,
    rail!.y + rail!.height / 2,
    { button: "right" },
  );
  await expect(thumb).toHaveAttribute("aria-valuenow", String(before + 1));
});

test("modern artwork and vertical RTL are centered and disabled feedback stays inert", async ({
  page,
}) => {
  await page.goto("/slider?testMode=0");
  const rtl = page.locator("#vertical .brick-slider[dir=rtl]");
  const [track, thumb] = await Promise.all([
    rtl.locator(".brick-slider__track").boundingBox(),
    rtl.getByRole("slider").boundingBox(),
  ]);
  expect(
    Math.abs(track!.x + track!.width / 2 - thumb!.x - thumb!.width / 2),
  ).toBeLessThan(1);
  const artwork = page
    .locator("#indicators")
    .getByRole("slider", { name: "Pan" });
  const [host, icon] = await Promise.all([
    artwork.boundingBox(),
    artwork.locator("svg").boundingBox(),
  ]);
  expect(
    Math.abs(host!.y + host!.height / 2 - icon!.y - icon!.height / 2),
  ).toBeLessThan(1);
  const disabled = page
    .locator("#states")
    .getByRole("slider", { name: "disabled", exact: true });
  await disabled.hover();
  expect(
    await disabled.evaluate(
      (node) => getComputedStyle(node, "::before").transform,
    ),
  ).toBe("none");
  expect(await disabled.evaluate((node) => getComputedStyle(node).cursor)).toBe(
    "not-allowed",
  );
});

test("off-center grab preserves value and root does not suppress cross-axis panning", async ({
  page,
}) => {
  const root = page.getByTestId("slider-overview").locator(".brick-slider");
  const thumb = root.getByRole("slider");
  const box = await thumb.boundingBox();
  await page.mouse.move(box!.x + box!.width / 2 + 18, box!.y + box!.height / 2);
  await page.mouse.down();
  await expect(thumb).toHaveAttribute("data-dragging", "");
  await page.mouse.move(box!.x + box!.width / 2 + 19, box!.y + box!.height / 2);
  expect(
    Math.abs(Number(await thumb.getAttribute("aria-valuenow")) - 40),
  ).toBeLessThanOrEqual(1);
  await page.mouse.up();
  expect(
    await root.evaluate((node) => getComputedStyle(node).touchAction),
  ).not.toBe("none");
});
test("defaults, recipes, ranges, Field states, and form output are complete", async ({
  page,
}) => {
  const thumb = page
    .getByTestId("slider-overview")
    .getByRole("slider", { name: "Volume" });
  await expect(thumb).toHaveAttribute("aria-valuenow", "40");
  await expect(thumb.locator(".brick-slider__value-label")).toHaveCount(0);
  const expectedGeometry = {
    sm: { thumb: 16, track: 6 },
    md: { thumb: 20, track: 8 },
    lg: { thumb: 24, track: 10 },
  } as const;
  for (const size of ["sm", "md", "lg"] as const) {
    const root = page
      .getByTestId("slider-recipes")
      .locator(`.brick-slider[data-size='${size}']`)
      .first();
    await expect(root).toHaveCount(1);
    const geometry = await root.evaluate((node) => ({
      thumb: Number.parseFloat(
        getComputedStyle(
          node.querySelector(".brick-slider__thumb")!,
          "::before",
        ).width,
      ),
      track: Number.parseFloat(
        getComputedStyle(node.querySelector(".brick-slider__track")!).height,
      ),
    }));
    expect(geometry).toEqual(expectedGeometry[size]);
  }
  await expect(
    page.getByTestId("slider-values").getByRole("slider"),
  ).toHaveCount(3);
  await expect(
    page.getByTestId("slider-states").locator(".brick-slider[data-invalid]"),
  ).toHaveCount(1);
});
test("large thumb artwork inherits the polished Slider content scale", async ({
  page,
}) => {
  const thumb = page
    .getByTestId("slider-content")
    .getByRole("slider", { name: "Seats" });
  await expect(thumb.locator(".brick-icon")).toHaveAttribute(
    "data-size",
    "inherit",
  );
  const geometry = await thumb.evaluate((node) => {
    const icon = node.querySelector(".brick-icon")!;
    return {
      thumb: Number.parseFloat(getComputedStyle(node, "::before").width),
      icon: Number.parseFloat(getComputedStyle(icon).width),
      transition: getComputedStyle(node).transitionProperty,
    };
  });
  expect(geometry.thumb).toBe(24);
  expect(geometry.icon).toBeGreaterThanOrEqual(14);
  expect(geometry.icon).toBeLessThan(geometry.thumb);
  expect(geometry.transition).not.toContain("inset");
});
test("keyboard, RTL, effective range bounds, and reset behavior work", async ({
  page,
}) => {
  const slider = page.getByTestId("slider-overview").getByRole("slider");
  await slider.focus();
  await slider.press("ArrowRight");
  await expect(slider).toHaveAttribute("aria-valuenow", "41");
  const range = page
    .getByTestId("slider-values")
    .getByRole("slider", { name: "Price range 1" });
  await expect(range).toHaveAttribute("aria-valuemax", "75");
  const rtl = page
    .getByTestId("slider-stress")
    .getByRole("slider", { name: "نطاق السعر 1" });
  await rtl.focus();
  await rtl.press("ArrowLeft");
  await expect(rtl).toHaveAttribute("aria-valuenow", "21");
});
test("track clicks and thumb drags commit without reverting in every geometry", async ({
  page,
}) => {
  const containedValue = (length: number, ratio: number) =>
    Math.round(
      Math.max(0, Math.min(1, (length * ratio - 10) / (length - 20))) * 100,
    );
  const overview = page.getByTestId("slider-overview");
  const horizontal = overview.getByRole("slider", { name: "Volume" });
  const horizontalTrack = overview.locator(".brick-slider__track");
  const horizontalBox = await horizontalTrack.boundingBox();
  await page.mouse.click(
    horizontalBox!.x + horizontalBox!.width * 0.8,
    horizontalBox!.y + horizontalBox!.height / 2,
  );
  const horizontalClickValue = containedValue(horizontalBox!.width, 0.8);
  await expect
    .poll(async () => Number(await horizontal.getAttribute("aria-valuenow")))
    .toBe(horizontalClickValue);
  await page.waitForTimeout(100);
  expect(Number(await horizontal.getAttribute("aria-valuenow"))).toBe(
    horizontalClickValue,
  );
  const horizontalThumbBox = await horizontal.boundingBox();
  await page.mouse.move(
    horizontalThumbBox!.x + horizontalThumbBox!.width / 2,
    horizontalThumbBox!.y + horizontalThumbBox!.height / 2,
  );
  await page.mouse.down();
  await page.mouse.move(
    horizontalBox!.x + horizontalBox!.width * 0.25,
    horizontalBox!.y + horizontalBox!.height / 2,
    { steps: 5 },
  );
  await page.mouse.up();
  const horizontalDragValue = containedValue(horizontalBox!.width, 0.25);
  await expect
    .poll(async () => Number(await horizontal.getAttribute("aria-valuenow")))
    .toBe(horizontalDragValue);
  expect(Number(await horizontal.getAttribute("aria-valuenow"))).toBe(
    horizontalDragValue,
  );

  const direction = page.getByTestId("slider-direction");
  const vertical = direction.getByRole("slider", { name: "Volume" }).last();
  const verticalTrack = direction.locator(
    ".brick-slider[data-orientation='vertical'] .brick-slider__track",
  );
  await verticalTrack.evaluate((element) =>
    element.scrollIntoView({ block: "center" }),
  );
  const verticalBox = await verticalTrack.boundingBox();
  const verticalTarget = (value: number) =>
    10 + (1 - value / 100) * (verticalBox!.height - 20);
  await verticalTrack.click({
    position: { x: verticalBox!.width / 2, y: verticalTarget(80) },
  });
  await expect
    .poll(async () => Number(await vertical.getAttribute("aria-valuenow")))
    .toBeGreaterThanOrEqual(79);
  expect(
    Number(await vertical.getAttribute("aria-valuenow")),
  ).toBeLessThanOrEqual(81);
  const verticalDragBox = await verticalTrack.boundingBox();
  const verticalThumbBox = await vertical.boundingBox();
  await page.mouse.move(
    verticalThumbBox!.x + verticalThumbBox!.width / 2,
    verticalThumbBox!.y + verticalThumbBox!.height / 2,
  );
  await page.mouse.down();
  await page.mouse.move(
    verticalDragBox!.x + verticalDragBox!.width / 2,
    verticalDragBox!.y + verticalTarget(30),
    { steps: 5 },
  );
  await page.mouse.up();
  await expect
    .poll(async () => Number(await vertical.getAttribute("aria-valuenow")))
    .toBeGreaterThanOrEqual(29);
  expect(
    Number(await vertical.getAttribute("aria-valuenow")),
  ).toBeLessThanOrEqual(31);

  const rtlRoot = page
    .getByTestId("slider-stress")
    .locator(".brick-slider[dir='rtl']");
  const rtlTrack = rtlRoot.locator(".brick-slider__track");
  const rtlThumb = rtlRoot.getByRole("slider").last();
  await rtlTrack.evaluate((element) =>
    element.scrollIntoView({ block: "center" }),
  );
  const rtlBox = await rtlTrack.boundingBox();
  await page.mouse.click(
    rtlBox!.x + rtlBox!.width * 0.1,
    rtlBox!.y + rtlBox!.height / 2,
  );
  const rtlClickValue = containedValue(rtlBox!.width, 0.9);
  await expect
    .poll(async () => Number(await rtlThumb.getAttribute("aria-valuenow")))
    .toBeGreaterThanOrEqual(rtlClickValue - 1);
  expect(
    Number(await rtlThumb.getAttribute("aria-valuenow")),
  ).toBeLessThanOrEqual(rtlClickValue + 1);
  expect(
    (await rtlRoot.locator(".brick-slider__range").boundingBox())!.width,
  ).toBeGreaterThan(0);
});
test("losing pointer capture finalizes the dragged value instead of restoring its start", async ({
  page,
}) => {
  const overview = page.getByTestId("slider-overview");
  const thumb = overview.getByRole("slider", { name: "Volume" });
  const track = overview.locator(".brick-slider__track");
  const trackBox = await track.boundingBox();
  const thumbBox = await thumb.boundingBox();
  await page.mouse.move(
    thumbBox!.x + thumbBox!.width / 2,
    thumbBox!.y + thumbBox!.height / 2,
  );
  await page.mouse.down();
  await page.mouse.move(
    trackBox!.x + trackBox!.width * 0.7,
    trackBox!.y + trackBox!.height / 2,
    { steps: 5 },
  );
  await expect
    .poll(async () => Number(await thumb.getAttribute("aria-valuenow")))
    .toBeGreaterThanOrEqual(71);
  await thumb.dispatchEvent("lostpointercapture", {
    pointerId: 1,
    pointerType: "mouse",
    isPrimary: true,
  });
  await page.mouse.up();
  const committed = await thumb.getAttribute("aria-valuenow");
  await page.waitForTimeout(100);
  await expect(thumb).toHaveAttribute("aria-valuenow", committed!);
});
test("native touch taps remain committed", async ({ page }, testInfo) => {
  test.skip(
    !testInfo.project.name.startsWith("mobile-"),
    "requires a touch-enabled project",
  );
  const overview = page.getByTestId("slider-overview");
  const thumb = overview.getByRole("slider", { name: "Volume" });
  const track = overview.locator(".brick-slider__track");
  const box = await track.boundingBox();
  for (const percent of [0.2, 0.8, 0.35, 0.65]) {
    const expected = Math.round(
      Math.max(
        0,
        Math.min(1, (box!.width * percent - 10) / (box!.width - 20)),
      ) * 100,
    );
    await page.touchscreen.tap(
      box!.x + box!.width * percent,
      box!.y + box!.height / 2,
    );
    // WebKit rounds native touch coordinates to device pixels; allow one
    // snapped step, then independently require the accepted value to persist.
    await expect.poll(async () => Math.abs(Number(await thumb.getAttribute("aria-valuenow"))-expected)).toBeLessThanOrEqual(1);
    const accepted = await thumb.getAttribute("aria-valuenow");
    await page.waitForTimeout(100);
    await expect(thumb).toHaveAttribute("aria-valuenow", accepted!);
  }
});
test("native horizontal touch drags remain committed", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "mobile-chromium",
    "requires Chromium touch input",
  );
  const overview = page.getByTestId("slider-overview");
  const thumb = overview.getByRole("slider", { name: "Volume" });
  const track = overview.locator(".brick-slider__track");
  const box = await track.boundingBox();
  const startX = box!.x + box!.width * 0.4;
  const endX = box!.x + box!.width * 0.7;
  const y = box!.y + box!.height / 2;
  const session = await page.context().newCDPSession(page);
  await session.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x: startX, y, id: 1, radiusX: 4, radiusY: 4, force: 1 }],
  });
  for (let index = 1; index <= 6; index++) {
    const x = startX + (endX - startX) * (index / 6);
    await session.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [{ x, y, id: 1, radiusX: 4, radiusY: 4, force: 1 }],
    });
  }
  await session.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  const expected = String(
    Math.round(((box!.width * 0.7 - 10) / (box!.width - 20)) * 100),
  );
  await expect(thumb).toHaveAttribute("aria-valuenow", expected);
  await page.waitForTimeout(150);
  await expect(thumb).toHaveAttribute("aria-valuenow", expected);
});
test("markers stay contained and their track positions remain selectable", async ({
  page,
}) => {
  const root = page
    .getByTestId("slider-content")
    .locator(".brick-slider")
    .first();
  await root.evaluate((element) => element.scrollIntoView({ block: "center" }));
  const rootBox = await root.boundingBox();
  const markers = root.locator(".brick-slider__marker");
  await expect(markers).toHaveCount(5);
  for (const marker of await markers.all()) {
    const markerBox = await marker.boundingBox();
    expect(markerBox!.x).toBeGreaterThanOrEqual(rootBox!.x - 1);
    expect(markerBox!.x + markerBox!.width).toBeLessThanOrEqual(
      rootBox!.x + rootBox!.width + 1,
    );
  }
  const track = root.locator(".brick-slider__track");
  const trackBox = await track.boundingBox();
  const [startBox, endBox] = await Promise.all([
    markers.first().boundingBox(),
    markers.last().boundingBox(),
  ]);
  expect(startBox!.width).toBeGreaterThan(0);
  expect(endBox!.width).toBeGreaterThan(0);
  expect(startBox!.x + startBox!.width / 2).toBeGreaterThan(trackBox!.x);
  expect(endBox!.x + endBox!.width / 2).toBeLessThan(
    trackBox!.x + trackBox!.width,
  );
  await expect(markers.first()).toHaveAttribute("data-selected", "");
  await expect(markers.last()).not.toHaveAttribute("data-selected");
  const [selectedPaint, unselectedPaint] = await Promise.all([
    markers
      .first()
      .locator(".brick-slider__marker-indicator")
      .evaluate(
        (element) => getComputedStyle(element).backgroundColor,
      ),
    markers
      .last()
      .locator(".brick-slider__marker-indicator")
      .evaluate(
        (element) => getComputedStyle(element).backgroundColor,
      ),
  ]);
  expect(selectedPaint).not.toBe(unselectedPaint);
  const trackCenter = trackBox!.y + trackBox!.height / 2;
  for (const marker of await markers.all()) {
    const markerBox = await marker.boundingBox();
    const dotCenter = markerBox!.y + markerBox!.height / 2;
    expect(dotCenter).toBeCloseTo(trackCenter, 0);
    const labelBox = await marker.locator(".brick-slider__marker-label").boundingBox();
    expect(labelBox!.y).toBeGreaterThan(trackBox!.y + trackBox!.height);
  }
  await page.mouse.click(
    trackBox!.x + trackBox!.width * 0.75,
    trackBox!.y + trackBox!.height / 2,
  );
  await expect(root.getByRole("slider")).toHaveAttribute("aria-valuenow", "4");
});
test("endpoint visible thumbs remain inside the Slider boundary", async ({
  page,
}) => {
  const rangeRoot = page
    .getByTestId("slider-values")
    .locator(".brick-slider")
    .last();
  const thumbs = rangeRoot.getByRole("slider");
  await thumbs.first().focus();
  await thumbs.first().press("Home");
  await thumbs.last().focus();
  await thumbs.last().press("End");

  const rootBox = await rangeRoot.boundingBox();
  const startBox = await thumbs.first().boundingBox();
  const endBox = await thumbs.last().boundingBox();
  expect(rootBox).not.toBeNull();
  expect(startBox).not.toBeNull();
  expect(endBox).not.toBeNull();
  expect(startBox!.x).toBeGreaterThanOrEqual(rootBox!.x - 1);
  expect(endBox!.x + endBox!.width).toBeLessThanOrEqual(
    rootBox!.x + rootBox!.width + 1,
  );
});
test("mobile containment, target size, and accessibility remain correct", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    (await page.getByTestId("slider-stress").boundingBox())!.width,
  ).toBeLessThanOrEqual(390);
  const target = page.getByTestId("slider-overview").getByRole("slider");
  const hitHeight = await target.evaluate((node) => {
    const after = getComputedStyle(node, "::after");
    return (
      node.getBoundingClientRect().height -
      parseFloat(after.top) -
      parseFloat(after.bottom)
    );
  });
  expect(hitHeight).toBeGreaterThanOrEqual(44);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test("native pointer cancellation restores the starting value without stale dragging state", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "mobile-chromium",
    "requires Chromium touch protocol cancellation",
  );
  const overview = page.getByTestId("slider-overview");
  const thumb = overview.getByRole("slider", { name: "Volume" });
  const track = overview.locator(".brick-slider__track");
  const [thumbBox, trackBox] = await Promise.all([
    thumb.boundingBox(),
    track.boundingBox(),
  ]);
  const session = await page.context().newCDPSession(page);
  const start = {
    x: thumbBox!.x + thumbBox!.width / 2,
    y: thumbBox!.y + thumbBox!.height / 2,
    id: 7,
    radiusX: 4,
    radiusY: 4,
    force: 1,
  };
  await session.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [start],
  });
  await session.send("Input.dispatchTouchEvent", {
    type: "touchMove",
    touchPoints: [{ ...start, x: trackBox!.x + trackBox!.width * 0.75 }],
  });
  await expect(thumb).toHaveAttribute("data-dragging", "");
  await session.send("Input.dispatchTouchEvent", {
    type: "touchCancel",
    touchPoints: [],
  });
  await expect(thumb).toHaveAttribute("aria-valuenow", "40");
  await expect(thumb).not.toHaveAttribute("data-dragging");
});

test("modern collision, commit, and form examples exercise real public composition", async ({
  page,
}) => {
  await page.goto("/slider?testMode=0");
  const collision = page.locator("#collisions");
  const dragFirstThumb = async (ratio: number, release = true) => {
    const currentThumbs = collision.getByRole("slider");
    await currentThumbs.nth(0).focus();
    const [thumbBox, controlBox] = await Promise.all([
      currentThumbs.nth(0).boundingBox(),
      collision.locator(".brick-slider__control").boundingBox(),
    ]);
    await page.mouse.move(
      thumbBox!.x + thumbBox!.width / 2,
      thumbBox!.y + thumbBox!.height / 2,
    );
    await page.mouse.down();
    await page.mouse.move(
      controlBox!.x + controlBox!.width * ratio,
      controlBox!.y + controlBox!.height / 2,
      { steps: 6 },
    );
    if (release) await page.mouse.up();
    return currentThumbs;
  };

  const noneThumbs = await dragFirstThumb(0.7);
  expect(
    await noneThumbs.evaluateAll((nodes) =>
      nodes.map((node) => Number(node.getAttribute("aria-valuenow"))),
    ),
  ).toEqual([40, 50, 75]);

  await collision.getByRole("button", { name: "push" }).click();
  const thumbs = collision.getByRole("slider");
  await expect(thumbs).toHaveCount(3);
  await expect(thumbs.nth(0)).toHaveAccessibleName("Low stop");
  await dragFirstThumb(0.7);
  const values = await thumbs.evaluateAll((nodes) =>
    nodes.map((node) => Number(node.getAttribute("aria-valuenow"))),
  );
  expect(values[0]).toBeGreaterThan(50);
  expect(values).toEqual([...values].sort((a, b) => a - b));
  expect(values[1] - values[0]).toBeGreaterThanOrEqual(10);
  expect(values[2] - values[1]).toBeGreaterThanOrEqual(10);

  await collision.getByRole("button", { name: "swap" }).click();
  const swapThumbs = await dragFirstThumb(0.65, false);
  await expect(swapThumbs.nth(1)).toHaveAttribute("data-dragging", "");
  await expect(swapThumbs.nth(1)).toBeFocused();
  await page.mouse.up();
  const swappedValues = await swapThumbs.evaluateAll((nodes) =>
    nodes.map((node) => Number(node.getAttribute("aria-valuenow"))),
  );
  expect(swappedValues).toEqual([...swappedValues].sort((a, b) => a - b));
  expect(swappedValues[0]).toBe(50);
  expect(swappedValues[1]).toBeGreaterThan(50);

  const steps = page.locator("#steps-commit");
  const stepThumb = steps.getByRole("slider", { name: "Playback speed" });
  await stepThumb.focus();
  await stepThumb.press("Shift+ArrowRight");
  await expect(stepThumb).toHaveAttribute("aria-valuenow", "2.5");
  await expect(steps.getByText("Live 2.5× · committed 2.5×")).toBeVisible();

  const form = page.locator("#native-form");
  const budgetForm = form.getByRole("form", { name: "Budget form" });
  await budgetForm.getByRole("button", { name: "Submit" }).click();
  await expect(budgetForm.getByRole("status")).toHaveText("Submitted: 25–75");
  await budgetForm.getByRole("button", { name: "Reset" }).click();
  await expect(budgetForm.getByRole("status")).toHaveText("Form reset");
  await expect(budgetForm.locator('input[name^="budget["]')).toHaveCount(2);

  const externalForm = form.getByRole("form", { name: "External score form" });
  await expect(form.locator('input[name="externalScore"]')).toHaveAttribute(
    "form",
    "external-slider-form",
  );
  await externalForm.getByRole("button", { name: "Submit" }).click();
  await expect(form.getByText("External submitted: 60")).toBeVisible();

  const hookForm = page.locator("#hook-form");
  await expect(hookForm.locator('input[name="score"]')).toHaveCount(1);
  await hookForm.getByRole("button", { name: "Save" }).click();
  await expect(hookForm.getByText("Choose 50 or more.")).toBeVisible();
  const score = hookForm.getByRole("slider", { name: "Score" });
  await score.focus();
  await score.press("Shift+ArrowRight");
  await hookForm.getByRole("button", { name: "Save" }).click();
  await expect(hookForm.getByText("Choose 50 or more.")).toHaveCount(0);
});
