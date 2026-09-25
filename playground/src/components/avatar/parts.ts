import type { OwnerPart } from "../../shared/OwnerDocumentation.js";
export const parts: OwnerPart[] = [
  {
    "id": "props-root",
    "title": "Root",
    "description": "Visual and loading owner. Also available through the callable Avatar convenience.",
    "rows": [
      {
        "name": "alt",
        "typeLabel": "string",
        "defaultLabel": "—",
        "description": "Required explicit identity; empty means decorative."
      },
      {
        "name": "src",
        "typeLabel": "string",
        "defaultLabel": "—",
        "description": "Image source inherited by Image."
      },
      {
        "name": "size",
        "typeLabel": "'2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full'",
        "defaultLabel": "md",
        "description": "Coordinated frame and fallback type; full requires a constrained square parent."
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
        "name": "status",
        "typeLabel": "'online' | 'away' | 'busy' | 'offline'",
        "defaultLabel": "—",
        "description": "Supplementary visual status ring."
      },
      {
        "name": "onLoadingStatusChange",
        "typeLabel": "(status: 'idle' | 'loading' | 'loaded' | 'error') => void",
        "defaultLabel": "—",
        "description": "Reports observed native image state."
      },
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Merge the root onto a single supplied host."
      },
      {
        "name": "render",
        "typeLabel": "RenderProp",
        "defaultLabel": "—",
        "description": "Override the Atom-backed root host."
      }
    ]
  },
  {
    "id": "props-convenience",
    "title": "Convenience",
    "description": "Additional props on callable Avatar; compound children are owned internally.",
    "rows": [
      {
        "name": "fallback",
        "typeLabel": "ReactNode",
        "defaultLabel": "person icon",
        "description": "Explicit localized fallback content; no automatic initials."
      },
      {
        "name": "fallbackDelayMs",
        "typeLabel": "number",
        "defaultLabel": "0",
        "description": "Delay fallback while an image is loading."
      },
      {
        "name": "imageProps",
        "typeLabel": "AvatarImageProps",
        "defaultLabel": "—",
        "description": "Native loading, responsive source and request attributes."
      }
    ]
  },
  {
    "id": "props-image",
    "title": "Image",
    "description": "Native img with forwarded ref, load/error events and request attributes.",
    "rows": [
      {
        "name": "src",
        "typeLabel": "string",
        "defaultLabel": "Root source",
        "description": "Optional image-specific source."
      },
      {
        "name": "alt",
        "typeLabel": "string",
        "defaultLabel": "Root alt",
        "description": "Alternative text inherits the explicit identity."
      },
      {
        "name": "loading",
        "typeLabel": "'lazy' | 'eager'",
        "defaultLabel": "browser default",
        "description": "Native image scheduling."
      },
      {
        "name": "srcSet / sizes",
        "typeLabel": "string",
        "defaultLabel": "—",
        "description": "Native responsive image sources and sizes."
      },
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Merge image attributes onto a supplied image host."
      }
    ]
  },
  {
    "id": "props-fallback",
    "title": "Fallback",
    "description": "Shown for absent or failed images and optionally during loading.",
    "rows": [
      {
        "name": "delayMs",
        "typeLabel": "number",
        "defaultLabel": "0",
        "description": "Delay while loading; absent/error fallback is immediate."
      },
      {
        "name": "children",
        "typeLabel": "ReactNode",
        "defaultLabel": "person icon",
        "description": "Authored localized initials or artwork."
      },
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Merge fallback semantics onto a supplied host."
      }
    ]
  },
  {
    "id": "props-icon",
    "title": "Icon",
    "description": "Decorative generic person artwork. Accepts native SVG attributes and ref.",
    "rows": []
  }
];
