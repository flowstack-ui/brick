# DownloadTrigger


## When and where to use
Use for user-initiated downloads of generated string, Blob or File data.

## When not to use
Use Link download for existing URLs. Large exports, fetching, auth and serialization
belong to the application/server, not the component.

## Installation and imports
```tsx
import "@flowstack-ui/brick/styles.css";
import { DownloadTrigger } from "@flowstack-ui/brick/download-trigger";
```
Alternatively, load only the modular foundation and component styles:
```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/download-trigger.css";
```
Import { DownloadTrigger } from "@flowstack-ui/brick/download-trigger".
Load reset.css then styles.css, or core.css plus styles/download-trigger.css.

## Quick start
```tsx
<DownloadTrigger data="Hello" mimeType="text/plain" fileName="note.txt">
  Download note
</DownloadTrigger>
```

## Anatomy and DOM ownership
One native button. Atom owns file lifecycle and Brick renders Button presentation.
Stable classes brick-download-trigger and brick-button; slot download-trigger.

## API
DownloadTriggerProps requires data and nonempty fileName. data accepts a string,
Blob, File or lazy ({signal}) => value/PromiseLike. mimeType is required for
strings; otherwise explicit override wins over blob.type, then application/octet-stream.
onDownloadStart runs before preparation. onDownloadInitiated receives fileName,
mimeType and size (bytes). onDownloadError receives {error}.
Inherits Button size, tone, variant, shape, fullWidth, startIcon/endIcon,
disabled/loading, native props, onClick/onPress and HTMLElement ref.
No href, type, asChild or render props. The host is always a non-submit button.

### Shared radius selection

The parts listed for this component in the [Radius guide](../../guides/radius.md)
accept the shared token-only `Radius` contract. Omission preserves the owner’s
normal corners. Core sizes and semantic roles are distinct; arbitrary lengths
and responsive objects are not accepted. Where a legacy corner `shape` exists,
choose either it or `radius`, not both. This does not change behavior, sizing,
or the independently owned corners of other parts.

## Visual recipes and states
Uses Button's existing complete size/variant/tone/shape recipes. Pending preparation
uses loading; no new geometry. data-state is idle, preparing or error.
Loading preserves the accessible name, icon geometry and label space.

## Tokens and CSS hooks
Uses Button tokens and public hooks; no independent paint or size values.
Modular download-trigger.css includes Button and action-spinner CSS.

## Customization
Supply startIcon/endIcon like Button. Application content owns translations and
error messages. Do not style internal Atom-generated download anchors.

## Responsive behavior
Inherits sparse responsive Button sizing with lg baseline. Compose layout normally.

## Accessibility

### Focus presentation

Support scalar focusRing="outside" | "inside"; omission stays outside. Inside uses paired foreground and canonical negative-width offset without changing Atom behavior.
See [Focus presentation](../../guides/focus-presentation.md).
Use meaningful visible text or accessible naming. Native keyboard activation is
preserved. Pending is busy and blocks duplicate work. No invented save announcement.

## Composition, native props, and refs
Forwarded refs target the final button. Activation cancellation is supported through
onClick/onPress preventDefault. Disable or unmount cancels pending preparation.
An ignored producer AbortSignal cannot cause a stale handoff after unmount.

## Examples
```tsx
<DownloadTrigger
  data={async ({ signal }) => {
    const response = await fetch("/export", { signal });
    if (!response.ok) throw new Error("Export unavailable");
    return response.blob();
  }}
  fileName="report.csv"
  onDownloadError={({ error }) => showError(error)}
>
  Export report
</DownloadTrigger>
```
The request is application-owned. A string data value means literal contents, not
a URL. Browser policy can still prevent saving; initiated is not completed.
Temporary object URLs are released after deferred handoff. Physical iOS/Safari
async support requires separate qualification. There is no navigation fallback.

## Evidence
- [Playground](../../../playground/src/components/download-trigger/)
- [Visual](../../../playground/tests/components/download-trigger/visual.spec.ts)
- [Unit](../../../test/components/download-trigger/download-trigger.test.tsx)
- [Types](../../../test/types/components/download-trigger.test.ts)
- [Browser](../../../playground/tests/components/download-trigger/behavior.spec.ts)
- [Manual](../../../playground/manual-tests/download-trigger.md)

## Changelog
[Component changelog](CHANGELOG.md).
