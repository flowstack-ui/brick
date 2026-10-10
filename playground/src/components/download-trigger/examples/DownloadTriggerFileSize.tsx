import { DownloadTrigger, FormatByte } from "@flowstack-ui/brick";
const contents = "Project notes";
export function DownloadTriggerFileSize() {
  return (
    <DownloadTrigger
      data={contents}
      fileName="notes.txt"
      mimeType="text/plain"
      variant="outline"
    >
      Download (<FormatByte value={new TextEncoder().encode(contents).length} />
      )
    </DownloadTrigger>
  );
}
