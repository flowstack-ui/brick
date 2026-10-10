import { Text, VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { MarqueeEvidence } from "./MarqueeEvidence.js";
import { MarqueeBasic } from "./examples/MarqueeBasic.js";
import basicSource from "./examples/MarqueeBasic.tsx?raw";
import { examples, parts } from "./documentation.js";
import "./marquee-art.css";
export { marqueeScenarios } from "./MarqueeEvidence.js";
export function MarqueePage() {
  const preview = usePreviewContext();
  if (preview || (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1")) return <MarqueeEvidence />;
  return <VStack gap={12} data-component-page="marquee"><ExamplePreview label="Marquee basic" source={basicSource}><MarqueeBasic /></ExamplePreview><OwnerDocumentation name="Marquee" usage={'<Marquee.Root autoFill>\n  <Marquee.Viewport>\n    <Marquee.Content renderReplica={() => <Marquee.Item>Acme</Marquee.Item>}>\n      <Marquee.Item>Acme</Marquee.Item>\n    </Marquee.Content>\n  </Marquee.Viewport>\n</Marquee.Root>'} usageDescription="Compose one original track and explicit passive replicas. Include a persistent pause control as in the examples." examples={examples} parts={parts} guide={<VStack gap={3}><Text>Use pure, ID-free, noninteractive replicas. Keep links in the original track only; focus and reduced motion expose stationary originals.</Text><Text>Set speed in pixels per second. Edge color and extent use --brick-marquee-edge-color and --brick-marquee-edge-size, inherited from the owning surface. Content components own colors and sizes.</Text></VStack>} /></VStack>;
}
