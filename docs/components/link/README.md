# Link

Link is Brick's finished typographic navigation component. It styles the
server-safe Atom Link primitive while preserving one real native anchor,
browser navigation behavior, native attributes, and router composition.

## When and where to use

Use Link for an inline or standalone destination that should look like a
hyperlink. Its underlined default is appropriate inside prose. The plain
variant is for clear navigation contexts where layout already communicates
that the item is a link.

## When not to use

- Use Button when activation performs an operation.
- Use Button link mode when navigation should look like a filled, soft,
  outlined, or ghost action control.
- Use a navigation collection's own Link part when it owns current state,
  roving focus, hierarchy, or selection.
- Use Skip Link for bypass navigation.
- Do not render an unavailable destination as a generically disabled link.
  Omit it or use the contextual component that owns unavailability.

Link does not provide loading, disabled, `onPress`, automatic external-link
detection, new-tab policy, visited-state switching, status tones, or a router
provider.

## Installation and imports

```tsx
import { Link } from "@flowstack-ui/brick";
// or: import { Link } from "@flowstack-ui/brick/link";
import "@flowstack-ui/brick/styles.css";
```

Brick requires the exact public Atom dependency declared by the package and
React 18 or newer.

## Quick start

```tsx
<Link href="/guides">Read the component guides</Link>
```

## Anatomy and DOM ownership

Normal rendering produces one Atom-owned anchor and Brick-owned content/icon
spans:

```html
<a
  class="brick-link"
  data-size="inherit"
  data-slot="link"
  data-tone="accent"
  data-variant="underline"
  href="/guides"
>
  <span class="brick-link__content">Read the component guides</span>
</a>
```

| Part | Element | Owner | Conditions |
| --- | --- | --- | --- |
| Link root | `a[href]` by default | Atom semantics; Brick visual adapter | Always |
| Start icon | `span[aria-hidden=true]` | Brick | `startIcon` supplied |
| Content | `span` | Brick | Normal/render rendering |
| End icon | `span[aria-hidden=true]` | Brick | `endIcon` supplied |

`asChild` delegates complete anatomy to its one child and creates no Brick
content or icon spans. The ref targets the final `HTMLAnchorElement`.

## API

### Exports

`Link`, `LinkProps`, `LinkRenderProp`, `LinkVariant`, `LinkTone`, and
`LinkSize` are available from the root and `@flowstack-ui/brick/link`.

### Brick visual props

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `underline`, `plain` | `underline` |
| `tone` | `accent`, `neutral`, `inherit` | `accent` |
| `size` | `inherit`, `sm`, `md`, `lg` | `inherit` |
| `startIcon` | `ReactNode` | none |
| `endIcon` | `ReactNode` | none |
| `asChild` | `true`, `false` | `false` |

Default native rendering requires `href`. `render` may own or receive a
destination. `asChild` may omit the Link `href` only when its child router
adapter produces a final anchor with a destination. `asChild` excludes
`render`, `startIcon`, and `endIcon` because the child owns complete anatomy.

All applicable native anchor attributes pass through. There is deliberately
no `disabled`, `loading`, action, shape, width, or filled-variant prop.

## Visual recipes and states

- `underline` keeps a visible underline at rest.
- `plain` removes the resting underline and restores it for hover,
  focus-visible, and active interaction. Use it only in clear navigation.
- `accent` is the default navigational foreground. `neutral` uses primary
  content color. `inherit` follows the surrounding current color.
- `inherit` follows all surrounding typography. `sm`, `md`, and `lg` use the
  Brick body-sm, body-md, and body-lg recipes.
- Native `aria-current` uses medium weight without adding a custom selected
  state.
- Hover, active, and focus-visible never add background, border, size, or
  spacing changes. Brick does not change visited-link color by default.

## Tokens and CSS hooks

Stable classes:

- `.brick-link`
- `.brick-link__content`
- `.brick-link__icon`

Stable data hooks are `data-slot`, `data-variant`, `data-tone`, `data-size`,
and icon `data-position`. Native `aria-current` remains available.

Public component variables:

- `--brick-link-foreground`
- `--brick-link-foreground-hover`
- `--brick-link-foreground-active`
- `--brick-link-focus-ring`
- `--brick-link-decoration-color`
- `--brick-link-decoration-thickness`
- `--brick-link-decoration-offset`
- `--brick-link-gap`
- `--brick-link-icon-size`
- `--brick-link-font-family`
- `--brick-link-font-size`
- `--brick-link-font-weight`
- `--brick-link-line-height`
- `--brick-link-letter-spacing`

## Customization

Choose public props first, customize global semantic tokens for system-wide
policy, then override Link variables in a scoped class. `className` and
`style` remain final escape hatches.

```tsx
<Link
  href="/status"
  style={{
    "--brick-link-foreground": "var(--brick-color-success-text)",
    "--brick-link-decoration-thickness": "0.16em",
  } as React.CSSProperties}
>
  Read publication status
</Link>
```

Custom foregrounds must remain readable in every supported appearance and
must not suppress the focus ring or link affordance.

## Responsive behavior

Link is content-sized, has no fixed block size or inline padding, wraps long
content, and remains bounded by its container. Icons are `1em`, remain inside
the clickable anchor, and use logical start/end order in RTL. Layout owners
decide where links are grouped and how much surrounding space they receive.

At 200% text size, 400% zoom, increased text spacing, localized content, and
narrow widths, allow wrapping rather than clipping or creating page-level
horizontal scrolling.

## Accessibility

- Use destination-specific link text rather than repeated labels such as
  “click here.”
- Keep a real final `a[href]`; do not use Link for an action.
- The underlined default provides a non-color affordance. Plain requires
  unmistakable navigational context.
- Decorative icon wrappers are hidden from assistive technology. Visible text
  or an explicit native ARIA label must name the destination.
- Browser Enter activation, modifier keys, context menus, target, download,
  history, and focus behavior remain native.
- Communicate new-window, external, file type, or download consequences in
  application-owned content when users need that information. Brick neither
  infers nor inserts it.
- Use `aria-current` only for a current destination in a related set.

## Composition, native props, and refs

Native props such as `target`, `rel`, `download`, `ping`, `referrerPolicy`,
`hrefLang`, `type`, `aria-current`, events, class, style, and data attributes
pass to the final anchor. Link forwards `HTMLAnchorElement`.

For a router that owns its destination:

```tsx
<Link asChild>
  <RouterLink to="/account">Account settings</RouterLink>
</Link>
```

The router component must render a real anchor with a non-empty final `href`.
Atom merges Brick's class, recipe data, native props, and ref onto it. Use
`render` instead when an element or render callback is the appropriate adapter.

## Examples

### Inline destination

```tsx
<p>
  Review the <Link href="/privacy">privacy policy</Link> before continuing.
</p>
```

### Standalone link with decorative icon

```tsx
<Link href="/reports" endIcon={<ArrowIcon />} size="md">
  View reports
</Link>
```

### Current destination

```tsx
<nav aria-label="Account">
  <Link aria-current="page" href="/account">Account overview</Link>
</nav>
```

### Explicit external policy

```tsx
<Link
  href="https://example.com/reference"
  rel="noopener"
  target="_blank"
>
  External reference (opens in a new tab)
</Link>
```

## Evidence

- [Playground route source](../../../playground/src/components/link/LinkPage.tsx): `/link`
- [Unit owner](../../../test/components/link/link.test.tsx)
- [Type owner](../../../test/types/components/link.test.ts)
- [Browser owner](../../../playground/tests/components/link/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/link/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/link.md)
- Coverage workbook: `playground/component-coverage.xlsx`, `Link` sheet

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
