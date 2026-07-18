"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import {
  AvatarFallback as AtomAvatarFallback,
  AvatarImage as AtomAvatarImage,
  AvatarRoot as AtomAvatarRoot,
  type ImageLoadingStatus,
} from "@flowstack-ui/atom/avatar";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type AvatarShape = "circle" | "rounded";
export type AvatarStatus = "online" | "away" | "busy" | "offline";

export interface AvatarProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "children" | "color"> {
  src?: string;
  alt: string;
  fallback: ReactNode;
  size?: AvatarSize;
  shape?: AvatarShape;
  status?: AvatarStatus;
  fallbackDelayMs?: number;
  onLoadingStatusChange?: (status: ImageLoadingStatus) => void;
  "data-slot"?: string;
}

function mergeClassName(base: string, className: string | undefined) {
  return className ? `${base} ${className}` : base;
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  {
    src,
    alt,
    fallback,
    size = "md",
    shape = "circle",
    status,
    fallbackDelayMs,
    onLoadingStatusChange,
    className,
    "data-slot": dataSlot = "avatar",
    ...props
  },
  ref,
) {
  const fallbackSemantics =
    alt === ""
      ? ({ "aria-hidden": true } as const)
      : ({ "aria-label": alt, role: "img" } as const);

  return (
    <AtomAvatarRoot
      {...props}
      className={mergeClassName("brick-avatar", className)}
      data-shape={shape}
      data-size={size}
      data-slot={dataSlot}
      data-status={status}
      onLoadingStatusChange={onLoadingStatusChange}
      ref={ref}
      src={src}
    >
      {src ? (
        <AtomAvatarImage
          alt={alt}
          className="brick-avatar__image"
          data-slot="avatar-image"
          src={src}
        />
      ) : null}
      <AtomAvatarFallback
        {...fallbackSemantics}
        className="brick-avatar__fallback"
        data-slot="avatar-fallback"
        delayMs={fallbackDelayMs}
      >
        {fallback}
      </AtomAvatarFallback>
    </AtomAvatarRoot>
  );
});
