# Link manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Link |
| Version or commit | Unreleased 0.1.0 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/link` |

Scenario order: `01 Overview`, `02 Variants`, `03 Tones`, `04 Sizes`,
`05 Content`, `06 Native and composition`, `07 Appearance and customization`,
`08 Responsive and RTL`.

Use `pass`, `fail`, `blocked`, or `not applicable`.

## Step 1 — Default, variants, tones, and sizes

Setup: Open `/link`; review `01`–`04` top to bottom.

Action: Tab to Overview, press Enter, then compare each controlled row.

Expected: Default follows the theme and remains an underlined accent link with
Brick's fallback, a clear focus ring, and native fragment navigation. Plain
gains an underline on hover/focus. Explicit underline remains underlined even
inside the scoped resting-plain example. Tone or size changes only its named
property; inherit matches its surrounding copy. No example looks like a button
or shifts on interaction.

Result:
Notes or issue:

## Step 2 — Content, native behavior, and composition

Setup: Continue through `05` and `06`.

Action: Narrow the window, inspect icons, use a native link context menu or
modifier-click, and compare both composed examples with their rendered HTML.

Expected: Icons are centered, contained, clickable, and silent. Long content
wraps. Current/download remain native. Each adapter is one `a[href]`; live HTML
agrees on href, Brick class, recipe data, router marker, and content anatomy.

Result:
Notes or issue:

## Step 3 — Appearance and customization

Setup: Review `07` in light, dark, and forced colors.

Action: Focus links in both scopes and compare the customization description
with its result.

Expected: Foreground, underline, and focus remain perceivable. The customized
result changes exactly to green text with a thicker, lower underline.

Result:
Notes or issue:

## Step 4 — Responsive, RTL, zoom, mobile, and screen reader

Setup: Review `08` at 320 CSS px, 200%, 400%, increased text spacing, and on a
physical phone; then use the recorded screen reader's links navigation.

Action: Read both stress cells and traverse their links.

Expected: No clipping or page-level horizontal overflow; long content wraps;
RTL icons occupy logical start/end. Every link is announced with its visible
destination name, Account overview is current, and decorative icons add no
spoken content.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

Mark unavailable physical-device or assistive-technology environments
`blocked`; do not infer a passing result.
