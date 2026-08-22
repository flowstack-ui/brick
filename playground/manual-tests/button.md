# Button manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Button |
| Version or commit | Unreleased 0.1.0 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/button` |
Scenario order: `01 Overview`, `02 Variants`, `03 Tones`, `04 Sizes`,
`05 Shape`, `06 Links`, `07 States`, `08 Theme`, `09 Stress`

Use `pass`, `fail`, `blocked`, or `not applicable` for every result. Record the
browser, operating system, viewport, zoom level, assistive technology, and
physical device used for the run. A result from an earlier playground revision
does not automatically apply after a route or scenario change.

## Step 1 — Overview

Setup: Open `/button` at the default review viewport with system appearance and
LTR direction.

Action: Inspect the Overview specimen, activate `Publish project` once, and
observe the status message.

Expected: The canonical Button is a solid accent, medium, rounded action. It
has a clear name and focus treatment, activates once, and the status announces
`Pressed 1 time` without moving focus.

Result:
Notes or issue:

## Step 2 — Variants and tones

Setup: Open `02 Variants`, then `03 Tones`.

Action: Compare the four variants. In Tones, review every neutral, accent,
info, success, warning, and danger tone inside each variant group.

Expected: Variants change emphasis and boundary only. Tones change semantic
color treatment without changing Button anatomy, size, label, or interaction.
No comparison introduces horizontal scrolling or inconsistent specimen width.

Result:
Notes or issue:

## Step 3 — Sizes, shape, and width

Setup: Open `04 Sizes` and `05 Shape`.

Action: Compare xs, sm, md, lg, and xl. Then compare sharp, rounded, and pill;
finally resize the browser around the Full-width behavior example.

Expected: Sizes change coordinated control geometry and typography only. Shape
changes corner geometry only. `fullWidth` fills its specimen container and
does not overflow or change the Button’s intrinsic height unexpectedly.

Result:
Notes or issue:

## Step 4 — Links and composition output

Setup: Open `06 Links`.

Action: Inspect the three rendered-output panels: `href Button HTML`, `asChild
Button HTML`, and `render Button HTML`. Activate the asChild preview with Enter.

Expected: Each live preview is paired with the actual DOM output on the right.
All three results are native anchors with the expected `href`, Button classes,
slots, and accessible content. The asChild link scrolls to `07 States`; no
result becomes an ARIA button unexpectedly.

Result:
Notes or issue:

## Step 5 — Content and interaction states

Setup: Open `07 States`.

Action: Inspect start icon, end icon, disabled, loading, and
disabled-plus-loading specimens. Focus the loading Button and attempt
activation.

Expected: Icons are decorative unless their surrounding content supplies the
meaning. Disabled cannot activate, preserves the default medium geometry, and
uses a faded disabled foreground with a subtle boundary rather than resembling
an enabled neutral outline.
Loading remains focusable, preserves its accessible name and dimensions, blocks
repeat activation, and shows one centered spinner. Combined disabled and
loading presentation remains visibly unavailable without shifting geometry.

Result:
Notes or issue:

## Step 6 — Native form behavior

Setup: Stay in `07 States` and locate `Native form behavior`.

Action: Edit `Project name`, submit with `Save form`, edit again, then activate
`Reset`.

Expected: Submit uses native `type="submit"` behavior and updates the local
status without navigation. Reset uses native `type="reset"` behavior and
restores `Mobile storefront`. The label is aligned with its input and ordinary
Buttons do not submit accidentally.

Result:
Notes or issue:

## Step 7 — Appearance and customization

Setup: Open `08 Theme`. Review the page appearance controls and both scoped
light/dark panels.

Action: Switch system, light, and dark appearance. Inspect component CSS
properties, consumer hooks, class/style overrides, and the custom data slot.

Expected: Appearance controls affect the intended scope. Text, boundaries,
focus, disabled, and loading states remain readable. Customization changes only
the authored Button, preserves `.brick-button`, and the dashed-action preview
matches its displayed code.

Result:
Notes or issue:

## Step 8 — Constrained width and RTL

Setup: Open `09 Stress`. Review the constrained-width panel at mobile width and
the genuine RTL panel with `dir="rtl"`.

Action: Test at 390 px, 200% zoom, and 400% zoom where available. Inspect the
long localized label, then focus the RTL Button and activate it.

Expected: The long label wraps without clipping, two-dimensional scrolling, or
lost content. The Button inherits RTL direction, logical spacing is correct,
and the directional icon remains semantically appropriate.

Result:
Notes or issue:

## Step 9 — Keyboard, pointer, touch, and screen reader

Setup: Reload `/button`. Use a keyboard, then a mouse or touch device. Enable
the selected screen reader when available.

Action: Tab through the page. Activate representative Buttons with Enter and
Space, hover and press with a mouse, tap representative sizes, and inspect
Overview, loading, disabled, links, and form controls with the screen reader.

Expected: Focus order and focus rings are logical and visible. Enter and Space
perform each action once. Touch does not retain false hover and targets are
comfortable. Names, roles, unavailable/busy states, decorative icons, form
semantics, and status announcements are correct without duplicate speech.

Result:
Notes or issue:

## Step 10 — Appearance and preferences

Setup: Review the page in light, dark, and system appearance. Then run separate
reduced-motion and forced-colors checks.

Action: Focus and activate representative variants, disabled/loading states,
and the customized Button in each applicable mode.

Expected: Text, boundaries, states, and focus remain visible in every mode.
Scoped appearance affects only its panel. Reduced motion removes nonessential
transitions without hiding loading status. Forced colors preserves usable
system-color contrast and focus.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

Use `blocked` when the required device, browser, operating system, or assistive
technology was unavailable. Use `not applicable` only when the check does not
apply to the tested environment or Button contract.
