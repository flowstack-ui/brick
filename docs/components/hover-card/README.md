# HoverCard

HoverCard presents a nonessential, non-interactive preview for a genuine link.
Atom owns state, hover/focus persistence, Escape, timing, portals, positioning,
collision, presence, native props, refs, and composition. Brick supplies one
neutral elevated surface, three bounded widths, and shared Arrow styling.

## Use

Use HoverCard to preview a profile, document, project, or resource whose
essential information remains available at the destination or visibly on the
page. Use Tooltip for a short supplemental description and Popover for
intentionally opened interactive content. Never place links, buttons, inputs,
menus, required instructions, validation, or recovery actions in HoverCard.

```tsx
import { Avatar, HoverCard } from "@flowstack-ui/brick";
import "@flowstack-ui/brick/styles.css";

export function ProfileLink() {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        <a href="/people/ada">Ada Lovelace</a>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content size="md">
          <Avatar alt="" fallback="AL" />
          <strong>Ada Lovelace</strong>
          <p>Mathematician and early computing author.</p>
          <HoverCard.Arrow />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
```

The preview duplicates or summarizes destination content. Touch activates the
link normally; HoverCard does not invent a long-press gesture or promise the
preview to screen readers.

## API

The frozen namespace contains exactly `Root`, `Trigger`, `Portal`, `Content`,
and `Arrow`. Root forwards Atom's controlled/uncontrolled state, `disabled`,
`openDelay` (700 ms default), and `closeDelay` (300 ms default). Trigger
forwards `asChild`/`render`; a genuine link through `asChild` is the normal
path. Portal forwards body/custom-container/inline modes. Content keeps Atom's
8px side offset and adds `size="sm|md|lg"`, default `md`, with preferred maximum
widths of 16, 20, and 24rem. Arrow is explicit and optional.

Content remains a generic `div`: it has no popup role, accessible name,
expanded state, trigger relationship, or managed focus. Brick intentionally
omits Atom Content's accessible-label escape hatch because no screen-reader
relationship exists.

## Hooks and customization

Stable slots are `hover-card-trigger`, `hover-card`, and `hover-card-arrow`;
matching classes are `.brick-hover-card__trigger`, `.brick-hover-card`, and
`.brick-hover-card__arrow`. Content exposes `data-size`; Atom supplies
`data-state`, final `data-side`, and `data-positioned`.

Component tokens cover background, foreground, muted foreground, border,
radius, shadow, padding, gap, three maximum inline sizes, and maximum block
size. Preserve contrast, viewport containment, RTL, reduced motion, forced
colors, zoom reflow, focus visibility, and the non-interactive content rule
when customizing.
