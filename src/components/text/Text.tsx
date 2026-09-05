import {
  createElement,
  forwardRef,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import {
  responsiveDataAttributes,
  type ResponsiveValue,
} from "../_responsive-value/ResponsiveValue.js";

export type TextElement =
  "span" | "p" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type TextVariant =
  | "display"
  | "display-sm"
  | "display-md"
  | "display-lg"
  | "display-xl"
  | "title-xl"
  | "title-lg"
  | "title-md"
  | "title-sm"
  | "title-xs"
  | "title-2xs"
  | "body-xl"
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
export type TextTransform = "none" | "uppercase" | "lowercase" | "capitalize";
export type TextLineClamp = 2 | 3 | 4 | 5 | 6;
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingVariant =
  | "display"
  | "display-sm"
  | "display-md"
  | "display-lg"
  | "display-xl"
  | "title-xl"
  | "title-lg"
  | "title-md"
  | "title-sm"
  | "title-xs"
  | "title-2xs";
export type ParagraphVariant = "body-xl" | "body-lg" | "body-md" | "body-sm";

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

type TextVisualProps = {
  as?: TextElement;
  children: ReactNode;
  variant?: ResponsiveValue<TextVariant>;
  tone?: TextTone;
  weight?: TextWeight;
  align?: ResponsiveValue<TextAlign>;
  wrap?: TextWrap;
  transform?: TextTransform;
  className?: string;
  style?: CSSProperties;
  slot?: string;
};

export type TextProps = TextNativeProps & TextOverflowProps & TextVisualProps;

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
    transform,
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
      ...responsiveDataAttributes("data-align", align),
      "data-line-clamp": lineClamp,
      "data-slot": slot,
      "data-tone": tone,
      "data-transform": transform,
      "data-truncate": truncate ? "" : undefined,
      ...responsiveDataAttributes("data-variant", variant, {
        alwaysInitial: true,
      }),
      "data-weight": weight,
      "data-wrap": wrap !== "wrap" ? wrap : undefined,
      ref,
    },
    children,
  );
});

Text.displayName = "Text";

type NamedTextProps = TextNativeProps &
  TextOverflowProps &
  Omit<TextVisualProps, "as" | "variant">;

export type HeadingProps = NamedTextProps & {
  level: HeadingLevel;
  variant?: ResponsiveValue<HeadingVariant>;
};

export const Heading = forwardRef<HTMLElement, HeadingProps>(function Heading(
  { level, variant = "title-md", ...props },
  ref,
) {
  return <Text {...props} as={`h${level}`} ref={ref} variant={variant} />;
});

Heading.displayName = "Heading";

export type ParagraphProps = NamedTextProps & {
  variant?: ResponsiveValue<ParagraphVariant>;
};

export const Paragraph = forwardRef<HTMLElement, ParagraphProps>(
  function Paragraph({ variant = "body-md", ...props }, ref) {
    return <Text {...props} as="p" ref={ref} variant={variant} />;
  },
);

Paragraph.displayName = "Paragraph";

export type CaptionProps = NamedTextProps;

export const Caption = forwardRef<HTMLElement, CaptionProps>(
  function Caption(props, ref) {
    return <Text {...props} as="span" ref={ref} variant="caption" />;
  },
);

Caption.displayName = "Caption";

export type EyebrowProps = NamedTextProps;

export const Eyebrow = forwardRef<HTMLElement, EyebrowProps>(
  function Eyebrow(props, ref) {
    return <Text {...props} as="span" ref={ref} variant="eyebrow" />;
  },
);

Eyebrow.displayName = "Eyebrow";
