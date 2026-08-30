# Kbd manual-test protocol

| Environment | Record before testing |
| --- | --- |
| Component | Kbd |
| Version or commit | Brick 0.1.12 candidate |
| Reviewer | Codex visual review; VoiceOver run pending |
| Date | 2026-08-30 |
| Browser and version | Chrome stable; exact version recorded at run |
| Operating system | macOS |
| Viewport and zoom | 320, 390, 1440 CSS px; 100%, 200%, 400% |
| Physical device | Not applicable; Kbd has no interaction or touch contract |
| Assistive technology | macOS VoiceOver pending |
| Playground route | `/kbd` |

Scenario order: `01 Overview`, `02 Variants and sizes`, `03 Sequences and native output`.

Use `pass`, `fail`, `blocked`, or `not applicable` for each result.

## Step 1 — Semantics, recipes, sequence, and copy

Setup: Open `/kbd` in system appearance and review 01–03 top to bottom.

Action: Inspect native output, compare four variants and three sizes, then select and copy a complete key sequence.

Expected: Every item remains native `kbd`; only named recipe/density changes; copied text matches visible text; sequence gaps occur between keys; forwarded attributes, style, ref, and slot remain truthful.

Result:
Notes or issue:

## Step 2 — Reflow, appearance, and direction

Setup: Repeat at 320/390 px, 200% text, 400% zoom, text-spacing override, dark appearance, forced colors, and RTL.

Action: Inspect label legibility, sequence wrapping, selection, and page containment.

Expected: Keys remain legible and sequences wrap between keys without clipping, page overflow, lost boundaries, or direction error.

Result:
Notes or issue:

## Step 3 — Assistive technology

Setup: Enable the recorded screen reader on `/kbd`.

Action: Read the sentence and key sequence in browse mode, then traverse focusable items.

Expected: Authored labels read in source order and Kbd adds no tab stop, listener, shortcut claim, or interactive state.

Result:
Notes or issue:

## Completion

Overall result: pending recorded run

Follow-up issues:

Workbook updated:
