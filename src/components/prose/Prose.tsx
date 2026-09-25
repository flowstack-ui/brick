import {
  createElement,
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { responsiveDataAttributes, type ResponsiveValue } from "../_responsive-value/ResponsiveValue.js";

export type ProseElement = "div" | "article" | "section";
export type ProseSize = "sm" | "md" | "lg";
export type ProseMeasure = "narrow" | "default" | "wide" | "none" | "reading";
export type ProseTone = "primary" | "secondary" | "inherit";
export type ProseCodeOverflow = "wrap" | "scroll";
export type ProseTableLayout = "fixed" | "auto";

export interface ProseProps extends Omit<HTMLAttributes<HTMLElement>, "children" | "dangerouslySetInnerHTML"> {
  as?: ProseElement;
  children?: ReactNode;
  size?: ResponsiveValue<ProseSize>;
  measure?: ProseMeasure;
  tone?: ProseTone;
  codeOverflow?: ProseCodeOverflow;
  tableLayout?: ProseTableLayout;
}

function mergeClassName(className?: string) {
  return className ? `brick-prose ${className}` : "brick-prose";
}

const ProseRoot = forwardRef<HTMLElement, ProseProps>(function Prose(
  {
    as = "div",
    children,
    className,
    measure = "default",
    size = "md",
    tone = "secondary",
    codeOverflow = "wrap",
    tableLayout = "fixed",
    slot = "prose",
    ...props
  },
  ref,
) {
  // Keep the documented React-children-only boundary true for untyped
  // JavaScript consumers as well as TypeScript callers.
  const { dangerouslySetInnerHTML: _blockedHtml, ...safeProps } = props as HTMLAttributes<HTMLElement>;

  return createElement(
    as,
    {
      ...safeProps,
      className: mergeClassName(className),
      "data-measure": measure,
      ...responsiveDataAttributes("data-size", size, { defaultValue: "md", alwaysInitial: true }),
      "data-tone": tone,
      "data-code-overflow": codeOverflow,
      "data-table-layout": tableLayout,
      "data-slot": slot,
      ref,
    },
    children,
  );
});

ProseRoot.displayName = "Prose";

export type ProseContentProps = Omit<HTMLAttributes<HTMLDivElement>, "dangerouslySetInnerHTML">;
export type ProseExcludeProps = ProseContentProps;

const Content = forwardRef<HTMLDivElement, ProseContentProps>(function ProseContent(
  { className, ...props }, ref,
) {
  const { dangerouslySetInnerHTML: _blockedHtml, ...safeProps } = props as HTMLAttributes<HTMLDivElement>;
  return <div {...safeProps} className={["brick-prose-content", className].filter(Boolean).join(" ")} data-slot="prose-content" ref={ref} />;
});
const Exclude = forwardRef<HTMLDivElement, ProseExcludeProps>(function ProseExclude(
  { className, ...props }, ref,
) {
  const { dangerouslySetInnerHTML: _blockedHtml, ...safeProps } = props as HTMLAttributes<HTMLDivElement>;
  return <div {...safeProps} className={["brick-prose-exclude", className].filter(Boolean).join(" ")} data-prose-exclude="" data-slot="prose-exclude" ref={ref} />;
});
Content.displayName = "Prose.Content";
Exclude.displayName = "Prose.Exclude";
export const Prose = Object.assign(ProseRoot, { Content, Exclude });
