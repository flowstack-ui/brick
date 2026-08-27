import {
  createElement,
  forwardRef,
  type HTMLAttributes,
} from "react";
import { Link, type LinkProps } from "../link/index.js";

export type LinkBoxRootElement = "div" | "article" | "section" | "li";

export interface LinkBoxRootProps extends HTMLAttributes<HTMLElement> {
  as?: LinkBoxRootElement;
  "data-slot"?: string;
}

export type LinkBoxLinkProps = LinkProps;

export interface LinkBoxActionProps extends HTMLAttributes<HTMLDivElement> {
  "data-slot"?: string;
}

function classes(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

export const LinkBoxRoot = forwardRef<HTMLElement, LinkBoxRootProps>(
  function LinkBoxRoot(
    {
      as = "div",
      className,
      "data-slot": dataSlot = "link-box",
      ...props
    },
    ref,
  ) {
    return createElement(as, {
      ...props,
      className: classes("brick-link-box", className),
      "data-slot": dataSlot,
      ref,
    });
  },
);

export const LinkBoxLink = forwardRef<HTMLAnchorElement, LinkBoxLinkProps>(
  function LinkBoxLink(
    {
      className,
      "data-slot": dataSlot = "link-box-link",
      tone = "inherit",
      variant = "plain",
      ...props
    },
    ref,
  ) {
    return (
      <Link
        {...props}
        className={classes("brick-link-box__link", className)}
        data-slot={dataSlot}
        ref={ref}
        tone={tone}
        variant={variant}
      />
    );
  },
);

export const LinkBoxAction = forwardRef<HTMLDivElement, LinkBoxActionProps>(
  function LinkBoxAction(
    {
      className,
      "data-slot": dataSlot = "link-box-action",
      ...props
    },
    ref,
  ) {
    return (
      <div
        {...props}
        className={classes("brick-link-box__action", className)}
        data-slot={dataSlot}
        ref={ref}
      />
    );
  },
);

LinkBoxRoot.displayName = "LinkBox.Root";
LinkBoxLink.displayName = "LinkBox.Link";
LinkBoxAction.displayName = "LinkBox.Action";

export const LinkBox = Object.freeze({
  Root: LinkBoxRoot,
  Link: LinkBoxLink,
  Action: LinkBoxAction,
});
