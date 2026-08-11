# Tabs manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Tabs |
| Version or commit | Unreleased 0.1.0 |
| Reviewer |  |
| Date |  |
| Browser and version |  |
| Operating system |  |
| Viewport and zoom |  |
| Physical device |  |
| Assistive technology |  |
| Playground route | `/tabs` |

Scenario order: `01 Overview`, `02 Variants`, `03 Sizes`, `04 Layout`,
`05 States`, `06 Behavior`, `07 Composition`, `08 Theme`, `09 Stress`.
Use `pass`, `fail`, `blocked`, or `not applicable`; leave results blank until
tested.

## Step 1 — Defaults, variants, sizes

Open `/tabs`; review 01–03. Focus and activate identical tabs in each recipe.
Expected: defaults are medium line; only the named variant or size changes;
selection, panel content, alignment, and focus remain clear. Reload while
watching the variants: line may enhance its already visible selected edge with
the measured Indicator, while solid, soft, and enclosed never reveal an extra
underline or change selected paint during hydration.

## Step 2 — Layout, content, states

Review 04–05. Use arrows in horizontal and vertical lists and try Locked.
Expected: correct arrow axis, equal fitted width, aligned icon/long labels, and
disabled tabs never focus or activate. Focus the first and last Trigger in
solid and soft Lists inside the clipped responsive Card; every side of the
focus ring remains visible. The responsive vertical example uses
two equal visual columns at phone width and one column beside its panel at the
desktop breakpoint while Arrow Up and Arrow Down remain unchanged.

## Step 3 — Activation and composition

Review 06–07 using keyboard. Expected: automatic changes on focus; manual
changes only with Enter/Space; focusable panel is reachable; live HTML matches
roles, IDs, classes, slots, and selected state.

## Step 4 — Theme and stress

Review 08–09 in light/dark, phone width, 200%/400%, RTL, forced colors, and
reduced motion. Expected: customization matches code; tabs scroll without
wrapping; RTL arrows mirror; selected/focus states persist; indicator stops
animating when reduced motion is active.

## Step 5 — Assistive technology

Traverse Overview. Expected: one named tablist, selected/disabled states and
related panels announce once; arrow navigation does not add extra tab stops.

## Completion

Overall result:
Follow-up issues:
Workbook updated:
