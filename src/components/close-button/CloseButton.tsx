"use client";

import { forwardRef, type ReactNode } from "react";
import { IconButton, type IconButtonProps } from "../icon-button/IconButton.js";
import { useLocaleContext } from "../locale-provider/LocaleProvider.js";
import type { DistributiveOmit } from "../_radius/Radius.js";

export type CloseButtonProps = DistributiveOmit<IconButtonProps,
  "href" | "target" | "rel" | "type" | "asChild" | "render" | "children"
> & { children?: ReactNode };

export const CloseButton = forwardRef<HTMLElement, CloseButtonProps>(function CloseButton(
  { children, className, "aria-label": label, "aria-labelledby": labelledBy,
    "data-slot": slot = "close-button", ...props }, ref,
) {
  const { localeText } = useLocaleContext();
  return <IconButton {...props} ref={ref} type="button" data-slot={slot}
    className={["brick-close-button", className].filter(Boolean).join(" ")}
    aria-label={label ?? (labelledBy ? undefined : localeText.close)} aria-labelledby={labelledBy}>
    {children ?? <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m6 6 12 12M18 6 6 18" /></svg>}
  </IconButton>;
});
CloseButton.displayName = "CloseButton";
