# Nav List manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Nav List |
| Version or commit | |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/nav-list` |

Scenario order: `01 Overview`, `02 Variants`, `03 Tones`, `04 Sizes`,
`05 Content and states`, `06 Sections and disclosure`,
`07 Composition and output`, `08 Appearance and customization`,
`09 Responsive and RTL`.

Use `pass`, `fail`, `blocked`, or `not applicable` for every result. Record a
follow-up issue for each failure or blocker.

## Step 1 — Defaults and visual recipes

Setup: Open `/nav-list` in system appearance and review scenarios 01–04.

Action: Read each list top to bottom, compare like-for-like rows, then move
through every link with Tab.

Expected: Overview looks like the canonical soft accent medium list. Only the
named variant, tone, or size changes in each comparison. The current
destination is unmistakable, rows align, and keyboard focus is visible.

Result:
Notes or issue:

## Step 2 — Content, state, and disclosure

Setup: Continue through scenarios 05–06.

Action: Inspect icons, descriptions, current and disabled rows. Toggle
Foundations closed and open with pointer, Space, and Enter.

Expected: Content remains aligned and readable. The disabled destination
cannot navigate. The disclosure indicator and content follow the button state
without layout jumps, lost focus, or unclear feedback.

Result:
Notes or issue:

## Step 3 — Output, appearance, reflow, and direction

Setup: Continue through scenarios 07–09. Test light, dark, forced colors,
200%, 400%, a narrow mobile viewport, reduced motion, and RTL.

Action: Compare each rendered-output panel with its live specimen. Inspect the
customized rows, horizontal wrapping, long Arabic destination, and logical
icon order.

Expected: Ordered and composed HTML matches the specimen state. Theme and
custom properties remain legible. Content reflows without clipping or
unintended horizontal page scrolling, and RTL order mirrors logically.

Result:
Notes or issue:

## Step 4 — Assistive technology

Setup: Enable the recorded screen reader and return to scenarios 01, 05–07.

Action: Navigate the list, current and disabled links, section label,
disclosure button, ordered list, and composed link.

Expected: Navigation names, list structure, current and disabled states,
button expanded state, and controlled region are announced once and match the
visible and rendered output.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:
