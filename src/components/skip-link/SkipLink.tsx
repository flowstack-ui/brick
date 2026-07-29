"use client";

import { forwardRef } from "react";
import {
  SkipLink as AtomSkipLink,
  type SkipLinkRootProps as AtomSkipLinkRootProps,
  type SkipLinkTargetProps as AtomSkipLinkTargetProps,
} from "@flowstack-ui/atom/skip-link";

export type SkipLinkRootProps = AtomSkipLinkRootProps;
export type SkipLinkTargetProps = AtomSkipLinkTargetProps;

function mergeClassName(base: string, className: string | undefined) {
  return className ? `${base} ${className}` : base;
}

export const SkipLinkRoot = forwardRef<HTMLAnchorElement, SkipLinkRootProps>(
  function SkipLinkRoot(
    { className, "data-slot": dataSlot, ...props },
    ref,
  ) {
    return (
      <AtomSkipLink.Root
        {...props}
        className={mergeClassName("brick-skip-link", className)}
        data-slot={dataSlot ?? "skip-link"}
        ref={ref}
      />
    );
  },
);

SkipLinkRoot.displayName = "SkipLink.Root";

export const SkipLinkTarget = forwardRef<HTMLElement, SkipLinkTargetProps>(
  function SkipLinkTarget(
    { className, "data-slot": dataSlot, ...props },
    ref,
  ) {
    return (
      <AtomSkipLink.Target
        {...props}
        className={mergeClassName("brick-skip-link__target", className)}
        data-slot={dataSlot ?? "skip-link-target"}
        ref={ref}
      />
    );
  },
);

SkipLinkTarget.displayName = "SkipLink.Target";

export const SkipLink = Object.freeze({
  Root: SkipLinkRoot,
  Target: SkipLinkTarget,
});

