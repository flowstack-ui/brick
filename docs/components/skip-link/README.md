# Skip Link

Skip Link provides a finished, visible-on-focus bypass link and its matching
primary-content destination. Atom owns native anchor behavior, focus transfer,
scrolling, target focusability, composition, and refs; Brick owns the overlay
presentation and stable customization hooks.

## When and where to use

Use Skip Link near the start of pages that repeat a header, navigation,
sidebar, search area, or other block before primary content. Place
`SkipLink.Root` before that repeated content and pair it with one matching
`SkipLink.Target` around the intended main region.

The application—not AppBar, Sidebar, or Brick—owns page placement. Root should
be the first useful focusable control. One pair is sufficient for most pages.

## When not to use

Do not use Skip Link for an ordinary inline destination, table of contents,
pagination, route navigation, or disclosure. Do not add a duplicate pair when
the page already has an equally usable bypass mechanism. Use [Link](../link/README.md)
for ordinary links and [Visually Hidden](../visually-hidden/README.md) for text
that should never become visually present.

## Installation and imports

Import the global Brick stylesheet once:

```ts
import "@flowstack-ui/brick/styles.css";
```

Import from the package root or focused subpath:

```tsx
import { SkipLink } from "@flowstack-ui/brick";
import { SkipLink } from "@flowstack-ui/brick/skip-link";
```

## Quick start

```tsx
import { SkipLink } from "@flowstack-ui/brick/skip-link";

export function ApplicationShell() {
  return (
    <>
      <SkipLink.Root>Skip to main content</SkipLink.Root>
      <header>{/* repeated navigation */}</header>
      <SkipLink.Target>
        <h1>Workspace</h1>
        {/* primary page content */}
      </SkipLink.Target>
    </>
  );
}
```

The defaults pair `href="#main-content"` with `id="main-content"`.

## Anatomy and DOM ownership

```tsx
<SkipLink.Root />
<SkipLink.Target />
```

| Part | Default element | Stable identity | Owner |
| --- | --- | --- | --- |
| `Root` | `a` | `.brick-skip-link`, `data-slot="skip-link"` | Atom semantics/behavior; Brick paint |
| `Target` | `main` | `.brick-skip-link__target`, `data-slot="skip-link-target"` | Atom landmark/focusability; application layout |

Root remains focusable while translated outside the viewport. Any focus reveals
it at logical block-start and inline-start. Target defaults to `tabIndex={-1}`
so Atom can focus it without adding another ordinary Tab stop.

## API

### `SkipLink.Root`

`SkipLink.Root` accepts Atom's native anchor props with these focused additions
and defaults:

| Prop | Type | Default | Purpose |
| --- | --- | --- | --- |
| `href` | `` `#${string}` `` | `"#main-content"` | Matching same-page destination |
| `focusTarget` | `boolean` | `true` | Focus and scroll the existing destination |
| `children` | `ReactNode` | `"Skip to main content"` | Localized link name |
| `render` | Atom render adapter | — | Replace the default anchor while preserving semantics |
| `asChild` | `boolean` | `false` | Merge into one authored semantic child |

Native anchor props, click handlers, classes, styles, data attributes, custom
slots, and an `HTMLAnchorElement` ref pass through.

### `SkipLink.Target`

| Prop | Type | Default | Purpose |
| --- | --- | --- | --- |
| `id` | `string` | `"main-content"` | Matching fragment ID |
| `tabIndex` | `number` | `-1` | Programmatic focus without another Tab stop |
| `children` | `ReactNode` | — | Primary content |
| `render` | Atom render adapter | — | Replace the default `main` |
| `asChild` | `boolean` | `false` | Merge into one authored landmark child |

Native main props, classes, styles, data attributes, custom slots, and an
`HTMLElement` ref pass through.

## Visual recipes and states

Skip Link intentionally has one visual recipe and no size, tone, shape,
position, or motion props.

- Unfocused Root is fixed and translated beyond the viewport while remaining
  keyboard focusable.
- Focused Root appears immediately on an elevated neutral surface with accent
  border, readable body typography, shadow, and strong focus ring.
- Hover and active paint apply only while the link remains focused.
- Target receives Brick identity but no component layout or paint.
- Light and dark appearance scopes substitute semantic tokens.
- Forced colors use system text, surface, link, and highlight colors.

## Tokens and CSS hooks

Stable classes:

- `.brick-skip-link`
- `.brick-skip-link__target`

Public Root variables:

