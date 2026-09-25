# Checkmark manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Checkmark |
| Version or commit | Unreleased |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Assistive technology | |
| Playground route | `/checkmark` |

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

Scenario order: 01 checkmark.recipes; 02 checkmark.sizes; 03 checkmark.variants; 04 checkmark.tones; 05 checkmark.controlled.

## Step 1 — Geometry and recipes

Confirm every mark stays square and checked, mixed, unchecked, soft, outline, and disabled states remain distinct.

Result:
Notes or issue:

## Step 2 — Accessibility and appearance

Confirm marks stay passive and hidden from assistive technology, and remain visible in light and dark appearance, forced-colors, mobile width, RTL, 400% zoom, keyboard use, and accessibility review.

Result:
Notes or issue:

## Expanded capabilities

Follow every numbered scenario above, including all labelled specimens.
Compare sizes independently of variants. Exercise any controlled reset, clear,
parent-state change or disabled example and confirm the displayed outcome.
Inspect the complete page in both appearances and at narrow width, not only its
first overview. Record any missing capability or unclear demonstration here.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

## September 18 recipe follow-up

- Public examples: states, sizes, variants, tones, filled, responsive and parent
  control; radius is also shown. Inspect both light and dark appearance.
- Compare unchecked/checked subtle and soft; outline-filled on the tinted
  surface; invalid paint; disabled cursor and one fade inside semantic parents.
- At 390, 850 and 1100px verify size/variant carry-forward and no overflow.
- The 24px boxed check has 2px inset and grows from medium; plain stays unboxed.
- Run the semantic parent with keyboard and ensure the decorative mark does not
  add a focus stop, role, accessible name or form field. Inspect forced colors.
- Human screen-reader, physical-device and native 200–400% zoom results remain
  open until independently performed; automated captures do not close them.
