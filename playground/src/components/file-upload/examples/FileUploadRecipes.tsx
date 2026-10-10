import { FileUpload, Frame, VStack, Text } from "@flowstack-ui/brick";

export function FileUploadRecipes() {
  return (
    <Frame maxInlineSize={480}>
      <VStack gap="4">
        {(["outline", "surface", "soft"] as const).map((variant, index) => (
          <FileUpload.Root
            key={variant}
            variant={variant}
            size={(["sm", "md", "lg"] as const)[index]}
          >
            <FileUpload.HiddenInput />
            <FileUpload.Dropzone disableClick>
              <Text>{variant}</Text>
              <FileUpload.Trigger size="sm">Browse files</FileUpload.Trigger>
            </FileUpload.Dropzone>
            <FileUpload.List />
          </FileUpload.Root>
        ))}
      </VStack>
    </Frame>
  );
}
