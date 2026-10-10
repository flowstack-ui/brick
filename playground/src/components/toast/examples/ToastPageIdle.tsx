import { Button, toast } from "@flowstack-ui/brick";
export function ToastPageIdle() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast("Switch to another tab", {
          description:
            "The remaining reading time is preserved while this page is inactive.",
          duration: 6000,
        })
      }
    >
      Test page pause
    </Button>
  );
}
