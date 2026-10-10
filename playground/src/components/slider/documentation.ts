import {
  ownerSections,
  type OwnerExample,
  type OwnerPart,
} from "../../shared/OwnerDocumentation.js";
import { SliderAlignment } from "./examples/SliderAlignment.js";
import SliderAlignmentSource from "./examples/SliderAlignment.tsx?raw";
import { SliderBasic } from "./examples/SliderBasic.js";
import SliderBasicSource from "./examples/SliderBasic.tsx?raw";
import { SliderCollisions } from "./examples/SliderCollisions.js";
import SliderCollisionsSource from "./examples/SliderCollisions.tsx?raw";
import { SliderControllerExample } from "./examples/SliderControllerExample.js";
import SliderControllerSource from "./examples/SliderControllerExample.tsx?raw";
import { SliderHookForm } from "./examples/SliderHookForm.js";
import SliderHookFormSource from "./examples/SliderHookForm.tsx?raw";
import { SliderIndicators } from "./examples/SliderIndicators.js";
import SliderIndicatorsSource from "./examples/SliderIndicators.tsx?raw";
import { SliderLabelValue } from "./examples/SliderLabelValue.js";
import SliderLabelValueSource from "./examples/SliderLabelValue.tsx?raw";
import { SliderMarks } from "./examples/SliderMarks.js";
import SliderMarksSource from "./examples/SliderMarks.tsx?raw";
import { SliderNativeForm } from "./examples/SliderNativeForm.js";
import SliderNativeFormSource from "./examples/SliderNativeForm.tsx?raw";
import { SliderOrigins } from "./examples/SliderOrigins.js";
import SliderOriginsSource from "./examples/SliderOrigins.tsx?raw";
import { SliderRangeGap } from "./examples/SliderRangeGap.js";
import SliderRangeGapSource from "./examples/SliderRangeGap.tsx?raw";
import { SliderResponsive } from "./examples/SliderResponsive.js";
import SliderResponsiveSource from "./examples/SliderResponsive.tsx?raw";
import { SliderSizes } from "./examples/SliderSizes.js";
import SliderSizesSource from "./examples/SliderSizes.tsx?raw";
import { SliderStates } from "./examples/SliderStates.js";
import SliderStatesSource from "./examples/SliderStates.tsx?raw";
import { SliderStepsCommit } from "./examples/SliderStepsCommit.js";
import SliderStepsCommitSource from "./examples/SliderStepsCommit.tsx?raw";
import { SliderTones } from "./examples/SliderTones.js";
import SliderTonesSource from "./examples/SliderTones.tsx?raw";
import { SliderVariants } from "./examples/SliderVariants.js";
import SliderVariantsSource from "./examples/SliderVariants.tsx?raw";
import { SliderVertical } from "./examples/SliderVertical.js";
import SliderVerticalSource from "./examples/SliderVertical.tsx?raw";

export const examples: OwnerExample[] = [
  {
    id: "sizes",
    title: "Sizes",
    description:
      "Three visible scales retain the same 44px interaction target.",
    Demo: SliderSizes,
    source: SliderSizesSource,
  },
  {
    id: "variants",
    title: "Variants",
    description:
      "Outline is the default; solid fills the thumb and soft reduces emphasis.",
    Demo: SliderVariants,
    source: SliderVariantsSource,
  },
  {
    id: "tones",
    title: "Tones",
    description:
      "Neutral, accent and contrast change paint without changing geometry.",
    Demo: SliderTones,
    source: SliderTonesSource,
  },
  {
    id: "label-value",
    title: "Label and value",
    description:
      "ValueText formats external output while ariaValueText describes the value to assistive technology.",
    Demo: SliderLabelValue,
    source: SliderLabelValueSource,
  },
  {
    id: "range-gap",
    title: "Range and minimum gap",
    description:
      "Each range thumb has a distinct name and respects the configured minimum gap.",
    Demo: SliderRangeGap,
    source: SliderRangeGapSource,
  },
  {
    id: "collisions",
    title: "Collision modes",
    description:
      "None constrains, push propagates and swap transfers active pointer identity.",
    Demo: SliderCollisions,
    source: SliderCollisionsSource,
  },
  {
    id: "origins",
    title: "Origins",
    description:
      "Scalar fills can begin at the domain start, numeric center or end.",
    Demo: SliderOrigins,
    source: SliderOriginsSource,
  },
  {
    id: "alignment",
    title: "Thumb alignment",
    description:
      "Contain keeps the target inside the control; center permits endpoint overhang.",
    Demo: SliderAlignment,
    source: SliderAlignmentSource,
  },
  {
    id: "controller",
    title: "Controller and provider",
    description:
      "useSlider owns one state model for RootProvider and external controls.",
    Demo: SliderControllerExample,
    source: SliderControllerSource,
  },
  {
    id: "steps-commit",
    title: "Steps and commit",
    description:
      "Fractional live changes remain distinct from the final committed value.",
    Demo: SliderStepsCommit,
    source: SliderStepsCommitSource,
  },
  {
    id: "marks",
    title: "Marks",
    description:
      "Use Marks for concise data or compose indicator and label parts independently.",
    Demo: SliderMarks,
    source: SliderMarksSource,
  },
  {
    id: "vertical",
    title: "Vertical and RTL",
    description:
      "Vertical geometry and marker placement follow the resolved local direction.",
    Demo: SliderVertical,
    source: SliderVerticalSource,
  },
  {
    id: "indicators",
    title: "Dragging output and artwork",
    description:
      "Drag-only output and decorative thumb artwork remain separate concerns.",
    Demo: SliderIndicators,
    source: SliderIndicatorsSource,
  },
  {
    id: "states",
    title: "States and Field",
    description:
      "Disabled, read-only and invalid states share Field relationships and help text.",
    Demo: SliderStates,
    source: SliderStatesSource,
  },
  {
    id: "native-form",
    title: "Native form",
    description:
      "Automatic hidden inputs preserve range order, submission and reset.",
    Demo: SliderNativeForm,
    source: SliderNativeFormSource,
  },
  {
    id: "hook-form",
    title: "React Hook Form",
    description:
      "Explicit input mode gives Controller one value owner, ref and validation path.",
    Demo: SliderHookForm,
    source: SliderHookFormSource,
  },
  {
    id: "responsive",
    title: "Responsive presentation and frames",
    description:
      "Sparse responsive recipes and optional outline or panel frames remain static CSS.",
    Demo: SliderResponsive,
    source: SliderResponsiveSource,
  },
];

