"use client";

import { forwardRef, type ReactElement, type ReactNode } from "react";
import {
  NavList as AtomNavList,
  type NavListItemProps as AtomItemProps,
  type NavListLinkProps as AtomLinkProps,
  type NavListListProps as AtomListProps,
  type NavListRootProps as AtomRootProps,
  type NavListSectionContentProps as AtomSectionContentProps,
  type NavListSectionLabelProps as AtomSectionLabelProps,
  type NavListSectionProps as AtomSectionProps,
  type NavListSectionTriggerProps as AtomSectionTriggerProps,
} from "@flowstack-ui/atom/nav-list";

export type NavListVariant = "soft" | "solid" | "outline" | "ghost";
export type NavListTone = "accent" | "neutral";
export type NavListSize = "sm" | "md" | "lg";

type ComposedProps<T extends { children?: ReactNode; render?: unknown }> = Omit<
  T,
  "asChild" | "children" | "render"
> &
  (
    | { asChild: true; render?: never; children: ReactElement<{ children?: ReactNode }> }
    | { asChild?: false; render?: T["render"]; children?: ReactNode }
  );

export type NavListRootProps = ComposedProps<AtomRootProps> & {
  variant?: NavListVariant;
  tone?: NavListTone;
  size?: NavListSize;
};
export type NavListListProps = ComposedProps<AtomListProps>;
export type NavListItemProps = ComposedProps<AtomItemProps>;
export type NavListSectionProps = ComposedProps<AtomSectionProps>;
export type NavListSectionLabelProps = ComposedProps<AtomSectionLabelProps>;
export type NavListSectionContentProps = ComposedProps<AtomSectionContentProps>;

type SectionTriggerBase = Omit<
  AtomSectionTriggerProps,
  "asChild" | "children" | "render"
>;
export type NavListSectionTriggerProps =
  | (SectionTriggerBase & {
      asChild: true;
      children: ReactElement<{ children?: ReactNode }>;
      render?: never;
      startIcon?: never;
    })
  | (SectionTriggerBase & {
      asChild?: false;
      children?: ReactNode;
      render?: AtomSectionTriggerProps["render"];
      startIcon?: ReactNode;
    });

type LinkBase = Omit<AtomLinkProps, "asChild" | "children" | "render">;
export type NavListLinkProps =
  | (LinkBase & {
      asChild: true;
      children: ReactElement<{ children?: ReactNode }>;
      render?: never;
      startIcon?: never;
      endIcon?: never;
      description?: never;
    })
  | (LinkBase & {
      asChild?: false;
      children: ReactNode;
      render?: AtomLinkProps["render"];
      startIcon?: ReactNode;
      endIcon?: ReactNode;
      description?: ReactNode;
    });

const merge = (base: string, value?: string) => value ? `${base} ${value}` : base;
const slot = (value: string | undefined, fallback: string) => value ?? fallback;

export const NavListRoot = forwardRef<HTMLElement, NavListRootProps>(
  function NavListRoot({ asChild = false, children, className, orientation = "vertical", render, size = "md", tone = "accent", variant = "soft", "data-slot": dataSlot, ...props }, ref) {
    return <AtomNavList.Root {...props} asChild={asChild} className={merge("brick-nav-list", className)} data-size={size} data-slot={slot(dataSlot, "nav-list")} data-tone={tone} data-variant={variant} orientation={orientation} ref={ref} render={render}>{children}</AtomNavList.Root>;
  },
);

export const NavListList = forwardRef<HTMLUListElement | HTMLOListElement, NavListListProps>(
  function NavListList({ asChild = false, children, className, render, "data-slot": dataSlot, ...props }, ref) {
    return <AtomNavList.List {...props} asChild={asChild} className={merge("brick-nav-list__list", className)} data-slot={slot(dataSlot, "nav-list-list")} ref={ref} render={render}>{children}</AtomNavList.List>;
  },
);

export const NavListItem = forwardRef<HTMLLIElement, NavListItemProps>(
  function NavListItem({ asChild = false, children, className, render, "data-slot": dataSlot, ...props }, ref) {
    return <AtomNavList.Item {...props} asChild={asChild} className={merge("brick-nav-list__item", className)} data-slot={slot(dataSlot, "nav-list-item")} ref={ref} render={render}>{children}</AtomNavList.Item>;
  },
);

export const NavListLink = forwardRef<HTMLAnchorElement, NavListLinkProps>(
  function NavListLink({ asChild = false, children, className, description, endIcon, render, startIcon, "data-slot": dataSlot, ...props }, ref) {
    const content = asChild ? children : <>
      {startIcon !== undefined ? <span aria-hidden="true" className="brick-nav-list__link-start" data-position="start">{startIcon}</span> : null}
      <span className="brick-nav-list__link-content">
        <span className="brick-nav-list__link-label">{children}</span>
        {description !== undefined ? <span className="brick-nav-list__link-description">{description}</span> : null}
      </span>
      {endIcon !== undefined ? <span aria-hidden="true" className="brick-nav-list__link-end" data-position="end">{endIcon}</span> : null}
    </>;
    return <AtomNavList.Link {...props} asChild={asChild} className={merge("brick-nav-list__link", className)} data-has-description={!asChild && description !== undefined ? "" : undefined} data-slot={slot(dataSlot, "nav-list-link")} ref={ref} render={render}>{content}</AtomNavList.Link>;
  },
);

export const NavListSection = forwardRef<HTMLElement, NavListSectionProps>(
  function NavListSection({ asChild = false, children, className, render, "data-slot": dataSlot, ...props }, ref) {
    return <AtomNavList.Section {...props} asChild={asChild} className={merge("brick-nav-list__section", className)} data-slot={slot(dataSlot, "nav-list-section")} ref={ref} render={render}>{children}</AtomNavList.Section>;
  },
);

export const NavListSectionLabel = forwardRef<HTMLElement, NavListSectionLabelProps>(
  function NavListSectionLabel({ asChild = false, children, className, render, "data-slot": dataSlot, ...props }, ref) {
    return <AtomNavList.SectionLabel {...props} asChild={asChild} className={merge("brick-nav-list__section-label", className)} data-slot={slot(dataSlot, "nav-list-section-label")} ref={ref} render={render}>{children}</AtomNavList.SectionLabel>;
  },
);

export const NavListSectionTrigger = forwardRef<HTMLElement, NavListSectionTriggerProps>(
  function NavListSectionTrigger({ asChild = false, children, className, render, startIcon, "data-slot": dataSlot, ...props }, ref) {
    const content = asChild ? children : <>
      {startIcon !== undefined ? <span aria-hidden="true" className="brick-nav-list__link-start" data-position="start">{startIcon}</span> : null}
      {children}
    </>;
    return <AtomNavList.SectionTrigger {...props} asChild={asChild} className={merge("brick-nav-list__section-trigger", className)} data-slot={slot(dataSlot, "nav-list-section-trigger")} ref={ref} render={render}>{content}</AtomNavList.SectionTrigger>;
  },
);

export const NavListSectionContent = forwardRef<HTMLDivElement, NavListSectionContentProps>(
  function NavListSectionContent({ asChild = false, children, className, render, "data-slot": dataSlot, ...props }, ref) {
    return <AtomNavList.SectionContent {...props} asChild={asChild} className={merge("brick-nav-list__section-content", className)} data-slot={slot(dataSlot, "nav-list-section-content")} ref={ref} render={render}>{children}</AtomNavList.SectionContent>;
  },
);

NavListRoot.displayName = "NavList.Root";
NavListList.displayName = "NavList.List";
NavListItem.displayName = "NavList.Item";
NavListLink.displayName = "NavList.Link";
NavListSection.displayName = "NavList.Section";
NavListSectionLabel.displayName = "NavList.SectionLabel";
NavListSectionTrigger.displayName = "NavList.SectionTrigger";
NavListSectionContent.displayName = "NavList.SectionContent";

export const NavList = Object.freeze({
  Root: NavListRoot,
  List: NavListList,
  Item: NavListItem,
  Link: NavListLink,
  Section: NavListSection,
  SectionLabel: NavListSectionLabel,
  SectionTrigger: NavListSectionTrigger,
  SectionContent: NavListSectionContent,
});
