import { forwardRef, type CSSProperties, type HTMLAttributes } from "react";
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
  "children" | "color" | "role" | "aria-hidden" | "aria-label" | "aria-labelledby" | "style"
> & SpinnerName & {
  "data-slot"?: string;
  size?: SpinnerSize;
  tone?: SpinnerTone;
  emphasis?: SpinnerEmphasis;
  thickness?: SpinnerThickness;
  style?: CSSProperties & { [key: `--brick-spinner-${string}`]: string | number | undefined };
};

/** A visual loading indicator; the application owns busy state and announcements. */
export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  { size = "md", tone = "inherit", emphasis = "text", thickness = "regular",
    label, "aria-labelledby": labelledby, className, "data-slot": slot = "spinner", ...props }, ref,
) {
  const named = label !== undefined || labelledby !== undefined;
  return <span {...props} ref={ref} className={["brick-spinner", className].filter(Boolean).join(" ")}
    data-slot={slot} data-size={size} data-tone={tone} data-emphasis={emphasis}
    data-thickness={thickness} role={named ? "img" : undefined}
    aria-hidden={named ? undefined : true} aria-label={label} aria-labelledby={labelledby} />;
});
