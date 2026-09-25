import type { SpinnerProps } from "@flowstack-ui/brick";
import type { DocsPropDefinition } from "../../shared/PropsTable.js";
import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { SpinnerSizes } from "./examples/SpinnerSizes.js";
import SizesSource from "./examples/SpinnerSizes.tsx?raw";
import { SpinnerColors } from "./examples/SpinnerColors.js";
import ColorsSource from "./examples/SpinnerColors.tsx?raw";
import { SpinnerCustomColor } from "./examples/SpinnerCustomColor.js";
import CustomColorSource from "./examples/SpinnerCustomColor.tsx?raw";
import { SpinnerTrack } from "./examples/SpinnerTrack.js";
import TrackSource from "./examples/SpinnerTrack.tsx?raw";
import { SpinnerSpeed } from "./examples/SpinnerSpeed.js";
import SpeedSource from "./examples/SpinnerSpeed.tsx?raw";
import { SpinnerThickness } from "./examples/SpinnerThickness.js";
import ThicknessSource from "./examples/SpinnerThickness.tsx?raw";
import { SpinnerCustomIndicator } from "./examples/SpinnerCustomIndicator.js";
import CustomIndicatorSource from "./examples/SpinnerCustomIndicator.tsx?raw";
import { SpinnerLabel } from "./examples/SpinnerLabel.js";
import LabelSource from "./examples/SpinnerLabel.tsx?raw";
import { SpinnerOverlay } from "./examples/SpinnerOverlay.js";
import OverlaySource from "./examples/SpinnerOverlay.tsx?raw";
import { SpinnerInherited } from "./examples/SpinnerInherited.js";
import InheritedSource from "./examples/SpinnerInherited.tsx?raw";
import { SpinnerResponsive } from "./examples/SpinnerResponsive.js";
import ResponsiveSource from "./examples/SpinnerResponsive.tsx?raw";
import { SpinnerEmphasis } from "./examples/SpinnerEmphasis.js";
import EmphasisSource from "./examples/SpinnerEmphasis.tsx?raw";
export const examples: OwnerExample[] = [
{"id":"sizes","title":"Sizes","description":"Choose a compact ring that matches its surrounding content.", Demo: SpinnerSizes, source: SizesSource },
{"id":"colors","title":"Colors","description":"Use semantic tones without changing geometry.", Demo: SpinnerColors, source: ColorsSource },
{"id":"custom-color","title":"Custom Color","description":"Override ring color through the documented component variable.", Demo: SpinnerCustomColor, source: CustomColorSource },
{"id":"track","title":"Track","description":"Add a subtle track behind the active arc.", Demo: SpinnerTrack, source: TrackSource },
{"id":"speed","title":"Speed","description":"Change local rotation duration; reduced motion still remains static.", Demo: SpinnerSpeed, source: SpeedSource },
{"id":"thickness","title":"Thickness","description":"Choose the ring weight independently of its size.", Demo: SpinnerThickness, source: ThicknessSource },
{"id":"custom-indicator","title":"Custom Indicator","description":"Rotate one passive SVG instead of painting the built-in ring.", Demo: SpinnerCustomIndicator, source: CustomIndicatorSource },
{"id":"label","title":"Label","description":"Keep visible status text beside a decorative indicator.", Demo: SpinnerLabel, source: LabelSource },
{"id":"overlay","title":"Overlay","description":"Layer loading feedback over a bounded region without a page-level overlay.", Demo: SpinnerOverlay, source: OverlaySource },
{"id":"inherited","title":"Inherited","description":"Match the surrounding typography with an inherited size.", Demo: SpinnerInherited, source: InheritedSource },
{"id":"responsive","title":"Responsive","description":"Change diameter across breakpoints without JavaScript measurement.", Demo: SpinnerResponsive, source: ResponsiveSource },
{"id":"emphasis","title":"Emphasis","description":"Choose text or solid semantic paint.", Demo: SpinnerEmphasis, source: EmphasisSource },
];
export const parts: OwnerPart[] = [{ id: "props-spinner", title: "Spinner", description: "A decorative span by default; project one passive artwork element with asChild.", rows: [
{"name":"size","typeLabel":"ResponsiveValue<\"inherit\" | \"xs\" | \"sm\" | \"md\" | \"lg\" | \"xl\">","defaultLabel":"\"md\"","description":"Diameter; sparse breakpoint objects begin at md."},
{"name":"tone","typeLabel":"\"inherit\" | \"primary\" | \"secondary\" | \"muted\" | \"accent\" | \"info\" | \"success\" | \"warning\" | \"danger\"","defaultLabel":"\"inherit\"","description":"Semantic paint."},
{"name":"emphasis","typeLabel":"\"text\" | \"solid\"","defaultLabel":"\"text\"","description":"Semantic text or solid palette paint."},
{"name":"thickness","typeLabel":"\"thin\" | \"regular\" | \"thick\"","defaultLabel":"\"regular\"","description":"Built-in ring weight; custom artwork owns its stroke."},
{"name":"asChild","typeLabel":"boolean","defaultLabel":"false","description":"Project sizing, color and rotation onto one noninteractive element."},
{"name":"label","typeLabel":"string","defaultLabel":"—","description":"Optional meaningful graphic name; mutually exclusive with aria-labelledby."},
{"name":"aria-labelledby","typeLabel":"string","defaultLabel":"—","description":"Reference existing text instead of label."},
{"name":"style","typeLabel":"CSSProperties & Spinner custom properties","defaultLabel":"—","description":"Supports --brick-spinner-size, -color, -track-color, -thickness and -duration."},
] satisfies readonly DocsPropDefinition<SpinnerProps>[] }];
export const sections = ownerSections(examples, parts);
