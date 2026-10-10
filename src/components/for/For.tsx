import type { ReactNode } from "react";

export type ForCollection = readonly unknown[] | undefined;

export type ForItem<TCollection extends ForCollection> =
  TCollection extends readonly (infer TItem)[] ? TItem : never;

export interface ForProps<TCollection extends ForCollection> {
  children: (item: ForItem<TCollection>, index: number) => ReactNode;
  each: TCollection;
  fallback?: ReactNode;
}

export function For<const TCollection extends ForCollection>({
  children,
  each,
  fallback = null,
}: ForProps<TCollection>) {
  if (!each?.length) return fallback;
  if (typeof children !== "function") {
    throw new TypeError(
      `For requires a function child; received ${Array.isArray(children) ? "array" : typeof children}.`,
    );
  }
  return each.map((item, index) =>
    children(item as ForItem<TCollection>, index));
}
