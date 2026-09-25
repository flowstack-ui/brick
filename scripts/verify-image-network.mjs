import assert from 'node:assert/strict';

// Invoked against the same production Next server and digest-locked pair as
// the primary integration test. Routing deliberately controls network races.
export async function verifyImageNetwork(browser, origin, imageBytes) {
  const context = await browser.newContext({ viewport: { width: 800, height: 900 } });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  let releaseScripts;
  const scripts = new Promise(resolve => { releaseScripts = resolve; });
  let releaseSlow;
  const slow = new Promise(resolve => { releaseSlow = resolve; });
  const requests = [];
  await page.route('**/*', async route => {
    const request = route.request();
    if (request.resourceType() === 'script') await scripts;
    const path = new URL(request.url()).pathname;
    if (path.startsWith('/probe-')) {
      requests.push(path);
      if (path === '/probe-slow.webp') await slow;
      try {
        await route.fulfill(path === '/probe-error.webp' || path === '/probe-slow.webp'
          ? { status: 404, body: 'Missing' }
          : { status: 200, contentType: 'image/webp', body: imageBytes });
      } catch (error) {
        // Aborted obsolete requests are allowed; other routing errors are not.
        if (!/closed|cancel|abort|Invalid InterceptionId/i.test(String(error))) throw error;
      }
      return;
    }
    await route.continue();
  });
  try {
    await page.goto(`${origin}/qualification`, { waitUntil: 'commit' });
    await page.waitForFunction(() => ['before-success', 'before-error'].every(id => {
      const img = document.querySelector(`[data-case="${id}"] img`);
      return img?.complete;
    }));
    assert.equal(await page.locator('main').getAttribute('data-hydrated'), 'false');
    assert.equal(await page.locator('[data-case="before-error"] img').evaluate(n => n.naturalWidth), 0);
    assert.ok(await page.locator('[data-case="before-success"] img').evaluate(n => n.naturalWidth > 0));
    await page.evaluate(() => { window.__beforeImage = document.querySelector('[data-case="before-success"] img'); });
    releaseScripts();
    await page.waitForFunction(() => document.querySelector('main')?.dataset.hydrated === 'true');
    await page.waitForFunction(() => document.querySelector('[data-case="before-error"]')?.dataset.state === 'error'
      && document.querySelector('[data-case="before-success"]')?.dataset.state === 'loaded');
    assert.ok(await page.evaluate(() => window.__beforeImage === document.querySelector('[data-case="before-success"] img')));
    await Promise.all([
      page.waitForRequest(r => new URL(r.url()).pathname === '/probe-slow.webp'),
      page.getByRole('button', { name: 'Slow source', exact: true }).click(),
    ]);
    await page.getByRole('button', { name: 'Fast source', exact: true }).click();
    await page.waitForFunction(() => document.querySelector('[data-case="race"]')?.dataset.state === 'loaded'
      && document.querySelector('[data-case="race"] img')?.currentSrc.endsWith('/probe-fast.webp'));
    releaseSlow();
    // Let the obsolete response settle, then verify it cannot replace success.
    await page.waitForTimeout(200);
    assert.equal(await page.locator('[data-case="race"]').getAttribute('data-state'), 'loaded');
    await page.getByRole('button', { name: 'Clear source', exact: true }).click();
    await page.waitForFunction(() => document.querySelector('[data-case="race"]')?.dataset.state === 'idle');
    assert.equal(await page.locator('[data-case="race"] img').count(), 0);
    const hiddenRequestedBeforeReveal = requests.includes('/probe-hidden.webp');
    // This asserts the controlled Chromium fixture, not all browsers' policy.
    assert.equal(hiddenRequestedBeforeReveal, false);
    await page.getByRole('button', { name: 'Reveal lazy image', exact: true }).click();
    await page.locator('[data-case="hidden"]').scrollIntoViewIfNeeded();
    await page.waitForFunction(() => document.querySelector('[data-case="hidden"]')?.dataset.state === 'loaded');
    await page.waitForFunction(() => document.querySelector('[data-case="next-fill"]')?.dataset.state === 'loaded');
    for (const width of [360, 1000]) {
      await page.setViewportSize({ width, height: 900 });
      const geometry = await page.locator('[data-case="next-fill"]').evaluate(root => {
        const image = root.querySelector('img');
        const a = root.getBoundingClientRect(), b = image.getBoundingClientRect();
        return { root: [a.width, a.height], image: [b.width, b.height], position: getComputedStyle(image).position };
      });
      assert.deepEqual(geometry.image, geometry.root);
      assert.equal(geometry.root[1], 240);
      assert.equal(geometry.position, 'absolute');
    }
    assert.deepEqual(errors, []);
    return { preHydrationSuccessAndError: true, retainedHost: true, replacedSlowRequest: true,
      clearToIdle: true, hiddenRequestedBeforeReveal, revealedLazyLoaded: true, nextFill: true, requests };
  } finally { releaseScripts(); releaseSlow(); await context.close(); }
}
