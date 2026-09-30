# Changelog

All notable public changes to `@flowstack-ui/brick` are recorded here.

## Unreleased

Planned release: 0.3.0.

### Changed

- Keep collapsed variable-height Toast cards within their fixed viewport anchor.

- Prevent Table body-text fragments leaking above sticky headers at fractional
  HiDPI coordinates without changing layout, sticky offsets or content opacity.

- Make CSS source maps package-relative and deterministically indexed while
  retaining original debug locations. Reject machine-specific source paths in
  package qualification.

- Add independent translucent surface controls to Surface, AppBar and BottomNavigation, preserving legacy blurred usage.
- Introduce constrained theme-contract v2; upgrade to Theme 0.2.0 or a compatible dual-schema compiler before consuming this contract.

- Adopt published Atom 0.27.2 as an exact dependency, replacing the local
  qualification candidate with the registry-backed release and preserving menu
  trigger focus when native closing-content blur moves focus to the document body.

- QR Code adds responsive display sizes, shared defaults, graphic unstyled,
  scoped IDs and host composition. Downloads use finished Button/IconButton
  recipes; composed refs and root-scoped overlay customization are corrected.

- Timeline adds subtle and responsive recipes, compact date columns, shared visual
  defaults and unstyled parts. Inherited marker customization and composed ref
  cleanup are corrected, with refined marker typography and content spacing.

- Carousel adds measured pages, multiple and variable-size slides, vertical layout,
  mouse drag, a shared controller/provider, automatic indicators and progress.
  Controls use shared action recipes. Loop transport, reduced motion, visible-peer
  access, narrow layout and inherited customization are corrected.

- Feed adds responsive recipes, styling defaults, named parts and source-paired
  documentation. Inherited customization tokens and hidden-item dividers now work.

- Data List adds responsive compact recipes, subtle/bold emphasis and shared defaults;
  fixes reverse orientation, long-content containment and grouped term/value layout.

- Tree adds controllers, independent disclosure/checking, lazy loading and interactive
  rows. Tree Grid adds interactive cells, disclosure and column resizing. Both
  support responsive recipes, logical depth and focused integration examples.

- Table and Data Grid share responsive row geometry and recipes. Data Grid adds
  interactive-cell focus, page/range selection, row headers, logical sticky cells,
  keyboard/pointer column resizing, and optional engine/virtualization examples.

- PinInput adds seven responsive field variants, neutral/accent tones, coherent
  invalid and underline focus, and focused form-integration documentation.

- Stat adds responsive sizing, group semantics, Atom-backed projection and
  focused docs examples. Corrected progress composition and custom-indicator
  paint; aligned numeral styling and comparison spacing.

- Chip adds subtle and contrast, sparse responsive size/variant/density,
  Atom-backed static-part projection and unstyled delegation. Correct palette
  borders, close foregrounds, compact geometry and unavailable-action fading
  while preserving defaults. Add 18 focused source-paired examples and expanded
  regression coverage.

- Accordion adds controller/provider composition, context readers, configurable
  IDs, safe retained/Activity lifecycle, responsive recipes, subtle and enclosed
  variants, and unstyled trigger composition. Collapsible adds responsive recipes
  and an older-React Activity fallback. Disclosure motion, nested indicators,
  disabled styling and feature-focused examples are aligned.

- Checkmark supports responsive variants; Checkmark and Radiomark add passive invalid styling and documented palette hooks. Their recipes align subtle, inverted, large artwork and outlined-dot treatments, with a disabled cursor.

- Calendar gains focused selection, constraints, week-number and booking examples;
  Calendar, Date Input and Date Picker are grouped under Date and Time.
  Root and date/navigation triggers inherit Atom's safe `asChild` composition.
- Calendar today markers are underlined; disabled calendars use one fade and a
  disabled cursor. Header controls, weekdays, hover and row spacing are refined.

- Radio Group adds responsive selection recipes, native open item composition,
  controller/provider, contexts and source-paired form examples. Default md now
  uses a 20px solid mark; outline is the nearest earlier visual treatment.

- Swipeable Item adds controller composition, Radius and action spacing, explicit per-side full swipe, dismissal options, interruptible theme-driven motion and source-paired documentation examples.
- Textarea now provides all seven responsive field variants, rebuilt documentation examples including optional React Hook Form integration, and focused browser qualification for real manual and bounded automatic resizing.
- Image supports responsive fit, CSS focal position and numeric ratio, plus Root srcSet metadata for server-rendered source state.

- Textarea preserves complete-boundary manual resize, uses bottom-only underline focus with zero horizontal inset, and aligns hover, focus, invalid, disabled, and read-only precedence with Input, Select, and NumberInput.
- Image logical focal presets honor root-local direction and nested opposite-direction scopes.

- Add responsive Icon sizes, createIcon and IconPropsProvider with explicit precedence.
- Icon preserves composed handlers and React 18/19 refs through Atom composeHost; enforce direct SVG naming and nonfocusability.
- Normalize wrapped artwork in Button, Toggle and Input slots; document and qualify the new surfaces.

- Expand Switch with Atom-owned compound forms and controller composition,
  responsive size/variant recipes, semantic tones and state-aware indicators.
  Preserve standalone Root while fixing checked interaction colors, effective
  RTL travel, raised rail/thumb separation and read-only clarity.

- Complete PasswordToggleField parity with seven responsive field recipes,
  independent Input/Toggle focus presentation, LocaleProvider-backed action
  labels, source-paired public examples, and privacy-safe form and
  strength-integration guidance while retaining Atom-owned behavior.

- `InputAddon` provides external noninteractive segments with responsive field recipes and control sizes.

- `Input`, `Select`, `NativeSelect`, `NumberInput` and `PasswordToggleField` share seven responsive field recipes with bottom-only underline focus and consistent invalid feedback.
- `Input` supports intrinsic text adornments and attached Group boundaries; optional form, mask and payment formatting integrations remain application-owned.

- Refine SkipLink focus-reveal styling and change its default Target to div; use an explicit main with asChild/render to retain a landmark. Preserve native modified activation and document-local focus destinations.

- Add `CheckboxCard` for rich independent form choices, with compound anatomy, group integration and responsive recipes.

- Keep floating BottomNavigation bars centered in RTL as well as LTR.

- Coordinate Checkbox, CheckboxGroup and Checkmark selection recipes with
  responsive sizes, tones and radius. Add Checkbox controller/provider and
  indicator composition, group selection limits and linked-label item bindings.

- Expand Toolbar with Group/Input, root disabled, discoverable disabled actions, responsive seven-size recipes and shared Button/Toggle presentation. Outline is transparent; surface retains a filled border. Replace legacy toolbar-item variables with shared control props.

- Expand BottomNavigation with responsive sizing/arrangement, radius, named
  elevation and independent selected paint. Outline is now transparent; use
  surface for the previous opaque treatment. Preserve native names and composed
  button/link behavior, including current-document selection semantics.

- Expand Toast with isolated managers, lifecycle controls and tracked promises.
  Add independent surface/solid presentation, tones, shared radius and responsive
  logical spacing; refine compact anatomy and measured stack geometry.

- Add responsive NotificationBadge sizes and corner placement, logical offsets,
  optional borders and localized counts. Preserve IconButton artwork sizing
  for both direct icons and nested notification badges.

- Expand Progress with responsive variants, inline layout, stripes, controller
  composition and raw-value formatting. Refine ProgressCircle size/stroke
  geometry, centered typography, indeterminate motion and responsive composition.

- Add responsive Spinner sizes and custom artwork projection; refine RTL arc paint.

- Fix Skeleton loading paint and geometry; add host composition, radius,
  equal sizing, line controls and refined motion.

- Polish Alert typography and indicator geometry; add responsive recipes, radius and focused content customization.

- Correct EmptyState spacing and title rhythm; support responsive density and alignment.

