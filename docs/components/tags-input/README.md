# TagsInput



## When and where to use

Create and edit multiple short string values in one logical field, optionally
with suggestions. Atom owns transactions, focus, keyboard, announcements and forms.

## When not to use

Use Chip for values already displayed outside an input. Use MultiSelect for a
closed option set. This is not asynchronous validation, rich text or a file picker.

## Installation and imports

```tsx
import { TagsInput, useTagsInput, useTagsInputCombobox } from "@flowstack-ui/brick/tags-input";
import "@flowstack-ui/brick/styles.css";
```

Root imports from @flowstack-ui/brick are equivalent. Modular builds load
@flowstack-ui/brick/styles/core.css and @flowstack-ui/brick/styles/tags-input.css,
plus each composed component's stylesheet.

## Quick start

```tsx
<TagsInput.Root defaultValue={["React"]} name="skills">
  <TagsInput.Label>Skills</TagsInput.Label>
  <TagsInput.Control>
    <TagsInput.Items />
    <TagsInput.Input placeholder="Add skill…" />
    <TagsInput.ClearTrigger />
  </TagsInput.Control>
  <TagsInput.HiddenInput />
</TagsInput.Root>
```

## Anatomy and DOM ownership

Root, Control and Item are divs; Label is a label; ItemPreview and ItemText are
spans; Input, ItemInput and HiddenInput are native inputs. ItemDeleteTrigger and
ClearTrigger are native buttons. Structural parts and visible inputs also support
asChild/render projection; custom hosts must preserve native semantics. Atom owns all
behavior. Brick Items uses For to render indexed items with preview, removal
and sibling editor. Custom children replace ItemText content, not the editor.

## API

| Prop | Values | Default |
| --- | --- | --- |
| `size` | `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl` or sparse responsive object | `lg` |
| `variant` | `outline`, `surface`, `soft`, `subtle`, `ghost`, `plain`, `underline`, or sparse responsive object | `outline` |
| `shape` | `sharp`, `rounded`, `pill` (not with underline) | `rounded` |
| `fullWidth` | boolean | `true` |
| `tone` | `neutral`, `accent`, `contrast`, `info`, `success`, `warning`, `danger` (on Item/Items) | `neutral` |

TagsInputSize, TagsInputVariant, TagsInputShape and TagsInputItemTone are the
recipe types. TagsInputRootProps and TagsInputRootProviderProps add recipes to
Atom; RootProvider receives the controller created by useTagsInput. Context and
useTagsInputContext expose it. Controllers requiring Field inheritance must be
created inside the Field scope.

TagsInputOptions supports value/defaultValue string[] and inputValue/
defaultInputValue string. Corresponding onValueChange and onInputValueChange
callbacks receive {value} and {inputValue}. Controlled parents own both axes.
Controller acceptance reports policy acceptance, not confirmation that a parent
applied the requested change. The draft clears after an accepted add request.

editable, allowDuplicates, addOnPaste, allowOverflow and autoFocus default false.
max defaults Infinity; maxLength limits each value, not the collection.
sanitizeValue trims by default; validate receives {inputValue,value}.
delimiter is a string or RegExp, comma by default. blurBehavior is add, clear
or omitted (preserve). disabled, readOnly, required, invalid, id, ids, dir,
name, form, placeholder, validationBehavior, translations, onHighlightChange,
onValueInvalid, onFocusOutside, onPointerDownOutside and onInteractOutside are
forwarded. Outside callbacks may prevent default.

TagsInputInvalidReason is empty, duplicate, invalidTag, rangeOverflow or
maxLength. TagsInputInvalidDetails includes reason, inputValue and current value.
TagsInputValueChangeDetails, TagsInputInputValueChangeDetails,
TagsInputOutsideEvent, TagsInputTranslations and TagsInputItemState are public.

TagsInputController exposes value, valueAsString (JSON), inputValue, count,
empty, atMax, highlightedIndex, editingIndex and editValue. Methods:
setValue, addValue, addValues, setValueAtIndex (boolean policy result),
clearValue(index?), setInputValue, clearInputValue, focus, highlight, startEdit,
setEditValue, commitEdit, cancelEdit and getItemState. Readonly and disabled
prohibit imperative mutations. Disabled indexed items survive clear-all.

TagsInputItemProps requires value and current index; disabled is optional.
TagsInputItemsProps accepts tone, disabled(value,index) and children(value,index).
It also forwards shared native Item attributes, className and style. Use explicit
Item parts instead of the shortcut for asChild/render or custom interactive anatomy.
TagsInputItemContext / TagsInput.ItemContext renders the current index, value,
id, editing, highlighted and disabled state from its existing Item owner.
Root `ids.item(index)`, `ids.itemInput(index)` and `ids.itemDeleteTrigger(index)`
customize occurrence identities. Existing root/control/input/label/hiddenInput/
clearTrigger IDs remain supported. Stable index/value order is required.
Keep disabled rules tied to value identity when collection positions can change.
TagsInputLabelProps, TagsInputControlProps, TagsInputInputProps,
TagsInputItemPreviewProps, TagsInputItemTextProps, TagsInputItemInputProps,
TagsInputTriggerProps and TagsInputHiddenInputProps preserve their native attributes.

Named exports mirror every namespace part: TagsInputRoot, TagsInputRootProvider,
TagsInputContext, TagsInputItemContext, TagsInputLabel, TagsInputControl, TagsInputInput, TagsInputItem,
TagsInputItems, TagsInputItemPreview, TagsInputItemText, TagsInputItemInput,
TagsInputItemDeleteTrigger, TagsInputClearTrigger and TagsInputHiddenInput.

### Shared radius selection

