import { VStack } from "@flowstack-ui/brick";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { DocsSection } from "../../shared/DocsSection.js";
import { PropsTable } from "../../shared/PropsTable.js";
import { InputAddonBasic } from "./examples/InputAddonBasic.js";
import source from "./examples/InputAddonBasic.tsx?raw";
import { ExampleSource } from "../../shared/ExampleSource.js";
import { examples } from "./documentation.js";
import { usePreviewContext } from "../../preview/PreviewContext.js";

export const inputAddonScenarios: ScenarioDefinition[] = [
  { id: "input-addon.overview", number: 1, title: "Attached prefix", description: "A noninteractive segment shares the input boundary." },
];
export function InputAddonPage() {
  const preview = usePreviewContext();
  const qualification = preview || (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1");
  return <VStack gap="12" data-component-page="input-addon">
    <Scenario {...inputAddonScenarios[0]} hideHeading>
      <ExamplePreview label="Attached prefix" source={source}><InputAddonBasic /></ExamplePreview>
    </Scenario>
    {!qualification && <>
      <DocsSection id="usage" title="Usage" level={2} description="Use InputAddon for noninteractive segments outside the input boundary. Use Input adornments for content inside it, and Button or IconButton for actions.">
        <ExampleSource label="InputAddon usage" source={'import { Group, Input, InputAddon } from "@flowstack-ui/brick";\n\n<Group attached>\n  <InputAddon>https://</InputAddon>\n  <Input aria-label="Website address" />\n</Group>'} />
      </DocsSection>
      <DocsSection id="examples" title="Examples" level={2}><VStack gap={16}>
        {examples.map(({ id, title, description, Demo, source: exampleSource }) => <DocsSection key={id} id={id} title={title} description={description} level={3}>
          <ExamplePreview label={title} source={exampleSource}><Demo /></ExamplePreview>
        </DocsSection>)}
      </VStack></DocsSection>
    </>}
    <DocsSection id="props" title="Props" level={2} description="InputAddon renders a noninteractive span. Match the input's size and variant explicitly.">
      <PropsTable label="InputAddon props" rows={[
        { name: "size", typeLabel: "ResponsiveValue<ControlSize>", defaultLabel: '"lg"', description: "2xs, xs, sm, md, lg, xl or 2xl." },
        { name: "variant", typeLabel: "ResponsiveValue<FieldVariant>", defaultLabel: '"outline"', description: "outline, surface, soft, subtle, ghost, plain or underline." },
        { name: "radius", typeLabel: "Radius", description: "Token corners; underline stays square. Group removes attached inner corners." },
      ]} />
    </DocsSection>
  </VStack>;
}
