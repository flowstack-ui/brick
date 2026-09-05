import { createElement, createRef } from "react";
import {
  Surface,
  SurfaceContent,
  SurfaceMedia,
  SurfaceRoot,
  SurfaceScrim,
  type SurfaceElement,
  type SurfaceElevation,
  type SurfaceInset,
  type SurfaceLevel,
  type SurfaceProps,
  type SurfaceRadius,
} from "../../../src/surface.js";
import { Surface as RootSurface } from "../../../src/index.js";

const ref = createRef<HTMLElement>();
const elements: SurfaceElement[] = [
  "div", "section", "article", "aside", "nav", "main", "header", "footer",
  "form", "li",
];
const levels: SurfaceLevel[] = ["canvas", "base", "subtle", "raised"];
const elevations: SurfaceElevation[] = ["none", "low", "medium", "high"];
const radii: SurfaceRadius[] = ["none", "subtle", "surface"];
const insets: SurfaceInset[] = ["none", "sm", "md", "lg", "xl", "2xl"];
const props: SurfaceProps = {
  "aria-label": "Release readiness",
  as: "section",
  bordered: true,
  children: "Content",
  className: "consumer-surface",
  elevation: "medium",
  inset: { initial: "lg", xl: "2xl" },
  level: "raised",
  onClick: () => undefined,
  radius: "subtle",
  style: { minInlineSize: 0 },
};

createElement(Surface, { ...props, ref });
createElement(RootSurface, {
  bordered: false,
  elevation: "none",
  inset: "none",
  level: "canvas",
  radius: "none",
});
createElement(SurfaceRoot, null,
  createElement(SurfaceMedia, null, createElement("video", { muted: true })),
  createElement(SurfaceScrim, { direction: "inline-start", strength: "strong" }),
  createElement(SurfaceContent, null, "Foreground"));
createElement(Surface.Root, null,
  createElement(Surface.Media, null, createElement("canvas")),
  createElement(Surface.Scrim, { direction: "block-end", strength: "soft" }),
  createElement(Surface.Content, null, "Foreground"));
createElement(Surface, { asChild: true, children: createElement("section") });

// @ts-expect-error Hosts are deliberately closed.
createElement(Surface, { as: "button" });
// @ts-expect-error Levels use a closed semantic recipe.
createElement(Surface, { level: "accent" });
// @ts-expect-error Elevation is semantic rather than numeric.
createElement(Surface, { elevation: 8 });
// @ts-expect-error Radius uses a closed semantic recipe.
createElement(Surface, { radius: "full" });
// @ts-expect-error Inset uses a closed recipe.
createElement(Surface, { inset: "3xl" });
// @ts-expect-error Responsive breakpoints are deliberately closed.
createElement(Surface, { inset: { base: "sm", lg: "lg" } });
// @ts-expect-error Historical runtime color scope is excluded.
createElement(Surface, { surfaceColor: "accent" });
// @ts-expect-error Surface never owns clipping.
createElement(Surface, { overflow: true });
// @ts-expect-error asChild requires one React element child.
createElement(Surface, { asChild: true, children: "Text" });
// @ts-expect-error as and asChild cannot be combined.
createElement(Surface, { as: "section", asChild: true, children: createElement("section") });
// @ts-expect-error No render composition API.
createElement(Surface, { render: createElement("div") });
// @ts-expect-error Scrim strength is a closed contrast recipe.
createElement(SurfaceScrim, { strength: "opaque" });
// @ts-expect-error Scrim direction uses logical closed values.
createElement(SurfaceScrim, { direction: "left" });
// @ts-expect-error Scrim never owns authored content.
createElement(SurfaceScrim, { children: "Meaningful content" });

void elements;
void levels;
void elevations;
void radii;
void insets;
