"use client";

import { forwardRef } from "react";
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
} from "@flowstack-ui/atom/steps";
import { Checkmark } from "../checkmark/Checkmark.js";
import { FormatNumber } from "../format-number/FormatNumber.js";

export type StepsSize = "xs" | "sm" | "md" | "lg";
export type StepsVariant = "solid" | "subtle";
export type StepsTone = "accent" | "neutral";
export interface StepsRootProps extends AtomStepsRootProps { size?: StepsSize; variant?: StepsVariant; tone?: StepsTone }
function classes(base: string, value?: string) { return value ? base + " " + value : base; }
export const StepsRoot = forwardRef<HTMLDivElement, StepsRootProps>(function StepsRoot({ size = "md", variant = "solid", tone = "accent", className, ...props }, ref) {
  return <AtomSteps.Root {...props} ref={ref} className={classes("brick-steps", className)} data-size={size} data-variant={variant} data-tone={tone} />;
});

export type StepsListProps = AtomStepsListProps;
export const StepsList = forwardRef<HTMLOListElement, StepsListProps>(function StepsList({ className, ...props }, ref) {
  return <AtomSteps.List {...props} ref={ref} className={classes("brick-steps-list", className)} />;
});

export type StepsItemProps = AtomStepsItemProps;
export const StepsItem = forwardRef<HTMLLIElement, StepsItemProps>(function StepsItem({ className, ...props }, ref) {
  return <AtomSteps.Item {...props} ref={ref} className={classes("brick-steps-item", className)} />;
});

export type StepsTriggerProps = AtomStepsTriggerProps;
export const StepsTrigger = forwardRef<HTMLButtonElement, StepsTriggerProps>(function StepsTrigger({ className, ...props }, ref) {
  return <AtomSteps.Trigger {...props} ref={ref} className={classes("brick-steps-trigger", className)} />;
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

export type StepsIndicatorProps = AtomStepsIndicatorProps;
export const StepsIndicator = forwardRef<HTMLSpanElement, StepsIndicatorProps>(function StepsIndicator({ children, className, asChild, render, ...props }, ref) {
  if (asChild && children == null) throw new Error("Steps.Indicator asChild requires an explicit host child.");
  return <AtomSteps.Indicator {...props} asChild={asChild} render={render} ref={ref} className={classes("brick-steps-indicator", className)}>
    {children ?? <AtomSteps.ItemContext>{state => state.completed ? <Checkmark checked variant="plain" className="brick-steps-check" /> : <FormatNumber value={state.index + 1} />}</AtomSteps.ItemContext>}
  </AtomSteps.Indicator>;
});
export const StepsContext = AtomSteps.Context;
export const StepsItemContext = AtomSteps.ItemContext;
export type { StepsContextProps, StepsItemContextProps, StepsContextValue, StepsItemState, StepsInvalidDetails, StepsOrientation } from "@flowstack-ui/atom/steps";
export const Steps = Object.freeze({ Root: StepsRoot, List: StepsList, Item: StepsItem, Trigger: StepsTrigger, Title: StepsTitle, Description: StepsDescription, Separator: StepsSeparator, Content: StepsContent, CompletedContent: StepsCompletedContent, NextTrigger: StepsNextTrigger, PrevTrigger: StepsPrevTrigger, Indicator: StepsIndicator, Context: StepsContext, ItemContext: StepsItemContext });
