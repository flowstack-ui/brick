import { createElement, forwardRef, type HTMLAttributes } from "react";

export type CardVariant = "outline" | "elevated" | "subtle";
export type CardSize = "sm" | "md" | "lg";
export type CardRootElement = "div" | "article" | "section" | "li";
export type CardTitleElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface CardRootProps extends HTMLAttributes<HTMLElement> {
  as?: CardRootElement;
  variant?: CardVariant;
  size?: CardSize;
  "data-slot"?: string;
}

type SlottedProps<T> = T & { "data-slot"?: string };

export type CardHeaderProps = SlottedProps<HTMLAttributes<HTMLDivElement>>;

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: CardTitleElement;
  "data-slot"?: string;
}

export type CardDescriptionProps = SlottedProps<HTMLAttributes<HTMLParagraphElement>>;
export type CardActionProps = SlottedProps<HTMLAttributes<HTMLDivElement>>;
export type CardContentProps = SlottedProps<HTMLAttributes<HTMLDivElement>>;
export type CardFooterProps = SlottedProps<HTMLAttributes<HTMLDivElement>>;

function mergeClassName(base: string, className: string | undefined) {
  return className ? `${base} ${className}` : base;
}

function slotOrDefault(slot: string | undefined, defaultSlot: string) {
  return slot ?? defaultSlot;
}

const CardRoot = forwardRef<HTMLElement, CardRootProps>(function CardRoot(
  {
    as = "div",
    variant = "outline",
    size = "md",
    className,
    children,
    "data-slot": dataSlot,
    ...rootProps
  },
  ref,
) {
  return createElement(
    as,
    {
      ...rootProps,
      className: mergeClassName("brick-card", className),
      "data-size": size,
      "data-slot": slotOrDefault(dataSlot, "card"),
      "data-variant": variant,
      ref,
    },
    children,
  );
});

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(function CardHeader(
  { className, "data-slot": dataSlot, ...props },
  ref,
) {
  return (
    <div
      {...props}
      className={mergeClassName("brick-card-header", className)}
      data-slot={slotOrDefault(dataSlot, "card-header")}
      ref={ref}
    />
  );
});

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(function CardTitle(
  { as = "h3", className, children, "data-slot": dataSlot, ...props },
  ref,
) {
  return createElement(
    as,
    {
      ...props,
      className: mergeClassName("brick-card-title", className),
      "data-slot": slotOrDefault(dataSlot, "card-title"),
      ref,
    },
    children,
  );
});

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  function CardDescription({ className, "data-slot": dataSlot, ...props }, ref) {
    return (
      <p
        {...props}
        className={mergeClassName("brick-card-description", className)}
        data-slot={slotOrDefault(dataSlot, "card-description")}
        ref={ref}
      />
    );
  },
);

const CardAction = forwardRef<HTMLDivElement, CardActionProps>(function CardAction(
  { className, "data-slot": dataSlot, ...props },
  ref,
) {
  return (
    <div
      {...props}
      className={mergeClassName("brick-card-action", className)}
      data-slot={slotOrDefault(dataSlot, "card-action")}
      ref={ref}
    />
  );
});

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(function CardContent(
  { className, "data-slot": dataSlot, ...props },
  ref,
) {
  return (
    <div
      {...props}
      className={mergeClassName("brick-card-content", className)}
      data-slot={slotOrDefault(dataSlot, "card-content")}
      ref={ref}
    />
  );
});

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(function CardFooter(
  { className, "data-slot": dataSlot, ...props },
  ref,
) {
  return (
    <div
      {...props}
      className={mergeClassName("brick-card-footer", className)}
      data-slot={slotOrDefault(dataSlot, "card-footer")}
      ref={ref}
    />
  );
});

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
