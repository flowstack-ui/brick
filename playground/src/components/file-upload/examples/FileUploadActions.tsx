import { FileUpload, HStack, IconButton, VStack } from "@flowstack-ui/brick";
import { Upload } from "lucide-react";

export function FileUploadActions() {
  return (
    <VStack gap="4">
      <HStack gap="3" wrap>
        {(
          [
            "outline",
            "solid",
            "soft",
            "subtle",
            "surface",
            "ghost",
            "plain",
          ] as const
        ).map((variant) => (
          <FileUpload.Root key={variant} fullWidth={false}>
            <FileUpload.HiddenInput />
            <FileUpload.Trigger
              size="sm"
              tone="accent"
              variant={variant}
              startIcon={<Upload />}
            >
              {variant}
            </FileUpload.Trigger>
            <FileUpload.FileText />
          </FileUpload.Root>
        ))}
      </HStack>
      <FileUpload.Root fullWidth={false}>
        <FileUpload.HiddenInput />
        <FileUpload.Trigger asChild>
          <IconButton
            aria-label="Upload attachment"
            size={{ initial: "sm", md: "md" }}
            variant="outline"
          >
            <Upload />
          </IconButton>
        </FileUpload.Trigger>
        <FileUpload.FileText />
      </FileUpload.Root>
    </VStack>
  );
}
