# Changelog

All notable public changes to `@flowstack-ui/brick` are recorded here.

## Unreleased

### Added

- Added independent `Show` and `Hide` responsive visibility components with fixed CSS breakpoints and always-mounted React content.

- Fixed `Rating` pointer stability across repeated selection, capture loss,
  fractional segments, and continuous cross-item dragging; clearing is now an
  explicit opt-in behavior.

- Fixed `Slider` so capture loss commits the current click or
  drag value while true pointer cancellation remains reversible.

- Fixed Slider marker containment, optional value-label spacing, RTL range
  geometry, and cross-axis pointer behavior.

- Added Atom-backed Slider and Rating components with separate public APIs,
  Field/form integration, directional input, closed visual recipes, and
  accessible single-value, range, and fractional-rating behavior.

- Added `SkipLink` with a visible-on-focus bypass link, paired primary-content
  target, logical viewport placement, and public customization variables.

- Added the nine-part Atom-backed `FileUpload` with picker and dropzone input,
  accepted-file items and removal, native Field/form integration, complete
  visual recipes, responsive RTL, preference support, and public CSS hooks.

- Added the Atom-backed `NumberInput`, `OTPField`, and `PasswordToggleField`
  family with independent compound anatomy, complete visual recipes, natural
  Field/Fieldset/Form composition, localization, responsive RTL, preference
  modes, and public customization hooks.

- Added `Chip` with compound value-token anatomy, optional explicitly named
  removal, two variants and tones, three sizes, two shapes, authored leading
  content, responsive containment, and public CSS customization hooks.

- Added `AspectRatio` with numeric layout geometry, restrained framing recipes,
  native composition, and public CSS customization hooks.

- Added the twelve-part Atom-backed `Tree Grid` family with hierarchy,
  cell navigation, expansion and selection, controlled sortable headers,
  responsive containment, logical RTL, and complete visual recipes.

- Added the Atom-backed six-part `Tree` family with vertical hierarchy,
  selection and expansion paint, three variants, two sizes, optional guides,
  logical RTL, and accessible preference handling.

- Added the Atom-backed `Data Grid` family for navigable tabular data, row
  selection, controlled sortable-header activation, and responsive containment.

- Added `Pagination` with an Atom-generated numbered range, localized labels,
  explicit seven-part composition, three variants and sizes, logical controls,
  and no-wrap inline overflow.

- Added `Toolbar` with compound commands, links, separators, toggle groups,
  three surfaces and sizes, orientation-aware navigation, and no-wrap overflow.

- Added `Table` with native compound semantics, static visual recipes,
  logical/numeric alignment, explicit responsive containment, sticky headers,
  and application-controlled sorting composition.

- Added `Toast` with an imperative helper, public compound parts, six semantic types and logical positions, responsive/full widths, separated/overlap stacking, optional swipe, and complete accessible interaction.

- Added `Accordion` with single and multiple selection, two-axis layout and
  motion, locked-open semantics, optional landmarks, direction-aware keyboard
  navigation, responsive overflow, and public customization hooks.
- Added horizontal measured-width behavior to `Collapsible` and pinned Atom
  0.14.0 for the shared disclosure orientation contract.

- Added `Collapsible` with Atom-backed disclosure semantics, five-part anatomy,
  three neutral surfaces, three coordinated sizes, live measured-height motion,
  and RTL/reduced-motion treatment.

- `RadioGroup` with Atom-backed single-selection, read-only, form, validation,
  orientation, RTL, three sizes, and a complete circular visual.

### Fixed

- Rounded Table outline footer paint into its logical bottom corners.

- Corrected Toast short-content alignment, omitted the empty default icon
  gutter, kept close controls inside logical edges, mirrored portalled logical
  positions in RTL, and stabilized non-clipping overlap expansion.

- Removed unsupported `aria-orientation` from `Progress`; visual orientation
  remains available through `data-orientation` without invalid progressbar ARIA.

- Kept each Bottom Navigation size at a stable base height across responsive
  widths, label policies, and mobile browser-chrome changes; small labels no
  longer clip, and Notification Badge composition remains centered on its
  glyph.

### Added

- Added `Progress` with Atom-backed determinate, indeterminate, buffered,
  horizontal, and vertical linear progress plus complete recipes and value
  composition.
- Added `ProgressCircle` with Atom-backed determinate and indeterminate rings,
  complete sizing, thickness, cap, tone, and value composition.

- Added `BottomNavigation` with Atom-backed destination and controlled-view
  models, complete surface/layout/selection recipes, three accessible label
  policies, safe-area handling, positioning, composition, elevation, and blur.
- Added `VisuallyHidden` as the stable Brick wrapper over Atom's authoritative
  assistive-text behavior.

- Added `DropdownMenu` with a button trigger, three sizes, structured command
  rows, choices, danger emphasis, nested menus, and Atom-owned interaction.
- Added `ContextMenu` with a paintless context region, three popup sizes,
  structured command rows, choices, nested menus, and touch support through
  Atom.
- Added `Menubar` with a persistent command rail, three sizes, adjacent-menu
  keyboard behavior, complete popup anatomy, and composition.
- Added `NavigationMenu` with native destination semantics, three sizes, rich
  measured panels, active indicators, orientation, and RTL behavior.
- Added `Tabs` with Atom-backed five-part semantics, four variants, three
  sizes, fitted and orientation-aware layout, and complete panel behavior.
- Added `Skeleton` with four shapes, pulse/wave/static presentation,
  content-preserving loading, multi-line text, and accessible motion handling.

- Added `Breadcrumb` with Atom-backed seven-part hierarchy semantics, three
  sizes, plain and underline link recipes, custom separators, manual Ellipsis
  composition, responsive wrapping, and stable customization hooks.

- Added `Switch` with Atom-backed binary setting behavior, three sizes,
  canonical track/thumb styling, complete form and Field states, RTL,
  preference modes, composition, and stable CSS hooks.

- `Textarea` with `Root` and `Count` parts, native Atom-backed multi-line value,
  Field, form, validation, reset, character-count, manual resize, and bounded
  auto-resize behavior plus Brick recipes, sizing, geometry, and public tokens.
- `Combobox` with Atom-backed filtering, single selection, optional free text,
  portal positioning, collision handling, and touch-safe dismissal.
- `MultiSelect` with Atom-backed value arrays, persistent multiple selection,
  complete compound anatomy, and repeated-value native form participation.

- `Select` with Atom-backed single-value selection, complete compound anatomy,
  three Input-aligned variants and sizes, three applicable shapes, native form
  participation, groups, scrolling, portal positioning, replaceable artwork,
  and collision-aware Arrow.

- `List` with Atom-backed native ordered and unordered semantics, three surface
  variants, three sizes, two densities, closed marker recipes, seven compound
  parts, nesting, composition, and public customization hooks.

- `Image` for authored responsive media with Atom-backed loaded/fallback state,
  five fit and logical-position recipes, five radii, subtle framing, explicit
  aspect ratio, native image attributes, and public customization hooks.
- `Icon` for consumer-supplied SVGs with decorative and informative modes,
  six closed sizes, semantic currentColor tones, and opt-in RTL mirroring.
- `Sidebar` for Atom-backed expanded, rail, and offcanvas app-shell state with
  docked/floating surfaces, closed widths, static/sticky positioning, and an
  application-owned mobile Drawer boundary.
- `NavList` for native grouped destination lists with three current-state
  recipes, two tones, three sizes, supporting link anatomy, and Atom-backed
  disclosure, current, disabled, and composition behavior.
- `Code` for native inline technical literals with subtle or plain recipes,
  inherited typography, and public customization hooks.
- `CodeBlock` for structured multi-line source with native overflow, explicit
  language metadata, optional header anatomy, and Atom-backed copy feedback.

- Added `Link` for underlined or plain native navigation with focused tones,
  inherited or explicit body typography, optional decorative icons, native
  anchor props, current state, and router composition through Atom Link.

- `ScrollArea` with Atom-backed Root/Viewport anatomy, native axis control,
  stable gutter, auto/always/interaction visibility, and semantic scrollbar
  customization.

- `Divider` with Atom-backed decorative and semantic output, horizontal and
  vertical orientation, solid/dashed/dotted lines, three thicknesses, logical
  inset, horizontal labels, vertical stretch, and public customization hooks.
- `Surface` with four semantic background levels, independent border,
  elevation, radius, and inset recipes, controlled semantic hosts,
  forced-colors boundaries, and public customization variables.
- `Container` with centered fluid content boundaries, five closed maximum
  measures, four logical gutter recipes, semantic hosts, and public geometry
  customization variables.
- `Grid` with exact and intrinsic equal tracks plus optional item spans,
  line placement, full-width placement, and self-alignment.

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
- `Text` with independent semantic hosts, eight visual type recipes, semantic
  foregrounds, logical alignment, wrapping, truncation, clamping, and public
  typography tokens.
- `Stack`, `HStack`, and `VStack` from one implementation with semantic hosts,
  tokenized gaps, alignment, distribution, wrapping, containment, and public
  layout hooks.
- Twenty-five shared semantic typography recipes for authored content,
  component anatomy, field values, and controls, with complete light and dark
  font-family, size, weight, line-height, and letter-spacing tuples.
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

- Component typography now resolves through shared semantic recipes, with
  automated drift verification across light and dark appearances.
- Dialog, Alert Dialog, and Drawer titles now share one overlay-title tracking
  value; Card and Popover title tracking follows their canonical surface and
  compact-title recipes.
- Muted text foregrounds retain readable contrast on supported light and dark
  Brick surfaces.
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
