# Changelog

All notable public changes to `@flowstack-ui/brick` are recorded here.

## Unreleased

### Added

- Added `Bleed`, a responsive logical-edge layout primitive for deliberate
  edge media and cross-plane editorial compositions.

### Changed

- Added paired accent planes to `Surface`, plain editorial containment to
  `LinkBox`, stronger default outline boundaries to `Card`, and documented
  direct edge-media composition for card headers.

### Added

- Added Agent Knowledge for Feed, Skeleton, and Visually Hidden, including
  passive notification-stream, busy-region, and equivalent hidden-text
  boundaries qualified by the Application notification-tray batch.
- Added public `DataList` term/value composition and passive `Status` dot-plus-label presentation.

- Added NavList's transparent current-row `ghost` recipe, aligned
  SectionTrigger start icons, and measured disclosure motion backed by Atom's
  section-content lifecycle.
- Aligned NavList section labels to the destination leading column with the
  active size recipe, removing compact uppercase drift from grouped sidebars.
- Corrected NavList start/end icon first-line centering with broadly supported
  CSS math so icon and label centers no longer drift in ordinary one-line rows.
- Made outline Input use a truly transparent resting and hover surface while
  preserving Soft as the filled input recipe.
- Added `SegmentGroup`, an Atom Radio Group-backed compact one-of-many control
  with three shared sizes and a measured moving indicator.
- Made outline Toggle and ToggleGroup selection use the true accent border while
  keeping primary text neutral, and strengthened Slider marker visibility across
  light and dark appearances.

- Added one shared Stack and Grid spacing grammar: numeric base-unit factors,
  explicit CSS values, responsive mixtures, and backward-compatible legacy
  string tokens.

- Adopted the pinned `baseline 2023 with downstream` browser floor for emitted
  CSS and made target-driven compilation own historical vendor prefixing.

- Added `ReorderableList` for deliberate manual ordering with outline and soft
  recipes, stable item anatomy, pointer, touch, keyboard, cancellation, direct
  movement controls, insertion feedback, and the exact published Atom 0.23.0
  behavior boundary.

- Added native URL-backed Pagination controls through `Root.getPageHref`,
  preserving browser navigation and disabled-boundary semantics without
  changing the existing controlled button mode.
- Added Pagination `boundaryVariant="outline"` so Previous and Next can share
  Brick-owned outlined paint without consumer border overrides.
- Prevented Pagination's inline overflow owner from clipping control focus
  outlines by reserving the full outline width and offset.
- Kept the current Pagination destination on the accent-solid hover and press
  scale instead of replacing it with a neutral control state.

- Expanded Surface `inset` with theme-derived `xl` and `2xl` page-panel
  recipes plus the shared mobile-first responsive value grammar, with updated
  public, machine-readable, browser, visual, and manual evidence.
- Expanded Text with direct Heading, Paragraph, Caption, and Eyebrow semantic
  exports plus an explicit closed visual transform recipe. Named exports reuse
  Text's one-element implementation and keep heading level independent from
  typography variant.

- Added `Group` as a role-free inline layout primitive with horizontal and
  vertical attachment, tokenized spacing, equal growth, logical outside
  corners, shared interior borders, and contained focus/hover stacking.
- Added `LinkBox` for one native destination expanded across a containing
  region, with whole-region hover and focus treatment plus independently
  layered secondary controls.
- Expanded ZStack with closed isolation, named overlay layers, and responsive
  edge spacing for independent actions over expanded destination cards.

- Added Table Agent Knowledge for native comparison semantics, explicit
  overflow containment, responsive relationship preservation, and the strict
  static Table versus Data Grid boundary.
- Added App Bar Toolbar `inset="none"` and a public inline-padding token so a
  bounded Container can own page gutters without double-insetting header
  content.
- Added OTP Field Agent Knowledge for accessible naming, one-value segmented
  entry, paste/autofill preservation, application policy boundaries, and
  deliberate focus and submission.
- Added Select Agent Knowledge for accessible naming, compound option anatomy,
  controlled application effects, and correct selection against adjacent
  choice, filtering, action, and navigation components.
- Added Code Block Agent Knowledge and routed preserved multi-line technical
  source through the package layer-selection guide.
- Added `accent` and `neutral` selected-state tones to Toggle and ToggleGroup,
  and matching variant/tone recipes to Toolbar ToggleGroup without changing
  Atom-owned behavior.
- Advanced the generated theme contract to revision 3 with closed categorical
  component inputs and conditional contrast declarations.
- Added shared floating and modal semantic shadow roles for consistent
  theme-wide overlay elevation.

### Changed

- Made Skeleton default and highlight paint contextual semantic tints so
  placeholders remain visible on dark overlay surfaces.
- Aligned Select and MultiSelect with Button, Toggle, ToggleGroup, and Tabs by
  shared named-size control typography and 36/44/52px geometry, while keeping
  editable Input, Textarea, and Combobox text on the mobile-safe 16px floor.
- Kept selected line-tab labels and icons on primary text so the active edge
  owns accent paint and authored metadata can opt into accent independently.
- Normalized Grid and Stack root margins and semantic `ul`/`ol` padding and
  markers so supported list hosts preserve the same authored alignment as
  their default neutral hosts.
- Clarified Form Agent Knowledge so Fieldset is reserved for meaningful
  labelled subgroups, and Sidebar guidance so bounded long content composes a
  ScrollArea instead of assuming Sidebar.Content owns overflow.
- Expanded the optional neutral reset to remove browser margins from native
  `figure` and `blockquote` elements for higher-level semantic compositions.
- Corrected Link Agent Knowledge to preserve the documented boundary between
  ordinary Link navigation and emphasized Button destinations with a real
  `href`, keep default Link values implicit, and add package-level native
  quotation and attribution guidance.
- Clarified Card Agent Knowledge and public guidance so title-only metadata
  uses Stack composition without unintentionally narrowing Card descriptions.
- Made Link follow an audited project decoration policy by default while
  retaining explicit underlined and plain local variants.
- Made visible Show and Hide hosts layout-transparent by default so responsive
  wrappers preserve parent-owned flex and grid spacing.

### Fixed

- Kept complete Slider Thumb targets and focus treatment inside the component
  boundary at minimum and maximum values, including clipped disclosure
  compositions.
- Removed Card Header's empty trailing-column gap when no `Card.Action` is
  authored, so title-only Stack metadata and full-width descriptions receive
  the complete content measure.
- Moved Code Block's historical WebKit text-size-adjustment declaration to
  target-driven CSS compilation while retaining the standard authored source.
- Preserved Accordion and Collapsible focus rings across ordinary and
  horizontally scrolling compositions, and changed their default disclosure
  Indicators to point down when closed and up when open.
- Kept short Badge labels on one line so compact status and category metadata
  remains atomic in constrained comparisons.
- Preserved visible Table captions outside outline clipping while explicit cell
  radii keep header, body, and footer paint inside softened corners; clarified
  stable Scroll Area boundary ownership for vertically moving tables.
- Preserved ZStack source-order painting when an earlier ratio-based Image or
  another positioned layer precedes a later authored overlay.
- Gave neutral solid Toolbar ToggleItems a component-specific layered surface
  recipe and clarified disabled paint across interactive controls.
- Kept disabled Button labels at full component opacity while relying on the
  semantic disabled foreground; outline and ghost disabled surfaces remain
  transparent.
- Corrected neutral solid recipes across Button, IconButton, Badge, Toggle,
  ToggleGroup, and Toolbar ToggleItems so they use theme-derived neutral
  surfaces rather than appearance-inverting black/white fills.
- Kept Toolbar focus rings fully visible inside horizontal and vertical
  scrolling boundaries, including edge controls and the plain variant.
- Added whole-field Password Toggle Field hover feedback and made the
  keyboard-focused visibility action use the same semantic focus color as its
  field frame.

## 0.1.9 - 2026-08-12

### Fixed

- Limited forced-colors emulation in the generated-theme accessibility
  qualification to Chromium, while retaining dark-appearance, reduced-motion,
  token, visibility, and Axe coverage across Chromium, Firefox, and WebKit.

## 0.1.8 - 2026-08-12

### Fixed

- Made the generated-theme catalog-navigation qualification follow Brick's
  responsive mobile navigation drawer, allowing the release gate to exercise
  the same theme persistence assertion across desktop and mobile browsers.

## 0.1.7 - 2026-08-12

### Added

- Added the generated `flowstack.brick-theme-contract.v1` package artifact,
  including semantic token classifications, audited component theme inputs,
  cascade placement, source-aware token verification, and clean-consumer
  discovery.
- Advanced the generated theme contract to revision 2 and added 76 semantic
  contrast-pair declarations covering maintained
  normal-text, interaction-state, and focus-indicator adjacencies for Theme
  validation.
- Added public Accordion and List Agent Knowledge and guaranteed both artifacts
  remain discoverable in the packed manifest.
- Added `Frame` as the narrow responsive logical size-constraint owner for rails,
  copy regions, media canvases, and bounded ScrollArea compositions.
- Added focused responsive Grid tracks, gaps, spans, and alignment; responsive
  ZStack logical placement; and a Tabs List zero-radius recipe for nested
  selectors without changing source order or Atom behavior.
- Expanded Agent Knowledge with internal-geometry versus parent-participation
  ownership, definite-size prerequisites, and Blueprint/Engine planning fields.
- Added Icon Agent Knowledge for SVG semantics, control naming, currentColor,
  directional RTL, composition, and layout ownership.
- Added the `Section` layout primitive with responsive, themeable page-region
  rhythm and wrapper-free `Surface asChild` composition.
- Added a Carousel Root radius recipe for square edge-to-edge campaign
  Surfaces while preserving the rounded default.

### Changed

- Made Divider safe for Next.js Server Component prerendering by consuming
  Atom's direct server-safe root instead of dereferencing a client namespace.
- Corrected Divider Agent Knowledge to use Brick's direct `Divider` export.
- Updated the exact Atom dependency to `0.22.6`, adopting its server-safe
  Divider boundary and public Accordion/List Agent Knowledge.
- Expanded Stack with canonical responsive values, logical main-axis edge
  spacing, and responsive Stack.Item flex recipes while preserving DOM order.
- Added optional Tabs.Content inset recipes and responsive visual layout recipes
  without changing existing panel defaults or semantic keyboard orientation.

- Made Surface Scrim strength recipes visibly distinct over real media by
  widening both paint intensity and logical gradient reach.

- Expanded Carousel with independently configurable arrow visibility, bare or
  surfaced picker dots, compact per-control sizing, circle or rounded shapes,
  and solid, soft, outline, or ghost control treatments. Interaction-only
  arrows remain keyboard reachable and reveal briefly after touch.

### Added

- Added an optional Card border override so elevated, clipped media Cards can
  remain borderless without application CSS.
- Added `ZStack` for source-ordered, naturally sized overlap compositions with root and per-item nine-position alignment.

- Added the server-safe, wrapper-free `Appearance` utility for explicit light,
  dark, and inherited semantic-token scopes on exactly one existing host,
  including deterministic portal-root composition without a provider.

- Made generated explicit light and dark scopes self-contained by requiring
  matching appearance-dependent semantic contracts and emitting every color
  and shadow assignment without resetting inherited typography or geometry.

- Added an opt-in Carousel parent-fill recipe, including flex-grown parent
  support, plus public navigation and controls inset variables so full-height
  compositions retain component-owned internal geometry without acquiring a
  product-owned viewport policy.
- Expanded interface-composition Agent Knowledge with responsibility-based
  source organization and intent-focused comment rules for complex product
  assemblies.

### Fixed

- Kept solid and soft Tabs edge-trigger focus rings inside their List inset,
  independently controllable Trigger radius, and gave Carousel's clipped
  Viewport an overlay-safe focus indicator above slide media.
- Isolated every Frame constraint variable so nested Frames cannot inherit a
  parent's base or breakpoint geometry.
- Made Image `frame="none"` reserve zero border width so edge-to-edge media no
  longer exposes a transparent one-pixel seam against its parent surface.
- Updated the exact Atom dependency to `0.22.5`, retaining the cross-browser
  rotation-control correction and direction-preserving Carousel loop
  settlement while adopting exact SSR hydration alignment and its
  initialization signal.
- Kept loop navigation moving in the requested direction across the last/first
  boundary without cloning authored slide content, and repaired Carousel's
  radius, shadow, motion, and surface recipes to use generated Brick tokens.

### Added

- Added the Atom-backed `Carousel` component family with optional controls,
  picker dots, touch scrolling, autoplay control, modular CSS, and Agent
  Knowledge.

### Added

- Expanded public Agent Knowledge with Badge guidance and qualified interface
  composition rules for scoped appearance themes, shared shell geometry,
  inherited foregrounds, inline text spacing, decorative annotations, and
  Theme/Block/Blueprint/application ownership.
- Added public App Bar comfortable and compact Toolbar minimum block-size
  recipe tokens for application-owned viewport calculations without
  duplicating Brick's density values.
- Added optional `Surface.Media`, `Surface.Scrim`, and `Surface.Content`
  composition for decorative image, video, canvas, and authored background
  layers with logical contrast gradients and unchanged ordinary Surface output.
- Added direct RSC-safe Image and Surface part exports while retaining the
  existing compound namespaces and callable `Surface` API.
- Added explicit Image parent-fill geometry for media slots and other
  parent-sized regions without inferring ratio or positioning.

## 0.1.5 - 2026-08-07

### Added

- Expanded public Agent Knowledge with source-backed AppBar header/Container
  composition, shared responsive-navigation data, responsive overlay-state
  cleanup, and complete-group Nav List/Divider boundary guidance.
- Added logical `justify="start|center|end|between"` action distribution to
  Drawer, Dialog, and Alert Dialog Footers while retaining `end` as the
  default.
- Added an `xl` Drawer size that may grow to the available viewport for
  content-heavy top/bottom surfaces while still shrinking around short
  content; `full` remains the only always-viewport-sized recipe.
- Added logical Nav List row-padding tokens so surrounding Drawers, Sidebars,
  and application shells can align leading labels and trailing disclosure
  indicators independently without moving either with positional CSS.
- Added an RSC-safe Drawer module namespace on the component subpath,
  preserving `Drawer.Root` composition without promoting a Next.js server page
  to a Client Component.
- Added `Grid.Item asChild` so one existing link, Surface, or component can
  receive Grid placement directly without an extra wrapper or height CSS.

### Fixed

- Made top and bottom Drawer sizes content-responsive maximums instead of
  fixed heights, preserving Body scrolling only after the selected cap is
  reached; full-size Drawers remain viewport-sized.
- Allowed Drawer background to inherit the public
  `--brick-drawer-background` token from a theme ancestor while retaining
  `--brick-color-surface-overlay` as its unchanged default fallback.
- Allowed Drawer radius to inherit the public `--brick-drawer-radius` token
  from a theme ancestor while retaining `--brick-radius-overlay` as its
  unchanged default fallback.
- Kept Navigation Menu panel-link focus visible when a consumer omits the
  documented direct Surface child; composed Surface panels still receive the
  focus ring on their visible boundary.
- Kept wrapper-free Grid Items safe across React Server Component boundaries
  by composing a ref callback only when an actual child or consumer ref exists.

## 0.1.4 - 2026-08-06

### Added

- Added an RSC-safe Navigation Menu module namespace on the component subpath,
  preserving `NavigationMenu.Root` composition without promoting a Next.js
  server page to a Client Component.
- Added package-level layer-selection and interface-composition Agent
  Knowledge that requires Brick-first component selection, records native or
  framework fallbacks, and keeps direct Atom use out of ordinary Brick
  applications.
- Added navigation, responsive visibility, media, typography, application
  shell, and layout guidance for App Bar, Breadcrumb, Bottom Navigation,
  Container, Divider, Drawer, Hide, Icon Button, Image, Navigation Menu, Nav
  List, Pagination, Scroll Area, Show, Sidebar, Skip Link, Tabs, Text, and
  Toolbar.
- Extended the agent manifest with a backward-compatible `guides` collection
  and validated `flowstack.agent-guide.v1` artifacts.

### Changed

- Made the complete and modular core styles apply the active semantic canvas,
  primary foreground, and default body typography to the document through a
  low-specificity foundation rule, so themes no longer repeat those bindings.

### Fixed

- Made plain Button, Icon Button, and Chip safe to render directly from a
  Next.js server page by composing Atom's direct primitive exports instead of
  dereferencing compound namespaces across the React Server Component
  boundary.
- Upgraded the exact Atom dependency to `0.21.0` and aligned Navigation Menu's
  horizontal Viewport with Atom's active-trigger-centered, collision-aware
  geometry. The panel no longer centers on the full navigation row, and its
  Indicator arrow remains aligned in LTR and RTL.

## 0.1.3 - 2026-08-05

### Fixed

- Disabled automatic mobile text inflation on Code Block's scrollable `pre` so
  long and short examples keep the same selected typography size without
  requiring the optional Brick reset.
- Corrected Field's public quick start so required fields render Label's one
  automatic marker instead of duplicating it with a nested RequiredIndicator.

## 0.1.2 - 2026-08-04

### Changed

- Expanded the CI and protected-release browser job boundary so the intentional
  12-shard WebKit qualification can complete instead of being cancelled while
  healthy shards are still passing.

### Fixed

- Made the modular Checkbox Group, Toggle Group, Pagination, and Code Block
  stylesheets self-sufficient by including the shared visual recipes those
  public components render internally. Their appearance no longer depends on
  a previously visited route or an undocumented transitive stylesheet import.

## 0.1.1 - 2026-08-04

### Added

- Added optional `styles/core.css` and `styles/<component>.css` exports for
  route-aware applications with measured all-component CSS cost. The complete
  `styles.css` entrypoint remains unchanged and recommended by default.

### Changed

- Limited Tabs' measured Indicator to the line recipe. Every recipe now keeps
  complete server-stable selected paint through hydration, and non-line
  variants ignore the optional Indicator visually.

## 0.1.0 - 2026-08-02

### Changed

- Refined Navigation Menu with compact disclosure chevrons, a one-pixel current
  underline, and a surface-matched Indicator arrow instead of the previous
  thick open-trigger bar; added the public decorative `IndicatorArrow` part.
  Its Viewport now uses the restrained control radius by default while retaining
  the public radius variable for intentional local customization.

- Upgraded the exact Atom dependency to `0.20.11`; Navigation Menu Viewport now
  exposes Root-relative active-trigger geometry through authored positioning
  wrappers, and moving then clicking between open triggers no longer closes the
  destination through an engine-dependent hover-click race. Modal Dialog, Alert Dialog,
  Drawer, Popover, Dropdown Menu, and Context Menu preserve sticky application
  chrome while background scrolling remains locked, and Select preserves
  logical RTL placement and option direction across its portal. Dropdown Menu,
  Context Menu, and Menubar now also preserve inherited direction through
  portalled menus and keep submenus inside the viewport when neither inline
  side has enough space; their RTL submenu chevrons point toward the logical
  opening direction instead of rotating downward, and popup entry motion
  travels on one axis from the actual collision-resolved side without scaling
  diagonally. Newly positioned parent menus no longer hover-open a submenu
  beneath a stationary mouse pointer.
- Added explicit focused, repository, and release verification tiers; focused
  visual selection; single-build repository orchestration; and progress output
  for clean React consumer checks without changing component runtime behavior.
  Cross-browser Table and Toast evidence now uses keyboard activation for
  focus assertions and each Playwright project's actual viewport bounds. The
  release browser projects now run sequentially with one worker each, WebKit
  profiles restart across bounded shards to avoid long-lived engine
  degradation, and the npm release pipeline verifies package contents, React
  18/19 consumers, and the application Consumer against the exact archive it
  publishes.
- Added repository-owned readiness metadata, strict stale-port diagnostics,
  non-reusing Playwright previews, a conservative Chromium pull-request gate,
  parallel five-profile `main` CI, nightly remote qualification, and
  distributed exact-archive publication gates.

### Added

- Added the Atom-backed `SwipeableItem` three-part reveal layer with plain and
  outline recipes, logical start/end action panels, rounded containment,
  required localized labels, and a documented visible non-drag action path.

- Added the two-part Atom-backed `Feed` for dynamic rich article streams with
  article keyboard navigation, three visual variants, two densities, visible
  focus positioning, responsive RTL, and public customization hooks.

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

- Darkened the danger solid interaction palette in light and dark appearances
  so Button, Icon Button, Badge, and composed destructive actions retain WCAG
  AA contrast through default, hover, and pressed states.

- Kept vertical Navigation Menu Viewports aligned with Atom's measured active
  trigger so the Indicator arrow does not detach on later items.

- Corrected Icon's direct-SVG `asChild` sizing so the composed root keeps the
  selected square size instead of expanding to its surrounding container.

- Updated the exact Atom runtime dependency to `0.20.2` so opening Combobox
  options from its chevron lets mobile browsers reveal the focused input above
  the virtual keyboard.

- Updated the exact Atom runtime dependency to published `0.20.1`, inheriting
  stable Menu sizing variables and corrected modal Popover isolation, and
  pinned the patched Brace Expansion transitive used by development coverage.

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
