import { forwardRef } from "react";
import {
  Breadcrumb as AtomBreadcrumb,
  type BreadcrumbEllipsisProps as AtomBreadcrumbEllipsisProps,
  type BreadcrumbItemProps as AtomBreadcrumbItemProps,
  type BreadcrumbLinkProps as AtomBreadcrumbLinkProps,
  type BreadcrumbListProps as AtomBreadcrumbListProps,
  type BreadcrumbPageProps as AtomBreadcrumbPageProps,
  type BreadcrumbRootProps as AtomBreadcrumbRootProps,
  type BreadcrumbSeparatorProps as AtomBreadcrumbSeparatorProps,
} from "@flowstack-ui/atom/breadcrumb";

export type BreadcrumbSize = "sm" | "md" | "lg";
export type BreadcrumbVariant = "plain" | "underline";

export interface BreadcrumbRootProps extends AtomBreadcrumbRootProps {
  /** Typography and spacing recipe for the complete trail. @default "md" */
  size?: BreadcrumbSize;
  /** Ancestor-link decoration recipe. @default "plain" */
  variant?: BreadcrumbVariant;
}

export type BreadcrumbListProps = AtomBreadcrumbListProps;
export type BreadcrumbItemProps = AtomBreadcrumbItemProps;
export type BreadcrumbLinkProps = AtomBreadcrumbLinkProps;
export type BreadcrumbPageProps = AtomBreadcrumbPageProps;
export type BreadcrumbSeparatorProps = AtomBreadcrumbSeparatorProps;
export type BreadcrumbEllipsisProps = AtomBreadcrumbEllipsisProps;

function mergeClassName(base: string, className: string | undefined) {
  return className ? `${base} ${className}` : base;
}

export const BreadcrumbRoot = forwardRef<HTMLElement, BreadcrumbRootProps>(
  function BreadcrumbRoot(
    {
      className,
      size = "md",
      variant = "plain",
      "data-slot": dataSlot,
      ...props
    },
    ref,
  ) {
    return (
      <AtomBreadcrumb.Root
        {...props}
        className={mergeClassName("brick-breadcrumb", className)}
        data-size={size}
        data-slot={dataSlot ?? "breadcrumb"}
        data-variant={variant}
        ref={ref}
      />
    );
  },
);

export const BreadcrumbList = forwardRef<HTMLOListElement, BreadcrumbListProps>(
  function BreadcrumbList({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomBreadcrumb.List
        {...props}
        className={mergeClassName("brick-breadcrumb-list", className)}
        data-slot={dataSlot ?? "breadcrumb-list"}
        ref={ref}
      />
    );
  },
);

export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  function BreadcrumbItem({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomBreadcrumb.Item
        {...props}
        className={mergeClassName("brick-breadcrumb-item", className)}
        data-slot={dataSlot ?? "breadcrumb-item"}
        ref={ref}
      />
    );
  },
);

export const BreadcrumbLink = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  function BreadcrumbLink({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomBreadcrumb.Link
        {...props}
        className={mergeClassName("brick-breadcrumb-link", className)}
        data-slot={dataSlot ?? "breadcrumb-link"}
        ref={ref}
      />
    );
  },
);

export const BreadcrumbPage = forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  function BreadcrumbPage({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <AtomBreadcrumb.Page
        {...props}
        className={mergeClassName("brick-breadcrumb-page", className)}
        data-slot={dataSlot ?? "breadcrumb-page"}
        ref={ref}
      />
    );
  },
);

export const BreadcrumbSeparator = forwardRef<
  HTMLLIElement,
  BreadcrumbSeparatorProps
>(function BreadcrumbSeparator(
  { className, "data-slot": dataSlot, ...props },
  ref,
) {
  return (
    <AtomBreadcrumb.Separator
      {...props}
      className={mergeClassName("brick-breadcrumb-separator", className)}
      data-slot={dataSlot ?? "breadcrumb-separator"}
      ref={ref}
    />
  );
});

export const BreadcrumbEllipsis = forwardRef<
  HTMLSpanElement,
  BreadcrumbEllipsisProps
>(function BreadcrumbEllipsis(
  { className, "data-slot": dataSlot, ...props },
  ref,
) {
  return (
    <AtomBreadcrumb.Ellipsis
      {...props}
      className={mergeClassName("brick-breadcrumb-ellipsis", className)}
      data-slot={dataSlot ?? "breadcrumb-ellipsis"}
      ref={ref}
    />
  );
});

BreadcrumbRoot.displayName = "Breadcrumb.Root";
BreadcrumbList.displayName = "Breadcrumb.List";
BreadcrumbItem.displayName = "Breadcrumb.Item";
BreadcrumbLink.displayName = "Breadcrumb.Link";
BreadcrumbPage.displayName = "Breadcrumb.Page";
BreadcrumbSeparator.displayName = "Breadcrumb.Separator";
BreadcrumbEllipsis.displayName = "Breadcrumb.Ellipsis";

export const Breadcrumb = Object.freeze({
  Root: BreadcrumbRoot,
  List: BreadcrumbList,
  Item: BreadcrumbItem,
  Link: BreadcrumbLink,
  Page: BreadcrumbPage,
  Separator: BreadcrumbSeparator,
  Ellipsis: BreadcrumbEllipsis,
});
