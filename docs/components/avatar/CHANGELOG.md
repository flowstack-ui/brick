# Avatar changelog

Avatar follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Changed

- Clarified that Avatar owns compact fixed-square identity tokens while Image
  owns larger editorial/profile portraits whose authored aspect ratio, crop,
  focal position, or available measure communicates identity.
- Documented contextual alternative-text decisions instead of treating nearby
  identity text as an automatic decorative-image rule.

### Added

- Initial direct Avatar built on the public Atom Avatar subpath.
- Required explicit alternative and fallback content, five sizes, circle and
  rounded shapes, and neutral finished styling.
- Optional online, away, busy, and offline status rings that follow Avatar
  geometry without changing layout or adding semantic DOM.
- Informative and decorative fallback mapping, native prop and ref forwarding,
  root and subpath exports, and static CSS.