const presentationRows = [
  {
    name: "size",
    typeLabel: 'ResponsiveValue<"sm" | "md" | "lg">',
    defaultLabel: '"md"',
    description: "Visible track/thumb scale; interaction target remains 44px.",
  },
  {
    name: "variant",
    typeLabel: 'ResponsiveValue<"outline" | "solid" | "soft">',
    defaultLabel: '"outline"',
    description: "Track, range and thumb treatment.",
  },
  {
    name: "tone",
    typeLabel: '"neutral" | "accent" | "contrast"',
    defaultLabel: '"accent"',
    description: "Semantic paint family; invalid remains an independent state.",
  },
  {
    name: "frame",
    typeLabel: '"none" | "outline" | "panel" | "inline"',
    defaultLabel: '"none"',
    description:
      "Optional composition boundary without changing slider behavior.",
  },
] as const;
const behaviorRows = [
  {
    name: "value / defaultValue",
    typeLabel: "number | number[]",
    defaultLabel: "0",
    description: "Controlled value or initial scalar/range values.",
  },
  {
    name: "onValueChange / onValueCommit",
    typeLabel: "(value: SliderValue) => void",
    defaultLabel: "—",
    description: "Live changes and one completed interaction callback.",
  },
  {
    name: "min / max / step / largeStep",
    typeLabel: "number",
    defaultLabel: "0 / 100 / 1 / 10×step",
    description: "Domain and keyboard increments.",
  },
  {
    name: "origin",
    typeLabel: '"start" | "center" | "end"',
    defaultLabel: '"start"',
    description:
      "Scalar fill origin; ranges fill between their extreme values.",
  },
  {
    name: "thumbAlignment",
    typeLabel: '"contain" | "center"',
    defaultLabel: '"contain"',
    description: "Endpoint target containment policy.",
  },
  {
    name: "thumbCollisionBehavior",
    typeLabel: '"none" | "push" | "swap"',
    defaultLabel: '"none"',
    description: "Pointer collision policy; keyboard remains constrained.",
  },
  {
    name: "disabled / readOnly / invalid / required",
    typeLabel: "boolean",
    defaultLabel: "false",
    description: "Availability and validation state.",
  },
] as const;

