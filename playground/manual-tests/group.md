# Group manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Group |
| Version or commit | Unreleased |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/group` |

Scenario order: `01 Overview`, `02 Anatomy and semantics`,
`03 Attached borders and states`, `04 Orientation and growth`,
`05 Mixed composition`, `06 Appearance and customization`,
`07 Narrow, RTL, and long content`.

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Defaults and attachment

Review the default and attached scenarios. Hover, press, and keyboard-focus
every first, middle, and last control.

Expected: Detached items retain spacing. Attached items have one continuous
silhouette, one shared interior border, preserved outside corners, unchanged
target sizes, and fully visible focus rings above adjacent borders.

Result:
Notes or issue:

## Step 2 — Orientation, growth, and composition

Review horizontal, vertical, equal-growth, mixed Button/IconButton, and single
child examples.

Expected: Orientation changes only the relationship axis. Equal growth is
cohesive. Mixed controls retain their own semantics and recipes. One child is
unchanged.

Result:
Notes or issue:

## Step 3 — Themes and customization

Compare light/dark scopes, accent and radius Theme changes, disabled children,
and documented gap/overlap customization.

Expected: Group geometry remains stable while children own all paint and state.
Only the documented relationship variable changes.

Result:
Notes or issue:

## Step 4 — Narrow, zoom, RTL, forced colors, and assistive technology

Review at 320 CSS px, 200% text, 400% zoom, RTL, vertical writing, and forced
colors. Use a physical mobile device and available screen reader.

Expected: Attached chains do not wrap, logical corners and overlap reverse
correctly, focus remains visible, and Group adds no spoken role or keyboard
behavior unless explicitly authored.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

Mark unavailable physical-device or assistive-technology environments
`blocked`.
