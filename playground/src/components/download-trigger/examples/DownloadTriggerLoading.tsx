import { DownloadTrigger, HStack, Spinner } from "@flowstack-ui/brick";
const prepare = () =>
  new Promise<string>((resolve) => setTimeout(() => resolve("Report"), 800));
export function DownloadTriggerLoading() {
  return (
    <HStack gap={3} wrap="wrap">
      <DownloadTrigger
        data={prepare}
        fileName="report.txt"
        mimeType="text/plain"
        loadingText="Preparing"
        spinnerPlacement="end"
        spinner={<Spinner size="inherit" />}
        variant="outline"
      >
        Prepare export
      </DownloadTrigger>
      <DownloadTrigger
        disabled
        loading
        data=""
        fileName="empty.txt"
        mimeType="text/plain"
      >
        Unavailable
      </DownloadTrigger>
    </HStack>
  );
}
