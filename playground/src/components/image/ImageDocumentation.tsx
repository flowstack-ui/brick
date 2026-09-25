import { Link, Paragraph, VStack } from "@flowstack-ui/brick";
import { Fragment } from "react";
import { DocsSection } from "../../shared/DocsSection.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { ExampleSource } from "../../shared/ExampleSource.js";
import { PropsTable } from "../../shared/PropsTable.js";
import { examples, parts, ImageBasic, basicSource } from "./documentation.js";

const integrationHref = "https://github.com/flowstack-ui/brick/blob/main/docs/components/image/integrations.md";
export function ImageDocumentation() {
  return (
    <VStack gap={12} data-component-page="image">
      <ExamplePreview label="Image basic" source={basicSource}><ImageBasic /></ExamplePreview>
      <DocsSection id="usage" title="Usage" description="Root owns source metadata, Content owns native image delivery, and Fallback is authored. Frame supplies display dimensions.">
        <ExampleSource label="Image import" source={'import { Image } from "@flowstack-ui/brick";'} />
        <ExampleSource label="Image usage" source={'<Image.Root src="/studio.webp">\n  <Image.Content alt="Sunlit studio" width={768} height={512} />\n  <Image.Fallback>Studio unavailable</Image.Fallback>\n</Image.Root>'} />
      </DocsSection>
      <DocsSection id="examples" title="Examples">
        <VStack gap={16}>{examples.map(({id,title,description,Demo,source})=>(
          <Fragment key={id}>
            <DocsSection id={id} title={title} description={description} level={3}>
              <ExamplePreview label={title} source={source}><Demo /></ExamplePreview>
            </DocsSection>
            {id === "html-dimensions" && <DocsSection id="framework-integration" title="Framework integration" level={3} description="Optional optimized delivery belongs to the application. Next code runs in the production qualification fixture, not this Vite preview.">
              <Link href={integrationHref}>Next Image, getImageProps and CDN delivery guide</Link>
            </DocsSection>}
          </Fragment>
        ))}</VStack>
      </DocsSection>
      <DocsSection id="guide" title="Guide">
        <Paragraph>Put canonical src/srcSet on Root for truthful SSR state. Content-only candidates synchronize after mount. Use one Content per Root.</Paragraph>
        <Paragraph>Omitted ratio retains intrinsic sizing. A supplied sparse ratio starts at 16/9. Full rounding needs square geometry for a circle.</Paragraph>
        <Paragraph>Brick presents media; your application, CDN or framework optimizes delivery. Keep critical images eager with deliberate priority and defer ordinary below-fold media with native lazy loading.</Paragraph>
      </DocsSection>
      <DocsSection id="props" title="Props"><VStack gap={12}>{parts.map(part=>(
        <DocsSection key={part.id} id={part.id} title={part.title} description={part.description} level={3}>
          <PropsTable label={`Image.${part.title} props`} rows={part.rows} />
        </DocsSection>
      ))}</VStack></DocsSection>
    </VStack>
  );
}
