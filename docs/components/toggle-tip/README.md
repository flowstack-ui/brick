# ToggleTip

Compact optional help opened with click, tap or keyboard activation. Reuses
Popover behavior; it is a dialog, not a hover tooltip. Use Tooltip for passive
descriptions and Popover for forms or larger workflows. Essential help stays visible.

## When and where to use

Use for optional concise information opened intentionally, including touch.

## When not to use

Use visible text for essential help, Tooltip for passive hints, and Popover for forms.

## Installation and imports

```tsx
import "@flowstack-ui/brick/styles.css";
// Or modular styles:
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/toggle-tip.css";
```

## Quick start

```tsx
import { Button, ToggleTip } from "@flowstack-ui/brick";
// Also available from @flowstack-ui/brick/toggle-tip.

<ToggleTip.Root>
  <ToggleTip.Trigger asChild><Button>Storage help</Button></ToggleTip.Trigger>
  <ToggleTip.Portal>
    <ToggleTip.Content aria-label="Storage help">
      <ToggleTip.Body>Storage is shared across your workspace.</ToggleTip.Body>
      <ToggleTip.Arrow />
    </ToggleTip.Content>
  </ToggleTip.Portal>
</ToggleTip.Root>
```

Load `styles.css`, or `core.css` plus `toggle-tip.css` and trigger styles.
The modular entry includes Popover and floating-arrow CSS.

## Anatomy and DOM ownership

Root renders no wrapper. Trigger is the named button; Content is the positioned
dialog div. Body is a padding/scroll div. Title and Description register their
relationships through Atom. Arrow is a decorative SVG directly under Content.
Portal renders no wrapper. State and RootProvider render no visual structure.

## API

Types: ToggleTipSize, ToggleTipRootProps, ToggleTipContentProps,
ToggleTipBodyProps, UseToggleTipOptions, UseToggleTipReturn,
ToggleTipTriggerProps, ToggleTipPortalProps, ToggleTipAnchorProps,
ToggleTipArrowProps, ToggleTipCloseProps, ToggleTipTitleProps,
ToggleTipDescriptionProps and ToggleTipRootProviderProps.

| Prop | Default | Values |
| --- | --- | --- |
| `size` | `xs` | `xs`, `sm`, `md`, `lg` |
| `radius` | `sm` | Radius |

Root uses PopoverRootProps, defaults positioning.gutter to 4, and honors explicit
positioning overrides. State, RootProvider, Anchor, Trigger, Portal, Title,
Description, Close, Arrow and Indicator reuse their public Popover contracts.
`useToggleTip(options)` is the click-only controller with the same gap default;
`useToggleTipState` reads it. Pass the original controller to RootProvider.

Content forwards PopoverContentProps except size, density and inset. Its size
is `xs | sm | md | lg`, default `xs`; radius is `Radius`, default `sm`.
The forwarded ref targets its positioned div (or composed host). Body forwards
PopoverBodyProps and an HTMLElement ref. Native props, className, style,
asChild/render and focus targets retain Popover behavior. Exported named
adapters: ToggleTipRoot, ToggleTipContent, ToggleTipBody.

## Visual recipes and states

### Overlay arrow contract

Overlay arrows share a 12px square-equivalent seed (--brick-overlay-arrow-size), exposed-edge artwork and owner surface/border paint. Prefer the shipped Arrow; do not add directional filters or translations. SVG Arrow width/height remain supported; positioning gutter measures the empty gap to the tip. Explicit positioning.offset remains raw. ToggleTip inherits Popover; Select/MultiSelect retain span hosts. NavigationMenu Indicator remains separately positioned.


| Size | Typography | Inline / block padding at default scale |
| --- | --- | --- |
| xs | caption | 8 / 4px |
| sm | body-sm | 12 / 8px |
| md | body-md | 16 / 12px |
| lg | body-lg | 20 / 16px |

Width is intrinsic, bounded by the small Popover measure and viewport. Body
owns padding and scrolling. Put Title and Description inside Body. Title
uses same-size semibold text; Description is secondary. Arrow stays directly
under Content, outside the viewport. No icon or close action is generated.
Compose IconButton for an information trigger; its accessible name is required.

## Tokens and CSS hooks

Hooks: `.brick-toggle-tip`, `.brick-toggle-tip__body`, `data-tip-size`, and the
inherited Popover classes/data slots. Reuse the documented Popover background,
foreground, border, shadow and radius tokens. The owned spacing variables are
`--brick-toggle-tip-inline-space` and `--brick-toggle-tip-block-space`.

## Customization

Prefer size and radius props. Semantic tokens keep arrow and panel coordinated.
No custom application CSS is needed for compact geometry.

## Responsive behavior

Intrinsic width wraps within Popover's small measure and available viewport.
Body scrolls when constrained. Logical padding supports RTL. No viewport-based
behavior switching. Reduced motion and forced colors reuse Popover's recipe.

## Accessibility

Content requires Title or aria-label/aria-labelledby. Trigger has its own name.
Popover owns open/defaultOpen/onOpenChange, focus, Escape/outside dismissal,
keyboard, touch, layering, controlled state, positioning and presence. Short
links/actions are allowed. Do not override role to tooltip. Supply Close when
ordinary dismissal is disabled; modal is supported but normally use Popover.
Root portalled controls focus guards; Portal disabled controls relocation.
Use both for inline content. Local Appearance needs a local portal target or
an explicit scope on Content. Retained closed content stays hidden/inert.

## Composition, native props, and refs

Native props, refs, className/style and asChild/render reach their owned hosts.
Do not replace the positioning engine or add a nested button inside Trigger.
Preserve semantic type Button/IconButton and its independently supplied name.

## Examples

The route shows Basic, Info, Sizes, Arrow, Escape, Outside, Controlled,
Placement, Radius, Link, Inline, Lifecycle, Dialog and Store. Every example
uses the same executable source shown in its Code tab.

## Evidence

- [Examples](../../../playground/src/components/toggle-tip/)
- [Unit](../../../test/components/toggle-tip/)
- [Types](../../../test/types/components/toggle-tip.test.ts)
- [Browser](../../../playground/tests/components/toggle-tip/behavior.spec.ts)
- [Visual](../../../playground/tests/components/toggle-tip/visual.spec.ts)
- [Manual](../../../playground/manual-tests/toggle-tip.md)

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