The parts listed for this component in the [Radius guide](../../guides/radius.md)
accept the shared token-only `Radius` contract. Omission preserves the owner’s
normal corners. Core sizes and semantic roles are distinct; arbitrary lengths
and responsive objects are not accepted. Where a legacy corner `shape` exists,
choose either it or `radius`, not both. This does not change behavior, sizing,
or the independently owned corners of other parts.
Responsive variants and scalar underline exclude both radius and shape so a
later boxed breakpoint restores its normal corners.

## Visual recipes and states

Disabled presentation preserves the selected recipe and fades once to 50%, with a not-allowed cursor on the disabled hit target. Keep read-only separate; do not add an opacity wrapper around an already disabled control. Forced colors uses system disabled colors.

Use outline for a transparent rest/hover control and surface for a neutral raised fill with the same border and geometry, without a shadow or extra Surface wrapper. Soft remains subdued. Popup backgrounds are independent; preserve explicit disabled, read-only, invalid and forced-colors states.

Outline is transparent; surface is neutral raised; soft is bordered and subdued;
subtle has a muted fill and transparent border; ghost fills on hover; plain stays
minimal. Underline has zero horizontal inset and bottom-only hover/focus.
Invalid focus follows the error color. Seven shared control sizes coordinate text,
padding and one-row height with Input. Tokens use compact Chip-like geometry;
remove targets are at least 24px, including small control sizes. Wrapping grows
the control naturally. Highlight, focus, invalid, disabled and readonly retain
geometry. Read-only retains focus and submission without add placeholders or
remove/clear affordances. Labels use Field typography; editable text stays at
least 16px independently of compact tag text. Item tones do not add status semantics.

## Tokens and CSS hooks

Stable classes are brick-tags-input and part suffixes control, label, input,
item, item-preview, item-text, item-input, delete and clear. Atom provides
tags-input-* data-slot names. Root has data-size and responsive data-size-*
attributes, `data-full-width`, `data-variant`, `data-shape`, data-disabled,
data-readonly, data-invalid and data-empty. Item has `data-tone` and data-disabled;
preview exposes data-highlighted.

Component hooks: --brick-tags-input-background, --brick-tags-input-border,
--brick-tags-input-radius, --brick-tags-input-item-background,
--brick-tags-input-item-foreground and --brick-tags-input-item-radius.
Additional local hooks are --brick-tags-input-focus-ring,
--brick-tags-input-invalid-border, --brick-tags-input-hover-background,
--brick-tags-input-hover-border, --brick-tags-input-item-border and
--brick-tags-input-item-highlight-background. Set item hooks on the Item itself;
set boundary hooks on Root or RootProvider. Pair foreground/background changes
and check highlighted contrast in both appearances.
They derive from existing semantic Theme tokens; no new Theme slots.

## Customization

Prefer recipes and authored Item parts. Use ItemText for custom display content,
with ItemInput as its sibling editor; do not nest buttons. Triggers have default
decorative close artwork and translated accessible names. Explicit aria-label
or translations override default English labels. Applications own async lookup.

## Responsive behavior

size and variant accept scalars or sparse responsive objects; missing baselines
use lg and outline. Root follows the available width and item rows wrap. Long
individual labels truncate visually, preserving full values and accessible names
without covering removal.
Logical CSS and Atom direction preserve RTL navigation. Parent layout owns placement.

## Accessibility

Provide Label, Field.Label or Input aria-label. Enter adds a tag or edits a
highlighted tag. Backspace at the start highlights the last enabled item; another
Backspace/Delete removes it. Logical arrows move through enabled values.
Escape cancels edits/highlight before an ancestor Dialog. IME Enter does not add.
Double-click editing has a keyboard equivalent. Leaving an item editor cancels
its draft without stealing focus. Rejected edits stay open.

Acceptance normalizes and validates every candidate. Paste is atomic: any invalid
nonempty candidate rejects the whole batch and retains the draft. Empty delimiter
segments are ignored. Explicit overflow is permitted but exposes invalid state.
Live feedback is polite and accepts translated messages.

## Composition, native props, and refs

asChild/render merge into one semantic host and preserve refs/events. Visible
editors must remain native inputs, Label a label, and actions buttons. Field owns
description/error relationships. One HiddenInput submits the JSON committed array;
the unnamed draft is not form data and cannot satisfy required collection validity.
Parse JSON on the server, not comma-separated text. Reset restores uncontrolled
collection and draft, including external form association and prevented reset.

For suggestions, call useTagsInputCombobox under TagsInput.Root and spread its
result onto Combobox.Root, passing application options. Use TagsInput.Control/
Input (not a second Combobox.Control/Input) and ordinary Combobox Portal, Content,
Listbox and Item. The hook arbitrates selection versus creation and rejected
drafts; Atom registers the portalled popup as an inside branch. Do not add a
second named Combobox hidden input. Match Combobox size to the surrounding Root
when using nondefault sizes so suggestion typography remains coordinated.

## Examples

The normal route offers focused source-paired examples, including React Hook
Form, responsive recipes and item composition. The twelve qualification scenarios
at `?qualification=1` cover all listed policy axes, editing, paste,
limits, disabled items, forms, controlled/provider state, shared suggestions,
loading/empty UI, nested Dialog, recipes, localization and simulated IME.

## Evidence

- [Playground](../../../playground/src/components/tags-input/)
- [Unit](../../../test/components/tags-input/)
- [Types](../../../test/types/components/tags-input.test.ts)
- [Behavior](../../../playground/tests/components/tags-input/behavior.spec.ts)
- [Visual](../../../playground/tests/components/tags-input/visual.spec.ts)
- [Manual](../../../playground/manual-tests/tags-input.md)

Physical IME, screen readers, actual zoom and touch hardware remain separate
manual gates. Automated emulation is not evidence those checks were performed.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).
