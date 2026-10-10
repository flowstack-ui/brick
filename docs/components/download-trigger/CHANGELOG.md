# DownloadTrigger changelog


DownloadTrigger follows the package version of `@flowstack-ui/brick`.

## Unreleased

- Support scalar focusRing="outside" | "inside"; omission stays outside. Inside uses paired foreground and canonical negative-width offset without changing Atom behavior.

- Add shared token-only radius selection to the boundary parts documented in the Radius guide; preserve omitted defaults and independent internal geometry.

### Added

- Add Button presentation for Atom generated-file downloads and async preparation.
# Unreleased — action-group defaults

- Inherit ButtonGroup presentation defaults while preserving explicit overrides.
- Use real Button/IconButton rendering, fix custom loading prop leakage, add
  named iconOnly controls and export the shared useDownload lifecycle hook.
