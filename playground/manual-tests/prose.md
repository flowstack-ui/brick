# Prose manual-test protocol

| Environment | Record before testing |
| --- | --- |
| Component | Prose |
| Version or commit | Brick 0.1.12 candidate |
| Reviewer | Codex visual review; VoiceOver run pending |
| Date | 2026-08-30 |
| Browser and version | Chrome stable; exact version recorded at run |
| Operating system | macOS |
| Viewport and zoom | 320, 390, 1440 CSS px; 100%, 200%, 400% |
| Physical device | Not applicable; Prose owns no touch interaction |
| Assistive technology | macOS VoiceOver pending |
| Playground route | `/prose` |

Scenario order: `01 Overview`, `02 Size and measure`, `03 Editorial descendants`, `04 Responsive and RTL`.

Use `pass`, `fail`, `blocked`, or `not applicable` for each result.

## Step 1 — Editorial hierarchy, rhythm, and native descendants

Setup: Open `/prose` in system appearance and review 01–03 top to bottom.

Action: Inspect heading, paragraph, link, list, quote, code, table, rule, figure, image, caption, and direct Brick Text; compare sm/md/lg and narrow/default/wide measures; select and copy the article.

Expected: Native semantics remain unchanged, direct Brick Text keeps its own typography, rhythm remains coherent across sizes/measures, and copied output contains only authored text.

Result:
Notes or issue:

## Step 2 — Keyboard and focus

Setup: Start before the first Prose link.

Action: Navigate every real destination by keyboard and inspect focus/underline treatment.

Expected: Every link has visible focus and a real destination; Prose adds no extra tab stops or navigation behavior.

Result:
Notes or issue:

## Step 3 — Reflow, appearance, localization, and direction

Setup: Review 04 at 320/390 px, 200% text, 400% zoom, text-spacing override, dark appearance, forced colors, long localization, and RTL.

Action: Inspect tables, preformatted code, media, wrapping, logical alignment, and page containment.

Expected: Descendants remain readable in source order; tables and pre wrap rather than widening the page; no clipping, overflow, hidden content, or direction error appears.

Result:
Notes or issue:

## Step 4 — Assistive technology

Setup: Enable the recorded screen reader on `/prose`.

Action: Read landmarks and editorial descendants in browse mode, then navigate links.

Expected: Native roles, heading levels, list structure, quotation, table relationships, media alternatives, caption, and destinations are announced without duplicate generated content.

Result:
Notes or issue:

## Completion

Overall result: pending recorded run

Follow-up issues:

Workbook updated:
