import type { OwnerExample, OwnerPart } from "../../shared/OwnerDocumentation.js";
import type { DocsSectionMetadata } from "../../shared/DocsTableOfContents.js";
import type { DocsPropDefinition } from "../../shared/PropsTable.js";
import type { StatRootProps, StatGroupProps, StatLabelProps, StatIndicatorProps } from "@flowstack-ui/brick";
import { StatBasic } from "./examples/StatBasic.js";
import BasicSource from "./examples/StatBasic.tsx?raw";
import { StatFormatting } from "./examples/StatFormatting.js";
import FormattingSource from "./examples/StatFormatting.tsx?raw";
import { StatIndicator } from "./examples/StatIndicator.js";
import IndicatorSource from "./examples/StatIndicator.tsx?raw";
import { StatInfoTip } from "./examples/StatInfoTip.js";
import InfoTipSource from "./examples/StatInfoTip.tsx?raw";
import { StatUnits } from "./examples/StatUnits.js";
import UnitsSource from "./examples/StatUnits.tsx?raw";
import { StatProgress } from "./examples/StatProgress.js";
import ProgressSource from "./examples/StatProgress.tsx?raw";
import { StatIcon } from "./examples/StatIcon.js";
import IconSource from "./examples/StatIcon.tsx?raw";
import { StatTrend } from "./examples/StatTrend.js";
import TrendSource from "./examples/StatTrend.tsx?raw";
import { StatSizes } from "./examples/StatSizes.js";
import SizesSource from "./examples/StatSizes.tsx?raw";
import { StatResponsive } from "./examples/StatResponsive.js";
import ResponsiveSource from "./examples/StatResponsive.tsx?raw";
import { StatGroup } from "./examples/StatGroup.js";
import GroupSource from "./examples/StatGroup.tsx?raw";
import { StatMeaning } from "./examples/StatMeaning.js";
import MeaningSource from "./examples/StatMeaning.tsx?raw";
import { StatArtwork } from "./examples/StatArtwork.js";
import ArtworkSource from "./examples/StatArtwork.tsx?raw";
import { StatLocale } from "./examples/StatLocale.js";
import LocaleSource from "./examples/StatLocale.tsx?raw";
import { StatUnavailable } from "./examples/StatUnavailable.js";
import UnavailableSource from "./examples/StatUnavailable.tsx?raw";
import { StatComposition } from "./examples/StatComposition.js";
import CompositionSource from "./examples/StatComposition.tsx?raw";
export const Basic = StatBasic;
export const basicSource = BasicSource;
export const examples: OwnerExample[] = [
{id:"formatting",title:"Format options",description:"Compose FormatNumber to display a localized currency.",Demo:StatFormatting,source:FormattingSource},
{id:"indicator",title:"Indicator",description:"Pair a decorative arrow with words describing the change.",Demo:StatIndicator,source:IndicatorSource},
{id:"infotip",title:"Info tip",description:"Compose ToggleTip for information available by click, keyboard or touch.",Demo:StatInfoTip,source:InfoTipSource},
{id:"units",title:"Value unit",description:"Use ValueUnit for each authored unit in a multi-part value.",Demo:StatUnits,source:UnitsSource},
{id:"progress",title:"Progress bar",description:"Place a named Progress inside a block description so the bar fills the metric.",Demo:StatProgress,source:ProgressSource},
{id:"icon",title:"Icon",description:"Compose a decorative icon alongside the label.",Demo:StatIcon,source:IconSource},
{id:"trend",title:"Trend",description:"Combine a Badge and a directional indicator with the comparison period.",Demo:StatTrend,source:TrendSource},
{id:"sizes",title:"Sizes",description:"Choose sm, md or lg for the value; supporting text keeps its readable scale.",Demo:StatSizes,source:SizesSource},
{id:"responsive",title:"Responsive size",description:"Resize the window: Group defaults change at md; an explicit Root size remains independent.",Demo:StatResponsive,source:ResponsiveSource},
{id:"group",title:"Grouped metrics",description:"Share a default size with Group and override individual metrics when needed.",Demo:StatGroup,source:GroupSource},
{id:"meaning",title:"Direction and meaning",description:"Choose indicator tone independently: lower costs can be good, while a neutral change needs no judgment.",Demo:StatMeaning,source:MeaningSource},
{id:"artwork",title:"Custom indicator",description:"Replace the arrow artwork without losing the SVG's authored stroke or fill.",Demo:StatArtwork,source:ArtworkSource},
{id:"locale",title:"Locale and bytes",description:"Use the existing locale and byte formatter rather than formatting inside Stat.",Demo:StatLocale,source:LocaleSource},
{id:"unavailable",title:"Loading and unavailable",description:"Keep the label and an explicit message; missing data is not zero.",Demo:StatUnavailable,source:UnavailableSource},
{id:"composition",title:"Composition",description:"Use asChild to preserve one authored host and valid description-list grammar.",Demo:StatComposition,source:CompositionSource},
];
const common = [
{name:"asChild",typeLabel:"boolean",defaultLabel:"false",description:"Project onto one element, preserving native grammar and actual-host refs."},
{name:"data-slot",typeLabel:"string",defaultLabel:"part-specific",description:"Override the public styling hook."},
] satisfies DocsPropDefinition<StatLabelProps>[];
const size = {name:"size",typeLabel:"ResponsiveValue<'sm' | 'md' | 'lg'>",defaultLabel:"md (or Group)",description:"Omitted Root size inherits Group. An explicit sparse map starts at md."} satisfies DocsPropDefinition<StatRootProps>;
const tone = {name:"tone",typeLabel:"'neutral' | 'accent' | 'info' | 'success' | 'warning' | 'danger'",description:"Desirability is independent of arrow direction."} satisfies DocsPropDefinition<StatIndicatorProps>;
const role = {name:"role",typeLabel:"React.AriaRole",defaultLabel:"group",description:"Group's default semantic role may be overridden."} satisfies DocsPropDefinition<StatGroupProps>;
export const parts: OwnerPart[] = [
{id:"props-root",title:"Root",description:"Native dl and responsive value-size owner.",rows:[size,...common]},
{id:"props-group",title:"Group",description:"Wrapping group with shared size defaults; not a painted surface.",rows:[{...size,defaultLabel:"md"},role,...common]},
{id:"props-label",title:"Label",description:"Native dt naming the metric.",rows:common},
{id:"props-value-text",title:"ValueText",description:"Native dd containing the value and optional units.",rows:common},
{id:"props-value-unit",title:"ValueUnit",description:"Muted span aligned with the numeric baseline.",rows:common},
{id:"props-help-text",title:"HelpText",description:"Native dd for comparison text or block supporting content.",rows:common},
{id:"props-up-indicator",title:"UpIndicator",description:"Decorative upward artwork; author comparison wording.",rows:[{...tone,defaultLabel:"success"},...common]},
{id:"props-down-indicator",title:"DownIndicator",description:"Decorative downward artwork; author comparison wording.",rows:[{...tone,defaultLabel:"danger"},...common]},
];
export const sections: DocsSectionMetadata[] = [
{id:"usage",title:"Usage",level:2},{id:"examples",title:"Examples",level:2},
...examples.map(({id,title})=>({id,title,level:3 as const})),
{id:"props",title:"Props",level:2},...parts.map(({id,title})=>({id,title,level:3 as const})),
];
