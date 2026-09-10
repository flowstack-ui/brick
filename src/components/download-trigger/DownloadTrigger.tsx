"use client";

import { forwardRef } from "react";
import { radiusStyle, type DistributiveOmit } from "../_radius/Radius.js";
import { DownloadTriggerRoot, type DownloadTriggerRootProps } from "@flowstack-ui/atom/download-trigger";
import { ButtonContent, buttonPresentation, type ButtonProps } from "../button/Button.js";

export type DownloadTriggerProps = DistributiveOmit<ButtonProps,
  "href" | "target" | "rel" | "type" | "asChild" | "render" | "onError"
> & Pick<DownloadTriggerRootProps,
  "data" | "fileName" | "mimeType" | "onDownloadStart" | "onDownloadInitiated" | "onDownloadError"
>;
export const DownloadTrigger = forwardRef<HTMLElement, DownloadTriggerProps>(function DownloadTrigger(
  { variant, tone, size, shape, radius, style, fullWidth, focusRing, startIcon, endIcon, className, children, ...props }, ref,
) {
  return <DownloadTriggerRoot {...props} ref={ref}
    {...buttonPresentation({ variant, tone, size, shape, radius, fullWidth, focusRing }, ["brick-download-trigger", className].filter(Boolean).join(" "))}
    style={radiusStyle(radius, "--brick-button-radius", style)}>
    <ButtonContent startIcon={startIcon} endIcon={endIcon}>{children}</ButtonContent>
  </DownloadTriggerRoot>;
});
DownloadTrigger.displayName = "DownloadTrigger";
