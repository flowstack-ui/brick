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
npm run pack:check
npm run size:css
```

The test layers have distinct responsibilities:

- Node tests inspect metadata, exports, boundaries, built CSS, and package
  contents.
- Vitest and Testing Library check fast React component contracts.
- Type fixtures protect public TypeScript behavior.
- Playwright uses the public-package playground for browser interaction,
  computed CSS, responsive checks, accessibility scanning, and visual evidence.
- Manual protocols record visual and accessibility judgments that automation
  cannot prove.
