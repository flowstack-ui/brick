import { createElement, createRef } from "react";
import { Image, ImageContent, ImageFallback, ImageRoot, type ImageFit, type ImagePosition, type ImageRadius } from "../../../src/image.js";
import { Image as RootImage } from "../../../src/index.js";

const rootRef = createRef<HTMLDivElement>();
const imageRef = createRef<HTMLImageElement>();
const fits: ImageFit[] = ["cover", "contain", "fill", "none", "scale-down"];
const positions: ImagePosition[] = ["center", "top", "bottom", "start", "end"];
const radii: ImageRadius[] = ["none", "sm", "md", "lg", "full"];

createElement(Image.Root, { fill: true, fit: "contain", frame: "subtle", position: "start", radius: "lg", ref: rootRef, src: "/workspace.jpg" },
  createElement(Image.Content, { alt: "Workspace", decoding: "async", ref: imageRef, sizes: "100vw", srcSet: "/small.jpg 600w" }),
  createElement(Image.Fallback, { when: ["loading", "error"] }, "Unavailable"));
createElement(RootImage.Root, null, createElement(RootImage.Content, { alt: "" }));
createElement(ImageRoot, { src: "/workspace.jpg" },
  createElement(ImageContent, { alt: "Workspace" }),
  createElement(ImageFallback, null, "Unavailable"));

// @ts-expect-error Content requires an authored alt decision.
createElement(Image.Content, {});
// @ts-expect-error Fit values are closed.
createElement(Image.Root, { fit: "crop" });
// @ts-expect-error Position values are closed.
createElement(Image.Root, { position: "left" });
// @ts-expect-error Radius values are closed.
createElement(Image.Root, { radius: "2xl" });
// @ts-expect-error src belongs to Root, not Content.
createElement(Image.Content, { alt: "Workspace", src: "/workspace.jpg" });

void fits; void positions; void radii; void rootRef; void imageRef;
