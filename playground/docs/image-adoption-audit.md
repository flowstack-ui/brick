# Image playground adoption audit

Status: implemented July 26, 2026.

Use Brick Image for finished ordinary media that needs shared source state,
fallback, fit, focal position, ratio, radius, or frame. Keep Avatar identity
imagery under Avatar. Keep raw SVG under Icon and raw raster/SVG elements only
where a component route explicitly tests that native child form.

## Adopted

- The Image route owns the complete Image contract and all nine scenarios.
- Card's finished media composition uses Image instead of a raw image wrapper.
- Consumer imports the public Image subpath and uses it as informative project
  media inside Card with an authored fallback.

## Intentionally retained

- Icon Button's image-child scenario keeps its raw `img`; that native child is
  the behavior under test and must not gain Image anatomy.
- Avatar sources remain Avatar-owned identity media.
- Image's local SVG file is a deterministic media asset, not Icon anatomy.
- Framework/native interop output inside the Image route may retain exact
  native markup when that markup is the stated evidence.

Re-audit when ordinary finished media is added to a route or Consumer. Do not
replace component-owned icons, Avatar images, or exact output fixtures by
search-and-replace.
