import { FileUpload, Frame, Input, useFileUpload } from "@flowstack-ui/brick";

export function FileUploadPaste() {
  const upload = useFileUpload({ multiple: true, accept: "image/*" });
  return (
    <Frame maxInlineSize={400}>
      <FileUpload.RootProvider value={upload}>
        <FileUpload.HiddenInput />
        <Input
          aria-label="Paste an image"
          placeholder="Paste an image here"
          onPaste={(event) => {
            if (event.clipboardData.files.length) {
              event.preventDefault();
              upload.setClipboardFiles(event.clipboardData);
            }
          }}
        />
        <FileUpload.Trigger size="sm">Or choose images</FileUpload.Trigger>
        <FileUpload.List />
      </FileUpload.RootProvider>
    </Frame>
  );
}
