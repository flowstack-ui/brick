"use client";

import { createContext, forwardRef, useContext, type ReactNode } from "react";
import { QrCode as AtomQrCode, useQrCodeDownload, type QrCodeRootProps as AtomRootProps,
  type QrCodeRootProviderProps as AtomProviderProps, type QrCodeFrameProps as AtomFrameProps,
  type QrCodePatternProps as AtomPatternProps, type QrCodeOverlayProps as AtomOverlayProps,
  type QrCodeDownloadTriggerProps as AtomDownloadProps } from "@flowstack-ui/atom/qr-code";
import { DownloadTrigger, type DownloadTriggerProps } from "../download-trigger/DownloadTrigger.js";
import { type DistributiveOmit } from "../_radius/Radius.js";
import { responsiveDataAttributes, type ResponsiveValue } from "../_responsive-value/ResponsiveValue.js";

export type QrCodeSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
export type QrCodeRecipeProps = { size?: ResponsiveValue<QrCodeSize>; unstyled?: boolean };
export type QrCodeRootProps = AtomRootProps & QrCodeRecipeProps;
export type QrCodeRootProviderProps = AtomProviderProps & QrCodeRecipeProps;
export type QrCodeFrameProps = AtomFrameProps & { unstyled?: boolean };
export type QrCodePatternProps = AtomPatternProps & { unstyled?: boolean };
export type QrCodeOverlayProps = AtomOverlayProps & { unstyled?: boolean };
export type QrCodePropsProviderProps = { value: QrCodeRecipeProps; children?: ReactNode };
const Defaults = createContext<QrCodeRecipeProps>({});
const Unstyled = createContext(false);
export function QrCodePropsProvider({ value, children }: QrCodePropsProviderProps) {
  const outer = useContext(Defaults);
  const defined = Object.fromEntries(Object.entries(value).filter(([, v]) => v !== undefined));
  return <Defaults.Provider value={{ ...outer, ...defined }}>{children}</Defaults.Provider>;
}
export const QrCodeRootPropsProvider = QrCodePropsProvider;
const classes = (base: string, unstyled: boolean, extra?: string) => [unstyled ? undefined : base, extra].filter(Boolean).join(" ") || undefined;
export const QrCodeRoot = forwardRef<HTMLDivElement, QrCodeRootProps>(function QrCodeRoot({ size: ownSize, unstyled: own, className, ...props }, ref) {
  const defaults = useContext(Defaults);
  const size = ownSize ?? defaults.size ?? "md", unstyled = own ?? defaults.unstyled ?? false;
  return <Unstyled.Provider value={unstyled}><AtomQrCode.Root {...props} ref={ref} className={classes("brick-qr-code", unstyled, className)}
    {...responsiveDataAttributes("data-size", size, { alwaysInitial: true, defaultValue: "md" })} /></Unstyled.Provider>;
});
export const QrCodeRootProvider = forwardRef<HTMLDivElement, QrCodeRootProviderProps>(function QrCodeRootProvider({ size: ownSize, unstyled: own, className, ...props }, ref) {
  const defaults = useContext(Defaults);
  const size = ownSize ?? defaults.size ?? "md", unstyled = own ?? defaults.unstyled ?? false;
  return <Unstyled.Provider value={unstyled}><AtomQrCode.RootProvider {...props} ref={ref} className={classes("brick-qr-code", unstyled, className)}
    {...responsiveDataAttributes("data-size", size, { alwaysInitial: true, defaultValue: "md" })} /></Unstyled.Provider>;
});
export const QrCodeFrame = forwardRef<SVGSVGElement, QrCodeFrameProps>(function QrCodeFrame({ unstyled: own, className, background = "var(--brick-qr-code-background, white)", ...props }, ref) {
  const inherited = useContext(Unstyled);
  const unstyled = own ?? inherited;
  return <AtomQrCode.Frame {...props} background={background} ref={ref} className={classes("brick-qr-code-frame", unstyled, className)} />;
});
export const QrCodePattern = forwardRef<SVGPathElement, QrCodePatternProps>(function QrCodePattern({ unstyled: own, className, ...props }, ref) {
  const inherited = useContext(Unstyled);
  const unstyled = own ?? inherited;
  return <AtomQrCode.Pattern {...props} ref={ref} className={classes("brick-qr-code-pattern", unstyled, className)} />;
});
export const QrCodeOverlay = forwardRef<HTMLDivElement, QrCodeOverlayProps>(function QrCodeOverlay({ unstyled: own, className, ...props }, ref) {
  const inherited = useContext(Unstyled);
  const unstyled = own ?? inherited;
  return <AtomQrCode.Overlay {...props} ref={ref} className={classes("brick-qr-code-overlay", unstyled, className)} />;
});
export type QrCodeDownloadTriggerProps = DistributiveOmit<DownloadTriggerProps, "data" | "mimeType"> &
  Pick<AtomDownloadProps, "mimeType" | "quality" | "includeOverlay"> & {
    /** Output pixels, independent of the action's responsive Button size. */
    exportSize?: number;
  };
export const QrCodeDownloadTrigger = forwardRef<HTMLElement, QrCodeDownloadTriggerProps>(function QrCodeDownloadTrigger(
  { fileName, mimeType, quality, includeOverlay, exportSize, disabled, className, ...props }, ref,
) {
  const download = useQrCodeDownload({ fileName, mimeType, quality, includeOverlay, size: exportSize, disabled });
  return <DownloadTrigger {...props} fileName={fileName} mimeType={mimeType} data={download.data} disabled={download.disabled}
    ref={ref} data-slot="qr-code-download-trigger" className={classes("brick-qr-code-download-trigger", false, className)} />;
});
export const QrCodeContext = AtomQrCode.Context;
export const QrCode = { Root: QrCodeRoot, RootProvider: QrCodeRootProvider, PropsProvider: QrCodePropsProvider,
  RootPropsProvider: QrCodeRootPropsProvider, Frame: QrCodeFrame, Pattern: QrCodePattern,
  Overlay: QrCodeOverlay, DownloadTrigger: QrCodeDownloadTrigger, Context: QrCodeContext };
export { useQrCode, useQrCodeContext, encodeQrCode, QrCodeError } from "@flowstack-ui/atom/qr-code";
export type { QrCodeApi, QrCodeOptions, QrCodeEncoding, QrCodeResult, QrCodeExportOptions, QrCodeMimeType } from "@flowstack-ui/atom/qr-code";
