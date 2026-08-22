import type { CSSProperties } from "react";
import type {
  ResponsiveBreakpoint,
  ResponsiveValue,
} from "../_responsive-value/ResponsiveValue.js";

export type SpacingValue = number | string;

type SpacingStyle = CSSProperties & Record<`--brick-${string}`, string>;

const breakpoints: ResponsiveBreakpoint[] = ["sm", "md", "lg", "xl"];
const legacyTokenPattern = /^[0-6]$/;
const numericFactorPattern = /^\+?(?:\d+\.?\d*|\.\d+)$/;
const negativeNumericPattern = /^-(?:\d+\.?\d*|\.\d+)$/;

function warnInvalidSpacing(value: unknown) {
  console.warn(
    `[Brick layout] Spacing values must be non-negative finite numbers or non-empty CSS values. Received ${String(value)}.`,
  );
}

export function resolveSpacingValue(value: SpacingValue): string {
  if (typeof value === "number") {
    if (!Number.isFinite(value) || value < 0) {
      warnInvalidSpacing(value);
      return "var(--brick-space-0)";
    }

    return value === 0
      ? "var(--brick-space-0)"
      : `calc(var(--brick-space-1) * ${value})`;
  }

  const normalized = value.trim();
  if (!normalized || negativeNumericPattern.test(normalized)) {
    warnInvalidSpacing(value);
    return "var(--brick-space-0)";
  }

  if (legacyTokenPattern.test(normalized)) {
    return `var(--brick-space-${normalized})`;
  }

  if (numericFactorPattern.test(normalized)) {
    return `calc(var(--brick-space-1) * ${Number(normalized)})`;
  }

  return normalized;
}

export function responsiveSpacingStyles(
  variable: `--brick-${string}`,
  value: ResponsiveValue<SpacingValue>,
): SpacingStyle {
  const values =
    typeof value === "object" && value !== null && "initial" in value
      ? value
      : { initial: value };
  const styles = {
    [`${variable}-input`]: resolveSpacingValue(values.initial),
  } as SpacingStyle;

  for (const breakpoint of breakpoints) {
    const next = (values as Partial<Record<ResponsiveBreakpoint, SpacingValue>>)[breakpoint];
    if (next !== undefined) {
      styles[`${variable}-${breakpoint}-input`] = resolveSpacingValue(next);
    }
  }

  return styles;
}
