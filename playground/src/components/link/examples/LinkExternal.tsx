import { Link } from "@flowstack-ui/brick";
import { ArrowUpRight } from "lucide-react";

export function LinkExternal() {
  return (
    <Link
      href="https://github.com/flowstack-ui/brick"
      target="_blank"
      rel="noopener noreferrer"
      endIcon={<ArrowUpRight />}
    >
      Visit GitHub
    </Link>
  );
}
