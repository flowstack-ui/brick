import { forwardRef, type ReactElement } from "react";
import {
  Badge as AtomBadge,
  type BadgeRootProps as AtomBadgeRootProps,
} from "@flowstack-ui/atom/badge";

export type BadgeVariant = "soft" | "solid" | "outline";

export type BadgeTone =
  | "neutral"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "danger";

export type BadgeSize = "sm" | "md" | "lg";
export type BadgeShape = "rounded" | "pill";

export type BadgeProps = Omit<AtomBadgeRootProps, "color"> & {
  variant?: BadgeVariant;
  tone?: BadgeTone;
  size?: BadgeSize;
  shape?: BadgeShape;
};

export type NotificationBadgePlacement =
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end";

export type NotificationBadgeOverlap = "rectangular" | "circular";
export type NotificationBadgeSize = "sm" | "md" | "lg";

type NotificationBadgeBaseProps = Omit<
  AtomBadgeRootProps,
  "asChild" | "children" | "color"
> & {
  children: ReactElement;
  tone?: BadgeTone;
  size?: NotificationBadgeSize;
  placement?: NotificationBadgePlacement;
  overlap?: NotificationBadgeOverlap;
  invisible?: boolean;
};

type NotificationBadgeCountProps = {
  count: number;
  dot?: false;
  max?: number;
  showZero?: boolean;
};

type NotificationBadgeDotProps = {
  dot: true;
  count?: never;
  max?: never;
  showZero?: never;
};

export type NotificationBadgeProps = NotificationBadgeBaseProps &
  (NotificationBadgeCountProps | NotificationBadgeDotProps);

function mergeClassName(base: string, className: string | undefined) {
  return className ? `${base} ${className}` : base;
}

function isValidCount(count: number) {
  return Number.isFinite(count) && Number.isInteger(count) && count >= 0;
}

function resolveMaximum(max: number | undefined) {
  return max !== undefined && Number.isFinite(max) && Number.isInteger(max) && max > 0
    ? max
    : 99;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    variant = "soft",
    tone = "neutral",
    size = "md",
    shape = "rounded",
    className,
    ...props
  },
  ref,
) {
  return (
    <AtomBadge.Root
      {...props}
      className={mergeClassName("brick-badge", className)}
      data-shape={shape}
      data-size={size}
      data-tone={tone}
      data-variant={variant}
      ref={ref}
    />
  );
});

export const NotificationBadge = forwardRef<
  HTMLSpanElement,
  NotificationBadgeProps
>(function NotificationBadge(
  {
    children,
    tone = "danger",
    size = "md",
    placement = "top-end",
    overlap = "rectangular",
    invisible = false,
    count,
    dot = false,
    max,
    showZero = false,
    className,
    "data-slot": dataSlot = "notification-badge",
    ...props
  },
  ref,
) {
  const isDot = dot === true;
  const maximum = resolveMaximum(max);
  const showIndicator =
    !invisible &&
    (isDot ||
      (count !== undefined &&
        isValidCount(count) &&
        (count !== 0 || showZero)));
  const content =
    !isDot && count !== undefined && count > maximum ? `${maximum}+` : count;
  const shape = isDot || (typeof content === "number" && content < 10) ? "circle" : "pill";

  return (
    <AtomBadge.Root
      {...props}
      className={mergeClassName("brick-notification-badge", className)}
      data-invisible={!showIndicator ? "" : undefined}
      data-overlap={overlap}
      data-placement={placement}
      data-size={size}
      data-slot={dataSlot}
      data-tone={tone}
      ref={ref}
    >
      {children}
      {showIndicator ? (
        <span
          aria-hidden="true"
          className="brick-notification-badge__indicator"
          data-shape={shape}
          data-slot="notification-badge-indicator"
          data-variant={isDot ? "dot" : "count"}
        >
          {isDot ? null : content}
        </span>
      ) : null}
    </AtomBadge.Root>
  );
});

Badge.displayName = "Badge";
NotificationBadge.displayName = "NotificationBadge";
