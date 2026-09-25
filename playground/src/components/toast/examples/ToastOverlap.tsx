import { useState } from "react";
import { Button, Toaster, createToaster } from "@flowstack-ui/brick";
export function ToastOverlap() {
  const [toaster] = useState(() => createToaster());
  return (
    <>
      <Button
        variant="outline"
        onClick={() => {
          toaster.remove();
          for (let i = 1; i <= 5; i++)
            toaster("Update " + i, {
              description:
                i % 2
                  ? "A longer update with additional details about your workspace and the changes that were saved."
                  : undefined,
              duration: Infinity,
            });
        }}
      >
        Show overlapping stack
      </Button>
      <Toaster
        toaster={toaster}
        maxVisible={5}
        stacking="overlap"
        position="bottom-start"
        hotkey={[]}
        label="Stack example"
      />
    </>
  );
}
