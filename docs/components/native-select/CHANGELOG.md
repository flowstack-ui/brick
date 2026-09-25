# NativeSelect changelog


## Unreleased

Disabled presentation preserves the selected recipe and fades once to 50%, with a not-allowed cursor on the disabled hit target. Keep read-only separate; do not add an opacity wrapper around an already disabled control. Forced colors uses system disabled colors.


NativeSelect follows the package version of `@flowstack-ui/brick`.

Public component: `NativeSelect`.

- Added focused documentation examples and per-part API tables.
- Unified sizing with the shared responsive control recipe.
- Added neutral subtle appearance and composed Root support.

- Add surface as a neutral filled-and-bordered alternative with unchanged geometry; preserve outline defaults.
- Keep outline transparent at rest and on hover, independently of popup paint.

- Align the resting outlined control border with Input's strong semantic border token.

- Add shared token-only radius selection to the boundary parts documented in the Radius guide; preserve omitted defaults and independent internal geometry.

### Added

- Add native select Field/Form integration with browser-owned options, groups,
  multiple selection and reset; no custom overlay or hidden duplicate control.
- Add seven responsive control sizes, five variants, shapes, optional indicator
  and list mode, using existing Brick semantic tokens.
