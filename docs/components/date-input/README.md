# DateInput

## When and where to use
Locale-ordered segmented date and date-time entry.

## When not to use
Not an event scheduler, recurrence editor or business-availability service. Use Input for a browser-native date field. Do not parse localized display strings with Date.parse.

## Installation and imports
```tsx
import "@flowstack-ui/brick/styles.css";
import { DateInput } from "@flowstack-ui/brick/date-input";
import { parseDate } from "@flowstack-ui/brick/date-value";
```
Modular CSS:

```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/date-input.css";
```

Load reset.css first when using the optional Brick reset.

## Quick start
```tsx
<DateInput.Root referenceDate={parseDate("2026-09-05")} name="delivery" aria-label="Delivery date" />
```

## Anatomy and DOM ownership
Root and Control are divs. SegmentGroup is a named div; Segment is a span with Atom-owned spinbutton semantics when editable. Label is a label, ClearTrigger a non-submitting button, HiddenInput a visually hidden constraint-validation input. Segments and Context produce no extra wrapper. Default children include control, groups and form mirrors.

## API

| Prop | Values | Default |
| --- | --- | --- |
| `size` | `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`; responsive | `lg` |
| `tone` | `neutral`, `accent` | `neutral` |
| `variant` | `outline`, `surface`, `soft`, `subtle`, `ghost`, `plain`, `underline`; responsive | `outline` |
| `shape` | `sharp`, `rounded`, `pill`; not with underline | `rounded` |

Visual attributes: `data-size`, `data-variant`, `data-shape`, `data-tone`.

DateInputTone is exported with the recipe types. Soft/subtle and read-only
filled fields use secondary placeholder text to preserve readable contrast;
transparent fields use the lighter muted role.

useDateInput and RootProvider share the segmented state; PropsProvider supplies
only presentation defaults. Context exposes value, segments, placeholderValue,
focus, setValue and clearValue. ClearTrigger supports asChild/render for Button
composition. Explicit children still need HiddenInput per endpoint for forms.

formatter accepts DateFormatter, including time-only segment formatting; format
is a display callback, not a mode string. Time-only presentation keeps a complete
dated DateValue and canonical submission. Supply referenceDate and zone explicitly.
placeholderValue/defaultPlaceholderValue/onPlaceholderChange control navigation
without selecting a date. onDateFocusChange reports editing focus separately
from native focus events. translations and ids customize accessible engine parts.

Root uses the responsive sizes and variants in the table above. Underline disallows shape and radius. Atom options: required referenceDate; selectionMode single (default) or range, value/defaultValue/onValueChange; locale, dir, timeZone (UTC), min/max, disabled/readOnly/required/invalid, isDateUnavailable, createCalendar, hourCycle, hideTimeZone, granularity, shouldForceLeadingZeros, getRootNode, name/form, invalidMessage, segmentLabels. Label, SegmentGroup, Segments and HiddenInput accept index (0); Segment requires segment and accepts index. Native props/ref target the named host. Exported recipe types: DateInputVariant, DateInputShape, DateInputRecipeProps, DateInputRootProps.

Date values are immutable DateValue objects from date-value. Single uses DateValue|null; range uses {start: DateValue|null, end: DateValue|null}. DateInput does not accept multiple selection. A range end requires a start. Supply the same referenceDate on server/client; it determines initial focus and today. Date-only, local date-time and zoned date-time remain distinct. Required/min/max/unavailable rules do not replace application validation. Ranges crossing unavailable days cannot be selected; predicate validation is bounded to 36,600 days.

### Shared radius selection

The parts listed for this component in the [Radius guide](../../guides/radius.md)
accept the shared token-only `Radius` contract. Omission preserves the owner’s
normal corners. Core sizes and semantic roles are distinct; arbitrary lengths
and responsive objects are not accepted. Where a legacy corner `shape` exists,
choose either it or `radius`, not both. This does not change behavior, sizing,
or the independently owned corners of other parts.

## Visual recipes and states

### Segment presentation

