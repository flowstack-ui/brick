import { Code, For, VStack } from "@flowstack-ui/brick";
import { DocsSection } from "../../shared/DocsSection.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { ExampleSource } from "../../shared/ExampleSource.js";
import { PropsTable } from "../../shared/PropsTable.js";
import { centerSection } from "./sections.js";
import { centerProps, squareProps, circleProps } from "./props.js";
import { CenterIcon } from "./examples/CenterIcon.js";
import { CenterInline } from "./examples/CenterInline.js";
import { CenterSquare } from "./examples/CenterSquare.js";
import { CenterCircle } from "./examples/CenterCircle.js";
import { CenterResponsive } from "./examples/CenterResponsive.js";
import iconSource from "./examples/CenterIcon.tsx?raw";
import inlineSource from "./examples/CenterInline.tsx?raw";
import squareSource from "./examples/CenterSquare.tsx?raw";
import circleSource from "./examples/CenterCircle.tsx?raw";
import responsiveSource from "./examples/CenterResponsive.tsx?raw";
const examples = [
  {
    id: "icon",
    description:
      "Center icons and numbers inside an equal-size region. Icon owns the glyph size; Square owns its surrounding geometry.",
    Demo: CenterIcon,
    source: iconSource,
  },
  {
    id: "inline",
    description: (
      <>
        Use <Code>inline</Code> for inline-flex centering without starting a new
        line. Here the Link remains the single semantic anchor.
      </>
    ),
    Demo: CenterInline,
    source: inlineSource,
  },
  {
    id: "square",
    description: (
      <>
        Use <Code>Square</Code> with one required <Code>size</Code> for equal
        width and height. These numeric sizes are pixels.
      </>
    ),
    Demo: CenterSquare,
    source: squareSource,
  },
  {
    id: "circle",
    description: (
      <>
        Use <Code>Circle</Code> for genuinely circular geometry. It keeps
        Square’s sizing and applies the full-radius token.
      </>
    ),
    Demo: CenterCircle,
    source: circleSource,
  },
  {
    id: "responsive",
    description:
      "Provide a mobile baseline and only the breakpoints that change. Square and Circle retain their dimensions beside long content.",
    Demo: CenterResponsive,
    source: responsiveSource,
  },
] as const;
export function CenterDocumentation() {
  return (
    <VStack gap={8} startSpacing={8}>
      <DocsSection
        {...centerSection("usage")}
        description={
          <>
            Use <Code>Center</Code> to center children on both axes within its
            own region.
          </>
        }
      >
        <ExampleSource
          label="Center import"
          source={
            'import { Center, Circle, Square } from "@flowstack-ui/brick";'
          }
        />
        <ExampleSource
          label="Center usage"
          source={"<Center>\n  <Text>Centered content</Text>\n</Center>"}
        />
      </DocsSection>
      <DocsSection {...centerSection("examples")}>
        <VStack gap={16}>
          <For each={examples}>
            {({ id, description, Demo, source }) => (
              <DocsSection
                key={id}
                {...centerSection(id)}
                description={description}
              >
                <ExamplePreview label={centerSection(id).title} source={source}>
                  <Demo />
                </ExamplePreview>
              </DocsSection>
            )}
          </For>
        </VStack>
      </DocsSection>
      <DocsSection {...centerSection("guide")}>
        <DocsSection
          {...centerSection("composition")}
          description={
            <>
              Center owns alignment, not height, background or typography. Use{" "}
              <Code>Frame</Code> for an authored height, <Code>Surface</Code>{" "}
              for paint and radius, and <Code>Text</Code> for typography.
              Compose them with <Code>asChild</Code> to share one host. Center
              does not center wrapped text lines; set text alignment on the text
              owner when needed. Use Square for equal-size regions, Circle for
              circles, Stack for rows or columns, and ZStack for positioned
              overlays.
            </>
          }
        >
          {null}
        </DocsSection>
      </DocsSection>
      <DocsSection
        {...centerSection("props")}
        description="Component-specific props are listed below. Standard HTML attributes and refs are also supported; paint and general sizing belong to the composed owners."
      >
        <VStack gap={16}>
          <DocsSection {...centerSection("center-props")}>
            <PropsTable label="Center props" rows={centerProps} />
          </DocsSection>
          <DocsSection {...centerSection("square-props")}>
            <PropsTable label="Square props" rows={squareProps} />
          </DocsSection>
          <DocsSection
            {...centerSection("circle-props")}
            description="Circle shares Square’s props and always adds its full-radius geometry."
          >
            <PropsTable label="Circle props" rows={circleProps} />
          </DocsSection>
        </VStack>
      </DocsSection>
    </VStack>
  );
}
