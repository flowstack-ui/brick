import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { EditableEvidence } from "./EditableEvidence.js";
import { editableExamples } from "./documentation.js";
import { editableParts } from "./parts.js";
import { EditableBasic } from "./examples/EditableBasic.js";
import source from "./examples/EditableBasic.tsx?raw";
export { editableScenarios } from "./EditableEvidence.js";
export function EditablePage() {
  const preview = usePreviewContext();
  if (
    preview ||
    new URLSearchParams(window.location.search).get("qualification") === "1"
  )
    return <EditableEvidence />;
  return (
    <VStack gap={12} data-component-page="editable">
      <ExamplePreview label="Editable basic" source={source}>
        <EditableBasic />
      </ExamplePreview>
      <OwnerDocumentation
        name="Editable"
        usage={
          '<Editable.Root defaultValue="Project notes">\n  <Editable.Preview />\n  <Editable.Input aria-label="Project title" />\n</Editable.Root>'
        }
        examples={editableExamples}
        parts={editableParts}
      />
    </VStack>
  );
}
