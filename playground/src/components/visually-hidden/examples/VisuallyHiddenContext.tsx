import { Button, VisuallyHidden } from "@flowstack-ui/brick";
export function VisuallyHiddenContext() {
  return (
    <Button variant="outline">
      Archive<VisuallyHidden.Root> completed projects</VisuallyHidden.Root>
    </Button>
  );
}
