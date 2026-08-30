# Prose Manual Test Guide

Status: implementation complete; human run pending

| Environment | Record before testing |
| --- | --- |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Assistive technology | |
| Playground route | `/prose` |

Scenario order: Overview → Size and measure → Editorial descendants →
Responsive and RTL.

Use `pass`, `fail`, `blocked`, or `not applicable` for each result.

1. Confirm native heading, paragraph, link, list, quote, code, table, rule,
   figure, image, and caption semantics remain unchanged.
2. Compare sm/md/lg and narrow/default/wide reading measures; rhythm should
   remain coherent rather than simply scaling every value.
3. Confirm native tables and preformatted code wrap within the reading region
   and never widen the page at 320 and 390 pixels. Use the direct Table or Code
   Block owner when preserved horizontal scrolling is required.
4. Confirm direct Brick Text keeps its own typography inside Prose.
5. Navigate links by keyboard and confirm visible focus, underline, and real
   destinations without extra Prose tab stops.
6. Repeat in light, dark, forced colors, 200% text, 400% zoom, text spacing,
   long localization, and RTL. Confirm logical alignment, readable wrap, and
   preserved source order.
7. Confirm copied text contains only authored content and no generated labels.

## Completion

Overall result:

Follow-up issues:

Workbook updated:
