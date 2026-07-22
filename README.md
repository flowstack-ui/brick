# @flowstack-ui/brick

Opinionated styled React components built on `@flowstack-ui/atom`.

Brick provides finished, accessible React components with static CSS, semantic
design tokens, light and dark appearances, and a documented customization
contract. The initial catalog includes Button, Card, Dialog, AlertDialog,
Drawer, Badge, NotificationBadge, Avatar, Toggle, ToggleGroup, IconButton,
AppBar, Tooltip, HoverCard, Popover, Form, Field, Fieldset, Checkbox, and
CheckboxGroup in version `0.1.0`.

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
import { AlertDialog, AppBar, Avatar, Badge, Button, Card, Checkbox, CheckboxGroup, Dialog, Drawer, Fieldset, Form, HoverCard, IconButton, NotificationBadge, Popover, Toggle, ToggleGroup } from "@flowstack-ui/brick";

<Button>Save changes</Button>;

<IconButton aria-label="Search" href="/search"><SearchIcon /></IconButton>;

<AppBar.Root position="sticky">
  <AppBar.Toolbar>
    <AppBar.Start>Workspace</AppBar.Start>
    <AppBar.End><IconButton aria-label="Search"><SearchIcon /></IconButton></AppBar.End>
  </AppBar.Toolbar>
</AppBar.Root>;

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

<Checkbox name="terms" required value="accepted">Accept the terms</Checkbox>;

<Form>
  <Fieldset.Root required>
    <Fieldset.Legend>Notifications</Fieldset.Legend>
    <CheckboxGroup.Root allValues={["email", "push"]} name="notifications">
      <CheckboxGroup.Parent>Select all</CheckboxGroup.Parent>
      <CheckboxGroup.Item value="email">
        <CheckboxGroup.ItemLabel>Email</CheckboxGroup.ItemLabel>
        <CheckboxGroup.ItemDescription>Weekly account report.</CheckboxGroup.ItemDescription>
      </CheckboxGroup.Item>
      <CheckboxGroup.Item value="push">Push</CheckboxGroup.Item>
    </CheckboxGroup.Root>
  </Fieldset.Root>
</Form>;

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

<HoverCard.Root>
  <HoverCard.Trigger asChild><a href="/people/ada">Ada Lovelace</a></HoverCard.Trigger>
  <HoverCard.Portal>
    <HoverCard.Content size="md">
      <strong>Ada Lovelace</strong>
      <p>Mathematician and early computing author.</p>
      <HoverCard.Arrow />
    </HoverCard.Content>
  </HoverCard.Portal>
</HoverCard.Root>;

<Popover.Root>
  <Popover.Trigger asChild><Button variant="outline">Project settings</Button></Popover.Trigger>
  <Popover.Portal>
    <Popover.Content size="md">
      <Popover.Title>Project settings</Popover.Title>
      <Popover.Description>Change compact workspace options.</Popover.Description>
      <Popover.Body>{/* application controls */}</Popover.Body>
      <Popover.Footer><Popover.Close asChild><Button>Done</Button></Popover.Close></Popover.Footer>
      <Popover.Arrow />
    </Popover.Content>
  </Popover.Portal>
</Popover.Root>;
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
npm run build:consumer
npm run dev:consumer
npm run dev:consumer:network
npm run test:consumer
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
