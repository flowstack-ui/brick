# Link Box

Link Box expands one real Brick Link across a containing region while keeping
secondary controls outside that anchor. It fits product cards, property
listings, articles, and result rows with one primary destination.

## When and where to use

Use Link Box when clicking most of a bounded item should navigate and the item
may contain a separate save, compare, menu, or other control.

## When not to use

Use a normal Link when only its text should be clickable or pointer text
selection matters. Use Button or Pressable when the region performs an
operation rather than navigation.

## Installation and imports

```tsx
import { LinkBox } from "@flowstack-ui/brick/link-box";
import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and Link Box's modular
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/link-box.css";
```

The modular stylesheet includes the Link styles that Link Box renders. Do not
combine modular styles with `styles.css` or `tokens.css`.

## Quick start

```tsx
<LinkBox.Root as="article">
  <Card.Root>
    <Card.Header>
      <Card.Title>
        <LinkBox.Link href="/products/stride-run-360">
          Stride Run 360
        </LinkBox.Link>
      </Card.Title>
    </Card.Header>
    <Card.Content>$129.99</Card.Content>
  </Card.Root>
</LinkBox.Root>
```

## Anatomy and DOM ownership

Root is one noninteractive containing host. Link is one final `a[href]` whose
generated target covers Root. Action is a neutral div that raises its child
control above that target. Root owns no focus, click, or link semantics.

## API

`LinkBox.Root` accepts `variant="outline" | "plain"`; the default is
`outline`. The root emits `data-variant`. Use `plain` for editorial layouts
whose media and text should remain visually unboxed while the stretched link
still owns the shared focus treatment.

Public exports are `LinkBox`, `LinkBoxRoot`, `LinkBoxLink`, `LinkBoxAction`,
`LinkBoxRootProps`, `LinkBoxRootElement`, `LinkBoxLinkProps`, and
`LinkBoxActionProps`.

### LinkBox.Root

| Prop | Values | Default |
| --- | --- | --- |
| `as` | `div`, `article`, `section`, `li` | `div` |
| `variant` | `outline`, `plain` | `outline` |
| `data-slot` | string | `link-box` |

Root accepts ordinary `HTMLAttributes<HTMLElement>`, including `id`, ARIA and
data attributes, events, `className`, `style`, and `ref`.

### LinkBox.Link

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | every Brick Link variant | `plain` |
| `tone` | every Brick Link tone | `inherit` |
| `data-slot` | string | `link-box-link` |

`LinkBoxLinkProps` is the complete Brick `LinkProps` contract, including
native `href`, router composition, native anchor attributes, and ref support.

### LinkBox.Action

| Prop | Values | Default |
| --- | --- | --- |
| `data-slot` | string | `link-box-action` |

`LinkBoxActionProps` accepts native div attributes. Action does not invent a
role, tab stop, or behavior for its child control.

### Compound API

- `LinkBox.Root` renders `div` by default and supports `article`, `section`, or
  `li` through `as`.
- `LinkBox.Link` preserves the complete Brick Link API and defaults to
  `variant="plain"`, `tone="inherit"`.
- `LinkBox.Action` renders a neutral div layering owner.

Root forwards an `HTMLElement` ref, Link an `HTMLAnchorElement` ref, and Action
a div ref. Native attributes and documented slot overrides pass through.

## Visual recipes and states

The default outline variant outlines the complete Root on hover with the strong
border role. Active uses the
accent border. Keyboard focus remains on Link while one Root-sized focus ring
is painted without layout shift. Forced colors use system highlight colors,
and reduced motion removes the short ring transition.

Use `variant="plain"` for visually unbounded editorial previews. It removes
hover and active boundary paint while preserving the complete focus-visible ring.

## Tokens and CSS hooks

Stable classes are `.brick-link-box`, `.brick-link-box__link`, and
`.brick-link-box__action`. Stable slots are `link-box`, `link-box-link`, and
`link-box-action`.

Public variables:

- `--brick-link-box-radius`
- `--brick-link-box-hover-ring`
- `--brick-link-box-active-ring`
- `--brick-link-box-focus-ring`
- `--brick-link-box-focus-offset`

## Customization

Use the public variables rather than targeting generated pseudo-elements.
Match `--brick-link-box-radius` to a child surface when that surface explicitly
overrides the theme radius.

## Responsive behavior

Root fills its allocated layout track and introduces no breakpoint. Its content
reflows naturally at narrow widths and zoom. The expanded target follows the
Root's final size.

## Accessibility

Use one primary Link with destination-specific text. Root and Action add no
role or tab stop. Never put Button or another Link inside `LinkBox.Link`.
Keyboard, browser, and assistive-technology navigation remain native.

## Composition, native props, and refs

Give Root the item semantics (`article` or `li`) and keep an inner Card as its
default `div`. Wrap every independently interactive sibling in
`LinkBox.Action`; the child remains the real control. Router composition stays
available through `LinkBox.Link` exactly as it does through Link.

When an Action overlays media through ZStack, its stacking context must remain
above the expanded Link pointer layer. Compose `ZStack.Item` with `asChild` onto
`LinkBox.Action`, set `isolation="open"` on that local ZStack, and give the
Item `layer="action"`. Use Item `edgeSpacing` when the control needs a logical
distance from the media edge. These public layout props preserve ZStack
placement, LinkBox destination coverage, and independent pointer access
without inventing a second Link or making Root pressable. Always prove both
pointer and keyboard activation in a real browser; a unit click alone does not
detect pointer interception.

The expanded pointer layer can intercept dragging to select text inside Root.
Prefer a normal Link where pointer text selection is important.

## Examples

```tsx
<LinkBox.Root as="article">
  <Card.Root>
    <Card.Header>
      <Card.Title>
        <LinkBox.Link href="/homes/harbor-townhome">
          Harbor Townhome
        </LinkBox.Link>
      </Card.Title>
      <Card.Action>
        <LinkBox.Action>
          <IconButton aria-label="Save Harbor Townhome">…</IconButton>
        </LinkBox.Action>
      </Card.Action>
    </Card.Header>
  </Card.Root>
</LinkBox.Root>
```

## Evidence

- [Playground route source](../../../playground/src/components/link-box/)
- [Focused component tests](../../../test/components/link-box/)
- [Type tests](../../../test/types/components/link-box.test.ts)
- [Browser behavior](../../../playground/tests/components/link-box/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/link-box/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/link-box.md)

## Changelog

See the [Link Box changelog](CHANGELOG.md).
Public exports include `LinkBox`, `LinkBoxRoot`, `LinkBoxLink`,
`LinkBoxAction`, their prop types, `LinkBoxRootElement`, and `LinkBoxVariant`.
