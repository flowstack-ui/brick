# Card

Card is a static compound surface for grouping information and related actions
about one subject.

## When and where to use

Use Card for summaries, settings groups, product or article previews, metrics,
profiles, and other reusable content units that benefit from a visible surface
and optional header, supporting description, body, or footer.

Card owns visual grouping and content anatomy. Use Brick `Container`,
`Stack`, `Grid`, to control its width, height, position, and
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
import { Card } from "@flowstack-ui/brick/card";
import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/card.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.

`Card` and its public types are also exported from `@flowstack-ui/brick`.

## Quick start

```tsx
<Card.Root as="article" aria-labelledby="report-title">
  <Card.Header>
    <Card.Title as="h2" id="report-title">
      Quarterly report
    </Card.Title>
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

| Part               | Default element | Ref target             | Purpose                                                  |
| ------------------ | --------------- | ---------------------- | -------------------------------------------------------- |
| `Card.Root`        | `div`           | `HTMLElement`          | Surface, clipping, variant, size, and semantic container |
| `Card.Header`      | `div`           | `HTMLDivElement`       | Title, description, and compact trailing-action layout   |
| `Card.Title`       | `h3`            | `HTMLHeadingElement`   | Visible subject heading                                  |
| `Card.Description` | `p`             | `HTMLParagraphElement` | Supporting header text                                   |
| `Card.Action`      | `div`           | `HTMLDivElement`       | Compact trailing content without generated behavior      |
| `Card.Content`     | `div`           | `HTMLDivElement`       | Primary body region                                      |
| `Card.Footer`      | `div`           | `HTMLDivElement`       | Wrapping actions or secondary content                    |

Card uses no React context and adds no client boundary. Root recipes reach its
parts through static CSS. Each nested Root resets its recipe defaults.

## API

Public exports are `Card`, `CardRootProps`, `CardRootElement`,
`CardHeaderProps`, `CardTitleProps`, `CardTitleElement`,
`CardDescriptionProps`, `CardActionProps`, `CardContentProps`,
`CardFooterProps`, `CardVariant`, and `CardSize`.

### Card.Root

| Prop       | Values                            | Default        |
| ---------- | --------------------------------- | -------------- |
| `as`       | `div`, `article`, `section`, `li` | `div`          |
| `bordered` | boolean                           | variant recipe |
| `variant`  | `ResponsiveValue<CardVariant>`: outline/elevated/subtle   | `outline`      |
| `size`     | `ResponsiveValue<CardSize>`: sm/md/lg                  | `md`           |
| `overflow` | `clip`, `visible` | `clip` |
| `asChild` | boolean; one React element, mutually exclusive with `as` | `false` |
| `selected` | boolean; presentation only | `false` |
| `radius` | `Radius` | surface role |

Root also accepts ordinary `HTMLAttributes<HTMLElement>`, including `id`,
ARIA and data attributes, events, `className`, `style`, and `ref`.
`bordered={false}` removes only the selected recipe's border geometry while
retaining its background, elevation, radius, clipping, and anatomy. It is
useful when authored media must reach Card's clipped outer edge.

### Card.Title

`as` accepts `h1`, `h2`, `h3`, `h4`, `h5`, or `h6` and defaults to `h3`.
Choose the level from the
document hierarchy, not the desired visual size. An `h1` is valid when Card
contains the page's real main title—for example, a sign-in page whose primary
content is one Card. Repeated cards normally use `h2` or `h3`.

### Other parts

Every part accepts `asChild` with one non-Fragment element forwarding props and refs.
Title `asChild` is mutually exclusive with `as`; it can project onto an authored
heading. Header, Action, Content and Footer accept responsive `gap` using
`SpacingValue` (numeric spacing factors or CSS values). Omission retains 6px
Header gap, 8px Footer gap and zero Content/Action gap. Footer additionally
accepts responsive `justify`: `start` (default), `center`, `end`, `between`,
`around`, `evenly`. Native props and slots remain available. Use native semantics
appropriate to the actual host; composition adds no behavior.

`Card.Action` reserves the Header's trailing grid column across the title and
description rows. This is appropriate when both text regions should make room
for compact trailing content. When metadata belongs beside only the title and
the description should retain the full header measure, compose the title and
metadata in a Brick `HStack` and omit `Card.Action`.

### Shared radius selection

The parts listed for this component in the [Radius guide](../../guides/radius.md)
accept the shared token-only `Radius` contract. Omission preserves the owner’s
normal corners. Core sizes and semantic roles are distinct; arbitrary lengths
and responsive objects are not accepted. Where a legacy corner `shape` exists,
choose either it or `radius`, not both. This does not change behavior, sizing,
or the independently owned corners of other parts.

## Visual recipes and states

### Variants

- `outline` is the default base-surface grouping with a clear boundary and no
  shadow dependency.
- `elevated` uses the raised panel surface and a layered medium shadow without
  an ordinary border. Forced-colors restores an explicit boundary.
- `subtle` uses a quiet filled surface without shadow.

Variant recipes own their default boundary. Use `bordered` only as an explicit
override when a composition must add or remove that boundary.

Primary Card text inherits Root foreground; secondary description text has a
separate documented hook. Independent controls retain their own paint.

Card supports selected presentation and hover for ActionDelegate compositions.
It adds no focus target, pressed state, loading, disabled behavior, or tone API.
Actual controls own interaction and accessible state.

### Sizes

`sm`, `md`, and `lg` coordinate section inset, region spacing, and title scale.
They do not set width, height, grid columns, or viewport breakpoints.
Reference insets are 16/24/28px and titles are 16/18/20px, resolved from Theme
roles. Content owns full padding, uses column flex layout and grows to align footers.
Use Paragraph for inline prose rather than several bare inline siblings. Header owns top
and inline inset; Footer owns inline and bottom inset.

## Tokens and CSS hooks

### Public Card tokens

| Token                       | Responsibility                               |
| --------------------------- | -------------------------------------------- |
| `--brick-card-space`        | Section inset and coordinated region spacing |
| `--brick-card-radius`       | Root surface radius                          |
| `--brick-card-border-width` | Root border geometry                         |
| `--brick-card-shadow`       | Elevated surface shadow                      |
| `--brick-card-background` | Local fill; pair with foreground |
| `--brick-card-foreground` | Primary text inherited by Title and Content |
| `--brick-card-description-foreground` | Secondary supporting text |
| `--brick-card-border-color` | Explicit boundary color |
| `--brick-card-header-gap` | Default header child spacing |
| `--brick-card-title-size` | Title font size |
| `--brick-card-title-line-height` | Title line height |
| `--brick-card-title-weight` | Title weight |

### Stable classes and slots

| Part        | Class                     | Default slot       |
| ----------- | ------------------------- | ------------------ |
| Root        | `.brick-card`             | `card`             |
| Header      | `.brick-card-header`      | `card-header`      |
| Title       | `.brick-card-title`       | `card-title`       |
| Description | `.brick-card-description` | `card-description` |
| Action      | `.brick-card-action`      | `card-action`      |
| Content     | `.brick-card-content`     | `card-content`     |
| Footer      | `.brick-card-footer`      | `card-footer`      |

Root reflects optional `data-bordered` with the value `"false"`, plus
`data-variant` and `data-size`. Classes, slots, and the public
component tokens are the stable Card-specific CSS contract. Semantic surface,
border, text, radius, spacing, and shadow-color tokens remain the normal theme
layer.

## Customization

Choose a tested variant and size first:

```tsx
<Card.Root size="lg" variant="elevated">
  ...
</Card.Root>
```

Override semantic tokens on an application scope to theme a region. For a
local Card adjustment, use the public component tokens:

```tsx
<Card.Root
  style={
    {
      "--brick-card-radius": "0.25rem",
      "--brick-card-space": "2rem",
    } as React.CSSProperties
  }
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

### Reusable recipes and defaults

Use a typed reusable props object or application wrapper for repeated choices:

```tsx
const projectCard = { variant: "subtle", size: "sm" } satisfies
  Pick<CardRootProps, "variant" | "size">;
<Card.Root {...projectCard}>...</Card.Root>
```

For deliberate local paint changes set background, foreground and description
foreground together through the documented extension variables. Keep light/dark
contrast valid. These instance hooks are not new global Theme inputs. Global
brand changes use the Theme semantic roles. Brick intentionally has no Card-only
PropsProvider, arbitrary recipe-name extension, unstyled mode or runtime styling
engine. Use Surface/Stack when no Card recipe is wanted.

## Responsive behavior

Card is mobile-first and block-sized by its container. It uses minimum-zero
columns, logical spacing, long-content wrapping, and a wrapping Footer. Header
Action is intended for compact content; put large or multiple actions in
Footer.

Size and variant accept nonempty sparse ResponsiveValue objects at initial,
sm, md, lg and xl. Omitted initial entries inherit md/outline; each breakpoint
inherits the previous defined value. Region gap and Footer justify use the same
breakpoints. Layout columns and width still belong to Grid/Stack/Frame.

```tsx
<Card.Root size={{ md: "lg" }} variant={{ lg: "subtle" }}>
  <Card.Content gap={{ md: 4 }}>Responsive content</Card.Content>
</Card.Root>
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

Card is Brick-native. Root supports `asChild` with one host element, such as a
form, and merges refs, classes, styles, and handlers. Do not combine `as` with
`asChild`; composition does not make a generic host keyboard interactive.
Brick Image
and other authored media may be composed as children; Card
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

For a larger primary hit area use the public Brick LinkBox or ActionDelegate
composition appropriate to the task. Preserve actual links/buttons and
independent controls. Do not import Atom directly into a finished Brick
application. Card never interprets onClick as keyboard-accessible behavior.

## Examples

### Edge media and inset header

```tsx
<Card.Root as="article">
  <Image.Root src="/story.jpg">...</Image.Root>
  <Card.Header>
    <Eyebrow>Research</Eyebrow>
    <Card.Title as="h2">A field guide</Card.Title>
    <Card.Description>Practical notes from the team.</Card.Description>
  </Card.Header>
</Card.Root>
```

The Root clips the media to its outer top corners. Header owns the full text
inset below it. Content also owns complete inset when used directly after media.
Use `overflow="visible"` for protruding Float/Bleed compositions and clip media
within its own owner when needed.

### Header action and wrapping footer

```tsx
<Card.Root>
  <Card.Header>
    <Card.Title>Workspace</Card.Title>
    <Card.Description>Three active collaborators</Card.Description>
    <Card.Action>
      <Button size="sm" tone="neutral" variant="ghost">
        Edit
      </Button>
    </Card.Action>
  </Card.Header>
  <Card.Content>Workspace details</Card.Content>
  <Card.Footer>
    <Button size="sm">Open</Button>
    <Button size="sm" tone="neutral" variant="outline">
      Archive
    </Button>
  </Card.Footer>
</Card.Root>
```

### Content-only surface

```tsx
<Card.Root variant="subtle">
  <Card.Content>One quiet grouped region.</Card.Content>
</Card.Root>
```

## Evidence

- playground route: `/card`
- [playground scenarios](../../../playground/src/components/card/CardPage.tsx)
- [component test](../../../test/components/card/card.test.tsx)
- [type owner](../../../test/types/components/card.test.ts)
- [browser specification](../../../playground/tests/components/card/behavior.spec.ts)
- [visual specification](../../../playground/tests/components/card/visual.spec.ts)
- [manual-test protocol](../../../playground/manual-tests/card.md)
- [consumer integration](../../../apps/consumer/src/App.tsx)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).

### Record selection

Root accepts optional selected (boolean, default false). This is
presentation only: it emits data-selected, not aria-selected, a role,
or a tab stop. Compose a named Checkbox with the public selection utility;
optional ActionDelegate targets a real descendant primary control.
See [record selection](../../guides/record-selection.md) for the complete
state, scope, delegation and accessibility contract.

Local styling variables: --brick-card-selected-background,
--brick-card-selected-foreground, --brick-card-hover-background.
Selected paint uses `--brick-color-accent-soft` and primary text. Actionable
hover mixes primary text at 6% over the base surface; selected paint wins.
Selected paint overrides hover without changing geometry. Forced colors
uses system canvas colors; the checkbox conveys selection without color.
