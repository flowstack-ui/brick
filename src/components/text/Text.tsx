import {
  createElement,
  forwardRef,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";

export type TextElement =
  | "span"
  | "p"
  | "div"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6";

export type TextVariant =
  | "display"
  | "title-lg"
  | "title-md"
  | "title-sm"
  | "body-lg"
  | "body-md"
  | "body-sm"
  | "caption"
  | "eyebrow";

export type TextTone =
  | "inherit"
  | "primary"
  | "secondary"
  | "muted"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "danger";

export type TextWeight = "inherit" | "regular" | "medium" | "semibold";
export type TextAlign = "start" | "center" | "end";
export type TextWrap = "wrap" | "nowrap" | "balance" | "pretty";
export type TextLineClamp = 2 | 3 | 4 | 5 | 6;

type TextNativeProps = Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "className" | "color" | "style"
>;

type TextOverflowProps =
  | {
      truncate?: boolean;
      lineClamp?: never;
    }
  | {
      truncate?: false;
      lineClamp?: TextLineClamp;
    };

export type TextProps = TextNativeProps &
  TextOverflowProps & {
    as?: TextElement;
    children: ReactNode;
    variant?: TextVariant;
    tone?: TextTone;
    weight?: TextWeight;
    align?: TextAlign;
    wrap?: TextWrap;
    className?: string;
    style?: CSSProperties;
    slot?: string;
  };

function mergeClassName(className: string | undefined) {
  return className ? `brick-text ${className}` : "brick-text";
}

export const Text = forwardRef<HTMLElement, TextProps>(function Text(
  {
    as = "span",
    variant = "body-md",
    tone = "primary",
    weight,
    align,
    wrap = "wrap",
    truncate = false,
    lineClamp,
    className,
    slot = "text",
    children,
    ...props
  },
  ref,
) {
  return createElement(
    as,
    {
      ...props,
      className: mergeClassName(className),
      "data-align": align,
      "data-line-clamp": lineClamp,
      "data-slot": slot,
      "data-tone": tone,
      "data-truncate": truncate ? "" : undefined,
      "data-variant": variant,
      "data-weight": weight,
      "data-wrap": wrap !== "wrap" ? wrap : undefined,
      ref,
    },
    children,
  );
});

Text.displayName = "Text";
