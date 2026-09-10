# FloatingPanel manual protocol

| Environment | Recorded value |
| --- | --- |
| Browser and version | Not recorded |
| Operating system | Not recorded |
| Viewport and zoom | Not recorded |
| Assistive technology | Not recorded |
| Playground route | `/floating-panel` |

Use `pass`, `fail`, `blocked`, or `not applicable` for each performed check.
Leave checks unperformed until a person actually completes them.

## Completion

Overall result: unperformed.

Follow-up issues: record findings from the manual run here.

Workbook updated: no manual results recorded.

Status: unperformed. Automated checks do not certify manual inspection.

Scenario order:

1. `floating-panel.basic`
2. `floating-panel.controlled-open`
3. `floating-panel.store`
4. `floating-panel.stages`
5. `floating-panel.multiple`
6. `floating-panel.triggerless`
7. `floating-panel.context`
8. `floating-panel.drag`
9. `floating-panel.disabled`
10. `floating-panel.axes`
11. `floating-panel.constraints`
12. `floating-panel.anchor`
13. `floating-panel.boundary`
14. `floating-panel.position`
15. `floating-panel.size`
16. `floating-panel.overflow`
17. `floating-panel.rtl`
18. `floating-panel.modifiers`
19. `floating-panel.keyboard`
20. `floating-panel.focus`
21. `floating-panel.presence`
22. `floating-panel.appearance`
23. `floating-panel.content`
24. `floating-panel.environment`

## Accessibility

1. Inspect all 24 named route scenarios using keyboard and a screen reader.
2. Verify dialog name, description and header action names; no default focus trap.
3. Move and resize without dragging using geometry settings and keyboard arrows.
4. Test eight handles with pointer and physical touch, Shift ratio, Alt center,
   grid snapping, Escape cancellation, loss of capture and window blur.
5. Test controlled rejection/delay, minimized focus recovery and geometry restore.
6. Open several panels plus nested modal, popover and menu; verify visual stacking
   agrees with Escape and focus ownership. Close the topmost layer first.
7. Test 200%/400% real browser zoom, short/narrow viewport, virtual keyboard,
   RTL, reduced motion, forced colors and custom portal environments.
8. Compare compact header, control targets, panel shadow and light/dark surface
   against the adopted reference at matched viewport and typography.

Record platform, assistive technology, scenario, outcome and defects before
marking any associated workbook row verified.
