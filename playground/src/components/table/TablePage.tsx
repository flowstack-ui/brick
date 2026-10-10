import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { TableEvidence } from "./TableEvidence.js";
import { tableExamples, tableParts } from "./documentation.js";
import { TableBasic } from "./examples/TableBasic.js";
import source from "./examples/TableBasic.tsx?raw";
export { tableScenarios } from "./TableEvidence.js";

export function TablePage() {
  const preview = usePreviewContext();
  if (
    preview ||
    new URLSearchParams(window.location.search).get("qualification") === "1"
  )
    return <TableEvidence />;
  return (
    <VStack gap={12} data-component-page="table">
      <ExamplePreview label="Table basic" source={source}>
        <TableBasic />
      </ExamplePreview>
      <OwnerDocumentation
        name="Table"
        usage={
          "<Table.Root>\n  <Table.Header>\n    <Table.Row><Table.Head>Product</Table.Head></Table.Row>\n  </Table.Header>\n  <Table.Body>\n    <Table.Row><Table.Cell>Laptop</Table.Cell></Table.Row>\n  </Table.Body>\n</Table.Root>"
        }
        examples={tableExamples}
        parts={tableParts}
      />
    </VStack>
  );
}
