"use client";

import {
  createContext,
  forwardRef,
  useContext,
  type ReactElement,
  type ReactNode,
} from "react";
import { responsiveDataAttributes, type ResponsiveValue } from "../_responsive-value/ResponsiveValue.js";
import {
  TableOfContents as Atom,
  type TableOfContentsRootProps as AtomRootProps,
  type TableOfContentsRootProviderProps as AtomProviderProps,
  type TableOfContentsNavProps as AtomNavProps,
  type TableOfContentsTitleProps as AtomTitleProps,
  type TableOfContentsListProps as AtomListProps,
  type TableOfContentsItemProps as AtomItemProps,
  type TableOfContentsLinkProps as AtomLinkProps,
  type TableOfContentsIndicatorProps as AtomIndicatorProps,
} from "@flowstack-ui/atom/table-of-contents";

export { useTableOfContents } from "@flowstack-ui/atom/table-of-contents";
export type {
  TableOfContentsApi,
  TableOfContentsController,
  TableOfContentsOptions,
  TableOfContentsItemData,
  TableOfContentsItemState,
  TableOfContentsChangeDetails,
  TableOfContentsContextProps,
} from "@flowstack-ui/atom/table-of-contents";

export type TableOfContentsSize = "sm" | "md";
export type TableOfContentsVariant = "plain" | "line";
export type TableOfContentsTone = "neutral" | "accent";
export interface TableOfContentsRecipeProps {
  size?: ResponsiveValue<TableOfContentsSize>;
  variant?: ResponsiveValue<TableOfContentsVariant>;
  tone?: TableOfContentsTone;
}
type Composed<T extends { children?: ReactNode; render?: unknown }> = Omit<
  T,
  "asChild" | "children" | "render"
> &
  (
    | {
        asChild: true;
        children: ReactElement<{ children?: ReactNode }>;
        render?: never;
      }
    | { asChild?: false; children?: ReactNode; render?: T["render"] }
  );
export type TableOfContentsRootProps = Composed<AtomRootProps> &
  TableOfContentsRecipeProps;
export type TableOfContentsRootProviderProps = AtomProviderProps &
  TableOfContentsRecipeProps;
export type TableOfContentsNavProps = Composed<AtomNavProps>;
export type TableOfContentsTitleProps = Composed<AtomTitleProps>;
export type TableOfContentsListProps = Composed<AtomListProps>;
export type TableOfContentsItemProps = Composed<AtomItemProps>;
export type TableOfContentsLinkProps = Composed<AtomLinkProps>;
export type TableOfContentsIndicatorProps = Composed<AtomIndicatorProps>;
const RecipeContext = createContext<Required<TableOfContentsRecipeProps>>({
  size: "sm",
  variant: "plain",
  tone: "neutral",
});
RecipeContext.displayName = "TableOfContentsRecipeContext";
const merge = (base: string, value?: string) =>
  value ? `${base} ${value}` : base;

export const TableOfContentsRoot = forwardRef<
  HTMLDivElement,
  TableOfContentsRootProps
>(function TableOfContentsRoot(
  { size = "sm", variant = "plain", tone = "neutral", className, ...props },
  ref,
) {
  return (
    <RecipeContext.Provider value={{ size, variant, tone }}>
      <Atom.Root
        {...props}
        ref={ref}
        className={merge("brick-table-of-contents", className)}
      />
    </RecipeContext.Provider>
  );
});
export function TableOfContentsRootProvider({
  size = "sm",
  variant = "plain",
  tone = "neutral",
  ...props
}: TableOfContentsRootProviderProps) {
  return (
    <RecipeContext.Provider value={{ size, variant, tone }}>
      <Atom.RootProvider {...props} />
    </RecipeContext.Provider>
  );
}
export const TableOfContentsContext = Atom.Context;
export const TableOfContentsNav = forwardRef<
  HTMLElement,
  TableOfContentsNavProps
>(function TableOfContentsNav({ className, ...props }, ref) {
  const { size, variant, tone } = useContext(RecipeContext);
  return (
    <Atom.Nav
      {...props}
      ref={ref}
      className={merge("brick-table-of-contents__nav", className)}
      {...responsiveDataAttributes("data-size", size, { defaultValue: "sm", alwaysInitial: true })}
      {...responsiveDataAttributes("data-variant", variant, { defaultValue: "plain", alwaysInitial: true })}
      data-tone={tone}
    />
  );
});
export const TableOfContentsTitle = forwardRef<
  HTMLParagraphElement,
  TableOfContentsTitleProps
>(function TableOfContentsTitle({ className, ...props }, ref) {
  return (
    <Atom.Title
      {...props}
      ref={ref}
      className={merge("brick-table-of-contents__title", className)}
    />
  );
});
export const TableOfContentsList = forwardRef<
  HTMLUListElement,
  TableOfContentsListProps
>(function TableOfContentsList({ className, ...props }, ref) {
  return (
    <Atom.List
      {...props}
      ref={ref}
      className={merge("brick-table-of-contents__list", className)}
    />
  );
});
export const TableOfContentsItem = forwardRef<
  HTMLLIElement,
  TableOfContentsItemProps
>(function TableOfContentsItem({ className, ...props }, ref) {
  return (
    <Atom.Item
      {...props}
      ref={ref}
      className={merge("brick-table-of-contents__item", className)}
    />
  );
});
export const TableOfContentsLink = forwardRef<
  HTMLAnchorElement,
  TableOfContentsLinkProps
>(function TableOfContentsLink({ className, ...props }, ref) {
  return (
    <Atom.Link
      {...props}
      ref={ref}
      className={merge("brick-table-of-contents__link", className)}
    />
  );
});
export const TableOfContentsIndicator = forwardRef<
  HTMLSpanElement,
  TableOfContentsIndicatorProps
>(function TableOfContentsIndicator({ className, ...props }, ref) {
  return (
    <Atom.Indicator
      {...props}
      ref={ref}
      className={merge("brick-table-of-contents__indicator", className)}
    />
  );
});
export const TableOfContents = Object.freeze({
  Root: TableOfContentsRoot,
  RootProvider: TableOfContentsRootProvider,
  Context: TableOfContentsContext,
  Nav: TableOfContentsNav,
  Title: TableOfContentsTitle,
  List: TableOfContentsList,
  Item: TableOfContentsItem,
  Link: TableOfContentsLink,
  Indicator: TableOfContentsIndicator,
});
