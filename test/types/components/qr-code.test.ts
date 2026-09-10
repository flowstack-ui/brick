import { type QrCodeRootProps, type QrCodeDownloadTriggerProps, type QrCodeEncoding } from "../../../src/qr-code.js";
const root: QrCodeRootProps = { size: "full", value: "hello", encoding: { ecc: "H" } }; void root;
const action: QrCodeDownloadTriggerProps = { size: { lg: "sm" }, exportSize: 512, fileName: "qr.svg", mimeType: "image/svg+xml" }; void action;
// @ts-expect-error encoding levels are constrained
const encoding: QrCodeEncoding = { ecc: "Z" }; void encoding;
// @ts-expect-error navigation is not a generated download
const navigation: QrCodeDownloadTriggerProps = { href: "/", fileName: "qr.svg", mimeType: "image/svg+xml" }; void navigation;
// @ts-expect-error QR sizes are scalar media presets
const responsive: QrCodeRootProps = { size: { lg: "xl" } }; void responsive;
