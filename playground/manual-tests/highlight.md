# Highlight manual-test protocol

| Environment | Record before testing |
| --- | --- |
| Component | Highlight |
| Version or commit | Brick 0.1.12 candidate with Atom 0.25.0 |
| Reviewer | Codex visual review; VoiceOver run pending |
| Date | 2026-08-30 |
| Browser and version | Chrome stable; exact version recorded at run |
| Operating system | macOS |
| Viewport and zoom | 320, 390, 1440 CSS px; 100%, 200%, 400% |
| Physical device | Not applicable; Highlight has no interaction or touch contract |
| Assistive technology | macOS VoiceOver pending |
| Playground route | `/highlight` |

Scenario order: `01 Overview`, `02 Matching and recipes`, `03 Adaptation and exact output`.

Use `pass`, `fail`, `blocked`, or `not applicable` for each result.

## Step 1 — Exact matching, recipes, and copy

Setup: Open `/highlight` in system appearance and review 01–03 top to bottom.

Action: Compare longest-overlap, literal punctuation, case-sensitive, first-only, and Unicode whole-word examples; compare every variant/tone; select and copy full strings.

Expected: Native span/mark output preserves original strings and Atom 0.25.0 matching; copied text contains no generated separators; recipes never imply focus or current-result state.

Result:
Notes or issue:

## Step 2 — Reflow, appearance, localization, and direction

Setup: Repeat at 320/390 px, 200% text, 400% zoom, text-spacing override, dark appearance, forced colors, localization stress, and RTL.

Action: Inspect wrapping, visible matches, selection, copy, and page containment.

Expected: Every match remains perceivable and readable without clipping, overflow, hidden original text, color-only meaning, or direction error.

Result:
Notes or issue:

## Step 3 — Assistive technology

Setup: Enable the recorded screen reader on `/highlight`.

Action: Read the complete examples and traverse focusable content.

Expected: Original text is announced once in source order; Highlight adds no tab stop, keyboard command, live region, counter, or selected-result claim.

Result:
Notes or issue:

## Completion

Overall result: pending recorded run

Follow-up issues:

Workbook updated:
