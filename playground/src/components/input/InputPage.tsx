import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { DocsSection } from "../../shared/DocsSection.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { ExampleSource } from "../../shared/ExampleSource.js";
import { PropsTable } from "../../shared/PropsTable.js";
import { InputEvidence } from "./InputEvidence.js";
import { Basic, basicSource, examples, inputRows, addonRows } from "./documentation.js";
export { inputScenarios } from "./InputEvidence.js";

export function InputPage() {
  const preview = usePreviewContext();
  if (preview || (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1")) return <InputEvidence />;
  return <VStack gap={12} data-component-page="input">
    <ExamplePreview label="Input basic" source={basicSource}><Basic /></ExamplePreview>
    <DocsSection id="usage" title="Usage" level={2} description="Use Input for native single-line entry. Field supplies its label and messages.">
      <ExampleSource label="Input import" source={'import { Input } from "@flowstack-ui/brick";'} />
      <ExampleSource label="Input usage" source={'<Input aria-label="Email" type="email" />'} />
    </DocsSection>
    <DocsSection id="examples" title="Examples" level={2}><VStack gap={16}>{examples.map(({id,title,description,Demo,source})=><DocsSection key={id} id={id} title={title} level={3} description={description}><ExamplePreview label={title} source={source}><Demo /></ExamplePreview></DocsSection>)}</VStack></DocsSection>
    <DocsSection id="props" title="Props" level={2}><VStack gap={10}>
      <DocsSection id="props-input" title="Input" level={3} description="Native text entry and its visual boundary."><PropsTable label="Input props" rows={inputRows} /></DocsSection>
      <DocsSection id="props-addon" title="InputAddon" level={3} description="A separate noninteractive segment composed through Group."><PropsTable label="InputAddon props" rows={addonRows} /></DocsSection>
    </VStack></DocsSection>
  </VStack>;
}
