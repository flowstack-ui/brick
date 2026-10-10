# QrCode manual protocol

| Environment | Recorded value |
| --- | --- |
| Browser and version | Not performed |
| Operating system | Not performed |
| Viewport and zoom | Not performed |
| Assistive technology | Not performed |
| Playground route | `/qr-code` |
| Qualification route(s) | `/qr-code` and `/qr-code?qualification=1` |

Use `pass`, `fail`, `blocked`, or `not applicable`.

Scenario order: qr-code.basic; qr-code.sizes; qr-code.full; qr-code.controlled; qr-code.store; qr-code.unicode; qr-code.correction; qr-code.encoding; qr-code.margin; qr-code.appearance; qr-code.logos; qr-code.overlay; qr-code.download; qr-code.actions; qr-code.status; qr-code.errors; qr-code.rtl; qr-code.dialog.

1. Inspect every specimen in light/dark, narrow/wide, RTL, forced colors and actual 200%/400% browser zoom. Confirm square codes, clear quiet zones and centered logos/loading indicators. Logo backings should be square at one-third frame width, with readable authored text and contained artwork.
2. With VoiceOver/Safari and NVDA/Firefox, read the graphic name and alternative link. Operate each download and the dialog by keyboard. Confirm focus restoration and announced errors.
3. Scan plain and branded codes on physical iOS and Android cameras at representative display sizes and print scales. Verify exact Unicode and whitespace payloads using an independent reader. Small/dense/inverted/custom-color codes need application-specific qualification.
4. Save every format, inspect logo inclusion and scan saved images. Verify unsupported overlay errors, offline use, canceled actions and Safari/iOS download behavior.
5. On the public route check all 15 source-paired examples. Resize the full-width
   example across breakpoints, inspect the smaller root-customized logo, and
   operate both named text/icon download actions. Verify the unstyled SVG and
   inherited defaults examples in narrow, RTL, dark and high-contrast environments.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues: Physical cameras, print, actual zoom and assistive technology remain unperformed.
Workbook updated: Manual evidence remains open.
