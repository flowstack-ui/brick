# Em manual-test protocol

| Environment | Record before testing |
| --- | --- |
| Component | Em |
| Version or commit | Brick 0.2.3 working candidate |
| Reviewer | Record at manual execution |
| Date | Pending manual execution |
| Browser and version | Record actual browser |
| Operating system | Record actual OS |
| Viewport and zoom | 320, 390, 1440 CSS px; 100%, 200%, 400% |
| Physical device | Pending selection and copy check |
| Assistive technology | Pending screen-reader check |
| Playground route | `/em` |
| Qualification route(s) | `/em` and `/em?qualification=1` |

Scenario order: `01 Overview`, `02 Typography contexts`, `03 Native output and stress`.

Use `pass`, `fail`, `blocked`, or `not applicable` for each result.

## Step 1 — Semantics, inheritance, and copy

Setup: Open `/em?qualification=1` in system appearance and review 01–03 top to bottom. Review the documentation composition example separately.

Action: Inspect the native output, compare body and heading contexts, then select and copy both complete sentences.

Expected: One native `em` preserves its surrounding size, line height, color, direction, and source text while adding only stress emphasis. Static composition preserves one authored em. Explicit data-slot wins over deprecated slot, which is not native slot forwarding.

Result:
Notes or issue:

## Step 2 — Reflow, appearance, and direction

Setup: Repeat at 320/390 px, 200% text, 400% zoom, dark appearance, forced colors, and RTL.

Action: Inspect wrapping, selection, copy, and page containment in every state.

Expected: Em remains readable and selectable with no clipping, page overflow, color-only meaning, or direction error.

Result:
Notes or issue:

## Step 3 — Assistive technology

Setup: Enable the recorded screen reader on `/em`.

Action: Read the complete body and heading examples in browse mode.

Expected: Reading order and authored text remain natural, with no added tab stop, duplicated content, or fabricated interactive state.

Result:
Notes or issue:

## Completion

Overall result: pending recorded run

Follow-up issues:

Workbook updated:
