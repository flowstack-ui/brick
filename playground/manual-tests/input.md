# Input manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Input |
| Version or commit | Unreleased 0.1.0 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/input` |

Scenario order: `01 Overview`, `02 Variants`, `03 Sizes`, `04 Shapes`,
`05 Adornments and Clear`, `06 Content and states`,
`07 Native Form and Field`, `08 Appearance and customization`,
`09 Responsive and RTL`

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Default and visual recipes

Setup: Open `/input`; review `01 Overview` through `04 Shapes` top to bottom.

Action: Focus and type in each Input. Compare only the named variant, size, or
shape while keeping the repeated content in view.

Expected: The default is medium, outline, rounded, and full width. Recipes
change paint only; sizes progress evenly; shapes change geometry only. Every
label focuses its Input and every focus ring remains visible.

Result:
Notes or issue:

## Step 2 — Adornments, Clear, and states

Setup: Continue through `05 Content` and `06 States`.

Action: Type in both ownership examples. Activate Clear by pointer, then test
disabled, read-only, required, and invalid Inputs by pointer and keyboard.

Expected: Adornments remain aligned without covering text. Clear removes the
value once and restores input focus. Controlled/uncontrolled values update
beside their own example. Disabled cannot edit; read-only can focus/copy but
not edit; required and invalid cues remain distinct.

Result:
Notes or issue:

## Step 3 — Form and rendered relationships

Setup: Continue to `07 Form`.

Action: Submit empty, enter an invalid email, correct it, submit, and reset.
Inspect external ownership and compare the live relationship example with its
rendered HTML.

Expected: Validation focuses Email and shows its related error; correction
clears invalid state; submission reports the value; reset empties it. The
external Input contributes only to the named form. IDs, slots,
`aria-describedby`, required, and invalid output match the live specimen.

Result:
Notes or issue:

## Step 4 — Appearance, customization, zoom, and RTL

Setup: Review `08 Theme` and `09 Stress`; test light/dark, forced colors,
reduced motion, 390 px, 200%, 400%, and RTL.

Action: Focus, type, scroll long values, and activate the Arabic Clear action.

Expected: Customization exactly matches its displayed code and remains
legible. Light/dark and forced colors retain borders, values, placeholder,
focus, invalid, disabled, and read-only distinctions. Nothing clips or causes
page-level horizontal scrolling. RTL adornments reverse logically and the
Arabic Clear action works.

Result:
Notes or issue:

## Step 5 — Physical mobile and screen reader

Setup: Open `/input` on the recorded physical device, then enable the recorded
screen reader.

Action: Focus text, email, password, search, telephone, and URL examples where
available; type, clear, submit, reset, and navigate all states.

Expected: Appropriate mobile keyboards appear without unexpected page zoom.
Every Input announces one label, role, value, and applicable description,
required, invalid, read-only, or disabled state. Clear announces its localized
name when available and is not an extra Tab stop.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

Mark unavailable physical-device or assistive-technology environments
`blocked`.
