import { TreeNodeIcon } from "../TreeNodeIcon.js";
import { useState } from "react";
import { Button, Text, Tree, VStack } from "@flowstack-ui/brick";
export function TreeForm() {
  const [submitted, setSubmitted] = useState("No folder submitted");
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(
          String(
            new FormData(event.currentTarget).get("folder") ?? "No selection",
          ),
        );
      }}
    >
      <VStack gap={4}>
        <Tree.Root
          aria-label="Destination folder"
          name="folder"
          defaultValue="documents"
          defaultExpandedValue={["workspace"]}
        >
          <Tree.Item value="workspace" selectable={false}>
            <Tree.ItemContent>
              <TreeNodeIcon />
              <Tree.ItemText>Workspace</Tree.ItemText>
            </Tree.ItemContent>
            <Tree.Group>
              {["documents", "images"].map((value) => (
                <Tree.Item key={value} value={value}>
                  <Tree.ItemContent>
                    <TreeNodeIcon />
                    <Tree.ItemText>{value}</Tree.ItemText>
                  </Tree.ItemContent>
                </Tree.Item>
              ))}
            </Tree.Group>
          </Tree.Item>
        </Tree.Root>
        <Button type="submit">Submit folder</Button>
        <Text role="status">{submitted}</Text>
      </VStack>
    </form>
  );
}
