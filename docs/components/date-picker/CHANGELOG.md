# DatePicker changelog

DatePicker follows the package version of `@flowstack-ui/brick`.

## Unreleased

- Add shared token-only radius selection to the boundary parts documented in the Radius guide; preserve omitted defaults and independent internal geometry.

### Fixed

- Nested calendars render above dialog content and accept pointer selection.
- Custom `asChild`/`render` triggers retain the supplied control's geometry.

### Added

- Segmented entry and calendar selection with one coordinated popup. Uses typed date values, semantic Theme recipes and Atom-owned interaction.
