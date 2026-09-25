import { Button, toast } from "@flowstack-ui/brick";
export function ToastPromise() {
  const save = () =>
    toast.promise(
      () =>
        new Promise<string>((resolve) =>
          setTimeout(() => resolve("Document"), 1500),
        ),
      {
        loading: "Saving document",
        success: (name) => name + " saved",
        error: "Could not save document",
      },
    );
  return (
    <Button
      variant="outline"
      onClick={() => {
        void save().catch(() => undefined);
      }}
    >
      Save document
    </Button>
  );
}