- Breadcrumb adds a styled Trigger, responsive sizes/variants and semantic tones.
- Ship icon gaps, directional separators, linked-current focus and token overrides.
- Change default geometry and plain decoration; subtle preserves the old interaction underline.
- Add real menu/router/closed-wrapper examples and preserve native landmark labels.

- Expand Pagination with count/page-size state, controller/provider access,
  first/last controls, custom hosts, summaries and shared Button presentation.
  Container variants migrate to Surface composition.

- Clean up Avatar separation edges with an in-box border and omit peer
  separation when AvatarGroup renders a single item, including overflow-only output.

- Polish SegmentGroup, add neutral/accent/contrast tones and Items; fix named
  form separators and initial selection paint using Atom-owned indicator geometry.

- Add NavList plain styling, shared radius, meaningful trailing content and
  replaceable disclosure artwork; correct retained-content hiding and focus clipping.

- Unify overlay arrow artwork, theme paint and the shared arrow-size seed across
  menus, popovers, hover cards, tooltips and selects; preserve owner APIs.

- Enlarge menu arrows to rotated-square proportions and paint only their exposed
  edges, masking the popup border at the join. Preserve custom arrow children.

- Keep action-menu arrows above the popup shadow so their theme-colored paint
  remains visible at the popup boundary.

- Appearance establishes inherited native foreground in explicit light/dark scopes without adding background paint, and preserves callback-ref cleanup through Atom composition.

- Prevent Sidebar reopening height flicker and preserve composed action styling
  on its triggers.

- Preserve Section sparse spacing, add transparent Surface paint and shared
  elevation roles, and correct Surface host-ref composition and Scrim direction.
- Correct Sidebar direct-trigger geometry and floating offcanvas gap; add
  independent borders and public state context, preserving region events and refs.

- Expand HoverCard with shared valued triggers, a controller/provider API,
  positioning and presence options, independent inset and radius recipes, and
  refreshed documentation examples. Preserve passive previews and native links.

- Align the shared `2xs` form-control minimum and ColorPicker control recipe to
  24px, matching Button, IconButton and Toggle. Preserve intrinsic growth for
  multiline controls and nested action targets.

- Expand List with inherited typography, semantic marker tones, responsive nested
  indentation and static part composition. Align leading visuals to the first
  line and respect native ordered-list marker types.

- Add Em static asChild composition and explicit data-slot, preserving its legacy
  slot alias and inherited typography.

- Expand Highlight with text/plain variants, semantic tones and the public
  findHighlightSegments utility; align Mark color pairs and fix forced colors.

- Expand Mark with text variant, semantic tones and static asChild composition.
  Fix forced-colors precedence and use semantic neutral surface colors.

- Add Kbd semantic tones and static asChild composition; refine compact sizes,
  raised keycap borders and consistent plain padding.

- Expand Blockquote with semantic tones, subtle/solid rules, static asChild
  composition and a stable SVG quote mark. Refine default typography and spacing.

- Expand Code sizes, semantic tones, surface recipes and static `asChild`
  composition. Add CodeBlock line metadata, compact typography, local color
  schemes and an optional Shiki token adapter without a runtime Shiki dependency.

- Add responsive Link sizes and parent href typing for asChild. Refine LinkBox
  with shared radius selection, inherited title weight and a stable stretched target.

- Expand Prose document styling with responsive sizing, content boundaries,
  reading measure and explicit code/table layout options. Add typography
  decoration, numeric styling, justification and responsive line clamping.

- Expand ColorSwatch sizing and ColorPicker responsive recipes, subtle appearance,
  controller composition, channel helpers, and default editing anatomy.

- Add `ToggleTip` for compact click-open contextual help with shared Popover behavior.

- Add Button subtle/surface/plain variants, loading presentation options and ButtonGroup.
- Support new shared recipes and ButtonGroup defaults in IconButton.

- Add Stack separator composition and the decorative Stack.Separator part.

- Document For under Utilities with executable examples and clarify that the
  wrapper-free renderer requires no stylesheet of its own.

- Add conditional Show with typed values and fallback, and responsive Show/Hide
  projection preserving child layout and refs. Add Utilities documentation pages.

- Prevent duplicate quotation borders and extra content padding when Blockquote
  is composed inside Prose.

- Expand Collapsible with highlight control, unstyled trigger composition,
  controller/provider/context, partial previews, explicit mount policies,
  Activity hiding, exit callbacks, inner inset and optional motion.

- Preserve composed control geometry when Frame dimensions are omitted or
  activate at a later breakpoint. Reject invalid numeric constraints and
  preserve callback-ref cleanup during layout composition.
- Add ZStack Root `asChild`, preserve control minimum sizes, and isolate
  responsive Item spacing without resetting unauthored host margins.

- Expand Grid with native responsive templates, areas, flow, line placement
  and Root composition. Expand Group with responsive layout, wrapping,
  child exclusion, stacking and single-host composition.

- Add `Float` with Root and Anchor for static edge attachment, signed responsive
  offsets, RTL placement and one-host composition.

- Expand Stack flex layout with reverse directions, independent gaps,
  multiline alignment, inline/asChild, and Item longhands/order/logical margins.

- Add Container `asChild` for one-host composition with existing components,
  preserving native defaults and width/gutter recipes.

- Add an optional compound Checkbox API for independently interactive links in
  labels, with existing Atom field/form behavior and unchanged closed Checkbox.

- Preserve text baselines when composing inline Center with Link; retain
  existing middle alignment for inline Square and Circle.

- Refine Bleed documentation with shared preview/source examples, logical-edge
  and responsive demonstrations, props and TOC; correct inset-token examples
  without changing Bleed's runtime API.

- Add independent NavList Root and Section gap props for group spacing without
  changing link density or requiring consumer CSS.

- Add Sidebar region inset and independent NavList row inset/section indent
  controls; preserve Sidebar asChild region content without a duplicate host.

- Add a theme-aware, low-priority focus-visible fallback to the optional reset,
  with system-color fallback and import-order-safe cascade placement. Preserve
  Switch's single track-owned ring.

- Add NavList compact density independently of size, and primary section labels.

- Add `TableOfContents` with native document links, scoped reading-position
  feedback, plain/line recipes and an optional current-location indicator.

- Make AspectRatio outline transparent while retaining its border.

- Add generated standard numeric `aspectRatios` and matching CSS foundation
  tokens. Migrate Image/AspectRatio to shared Radius; use subtle/control/surface
  to preserve former sm/md/lg semantics. Omission retains no rounding.
- Separate AspectRatio documentation from its explicit qualification view;
  document focused composition, inherited defaults and same-host Frame use in
  canonical Agent Knowledge.

- AspectRatio supports CSS-only responsive numeric ratios and fills its immediate
  element child by default. Use `contentLayout="flow"` to retain natural-flow
  child layout.

- Add `focusRing="inside"` to Button and IconButton, inherited by CloseButton
  and forwarded by DownloadTrigger; omitted placement remains outside. Repair
  forced-colors field focus in PasswordToggleField and NumberInput, and use
  contained focus outlines for Tabs and CodeBlock's collapse action. Add a
  source-policy guard with explicit focus ownership for every component.

- Add neutral Tabs tone and flatten soft selection without changing focus
  geometry. Add CodeBlock CopyTrigger asChild for icon-only composition using
  its existing Clipboard behavior.

- Make Link default to `underline`, add interaction-only `subtle`, preserve
  decoration-free `plain`, and deprecate explicit `theme` as a compatibility
  option. Soften theme-adaptive underline paint while retaining high-contrast
  fallbacks, inherited decoration overrides and native anchor behavior.

- Begin token-only radius normalization: export `Radius`, expose core radius
  foundations, and add boundary selection to the owners listed in the Radius
  guide. Preserve omitted defaults, legacy shapes and independent popup radii.
  Repair attached ToggleGroup corners and clamp nested action radii to zero.
  Remaining owner migration and coordinated default changes are not complete.
- Add `QrCode`: scan-safe size recipes, accessible SVG anatomy, logo overlays,
  shared controllers and SVG/PNG/JPEG/WebP download actions powered by Atom.

- Add `TagsInput` with Atom-owned transactions, optional suggestions, native JSON forms and responsive control recipes.

- Replace `OTPField` with `PinInput` (no alias), array values, opt-in OTP,
  controller parts and full-code validity. Keep the seven shared form sizes
  and add transparent outline with native password masking delegated to Atom.

- Add `Editable` inline editing with preview/editor geometry, controlled draft
  transactions, cancellation, multiline autoresize and native form integration.

- Add `NativeSelect` with browser-native options and form behavior, seven
  responsive control sizes and the seven shared field recipes.

- Add `Marquee` with Atom-owned motion, safe replicas and Brick-owned track and fade styling.

- Add `Timeline` static chronology with logical content tracks, fixed marker
  sizes, semantic tones and stretching decorative connectors.

- `EmptyState` adds consistent empty-content hierarchy, density and authored action composition.
- `Stat` adds native metric presentation, units, grouped sizes and trend indicators.
- `Chip` adds compact density, xl, semantic surface/solid recipes and independent action/adornment parts while preserving existing defaults.

- `Alert` adds composable persistent feedback with semantic palettes and explicit announcement policy.

- `Spinner` provides a reusable visual loading ring with semantic colors,
  sizes, thickness, customization and reduced-motion support.

- Fixed shared Button/IconButton loading spinner centering when animations
  are disabled, including disabled-loading and RTL presentation.

- Calendar supports seven scalar sizes with density compatibility. Checkmark
  and Radiomark add `filled` and `inverted` visual recipes.

- Nested DatePicker content remains above Dialog content; custom triggers
  preserve their supplied control geometry. DateInput spacing, nested corners
  and fine-pointer type follow control sizing while touch retains a 16px floor.
- Vertical Steps place progress beside content and wrap within narrow hosts.

- `Calendar`, `DateInput` and `DatePicker` provide typed, localized date selection and entry with shared control sizing and one coordinated calendar popup. `date-value` exposes immutable date helpers. `LocaleProvider` adds date-action and endpoint labels.

- `CloseButton` provides a localized standard close action; `DownloadTrigger`
  combines Atom download behavior with Button presentation.

- `Splitter` presents resizable adjacent panels with a theme-aware grip.

- Added `Steps` for ordered workflows with controlled state, validation gates,
  semantic progress markers, localized numbers, and solid/subtle recipes.

- Refined NumberInput's split stepper with proper minus/plus artwork and a
  readable numeric value scale; added Switch `xs`, `solid`, and `raised`
  recipes with polished 2:1 geometry; and updated elevated Card to a
  borderless raised surface with layered medium elevation.

- Expanded the semantic radius ladder through `4xl` while preserving legacy
  aliases, and expanded Text/Heading across the complete 2xs–9xl type scale
  with named body, title, and display recipes. Heading now defaults to the
  explicit 20px `title-md` recipe.
- Normalized Input, Textarea, Select, MultiSelect, Combobox, NumberInput,
  PasswordToggleField, and PinInput on one responsive 2xs–2xl control-size
  contract. Their 44px `lg` recipe is now the shared default and sparse
  breakpoint objects inherit that default below their first override.
- Added Select `variant="ghost"` for a borderless, transparent resting trigger
  with a restrained hover surface and the standard focus-visible ring.
- Added Atom-backed `ColumnGroup` and `Column` parts across Table, DataGrid,
  and TreeGrid so native column sizing hints no longer require block CSS.
- Added transparent/base surface, semantic border tone, independent column
  borders, native table layout, and vertical cell alignment recipes across
  Table, DataGrid, and TreeGrid; DataGrid and TreeGrid also gained striping
  and sticky-header parity, while Tree gained semantic border tones.
- Added Table `Root minInlineSize` and `Row variant="section"` so comparison
  widths and row-group headings no longer require Block selectors.

- Expanded Button and IconButton to the seven-step `2xs`–`2xl` action scale,
  preserved their visible 44px default as `lg`, and added sparse responsive
  size values that inherit the component default without a required `initial`.
- Expanded the shared `ResponsiveValue` contract so every existing responsive
  Brick owner accepts a non-empty sparse breakpoint object while preserving
  CSS-only deterministic rendering.

- Added `LocaleProvider` with locale-derived logical direction and overridable
  Brick-authored accessibility text; added `FormatNumber` and `FormatByte`
  components plus string helpers that inherit its locale.
- Added the wrapper-free `For` collection helper with an explicit fallback.
- Fixed `For` inference for heterogeneous readonly collection unions by making
  `each` authoritative for the callback item type.
- Added passive `Checkmark` and `Radiomark` visuals for compositions whose
  existing parent already owns selection behavior and accessible state.
- Added a 16px `xs` Badge recipe with 10px text for compact percentage and
  metadata labels.
- Added orthogonal Icon `emphasis="text" | "solid"` paint selection and
  expanded the closed Icon scale with inherited, 28px, and 40px recipes.
- Added a closed `inset` recipe to List so ordinary rows can retain the
  existing size-owned inline padding or align flush with sibling content.
- Added a closed `align` recipe to List for start-, center-, or end-aligned
  structured rows without consumer CSS.
- Added `RadioCard` for rich single-choice cards, a reusable Number Input
  `Control` and square `stepper` layout, and supported decorative content in
  Slider thumbs.

- Added `Center`, `Square`, and `Circle` as one responsive layout family for
  explicit two-axis centering and non-shrinking equal geometry.
- Added Badge `variant="surface"` for soft semantic fill with a visible
  tone-specific boundary.
- Added `AvatarGroup` for reusable overlapping identity stacks with explicit,
  accessible overflow composition.
- Added `Dialog.Close placement="corner"` for authored icon-only dismiss
  controls that need the standard logical top-end Content inset.
- Added mobile-first responsive Button sizes so one semantic action can change
  its complete recipe at shared Brick breakpoints.

- Refined Segment Group with component-owned label sizing and inline padding,
  inset item separators, and a borderless selected indicator with a shallow
  appearance-aware elevation shadow.
- Kept semantic Icon palettes independent from paint strength by replacing the
  compound `accent-solid` tone with `tone="accent" emphasis="solid"`.
- Refined Button's `md` and `xl` recipes to use the intended control typography,
  padding, icon geometry, and 44px/64px targets.
- Expanded Text and Heading with a compact 14px `title-2xs` recipe and a
  small 16px `title-xs` recipe.
- Made the optional reset use consistent grayscale font smoothing on macOS
  browsers without changing authored typography values.

- Added a contrast-paired accent-subtle Surface recipe through
  `tone="accent" level="subtle"` for quiet branded and conversion planes.
- Added an opaque, appearance-aware native text-selection background and
  foreground pair to the atomic accent theme contract. Selection now keeps
  predictable contrast over neutral, accent, status, and image-backed content,
  while forced-colors mode retains system Highlight colors.

- Preserved opaque render-function descendants such as `For` while Select and
  MultiSelect derive static option labels, so closing a collection popup no
  longer replaces the helper's required child callback.
- Kept large Badge labels at the compact 14px scale while preserving the
  recipe's 28px container and padding.
- Kept Color Picker channel thumbs above their tracks at middle and endpoint
  values, and preserved semantic checkerboards beneath translucent current-value
  and preset swatches even when Atom supplies the represented color inline.
- Refined Color Picker area and channel presentation with borderless color
  planes, one inherited semantic radius for tracks and transparency checks, and
  a white thumb ring with the small Theme shadow instead of a hard dark outline.
- Kept Color Picker alpha tracks on a stable white and light-neutral canvas so
  the zero-opacity end does not turn black, while current-value and preset
  swatches retain an appearance-aware checker in dark mode.
- Kept the alpha-channel thumb's color preview opaque at every slider value so
  the zero-opacity endpoint does not split between the checker and its surface.

## 0.2.2 - 2026-08-31

### Added

- Expanded Color Picker to seven closed sizes from `2xs` through `2xl` and
  documented the complete entry-point, format, event, swatch, form, dialog,
  state, and platform composition catalog.
- Added a finished one-border Color Picker control layout plus public outlined
  or frameless square, rounded, and circle swatch recipes.

### Fixed

- Made popup and inline editors use a compact 16rem footprint, removed popup
  chrome from inline content, gave `2xs` and `xs` a denser 15rem popup, aligned the
  format select and channel inputs to one control height, centered area and
  labelled or unlabelled channel thumbs, and kept compact preset rows intentional.
- Made swatch-only triggers square, kept integrated actions locally ghosted,
  placed semantic transparency checks beneath alpha gradients, and made saved
  or predefined palettes opt-in application compositions.

## 0.2.1 - 2026-08-31

### Changed

- Adopted exact Atom 0.26.1 so the Color Picker exposes unsupported
  EyeDropper capability as a disabled, testable platform state.

### Fixed

- Kept the Segment Group indicator aligned with the selected item in RTL.
- Made a bounded Scroll Area create a real shrinking viewport so content
  scrolls instead of escaping a Frame maximum block size.
- Corrected Color Picker popup layering, channel-thumb centering, hidden swatch
  indicators, compact preset layout, and unsupported EyeDropper presentation.

## 0.2.0 - 2026-08-31

### Added

- Added state-specific open and closed labels to Code Block collapse triggers.
- Added closed sharp, rounded, and circle Color Swatch recipes.

### Changed

- Expanded Color Picker on exact Atom 0.26.0 with finished area and channel
  editing, alpha, RGBA/HSLA/HSBA formats, selected preset indicators, complete
  popup anatomy, native chooser, and progressive EyeDropper support.

### Fixed

- Kept physical Sidebar placement stable in RTL layouts.
- Removed Checkbox control transitions when reduced motion is requested.
- Contained long Segment Group labels through the public ItemText recipe.
- Smoothed Code Block collapse motion and prevented partial trailing lines in
  bounded previews.

## 0.1.12 - 2026-08-30

### Added

- Added `Em` for native stress emphasis that inherits surrounding Brick
  typography and foreground.
- Added `Mark` for static native relevance with theme-aware visual recipes.
- Added `Kbd` for native keyboard-input notation with four visual recipes and
  three compact sizes.
- Added `Blockquote` with semantic quotation, source, attribution, cited-work,
  decorative icon, logical alignment, and three finished visual recipes.
- Added `Highlight`, backed by exact Atom 0.25.1 matching, for styled semantic
  plain-text query results without duplicated segmentation behavior.
- Added `Prose` for trusted React editorial content with descendant typography,
  coherent rhythm, closed sizes, and readable measures without parsing or raw
  HTML injection.
- Extended `CodeBlock` with trusted synchronous adapters, authored line
  metadata, bounded line presentation, and an accessible expansion path
  composed from Brick Collapsible.

## 0.1.11 - 2026-08-28

### Fixed

- Corrected Link Box release evidence on short mobile viewports by bringing the
  full-card target into view, proving the sampled point is inside the visual
  viewport, retaining exact Link ownership, and activating that point to verify
  native navigation.

## 0.1.10 - 2026-08-28

### Added

- Added `ColorPicker`, a finished Atom 0.24.0-backed opaque hexadecimal control with editable and native inputs, named presets, optional floating content, form submission, three sizes, and outline/soft variants.
- Added `ColorSwatch` with Root and Mix parts for passive solid, alpha-aware, and mixed color previews.
- Added a versioned, export-led Agent Knowledge catalog and generated coverage
  report with public-surface reconciliation, explicit helper classifications,
  structured package-guide destinations, and packed-consumer verification.

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
- Add `ActionBar` for detached contextual actions with Atom-owned focus and dismissal.
- Add `FloatingPanel` for movable and resizable nonmodal tool windows and `OverlayManager` for CSS-free imperative overlay hosting.
