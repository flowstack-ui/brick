import { FileUpload, Frame, Text } from "@flowstack-ui/brick";

export function FileUploadCapacity() {
  return (
    <Frame maxInlineSize={400}>
      <FileUpload.Root multiple maxFiles={3}>
        <FileUpload.HiddenInput />
        <FileUpload.Context>
          {({ maxFilesReached, remainingFiles }) => (
            <>
              <FileUpload.Trigger size="sm" disabled={maxFilesReached}>
                Add attachments
              </FileUpload.Trigger>
              <Text tone="secondary">{remainingFiles} remaining</Text>
            </>
          )}
        </FileUpload.Context>
        <FileUpload.List />
        <FileUpload.ClearTrigger size="sm">
          Clear selection
        </FileUpload.ClearTrigger>
      </FileUpload.Root>
    </Frame>
  );
}
