import { useState } from "react";
import { Button, Toaster, createToaster } from "@flowstack-ui/brick";
export function ToastQueue() {
  const [toaster] = useState(() => createToaster({ duration: 3000 }));
  return (
    <>
      <Button
        variant="outline"
        onClick={() => {
          for (let i = 1; i <= 5; i++) toaster("Notification " + i);
        }}
      >
        Queue five notifications
      </Button>
      <Toaster
        toaster={toaster}
        maxVisible={2}
        position="bottom-start"
        hotkey={[]}
        label="Queue example"
      />
    </>
  );
}
