# Card

Card is a static compound surface for grouping information and related actions
about one subject.

## When and where to use

Use Card for summaries, settings groups, product or article previews, metrics,
profiles, and other reusable content units that benefit from a visible surface
and optional header, supporting description, body, or footer.

Card owns visual grouping and content anatomy. Use application `Container`,
`Stack`, `Grid`, or ordinary CSS to control its width, height, position, and
page-level responsive layout.

## When not to use

- Use semantic HTML or layout primitives when no visual surface is needed.
- Use Alert for status messaging.
- Use Dialog, Popover, Drawer, or HoverCard for temporary content.
- Use Button or Link for an action rather than adding click behavior to a
  generic Card.
- Build complete sections and data-driven blocks above Brick.

## Installation and imports

Import Card from the package root or stable component subpath and import the
required stylesheet once at the application root:

```tsx
import { Card } from "@flowstack-ui/brick";
// or: import { Card } from "@flowstack-ui/brick/card";
import "@flowstack-ui/brick/styles.css";
```

## Quick start

```tsx
<Card.Root as="article" aria-labelledby="report-title">
  <Card.Header>
    <Card.Title as="h2" id="report-title">Quarterly report</Card.Title>
    <Card.Description>Updated five minutes ago</Card.Description>
  </Card.Header>
  <Card.Content>Conversion improved across every checkout step.</Card.Content>
  <Card.Footer>
    <Button>Open report</Button>
  </Card.Footer>
</Card.Root>
```

## Anatomy and DOM ownership

```text
Card.Root
├── Card.Header
│   ├── Card.Title
│   ├── Card.Description
│   └── Card.Action
├── Card.Content
└── Card.Footer
```

Every part is optional and owns exactly one native element.

| Part | Default element | Ref target | Purpose |
|---|---|---|---|
| `Card.Root` | `div` | `HTMLElement` | Surface, clipping, variant, size, and semantic container |
| `Card.Header` | `div` | `HTMLDivElement` | Title, description, and compact trailing-action layout |
| `Card.Title` | `h3` | `HTMLHeadingElement` | Visible subject heading |
| `Card.Description` | `p` | `HTMLParagraphElement` | Supporting header text |
| `Card.Action` | `div` | `HTMLDivElement` | Compact trailing content without generated behavior |
| `Card.Content` | `div` | `HTMLDivElement` | Primary body region |
| `Card.Footer` | `div` | `HTMLDivElement` | Wrapping actions or secondary content |

Card uses no React context and adds no client boundary. Root recipes reach its
parts through static CSS.

## API

### Card.Root

| Prop | Values | Default |
|---|---|---|
| `as` | `div`, `article`, `section`, `li` | `div` |
| `variant` | `outline`, `elevated`, `subtle` | `outline` |
| `size` | `sm`, `md`, `lg` | `md` |

Root also accepts ordinary `HTMLAttributes<HTMLElement>`, including `id`,
ARIA and data attributes, events, `className`, `style`, and `ref`.

### Card.Title

`as` accepts `h1` through `h6` and defaults to `h3`. Choose the level from the
document hierarchy, not the desired visual size. An `h1` is valid when Card
contains the page's real main title—for example, a sign-in page whose primary
content is one Card. Repeated cards normally use `h2` or `h3`.

### Other parts

Header, Action, Content, and Footer accept native `div` attributes.
Description accepts native paragraph attributes. All part slots are
overridable with `data-slot`.

## Visual recipes and states

### Variants

- `outline` is the default clear boundary and does not depend on shadow.
- `elevated` uses a restrained shadow plus a faint boundary for higher
  prominence.
- `subtle` uses a quiet filled surface without shadow.

Card has no hover, pressed, selected, loading, disabled, focus, or tone state.
Those belong to the explicit components inside it.

### Sizes

`sm`, `md`, and `lg` coordinate section inset, region spacing, and title scale.
They do not set width, height, grid columns, or viewport breakpoints.

## Tokens and CSS hooks

### Public Card tokens

| Token | Responsibility |
|---|---|
| `--brick-card-space` | Section inset and coordinated region spacing |
| `--brick-card-radius` | Root surface radius |
| `--brick-card-shadow` | Elevated surface shadow |

### Stable classes and slots

| Part | Class | Default slot |
|---|---|---|
| Root | `.brick-card` | `card` |
| Header | `.brick-card-header` | `card-header` |
| Title | `.brick-card-title` | `card-title` |
| Description | `.brick-card-description` | `card-description` |
| Action | `.brick-card-action` | `card-action` |
| Content | `.brick-card-content` | `card-content` |
| Footer | `.brick-card-footer` | `card-footer` |

Root reflects `data-variant` and `data-size`. Classes, slots, and the three
component tokens are the stable Card-specific CSS contract. Semantic surface,
border, text, radius, spacing, and shadow-color tokens remain the normal theme
layer.

## Customization

Choose a tested variant and size first:

```tsx
<Card.Root size="lg" variant="elevated">...</Card.Root>
```

Override semantic tokens on an application scope to theme a region. For a
local Card adjustment, use the public component tokens:

```tsx
<Card.Root
  style={{
    "--brick-card-radius": "0.25rem",
    "--brick-card-space": "2rem",
  } as React.CSSProperties}
>
  ...
</Card.Root>
```

Customize public anatomy directly rather than using a root class map:

```tsx
<Card.Root className="project-card">
  <Card.Header className="project-card__header">...</Card.Header>
  <Card.Content data-slot="project-summary">...</Card.Content>
</Card.Root>
```

Arbitrary overrides remain the consumer's responsibility for contrast,
clipping, focus visibility, and reflow.

## Responsive behavior

Card is mobile-first and block-sized by its container. It uses minimum-zero
columns, logical spacing, long-content wrapping, and a wrapping Footer. Header
Action is intended for compact content; put large or multiple actions in
Footer.

Application layout remains ordinary CSS:

```css
.report-grid {
  display: grid;
  gap: 1rem;
}

@media (min-width: 48rem) {
  .report-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
```

## Accessibility

There is no Card ARIA widget. Card adds no role, tab index, accessible name,
keyboard handler, focus target, generated ID, or automatic heading
relationship.

- Use `article`, `section`, or `li` only when it matches the document.
- Label significant articles or sections explicitly when appropriate.
- Choose the Title level from the page heading structure.
- Buttons and links inside Card keep their native semantics and focus.
- Forced-colors mode preserves a visible boundary for every Card variant.
- Card has no default motion, so reduced motion does not change its meaning.

## Composition, native props, and refs

Card is Brick-native and deliberately does not expose `asChild` or `render`.
Root's restricted `as` prop covers its useful document semantics. Native media,
AspectRatio, and future Image components may be composed as children; Card
does not own their loading, alternative text, crop, or aspect ratio.

### Whole-card actions

Prefer an explicit Button or Link in Action, Content, or Footer. A navigation
preview containing no nested interactive controls may be wrapped in a real
application link:

```tsx
<a
  aria-labelledby="quarterly-report-title"
  className="preview-link"
  href="/reports/quarterly"
>
  <Card.Root as="article">
    <Card.Header>
      <Card.Title as="h2" id="quarterly-report-title">
        Quarterly report
      </Card.Title>
    </Card.Header>
  </Card.Root>
</a>
```

Give the wrapping link an explicit accessible name, such as by connecting it to
the Card title with `aria-labelledby`. Do not rely on nested article content to
produce the link name consistently across browsers and assistive technology.

A higher-level single-action composition may use Atom Pressable around Card,
but Pressable owns the behavior and the Card must not contain nested Buttons or
Links. Navigation should remain a real link. Card itself never interprets
`onClick` as keyboard-accessible behavior.

## Examples

### Header action and wrapping footer

```tsx
<Card.Root>
  <Card.Header>
    <Card.Title>Workspace</Card.Title>
    <Card.Description>Three active collaborators</Card.Description>
    <Card.Action>
      <Button size="sm" tone="neutral" variant="ghost">Edit</Button>
    </Card.Action>
  </Card.Header>
  <Card.Content>Workspace details</Card.Content>
  <Card.Footer>
    <Button size="sm">Open</Button>
    <Button size="sm" tone="neutral" variant="outline">Archive</Button>
  </Card.Footer>
</Card.Root>
```

### Content-only surface

```tsx
<Card.Root variant="subtle">
  <Card.Content>One quiet grouped region.</Card.Content>
</Card.Root>
```

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
