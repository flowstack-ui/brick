# ActionBar manual protocol

| Environment | Recorded value |
| --- | --- |
| Browser and version | Not recorded |
| Operating system | Not recorded |
| Viewport and zoom | Not recorded |
| Assistive technology | Not recorded |
| Playground route | `/action-bar` |

Use `pass`, `fail`, `blocked`, or `not applicable` for each performed check.
Leave checks unperformed until a person actually completes them.

## Completion

Overall result: unperformed.

Follow-up issues: record findings from the manual run here.

Workbook updated: no manual results recorded.

Status: unperformed. Automated checks do not mark these verified.

Scenario order:

1. `action-bar.basic`
2. `action-bar.close`
3. `action-bar.placement`
4. `action-bar.dialog`
5. `action-bar.nested`
6. `action-bar.controller`
7. `action-bar.outside`
8. `action-bar.focus`
9. `action-bar.retained`
10. `action-bar.inline`
11. `action-bar.localized`
12. `action-bar.states`
13. `action-bar.rtl`
14. `action-bar.modal`

## Accessibility

Verify keyboard naming and focus with assistive technology; automated axe is
supporting evidence, not screen-reader verification.

1. Open each of fourteen route scenarios at normal and narrow widths.
2. Compare the four Chakra examples at matched font, theme and viewport.
3. Verify light/dark surface, shadow, inset separator and centered action loaders.
4. With keyboard and screen reader, confirm naming, reachability, Escape and
   focus return from nested dialogs. No default autofocus or nonmodal trap.
5. Test real 200%/400% zoom, touch safe areas, virtual keyboard and long labels.
6. Verify RTL logical placement and reduced-motion/forced-colors appearance.
7. Test modal bar inside an existing Dialog and custom portal appearance scope.

Record environment, outcome and remaining defects for each step before approval.
