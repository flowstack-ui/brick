# Button

Button presents a finished action or emphasized native link. Brick owns its
visual recipes and styling; the public Atom Button owns semantics, interaction,
form behavior, unavailable/loading behavior, and composition.

## When and where to use

Use Button for immediate actions such as saving, submitting, confirming,
cancelling, continuing, opening another surface, or retrying work. Supply
`href` when an emphasized call to action navigates instead of performing an
action.

## When not to use

- Use an ordinary link when navigation should read as navigation rather than a
  prominent action.
- Use [`IconButton`](../icon-button/README.md) for an icon-only action.
- Use [`Toggle`](../toggle/README.md) for persistent pressed/unpressed state.
- Use a component with more specific semantics for menu items, tabs, or
  arbitrary interactive surfaces.
- Use variants for normal hierarchy. Reserve `info`, `success`, `warning`, and
  `danger` tones for actions with that actual meaning.

Button intentionally has no `label`, `iconOnly`, `loadingText`,
`loadingIndicator`, icon registry, arbitrary radius/color, gradient, or
translucent prop.

## Installation and imports

Import Button from the package root or its stable subpath, then load Brick's
compiled stylesheet once in the application:

```tsx
import { Button } from "@flowstack-ui/brick";
// or
import { Button } from "@flowstack-ui/brick/button";

import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/button.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


Brick currently requires React 18 or newer and the package's exact released
Atom dependency.

## Quick start

```tsx
<Button onPress={() => saveProject()}>Save changes</Button>
```

The defaults are `variant="solid"`, `tone="accent"`, `size="md"`,
`shape="rounded"`, and `fullWidth={false}`.

## Anatomy and DOM ownership

Button is a single public component backed directly by `AtomButton.Root`.

The default path renders a native `<button type="button">`. Supplying `href`
renders a native `<a>`. The ref targets the actual rendered `HTMLElement`
because the element may also be supplied through composition.

On the default and `render` paths, Brick adds private content wrappers:

```html
<button
  class="brick-button"
  data-slot="button"
  data-variant="solid"
  data-tone="accent"
  data-size="md"
  data-shape="rounded"
  type="button"
>
  <span class="brick-button__content">Save changes</span>
</button>
```

`startIcon` and `endIcon` add private, decorative
`.brick-button__icon` wrappers around that content. Those wrappers have
`aria-hidden="true"` and logical `data-position` values. They are
implementation details, not public parts or customization hooks.

`asChild` leaves the single child element's content unchanged and therefore
adds none of these wrappers. Loading adds a CSS pseudo-element, not semantic
DOM, while retaining the original content as the accessible name and layout
footprint.

## API

### Exports

```ts
Button
ButtonProps
ButtonVariant
ButtonTone
ButtonSize
ButtonShape
```

### Brick visual props

| Prop | Allowed values | Default |
| --- | --- | --- |
| `variant` | `"solid"`, `"soft"`, `"outline"`, `"ghost"` | `"solid"` |
| `tone` | `"neutral"`, `"accent"`, `"info"`, `"success"`, `"warning"`, `"danger"` | `"accent"` |
| `size` | `"xs"`, `"sm"`, `"md"`, `"lg"`, `"xl"` | `"md"` |
| `shape` | `"sharp"`, `"rounded"`, `"pill"` | `"rounded"` |
| `fullWidth` | `boolean` | `false` |
| `startIcon` | `ReactNode` | none |
| `endIcon` | `ReactNode` | none |

### Inherited Atom and native props

Button preserves the applicable public Atom Button contract:

| Prop | Contract |
| --- | --- |
| `children` | Visible content and accessible name on the normal path |
| `href` | Renders a native anchor when present |
| `target`, `rel` | Native anchor behavior; Atom preserves safe new-tab relationships |
| `disabled` | Blocks activation and exposes the unavailable state |
| `loading` | Blocks activation, remains focusable, and exposes `aria-busy` |
| `onPress` | `MouseEventHandler<HTMLElement>` normalized by Atom |
| `onClick`, `onKeyDown` | Native-compatible handlers composed by Atom |
| `type` | `"button"`, `"submit"`, or `"reset"`; defaults to `"button"` |
| `asChild` | Uses one child element as the host; defaults to `false` |
| `render` | Uses an Atom render element or callback as the host |
| `data-slot` | Defaults to `"button"` and may be overridden |
| native/global props | Applicable form, ARIA, `data-*`, event, `className`, and `style` props |

The native `color` attribute is intentionally omitted because Brick uses
semantic `tone`.

`asChild` and `render` are mutually exclusive. When `asChild` is `true`,
`children` must be one `ReactElement`, and `startIcon`/`endIcon` are rejected
by the public type. Put any icon inside that child instead.

## Visual recipes and states

### Variants

| Variant | Intended hierarchy |
| --- | --- |
| `solid` | Highest local emphasis |
| `soft` | Quieter filled treatment |
| `outline` | Secondary transparent treatment with a visible border |
| `ghost` | Lowest standalone emphasis with a transparent rest border |

### Tones

`neutral` supports secondary and cancel actions. `accent` is the normal product
action. `info`, `success`, `warning`, and `danger` communicate genuine semantic
meaning; they are not decorative palette choices.

Neutral solid controls use a strong neutral surface with the normal foreground;
they are not inverse black/white controls. The surface is derived from the
active theme's neutral surface and text semantics.

Disabled Buttons use the disabled foreground at full component opacity so the
unavailable label remains readable. Solid and soft variants retain a quiet disabled surface, while
outline and ghost variants remain transparent. Disabled controls never receive
hover or pressed paint.

### Sizes and shapes

| Size | Minimum block size |
| --- | ---: |
| `xs` | 28px |
| `sm` | 36px |
| `md` | 44px |
| `lg` | 52px |
| `xl` | 60px |

`sharp`, `rounded`, and `pill` change radius only. `fullWidth` changes inline
width only and is independent of size or shape.

Every recipe supports rest, capability-gated hover, active/pressed,
focus-visible, disabled, loading, light/dark appearance, forced colors, and
reduced motion. Disabled and loading block activation through Atom. Loading
remains focusable and overlays a centered visual spinner without resizing the
Button.

## Tokens and CSS hooks

### Stable styling surface

- root class: `.brick-button`
- default overridable slot: `data-slot="button"`
- visual attributes: `data-variant`, `data-tone`, `data-size`, `data-shape`
- conditional layout attribute: `data-full-width`
- Atom state attributes: `data-disabled`, `data-loading`
- native `className` and `style`

Brick targets `.brick-button`; changing `data-slot` does not remove its styles.
The private content/icon classes and loading pseudo-element are not public
customization contracts.

### Public Button tokens

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
--brick-button-font-family
--brick-button-font-size
--brick-button-font-weight
--brick-button-line-height
--brick-button-letter-spacing
--brick-button-icon-size
```

