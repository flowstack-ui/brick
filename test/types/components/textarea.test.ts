import { createElement, createRef } from "react";
import {
  Textarea,
  TextareaCount,
  TextareaRoot,
  type TextareaResize,
  type TextareaRootProps,
  type TextareaShape,
  type TextareaSize,
  type TextareaVariant,
} from "../../../src/textarea.js";
import { Textarea as RootTextarea } from "../../../src/index.js";

const ref = createRef<HTMLTextAreaElement>();
const variants: TextareaVariant[] = ["outline", "soft", "underline"];
const sizes: TextareaSize[] = ["sm", "md", "lg"];
const shapes: TextareaShape[] = ["sharp", "rounded"];
const resizeModes: TextareaResize[] = ["none", "vertical", "horizontal", "both"];
const props: TextareaRootProps = {
  "aria-label": "Project summary",
  defaultValue: "Brick",
  resize: "vertical",
  shape: "rounded",
  size: "lg",
  textareaClassName: "native-textarea",
  textareaStyle: { letterSpacing: "0.02em" },
  variant: "soft",
};

createElement(Textarea.Root, { ...props, ref }, createElement(Textarea.Count));
createElement(RootTextarea.Root, { ...props, ref });
createElement(TextareaRoot, { "aria-label": "Auto", autoResize: true, maxRows: 8, minRows: 3 });
createElement(TextareaCount, { "aria-live": "off" });

// @ts-expect-error underline has fixed sharp geometry
createElement(Textarea.Root, { "aria-label": "Notes", shape: "rounded", variant: "underline" });
// @ts-expect-error auto-resize and manual resize are competing sizing models
createElement(Textarea.Root, { "aria-label": "Notes", autoResize: true, resize: "vertical" });
// @ts-expect-error maxRows only applies to auto-resize
createElement(Textarea.Root, { "aria-label": "Notes", maxRows: 8 });
// @ts-expect-error pill geometry is excluded for changing multi-line height
createElement(Textarea.Root, { "aria-label": "Notes", shape: "pill" });
// @ts-expect-error Field owns visual status
createElement(Textarea.Root, { "aria-label": "Notes", status: "error" });

void variants;
void sizes;
void shapes;
void resizeModes;
