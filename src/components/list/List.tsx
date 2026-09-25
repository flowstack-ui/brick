import { responsiveSpacingStyles, type SpacingValue } from "../_spacing-value/SpacingValue.js";
import type { ResponsiveValue } from "../_responsive-value/ResponsiveValue.js";
import { radiusStyle, type Radius } from "../_radius/Radius.js";
import { forwardRef, type HTMLAttributes, type ReactElement, type ReactNode } from "react";
import { staticPart } from "../_internal/StaticPart.js";
import type { TextTone } from "../text/Text.js";
import {
  List as AtomList,
  type ListItemProps as AtomListItemProps,
  type ListRootProps as AtomListRootProps,
} from "@flowstack-ui/atom/list";

export type ListVariant = "plain" | "divided" | "bordered";
export type ListSize = "inherit" | "sm" | "md" | "lg";
export type ListDensity = "none" | "compact" | "comfortable";
export type ListAlign = "start" | "center" | "end";
export type ListInset = "default" | "none";
export type ListMarker = "auto" | "disc" | "circle" | "square" | "decimal" | "lower-alpha" | "upper-alpha" | "lower-roman" | "upper-roman" | "none";

export interface ListRootProps extends AtomListRootProps {
  radius?: Radius;
  gap?: ResponsiveValue<SpacingValue>;
  nestedInset?: ResponsiveValue<SpacingValue>;
  markerTone?: TextTone;
  variant?: ListVariant;
  size?: ListSize;
  density?: ListDensity;
  align?: ListAlign;
  inset?: ListInset;
  marker?: ListMarker;
}
export interface ListItemProps extends AtomListItemProps { selected?: boolean; markerTone?: TextTone; }

type SlottedProps<T> = Omit<T, "children"> & { "data-slot"?: string } & (
  | { asChild?: false; children?: ReactNode }
  | { asChild: true; children: ReactElement }
);
export type ListLeadingProps = SlottedProps<HTMLAttributes<HTMLSpanElement>>;
export type ListContentProps = SlottedProps<HTMLAttributes<HTMLDivElement>>;
export type ListTitleProps = SlottedProps<HTMLAttributes<HTMLSpanElement>>;
export type ListDescriptionProps = SlottedProps<HTMLAttributes<HTMLSpanElement>>;
export type ListTrailingProps = SlottedProps<HTMLAttributes<HTMLDivElement>>;

function mergeClassName(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

function slotOrDefault(slot: string | undefined, fallback: string) {
  return slot ?? fallback;
}

const ListRoot = forwardRef<HTMLUListElement | HTMLOListElement, ListRootProps>(function ListRoot(
  { variant = "plain", size = "md", density = "comfortable", align = "start", inset = "default", marker = "auto", gap, nestedInset, markerTone, className, radius, style, role, "data-slot": dataSlot, ...props },
  ref,
) {
  return <AtomList.Root {...props} className={mergeClassName("brick-list", className)} style={radiusStyle(radius, "--brick-list-radius", { ...(gap === undefined ? {} : responsiveSpacingStyles("--brick-list-gap", gap)), ...(nestedInset === undefined ? {} : responsiveSpacingStyles("--brick-list-nested-inset", nestedInset)), ...style })} data-marker-tone={markerTone} data-align={align} data-density={density} data-inset={inset} data-marker={marker} data-size={size} data-slot={slotOrDefault(dataSlot, "list")} data-variant={variant} ref={ref} role={role ?? (marker === "none" ? "list" : undefined)} />;
});

const ListItem = forwardRef<HTMLLIElement, ListItemProps>(function ListItem(
  { asChild, children, className, selected = false, markerTone, "data-slot": dataSlot, ...props },
  ref,
) {
  return <AtomList.Item {...props} asChild={asChild} className={mergeClassName("brick-list__item", className)} data-marker-tone={markerTone} data-selected={selected ? "" : undefined} data-slot={slotOrDefault(dataSlot, "list-item")} ref={ref}>{asChild ? children : <div className="brick-list__row">{children}</div>}</AtomList.Item>;
});

const ListLeading = forwardRef<HTMLSpanElement, ListLeadingProps>(function ListLeading({ className, "data-slot": dataSlot, ...props }, ref) {
  return staticPart("span", { ...props, className, "data-slot": dataSlot }, ref, "brick-list__leading", "list-leading");
});
const ListContent = forwardRef<HTMLDivElement, ListContentProps>(function ListContent({ className, "data-slot": dataSlot, ...props }, ref) {
  return staticPart("div", { ...props, className, "data-slot": dataSlot }, ref, "brick-list__content", "list-content");
});
const ListTitle = forwardRef<HTMLSpanElement, ListTitleProps>(function ListTitle({ className, "data-slot": dataSlot, ...props }, ref) {
  return staticPart("span", { ...props, className, "data-slot": dataSlot }, ref, "brick-list__title", "list-title");
});
const ListDescription = forwardRef<HTMLSpanElement, ListDescriptionProps>(function ListDescription({ className, "data-slot": dataSlot, ...props }, ref) {
  return staticPart("span", { ...props, className, "data-slot": dataSlot }, ref, "brick-list__description", "list-description");
});
const ListTrailing = forwardRef<HTMLDivElement, ListTrailingProps>(function ListTrailing({ className, "data-slot": dataSlot, ...props }, ref) {
  return staticPart("div", { ...props, className, "data-slot": dataSlot }, ref, "brick-list__trailing", "list-trailing");
});

ListRoot.displayName = "List.Root";
ListItem.displayName = "List.Item";
ListLeading.displayName = "List.Leading";
ListContent.displayName = "List.Content";
ListTitle.displayName = "List.Title";
ListDescription.displayName = "List.Description";
ListTrailing.displayName = "List.Trailing";

export const List = Object.freeze({ Root: ListRoot, Item: ListItem, Leading: ListLeading, Content: ListContent, Title: ListTitle, Description: ListDescription, Trailing: ListTrailing });
