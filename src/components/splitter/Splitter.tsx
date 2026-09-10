"use client";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { Splitter as AtomSplitter, type SplitterRootProps, type SplitterPanelProps, type SplitterResizeTriggerProps } from "@flowstack-ui/atom/splitter";
export type { SplitterRootProps, SplitterPanelProps, SplitterResizeTriggerProps, SplitterContextProps, SplitterContextValue, SplitterPanelConfig, SplitterSize, SplitterSizes, SplitterResizeDetails, SplitterOrientation } from "@flowstack-ui/atom/splitter";
const classes = (base: string, extra?: string) => extra ? `${base} ${extra}` : base;
export const SplitterRoot = forwardRef<HTMLDivElement, SplitterRootProps>(function SplitterRoot({ className, ...props }, ref) {
  return <AtomSplitter.Root {...props} ref={ref} className={classes("brick-splitter", className)} />;
});
export const SplitterPanel = forwardRef<HTMLDivElement, SplitterPanelProps>(function SplitterPanel({ className, ...props }, ref) {
  return <AtomSplitter.Panel {...props} ref={ref} className={classes("brick-splitter-panel", className)} />;
});
export type SplitterResizeTriggerSeparatorProps = ComponentPropsWithoutRef<"span">;
export type SplitterResizeTriggerIndicatorProps = ComponentPropsWithoutRef<"span">;
export const SplitterResizeTriggerSeparator = forwardRef<HTMLSpanElement, SplitterResizeTriggerSeparatorProps>(function SplitterResizeTriggerSeparator({ className, ...props }, ref) {
  return <span {...props} ref={ref} aria-hidden="true" className={classes("brick-splitter-separator", className)} />;
});
export const SplitterResizeTriggerIndicator = forwardRef<HTMLSpanElement, SplitterResizeTriggerIndicatorProps>(function SplitterResizeTriggerIndicator({ className, ...props }, ref) {
  return <span {...props} ref={ref} aria-hidden="true" className={classes("brick-splitter-indicator", className)} />;
});
export const SplitterResizeTrigger = forwardRef<HTMLDivElement, SplitterResizeTriggerProps>(function SplitterResizeTrigger({ className, children, asChild, ...props }, ref) {
  if (asChild && children == null) throw new Error("Splitter.ResizeTrigger asChild requires an explicit child.");
  return <AtomSplitter.ResizeTrigger {...props} asChild={asChild} ref={ref} className={classes("brick-splitter-trigger", className)}>
    {children ?? <><SplitterResizeTriggerSeparator /><SplitterResizeTriggerIndicator /></>}
  </AtomSplitter.ResizeTrigger>;
});
export const SplitterContext = AtomSplitter.Context;
export const Splitter = Object.freeze({ Root: SplitterRoot, Panel: SplitterPanel, ResizeTrigger: SplitterResizeTrigger,
  ResizeTriggerSeparator: SplitterResizeTriggerSeparator, ResizeTriggerIndicator: SplitterResizeTriggerIndicator, Context: SplitterContext });
