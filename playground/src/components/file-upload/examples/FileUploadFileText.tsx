import { FileUpload, Frame, HStack, Stack } from "@flowstack-ui/brick";

export function FileUploadFileText() {
  return (
    <Frame maxInlineSize={400}>
      <FileUpload.Root>
        <FileUpload.Label>Attachment</FileUpload.Label>
        <FileUpload.HiddenInput />
        <Stack.Item align="stretch" asChild>
          <HStack gap="2">
            <Stack.Item flex={1}>
              <FileUpload.Trigger fullWidth>
                <FileUpload.FileText fallback="Choose a file…" />
              </FileUpload.Trigger>
            </Stack.Item>
            <Stack.Item flex="fixed">
              <FileUpload.ClearTrigger size="sm">Clear</FileUpload.ClearTrigger>
            </Stack.Item>
          </HStack>
        </Stack.Item>
      </FileUpload.Root>
    </Frame>
  );
}
