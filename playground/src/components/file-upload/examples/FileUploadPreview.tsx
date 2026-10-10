import { FileUpload, Frame } from "@flowstack-ui/brick";

export function FileUploadPreview() {
  return (
    <Frame maxInlineSize={400}>
      <FileUpload.Root accept="image/*" multiple>
        <FileUpload.HiddenInput />
        <FileUpload.Trigger size="sm">Choose photos</FileUpload.Trigger>
        <FileUpload.ItemGroup>
          {(file) => (
            <FileUpload.Item
              file={file}
              key={`${file.name}-${file.lastModified}`}
            >
              <FileUpload.ItemPreview type="image/*">
                <FileUpload.ItemPreviewImage />
              </FileUpload.ItemPreview>
              <FileUpload.ItemContent>
                <FileUpload.ItemName />
                <FileUpload.ItemSize />
              </FileUpload.ItemContent>
              <FileUpload.ItemDeleteTrigger size="xs" />
            </FileUpload.Item>
          )}
        </FileUpload.ItemGroup>
      </FileUpload.Root>
    </Frame>
  );
}
