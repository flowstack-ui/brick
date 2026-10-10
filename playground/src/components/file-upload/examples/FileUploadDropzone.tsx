import { FileUpload, Frame, Text } from "@flowstack-ui/brick";

export function FileUploadDropzone() {
  return (
    <Frame maxInlineSize={480}>
      <FileUpload.Root multiple maxFiles={5}>
        <FileUpload.HiddenInput />
        <FileUpload.Dropzone aria-label="Drop attachments">
          <FileUpload.DropzoneContent>
            <Text>Drag and drop files here</Text>
            <Text tone="secondary" variant="body-sm">
              Choose up to five attachments
            </Text>
          </FileUpload.DropzoneContent>
          <FileUpload.Trigger size="sm">Browse files</FileUpload.Trigger>
        </FileUpload.Dropzone>
        <FileUpload.List />
      </FileUpload.Root>
    </Frame>
  );
}
