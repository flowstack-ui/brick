# Icon Button manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Icon Button |
| Version or commit | Unreleased 0.1.0 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/icon-button` |
Scenario order: `01 Overview`, `02 Variants`, `03 Tones`, `04 Sizes`,
`05 Shapes`, `06 Links`, `07 States`, `08 Theme`, `09 Stress`

Use `pass`, `fail`, `blocked`, or `not applicable` for every result. Test only
the environments recorded above. A result from an earlier playground revision
does not automatically apply after a route or scenario change.

## Step 1 — Overview

Setup: Open `/icon-button` at the default review viewport with system
appearance and LTR direction.

Action: Inspect `01 Overview`, activate `Search workspace` once, and observe
the status message.

Expected: The canonical Icon Button is a neutral ghost, medium, rounded action.
It is a 44 × 44 CSS-pixel square, contains one centered search icon, has a
visible focus treatment, and announces `Activated 1 time` without moving focus.

Result:
Notes or issue:

## Step 2 — Variants and tones

Setup: Open `02 Variants`, then `03 Tones`.

Action: Compare solid, soft, outline, and ghost. In Tones, review neutral,
accent, info, success, warning, and danger inside every variant group.

Expected: Variants change emphasis and boundary only. Tones change semantic
color treatment only. Every specimen remains square, centered, medium,
rounded, and clearly distinguishable from its surrounding panel.

Result:
Notes or issue:

## Step 3 — Sizes and shapes

Setup: Open `04 Sizes` and `05 Shapes`.

Action: Compare xs, sm, md, lg, and xl, then rounded and circle.

Expected: Sizes increase in a clear five-step scale while every target stays
square and its icon remains centered and proportional. Shape changes corner
geometry only; it does not change target size, icon size, tone, or action.

Result:
Notes or issue:

## Step 4 — Links and composition output

Setup: Open `06 Links`.

Action: Inspect `href Icon Button HTML`, `render Icon Button HTML`, and
`asChild Icon Button HTML`. Activate the asChild preview with Enter.

Expected: Each preview is paired with its actual DOM output. All three results
are named native anchors with the expected `href`, Icon Button classes, slots,
and decorative icon treatment. The asChild link scrolls to `07 States`; no
result becomes an ARIA button unexpectedly.

Result:
Notes or issue:

## Step 5 — Icon content, names, and states

Setup: Open `07 States`.

Action: Inspect the SVG icon, image icon, disabled, loading, and
disabled-plus-loading specimens. Tab through the row and attempt activation.

Expected: The SVG and image are decorative and each control has one complete
accessible name. All targets remain the default square size. Disabled controls
use a clearly faded foreground and cannot activate. Loading remains focusable, retains its name, exposes busy
state, hides the original icon, and shows one centered spinner. Combined
disabled and loading behavior remains visually and semantically clear.

Result:
Notes or issue:

## Step 6 — Appearance and customization

Setup: Open `08 Theme`. Review the page appearance controls and the scoped
light/dark examples.

Action: Switch system, light, and dark appearance. Compare each displayed code
example with its live customized Icon Button.

Expected: Appearance affects only the intended scope. Icons, boundaries, focus,
disabled, and loading states remain readable. Component tokens produce the
purple solid result. Consumer hooks produce the dashed result while preserving
square geometry, `.brick-icon-button`, and the custom slot.

Result:
Notes or issue:

## Step 7 — Constrained width, zoom, and RTL

Setup: Open `09 Stress`. Use 390 px width, then 200% and 400% zoom where
available. Review the genuine RTL panel separately.

Action: Inspect and operate both long-name controls and both Arabic controls.

Expected: Every target remains square and centered without clipping,
horizontal page scrolling, or overlap. Long accessible names do not change
visible geometry. RTL is inherited from the surrounding context and logical
order remains correct.

Result:
Notes or issue:

## Step 8 — Keyboard, pointer, and touch

Setup: Reload `/icon-button`. Use a keyboard, then a mouse and a real
touch-capable device when available.

Action: Tab through representative actions and links. Activate buttons with
Enter and Space, links with Enter, hover and press with a mouse, and tap
representative md-or-larger targets.

Expected: Focus order and focus rings are logical and visible. Native buttons
and links use their correct keyboard behavior and activate once. Touch does not
retain false hover or pressed state. Medium and larger targets are comfortable;
xs and sm retain enough surrounding separation.

Result:
Notes or issue:

## Step 9 — Screen-reader naming

Setup: Enable the recorded screen reader and return to Overview, Links, and
States.

Action: Navigate the default, SVG, image, link, disabled, loading, and combined
inactive examples.

Expected: Every control announces one complete name and the correct button or
link role. Decorative SVG/image content adds no duplicate speech. Disabled and
busy states are announced correctly, and activation feedback announces once
without moving focus.

Result:
Notes or issue:

## Step 10 — Appearance and preferences

Setup: Review representative specimens in light, dark, system,
reduced-motion, and forced-colors modes.

Action: Focus and activate representative variants, loading, disabled, and
customized Icon Buttons in each applicable mode.

Expected: Icons, boundaries, state, and focus remain visible. Reduced motion
removes nonessential transitions without hiding the loading spinner.
Forced colors preserves usable system-color boundaries and focus.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

Use `blocked` when the required device, browser, operating system, or assistive
technology was unavailable. Use `not applicable` only when the check does not
apply to the tested environment or Icon Button contract.
