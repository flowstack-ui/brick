import {
  createElement,
  forwardRef,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";
import { layoutHost } from "../_internal/layout-host.js";
import { radiusStyle, type Radius } from "../_radius/Radius.js";
import {
  responsiveDataAttributes,
  type ResponsiveValue,
} from "../_responsive-value/ResponsiveValue.js";
import {
  responsiveSpacingStyles,
  type SpacingValue,
} from "../_spacing-value/SpacingValue.js";

export type CardVariant = "outline" | "elevated" | "subtle";
export type CardSize = "sm" | "md" | "lg";
export type CardRootElement = "div" | "article" | "section" | "li";
export type CardTitleElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type HostProps =
  | { asChild?: false; children?: ReactNode }
  | { asChild: true; children: ReactElement };
type NativePart<T extends HTMLElement> = Omit<HTMLAttributes<T>, "children"> &
  HostProps & { "data-slot"?: string };
type RegionProps = NativePart<HTMLDivElement> & {
  gap?: ResponsiveValue<SpacingValue>;
};
type CardHostProps =
  | { as?: CardRootElement; asChild?: false; children?: ReactNode }
  | { as?: never; asChild: true; children: ReactElement };
export type CardRootProps = Omit<HTMLAttributes<HTMLElement>, "children"> &
  CardHostProps & {
    selected?: boolean;
    radius?: Radius;
    overflow?: "clip" | "visible";
    bordered?: boolean;
    variant?: ResponsiveValue<CardVariant>;
    size?: ResponsiveValue<CardSize>;
    "data-slot"?: string;
  };
export type CardHeaderProps = RegionProps;
export type CardTitleProps = Omit<
  HTMLAttributes<HTMLHeadingElement>,
  "children"
> & { "data-slot"?: string } & (
    | { as?: CardTitleElement; asChild?: false; children?: ReactNode }
    | { as?: never; asChild: true; children: ReactElement }
  );
export type CardDescriptionProps = NativePart<HTMLParagraphElement>;
export type CardActionProps = RegionProps;
export type CardContentProps = RegionProps;
export type CardFooterProps = RegionProps & {
  justify?: ResponsiveValue<
    "start" | "center" | "end" | "between" | "around" | "evenly"
  >;
};

const CardRoot = forwardRef<HTMLElement, CardRootProps>(function CardRoot(
  {
    as = "div",
    asChild = false,
    overflow = "clip",
    bordered,
    selected = false,
    variant = "outline",
    size = "md",
    radius,
    style,
    className,
    children,
    "data-slot": slot = "card",
    ...native
  },
  ref,
) {
  const props = {
    ...native,
    className: ["brick-card", className].filter(Boolean).join(" "),
    style: radiusStyle(radius, "--brick-card-radius", style),
    "data-bordered": bordered === undefined ? undefined : String(bordered),
    "data-selected": selected ? "" : undefined,
    "data-overflow": overflow,
    "data-slot": slot,
    ...responsiveDataAttributes("data-size", size, {
      defaultValue: "md",
      alwaysInitial: true,
    }),
    ...responsiveDataAttributes("data-variant", variant, {
      defaultValue: "outline",
      alwaysInitial: true,
    }),
  };
  return asChild
    ? layoutHost(children, props, ref, "Card.Root")
    : createElement(as, { ...props, ref }, children);
});

// Presentation-only projection; the shared host helper owns ref and event merging.
function part(
  tag: string,
  name: string,
  props: NativePart<HTMLElement> & {
    gap?: ResponsiveValue<SpacingValue>;
    justify?: CardFooterProps["justify"];
  },
  ref: Ref<HTMLElement>,
) {
  const {
    asChild = false,
    children,
    className,
    style,
    gap,
    justify,
    "data-slot": slot = `card-${name}`,
    ...native
  } = props;
  const host = {
    ...native,
    className: [`brick-card-${name}`, className].filter(Boolean).join(" "),
    "data-slot": slot,
    ...(justify === undefined
      ? {}
      : responsiveDataAttributes("data-card-justify", justify)),
    style: {
      ...(gap === undefined
        ? {}
        : responsiveSpacingStyles("--brick-card-region-gap", gap)),
      ...style,
    },
  };
  return asChild
    ? layoutHost(children, host, ref, `Card.${name}`)
    : createElement(tag, { ...host, ref }, children);
}
const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>((props, ref) =>
  part("div", "header", props, ref),
);
const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  function CardTitle({ as = "h3", ...props }, ref) {
    return part(as, "title", props, ref);
  },
);
const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  (props, ref) => part("p", "description", props, ref),
);
const CardAction = forwardRef<HTMLDivElement, CardActionProps>((props, ref) =>
  part("div", "action", props, ref),
);
const CardContent = forwardRef<HTMLDivElement, CardContentProps>((props, ref) =>
  part("div", "content", props, ref),
);
const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>((props, ref) =>
  part("div", "footer", props, ref),
);
CardRoot.displayName = "Card.Root";
CardHeader.displayName = "Card.Header";
CardTitle.displayName = "Card.Title";
CardDescription.displayName = "Card.Description";
CardAction.displayName = "Card.Action";
CardContent.displayName = "Card.Content";
CardFooter.displayName = "Card.Footer";
export const Card = Object.freeze({
  Root: CardRoot,
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Action: CardAction,
  Content: CardContent,
  Footer: CardFooter,
});
