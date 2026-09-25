# AvatarGroup changelog

AvatarGroup follows the package version of `@flowstack-ui/brick`.

## Unreleased

- Omit separation for a single rendered item, including overflow-only groups; keep peer separation inside each Avatar.

- Add inherited tone/variant/borderless defaults and preserve explicit child
  presentation choices; synchronize compact Avatar sizes and remove hover restacking.

- Draw overlapping avatar separation rings inside each avatar's existing square; disable separation for non-overlapping groups.

- Add shared token-only radius selection to the boundary parts documented in the Radius guide; preserve omitted defaults and independent internal geometry.

### Added

- Added the first public `AvatarGroup` owner with uniform Avatar size/shape,
  tokenized logical overlap, configurable paint stacking, explicit max/total
  overflow, localized built-in overflow, and custom overflow composition.
- Defined deterministic runtime normalization for fractional, non-positive,
  and non-finite visual-slot budgets.
