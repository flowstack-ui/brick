"use client";

import { forwardRef } from "react";
import { AspectRatio } from "@flowstack-ui/atom/aspect-ratio";
import {
  Image as AtomImage,
  type ImageContentProps as AtomImageContentProps,
  type ImageFallbackProps as AtomImageFallbackProps,
  type ImageRootProps as AtomImageRootProps,
} from "@flowstack-ui/atom/image";

export type ImageFit = "cover" | "contain" | "fill" | "none" | "scale-down";
export type ImagePosition = "center" | "top" | "bottom" | "start" | "end";
export type ImageRadius = "none" | "sm" | "md" | "lg" | "full";
export type ImageFrame = "none" | "subtle";

export interface ImageRootProps extends AtomImageRootProps {
  fit?: ImageFit;
  position?: ImagePosition;
  radius?: ImageRadius;
  frame?: ImageFrame;
  ratio?: number;
}

export interface ImageContentProps extends AtomImageContentProps {}
export interface ImageFallbackProps extends AtomImageFallbackProps {}

function mergeClassName(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

const ImageRoot = forwardRef<HTMLDivElement, ImageRootProps>(function ImageRoot(
  {
    fit = "cover",
    position = "center",
    radius = "none",
    frame = "none",
    ratio,
    className,
    "data-slot": dataSlot = "image",
    ...props
  },
  ref,
) {
  const root = (
    <AtomImage.Root
      {...props}
      className={mergeClassName("brick-image", className)}
      data-fit={fit}
      data-frame={frame}
      data-position={position}
      data-radius={radius}
      data-ratio={ratio === undefined ? undefined : ""}
      data-slot={dataSlot}
      ref={ref}
    />
  );

  return ratio === undefined ? root : (
    <AspectRatio.Root asChild data-slot={dataSlot} ratio={ratio}>
      {root}
    </AspectRatio.Root>
  );
});

const ImageContent = forwardRef<HTMLImageElement, ImageContentProps>(function ImageContent(
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

const ImageFallback = forwardRef<HTMLDivElement, ImageFallbackProps>(function ImageFallback(
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
