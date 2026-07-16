# @flowstack-ui/brick

Opinionated styled React components built on `@flowstack-ui/atom`.

Brick's product definition is complete, but the staged package intentionally
exports no components yet. Shared styling, testing, playground, documentation,
and cutover infrastructure will be planned before the Button, Dialog, and Card
reference implementations begin.

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
