# Brick documentation

This directory is the public documentation authority for
`@flowstack-ui/brick`.

## Start here

- [Installation](guides/installation.md) — package, peer dependency, and CSS
  setup
- [Appearance and tokens](guides/appearance-and-tokens.md) — light, dark,
  system appearance, semantic tokens, and scoped customization
- [Theme contract](guides/theme-contract.md) — generated token classifications,
  approved component inputs, scope attributes, and cascade position
- [Control sizing](guides/control-sizing.md) — shared inline control geometry,
  typography, radius, and editable-field exceptions
- [Browser support](guides/browser-support.md) — pinned target, generated CSS,
  progressive enhancement, and platform evidence
- [Layout spacing values](guides/spacing-values.md) — numeric base-unit
  factors, legacy tokens, explicit CSS values, and responsive mixtures
- [Agent Knowledge](guides/agent-knowledge.md) — public human- and
  machine-readable component selection, composition, and validation guidance
- [Component guides](#component-guides) — public API and usage contracts

## Component guides

### Appearance and layout

- [Appearance](components/appearance/README.md) — explicit light, dark, and
  inherited semantic-token scopes without a provider or required wrapper

### Actions and selection

- [Button](components/button/README.md) — styled actions and button-like
  navigation
- [Icon Button](components/icon-button/README.md) — named compact actions and
  icon-only links
- [Toggle](components/toggle/README.md) — one persistent pressed command
- [Toggle Group](components/toggle-group/README.md) — related single or
  multiple pressed commands
- [Toolbar](components/toolbar/README.md) — related commands with one keyboard
  entry point
- [Pagination](components/pagination/README.md) — generated numbered-page
  navigation for bounded result sets
- [Carousel](components/carousel/README.md) — one-slide sequences with optional
  navigation, picker dots, touch scrolling, and controlled rotation

### Accessibility

- [Skip Link](components/skip-link/README.md) — visible-on-focus bypass
  navigation with a paired primary-content target

### Data display

- [Aspect Ratio](components/aspect-ratio/README.md) — stable layout geometry
  and optional framing for authored content
- [Data Grid](components/data-grid/README.md) — navigable tabular data with
  selection and controlled sortable headers
- [Tree Grid](components/tree-grid/README.md) — navigable hierarchical rows
  with expansion, selection, and independently active cells
- [Tree](components/tree/README.md) — one-dimensional hierarchical selection
  with finished rows, indicators, and optional guides
- [Feed](components/feed/README.md) — dynamic rich article streams with
  article-by-article keyboard navigation
- [Swipeable Item](components/swipeable-item/README.md) — item-level quick
  actions with logical reveal panels and a required visible alternative

### Forms and choices

- [Color Picker](components/color-picker/README.md) — Atom-backed hexadecimal editing, presets, native chooser, floating content, and form submission
- [Form](components/form/README.md) — native submission boundary and form
  rhythm
- [Field](components/field/README.md) — one labeled control and its
  relationships
- [Fieldset](components/fieldset/README.md) — native related-control grouping
- [Input](components/input/README.md) — finished native single-line text entry
- [Number Input](components/number-input/README.md) — numeric entry with bounded stepping
- [OTP Field](components/otp-field/README.md) — segmented one-time-code entry
- [Password Toggle Field](components/password-toggle-field/README.md) — password entry with visibility control
- [Textarea](components/textarea/README.md) — finished native multi-line text
- [Radio Group](components/radio-group/README.md) — finished visible single-selection choices
- [Segment Group](components/segment-group/README.md) — compact one-of-many modes with a moving indicator
- [Switch](components/switch/README.md) — immediate binary settings
  entry with manual or bounded automatic sizing and optional character count
- [Select](components/select/README.md) — finished single-value select-only choice
- [Combobox](components/combobox/README.md) — searchable single-value choice with optional free text
- [Multi Select](components/multi-select/README.md) — finished multiple-value
  choice control with repeated-value native form participation
- [File Upload](components/file-upload/README.md) — file picker and drop target
  with validation and removable selected-file items
- [Checkbox](components/checkbox/README.md) — independent checked or mixed
  selection
- [Checkbox Group](components/checkbox-group/README.md) — related selections
  and aggregate parent control

### Content and status

- [Text](components/text/README.md) — semantic text with independent visual
  typography
- [Em](components/em/README.md) — native stress emphasis that inherits its
  surrounding typography
- [Mark](components/mark/README.md) — static native relevance with restrained,
  theme-aware visual recipes
- [Kbd](components/kbd/README.md) — native keyboard-input notation with compact
  finished variants and sizes
- [Blockquote](components/blockquote/README.md) — extended quotations with
  semantic source and attribution structure
- [Code](components/code/README.md) — short inline technical literals
- [Code Block](components/code-block/README.md) — structured multi-line source,
  overflow, language metadata, and copy feedback
- [Avatar](components/avatar/README.md) — identity image, fallback, and visual
  status
- [Badge](components/badge/README.md) — passive inline labels
- [Status](components/status/README.md) — passive semantic dot and label
- [Color Swatch](components/color-swatch/README.md) — passive solid, alpha-aware, and mixed color preview
- [Chip](components/chip/README.md) — compact authored values with optional
  explicit removal
- [Notification Badge](components/notification-badge/README.md) — attached
  visual count or dot
- [Card](components/card/README.md) — static compound surface for one subject
- [Collapsible](components/collapsible/README.md) — one independent in-flow
  disclosure with finished surfaces and motion
- [Accordion](components/accordion/README.md) — coordinated disclosures with
  single or multiple selection and two-axis layout
- [List](components/list/README.md) — native ordered and unordered content
  collections with optional structured anatomy
- [Data List](components/data-list/README.md) — native term-and-value facts with
  responsive alignment
- [Reorderable List](components/reorderable-list/README.md) — deliberate
  manual ordering with drag, keyboard, touch, and direct movement
- [Table](components/table/README.md) — native static tabular data with
  responsive containment and sorting composition
- [Skeleton](components/skeleton/README.md) — motion-safe loading placeholders
  with content-preserving geometry
- [Progress](components/progress/README.md) — linear determinate,
  indeterminate, and buffered task progress
- [Progress Circle](components/progress-circle/README.md) — compact circular
  determinate and indeterminate task progress
- [Slider](components/slider/README.md) — single-value and range numeric input
- [Rating](components/rating/README.md) — fractional single-slider rating input
  and passive aggregate presentations
- [Toast](components/toast/README.md) — temporary non-blocking application
  outcomes and process updates

### Contextual overlays

- [Tooltip](components/tooltip/README.md) — short supplemental label or
  description
- [Hover Card](components/hover-card/README.md) — nonessential destination
  preview
- [Popover](components/popover/README.md) — click-open interactive panel
- [Dropdown Menu](components/dropdown-menu/README.md) — button-triggered
  commands, choices, and nested actions
- [Context Menu](components/context-menu/README.md) — contextual commands for a
  pointer or touch region
- [Menubar](components/menubar/README.md) — persistent desktop-style command
  categories

### Modal surfaces

- [Dialog](components/dialog/README.md) — modal task surface
- [Alert Dialog](components/alert-dialog/README.md) — urgent decision with
  explicit outcomes
- [Drawer](components/drawer/README.md) — logical-edge modal surface

### Content primitives

- [Visually Hidden](components/visually-hidden/README.md) — behavior-preserving
  assistive text for visually redundant labels and context
- [Icon](components/icon/README.md) — SVG sizing, semantic color, direction,
  and decorative or informative accessibility
- [Image](components/image/README.md) — responsive media, authored fallback,
  fit, focal position, ratio, and finished framing

### Navigation and layout

- [Breadcrumb](components/breadcrumb/README.md) — hierarchical page location
  and ancestor navigation
- [Tabs](components/tabs/README.md) — related peer panels with complete keyboard
  navigation
- [Navigation Menu](components/navigation-menu/README.md) — destination
  navigation with optional rich link panels
- [Bottom Navigation](components/bottom-navigation/README.md) — compact,
  persistent top-level destinations for narrow application layouts
- [Link](components/link/README.md) — inline and standalone native navigation
- [Link Box](components/link-box/README.md) — one native destination expanded
  across a containing region with independent secondary controls
- [Nav List](components/nav-list/README.md) — grouped native destination lists
  with current and collapsible states
- [Sidebar](components/sidebar/README.md) — persistent complementary panel and
  coordinated main-content layout
- [App Bar](components/app-bar/README.md) — top surface and one-row alignment
  structure
- [Stack](components/stack/README.md) — tokenized one-dimensional rows and
  columns
- [Group](components/group/README.md) — compact inline clusters with optional
  attached borders and logical corners
- [ZStack](components/z-stack/README.md) — source-ordered overlapping layers
  and nine-position placement
- [Grid](components/grid/README.md) — tokenized two-dimensional tracks and
  item placement
- [Container](components/container/README.md) — centered content measures and
  logical page gutters
- [Section](components/section/README.md) — responsive page-region rhythm
- [Frame](components/frame/README.md) — responsive logical size constraints
- [Bleed](components/bleed/README.md) — responsive logical negative margins for deliberate edge media
- [Show](components/show/README.md) — CSS-only content shown from a fixed
  viewport breakpoint
- [Hide](components/hide/README.md) — CSS-only content hidden from a fixed
  viewport breakpoint
- [Surface](components/surface/README.md) — semantic background layers,
  boundaries, elevation, radius, and inset
- [Divider](components/divider/README.md) — decorative or semantic structural
  separation
- [Scroll Area](components/scroll-area/README.md) — constrained native
  scrolling, gutter, and visibility

Every released component owns one folder containing its public `README.md` and
`CHANGELOG.md`.
