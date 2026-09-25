"use client";
import { forwardRef } from "react";
import { type DistributiveOmit } from "../_radius/Radius.js";
import { useDownload, type UseDownloadProps } from "@flowstack-ui/atom/download-trigger";
import { Button, type ButtonProps } from "../button/Button.js";
import { IconButton, type IconButtonProps } from "../icon-button/IconButton.js";

type Excluded = "href" | "target" | "rel" | "type" | "asChild" | "render" | "onError";
type TextAction = DistributiveOmit<Extract<ButtonProps, {asChild?: false}>, Excluded> & {iconOnly?: false};
type IconAction = DistributiveOmit<Extract<IconButtonProps, {asChild?: false}>, Excluded> & {iconOnly: true; "aria-label": string};
export type DownloadTriggerProps = (TextAction | IconAction) & UseDownloadProps & { "data-slot"?: string };
export const DownloadTrigger = forwardRef<HTMLElement, DownloadTriggerProps>(function DownloadTrigger(
 {data,fileName,mimeType,onDownloadStart,onDownloadInitiated,onDownloadError,disabled,loading,onClick,onPress,className,"data-slot":slot="download-trigger",...props},ref
) {
 const download=useDownload({data,fileName,mimeType,onDownloadStart,onDownloadInitiated,onDownloadError,disabled,loading});
 const shared={ref,disabled,loading:download.loading,className:["brick-download-trigger",className].filter(Boolean).join(" "),
  "data-slot":slot,"data-state":download.state,onClick,
  onPress:((event)=>{onPress?.(event);if(!event.defaultPrevented)download.download(event.currentTarget.ownerDocument);}) as NonNullable<ButtonProps["onPress"]>};
 if(props.iconOnly){const {iconOnly,...visual}=props;return <IconButton {...visual} {...shared} />;}
 const {iconOnly,...visual}=props;
 return <Button {...visual} {...shared} />;
});
DownloadTrigger.displayName="DownloadTrigger";
