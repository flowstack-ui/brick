import type { CSSProperties } from "react";
import type { ResponsiveValue } from "../_responsive-value/ResponsiveValue.js";
import {
  resolveSpacingValue,
  type SpacingValue,
} from "../_spacing-value/SpacingValue.js";

export const stackBreakpoints = ["initial", "sm", "md", "lg", "xl"] as const;
export type StackStyles = CSSProperties &
  Record<`--brick-${string}`, string | number>;

export function stackValues<T>(
  value: ResponsiveValue<T> | undefined,
): Partial<Record<(typeof stackBreakpoints)[number], T>> {
  if (value === undefined) return {};
  if (typeof value !== "object" || value === null)
    return { initial: value as T };
  const entries = Object.entries(value);
  if (
    !entries.length ||
    entries.some(
      ([key, item]) =>
        !stackBreakpoints.includes(key as (typeof stackBreakpoints)[number]) ||
        item === undefined,
    )
  ) {
    console.warn(
      "[Brick Stack] Responsive values require at least one defined initial/sm/md/lg/xl entry.",
    );
    return {};
  }
  return value;
}

export function stackStyles<T>(
  variable: `--brick-${string}`,
  value: ResponsiveValue<T> | undefined,
  serialize: (value: NonNullable<T>) => string,
): StackStyles {
  const styles: StackStyles = {};
  for (const [key, item] of Object.entries(stackValues(value))) {
    styles[`${variable}${key === "initial" ? "" : `-${key}`}-input`] =
      serialize(item as NonNullable<T>);
  }
  return styles;
}

export function cssValue(value: unknown, fallback = "normal"): string {
  if (typeof value === "string" && value.trim()) return value.trim();
  console.warn("[Brick Stack] Expected a nonempty CSS value.");
  return fallback;
}

export function enumValue(
  value: unknown,
  values: readonly unknown[],
  fallback: string,
): string {
  if (values.includes(value)) return String(value);
  console.warn(
    `[Brick Stack] Invalid value ${String(value)}; using ${fallback}.`,
  );
  return fallback;
}

export function factor(
  value: number,
  fallback: number,
  integer = false,
): string {
  if (
    Number.isFinite(value) &&
    (integer ? Number.isInteger(value) : value >= 0)
  )
    return String(value);
  console.warn(
    "[Brick Stack] Expected a finite nonnegative factor or integer order.",
  );
  return String(fallback);
}

export function basisValue(value: string | number): string {
  if (typeof value === "number") return `${factor(value, 0)}px`;
  const result = cssValue(value, "auto");
  if (/^-\d/.test(result)) {
    console.warn("[Brick Stack] Basis cannot be negative.");
    return "auto";
  }
  return result;
}

export function spacingValue(value: SpacingValue): string {
  if (typeof value === "string" && /^-\d/.test(value.trim())) {
    console.warn("[Brick Stack] Spacing cannot be negative.");
    return "var(--brick-space-0)";
  }
  return resolveSpacingValue(value);
}
