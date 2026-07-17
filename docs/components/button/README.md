# Button

Button presents a finished action or a native link with Button emphasis while
public Atom behavior preserves semantics and interaction.

## When and where to use

Use Button for saving, submitting, confirming, continuing, or opening a
workflow. Use `href` when the visually emphasized action navigates.

## When not to use

- Use Link for navigation that should read as ordinary navigation.
- Use the future IconButton for an icon-only action.
- Use Toggle for a persistent pressed/unpressed choice.
- Use variants for normal hierarchy and reserve status tones for real meaning.

## Installation and imports

```tsx
import { Button } from "@flowstack-ui/brick";
// or: import { Button } from "@flowstack-ui/brick/button";
import "@flowstack-ui/brick/styles.css";
```

Brick requires Atom 0.3.2 and React 18 or newer. Button's composed-link
contract was first established against Atom 0.2.1 and remains covered after
the package-wide upgrade.

## Quick start

```tsx
<Button onPress={() => saveProject()}>Save changes</Button>
```

## Anatomy and DOM ownership

Button has one public part and defaults to `<button type="button">`. Supplying
`href` renders `<a>`. The ref targets the rendered `HTMLElement` because
composition can change its exact element type.

Normal content and optional decorative icons use private spans. `asChild`
leaves its child content unchanged. Loading adds only a CSS pseudo-element, so
it adds no accessibility node and does not replace the label.

## API

`ButtonProps` includes Atom Button props and supported native/global/ARIA/data
props, except native `color`.

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `solid`, `soft`, `outline`, `ghost` | `solid` |
| `tone` | `neutral`, `accent`, `info`, `success`, `warning`, `danger` | `accent` |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `md` |
| `shape` | `sharp`, `rounded`, `pill` | `rounded` |
| `fullWidth` | boolean | `false` |
| `startIcon`, `endIcon` | React node | none |
| `disabled`, `loading` | boolean | `false` |
| `href` | string | none |
| `onPress` | mouse event handler | none |
| `asChild` | boolean | `false` |
| `render` | Atom render value/callback | none |

`asChild` and `render` are mutually exclusive. Icon props are not accepted with
`asChild`; place an icon inside the child instead.

## Visual recipes and states

- `solid` is the highest local emphasis.
- `soft` is a quieter filled treatment.
- `outline` is a secondary transparent treatment.
- `ghost` is the lowest standalone emphasis.

All recipes cover rest, capability-gated hover, pressed, focus-visible,
disabled, loading, light, dark, forced-colors, and reduced-motion presentation.
Loading stays focusable, exposes `aria-busy`, blocks activation through Atom,
and retains its accessible content and layout footprint.

Minimum block sizes are 28, 36, 44, 52, and 60 CSS pixels. Dense `xs` and `sm`
are not the mobile default and require adequate target spacing for touch.

## Tokens and CSS hooks

Stable hooks are `.brick-button`, overridable `data-slot="button"`, visual
`data-variant`, `data-tone`, `data-size`, `data-shape`, `data-full-width`, and
Atom's `data-disabled` and `data-loading` states.

Public component tokens:

```text
--brick-button-background
--brick-button-background-hover
--brick-button-background-pressed
--brick-button-foreground
--brick-button-border-color
--brick-button-focus-ring
--brick-button-min-block-size
--brick-button-padding-block
--brick-button-padding-inline
--brick-button-gap
--brick-button-radius
--brick-button-font-size
--brick-button-icon-size
```

## Customization

Prefer visual props, then semantic token scopes, then selective component
tokens. `className` and `style` remain escape hatches.

```css
.checkout-actions { --brick-button-radius: var(--brick-radius-full); }
```

Consumers overriding colors must verify every state and appearance for
contrast; arbitrary overrides are outside Brick's visual guarantee.

## Responsive behavior

Button is mobile-first, wraps labels, grows vertically, uses logical padding,
and never becomes full width automatically. `fullWidth` is unconditional. Use
ordinary application CSS for breakpoint-dependent layout:

```css
.checkout-submit { inline-size: 100%; }
@media (min-width: 48rem) { .checkout-submit { inline-size: auto; } }
```

## Accessibility

Provide meaningful children for the accessible name. Use `href` for navigation
and the default path for actions. Atom owns semantics, forms, events, keyboard,
inactive guards, new-tab relationships, and refs. Brick supplies visible focus,
target size, contrast-tested recipes, forced-color fallback, and visual state.

Loading stays focusable. Put detailed asynchronous status in adjacent live
feedback and connect it with `aria-describedby` when useful.

`startIcon` and `endIcon` are decorative and follow logical content order in
LTR and RTL. Button does not mirror icon artwork: supply the directionally
correct arrow or chevron for the current writing direction.

## Composition, native props, and refs

Use direct `href` for ordinary navigation. Atom renders the native anchor, so
wrapping another native `<a>` with `asChild` is unnecessary:

```tsx
<Button href="/account" variant="outline">Account</Button>
```

`asChild` is reserved for a custom link adapter that forwards its ref and
native props and tolerates inactive navigation props being removed:

```tsx
<Button asChild variant="outline">
  <PermissiveLink href="/account">Account</PermissiveLink>
</Button>
```

Strict router components use Atom's inactive-safe `render` callback and switch
to a destination-free anchor while inactive. Brick does not detect or adapt
routers.

Native form props, ARIA/data attributes, events, `className`, `style`, slot, and
the broad `HTMLElement` ref are forwarded.

## Examples

```tsx
<Button endIcon={<ArrowIcon />}>Continue</Button>
<Button tone="danger" variant="outline">Delete project</Button>
<Button loading aria-describedby="save-status">Save changes</Button>
<span id="save-status">Saving changes</span>
```

The playground exercises every recipe, forms, links, both composition paths,
appearance, customization, constrained content, long labels, and RTL.

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
