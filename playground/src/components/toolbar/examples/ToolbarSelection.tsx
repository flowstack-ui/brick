import { Toolbar, VStack } from "@flowstack-ui/brick";
import { useState } from "react";
export function ToolbarSelection() {
  const [view, setView] = useState("preview");
  return (
    <VStack gap="4" align="start">
      <Toolbar.Root aria-label="Document view">
        <Toolbar.ToggleGroup
          aria-label="View"
          value={view}
          onValueChange={setView}
        >
          <Toolbar.ToggleItem value="preview">Preview</Toolbar.ToggleItem>
          <Toolbar.ToggleItem value="source">Source</Toolbar.ToggleItem>
        </Toolbar.ToggleGroup>
      </Toolbar.Root>
      <Toolbar.Root aria-label="Formatting">
        <Toolbar.ToggleGroup
          type="multiple"
          aria-label="Text formatting"
          defaultValue={["bold", "italic"]}
        >
          <Toolbar.ToggleItem value="bold">Bold</Toolbar.ToggleItem>
          <Toolbar.ToggleItem value="italic">Italic</Toolbar.ToggleItem>
          <Toolbar.ToggleItem value="underline">Underline</Toolbar.ToggleItem>
        </Toolbar.ToggleGroup>
      </Toolbar.Root>
    </VStack>
  );
}
