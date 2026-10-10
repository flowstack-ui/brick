import { IconButton } from "@flowstack-ui/brick";
import { Search } from "lucide-react";
export function IconButtonResponsive() {
  return (
    <IconButton aria-label="Responsive action" size={{ lg: "sm" }}>
      <Search />
    </IconButton>
  );
}
