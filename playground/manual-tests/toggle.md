# Toggle family manual-test protocol

Component: Toggle and ToggleGroup
Version or commit: Unreleased 0.1.0
Reviewer: Product owner
Date: Not run
Playground route: `/toggle`

Use `pass`, `fail`, `blocked`, or `not applicable` for each completed result.
Automated evidence does not pre-mark these human judgment checks.

## Step 1 — Visual hierarchy and persistent meaning

Review all variants, selected/unselected/disabled states, sizes, shapes, and
icon-only content in light and dark. Expected: selected state is unmistakable,
resting Toggle is quieter than Button, and labels keep the same meaning before
and after activation. Result: not run.

## Step 2 — Pointer, keyboard, focus, and disabled behavior

Activate standalone Toggle with click, touch, Space, and Enter. Tab into each
group once; use Arrow keys, Home, End, wrapping, and disabled-item skipping in
horizontal and vertical examples. Expected: focus remains visible and behavior
matches the visible state without duplicate activation. Result: not run.

## Step 3 — Single and multiple selection

Exercise the attached single view group and separated multiple filters,
including clearing the optional single selection where shown by development
tools. Expected: callbacks/state match one string or one string array; the
Consumer's required view remains selected because that app rejects empty.
Result: not run.

## Step 4 — Group geometry and customization

Review separated wrapping, attached borders/corners, full width, both
orientations, icon-only items, root class/style/slot hooks, and group-level
disabled state. Expected: items share one recipe, attachment has no doubled
borders, and customization does not alter behavior. Result: not run.

## Step 5 — Zoom, mobile, RTL, and localization

Review at 200% and 400% zoom, 256 CSS pixels where meaningful, mobile widths,
long unbroken/localized labels, and RTL. Expected: content wraps without page
overflow, logical corners mirror, and horizontal arrow direction mirrors in
RTL. Result: not run.

## Step 6 — Screen reader and preferences

Read standalone, icon-only, single, multiple, selected, and disabled examples
with VoiceOver. Review forced colors, reduced motion, reduced transparency,
and system/light/dark appearance. Expected: names, group context, and pressed
state are announced; selected/focus boundaries remain visible without relying
on color or motion. Result: not run.

## Completion

Overall result: not run
Follow-up issues: None recorded.
Workbook updated: Automated evidence may be recorded later; human rows remain
open until this protocol is performed.
