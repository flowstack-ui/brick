# OverlayManager manual protocol

| Environment | Recorded value |
| --- | --- |
| Browser and version | Not recorded |
| Operating system | Not recorded |
| Viewport and zoom | Not recorded |
| Assistive technology | Not recorded |
| Playground route | `/overlay-manager` |

Use `pass`, `fail`, `blocked`, or `not applicable` for each performed check.
Leave checks unperformed until a person actually completes them.

## Completion

Overall result: unperformed.

Follow-up issues: record findings from the manual run here.

Workbook updated: no manual results recorded.

Status: unperformed. Automated checks do not certify manual inspection.

Scenario order:

1. `overlay-manager.dialog`
2. `overlay-manager.drawer`
3. `overlay-manager.result`
4. `overlay-manager.update`
5. `overlay-manager.exit`
6. `overlay-manager.multiple`
7. `overlay-manager.reopen`
8. `overlay-manager.remove`
9. `overlay-manager.focus`
10. `overlay-manager.form`
11. `overlay-manager.providers`
12. `overlay-manager.hosts`
13. `overlay-manager.panel`
14. `overlay-manager.content`

## Accessibility

1. Inspect all 14 named route scenarios using keyboard and a screen reader.
2. Verify managed Dialog, Drawer and FloatingPanel retain their own semantics,
   naming, focus entry, dismissal and restoration behavior.
3. Accept/cancel, update a draft, duplicate an ID, reopen during exit, remove,
   remove all and dispose a host. Confirm each pending operation settles.
4. Verify modal stacking, transient launcher focus return and form close veto.
5. Test local appearance/locale context, long labels, real 200%/400% zoom,
   physical mobile input, rtl direction, reduced motion and forced colors.

The manager has no independent visual recipe. Record integration defects under
their owning visual primitive; do not invent manager CSS to mask them.
