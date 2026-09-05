# For changelog

For follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Added

- Added a typed, wrapper-free render loop with an explicit empty-state fallback.

### Fixed

- Infer item types from `each` so heterogeneous readonly collection unions do
  not narrow to their first member through the render callback.
