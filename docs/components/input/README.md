# Input

Input is a finished single-line text-entry control built on Atom Input. Atom
owns native input behavior, value state, validation, reset, Field
relationships, Clear behavior, and the input ref; Brick owns the visual
wrapper, recipes, geometry, adornment layout, and static CSS.

## When and where to use

Use Input for one line of text, email, password, search, telephone, or URL
entry. Compose it with Field when the control needs a visible label,
description, required indicator, or error.

## When not to use

Use Textarea for multiline content and Number Input when values need stepping,
parsing, or numeric constraints. Use a specific selection, autocomplete, OTP,
file, date, time, or password-toggle component for those behaviors.

Input does not generate labels, messages, counters, masks, floating labels,
attached buttons, warning/success states, or application form logic.

## Installation and imports

Import from the package root or stable component subpath and load Brick styles
once:

```tsx
import { Input } from "@flowstack-ui/brick";
// or
import { Input } from "@flowstack-ui/brick/input";

import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/input.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


Public exports are `Input`, `InputProps`, `InputVariant`, `InputSize`,
`InputShape`, and `InputType`.

## Quick start

```tsx
import { Field, Input } from "@flowstack-ui/brick";

<Field.Root id="account-email" required>
  <Field.Label>Email</Field.Label>
  <Input name="email" required type="email" />
  <Field.Description>Use your work address.</Field.Description>
  <Field.Error>Enter a valid email address.</Field.Error>
</Field.Root>;
```

Placeholder text is a hint, not a replacement for the visible label.

## Anatomy and DOM ownership

Input is a direct component:

```tsx
<Input />
```

Representative output:

```html
<span
  class="brick-input"
  data-full-width=""
  data-shape="rounded"
  data-size="md"
  data-slot="input"
  data-variant="outline"
>
  <input
    class="brick-input-control"
    data-slot="input-control"
    type="text"
  />
</span>
```

The Brick `span` is a non-semantic visual wrapper. Atom Root renders the
native `input`, which remains the role, value, focus, form, and ref target.

Optional anatomy appears in logical order:

| Part | Element/owner | Stable class | Default slot |
| --- | --- | --- | --- |
| Visual root | Brick `span` | `.brick-input` | `input` |
| Native control | Atom/native `input` | `.brick-input-control` | `input-control` |
| Start adornment | Brick `span` | `.brick-input-start` | `input-start` |
| End adornment | Brick `span` | `.brick-input-end` | `input-end` |
| Clear action | Atom Clear `button` | `.brick-input-clear` | `input-clear` |

Clear artwork is private decorative anatomy. The forwarded ref always targets
`HTMLInputElement`, not the wrapper.

## API

### Brick visual and content props

| Prop | Values | Default |
| --- | --- | --- |
| `type` | `text`, `email`, `password`, `search`, `tel`, `url` | `text` |
| `variant` | `outline`, `soft`, `underline` | `outline` |
| `size` | `sm`, `md`, `lg` | `md` |
| `shape` | `sharp`, `rounded`, `pill` | `rounded` |
| `fullWidth` | `boolean` | `true` |
| `startAdornment` | `ReactNode` | none |
| `endAdornment` | `ReactNode` | none |
| `clearable` | `boolean` | `false` |
| `clearLabel` | `string` | `"Clear input"` |
| `onClear` | `() => void` | none |
| `inputClassName` | `string` | none |
| `inputStyle` | `CSSProperties` | none |

`underline` has fixed sharp geometry and does not accept `shape`.

### Native input types

`InputType` supports `text`, `email`, `password`, `search`, `tel`, and `url`.
Other native input types require their own visual and behavioral component
contracts.

### Atom and native behavior

Input forwards Atom's controlled `value`, uncontrolled `defaultValue`,
`onValueChange`, `invalid`, `disabled`, `required`, `readOnly`, and
`validationBehavior`. It preserves supported native props such as `name`,
`form`, `autoComplete`, `inputMode`, `pattern`, `minLength`, `maxLength`,
`placeholder`, `spellCheck`, events, ARIA, and `data-*`.

Brick's visual `size` replaces the native numeric character-width `size`
attribute.

`className` and `style` apply to the visual wrapper. Use `inputClassName` and
`inputStyle` for the native input.

## Visual recipes and states

- `outline` uses a complete visible border and raised/base control surface.
- `soft` uses a subtle filled surface and restrained border.
- `underline` uses a transparent surface and one bottom indicator.

`sm`, `md`, and `lg` use 36px, 44px, and 52px minimum block sizes. Input text
does not fall below 16 CSS pixels.

`sharp`, `rounded`, and `pill` change geometry only. Input is full width by
default; `fullWidth={false}` uses intrinsic fit-content sizing within the
available container.

Atom attributes drive filled, focused, disabled, required, read-only, and
invalid state. Brick adds hover-capable pointer treatment, `:focus-within`
focus paint, semantic invalid/disabled/read-only colors, autofill-safe text,
dark appearance, reduced-motion, and forced-color treatment.

## Tokens and CSS hooks

Stable classes and slots are listed in
[Anatomy and DOM ownership](#anatomy-and-dom-ownership).

The root exposes `data-slot`, `data-variant`, `data-size`, `data-shape`, and
`data-full-width`. The native control retains Atom state attributes such as
`data-filled`, `data-focused`, `data-disabled`, `data-required`,
`data-readonly`, and `data-invalid`.

Public component tokens:

- `--brick-input-min-block-size`
- `--brick-input-padding-inline`
- `--brick-input-gap`
- `--brick-input-radius`
- `--brick-input-font-family`
- `--brick-input-font-size`
- `--brick-input-font-weight`
- `--brick-input-line-height`
- `--brick-input-letter-spacing`
- `--brick-input-background`
- `--brick-input-foreground`
- `--brick-input-placeholder-foreground`
- `--brick-input-border`
- `--brick-input-hover-background`
- `--brick-input-hover-border`
- `--brick-input-focus-ring`
- `--brick-input-invalid-border`
- `--brick-input-disabled-background`
- `--brick-input-disabled-foreground`
- `--brick-input-disabled-border`
- `--brick-input-readonly-background`
- `--brick-input-adornment-foreground`
- `--brick-input-adornment-size`
- `--brick-input-clear-target-size`
- `--brick-input-clear-icon-size`
- `--brick-input-clear-foreground`
- `--brick-input-clear-hover-background`

The typography variables default to `field-value-md`, or `field-value-lg` for
large Input.

## Customization

Use variant, size, shape, and width props first; use Brick semantic tokens for
system-wide changes; then use Input tokens for scoped changes.

```tsx
<Input
  aria-label="Customized query"
  inputStyle={{ letterSpacing: "0.08em" }}
  style={{
    "--brick-input-background": "#eefbf5",
    "--brick-input-border": "#18794e",
    "--brick-input-focus-ring": "#18794e",
    "--brick-input-foreground": "#0d3b2a",
    "--brick-input-radius": "0.75rem",
  }}
