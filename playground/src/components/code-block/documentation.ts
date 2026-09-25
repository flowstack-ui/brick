import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { CodeBlockBasic } from "./examples/CodeBlockBasic.js";
import BasicSource from "./examples/CodeBlockBasic.tsx?raw";
import { CodeBlockSizes } from "./examples/CodeBlockSizes.js";
import SizesSource from "./examples/CodeBlockSizes.tsx?raw";
import { CodeBlockCopy } from "./examples/CodeBlockCopy.js";
import CopySource from "./examples/CodeBlockCopy.tsx?raw";
import { CodeBlockNumbers } from "./examples/CodeBlockNumbers.js";
import NumbersSource from "./examples/CodeBlockNumbers.tsx?raw";
import { CodeBlockHighlight } from "./examples/CodeBlockHighlight.js";
import HighlightSource from "./examples/CodeBlockHighlight.tsx?raw";
import { CodeBlockFocus } from "./examples/CodeBlockFocus.js";
import FocusSource from "./examples/CodeBlockFocus.tsx?raw";
import { CodeBlockDiff } from "./examples/CodeBlockDiff.js";
import DiffSource from "./examples/CodeBlockDiff.tsx?raw";
import { CodeBlockBounded } from "./examples/CodeBlockBounded.js";
import BoundedSource from "./examples/CodeBlockBounded.tsx?raw";
import { CodeBlockExpand } from "./examples/CodeBlockExpand.js";
import ExpandSource from "./examples/CodeBlockExpand.tsx?raw";
import { CodeBlockLanguage } from "./examples/CodeBlockLanguage.js";
import LanguageSource from "./examples/CodeBlockLanguage.tsx?raw";
import { CodeBlockFloating } from "./examples/CodeBlockFloating.js";
import FloatingSource from "./examples/CodeBlockFloating.tsx?raw";
import { CodeBlockTabs } from "./examples/CodeBlockTabs.js";
import TabsSource from "./examples/CodeBlockTabs.tsx?raw";
import { CodeBlockThemes } from "./examples/CodeBlockThemes.js";
import ThemesSource from "./examples/CodeBlockThemes.tsx?raw";
import { CodeBlockShiki } from "./examples/CodeBlockShiki.js";
import ShikiSource from "./examples/CodeBlockShiki.tsx?raw";
import { CodeBlockWrap } from "./examples/CodeBlockWrap.js";
import WrapSource from "./examples/CodeBlockWrap.tsx?raw";
import { CodeBlockVariants } from "./examples/CodeBlockVariants.js";
import VariantsSource from "./examples/CodeBlockVariants.tsx?raw";
export const Basic = CodeBlockBasic;
export const basicSource = BasicSource;
export const examples: OwnerExample[] = [
{id:"sizes",title:"Sizes",description:"Compare compact, regular and spacious padding.",Demo:CodeBlockSizes,source:SizesSource},
{id:"copy",title:"Copy",description:"Optional title and an icon-only copy action with real success and error feedback.",Demo:CodeBlockCopy,source:CopySource},
{id:"line-numbers",title:"Line Numbers",description:"Generate one-based line numbers without changing copied source.",Demo:CodeBlockNumbers,source:NumbersSource},
{id:"line-highlighting",title:"Line Highlighting",description:"Highlight selected source lines through metadata.",Demo:CodeBlockHighlight,source:HighlightSource},
{id:"line-focus",title:"Line Focus",description:"Optionally dim other lines. Hover or keyboard focus restores their readability; no blur.",Demo:CodeBlockFocus,source:FocusSource},
{id:"diff",title:"Diff",description:"Additions and removals have signs as well as color. Metadata does not change the copied source.",Demo:CodeBlockDiff,source:DiffSource},
{id:"max-lines",title:"Max Lines",description:"Limit visible lines while keeping the rest scrollable.",Demo:CodeBlockBounded,source:BoundedSource},
{id:"expand",title:"Expand",description:"Compose the existing Collapsible lifecycle for a bounded preview and full source.",Demo:CodeBlockExpand,source:ExpandSource},
{id:"language",title:"Language",description:"Language selection and its source remain application state.",Demo:CodeBlockLanguage,source:LanguageSource},
{id:"floating-copy",title:"Floating Copy",description:"Compose a floating copy control using ZStack.",Demo:CodeBlockFloating,source:FloatingSource},
{id:"tabs",title:"Tabs",description:"Tabs selects between independently named source regions.",Demo:CodeBlockTabs,source:TabsSource},
{id:"themes",title:"Themes",description:"Choose a local appearance without changing the surrounding page.",Demo:CodeBlockThemes,source:ThemesSource},
{id:"shiki",title:"Shiki",description:"Load an optional highlighter once. Render safe tokens with paired light and dark syntax themes.",Demo:CodeBlockShiki,source:ShikiSource},
{id:"word-wrap",title:"Word Wrap",description:"Wrap long lines instead of horizontal scrolling.",Demo:CodeBlockWrap,source:WrapSource},
{id:"variants",title:"Variants",description:"Brick additionally offers subtle, bordered and plain treatments. No highlighter is required.",Demo:CodeBlockVariants,source:VariantsSource},
];
export const parts: OwnerPart[] = [
  {
    "id": "props-root",
    "title": "Root",
    "description": "Owns the exact source, recipes, metadata and Clipboard context.",
    "rows": [
      {
        "name": "value",
        "typeLabel": "string",
        "defaultLabel": "—",
        "description": "Required exact source, including leading/trailing whitespace."
      },
      {
        "name": "language",
        "typeLabel": "string",
        "defaultLabel": "—",
        "description": "Highlighter language identifier."
      },
      {
        "name": "adapter",
        "typeLabel": "CodeBlockAdapter",
        "defaultLabel": "—",
        "description": "Synchronous React renderer; createShikiAdapter loads one optional highlighter outside render."
      },
      {
        "name": "meta",
        "typeLabel": "CodeBlockMeta",
        "defaultLabel": "—",
        "description": "showLineNumbers, highlightLines, focusedLines, addedLines, removedLines and dimUnfocused."
      },
      {
        "name": "colorScheme",
        "typeLabel": "\"light\" | \"dark\"",
        "defaultLabel": "inherited; Shiki defaults dark",
        "description": "Local appearance and syntax palette selection."
      },
      {
        "name": "size",
        "typeLabel": "\"sm\" | \"md\" | \"lg\"",
        "defaultLabel": "\"md\"",
        "description": "Density recipe."
      },
      {
        "name": "variant",
        "typeLabel": "\"subtle\" | \"bordered\" | \"plain\"",
        "defaultLabel": "\"subtle\"",
        "description": "Surface recipe."
      }
    ]
  },
  {
    "id": "props-content",
    "title": "Content",
    "description": "Owns pre/code, overflow and its accessible name.",
    "rows": [
      {
        "name": "wrap",
        "typeLabel": "\"scroll\" | \"wrap\"",
        "defaultLabel": "\"scroll\"",
        "description": "Long-line treatment."
      },
      {
        "name": "maxLines",
        "typeLabel": "number",
        "defaultLabel": "—",
        "description": "Positive whole-line limit."
      },
      {
        "name": "focusable",
        "typeLabel": "boolean",
        "defaultLabel": "true",
        "description": "Keeps overflow keyboard reachable."
      },
      {
        "name": "children",
        "typeLabel": "ReactNode",
        "defaultLabel": "source / adapter",
        "description": "Explicit content takes precedence. Keep it aligned with value."
      }
    ]
  },
  {
    "id": "props-line",
    "title": "Line",
    "description": "Optional manual line anatomy; automatic metadata uses the same part.",
    "rows": [
      {
        "name": "lineNumber",
        "typeLabel": "number",
        "defaultLabel": "—",
        "description": "Positive visible line number."
      },
      {
        "name": "highlighted",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Highlighted surface."
      },
      {
        "name": "focused",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Focus emphasis."
      },
      {
        "name": "change",
        "typeLabel": "\"added\" | \"removed\"",
        "defaultLabel": "—",
        "description": "Diff paint and sign."
      }
    ]
  },
  {
    "id": "props-copy",
    "title": "CopyTrigger",
    "description": "Atom Clipboard behavior with Brick Button styling, or one authored IconButton.",
    "rows": [
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Child owns appearance when composed."
      },
      {
        "name": "variant",
        "typeLabel": "ButtonVariant",
        "defaultLabel": "\"ghost\"",
        "description": "Button recipe."
      },
      {
        "name": "tone",
        "typeLabel": "ButtonTone",
        "defaultLabel": "\"neutral\"",
        "description": "Button tone."
      },
      {
        "name": "size",
        "typeLabel": "ResponsiveValue<ButtonSize>",
        "defaultLabel": "\"sm\"",
        "description": "Button size."
      },
      {
        "name": "radius",
        "typeLabel": "Radius",
        "defaultLabel": "control",
        "description": "Explicit shared radius; do not combine with legacy shape."
      },
      {
        "name": "focusRing",
        "typeLabel": "\"inside\" | \"outside\"",
        "defaultLabel": "outside",
        "description": "Focus placement."
      }
    ]
  },
  {
    "id": "props-collapse",
    "title": "CollapseTrigger",
    "description": "Existing Collapsible owns state and the controlled region.",
    "rows": [
      {
        "name": "closedLabel",
        "typeLabel": "ReactNode",
        "defaultLabel": "children",
        "description": "Label while collapsed."
      },
      {
        "name": "openLabel",
        "typeLabel": "ReactNode",
        "defaultLabel": "children",
        "description": "Label while expanded."
      }
    ]
  }
];
export const sections = ownerSections(examples, parts);
