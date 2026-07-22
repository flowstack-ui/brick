# CheckboxGroup

CheckboxGroup is a complete related multi-selection family. Atom owns values,
item semantics, stable label/description relationships, form participation,
validation/reset, context state, and deterministic Parent behavior; Brick owns
the finished visual rows and group layout.

## Import and anatomy

```tsx
import { CheckboxGroup } from "@flowstack-ui/brick/checkbox-group";
import "@flowstack-ui/brick/styles.css";

<CheckboxGroup.Root
  allValues={["email", "sms", "push"]}
  name="notifications"
>
  <CheckboxGroup.Parent>Select all</CheckboxGroup.Parent>
  <CheckboxGroup.Item value="email">
    <CheckboxGroup.ItemLabel>Email</CheckboxGroup.ItemLabel>
    <CheckboxGroup.ItemDescription>
      Account and product notices.
    </CheckboxGroup.ItemDescription>
  </CheckboxGroup.Item>
  <CheckboxGroup.Item value="sms">SMS</CheckboxGroup.Item>
  <CheckboxGroup.Item value="push">Push</CheckboxGroup.Item>
</CheckboxGroup.Root>
```

The exact frozen namespace is `Root`, `Item`, `ItemLabel`, `ItemDescription`,
and `Parent`. It is also exported from the package root. There is no callable
shortcut, generated options API, or automatic Fieldset wrapper.

## Root

Root forwards `value`, `defaultValue`, `onValueChange`, `allValues`, `name`,
`form`, `disabled`, `readOnly`, `invalid`, `required`, `orientation`, native
div/global/ARIA/data/event props, class, style, slot, render, asChild, ref, and
`validationBehavior` (`inline` or `native`). Brick requires exactly Atom
0.6.17.

| Prop | Values | Default |
| --- | --- | --- |
| `size` | `sm`, `md`, `lg` | `md` |
| `orientation` | `vertical`, `horizontal` | `vertical` |

Size belongs to Root and is inherited by every Item and Parent. Horizontal
groups wrap in logical order rather than forcing page overflow.

## Items and relationships

Item requires a unique string `value` and forwards its item-level state,
native, composition, and ref surface. Plain children are the concise path.
Use direct ItemLabel and ItemDescription children for structured content; Atom
generates stable `aria-labelledby` and `aria-describedby` relationships during
SSR, hydration, and client rendering. Brick's styled wrappers are registered
with Atom, so no client-only relationship repair is required.

## Parent and allValues

Parent derives unchecked, mixed, or checked state from Root `allValues`. Supply
the complete currently selectable values and omit values of individually
disabled items while disabled. Parent changes only declared values and
preserves selected values outside its scope. Empty `allValues` leaves Parent
unchecked and non-operative. Brick never infers children or owns a collection.

## Forms and Fieldset

Selected Items submit repeated name/value entries. Required means one or more
selected values; disabled controls are omitted; external `form` ownership and
native reset are supported. Compose Root inside Brick Fieldset when the set
needs a shared Legend, description, required/invalid state, and error. A
Fieldset with `Fieldset.Error` automatically presents the native one-or-more
failure inline, marks the group invalid, and focuses the first enabled Item.
Standalone groups default to native browser presentation; an explicit
`validationBehavior` overrides inheritance.
Inline validation-directed focus scrolls the first enabled Item into view,
exposes Atom's `[data-focus-visible]` state there until blur, and renders
Brick's standard focus ring for that state.
Untouched required groups remain visually neutral. Leaving the whole group
empty or removing its final selection after interaction reveals one shared
invalid state; moving between Items does not count as leaving the group.
Selecting an Item or resetting the Form clears the derived presentation.
The shared invalid treatment belongs to Root: one logical group-start cue is
shown while Item controls, labels, and descriptions remain neutral because any
eligible option can satisfy the requirement. Fieldset adds its wavy Legend and
authored error treatment when present. An Item with its own explicit `invalid`
state receives the individual control-and-row cue when Root is otherwise
valid.

Without Fieldset, Root still exposes its group-level invalid presentation. The
consumer must provide an accessible group name through `aria-label` or
`aria-labelledby` and associate any external error copy through
`aria-describedby`. CheckboxGroup does not generate labels or error messages.

## Styling and accessibility

Stable public classes are `.brick-checkbox-group`,
`.brick-checkbox-group-item`, `.brick-checkbox-group-item-label`,
`.brick-checkbox-group-item-description`, and `.brick-checkbox-group-parent`.
All rows share Checkbox's public tokens; Root additionally exposes
`--brick-checkbox-group-gap`.

Group size coordinates every Item and Parent control, indicator, gap, row
padding, and target height while keeping label typography stable across the
related set.

Every control is one semantic checkbox and one tab stop. Visual artwork is
hidden from assistive technology. Group invalidity is not presented visually
as though every option must be selected. Focus, checked/mixed, invalid,
disabled, and read-only states remain perceptible in light, dark, forced
colors, reduced motion, RTL, touch, and zoom/reflow environments.

See [CHANGELOG.md](CHANGELOG.md).
