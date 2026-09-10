# NativeSelect manual protocol

Status: pending. Automated results do not substitute for these checks.

| Environment | Recorded value |
| --- | --- |
| Browser and version | Not performed |
| Operating system | Not performed |
| Viewport and zoom | Not performed |
| Assistive technology | Not performed |
| Playground route | `/native-select` |

Use `pass`, `fail`, `blocked`, or `not applicable` for each recorded check.

Scenario order:

1. native-select.basic
2. native-select.sizes
3. native-select.variants
4. native-select.shapes
5. native-select.controlled
6. native-select.groups
7. native-select.list
8. native-select.states
9. native-select.forms
10. native-select.indicator
11. native-select.responsive
12. native-select.appearance

## Review

- In basic, name and description are announced once. Open the actual OS picker
  on iOS Safari and Android Chrome; choose an option and dismiss without change.
- Keyboard: Tab focus, arrow/typeahead selection, disabled options skipped;
  confirm native single and multiple selection gestures for the target OS.
- Forms: submit, reset, required validation and externally associated selection.
- Inspect all seven sizes against adjacent Input and Button, all variants/shapes,
  light/dark, RTL, narrow width and 200% browser zoom. No clipped indicator.
- Forced colors retains a border, selected text and focus outline. Reduced
  motion removes decorative transitions. No custom portal or scroll required.
- With screen reader, verify optgroup labels, required/invalid states, errors,
  list selection and disabled options. Record platform, browser, AT and result.

## Completion

Overall result: Not performed.
Follow-up issues: Actual OS picker, screen reader, physical device and zoom checks.
Workbook updated: Manual gates remain open.
