# Aspect Ratio manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Aspect Ratio |
| Version or commit | Unreleased 0.1.0 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/aspect-ratio` |

Scenario order: `01 Overview`, `02 Anatomy and semantics`, `03 Ratios`,
`04 Variants`, `05 Radius and overflow`, `06 Content composition`, `07 Native
and composition`, `08 Appearance and customization`, `09 Responsive,
localization, RTL, and preferences`.

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Geometry and framing

Inspect 1:1, 4:3, 16:9, 21:9, and 3:4 at ordinary and constrained widths.
Confirm plain/subtle/outline change paint only, five radii change corners only,
and hidden/visible overflow changes clipping without changing box size. Confirm
rounded outline paint has no sharp escaped edges.

Result:
Notes or issue:

## Step 2 — Content and semantics

With VoiceOver or NVDA, confirm image and iframe names come from their own alt
and title while Root adds no role or announcement. Confirm Skeleton, passive
layout, `asChild`, and `render` retain their own output and Root creates no
extra Content wrapper.

Result:
Notes or issue:

## Step 3 — Keyboard and focus clipping

Tab through the route. Confirm Aspect Ratio Root itself is not focusable and
only authored controls receive focus. Confirm visible-overflow focus remains
fully visible and clipped compositions use an acceptably inset focus ring.

Result:
Notes or issue:

## Step 4 — Appearance and preferences

Inspect light and dark badge scopes, the titled/described/badged accent
customization, forced colors, and reduced motion. Confirm optional frame paint
remains distinguishable, customization matches its code, and no component
animation occurs.

Result:
Notes or issue:

## Step 5 — Reflow, localization, RTL, and touch

At 320 CSS px and 200/400% zoom, confirm all scenarios reflow without page
overflow and ratios remain stable. Confirm Arabic content and RTL preserve the
same direction-neutral geometry. On a physical narrow touch device, confirm
embedded content remains operable and clipping does not hide required targets.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:
