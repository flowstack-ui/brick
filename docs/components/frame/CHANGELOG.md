# Frame changelog

## Unreleased

- Preserve composed-host sizing for omitted and not-yet-active responsive constraints.
- Reject invalid numeric dimensions and Fragment hosts; preserve callback-ref cleanup.
- Add docs-style examples and correct bounded-scroll composition without example CSS.

Frame follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Added

- Initial responsive logical size-constraint primitive with six focused props,
  semantic hosts, one-child composition, public custom properties, and Agent
  Knowledge guidance.

### Fixed

- Isolated base and responsive variables on every Frame so a nested Frame no
  longer inherits any parent constraint.
