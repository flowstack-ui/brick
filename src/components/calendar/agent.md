# Calendar agent guide

## Purpose

Inline single, range, or multiple date selection.

## Use when

- Inline single, range, or multiple date selection.

## Choose something else when

- Scheduling, recurrence or remote business availability is required. Use Application composition.

## Required composition

- Calendar.Root size accepts 2xs, xs, sm, md, lg, xl or 2xl. Explicit size wins over the compatibility density prop: compact defaults to sm, comfortable to md. Cells remain square and shrink within narrow hosts; size does not change selection behavior.
- Use Calendar.Root with a stable referenceDate and an accessible name. Root (div), Header (div), PrevTrigger/NextTrigger/ViewTrigger (buttons), Grid (table), MonthSelect/YearSelect (select), Context (render function). Default children provide navigation and all requested month grids. Day buttons remain native buttons within the grid.
- Use date-value helpers without converting date-only values to UTC midnight.

## Rules

- **MUST:** Keep date behavior in Atom and presentation in Brick. Do not duplicate popup engines or replace semantic segments with text inputs.
- **MUST:** Load styles.css or core.css plus styles/calendar.css. Use documented visual props and locale overrides.

## Common mistakes

- **Avoid:** Inventing current dates during hydration or submitting localized strings. **Instead:** Supply stable referenceDate and typed values; preserve canonical form mirrors.

## Validation checklist

- Verify keyboard, locale/RTL, constraints, reset, narrow width, appearance and forced colors.

## Related guidance

- `locale-provider`
- `field`
- `popover`
