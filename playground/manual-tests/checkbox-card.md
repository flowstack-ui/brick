# CheckboxCard manual protocol

Status: not performed. Automated evidence does not complete these checks.

| Run information | Value |
| --- | --- |
| Browser and version | Pending |
| Operating system | Pending |
| Viewport and zoom | Pending |
| Assistive technology | Pending |
| Playground route | `/checkbox-card` |

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

Scenario order: basic → description → group → sizes → variants → states → addon → no-indicator → icon → tones → layout → custom-indicator → responsive → controller → form.

## Protocol

1. With a screen reader, inspect label, description, checked/mixed, disabled and read-only announcements.
2. With keyboard, Tab to each input and Space to toggle; confirm themed visible focus and no second tab target.
3. On a physical touch device, activate label, description and addon once; disabled/read-only never change.
4. At real 200%/400% browser zoom and increased text size, inspect wrapping, focus containment and complete labels.
5. Inspect light/dark, RTL and forced colors for selected state, default/custom/omitted indicators and invalid contrast.
6. Submit and reset a required group and confirm first eligible focus, repeated values and selection limits.

Record environment, date, result and limitations for each numbered check before marking it complete.

## Completion

Overall result:
Follow-up issues:
Workbook updated:
