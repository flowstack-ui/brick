import { Code, VStack } from "@flowstack-ui/brick";
import { DocsSection } from "../../shared/DocsSection.js";
import { aspectRatioSection } from "./sections.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { ExampleSource } from "../../shared/ExampleSource.js";
import { PropsTable } from "../../shared/PropsTable.js";
import { aspectRatioProps } from "./props.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { AspectRatioImage } from "./examples/AspectRatioImage.js";
import { AspectRatioVideo } from "./examples/AspectRatioVideo.js";
import { AspectRatioMap } from "./examples/AspectRatioMap.js";
import { AspectRatioResponsive } from "./examples/AspectRatioResponsive.js";
import imageSource from "./examples/AspectRatioImage.tsx?raw";
import videoSource from "./examples/AspectRatioVideo.tsx?raw";
import mapSource from "./examples/AspectRatioMap.tsx?raw";
import responsiveSource from "./examples/AspectRatioResponsive.tsx?raw";
import { AspectRatioVariants } from "./examples/AspectRatioVariants.js";
import { AspectRatioRadius } from "./examples/AspectRatioRadius.js";
import { AspectRatioOverflow } from "./examples/AspectRatioOverflow.js";
import { AspectRatioContentLayout } from "./examples/AspectRatioContentLayout.js";
import variantsSource from "./examples/AspectRatioVariants.tsx?raw";
import radiusSource from "./examples/AspectRatioRadius.tsx?raw";
import overflowSource from "./examples/AspectRatioOverflow.tsx?raw";
import layoutSource from "./examples/AspectRatioContentLayout.tsx?raw";

export const aspectRatioDocsScenarios = [
  { id: "aspect-ratio.usage", number: 10, title: "Usage", description: "Numeric ratios and minimal composition." },
  { id: "aspect-ratio.examples", number: 11, title: "Examples", description: "Image, video, map, and responsive geometry." },
] as const satisfies readonly ScenarioDefinition[];

export function AspectRatioDocumentation() {
  return <VStack gap={8} startSpacing={8}>
    <Scenario {...aspectRatioDocsScenarios[0]} hideHeading>
      <DocsSection {...aspectRatioSection("usage")} description={<>The <Code>ratio</Code> prop sets the width-to-height proportions of <Code>AspectRatio</Code>, overriding the child’s original proportions. Use numbers, such as <Code>{"16 / 9"}</Code>, rather than strings. Responsive objects use numeric values at each breakpoint.</>}>
        <ExampleSource label="Aspect Ratio import" source={'import { AspectRatio } from "@flowstack-ui/brick";'} />
        <ExampleSource label="Aspect Ratio composition" source={'<AspectRatio.Root ratio={16 / 9}>\n  <iframe title="Product tour" src="/tour" />\n</AspectRatio.Root>'} />
      </DocsSection>
    </Scenario>
    <Scenario {...aspectRatioDocsScenarios[1]} hideHeading>
      <DocsSection {...aspectRatioSection("examples")}>
        <VStack gap={16}>
        <DocsSection {...aspectRatioSection("image")} description="Constrain an image to a 4:3 frame. Image owns loading and fitting; AspectRatio reserves the geometry.">
          <ExamplePreview label="Image" source={imageSource}><AspectRatioImage /></ExamplePreview>
        </DocsSection>
        <DocsSection {...aspectRatioSection("video")} description="Reserve a square frame for an embedded video. The player retains its own controls and fullscreen behavior.">
          <ExamplePreview label="Video" source={videoSource}><AspectRatioVideo /></ExamplePreview>
        </DocsSection>
        <DocsSection {...aspectRatioSection("google-map")} description="Embed a map in a 16:9 frame with a descriptive title.">
          <ExamplePreview label="Google Map" source={mapSource}><AspectRatioMap /></ExamplePreview>
        </DocsSection>
        <DocsSection {...aspectRatioSection("responsive")} description={<>Use a square below the medium breakpoint and 16:9 from medium upward. Omit <Code>initial</Code> to keep the default 16:9 before the first breakpoint.</>}>
          <ExamplePreview label="Responsive" source={responsiveSource}><AspectRatioResponsive /></ExamplePreview>
        </DocsSection>
        <DocsSection {...aspectRatioSection("variants")} description="Compare plain, subtle, and outline frame paint without changing the content or ratio.">
          <ExamplePreview label="Variants" source={variantsSource}><AspectRatioVariants /></ExamplePreview>
        </DocsSection>
        <DocsSection {...aspectRatioSection("radius")} description="Choose a core corner size or a semantic radius that follows your theme. Omission leaves square corners; full rounds a square into a circle.">
          <ExamplePreview label="Radius" source={radiusSource}><AspectRatioRadius /></ExamplePreview>
        </DocsSection>
        <DocsSection {...aspectRatioSection("overflow")} description="Hidden clips oversized content at the frame boundary. Visible allows it to extend outside; leave enough surrounding space.">
          <ExamplePreview label="Overflow" source={overflowSource}><AspectRatioOverflow /></ExamplePreview>
        </DocsSection>
        <DocsSection {...aspectRatioSection("content-layout")} description="Fill stretches the direct child across the frame. Flow keeps natural content sizing; long content can grow beyond the preferred ratio.">
          <ExamplePreview label="Content layout" source={layoutSource}><AspectRatioContentLayout /></ExamplePreview>
        </DocsSection>
        </VStack>
      </DocsSection>
    </Scenario>
    <DocsSection {...aspectRatioSection("guide")}>
      <DocsSection {...aspectRatioSection("aspect-ratio-tokens")} description={<>Use <Code>aspectRatios</Code> for shared numeric proportions: square (1:1), landscape (4:3), portrait (3:4), wide (16:9), ultrawide (18:5), and golden (1.618:1). These constants stay the same across appearances. The <Code>ratio</Code> prop still accepts numbers, not token-name strings. Matching CSS tokens, such as <Code>--brick-aspect-ratio-wide</Code>, are available for application CSS.</>}>
        <ExampleSource label="Aspect ratio tokens" source={'import { AspectRatio, aspectRatios } from "@flowstack-ui/brick";\n\n<AspectRatio.Root ratio={aspectRatios.wide}>\n  {/* content */}\n</AspectRatio.Root>'} />
      </DocsSection>
    </DocsSection>
    <DocsSection {...aspectRatioSection("props")} description={<>These props can be passed to <Code>AspectRatio.Root</Code>. Standard HTML attributes and refs are also supported; they are omitted here.</>}>
      <PropsTable label="AspectRatio.Root props" rows={aspectRatioProps} />
    </DocsSection>
  </VStack>;
}
