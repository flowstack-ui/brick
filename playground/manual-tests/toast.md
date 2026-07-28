# Toast manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Toast |
| Version or commit | Unreleased 0.1.0 |
| Reviewer |  |
| Date |  |
| Browser and version |  |
| Operating system |  |
| Viewport and zoom |  |
| Physical device |  |
| Assistive technology |  |
| Playground route | `/toast` |

Scenario order: `01 Overview`, `02 Types`, `03 Content`, `04 Queue`, `05 Positions`, `06 Async`, `07 Theme`, `08 Keyboard`, `09 Stress`. Use `pass`, `fail`, `blocked`, or `not applicable`; leave every result blank until tested.

## Step 1 — Product, types, and content

Review 01–03. Expected: create/update/dismiss works; all six types retain identical geometry; glyphs reinforce authored meaning; title, description, custom icon, action, and close remain clear.

Result:
Notes or issue:

## Step 2 — Queue, position, and async behavior

Review 04–06. Expected: only three cards show, queued cards promote, separated cards never collide, overlap expands on hover/focus, six logical positions follow LTR/RTL, and loading updates in place through the same ID.

Result:
Notes or issue:

## Step 3 — Keyboard and assistive technology

Review 08 with a screen reader. Expected: appearance does not move focus; each create/update is announced once at polite or assertive priority; F8 reaches the labelled region; Tab reaches action then close; focus pauses timing; Escape dismisses and restores focus.

Result:
Notes or issue:

## Step 4 — Responsive and preferences

Review 07–09 in light/dark, 320px, 200%/400% zoom, RTL, forced colors, and reduced motion. Expected: cards remain within safe gutters, long localized text wraps, targets stay reachable, loading remains recognizable, and no translation/spinning motion remains when reduced.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:
