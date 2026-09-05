const formatterCache = new Map<string, Intl.NumberFormat>();

function formatterKey(locale: string, options: Intl.NumberFormatOptions) {
  const entries = Object.entries(options).sort(([left], [right]) =>
    left.localeCompare(right),
  );
  return `${locale}:${JSON.stringify(entries)}`;
}

export function getNumberFormatter(
  locale: string,
  options: Intl.NumberFormatOptions = {},
) {
  const key = formatterKey(locale, options);
  const cached = formatterCache.get(key);
  if (cached) return cached;
  const formatter = new Intl.NumberFormat(locale, options);
  formatterCache.set(key, formatter);
  return formatter;
}
