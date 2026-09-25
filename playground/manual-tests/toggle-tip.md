# ToggleTip manual protocol

Status: Not performed.

| Environment | Value |
| --- | --- |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Assistive technology | |
| Playground route | `/toggle-tip` |

Use `pass`, `fail`, `blocked`, or `not applicable` for each step.

Scenario order: Basic; Info; Sizes; Arrow; Escape; Outside; Controlled; Placement; Radius; Link; Inline; Lifecycle; Dialog; Store.

Overall result:

## Protocol

1. Verify each size, text inset, arrow seam and radius in light and dark modes.
2. Open by keyboard; verify content name, reading and focus return with a screen reader.
3. Tap an information trigger on physical iOS and Android; dismiss and reopen.
4. Use actual 200%/400% browser zoom; verify long text wraps and actions remain reachable.
5. Verify RTL, nested Dialog, reduced motion and forced colors where available.
6. Check controlled, inline portal, retained content and dismissal examples.

## Completion

Follow-up issues:

Workbook updated:
