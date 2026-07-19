# @flowstack-ui/brick

Opinionated styled React components built on `@flowstack-ui/atom`.

Brick provides finished, accessible React components with static CSS, semantic
design tokens, light and dark appearances, and a documented customization
contract. The initial catalog includes Button, Card, Dialog, AlertDialog,
Drawer, Badge, NotificationBadge, Avatar, Toggle, and ToggleGroup in version
`0.1.0`.

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
import { AlertDialog, Avatar, Badge, Button, Card, Dialog, Drawer, NotificationBadge, Toggle, ToggleGroup } from "@flowstack-ui/brick";

<Button>Save changes</Button>;

<Badge tone="success">Published</Badge>;

<NotificationBadge count={4}>
  <button aria-label="Inbox, 4 unread messages">Inbox</button>
</NotificationBadge>;

<Avatar
  alt="Ada Lovelace"
  fallback="AL"
  src="/people/ada.jpg"
  status="online"
/>;

<Toggle defaultPressed>Favorite</Toggle>;

<ToggleGroup.Root ariaLabel="Project view" attached defaultValue="cards">
  <ToggleGroup.Item value="cards">Cards</ToggleGroup.Item>
  <ToggleGroup.Item value="list">List</ToggleGroup.Item>
</ToggleGroup.Root>;

<Card.Root>
  <Card.Content>Project summary</Card.Content>
</Card.Root>;

<Dialog.Root>
  <Dialog.Trigger asChild>
    <Button>Open dialog</Button>
  </Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay />
    <Dialog.Content aria-label="Example dialog">Dialog content</Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>;

<AlertDialog.Root>
  <AlertDialog.Trigger asChild>
    <Button tone="danger" variant="outline">Remove project</Button>
  </AlertDialog.Trigger>
  <AlertDialog.Portal>
    <AlertDialog.Overlay />
    <AlertDialog.Content>
      <AlertDialog.Title>Remove project?</AlertDialog.Title>
      <AlertDialog.Description>This cannot be undone.</AlertDialog.Description>
      <AlertDialog.Cancel asChild><Button variant="outline">Cancel</Button></AlertDialog.Cancel>
      <AlertDialog.Action asChild><Button tone="danger">Remove</Button></AlertDialog.Action>
    </AlertDialog.Content>
  </AlertDialog.Portal>
</AlertDialog.Root>;

<Drawer.Root>
  <Drawer.Trigger asChild><Button variant="outline">Filters</Button></Drawer.Trigger>
  <Drawer.Portal>
    <Drawer.Overlay />
    <Drawer.Content placement="end" size="md">
      <Drawer.Title>Filter projects</Drawer.Title>
      <Drawer.Description>Narrow the visible project list.</Drawer.Description>
      <Drawer.Close asChild><Button>Apply</Button></Drawer.Close>
    </Drawer.Content>
  </Drawer.Portal>
</Drawer.Root>;
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
