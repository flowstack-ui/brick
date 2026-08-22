# Icon Button

IconButton presents one named icon-only action or a button-styled native link
with finished Brick geometry and recipes over public Atom Button behavior.

## When and where to use

Use IconButton for compact, recognizable actions such as search, close,
overflow, or navigation controls where persistent visible text is not
appropriate. Use `href` for a deliberate icon-only navigation link.

## When not to use

- Use Button when the action has a visible text label.
- Use Toggle when the control retains a pressed state.
- Use an ordinary icon or image for decoration without interaction.
- Use a menu item for an action inside a menu.
- Do not rely on Tooltip as the control's only accessible name.

## Installation and imports

```tsx
import { IconButton } from "@flowstack-ui/brick/icon-button";
import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/icon-button.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


`IconButton` and its public types are also exported from
`@flowstack-ui/brick`.

## Quick start

```tsx
<IconButton aria-label="Search workspace" onPress={() => openSearch()}>
  <SearchIcon />
</IconButton>
```

## Anatomy and DOM ownership

The root defaults to `<button type="button">`. Supplying `href` renders a
native `<a>`. The ref targets the rendered `HTMLElement` because composition
can change its exact element type.

Without `asChild`, Brick adds one private decorative wrapper:

```html
<span aria-hidden="true" class="brick-icon-button__icon">…</span>
```

With `asChild`, the consumer element becomes the root and receives the Brick
class and data contract without that wrapper. Loading adds only a CSS
pseudo-element and does not replace the accessible name.

## API

Public exports are `IconButton`, `IconButtonProps`, `IconButtonVariant`,
`IconButtonTone`, `IconButtonSize`, and `IconButtonShape`. The three recipe
aliases reuse Button's closed variant, tone, and size unions.

`IconButtonProps` forwards Atom Button props and supported native, global,
ARIA, and data props except native `color`.

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `solid`, `soft`, `outline`, `ghost` | `ghost` |
| `tone` | `neutral`, `accent`, `info`, `success`, `warning`, `danger` | `neutral` |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `md` |
| `shape` | `rounded`, `circle` | `rounded` |
| `disabled`, `loading` | boolean | `false` |
| `href` | string | none |
| `onPress` | Atom press callback | none |
| `asChild` | boolean | `false` |
| `render` | Atom render value/callback | none |

`asChild: true` requires one React element and is mutually exclusive with
`render`; the ordinary path accepts `ReactNode`. The product contract requires
one visible icon even though React's node type cannot enforce visual content.
IconButton has no visible-text mode, icon registry, inferred name, or
pressed-state API.

## Visual recipes and states

- `solid` is the highest local emphasis.
- `soft` is a quieter filled treatment.
- `outline` provides a visible transparent boundary.
- `ghost` is the default, lowest standalone emphasis.

All four variants support all six tones. Sizes are square 28, 36, 44, 52, and
60 CSS pixels with 14, 16, 18, 20, and 24 CSS-pixel icon boxes. `rounded` uses
the control radius; `circle` uses the full radius.

Neutral solid controls use a strong neutral surface and the normal foreground,
not an appearance-inverting black/white treatment.

Disabled IconButtons use the disabled foreground and reduced opacity so they do
not resemble an enabled neutral outline action.

Hover is limited to fine hover-capable pointers. Focus-visible uses the global
focus ring. Disabled uses a subdued surface. Loading hides the visible icon,
retains the square footprint and accessible name, exposes `aria-busy`, and
centers a CSS spinner in LTR and RTL. Reduced motion removes transitions and
slows the spinner; forced colors restores system boundaries and focus.

## Tokens and CSS hooks

Stable hooks are `.brick-icon-button`, `.brick-icon-button__icon`, overridable
`data-slot="button"`, visual `data-variant`, `data-tone`, `data-size`,
`data-shape`, and Atom's `data-disabled` and `data-loading` states.

Public component tokens:

```text
--brick-icon-button-size
--brick-icon-button-icon-size
--brick-icon-button-radius
--brick-icon-button-background
--brick-icon-button-background-hover
--brick-icon-button-background-pressed
--brick-icon-button-border-color
--brick-icon-button-foreground
--brick-icon-button-spinner-color
--brick-icon-button-tone-solid
--brick-icon-button-tone-solid-hover
--brick-icon-button-tone-solid-pressed
--brick-icon-button-tone-on-solid
--brick-icon-button-tone-soft
--brick-icon-button-tone-soft-hover
--brick-icon-button-tone-soft-pressed
--brick-icon-button-tone-on-soft
--brick-icon-button-tone-border
--brick-icon-button-tone-text
```

## Customization

Prefer visual props, then semantic token scopes, then selective component
tokens. `className`, `style`, and `data-slot` remain local escape hatches.

```tsx
import type { CSSProperties } from "react";

