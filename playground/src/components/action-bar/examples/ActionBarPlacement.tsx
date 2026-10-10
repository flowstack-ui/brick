import { useState } from "react";
import {
  ActionBar,
  Button,
  Checkbox,
  CloseButton,
  SegmentGroup,
  VStack,
  type ActionBarPlacement as Placement,
} from "@flowstack-ui/brick";
export function ActionBarPlacement() {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<Placement>("bottom");
  return (
    <VStack gap="4" align="start">
      <SegmentGroup.Root
        aria-label="Action bar placement"
        value={placement}
        onValueChange={(value) => {
          if (
            value === "bottom" ||
            value === "bottom-start" ||
            value === "bottom-end"
          )
            setPlacement(value);
        }}
      >
        <SegmentGroup.Indicator />
        <SegmentGroup.Items
          items={[
            { value: "bottom-start", label: "Start" },
            { value: "bottom", label: "Center" },
            { value: "bottom-end", label: "End" },
          ]}
        />
      </SegmentGroup.Root>
      <Checkbox
        checked={open}
        onCheckedChange={(value) => setOpen(value === true)}
      >
        Select three files
      </Checkbox>
      <ActionBar.Root
        open={open}
        onOpenChange={setOpen}
        closeOnInteractOutside={false}
      >
        <ActionBar.Portal>
          <ActionBar.Positioner placement={placement}>
            <ActionBar.Content aria-label="Placement actions">
              <ActionBar.SelectionTrigger>
                3 selected
              </ActionBar.SelectionTrigger>
              <Button
                size="sm"
                variant="outline"
                onPress={() => setOpen(false)}
              >
                Archive
              </Button>
              <ActionBar.CloseTrigger asChild>
                <CloseButton size="sm" />
              </ActionBar.CloseTrigger>
            </ActionBar.Content>
          </ActionBar.Positioner>
        </ActionBar.Portal>
      </ActionBar.Root>
    </VStack>
  );
}
