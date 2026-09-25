import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { QrCodeSizes } from "./examples/QrCodeSizes.js";
import SizesSource from "./examples/QrCodeSizes.tsx?raw";
import { QrCodeResponsive } from "./examples/QrCodeResponsive.js";
import ResponsiveSource from "./examples/QrCodeResponsive.tsx?raw";
import { QrCodeLogo } from "./examples/QrCodeLogo.js";
import LogoSource from "./examples/QrCodeLogo.tsx?raw";
import { QrCodeFill } from "./examples/QrCodeFill.js";
import FillSource from "./examples/QrCodeFill.tsx?raw";
import { QrCodeDownload } from "./examples/QrCodeDownload.js";
import DownloadSource from "./examples/QrCodeDownload.tsx?raw";
import { QrCodeCorrection } from "./examples/QrCodeCorrection.js";
import CorrectionSource from "./examples/QrCodeCorrection.tsx?raw";
import { QrCodeInput } from "./examples/QrCodeInput.js";
import InputSource from "./examples/QrCodeInput.tsx?raw";
import { QrCodeStore } from "./examples/QrCodeStore.js";
import StoreSource from "./examples/QrCodeStore.tsx?raw";
import { QrCodeLoading } from "./examples/QrCodeLoading.js";
import LoadingSource from "./examples/QrCodeLoading.tsx?raw";
import { QrCodeClosed } from "./examples/QrCodeClosed.js";
import ClosedSource from "./examples/QrCodeClosed.tsx?raw";
import { QrCodeOverlayExport } from "./examples/QrCodeOverlayExport.js";
import OverlayExportSource from "./examples/QrCodeOverlayExport.tsx?raw";
import { QrCodeRecovery } from "./examples/QrCodeRecovery.js";
import RecoverySource from "./examples/QrCodeRecovery.tsx?raw";
import { QrCodeDefaults } from "./examples/QrCodeDefaults.js";
import DefaultsSource from "./examples/QrCodeDefaults.tsx?raw";
import { QrCodeComposition } from "./examples/QrCodeComposition.js";
import CompositionSource from "./examples/QrCodeComposition.tsx?raw";
export const examples: OwnerExample[] = [
{id:"sizes",title:"Sizes",description:"Choose a display size independently of download resolution. Small, dense codes may not scan.",Demo:QrCodeSizes,source:SizesSource},
{id:"responsive",title:"Responsive and full width",description:"Use a bounded parent for full width. This example changes from full to lg at md, then 2xl at xl.",Demo:QrCodeResponsive,source:ResponsiveSource},
{id:"logo",title:"Logo",description:"Add a small Overlay and use high error correction. Overlay size and padding can be set on Root.",Demo:QrCodeLogo,source:LogoSource},
{id:"fill",title:"Custom fill",description:"Set Frame fill and background together; custom colors require scan checks.",Demo:QrCodeFill,source:FillSource},
{id:"download",title:"Download",description:"Use text or icon-only actions. ButtonGroup supplies shared button styles; exportSize controls image resolution.",Demo:QrCodeDownload,source:DownloadSource},
{id:"correction",title:"Error correction",description:"Choose L, M, Q or H. More correction tolerates damage but can increase density.",Demo:QrCodeCorrection,source:CorrectionSource},
{id:"input",title:"Controlled value",description:"Control value from an input. The exact accepted string is encoded without trimming.",Demo:QrCodeInput,source:InputSource},
{id:"store",title:"Store",description:"Share useQrCode with RootProvider and read its current state with Context.",Demo:QrCodeStore,source:StoreSource},
{id:"loading",title:"Loading",description:"Loading belongs to the application. Keep a fixed-size placeholder until a usable value is ready.",Demo:QrCodeLoading,source:LoadingSource},
{id:"closed",title:"Closed composition",description:"Wrap the standard parts in an application component when you want a shorter call site.",Demo:QrCodeClosed,source:ClosedSource},
{id:"overlay-export",title:"Portable overlay export",description:"Use exportSrc to give an HTML-wrapped logo matching artwork in the downloaded QR code. Handle export failures.",Demo:QrCodeOverlayExport,source:OverlayExportSource},
{id:"recovery",title:"Capacity and recovery",description:"An invalid value removes the pattern. Correcting it restores the graphic without stale data.",Demo:QrCodeRecovery,source:RecoverySource},
{id:"defaults",title:"Shared defaults",description:"PropsProvider sets presentation defaults; an explicit Root prop takes precedence.",Demo:QrCodeDefaults,source:DefaultsSource},
{id:"composition",title:"Unstyled and host composition",description:"Project onto compatible hosts with asChild. With unstyled, the application owns graphic sizing and paint.",Demo:QrCodeComposition,source:CompositionSource}];
export const parts: OwnerPart[] = [
  {
    "id": "props-root",
    "title": "Root",
    "description": "Value owner with a square graphic presentation.",
    "rows": [
      {
        "name": "value / defaultValue",
        "typeLabel": "string",
        "defaultLabel": "\"\"",
        "description": "Controlled or initial exact payload. No trimming, fetching or URL validation."
      },
      {
        "name": "size",
        "typeLabel": "ResponsiveValue<2xs | xs | sm | md | lg | xl | 2xl | full>",
        "defaultLabel": "md",
        "description": "40, 64, 80, 120, 160, 200, 240px or parent width. Sparse responsive maps supported."
      },
      {
        "name": "encoding",
        "typeLabel": "QrCodeEncoding",
        "defaultLabel": "see below",
        "description": "ecc=L; boostEcc=false; minVersion=1; maxVersion=40; maskPattern=-1 (automatic); border=4 modules; invert=false."
      },
      {
        "name": "pixelSize",
        "typeLabel": "number",
        "defaultLabel": "10",
        "description": "Base export pixel scale, positive and at most 100; separate from CSS size."
      },
      {
        "name": "onValueChange / onEncode / onEncodingError",
        "typeLabel": "callbacks",
        "defaultLabel": "—",
        "description": "Receive {value}, {result} or {error}. Generation callbacks run after commit."
      },
      {
        "name": "id / ids",
        "typeLabel": "string / {root?, frame?, overlay?}",
        "defaultLabel": "generated",
        "description": "Stable part IDs. A native ID supplied to a part takes precedence."
      },
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Compose one compatible host forwarding native props and refs. Frame requires SVG; Pattern requires path."
      },
      {
        "name": "unstyled",
        "typeLabel": "boolean",
        "defaultLabel": "false / inherited",
        "description": "Suppress graphic recipe classes. Explicit part values override Root; download styling is independent."
      }
    ]
  },
  {
    "id": "props-rootprovider",
    "title": "RootProvider",
    "description": "Presentation around an existing useQrCode controller.",
    "rows": [
      {
        "name": "value",
        "typeLabel": "QrCodeApi",
        "defaultLabel": "required",
        "description": "Use the controller returned by useQrCode."
      },
      {
        "name": "size",
        "typeLabel": "ResponsiveValue<QrCodeSize>",
        "defaultLabel": "md",
        "description": "Same responsive graphic size as Root."
      },
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Compose one compatible host forwarding native props and refs. Frame requires SVG; Pattern requires path."
      },
      {
        "name": "unstyled",
        "typeLabel": "boolean",
        "defaultLabel": "false / inherited",
        "description": "Suppress graphic recipe classes. Explicit part values override Root; download styling is independent."
      }
    ]
  },
  {
    "id": "props-propsprovider",
    "title": "PropsProvider",
    "description": "RootPropsProvider is an alias. Does not render a host.",
    "rows": [
      {
        "name": "value",
        "typeLabel": "QrCodeRecipeProps",
        "defaultLabel": "required",
        "description": "Default size and unstyled. Nested defined values merge; responsive maps replace."
      }
    ]
  },
  {
    "id": "props-frame",
    "title": "Frame",
    "description": "Native SVG with backing, accessible name and default Pattern.",
    "rows": [
      {
        "name": "titleText / description",
        "typeLabel": "string",
        "defaultLabel": "—",
        "description": "SVG title and description. Explicit aria-label/aria-labelledby are also supported."
      },
      {
        "name": "fill / background",
        "typeLabel": "SVG paint",
        "defaultLabel": "black / white",
        "description": "Scanning pair remains light in dark mode. Export resolves paint from the rendered graphic."
      },
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Compose one compatible host forwarding native props and refs. Frame requires SVG; Pattern requires path."
      },
      {
        "name": "unstyled",
        "typeLabel": "boolean",
        "defaultLabel": "false / inherited",
        "description": "Suppress graphic recipe classes. Explicit part values override Root; download styling is independent."
      }
    ]
  },
  {
    "id": "props-pattern",
    "title": "Pattern",
    "description": "Optional explicit path for native SVG presentation. Geometry remains owned.",
    "rows": [
      {
        "name": "fill",
        "typeLabel": "SVG paint",
        "defaultLabel": "inherited",
        "description": "Choose ink intentionally. d cannot be overridden."
      },
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Compose one compatible host forwarding native props and refs. Frame requires SVG; Pattern requires path."
      },
      {
        "name": "unstyled",
        "typeLabel": "boolean",
        "defaultLabel": "false / inherited",
        "description": "Suppress graphic recipe classes. Explicit part values override Root; download styling is independent."
      }
    ]
  },
  {
    "id": "props-overlay",
    "title": "Overlay",
    "description": "One decorative logo centered over Frame, not over actions below it.",
    "rows": [
      {
        "name": "exportSrc",
        "typeLabel": "string",
        "defaultLabel": "—",
        "description": "Portable image for arbitrary HTML. A contained image or self-contained SVG can export directly."
      },
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Compose one compatible host forwarding native props and refs. Frame requires SVG; Pattern requires path."
      },
      {
        "name": "unstyled",
        "typeLabel": "boolean",
        "defaultLabel": "false / inherited",
        "description": "Suppress graphic recipe classes. Explicit part values override Root; download styling is independent."
      }
    ]
  },
  {
    "id": "props-download",
    "title": "DownloadTrigger",
    "description": "Finished DownloadTrigger using Atom QR serialization.",
    "rows": [
      {
        "name": "fileName / mimeType",
        "typeLabel": "string / QrCodeMimeType",
        "defaultLabel": "required",
        "description": "SVG, PNG, JPEG or supported WebP. Handles errors instead of silently substituting formats."
      },
      {
        "name": "exportSize / quality / includeOverlay",
        "typeLabel": "number / number / boolean",
        "defaultLabel": "matrix × pixelSize / browser / true",
        "description": "Output edge 1–4096px; raster quality 0–1."
      },
      {
        "name": "size / tone / variant / radius / shape / fullWidth",
        "typeLabel": "shared action recipes",
        "defaultLabel": "Button defaults",
        "description": "Inherits ButtonGroup and Button defaults. Action size is separate from QR size."
      },
      {
        "name": "iconOnly / aria-label",
        "typeLabel": "boolean / string",
        "defaultLabel": "false / —",
        "description": "Use finished IconButton behavior and an accessible name."
      },
      {
        "name": "loading / loadingText / spinner / spinnerPlacement / focusRing",
        "typeLabel": "shared action props",
        "defaultLabel": "Button defaults",
        "description": "Same loading, icon and focus behavior as Button. Do not forward unsupported styling as native attributes."
      },
      {
        "name": "disabled / onDownloadStart / onDownloadInitiated / onDownloadError",
        "typeLabel": "boolean / callbacks",
        "defaultLabel": "false / —",
        "description": "Invalid QR disables export; asynchronous work is cancelled on disabled/unmount. Initiated means browser handoff, not saved."
      },
      {
        "name": "Native host",
        "typeLabel": "button",
        "defaultLabel": "button",
        "description": "No href, asChild, render or type override. Graphic unstyled does not remove action recipes."
      }
    ]
  },
  {
    "id": "props-context",
    "title": "Context",
    "description": "Render callback with the current QR controller; no host.",
    "rows": [
      {
        "name": "children",
        "typeLabel": "(api: QrCodeApi) => ReactNode",
        "defaultLabel": "required",
        "description": "Read value, result, error and state; call setValue, toBlob or getDataUrl. Export requires mounted Frame."
      }
    ]
  }
];
export const sections = ownerSections(examples, parts, true);
