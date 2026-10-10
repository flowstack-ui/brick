"use client";

import { Children, forwardRef, isValidElement, type ReactElement, type SVGProps } from "react";
import { Icon, useIconDefaults, type IconProps, type IconPresentationProps } from "./Icon.js";

type ExcludedSVGProps = "ref" | "children" | "color" | "role" | "aria-hidden" | "aria-label" | "aria-labelledby" | "tabIndex" | "focusable" | "onKeyDown" | "onKeyUp" | "onKeyPress";
type SVGDefaults = Omit<SVGProps<SVGSVGElement>, ExcludedSVGProps>;
type IconName = { label?: never; "aria-labelledby"?: never } | { label: string; "aria-labelledby"?: never } | { label?: never; "aria-labelledby": string };
export type CreatedIconProps = SVGDefaults & IconPresentationProps &
  Pick<IconProps, "directional" | "slot"> &
  ({ label?: never; "aria-labelledby"?: never } | { label: string; "aria-labelledby"?: never } | { label?: never; "aria-labelledby": string });
export type CreateIconOptions = {
  displayName?: string;
  viewBox?: string;
  defaultProps?: SVGDefaults & IconPresentationProps;
} & ({ d: string; path?: never } | { d?: never; path: ReactElement | ReactElement[] });

/** Define once at module scope. Meaning and accessible names belong to each use. */
export function createIcon(options: CreateIconOptions) {
  if (!options || (options.d !== undefined) === (options.path !== undefined) ||
      (options.d !== undefined && (typeof options.d !== "string" || !options.d.trim())) ||
      (options.path !== undefined && !(Array.isArray(options.path) ? options.path.length > 0 && options.path.every(isValidElement) : isValidElement(options.path)))) {
    throw new Error("createIcon requires exactly one nonempty d string or path element/element array.");
  }
  const validateArtwork = (artwork: ReactElement | ReactElement[]) => {
    Children.forEach(artwork, element => {
      if (!isValidElement(element)) return;
      if (typeof element.type === "string" && ["svg", "a", "button", "input", "foreignObject"].includes(element.type)) {
        throw new Error("createIcon path must contain noninteractive SVG artwork, not a nested SVG or interactive host.");
      }
      const children = (element.props as { children?: ReactElement | ReactElement[] }).children;
      if (children) validateArtwork(children);
    });
  };
  if (options.path !== undefined) validateArtwork(options.path);
  const { displayName = "CreatedIcon", viewBox = "0 0 24 24", defaultProps = {} } = options;
  const artwork = options.d !== undefined ? <path d={options.d} /> : options.path;
  const CreatedIcon = forwardRef<SVGSVGElement, CreatedIconProps>(function CreatedIcon(instance, ref) {
    const provider = useIconDefaults();
    const { size, tone, emphasis, ...svgDefaults } = defaultProps;
    const { label, "aria-labelledby": labelledby, directional, slot, size: instanceSize, tone: instanceTone, emphasis: instanceEmphasis, ...svgProps } = instance;
    return <Icon asChild ref={ref}
      {...({ label, "aria-labelledby": labelledby } as IconName)}
      size={instance.size ?? provider.size ?? size}
      tone={instance.tone ?? provider.tone ?? tone}
      emphasis={instance.emphasis ?? provider.emphasis ?? emphasis}
      directional={directional} slot={slot}>
      <svg fill={options.d !== undefined ? "currentColor" : undefined} {...svgDefaults} {...svgProps} viewBox={instance.viewBox ?? svgDefaults.viewBox ?? viewBox}>
        {artwork}
      </svg>
    </Icon>;
  });
  CreatedIcon.displayName = displayName;
  return CreatedIcon;
}
