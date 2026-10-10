import { Code, Paragraph, VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { CheckboxCardBasic } from "./examples/CheckboxCardBasic.js";
import source from "./examples/CheckboxCardBasic.tsx?raw";
import { examples, parts } from "./documentation.js";
export const checkboxCardScenarios: ScenarioDefinition[] = [
  {
    id: "checkbox-card.basic",
    number: 1,
    title: "Basic",
    description: "Native option card",
  },
  ...examples.map((example, index) => ({
    id: `checkbox-card.${example.id}`,
    number: index + 2,
    title: example.title,
    description: example.description,
  })),
];
export function CheckboxCardPage() {
  const preview = usePreviewContext();
  if (
    preview ||
    (typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("qualification") === "1")
  )
    return (
      <VStack gap="8">
        <Scenario {...checkboxCardScenarios[0]}>
          <CheckboxCardBasic />
        </Scenario>
        {examples.map(({ Demo, id }, index) => (
          <Scenario key={id} {...checkboxCardScenarios[index + 1]}>
            <Demo />
          </Scenario>
        ))}
      </VStack>
    );
  return (
    <VStack gap={12} data-component-page="checkbox-card">
      <ExamplePreview label="Checkbox card basic" source={source}>
        <CheckboxCardBasic />
      </ExamplePreview>
      <OwnerDocumentation
        name="CheckboxCard"
        usage={
          "<CheckboxCard.Root>\n  <CheckboxCard.HiddenInput />\n  <CheckboxCard.Control>\n    <CheckboxCard.Label>Daily backups</CheckboxCard.Label>\n    <CheckboxCard.Indicator />\n  </CheckboxCard.Control>\n</CheckboxCard.Root>"
        }
        usageDescription="Use a checkbox card for an independently selectable rich option. Include one HiddenInput; keep all card content noninteractive."
        examples={examples}
        parts={parts}
        guide={
          <VStack gap="3">
            <Paragraph tone="secondary">
              Group related options with <Code>CheckboxGroup.Root</Code> inside{" "}
              <Code>Fieldset.Root</Code> and provide a legend. Do not wrap the
              whole group in one Field.
            </Paragraph>
            <Paragraph tone="secondary">
              Keep card content noninteractive. For a record with links or
              actions, use Card with a separate Checkbox instead.
            </Paragraph>
          </VStack>
        }
      />
    </VStack>
  );
}
