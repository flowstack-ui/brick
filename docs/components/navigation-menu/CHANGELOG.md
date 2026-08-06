# Navigation Menu changelog

Navigation Menu follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Changed

- Replaced the thick open-trigger Indicator bar with a small surface-matched
  arrow that connects the measured trigger to the Viewport, reduced automatic
  chevron size and stroke, and made current-link underlines explicitly one
  pixel thick. The Viewport now defaults to the restrained control radius
  instead of the larger overlay radius.

### Added

- Added public Agent Knowledge for component selection, composition,
  CSS-delivery, recurring mistakes, and validation.

- Added the decorative `NavigationMenu.IndicatorArrow` part. Indicator renders
  it by default when no custom Indicator children are supplied.

### Fixed

- Vertical Viewports now follow the Root-relative active-trigger geometry
  carried by exact Atom `0.20.11`, so the Indicator arrow remains connected
  when switching from the first trigger to a later trigger with shorter
  content. Pointer movement followed by a click on that destination trigger
  also leaves it open instead of racing the preceding hover-open transition.

- Default `md` links and triggers now use Brick's shared 44px comfortable
  target; explicit `sm` and `lg` densities remain 32px and 48px.

### Added

- Added the complete styled Navigation Menu family with native destination semantics, three sizes, rich measured panels, active indicators, orientation, and RTL support.
