import {
  createElement,
  forwardRef,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import { layoutHost } from "../_internal/layout-host.js";
import {
  responsiveDataAttributes,
  type ResponsiveValue,
} from "../_responsive-value/ResponsiveValue.js";
export type StatusSize = "sm" | "md" | "lg";
export type StatusTone =
  | "neutral"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "danger";
type HostProps =
  | { asChild?: false; children?: ReactNode }
  | { asChild: true; children: ReactElement };
export type StatusRootProps = Omit<
  HTMLAttributes<HTMLSpanElement>,
  "children" | "color"
> &
  HostProps & {
    size?: ResponsiveValue<StatusSize>;
    tone?: StatusTone;
    "data-slot"?: string;
  };
export type StatusPartProps = Omit<
  HTMLAttributes<HTMLSpanElement>,
  "children" | "color" | "aria-hidden"
> &
  HostProps & { "data-slot"?: string };
function classes(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}
export const StatusRoot = forwardRef<HTMLSpanElement, StatusRootProps>(
  function StatusRoot(
    {
      asChild = false,
      children,
      className,
      size = "md",
      tone = "neutral",
      "data-slot": slot = "status-root",
      ...native
    },
    ref,
  ) {
    const props = {
      ...native,
      className: classes("brick-status", className),
      ...responsiveDataAttributes("data-size", size, {
        defaultValue: "md",
        alwaysInitial: true,
      }),
      "data-slot": slot,
      "data-tone": tone,
    };
    return asChild
      ? layoutHost(children, props, ref, "Status.Root")
      : createElement("span", { ...props, ref }, children);
  },
);
export const StatusIndicator = forwardRef<HTMLSpanElement, StatusPartProps>(
  function StatusIndicator(
    {
      asChild = false,
      children,
      className,
      "data-slot": slot = "status-indicator",
      ...native
    },
    ref,
  ) {
    const props = {
      ...native,
      "aria-hidden": true,
      className: classes("brick-status__indicator", className),
      "data-slot": slot,
    };
    return asChild
      ? layoutHost(children, props, ref, "Status.Indicator")
      : createElement("span", { ...props, ref }, children);
  },
);
export const StatusLabel = forwardRef<HTMLSpanElement, StatusPartProps>(
  function StatusLabel(
    {
      asChild = false,
      children,
      className,
      "data-slot": slot = "status-label",
      ...native
    },
    ref,
  ) {
    const props = {
      ...native,
      className: classes("brick-status__label", className),
      "data-slot": slot,
    };
    return asChild
      ? layoutHost(children, props, ref, "Status.Label")
      : createElement("span", { ...props, ref }, children);
  },
);
StatusRoot.displayName = "Status.Root";
StatusIndicator.displayName = "Status.Indicator";
StatusLabel.displayName = "Status.Label";
export const Status = Object.freeze({
  Root: StatusRoot,
  Indicator: StatusIndicator,
  Label: StatusLabel,
});
