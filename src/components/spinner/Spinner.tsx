import { forwardRef, type CSSProperties, type HTMLAttributes, type ReactElement, type Ref } from "react";
import { staticPart, type StaticPartProps } from "../_internal/StaticPart.js";
import { responsiveDataAttributes, type ResponsiveValue } from "../_responsive-value/ResponsiveValue.js";
import type { IconEmphasis, IconTone } from "../icon/Icon.js";

export type SpinnerSize = "inherit" | "xs" | "sm" | "md" | "lg" | "xl";
export type SpinnerTone = IconTone;
export type SpinnerEmphasis = IconEmphasis;
export type SpinnerThickness = "thin" | "regular" | "thick";
type SpinnerName =
  | { label?: never; "aria-labelledby"?: never }
  | { label: string; "aria-labelledby"?: never }
  | { label?: never; "aria-labelledby": string };
export type SpinnerProps = Omit<HTMLAttributes<HTMLSpanElement>,
  "children" | "color" | "role" | "tabIndex" | "aria-hidden" | "aria-label" | "aria-labelledby" | "style"
> & SpinnerName & ({ asChild: true; children: ReactElement } | { asChild?: false; children?: never }) & {
  "data-slot"?: string;
  size?: ResponsiveValue<SpinnerSize>;
  tone?: SpinnerTone;
  emphasis?: SpinnerEmphasis;
  thickness?: SpinnerThickness;
  style?: CSSProperties & { [key: `--brick-spinner-${string}`]: string | number | undefined };
};

/** A visual loading indicator; the application owns busy state and announcements. */
export const Spinner = forwardRef<HTMLSpanElement | SVGSVGElement, SpinnerProps>(function Spinner(
  { size = "md", tone = "inherit", emphasis = "text", thickness = "regular",
    label, "aria-labelledby": labelledby, className, asChild = false, children, "data-slot": slot = "spinner", ...props }, ref,
) {
  const name = label?.trim() || undefined;
  const nameReference = labelledby?.trim() || undefined;
  const named = Boolean(name || nameReference);
  return staticPart("span", {
    ...props, asChild, children, className,
    ...(asChild ? {
      ...responsiveDataAttributes("data-spinner-size", size, { defaultValue: "md", alwaysInitial: true }),
      "data-spinner-tone": tone, "data-spinner-emphasis": emphasis,
    } : {
      ...responsiveDataAttributes("data-size", size, { defaultValue: "md", alwaysInitial: true }),
      "data-tone": tone, "data-emphasis": emphasis,
    }),
    "data-thickness": asChild ? undefined : thickness,
    "data-spinner-artwork": asChild ? "" : undefined,
    role: named ? "img" : undefined,
    "aria-hidden": named ? undefined : true, "aria-label": name,
    "aria-labelledby": nameReference,
    tabIndex: (props as HTMLAttributes<HTMLSpanElement>).tabIndex !== undefined ? -1 : undefined,
    ...(asChild ? { focusable: "false" } : {}),
  } as StaticPartProps, ref as Ref<HTMLElement>, "brick-spinner", slot);
});
Spinner.displayName = "Spinner";
