# NativeSelect manual protocol

## Disabled appearance regression

Compare individual and Fieldset-inherited disabled states in light/dark and
forced colors. Preserve variant paint, fade each visual boundary once, and
check the cursor over labels, editors, indicators and nested actions. Read-only
remains separate. Record physical-device and assistive checks independently.

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

## Form surface comparison

- Compare outline and surface on light/dark canvas and raised parents: outline stays transparent; surface owns its neutral fill without adding a shadow.
- Hover, focus, disable and mark invalid; preserve visible boundaries and explicit state treatment. Compare matched size recipes including their outer borders.
- Check narrow/RTL containment and forced colors. Popup panels and selection marks must retain their independent paint.
## Select-family follow-up (not manually executed)

- Compare all seven sizes and variants in light/dark, RTL and narrow views.
- Verify real browser zoom at 200% and 400%, and physical mobile interaction.
- Verify accessible labels, value announcements, disabled options,
  required validation and reset with a real screen reader.
- Check the OS-owned native picker and multiple/rows presentation.
- Confirm code examples and per-part Props headings match the public API.

These are unperformed human checks; automated results do not fill them.
