import { forwardRef, type BlockquoteHTMLAttributes, type HTMLAttributes, type ReactElement, type ReactNode } from "react";
import { staticPart } from "../_internal/StaticPart.js";

export type BlockquoteVariant = "subtle" | "solid" | "accent" | "surface" | "plain";
export type BlockquoteTone = "neutral" | "accent" | "info" | "success" | "warning" | "danger";
export type BlockquoteAlign = "start" | "center" | "end";
type Host = { asChild?: false; children?: ReactNode } | { asChild: true; children: ReactElement };
type Part = Omit<HTMLAttributes<HTMLElement>, "children"> & Host & { "data-slot"?: string };
export type BlockquoteRootProps = Part & { variant?: BlockquoteVariant; tone?: BlockquoteTone; align?: BlockquoteAlign };
export type BlockquoteIconProps = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & Host & { "data-slot"?: string };
export type BlockquoteContentProps = Omit<BlockquoteHTMLAttributes<HTMLQuoteElement>, "children"> & Host & { "data-slot"?: string };
export type BlockquoteCaptionProps = Part;
export type BlockquoteCiteProps = Part;

export const BlockquoteRoot = forwardRef<HTMLElement, BlockquoteRootProps>(function BlockquoteRoot(
  { align = "start", variant = "subtle", tone = variant === "accent" ? "accent" : "neutral", "data-slot": dataSlot, ...props }, ref,
) {
  return staticPart("figure", { ...props, "data-slot": dataSlot, "data-align": align, "data-variant": variant, "data-tone": tone }, ref, "brick-blockquote", "blockquote");
});

export const BlockquoteIcon = forwardRef<HTMLSpanElement, BlockquoteIconProps>(function BlockquoteIcon(
  { "aria-hidden": ariaHidden = true, children, ...props }, ref,
) {
  const defaultIcon = <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M6 4a4 4 0 0 0-4 4v5h5v1a4 4 0 0 1-4 4v2a6 6 0 0 0 6-6V4H6Zm12 0a4 4 0 0 0-4 4v5h5v1a4 4 0 0 1-4 4v2a6 6 0 0 0 6-6V4h-3Z" /></svg>;
  return staticPart("span", { ...props, children: children ?? defaultIcon, "aria-hidden": ariaHidden } as Parameters<typeof staticPart>[1], ref, "brick-blockquote__icon", "blockquote-icon");
});
export const BlockquoteContent = forwardRef<HTMLQuoteElement, BlockquoteContentProps>(function BlockquoteContent(props, ref) {
  return staticPart("blockquote", props, ref, "brick-blockquote__content", "blockquote-content");
});
export const BlockquoteCaption = forwardRef<HTMLElement, BlockquoteCaptionProps>(function BlockquoteCaption(props, ref) {
  return staticPart("figcaption", props, ref, "brick-blockquote__caption", "blockquote-caption");
});
export const BlockquoteCite = forwardRef<HTMLElement, BlockquoteCiteProps>(function BlockquoteCite(props, ref) {
  return staticPart("cite", props, ref, "brick-blockquote__cite", "blockquote-cite");
});

BlockquoteRoot.displayName = "Blockquote.Root";
BlockquoteIcon.displayName = "Blockquote.Icon";
BlockquoteContent.displayName = "Blockquote.Content";
BlockquoteCaption.displayName = "Blockquote.Caption";
BlockquoteCite.displayName = "Blockquote.Cite";
export const Blockquote = Object.freeze({ Root: BlockquoteRoot, Icon: BlockquoteIcon, Content: BlockquoteContent, Caption: BlockquoteCaption, Cite: BlockquoteCite });
