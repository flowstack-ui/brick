# Highlight Manual Test Guide

Status: implementation complete; human run pending

| Environment | Record before testing |
| --- | --- |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Assistive technology | |
| Playground route | `/highlight` |

Scenario order: Overview → Matching and recipes → Adaptation and exact output.

Use `pass`, `fail`, `blocked`, or `not applicable` for each result.

1. Confirm Overview preserves the complete original sentence and native span/mark output.
2. Confirm overlapping queries prefer the longest match at one offset; literal punctuation is escaped rather than executed.
3. Compare subtle, solid, and underline plus accent and neutral; recipes must not imply focus or active-result navigation.
4. Confirm case-sensitive, first-only, and Unicode whole-word matching agree with exact Atom 0.25.0 behavior.
5. Select and copy the full text; copied content must equal the original string without inserted separators.
6. Repeat at 320/390 pixels, dark, forced colors, 200% text, 400% zoom, text spacing, localization, and RTL; confirm readable wrap and visible matches.
7. Confirm Highlight adds no tab stop, keyboard command, live region, or result counter.

## Completion

Overall result:

Follow-up issues:

Workbook updated:
