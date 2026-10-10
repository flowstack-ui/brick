"use client";

import { forwardRef, type ReactNode, type ComponentPropsWithoutRef } from "react";
import { Steps as AtomSteps, type StepsRootProps as AtomStepsRootProps, type StepsIndicatorProps as AtomStepsIndicatorProps,
  type StepsListProps as AtomStepsListProps,
  type StepsItemProps as AtomStepsItemProps,
  type StepsTriggerProps as AtomStepsTriggerProps,
  type StepsTitleProps as AtomStepsTitleProps,
  type StepsDescriptionProps as AtomStepsDescriptionProps,
  type StepsSeparatorProps as AtomStepsSeparatorProps,
  type StepsContentProps as AtomStepsContentProps,
  type StepsCompletedContentProps as AtomStepsCompletedContentProps,
  type StepsNextTriggerProps as AtomStepsNextTriggerProps,
  type StepsPrevTriggerProps as AtomStepsPrevTriggerProps,
  type StepsRootProviderProps as AtomStepsRootProviderProps,
} from "@flowstack-ui/atom/steps";
import { Checkmark } from "../checkmark/Checkmark.js";
import { FormatNumber } from "../format-number/FormatNumber.js";
import { responsiveDataAttributes, type ResponsiveValue } from "../_responsive-value/ResponsiveValue.js";
import { radiusStyle, type Radius } from "../_radius/Radius.js";

export type StepsSize = "xs" | "sm" | "md" | "lg";
export type StepsVariant = "solid" | "subtle";
export type StepsTone = "accent" | "neutral";
export type StepsLayout = "auto" | "stacked" | "side";
interface StepsRecipeProps { size?: ResponsiveValue<StepsSize>; variant?: ResponsiveValue<StepsVariant>; tone?: ResponsiveValue<StepsTone>; layout?: ResponsiveValue<StepsLayout> }
export interface StepsRootProps extends AtomStepsRootProps, StepsRecipeProps {}
export interface StepsRootProviderProps extends AtomStepsRootProviderProps, StepsRecipeProps {}
function recipeAttributes({ size = "md", variant = "solid", tone = "accent", layout = "auto" }: StepsRecipeProps) {
  return { ...responsiveDataAttributes("data-size", size, { defaultValue: "md", alwaysInitial: true }),
    ...responsiveDataAttributes("data-variant", variant, { defaultValue: "solid", alwaysInitial: true }),
    ...responsiveDataAttributes("data-tone", tone, { defaultValue: "accent", alwaysInitial: true }),
    ...responsiveDataAttributes("data-layout", layout, { defaultValue: "auto", alwaysInitial: true }) };
}
function classes(base: string, value?: string) { return value ? base + " " + value : base; }
export const StepsRoot = forwardRef<HTMLDivElement, StepsRootProps>(function StepsRoot({ size, variant, tone, layout, className, ...props }, ref) {
  return <AtomSteps.Root {...props} ref={ref} className={classes("brick-steps", className)} {...recipeAttributes({ size, variant, tone, layout })} />;
});
export const StepsRootProvider = forwardRef<HTMLDivElement, StepsRootProviderProps>(function StepsRootProvider({ size, variant, tone, layout, className, ...props }, ref) {
  return <AtomSteps.RootProvider {...props} ref={ref} className={classes("brick-steps", className)} {...recipeAttributes({ size, variant, tone, layout })} />;
});

export type StepsListProps = AtomStepsListProps;
export const StepsList = forwardRef<HTMLOListElement, StepsListProps>(function StepsList({ className, ...props }, ref) {
  return <AtomSteps.List {...props} ref={ref} className={classes("brick-steps-list", className)} />;
});

export type StepsItemProps = AtomStepsItemProps;
export const StepsItem = forwardRef<HTMLLIElement, StepsItemProps>(function StepsItem({ className, ...props }, ref) {
  return <AtomSteps.Item {...props} ref={ref} className={classes("brick-steps-item", className)} />;
});

export interface StepsTriggerProps extends AtomStepsTriggerProps { radius?: Radius }
export const StepsTrigger = forwardRef<HTMLButtonElement, StepsTriggerProps>(function StepsTrigger({ className, radius, style, ...props }, ref) {
  return <AtomSteps.Trigger {...props} ref={ref} style={radiusStyle(radius, "--brick-steps-trigger-radius", style)} className={classes("brick-steps-trigger", className)} />;
});

export type StepsTitleProps = AtomStepsTitleProps;
export const StepsTitle = forwardRef<HTMLSpanElement, StepsTitleProps>(function StepsTitle({ className, ...props }, ref) {
  return <AtomSteps.Title {...props} ref={ref} className={classes("brick-steps-title", className)} />;
});

export type StepsDescriptionProps = AtomStepsDescriptionProps;
export const StepsDescription = forwardRef<HTMLSpanElement, StepsDescriptionProps>(function StepsDescription({ className, ...props }, ref) {
  return <AtomSteps.Description {...props} ref={ref} className={classes("brick-steps-description", className)} />;
});

export type StepsSeparatorProps = AtomStepsSeparatorProps;
export const StepsSeparator = forwardRef<HTMLSpanElement, StepsSeparatorProps>(function StepsSeparator({ className, ...props }, ref) {
  return <AtomSteps.Separator {...props} ref={ref} className={classes("brick-steps-separator", className)} />;
});

export type StepsContentProps = AtomStepsContentProps;
export const StepsContent = forwardRef<HTMLDivElement, StepsContentProps>(function StepsContent({ className, ...props }, ref) {
  return <AtomSteps.Content {...props} ref={ref} className={classes("brick-steps-content", className)} />;
});

export type StepsCompletedContentProps = AtomStepsCompletedContentProps;
export const StepsCompletedContent = forwardRef<HTMLDivElement, StepsCompletedContentProps>(function StepsCompletedContent({ className, ...props }, ref) {
  return <AtomSteps.CompletedContent {...props} ref={ref} className={classes("brick-steps-completed-content", className)} />;
});

export type StepsNextTriggerProps = AtomStepsNextTriggerProps;
export const StepsNextTrigger = forwardRef<HTMLButtonElement, StepsNextTriggerProps>(function StepsNextTrigger({ className, ...props }, ref) {
  return <AtomSteps.NextTrigger {...props} ref={ref} className={classes("brick-steps-next-trigger", className)} />;
});

export type StepsPrevTriggerProps = AtomStepsPrevTriggerProps;
export const StepsPrevTrigger = forwardRef<HTMLButtonElement, StepsPrevTriggerProps>(function StepsPrevTrigger({ className, ...props }, ref) {
  return <AtomSteps.PrevTrigger {...props} ref={ref} className={classes("brick-steps-prev-trigger", className)} />;
});

export interface StepsIndicatorProps extends AtomStepsIndicatorProps { radius?: Radius }
export const StepsIndicator = forwardRef<HTMLSpanElement, StepsIndicatorProps>(function StepsIndicator({ children, className, asChild, render, radius, style, ...props }, ref) {
  if (asChild && children == null) throw new Error("Steps.Indicator asChild requires an explicit host child.");
  return <AtomSteps.Indicator {...props} asChild={asChild} render={render} ref={ref} style={radiusStyle(radius, "--brick-steps-radius", style)} className={classes("brick-steps-indicator", className)}>
    {children ?? <AtomSteps.ItemContext>{state => state.completed ? <Checkmark checked variant="plain" className="brick-steps-check" /> : <FormatNumber value={state.index + 1} />}</AtomSteps.ItemContext>}
  </AtomSteps.Indicator>;
});
export const StepsContext = AtomSteps.Context;
export const StepsItemContext = AtomSteps.ItemContext;
export interface StepsNumberProps extends ComponentPropsWithoutRef<"span"> {}
export const StepsNumber = forwardRef<HTMLSpanElement, StepsNumberProps>(function StepsNumber(props, ref) {
  return <span {...props} ref={ref}><AtomSteps.ItemContext>{state => <FormatNumber value={state.index + 1} />}</AtomSteps.ItemContext></span>;
});
export interface StepsStatusProps { complete: ReactNode; incomplete: ReactNode; current?: ReactNode }
export function StepsStatus({ complete, incomplete, current }: StepsStatusProps) {
  return <AtomSteps.ItemContext>{state => state.completed ? complete : state.current ? current ?? incomplete : incomplete}</AtomSteps.ItemContext>;
}
export { useSteps, useStepsContext, useStepsItemContext } from "@flowstack-ui/atom/steps";
export type { UseStepsProps, UseStepsReturn, StepsIds } from "@flowstack-ui/atom/steps";
export type { StepsContextProps, StepsItemContextProps, StepsContextValue, StepsItemState, StepsInvalidDetails, StepsOrientation } from "@flowstack-ui/atom/steps";
export const Steps = Object.freeze({ Root: StepsRoot, RootProvider: StepsRootProvider, Number: StepsNumber, Status: StepsStatus, List: StepsList, Item: StepsItem, Trigger: StepsTrigger, Title: StepsTitle, Description: StepsDescription, Separator: StepsSeparator, Content: StepsContent, CompletedContent: StepsCompletedContent, NextTrigger: StepsNextTrigger, PrevTrigger: StepsPrevTrigger, Indicator: StepsIndicator, Context: StepsContext, ItemContext: StepsItemContext });
