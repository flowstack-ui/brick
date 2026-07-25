import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  Link as AtomLink,
  type LinkRootProps as AtomLinkRootProps,
} from "@flowstack-ui/atom/link";

export type LinkVariant = "underline" | "plain";
export type LinkTone = "accent" | "neutral" | "inherit";
export type LinkSize = "inherit" | "sm" | "md" | "lg";

interface LinkVisualProps {
  variant?: LinkVariant;
  tone?: LinkTone;
  size?: LinkSize;
}

type LinkNativeProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "children" | "color" | "href"
>;

export type LinkRenderProp =
  | string
  | ReactElement
  | ((props: Record<string, unknown>) => ReactElement);

interface LinkCommonProps extends LinkNativeProps, LinkVisualProps {
  children: ReactNode;
  "data-slot"?: string;
}

type LinkDefaultProps = LinkCommonProps & {
  href: string;
  render?: undefined;
  asChild?: false | undefined;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
};

type LinkRenderProps = LinkCommonProps & {
  href?: string;
  render: LinkRenderProp;
  asChild?: false | undefined;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
};

type LinkAsChildProps = LinkCommonProps & {
    asChild: true;
    children: ReactElement;
    render?: never;
    startIcon?: never;
    endIcon?: never;
  };

export type LinkProps = LinkDefaultProps | LinkRenderProps | LinkAsChildProps;

function mergeClassName(className: string | undefined) {
  return className ? `brick-link ${className}` : "brick-link";
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  {
    variant = "underline",
    tone = "accent",
    size = "inherit",
    startIcon,
    endIcon,
    className,
    "data-slot": dataSlot = "link",
    children,
    asChild = false,
    ...rootProps
  },
  ref,
) {
  const content = asChild ? (
    children
  ) : (
    <>
      {startIcon !== undefined ? (
        <span
          aria-hidden="true"
          className="brick-link__icon"
          data-position="start"
        >
          {startIcon}
        </span>
      ) : null}
      <span className="brick-link__content">{children}</span>
      {endIcon !== undefined ? (
        <span
          aria-hidden="true"
          className="brick-link__icon"
          data-position="end"
        >
          {endIcon}
        </span>
      ) : null}
    </>
  );

  const atomProps = {
    ...rootProps,
    asChild,
    className: mergeClassName(className),
    "data-size": size,
    "data-slot": dataSlot,
    "data-tone": tone,
    "data-variant": variant,
    children: content,
  } as unknown as AtomLinkRootProps;

  return <AtomLink.Root {...atomProps} ref={ref} />;
});

Link.displayName = "Link";
