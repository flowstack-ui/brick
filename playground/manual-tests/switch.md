# Switch manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Switch |
| Version or commit | Unreleased 0.1.0 |
| Reviewer |  |
| Date |  |
| Browser and version |  |
| Operating system |  |
| Viewport and zoom |  |
| Physical device |  |
| Assistive technology |  |
| Playground route | `/switch` |

Scenario order: `01 Overview`, `02 States`, `03 Sizes`, `04 Ownership`,
`05 Availability`, `06 Form`, `07 Compose`, `08 Theme`, `09 Stress`.
Use `pass`, `fail`, `blocked`, or `not applicable`; leave results blank until
the named environment is actually tested.

## Step 1 — Default, states, and sizes

Setup: Open `/switch`; review scenarios 01–03 top to bottom.
Action: Toggle every enabled control and compare `sm`, `md`, and `lg`.
Expected: State is obvious, names remain stable, and only complete track/thumb
geometry changes across sizes.
Result:
Notes or issue:

## Step 2 — Keyboard, ownership, and availability

Setup: Continue through scenarios 04–05 using keyboard only.
Action: Use Tab, Space, and Enter. Try controlled, read-only, disabled,
required, and invalid examples.
Expected: Enabled settings toggle once; controlled follows its state; read-only
focuses but never changes; disabled is unavailable; invalid changes border only.
Result:
Notes or issue:

## Step 3 — Field and native Form

Setup: Continue to scenario 06.
Action: Save empty, enable Weekly reports and save, then reset.
Expected: Validation focuses the Switch; correction submits `enabled`; reset
returns off; the external named setting remains part of the form.
Result:
Notes or issue:

## Step 4 — Composition and output

Setup: Continue to scenario 07.
Action: Toggle both examples and compare live specimens with rendered HTML.
Expected: Custom Root/Thumb hosts retain one switch, correct checked state,
decorative thumb, Brick classes/slots, and adapter attributes.
Result:
Notes or issue:

## Step 5 — Appearance and customization

Setup: Continue to scenario 08 and use page appearance controls.
Action: Focus and toggle both scoped defaults and the customized setting.
Expected: Both appearances remain readable; only the customized checked Switch
has the larger green geometry shown by its exact code.
Result:
Notes or issue:

## Step 6 — Mobile, zoom, RTL, and preferences

Setup: Continue to scenario 09. Test physical phone, 200%/400% zoom, reduced
motion, and forced colors/high contrast.
Action: Toggle each long/RTL setting once in each environment.
Expected: No clipping or page overflow; target stays usable; RTL travel mirrors;
reduced motion is immediate; forced colors preserve state, focus, and validity.
Result:
Notes or issue:

## Step 7 — Assistive technology

Setup: Return to the top with the recorded screen reader or voice-control tool.
Action: Traverse, toggle, validate, and inspect read-only/disabled examples.
Expected: Stable setting names, switch role, on/off state, descriptions, errors,
and availability are announced once; validation focus is understandable.
Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

Mark unavailable physical-device or assistive-technology environments
`blocked`.
