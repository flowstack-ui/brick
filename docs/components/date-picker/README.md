# DatePicker

Custom `Trigger asChild` or `render` composition retains the supplied Button's
presentation; the default trigger uses the compact calendar icon-action recipe.
Use an explicit accessible name for custom triggers. Nested popups retain the
Popover layer above modal content; do not lower them with application-wide
popover selectors. Local appearance scopes still need explicit portal scoping.

Segmented entry and calendar selection with one coordinated popup.

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
Root and Control are divs, Label a label. Input renders Atom DateInput groups and form mirrors. Trigger is Atom Popover.Trigger, supporting its asChild/render composition. Content is Atom Popover.Content with its viewport. Calendar is the same inline Atom Calendar, never a second popup engine. ClearTrigger is a button; ValueText a span; HiddenInput mirrors multiple values only. Portal/Context add no visual wrapper.

## API

| Prop | Values | Default |
| --- | --- | --- |
| `size` | `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`; responsive | `lg` |
| `variant` | `outline`, `soft`, `underline` | `outline` |
| `shape` | `sharp`, `rounded`, `pill`; not with underline | `rounded` |

Visual attributes: `data-size`, `data-variant`, `data-shape`.

Root inherits the Calendar and DateInput options, adds open/defaultOpen/onOpenChange, closeOnSelect (true), startLabel/endLabel, and DateInput size/variant/shape recipes. Selection supports single, range, multiple. Single and complete ranges close; multiple stays open. Input is single/range only. Multiple uses ValueText plus HiddenInput (repeated canonical names). Input accepts native div props and ref. Content adds appearance: light | dark for explicit local portal scope; sideOffset defaults 8. Calendar adds density compact | comfortable (default comfortable), optional children, native div props/ref. Compose Calendar.Header/Grid parts inside for customization. Trigger/ClearTrigger default names come from LocaleProvider chooseDate/clearDate. Root invalidMessage/startLabel/endLabel also use LocaleProvider defaults. Exported types: DatePickerRootProps, DatePickerContentProps, DatePickerCalendarProps. Other parts retain Atom native/compound props.

Date values are immutable DateValue objects from date-value. Single uses DateValue|null; range uses {start: DateValue|null, end: DateValue|null}; multiple uses DateValue[]. A range end requires a start. Supply the same referenceDate on server/client; it determines initial focus and today. Date-only, local date-time and zoned date-time remain distinct. Required/min/max/unavailable rules do not replace application validation. Ranges crossing unavailable days cannot be selected; predicate validation is bounded to 36,600 days.

### Shared radius selection

The parts listed for this component in the [Radius guide](../../guides/radius.md)
accept the shared token-only `Radius` contract. Omission preserves the owner’s
normal corners. Core sizes and semantic roles are distinct; arbitrary lengths
and responsive objects are not accepted. Where a legacy corner `shape` exists,
choose either it or `radius`, not both. This does not change behavior, sizing,
or the independently owned corners of other parts.

## Visual recipes and states
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
