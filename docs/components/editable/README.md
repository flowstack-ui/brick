# Editable

## When and where to use

Rename a title or edit short existing text in place, with explicit cancellation.

## When not to use

Use Input or Textarea for an always-visible field. This is not rich text,
contenteditable, a network persistence layer, or a conflict-resolution engine.

## Installation and imports

```tsx
import { Editable, useEditable } from "@flowstack-ui/brick/editable";
import "@flowstack-ui/brick/styles.css";
```

Root exports from `@flowstack-ui/brick` are equivalent. Modular styles use
`@flowstack-ui/brick/styles/core.css` and `@flowstack-ui/brick/styles/editable.css`,
plus the CSS of any composed components.

## Quick start

```tsx
<Editable.Root defaultValue="Project notes">
  <Editable.Label>Document name</Editable.Label>
  <Editable.Area>
    <Editable.Preview />
    <Editable.Input />
  </Editable.Area>
</Editable.Root>
```

## Anatomy and DOM ownership

Root, Area and Control are divs; Label is a label; Preview is a span; Input and
Textarea keep invariant native hosts. EditTrigger, SubmitTrigger and CancelTrigger
are native buttons with optional one-element asChild/render projection. Atom owns
state, events, focus, native form value and functional autoresize. Brick adds recipes.
Use exactly one editor; do not duplicate a hidden named input.

## API

| Prop | Values | Default |
| --- | --- | --- |
| `size` | `sm`, `md`, `lg` | `md` |

EditableRootProps extends Atom's options with EditableSize `sm`, `md`, `lg`,
default `md`. EditableRootProviderProps accepts the controller from useEditable
and the same size. EditableContext exposes that controller to a render function;
useEditableContext reads it in descendants.

EditableOptions: value/defaultValue strings (default empty), edit/defaultEdit
(default false), onValueChange({value}), onEditChange({edit}),
onValueCommit({value}) and onValueRevert({value}). EditableActivationMode is
`focus` (default), `click`, `dblclick` or `none`. EditableSubmitMode is `both`
(default), `enter`, `blur` or `none`. selectOnFocus defaults true; autoResize
defaults false. maxLength limits text. placeholder accepts a string or separate
edit/preview strings. disabled, readOnly, required, invalid, name, form, id, ids,
dir, translations, getRootNode, finalFocusEl and cancellable onFocusOutside,
onPointerDownOutside, onInteractOutside are supported.

EditableController exposes editing, empty, value, valueText, setValue, clearValue,
edit, submit and cancel. A controlled parent must apply requested changes;
refused close requests do not invoke commit/revert. Cancellation restores the
session baseline, including empty/defaultEdit values. Native reset restores the
uncontrolled initial value; controlled values remain application-owned.

EditableAreaProps, EditableLabelProps, EditablePreviewProps, EditableInputProps,
EditableTextareaProps, EditableControlProps and EditableTriggerProps retain their
native attributes and refs. Named exports mirror namespace parts, including
EditableRoot, EditableRootProvider, EditableArea, EditableLabel, EditablePreview,
EditableInput, EditableTextarea, EditableControl, EditableEditTrigger,
EditableSubmitTrigger, EditableCancelTrigger and EditableContext.

## Visual recipes and states

Three coordinated text/padding sizes keep preview and editor baselines aligned.
Preview is transparent with subtle hover; editors have an outlined boundary and
visible focus. Invalid, readonly and disabled are separate states. Shape follows
the Theme control radius; there is no component-specific hardcoded radius.

## Tokens and CSS hooks

Semantic typography, spacing, radius, text, border and focus tokens own the recipe.
No new public component tokens. Classes use brick-editable and part suffixes.
Root emits `data-size` and inherited data-slot, data-state, data-disabled,
data-readonly, data-invalid, data-autoresize. CSS overrides are application-owned.

## Customization

Use size, native editor props and explicit controls first. Provide translated
input/edit/submit/cancel names through translations or native accessible labels.
Trigger children are application content; use asChild with Button/IconButton for
their action recipes instead of overriding internal anatomy.

## Responsive behavior

Width follows the parent. Area shrinks and long text wraps; Control wraps as a
whole when necessary. size is scalar, not a breakpoint object. autoResize changes
functional measurement, not application layout or persistence policy.

## Accessibility

Provide Label, Field.Label or another accessible name. Enter commits Input when
enabled; Textarea retains Enter for newlines and uses Ctrl/Meta+Enter to commit.
Escape cancels. Composition Enter is not submission. Focus moving to explicit
controls remains internal. Outside interaction commits for blur/both, cancels
otherwise; handlers may prevent it. Explicit completion restores finalFocusEl,
then edit trigger/preview; outside completion does not steal focus.

## Composition, native props, and refs

Native input/textarea refs point to the actual editor. Field state is inherited
when Root or useEditable is created inside its scope; for an external controller,
place the controller-owning child within Field.Root or pass flags explicitly.
Use native name/form for real submission and native reset. asChild/render are
trigger-only; do not replace Input with an arbitrary host.

## Examples

The playground covers activation and submit modes, controlled state, external
controllers, multiline/autoresize, placeholders, limits, forms, validation,
application rejection, nested dialogs, sizes, RTL and appearances.

## Evidence

- [Playground](../../../playground/src/components/editable/)
- [Unit tests](../../../test/components/editable/)
- [Type tests](../../../test/types/components/editable.test.ts)
- [Browser tests](../../../playground/tests/components/editable/)
- [Behavior](../../../playground/tests/components/editable/behavior.spec.ts)
- [Visual](../../../playground/tests/components/editable/visual.spec.ts)
- [Manual](../../../playground/manual-tests/editable.md)

Actual zoom, physical-device and manual screen-reader checks are separate gates;
automated checks are not evidence that those manual checks were performed.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).
