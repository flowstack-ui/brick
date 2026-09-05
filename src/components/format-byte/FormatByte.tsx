"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { formatNumber } from "../format-number/FormatNumber.js";
import { useLocaleContext } from "../locale-provider/LocaleProvider.js";

export type FormatByteUnit = "bit" | "byte";
export type FormatByteUnitDisplay = "long" | "short" | "narrow";
export type FormatByteUnitSystem = "binary" | "decimal";

export interface FormatByteOptions {
  formatOptions?: Omit<Intl.NumberFormatOptions, "style" | "unit" | "unitDisplay">;
  precision?: number;
  unit?: FormatByteUnit;
  unitDisplay?: FormatByteUnitDisplay;
  unitSystem?: FormatByteUnitSystem;
}

const bitPrefixes = ["", "kilo", "mega", "giga", "tera"] as const;
const bytePrefixes = ["", "kilo", "mega", "giga", "tera", "peta"] as const;

export function formatByte(
  value: number,
  locale = "en-US",
  {
    formatOptions,
    precision = 3,
    unit = "byte",
    unitDisplay = "short",
    unitSystem = "decimal",
  }: FormatByteOptions = {},
) {
  if (Number.isNaN(value)) return "";
  const factor = unitSystem === "binary" ? 1024 : 1000;
  const prefixes = unit === "bit" ? bitPrefixes : bytePrefixes;
  let scaled = Math.abs(value);
  let index = 0;
  while (scaled >= factor && index < prefixes.length - 1) {
    scaled /= factor;
    index += 1;
  }
  const rounded = value === 0
    ? 0
    : Number.parseFloat(scaled.toPrecision(Math.max(1, precision))) * Math.sign(value);
  const intlUnit = `${prefixes[index]}${unit}`;
  return formatNumber(rounded, locale, {
    ...formatOptions,
    style: "unit",
    unit: intlUnit,
    unitDisplay,
  });
}

export interface FormatByteProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "children"
>, FormatByteOptions {
  "data-slot"?: string;
  locale?: string;
  value: number;
}

export const FormatByte = forwardRef<HTMLSpanElement, FormatByteProps>(
  function FormatByte(
    {
      className,
      formatOptions,
      locale,
      precision,
      unit,
      unitDisplay,
      unitSystem,
      value,
      "data-slot": dataSlot,
      ...props
    },
    ref,
  ) {
    const context = useLocaleContext();
    return (
      <span
        {...props}
        className={className}
        data-slot={dataSlot ?? "format-byte"}
        ref={ref}
      >
        {formatByte(value, locale ?? context.locale, {
          formatOptions,
          precision,
          unit,
          unitDisplay,
          unitSystem,
        })}
      </span>
    );
  },
);
FormatByte.displayName = "FormatByte";
