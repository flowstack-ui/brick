# Nav List manual-test protocol

## Docs parity regression

Use `/nav-list` for focused examples; use `/nav-list?qualification=1` for the
exhaustive scenarios below. Results remain unperformed until a human records them.
Check plain hover has no fill but keyboard focus is visible; inspect radius,
meaningful unread count announcements, one custom indicator and null suppression.
Close a section while its child has focus: focus must return to its trigger.
Closed retained children must not be keyboard reachable. Check composed disabled
links cannot open via modified clicks or the context menu. Repeat light/dark,
RTL, narrow viewport, real browser zoom and a screen reader.

## Independent gaps

In Sections, compare the default and Group gap: 6 examples. The second has
more space between groups, but the same spacing between links. Each example's
Heading gap: 0 group removes only the heading-to-content gap. Repeat in RTL;
check that labels and padded row backgrounds keep their alignment. Results
require manual observation and are not implied by automated tests.

## Inset and indentation regression

In Sections, compare default/none row inset independently of default/none
section indent. Flat titles and links should share their leading text column
(apart from the row's 1px border), while padded rows keep their hover area.
Repeat in RTL, with keyboard focus and at narrow widths. Verify the desktop
sidebar and mobile Drawer both use flat static groups. Record actual results.

## Density and hierarchy regression

- Compare comfortable and compact at every size in Sizes and density. Text and
  icons retain their size; compact reduces row padding and inter-row gaps.
- Check section titles are primary/strong and idle links secondary in light
  and dark. Check current, hover and keyboard focus remain distinguishable.
- Check desktop shell compact navigation and the mobile Drawer's comfortable
  navigation, including long labels, zoom and touch. Record actual results;
  automated browser evidence does not complete physical-device checks.

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
destination is unmistakable, rows align, and keyboard focus is visible. In the
neutral soft specimen, the current row remains distinct from its parent
surface in both appearances and gains a separate hover treatment.

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
