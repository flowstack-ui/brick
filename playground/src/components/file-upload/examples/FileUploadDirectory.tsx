import { FileUpload, Frame } from "@flowstack-ui/brick";

export function FileUploadDirectory() {
  return (
    <Frame maxInlineSize={400}>
      <FileUpload.Root directory multiple>
        <FileUpload.HiddenInput />
        <FileUpload.Trigger size="sm">Choose folder</FileUpload.Trigger>
        <FileUpload.ItemGroup>
          {(file) => (
            <FileUpload.Item
              key={file.webkitRelativePath || file.name}
              file={file}
            >
              <FileUpload.ItemName>
                {file.webkitRelativePath || file.name}
              </FileUpload.ItemName>
              <FileUpload.ItemDeleteTrigger size="xs" />
            </FileUpload.Item>
          )}
        </FileUpload.ItemGroup>
      </FileUpload.Root>
    </Frame>
  );
}
