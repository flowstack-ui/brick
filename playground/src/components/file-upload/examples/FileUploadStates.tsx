import { FileUpload, HStack } from "@flowstack-ui/brick";

export function FileUploadStates() {
  return (
    <HStack gap="3" wrap>
      <FileUpload.Root disabled fullWidth={false}>
        <FileUpload.HiddenInput />
        <FileUpload.Trigger size="sm">Disabled</FileUpload.Trigger>
      </FileUpload.Root>
      <FileUpload.Root readOnly fullWidth={false}>
        <FileUpload.HiddenInput />
        <FileUpload.Trigger size="sm">Read only</FileUpload.Trigger>
      </FileUpload.Root>
    </HStack>
  );
}
