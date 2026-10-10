import { useState } from "react";
import { Button, Toast, Toaster, createToaster } from "@flowstack-ui/brick";
export function ToastCustom() {
  const [toaster] = useState(() => createToaster());
  return (
    <>
      <Button
        variant="outline"
        onClick={() =>
          toaster.success("Custom notification", {
            description: "Artwork inherits the root status.",
          })
        }
      >
        Show custom notification
      </Button>
      <Toaster
        toaster={toaster}
        hotkey={[]}
        label="Custom example"
        renderToast={({ toast, index, expanded }) => (
          <Toast.Root
            toast={toast}
            index={index}
            expanded={expanded}
            radius="sm"
          >
            <Toast.Icon />
            <Toast.Content>
              <Toast.Title />
              <Toast.Description />
            </Toast.Content>
            <Toast.Close aria-label="Dismiss custom notification" />
          </Toast.Root>
        )}
      />
    </>
  );
}
