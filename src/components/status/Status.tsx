import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";

export type StatusSize = "sm" | "md" | "lg";
export type StatusTone =
  | "neutral"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "danger";

export interface StatusRootProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "children" | "color"> {
  children?: ReactNode;
  size?: StatusSize;
  tone?: StatusTone;
  "data-slot"?: string;
}

export interface StatusPartProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "children" | "color" | "aria-hidden"> {
  children?: ReactNode;
  "data-slot"?: string;
}

function classes(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

export const StatusRoot = forwardRef<HTMLSpanElement, StatusRootProps>(
  function StatusRoot(
    {
      className,
      size = "md",
      tone = "neutral",
      "data-slot": slot = "status-root",
      ...props
    },
    ref,
  ) {
    return (
      <span
        {...props}
        className={classes("brick-status", className)}
        data-size={size}
        data-slot={slot}
        data-tone={tone}
        ref={ref}
      />
    );
  },
);

export const StatusIndicator = forwardRef<HTMLSpanElement, StatusPartProps>(
  function StatusIndicator(
    {
      className,
      "data-slot": slot = "status-indicator",
      ...props
    },
    ref,
  ) {
    return (
      <span
        {...props}
        aria-hidden="true"
        className={classes("brick-status__indicator", className)}
        data-slot={slot}
        ref={ref}
      />
    );
  },
);

export const StatusLabel = forwardRef<HTMLSpanElement, StatusPartProps>(
  function StatusLabel(
    { className, "data-slot": slot = "status-label", ...props },
    ref,
  ) {
    return (
      <span
        {...props}
        className={classes("brick-status__label", className)}
        data-slot={slot}
        ref={ref}
      />
    );
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
