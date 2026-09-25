import { useRef } from "react";
import { Button, HStack, toast } from "@flowstack-ui/brick";
export function ToastDismiss() {
  const id = useRef<string | undefined>(undefined);
  return (
    <HStack gap={3} wrap>
      <Button
        variant="outline"
        onClick={() => {
          id.current = toast("Persistent notification", { duration: Infinity });
        }}
      >
        Create persistent toast
      </Button>
      <Button
        variant="ghost"
        onClick={() => {
          if (id.current) toast.dismiss(id.current);
        }}
      >
        Dismiss
      </Button>
    </HStack>
  );
}
