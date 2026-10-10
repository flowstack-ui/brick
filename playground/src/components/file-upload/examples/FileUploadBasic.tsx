import { FileUpload, Frame } from "@flowstack-ui/brick";

export function FileUploadBasic() {
  return (
    <Frame maxInlineSize={400}>
      <FileUpload.Root>
        <FileUpload.HiddenInput />
        <FileUpload.Trigger size="sm">Upload file</FileUpload.Trigger>
        <FileUpload.List />
      </FileUpload.Root>
    </Frame>
  );
}
