import {
  Children,
  cloneElement,
  forwardRef,
  Fragment,
  type ForwardedRef,
  type ReactElement,
  type Ref,
} from "react";

export type AppearanceValue = "light" | "dark" | "inherit";

export type AppearanceProps = {
  /** The one existing host that owns this semantic-token boundary. */
  children: ReactElement;
  /** Explicit semantic appearance, or inherit to remove the boundary. */
  value?: AppearanceValue;
};

function mergeClassName(...values: Array<string | undefined>) {
  const className = values.filter(Boolean).join(" ");
  return className || undefined;
}

function composeRefs<T>(...refs: Array<Ref<T> | undefined>) {
  return (value: T | null) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(value);
      else if (ref) ref.current = value;
    }
  };
}

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

  // React 19 exposes ref through props; React 18 keeps it on the element.
  // Check props first so React 19 never reads its deprecated element.ref.
  const childRef = (
    "ref" in child.props
      ? child.props.ref
      : (child as ReactElement & { ref?: Ref<HTMLElement> }).ref
  ) as Ref<HTMLElement> | undefined;
  const composedRef = childRef || ref ? composeRefs(childRef, ref) : undefined;

  return cloneElement(child, {
    className: mergeClassName(
      child.props.className as string | undefined,
      "brick-appearance",
    ),
    "data-brick-appearance": value === "inherit" ? undefined : value,
    ref: composedRef,
  });
}

/**
 * Applies one semantic appearance boundary to an existing host without
 * creating a wrapper element.
 */
export const Appearance = forwardRef<HTMLElement, AppearanceProps>(
  AppearanceImpl,
);
Appearance.displayName = "Appearance";
