# @flowstack-ui/brick

Opinionated styled React components built on `@flowstack-ui/atom`.

Brick provides finished, accessible React components with static CSS, semantic
design tokens, light and dark appearances, and a documented customization
contract. The initial catalog includes Button and Card in version `0.1.0`.

## Boundary

- Atom owns reusable behavior, state, semantics, focus, keyboard interaction,
  portals, positioning, and accessibility.
- Brick owns styled reusable React components and their visual system.
- Application blocks, product data, routing policy, persistence, and business
  workflows are outside this package.

## Installation

```bash
npm install @flowstack-ui/brick @flowstack-ui/atom react react-dom
```

Import the complete stylesheet once in the application root:

```ts
import "@flowstack-ui/brick/styles.css";
```

The optional reset is separate and must be chosen explicitly:

```ts
import "@flowstack-ui/brick/reset.css";
import "@flowstack-ui/brick/styles.css";
```

Use `@flowstack-ui/brick/tokens.css` when only the visual tokens are needed.

```tsx
import { Button, Card } from "@flowstack-ui/brick";

<Button>Save changes</Button>;

<Card.Root>
  <Card.Content>Project summary</Card.Content>
</Card.Root>;
```

See [`docs/README.md`](docs/README.md) for the public guides and component
documentation contract.

## Development

```bash
npm run build
npm run typecheck
npm test
npm run build:playground
npm run dev:playground
npm run dev:playground:network
npm run dev:test
npm run test:browser
npm run test:browser:release
npm run test:all
npm run pack:check
```

The playground uses `http://127.0.0.1:3010` locally. Its network command uses
the same port for real-device review. Playwright uses local preview port `4010`
and stops that server after the run. Both ports are strict and will not
silently increment when occupied.
