import { forwardRef } from "react";
import { staticPart, type StaticPartProps } from "../_internal/StaticPart.js";

export type TimelineSize = "sm" | "md" | "lg" | "xl";
export type TimelineVariant = "soft" | "solid" | "outline" | "plain";
export type TimelineTone = "neutral" | "accent" | "info" | "success" | "warning" | "danger";
export type TimelineSide = "before" | "after";
export type TimelineRootProps = StaticPartProps & { size?: TimelineSize; variant?: TimelineVariant; tone?: TimelineTone; showLastSeparator?: boolean };
export type TimelineItemProps = StaticPartProps & { tone?: TimelineTone };
export type TimelineContentProps = StaticPartProps & { side?: TimelineSide };
export type TimelineConnectorProps = StaticPartProps;
export type TimelineSeparatorProps = StaticPartProps;
export type TimelineIndicatorProps = StaticPartProps;
export type TimelineTitleProps = StaticPartProps;
export type TimelineDescriptionProps = StaticPartProps;

export const TimelineRoot = forwardRef<HTMLElement, TimelineRootProps>(function TimelineRoot({ size = "md", variant = "solid", tone = "neutral", showLastSeparator = false, ...props }, ref) {
  return staticPart("ol", { ...props, "data-size": size, "data-variant": variant, "data-tone": tone, "data-show-last-separator": showLastSeparator }, ref, "brick-timeline", "timeline");
});
export const TimelineItem = forwardRef<HTMLElement, TimelineItemProps>(function TimelineItem({ tone, ...props }, ref) {
  return staticPart("li", { ...props, "data-tone": tone }, ref, "brick-timeline-item", "timeline-item");
});
export const TimelineContent = forwardRef<HTMLElement, TimelineContentProps>(function TimelineContent({ side = "after", ...props }, ref) {
  return staticPart("div", { ...props, "data-side": side }, ref, "brick-timeline-content", "timeline-content");
});
export const TimelineConnector = forwardRef<HTMLElement, TimelineConnectorProps>((props, ref) => staticPart("div", { ...props, "aria-hidden": true }, ref, "brick-timeline-connector", "timeline-connector"));
export const TimelineSeparator = forwardRef<HTMLElement, TimelineSeparatorProps>((props, ref) => staticPart("span", { ...props, "aria-hidden": true }, ref, "brick-timeline-separator", "timeline-separator"));
export const TimelineIndicator = forwardRef<HTMLElement, TimelineIndicatorProps>((props, ref) => staticPart("span", { ...props, "aria-hidden": true }, ref, "brick-timeline-indicator", "timeline-indicator"));
export const TimelineTitle = forwardRef<HTMLElement, TimelineTitleProps>((props, ref) => staticPart("p", props, ref, "brick-timeline-title", "timeline-title"));
export const TimelineDescription = forwardRef<HTMLElement, TimelineDescriptionProps>((props, ref) => staticPart("p", props, ref, "brick-timeline-description", "timeline-description"));
TimelineRoot.displayName = "Timeline.Root";
TimelineItem.displayName = "Timeline.Item";
TimelineConnector.displayName = "Timeline.Connector";
TimelineSeparator.displayName = "Timeline.Separator";
TimelineIndicator.displayName = "Timeline.Indicator";
TimelineContent.displayName = "Timeline.Content";
TimelineTitle.displayName = "Timeline.Title";
TimelineDescription.displayName = "Timeline.Description";
export const Timeline = Object.freeze({ Root: TimelineRoot, Item: TimelineItem, Connector: TimelineConnector, Separator: TimelineSeparator, Indicator: TimelineIndicator, Content: TimelineContent, Title: TimelineTitle, Description: TimelineDescription });
