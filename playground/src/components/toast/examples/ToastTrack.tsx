import { Button, toast } from "@flowstack-ui/brick";
export function ToastTrack() {
  return (
    <Button
      variant="outline"
      onClick={() => {
        const task = toast.track(
          () => new Promise((resolve) => setTimeout(resolve, 1500)),
          {
            loading: "Preparing report",
            success: "Report ready",
            error: "Report failed",
          },
        );
        void task.unwrap().catch(() => undefined);
      }}
    >
      Prepare report
    </Button>
  );
}
