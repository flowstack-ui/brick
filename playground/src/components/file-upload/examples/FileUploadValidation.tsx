import { FileUpload, Frame, Text } from "@flowstack-ui/brick";

export function FileUploadValidation() {
  return (
    <Frame maxInlineSize={400}>
      <FileUpload.Root
        multiple
        maxFiles={2}
        accept={{ "image/png": [".png"], "image/jpeg": [".jpg", ".jpeg"] }}
        minSize={1}
        maxSize={5_000_000}
      >
        <FileUpload.HiddenInput />
        <FileUpload.Trigger size="sm">Choose images</FileUpload.Trigger>
        <Text tone="secondary" variant="body-sm">
          Two PNG or JPEG images, up to 5 MB each.
        </Text>
        <FileUpload.List />
        <FileUpload.Context>
          {({ rejectedFiles }) => (
            <output aria-live="polite">
              {rejectedFiles.map(({ file, errors }) => (
                <Text key={file.name}>
                  {file.name}: {errors.join(", ")}
                </Text>
              ))}
            </output>
          )}
        </FileUpload.Context>
      </FileUpload.Root>
    </Frame>
  );
}