| Variable | Purpose |
| --- | --- |
| `--brick-skip-link-background` | Revealed surface |
| `--brick-skip-link-foreground` | Link text |
| `--brick-skip-link-border-color` | Revealed boundary |
| `--brick-skip-link-border-width` | Boundary width |
| `--brick-skip-link-radius` | Boundary radius |
| `--brick-skip-link-shadow` | Elevated shadow |
| `--brick-skip-link-focus-ring` | Focus outline |
| `--brick-skip-link-inset-block` | Viewport block-start inset |
| `--brick-skip-link-inset-inline` | Logical viewport inline-start inset |
| `--brick-skip-link-max-inline-size` | Long-label width bound |
| `--brick-skip-link-z-index` | Overlay layer |

## Customization

Change paint through documented variables while keeping the native focus and
target contract:

```tsx
<SkipLink.Root
  style={{
    "--brick-skip-link-background": "#2e1065",
    "--brick-skip-link-foreground": "#ffffff",
    "--brick-skip-link-border-color": "#c4b5fd",
    "--brick-skip-link-radius": "999px",
  } as React.CSSProperties}
>
  Skip workspace navigation
</SkipLink.Root>
```

Consumer classes and inline styles follow normal cascade rules. If a product
requires an always-visible bypass link, use the stable Root class in that
product's shell policy; Brick does not add a second behavior or public variant.

## Responsive behavior

The revealed link uses logical insets, a bounded viewport-relative maximum
width, wrapping text, and no transition. Long localized labels remain inside
narrow viewports and the position mirrors in RTL. Applications should test the
real sticky header, browser chrome, safe-area policy, and supported 400% zoom
layout; Brick does not guess a page-specific scroll offset for Target.

## Accessibility

- Put Root before repeated content and make it the first useful focus target.
- Write concise localized text that names the destination.
- Keep Root and Target fragment identifiers unique and matching.
- Keep the default native anchor and `main` semantics unless the composed host
  supplies equivalent semantics.
- Do not hide Root with `display:none`, `visibility:hidden`, Visually Hidden,
  or a negative `tabIndex`.
- Tab focuses Root; Enter activates it. Atom moves focus and scrolls to Target.
- The next Tab continues from the primary content.
- Preventing the click also prevents Atom's focus/scroll behavior.
- `focusTarget={false}` opts into native fragment navigation only.
- Brick adds no custom ARIA role or keyboard model.

Skip Link is one sufficient way to meet WCAG 2.4.1 Bypass Blocks; applications
remain responsible for their complete page conformance.

## Composition, native props, and refs

Use `render` or `asChild` for framework or semantic composition. Preserve a
genuine anchor for Root and a primary-content landmark for Target:

```tsx
<SkipLink.Root asChild>
  <a href="#reports">Skip report navigation</a>
</SkipLink.Root>

<SkipLink.Target asChild id="reports">
  <main>{/* reports */}</main>
</SkipLink.Target>
```

Do not nest Brick Link inside Root or add another interactive element inside
the anchor. Refs resolve to the rendered anchor and destination hosts.

## Examples

### Custom destination

```tsx
<SkipLink.Root href="#release-review">Skip release navigation</SkipLink.Root>
<nav aria-label="Release">{/* repeated destinations */}</nav>
<SkipLink.Target id="release-review">
  <h1>Release review</h1>
</SkipLink.Target>
```

### Native-only fragment navigation

```tsx
<SkipLink.Root href="#content" focusTarget={false}>
  Skip navigation
</SkipLink.Root>
<SkipLink.Target id="content">Primary content</SkipLink.Target>
```

## Evidence

- Playground source: [`../../../playground/src/components/skip-link/`](../../../playground/src/components/skip-link/)
- Component adapter: [`../../../test/components/skip-link/`](../../../test/components/skip-link/)
- Public types: [`../../../test/types/components/skip-link.test.ts`](../../../test/types/components/skip-link.test.ts)
- Browser behavior and accessibility: [`../../../playground/tests/components/skip-link/behavior.spec.ts`](../../../playground/tests/components/skip-link/behavior.spec.ts)
- Visual baselines: [`../../../playground/tests/components/skip-link/visual.spec.ts`](../../../playground/tests/components/skip-link/visual.spec.ts)
- Deterministic playground: `/skip-link`
- Manual protocol: [`../../../playground/manual-tests/skip-link.md`](../../../playground/manual-tests/skip-link.md)
- Packed application composition: `apps/consumer/src/App.tsx`
- Assertion tracker: `playground/component-coverage.xlsx`, `Skip Link`

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
