# NativeSelect

## When and where to use

Use browser-native selection for a short set of text options, especially when
the operating system should supply the mobile picker.

## When not to use

Use Select for a custom overlay and rich options, Combobox for filtering, and
MultiSelect for a custom multiple-selection interface. Native select does not
support readonly: disabled is a different behavior and omits form submission.

## Installation and imports

```tsx
import { NativeSelect } from "@flowstack-ui/brick/native-select";
import { Field } from "@flowstack-ui/brick/field";
import "@flowstack-ui/brick/styles.css";
```

Root exports from `@flowstack-ui/brick` are equivalent. Modular CSS requires
`@flowstack-ui/brick/styles/core.css`, `styles/native-select.css`, and the styles
of composed components, such as Field.

```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/native-select.css";
```

## Quick start

```tsx
<Field.Root>
  <Field.Label>Framework</Field.Label>
  <NativeSelect.Root>
    <NativeSelect.Field name="framework" defaultValue="react">
      <option value="react">React</option>
      <option value="vue">Vue</option>
    </NativeSelect.Field>
    <NativeSelect.Indicator />
  </NativeSelect.Root>
</Field.Root>
```

## Anatomy and DOM ownership

Root is a visual div, Field is the actual select owned by Atom, and Indicator
is a decorative span with a default SVG chevron. Keep native option and optgroup
children inside Field. No portal, custom listbox, hidden input, or duplicate value
is introduced. Root and Indicator cannot change host; Field remains a select.

## API

| Prop | Values | Default |
| --- | --- | --- |
| `size` | seven control sizes or a responsive object | `lg` |
| `variant` | outline, soft, ghost, plain, underline | `outline` |
| `shape` | sharp, rounded, pill | `rounded` |
| `fullWidth` | boolean | `true` |
| `multiple` | boolean | `false` |

NativeSelectRootProps: size uses the shared seven control sizes `2xs`, `xs`,
`sm`, `md`, `lg`, `xl`, `2xl` (default `lg`), including sparse responsive values.
NativeSelectVariant is `outline`, `soft`, `ghost`, `plain`, `underline`; default
`outline`. NativeSelectShape is `sharp`, `rounded`, `pill`; default `rounded`.
Do not supply shape with underline. fullWidth defaults true; multiple defaults
false. rows sets the native visible-row count (positive integer). Multiple or
rows greater than one switches to list presentation and hides Indicator.
Root disabled, invalid and required are optional inherited defaults for Field.

NativeSelectFieldProps preserve native select props, events and ref, including
value/defaultValue, name, form, autoComplete, required, disabled, aria-* and
validationBehavior. Native multiple/size are configured as Root multiple/rows
to keep its decorative anatomy synchronized. Explicit Field state wins over
Root, then Field context. Controlled values remain application-owned.

NativeSelectIndicatorProps preserve span attributes and ref. Children replace
the default glyph. Omitting Indicator also removes its reserved end spacing.
All parts accept className, style and data-slot. Named exports NativeSelectRoot,
NativeSelectField and NativeSelectIndicator match their namespace parts.

### Shared radius selection

The parts listed for this component in the [Radius guide](../../guides/radius.md)
accept the shared token-only `Radius` contract. Omission preserves the owner’s
normal corners. Core sizes and semantic roles are distinct; arbitrary lengths
and responsive objects are not accepted. Where a legacy corner `shape` exists,
choose either it or `radius`, not both. This does not change behavior, sizing,
or the independently owned corners of other parts.

## Visual recipes and states

Shared control geometry keeps all variants at the same border-box height as
same-sized Input. The existing 2xs Button is a smaller compact action target;
do not infer identical intrinsic height from a stretched comparison row.
Outline is transparent; soft has a subtle fill; ghost
has no idle border; plain also omits hover fill; underline keeps its bottom
border. Focus, invalid and disabled are distinct. Native options/popup appearance
and multiple selection gestures remain browser/OS-owned, not pixel-identical
across platforms.

## Tokens and CSS hooks

Semantic Theme color, radius, motion and shared control-size tokens own the
recipe; no new public component tokens. Classes are .brick-native-select,
.brick-native-select-field and .brick-native-select-indicator. Root emits
`data-variant`, `data-shape`, `data-full-width`, `data-list`, `data-slot` and shared responsive size
attributes. Slots are native-select, native-select-field, native-select-indicator.
Field emits Atom disabled, required and invalid state attributes.

## Customization

Use the closed recipe props first, then application-owned className/style where
needed. Do not depend on OS popup pixels or move browser behavior into CSS.

## Responsive behavior

size={{ lg: "xl" }} uses default lg below the lg breakpoint; explicit initial
overrides that baseline. One SSR-stable DOM tree. Parent layout owns width and
placement; the native popup does not follow application overlay geometry.

## Accessibility

Supply Field.Label or another accessible name. Native keyboard selection,
typeahead, focus, option disabling, grouping, form submission and reset remain
native. Label, description, validation and explicit state overrides use Atom
Field/Form integration. No readonly emulation or custom keyboard interception.
Logical spacing supports RTL; forced colors retains boundaries and focus.

## Composition, native props, and refs

Use native option/optgroup inside Field, inside Root. Root forwards a div ref,
Field an HTMLSelectElement ref, Indicator a span ref. Native Field events and
consumer attributes remain on the select, not the visual wrapper.

## Examples

The playground covers recipes, sizes, shapes, controlled/uncontrolled values,
groups, multiple/list rows, states, forms, indicator omission, RTL and appearance.
Native OS picker and assistive-technology checks require manual verification.

## Evidence

- [Playground](../../../playground/src/components/native-select/)
- [Unit tests](../../../test/components/native-select/)
- [Type tests](../../../test/types/components/native-select.test.ts)
- [Browser tests](../../../playground/tests/components/native-select/behavior.spec.ts)
- [Visual tests](../../../playground/tests/components/native-select/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/native-select.md)

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).
