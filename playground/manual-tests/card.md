# Card manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Card |
| Version or commit | Unreleased 0.1.0 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/card` |

Scenario order: `01 Overview`, `02 Variants`, `03 Sizes`, `04 Anatomy`,
`05 Semantics`, `06 Composition`, `07 Theme`, `08 Stress`

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Overview, variants, and sizes

Setup: Open `/card` in system appearance.

Action: Inspect `01 Overview`; compare outline, elevated, and subtle in
`02 Variants`, then the complete scale in `03 Sizes`.

Expected: The Card surface is clearly distinguishable from the specimen
background. Variants change prominence only; outline owns a structural border,
while elevated uses a borderless raised panel and layered medium shadow. Sizes change coordinated
padding and title scale without changing content order or semantics.

Result:
Notes or issue:

## Step 2 — Anatomy and semantic elements

Setup: Open `04 Anatomy` and `05 Semantics`.

Action: Compare the optional Header, Media, Content, and Footer arrangements,
then inspect every supported Root and Title element in browser accessibility
tools or the element inspector.

Expected: Only authored parts appear; spacing remains coherent when parts are
omitted. Root and Title use the elements shown by the example, preserve heading
order, and do not make the whole Card interactive.

Result:
Notes or issue:

## Step 3 — Composition and interaction

Setup: Open `06 Composition`.

Action: Tab through Buttons, Icon Buttons, and links using keyboard, then use
pointer and touch where available.

Expected: Only explicit controls receive focus and activate once. Media remains
noninteractive unless authored otherwise. Card supplies layout and surface
only; child controls retain their native names and roles.

Result:
Notes or issue:

## Step 4 — Theme and customization

Setup: Open `07 Theme`; switch system, light, and dark appearance.

Action: Inspect both scoped panels and compare the customization code with its
live Card.

Expected: Card boundaries remain visible against the test background in every
appearance. Customization stays local and preserves anatomy, content contrast,
classes, slots, and child-control focus.

Result:
Notes or issue:

## Step 5 — Reflow, RTL, and preferences

Setup: Open `08 Stress`; test at 390 px, 200%, and 400% zoom and in RTL.

Action: Read long content, operate all child actions, and inspect forced colors
and reduced motion.

Expected: Content and Footer actions wrap without clipping or horizontal page
scrolling, media remains contained, logical order is correct in RTL, static
boundaries and focus remain visible, and Card adds no unnecessary motion.

Result:
Notes or issue:

## Step 6 — Screen reader

Setup: Enable the recorded screen reader.

Action: Navigate Overview, Semantics, and Composition.

Expected: Heading levels and explicit child controls announce correctly. The
Card itself adds no invented landmark, group, or click action.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

Mark unavailable physical or assistive-technology environments `blocked`.
