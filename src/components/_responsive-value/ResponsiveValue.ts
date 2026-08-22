export type ResponsiveBreakpoint = "sm" | "md" | "lg" | "xl";

export type ResponsiveValue<T> =
  | T
  | ({ initial: T } & Partial<Record<ResponsiveBreakpoint, T>>);

const breakpoints: ResponsiveBreakpoint[] = ["sm", "md", "lg", "xl"];

function serialize(value: unknown) {
  return typeof value === "boolean" || typeof value === "number"
    ? String(value)
    : value;
}

export function responsiveDataAttributes<T>(
  attribute: `data-${string}`,
  value: ResponsiveValue<T>,
  options: { defaultValue?: T; alwaysInitial?: boolean } = {},
) {
  const values =
    typeof value === "object" && value !== null && "initial" in value
      ? value
      : { initial: value };
  const attributes: Record<string, unknown> = {};
  const initial = values.initial;

  if (options.alwaysInitial || initial !== options.defaultValue) {
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
