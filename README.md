# @flowstack-ui/brick

Opinionated styled React components built on `@flowstack-ui/atom`.

Brick is currently in product definition and intentionally exports no
components yet. Its component system, visual language, CSS distribution,
tokens, APIs, customization contract, and quality standards are being defined
before implementation begins.

## Boundary

- Atom owns reusable behavior, state, semantics, focus, keyboard interaction,
  portals, positioning, and accessibility.
- Brick owns styled reusable React components and their visual system.
- Application blocks, product data, routing policy, and TemplateFlow schemas
  are outside this package.
- Brick does not depend on `@templateflow/core` or Next.js.

## Development

```bash
npm run build
npm run typecheck
npm test
npm run pack:check
```

This package is staged inside the TemplateFlow workspace until it is ready to
move to the standalone `flowstack-ui/brick` repository.

