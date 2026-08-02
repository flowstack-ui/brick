# Testing

Choose evidence by ownership. Atom tests own reusable primitive behavior.
Brick component tests own styled anatomy and every adapter Brick adds.
Real-browser tests own CSS, layout, portals, responsive behavior, preferences,
and browser integration. Manual protocols own human judgment.

Run the complete package-local verification:

```bash
npm run check
```

Verification has three explicit tiers:

- focused iteration: `npm run test:component:unit -- button`,
  `npm run test:component:types -- button`,
  `npm run test:component:browser -- button`, and
  `npm run test:component:visual -- button` as the affected risk requires;
- repository candidate: `npm run check:repository` (also available as
  `npm run check`), which builds the package once and reuses that output across
  type, Node, playground, Consumer, package, and clean-consumer gates;
- release candidate: `npm run check:release`, which adds the complete browser
  matrix, packed application Consumer, and CSS-size report.

Do not rerun the repository or release tier after every focused edit. Escalate
when the affected component is stable or when a shared boundary requires
broader evidence.

Focused commands:

```bash
npm run test:ownership
npm run docs:component
npm run docs:component:semantic
npm run test:component -- button
npm run test:component:unit -- button
npm run test:component:types -- button
npm run test:component:browser -- button
npm run test:component:visual -- button
npm run test:integration
npm run typecheck
npm run test:node
npm run test:components
npm run test:css
npm run build:playground
npm run test:browser
npm run test:browser:release
npm run test:visual
npm run test:consumer
npm run verify:consumer
npm run pack:check
npm run size:css
```

`test:browser` is the deterministic Chromium pull-request tier, including the
reviewed visual baselines. `test:browser:release` runs functional coverage in
desktop Chromium, Firefox, and WebKit plus Pixel and iPhone device profiles.
Release projects run sequentially with one worker per browser profile so one
engine cannot exhaust resources or turn host contention into false failures.
Use `test:visual:update` only for an intentional visual change, inspect every
generated image, and never update baselines merely to make a failure pass.

The playground uses development port `3010` and strict automated-test port
`4010`; Consumer uses `3011` and `4011`. Browser commands do not reuse an
existing test listener. Playwright owns and stops the preview it starts on
success, failure, timeout, or interruption. `npm run test:processes` checks
both test ports without changing process state. Installed browser binaries may
remain cached, but one-shot preview, browser, and worker processes may not.

Pull-request CI builds the repository evidence once and runs the conservative
complete Chromium suite. Pushes to `main` distribute all five portable browser
profiles across independent clean runners, and nightly CI repeats the complete
release gate remotely. A named component remains the smallest local affected
unit; shared or unknown changes expand to the repository gate. Reviewed macOS
visual baselines and named physical-device checks remain explicit human release
evidence.

CI and advanced local diagnosis can reuse an already-built playground without
starting a development server:

```bash
npm run test:browser:project:built -- chromium playground/tests/components/button/behavior.spec.ts
```

## Fast component and type tests

Each component owns
`test/components/<component>/<component>.test.tsx`. Its focused public type
entrypoint lives at `test/types/components/<component>.test.ts`. Cover
applicable claims explicitly:

- default DOM, public parts, classes, slots, and styles
- every recipe, size, shape, and visual state
- native attributes and ARIA passed through without leaking private props
- events, controlled/uncontrolled adapters, refs, and composition
- disabled, loading, validation, and fallback behavior
- public token/class hooks and stable DOM required by the contract

The aggregate fixtures in `test/types/` retain positive and negative
root/subpath imports, refs, unions, composition, and server-safe imports.
Component-owned fixtures make ownership and focused failures discoverable. Do
not duplicate Atom's exhaustive primitive behavior suite; test the boundary
Brick relies on.

## Package and server tests

Node tests own exports, declaration/runtime parity, CSS entrypoints, tarball
contents, SSR/import safety, peer boundaries, and the absence of private
imports. Clean React 18 and React 19 consumers must resolve the built package.

## Browser and visual tests

Each component owns
`playground/tests/components/<component>/behavior.spec.ts` and
`playground/tests/components/<component>/visual.spec.ts`. Use roles, labels,
and stable scenario identifiers. Cross-component behavior belongs in
`playground/tests/integration/`. Avoid arbitrary timeouts and implementation
selectors. During development, run:

```bash
npm run test:component:browser -- button
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

Snapshots live beside the owning `visual.spec.ts`. Use `npm run test:visual`
to verify every component-owned baseline and `npm run test:visual:update` only
to regenerate an intentional, reviewed change.

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

One component owns unit, type, browser behavior, and visual specs.
Cross-component integration specs are additional evidence and never replace
component-owned files. `npm run test:ownership` fails when any exported
component is missing any required owner. See
[Component Workstream](../contributing/component-workstream.md).
