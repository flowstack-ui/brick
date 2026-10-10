# TagsInput changelog


## Unreleased

- Use shared field-value leading for draft, editor and tag labels.

- Add seven responsive field variants, contrast item tone, ItemContext and composed part hosts.
- Fix smallest-size border geometry, underline hover/focus/insets, invalid focus and soft/tone precedence.
- Align labels, draft text and tag geometry; retain 24px removal targets and single-fade disabled paint.
- Remove misleading read-only affordances; truncate long labels without changing their accessible values.
- Forward shared Item props through Items and rebuild focused source-paired examples, retaining qualification scenarios.

Disabled presentation preserves the selected recipe and fades once to 50%, with a not-allowed cursor on the disabled hit target. Keep read-only separate; do not add an opacity wrapper around an already disabled control. Forced colors uses system disabled colors.


TagsInput follows the package version of `@flowstack-ui/brick`.

Public component: `TagsInput`.

- Add surface as a neutral filled-and-bordered alternative with unchanged geometry; preserve outline defaults.
- Keep outline transparent at rest and on hover, independently of popup paint.

- Use canonical focus-width tokens while preserving existing focus ownership and compact placement.

- Add shared token-only radius selection to the boundary parts documented in the Radius guide; preserve omitted defaults and independent internal geometry.

### Added

- Add Atom-backed collection editing, atomic acceptance, native JSON forms and optional shared Combobox suggestions.
- Add seven responsive control sizes, three variants, shapes, semantic item tones and Items shortcut.
