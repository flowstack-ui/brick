import { DownloadTrigger } from "@flowstack-ui/brick";
export function DownloadTriggerSvg() {
  return (
    <DownloadTrigger
      data={
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#5753c6"/></svg>'
      }
      fileName="circle.svg"
      mimeType="image/svg+xml"
      variant="outline"
    >
      Download SVG
    </DownloadTrigger>
  );
}
