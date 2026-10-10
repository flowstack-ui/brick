import { For, VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { DocsSection } from "../../shared/DocsSection.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { ExampleSource } from "../../shared/ExampleSource.js";
import { PropsTable } from "../../shared/PropsTable.js";
import { RadiomarkEvidence } from "./RadiomarkEvidence.js";
import { Basic, basicSource, examples, rows } from "./documentation.js";
export { radiomarkScenarios } from "./RadiomarkEvidence.js";
export function RadiomarkPage() {
  const preview = usePreviewContext();
  if (
    preview ||
    (typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("qualification") === "1")
  )
    return <RadiomarkEvidence />;
  return (
    <VStack gap={12} data-component-page="radiomark">
      <ExamplePreview label="Radiomark basic" source={basicSource}>
        <Basic />
      </ExamplePreview>
      <DocsSection
        id="usage"
        title="Usage"
        level={2}
        description="A passive visual indicator. Keep interaction, labels and accessible state on the parent control."
      >
        <ExampleSource
          label="Radiomark import"
          source={'import { Radiomark } from "@flowstack-ui/brick";'}
        />
        <ExampleSource
          label="Radiomark usage"
          source={"<Radiomark checked />"}
        />
      </DocsSection>
      <DocsSection id="examples" title="Examples" level={2}>
        <VStack gap={16}>
          <For each={examples}>
            {({ id, title, description, Demo, source }) => (
              <DocsSection
                key={id}
                id={id}
                title={title}
                description={description}
                level={3}
              >
                <ExamplePreview label={title} source={source}>
                  <Demo />
                </ExamplePreview>
              </DocsSection>
            )}
          </For>
        </VStack>
      </DocsSection>
      <DocsSection
        id="props"
        title="Props"
        level={2}
        description="Native attributes and refs are forwarded; the mark remains aria-hidden."
      >
        <PropsTable label="Radiomark props" rows={rows} />
      </DocsSection>
    </VStack>
  );
}
