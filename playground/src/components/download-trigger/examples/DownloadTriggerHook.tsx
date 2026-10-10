import { Button, HStack, useDownload } from "@flowstack-ui/brick";
export function DownloadTriggerHook() {
  const download = useDownload({
    data: () =>
      new Promise<string>((resolve) =>
        setTimeout(() => resolve("Export"), 1500),
      ),
    fileName: "export.txt",
    mimeType: "text/plain",
  });
  return (
    <HStack gap={3}>
      <Button
        loading={download.loading}
        loadingText="Preparing"
        variant="outline"
        onClick={(event) =>
          download.download(event.currentTarget.ownerDocument)
        }
      >
        Prepare custom export
      </Button>
      <Button
        disabled={!download.loading}
        variant="ghost"
        onClick={download.cancel}
      >
        Cancel preparation
      </Button>
    </HStack>
  );
}
