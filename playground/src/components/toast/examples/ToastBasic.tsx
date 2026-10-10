import { Button, toast } from "@flowstack-ui/brick";
export function ToastBasic() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast("Changes saved", { description: "Your workspace is up to date." })
      }
    >
      Show toast
    </Button>
  );
}
