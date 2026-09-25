# Password Toggle Field manual-test protocol

## Disabled appearance regression

Compare individual and Fieldset-inherited disabled states in light/dark and
forced colors. Preserve variant paint, fade each visual boundary once, and
check the cursor over labels, editors, indicators and nested actions. Read-only
remains separate. Record physical-device and assistive checks independently.

Use `pass`, `fail`, `blocked`, or `not applicable` for every result. Never use
a real credential, copy a saved password into the playground, or include the
entered value in notes, screenshots, logs, or issue reports.

| Run information | Value |
| --- | --- |
| Component | Password Toggle Field |
| Package | Unreleased Brick 0.2.3 with the recorded Atom candidate |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device and input | |
| Assistive technology | |
| Playground route | `/password-toggle-field` |
| Qualification route | `/password-toggle-field?qualification=1` |

Scenario order: `01 Overview`, `02 Variants`, `03 Sizes`, `04 Shapes`,
`05 Visibility and localization`, `06 States`, `07 Form and Field`,
`08 Appearance and customization`, `09 Responsive and RTL`.

## Step 1 — Desktop pointer and keyboard

Use a synthetic value. Toggle with a primary pointer, then with Tab, Enter, and
Space. Try a secondary click. Select a middle range before pointer reveal.

Expected: primary, Enter, and Space toggle once; secondary click does not;
pointer activation keeps input focus and selection; keyboard focus can move to
the action; value and geometry do not change; action names describe the next
action. Input focus paints the field only and action focus paints the action
only.

Result:
Notes or issue:

## Step 2 — Forms and state

Exercise controlled/default visibility, disabled, read-only, required and
invalid examples. Submit and reset the native and external forms repeatedly,
including their prevented operations.

Expected: submit handlers observe `type="password"`; a prevented submit returns
to the committed visible/hidden state; accepted reset restores value and default
visibility; prevented reset preserves both; Field relationships and error focus
remain correct. Status text never contains the entered value.

Result:
Notes or issue:

## Step 3 — Appearance, reflow, and direction

Review all seven variants and sizes, smallest/largest sizes, underline,
invalid/disabled/read-only, light/dark, narrow mobile width, long labels, and
RTL. Repeat with OS forced colors and reduced motion.

Expected: artwork is centered, hit areas retain their size, boundaries and
focus are visible, logical action placement mirrors in RTL, and content does
not clip or create page overflow.

Result:
Notes or issue:

## Step 4 — Actual zoom

Repeat the overview, states, native form, and RTL examples at browser zoom 200%
and 400% (not device emulation).

Expected: label, description, error, input, action, status and focus indicators
remain available without two-dimensional page scrolling or clipped controls.

Result:
Notes or issue:

## Step 5 — Screen reader

With the recorded screen reader, navigate to the labeled input and action,
edit a synthetic value, reveal/conceal it, trigger validation, submit, and reset.

Expected: label, description, invalid state and localized Show/Hide action are
announced once; decorative artwork is ignored; there is no `aria-pressed`
announcement and no announcement of the entered value.

Result:
Notes or issue:

## Step 6 — Physical touch and pen

On a physical touch device and, when available, a pen-capable device, tap the
input and action at 2xs and lg, repeat reveal/conceal, and test narrow RTL.

Expected: one activation per tap, no lost value or focus trap, usable target
area, no compatibility-mouse double activation, and no layout shift.

Result:
Notes or issue:

## Step 7 — Password manager and paste

In a clean test account/profile, verify recognized current-password autofill,
manual paste, reveal/conceal, submit, and reset. Do not use or capture a real
password.

Expected: autocomplete remains `current-password`, paste is not blocked, the
manager can identify the field, and no status or feedback exposes the value.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:
