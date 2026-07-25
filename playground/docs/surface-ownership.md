# Playground surface ownership

The complete page-by-page classification and migration order live in the
[Surface adoption audit](surface-adoption-audit.md).

Brick `Surface` owns complete generic painted regions. `Container` continues to
own measure, while `Stack` and `Grid` own arrangement.

## Migrated owners

- `/surface` owns the complete recipe and stress evidence.
- `RenderedOutput` uses Surface for its generic outer boundary and Grid for its
  preview/output arrangement.
- `EvidenceSurface` owns repeated generic overview, specimen, appearance,
  customization, and stress regions across the component routes.
- Layout-only specimen and appearance grids retain arrangement while their
  former paint is neutralized by the shared Surface adoption layer.
- App Bar’s surface-option evidence uses the component being tested; it is not
  replaced by Surface.

## Retained paint

The following paint remains deliberately local:

- migrated specimen cells retain only diagnostic centering, minimum height,
  and component-specific layout;
- appearance scopes retain local token boundaries and positioning required to
  test portals while their generic outer paint belongs to Surface;
- code blocks retain scrolling and code-specific contrast pending a Code Block
  component;
- phone frames retain device simulation geometry;
- overlays, cards, popovers, tooltips, hover cards, dialogs, drawers, inputs,
  toggles, and other component roots retain the paint owned by the component
  under test;
- scenario target indicators and shell chrome remain playground navigation
  state, not reusable content surfaces.

Do not replace these through search-and-replace. Any later migration must
identify a complete generic region, assign Surface only its paint/inset role,
preserve technical layout or overflow on the existing owner, and review the
affected visual baselines.
