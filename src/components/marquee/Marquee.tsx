"use client";

import { forwardRef, type ForwardRefExoticComponent, type RefAttributes } from "react";
import {
  Marquee as AtomMarquee, useMarquee as useAtomMarquee,
  useMarqueeContext as useAtomMarqueeContext,
  type MarqueeRootProps as AtomRootProps,
  type MarqueeRootProviderProps as AtomRootProviderProps,
  type MarqueeViewportProps as AtomViewportProps,
  type MarqueeContentProps as AtomContentProps,
  type MarqueeItemProps as AtomItemProps,
  type MarqueeContextProps as AtomContextProps,
  type MarqueeOptions as AtomOptions,
  type MarqueeController as AtomController,
} from "@flowstack-ui/atom/marquee";
import { resolveSpacingValue, type SpacingValue } from "../_spacing-value/SpacingValue.js";
import { staticPart, type StaticPartProps } from "../_internal/StaticPart.js";

export type MarqueeSide = "start" | "end" | "top" | "bottom";
export type MarqueeSpacing = SpacingValue;
export type MarqueeOptions = Omit<AtomOptions, "spacing"> & { spacing?: MarqueeSpacing };
export type MarqueeController = AtomController;
export type MarqueeRootProps = Omit<AtomRootProps, "spacing"> & { spacing?: MarqueeSpacing };
export type MarqueeRootProviderProps = AtomRootProviderProps;
export type MarqueeViewportProps = AtomViewportProps;
export type MarqueeContentProps = AtomContentProps;
export type MarqueeItemProps = AtomItemProps;
export type MarqueeContextProps = AtomContextProps;
export type MarqueeEdgeProps = StaticPartProps & { side?: MarqueeSide };

const classes = (part: string, extra?: string) => `${part}${extra ? ` ${extra}` : ""}`;

export function useMarquee({ spacing = 4, ...options }: MarqueeOptions = {}): ReturnType<typeof useAtomMarquee> {
  return useAtomMarquee({ ...options, spacing: resolveSpacingValue(spacing) });
}
export const useMarqueeContext = useAtomMarqueeContext;
export const MarqueeContext = AtomMarquee.Context;
export const MarqueeRoot = forwardRef<HTMLDivElement, MarqueeRootProps>(function MarqueeRoot({ spacing = 4, className, ...props }, ref) {
  return <AtomMarquee.Root {...props} ref={ref} spacing={resolveSpacingValue(spacing)} className={classes("brick-marquee", className)} />;
});
export const MarqueeRootProvider = forwardRef<HTMLDivElement, MarqueeRootProviderProps>(function MarqueeRootProvider({ className, ...props }, ref) {
  return <AtomMarquee.RootProvider {...props} ref={ref} className={classes("brick-marquee", className)} />;
});
export const MarqueeViewport: ForwardRefExoticComponent<MarqueeViewportProps & RefAttributes<HTMLDivElement>> = forwardRef<HTMLDivElement, MarqueeViewportProps>(function MarqueeViewport({ className, ...props }, ref) {
  return <AtomMarquee.Viewport {...props} ref={ref} className={classes("brick-marquee-viewport", className)} />;
});
export const MarqueeContent = forwardRef<HTMLDivElement, MarqueeContentProps>(function MarqueeContent({ className, ...props }, ref) {
  return <AtomMarquee.Content {...props} ref={ref} className={classes("brick-marquee-content", className)} />;
});
export const MarqueeItem: ForwardRefExoticComponent<MarqueeItemProps & RefAttributes<HTMLDivElement>> = forwardRef<HTMLDivElement, MarqueeItemProps>(function MarqueeItem({ className, ...props }, ref) {
  return <AtomMarquee.Item {...props} ref={ref} className={classes("brick-marquee-item", className)} />;
});
export const MarqueeEdge = forwardRef<HTMLElement, MarqueeEdgeProps>(function MarqueeEdge({ side = "start", ...props }, ref) {
  return staticPart("span", { ...props, "data-side": side, "aria-hidden": true }, ref, "brick-marquee-edge", "marquee-edge");
});
export const Marquee: Readonly<{
  Root: typeof MarqueeRoot; RootProvider: typeof MarqueeRootProvider;
  Context: typeof MarqueeContext; Viewport: typeof MarqueeViewport;
  Content: typeof MarqueeContent; Item: typeof MarqueeItem; Edge: typeof MarqueeEdge;
}> = Object.freeze({ Root: MarqueeRoot, RootProvider: MarqueeRootProvider, Context: MarqueeContext, Viewport: MarqueeViewport, Content: MarqueeContent, Item: MarqueeItem, Edge: MarqueeEdge });
