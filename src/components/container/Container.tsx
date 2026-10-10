import {
  Children,
  cloneElement,
  Fragment,
  createElement,
  forwardRef,
  type CSSProperties,
  type ForwardedRef,
  type HTMLAttributes,
  type ReactNode,
  type ReactElement,
  type Ref,
} from "react";

export type ContainerElement =
  | "div"
  | "section"
  | "article"
  | "main"
  | "header"
  | "footer"
  | "nav"
  | "aside";

export type ContainerMeasure = "narrow" | "medium" | "wide" | "max" | "full";

export type ContainerGutter = "none" | "sm" | "md" | "lg";

type ContainerNativeProps = Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "className" | "style"
>;

type ContainerHostProps =
  | { as?: ContainerElement; asChild?: false; children?: ReactNode }
  | { as?: never; asChild: true; children: ReactElement };

export type ContainerProps = ContainerNativeProps &
  ContainerHostProps & {
    measure?: ContainerMeasure;
    gutter?: ContainerGutter;
    className?: string;
    style?: CSSProperties;
    slot?: string;
  };

function mergeClassName(className: string | undefined) {
  return className ? `brick-container ${className}` : "brick-container";
}

function composeRefs<T>(...refs: Array<Ref<T> | undefined>) {
  return (value: T | null) => {
    const cleanups = refs.map((ref) => {
      if (typeof ref === "function") return ref(value);
      if (ref) ref.current = value;
    });
    // Return cleanup only when needed, preserving React 18's null callback path.
    if (cleanups.some((cleanup) => typeof cleanup === "function")) {
      return () =>
        refs.forEach((ref, index) => {
          const cleanup = cleanups[index];
          if (typeof cleanup === "function") cleanup();
          else if (typeof ref === "function") ref(null);
          else if (ref) ref.current = null;
        });
    }
  };
}

function mergeComposedProps(
  child: Record<string, unknown>,
  owner: Record<string, unknown>,
) {
  const merged = { ...child, ...owner };
  for (const [key, value] of Object.entries(owner)) {
    const original = child[key];
    if (
      key.startsWith("on") &&
      typeof original === "function" &&
      typeof value === "function"
    ) {
      merged[key] = (...args: unknown[]) => {
        value(...args);
        original(...args);
      };
    } else if (
      key === "className" &&
      typeof original === "string" &&
      typeof value === "string"
    ) {
      merged[key] = `${original} ${value}`;
    } else if (
      key === "style" &&
      original &&
      value &&
      typeof original === "object" &&
      typeof value === "object"
    ) {
      merged[key] = { ...original, ...value };
    }
  }
  return merged;
}

function ContainerImpl(
  {
    as = "div",
    asChild = false,
    children,
    className,
    gutter = "md",
    measure = "wide",
    slot = "container",
    style,
    ...props
  }: ContainerProps,
  ref: ForwardedRef<HTMLElement>,
) {
  const containerProps = {
    ...props,
    className: mergeClassName(className),
    "data-gutter": gutter,
    "data-measure": measure,
    "data-slot": slot,
    ref,
    ...(style === undefined ? {} : { style }),
  };
  if (asChild) {
    const child = Children.only(children) as ReactElement<
      Record<string, unknown>
    >;
    if (child.type === Fragment) {
      throw new Error("Container with asChild requires one non-Fragment host.");
    }
    const childRef = (
      "ref" in child.props
        ? child.props.ref
        : (child as ReactElement & { ref?: Ref<HTMLElement> }).ref
    ) as Ref<HTMLElement> | undefined;
    return cloneElement(
      child,
      mergeComposedProps(child.props, {
        ...containerProps,
        ref: childRef || ref ? composeRefs(childRef, ref) : undefined,
      }),
    );
  }
  return createElement(as, containerProps, children);
}

export const Container = forwardRef<HTMLElement, ContainerProps>(ContainerImpl);
Container.displayName = "Container";
