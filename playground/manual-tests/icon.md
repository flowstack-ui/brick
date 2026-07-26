# Icon manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Icon |
| Version or commit | Unreleased 0.1.0 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/icon` |

Scenario order: `01 Overview`, `02 Accessibility`, `03 Sizes`, `04 Tones`,
`05 SVG sources`, `06 Composition`, `07 Direction`,
`08 Appearance and customization`, `09 Responsive and stress`.

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Defaults, accessibility, sizes, and tones

Review scenarios `01` through `04` top to bottom. Confirm the default is a medium inherited search graphic, decorative output is silent, both informative examples have the displayed name, sizes increase evenly, and tones change color only.

Result:
Notes or issue:

## Step 2 — Sources, composition, and direction

Review `05` through `07`. Confirm all three SVG sources are sharp; multicolor fills stay purple and green; composed SVG output has no extra wrapper; named controls announce their action; and only the arrow mirrors in RTL.

Result:
Notes or issue:

## Step 3 — Appearance, customization, and stress

Review `08` and `09` in light/dark and forced colors, then at 390 px, 200% text, and 400% zoom. Confirm the custom preview matches its code, semantic colors remain readable, icons remain square and contained, and no page-level horizontal scrolling appears.

Result:
Notes or issue:

## Step 4 — Physical mobile and screen reader

Open `/icon` on the recorded device and read the page with the recorded screen reader. Rotate the device and traverse the named images and controls. Decorative icons must stay silent; informative icons and controls must expose exactly one useful name.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:
