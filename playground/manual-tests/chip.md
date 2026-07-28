# Chip manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Chip |
| Version or commit | Unreleased 0.1.0 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/chip` |

Scenario order: `01 Overview`, `02 Anatomy and semantics`, `03 Variants and tones`, `04 Sizes and shapes`, `05 Leading content`, `06 Removal and disabled state`, `07 Long and localized values`, `08 Appearance and customization`, `09 Responsive, RTL, focus, and component boundary`.

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Semantics and component boundary

Confirm Root and Label remain passive authored content with no invented role,
selection state, or tab stop. Confirm every RemoveTrigger has a localized name
containing the visible value. Compare Chip with the passive Badge tag and
selectable Toggle filter examples.

Result:
Notes or issue:

## Step 2 — Removal, disabled state, and focus

Confirm pointer, Enter, and Space request application-owned removal exactly
once. Confirm disabled removal is visually and semantically unavailable. After
removing the focused value, assess the parent workflow's chosen focus destination
instead of expecting standalone Chip to recover focus.

Result:
Notes or issue:

## Step 3 — Visual recipes and authored content

Inspect soft/outline, neutral/accent, all sizes, both shapes, Icon, Avatar, and
custom CSS properties. Confirm targets remain usable, leading content stays
centered, tone does not imply status, and customization preserves contrast.

Result:
Notes or issue:

## Step 4 — Reflow, localization, and direction

At 320 CSS px and 200/400% zoom, confirm long English and Arabic labels truncate
without covering removal or causing page overflow. Confirm logical child placement
in RTL and touch usability on a physical mobile device.

Result:
Notes or issue:

## Step 5 — Appearance and preferences

Inspect light and dark scopes, keyboard focus, reduced motion, and Windows
forced-colors/high-contrast mode. Confirm token boundaries, remove glyphs,
disabled state, and focus remain perceivable. Run a desktop screen reader and
an iOS VoiceOver or Android TalkBack pairing without inferring a pass from
automation.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:
