# Float

Float.Root attaches authored content across a local container edge without contributing to layout size. Float.Anchor supplies an optional unpainted positioned parent.

## When and where to use

Use Float for a local edge-attached badge, status or independent action.

## When not to use

Use ZStack for in-flow layers, Bleed for crossing padding, NotificationBadge for counts and Popover for interactive overlays.

## Installation and imports

```tsx
import { Float } from "@flowstack-ui/brick/float";
import "@flowstack-ui/brick/styles.css";
```

For modular delivery:

```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/float.css";
```

## Quick start

```tsx
import { Badge, Float, Surface, Text } from "@flowstack-ui/brick";

export function Example() {
  return (
    <Float.Anchor>
      <Surface inset="lg"><Text>Workspace</Text></Surface>
      <Float.Root><Badge tone="accent">New</Badge></Float.Root>
    </Float.Anchor>
  );
}
```

Use NotificationBadge for count/dot formatting, ZStack for in-flow layered sizing, and Bleed for crossing padding. Float is not a popup, viewport overlay or CSS float/clear.

## Anatomy and DOM ownership

Float.Root renders .brick-float with data-slot="float".
Float.Anchor renders .brick-float-anchor with data-slot="float-anchor".
Both default to div and forward a ref to the actual host.

## API

Exports: Float, FloatRoot, FloatAnchor, FloatRootProps, FloatAnchorProps, FloatPlacement, FloatOffset, FloatElement.
Imports: package root or @flowstack-ui/brick/float.

| Part/prop | Default | Values and behavior |
| --- | --- | --- |
| Float.Root | div | Absolute inline-flex host, centered contents; no space allocated in parent |
| Float.Anchor | div | Relative containing block; no paint, padding, clipping or isolation |
| `placement` | `top-end` | ResponsiveValue<FloatPlacement> |
| offset | 0 | ResponsiveValue<FloatOffset>; uniform signed edge inset |
| offsetInline | undefined | Independent responsive inline override |
| offsetBlock | undefined | Independent responsive block override |
| `inline` | `false` | Anchor inline-block content sizing; parent flex/grid alignment still applies |
| `as` | `div` | FloatElement; mutually exclusive with asChild |
| `asChild` | `false` | Exactly one element; preserves classes, styles, refs and handlers |
| slot | float / float-anchor | data-slot override |
| className, style, ref | undefined | Actual host customization/ref |

FloatPlacement: top-start, top-center, top-end, middle-start, middle-center,
middle-end, bottom-start, bottom-center, bottom-end. FloatElement: div, span,
section, article, aside, main, header, footer, nav, ul, ol, li.
FloatOffset is number | string. Native attributes and ARIA pass through;
layout props do not become native attributes.

## Visual recipes and states

Float is geometry-only. Paint, radius, typography, size and interactive states belong to composed components.

## Tokens and CSS hooks

Public classes: .brick-float and .brick-float-anchor. `data-slot`, `data-placement` and responsive placement attributes identify geometry; `data-inline` selects intrinsic anchor display. Internal --brick-float-* variables are not public Theme tokens.

## Customization

Prefer supported placement and offset props. Use Surface for paint, Frame for constraints and Badge for labels. className/style remain escape hatches, not a second styling-prop system.

## Responsive behavior

At zero offset, the floating element's center is on the selected edge/corner.
Positive values move inward, negative values outward. Centered axes ignore
their offsets. Percentages refer to the containing padding box. Start/end
mirror in RTL, including translation signs; this release claims horizontal
writing modes with LTR/RTL, not vertical-writing parity.

Numbers multiply space-1. Numeric strings retain Brick spacing semantics:
"3" selects space-3, whereas 3 means three base units. Negative numeric strings
negate the matching token. Explicit CSS lengths, percentages and calc/var
length-percentage expressions are supported. Empty strings and non-finite
numbers warn and fall back to zero; invalid CSS strings are caller errors.

ResponsiveValue accepts a scalar or a non-empty object with initial/sm/md/lg/xl
(30/48/64/80rem). Omitted initial retains defaults. Each axis overrides uniform
values independently, including zero, and carries forward until its own next
value. Nested roots reset their offset inputs.

## Accessibility

Anchor needs in-flow content or definite Frame dimensions. Inline does not
override parent stretch. Root may use another deliberately positioned ancestor
without Anchor. Keep base content before floats in source order. No context,
portal, measurement, resize observer, state machine or JavaScript breakpoint
logic is used. Server rendering produces the same layout props.

Avatar clips its contents: put Avatar and Float.Root beside each other inside
Anchor, not the float inside Avatar. Ancestor overflow still clips. Float does
not guarantee viewport containment or cover higher stacking layers; its local
z-index is auto. Reserve enough composition space for deliberate overhang.

Float adds no role, tabIndex, aria-hidden, live region, focus handling or
disabled state. Name meaningful content; hide only decorative duplicates.
Keep independent actions as siblings of other controls. Preserve focus rings
and pointer access. Never place focusable descendants under aria-hidden.
Keep the Root wrapper when a child owns transforms/position/display. Use
asChild only on a compatible host that can own absolute placement.

## Composition, native props, and refs

Load styles.css, or styles/core.css plus styles/float.css and each composed
child's CSS. Public hooks: .brick-float, .brick-float-anchor, data-slot,
data-placement and responsive data-placement-sm/md/lg/xl, data-inline.
Float adds no tone, radius, size, shadow, background, motion or interaction
recipe. Compose Badge, Surface, Frame, Circle, Square or Icon. Existing spacing
tokens supply numeric offsets. Internal --brick-float-* variable transport is
not a Theme schema or customization contract. The optional style/className
escape hatch must not replace supported layout props.

Light/dark, reduced motion, forced colors, loading and focus appearance remain
owned by the composed content. Native hidden hides either part.

## Examples

The source-paired /float route contains Basic, Placement, Offsets, Avatar, Responsive, Inline anchor and Composition examples.

## Evidence

- Unit: test/components/float/float.test.tsx
- Types: test/types/components/float.test.ts
- Browser and visual: playground/tests/components/float/
- Playground: /float; qualification=1 exposes geometry fixtures
- Manual: playground/manual-tests/float.md
- Consumer: apps/consumer/src/FloatExample.tsx

Automated measurements are not manual screen-reader or physical-device evidence.


- [Playground](../../../playground/src/components/float/)
- [Unit](../../../test/components/float/)
- [Types](../../../test/types/components/float.test.ts)
- [Browser](../../../playground/tests/components/float/behavior.spec.ts)
- [Visual](../../../playground/tests/components/float/visual.spec.ts)
- [Manual](../../../playground/manual-tests/float.md)

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
