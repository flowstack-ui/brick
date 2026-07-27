import { forwardRef, type CSSProperties, type HTMLAttributes, type ReactNode } from "react";

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
  className?: string;
  style?: CSSProperties;
  slot?: string;
}

function classes(className?: string) { return className ? `brick-skeleton ${className}` : "brick-skeleton"; }

export const Skeleton = forwardRef<HTMLSpanElement, SkeletonProps>(function Skeleton(
  { animation = "pulse", children, className, height, lines = 1, loading = true, slot = "skeleton", style, variant = "text", width, ...props },
  ref,
) {
  const lineCount = Math.max(1, Math.floor(lines));
  const hasChildren = children !== undefined && children !== null;
  const resolvedStyle = { ...style, ...(width !== undefined ? { "--brick-skeleton-width": typeof width === "number" ? `${width}px` : width } : {}), ...(height !== undefined ? { "--brick-skeleton-height": typeof height === "number" ? `${height}px` : height } : {}) } as CSSProperties;
  return (
    <span {...props} aria-hidden={loading ? "true" : undefined} className={classes(className)} data-animation={animation} data-has-children={hasChildren ? "" : undefined} data-lines={lineCount > 1 ? lineCount : undefined} data-loading={loading ? "" : undefined} data-slot={slot} data-variant={variant} ref={ref} style={resolvedStyle}>
      {hasChildren ? <span className="brick-skeleton-content">{children}</span> : lineCount > 1 ? Array.from({ length: lineCount }, (_, index) => <span className="brick-skeleton-line" key={index} />) : null}
    </span>
  );
});
Skeleton.displayName = "Skeleton";
