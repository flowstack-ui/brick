# Blockquote manual-test protocol

## Parity follow-up (pending human verification)

1. Inspect /blockquote examples and /blockquote?qualification=1 in light/dark,
   RTL, narrow widths and actual 200%/400% browser zoom. Check all tones and
   subtle/solid rules, surface padding, and plain containment.
2. Verify default/custom icons remain square and Float decoration stays within
   the preview gutter without covering quotation text.
3. Check author, work title and source link with a screen reader; decorative
   SVGs must not be announced and attribution must remain outside the quote.
4. Test forced colors, text spacing, long source links and typography examples.
   Record physical-device results separately. Automation does not complete this gate.

| Environment | Record before testing |
| --- | --- |
| Component | Blockquote |
| Version or commit | Brick 0.1.12 candidate |
| Reviewer | Codex visual and accessibility review |
| Date | 2026-08-30 |
| Browser and version | Safari 26.5 |
| Operating system | macOS 26.5.1 |
| Viewport and zoom | 320, 390, 1440 CSS px; 100%, 200%, 400% |
| Physical device | Not applicable; Blockquote has no touch interaction contract |
| Assistive technology | macOS VoiceOver 26.5.1 |
| Playground route | `/blockquote` |

Scenario order: `01 Overview`, `02 Variants and alignment`, `03 Semantics and adaptation`.

Use `pass`, `fail`, `blocked`, or `not applicable` for each result.

## Step 1 — Structure, attribution, and recipes

Setup: Open `/blockquote` in system appearance and review 01–03 top to bottom.

Action: Inspect live structure and cite output, compare accent/surface/plain and logical alignments, then select and copy quotation plus attribution.

Expected: Direct `figure > blockquote + figcaption` structure remains intact; Content owns native `cite`, Cite remains native `cite`, the icon is decorative, and only named recipe/alignment changes.

Result:
Notes or issue:

## Step 2 — Reflow, appearance, localization, and direction

Setup: Repeat at 320/390 px, 200% text, 400% zoom, text-spacing override, dark appearance, forced colors, long localized text, and RTL.

Action: Inspect wrapping, rule placement, alignment, selection, copy, and page containment.

Expected: Quote and attribution remain readable in source order; logical rule/alignment mirrors correctly; no clipping, overflow, or color-only meaning appears.

Result:
Notes or issue:

## Step 3 — Assistive technology

Setup: Enable the recorded screen reader on `/blockquote`.

Action: Read the quote and attribution in browse mode and traverse focusable content.

Expected: Quote then attribution are announced once in source order; the decorative icon is silent and no part enters the tab order.

Result:
Notes or issue:

## Completion

Overall result: pending recorded run

Follow-up issues:

Workbook updated:
