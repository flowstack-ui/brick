# Textarea

Textarea is Brick's finished native multi-line plain-text control. It composes
released Atom value, form, Field, validation, auto-resize, and character-count
behavior with Brick's visual recipes and customization hooks.

## When and where to use

Use Textarea for comments, descriptions, notes, addresses, messages, and other
values expected to span multiple lines. Compose it with Field whenever a
visible label, description, required indicator, or error is needed.

## When not to use

Use Input for a single line. Use a purpose-built editor for rich text,
Markdown, code, mentions, tags, or formatting. Textarea does not own labels,
submission, product-specific word limits, adornments, clear actions, or
application persistence.

## Installation and imports

```tsx
import { Textarea } from "@flowstack-ui/brick";
// or
import { Textarea } from "@flowstack-ui/brick/textarea";
import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/textarea.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.

## Quick start

```tsx
import { Field, Textarea } from "@flowstack-ui/brick";

<Field.Root id="project-summary">
  <Field.Label>Project summary</Field.Label>
  <Textarea.Root name="summary" />
  <Field.Description>Explain the intended result.</Field.Description>
</Field.Root>;
```

## Anatomy and DOM ownership

```tsx
<Textarea.Root maxLength={280}>
  <Textarea.Count />
</Textarea.Root>
```

| Part    | Default element                            | Owner                              | Ref target                   |
| ------- | ------------------------------------------ | ---------------------------------- | ---------------------------- |
| `Root`  | visual `span` containing native `textarea` | Brick wrapper + Atom Textarea Root | native `HTMLTextAreaElement` |
| `Count` | `span`                                     | Atom count state + Brick styling   | `HTMLSpanElement`            |

Root always preserves native textarea semantics. Its wrapper is non-semantic
and never focusable. Count is optional and follows the current Atom value.

## API

### Root

| Prop                                 | Type                                             | Default                             |
| ------------------------------------ | ------------------------------------------------ | ----------------------------------- |
| `variant`                            | `"outline" \| "soft" \| "underline"`             | `"outline"`                         |
| `size`                               | `"2xs" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl"`; or a responsive value | `"lg"` |
| `shape`                              | `"sharp" \| "rounded"`                           | `"rounded"`                         |
| `fullWidth`                          | `boolean`                                        | `true`                              |
| `minRows`                            | `number`                                         | `3`                                 |
| `autoResize`                         | `boolean`                                        | `false`                             |
| `maxRows`                            | `number`                                         | only with `autoResize`              |
| `resize`                             | `"none" \| "vertical" \| "horizontal" \| "both"` | `"vertical"` when not auto-resizing |
| `className`, `style`                 | wrapper customization                            | —                                   |
| `textareaClassName`, `textareaStyle` | native control customization                     | —                                   |

Auto-resize and manual `resize` are intentionally exclusive. Underline has
fixed sharp geometry and rejects `shape`. Root otherwise accepts released Atom
Textarea props and supported native textarea props, including controlled and
uncontrolled values, `name`, `form`, `rows`, `cols`, `wrap`, `placeholder`,
`minLength`, `maxLength`, validation, events, ARIA, and data attributes.

Closed values are:

- variants: `outline`, `soft`, `underline`;
- sizes: `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`;
- shapes: `sharp`, `rounded`;
- manual resize: `none`, `vertical`, `horizontal`, `both`.

### Count

Count accepts released Atom Textarea Count props, including `render`,
`asChild`, native span props, and `aria-live`. Its default content is the
current length or `current/maxLength`.

Public exports are `Textarea`, `TextareaRoot`, `TextareaCount`,
`TextareaRootProps`, `TextareaCountProps`, `TextareaVariant`, `TextareaSize`,
`TextareaShape`, and `TextareaResize`.

## Visual recipes and states

- `outline` uses a complete border over a transparent rest and hover surface,
  matching Input on shared form surfaces.
- `soft` uses a subtle filled surface and restrained border.
- `underline` uses a transparent surface and bottom indicator.
- Sizes change padding and typography while keeping the same native row count.
- Shapes change only outline/soft corner geometry.
- Invalid changes the border; compose Field.Error for non-color meaning.
- Disabled and read-only remain visually and semantically distinct.
- Count aligns to the logical end and uses danger text for Atom over-limit
  state.
- Forced colors and reduced motion receive explicit treatment.

## Tokens and CSS hooks

Stable classes and the `data-slot` defaults:

- `.brick-textarea` / `data-slot="textarea"`
- `.brick-textarea-control` / `data-slot="textarea-control"`
- `.brick-textarea-count` / `data-slot="textarea-count"`

Root exposes `data-variant`, `data-size`, `data-shape`, `data-resize`,
`data-full-width`, and `data-autoresize`. Atom state remains on the native
control and Count.

Public component variables:

```css
--brick-textarea-padding-inline
--brick-textarea-padding-block
--brick-textarea-gap
--brick-textarea-radius
--brick-textarea-font-family
--brick-textarea-font-size
--brick-textarea-font-weight
--brick-textarea-line-height
--brick-textarea-letter-spacing
--brick-textarea-background
--brick-textarea-foreground
--brick-textarea-placeholder-foreground
--brick-textarea-border
--brick-textarea-hover-background
--brick-textarea-hover-border
--brick-textarea-focus-ring
--brick-textarea-invalid-border
--brick-textarea-disabled-background
--brick-textarea-disabled-foreground
--brick-textarea-disabled-border
--brick-textarea-readonly-background
--brick-textarea-count-foreground
--brick-textarea-count-over-limit-foreground
```

## Customization

Prefer visual props, then semantic tokens, then component variables. Use Root
`className`/`style` for the wrapper and `textareaClassName`/`textareaStyle` for
the native editing surface.

```tsx
<Textarea.Root
  aria-label="Notes"
  style={
    {
      "--brick-textarea-border": "#18794e",
      "--brick-textarea-focus-ring": "#18794e",
      "--brick-textarea-radius": "0.75rem",
    } as React.CSSProperties
  }
  textareaStyle={{ letterSpacing: "0.04em" }}
/>
```

## Responsive behavior

Root defaults to full width, keeps `min-inline-size: 0`, and cannot exceed its
container. The `lg` default uses 16px editable text; compact recipes are
deliberate dense-interface choices. Logical alignment
supports RTL. Applications own surrounding responsive layout and may opt out
of full width. Horizontal/both manual resize remains constrained by the
container.

## Accessibility

The native textarea supplies multi-line editing, selection, value, keyboard,
mobile, and form semantics. Provide an accessible name, normally Field.Label;
placeholder is not a label. Atom supplies Field relationships, required,
read-only, disabled, invalid, reset, and validation behavior. Count is a polite
live region by default, so include it only when its updates help the task.

Disabled controls are unavailable and omitted from submission. Read-only
controls remain focusable and submitted. Brick adds no wrapper role or custom
keyboard behavior.

## Composition, native props, and refs

Root does not expose `render` or `asChild` because the native textarea is the
semantic contract. Count retains Atom composition. Root's ref always targets
the native textarea. Explicit native `rows` wins over the default `minRows`
for the rendered row count. Atom owns value callback order, native reset,
external `form` ownership, and inline/native validation.

## Examples

### Character count

```tsx
<Textarea.Root aria-label="Release notes" maxLength={280}>
  <Textarea.Count />
</Textarea.Root>
```

### Bounded auto-resize

```tsx
<Textarea.Root aria-label="Description" autoResize minRows={3} maxRows={8} />
```

### Manual resize

```tsx
<Textarea.Root aria-label="Notes" resize="both" />
```

## Evidence

- [Playground route](../../../playground/src/components/textarea/TextareaPage.tsx)
- [Component test](../../../test/components/textarea/textarea.test.tsx)
- [Type test](../../../test/types/components/textarea.test.ts)
- [Browser test](../../../playground/tests/components/textarea/behavior.spec.ts)
- [Visual test](../../../playground/tests/components/textarea/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/textarea.md)
- [Packed Consumer](../../../apps/consumer/src/App.tsx)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
