import { DownloadTrigger } from "@flowstack-ui/brick";
export function DownloadTriggerPromise() {
  return (
    <DownloadTrigger
      data={() =>
        new Promise<string>((resolve) =>
          setTimeout(() => resolve("Prepared report"), 600),
        )
      }
      fileName="report.txt"
      mimeType="text/plain"
      loadingText="Preparing report"
      variant="outline"
    >
      Download report
    </DownloadTrigger>
  );
}
