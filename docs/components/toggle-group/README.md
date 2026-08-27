# Toggle Group

ToggleGroup coordinates related single- or multiple-selection pressed commands
using Atom state and keyboard behavior plus Brick recipes.

## When and where to use

Use it for related view, formatting, or filter commands whose pressed state is
meaningful.

## When not to use

Use Toggle for one command, RadioGroup for form choices, and Tabs for panel
navigation. Required selection and persistence remain application policy.

## Installation and imports

```tsx
import { ToggleGroup } from "@flowstack-ui/brick/toggle-group";
import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/toggle-group.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


## Quick start

```tsx
<ToggleGroup.Root aria-label="Alignment" defaultValue="start">
  <ToggleGroup.Item value="start">Start</ToggleGroup.Item>
  <ToggleGroup.Item value="center">Center</ToggleGroup.Item>
</ToggleGroup.Root>
```

## Anatomy and DOM ownership

`Root` is an Atom group `div` with an `HTMLDivElement` ref. `Item` is an Atom
toggle button with an `HTMLButtonElement` ref. Brick adds no private DOM.

## API

Public exports are `ToggleGroup`, `ToggleGroupRoot`, `ToggleGroupItem`,
`ToggleGroupRootProps`, `ToggleGroupSingleProps`,
`ToggleGroupMultipleProps`, and `ToggleGroupItemProps`.

Root is a discriminated union: single mode uses `type?: "single"`, string
values, and `(value: string) => void`; multiple mode requires
`type="multiple"`, string-array values, and a string-array callback.

| Root prop | Values | Default |
| --- | --- | --- |
| `variant` | `solid`, `soft`, `outline`, `ghost` | `soft` |
| `tone` | `accent`, `neutral` | `accent` |
| `size` | `sm`, `md`, `lg` | `md` |
| `shape` | `rounded`, `pill` | `rounded` |
| `attached` | `boolean` | `false` |
| `fullWidth` | `boolean` | `false` |

| Item prop | Values | Default |
| --- | --- | --- |
| `iconOnly` | `boolean` | `false` |

Item requires `value`. Atom supplies
orientation, direction, looping, disabled state, composition, and native props.
Native `color` is excluded.

Neutral solid selection uses a strong theme-derived neutral surface with the
normal foreground instead of the inverse black/white pair.

Outline selection uses the tone's solid accent for its border while preserving
the normal primary foreground. This keeps selection visible without tinting
labels or turning the outline recipe into a soft fill.

Disabled Items use Toggle's faded disabled foreground and quiet surface;
selected disabled Items do not retain enabled outline or inset emphasis.

## Visual recipes and states

Root variant and tone recipes cascade uniformly to Items. Separated groups use a gap and may
wrap; attached groups join borders and logical corners. `fullWidth` distributes
Items evenly. Every variant retains a distinct selected treatment.

## Tokens and CSS hooks

Stable hooks are `.brick-toggle-group`, `.brick-toggle-group-item`, their Atom
slots/state attributes, and Root `data-orientation`, `data-attached`,
`data-full-width`, `data-variant`, `data-tone`, `data-size`, and `data-shape`. Item exposes
`data-state`, `data-value`, `data-disabled`, and `data-icon-only`. Public tokens
are `--brick-toggle-group-gap`, `--brick-toggle-min-block-size`,
`--brick-toggle-padding-inline`, `--brick-toggle-gap`,
`--brick-toggle-radius`, and `--brick-toggle-icon-size`.

## Customization

Set group props first so Items remain consistent, then use public group/Toggle
tokens. Use part `className` or `style` only for scoped exceptions.

## Responsive behavior

Separated horizontal groups can wrap; vertical groups stack. Attached groups
do not wrap. Logical corners and Atom arrow behavior respect direction.

## Accessibility

Atom owns group semantics, `aria-pressed`, roving focus, arrows, Home/End,
looping, and disabled-item skipping. Give Root a name when context is
insufficient and give every Item a stable complete name.

## Composition, native props, and refs

Root and Item inherit Atom composition and native props. Root ref targets its
`div`; Item ref targets its `button`. Preserve these semantics when composing.

## Examples

```tsx
<ToggleGroup.Root type="multiple" attached defaultValue={["bold"]}>
  <ToggleGroup.Item value="bold">Bold</ToggleGroup.Item>
  <ToggleGroup.Item value="italic">Italic</ToggleGroup.Item>
</ToggleGroup.Root>
```

## Evidence

- [Playground](../../../playground/src/components/toggle-group/ToggleGroupPage.tsx)
- [Unit test](../../../test/components/toggle-group/toggle-group.test.tsx)
- [Type owner](../../../test/types/components/toggle-group.test.ts)
- [Browser spec](../../../playground/tests/components/toggle-group/behavior.spec.ts)
- [Visual spec](../../../playground/tests/components/toggle-group/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/toggle-group.md)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
