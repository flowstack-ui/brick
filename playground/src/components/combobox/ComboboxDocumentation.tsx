import { VStack } from "@flowstack-ui/brick";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { ComboboxBasic } from "./examples/ComboboxBasic.js";
import source from "./examples/ComboboxBasic.tsx?raw";
import { examples, parts } from "./documentation.js";
export function ComboboxDocumentation() {
  return <VStack gap={12} data-component-page="combobox">
    <ExamplePreview label="Combobox basic" source={source}><ComboboxBasic /></ExamplePreview>
    <OwnerDocumentation name="Combobox" usageDescription="Use an editable combobox to search options. Keep selected values separate from search text." usage={'<Combobox.Root options={options}>\n  <Combobox.Control><Combobox.Input /><Combobox.Trigger /></Combobox.Control>\n  <Combobox.Portal><Combobox.Content><Combobox.Listbox>{/* Items */}</Combobox.Listbox></Combobox.Content></Combobox.Portal>\n</Combobox.Root>'} examples={examples} parts={parts} />
  </VStack>;
}
