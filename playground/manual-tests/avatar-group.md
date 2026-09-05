# AvatarGroup manual-test protocol

| Run information | Value |
| --- | --- |
| Component | AvatarGroup |
| Version or commit | Unreleased |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/avatar-group` |

Scenario order: `01 Overview`, `02 Size and shape`,
`03 Overlap and stacking`, `04 Overflow and total`,
`05 Interactive composition`, `06 Appearance, RTL, and stress`.

Use `pass`, `fail`, `blocked`, or `not applicable` for every result. Never
infer a physical environment from automation.

## Step 1 — Overview, sizes, and shape

Review the overview and every named size from `xs` through `5xl`, then the
rounded specimen.

Expected: Identities read as one compact stack while each silhouette remains
distinguishable. Peers are uniform, every size is intentional, and rounded
geometry preserves softened corners without looking like an attached control.

Result:
Notes or issue:

## Step 2 — Overlap and stacking

Compare none, small, medium, and large overlap, then first-on-top and
last-on-top paint order.

Expected: Overlap changes progressively without obscuring fallback content.
Stacking changes only paint order; source order, alignment, and keyboard order
remain unchanged.

Result:
Notes or issue:

## Step 3 — Overflow and interactive composition

Review `+3`, external-total `+21`, and the custom overflow Button. Keyboard-
focus and activate the Button.

Expected: Overflow aligns with peers, carries its localized name, and remains
legible. The custom Button owns focus and activation, its focus ring is not
clipped, and child Avatars remain passive.

Result:
Notes or issue:

## Step 4 — Themes, RTL, forced colors, and customization

Compare light and dark appearances, the Arabic RTL specimen, a real
forced-color environment, and a local group-outline token override.

Expected: Peer separation remains visible; logical overlap follows RTL without
reversing source names; forced colors uses a system border; token customization
changes only local separation and does not recolor Avatar content.

Result:
Notes or issue:

## Step 5 — Zoom, screen reader, and touch

At 200% text and 400% browser zoom, inspect a 320 CSS pixel viewport. Then use
VoiceOver and one additional available screen reader plus a physical touch
device.

Expected: No component-owned horizontal overflow occurs. Informative names
remain in source order, decorative custom-composition Avatars stay silent,
localized overflow is announced, the neutral root adds no redundant group
announcement, and overlap does not intercept the custom Button's touch target.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

Mark unavailable physical-device or assistive-technology environments
`blocked`.
