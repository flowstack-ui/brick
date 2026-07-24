# Changelog

All notable public changes to `@flowstack-ui/brick` are recorded here.

## Unreleased

### Added

- Package root and component subpath exports, static `styles.css`, public
  `tokens.css`, and optional `reset.css` entrypoints.
- `Button` with four variants, six semantic tones, five sizes, three shapes,
  loading presentation, icons, full-width layout, native actions and links,
  form behavior, and Atom composition.
- `IconButton` with action and genuine-link paths, four variants, six tones,
  five square sizes, rounded and circle geometry, and loading presentation.
- `Toggle` and `ToggleGroup` with single or multiple pressed state, four visual
  variants, three sizes, rounded and pill geometry, attached or separated
  groups, orientation, wrapping, and full-width layout.
- `Form`, `Field`, and `Fieldset` with native and callback submission,
  generated accessible relationships, inline or native validation, authored
  errors, responsive layout, and composition adapters.
- `Checkbox` and `CheckboxGroup` with three shared sizes, checked and mixed
  artwork, structured item relationships, deterministic Parent aggregation,
  native forms, validation, and Field or Fieldset composition.
- `Input` with three visual recipes, three sizes, three applicable shapes,
  full-width or intrinsic layout, logical adornments, localized clear action,
  native text-like types, Field/Form composition, and public customization
  hooks.
- `Card` with seven compound parts, three neutral surface variants, three
  sizes, controlled semantic containers and headings, and server-safe output.
- `Badge` and `NotificationBadge` with passive inline recipes, deterministic
  count or dot formatting, logical placement, automatic circle-to-pill
  geometry, server-safe composition, and owning-context accessibility.
- `Avatar` with explicit alternative and fallback content, five sizes, circle
  and rounded shapes, and optional visual availability rings.
- `AppBar` with five compound parts, four positions, three surface variants,
  neutral and accent tones, two densities, geometric center alignment, and
  optional border, elevation, and blur.
- `Tooltip` with plain and rich recipes, rounded and pill shapes, optional
  Arrow, hover, focus, keyboard, and touch-hold activation, and
  collision-aware placement.
- `HoverCard` with genuine-link previews, three bounded elevated sizes,
  optional Arrow, hover and focus timing, safe pointer movement, and scoped
  portals.
- `Popover` with click, press, and keyboard activation, modal and non-modal
  focus behavior, three bounded elevated sizes, explicit Close and Arrow,
  nesting, and scoped portals.
- `Dialog` with twelve compound parts, three responsive sizes, bounded Body
  scrolling, configurable dismissal, scoped portals, nesting, and Branch
  composition.
- `AlertDialog` with twelve compound parts, two responsive sizes, required
  alert-message guidance, Cancel-safe initial focus, explicit outcomes, and
  blocked backdrop dismissal.
- `Drawer` with twelve compound parts, four logical-edge placements, four
  mobile-aware sizes, bounded Body scrolling, configurable dismissal, scoped
  portals, nesting, and Branch composition.

### Fixed

- Button full-width and intrinsic sizing now reflows without clipping at
  constrained widths or requiring the optional reset stylesheet.
- Direct Button `href` remains the normal navigation path, while `asChild` is
  reserved for custom permissive adapters.
- Icon Button loading remains centered in right-to-left layouts, and direct SVG
  or image children retain the configured icon size under composition.
- Toggle and Toggle Group selected solid, soft, outline, and ghost recipes
  remain visually distinguishable.
- App Bar tone recipes and geometric center alignment remain consistent across
  solid, surface, and transparent variants.
- Elevated Cards retain visible hierarchy in dark appearance without relying
  on shadow alone.
- Dialog, Alert Dialog, Drawer, Popover, Hover Card, and Tooltip portalled
  content preserves logical text direction.
- Dialog and Drawer modal scroll locking preserves stable page geometry during
  nested cleanup and mobile browser toolbar changes.
- Alert Dialog medium content accommodates ordinary paired decisions, while
  extreme reflow keeps every response reachable.
- Tooltip first-open positioning, content hover persistence, outside-touch
  dismissal, and side-aware Arrow seams now remain stable.
- Hover Card avoids accidental touch activation and exit-motion hit testing
  while preserving safe pointer movement.
- Popover touch or pen scrolling no longer dismisses the surface, constrained
  content remains reachable without clipping its Arrow, and genuine outside
  taps still close it.
- Form-family inline validation inherits correctly, focuses and scrolls to the
  visible invalid control, clears after correction or reset, and retains an
  explicit native-validation option.
- Checkbox and Checkbox Group remain neutral until validation is actionable,
  then expose scoped invalid cues without marking every group option as wrong.
- Checkbox Group size and public Checkbox-token overrides inherit through
  every Item and Parent.
- Field spacing prevents focus outlines from crowding messages, and horizontal
  Fields stack before narrow layouts become cramped.
- Fieldset Legend typography and flow match Field Label while preserving group
  spacing, logical RTL treatment, and Error separation under consumer resets.
