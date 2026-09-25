import { Button, toast } from "@flowstack-ui/brick";
export function ToastDuration() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast("Take your time", {
          description:
            "This notification remains for ten seconds, excluding pauses.",
          duration: 10000,
        })
      }
    >
      Show ten-second toast
    </Button>
  );
}
