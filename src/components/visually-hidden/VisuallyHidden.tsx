"use client";

import { forwardRef } from "react";
import {
  VisuallyHidden as AtomVisuallyHidden,
  type VisuallyHiddenRootProps as AtomVisuallyHiddenRootProps,
} from "@flowstack-ui/atom/visually-hidden";

export type VisuallyHiddenRootProps = AtomVisuallyHiddenRootProps;

function mergeClassName(base: string, className: string | undefined) {
  return className ? `${base} ${className}` : base;
}

export const VisuallyHiddenRoot = forwardRef<
  HTMLSpanElement,
  VisuallyHiddenRootProps
>(function VisuallyHiddenRoot(
  { className, "data-slot": dataSlot, ...props },
  ref,
) {
  return (
    <AtomVisuallyHidden.Root
      {...props}
      className={mergeClassName("brick-visually-hidden", className)}
      data-slot={dataSlot ?? "visually-hidden"}
      ref={ref}
    />
  );
});

VisuallyHiddenRoot.displayName = "VisuallyHidden.Root";

export const VisuallyHidden = Object.freeze({
  Root: VisuallyHiddenRoot,
});
