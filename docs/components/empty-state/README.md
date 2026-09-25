# EmptyState

## When and where to use

A collection or workspace has no content to display. Supply meaningful copy
and a useful next step appropriate to first use, filtering or permissions.

## When not to use

Use Spinner or Skeleton while loading, Alert for emphasized durable errors,
and ordinary content components when there is no empty-state relationship.

## Installation and imports

```tsx
import { EmptyState } from "@flowstack-ui/brick/empty-state";
import "@flowstack-ui/brick/styles.css";
```

Alternatively use modular CSS without mixing delivery modes:

```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/empty-state.css";
```

## Quick start

```tsx
<EmptyState.Root>
  <EmptyState.Content>
    <EmptyState.Title>No projects yet</EmptyState.Title>
    <EmptyState.Description>Create a project to organize your work.</EmptyState.Description>
  </EmptyState.Content>
</EmptyState.Root>
```

## Anatomy and DOM ownership

Root, Content and Indicator render div. Title renders h3 and Description p.
Parts are optional. Public classes are brick-empty-state,
brick-empty-state-content, brick-empty-state-indicator, brick-empty-state-title
and brick-empty-state-description. Matching slots omit the brick- prefix.

## API

| Prop | Values | Default |
| --- | --- | --- |
| `size` | `ResponsiveValue<"sm" \| "md" \| "lg">` | `md` |
| `align` | `ResponsiveValue<"start" \| "center">` | `center` |
| `as` on Title | `h1`, `h2`, `h3`, `h4`, `h5`, `h6` | `h3` |

Exports: EmptyState, EmptyStateRoot, EmptyStateContent, EmptyStateIndicator,
EmptyStateTitle, EmptyStateDescription, EmptyStateRootProps,
EmptyStateContentProps, EmptyStateIndicatorProps, EmptyStateTitleProps,
EmptyStateDescriptionProps, EmptyStateSize, EmptyStateAlign and EmptyStateTitleElement.
Size and alignment accept scalar or sparse responsive recipes. There is no loading, empty, error, copy
bundle or action shortcut API.
EmptyStateAlign values are `start` and `center`; EmptyStateSize values are `sm`, `md`, and `lg`.

## Visual recipes and states

At the default root size, sm/md/lg inline padding is 16/32/48px, block padding
24/48/64px, content gap16/24/32px, title16/18/20px and icon24/36/60px.
Title line height is24/28/30px. Description stays14px/21px secondary, retaining
Brick's shared body-sm typography; title is semibold primary. Root has no fill,
border, radius or viewport height. Compose Card/Surface for paint. Start alignment
uses logical direction. The indicator is nonshrinking and square.

## Tokens and CSS hooks

Attributes: `data-size`, `data-align`, `data-slot`, and responsive size/align
suffixes `-sm`, `-md`, `-lg`, `-xl`. Variables:
--brick-empty-state-inline-padding, --brick-empty-state-block-padding,
--brick-empty-state-gap, --brick-empty-state-indicator-size,
--brick-empty-state-title-size, --brick-empty-state-title-line-height,
--brick-empty-state-title-color,
--brick-empty-state-description-color, --brick-empty-state-indicator-color.
Defaults resolve from semantic typography, space and text tokens. Forced colors
retain system foreground. No local palette replaces the Theme.

## Customization

Use size and alignment first, then documented variables on the Root. Indicator
is for a glyph, not large artwork. Compose Image/Frame as ordinary content for
an illustration; author its alternative text according to meaning.

## Responsive behavior

Root fills its parent without adding a max width or minimum height. Content
wraps naturally. Frame/Stack/Grid own application sizing and responsive action
layout. Size means visual density, not a breakpoint. Responsive values use
`initial`, `sm` (30rem), `md` (48rem), `lg` (64rem), and `xl` (80rem).
Sparse values carry forward; omitted initial values use md size and center alignment.

```tsx
<EmptyState.Root size={{ initial: "sm", md: "lg" }} align={{ md: "start" }}>
  <EmptyState.Content>
    <EmptyState.Title>No results</EmptyState.Title>
  </EmptyState.Content>
</EmptyState.Root>
```

When combining title, description, icon and actions, group Title and Description
inside VStack gap={2}. Content's larger gap separates that text group from the
indicator and ButtonGroup. EmptyState does not own action styles or filtering.

## Accessibility

Choose Title's heading level to fit the document. No implicit live role,
focus change, keyboard handler or data detection is added. Keep a persistent
localized status message outside action-containing content when result changes
need announcing. Redundant Icon glyphs can stay decorative; the slot does not
silence explicitly named authored images. Actions retain their native names.

## Composition, native props, and refs

Non-heading parts accept one valid asChild host with merged class/style and refs;
refs target the actual HTMLElement. Title accepts heading tags only and forwards
an HTMLHeadingElement ref. Native attributes and data-slot pass through. Root
omits native align/color in favor of the recipe and Theme. Recipe props never
reach native DOM attributes. In Table, render inside a valid Cell with colSpan.

## Examples

```tsx
<EmptyState.Root size="sm" align="start"><EmptyState.Title as="h2">No matches</EmptyState.Title></EmptyState.Root>
```

## Evidence

- [Unit](../../../test/components/empty-state/empty-state.test.tsx)
- [Types](../../../test/types/components/empty-state.test.ts)
- [Browser](../../../playground/tests/components/empty-state/behavior.spec.ts)
- [Visual](../../../playground/tests/components/empty-state/visual.spec.ts)
- [Manual](../../../playground/manual-tests/empty-state.md)
- [Playground](../../../playground/src/components/empty-state/EmptyStatePage.tsx)

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
