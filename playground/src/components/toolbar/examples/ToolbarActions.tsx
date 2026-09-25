import { Toolbar, VStack } from "@flowstack-ui/brick";
import { Download } from "lucide-react";
export function ToolbarActions() {
  return (
    <VStack gap="4" align="start">
      <Toolbar.Root aria-label="File actions">
        <Toolbar.Button startIcon={<Download />} variant="solid" tone="accent">
          Export
        </Toolbar.Button>
        <Toolbar.Button variant="outline">Duplicate</Toolbar.Button>
        <Toolbar.Button tone="danger">Delete</Toolbar.Button>
      </Toolbar.Root>
      <Toolbar.Root aria-label="Pending file action">
        <Toolbar.Button loading loadingText="Exporting" variant="solid">
          Export
        </Toolbar.Button>
      </Toolbar.Root>
    </VStack>
  );
}
