"use client";
import { useMemo } from "react";
import { createFilter, type FilterOptions, type LocaleFilter } from "@flowstack-ui/atom/collection";
import { useLocaleContext } from "./LocaleProvider.js";
export type { FilterOptions, LocaleFilter } from "@flowstack-ui/atom/collection";

export function useFilter(options: FilterOptions = {}): LocaleFilter {
  const { locale } = useLocaleContext();
  const effective = { ...options, locale: options.locale ?? locale };
  const key = JSON.stringify(Object.entries(effective).filter(([, value]) => value !== undefined).sort(([a], [b]) => a.localeCompare(b)));
  return useMemo(() => createFilter(Object.fromEntries(JSON.parse(key)) as FilterOptions), [key]);
}
