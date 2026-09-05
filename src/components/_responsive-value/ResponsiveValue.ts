export type ResponsiveBreakpoint = "sm" | "md" | "lg" | "xl";

type ResponsiveKey = "initial" | ResponsiveBreakpoint;

export type ResponsiveValueObject<T> = {
  [Key in ResponsiveKey]: Required<Pick<Record<ResponsiveKey, T>, Key>> &
    Partial<Record<Exclude<ResponsiveKey, Key>, T>>;
}[ResponsiveKey];

export type ResponsiveValue<T> = T | ResponsiveValueObject<T>;

const breakpoints: ResponsiveBreakpoint[] = ["sm", "md", "lg", "xl"];

function serialize(value: unknown) {
  return typeof value === "boolean" || typeof value === "number"
    ? String(value)
    : value;
}

export function normalizeResponsiveValue<T>(value: ResponsiveValue<T>) {
  return typeof value === "object" && value !== null
    ? (value as ResponsiveValueObject<T>)
    : ({ initial: value } as ResponsiveValueObject<T>);
}

export function responsiveDataAttributes<T>(
  attribute: `data-${string}`,
  value: ResponsiveValue<T>,
  options: { defaultValue?: T; alwaysInitial?: boolean } = {},
) {
  const values = normalizeResponsiveValue(value);
  const attributes: Record<string, unknown> = {};
  const initial = values.initial ?? options.defaultValue;

  if (
    initial !== undefined &&
    (options.alwaysInitial || initial !== options.defaultValue)
  ) {
    attributes[attribute] = serialize(initial);
  }

  for (const breakpoint of breakpoints) {
    const next = (values as Partial<Record<ResponsiveBreakpoint, T>>)[breakpoint];
    if (next !== undefined) {
      attributes[`${attribute}-${breakpoint}`] = serialize(next);
    }
  }

  return attributes;
}
