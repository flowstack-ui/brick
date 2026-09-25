"use client";

import { formatNumber } from "../../format-number/FormatNumber.js";
import { useLocaleContext } from "../../locale-provider/LocaleProvider.js";

/** Format only the visual count; the owning control supplies accessible copy. */
export function NotificationCount({ value, overflowed, locale }: {
  value: number;
  overflowed: boolean;
  locale?: string;
}) {
  const context = useLocaleContext();
  return <>{formatNumber(value, locale ?? context.locale, { useGrouping: false, maximumFractionDigits: 0 })}{overflowed ? "+" : null}</>;
}
