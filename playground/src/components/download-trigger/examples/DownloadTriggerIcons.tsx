import { DownloadTrigger, HStack, Icon } from "@flowstack-ui/brick";
import { Download } from "lucide-react";
export function DownloadTriggerIcons() {
  return (
    <HStack gap={3}>
      <DownloadTrigger
        iconOnly
        aria-label="Download notes"
        data="Notes"
        fileName="notes.txt"
        mimeType="text/plain"
        variant="outline"
      >
        <Icon>
          <Download />
        </Icon>
      </DownloadTrigger>
      <DownloadTrigger
        iconOnly
        aria-label="Download round notes"
        shape="circle"
        data="Notes"
        fileName="notes.txt"
        mimeType="text/plain"
        variant="solid"
      >
        <Icon>
          <Download />
        </Icon>
      </DownloadTrigger>
    </HStack>
  );
}
