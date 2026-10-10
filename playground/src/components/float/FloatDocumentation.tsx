import { For, Paragraph, VStack } from "@flowstack-ui/brick";
import { DocsSection } from "../../shared/DocsSection.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { ExampleSource } from "../../shared/ExampleSource.js";
import { PropsTable } from "../../shared/PropsTable.js";
import { floatSection } from "./sections.js";
import { floatProps, floatAnchorProps } from "./props.js";
import { FloatPlacement } from "./examples/FloatPlacement.js";
import PlacementSource from "./examples/FloatPlacement.tsx?raw";
import { FloatOffsets } from "./examples/FloatOffsets.js";
import OffsetsSource from "./examples/FloatOffsets.tsx?raw";
import { FloatAvatar } from "./examples/FloatAvatar.js";
import AvatarSource from "./examples/FloatAvatar.tsx?raw";
import { FloatResponsive } from "./examples/FloatResponsive.js";
import ResponsiveSource from "./examples/FloatResponsive.tsx?raw";
import { FloatInline } from "./examples/FloatInline.js";
import InlineSource from "./examples/FloatInline.tsx?raw";
import { FloatComposition } from "./examples/FloatComposition.js";
import CompositionSource from "./examples/FloatComposition.tsx?raw";
const examples = [{ id: "placement", Demo: FloatPlacement, source: PlacementSource, description: "Anchor each item’s center to an edge, corner, or the middle of its parent." },
{ id: "offsets", Demo: FloatOffsets, source: OffsetsSource, description: "Use signed offsets for inward or outward placement. Axis props override the uniform inset." },
{ id: "avatar", Demo: FloatAvatar, source: AvatarSource, description: "Keep the badge outside Avatar’s clipped content, but inside the shared anchor." },
{ id: "responsive", Demo: FloatResponsive, source: ResponsiveSource, description: "Sparse responsive props use defaults until their first breakpoint. Centered axes ignore offsets." },
{ id: "inline", Demo: FloatInline, source: InlineSource, description: "Anchor is block-level by default. Inline anchors fit their content; their parent still controls alignment." },
{ id: "composition", Demo: FloatComposition, source: CompositionSource, description: "Actions keep their own semantics and focus ring. Keep a wrapper when a child owns its own transform or positioning." }];
export function FloatDocumentation() {
 return <VStack gap={8} startSpacing={8}>
 <DocsSection {...floatSection("usage")} description="Float.Root requires a positioned containing block. Float.Anchor supplies one without paint or custom CSS.">
 <ExampleSource label="Float import" source={'import { Float } from "@flowstack-ui/brick";'} />
 <ExampleSource label="Float usage" source={'<Float.Anchor>\n  {/* In-flow target */}\n  <Float.Root>{/* Floating content */}</Float.Root>\n</Float.Anchor>'} />
 </DocsSection>
 <DocsSection {...floatSection("examples")}><VStack gap={16}><For each={examples}>{({ id, Demo, source, description }) => <DocsSection key={id} {...floatSection(id)} description={description}><ExamplePreview label={floatSection(id).title} source={source}><Demo /></ExamplePreview></DocsSection>}</For></VStack></DocsSection>
 <DocsSection {...floatSection("guide")} description="Choose the owner by the layout relationship.">
 <Paragraph tone="secondary">Float attaches content across an edge without contributing to the parent’s size. ZStack layers size-contributing content. Bleed crosses padding using margins. NotificationBadge owns counts, dots and circular-overlap presets.</Paragraph>
 <Paragraph tone="secondary">Offset numbers multiply the base spacing unit; numeric strings use the existing spacing-token vocabulary. For example, 3 is three base units, while "3" uses space-3. Use explicit lengths or percentages when needed. Axis values override the uniform offset, even when zero. Offsets on centered axes are ignored.</Paragraph>
 <Paragraph tone="secondary">The parent needs in-flow content or definite dimensions. Float cannot escape clipping or guarantee viewport containment. Keep floated actions beside, not inside, another interactive control. Name meaningful content explicitly; Float does not hide it or announce it automatically.</Paragraph>
 </DocsSection>
 <DocsSection {...floatSection("props")} description="Only Float’s layout and composition props are listed. Native attributes, refs, className, style and slot also pass through.">
 <DocsSection {...floatSection("float-root-props")} description="The floating content. These props control where it sits relative to its positioned parent and how far it is offset.">
 <PropsTable label="Float.Root props" rows={floatProps} />
 </DocsSection>
 <DocsSection {...floatSection("float-anchor-props")} description="The optional parent wrapper that provides the positioning reference for Float.Root. Use it around the target and floating content; omit it when an existing parent already provides that reference.">
 <PropsTable label="Float.Anchor props" rows={floatAnchorProps} />
 </DocsSection>
 </DocsSection>
 </VStack>;
}
