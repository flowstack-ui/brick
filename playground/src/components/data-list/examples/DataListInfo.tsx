import { DataList, IconButton, ToggleTip } from "@flowstack-ui/brick";
import { Info } from "lucide-react";
export function DataListInfo() {
  return (
    <DataList.Root orientation="horizontal">
      <DataList.Item>
        <DataList.Label>
          New users
          <ToggleTip.Root>
            <ToggleTip.Trigger asChild>
              <IconButton
                size="xs"
                variant="ghost"
                tone="neutral"
                aria-label="About new users"
              >
                <Info />
              </IconButton>
            </ToggleTip.Trigger>
            <ToggleTip.Portal>
              <ToggleTip.Content aria-label="New users">
                <ToggleTip.Body>
                  People who joined in the last 30 days.
                </ToggleTip.Body>
              </ToggleTip.Content>
            </ToggleTip.Portal>
          </ToggleTip.Root>
        </DataList.Label>
        <DataList.Value>234</DataList.Value>
      </DataList.Item>
    </DataList.Root>
  );
}
