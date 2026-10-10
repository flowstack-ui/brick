import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { DownloadTriggerVariants } from "./examples/DownloadTriggerVariants.js";
import VariantsSource from "./examples/DownloadTriggerVariants.tsx?raw";
import { DownloadTriggerBasic } from "./examples/DownloadTriggerBasic.js";
import BasicSource from "./examples/DownloadTriggerBasic.tsx?raw";
import { DownloadTriggerSvg } from "./examples/DownloadTriggerSvg.js";
import SvgSource from "./examples/DownloadTriggerSvg.tsx?raw";
import { DownloadTriggerPromise } from "./examples/DownloadTriggerPromise.js";
import PromiseSource from "./examples/DownloadTriggerPromise.tsx?raw";
import { DownloadTriggerFileSize } from "./examples/DownloadTriggerFileSize.js";
import FileSizeSource from "./examples/DownloadTriggerFileSize.tsx?raw";
import { DownloadTriggerIcons } from "./examples/DownloadTriggerIcons.js";
import IconsSource from "./examples/DownloadTriggerIcons.tsx?raw";
import { DownloadTriggerLoading } from "./examples/DownloadTriggerLoading.js";
import LoadingSource from "./examples/DownloadTriggerLoading.tsx?raw";
import { DownloadTriggerGroups } from "./examples/DownloadTriggerGroups.js";
import GroupsSource from "./examples/DownloadTriggerGroups.tsx?raw";
import { DownloadTriggerErrors } from "./examples/DownloadTriggerErrors.js";
import ErrorsSource from "./examples/DownloadTriggerErrors.tsx?raw";
import { DownloadTriggerHook } from "./examples/DownloadTriggerHook.js";
import HookSource from "./examples/DownloadTriggerHook.tsx?raw";
export const examples:OwnerExample[]=[
{id:"basic",title:"Basic",description:"Generate a text file from literal content.",Demo:DownloadTriggerBasic,source:BasicSource},
{id:"svg",title:"Download SVG",description:"Supply SVG source as file content.",Demo:DownloadTriggerSvg,source:SvgSource},
{id:"promise",title:"Promise",description:"Prepare data lazily; pending state automatically blocks duplicate activation.",Demo:DownloadTriggerPromise,source:PromiseSource},
{id:"filesize",title:"File size",description:"Compose FormatByte for a known byte count.",Demo:DownloadTriggerFileSize,source:FileSizeSource},
{id:"variants",title:"Variants",description:"Download actions share the same seven variants as Button; no download-specific recipe.",Demo:DownloadTriggerVariants,source:VariantsSource},
{id:"icons",title:"Icon-only",description:"Use iconOnly for IconButton geometry and provide an accessible name.",Demo:DownloadTriggerIcons,source:IconsSource},
{id:"loading",title:"Loading options",description:"Shared Button loading text, spinner and placement also work during preparation.",Demo:DownloadTriggerLoading,source:LoadingSource},
{id:"groups",title:"Button groups",description:"Group defaults apply to downloads and other actions; explicit child props win.",Demo:DownloadTriggerGroups,source:GroupsSource},
{id:"errors",title:"Error recovery",description:"The application owns error messages; a failed preparation can be retried.",Demo:DownloadTriggerErrors,source:ErrorsSource},
{id:"hook",title:"Custom action and cancellation",description:"useDownload shares the lifecycle without imposing a trigger. Pass the action's owner document.",Demo:DownloadTriggerHook,source:HookSource},
];
export const parts:OwnerPart[]=[
  {
    "id": "props-trigger",
    "title": "DownloadTrigger",
    "description": "One native non-submit action; text Button by default, IconButton with iconOnly. Custom actions use the hook rather than nested buttons.",
    "rows": [
      {
        "name": "data",
        "typeLabel": "DownloadableData | lazy producer",
        "defaultLabel": "—",
        "description": "String, Blob or File; a lazy producer may return a promise and receives AbortSignal."
      },
      {
        "name": "fileName",
        "typeLabel": "string",
        "defaultLabel": "—",
        "description": "Required nonempty suggested filename."
      },
      {
        "name": "mimeType",
        "typeLabel": "string",
        "defaultLabel": "—",
        "description": "Required for strings; otherwise inferred from Blob/File."
      },
      {
        "name": "iconOnly",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Use IconButton presentation; aria-label is required in this mode."
      },
      {
        "name": "size",
        "typeLabel": "ResponsiveValue<ButtonSize>",
        "defaultLabel": "\"lg\"",
        "description": "Seven complete action sizes; inherits ButtonGroup."
      },
      {
        "name": "variant",
        "typeLabel": "\"solid\" | \"soft\" | \"subtle\" | \"surface\" | \"outline\" | \"ghost\" | \"plain\"",
        "defaultLabel": "\"solid\" / icon: \"ghost\"",
        "description": "Uses the corresponding action recipe."
      },
      {
        "name": "tone",
        "typeLabel": "ButtonTone",
        "defaultLabel": "\"accent\" / icon: \"neutral\"",
        "description": "Shared semantic action tones and group defaults."
      },
      {
        "name": "radius",
        "typeLabel": "Radius",
        "defaultLabel": "control",
        "description": "Shared radius tokens; do not combine with shape."
      },
      {
        "name": "shape",
        "typeLabel": "\"sharp\" | \"rounded\" | \"pill\"; icon: \"rounded\" | \"circle\"",
        "defaultLabel": "\"rounded\"",
        "description": "Legacy corner choices; radius is the general token API."
      },
      {
        "name": "fullWidth",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Text-button mode only."
      },
      {
        "name": "focusRing",
        "typeLabel": "\"outside\" | \"inside\"",
        "defaultLabel": "\"outside\"",
        "description": "Focus placement, not keyboard behavior."
      },
      {
        "name": "startIcon / endIcon",
        "typeLabel": "ReactNode",
        "defaultLabel": "—",
        "description": "Text-button artwork; icon-only mode uses children."
      },
      {
        "name": "loading / disabled",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "External loading or disabled; internal preparation also supplies loading."
      },
      {
        "name": "loadingText",
        "typeLabel": "ReactNode",
        "defaultLabel": "—",
        "description": "Text while preparing, in text-button mode."
      },
      {
        "name": "spinner / spinnerPlacement",
        "typeLabel": "ReactNode / \"start\" | \"end\"",
        "defaultLabel": "default spinner / start",
        "description": "Shared loading presentation."
      },
      {
        "name": "onDownloadStart",
        "typeLabel": "() => void",
        "defaultLabel": "—",
        "description": "Runs before preparation."
      },
      {
        "name": "onDownloadInitiated",
        "typeLabel": "(details) => void",
        "defaultLabel": "—",
        "description": "Browser handoff with filename, MIME and bytes; not saved-file completion."
      },
      {
        "name": "onDownloadError",
        "typeLabel": "({error}) => void",
        "defaultLabel": "—",
        "description": "Application-owned feedback and recovery."
      },
      {
        "name": "onClick / onPress",
        "typeLabel": "event handler",
        "defaultLabel": "—",
        "description": "preventDefault cancels activation; native action props and ref are forwarded."
      }
    ]
  },
  {
    "id": "props-hook",
    "title": "useDownload",
    "description": "Shared Atom-owned download lifecycle for custom actions.",
    "rows": [
      {
        "name": "options",
        "typeLabel": "UseDownloadProps",
        "defaultLabel": "—",
        "description": "Same data and lifecycle options, plus disabled/loading."
      },
      {
        "name": "state",
        "typeLabel": "\"idle\" | \"preparing\" | \"error\"",
        "defaultLabel": "\"idle\"",
        "description": "Current preparation state."
      },
      {
        "name": "loading",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Resolved external or internal loading."
      },
      {
        "name": "download",
        "typeLabel": "(ownerDocument?: Document) => void",
        "defaultLabel": "—",
        "description": "Call on user activation; pass the action document for iframes."
      },
      {
        "name": "cancel",
        "typeLabel": "() => void",
        "defaultLabel": "—",
        "description": "Abort pending preparation and suppress late handoff."
      }
    ]
  }
];
export const sections=ownerSections(examples,parts);
