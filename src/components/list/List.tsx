import { forwardRef, type HTMLAttributes } from "react";
import {
  List as AtomList,
  type ListItemProps as AtomListItemProps,
  type ListRootProps as AtomListRootProps,
} from "@flowstack-ui/atom/list";

export type ListVariant = "plain" | "divided" | "bordered";
export type ListSize = "sm" | "md" | "lg";
export type ListDensity = "compact" | "comfortable";
export type ListAlign = "start" | "center" | "end";
export type ListInset = "default" | "none";
export type ListMarker = "auto" | "disc" | "circle" | "square" | "decimal" | "lower-alpha" | "upper-alpha" | "lower-roman" | "upper-roman" | "none";

export interface ListRootProps extends AtomListRootProps {
  variant?: ListVariant;
  size?: ListSize;
  density?: ListDensity;
  align?: ListAlign;
  inset?: ListInset;
  marker?: ListMarker;
}
export interface ListItemProps extends AtomListItemProps {}

type SlottedProps<T> = T & { "data-slot"?: string };
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
  { variant = "plain", size = "md", density = "comfortable", align = "start", inset = "default", marker = "auto", className, role, "data-slot": dataSlot, ...props },
  ref,
) {
  return <AtomList.Root {...props} className={mergeClassName("brick-list", className)} data-align={align} data-density={density} data-inset={inset} data-marker={marker} data-size={size} data-slot={slotOrDefault(dataSlot, "list")} data-variant={variant} ref={ref} role={role ?? (marker === "none" ? "list" : undefined)} />;
});

const ListItem = forwardRef<HTMLLIElement, ListItemProps>(function ListItem(
  { asChild, children, className, "data-slot": dataSlot, ...props },
  ref,
) {
  return <AtomList.Item {...props} asChild={asChild} className={mergeClassName("brick-list__item", className)} data-slot={slotOrDefault(dataSlot, "list-item")} ref={ref}>{asChild ? children : <div className="brick-list__row">{children}</div>}</AtomList.Item>;
});

const ListLeading = forwardRef<HTMLSpanElement, ListLeadingProps>(function ListLeading({ className, "data-slot": dataSlot, ...props }, ref) {
  return <span {...props} className={mergeClassName("brick-list__leading", className)} data-slot={slotOrDefault(dataSlot, "list-leading")} ref={ref} />;
});
const ListContent = forwardRef<HTMLDivElement, ListContentProps>(function ListContent({ className, "data-slot": dataSlot, ...props }, ref) {
  return <div {...props} className={mergeClassName("brick-list__content", className)} data-slot={slotOrDefault(dataSlot, "list-content")} ref={ref} />;
});
const ListTitle = forwardRef<HTMLSpanElement, ListTitleProps>(function ListTitle({ className, "data-slot": dataSlot, ...props }, ref) {
  return <span {...props} className={mergeClassName("brick-list__title", className)} data-slot={slotOrDefault(dataSlot, "list-title")} ref={ref} />;
});
const ListDescription = forwardRef<HTMLSpanElement, ListDescriptionProps>(function ListDescription({ className, "data-slot": dataSlot, ...props }, ref) {
  return <span {...props} className={mergeClassName("brick-list__description", className)} data-slot={slotOrDefault(dataSlot, "list-description")} ref={ref} />;
});
const ListTrailing = forwardRef<HTMLDivElement, ListTrailingProps>(function ListTrailing({ className, "data-slot": dataSlot, ...props }, ref) {
  return <div {...props} className={mergeClassName("brick-list__trailing", className)} data-slot={slotOrDefault(dataSlot, "list-trailing")} ref={ref} />;
});

ListRoot.displayName = "List.Root";
ListItem.displayName = "List.Item";
ListLeading.displayName = "List.Leading";
ListContent.displayName = "List.Content";
ListTitle.displayName = "List.Title";
ListDescription.displayName = "List.Description";
ListTrailing.displayName = "List.Trailing";

export const List = Object.freeze({ Root: ListRoot, Item: ListItem, Leading: ListLeading, Content: ListContent, Title: ListTitle, Description: ListDescription, Trailing: ListTrailing });
