# DatePicker

For removable multiple-date values, compose Chip from Context beside the calendar Trigger, never inside a button. Typed multiple-date text remains a separate editable grammar. For inline preset selection, render Calendar directly without Portal/Content. Root `positioning` forwards placement and collision options to Popover; a tall presets panel can use `{ placement: "bottom-start", flip: ["top-start"], slide: true }` to avoid sideways fallback.

## When and where to use
Segmented entry and calendar selection with one coordinated popup.

## When not to use
Not an event scheduler, recurrence editor or business-availability service. Use Input for a browser-native date field. Do not parse localized display strings with Date.parse.

## Installation and imports
```tsx
import "@flowstack-ui/brick/styles.css";
import { DatePicker } from "@flowstack-ui/brick/date-picker";
import { parseDate } from "@flowstack-ui/brick/date-value";
```
Modular CSS:

```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/date-picker.css";
```

Load reset.css first when using the optional Brick reset.

## Quick start
```tsx
<DatePicker.Root referenceDate={parseDate("2026-09-05")} name="delivery">
  <DatePicker.Label>Delivery date</DatePicker.Label>
  <DatePicker.Control><DatePicker.Input /><DatePicker.Trigger /></DatePicker.Control>
  <DatePicker.Portal><DatePicker.Content aria-label="Delivery calendar"><DatePicker.Calendar /></DatePicker.Content></DatePicker.Portal>
</DatePicker.Root>
```

## Anatomy and DOM ownership
Root and Control are divs, Label a label. Input retains segmented div semantics;
TextInput is a native input in explicit text mode. Root owns canonical form
controls for all modes. Trigger and Content share one Atom Popover owner.
Calendar is inline, never a second popup engine. ClearTrigger and PresetTrigger
support Button composition. IndicatorGroup arranges actions. ValueText is a span
with a placeholder option. Portal/Context add no visual wrapper.

## API

| Prop | Values | Default |
| --- | --- | --- |
| `size` | `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`; responsive | `lg` |
| `variant` | `outline`, `surface`, `soft`, `subtle`, `ghost`, `plain`, `underline`; responsive | `outline` |
| `shape` | `sharp`, `rounded`, `pill`; not with underline | `rounded` |

Visual attributes: `data-size`, `data-variant`, `data-shape`.

Root inherits Calendar and DateInput options and adds open/defaultOpen/onOpenChange,
closeOnSelect, startLabel/endLabel, entryMode and formControl. Input is single/range
only; TextInput also supports multiple. Input keeps its div ref; TextInput has an
HTMLInputElement ref. Calendar independently accepts responsive size and tone
(neutral/accent/contrast). Content owns Popover placement and appearance.

### Text entry and canonical forms

Use `entryMode="text"` with TextInput. Default text is strict `YYYY-MM-DD`;
multiple values use semicolons. Range inputs use index 0 and 1 with distinct
accessible names. Override parsing and formatting together using textCodec;
selectionTextCodec controls a custom multiple-value grammar. Invalid drafts
remain visible and cannot submit an older committed value. Enter or leaving the
complete control boundary commits; moving to an internal action does not.
Escape closes the popup first, then restores dirty text when already closed.

Root automatically submits canonical values: name for single, name[start] and
name[end] for range, repeated name for multiple. Use `formControl="manual"` and
one HiddenInput only for explicit placement. Legacy HiddenInput in auto mode is
an unnamed compatibility mirror. Controlled reset remains application-owned.

### Controllers and presentation defaults

Public types include DatePickerRootProps, DatePickerContentProps,
DatePickerCalendarProps, DatePickerRootProviderProps, DatePickerPropsProviderProps,
DatePickerTextCodec, DatePickerSelectionTextCodec and DatePickerCodecContext.

useDatePicker/RootProvider share selection, navigation, open state and drafts.
PropsProvider supplies presentation defaults only. openOnInputClick is opt-in.
minView/maxView bound period selection; months/years use their first date.

Date values are immutable DateValue objects from date-value. Single uses DateValue|null; range uses {start: DateValue|null, end: DateValue|null}; multiple uses DateValue[]. A range end requires a start. Supply the same referenceDate on server/client; it determines initial focus and today. Date-only, local date-time and zoned date-time remain distinct. Required/min/max/unavailable rules do not replace application validation. Ranges crossing unavailable days cannot be selected; predicate validation is bounded to 36,600 days.

### Shared radius selection

The parts listed for this component in the [Radius guide](../../guides/radius.md)
accept the shared token-only `Radius` contract. Omission preserves the owner’s
normal corners. Core sizes and semantic roles are distinct; arbitrary lengths
and responsive objects are not accepted. Where a legacy corner `shape` exists,
choose either it or `radius`, not both. This does not change behavior, sizing,
or the independently owned corners of other parts.