Internal tone-mapping and spinner variables used by the stylesheet are not
public tokens. The typography variables default to the matching
`control-xs`–`control-xl` semantic recipes.

## Customization

Prefer customization in this order:

1. Button props for supported recipes;
2. Brick semantic tokens on an application scope;
3. the public Button tokens above;
4. `className` and `style` for a local escape hatch.

```tsx
<Button className="checkout-submit">Place order</Button>
```

```css
.checkout-submit {
  --brick-button-radius: var(--brick-radius-full);
  --brick-button-background: var(--brick-color-success-solid);
  --brick-button-background-hover: var(--brick-color-success-solid-hover);
  --brick-button-background-pressed: var(--brick-color-success-solid-pressed);
  --brick-button-foreground: var(--brick-color-success-on-solid);
  --brick-button-border-color: var(--brick-button-background);
}
```

When overriding colors, verify rest, hover, pressed, focus, disabled, loading,
light/dark appearance, and forced colors.

## Responsive behavior

Button is intrinsic and mobile-first. Labels may wrap, block size grows with
zoom or localization, padding and icon order use logical directions, and the
root remains constrained by its container. It never becomes full width
automatically.

Use `fullWidth` for unconditional width. Breakpoint-dependent width, placement,
visibility, or grouping remains application layout:

```css
.checkout-submit {
  inline-size: 100%;
}

@media (min-width: 48rem) {
  .checkout-submit {
    inline-size: auto;
  }
}
```

Brick does not mirror icon artwork. Supply the correct directional arrow or
chevron for the current writing direction.

## Accessibility

Provide meaningful visible children for the accessible name. Use the default
button path for actions and `href` for navigation.

Atom owns the native role, keyboard activation, form behavior, unavailable and
loading guards, safe anchor behavior, event composition, and ref forwarding.
Brick supplies visible focus, recipe contrast, minimum target geometry,
forced-color presentation, and reduced-motion styling.

`startIcon` and `endIcon` are decorative. Do not rely on them as the only
source of meaning. Loading retains the original accessible name; put detailed
asynchronous status in adjacent live feedback and connect it with
`aria-describedby` when useful.

The `md` default supplies a 44 CSS pixel minimum block size. If using `xs` or
`sm` on touch interfaces, the application must provide adequate surrounding
target spacing.

## Composition, native props, and refs

Use direct `href` for ordinary emphasized navigation:

```tsx
<Button href="/account" variant="outline">
  Account
</Button>
```

Use `asChild` for a custom host that forwards its ref and applicable native
props:

```tsx
<Button asChild variant="outline">
  <PermissiveLink href="/account">Account</PermissiveLink>
</Button>
```

Use Atom's `render` path for a strict router adapter that must render a
destination-free host while disabled or loading. Brick does not detect or
adapt router APIs.

Native form props, ARIA/data attributes, handlers, `className`, `style`,
overridable slot, and the broad `HTMLElement` ref are forwarded to the actual
host.

## Examples

```tsx
<Button endIcon={<ArrowIcon />}>Continue</Button>

<Button tone="danger" variant="outline">
  Delete project
</Button>

<Button loading aria-describedby="save-status">
  Save changes
</Button>
<span id="save-status" role="status">
  Saving changes
</span>
```

```tsx
<form id="profile-form">
  <Button name="intent" type="submit" value="save">
    Save profile
  </Button>
  <Button tone="neutral" type="reset">
    Reset
  </Button>
</form>
```

## Evidence

- playground route: `/button`
- [playground scenarios](../../../playground/src/components/button/ButtonPage.tsx)
- [component test](../../../test/components/button/button.test.tsx)
- [type owner](../../../test/types/components/button.test.ts)
- [browser specification](../../../playground/tests/components/button/behavior.spec.ts)
- [visual specification](../../../playground/tests/components/button/visual.spec.ts)
- [manual-test protocol](../../../playground/manual-tests/button.md)
- [consumer integration](../../../apps/consumer/src/App.tsx)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
