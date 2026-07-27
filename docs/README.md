# Brick documentation

This directory is the public documentation authority for
`@flowstack-ui/brick`.

## Start here

- [Installation](guides/installation.md) — package, peer dependency, and CSS
  setup
- [Appearance and tokens](guides/appearance-and-tokens.md) — light, dark,
  system appearance, semantic tokens, and scoped customization
- [Component guides](#component-guides) — public API and usage contracts
- [Contributing](contributing/README.md) — component work and evidence routing

## Component guides

### Actions and selection

- [Button](components/button/README.md) — styled actions and button-like
  navigation
- [Icon Button](components/icon-button/README.md) — named compact actions and
  icon-only links
- [Toggle](components/toggle/README.md) — one persistent pressed command
- [Toggle Group](components/toggle-group/README.md) — related single or
  multiple pressed commands

### Forms and choices

- [Form](components/form/README.md) — native submission boundary and form
  rhythm
- [Field](components/field/README.md) — one labeled control and its
  relationships
- [Fieldset](components/fieldset/README.md) — native related-control grouping
- [Input](components/input/README.md) — finished native single-line text entry
- [Textarea](components/textarea/README.md) — finished native multi-line text
- [Radio Group](components/radio-group/README.md) — finished visible single-selection choices
- [Switch](components/switch/README.md) — immediate binary settings
  entry with manual or bounded automatic sizing and optional character count
- [Select](components/select/README.md) — finished single-value select-only choice
- [Multi Select](components/multi-select/README.md) — finished multiple-value
  choice control with repeated-value native form participation
- [Checkbox](components/checkbox/README.md) — independent checked or mixed
  selection
- [Checkbox Group](components/checkbox-group/README.md) — related selections
  and aggregate parent control

### Content and status

- [Text](components/text/README.md) — semantic text with independent visual
  typography
- [Code](components/code/README.md) — short inline technical literals
- [Code Block](components/code-block/README.md) — structured multi-line source,
  overflow, language metadata, and copy feedback
- [Avatar](components/avatar/README.md) — identity image, fallback, and visual
  status
- [Badge](components/badge/README.md) — passive inline labels
- [Notification Badge](components/notification-badge/README.md) — attached
  visual count or dot
- [Card](components/card/README.md) — static compound surface for one subject
- [Collapsible](components/collapsible/README.md) — one independent in-flow
  disclosure with finished surfaces and motion
- [Accordion](components/accordion/README.md) — coordinated disclosures with
  single or multiple selection and two-axis layout
- [List](components/list/README.md) — native ordered and unordered content
  collections with optional structured anatomy
- [Skeleton](components/skeleton/README.md) — motion-safe loading placeholders
  with content-preserving geometry
- [Progress](components/progress/README.md) — linear determinate,
  indeterminate, and buffered task progress
- [Progress Circle](components/progress-circle/README.md) — compact circular
  determinate and indeterminate task progress

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
- [Nav List](components/nav-list/README.md) — grouped native destination lists
  with current and collapsible states
- [Sidebar](components/sidebar/README.md) — persistent complementary panel and
  coordinated main-content layout
- [App Bar](components/app-bar/README.md) — top surface and one-row alignment
  structure
- [Stack](components/stack/README.md) — tokenized one-dimensional rows and
  columns
- [Grid](components/grid/README.md) — tokenized two-dimensional tracks and
  item placement
- [Container](components/container/README.md) — centered content measures and
  logical page gutters
- [Surface](components/surface/README.md) — semantic background layers,
  boundaries, elevation, radius, and inset
- [Divider](components/divider/README.md) — decorative or semantic structural
  separation
- [Scroll Area](components/scroll-area/README.md) — constrained native
  scrolling, gutter, and visibility

Every released component owns one folder containing its public `README.md` and
`CHANGELOG.md`. Start new documentation from
[`components/_template/`](components/_template/).

## Contributor workflows

| Task | Guide |
| --- | --- |
| Route component work | [Contributing index](contributing/README.md) |
| Build or change a component | [Component workstream](contributing/component-workstream.md) |
| Write or review public docs | [Documentation contract](contributing/documentation.md) |
| Add playground evidence | [Playground evidence](contributing/playground.md) |
| Run human review | [Manual testing](contributing/manual-testing.md) |
| Update the evidence workbook | [Coverage workbook](../playground/docs/coverage-workbook.md) |
| Choose automated tests | [Testing](guides/testing.md) |
| Verify the packed Consumer | [Consumer verification](contributing/consumer-verification.md) |
| Release the package | [Releasing](guides/releasing.md) |
