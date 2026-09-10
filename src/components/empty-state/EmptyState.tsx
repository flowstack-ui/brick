import { createElement, forwardRef, type HTMLAttributes } from "react";
import { staticPart, type StaticPartProps } from "../_internal/StaticPart.js";
export type EmptyStateSize = "sm" | "md" | "lg";
export type EmptyStateAlign = "start" | "center";
export type EmptyStateTitleElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type EmptyStateRootProps = StaticPartProps & { size?: EmptyStateSize; align?: EmptyStateAlign };
export type EmptyStateContentProps = StaticPartProps;
export type EmptyStateIndicatorProps = StaticPartProps;
export type EmptyStateDescriptionProps = StaticPartProps;
export interface EmptyStateTitleProps extends HTMLAttributes<HTMLHeadingElement> { as?: EmptyStateTitleElement; "data-slot"?: string }

export const EmptyStateRoot = forwardRef<HTMLElement, EmptyStateRootProps>(function EmptyStateRoot(
  { size = "md", align = "center", ...props }, ref,
) { return staticPart("div", { ...props, "data-size": size, "data-align": align } as StaticPartProps, ref, "brick-empty-state", "empty-state"); });
export const EmptyStateContent = forwardRef<HTMLElement, EmptyStateContentProps>((props, ref) => staticPart("div", props, ref, "brick-empty-state-content", "empty-state-content"));
export const EmptyStateIndicator = forwardRef<HTMLElement, EmptyStateIndicatorProps>((props, ref) => staticPart("div", props, ref, "brick-empty-state-indicator", "empty-state-indicator"));
export const EmptyStateDescription = forwardRef<HTMLElement, EmptyStateDescriptionProps>((props, ref) => staticPart("p", props, ref, "brick-empty-state-description", "empty-state-description"));
export const EmptyStateTitle = forwardRef<HTMLHeadingElement, EmptyStateTitleProps>(function EmptyStateTitle(
  { as = "h3", className, "data-slot": slot = "empty-state-title", ...props }, ref,
) { return createElement(as, { ...props, ref, className: ["brick-empty-state-title", className].filter(Boolean).join(" "), "data-slot": slot }); });
EmptyStateRoot.displayName = "EmptyState.Root";
EmptyStateContent.displayName = "EmptyState.Content";
EmptyStateTitle.displayName = "EmptyState.Title";
EmptyStateDescription.displayName = "EmptyState.Description";
EmptyStateIndicator.displayName = "EmptyState.Indicator";
export const EmptyState = Object.freeze({ Root: EmptyStateRoot, Content: EmptyStateContent, Title: EmptyStateTitle, Description: EmptyStateDescription, Indicator: EmptyStateIndicator });
