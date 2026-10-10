# Checkbox Group changelog

Checkbox Group follows the package version of `@flowstack-ui/brick`.

## Unreleased

- Resolve label sizes and leading through shared semantic typography while preserving the existing size scale.

- Add inherited selection recipes, responsive sizes, radius, density, logical
  label placement and configurable gap with per-item visual overrides.
- Add controller/provider and item binding helpers, selection limits, eligible
  Parent selection and linked-label compositions with group validation.

### Fixed

- Corrected the select-all example and API guidance: `allValues` belongs on
  `CheckboxGroup.Root`, not `CheckboxGroup.Parent`.

## 0.1.10

### Added

- Expanded public Agent Knowledge for multi-choice selection, item and group
  naming, deterministic Parent state, validation and form behavior, and the
  exact installed Atom CheckboxGroup reference.
- Initial `Root`, `Item`, `ItemLabel`, `ItemDescription`, and `Parent` compound
  API with controlled and uncontrolled selection.
- Plain and structured items, deterministic parent aggregation, vertical and
  horizontal layout, native forms, Fieldset composition, and stable generated
  relationships.

### Fixed

- Item and Parent hover, press, and focus-visible feedback now stays on the
  visual square while each complete label row remains clickable.
- Root size and shared Checkbox token overrides now inherit through every Item
  and Parent.
- Required group validation now remains neutral until interaction, presents
  one group-level inline or native error, focuses and scrolls to the first
  enabled visible Item, and clears after correction or reset.
- Group invalid presentation no longer marks every option as wrong; separately
  invalid Items retain their individual cue.
- Validation-directed scrolling now remains safe during server and non-browser
  rendering.
