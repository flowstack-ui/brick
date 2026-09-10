# Editable manual protocol

Not performed. Automated browser emulation is not physical-device evidence.

| Environment | Recorded value |
| --- | --- |
| Browser and version | Not performed |
| Operating system | Not performed |
| Viewport and zoom | Not performed |
| Assistive technology | Not performed |
| Playground route | `/editable` |

Use `pass`, `fail`, `blocked`, or `not applicable` for each recorded check.

Scenario order:

1. editable.basic
2. editable.activation
3. editable.submission
4. editable.controlled
5. editable.multiline
6. editable.empty
7. editable.forms
8. editable.rejection
9. editable.dialog
10. editable.appearance

## Review

1. Basic: with a screen reader, activate labelled preview, edit, commit and cancel;
   confirm announced value and restored focus without repeated activation.
2. Activation: check focus, click, double-click and explicit controls with keyboard,
   touch and assistive technology; no pointer-only path.
3. Submission: verify Enter/blur/both/none, internal controls and outside targets.
4. Controlled: replace external value, refuse a close, clear via controller.
5. Multiline: real IME composition, Enter newline, modifier commit, resize at 200%
   and 400% actual browser zoom; no clipped text or controls.
6. Empty: cancel an empty/defaultEdit session, separate placeholders and maxLength.
7. Forms: submit/reset, required invalid focus, disabled and readonly semantics.
8. Rejection: correct a rejected draft without losing content.
9. Dialog: Escape cancels editing before dismissing the dialog; outside focus stays
   in the dialog scope and close returns to the launcher.
10. Appearance: all sizes, dark/light, RTL, forced colors and physical mobile targets.

## Completion

Overall result: Not performed.
Follow-up issues: Physical IME, screen reader, touch and zoom checks.
Workbook updated: Manual gates remain open.
