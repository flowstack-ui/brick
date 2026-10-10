import type { OwnerPart } from "../../shared/OwnerDocumentation.js";
export const parts: OwnerPart[] = [
  {
    "id": "props-root",
    "title": "Root",
    "description": "AvatarGroup supplies inheritable defaults, overlap and explicit overflow.",
    "rows": [
      {
        "name": "size",
        "typeLabel": "'2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'",
        "defaultLabel": "md",
        "description": "Definite named frame size used to calculate overlap."
      },
      {
        "name": "variant",
        "typeLabel": "'subtle' | 'solid' | 'outline'",
        "defaultLabel": "subtle",
        "description": "Background and foreground recipe; outline is transparent."
      },
      {
        "name": "tone",
        "typeLabel": "'neutral' | 'accent' | 'contrast'",
        "defaultLabel": "neutral",
        "description": "Paired theme colors."
      },
      {
        "name": "radius",
        "typeLabel": "'none' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'subtle' | 'control' | 'surface' | 'overlay' | 'full'",
        "defaultLabel": "full",
        "description": "Shared Radius tokens; cannot combine with legacy shape."
      },
      {
        "name": "shape",
        "typeLabel": "'circle' | 'rounded'",
        "defaultLabel": "circle",
        "description": "Legacy corner recipe. Prefer radius."
      },
      {
        "name": "borderless",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Remove the group's separation ring without changing outer size."
      },
      {
        "name": "overlap",
        "typeLabel": "'none' | 'sm' | 'md' | 'lg'",
        "defaultLabel": "md",
        "description": "Logical overlap between identity frames."
      },
      {
        "name": "stacking",
        "typeLabel": "'first-on-top' | 'last-on-top'",
        "defaultLabel": "last-on-top",
        "description": "Paint order only; source and accessible reading order stay unchanged."
      },
      {
        "name": "max",
        "typeLabel": "number",
        "defaultLabel": "—",
        "description": "Maximum visible slots, including overflow."
      },
      {
        "name": "total",
        "typeLabel": "number",
        "defaultLabel": "child count",
        "description": "Total known members, including unloaded members; requires max."
      },
      {
        "name": "overflowLabel",
        "typeLabel": "(count: number) => string",
        "defaultLabel": "—",
        "description": "Localized accessible label, required with max unless using renderOverflow."
      },
      {
        "name": "renderOverflow",
        "typeLabel": "(count: number) => ReactNode",
        "defaultLabel": "—",
        "description": "Custom overflow, including an application-owned menu or button."
      },
      {
        "name": "as",
        "typeLabel": "'div' | 'span'",
        "defaultLabel": "div",
        "description": "Underlying group host."
      }
    ]
  }
];
