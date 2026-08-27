import { forwardRef, type ReactNode } from "react";
import {
  Pagination as AtomPagination,
  type PaginationControlProps as AtomPaginationControlProps,
  type PaginationEllipsisProps as AtomPaginationEllipsisProps,
  type PaginationItemProps as AtomPaginationItemProps,
  type PaginationItemsProps as AtomPaginationItemsProps,
  type PaginationListProps as AtomPaginationListProps,
  type PaginationRootProps as AtomPaginationRootProps,
} from "@flowstack-ui/atom/pagination";
import { Icon } from "../icon/index.js";

export type PaginationVariant = "plain" | "soft" | "outline";
export type PaginationBoundaryVariant = "plain" | "outline";
export type PaginationSize = "sm" | "md" | "lg";

export interface PaginationRootProps extends AtomPaginationRootProps {
  /** Previous and Next control recipe. @default "plain" */
  boundaryVariant?: PaginationBoundaryVariant;
  /** Containing surface recipe. @default "plain" */
  variant?: PaginationVariant;
  /** Control and type scale. @default "md" */
  size?: PaginationSize;
}

export type PaginationListProps = AtomPaginationListProps;
export type PaginationPreviousProps = AtomPaginationControlProps;
export type PaginationItemsProps = AtomPaginationItemsProps;
export type PaginationItemProps = AtomPaginationItemProps;
export type PaginationEllipsisProps = AtomPaginationEllipsisProps;
export type PaginationNextProps = AtomPaginationControlProps;

function mergeClassName(base: string, className: string | undefined) {
  return className ? `${base} ${className}` : base;
}

function DirectionIcon({ direction }: { direction: "previous" | "next" }) {
  return (
    <Icon className="brick-pagination__icon" directional size="sm">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d={direction === "previous" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
      </svg>
    </Icon>
  );
}

export const PaginationRoot = forwardRef<HTMLElement, PaginationRootProps>(
  function PaginationRoot({ boundaryVariant = "plain", className, size = "md", variant = "plain", "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomPagination.Root
        {...props}
        className={mergeClassName("brick-pagination", className)}
        data-boundary-variant={boundaryVariant === "plain" ? undefined : boundaryVariant}
        data-size={size}
        data-slot={dataSlot ?? "pagination"}
        data-variant={variant}
        ref={ref}
      />
    );
  },
);

export const PaginationList = forwardRef<HTMLOListElement, PaginationListProps>(
  function PaginationList({ className, "data-slot": dataSlot, ...props }, ref) {
    return <AtomPagination.List {...props} className={mergeClassName("brick-pagination__list", className)} data-slot={dataSlot ?? "pagination-list"} ref={ref} />;
  },
);

function controlChildren(children: ReactNode, direction: "previous" | "next") {
  return children ?? <DirectionIcon direction={direction} />;
}

export const PaginationPrevious = forwardRef<HTMLElement, PaginationPreviousProps>(
  function PaginationPrevious({ children, className, "data-slot": dataSlot, ...props }, ref) {
    return <AtomPagination.Previous {...props} className={mergeClassName("brick-pagination__previous", className)} data-slot={dataSlot ?? "pagination-previous"} ref={ref}>{controlChildren(children, "previous")}</AtomPagination.Previous>;
  },
);

export function PaginationItems({ itemProps, ellipsisProps }: PaginationItemsProps) {
  return (
    <AtomPagination.Items
      itemProps={{ ...itemProps, className: mergeClassName("brick-pagination__item", itemProps?.className), "data-slot": itemProps?.["data-slot"] ?? "pagination-item" }}
      ellipsisProps={{ ...ellipsisProps, className: mergeClassName("brick-pagination__ellipsis", ellipsisProps?.className), "data-slot": ellipsisProps?.["data-slot"] ?? "pagination-ellipsis" }}
    />
  );
}

export const PaginationItem = forwardRef<HTMLElement, PaginationItemProps>(
  function PaginationItem({ className, "data-slot": dataSlot, ...props }, ref) {
    return <AtomPagination.Item {...props} className={mergeClassName("brick-pagination__item", className)} data-slot={dataSlot ?? "pagination-item"} ref={ref} />;
  },
);

export const PaginationEllipsis = forwardRef<HTMLSpanElement, PaginationEllipsisProps>(
  function PaginationEllipsis({ className, "data-slot": dataSlot, ...props }, ref) {
    return <AtomPagination.Ellipsis {...props} className={mergeClassName("brick-pagination__ellipsis", className)} data-slot={dataSlot ?? "pagination-ellipsis"} ref={ref} />;
  },
);

export const PaginationNext = forwardRef<HTMLElement, PaginationNextProps>(
  function PaginationNext({ children, className, "data-slot": dataSlot, ...props }, ref) {
    return <AtomPagination.Next {...props} className={mergeClassName("brick-pagination__next", className)} data-slot={dataSlot ?? "pagination-next"} ref={ref}>{controlChildren(children, "next")}</AtomPagination.Next>;
  },
);

PaginationRoot.displayName = "Pagination.Root";
PaginationList.displayName = "Pagination.List";
PaginationPrevious.displayName = "Pagination.Previous";
PaginationItem.displayName = "Pagination.Item";
PaginationEllipsis.displayName = "Pagination.Ellipsis";
PaginationNext.displayName = "Pagination.Next";

export const Pagination = Object.freeze({
  Root: PaginationRoot,
  List: PaginationList,
  Previous: PaginationPrevious,
  Items: PaginationItems,
  Item: PaginationItem,
  Ellipsis: PaginationEllipsis,
  Next: PaginationNext,
});
