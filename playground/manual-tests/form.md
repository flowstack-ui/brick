# Form manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Form |
| Version or commit | Unreleased 0.1.0 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/form` |

Scenario order: `01 Overview`, `02 Models`, `03 Validation`, `04 States`,
`05 Native`, `06 Composition`, `07 Theme`, `08 Stress`

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Default form and submission models

Setup: Open `/form`; start at `01 Overview`, then `02 Models`.

Action: Submit and reset the overview. Submit the native URL, function-action,
and callback examples with the same values; watch each nearby result.

Expected: The default form is an unboxed vertical boundary. Every model keeps
identical fields and actions; only submission ownership and its local result
change. Reset restores each initial value.

Result:
Notes or issue:

## Step 2 — Validation and submission states

Setup: Open `03 Validation` and `04 States`.

Action: Submit each validation example empty, correct it, submit again, then
reset. Repeat the state example while watching its visible state hooks.

Expected: Inline and browser-native specimens have identical content. Each
blocks invalid submission and focuses the first invalid field using its own
validation model. Invalid, submitting, submitted, and reset feedback matches
the form’s current state without moving unrelated content.

Result:
Notes or issue:

## Step 3 — Native surface and composition output

Setup: Open `05 Native` and `06 Composition`.

Action: Test forwarded native attributes and the external submit/reset
controls. Operate default, render, and asChild forms while inspecting the
rendered HTML panel.

Expected: External controls operate only their named form. Each composition
path remains one native form, forwards attributes/events, and updates the
displayed HTML to match the live result without unwanted URL navigation.

Result:
Notes or issue:

## Step 4 — Theme, customization, and stress

Setup: Open `07 Theme` and `08 Stress`; test light/dark, 390 px, 200%, 400%,
and RTL.

Action: Complete each form with keyboard and touch where available.

Expected: Custom rhythm is local and visible. Long controls and actions wrap
without clipping; source, focus, and reading order remain logical in RTL and
at zoom.

Result:
Notes or issue:

## Step 5 — Screen reader

Setup: Enable the recorded screen reader.

Action: Complete the overview and both validation flows.

Expected: Labels, descriptions, required/invalid states, errors, and submission
feedback are announced once, in context, with logical focus movement.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

Mark unavailable touch or assistive-technology environments `blocked`.
