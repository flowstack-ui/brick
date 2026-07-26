# @flowstack-ui/brick

Opinionated styled React components built on `@flowstack-ui/atom`.

Brick provides finished, accessible React components with static CSS, semantic
design tokens, light and dark appearances, and a documented customization
contract. The initial catalog includes Button, Card, Dialog, AlertDialog,
Drawer, Badge, NotificationBadge, Avatar, Toggle, ToggleGroup, IconButton,
AppBar, Tooltip, HoverCard, Popover, Form, Field, Fieldset, Checkbox,
CheckboxGroup, Input, Text, Code, CodeBlock, Link, Stack, HStack, VStack, Grid,
Container, Surface, Divider, and Scroll Area.

## Boundary

- Atom owns reusable behavior, state, semantics, focus, keyboard interaction,
  portals, positioning, and accessibility.
- Brick owns styled reusable React components and their visual system.
- Application blocks, product data, routing policy, persistence, and business
  workflows are outside this package.

## Component guides

| Family | Components |
| --- | --- |
| Actions and selection | [Button](docs/components/button/README.md), [Icon Button](docs/components/icon-button/README.md), [Toggle](docs/components/toggle/README.md), [Toggle Group](docs/components/toggle-group/README.md) |
| Forms and choices | [Form](docs/components/form/README.md), [Field](docs/components/field/README.md), [Fieldset](docs/components/fieldset/README.md), [Input](docs/components/input/README.md), [Checkbox](docs/components/checkbox/README.md), [Checkbox Group](docs/components/checkbox-group/README.md) |
| Content and status | [Text](docs/components/text/README.md), [Code](docs/components/code/README.md), [Code Block](docs/components/code-block/README.md), [Avatar](docs/components/avatar/README.md), [Badge](docs/components/badge/README.md), [Notification Badge](docs/components/notification-badge/README.md), [Card](docs/components/card/README.md), [Divider](docs/components/divider/README.md) |
| Contextual overlays | [Tooltip](docs/components/tooltip/README.md), [Hover Card](docs/components/hover-card/README.md), [Popover](docs/components/popover/README.md) |
| Modal surfaces | [Dialog](docs/components/dialog/README.md), [Alert Dialog](docs/components/alert-dialog/README.md), [Drawer](docs/components/drawer/README.md) |
| Navigation and layout | [Link](docs/components/link/README.md), [App Bar](docs/components/app-bar/README.md), [Stack](docs/components/stack/README.md), [Grid](docs/components/grid/README.md), [Container](docs/components/container/README.md), [Surface](docs/components/surface/README.md), [Scroll Area](docs/components/scroll-area/README.md) |

See the complete [documentation index](docs/README.md) for installation,
appearance, testing, playground, manual-review, workbook, Consumer, and release
workflows.

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
import { AlertDialog, AppBar, Avatar, Badge, Button, Card, Checkbox, CheckboxGroup, Dialog, Divider, Drawer, Field, Fieldset, Form, Grid, HoverCard, HStack, IconButton, Input, Link, NotificationBadge, Popover, ScrollArea, Stack, Surface, Text, Toggle, ToggleGroup, VStack } from "@flowstack-ui/brick";

<Button>Save changes</Button>;

<Text as="h2" variant="title-md">Account settings</Text>;

<Link href="/guides">Read the component guides</Link>;

<VStack gap="3">
  <Text as="h2" variant="title-md">Account settings</Text>
  <HStack gap="2" wrap>
    <Button>Save</Button>
    <Button tone="neutral" variant="outline">Cancel</Button>
  </HStack>
</VStack>;

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

<Field.Root id="account-email">
  <Field.Label>Email</Field.Label>
  <Input name="email" type="email" />
</Field.Root>;

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
