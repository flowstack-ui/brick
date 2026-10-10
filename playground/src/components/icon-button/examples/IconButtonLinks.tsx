import { IconButton } from "@flowstack-ui/brick";
import { Search } from "lucide-react";
export function IconButtonLinks() {
  return (
    <IconButton href="#usage" aria-label="Read usage">
      <Search />
    </IconButton>
  );
}
