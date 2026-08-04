# Breadcrumb

Breadcrumb is Brick's finished hierarchy trail. It styles Atom's named
navigation landmark, ordered list, native ancestor links, current page,
decorative separators, and composable Ellipsis without owning route data.

## When and where to use

Use Breadcrumb on a page whose ancestors help people understand where they are
and move upward through a site or application hierarchy. It is especially
useful on deep pages reached from search, notifications, or external links.

## When not to use

- Use Nav List for peer destinations rather than ancestry.
- Use Tabs for views of the same context.
- Use Pagination for numbered results.
- Do not use Breadcrumb as browser history or a linear step indicator.
- Omit it when a shallow site or nearby navigation already makes location clear.

Breadcrumb does not provide route objects, automatic collapse, menus,
navigation callbacks, structured search metadata, or analytics.

## Installation and imports

```tsx
import { Breadcrumb } from "@flowstack-ui/brick";
// or: import { Breadcrumb } from "@flowstack-ui/brick/breadcrumb";
import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/breadcrumb.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


Brick requires its exact public Atom dependency and React 18 or newer.

## Quick start

```tsx
<Breadcrumb.Root>
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/projects">Projects</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Page>Quarterly report</Breadcrumb.Page>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb.Root>
```

## Anatomy and DOM ownership

Default rendering preserves Atom's semantic hosts:

```html
<nav class="brick-breadcrumb" aria-label="Breadcrumb" data-size="md" data-variant="plain">
  <ol class="brick-breadcrumb-list">
    <li class="brick-breadcrumb-item">
      <a class="brick-breadcrumb-link" href="/">Home</a>
    </li>
    <li class="brick-breadcrumb-separator" role="presentation" aria-hidden="true">/</li>
    <li class="brick-breadcrumb-item">
      <span class="brick-breadcrumb-page" aria-current="page">Current page</span>
    </li>
  </ol>
</nav>
```

| Part | Default host | Owner | Purpose |
| --- | --- | --- | --- |
| Root | `nav` | Atom semantics; Brick recipes | named landmark and trail recipe |
| List | `ol` | Atom semantics; Brick layout | ordered hierarchy |
| Item | `li` | Atom semantics; Brick layout | one hierarchy level |
| Link | `a` | Atom/browser behavior; Brick paint | ancestor destination |
| Page | `span` | Atom current state; Brick paint | current non-link page |
| Separator | `li` | Atom presentation; Brick paint | hidden visual divider |
| Ellipsis | `span` | Atom composition; Brick paint | collapsed levels |

Brick inserts no Items or Separators. Refs target each final Atom-rendered host.

## API

### Exports

`Breadcrumb`, `BreadcrumbRoot`, `BreadcrumbList`, `BreadcrumbItem`,
`BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`,
`BreadcrumbEllipsis`, `BreadcrumbRootProps`, `BreadcrumbListProps`,
`BreadcrumbItemProps`, `BreadcrumbLinkProps`, `BreadcrumbPageProps`,
`BreadcrumbSeparatorProps`, `BreadcrumbEllipsisProps`, `BreadcrumbSize`, and
`BreadcrumbVariant` are available from root and subpath imports.

### Root recipes

| Prop | Values | Default |
| --- | --- | --- |
| `size` | `sm`, `md`, `lg` | `md` |
| `variant` | `plain`, `underline` | `plain` |
| `ariaLabel` | `string` | `"Breadcrumb"` |

Root accepts native nav props plus Atom `render` and `asChild`. Recipe props
become `data-size` and `data-variant` and do not leak as native attributes.

### Parts

- List accepts native ordered-list props.
- Item and Separator accept native list-item props.
- Link accepts native anchor props such as `href`, `target`, `rel`, and
  `download`.
- Page accepts native span props and always supplies `aria-current="page"`.
- Separator defaults to `/` and always supplies `role="presentation"` and
  `aria-hidden="true"`.
- Ellipsis defaults to `…` and may compose an interactive final host.
- Every part accepts `className`, `style`, custom data attributes, `render`,
  `asChild`, and its matching ref.

There are no tone, shape, disabled, loading, selection, collapse, or data-array
props.

## Visual recipes and states

- `md` is the default body-size trail; `sm` and `lg` change typography,
  spacing, and separator metrics together.
- `plain` keeps ancestor links undecorated at rest and underlines them on
  hover, focus-visible, and active interaction.
- `underline` keeps a visible underline at rest.
- Ancestors use secondary neutral text. The current Page uses primary text and
  medium weight.
- Separator and Ellipsis use secondary text color.
- Root has no surface, border, elevation, or width recipe.
- Hover, active, focus, and current states never change geometry.
- Dark appearance and forced colors retain link, current-page, separator, and
  focus distinctions. Breadcrumb has no motion.

## Tokens and CSS hooks

Stable classes:

- `.brick-breadcrumb`
- `.brick-breadcrumb-list`
- `.brick-breadcrumb-item`
- `.brick-breadcrumb-link`
- `.brick-breadcrumb-page`
- `.brick-breadcrumb-separator`
- `.brick-breadcrumb-ellipsis`

Stable Root data hooks are `data-size` and `data-variant`; every part retains
its `data-slot`.

Public variables:

- `--brick-breadcrumb-foreground`
- `--brick-breadcrumb-foreground-hover`
- `--brick-breadcrumb-foreground-active`
- `--brick-breadcrumb-current-foreground`
- `--brick-breadcrumb-separator-foreground`
- `--brick-breadcrumb-ellipsis-foreground`
- `--brick-breadcrumb-ellipsis-hover-background`
- `--brick-breadcrumb-focus-ring`
- `--brick-breadcrumb-list-gap`
- `--brick-breadcrumb-item-gap`
- `--brick-breadcrumb-target-size`
- `--brick-breadcrumb-font-family`
- `--brick-breadcrumb-font-size`
- `--brick-breadcrumb-font-weight`
- `--brick-breadcrumb-line-height`
- `--brick-breadcrumb-letter-spacing`
- `--brick-breadcrumb-current-font-weight`
- `--brick-breadcrumb-decoration-thickness`
- `--brick-breadcrumb-decoration-offset`
- `--brick-breadcrumb-separator-size`

## Customization

Choose Root recipes first, then customize semantic tokens or component
variables in a scoped class.

```tsx
<Breadcrumb.Root
  className="project-path"
  style={{
    "--brick-breadcrumb-foreground": "var(--brick-color-accent-text)",
    "--brick-breadcrumb-separator-size": "1.125em",
  } as React.CSSProperties}
>
  {/* complete List anatomy */}
</Breadcrumb.Root>
```

Customized colors must remain readable in every supported appearance. Do not
remove the focus ring or hide link affordance solely through color.

## Responsive behavior

The List wraps by default and remains bounded by Root. Items stay content-sized
and never stretch to fill a row. Long and localized labels may wrap and break
long tokens rather than clip or create page-level horizontal scrolling.

At narrow widths, 200% text size, 400% zoom, or increased text spacing, keep
the full hierarchy when it remains useful. If product policy requires fewer
items, explicitly compose Ellipsis and a disclosure/menu rather than relying
on visual clipping.

## Accessibility

- Root supplies a named navigation landmark; use a more specific `ariaLabel`
  when a page contains multiple breadcrumb trails.
- Keep Items in ancestor-to-current order and render exactly one Page.
- Use complete, destination-specific link text and the same current-page words
  as the visible page title when practical.
- Separator is decorative and hidden by Atom. Do not move meaningful content
  into it.
- Native Links retain normal Tab order, Enter activation, modifier keys,
  context menus, target, and download behavior. Breadcrumb adds no arrow-key or
  roving-focus model.
- Interactive Ellipsis must compose a real button/menu trigger and have a name
  such as “Show collapsed pages.” Static Ellipsis is not interactive.
- The final hierarchy and routing policy must be tested in the consuming page.

## Composition, native props, and refs

Every part preserves Atom `render` and `asChild`. A router adapter used by Link
must produce a real final anchor with a destination:

```tsx
<Breadcrumb.Link asChild>
  <RouterLink to="/projects">Projects</RouterLink>
</Breadcrumb.Link>
```

Manual collapse composes behavior from its owner:

```tsx
<Breadcrumb.Item>
  <Breadcrumb.Ellipsis asChild>
    <button type="button" aria-label="Show collapsed pages" onClick={showPages}>
      …
    </button>
  </Breadcrumb.Ellipsis>
</Breadcrumb.Item>
```

Root ref targets `HTMLElement`; List targets `HTMLOListElement`; Item and
Separator target `HTMLLIElement`; Link targets `HTMLAnchorElement`; Page and
Ellipsis target `HTMLSpanElement` under default rendering.

## Examples

### Underlined compact trail

```tsx
<Breadcrumb.Root size="sm" variant="underline">
  <Breadcrumb.List>
    <Breadcrumb.Item><Breadcrumb.Link href="/">Home</Breadcrumb.Link></Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item><Breadcrumb.Page>Documentation</Breadcrumb.Page></Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb.Root>
```

### Custom separator

```tsx
<Breadcrumb.Separator>
  <ChevronRightIcon aria-hidden="true" />
</Breadcrumb.Separator>
```

### Expanded manual collapse

```tsx
{expanded ? (
  <Breadcrumb.Item>
    <Breadcrumb.Link href="/projects">Projects</Breadcrumb.Link>
  </Breadcrumb.Item>
) : (
  <Breadcrumb.Item>
    <Breadcrumb.Ellipsis asChild>
      <button type="button" aria-label="Show collapsed pages" onClick={() => setExpanded(true)}>…</button>
    </Breadcrumb.Ellipsis>
  </Breadcrumb.Item>
)}
```

## Evidence

- [Playground route source](../../../playground/src/components/breadcrumb/BreadcrumbPage.tsx): `/breadcrumb`
- [Unit owner](../../../test/components/breadcrumb/breadcrumb.test.tsx)
- [Type owner](../../../test/types/components/breadcrumb.test.ts)
- [Browser owner](../../../playground/tests/components/breadcrumb/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/breadcrumb/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/breadcrumb.md)
- Coverage workbook: `playground/component-coverage.xlsx`, `Breadcrumb` sheet

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
