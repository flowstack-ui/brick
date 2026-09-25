# Stat changelog

Stat follows the package version of `@flowstack-ui/brick`.

Public component: `Stat`.

## Unreleased

- Added responsive Root/Group sizing and the ResponsiveStatSize type.
- Group now defaults to role=group; explicit native role overrides remain supported.
- Projection uses public Atom composition with React 19 cleanup-ref preservation.
- Values explicitly request proportional numerals. Indicators retain custom SVG
  paint and own logical spacing; HelpText supports full-width block content.
- Rebuilt focused source-paired docs examples and corrected collapsed progress.

### Added

- Added surface-free metric anatomy, three sizes, grouping, units and
  independently colored trend indicators with native description-list semantics.
