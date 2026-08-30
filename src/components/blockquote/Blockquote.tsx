import {
  forwardRef,
  type BlockquoteHTMLAttributes,
  type HTMLAttributes,
} from "react";

export type BlockquoteVariant = "accent" | "surface" | "plain";
export type BlockquoteAlign = "start" | "center" | "end";

export interface BlockquoteRootProps extends HTMLAttributes<HTMLElement> {
  variant?: BlockquoteVariant;
  align?: BlockquoteAlign;
  "data-slot"?: string;
}

export interface BlockquoteIconProps extends HTMLAttributes<HTMLSpanElement> {
  "data-slot"?: string;
}

export interface BlockquoteContentProps extends BlockquoteHTMLAttributes<HTMLQuoteElement> {
  "data-slot"?: string;
}

export interface BlockquoteCaptionProps extends HTMLAttributes<HTMLElement> {
  "data-slot"?: string;
}

export interface BlockquoteCiteProps extends HTMLAttributes<HTMLElement> {
  "data-slot"?: string;
}

function mergeClassName(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

function slotOrDefault(slot: string | undefined, fallback: string) {
  return slot ?? fallback;
}

export const BlockquoteRoot = forwardRef<HTMLElement, BlockquoteRootProps>(function BlockquoteRoot(
  { align = "start", variant = "accent", className, "data-slot": dataSlot, ...props },
  ref,
) {
  return <figure {...props} className={mergeClassName("brick-blockquote", className)} data-align={align} data-slot={slotOrDefault(dataSlot, "blockquote")} data-variant={variant} ref={ref} />;
});

export const BlockquoteIcon = forwardRef<HTMLSpanElement, BlockquoteIconProps>(function BlockquoteIcon(
  { "aria-hidden": ariaHidden = true, children = "“", className, "data-slot": dataSlot, ...props },
  ref,
) {
  return <span {...props} aria-hidden={ariaHidden} className={mergeClassName("brick-blockquote__icon", className)} data-slot={slotOrDefault(dataSlot, "blockquote-icon")} ref={ref}>{children}</span>;
});

export const BlockquoteContent = forwardRef<HTMLQuoteElement, BlockquoteContentProps>(function BlockquoteContent(
  { className, "data-slot": dataSlot, ...props },
  ref,
) {
  return <blockquote {...props} className={mergeClassName("brick-blockquote__content", className)} data-slot={slotOrDefault(dataSlot, "blockquote-content")} ref={ref} />;
});

export const BlockquoteCaption = forwardRef<HTMLElement, BlockquoteCaptionProps>(function BlockquoteCaption(
  { className, "data-slot": dataSlot, ...props },
  ref,
) {
  return <figcaption {...props} className={mergeClassName("brick-blockquote__caption", className)} data-slot={slotOrDefault(dataSlot, "blockquote-caption")} ref={ref} />;
});

export const BlockquoteCite = forwardRef<HTMLElement, BlockquoteCiteProps>(function BlockquoteCite(
  { className, "data-slot": dataSlot, ...props },
  ref,
) {
  return <cite {...props} className={mergeClassName("brick-blockquote__cite", className)} data-slot={slotOrDefault(dataSlot, "blockquote-cite")} ref={ref} />;
});

BlockquoteRoot.displayName = "Blockquote.Root";
BlockquoteIcon.displayName = "Blockquote.Icon";
BlockquoteContent.displayName = "Blockquote.Content";
BlockquoteCaption.displayName = "Blockquote.Caption";
BlockquoteCite.displayName = "Blockquote.Cite";

export const Blockquote = Object.freeze({
  Root: BlockquoteRoot,
  Icon: BlockquoteIcon,
  Content: BlockquoteContent,
  Caption: BlockquoteCaption,
  Cite: BlockquoteCite,
});
