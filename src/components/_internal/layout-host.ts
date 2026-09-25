import {
  Children,
  cloneElement,
  Fragment,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";

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
    // Refs were already composed; React 18's child.props.ref is a warning getter.
    if (key === "ref") continue;
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

export function layoutHost(
  children: ReactNode,
  owner: Record<string, unknown>,
  ref: Ref<HTMLElement>,
  name = "Stack",
) {
  const child = Children.only(children) as ReactElement<
    Record<string, unknown>
  >;
  if (child.type === Fragment)
    throw new Error(`${name} asChild requires one non-Fragment host.`);
  // React 18 props.ref can be a warning getter. Read only data descriptors;
  // React 19 stores the ref in props and deprecates reading element.ref.
  const childRef = (Object.getOwnPropertyDescriptor(child.props, "ref")?.value
    ?? Object.getOwnPropertyDescriptor(child, "ref")?.value) as Ref<HTMLElement> | undefined;
  return cloneElement(
    child,
    mergeComposedProps(child.props, {
      ...owner,
      ref: childRef || ref ? composeRefs(childRef, ref) : undefined,
    }),
  );
}
