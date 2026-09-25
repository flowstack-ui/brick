import { forwardRef, type CSSProperties, type HTMLAttributes, type ReactNode } from "react";
import { staticPart, type StaticPartProps } from "../_internal/StaticPart.js";
import { radiusStyle, type Radius } from "../_radius/Radius.js";

export type SkeletonVariant = "text" | "circular" | "rectangular" | "rounded";
export type SkeletonAnimation = "pulse" | "wave" | "none";
type NativeProps = Omit<HTMLAttributes<HTMLSpanElement>, "children" | "className" | "style">;

export interface SkeletonProps extends NativeProps {
  children?: ReactNode;
  loading?: boolean;
  variant?: SkeletonVariant;
  animation?: SkeletonAnimation;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  lines?: number;
  asChild?: boolean;
  radius?: Radius;
  size?: CSSProperties["width"];
  gap?: CSSProperties["gap"];
  lastLineWidth?: CSSProperties["width"];
  className?: string;
  style?: CSSProperties;
  slot?: string;
}

export const Skeleton = forwardRef<HTMLSpanElement, SkeletonProps>(function Skeleton(
  { animation = "pulse", children, className, height, lines = 1, loading = true, slot = "skeleton", style, variant = "text", width, asChild = false, radius, size, gap, lastLineWidth, ...props },
  ref,
) {
  const lineCount = Number.isFinite(lines) ? Math.min(100, Math.max(1, Math.floor(lines))) : 1;
  const hasChildren = children !== undefined && children !== null;
  const multiline = !hasChildren && variant === "text" && lineCount > 1;
  const length = (value: unknown) => typeof value === "number" ? `${value}px` : value;
  const resolvedWidth = width ?? size;
  const resolvedHeight = height ?? size ?? (variant === "circular" ? width : undefined);
  const resolvedStyle = radiusStyle(radius, "--brick-skeleton-radius", {
    ...style,
    ...(resolvedWidth !== undefined ? { "--brick-skeleton-width": length(resolvedWidth) } : {}),
    ...(resolvedHeight !== undefined ? { "--brick-skeleton-height": length(resolvedHeight) } : {}),
    ...(gap !== undefined ? { "--brick-skeleton-gap": length(gap) } : {}),
    ...(lastLineWidth !== undefined ? { "--brick-skeleton-last-line-width": length(lastLineWidth) } : {}),
  } as CSSProperties);
  return staticPart("span", {
    ...props, asChild, children: hasChildren ? children : multiline ? Array.from({ length: lineCount }, (_, index) => <span className="brick-skeleton-line" key={index} />) : null,
    ...(loading ? { "aria-hidden": true, inert: "inert" } : {}),
    className, style: resolvedStyle,
    ...(!asChild ? { "data-animation": animation, "data-loading": loading ? "" : undefined, "data-variant": variant } : {}),
    "data-skeleton-animation": animation,
    "data-skeleton-loading": loading ? "" : undefined,
    "data-skeleton-variant": variant,
    "data-has-children": hasChildren ? "" : undefined,
    "data-as-child": asChild ? "" : undefined,
    "data-width": resolvedWidth !== undefined ? "" : undefined,
    "data-height": resolvedHeight !== undefined ? "" : undefined,
    "data-lines": multiline ? lineCount : undefined,
    "data-slot": slot,
  } as StaticPartProps, ref, "brick-skeleton", slot);
});
Skeleton.displayName = "Skeleton";
