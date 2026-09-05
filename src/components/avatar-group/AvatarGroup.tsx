"use client";

import {
  Children,
  createElement,
  forwardRef,
  type CSSProperties,
  type ForwardedRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import {
  Avatar,
  type AvatarShape,
  type AvatarSize,
} from "../avatar/Avatar.js";
import { AvatarGroupPresentationContext } from "./AvatarGroupContext.js";

export type AvatarGroupElement = "div" | "span";
export type AvatarGroupOverlap = "none" | "sm" | "md" | "lg";
export type AvatarGroupStacking = "first-on-top" | "last-on-top";

type AvatarGroupNativeProps = Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "className" | "color" | "style"
>;

interface AvatarGroupBaseProps extends AvatarGroupNativeProps {
  as?: AvatarGroupElement;
  children?: ReactNode;
  className?: string;
  overlap?: AvatarGroupOverlap;
  shape?: AvatarShape;
  size?: AvatarSize;
  slot?: string;
  stacking?: AvatarGroupStacking;
  style?: CSSProperties;
}

interface AvatarGroupWithoutOverflow {
  max?: undefined;
  overflowLabel?: never;
  renderOverflow?: never;
  total?: never;
}

interface AvatarGroupWithDefaultOverflow {
  max: number;
  overflowLabel: (count: number) => string;
  renderOverflow?: never;
  total?: number;
}

interface AvatarGroupWithCustomOverflow {
  max: number;
  overflowLabel?: never;
  renderOverflow: (count: number) => ReactNode;
  total?: number;
}

export type AvatarGroupProps = AvatarGroupBaseProps &
  (
    | AvatarGroupWithoutOverflow
    | AvatarGroupWithDefaultOverflow
    | AvatarGroupWithCustomOverflow
  );

function mergeClassName(className: string | undefined) {
  return className
    ? `brick-avatar-group ${className}`
    : "brick-avatar-group";
}

function normalizeSlotBudget(max: number) {
  if (!Number.isFinite(max)) return 1;
  return Math.max(1, Math.floor(max));
}

function normalizeTotal(total: number | undefined, childCount: number) {
  if (total === undefined || !Number.isFinite(total)) return childCount;
  return Math.max(Math.max(0, Math.floor(total)), childCount);
}

function AvatarGroupImpl(
  {
    as = "div",
    children,
    className,
    max,
    overlap = "md",
    overflowLabel,
    renderOverflow,
    shape = "circle",
    size = "md",
    slot = "avatar-group",
    stacking = "last-on-top",
    style,
    total,
    ...props
  }: AvatarGroupProps,
  ref: ForwardedRef<HTMLElement>,
) {
  const childItems = Children.toArray(children);
  const childCount = childItems.length;
  const totalCount = normalizeTotal(total, childCount);
  const slotBudget = max === undefined ? childCount : normalizeSlotBudget(max);
  const hasOverflow =
    max !== undefined && (childCount > slotBudget || totalCount > childCount);
  const visibleCount = hasOverflow
    ? Math.min(childCount, Math.max(0, slotBudget - 1))
    : childCount;
  const visibleChildren = childItems.slice(0, visibleCount);
  const overflowCount = hasOverflow ? totalCount - visibleCount : 0;
  const itemCount = visibleChildren.length + (hasOverflow ? 1 : 0);

  const items = visibleChildren.map((child, index) => (
    <span
      className="brick-avatar-group__item"
      data-slot="avatar-group-item"
      key={(child as { key?: string | number | null }).key ?? index}
      style={{
        "--brick-avatar-group-item-order":
          stacking === "first-on-top" ? itemCount - index : index + 1,
      } as CSSProperties}
    >
      {child}
    </span>
  ));

  if (hasOverflow) {
    const overflow = renderOverflow ? (
      renderOverflow(overflowCount)
    ) : (
      <Avatar
        alt={overflowLabel!(overflowCount)}
        data-slot="avatar-group-overflow-avatar"
        fallback={`+${overflowCount}`}
      />
    );

    items.push(
      <span
        className="brick-avatar-group__item brick-avatar-group__overflow"
        data-count={overflowCount}
        data-slot="avatar-group-overflow"
        key="avatar-group-overflow"
        style={{
          "--brick-avatar-group-item-order":
            stacking === "first-on-top" ? 1 : visibleChildren.length + 1,
        } as CSSProperties}
      >
        {overflow}
      </span>,
    );
  }

  return (
    <AvatarGroupPresentationContext.Provider value={{ shape, size }}>
      {createElement(
        as,
        {
          ...props,
          className: mergeClassName(className),
          "data-count": totalCount,
          "data-overlap": overlap,
          "data-shape": shape,
          "data-size": size,
          "data-slot": slot,
          "data-stacking": stacking,
          ref,
          style,
        },
        items,
      )}
    </AvatarGroupPresentationContext.Provider>
  );
}

export const AvatarGroup = forwardRef<HTMLElement, AvatarGroupProps>(
  AvatarGroupImpl,
);
AvatarGroup.displayName = "AvatarGroup";
