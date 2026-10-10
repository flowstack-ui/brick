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

Use `/aspect-ratio?qualification=1` for the exhaustive evidence scenarios below;
the ordinary route contains the documentation examples.

Scenario order: `01 Overview`, `02 Anatomy and semantics`, `03 Ratios`,
`04 Variants`, `05 Radius and overflow`, `06 Content composition`, `07 Native
and composition`, `08 Appearance and customization`, `09 Responsive,
localization, RTL, and preferences`.

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Geometry and framing

On `/aspect-ratio#props`, also check the Prop/Default/Type table in light and
dark appearance. Confirm the five component props and supported asChild/render
composition options, top-aligned cells and unclipped header corners. At 320px,
focus the labelled scroll region and scroll horizontally to read the full Type
column without causing document-wide horizontal scrolling.

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

## Step 6 — Documentation and responsive media

Follow Usage and example heading anchors. Check both Usage copy actions and
each Image, Video, Google Map, and Responsive Preview/Code pair. Verify video
and map loading and keyboard controls on a real network; automated suites use
intercepted embed fixtures and do not prove third-party availability.
Resize through 30rem, 48rem, 64rem, and 80rem. Confirm sparse defaults, nested
ratio independence, filled media, and the natural-flow opt-out.

Result:
Notes or issue:

## Latest automated pass — 2026-09-09

18 behavior executions passed across Chromium, Firefox, and WebKit, including
geometry and axe checks. Manual screen-reader, physical-device, actual browser
zoom, and live external-player checks are not claimed by that result.

## Completion record

Overall result:
Follow-up issues:
Workbook updated:
