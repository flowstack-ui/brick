"use client";

import {
  forwardRef,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  resolveSpacingValue,
  type SpacingValue,
} from "../_spacing-value/SpacingValue.js";
import { radiusStyle, type Radius } from "../_radius/Radius.js";
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

export type NavListVariant = "soft" | "solid" | "outline" | "ghost" | "plain";
export type NavListTone = "accent" | "neutral";
export type NavListSize = "sm" | "md" | "lg";
export type NavListDensity = "comfortable" | "compact";
export type NavListInset = "default" | "none";
export type NavListIndent = "default" | "none";

type ComposedProps<T extends { children?: ReactNode; render?: unknown }> = Omit<
  T,
  "asChild" | "children" | "render"
> &
  (
    | {
        asChild: true;
        render?: never;
        children: ReactElement<{ children?: ReactNode }>;
      }
    | { asChild?: false; render?: T["render"]; children?: ReactNode }
  );

export type NavListRootProps = ComposedProps<AtomRootProps> & {
  variant?: NavListVariant;
  tone?: NavListTone;
  size?: NavListSize;
  density?: NavListDensity;
  inset?: NavListInset;
  gap?: SpacingValue;
  radius?: Radius;
};
export type NavListListProps = ComposedProps<AtomListProps>;
export type NavListItemProps = ComposedProps<AtomItemProps>;
export type NavListSectionProps = ComposedProps<AtomSectionProps> & {
  gap?: SpacingValue;
};
export type NavListSectionLabelProps = ComposedProps<AtomSectionLabelProps>;
export type NavListSectionContentProps =
  ComposedProps<AtomSectionContentProps> & {
    indent?: NavListIndent;
  };

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
      indicator?: never;
    })
  | (SectionTriggerBase & {
      asChild?: false;
      children?: ReactNode;
      render?: AtomSectionTriggerProps["render"];
      startIcon?: ReactNode;
      /** Decorative replacement; null hides the default chevron. */
      indicator?: ReactNode;
    });

type LinkBase = Omit<AtomLinkProps, "asChild" | "children" | "render">;
export type NavListLinkProps =
  | (LinkBase & {
      asChild: true;
      children: ReactElement<{ children?: ReactNode }>;
      render?: never;
      startIcon?: never;
      endIcon?: never;
      trailingContent?: never;
      description?: never;
    })
  | (LinkBase & {
      asChild?: false;
      children: ReactNode;
      render?: AtomLinkProps["render"];
      startIcon?: ReactNode;
      endIcon?: ReactNode;
      /** Meaningful, noninteractive metadata, such as a count Badge. */
      trailingContent?: ReactNode;
      description?: ReactNode;
    });

const merge = (base: string, value?: string) =>
  value ? `${base} ${value}` : base;
const slot = (value: string | undefined, fallback: string) => value ?? fallback;
const gapStyle = (
  gap: SpacingValue | undefined,
  style: CSSProperties | undefined,
): CSSProperties | undefined =>
  gap === undefined
    ? style
    : ({
        "--brick-nav-list-gap-input": resolveSpacingValue(gap),
        ...style,
      } as CSSProperties);

export const NavListRoot = forwardRef<HTMLElement, NavListRootProps>(
  function NavListRoot(
    {
      asChild = false,
      children,
      className,
      density = "comfortable",
      gap,
      inset = "default",
      orientation = "vertical",
      radius,
      render,
      size = "md",
      style,
      tone = "accent",
      variant = "soft",
      "data-slot": dataSlot,
      ...props
    },
    ref,
  ) {
    return (
      <AtomNavList.Root
        {...props}
        asChild={asChild}
        className={merge("brick-nav-list", className)}
        data-density={density}
        data-inset={inset}
        data-size={size}
        data-slot={slot(dataSlot, "nav-list")}
        data-tone={tone}
        data-variant={variant}
        orientation={orientation}
        ref={ref}
        render={render}
        style={radiusStyle(
          radius,
          "--brick-nav-list-row-radius",
          gapStyle(gap, style),
        )}
      >
        {children}
      </AtomNavList.Root>
    );
  },
);

export const NavListList = forwardRef<
  HTMLUListElement | HTMLOListElement,
  NavListListProps
>(function NavListList(
  {
    asChild = false,
    children,
    className,
    render,
    "data-slot": dataSlot,
    ...props
  },
  ref,
) {
  return (
    <AtomNavList.List
      {...props}
      asChild={asChild}
      className={merge("brick-nav-list__list", className)}
      data-slot={slot(dataSlot, "nav-list-list")}
      ref={ref}
      render={render}
    >
      {children}
    </AtomNavList.List>
  );
});

