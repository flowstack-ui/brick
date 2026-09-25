import { CloseButton } from "@flowstack-ui/brick";
import { XCircle } from "lucide-react";
export function CloseButtonCustomIcon() {
  return (
    <CloseButton aria-label="Dismiss panel">
      <XCircle />
    </CloseButton>
  );
}
