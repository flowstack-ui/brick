# Radiomark manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Radiomark |
| Version or commit | Unreleased |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Assistive technology | |
| Playground route | `/radiomark` |

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

Scenario order: 01 radiomark.recipes; 02 radiomark.sizes; 03 radiomark.variants; 04 radiomark.tones; 05 radiomark.controlled.

## Step 1 — Geometry and recipes

Confirm every mark stays circular and selected, unselected, soft, outline, and disabled states remain distinct.

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
  control; custom artwork is also shown. Inspect both light and dark appearance.
- Compare unchecked/checked subtle and soft; outline-filled on the tinted
  surface; invalid paint; disabled cursor and one fade inside semantic parents.
- At 390, 850 and 1100px verify size/variant carry-forward and no overflow.
- Outline has a larger dot; switching away restores the smaller dot. Unchecked replacement artwork stays hidden.
- Run the semantic parent with keyboard and ensure the decorative mark does not
  add a focus stop, role, accessible name or form field. Inspect forced colors.
- Human screen-reader, physical-device and native 200–400% zoom results remain
  open until independently performed; automated captures do not close them.