export const NavListItem = forwardRef<HTMLLIElement, NavListItemProps>(
  function NavListItem(
    {
      asChild = false,
      children,
      className,
      render,
      "data-slot": dataSlot,
      ...props
    },
    ref,
  ) {
    return (
      <AtomNavList.Item
        {...props}
        asChild={asChild}
        className={merge("brick-nav-list__item", className)}
        data-slot={slot(dataSlot, "nav-list-item")}
        ref={ref}
        render={render}
      >
        {children}
      </AtomNavList.Item>
    );
  },
);

export const NavListLink = forwardRef<HTMLAnchorElement, NavListLinkProps>(
  function NavListLink(
    {
      asChild = false,
      children,
      className,
      description,
      endIcon,
      trailingContent,
      render,
      startIcon,
      "data-slot": dataSlot,
      ...props
    },
    ref,
  ) {
    const content = asChild ? (
      children
    ) : (
      <>
        {startIcon !== undefined ? (
          <span
            aria-hidden="true"
            className="brick-nav-list__link-start"
            data-position="start"
          >
            {startIcon}
          </span>
        ) : null}
        <span className="brick-nav-list__link-content">
          <span className="brick-nav-list__link-label">{children}</span>
          {description !== undefined ? (
            <span className="brick-nav-list__link-description">
              {description}
            </span>
          ) : null}
        </span>
        {trailingContent !== undefined ? (
          <span className="brick-nav-list__link-trailing">
            {trailingContent}
          </span>
        ) : null}
        {endIcon !== undefined ? (
          <span
            aria-hidden="true"
            className="brick-nav-list__link-end"
            data-position="end"
          >
            {endIcon}
          </span>
        ) : null}
      </>
    );
    return (
      <AtomNavList.Link
        {...props}
        asChild={asChild}
        className={merge("brick-nav-list__link", className)}
        data-has-description={
          !asChild && description !== undefined ? "" : undefined
        }
        data-slot={slot(dataSlot, "nav-list-link")}
        ref={ref}
        render={render}
      >
        {content}
      </AtomNavList.Link>
    );
  },
);

export const NavListSection = forwardRef<HTMLElement, NavListSectionProps>(
  function NavListSection(
    {
      asChild = false,
      children,
      className,
      gap,
      render,
      style,
      "data-slot": dataSlot,
      ...props
    },
    ref,
  ) {
    return (
      <AtomNavList.Section
        {...props}
        asChild={asChild}
        className={merge("brick-nav-list__section", className)}
        data-slot={slot(dataSlot, "nav-list-section")}
        ref={ref}
        render={render}
        style={gapStyle(gap, style)}
      >
        {children}
      </AtomNavList.Section>
    );
  },
);

export const NavListSectionLabel = forwardRef<
  HTMLElement,
  NavListSectionLabelProps
>(function NavListSectionLabel(
  {
    asChild = false,
    children,
    className,
    render,
    "data-slot": dataSlot,
    ...props
  },
  ref,
) {
  return (
    <AtomNavList.SectionLabel
      {...props}
      asChild={asChild}
      className={merge("brick-nav-list__section-label", className)}
      data-slot={slot(dataSlot, "nav-list-section-label")}
      ref={ref}
      render={render}
    >
      {children}
    </AtomNavList.SectionLabel>
  );
});

export const NavListSectionTrigger = forwardRef<
  HTMLElement,
  NavListSectionTriggerProps
>(function NavListSectionTrigger(
  {
    asChild = false,
    children,
    className,
    indicator,
    render,
    startIcon,
    "data-slot": dataSlot,
    ...props
  },
  ref,
) {
  const content = asChild ? (
    children
  ) : (
    <>
      {startIcon !== undefined ? (
        <span
          aria-hidden="true"
          className="brick-nav-list__link-start"
          data-position="start"
        >
          {startIcon}
        </span>
      ) : null}
      {children}
      {indicator !== undefined && indicator !== null ? (
        <span aria-hidden="true" className="brick-nav-list__indicator">
          {indicator}
        </span>
      ) : null}
    </>
  );
  return (
    <AtomNavList.SectionTrigger
      {...props}
      asChild={asChild}
      className={merge("brick-nav-list__section-trigger", className)}
      data-custom-indicator={
        asChild || indicator !== undefined ? "" : undefined
      }
      data-slot={slot(dataSlot, "nav-list-section-trigger")}
      ref={ref}
      render={render}
    >
      {content}
    </AtomNavList.SectionTrigger>
  );
});

export const NavListSectionContent = forwardRef<
  HTMLDivElement,
  NavListSectionContentProps
>(function NavListSectionContent(
  {
    asChild = false,
    children,
    className,
    indent = "default",
    render,
    "data-slot": dataSlot,
    ...props
  },
  ref,
) {
  return (
    <AtomNavList.SectionContent
      {...props}
      asChild={asChild}
      className={merge("brick-nav-list__section-content", className)}
      data-indent={indent}
      data-slot={slot(dataSlot, "nav-list-section-content")}
      ref={ref}
      render={render}
    >
      {children}
    </AtomNavList.SectionContent>
  );
});

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
