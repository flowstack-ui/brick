import { useState } from "react";
import { Button, HStack } from "@flowstack-ui/brick";
export function ButtonLoading() {
  const [loading, setLoading] = useState(false);
  return (
    <HStack gap="3" wrap="wrap">
      <Button loading={loading} onClick={() => setLoading(true)}>
        Save changes
      </Button>
      <Button loading loadingText="Saving">
        Save changes
      </Button>
      <Button variant="outline" onClick={() => setLoading(false)}>
        Reset
      </Button>
    </HStack>
  );
}
