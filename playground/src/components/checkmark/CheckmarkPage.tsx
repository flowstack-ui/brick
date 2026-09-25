import { For, VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { DocsSection } from "../../shared/DocsSection.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { ExampleSource } from "../../shared/ExampleSource.js";
import { PropsTable } from "../../shared/PropsTable.js";
import { CheckmarkEvidence } from "./CheckmarkEvidence.js";
import { Basic, basicSource, examples, rows } from "./documentation.js";
export { checkmarkScenarios } from "./CheckmarkEvidence.js";
export function CheckmarkPage() {
  const preview = usePreviewContext();
  if (
    preview ||
    (typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("qualification") === "1")
  )
    return <CheckmarkEvidence />;
  return (
    <VStack gap={12} data-component-page="checkmark">
      <ExamplePreview label="Checkmark basic" source={basicSource}>
        <Basic />
      </ExamplePreview>
      <DocsSection
        id="usage"
        title="Usage"
        level={2}
        description="A passive visual indicator. Keep interaction, labels and accessible state on the parent control."
      >
        <ExampleSource
          label="Checkmark import"
          source={'import { Checkmark } from "@flowstack-ui/brick";'}
        />
        <ExampleSource
          label="Checkmark usage"
          source={"<Checkmark checked />"}
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
        <PropsTable label="Checkmark props" rows={rows} />
      </DocsSection>
    </VStack>
  );
}
