import { useState } from "react";
import { Button, Toaster, createToaster } from "@flowstack-ui/brick";
export function ToastPlacement() {
  const [toaster] = useState(() => createToaster());
  return (
    <>
      <Button
        variant="outline"
        onClick={() => toaster("Top-center notification")}
      >
        Show positioned toast
      </Button>
      <Toaster
        toaster={toaster}
        position="top-center"
        offset={{ initial: 4, md: 8 }}
        width="compact"
        hotkey={[]}
        label="Position example"
      />
    </>
  );
}