## Visual recipes and states

### Segment presentation

Date fields default to neutral segment emphasis. Use tone="accent" for branded focus and selection; RootProvider and PropsProvider accept the same tone. Calendar selection tone remains independent. Place clear/open actions after the growing segment group; do not position them with consumer offsets. Placeholders and literals use the shared muted foreground. Outline and surface use stronger segment emphasis than subdued variants.

The field recipe accepts `tone="neutral" | "accent"` (default `neutral`),
reflected as `data-tone`. This changes presentation, not date behavior.

Use outline for a transparent rest/hover control and surface for a neutral raised fill with the same border and geometry, without a shadow or extra Surface wrapper. Soft remains subdued. Popup backgrounds are independent; preserve explicit disabled, read-only, invalid and forced-colors states.


Custom `Trigger asChild` or `render` composition retains the supplied Button's
presentation; the default trigger uses the compact calendar icon-action recipe.
Use an explicit accessible name for custom triggers. Nested popups retain the
Popover layer above modal content; do not lower them with application-wide
popover selectors. Local appearance scopes still need explicit portal scoping.

Segmented entry and calendar selection with one coordinated popup.

Entry shares DateInput recipes; popup uses Popover theme surface, border, radius and floating shadow. Calendar density is independent of input size. No separate mobile overlay model is introduced.

## Tokens and CSS hooks
Entry inherits DateInput public hooks and root data-size/variant/shape. brick-date-picker__input and __content identify presentation. Content carries brick-popover; Calendar carries brick-calendar and its public hooks. Colors, typography and radii follow the active Theme. Do not target engine implementation internals.

## Customization
Use typed props, native aria names and documented hooks. Application locale/zone/business constraints remain explicit. LocaleProvider does not ship language catalogs; pass translated date labels, segmentLabels and Calendar translations where needed.

## Responsive behavior
The popup uses available viewport bounds and scrolls when necessary. Month grids wrap; range entry wraps endpoints. Input size can respond without duplicating state or DOM.

## Accessibility
Name the control. Atom owns segment keyboard editing, grid focus, selection and validation. Calendar focus is separate from selection. Native forms submit canonical strings, not localized text; DateInput mirrors require HiddenInput when composing custom children. Optional incomplete values remain invalid. Controlled reset belongs to the application. Forced colors retain focus/selection outlines. Real screen-reader and physical touch checks are separate manual gates.

## Composition, native props, and refs
Compose with Field for label/description/error relationships. Forwarded refs target the named native host. DatePicker uses Atom Popover alone for collision handling, dismissal and focus return. For local appearance overrides, pass Content appearance explicitly; root document themes inherit naturally through portals.

## Examples

### Focused compositions

The playground includes separate day/month/year ranges, localized text entry,
Persian segmented entry, selection-only and editable multiple dates, custom
calendar headers, month/year selects, fixed weeks, range presets, a preset
sidebar and in-popup time editing.

TextInput keeps strict ISO parsing by default. A localized placeholder must
be paired with a matching `textCodec.parse` and `textCodec.format`; changing
the placeholder alone does not change the grammar. Canonical form values stay
independent of display strings.

Use Context and `formValues.length` to conditionally render ClearTrigger.
For button-only entry, a fit-content Frame prevents the Root's column layout
from stretching the composed Button. Use one Root and one Content for a range;
indexed TextInputs may have separate Controls. The last Control anchors the
popup in that composition.

Content's viewport owns its inset, including custom preset/time regions.
The nested Calendar does not add a second inset. Standalone Calendar retains
its own padding. Keep today-navigation (`setFocusedValue`) distinct from
selecting a date (`PresetTrigger`).

Use selectionMode="range" with start/end values; use granularity="minute" and a parsed local or zoned date-time for date-time entry. Calendar and DatePicker allow multiple; DateInput intentionally does not. A controlled value must be updated from onValueChange. Keep custom day content decorative so the native button retains its accessible name.

## Evidence
- [Playground](../../../playground/src/components/date-picker/)
- [Unit](../../../test/components/date-picker/date-picker.test.tsx)
- [Types](../../../test/types/components/date-picker.test.ts)
- [Browser](../../../playground/tests/components/date-picker/behavior.spec.ts)
- [Visual](../../../playground/tests/components/date-picker/visual.spec.ts)
- [Manual](../../../playground/manual-tests/date-picker.md)

## Changelog
[Component changelog](CHANGELOG.md).
