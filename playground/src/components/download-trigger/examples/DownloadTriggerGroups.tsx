import {
  Button,
  ButtonGroup,
  DownloadTrigger,
  Icon,
} from "@flowstack-ui/brick";
import { Download } from "lucide-react";
export function DownloadTriggerGroups() {
  return (
    <ButtonGroup
      size={{ initial: "sm", lg: "md" }}
      variant="outline"
      tone="neutral"
    >
      <Button>Preview</Button>
      <DownloadTrigger data="Notes" fileName="notes.txt" mimeType="text/plain">
        Download
      </DownloadTrigger>
      <DownloadTrigger
        iconOnly
        aria-label="Download copy"
        data="Notes"
        fileName="copy.txt"
        mimeType="text/plain"
      >
        <Icon>
          <Download />
        </Icon>
      </DownloadTrigger>
    </ButtonGroup>
  );
}
