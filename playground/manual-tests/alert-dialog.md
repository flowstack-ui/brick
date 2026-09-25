# Alert Dialog manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Alert Dialog |
| Version or commit | Unreleased 0.2.3 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/alert-dialog` |
| Qualification route(s) | `/alert-dialog?qualification=1` (legacy scenarios); `/alert-dialog` (shared recipes) |

Scenario order: `01 Overview`, `02 Sizes`, `03 Anatomy`, `04 States`,
`05 Nesting`, `06 Theme`, `07 Customization`, `08 Responsive`, `09 RTL`

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

Shared recipe checks (not yet manually qualified): compare Dialog and AlertDialog
with the same size, placement, appearance and radius; inspect all seven sizes,
inside/outside scrolling, responsive full-to-panel transitions and reduced motion.
Confirm that outside Positioner clicks never dismiss AlertDialog and that Cancel
retains safe focus. Verify retained examples remain hidden and preserve state.
Use the qualification query for the numbered scenarios below.

## Step 1 — Overview and safe decision

Setup: Open `/alert-dialog` and `01 Overview`.

Action: Open with keyboard, inspect initial focus, choose Cancel, reopen, and
choose the explicit confirming action.

Expected: The alert is named/described, safe focus does not land on the
destructive action by accident, focus stays inside, each response occurs once,
and focus returns to the trigger.

Result:
Notes or issue:

## Step 2 — Sizes and anatomy

Setup: Review `02 Sizes` and `03 Anatomy`.

Action: Open every size and optional anatomy example, including native
description and alternative Title levels.

Expected: Sizes change preferred measure only. Authored Body, Title,
Description, acknowledgement, and response controls retain correct order,
relationships, and readable spacing.

Result:
Notes or issue:

## Step 3 — Decisions, state, and nesting

Setup: Open `04 States` and `05 Nesting`.

Action: Test cancel/confirm reasons, disabled or strict dismissal policies, then
open the nested Alert Dialog from its parent Dialog and close each layer.

Expected: Outside interaction or Escape follows the labeled policy; a decision
is never reported twice. The Alert Dialog owns the top layer and returns focus
to its parent before the parent restores focus to its trigger.

Result:
Notes or issue:

## Step 4 — Theme and customization

Setup: Open `06 Theme` and `07 Customization`.

Action: Review portal scopes in system, light, and dark appearance; compare the
custom code with its live Alert Dialog.

Expected: Overlay, surface, warning hierarchy, text, focus, and response
controls remain clear. Customization stays local and preserves alert semantics,
decision behavior, anatomy, classes, and slots.

Result:
Notes or issue:

## Step 5 — Responsive detail, RTL, and preferences

Setup: Open `08 Responsive` and `09 RTL`; test at 390 px, 200%, and 400% zoom,
then reduced motion and forced colors.

Action: Read the longest detail and operate every response using keyboard and
touch where available.

Expected: Detail remains reachable, responses wrap without clipping, no
horizontal page scroll appears, logical order is correct in RTL, motion is
nonessential, and boundaries/focus remain visible in forced colors.

Result:
Notes or issue:

## Step 6 — Screen reader

Setup: Enable the recorded screen reader.

Action: Open Overview, acknowledgement/native-description, and nested examples.

Expected: Alert-dialog role, urgent title/detail, acknowledgement, response
names, unavailable state, and layer changes announce once and in a useful
order.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

Mark unavailable physical or assistive-technology environments `blocked`.

## Confirmation above an ActionBar

In `/alert-dialog?qualification=1`, open the AlertDialog action bar in
“Confirmation above ActionBar”. Click its close button while leaving the bar
mounted. Confirm Keep editing is focused and clickable, closes only the alert,
and returns focus to the bar’s close button. Reopen and click Discard changes;
both surfaces close. Repeat with the Dialog action bar. No custom z-index CSS
or temporary ActionBar unmount is used. Verify the Positioner shares Overlay’s
`--atom-overlay-layer` and its computed z-index is one higher.
