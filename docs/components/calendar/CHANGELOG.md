# Calendar changelog

Calendar follows the package version of `@flowstack-ui/brick`.

## Unreleased

- Use defined small-control tokens for navigation and typography, and apply disabled fading once at the calendar boundary.

- Underline today, refine weekday/header geometry and apply one whole-calendar
  disabled fade. Add focused reference examples and application-owned booking.
- Add safe root and trigger host composition and Date and Time navigation.
- Mute noninteractive week-number cells and show their # column marker. Refine
  the booking example with a centered empty state, readable date heading,
  unavailable weekends and bounded date-dependent time slots.

- Give period grids a stable width and prevent broken month-name wrapping. Style range headings consistently and inherit short/long month formatting.

- Add external controllers, RootProvider, composable semantic table parts,
  view-specific grids and bounded month/year selection.
- Add responsive sizes and neutral/accent/contrast selection tones.
- Retain outside-day geometry, unique multi-month IDs and seven-column day
  keyboard navigation.

Disabled controls preserve their recipe and use one 50% fade with a not-allowed cursor. Forced colors restores full opacity and uses system disabled colors.

- Fixed oversized calendar grids overflowing narrow containers in WebKit.

- Added seven coordinated sizes while preserving both density shorthands.
- Finished month/year select insets and nested cell radius; constrained grids
  retain square cells and week-number grids reserve their eighth column.
- Added view, week-number, custom-day, bounds, state and controlled examples.

### Added

- Inline single, range, or multiple date selection. Uses typed date values, semantic Theme recipes and Atom-owned interaction.
