# Kbd Manual Test Guide

Status: implementation complete; human run pending

| Environment | Record before testing |
| --- | --- |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Assistive technology | |
| Playground route | `/kbd` |

Scenario order: Overview → Variants and sizes → Sequences and native output.

Use `pass`, `fail`, `blocked`, or `not applicable` for each result.

1. Confirm Overview contains one native `kbd` inside a complete sentence.
2. Compare four variants and three sizes; only the named recipe should change.
3. Select and copy a key sequence; visible and copied content must agree.
4. Inspect native attributes, custom slot/class/style, and ref output.
5. Repeat at 320/390 pixels, dark, forced colors, 200% text, 400% zoom, text spacing, and RTL; confirm key labels remain legible and the sequence wraps between keys.
6. Confirm Kbd adds no tab stop, listener, or interactive state.

## Completion

Overall result:

Follow-up issues:

Workbook updated:
