"use client";

import { forwardRef, type CSSProperties } from "react";
import { radiusStyle, type Radius } from "../_radius/Radius.js";
import { AspectRatio } from "@flowstack-ui/atom/aspect-ratio";
import {
  Image as AtomImage,
  type ImageContentProps as AtomImageContentProps,
  type ImageFallbackProps as AtomImageFallbackProps,
  type ImageRootProps as AtomImageRootProps,
} from "@flowstack-ui/atom/image";

import { normalizeResponsiveValue, type ResponsiveValue } from "../_responsive-value/ResponsiveValue.js";

export type ImageFit = "cover" | "contain" | "fill" | "none" | "scale-down";
export type ImagePositionPreset = "center" | "top" | "bottom" | "start" | "end";
export type ImagePosition = ImagePositionPreset | NonNullable<CSSProperties["objectPosition"]>;
export type ResponsiveImageFit = ResponsiveValue<ImageFit>;
export type ResponsiveImagePosition = ResponsiveValue<ImagePosition>;
export type ResponsiveImageRatio = ResponsiveValue<number>;
export type ImageRadius = Radius;
export type ImageFrame = "none" | "subtle";

export interface ImageRootProps extends AtomImageRootProps {
  fit?: ResponsiveImageFit;
  position?: ResponsiveImagePosition;
  radius?: ImageRadius;
  frame?: ImageFrame;
  ratio?: ResponsiveImageRatio;
  fill?: boolean;
}

export interface ImageContentProps extends AtomImageContentProps {}
export interface ImageFallbackProps extends AtomImageFallbackProps {}

function mergeClassName(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

export const ImageRoot = forwardRef<HTMLDivElement, ImageRootProps>(function ImageRoot(
  {
    fit = "cover",
    position = "center",
    radius,
    frame = "none",
    ratio,
    fill = false,
    className,
    style,
    "data-slot": dataSlot = "image",
    ...props
  },
  ref,
) {
  const presentation: CSSProperties & Record<string, string | number | undefined> = {};
  const positions = { center: "center", top: "center top", bottom: "center bottom", start: "var(--_brick-image-start)", end: "var(--_brick-image-end)" };
  const fitValues = normalizeResponsiveValue(fit);
  const positionValues = normalizeResponsiveValue(position);
  const ratioValues = normalizeResponsiveValue(ratio ?? 16 / 9);
  const normalizeRatio = (value: number) => Number.isFinite(value) && value > 0 ? value : 16 / 9;
  let currentFit: ImageFit = "cover";
  let currentPosition: ImagePosition = "center";
  let currentRatio = 16 / 9;
  // Assign the full local cascade so a nested Image cannot inherit a parent's
  // breakpoint values. Authored CSS is serialized as values, never CSS text.
  for (const breakpoint of ["initial", "sm", "md", "lg", "xl"] as const) {
    currentFit = fitValues[breakpoint] ?? currentFit;
    currentPosition = positionValues[breakpoint] ?? currentPosition;
    currentRatio = normalizeRatio(ratioValues[breakpoint] ?? currentRatio);
    presentation[`--_brick-image-fit-${breakpoint}`] = currentFit;
    presentation[`--_brick-image-position-${breakpoint}`] = positions[currentPosition as ImagePositionPreset] ?? currentPosition;
    presentation[`--_brick-image-ratio-${breakpoint}`] = currentRatio;
  }
  const root = (
    <AtomImage.Root
      {...props}
      style={radiusStyle(radius, "--brick-image-radius", { ...presentation, ...style })}
      className={mergeClassName("brick-image", className)}
      data-fit={typeof fit === "object" ? "responsive" : fit}
      data-frame={frame}
      data-fill={fill ? "" : undefined}
      data-position={typeof position === "object" ? "responsive" : position}
      data-radius={radius ?? "none"}
      data-ratio={ratio === undefined ? undefined : ""}
      data-slot={dataSlot}
      ref={ref}
    />
  );

  return ratio === undefined ? root : (
    <AspectRatio.Root asChild data-slot={dataSlot} ratio={normalizeRatio(ratioValues.initial ?? 16 / 9)} ratioVariable={typeof ratio === "object" ? "--_brick-image-ratio-current" : undefined}>
      {root}
    </AspectRatio.Root>
  );
});

export const ImageContent = forwardRef<HTMLImageElement, ImageContentProps>(function ImageContent(
  { className, "data-slot": dataSlot = "image-content", ...props },
  ref,
) {
  return (
    <AtomImage.Content
      {...props}
      className={mergeClassName("brick-image__content", className)}
      data-slot={dataSlot}
      ref={ref}
    />
  );
});

export const ImageFallback = forwardRef<HTMLDivElement, ImageFallbackProps>(function ImageFallback(
  { className, "data-slot": dataSlot = "image-fallback", ...props },
  ref,
) {
  return (
    <AtomImage.Fallback
      {...props}
      className={mergeClassName("brick-image__fallback", className)}
      data-slot={dataSlot}
      ref={ref}
    />
  );
});

ImageRoot.displayName = "Image.Root";
ImageContent.displayName = "Image.Content";
ImageFallback.displayName = "Image.Fallback";

export const Image = Object.freeze({
  Root: ImageRoot,
  Content: ImageContent,
  Fallback: ImageFallback,
});
