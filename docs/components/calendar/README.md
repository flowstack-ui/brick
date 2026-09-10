# Calendar

`size` accepts `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, and `2xl`; it coordinates
cell geometry and typography independently of date-entry sizing. Without size,
`density="comfortable"` maps to `md` (40px) and `compact` to `sm` (36px).
An explicit size wins over density. Cells shrink squarely when constrained;
provide enough room for comfortable targets. Week-number grids account for
their eighth column. `DatePicker.Calendar` accepts the same size option.

Inline single, range, or multiple date selection.

## When and where to use
Inline single, range, or multiple date selection.

## When not to use
Not an event scheduler, recurrence editor or business-availability service. Use Input for a browser-native date field. Do not parse localized display strings with Date.parse.

## Installation and imports
```tsx
import "@flowstack-ui/brick/styles.css";
import { Calendar } from "@flowstack-ui/brick/calendar";
import { parseDate } from "@flowstack-ui/brick/date-value";
```
Modular CSS:

```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/calendar.css";
```

Load reset.css first when using the optional Brick reset.

## Quick start
```tsx
<Calendar.Root referenceDate={parseDate("2026-09-05")} aria-label="Choose a delivery date" />
```

## Anatomy and DOM ownership
Root (div), Header (div), PrevTrigger/NextTrigger/ViewTrigger (buttons), Grid (table), MonthSelect/YearSelect (select), Context (render function). Default children provide navigation and all requested month grids. Day buttons remain native buttons within the grid.

## API

| Prop | Values | Default |
| --- | --- | --- |
| `density` | `compact`, `comfortable` | `comfortable` |

Visual attributes: `data-density`.

Root adds density: compact | comfortable (default comfortable). All Atom Calendar options are inherited: required referenceDate; selectionMode single (default), range or multiple; typed value/defaultValue/onValueChange; locale, timeZone (UTC), min/max, isDateUnavailable, disabled/readOnly/invalid, focusedValue/onFocusChange, view/defaultView/onViewChange, onVisibleRangeChange, numOfMonths (1), startOfWeek, fixedWeeks, outsideDaySelectable, showWeekNumbers, maxSelectedDates, createCalendar, translations and getRootNode. Root defaults locale/dir from LocaleProvider. Grid adds monthOffset (0), hideOutsideDays (false), renderDay. Context exposes value, focusedValue, view, visibleRange and visibleRangeText. Header/navigation/select/grid props and refs target their native hosts. CalendarDensity and CalendarRootProps are exported.

Date values are immutable DateValue objects from date-value. Single uses DateValue|null; range uses {start: DateValue|null, end: DateValue|null}; multiple uses DateValue[]. A range end requires a start. Supply the same referenceDate on server/client; it determines initial focus and today. Date-only, local date-time and zoned date-time remain distinct. Required/min/max/unavailable rules do not replace application validation. Ranges crossing unavailable days cannot be selected; predicate validation is bounded to 36,600 days.

## Visual recipes and states
Calendar density changes square day targets independently of form controls. It has no panel background or border; compose Surface when required. Today, selected, range, unavailable, hover and keyboard focus remain distinct.

## Tokens and CSS hooks
--brick-calendar-cell-size and --brick-calendar-radius are the public local hooks. Classes brick-calendar, brick-calendar__header, __navigation, __view, __grid and __select identify presentation. Root data-density controls the recipe. Atom data-slot and selected/today/in-range/disabled/unavailable attributes describe behavior. Colors, typography and radii follow the active Theme. Do not target engine implementation internals.

## Customization
Use typed props, native aria names and documented hooks. Application locale/zone/business constraints remain explicit. LocaleProvider does not ship language catalogs; pass translated date labels, segmentLabels and Calendar translations where needed.

## Responsive behavior
Month grids wrap as complete seven-column units. Compact density reduces grid width; do not squeeze day targets into uneven rectangles.

## Accessibility
Name the control. Atom owns segment keyboard editing, grid focus, selection and validation. Calendar focus is separate from selection. Native forms submit canonical strings, not localized text; DateInput mirrors require HiddenInput when composing custom children. Optional incomplete values remain invalid. Controlled reset belongs to the application. Forced colors retain focus/selection outlines. Real screen-reader and physical touch checks are separate manual gates.

## Composition, native props, and refs
Compose with Field for label/description/error relationships. Forwarded refs target the named native host. DatePicker uses Atom Popover alone for collision handling, dismissal and focus return. For local appearance overrides, pass Content appearance explicitly; root document themes inherit naturally through portals.

## Examples
Use selectionMode="range" with start/end values; use granularity="minute" and a parsed local or zoned date-time for date-time entry. Calendar and DatePicker allow multiple; DateInput intentionally does not. A controlled value must be updated from onValueChange. Keep custom day content decorative so the native button retains its accessible name.

## Evidence
- [Playground](../../../playground/src/components/calendar/)
- [Unit](../../../test/components/calendar/calendar.test.tsx)
- [Types](../../../test/types/components/calendar.test.ts)
- [Browser](../../../playground/tests/components/calendar/behavior.spec.ts)
- [Visual](../../../playground/tests/components/calendar/visual.spec.ts)
- [Manual](../../../playground/manual-tests/calendar.md)

## Changelog
[Component changelog](CHANGELOG.md).
