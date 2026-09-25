import { FileUpload, Frame, Text, useFileUpload } from "@flowstack-ui/brick";

export function FileUploadTransform() {
  const upload = useFileUpload({
    accept: ".txt",
    transformFiles: async (files) =>
      Promise.all(
        files.map(
          async (file) =>
            new File([(await file.text()).replace(/\r\n/g, "\n")], file.name, {
              type: "text/plain",
            }),
        ),
      ),
  });
  return (
    <Frame maxInlineSize={400}>
      <FileUpload.RootProvider value={upload}>
        <FileUpload.HiddenInput />
        <FileUpload.Trigger
          size="sm"
          loading={upload.transforming}
          loadingText="Preparing…"
        >
          Choose text file
        </FileUpload.Trigger>
        <Text tone="secondary" variant="body-sm">
          Normalize line endings before accepting the file.
        </Text>
        {upload.transformError ? (
          <Text role="alert">Could not prepare the file. Try again.</Text>
        ) : null}
        <FileUpload.List />
      </FileUpload.RootProvider>
    </Frame>
  );
}
