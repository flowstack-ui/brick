import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { ColorPickerBasic } from "./examples/ColorPickerBasic.js";
import basicSource from "./examples/ColorPickerBasic.tsx?raw";
import { ColorPickerSizes } from "./examples/ColorPickerSizes.js";
import SizesSource from "./examples/ColorPickerSizes.tsx?raw";
import { ColorPickerVariants } from "./examples/ColorPickerVariants.js";
import VariantsSource from "./examples/ColorPickerVariants.tsx?raw";
import { ColorPickerIntegrated } from "./examples/ColorPickerIntegrated.js";
import IntegratedSource from "./examples/ColorPickerIntegrated.tsx?raw";
import { ColorPickerInline } from "./examples/ColorPickerInline.js";
import InlineSource from "./examples/ColorPickerInline.tsx?raw";
import { ColorPickerPresets } from "./examples/ColorPickerPresets.js";
import PresetsSource from "./examples/ColorPickerPresets.tsx?raw";
import { ColorPickerChannels } from "./examples/ColorPickerChannels.js";
import ChannelsSource from "./examples/ColorPickerChannels.tsx?raw";
import { ColorPickerResponsive } from "./examples/ColorPickerResponsive.js";
import ResponsiveSource from "./examples/ColorPickerResponsive.tsx?raw";
import { ColorPickerStates } from "./examples/ColorPickerStates.js";
import StatesSource from "./examples/ColorPickerStates.tsx?raw";
import { ColorPickerPlatform } from "./examples/ColorPickerPlatform.js";
import PlatformSource from "./examples/ColorPickerPlatform.tsx?raw";
import { ColorPickerLifecycle } from "./examples/ColorPickerLifecycle.js";
import LifecycleSource from "./examples/ColorPickerLifecycle.tsx?raw";
import { ColorPickerStore } from "./examples/ColorPickerStore.js";
import StoreSource from "./examples/ColorPickerStore.tsx?raw";
import { ColorPickerControlled } from "./examples/ColorPickerControlled.js";
import ControlledSource from "./examples/ColorPickerControlled.tsx?raw";
import { ColorPickerDialog } from "./examples/ColorPickerDialog.js";
import DialogSource from "./examples/ColorPickerDialog.tsx?raw";
import { ColorPickerSaved } from "./examples/ColorPickerSaved.js";
import SavedSource from "./examples/ColorPickerSaved.tsx?raw";
import { ColorPickerForm } from "./examples/ColorPickerForm.js";
import FormSource from "./examples/ColorPickerForm.tsx?raw";
export const examples: OwnerExample[] = [
{id:"sizes",title:"Sizes",description:"Seven sizes scale the complete recipe.",Demo:ColorPickerSizes,source:SizesSource},
{id:"variants",title:"Variants",description:"Choose transparent outline, raised surface, soft or borderless subtle.",Demo:ColorPickerVariants,source:VariantsSource},
{id:"integrated",title:"Integrated control",description:"Input and trigger share a single field boundary.",Demo:ColorPickerIntegrated,source:IntegratedSource},
{id:"inline",title:"Inline",description:"Render the color controls without a popup.",Demo:ColorPickerInline,source:InlineSource},
{id:"presets",title:"Presets",description:"Keep selection visible beyond color alone.",Demo:ColorPickerPresets,source:PresetsSource},
{id:"channels",title:"Channels and formats",description:"Channel inputs and format selection share one color model.",Demo:ColorPickerChannels,source:ChannelsSource},
{id:"responsive",title:"Responsive sizing",description:"Size changes are CSS-only, including shrinking again at wider breakpoints.",Demo:ColorPickerResponsive,source:ResponsiveSource},
{id:"states",title:"States",description:"Disabled, read-only and invalid keep their distinct behavior.",Demo:ColorPickerStates,source:StatesSource},
{id:"platform",title:"Platform controls",description:"Screen sampling requires browser support; the native chooser is opaque-only.",Demo:ColorPickerPlatform,source:PlatformSource},
{id:"lifecycle",title:"Content lifecycle",description:"Mount on first open and remove after closing.",Demo:ColorPickerLifecycle,source:LifecycleSource},
{id:"store",title:"External controller",description:"An external controller drives the same Atom behavior through Brick.",Demo:ColorPickerStore,source:StoreSource},
{id:"controlled",title:"Controlled value",description:"Keep application state outside the component and observe completed edits separately.",Demo:ColorPickerControlled,source:ControlledSource},
{id:"dialog",title:"Inside a dialog",description:"Keep the nested picker within the dialog's focus and stacking context.",Demo:ColorPickerDialog,source:DialogSource},
{id:"saved",title:"Saved swatches",description:"Application state owns saved palettes.",Demo:ColorPickerSaved,source:SavedSource},
{id:"form",title:"Form and reset",description:"Submit and reset the named color through native form behavior.",Demo:ColorPickerForm,source:FormSource},
];
export const parts: OwnerPart[] = [
  {
    "id": "props-root",
    "title": "Root",
    "description": "Owns color, form state and the visual recipe.",
    "rows": [
      {
        "name": "size",
        "typeLabel": "ResponsiveValue<\"2xs\" | \"xs\" | \"sm\" | \"md\" | \"lg\" | \"xl\" | \"2xl\">",
        "defaultLabel": "\"md\"",
        "description": "Complete size recipe. Sparse objects retain md before the first breakpoint."
      },
      {
        "name": "variant",
        "typeLabel": "\"outline\" | \"surface\" | \"soft\" | \"subtle\"",
        "defaultLabel": "\"outline\"",
        "description": "Outline is transparent; subtle has a muted fill and no resting border."
      },
      {
        "name": "value / defaultValue",
        "typeLabel": "string | Color",
        "defaultLabel": "\"#000000\" (defaultValue)",
        "description": "Controlled value or initial color."
      },
      {
        "name": "onValueChange / onValueChangeEnd",
        "typeLabel": "(details: ValueChangeDetails) => void",
        "defaultLabel": "—",
        "description": "Observe current value, or completed pointer/input/sampling edits. Keyboard channel steps use onValueChange."
      },
      {
        "name": "format / defaultFormat",
        "typeLabel": "\"rgba\" | \"hsla\" | \"hsba\"",
        "defaultLabel": "\"rgba\"",
        "description": "Controlled or initial representation, not a separate color."
      },
      {
        "name": "onFormatChange",
        "typeLabel": "(details: FormatChangeDetails) => void",
        "defaultLabel": "—",
        "description": "Observe format changes."
      },
      {
        "name": "open / defaultOpen / onOpenChange",
        "typeLabel": "boolean / boolean / callback",
        "defaultLabel": "false",
        "description": "Control popup visibility."
      },
      {
        "name": "inline / closeOnSelect",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Render inline; optionally close when selecting a preset."
      },
      {
        "name": "disabled / readOnly / invalid / required",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "State inherited from Field when applicable."
      },
      {
        "name": "name / form / inputId",
        "typeLabel": "string",
        "defaultLabel": "—",
        "description": "Native form association and input ID. Include HiddenInput to submit."
      },
      {
        "name": "ids",
        "typeLabel": "ColorPicker element IDs",
        "defaultLabel": "—",
        "description": "Stable part IDs; inputId and Field control ID override ids.input."
      },
      {
        "name": "positioning",
        "typeLabel": "PositioningOptions",
        "defaultLabel": "engine defaults",
        "description": "Placement, gutter, strategy and collision handling."
      },
      {
        "name": "openAutoFocus / initialFocusEl",
        "typeLabel": "boolean / () => HTMLElement | null",
        "defaultLabel": "true / —",
        "description": "Configure opening focus."
      },
      {
        "name": "onFocusOutside / onInteractOutside / onPointerDownOutside",
        "typeLabel": "event callback",
        "defaultLabel": "—",
        "description": "Observe or prevent outside dismissal."
      },
      {
        "name": "lazyMount / unmountOnExit",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Defer first mount or remove after exit; retained closed content is inert."
      },
      {
        "name": "present / onExitComplete",
        "typeLabel": "boolean / () => void",
        "defaultLabel": "—",
        "description": "Coordinate visual presence and receive completion."
      },
      {
        "name": "dir",
        "typeLabel": "\"ltr\" | \"rtl\"",
        "defaultLabel": "inherited",
        "description": "Mirrors keyboard and pointer direction."
      }
    ]
  },
  {
    "id": "props-root-provider",
    "title": "RootProvider",
    "description": "Style a controller created by useColorPicker; never share it between rendered pickers.",
    "rows": [
      {
        "name": "value",
        "typeLabel": "UseColorPickerReturn",
        "defaultLabel": "—",
        "description": "Required external controller. Configure behavior on the hook."
      },
      {
        "name": "size / variant",
        "typeLabel": "same as Root",
        "defaultLabel": "same as Root",
        "description": "Provider visual recipe."
      }
    ]
  },
  {
    "id": "props-control",
    "title": "Control",
    "description": "Coordinates the input and trigger.",
    "rows": [
      {
        "name": "layout",
        "typeLabel": "\"separate\" | \"integrated\"",
        "defaultLabel": "\"separate\"",
        "description": "One integrated border or individually framed controls."
      }
    ]
  },
  {
    "id": "props-content",
    "title": "Content",
    "description": "Place inside Positioner for popup positioning, or directly in an inline picker.",
    "rows": [
      {
        "name": "radius",
        "typeLabel": "Radius",
        "defaultLabel": "theme overlay",
        "description": "Popup radius token."
      }
    ]
  },
  {
    "id": "props-area",
    "title": "Area",
    "description": "Default children are AreaBackground and AreaThumb. Explicit children replace them.",
    "rows": [
      {
        "name": "xChannel / yChannel",
        "typeLabel": "ColorChannel",
        "defaultLabel": "saturation / brightness",
        "description": "Choose the two channels represented by the area."
      },
      {
        "name": "children",
        "typeLabel": "ReactNode",
        "defaultLabel": "background + thumb",
        "description": "Use explicit parts for custom composition; null suppresses defaults."
      }
    ]
  },
  {
    "id": "props-channel-slider",
    "title": "ChannelSlider",
    "description": "Defaults to Track and Thumb, plus an alpha transparency grid.",
    "rows": [
      {
        "name": "channel",
        "typeLabel": "ColorChannel",
        "defaultLabel": "—",
        "description": "Required channel."
      },
      {
        "name": "orientation",
        "typeLabel": "\"horizontal\" | \"vertical\"",
        "defaultLabel": "\"horizontal\"",
        "description": "Slider orientation."
      },
      {
        "name": "children",
        "typeLabel": "ReactNode",
        "defaultLabel": "default anatomy",
        "description": "Explicit children replace the default parts."
      }
    ]
  },
  {
    "id": "props-channel-input",
    "title": "ChannelInput",
    "description": "Editable channels share the Root color.",
    "rows": [
      {
        "name": "orientation",
        "typeLabel": "\"horizontal\" | \"vertical\"",
        "defaultLabel": "\"horizontal\"",
        "description": "Channel keyboard orientation."
      },
      {
        "name": "channel",
        "typeLabel": "\"hex\" | \"css\" | ColorChannel",
        "defaultLabel": "—",
        "description": "Required editable channel; provide an accessible name."
      }
    ]
  },
  {
    "id": "props-channel-text",
    "title": "ChannelText",
    "description": "Read-only channel output.",
    "rows": [
      {
        "name": "channel",
        "typeLabel": "\"hex\" | \"css\" | ColorChannel",
        "defaultLabel": "—",
        "description": "Required channel rendered from the current value."
      }
    ]
  },
  {
    "id": "props-swatch",
    "title": "Swatch and ValueSwatch",
    "description": "Static supplied color or the current Root color.",
    "rows": [
      {
        "name": "respectAlpha",
        "typeLabel": "boolean",
        "defaultLabel": "true",
        "description": "Include the color alpha channel in the swatch."
      },
      {
        "name": "value",
        "typeLabel": "string | Color",
        "defaultLabel": "—",
        "description": "Required for Swatch; ValueSwatch reads Root."
      },
      {
        "name": "shape / radius",
        "typeLabel": "ColorPickerSwatchShape / Radius",
        "defaultLabel": "rounded (ValueSwatch)",
        "description": "Shape shortcut or explicit radius token."
      }
    ]
  },
  {
    "id": "props-swatch-trigger",
    "title": "SwatchTrigger",
    "description": "Select a preset; pair with Swatch and SwatchIndicator.",
    "rows": [
      {
        "name": "value",
        "typeLabel": "string | Color",
        "defaultLabel": "—",
        "description": "Required preset."
      },
      {
        "name": "frame",
        "typeLabel": "\"none\" | \"outline\"",
        "defaultLabel": "\"outline\"",
        "description": "Visible frame."
      },
      {
        "name": "shape / radius",
        "typeLabel": "ColorPickerSwatchShape / Radius",
        "defaultLabel": "\"circle\"",
        "description": "Shape shortcut or explicit radius token."
      }
    ]
  },
  {
    "id": "props-view",
    "title": "View",
    "description": "Display controls for a particular format.",
    "rows": [
      {
        "name": "format",
        "typeLabel": "\"rgba\" | \"hsla\" | \"hsba\"",
        "defaultLabel": "—",
        "description": "Show when Root uses this format."
      }
    ]
  },
  {
    "id": "props-supporting-parts",
    "title": "Supporting parts",
    "description": "Label, Input, Trigger, Positioner, HiddenInput, ValueText, Context, AreaBackground, AreaThumb, Sliders, slider Label/Track/Thumb/ValueText, TransparencyGrid, EyeDropper, EyeDropperTrigger, SwatchGroup, SwatchIndicator, FormatSelect and FormatTrigger.",
    "rows": [
      {
        "name": "native props / children",
        "typeLabel": "part-specific HTML props",
        "defaultLabel": "—",
        "description": "Preserve names, refs and Atom-provided geometry. EyeDropper includes an icon and disables unsupported browsers. Sliders defaults to hue and alpha."
      },
      {
        "name": "Context children",
        "typeLabel": "(api) => ReactNode",
        "defaultLabel": "—",
        "description": "Read the current color controller."
      },
      {
        "name": "TransparencyGrid size",
        "typeLabel": "string",
        "defaultLabel": "—",
        "description": "Optional checker size."
      }
    ]
  }
];
export const sections = ownerSections(examples,parts);
export { ColorPickerBasic, basicSource };
