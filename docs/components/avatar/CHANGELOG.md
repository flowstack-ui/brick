# Avatar changelog

Avatar follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Changed

- Avatar now accepts AvatarGroup presentation context so a reusable identity
  stack can own consistent size and shape without cloning child elements.

## 0.1.10

### Changed

- Expanded public Agent Knowledge for source loading and error state, fallback
  equivalence, decorative use, status treatment, and exact Atom ownership.
- Clarified that Avatar owns compact fixed-square identity tokens while Image
  owns larger editorial/profile portraits whose authored aspect ratio, crop,
  focal position, or available measure communicates identity.
- Documented contextual alternative-text decisions instead of treating nearby
  identity text as an automatic decorative-image rule.

### Added

- Added named `2xl`, `3xl`, `4xl`, and `5xl` sizes for larger square profile
  identities without inline size-token overrides.

- Initial direct Avatar built on the public Atom Avatar subpath.
- Required explicit alternative and fallback content, five sizes, circle and
  rounded shapes, and neutral finished styling.
- Optional online, away, busy, and offline status rings that follow Avatar
  geometry without changing layout or adding semantic DOM.
- Informative and decorative fallback mapping, native prop and ref forwarding,
  root and subpath exports, and static CSS.
