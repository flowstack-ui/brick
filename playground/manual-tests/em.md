# Em Manual Test Guide

Status: implementation complete; human run pending

| Environment | Record before testing |
| --- | --- |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Assistive technology | |
| Playground route | `/em` |

Scenario order: Overview → Typography contexts → Native output and stress.

Use `pass`, `fail`, `blocked`, or `not applicable` for each result.

1. Confirm the example contains one native `em` inside one complete sentence.
2. Confirm Em inherits the body and heading size, line height, foreground, and
   direction while changing only stress emphasis.
3. Select and copy the sentence; confirm the visible and copied text agree.
4. Inspect the custom slot, data attribute, class, style, and ref output.
5. Repeat at 320 and 390 pixels, 200% text, 400% zoom, RTL, dark appearance,
   and forced colors; confirm readable flow without clipping or overflow.
6. Confirm Em adds no tab stop and screen-reader reading order stays natural.

## Completion

Overall result:

Follow-up issues:

Workbook updated:
