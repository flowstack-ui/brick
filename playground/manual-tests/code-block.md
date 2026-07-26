# Code Block Manual Test Guide

Status: implementation complete; human run pending

| Environment | Record before testing |
| --- | --- |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Assistive technology | |
| Playground route | `/code-block` |

Scenario order: Overview → Variants → Sizes → Optional anatomy → Content and
language → Wrapping and overflow → Copy states → Appearance and customization
→ Responsive and RTL.

Use `pass`, `fail`, `blocked`, or `not applicable` for each result.

1. Confirm Overview has no header/action/status, one named focusable viewport,
   and exact `pre > code` source.
2. Test Variants then Sizes top down. Confirm only the named surface or density
   changes and every block retains identical source and behavior.
3. In Optional anatomy, confirm title, `tsx`, Copy source, Content, and Status
   appear in logical focus order. Copy once; expect pending then copied.
4. In Content and language, confirm raw markup displays as text and highlighted
   React output shows a colored `import` without unsafe rendered markup.
5. In Wrapping and overflow, keyboard-focus Scroll and use horizontal keys;
   expect preserved lines. Wrap must reflow the same long line without a second
   scroll owner.
6. In Copy states, run Success, Error, and Disabled once each. Expect truthful
   copied/error wording, reset after about 1.5 seconds, no copy while disabled,
   and Trigger focus retained.
7. Compare light/dark defaults and the customized dark block. Confirm the
   customized result matches its shown surface, text, border, and radius.
8. At mobile width, 200% text, and 400% zoom, move through the final section.
   Confirm no page overflow, many lines remain reachable, RTL header follows
   the page, and source remains LTR.
9. Repeat with keyboard, forced colors, and a screen reader. Each focusable
   viewport has its authored name; copy status is announced politely once.

## Completion

Overall result:

Follow-up issues:

Workbook updated:
