import { FileUpload } from "@flowstack-ui/brick";

export function FileUploadCapture() {
  return (
    <FileUpload.Root accept="image/*" capture="environment">
      <FileUpload.HiddenInput />
      <FileUpload.Trigger size="sm">Take a photo</FileUpload.Trigger>
      <FileUpload.List />
    </FileUpload.Root>
  );
}
