import { type QrCodeRootProps, type QrCodeDownloadTriggerProps, type QrCodeEncoding } from "../../../src/qr-code.js";
import { createElement } from "react";
const root: QrCodeRootProps = { size: "full", value: "hello", encoding: { ecc: "H" } }; void root;
const action: QrCodeDownloadTriggerProps = { size: { lg: "sm" }, exportSize: 512, fileName: "qr.svg", mimeType: "image/svg+xml" }; void action;
// @ts-expect-error encoding levels are constrained
const encoding: QrCodeEncoding = { ecc: "Z" }; void encoding;
// @ts-expect-error navigation is not a generated download
const navigation: QrCodeDownloadTriggerProps = { href: "/", fileName: "qr.svg", mimeType: "image/svg+xml" }; void navigation;
const responsive: QrCodeRootProps = { size: { lg: "xl" } }; void responsive;
const composed: QrCodeRootProps = { asChild: true, unstyled: true, ids: {frame: "qr-frame"} }; void composed;
const icon: QrCodeDownloadTriggerProps = { iconOnly: true, "aria-label": "Download QR", fileName: "qr.png", mimeType: "image/png", focusRing: "inside", children:createElement("svg") }; void icon;
// @ts-expect-error icon-only actions require an accessible label
const unnamed: QrCodeDownloadTriggerProps = { iconOnly: true, fileName:"a.png", mimeType:"image/png", children:createElement("svg") }; void unnamed;
