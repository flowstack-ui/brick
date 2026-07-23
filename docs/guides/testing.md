# Testing

Choose evidence by ownership. Atom tests own reusable primitive behavior.
Brick component tests own styled anatomy and every adapter Brick adds.
Real-browser tests own CSS, layout, portals, responsive behavior, preferences,
and browser integration. Manual protocols own human judgment.

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
npm run test:consumer
npm run verify:consumer
npm run pack:check
npm run size:css
```

`test:browser` is the deterministic Chromium pull-request tier, including the
reviewed visual baselines. `test:browser:release` runs functional coverage in
desktop Chromium, Firefox, and WebKit plus Pixel and iPhone device profiles.
Use `test:visual:update` only for an intentional visual change, inspect every
generated image, and never update baselines merely to make a failure pass.

## Fast component and type tests

Each component owns `test/components/<component>.test.tsx`. Cover applicable
claims explicitly:

- default DOM, public parts, classes, slots, and styles
- every recipe, size, shape, and visual state
- native attributes and ARIA passed through without leaking private props
- events, controlled/uncontrolled adapters, refs, and composition
- disabled, loading, validation, and fallback behavior
- public token/class hooks and stable DOM required by the contract

Type fixtures cover positive and negative root/subpath imports, refs, unions,
composition, and server-safe imports. Do not duplicate Atom's exhaustive
primitive behavior suite; test the boundary Brick relies on.

## Package and server tests

Node tests own exports, declaration/runtime parity, CSS entrypoints, tarball
contents, SSR/import safety, peer boundaries, and the absence of private
imports. Clean React 18 and React 19 consumers must resolve the built package.

## Browser and visual tests

Each component owns `playground/tests/<component>.spec.ts`. Use roles, labels,
and stable scenario identifiers. Avoid arbitrary timeouts and implementation
selectors. During development, run a focused Chromium spec:

```bash
npx playwright test playground/tests/button.spec.ts --project=chromium
```

Cover only browser-owned risks: computed CSS/layout, focus and portals,
responsive and mobile interaction, RTL, zoom/reflow, relevant preferences,
and axe scans. Release coverage runs Chromium, Firefox, WebKit, Pixel, and
iPhone projects; intentional skips must explain the unsupported environment or
irrelevant assertion.

Visual baselines are selected by risk, not by multiplying every prop
combination. Protect representative recipes, interactive states, appearance,
mobile/RTL, preferences, and regression-prone composition. Use
`test:visual:update` only for an approved visual change, inspect every diff,
and never update all snapshots merely to clear a failure.

## Layer summary

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

One component owns one primary test and browser spec. Cross-component
integration specs are additional evidence and never replace component-owned
files. See [Component Workstream](../contributing/component-workstream.md).
