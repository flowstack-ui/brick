# Slider manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Slider |
| Version or commit | Unreleased 0.2.3 |
| Reviewer |  |
| Date |  |
| Browser and version |  |
| Operating system |  |
| Viewport and zoom |  |
| Physical device |  |
| Assistive technology |  |
| Playground route | `/slider` |

Scenario order: `01 slider.overview` → `02 slider.values` → `03 slider.recipes` → `04 slider.states` → `05 slider.orientation` → `06 slider.content` → `07 slider.form` → `08 slider.appearance` → `09 slider.stress`.

Use `?qualification=1` for this preserved scenario sequence; review the ordinary documentation examples separately.

Example order: Basic, Sizes, Variants, Tones, Label and value, Range and minimum gap, Collision modes, Origins, Thumb alignment, Controller and provider, Steps and commit, Marks, Vertical and RTL, Dragging output and artwork, States and Field, Native form, React Hook Form, Responsive presentation and frames.

Use `pass`, `fail`, `blocked`, or `not applicable` for every Result. Record an
issue for each failure.

## Steps

1. Use mouse, pen and physical touch for track clicks and drags. Verify pointer coordinates at both endpoints, the nearest range thumb, one-pointer ownership, cross-axis page scrolling, cancellation rollback without commit, lost-capture commit once, and disabled/read-only changes during a drag.
2. Exercise none, push and swap with two and three thumbs, zero and nonzero gaps and both global boundaries. Confirm output order, active/focus identity, per-index names and form fields. Drag back after pushing; pushed neighbors must retain their new positions.
3. Exercise Arrow keys, Shift+Arrow, Page Up/Down and Home/End in horizontal LTR/RTL and vertical layouts. Verify local direction wins in inverse nesting and keyboard focus remains on the active thumb.
4. Compare contain and center alignment at both endpoints. Confirm visible thumbs stay inside Control with contain, expanded 44px targets and focus have unclipped clearance, center overhang is not clipped, resize and hidden reveal recover, and the visible size pairs remain 16/6px, 20/8px and 24/10px. At scalar maximum the fill reaches both rail caps. Right/middle click must not edit; primary track activation must focus the selected thumb. An off-center grab must not jump.
5. Inspect outline, solid and soft with neutral, accent and contrast in light/dark. Check invalid+focus, reduced motion and forced colors. Confirm no position transition, mount flicker, stale DraggingIndicator or duplicate value bubble.
6. Inspect marks with long endpoint labels, external ValueText, persistent ValueLabel, vertical marks, responsive recipes, optional frames and a 320px layout at 200% and 400%. Confirm readable labels without promising automatic bubble collision avoidance.
7. Submit and reset native scalar/range forms, automatic and explicit inputs, disabled omission, an external form, and the Hook Form example. Confirm every thumb submits once in index order and validation focuses/identifies the slider.
8. With assistive technology, confirm every thumb has the intended accessible name, value text, bounds, orientation and state; marker and visible value anatomy stays silent unless explicitly referenced.

## Completion

Overall result:

Follow-up issues:

Workbook updated:

Open manual gates not performed in this record:
