import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { FileUploadEvidence } from "./FileUploadEvidence.js";
import { FileUploadBasic } from "./examples/FileUploadBasic.js";
import source from "./examples/FileUploadBasic.tsx?raw";
import { examples, parts } from "./documentation.js";
export { fileUploadScenarios } from "./FileUploadEvidence.js";

export function FileUploadPage() {
  const preview = usePreviewContext();
  if (
    preview ||
    new URLSearchParams(window.location.search).get("qualification") === "1"
  )
    return <FileUploadEvidence />;
  return (
    <VStack gap={12} data-component-page="file-upload">
      <ExamplePreview label="File Upload basic" source={source}>
        <FileUploadBasic />
      </ExamplePreview>
      <OwnerDocumentation
        name="FileUpload"
        usage={
          "<FileUpload.Root>\n  <FileUpload.HiddenInput />\n  <FileUpload.Trigger>Upload file</FileUpload.Trigger>\n  <FileUpload.List />\n</FileUpload.Root>"
        }
        usageDescription="Choose local files and review the selection. Your application owns uploading and server validation."
        examples={examples}
        parts={parts}
      />
    </VStack>
  );
}
