"use client";

import { forwardRef } from "react";
import { QrCode as AtomQrCode, type QrCodeRootProps as AtomRootProps,
  type QrCodeRootProviderProps as AtomProviderProps, type QrCodeFrameProps,
  type QrCodePatternProps, type QrCodeOverlayProps, type QrCodeDownloadTriggerProps as AtomDownloadProps } from "@flowstack-ui/atom/qr-code";
import { ButtonContent, buttonPresentation, type ButtonProps } from "../button/Button.js";
import { radiusStyle, type DistributiveOmit } from "../_radius/Radius.js";

export type QrCodeSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
export type QrCodeRootProps = AtomRootProps & { size?: QrCodeSize };
export type QrCodeRootProviderProps = AtomProviderProps & { size?: QrCodeSize };
const classes = (base: string, extra?: string) => [base, extra].filter(Boolean).join(" ");
export const QrCodeRoot = forwardRef<HTMLDivElement, QrCodeRootProps>(function QrCodeRoot({ size = "md", className, ...props }, ref) {
  return <AtomQrCode.Root {...props} ref={ref} className={classes("brick-qr-code", className)} data-size={size} />;
});
export const QrCodeRootProvider = forwardRef<HTMLDivElement, QrCodeRootProviderProps>(function QrCodeRootProvider({ size = "md", className, ...props }, ref) {
  return <AtomQrCode.RootProvider {...props} ref={ref} className={classes("brick-qr-code", className)} data-size={size} />;
});
export const QrCodeFrame = forwardRef<SVGSVGElement, QrCodeFrameProps>(function QrCodeFrame({ className, background = "var(--brick-qr-code-background, white)", ...props }, ref) {
  return <AtomQrCode.Frame {...props} background={background} ref={ref} className={classes("brick-qr-code-frame", className)} />;
});
export const QrCodePattern = forwardRef<SVGPathElement, QrCodePatternProps>(function QrCodePattern({ className, ...props }, ref) {
  return <AtomQrCode.Pattern {...props} ref={ref} className={classes("brick-qr-code-pattern", className)} />;
});
export const QrCodeOverlay = forwardRef<HTMLDivElement, QrCodeOverlayProps>(function QrCodeOverlay({ className, ...props }, ref) {
  return <AtomQrCode.Overlay {...props} ref={ref} className={classes("brick-qr-code-overlay", className)} />;
});
export type QrCodeDownloadTriggerProps = DistributiveOmit<ButtonProps, "href" | "target" | "rel" | "type" | "asChild" | "render" | "onError"> &
  Pick<AtomDownloadProps, "fileName" | "mimeType" | "quality" | "includeOverlay" | "onDownloadStart" | "onDownloadInitiated" | "onDownloadError"> & {
    /** Image output edge; size remains the Button recipe size. */
    exportSize?: number;
  };
export const QrCodeDownloadTrigger = forwardRef<HTMLElement, QrCodeDownloadTriggerProps>(function QrCodeDownloadTrigger(
  { variant, tone, size, shape, radius, style, fullWidth, startIcon, endIcon, className, children, exportSize, ...props }, ref,
) {
  return <AtomQrCode.DownloadTrigger {...props} size={exportSize} ref={ref}
    {...buttonPresentation({ variant, tone, size, shape, radius, fullWidth }, classes("brick-qr-code-download-trigger", className))}
    style={radiusStyle(radius, "--brick-button-radius", style)}>
    <ButtonContent startIcon={startIcon} endIcon={endIcon}>{children}</ButtonContent>
  </AtomQrCode.DownloadTrigger>;
});
export const QrCodeContext = AtomQrCode.Context;
export const QrCode = { Root: QrCodeRoot, RootProvider: QrCodeRootProvider, Frame: QrCodeFrame,
  Pattern: QrCodePattern, Overlay: QrCodeOverlay, DownloadTrigger: QrCodeDownloadTrigger, Context: QrCodeContext };
export { useQrCode, useQrCodeContext, encodeQrCode, QrCodeError } from "@flowstack-ui/atom/qr-code";
export type { QrCodeFrameProps, QrCodePatternProps, QrCodeOverlayProps, QrCodeApi,
  QrCodeOptions, QrCodeEncoding, QrCodeResult, QrCodeExportOptions, QrCodeMimeType } from "@flowstack-ui/atom/qr-code";