export const parts: OwnerPart[] = [
  {
    id: "props-root",
    title: "Root",
    description:
      "Behavior owner with automatic hidden inputs and optional responsive Brick recipes.",
    rows: [
      ...presentationRows,
      ...behaviorRows,
      {
        name: "name / form",
        typeLabel: "string",
        defaultLabel: "—",
        description:
          "Native range serialization and optional external form owner.",
      },
      {
        name: "hiddenInputMode",
        typeLabel: '"automatic" | "explicit"',
        defaultLabel: '"automatic"',
        description: "Choose exactly one form proxy ownership mode.",
      },
      {
        name: "render / asChild",
        typeLabel: "RenderProp / boolean",
        defaultLabel: "—",
        description:
          "Compose a compatible root host while preserving events and refs.",
      },
    ],
  },
  {
    id: "props-control",
    title: "Control",
    description: "Atom-owned pointer coordinate and interaction region.",
    rows: [
      {
        name: "render / asChild",
        typeLabel: "RenderProp / boolean",
        defaultLabel: "—",
        description: "Compose a compatible control host.",
      },
    ],
  },
  {
    id: "props-track",
    title: "Track",
    description:
      "Visual track; legacy Track-owned interaction composition remains supported.",
    rows: [],
  },
  {
    id: "props-range",
    title: "Range",
    description:
      "Decorative selected fill derived from the controller and origin.",
    rows: [],
  },
  {
    id: "props-thumb",
    title: "Thumb",
    description:
      "One focusable slider target with explicit per-thumb naming precedence.",
    rows: [
      {
        name: "index",
        typeLabel: "number",
        defaultLabel: "0",
        description: "Stable value, name and form-field identity.",
      },
      {
        name: "aria-label / aria-labelledby",
        typeLabel: "string",
        defaultLabel: "root/Label fallback",
        description: "Explicit thumb naming wins over root-derived naming.",
      },
    ],
  },
  {
    id: "props-label",
    title: "Label",
    description: "Visible shared label and generated naming relationship.",
    rows: [
      {
        name: "children",
        typeLabel: "ReactNode",
        defaultLabel: "—",
        description: "Name shown to users and applied to unnamed thumbs.",
      },
    ],
  },
  {
    id: "props-value-text",
    title: "ValueText",
    description:
      "External selected-value output without a redundant live region.",
    rows: [
      {
        name: "children",
        typeLabel: "ReactNode | (details) => ReactNode",
        defaultLabel: "joined values",
        description: "Format visible values independently from ariaValueText.",
      },
    ],
  },
  {
    id: "props-marker-parts",
    title: "Marker parts",
    description:
      "MarkerGroup positions decorative Marker, MarkerIndicator and MarkerLabel anatomy.",
    rows: [
      {
        name: "Marker value",
        typeLabel: "number",
        defaultLabel: "required",
        description: "Domain value used for position and selected state.",
      },
      {
        name: "MarkerIndicator / MarkerLabel",
        typeLabel: "ReactNode",
        defaultLabel: "—",
        description: "Independent decorative artwork and readable text.",
      },
    ],
  },
  {
    id: "props-value-label",
    title: "ValueLabel",
    description: "Persistent value bubble composed inside a Thumb.",
    rows: [
      {
        name: "children",
        typeLabel: "ReactNode | (details) => ReactNode",
        defaultLabel: "thumb value",
        description: "Indexed visible formatting.",
      },
    ],
  },
  {
    id: "props-dragging-indicator",
    title: "DraggingIndicator",
    description: "Visible only for the active pointer drag.",
    rows: [
      {
        name: "index",
        typeLabel: "number",
        defaultLabel: "active thumb",
        description: "Optional fixed thumb; omission follows draggingIndex.",
      },
    ],
  },
  {
    id: "props-hidden-input",
    title: "HiddenInput",
    description: "Explicit-mode native form proxy; one per thumb.",
    rows: [
      {
        name: "index",
        typeLabel: "number",
        defaultLabel: "0",
        description: "Submitted value index.",
      },
    ],
  },
  {
    id: "props-shortcuts",
    title: "Thumbs and Marks",
    description: "Brick convenience composition over the same public parts.",
    rows: [
      {
        name: "Thumbs children",
        typeLabel: "(details) => ReactNode",
        defaultLabel: "—",
        description:
          "Indexed thumb artwork without duplicating explicit thumbs.",
      },
      {
        name: "Marks marks",
        typeLabel: "(number | { value; label? })[]",
        defaultLabel: "required",
        description: "Numeric or labelled decorative marks.",
      },
    ],
  },
  {
    id: "props-provider",
    title: "RootProvider and controller",
    description: "Externally owned SliderController from useSlider.",
    rows: [
      {
        name: "value",
        typeLabel: "SliderController",
        defaultLabel: "required",
        description: "The single behavior owner.",
      },
      {
        name: "useSliderContext",
        typeLabel: "() => SliderController",
        defaultLabel: "—",
        description: "Reads values, focus/drag state, IDs and part helpers.",
      },
    ],
  },
  {
    id: "props-context",
    title: "Context",
    description: "Render-prop access to the nearest controller.",
    rows: [
      {
        name: "children",
        typeLabel: "(controller) => ReactNode",
        defaultLabel: "required",
        description: "Read state without creating another owner.",
      },
    ],
  },
];

export const sections = ownerSections(examples, parts, true);

export { SliderBasic, SliderBasicSource };
