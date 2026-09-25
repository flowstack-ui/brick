# Icon manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Icon |
| Version or commit | Unreleased Icon parity, Brick 0.2.3 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/icon` |

Qualification route: `/icon?qualification=1`. The default `/icon` route has focused documentation examples.

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


## Parity additions — not yet manually performed

- Check all focused `/icon` examples and Preview/Code pairs in both appearances.
- With VoiceOver, confirm decorative title-bearing SVGs are skipped, informative
  wrapper/direct/factory graphics announce exactly one name, and named actions
  do not repeat icon labels. Confirm icons never receive keyboard focus.
- At actual browser 200% text and 400% zoom, verify responsive md/inherit restoration,
  provider defaults, small action slot geometry and no horizontal overflow.
- On physical touch devices, check intrinsic action widths, artwork alignment,
  RTL directional versus nondirectional graphics, and authored-transform composition.
- Under real OS forced colors, check currentColor and fixed multicolor artwork;
  adjacent text must preserve meaning when color changes.

Automated browser emulation and screenshots do not mark these manual rows passed.
