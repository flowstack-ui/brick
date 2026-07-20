# Popover

Popover presents a compact interactive panel opened intentionally from a named
trigger and positioned near its context. Atom owns dialog semantics, state,
focus, dismissal, nesting, portals, positioning, and native ARIA. Brick supplies
one elevated surface, three bounded widths, structural layout, and shared Arrow
styling.

## Use

Use Popover for compact settings, small forms, filters, pickers, or a few
contextual actions. Use Tooltip or HoverCard for non-interactive supplemental
content, Menu for commands, and Dialog or Drawer for larger or consequential
workflows.

```tsx
import { Button, Popover } from "@flowstack-ui/brick";
import "@flowstack-ui/brick/styles.css";

export function ProjectSettings() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button variant="outline">Project settings</Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content size="md">
          <Popover.Title>Project settings</Popover.Title>
          <Popover.Description>
            Change compact options without leaving the workspace.
          </Popover.Description>
          <Popover.Body>{/* application controls */}</Popover.Body>
          <Popover.Footer>
            <Popover.Close asChild><Button>Done</Button></Popover.Close>
          </Popover.Footer>
          <Popover.Arrow />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
```

Keep Title and Description as direct Content children for deterministic
server-rendered relationships. Header is an optional visual wrapper; when used,
put native heading/paragraph elements with explicit IDs inside it and pass
matching native `aria-labelledby`/`aria-describedby` to Content. Do not nest
Popover.Title/Description inside Header because Atom intentionally owns their
generated IDs.

## API

The frozen namespace contains exactly `Root`, `Anchor`, `Trigger`, `Portal`,
`Content`, `Header`, `Title`, `Description`, `Body`, `Footer`, `Close`, and
`Arrow`. Root supports click/press/keyboard activation only; Brick omits Atom's
hover mode and timing props. Content forwards native ARIA, controlled focus,
side/alignment, and adds `size="sm|md|lg"` with `md` default. Modal mode requires
a visible Close path.

Header, Body, and Footer are presentational and support native props, refs,
`asChild`, and `render`. Arrow and Close are explicit. An icon-only Close needs
an application-supplied native `aria-label`.

## Hooks and customization

Stable slots are `popover`, `popover-anchor`, `popover-trigger`,
`popover-header`, `popover-title`, `popover-description`, `popover-body`,
`popover-footer`, `popover-close`, and `popover-arrow`. Content exposes
`data-size`; Atom supplies state, side, and positioned data.

Component tokens control background, foreground, muted foreground, border,
radius, shadow, spacing, three maximum inline sizes, and maximum block size.
Preserve focus visibility, contrast, viewport containment, zoom reflow, RTL,
reduced motion, forced colors, and visible dismissal when customizing.
