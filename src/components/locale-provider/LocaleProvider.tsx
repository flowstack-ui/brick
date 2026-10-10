"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import {
  DirectionProvider,
  type DirectionValue,
} from "@flowstack-ui/atom/direction";

export interface BrickLocaleText {
  chooseDate: string;
  clearDate: string;
  invalidDate: string;
  startDate: string;
  endDate: string;
  close: string;
  clearInput: string;
  closeNotification: string;
  decrementValue: string;
  incrementValue: string;
  notifications: string;
  toggleOptions: string;
  showPassword: string;
  hidePassword: string;
}

export interface LocaleContextValue {
  dir: DirectionValue;
  locale: string;
  localeText: BrickLocaleText;
}

export interface LocaleProviderProps {
  children: ReactNode;
  /** BCP 47 locale inherited by Brick formatting components. */
  locale: string;
  /** Partial overrides for text authored by Brick itself. */
  localeText?: Partial<BrickLocaleText>;
}

export const defaultLocale = "en-US";

export const defaultLocaleText: BrickLocaleText = Object.freeze({
  chooseDate: "Choose date",
  clearDate: "Clear date",
  invalidDate: "Enter a valid date",
  startDate: "Start date",
  endDate: "End date",
  close: "Close",
  clearInput: "Clear input",
  closeNotification: "Dismiss notification",
  decrementValue: "Decrement value",
  incrementValue: "Increment value",
  notifications: "Notifications",
  toggleOptions: "Toggle options",
  showPassword: "Show password",
  hidePassword: "Hide password",
});

const rtlScripts = new Set([
  "Adlm",
  "Arab",
  "Armi",
  "Avst",
  "Hebr",
  "Mand",
  "Mend",
  "Nkoo",
  "Rohg",
  "Samr",
  "Syrc",
  "Thaa",
]);
const rtlLanguages = new Set([
  "ae",
  "ar",
  "arc",
  "bcc",
  "bqi",
  "ckb",
  "dv",
  "fa",
  "glk",
  "he",
  "ku",
  "mzn",
  "nqo",
  "pnb",
  "ps",
  "sd",
  "ug",
  "ur",
  "yi",
]);

export function getLocaleDirection(locale: string): DirectionValue {
  try {
    const script = new Intl.Locale(locale).maximize().script;
    if (script) return rtlScripts.has(script) ? "rtl" : "ltr";
  } catch {
    // Invalid or unsupported locale syntax falls through to the language tag.
  }
  return rtlLanguages.has(locale.toLowerCase().split("-")[0] ?? "")
    ? "rtl"
    : "ltr";
}

const LocaleContext = createContext<LocaleContextValue>({
  dir: "ltr",
  locale: defaultLocale,
  localeText: defaultLocaleText,
});
LocaleContext.displayName = "BrickLocaleContext";

export function LocaleProvider({
  children,
  locale,
  localeText,
}: LocaleProviderProps) {
  const parent = useContext(LocaleContext);
  const value = useMemo<LocaleContextValue>(
    () => ({
      dir: getLocaleDirection(locale),
      locale,
      localeText: { ...parent.localeText, ...localeText },
    }),
    [locale, localeText, parent.localeText],
  );

  return (
    <LocaleContext.Provider value={value}>
      <DirectionProvider dir={value.dir}>{children}</DirectionProvider>
    </LocaleContext.Provider>
  );
}

export function useLocaleContext(): LocaleContextValue {
  return useContext(LocaleContext);
}
