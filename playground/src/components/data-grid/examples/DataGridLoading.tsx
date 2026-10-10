import { useState } from "react";
import { Button, HStack, Text, VStack } from "@flowstack-ui/brick";
import { DataGridBasic } from "./DataGridBasic.js";
export function DataGridLoading() {
  const [state, setState] = useState<"ready" | "loading" | "empty" | "error">(
    "ready",
  );
  return (
    <VStack gap={4}>
      <HStack gap={2} wrap="wrap">
        {(["ready", "loading", "empty", "error"] as const).map((value) => (
          <Button
            key={value}
            size="sm"
            variant="outline"
            onClick={() => setState(value)}
          >
            {value}
          </Button>
        ))}
      </HStack>
      {state === "ready" && <DataGridBasic />}
      {state === "loading" && <Text role="status">Loading projects…</Text>}
      {state === "empty" && <Text role="status">No projects yet.</Text>}
      {state === "error" && (
        <VStack gap={3}>
          <Text role="alert">Projects could not be loaded.</Text>
          <Button size="sm" variant="outline" onClick={() => setState("ready")}>
            Retry
          </Button>
        </VStack>
      )}
    </VStack>
  );
}
