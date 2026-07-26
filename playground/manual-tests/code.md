# Code Manual Test Guide

Status: implementation complete; human run pending

| Environment | Record before testing |
| --- | --- |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Assistive technology | |
| Playground route | `/code` |

Scenario order: Overview → Variants → Tones → Sizes → Inline context → Native
attributes and output → Appearance and customization → Responsive and RTL.

Use `pass`, `fail`, `blocked`, or `not applicable` for each result.

1. Confirm Overview is one inline native `code` with subtle, neutral, inherited
   defaults inside a sentence.
2. Move top to bottom through Variants, Tones, and Sizes. Confirm only the named
   recipe changes and every tile keeps identical `aria-label` content.
3. In Inline context, confirm both prose examples align naturally and the long
   property wraps without page overflow.
4. In Native attributes, inspect output, activate Inspect ref, and expect
   `CODE`, the custom slot/data/class, semantic span child, and no invented role.
5. Compare light/dark defaults, then confirm the customized token visibly
   matches its documented purple surface/border/text/radius properties.
6. At 200% text and 400% zoom, follow the final section top down. Confirm the
   long path stays contained and RTL prose keeps the LTR literal readable.
7. Repeat keyboard navigation and forced-colors. Code adds no tab stop and
   remains readable with a visible system border.

## Completion

Overall result:

Follow-up issues:

Workbook updated:
