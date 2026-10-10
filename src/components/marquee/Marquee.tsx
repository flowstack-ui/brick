"use client";

import { createContext, useContext, createElement, forwardRef, type ReactNode, type ForwardRefExoticComponent, type RefAttributes } from "react";
import { composeHost } from "@flowstack-ui/atom/compose-host";
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
import { resolveSpacingValue, responsiveSpacingStyles, type SpacingValue } from "../_spacing-value/SpacingValue.js";
import { type ResponsiveValue } from "../_responsive-value/ResponsiveValue.js";
import { type StaticPartProps } from "../_internal/StaticPart.js";

export type MarqueeSide = "start" | "end" | "top" | "bottom";
export type MarqueeSpacing = ResponsiveValue<SpacingValue>;
export type MarqueeOptions = Omit<AtomOptions, "spacing"> & { spacing?: MarqueeSpacing };
export type MarqueeController = AtomController;
export type MarqueeRecipeProps = { spacing?: MarqueeSpacing; unstyled?: boolean };
export type MarqueePropsProviderProps = { value: MarqueeRecipeProps; children?: ReactNode };
export type MarqueeRootProps = Omit<AtomRootProps, "spacing"> & MarqueeRecipeProps;
export type MarqueeRootProviderProps = AtomRootProviderProps & { unstyled?: boolean };
export type MarqueeViewportProps = AtomViewportProps & { unstyled?: boolean };
export type MarqueeContentProps = AtomContentProps & { unstyled?: boolean };
export type MarqueeItemProps = AtomItemProps & { unstyled?: boolean };
export type MarqueeContextProps = AtomContextProps;
export type MarqueeEdgeProps = StaticPartProps & { side?: MarqueeSide; unstyled?: boolean };

const classes = (part: string, extra?: string, unstyled = false) => [unstyled ? undefined : part, extra].filter(Boolean).join(" ") || undefined;
const Defaults = createContext<MarqueeRecipeProps>({});
const Unstyled = createContext(false);
const spacingKey = Symbol("Marquee presentation spacing");
export function MarqueePropsProvider({ value, children }: MarqueePropsProviderProps) {
  const outer = useContext(Defaults);
  return <Defaults.Provider value={{ ...outer, ...Object.fromEntries(Object.entries(value).filter(([, v]) => v !== undefined)) }}>{children}</Defaults.Provider>;
}
export const MarqueeRootPropsProvider = MarqueePropsProvider;

export function useMarquee({ spacing: own, ...options }: MarqueeOptions = {}) {
  const defaults = useContext(Defaults);
  const spacing = own ?? defaults.spacing ?? 4;
  const value = useAtomMarquee({ ...options, spacing: typeof spacing === "object" ? "var(--brick-marquee-gap)" : resolveSpacingValue(spacing) });
  return { ...value, [spacingKey]: typeof spacing === "object" ? responsiveSpacingStyles("--brick-marquee-gap", spacing) : undefined };
}
export const useMarqueeContext = useAtomMarqueeContext;
export const MarqueeContext = AtomMarquee.Context;
export const MarqueeRoot = forwardRef<HTMLDivElement, MarqueeRootProps>(function MarqueeRoot({ id, ids, dir, side, reverse, speed, spacing, delay, loopCount, autoFill, paused, defaultPaused, pauseOnInteraction, translations, onPauseChange, onLoopComplete, onComplete, ...props }, ref) {
  const value = useMarquee({ id, ids, dir, side, reverse, speed, spacing, delay, loopCount, autoFill, paused, defaultPaused, pauseOnInteraction, translations, onPauseChange, onLoopComplete, onComplete });
  return <MarqueeRootProvider {...props} value={value} ref={ref} />;
});
export const MarqueeRootProvider = forwardRef<HTMLDivElement, MarqueeRootProviderProps>(function MarqueeRootProvider({ className, unstyled: own, style, value, ...props }, ref) {
  const defaults = useContext(Defaults);
  const unstyled = own ?? defaults.unstyled ?? false;
  const spacingStyle = (value as ReturnType<typeof useMarquee>)[spacingKey];
  return <Unstyled.Provider value={unstyled}><AtomMarquee.RootProvider {...props} value={value} ref={ref} style={{ ...spacingStyle, ...style }} data-unstyled={unstyled ? "" : undefined} className={classes("brick-marquee", className, unstyled)} /></Unstyled.Provider>;
});
export const MarqueeViewport: ForwardRefExoticComponent<MarqueeViewportProps & RefAttributes<HTMLDivElement>> = forwardRef<HTMLDivElement, MarqueeViewportProps>(function MarqueeViewport({ className, unstyled: own, ...props }, ref) {
  const inherited = useContext(Unstyled);
  return <AtomMarquee.Viewport {...props} ref={ref} className={classes("brick-marquee-viewport", className, own ?? inherited)} />;
});
export const MarqueeContent = forwardRef<HTMLDivElement, MarqueeContentProps>(function MarqueeContent({ className, unstyled: own, ...props }, ref) {
  const inherited = useContext(Unstyled);
  return <AtomMarquee.Content {...props} ref={ref} className={classes("brick-marquee-content", className, own ?? inherited)} />;
});
export const MarqueeItem: ForwardRefExoticComponent<MarqueeItemProps & RefAttributes<HTMLDivElement>> = forwardRef<HTMLDivElement, MarqueeItemProps>(function MarqueeItem({ className, unstyled: own, ...props }, ref) {
  const inherited = useContext(Unstyled);
  return <AtomMarquee.Item {...props} ref={ref} className={classes("brick-marquee-item", className, own ?? inherited)} />;
});
export const MarqueeEdge = forwardRef<HTMLElement, MarqueeEdgeProps>(function MarqueeEdge({ side = "start", asChild, children, className, unstyled: own, "data-slot": slot = "marquee-edge", ...props }, ref) {
  const inherited = useContext(Unstyled);
  const host = { ...props, ref, className: classes("brick-marquee-edge", className, own ?? inherited), "data-slot": slot, "data-side": side, "aria-hidden": true };
  return asChild ? composeHost(children, host) : createElement("span", host, children);
});
export const Marquee: Readonly<{
  Root: typeof MarqueeRoot; RootProvider: typeof MarqueeRootProvider;
  Context: typeof MarqueeContext; Viewport: typeof MarqueeViewport;
  Content: typeof MarqueeContent; Item: typeof MarqueeItem; Edge: typeof MarqueeEdge;
  PropsProvider: typeof MarqueePropsProvider; RootPropsProvider: typeof MarqueeRootPropsProvider;
}> = Object.freeze({ Root: MarqueeRoot, RootProvider: MarqueeRootProvider, Context: MarqueeContext, Viewport: MarqueeViewport, Content: MarqueeContent, Item: MarqueeItem, Edge: MarqueeEdge, PropsProvider: MarqueePropsProvider, RootPropsProvider: MarqueeRootPropsProvider });
