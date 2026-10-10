import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { CarouselEvidence } from "./CarouselEvidence.js";
import { Basic, basicSource, examples, parts } from "./documentation.js";
export { carouselScenarios } from "./CarouselEvidence.js";
export function CarouselPage() {
  const preview = usePreviewContext();
  if (
    preview ||
    (typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("qualification") === "1")
  )
    return <CarouselEvidence />;
  return (
    <VStack gap={12} data-component-page="carousel">
      <ExamplePreview label="Carousel basic" source={basicSource}>
        <Basic />
      </ExamplePreview>
      <OwnerDocumentation
        name="Carousel"
        usageDescription="Cycle through images, cards or other content using accessible navigation and measured snap pages."
        usage={
          '<Carousel.Root loop={false} controlPlacement="outside">\n  <Carousel.Viewport><Carousel.Track>…</Carousel.Track></Carousel.Viewport>\n  <Carousel.Controls><Carousel.Previous/><Carousel.Indicators/><Carousel.Next/></Carousel.Controls>\n</Carousel.Root>'
        }
        examples={examples}
        parts={parts}
      />
    </VStack>
  );
}
