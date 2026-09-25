import type { SkeletonProps } from "@flowstack-ui/brick";
import type { DocsPropDefinition } from "../../shared/PropsTable.js";
import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { SkeletonFeed } from "./examples/SkeletonFeed.js";
import FeedSource from "./examples/SkeletonFeed.tsx?raw";
import { SkeletonText } from "./examples/SkeletonText.js";
import TextSource from "./examples/SkeletonText.tsx?raw";
import { SkeletonChildren } from "./examples/SkeletonChildren.js";
import ChildrenSource from "./examples/SkeletonChildren.tsx?raw";
import { SkeletonAnimation } from "./examples/SkeletonAnimation.js";
import AnimationSource from "./examples/SkeletonAnimation.tsx?raw";
import { SkeletonLoading } from "./examples/SkeletonLoading.js";
import LoadingSource from "./examples/SkeletonLoading.tsx?raw";
import { SkeletonColors } from "./examples/SkeletonColors.js";
import ColorsSource from "./examples/SkeletonColors.tsx?raw";
import { SkeletonShapes } from "./examples/SkeletonShapes.js";
import ShapesSource from "./examples/SkeletonShapes.tsx?raw";
import { SkeletonResponsive } from "./examples/SkeletonResponsive.js";
import ResponsiveSource from "./examples/SkeletonResponsive.tsx?raw";
export const examples: OwnerExample[] = [
{id:"feed",title:"Feed",description:"Build a placeholder for a profile and its content.",Demo:SkeletonFeed,source:FeedSource},
{id:"text",title:"Text",description:"Control the number, height, spacing and final width of text lines.",Demo:SkeletonText,source:TextSource},
{id:"children",title:"With children",description:"Use asChild to retain the real host while loading.",Demo:SkeletonChildren,source:ChildrenSource},
{id:"animation",title:"Animations",description:"Compare pulse, wave and static placeholders.",Demo:SkeletonAnimation,source:AnimationSource},
{id:"loading",title:"Content loading",description:"Reveal the same content without replacing its host.",Demo:SkeletonLoading,source:LoadingSource},
{id:"colors",title:"Start and end colors",description:"Customize the animation using semantic color tokens.",Demo:SkeletonColors,source:ColorsSource},
{id:"shapes",title:"Shapes and radius",description:"Match the placeholder to its expected content geometry.",Demo:SkeletonShapes,source:ShapesSource},
{id:"responsive",title:"Responsive geometry",description:"Let Frame own breakpoint-dependent dimensions.",Demo:SkeletonResponsive,source:ResponsiveSource},
];
export const parts: OwnerPart[] = [{id:"props-skeleton",title:"Skeleton",description:"A span by default; use asChild for an existing host.",rows:[
  {
    "name": "loading",
    "typeLabel": "boolean",
    "defaultLabel": "true",
    "description": "Hides and makes the host inert while loading; loaded placeholders have no paint."
  },
  {
    "name": "variant",
    "typeLabel": "\"text\" | \"circular\" | \"rectangular\" | \"rounded\"",
    "defaultLabel": "\"text\"",
    "description": "Chooses geometry; animation is independent."
  },
  {
    "name": "animation",
    "typeLabel": "\"pulse\" | \"wave\" | \"none\"",
    "defaultLabel": "\"pulse\"",
    "description": "Chooses the loading motion; respects reduced motion."
  },
  {
    "name": "lines",
    "typeLabel": "number",
    "defaultLabel": "1",
    "description": "Standalone text only. Finite values normalize to 1–100; nonfinite values become one."
  },
  {
    "name": "width",
    "typeLabel": "CSSProperties[\"width\"]",
    "defaultLabel": "—",
    "description": "Explicit width. Compose Frame for responsive sizing."
  },
  {
    "name": "height",
    "typeLabel": "CSSProperties[\"height\"]",
    "defaultLabel": "—",
    "description": "Explicit height; multiline uses this for each line."
  },
  {
    "name": "size",
    "typeLabel": "CSSProperties[\"width\"]",
    "defaultLabel": "—",
    "description": "Equal width and height unless overridden independently."
  },
  {
    "name": "gap",
    "typeLabel": "CSSProperties[\"gap\"]",
    "defaultLabel": "8px",
    "description": "Space between standalone text lines; numeric values are pixels."
  },
  {
    "name": "lastLineWidth",
    "typeLabel": "CSSProperties[\"width\"]",
    "defaultLabel": "80%",
    "description": "Width of the last line when multiple lines are rendered."
  },
  {
    "name": "radius",
    "typeLabel": "\"none\" | \"2xs\" | \"xs\" | \"sm\" | \"md\" | \"lg\" | \"xl\" | \"2xl\" | \"3xl\" | \"4xl\" | \"subtle\" | \"control\" | \"surface\" | \"overlay\" | \"full\"",
    "defaultLabel": "shape default",
    "description": "Shared core and semantic radius values."
  },
  {
    "name": "asChild",
    "typeLabel": "boolean",
    "defaultLabel": "false",
    "description": "Applies presentation to one existing element without an extra host."
  }
] satisfies readonly DocsPropDefinition<SkeletonProps>[]}];
export const sections = ownerSections(examples, parts);
