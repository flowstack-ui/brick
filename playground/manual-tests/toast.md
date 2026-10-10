# Toast manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Toast |
| Version or commit | Unreleased local candidate (record exact archive digest) |
| Reviewer |  |
| Date |  |
| Browser and version |  |
| Operating system |  |
| Viewport and zoom |  |
| Physical device |  |
| Assistive technology |  |
| Playground route | `/toast` |
| Qualification route(s) | `/toast` and `/toast?qualification=1` |

Scenario order: `01 Overview`, `02 Types`, `03 Content`, `04 Queue`, `05 Positions`, `06 Async`, `07 Theme`, `08 Keyboard`, `09 Stress`. Use `pass`, `fail`, `blocked`, or `not applicable`; leave every result blank until tested.

## Step 1 — Product, types, and content

Review 01–03. Expected: create/update/dismiss works; all six types retain identical geometry; glyphs reinforce authored meaning; title, description, custom icon, action, and close remain clear.

Result:
Notes or issue:

## Scoped manager and modal checks

Use the scoped, dialog, pause, lifecycle and overlap documentation examples.
Check that separate managers never announce each other's content, queued time
does not reduce reading time, and simultaneous hover/focus pauses do not resume
prematurely. Dismiss should finish its exit before unmounted is reported;
remove is immediate. A removed promise notification must remain removed.
Within a dialog, verify toast controls remain reachable without escaping the
modal focus scope. Check five different-height items, newest nearest the edge,
then open the page on a physical device and repeat with actual browser zoom.

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

## Step 5 — Focus presentation qualification

Action: Keyboard-focus every toast action or owned focus part, including
first and last items where relevant. Repeat in light/dark, RTL, OS high
contrast and actual 200%/400% zoom. Check selected/loading states where
supported and rounded or scrolling boundaries.

Expected: Visible focus without layout shifts or clipped edges. Inside
actions use paired foreground paint; field focus survives without shadows
in high contrast. Selection and focus remain distinguishable. Browser
emulation does not replace OS or assistive-technology checks.

Result: not run for this manual protocol revision.
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:
