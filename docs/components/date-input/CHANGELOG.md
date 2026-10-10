# DateInput changelog


## Unreleased

- Remove Calendar-only API and manual-test claims; clarify segmented single/range entry and pointer-dependent typography.

- Reduce trailing action inset while preserving text padding and click targets.

- Default field emphasis to neutral with explicit accent tone; align trailing
  actions and segment typography, and use muted placeholder/literal colors.

- Add external controllers, RootProvider and presentation PropsProvider.
- Add seven responsive variants, formatter and placeholder controls, explicit
  editing-focus callbacks and composed clear actions.
- Keep read-only/disabled styling scoped to editing groups, not inert literals.

Disabled presentation preserves the selected recipe and fades once to 50%, with a not-allowed cursor on the disabled hit target. Keep read-only separate; do not add an opacity wrapper around an already disabled control. Forced colors uses system disabled colors.


DateInput follows the package version of `@flowstack-ui/brick`.

- Add surface as a neutral filled-and-bordered alternative with unchanged geometry; preserve outline defaults.
- Keep outline transparent at rest and on hover, independently of popup paint.

- Add shared token-only radius selection to the boundary parts documented in the Radius guide; preserve omitted defaults and independent internal geometry.

### Changed

- Separate desktop type sizes while preserving a 16px floor on touch-capable
  devices; add segment spacing, smaller nested rounding and structural borders.

### Added

- Locale-ordered segmented date and date-time entry. Uses typed date values, semantic Theme recipes and Atom-owned interaction.