const customIconButtonStyle = {
  "--brick-icon-button-background": "#6b2f88",
  "--brick-icon-button-background-hover": "#7d3b9c",
  "--brick-icon-button-background-pressed": "#58266f",
  "--brick-icon-button-border-color": "#6b2f88",
  "--brick-icon-button-foreground": "#ffffff",
} as CSSProperties;

<IconButton
  aria-label="Search workspace"
  style={customIconButtonStyle}
  variant="solid"
>
  <SearchIcon />
</IconButton>
```

Consumers overriding colors must verify rest, hover, pressed, focus, inactive,
light, dark, and forced-color presentation.

## Responsive behavior

IconButton uses equal logical inline/block sizing and a matching flex basis, so
it remains square instead of shrinking in constrained flex layouts. It does
not become full width. Logical positioning preserves geometry in LTR and RTL.

The default 44 CSS-pixel target is the general touch-safe baseline. Dense
`xs` and `sm` controls require adequate surrounding target spacing and should
not become the unreviewed mobile default.

## Accessibility

Every IconButton needs a complete name through `aria-label`,
`aria-labelledby`, or an equivalent native relationship. The visible icon is
decorative to accessibility APIs; do not depend on its SVG title or image
alternative text for the control name.

Use the default action path for commands and `href` for navigation. Atom owns
button/link semantics, native form behavior, keyboard activation, inactive
guards, safe external-link relationships, and refs. Brick supplies visible
focus, touch geometry, contrast-tested recipes, forced-color boundaries, and
the absence of duplicate icon naming.

Tooltip may supplement an unfamiliar control but never replaces its complete
accessible name. Use Toggle rather than `aria-pressed` IconButton for a
persistent selected state.

## Composition, native props, and refs

Use direct `href` for ordinary navigation:

```tsx
<IconButton aria-label="Open account" href="/account" variant="outline">
  <AccountIcon />
</IconButton>
```

Use `render` for a compatible rendered element and reserve `asChild` for a
permissive custom adapter that forwards its ref and native props:

```tsx
<IconButton
  aria-label="Rendered account link"
  render={<a href="/account" />}
>
  <AccountIcon />
</IconButton>

<IconButton aria-label="Custom account link" asChild>
  <PermissiveLink href="/account"><AccountIcon /></PermissiveLink>
</IconButton>
```

Native button/form props, ARIA/data attributes, events, `className`, `style`,
slot, and the broad `HTMLElement` ref are forwarded. Atom removes navigation
destinations while composed links are disabled or loading.

## Examples

```tsx
<IconButton aria-label="Close dialog"><CloseIcon /></IconButton>

<IconButton aria-label="Delete project" tone="danger" variant="soft">
  <TrashIcon />
</IconButton>

<IconButton aria-label="Loading search" loading tone="accent" variant="solid">
  <SearchIcon />
</IconButton>
```

The playground exercises defaults, every recipe and size, both shapes, all
three link paths, inactive states, icon naming, appearance, customization,
constrained layouts, reduced motion, forced colors, and RTL loading.

## Evidence

- playground route: `/icon-button`
- [playground scenarios](../../../playground/src/components/icon-button/IconButtonPage.tsx)
- [component test](../../../test/components/icon-button/icon-button.test.tsx)
- [type owner](../../../test/types/components/icon-button.test.ts)
- [browser specification](../../../playground/tests/components/icon-button/behavior.spec.ts)
- [visual specification](../../../playground/tests/components/icon-button/visual.spec.ts)
- [manual-test protocol](../../../playground/manual-tests/icon-button.md)
- [consumer integration](../../../apps/consumer/src/App.tsx)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
