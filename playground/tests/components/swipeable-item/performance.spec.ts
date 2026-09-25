import { expect, test } from "../../evidence-test.js";

test("100-row motion probe retains bounded tracking and isolates unrelated DOM", async ({ page }, info) => {
  test.skip(info.project.name !== "chromium", "Diagnostic frame profile uses one controlled browser; behavior has its own full matrix.");
  await page.goto('/swipeable-item?qualification=1&stress=1');
  await expect(page.getByTestId('swipeable-long-list').locator('.brick-swipeable-item')).toHaveCount(100);
  const first = page.getByTestId('stress-row-0');
  await first.scrollIntoViewIfNeeded();
  const result = await first.evaluate(async root => {
    const content = root.querySelector<HTMLElement>('.brick-swipeable-item__content')!;
    const panel = root.querySelector<HTMLElement>('.brick-swipeable-item__actions[data-side="end"]')!;
    const frame = () => new Promise<number>(resolve => requestAnimationFrame(resolve));
    await frame(); await frame();
    let unrelatedMutations = 0;
    const observer = new MutationObserver(records => {
      unrelatedMutations += records.filter(record => !root.contains(record.target)).length;
    });
    observer.observe(root.parentElement!, { subtree: true, attributes: true, childList: true, characterData: true });
    const box = content.getBoundingClientRect();
    const x = box.x + box.width / 2, y = box.y + box.height / 2;
    const fire = (type: string, offset: number) => content.dispatchEvent(new PointerEvent(type, { bubbles: true, cancelable: true, pointerId: 81, button: 0, clientX: x - offset, clientY: y }));
    const positions: number[] = [], intervals: number[] = [];
    let previous = await frame();
    fire('pointerdown', 0);
    for(let index = 1; index <= 30; index++) {
      fire('pointermove', index * 4);
      const now = await frame(); intervals.push(now - previous); previous = now;
      positions.push(new DOMMatrixReadOnly(getComputedStyle(content).transform).m41);
    }
    fire('pointerup', 120);
    for(let index = 0; index < 20; index++) await frame();
    observer.disconnect();
    intervals.sort((a,b)=>a-b);
    return { rows: 100, samples: positions.length, actionWidth: panel.getBoundingClientRect().width, positions, finalOffset: new DOMMatrixReadOnly(getComputedStyle(content).transform).m41, unrelatedMutations, medianFrameMs: intervals[15], p95FrameMs: intervals[28], viewport: [innerWidth, innerHeight], userAgent: navigator.userAgent };
  });
  expect(result.unrelatedMutations).toBe(0);
  expect(result.positions.every(offset => offset <= 1 && offset >= -result.actionWidth - 1)).toBe(true);
  expect(Math.abs(result.finalOffset + result.actionWidth)).toBeLessThan(1);
  await info.attach('swipeable-motion-profile', { body: JSON.stringify(result, null, 2), contentType: 'application/json' });
  console.log(JSON.stringify({ ...result, positions: undefined }));
});
