import { useState } from "react";
import { Button, Toaster, createToaster } from "@flowstack-ui/brick";
export function ToastWidth() {
  const [toaster] = useState(() => createToaster());
  return (
    <>
      <Button
        variant="outline"
        onClick={() =>
          toaster("Full-width notification", {
            description:
              "The viewport remains inside its logical offsets and safe areas.",
          })
        }
      >
        Show full-width toast
      </Button>
      <Toaster
        toaster={toaster}
        width="full"
        hotkey={[]}
        label="Width example"
      />
    </>
  );
}
