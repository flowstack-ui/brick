# AppBar

AppBar is a styled top surface with one aligned Toolbar and Start, Center, and
End regions. It styles Atom's server-safe AppBar anatomy and does not own
navigation data, routing, mobile menus, scroll reactions, or application-shell
policy.

```tsx
import { AppBar } from "@flowstack-ui/brick/app-bar";

<AppBar.Root position="sticky">
  <AppBar.Toolbar>
    <AppBar.Start>Brand</AppBar.Start>
    <AppBar.Center>Workspace</AppBar.Center>
    <AppBar.End>Actions</AppBar.End>
  </AppBar.Toolbar>
</AppBar.Root>
```

Root supports `static`, `absolute`, `sticky`, and `fixed` positions; `solid`,
`surface`, and `transparent` variants; and `bordered`, `elevated`, and `blurred`
visual flags. `static`, `surface`, and `bordered` are defaults. Toolbar supports
Atom's `compact` and `comfortable` densities.

Fixed and absolute bars do not reserve page space. The application must provide
its own content offset. Toolbar is a layout region, not an ARIA toolbar.

Stable hooks are `.brick-app-bar`, `.brick-app-bar-toolbar`,
`.brick-app-bar-start`, `.brick-app-bar-center`, and `.brick-app-bar-end` plus
Atom slots and Brick state data attributes.

See [CHANGELOG.md](CHANGELOG.md).
