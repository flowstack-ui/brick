import { DownloadTrigger } from "@flowstack-ui/brick";
export function DownloadTriggerBasic() {
  return (
    <DownloadTrigger
      data="Project notes\nHello world"
      fileName="notes.txt"
      mimeType="text/plain"
      variant="outline"
    >
      Download text
    </DownloadTrigger>
  );
}
