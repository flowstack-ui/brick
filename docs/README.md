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

### Contextual overlays

- [Tooltip](components/tooltip/README.md) — short supplemental label or
  description
- [Hover Card](components/hover-card/README.md) — nonessential destination
  preview
- [Popover](components/popover/README.md) — click-open interactive panel

### Modal surfaces

- [Dialog](components/dialog/README.md) — modal task surface
- [Alert Dialog](components/alert-dialog/README.md) — urgent decision with
  explicit outcomes
- [Drawer](components/drawer/README.md) — logical-edge modal surface

### Navigation and layout

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
