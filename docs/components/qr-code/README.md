# QrCode

## When and where to use

Share a text value or destination as a locally generated QR graphic.

## When not to use

This is not a scanner, camera, login/session engine, encryption, URL validator or
hosted QR service. Keep a normal link or written equivalent available.

## Installation and imports

```tsx
import { QrCode, useQrCode } from "@flowstack-ui/brick/qr-code";
import "@flowstack-ui/brick/styles.css";
```

Alternatively load core.css plus styles/qr-code.css, which includes its action
styles. Do not mix aggregate and modular delivery. React 18 and 19 supported.

```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/qr-code.css";
```

## Quick start

```tsx
<QrCode.Root value="https://example.com/share">
  <QrCode.Frame titleText="Open shared document" />
</QrCode.Root>
```

## Anatomy and DOM ownership

QrCodeRoot / QrCodeRootProvider are divs. QrCodeFrame is an SVG with background
rect and a default QrCodePattern; explicitly supply Pattern children to customize
its native SVG props. QrCodeOverlay is a decorative div. QrCodeDownloadTrigger
is a non-submit button. QrCodeContext renders no DOM. Namespace parts are Root,
RootProvider, PropsProvider (also RootPropsProvider), Frame, Pattern, Overlay,
DownloadTrigger and Context. PropsProvider renders no host and supplies size and
unstyled defaults. Explicit values win; nested defined values merge and maps replace.

## API

| Prop | Default | Meaning |
| --- | --- | --- |
| `size` | `md` | Responsive QR display preset on Root or RootProvider. |
| `unstyled` | `false` | Remove graphic recipes; explicit parts override inheritance. |
| `asChild` | `false` | Compatible host for Root/Provider/Frame/Pattern/Overlay. |
| `id / ids` | generated | Root/frame/overlay IDs; native part IDs win. |

QrCodeRootProps: value/defaultValue strings (default empty), size (md), encoding,
pixelSize (10, positive <=100), onValueChange({value}), onEncode({result}) and
onEncodingError({error}). QrCodeRootProviderProps accepts the useQrCode controller
as value plus the visual size. QrCodeOptions owns behavior; QrCodeApi exposes
value, result, error, state, setValue, toBlob and getDataUrl.

QrCodeEncoding: ecc L/M/Q/H default L; boostEcc false; minVersion 1/maxVersion 40;
maskPattern -1 (auto) or 0–7; border 4 (integer 0–16 modules); invert false.
No trimming or URL fetching. Controlled refusal is respected; external changes
do not echo callbacks. Invalid/capacity errors remove Pattern and disable export,
never retaining stale data. Empty strings encode but are rarely useful.

QrCodeResult is immutable: version, maskPattern, size, symbolSize, border,
pixelSize, data and path. encodeQrCode is the pure encoder helper. QrCodeError
codes: options, capacity, unavailable, export, overlay. useQrCodeContext and
QrCodeContext expose the current controller. Generation callbacks run after
commit, not during SSR. No form submission value or built-in loading state.

QrCodeFrameProps: titleText, description, background and native SVG fill/ARIA.
QrCodePatternProps exclude owned d; asChild requires one path child. QrCodeOverlayProps accepts
exportSrc for arbitrary visual children; a contained img or self-contained SVG
can otherwise be exported. Avoid interactive children in the decorative overlay.

Keep `exportSrc` visually consistent with the displayed artwork. The portable
overlay example uses an HTML-wrapped Brick mark and a self-contained SVG of the
same mark for downloads; the ordinary logo example uses a direct SVG instead.

QrCodeDownloadTriggerProps: fileName and mimeType required; quality, includeOverlay
(true), exportSize (integer 1–4096), onDownloadStart, onDownloadInitiated and
onDownloadError. Inherits finished DownloadTrigger's Button recipes, loadingText,
spinner/spinnerPlacement/focusRing, startIcon/endIcon and native activation props;
no href/asChild/render/type. iconOnly selects IconButton and requires aria-label.
ButtonGroup and Button defaults apply. Graphic unstyled does not suppress the
independently styled download action.
Its size is Button size, never image size. Default output edge is matrix size ×
pixelSize (ceil, capped at 4096), independent of CSS size.

QrCodeExportOptions for toBlob/getDataUrl use size (output edge), mimeType,
quality 0–1, includeOverlay true and signal. QrCodeMimeType accepts image/svg+xml,
image/png, image/jpeg and image/webp; unsupported WebP rejects instead of returning
PNG. Export needs a mounted Frame/Pattern. SVG embeds resolved paint and logo
bytes. JPEG has opaque backing. Remote logos require CORS and bounded loading;
unsupported arbitrary HTML needs exportSrc or explicit includeOverlay=false.
Value, logo and paint are snapshotted. Aborted/disabled/unmounted downloads cannot
deliver late results. Initiated is browser handoff, not successful saving.

