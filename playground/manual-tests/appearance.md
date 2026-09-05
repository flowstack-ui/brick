# Appearance manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Appearance |
| Version or commit | |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/appearance` |

Scenario order: `01 Overview`, `02 Nested re-entry`, `03 Wrapper-free composition`, `04 Explicit portal scope`, `05 Controls, focus, and reflow`, `06 Compiled theme and nested appearances`, `07 Compiled component inputs and portals`.

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Nested re-entry

Inspect light -> dark -> light and dark -> light -> dark. Expected: every
surface, text, border, action, focus ring, and native control returns to the
requested appearance without child-specific recoloring. Drag-select text in
each scope and confirm the opaque selection pair changes with appearance and
remains readable over neutral and accent paint. Result:

## Step 2 — Wrapper-free composition

Inspect the composed App Bar, Surface, and Tabs hosts. Expected: each public
host retains its element, slot, classes, semantics, and ref with no extra DOM
wrapper. Result:

## Step 3 — Portal scope

Open the explicit Drawer example and inspect focus, backdrop, Content, and
Close. Expected: portalled roots use the requested appearance while Atom focus,
dismissal, scroll lock, and return behavior remain unchanged. Result:

## Step 4 — stress and accessibility

Review at narrow width, 200% and 400% zoom, RTL, forced colors, reduced motion,
keyboard-only, and the recorded assistive technology. Expected: scopes do not
change semantics, focus order, containment, or readable contrast. Result:

## Step 5 — compiled Theme qualification

Inspect scenarios 06 and 07, then choose `Qualification` in the global Theme
control and visit several component routes. Expected: teal replaces Brick's
purple accent everywhere, orange focus remains visible, light-dark-light
re-entry is complete, the native input follows its explicit color scheme, and
the Theme choice survives catalog navigation and reload. Result:

## Step 6 — Theme portal and component inputs

Open both themed Drawers in scenario 07. Expected: the container portal is
dark teal, the body-level portal is explicitly light, both use the generated
1.5rem Drawer radius, retain normal focus/dismissal behavior, and do not
require a Theme runtime or a Brick dependency on Theme. Result:

## Completion

Overall result:

Follow-up issues:

Workbook updated:
