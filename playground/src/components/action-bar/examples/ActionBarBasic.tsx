import { useState } from "react";
import { Archive, Share2 } from "lucide-react";
import { ActionBar, Button, Checkbox, Text, VStack } from "@flowstack-ui/brick";
export function ActionBarBasic() {
  const [selected, setSelected] = useState(false);
  const [message, setMessage] = useState("");
  return (
    <VStack gap={3} align="start">
      <Checkbox
        checked={selected}
        onCheckedChange={(value) => setSelected(value === true)}
      >
        Select project
      </Checkbox>
      <ActionBar.Root
        open={selected}
        onOpenChange={setSelected}
        closeOnInteractOutside={false}
      >
        <ActionBar.Portal>
          <ActionBar.Positioner>
            <ActionBar.Content aria-label="Selected project actions">
              <ActionBar.SelectionTrigger>
                1 selected
              </ActionBar.SelectionTrigger>
              <ActionBar.Separator />
              <Button
                size="sm"
                variant="outline"
                tone="neutral"
                startIcon={<Archive />}
                onPress={() => {
                  setMessage("Project archived.");
                  setSelected(false);
                }}
              >
                Archive
              </Button>
              <Button
                size="sm"
                variant="outline"
                tone="neutral"
                startIcon={<Share2 />}
                onPress={() => setMessage("Project shared.")}
              >
                Share
              </Button>
            </ActionBar.Content>
          </ActionBar.Positioner>
        </ActionBar.Portal>
      </ActionBar.Root>
      {message && (
        <Text role="status" variant="body-sm">
          {message}
        </Text>
      )}
    </VStack>
  );
}
