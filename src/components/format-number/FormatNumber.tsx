"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { getNumberFormatter } from "../_intl/NumberFormatter.js";
import { useLocaleContext } from "../locale-provider/LocaleProvider.js";

export function formatNumber(
  value: number,
  locale = "en-US",
  options: Intl.NumberFormatOptions = {},
) {
  return getNumberFormatter(locale, options).format(value);
}

export interface FormatNumberProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "children"
> {
  "data-slot"?: string;
  formatOptions?: Intl.NumberFormatOptions;
  locale?: string;
  value: number;
}

export const FormatNumber = forwardRef<HTMLSpanElement, FormatNumberProps>(
  function FormatNumber(
    {
      className,
      formatOptions,
      locale,
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
        data-slot={dataSlot ?? "format-number"}
        ref={ref}
      >
        {formatNumber(value, locale ?? context.locale, formatOptions)}
      </span>
    );
  },
);
FormatNumber.displayName = "FormatNumber";