Date fields default to neutral segment emphasis. Use tone="accent" for branded focus and selection; RootProvider and PropsProvider accept the same tone. Calendar selection tone remains independent. Place clear actions after the growing segment group; do not position them with consumer offsets. Placeholders use muted foreground on transparent fields and secondary foreground on soft/subtle or read-only fills; literals use muted foreground. Outline and surface use stronger segment emphasis than subdued variants.

The field recipe accepts `tone="neutral" | "accent"` (default `neutral`),
reflected as `data-tone`. This changes presentation, not date behavior.


Place actions after the editing group. Controls with trailing actions use a
smaller logical end inset while preserving text padding and action hit targets.
For separate range borders, use two Controls in one range Root, indexed labels,
groups, segments and hidden inputs. Assign each repeated Control a unique ID.

Use hideTimeZone to omit abbreviations such as EDT (Eastern Daylight Time).
For AM/PM, use hourCycle={12}; an explicit DateFormatter should also use h12.
For 24-hour display, pair hourCycle={24} with formatter hourCycle h23.

Disabled presentation preserves the selected recipe and fades once to 50%, with a not-allowed cursor on the disabled hit target. Keep read-only separate; do not add an opacity wrapper around an already disabled control. Forced colors uses system disabled colors.

Use outline for a transparent rest/hover control and surface for a neutral raised fill with the same border and geometry, without a shadow or extra Surface wrapper. Soft remains subdued. Popup backgrounds are independent; preserve explicit disabled, read-only, invalid and forced-colors states.


The seven sizes change control geometry and fine-pointer typography together.
Touch-capable devices retain a 16px minimum editing size. Segments use smaller,
theme-derived rounding than the surrounding control and deliberate literal gaps.
The playground demonstrates day/hour/minute/second granularity, leading zeros,
24-hour display, zone visibility, controlled clear/reset and bounded dates.
DateInput supports single and range values, not multiple selection; multiple
selection belongs to Calendar or DatePicker with ValueText.

Seven shared control sizes preserve border-box geometry. Underline retains a
bottom border. Disabled, invalid, focus and placeholder remain distinguishable.

## Tokens and CSS hooks
Public hooks: --brick-date-input-background, --brick-date-input-border, --brick-date-input-radius. Root brick-date-input and data-size, data-variant, data-shape select recipes; brick-date-input__control, __group, __label, __action identify parts. Segment states use Atom data-slot, data-placeholder and aria-invalid. Colors, typography and radii follow the active Theme. Do not target engine implementation internals.

## Customization
Use typed props, native aria names and documented hooks. Application locale/zone/business constraints remain explicit. LocaleProvider does not ship language catalogs; pass translated date labels, segmentLabels and DateInput translations where needed.

## Responsive behavior
Sparse responsive size objects use lg before the first supplied breakpoint. Range endpoints wrap together; individual date segments do not wrap. Match neighboring Input/Button size.

## Accessibility
Name the control. Atom owns segment keyboard editing, focus, value and validation. DateInput does not render a calendar grid or popup. Native forms submit canonical strings, not localized text; DateInput mirrors require HiddenInput when composing custom children. Optional incomplete values remain invalid. Controlled reset belongs to the application. Forced colors retain focus/selection outlines. Real screen-reader and physical touch checks are separate manual gates.

## Composition, native props, and refs
Compose with Field for label/description/error relationships. Forwarded refs target the named native host. Use DatePicker when a popup calendar is needed; DateInput has no Content or portal part. Scope appearance on the surrounding Appearance boundary.

## Examples
Use selectionMode="range" with start/end values; use granularity="minute" and a parsed local or zoned date-time for date-time entry. Calendar and DatePicker allow multiple; DateInput intentionally does not. A controlled value must be updated from onValueChange. Custom segments must retain Atom's spinbutton semantics and accessible names.

## Evidence
- [Playground](../../../playground/src/components/date-input/)
- [Unit](../../../test/components/date-input/date-input.test.tsx)
- [Types](../../../test/types/components/date-input.test.ts)
- [Browser](../../../playground/tests/components/date-input/behavior.spec.ts)
- [Visual](../../../playground/tests/components/date-input/visual.spec.ts)
- [Manual](../../../playground/manual-tests/date-input.md)

## Changelog
[Component changelog](CHANGELOG.md).
