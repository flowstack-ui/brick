# Mark Manual Test Guide

Status: implementation complete; human run pending

| Environment | Record before testing |
| --- | --- |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Assistive technology | |
| Playground route | `/mark` |

Scenario order: Overview → Variants and tones → Responsive and native output.

Use `pass`, `fail`, `blocked`, or `not applicable` for each result.

1. Confirm Overview contains one native `mark` inside a sentence.
2. Compare variants and tones; only the named recipe should change.
3. Select and copy marked copy; visible and copied content must agree.
4. Inspect native attributes, custom slot/class/style, and ref output.
5. Repeat at 320/390 pixels, dark, forced colors, 200% text, 400% zoom,
   text spacing, and RTL; confirm wrapping and contrast remain usable.
6. Confirm Mark adds no tab stop or interactive state.

## Completion

Overall result:

Follow-up issues:

Workbook updated:
