import { useRef } from "react";
import { Button, HStack, toast } from "@flowstack-ui/brick";
export function ToastUpdate() {
  const id = useRef<string | undefined>(undefined);
  return (
    <HStack gap={3} wrap>
      <Button
        variant="outline"
        onClick={() => {
          id.current = toast.loading("Processing export");
        }}
      >
        Start export
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          if (id.current)
            toast.update(id.current, {
              type: "success",
              title: "Export ready",
              duration: 5000,
            });
        }}
      >
        Finish export
      </Button>
    </HStack>
  );
}
