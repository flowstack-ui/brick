# Tooltip

Tooltip presents a brief supplemental description near one already named
trigger. Atom owns hover, focus, Escape, touch-hold, timing, dismissal,
positioning, portals, semantics, and trigger relationships; Brick supplies the
plain and rich neutral recipes and the shared floating arrow treatment.

## Use

Use Tooltip for an unfamiliar icon action, abbreviation, or compact control.
The trigger must retain its complete accessible name without the Tooltip. Keep
required instructions, validation, warnings, and recovery visible in the page.
Use HoverCard for a larger preview and Popover for interactive content.

```tsx
import { Tooltip } from "@flowstack-ui/brick/tooltip";
import "@flowstack-ui/brick/styles.css";

export function SearchHelp() {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button aria-label="Search workspace">Search icon</button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content side="bottom">
            Search workspace
            <Tooltip.Arrow />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
```

Provider normally wraps an application or coherent region. It forwards Atom's
`openDelay`, `closeDelay`, and `skipDelay`. Root forwards controlled and
uncontrolled state, delays, `disabled`, and `variant="plain|rich"`.

The namespace contains exactly `Provider`, `Root`, `Trigger`, `Portal`,
`Content`, `Title`, `Description`, and `Arrow`. Public controls normally use
`Trigger asChild` so the actual focusable element is the positioning reference.
Content defaults to an 8px side offset and `shape="rounded"`, supports
`shape="pill"`, and forwards Atom's `side` and `align`.

Rounded is the normal readable treatment. Reserve pill for deliberately compact
single-line labels; wrapped and rich content should remain rounded.

## Rich mode

```tsx
<Tooltip.Root variant="rich">
  <Tooltip.Trigger asChild>{trigger}</Tooltip.Trigger>
  <Tooltip.Portal>
    <Tooltip.Content>
      <Tooltip.Title>Ready for review</Tooltip.Title>
      <Tooltip.Description>All required checks passed.</Tooltip.Description>
      <Tooltip.Arrow />
    </Tooltip.Content>
  </Tooltip.Portal>
</Tooltip.Root>
```

Rich remains short and non-interactive. Never place links, buttons, inputs, or
other focusable content inside either recipe.

## Hooks and customization

Stable slots are `tooltip-trigger`, `tooltip`, `tooltip-title`,
`tooltip-description`, and `tooltip-arrow`; matching classes use
`.brick-tooltip` and `.brick-tooltip__*`. Component tokens include background,
foreground, border, shadow, radius, padding, gap, and plain/rich maximum inline
sizes. Prefer those hooks over DOM structure. Appearance, RTL, reduced motion,
forced colors, collision changes, long localization, zoom, and narrow screens
remain required verification contexts.
