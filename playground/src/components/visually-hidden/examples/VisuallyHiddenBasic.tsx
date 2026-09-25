import { Bell } from "lucide-react";
import { Button, Icon, VisuallyHidden } from "@flowstack-ui/brick";
export function VisuallyHiddenBasic() {
  return (
    <Button
      startIcon={
        <Icon>
          <Bell />
        </Icon>
      }
    >
      3<VisuallyHidden.Root> Notifications</VisuallyHidden.Root>
    </Button>
  );
}
