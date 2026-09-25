import type { CSSProperties } from "react";

export type SurfaceTreatment = "none" | "translucent";
export type BackdropBlur =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "0"
  | `${number}px`
  | `${number}rem`
  | `${number}em`;

export interface SurfaceEffectProps {
  treatment?: SurfaceTreatment;
  backgroundOpacity?: number;
  backdropBlur?: BackdropBlur;
  backdropSaturate?: number;
  borderColor?: CSSProperties["borderColor"];
  borderOpacity?: number;
}

function numberInput(
  name: string,
  value: unknown,
  maximum = Infinity,
): number | undefined {
  if (value === undefined) return undefined;
  if (
    typeof value === "number" &&
    Number.isFinite(value) &&
    value >= 0 &&
    value <= maximum
  )
    return value;
  if (typeof process !== "undefined" && process.env.NODE_ENV !== "production")
    console.warn(`[Brick surface] Invalid ${name}; using the default.`);
  return undefined;
}

function blurInput(value: unknown): string | undefined {
  if (value === undefined) return undefined;
  if (value === "none" || value === "0") return "0px";
  if (value === "sm" || value === "md" || value === "lg") {
    const defaults = { sm: "0.375rem", md: "0.75rem", lg: "1.5rem" };
    return `var(--brick-blur-${value}, ${defaults[value]})`;
  }
  if (
    typeof value === "string" &&
    /^(?:\d+(?:\.\d+)?|\.\d+)(?:px|rem|em)$/.test(value) &&
    Number.isFinite(Number.parseFloat(value))
  )
    return Number.parseFloat(value) === 0 ? "0px" : value;
  if (typeof process !== "undefined" && process.env.NODE_ENV !== "production")
    console.warn("[Brick surface] Invalid backdropBlur; using the default.");
  return undefined;
}

/** Pure instance mapping. Theme values and browser preferences remain static CSS. */
export function surfaceEffects(
  props: SurfaceEffectProps,
  legacyBlurred = false,
) {
  const opacity = numberInput("backgroundOpacity", props.backgroundOpacity, 1);
  const borderOpacity = numberInput("borderOpacity", props.borderOpacity, 1);
  const saturation = numberInput("backdropSaturate", props.backdropSaturate);
  const blur = blurInput(props.backdropBlur);
  const treatment =
    props.treatment === "none" || props.treatment === "translucent"
      ? props.treatment
      : undefined;
  const color =
    typeof props.borderColor === "string" &&
    props.borderColor.trim() &&
    !/[;{}]/.test(props.borderColor)
      ? props.borderColor
      : undefined;
  const active =
    treatment !== undefined ||
    opacity !== undefined ||
    borderOpacity !== undefined ||
    saturation !== undefined ||
    blur !== undefined ||
    color !== undefined;
  const mode = treatment ?? (legacyBlurred ? "legacy" : "none");
  const filtered =
    (blur === undefined
      ? mode !== "none"
      : !/^0(?:\.0+)?(?:px|rem|em)$/.test(blur)) ||
    (saturation === undefined ? mode !== "none" : saturation !== 1);
  const style: CSSProperties & Record<string, string | number> = {};
  if (opacity !== undefined)
    style["--brick-surface-effect-opacity"] = `${opacity * 100}%`;
  if (borderOpacity !== undefined)
    style["--brick-surface-effect-border-opacity"] = `${borderOpacity * 100}%`;
  if (blur !== undefined) style["--brick-surface-effect-blur"] = blur;
  if (saturation !== undefined)
    style["--brick-surface-effect-saturation"] = saturation;
  if (color !== undefined) style["--brick-surface-effect-border-color"] = color;
  return {
    attributes: {
      "data-surface-effects": active ? mode : undefined,
      "data-surface-filter": active
        ? filtered
          ? "active"
          : "none"
        : undefined,
      "data-surface-transparency":
        active &&
        (mode !== "none" || filtered || (opacity !== undefined && opacity < 1))
          ? ""
          : undefined,
      "data-surface-alpha": active && opacity !== undefined ? "" : undefined,
    },
    style,
    blurred:
      treatment === undefined ? legacyBlurred : treatment === "translucent",
  };
}
