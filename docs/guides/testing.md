# Testing

Run the complete package-local verification:

```bash
npm run check
```

Focused commands:

```bash
npm run typecheck
npm run test:node
npm run test:components
npm run test:css
npm run build:playground
npm run test:browser
npm run test:browser:release
npm run pack:check
npm run size:css
```

`test:browser` is the deterministic Chromium pull-request tier, including the
reviewed visual baselines. `test:browser:release` runs functional coverage in
desktop Chromium, Firefox, and WebKit plus Pixel and iPhone device profiles.
Use `test:visual:update` only for an intentional visual change, inspect every
generated image, and never update baselines merely to make a failure pass.

The test layers have distinct responsibilities:

- Node tests inspect metadata, exports, boundaries, built CSS, and package
  contents.
- Vitest and Testing Library check fast React component contracts.
- Type fixtures protect public TypeScript behavior.
- Playwright uses the public-package playground for browser interaction,
  computed CSS, responsive checks, accessibility scanning, Chromium visual
  evidence, preference emulation, and the release browser/mobile matrix.
- Manual protocols record visual and accessibility judgments that automation
  cannot prove.
