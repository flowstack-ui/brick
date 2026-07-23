# Manual Testing

Manual review covers judgments automation cannot honestly make. It is not a
second browser-test suite.

## Protocol rules

- One public component owns
  `playground/manual-tests/<component>.md`.
- Draft the protocol from the component contract before running it.
- Give every step a setup, action, expected result, result, and notes field.
- Use only `pass`, `fail`, `blocked`, or `not applicable`.
- Never pre-mark a result. Record reviewer, date, commit/version, route,
  browser, operating system, device, and assistive technology used.
- A failure or blocker names a follow-up. After a fix, rerun affected steps and
  record the new result without erasing useful failure history.
- Physical-device or assistive-technology claims remain blocked until that
  environment is actually used.

Required judgment areas depend on risk: visual hierarchy and finish, touch
quality, keyboard flow, focus visibility, appearance and preference modes,
zoom/reflow, localization/RTL, content stress, and screen-reader output.

When the run is complete, update the exact workbook rows and confirm the
component's Index status. Start from
[`../../playground/manual-tests/_template.md`](../../playground/manual-tests/_template.md).