/>
```

`className`/`style` customize the wrapper; `inputClassName`/`inputStyle`
customize the native input. Do not target the private clear SVG paths or Atom
internal validation attributes.

## Responsive behavior

Input uses logical sizing and spacing, `min-inline-size: 0`, and
`max-inline-size: 100%`. Adornments and Clear reverse naturally in RTL.
Long values retain native horizontal editing without widening the page.

The component remains usable at narrow widths and 200%/400% zoom. Brick does
not add responsive object props, automatic breakpoints, or application layout
policy.

## Accessibility

Every Input needs an accessible name, normally a visible `Field.Label`.
Placeholder text is not a label. Use native `type` and `autoComplete` values so
mobile keyboards, autofill, and input purpose remain available.

Atom owns native editing, keyboard behavior, value state, Field IDs and
descriptions, required/read-only/invalid ARIA, validation, correction, reset,
and Clear focus restoration.

Clear is intentionally outside sequential Tab order because keyboard users can
edit and delete with native input commands. Pointer activation clears once and
restores input focus. Use `clearLabel` for localized accessible text.

Adornment content does not become the accessible name. Mark decorative icons
appropriately and repeat meaningful prefix/suffix information in the visible
label or description.

## Composition, native props, and refs

Input always renders its visual wrapper and a native input. It does not expose
`asChild`, `render`, or `children`; native input semantics are fixed.

The ref targets `HTMLInputElement`. Supported native props, form ownership,
events, ARIA, and data attributes reach that input. Field state and
relationships inherit through Atom, while explicit local values take
precedence.

## Examples

### Clearable search

```tsx
<Field.Root id="site-search">
  <Field.Label>Search</Field.Label>
  <Input
    clearLabel="Clear search"
    clearable
    name="query"
    startAdornment={<SearchIcon aria-hidden="true" />}
    type="search"
  />
</Field.Root>
```

### Controlled value

```tsx
const [value, setValue] = useState("");

<Input
  aria-label="Project name"
  onValueChange={setValue}
  value={value}
/>;
```

### External form ownership

```tsx
<form id="profile-form">
  <Button type="submit">Save</Button>
</form>

<Field.Root id="profile-name">
  <Field.Label>Name</Field.Label>
  <Input form="profile-form" name="name" />
</Field.Root>
```

## Evidence

- [Playground](../../../playground/src/components/input/InputPage.tsx)
- [Unit test](../../../test/components/input/input.test.tsx)
- [Type owner](../../../test/types/components/input.test.ts)
- [Browser spec](../../../playground/tests/components/input/behavior.spec.ts)
- [Visual spec](../../../playground/tests/components/input/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/input.md)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
