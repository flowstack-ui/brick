import { useState } from "react";
import { DownloadTrigger, Text, VStack } from "@flowstack-ui/brick";
export function DownloadTriggerErrors() {
  const [error, setError] = useState("");
  return (
    <VStack gap={3}>
      <DownloadTrigger
        data={() => {
          throw new Error("The report is unavailable. Try again.");
        }}
        fileName="report.txt"
        mimeType="text/plain"
        onDownloadStart={() => setError("")}
        onDownloadError={({ error }) =>
          setError(error instanceof Error ? error.message : "Export failed")
        }
        variant="outline"
      >
        Retry export
      </DownloadTrigger>
      <Text role="status" tone="secondary">
        {error}
      </Text>
    </VStack>
  );
}
