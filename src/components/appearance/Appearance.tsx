import {
  Children,
  cloneElement,
  forwardRef,
  Fragment,
  type ForwardedRef,
  type ReactElement,
} from "react";
import { composeHost } from "@flowstack-ui/atom/compose-host";

export type AppearanceValue = "light" | "dark" | "inherit";

export type AppearanceProps = {
  /** The one existing host that owns this semantic-token boundary. */
  children: ReactElement;
  /** Explicit semantic appearance, or inherit to remove the boundary. */
  value?: AppearanceValue;
};

function AppearanceImpl(
  { children, value = "inherit" }: AppearanceProps,
  ref: ForwardedRef<HTMLElement>,
) {
  const child = Children.only(children) as ReactElement<
    Record<string, unknown>
  >;

  if (child.type === Fragment) {
    throw new Error(
      "Appearance requires one DOM or component host; a Fragment cannot receive the appearance boundary.",
    );
  }

  // Atom intentionally ignores undefined overrides. Clear an authored boundary
  // explicitly before composing so inherit really returns to the ancestor.
  const host = value === "inherit"
    ? cloneElement(child, { "data-brick-appearance": undefined })
    : child;
  const childRef = Object.getOwnPropertyDescriptor(child.props, "ref")?.value
    ?? Object.getOwnPropertyDescriptor(child, "ref")?.value;
  const result = composeHost(host, {
    className: "brick-appearance",
    ...(value === "inherit" ? {} : { "data-brick-appearance": value }),
    ...(ref && childRef ? { ref } : {}),
  });
  // A single ref needs no combining callback and stays stable across renders.
  return ref && !childRef ? cloneElement(result as ReactElement<Record<string, unknown>>, { ref }) : result;
}

/**
 * Applies one semantic appearance boundary to an existing host without
 * creating a wrapper element.
 */
export const Appearance = forwardRef<HTMLElement, AppearanceProps>(
  AppearanceImpl,
);
Appearance.displayName = "Appearance";
