# Accordion

Accordion coordinates named, in-flow disclosure sections with single or
multiple selection, accessible keyboard navigation, and finished surfaces.

## When and where to use

Use Accordion for settings, FAQs, filters, or grouped details where section
headings stay visible and their panels belong to one set.

## When not to use

Use Collapsible for one independent disclosure. Use Tabs when panel changes
should not alter layout length. Use Dialog, Drawer, Popover, or Menu for layers.

## Installation and imports

```tsx
import { Accordion } from "@flowstack-ui/brick/accordion";
import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/accordion.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


## Quick start

```tsx
<Accordion.Root defaultValue="account">
  <Accordion.Item value="account">
    <Accordion.Header>
      <Accordion.Trigger>Account <Accordion.Indicator /></Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Content>
      <Accordion.ContentInner>Account settings</Accordion.ContentInner>
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

## Anatomy and DOM ownership

Root, Item, Header, Trigger, and Content adapt Atom behavior. Indicator is a
decorative `span`. ContentInner owns padding so Content remains an accurate
height- or width-animation boundary.

## API

Public parts are `Root`, `Item`, `Header`, `Trigger`, `Indicator`, `Content`,
and `ContentInner`.
Named exports are `AccordionRoot`, `AccordionItem`, `AccordionHeader`,
`AccordionTrigger`, `AccordionIndicator`, `AccordionContent`, and
`AccordionContentInner`. Their types are `AccordionRootProps`,
`AccordionItemProps`, `AccordionHeaderProps`, `AccordionTriggerProps`,
`AccordionIndicatorProps`, `AccordionContentProps`,
`AccordionContentInnerProps`, `AccordionVariant`, and `AccordionSize`.

| Root prop | Values | Default |
| --- | --- | --- |
| `type` | `single`, `multiple` | `single` |
| `value` / `defaultValue` | string or string array matching `type` | none |
| `collapsible` | `boolean` | `true` |
| `disabled` | `boolean` | `false` |
| `orientation` | `vertical`, `horizontal` | `vertical` |
| `dir` | `ltr`, `rtl` | direction context |
| `variant` | `plain`, `soft`, `outline` | `plain` |
| `size` | `sm`, `md`, `lg` | `md` |

Item requires a unique `value` and supports `disabled`. Header supports `h1`
through `h6`. Content supports `keepMounted` and `landmark`; landmark defaults
to true, while false omits `role="region"` and `aria-labelledby`. Atom-backed
parts preserve native props, refs, `render`, and `asChild`. Indicator children
replace its default artwork.

## Visual recipes and states

Plain uses dividers without containing paint, soft adds a subtle group surface,
and outline adds one containing border. Sizes coordinate trigger height,
typography, indicator, and panel padding. A locked-open single trigger remains
focusable with `aria-disabled="true"` and `data-locked-open`.

The default decorative Indicator points down while its Item is closed and up
while it is open. This vertical state cue stays the same in LTR and RTL.

Grouped vertical recipes use the Root as the outer silhouette: interior Trigger
edges stay square, only the exposed first and last corners follow the Root
radius, and keyboard focus remains fully visible outside that silhouette.
Horizontal groups own inline scrolling, so their Trigger focus ring is inset
inside the control rather than clipped by the scroll boundary.

## Tokens and CSS hooks

Stable classes use `.brick-accordion*`. Root exposes `data-variant`,
`data-size`, and `data-orientation`; Atom parts expose `data-state`,
`data-disabled`, orientation, and `data-slot` hooks. Supported variables are
`--brick-accordion-background`, `--brick-accordion-border-color`,
`--brick-accordion-divider-color`, `--brick-accordion-trigger-background`,
`--brick-accordion-trigger-hover-background`,
`--brick-accordion-trigger-open-background`, `--brick-accordion-foreground`,
`--brick-accordion-content-foreground`, `--brick-accordion-focus-ring`,
`--brick-accordion-radius`, `--brick-accordion-trigger-height`,
`--brick-accordion-horizontal-height`,
`--brick-accordion-trigger-padding-inline`,
`--brick-accordion-content-padding-block`,
`--brick-accordion-content-padding-inline`, and
`--brick-accordion-indicator-size`.

## Customization

Set the documented `--brick-accordion-*` variables on Root to customize one
group or a scoped tree. Keep selection, state, orientation, and measurement
attributes under component ownership.

## Responsive behavior

Vertical panels animate measured height. Horizontal Items form an inline
sequence of vertical trigger rails beside normally oriented Content; panels
animate measured width toward inline-end while inner geometry stays stable.
That means Content opens rightward in LTR and leftward in RTL. Narrow groups
own inline scrolling and never create page overflow. RTL also reverses reading
order and horizontal arrow direction. Reduced motion removes panel and
indicator motion.

## Accessibility

Atom supplies heading-contained buttons, expanded state, generated IDs,
controls/label relationships, activation, roving arrow navigation, Home/End,
disabled behavior, and direction-aware horizontal keys. Set `landmark={false}`
only when many open regions would create excessive landmark noise.

## Composition, native props, and refs

Atom-backed parts preserve their `render` and `asChild` contract, event
composition, native attributes, classes, styles, slots, and refs. Indicator and
ContentInner remain fixed styled hosts.

## Examples

See the [component playground](../../../playground/src/components/accordion/)
for defaults, recipes, selection, states, orientations, keyboard behavior,
composition, output, appearance, customization, RTL, and responsive stress.

## Evidence

- [Unit tests](../../../test/components/accordion/)
- [Type tests](../../../test/types/components/accordion.test.ts)
- [Browser behavior](../../../playground/tests/components/accordion/behavior.spec.ts)
- [Visual evidence](../../../playground/tests/components/accordion/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/accordion.md)

## Changelog

See [Accordion changelog](CHANGELOG.md).
