# Switch manual-test protocol

## Disabled appearance regression

Compare individual and Fieldset-inherited disabled states in light/dark and
forced colors. Preserve variant paint, fade each visual boundary once, and
check the cursor over labels, editors, indicators and nested actions. Read-only
remains separate. Record physical-device and assistive checks independently.

| Run information | Value |
| --- | --- |
| Component | Switch |
| Version or commit | Unreleased 0.2.3 parity candidate |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/switch` |

Scenario order: `01 Overview`, `02 States`, `03 Sizes and variants`, `04 Ownership`,
`05 Availability`, `06 Form`, `07 Compose`, `08 Theme`, `09 Stress`.
Use `pass`, `fail`, `blocked`, or `not applicable`; leave results blank until
the named environment is actually tested.

## Step 1 — Default, states, and sizes

Setup: Open `/switch`; review scenarios 01–03 top to bottom.
Action: Toggle every enabled control and compare `xs`, `sm`, `md`, and `lg`,
then compare the solid and raised treatments.
Expected: State is obvious, names remain stable, the unchecked track remains
visible and gains contrast through hover and pressed interaction in both
appearances, solid is borderless, raised separates rail and thumb, and only
complete track/thumb geometry changes across sizes.
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
has the larger green geometry shown by its exact code. Its hover and press paint
remain green rather than returning to accent. Raised keeps a softer rail and
solid thumb.
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

## Step 8 — Public examples and compound anatomy

Setup: Open `/switch` without qualification mode and inspect every Preview and
Code tab at desktop and narrow widths.
Action: Exercise compound labels, controller/provider, indicators, tooltip,
React Hook Form, native form, responsive recipe, custom colors, RTL and custom
host examples. Follow the independent help link.
Expected: Preview matches source; every Field has one Control and one
HiddenInput; default Control has one Thumb; links do not toggle; tooltip targets
the Control; form error focus reaches Control; responsive geometry changes
without a sweep or bounce; track indicators remain centered opposite the Thumb
and thumb indicators remain centered and clipped inside it in both states;
there are no console errors or missing styles.
Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

Mark unavailable physical-device or assistive-technology environments
`blocked`.