### Shared radius selection

The parts listed for this component in the [Radius guide](../../guides/radius.md)
accept the shared token-only `Radius` contract. Omission preserves the owner’s
normal corners. Core sizes and semantic roles are distinct; arbitrary lengths
and responsive objects are not accepted. Where a legacy corner `shape` exists,
choose either it or `radius`, not both. This does not change behavior, sizing,
or the independently owned corners of other parts.

## Visual recipes and states

QrCodeSize: `2xs`=40px, `xs`=64px, `sm`=80px, `md`=120px, `lg`=160px, `xl`=200px,
`2xl`=240px and `full`=parent width. Default `size="md"`. No independent variant/tone
catalog; supply custom graphic fill/background intentionally. Root and Frame
data-state are ready/error. Download state is idle/preparing/error with inherited
data-loading/data-disabled. Its complete Button recipe and centered loader remain
unchanged. The square logo box defaults to one-third of frame width; high ECC is recommended
but not automatically enabled. Actual decoding is required for branded codes.

## Tokens and CSS hooks

Public --brick-qr-code-size, --brick-qr-code-foreground,
--brick-qr-code-background, --brick-qr-code-overlay-size,
--brick-qr-code-overlay-padding and --brick-qr-code-overlay-radius.
Root class brick-qr-code and `data-size`; part classes brick-qr-code-frame,
brick-qr-code-pattern, brick-qr-code-overlay, brick-qr-code-download-trigger.
Slots qr-code-root/frame/pattern/background/overlay/download-trigger are Atom-owned.
Overlay size/padding/radius variables work on Root or Overlay. Default and maximum
overlay width remain one third of Frame; padding defaults to 4px.
Root state, SVG geometry and generated d are not presentation overrides.

## Customization

Use component props, then documented variables. Put surrounding decoration in
Surface/Card. QR cells and quiet zone never follow theme radius; logo backing
does. Default black-on-white scanning media deliberately stays light in dark
mode and forced colors. Custom/inverted colors need scan qualification.

## Responsive behavior

Named presets accept scalar or initial/sm/md/lg/xl maps. Sparse maps inherit md
until an authored breakpoint; full fits a bounded parent. The QR stays square
and does not mirror in RTL. A small physical QR may be too dense to scan even if
its SVG is geometrically correct. Download Button sizing is independently responsive.

## Accessibility

Frame needs aria-label/aria-labelledby or titleText; description supplies desc.
Explicit aria-hidden supports decorative redundancy. QR is not focusable; keep
a normal Link/Clipboard alternative. Labels/status translations belong to the
application, not the encoded payload. Do not place secrets into names or logs.
No announcements per keystroke. Surrounding buttons retain native focus/keyboard.

## Composition, native props, and refs

Refs target div/SVG/path hosts; DownloadTrigger keeps HTMLElement action refs.
Native props/class/style pass through. React 19 ref cleanup and React 18 null
detachment are preserved. asChild hosts forward props and refs; Frame/Pattern
retain SVG/path hosts. Frame viewBox/preserveAspectRatio and
Pattern d are owned. titleText avoids native title collision. RootProvider only
accepts useQrCode, not arbitrary hand-constructed controllers. One Frame and
optional Overlay per controller. No DOM duplication for responsive layout.

## Examples

```tsx
<QrCode.Root value="https://example.com/share" size="lg" encoding={{ ecc: "H" }}>
  <QrCode.Frame aria-label="Shared document" />
  <QrCode.DownloadTrigger fileName="document.png" mimeType="image/png" exportSize={512}>
    Download QR
  </QrCode.DownloadTrigger>
</QrCode.Root>
```

The public playground has source-paired examples, API tables and TOC. The
qualification route (?qualification=1) retains 18 scenarios: baseline, sizes, full, controlled,
store, Unicode, correction, encoding, margin, appearance, logos, explicit overlay,
download, action states, application status, recovery, RTL and dialog composition.

## Evidence

- [Unit](../../../test/components/qr-code/)
- [Types](../../../test/types/components/qr-code.test.ts)
- [Browser](../../../playground/tests/components/qr-code/behavior.spec.ts)
- [Visual](../../../playground/tests/components/qr-code/visual.spec.ts)
- [Manual](../../../playground/manual-tests/qr-code.md)
- [Playground](../../../playground/src/components/qr-code/)

Physical camera, print, screen-reader and platform download checks are independent
manual requirements; automated decoding and emulation do not close them.

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
