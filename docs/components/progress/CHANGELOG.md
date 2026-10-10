# Progress changelog

Progress follows the package version of `@flowstack-ui/brick`.

## Unreleased

- Added outline/subtle variants, responsive size/variant, inline layout, stripes
  and animated stripes with reduced-motion fallback.
- Polished track sizes and typography; added RootProvider, Context and
  useProgress, explicit IDs, initial values and raw-value formatting.
- Added static part host composition and refreshed documentation examples.

- Add shared token-only radius selection to the boundary parts documented in the Radius guide; preserve omitted defaults and independent internal geometry.

- Formatted values now inherit `LocaleProvider.locale` unless Root supplies an
  explicit locale.
## 0.1.10

### Added

- Added public Agent Knowledge for determinate, indeterminate, and buffered
  linear progress, accessible naming, range validation, and CSS delivery.
- Added Atom-backed linear determinate, indeterminate, and buffered progress
  with horizontal and vertical orientation, five sizes, three shapes, six
  tones, visible naming/value parts, RTL, preferences, and public CSS hooks.
