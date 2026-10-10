# Blockquote changelog

Blockquote follows the package version of `@flowstack-ui/brick`.

## Unreleased

- Add subtle/solid variants and semantic tones; retain legacy accent, surface
  and plain. Default to subtle/neutral/start with inherited quote typography,
  14px caption, compact spacing and an unrounded rule.
- Replace the default font glyph with a stable decorative 20px SVG and support
  static asChild composition on every part.

### Fixed

- Prevent Prose from adding a second quotation border and extra padding to
  Blockquote.Content; Root retains the selected recipe's decoration and inset.

## 0.1.12 — 2026-08-30

### Added

- Added the semantic compound Blockquote owner with figure, quotation, caption, cite, and optional decorative icon parts.
- Added accent, surface, and plain recipes plus logical alignment and forced-color treatment.
