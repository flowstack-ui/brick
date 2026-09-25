# DatePicker changelog


DatePicker follows the package version of `@flowstack-ui/brick`.

## Unreleased

- Preserve the native HiddenInput type alias for React 18 and React 19 consumers.

- Keep nested range controls on one line; compose removable date chips, vertical range presets, inline preset shortcuts, swapped clear/open actions and corner dialog dismissal.
- Forward Root positioning options to the existing Popover owner.

- Give custom popup content the same inset as the calendar without double padding.
- Add focused localized, period-range, preset, header, state and time compositions.

- Reduce trailing action inset while preserving text padding and click targets.

- Default field emphasis to neutral with explicit accent tone; align trailing
  actions and segment typography, and use muted placeholder/literal colors.

- Add explicit native TextInput, strict paired codecs, all-mode canonical forms,
  external controllers, RootProvider, presentation PropsProvider, IndicatorGroup
  and composed preset/clear actions while retaining segmented Input semantics.
- Add seven responsive field recipes and independent Calendar selection tones.
- Preserve Calendar navigation across popup mounts and focus the selected day or
  active month/year period when opening.

- Add surface as a neutral filled-and-bordered alternative with unchanged geometry; preserve outline defaults.
- Keep outline transparent at rest and on hover, independently of popup paint.

- Add shared token-only radius selection to the boundary parts documented in the Radius guide; preserve omitted defaults and independent internal geometry.

### Fixed

- Nested calendars render above dialog content and accept pointer selection.
- Custom `asChild`/`render` triggers retain the supplied control's geometry.

### Added

- Segmented entry and calendar selection with one coordinated popup. Uses typed date values, semantic Theme recipes and Atom-owned interaction.
