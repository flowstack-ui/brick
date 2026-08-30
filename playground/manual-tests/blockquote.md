# Blockquote Manual Test Guide

Status: implementation complete; human run pending

| Environment | Record before testing |
| --- | --- |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Assistive technology | |
| Playground route | `/blockquote` |

Scenario order: Overview → Variants and alignment → Semantics and adaptation.

Use `pass`, `fail`, `blocked`, or `not applicable` for each result.

1. Confirm Overview renders direct figure, blockquote, and figcaption structure; attribution must not be inside the blockquote.
2. Confirm the source URL is exposed by Content's native `cite` attribute and Cite remains native `cite`.
3. Compare accent, surface, and plain plus start, center, and end logical alignment.
4. Confirm Icon is decorative and no Blockquote part enters the tab order.
5. Select and copy quotation plus attribution; visible and copied text must agree without adding a duplicate icon glyph announcement.
6. Repeat at 320/390 pixels, dark, forced colors, 200% text, 400% zoom, text spacing, localization, and RTL; confirm readable wrap and logical rule/alignment.

## Completion

Overall result:

Follow-up issues:

Workbook updated:
