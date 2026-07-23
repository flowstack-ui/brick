# Consumer Verification

`apps/consumer/` proves that a normal application can install and compose
Brick through its public package boundary.

The Consumer must use a packed artifact or the repository's packed-artifact
verification workflow. It must not import `src/`, private CSS files, build
aliases, or unpublished Atom code.

Use the Consumer for a small realistic workflow that combines components,
application layout, state, forms, and appearance. Do not copy the exhaustive
playground matrix into it.

Required checks are:

```bash
npm run build:consumer
npm run test:consumer
npm run verify:consumer
```

The boundary test verifies public imports and package isolation. The browser
test verifies the application flow and accessibility. `verify:consumer`
creates and installs the real Brick tarball before running the Consumer gate.
