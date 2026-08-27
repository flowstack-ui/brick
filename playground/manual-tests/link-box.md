# Link Box manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Link Box |
| Version or commit | Unreleased |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/link-box` |

Scenario order: `01 Primary destination`, `02 Independent action`,
`03 Browser and stress behavior`, `04 Text-selection tradeoff`

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Primary destination

Action: Hover and click the title, image, description, and empty card inset;
then focus the Link and press Enter.

Expected: Every primary area uses the same destination. Keyboard focus remains
one native Link and the complete card receives one visible focus ring.

Result:
Notes:

## Step 2 — Secondary action

Action: Activate the Save control by pointer and keyboard.

Expected: Save activates independently, does not navigate, and retains its own
focus treatment. Hovering it does not pretend that the primary destination is
active.

Result:
Notes:

## Step 3 — Browser and stress behavior

Action: Use the native link context menu and modifier-click, then inspect at
320 CSS pixels, 200% text, 400% zoom, RTL, dark appearance, forced colors, and
reduced motion.

Expected: Native link behavior remains available; content reflows; no focus
ring is clipped; state remains perceivable without layout shift.

Result:
Notes:

## Step 4 — Tradeoff

Action: Try dragging to select body text inside the full target.

Expected: Selection may be intercepted by the expanded pointer target. Record
whether this makes Link Box unsuitable for the evaluated content.

Result:
Notes:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

Mark unavailable physical or assistive-technology environments `blocked`.
