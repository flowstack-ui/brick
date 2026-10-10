"use client";

import {
  Children,
  cloneElement,
  createContext,
  useContext,
  type ReactElement,
  type ReactNode,
} from "react";
import { Checkmark } from "../checkmark/Checkmark.js";

export type ActionMenuSize = "sm" | "md" | "lg";
export type ActionMenuVariant = "subtle" | "solid" | "plain";
export type ActionMenuTone =
  | "neutral"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "danger";
export type ActionMenuInset = "none" | "sm" | "md" | "lg";
export type ActionMenuItemInset = "default" | "none";
export type ActionMenuLeadingSpace = "auto" | "reserve";
export interface ActionMenuVisualProps {
  size?: ActionMenuSize;
  variant?: ActionMenuVariant;
  tone?: ActionMenuTone;
}
export interface ActionMenuPopupVisualProps extends ActionMenuVisualProps {
  inset?: ActionMenuInset;
  itemInset?: ActionMenuItemInset;
  leadingSpace?: ActionMenuLeadingSpace;
}
export interface ActionMenuItemVisualProps {
  tone?: ActionMenuTone;
  itemInset?: ActionMenuItemInset;
}

const defaults = {
  size: "md",
  variant: "subtle",
  tone: "neutral",
  itemInset: "default",
  leadingSpace: "auto",
} as const;
export const ActionMenuPresentation =
  createContext<ActionMenuPopupVisualProps>(defaults);

/** React recipe context, deliberately independent of portal DOM ancestry. */
export function useActionMenuPresentation(
  overrides: ActionMenuPopupVisualProps = {},
) {
  const parent = useContext(ActionMenuPresentation);
  return {
    size: overrides.size ?? parent.size ?? defaults.size,
    variant: overrides.variant ?? parent.variant ?? defaults.variant,
    tone: overrides.tone ?? parent.tone ?? defaults.tone,
    inset: overrides.inset ?? parent.inset,
    itemInset: overrides.itemInset ?? parent.itemInset ?? defaults.itemInset,
    leadingSpace:
      overrides.leadingSpace ?? parent.leadingSpace ?? defaults.leadingSpace,
  };
}

export function actionMenuAttributes(
  recipe: ReturnType<typeof useActionMenuPresentation>,
) {
  return {
    "data-size": recipe.size,
    "data-variant": recipe.variant,
    "data-tone": recipe.tone,
    "data-inset": recipe.inset,
    "data-item-inset": recipe.itemInset,
    "data-leading-space": recipe.leadingSpace,
  };
}

export function ActionMenuChevron() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 16 16"
      className="brick-action-menu__chevron"
    >
      <path
        d="m6 3 5 5-5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ActionMenuSelectionMark() {
  return (
    <>
      <Checkmark
        checked
        variant="plain"
        tone="neutral"
        className="brick-action-menu__checked-mark"
      />
      <Checkmark
        indeterminate
        variant="plain"
        tone="neutral"
        className="brick-action-menu__mixed-mark"
      />
    </>
  );
}

/** Keep one interactive host when a SubTrigger composes a Link or Button. */
export function actionMenuSubTriggerChildren(
  children: ReactNode,
  indicator: ReactNode,
  asChild?: boolean,
) {
  const artwork =
    indicator === null ? null : (
      <span className="brick-action-menu__submenu-indicator" aria-hidden="true">
        {indicator === undefined ? <ActionMenuChevron /> : indicator}
      </span>
    );
  if (!artwork) return children;
  if (asChild) {
    const child = Children.only(children) as ReactElement<{
      children?: ReactNode;
    }>;
    return cloneElement(child, undefined, child.props.children, artwork);
  }
  return (
    <>
      {children}
      {artwork}
    </>
  );
}
