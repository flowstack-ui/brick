# Collapsible

Collapsible reveals one independent in-flow content region from a linked
button trigger.

## When and where to use

Use Collapsible for advanced settings, filters, explanations, or secondary
details that should remain available without dominating a page.

## When not to use

Use Accordion for a coordinated set of named sections. Use Dialog, Drawer,
Popover, or Menu when content must layer, dismiss, or manage focus.

## Installation and imports

```tsx
import { Collapsible } from "@flowstack-ui/brick/collapsible";
import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/collapsible.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


## Quick start

```tsx
<Collapsible.Root>
  <Collapsible.Trigger>
    Advanced settings
    <Collapsible.Indicator />
  </Collapsible.Trigger>
  <Collapsible.Content>
    <Collapsible.ContentInner>Settings content</Collapsible.ContentInner>
  </Collapsible.Content>
</Collapsible.Root>
```

## Anatomy and DOM ownership

Root, Trigger, and Content adapt Atom's `div`, `button`, and labelled region.
Indicator is a decorative `span`; ContentInner is a `div` that owns visible
padding so Content remains an accurate height-animation boundary.

## API

Public parts are `Root`, `Trigger`, `Indicator`, `Content`, and `ContentInner`.
Named exports are `CollapsibleRoot`, `CollapsibleTrigger`,
`CollapsibleIndicator`, `CollapsibleContent`, and `CollapsibleContentInner`.
Their types are `CollapsibleRootProps`, `CollapsibleTriggerProps`,
`CollapsibleIndicatorProps`, `CollapsibleContentProps`,
`CollapsibleContentInnerProps`, `CollapsibleVariant`, and `CollapsibleSize`.

| Root prop | Values | Default |
| --- | --- | --- |
| `variant` | `plain`, `soft`, `outline` | `plain` |
| `size` | `sm`, `md`, `lg` | `md` |
| `open` / `defaultOpen` | controlled / initial state | closed |
| `disabled` | `boolean` | `false` |
| `orientation` | `vertical`, `horizontal` | `vertical` |
| `onOpenChange` | `(open) => void` | optional |

Content supports `keepMounted`. Atom-backed parts preserve native props,
callbacks, refs, `render`, and `asChild`. Indicator children replace its
default artwork. Indicator and ContentInner intentionally stay fixed hosts.

## Visual recipes and states

Plain has no containing paint, soft adds a subtle neutral surface, and outline
adds one containing border. Sizes coordinate trigger height, typography,
spacing, indicator size, and ContentInner padding. Open state rotates the
indicator. Vertical Content expands to measured height; horizontal Content
expands to measured width while ContentInner preserves final geometry.

## Tokens and CSS hooks

Stable part classes are `.brick-collapsible`,
`.brick-collapsible-trigger`, `.brick-collapsible-indicator`,
`.brick-collapsible-content`, and `.brick-collapsible-content-inner`.
Root exposes `data-variant`, `data-size`, Atom `data-state`, and
`data-orientation` hooks; Trigger
and Content expose Atom state hooks and every part exposes `data-slot`.

Supported variables include `--brick-collapsible-background`,
`--brick-collapsible-border-color`, `--brick-collapsible-trigger-background`,
`--brick-collapsible-trigger-hover-background`,
`--brick-collapsible-trigger-open-background`,
`--brick-collapsible-foreground`, `--brick-collapsible-content-foreground`,
`--brick-collapsible-focus-ring`, `--brick-collapsible-radius`,
`--brick-collapsible-trigger-height`,
`--brick-collapsible-trigger-padding-inline`,
`--brick-collapsible-trigger-gap`,
`--brick-collapsible-content-padding-block`,
`--brick-collapsible-content-padding-inline`, and
`--brick-collapsible-indicator-size`.

## Customization

Set the documented `--brick-collapsible-*` variables on Root to customize one
instance or a scoped tree. Keep state, orientation, and measurement attributes
under component ownership.

## Responsive behavior

The vertical root follows its container. Horizontal mode sizes to content, is
capped by its container, and owns inline scrolling instead of overflowing the
page. Long trigger labels wrap while the indicator stays at the logical end.
Both measured dimensions remain live. Reduced motion removes disclosure and
indicator motion; RTL preserves logical order and indicator meaning.

## Accessibility

Atom supplies the button, `aria-expanded`, `aria-controls`, generated IDs,
labelled region, Enter/Space behavior, and disabled behavior. Focus remains on
Trigger. Give Trigger a clear content name, keep Indicator decorative, and do
not put another interactive control inside Trigger.

## Composition, native props, and refs

Root, Trigger, and Content preserve Atom's exact `render` and `asChild`
contract, event composition, native attributes, class/style/slot merging, and
refs. Trigger remains `type="button"` and should not be rendered as a link.

## Examples

See the [component playground](../../../playground/src/components/collapsible/)
for defaults, variants, sizes, state, anatomy, composition, appearance,
customization, two-axis measurement, RTL, and responsive stress.

## Evidence

- [Unit tests](../../../test/components/collapsible/)
- [Type tests](../../../test/types/components/collapsible.test.ts)
- [Browser behavior](../../../playground/tests/components/collapsible/behavior.spec.ts)
- [Visual evidence](../../../playground/tests/components/collapsible/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/collapsible.md)

## Changelog

See [Collapsible changelog](CHANGELOG.md).
