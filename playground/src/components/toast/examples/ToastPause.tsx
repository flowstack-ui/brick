import { useRef } from "react";
import { Button, HStack, toast } from "@flowstack-ui/brick";
export function ToastPause() {
  const id = useRef<string | undefined>(undefined);
  return (
    <HStack gap={3} wrap>
      <Button
        variant="outline"
        onClick={() => {
          id.current = toast("Paused notification", { duration: 6000 });
          toast.pause(id.current);
        }}
      >
        Create paused toast
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          if (id.current) toast.resume(id.current);
        }}
      >
        Resume timer
      </Button>
    </HStack>
  );
}
