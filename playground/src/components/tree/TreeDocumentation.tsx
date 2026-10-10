import { VStack } from "@flowstack-ui/brick";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { treeExamples, treeParts } from "./documentation.js";
import { TreeBasic } from "./examples/TreeBasic.js";
import source from "./examples/TreeBasic.tsx?raw";
export function TreeDocumentation() {
  return <VStack gap={12} data-component-page="tree">
    <ExamplePreview label="Tree basic" source={source}><TreeBasic /></ExamplePreview>
    <OwnerDocumentation name="Tree" usageDescription="Use Tree for one-column hierarchical navigation. Use TreeGrid when rows have several navigable columns."
      usage={'<Tree.Root aria-label="Files">\n  <Tree.Item value="readme">\n    <Tree.ItemContent><Tree.ItemText>README.md</Tree.ItemText></Tree.ItemContent>\n  </Tree.Item>\n</Tree.Root>'}
      examples={treeExamples} parts={treeParts} />
  </VStack>;
}
