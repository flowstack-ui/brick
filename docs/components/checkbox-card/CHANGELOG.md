# CheckboxCard changelog

CheckboxCard follows the package version of `@flowstack-ui/brick`. Public component: `CheckboxCard`.

## Unreleased

- Resolve label sizes and leading through shared semantic typography while preserving the existing size scale.

Disabled controls preserve their recipe and use one 50% fade with a not-allowed cursor. Forced colors restores full opacity and uses system disabled colors.

### Fixed

- Keep subtle indicators plain before and after selection, including responsive variant changes.
- Apply disabled dimming even when the optional disabled-opacity override is absent.

### Added

- Add compound rich option cards with native checkbox behavior, group/form integration, responsive recipes, optional indicators and addons.
