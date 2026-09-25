import { forwardRef, type ReactElement } from "react";
import { Float, type FloatRootProps } from "../float/Float.js";
import { NotificationCount } from "./notification-badge/NotificationCount.js";
import { radiusStyle, type RadiusShapeProps } from "../_radius/Radius.js";
import { responsiveDataAttributes, type ResponsiveValue } from "../_responsive-value/ResponsiveValue.js";
import {
  Badge as AtomBadge,
  type BadgeRootProps as AtomBadgeRootProps,
} from "@flowstack-ui/atom/badge";

export type BadgeVariant = "soft" | "solid" | "outline" | "surface" | "plain";

export type BadgeTone =
  "neutral" | "accent" | "info" | "success" | "warning" | "danger";

export type BadgeSize = "xs" | "sm" | "md" | "lg" | "xl";
export type BadgeShape = "rounded" | "pill" | "circle";

export type BadgeProps = Omit<AtomBadgeRootProps, "color"> & RadiusShapeProps<BadgeShape> & {
  variant?: ResponsiveValue<BadgeVariant>;
  tone?: BadgeTone;
  size?: ResponsiveValue<BadgeSize>;
};

export type NotificationBadgePlacement =
  "top-start" | "top-end" | "bottom-start" | "bottom-end";

export type NotificationBadgeOverlap = "rectangular" | "circular";
export type NotificationBadgeSize = "xs" | "sm" | "md" | "lg" | "xl";

type NotificationBadgeBaseProps = Omit<
  AtomBadgeRootProps,
  "asChild" | "children" | "color"
> & {
  children: ReactElement;
  tone?: BadgeTone | "contrast";
  size?: ResponsiveValue<NotificationBadgeSize>;
  placement?: ResponsiveValue<NotificationBadgePlacement>;
  offset?: FloatRootProps["offset"];
  offsetInline?: FloatRootProps["offsetInline"];
  offsetBlock?: FloatRootProps["offsetBlock"];
  bordered?: boolean;
  locale?: string;
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
  return max !== undefined &&
    Number.isFinite(max) &&
    Number.isInteger(max) &&
    max > 0
    ? max
    : 99;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    variant = "soft",
    tone = "neutral",
    size = "md",
    shape = "rounded",
    radius,
    style,
    className,
    ...props
  },
  ref,
) {
  return (
    <AtomBadge.Root
      {...props}
      className={mergeClassName("brick-badge", className)}
      data-shape={radius === undefined ? shape : "rounded"}
      style={radiusStyle(radius, "--brick-badge-radius", style)}
      {...responsiveDataAttributes("data-size", size, { defaultValue: "md", alwaysInitial: true })}
      data-tone={tone}
      {...responsiveDataAttributes("data-variant", variant, { defaultValue: "soft", alwaysInitial: true })}
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
    offset,
    offsetInline,
    offsetBlock,
    bordered = true,
    locale,
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
  const overflowed = !isDot && count !== undefined && count > maximum;
  const content = overflowed ? maximum : count;
  const shape =
    isDot || (!overflowed && typeof content === "number" && content < 10) ? "circle" : "pill";
  const baseOffset = overlap === "circular" ? "14.6447%" : 0;
  const resolvedOffset = typeof offset === "object" && offset !== null
    ? { initial: baseOffset, ...offset }
    : offset ?? baseOffset;

  return (
    <AtomBadge.Root
      {...props}
      className={mergeClassName("brick-notification-badge", className)}
      data-invisible={!showIndicator ? "" : undefined}
      data-overlap={overlap}
      {...responsiveDataAttributes("data-placement", placement, { defaultValue: "top-end", alwaysInitial: true })}
      {...responsiveDataAttributes("data-size", size, { defaultValue: "md", alwaysInitial: true })}
      data-bordered={bordered ? "" : undefined}
      data-slot={dataSlot}
      data-tone={tone}
      ref={ref}
    >
      {children}
      {showIndicator ? (
        <Float.Root
          as="span"
          placement={placement}
          offset={resolvedOffset}
          offsetInline={offsetInline}
          offsetBlock={offsetBlock}
          aria-hidden="true"
          className="brick-notification-badge__indicator"
          data-shape={shape}
          slot="notification-badge-indicator"
          data-variant={isDot ? "dot" : "count"}
        >
          {isDot ? null : <NotificationCount value={content!} locale={locale} overflowed={overflowed} />}
        </Float.Root>
      ) : null}
    </AtomBadge.Root>
  );
});

Badge.displayName = "Badge";
NotificationBadge.displayName = "NotificationBadge";
