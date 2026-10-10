import { For, VStack } from "@flowstack-ui/brick";
import { DocsSection } from "../../shared/DocsSection.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { ExampleSource } from "../../shared/ExampleSource.js";
import { PropsTable } from "../../shared/PropsTable.js";
import { ForBasic } from "./examples/ForBasic.js";
import basicSource from "./examples/ForBasic.tsx?raw";
import { forExamples, forProps } from "./documentation.js";

export function ForDocumentation() {
  return <VStack gap={12} data-component-page="for">
    <ExamplePreview label="For basic" source={basicSource}><ForBasic /></ExamplePreview>
    <DocsSection id="usage" title="Usage" level={2} description="Render a typed collection without adding a DOM wrapper. For is a rendering utility, not a layout, data-fetching or virtualization component.">
      <ExampleSource label="For import" source={'import { For } from "@flowstack-ui/brick";'} />
      <ExampleSource label="For usage" source={'<For each={items} fallback={<Text>No items</Text>}>\n  {(item) => <Text key={item.id}>{item.label}</Text>}\n</For>'} />
    </DocsSection>
    <DocsSection id="examples" title="Examples" level={2}>
      <VStack gap={16}><For each={forExamples}>{({ id, title, description, Demo, source }) => <DocsSection key={id} id={id} title={title} level={3} description={description}><ExamplePreview label={title} source={source}><Demo /></ExamplePreview></DocsSection>}</For></VStack>
    </DocsSection>
    <DocsSection id="props" title="Props" level={2} description="For has no host element, styling props or ref. Style and arrange its returned children with their owning components."><PropsTable label="For props" rows={forProps} /></DocsSection>
  </VStack>;
}
