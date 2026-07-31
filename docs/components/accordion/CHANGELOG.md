# Accordion changelog

Accordion follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Added

- Added the seven-part Atom-backed Accordion with single and multiple models,
  locked-open and disabled semantics, landmark control, three variants and
  sizes, two-axis motion, direction-aware keyboard navigation, composition,
  responsive overflow, and accessible relationships.
- Upgraded to Atom `0.20.9` so entering panels are measured before their first
  painted animation frame, initially open panels do not animate during page
  load, and Brick's closing keyframe remains until Atom completes exit
  presence.
- Changed horizontal Accordion to use full-height vertical trigger rails while
  keeping panel content horizontal and expanding toward inline-end in LTR or
  RTL.
- Kept newly opened horizontal panel content at its intrinsic inline size so
  width measurement cannot collapse wrapped text into a vertical column.
