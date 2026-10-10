"use client";

import { Children, Fragment, createContext, forwardRef, isValidElement, useContext, type CSSProperties, type HTMLAttributes, type ReactElement, type ReactNode } from "react";
import { composeHost } from "@flowstack-ui/atom/compose-host";
import { Rating as AtomRating, useRatingContext, useRatingItemContext, type RatingRootProps as AtomRootProps, type RatingRootProviderProps as AtomProviderProps, type RatingItemProps as AtomItemProps, type RatingControlProps, type RatingLabelProps } from "@flowstack-ui/atom/rating";
import { responsiveDataAttributes, type ResponsiveValue } from "../_responsive-value/ResponsiveValue.js";
import { responsiveSpacingStyles, type SpacingValue } from "../_spacing-value/SpacingValue.js";

export { useRating, useRatingContext, useRatingItemContext } from "@flowstack-ui/atom/rating";
export type { RatingController, UseRatingProps, RatingContextValue, RatingItemContextValue, RatingControlProps, RatingLabelProps, RatingHiddenInputProps } from "@flowstack-ui/atom/rating";
export type RatingSize = "xs" | "sm" | "md" | "lg";
export type RatingTone = "accent" | "neutral";
export type RatingVariant = "solid" | "outline";
export type RatingDensity = "comfortable" | "compact";
export interface RatingPresentationProps {
  size?: ResponsiveValue<RatingSize>;
  tone?: RatingTone;
  variant?: ResponsiveValue<RatingVariant>;
  density?: ResponsiveValue<RatingDensity>;
  gap?: ResponsiveValue<SpacingValue>;
  fillColor?: CSSProperties["color"];
  emptyColor?: CSSProperties["color"];
}
export interface RatingRootProps extends AtomRootProps, RatingPresentationProps {}
export interface RatingRootProviderProps extends AtomProviderProps, RatingPresentationProps {}
export interface RatingItemProps extends AtomItemProps {
  /** Opaque wrappers and single-rendered emoji use content; decorative artwork is layered. */
  contentMode?: "artwork" | "content";
}
export interface RatingItemIndicatorProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> { icon?: ReactElement }
export interface RatingItemsProps { icon?: ReactElement }
export interface RatingPropsProviderProps extends RatingPresentationProps { children?: ReactNode }
export interface RatingDisplayProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children">, Omit<RatingPresentationProps, "density"> {
  label: string; value: number; max?: number; icon?: ReactElement; "data-slot"?: string;
}
export interface RatingSummaryProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children">, Pick<RatingPresentationProps, "size" | "tone" | "fillColor" | "gap"> {
  label: string; value: number; max?: number; valueText?: ReactNode; icon?: ReactElement; "data-slot"?: string;
}
const defaults = { size: "md", tone: "accent", variant: "solid", density: "comfortable" } as const;
const Presentation = createContext<RatingPresentationProps>(defaults);
const contentPart = Symbol.for("flowstack.rating.content");
const cn = (base: string, extra?: string) => extra ? base + " " + extra : base;
function split<T extends RatingPresentationProps>(props: T, inherited: RatingPresentationProps) {
  const { size = inherited.size ?? defaults.size, tone = inherited.tone ?? defaults.tone,
    variant = inherited.variant ?? defaults.variant, density = inherited.density ?? defaults.density,
    gap = inherited.gap, fillColor = inherited.fillColor, emptyColor = inherited.emptyColor, ...rest } = props;
  return { presentation: { size, tone, variant, density, gap, fillColor, emptyColor }, rest };
}
function attributes(p: RatingPresentationProps) {
  return { ...responsiveDataAttributes("data-size", p.size ?? "md", { defaultValue: "md", alwaysInitial: true }),
    ...responsiveDataAttributes("data-variant", p.variant ?? "solid", { defaultValue: "solid", alwaysInitial: true }),
    ...responsiveDataAttributes("data-density", p.density ?? "comfortable", { defaultValue: "comfortable", alwaysInitial: true }), "data-tone": p.tone ?? "accent" };
}
function presentationStyle(p: RatingPresentationProps, style?: CSSProperties): CSSProperties {
  return { ...(p.gap === undefined ? {} : responsiveSpacingStyles("--brick-rating-gap", p.gap)), ...style,
    ...(p.fillColor === undefined ? {} : { "--brick-rating-fill-color": p.fillColor }),
    ...(p.emptyColor === undefined ? {} : { "--brick-rating-empty-color": p.emptyColor }) };
}
function StarArtwork() {
  return <svg aria-hidden="true" focusable="false" className="brick-rating__star" viewBox="0 0 24 24"><path d="m12 2.6 2.86 5.8 6.4.93-4.63 4.51 1.09 6.38L12 17.21l-5.72 3.01 1.09-6.38-4.63-4.51 6.4-.93L12 2.6Z" /></svg>;
}
function Artwork({ icon }: { icon: ReactNode }) {
  return <><span className="brick-rating__artwork brick-rating__artwork--empty">{icon}</span><span className="brick-rating__artwork brick-rating__artwork--fill">{icon}</span></>;
}
export function RatingPropsProvider({ children, ...props }: RatingPropsProviderProps) {
  const { presentation } = split(props, useContext(Presentation));
  return <Presentation.Provider value={presentation}>{children}</Presentation.Provider>;
}
export const RatingRoot = forwardRef<HTMLDivElement, RatingRootProps>(function RatingRoot(props, ref) {
  const { presentation, rest: { className, style, children, ...rest } } = split(props, useContext(Presentation));
  return <Presentation.Provider value={presentation}><AtomRating.Root {...rest} {...attributes(presentation)} className={cn("brick-rating", className)} style={presentationStyle(presentation, style)} ref={ref}>
    {children === undefined ? <RatingControl /> : children}
  </AtomRating.Root></Presentation.Provider>;
});
export const RatingRootProvider = forwardRef<HTMLDivElement, RatingRootProviderProps>(function RatingRootProvider(props, ref) {
  const { presentation, rest: { className, style, children, ...rest } } = split(props, useContext(Presentation));
  return <Presentation.Provider value={presentation}><AtomRating.RootProvider {...rest} {...attributes(presentation)} className={cn("brick-rating", className)} style={presentationStyle(presentation, style)} ref={ref}>
    {children === undefined ? <RatingControl /> : children}
  </AtomRating.RootProvider></Presentation.Provider>;
});
export const RatingLabel = forwardRef<HTMLSpanElement, RatingLabelProps>(function RatingLabel({ className, ...props }, ref) {
  return <AtomRating.Label {...props} className={cn("brick-rating__label", className)} ref={ref} />;
});
Object.assign(RatingLabel, { [Symbol.for("flowstack.rating.part")]: "label" });
export const RatingControl = forwardRef<HTMLDivElement, RatingControlProps>(function RatingControl({ className, children, ...props }, ref) {
  return <AtomRating.Control {...props} className={cn("brick-rating__control", className)} ref={ref}>{children === undefined ? <RatingItems /> : children}</AtomRating.Control>;
});
export const RatingHiddenInput = AtomRating.HiddenInput;
export const RatingContext = AtomRating.Context;
export const RatingItemContext = Object.assign(AtomRating.ItemContext, { [contentPart]: true });
export const RatingItemIndicator = Object.assign(forwardRef<HTMLSpanElement, RatingItemIndicatorProps>(function RatingItemIndicator({ icon, className, style, ...props }, ref) {
  const item = useRatingItemContext();
  return <span {...props} ref={ref} aria-hidden="true" className={cn("brick-rating__indicator", className)} style={{ ...style, "--brick-rating-fill": item.fill + "%" } as CSSProperties}><Artwork icon={icon ?? <StarArtwork />} /></span>;
}), { [contentPart]: true });
function hasContent(nodes: ReactNode): boolean {
  return Children.toArray(nodes).some(node => isValidElement<{ children?: ReactNode }>(node) &&
    ((node.type as unknown as Record<symbol, boolean>)[contentPart] || (node.type === Fragment && hasContent(node.props.children))));
}
export const RatingItem = forwardRef<HTMLSpanElement, RatingItemProps>(function RatingItem({ children, className, style, value, contentMode, asChild, ...props }, ref) {
  const context = useRatingContext();
  const state = context.getItemState(value);
  const host = asChild ? Children.only(children) as ReactElement<{ children?: ReactNode }> : null;
  const authored = host ? host.props.children : children;
  const explicitContent = contentMode === "content" || (contentMode === undefined && hasContent(authored));
  const content = explicitContent ? authored : authored === undefined ? <RatingItemIndicator /> : <Artwork icon={authored} />;
  return <AtomRating.Item {...props} asChild={asChild} value={value} className={cn("brick-rating__item", className)} style={{ ...style, "--brick-rating-fill": state.fill + "%" } as CSSProperties} ref={ref}>
    {host ? composeHost(host, { children: content }) : content}
  </AtomRating.Item>;
});
export function RatingItems({ icon }: RatingItemsProps = {}) {
  const context = useRatingContext();
  if (!context.items.length) throw new Error("Rating.Items requires integer min/max endpoints and at most 1000 items; compose explicit Items for custom endpoints.");
  return <>{context.items.map(value => <RatingItem key={value} value={value}><RatingItemIndicator icon={icon} /></RatingItem>)}</>;
}
export const RatingDisplay = forwardRef<HTMLSpanElement, RatingDisplayProps>(function RatingDisplay(props, ref) {
  const { presentation, rest: { className, style, label, max = 5, value, icon, "data-slot": slot = "rating-display", ...rest } } = split(props, useContext(Presentation));
  const safeMax = Number.isFinite(max) ? Math.min(1000, Math.max(1, Math.floor(max))) : 5;
  const safeValue = Number.isFinite(value) ? Math.min(safeMax, Math.max(0, value)) : 0;
  return <span {...rest} {...attributes(presentation)} ref={ref} role="img" aria-label={label} data-slot={slot} className={cn("brick-rating brick-rating--display", className)} style={presentationStyle(presentation, style)}>
    {Array.from({ length: safeMax }, (_, index) => <span aria-hidden="true" className="brick-rating__item" key={index} style={{ "--brick-rating-fill": Math.min(1, Math.max(0, safeValue - index)) * 100 + "%" } as CSSProperties}><Artwork icon={icon ?? <StarArtwork />} /></span>)}
  </span>;
});
export const RatingSummary = forwardRef<HTMLSpanElement, RatingSummaryProps>(function RatingSummary(props, ref) {
  const { presentation, rest: { className, style, label, max = 5, value, valueText, icon, "data-slot": slot = "rating-summary", ...rest } } = split(props, useContext(Presentation));
  const safeMax = Number.isFinite(max) ? Math.max(1, max) : 5;
  const safeValue = Number.isFinite(value) ? Math.min(safeMax, Math.max(0, value)) : 0;
  return <span {...rest} {...attributes(presentation)} ref={ref} role="img" aria-label={label} data-slot={slot} className={cn("brick-rating-summary", className)} style={presentationStyle(presentation, style)}>
    <span aria-hidden="true" className="brick-rating-summary__artwork">{icon ?? <StarArtwork />}</span><span aria-hidden="true" className="brick-rating-summary__value">{valueText ?? String(safeValue)}</span>
  </span>;
});
export const Rating = Object.freeze({ Root: RatingRoot, RootProvider: RatingRootProvider, PropsProvider: RatingPropsProvider,
  Label: RatingLabel, Control: RatingControl, Item: RatingItem, Items: RatingItems, ItemIndicator: RatingItemIndicator,
  HiddenInput: RatingHiddenInput, Context: RatingContext, ItemContext: RatingItemContext, Display: RatingDisplay, Summary: RatingSummary });
