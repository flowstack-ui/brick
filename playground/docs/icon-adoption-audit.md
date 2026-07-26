# Icon playground adoption audit

Status: implemented July 26, 2026.

Use Brick Icon when the playground or Consumer authors an SVG as visual content
and needs shared size, semantic color, accessibility mode, or direction. Keep raw
SVG inside reusable graphic-source functions and inside component-owned anatomy
whose contract already owns its icon slot. Do not wrap raster images, logos,
spinners, illustrations, or exact rendered-output fixtures.

## Adopted

- The global shell wraps its menu and close sources in Icon inside named IconButtons.
- The Icon route owns its full accessibility, recipe, source, composition,
  direction, appearance, customization, and stress evidence.
- Consumer imports the public Icon subpath and composes it in a named control.

## Intentionally retained

- Shared and route-local SVG functions remain graphic sources, not a registry.
- Existing component-owned icon slots retain their sizing and semantics.
- Raw SVG in Icon source demonstrations proves supported consumer input.

Re-audit when a location begins owning icon presentation outside its component contract.
