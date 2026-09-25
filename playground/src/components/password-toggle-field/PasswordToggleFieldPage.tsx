import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { DocsSection } from "../../shared/DocsSection.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { ExampleSource } from "../../shared/ExampleSource.js";
import { PropsTable } from "../../shared/PropsTable.js";
import { PasswordToggleFieldEvidence } from "./PasswordToggleFieldEvidence.js";
import {
  Basic,
  basicSource,
  examples,
  iconRows,
  inputRows,
  rootRows,
  toggleRows,
} from "./documentation.js";

export { passwordToggleFieldScenarios } from "./PasswordToggleFieldEvidence.js";

export function PasswordToggleFieldPage() {
  const preview = usePreviewContext();
  if (
    preview ||
    (typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("qualification") === "1")
  ) {
    return <PasswordToggleFieldEvidence />;
  }

  return (
    <VStack gap={12} data-component-page="password-toggle-field">
      <ExamplePreview label="Password Toggle Field basic" source={basicSource}>
        <Basic />
      </ExamplePreview>
      <DocsSection
        id="usage"
        level={2}
        title="Usage"
        description="Use one Root with one native Input and one Toggle. Field supplies the visible label; choose current-password or new-password autocomplete deliberately."
      >
        <ExampleSource
          label="Password Toggle Field import"
          source={'import { PasswordToggleField } from "@flowstack-ui/brick";'}
        />
        <ExampleSource
          label="Password Toggle Field usage"
          source={
            '<PasswordToggleField.Root><PasswordToggleField.Input autoComplete="current-password" /><PasswordToggleField.Toggle /></PasswordToggleField.Root>'
          }
        />
      </DocsSection>
      <DocsSection id="examples" level={2} title="Examples">
        <VStack gap={16}>
          {examples.map(({ id, title, description, Demo, source }) => (
            <DocsSection
              description={description}
              id={id}
              key={id}
              level={3}
              title={title}
            >
              <ExamplePreview label={title} source={source}>
                <Demo />
              </ExamplePreview>
            </DocsSection>
          ))}
        </VStack>
      </DocsSection>
      <DocsSection id="props" level={2} title="Props">
        <VStack gap={10}>
          <DocsSection
            id="props-root"
            level={3}
            title="Root"
            description="Owns visibility, form state, localization and the painted field wrapper."
          >
            <PropsTable
              label="PasswordToggleField Root props"
              rows={rootRows}
            />
          </DocsSection>
          <DocsSection
            id="props-input"
            level={3}
            title="Input"
            description="Owns the native value, name, autocomplete, validity and input ref."
          >
            <PropsTable
              label="PasswordToggleField Input props"
              rows={inputRows}
            />
          </DocsSection>
          <DocsSection
            id="props-toggle"
            level={3}
            title="Toggle"
            description="Owns one native show/hide action and its button ref."
          >
            <PropsTable
              label="PasswordToggleField Toggle props"
              rows={toggleRows}
            />
          </DocsSection>
          <DocsSection
            id="props-icon"
            level={3}
            title="Icon"
            description="Owns decorative visible and hidden artwork only."
          >
            <PropsTable
              label="PasswordToggleField Icon props"
              rows={iconRows}
            />
          </DocsSection>
        </VStack>
      </DocsSection>
    </VStack>
  );
}
