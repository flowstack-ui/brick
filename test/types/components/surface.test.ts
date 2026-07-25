import { createElement, createRef } from "react";
import {
  Surface,
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
const insets: SurfaceInset[] = ["none", "sm", "md", "lg"];
const props: SurfaceProps = {
  "aria-label": "Release readiness",
  as: "section",
  bordered: true,
  children: "Content",
  className: "consumer-surface",
  elevation: "medium",
  inset: "lg",
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

// @ts-expect-error Hosts are deliberately closed.
createElement(Surface, { as: "button" });
// @ts-expect-error Levels use a closed semantic recipe.
createElement(Surface, { level: "accent" });
// @ts-expect-error Elevation is semantic rather than numeric.
createElement(Surface, { elevation: 8 });
// @ts-expect-error Radius uses a closed semantic recipe.
createElement(Surface, { radius: "full" });
// @ts-expect-error Inset uses a closed recipe.
createElement(Surface, { inset: "xl" });
// @ts-expect-error Responsive objects are application policy.
createElement(Surface, { inset: { base: "sm", lg: "lg" } });
// @ts-expect-error Historical runtime color scope is excluded.
createElement(Surface, { surfaceColor: "accent" });
// @ts-expect-error Surface never owns clipping.
createElement(Surface, { overflow: true });
// @ts-expect-error No asChild composition API.
createElement(Surface, { asChild: true });
// @ts-expect-error No render composition API.
createElement(Surface, { render: createElement("div") });

void elements;
void levels;
void elevations;
void radii;
void insets;
