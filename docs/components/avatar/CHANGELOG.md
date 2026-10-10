# Avatar changelog

Avatar follows the package version of `@flowstack-ui/brick`.

## Unreleased

- Clarify the distinction between convenience anatomy and compound host composition.

- Use an in-box border with clipped background for clean separation edges, preserving the named outer size.

- Add compound Root/Image/Fallback/Icon, native imageProps, generic fallback,
  subtle/solid/outline variants, neutral/accent/contrast tones and borderless.
- Adopt compact 2xs–2xl sizes (24/32/36/40/44/48/64px), retain 3xl–5xl,
  add constrained full size, and coordinate medium-weight fallback typography.
- Preserve native SSR image discovery, lazy loading and responsive requests.

- Remove the default standalone separation ring; optional rings are drawn inside the fixed avatar dimensions, not outside them.

- Add shared token-only radius selection to the boundary parts documented in the Radius guide; preserve omitted defaults and independent internal geometry.

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
